"use client";

import React, {useState, useRef, useEffect} from "react";
import {
  ChevronUp,
  ChevronDown,
  Heart,
  MessageCircle,
  Share2,
  Play,
  Pause,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {RxAvatar} from "react-icons/rx";

export default function ReelsPage() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef([]);

  const {
    data: reelsVideos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "videos",
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/api/video/getAllVideo"
      );
      return response.data;
    },
    select: (data) => data.videos,
  });

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentReelIndex) {
          if (isPlaying) {
            video.play();
          } else {
            video.pause();
          }
        } else {
          video.pause();
        }
      }
    });
  }, [currentReelIndex, isPlaying]);

  const handleScroll = (direction) => {
    setCurrentReelIndex((prevIndex) => {
      const newIndex =
        direction === "down"
          ? Math.min(prevIndex + 1, reelsVideos?.length - 1)
          : Math.max(prevIndex - 1, 0);
      return newIndex;
    });
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="bg-gray-100">
      <div className="w-full max-w-[1260px] mx-auto h-[calc(100vh-65px)] md:p-8 relative">
        <div className="relative w-full h-full md:max-w-md md:h-full mx-auto bg-black text-white overflow-hidden md:rounded-lg md:shadow-lg">
          {reelsVideos &&
            reelsVideos.map((reel, index) => (
              <div
                key={reel.id}
                className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-in-out ${
                  index === currentReelIndex
                    ? "translate-y-0"
                    : index < currentReelIndex
                    ? "-translate-y-full"
                    : "translate-y-full"
                }`}
              >
                <div className="relative group w-full h-full">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={reel.videoUrl}
                    className="w-full h-full object-contain"
                    loop
                    playsInline
                  />
                  <div
                    onClick={togglePlayPause}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8 text-white" />
                    ) : (
                      <Play className="h-8 w-8 text-white" />
                    )}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                  <div className="flex items-center mb-2">
                    <RxAvatar size={30} />
                    <span className="font-semibold ml-2">
                      {reel?.user?.name}
                    </span>
                  </div>
                  <p>{reel.title}</p>
                </div>

                <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-4">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-6 w-6" />
                    {/* <span className="text-xs">{reel.likes || 0}</span> */}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-6 w-6" />
                    {/* <span className="text-xs">{reel.comments || 0}</span> */}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            ))}
        </div>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-50">
          <Button
            variant="secondary"
            size="icon"
            className="border rounded-full shadow-lg"
            onClick={() => handleScroll("up")}
            disabled={currentReelIndex === 0}
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="border rounded-full shadow-lg"
            onClick={() => handleScroll("down")}
            disabled={currentReelIndex === reelsVideos?.length - 1}
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
