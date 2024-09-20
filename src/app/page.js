"use client";
import {IoSparklesSharp} from "react-icons/io5";
import {useEffect, useState} from "react";
import Link from "next/link";
import {v4 as uuidv4} from "uuid";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";

const categories = ["All", "Trending", "New", "Kids"];

const videos = [
  {
    id: uuidv4(),
    title: "Learn simple English words",
    category: ["Trending", "Kids"],
    author: "Anil Stha",
    createdAt: "20 sep 2024",
  },
  {
    id: uuidv4(),
    title: "Learn simple English words",
    category: ["Trending"],
    author: "Anil Stha",
    createdAt: "20 sep 2024",
  },
  {
    id: uuidv4(),
    title: "Learn simple English words",
    category: ["Kids"],
    author: "Anil Stha",
    createdAt: "20 sep 2024",
  },
  {
    id: uuidv4(),
    title: "Learn simple English words",
    category: ["Trending", "Kids"],
    author: "Anil Stha",
    createdAt: "20 sep 2024",
  },
  {
    id: uuidv4(),
    title: "Learn simple English words",
    category: ["New"],
    author: "Anil Stha",
    createdAt: "20 sep 2024",
  },
  {
    id: uuidv4(),
    title: "Learn simple English words",
    category: ["Trending"],
    author: "Anil Stha",
    createdAt: "20 sep 2024",
  },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredVideos, setFilteredVideos] = useState(videos);

  const handleClick = () => {
    if (prompt.length < 10) {
      setError("Input must be at least 10 characters long.");
      return;
    }
    setError(""); // Clear error if input is valid
    console.log(prompt, selectedCategory);
    // Proceed with your logic here
  };

  useEffect(() => {
    const videosToShow =
      selectedCategory === "All"
        ? videos
        : videos.filter((video) => video.category.includes(selectedCategory));
    setFilteredVideos(videosToShow);
  }, [selectedCategory]);

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

              <Button className="text-lg w-fit" onClick={handleClick}>
                <IoSparklesSharp />
                <span className="ml-3">Generate Video</span>
              </Button>
            </div>
          </div>

          <div className="mt-[150px]">
            <h2 className="text-3xl">Learn From Other Videos</h2>
            <hr className="border border-gray-200 my-2" />
            <div className="flex gap-2">
              {categories.map((category) => (
                <p
                  key={category}
                  className={`border px-4 py-2 shadow-md rounded-full text-lg cursor-pointer ${
                    selectedCategory === category ? "bg-black text-white" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-3 text-lg">
              {filteredVideos.map((video) => (
                <Link key={video.id} href={`/video/${video.id}`}>
                  <div className="h-[200px] bg-gray-200 rounded-md"></div>
                  <p className="text-lg mt-2">{video.title}</p>
                  <p className="w-full flex text-base text-muted-foreground">
                    <span className="">By {video.author}</span>
                    <span className="mx-2">•</span>
                    <span className="">{video.createdAt}</span>
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
