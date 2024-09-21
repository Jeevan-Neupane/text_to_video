"use client";
import { IoSparklesSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { FaPlay } from "react-icons/fa";

export default function Home() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [categories, setCategories] = useState([]);

  const { toast } = useToast();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: "videos",
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/api/video/getAllVideo"
      );

      return response.data;
    },
    onSuccess: (data) => {
      console.log("Videos fetched:", data);
    },
    onError: (error) => {
      console.error("Error fetching videos:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch videos. Please try again.",
      });
    },
    select: (data) => data.videos,
  });

  const addVideoMutation = useMutation({
    mutationFn: async (video) => {
      const response = await axios.post(
        "http://localhost:3000/api/video/addVideo",
        video
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Video added:", data);
      setPrompt("");
      router.push(`/video/${data.video._id}`);
    },
    onError: (error) => {
      console.error("Error adding video:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add video. Please try again.",
      });
    },
  });

  const generateVideoMutation = useMutation({
    mutationFn: async ({ prompt:topic, grade }) => {
      console.log("Generating video for topic:", topic,grade);
      const response = await axios.post(
        "http://localhost:8000/generate_educational_content/",
        {
          topic: topic,
          grade: grade,
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Video generated:", data);
      addVideoMutation.mutate({
        user: session.user.id,
        title: prompt,
        videoUrl: data.video_url,
        mcqs: [],
        category: "Math",
      });
    },
    onError: (error) => {
      console.error("Error generating video:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate video. Please try again.",
      });
    },
  });

  useEffect(() => {
    if (data) {
      console.log("Data:", data);
      setVideos(data);
      setFilteredVideos(data);

      const uniqueCategories = [
        ...new Set(data.map((video) => video.category)),
      ];
      setCategories(["All", ...uniqueCategories]);
    }
  }, [data]);

  useEffect(() => {
    const videosToShow =
      selectedCategory === "All"
        ? videos
        : videos.filter((video) => video.category.includes(selectedCategory));
    setFilteredVideos(videosToShow);
  }, [selectedCategory, videos]);

  const handleClick = () => {
    if (prompt.length < 5) {
      setError("Input must be at least 5 characters long.");
      return;
    }
    setError("");
    // Clear error if input is valid
    let grade = 1;
    generateVideoMutation.mutate({prompt, grade});
  };

  return (
    <div className="min-h-screen">
      <div className="pt-20">
        <MaxWidthWrapper>
          <div>
            <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
              Unlock Your Potential With{" "}
              <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                  <span className="">AI Powered Learning</span>
                </div>
                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                  <span className="">AI Powered Learning</span>
                </div>
              </div>
            </h2>
            <div className="mx-auto max-w-[900px] flex flex-col gap-5 mt-20 text-5xl border border-gray-200 p-5 rounded-lg shadow-md">
              <div>
                <Input
                  placeholder="Enter anything you want to learn..."
                  className="text-lg h-[60px]"
                  required
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <Button
                className="text-lg w-fit"
                onClick={handleClick}
                disabled={generateVideoMutation.isPending}
              >
                {generateVideoMutation.isPending ? (
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  <IoSparklesSharp />
                )}
                <span className="ml-3">
                  {generateVideoMutation.isPending
                    ? "Generating Video..."
                    : "Generate Video"}
                </span>
              </Button>
            </div>
          </div>

          <div className="mt-[150px]">
            <h2 className="text-3xl">Learn From Other Videos</h2>
            <hr className="border border-gray-200 my-2" />
            <div className="flex gap-2">
              {categories?.map((category) => (
                <p
                  key={category}
                  className={`border px-4 py-2 shadow-md rounded-full text-lg cursor-pointer ${selectedCategory === category ? "bg-black text-white" : ""
                    }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </p>
              ))}
            </div>
            <div
              id="videos"
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-3 text-lg"
            >
              {isLoading && <div>Loading...</div>}
              {isError && <div>Error fetching videos</div>}
              {filteredVideos.length > 0 &&
                filteredVideos.map((video) => (
                  <Link key={video.id} href={`/video/${video._id}`}>
                    <div className="relative w-full h-[300px] rounded-md overflow-hidden group">
                      <img
                        src="https://images.unsplash.com/photo-1515310787031-25ac2d68610d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt={video.title}
                        className="w-full h-[300px] rounded-md object-cover group-hover:scale-110 transition-all duration-300 ease-in-out"
                      />
                      <span className="hidden group-hover:block">
                        <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-white" />
                      </span>
                    </div>
                    <p className="text-lg mt-2 uppercase">{video.title}</p>
                    <p className="w-full flex text-base text-muted-foreground">
                      <span>By {video.user.name}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(video.createdAt)}</span>
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
}
