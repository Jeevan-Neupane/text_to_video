"use client";

import React, {useState, useRef, useEffect} from "react";
import {
  ChevronUp,
  ChevronDown,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";

const mockReels = [
  {
    id: "1",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    user: {name: "User1", avatar: "/placeholder.svg?height=50&width=50"},
    caption: "This is reel 1",
    likes: 1000,
    comments: 100,
  },
  {
    id: "2",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    user: {name: "User2", avatar: "/placeholder.svg?height=50&width=50"},
    caption: "This is reel 2",
    likes: 2000,
    comments: 200,
  },
  {
    id: "3",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    user: {name: "User3", avatar: "/placeholder.svg?height=50&width=50"},
    caption: "This is reel 3",
    likes: 3000,
    comments: 300,
  },
];

export default function ReelsPage() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    const currentVideo = videoRefs.current[currentReelIndex];
    if (currentVideo) {
      currentVideo.play();
    }
    return () => {
      if (currentVideo) {
        currentVideo.pause();
      }
    };
  }, [currentReelIndex]);

  const handleScroll = (direction) => {
    setCurrentReelIndex((prevIndex) => {
      const newIndex =
        direction === "down"
          ? Math.min(prevIndex + 1, mockReels.length - 1)
          : Math.max(prevIndex - 1, 0);
      return newIndex;
    });
  };

  return (
    <div className="bg-gray-100">
      <MaxWidthWrapper>
        <div className="min-h-[calc(100vh-62px)] md:p-8 relative">
          <div className="relative w-full h-screen md:max-w-md md:h-[calc(100vh-200px)] mx-auto bg-black text-white overflow-hidden md:rounded-lg md:shadow-lg">
            {mockReels.map((reel, index) => (
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
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={reel.videoUrl}
                  className="w-full h-full object-contain"
                  loop
                  muted
                  playsInline
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                  <div className="flex items-center mb-2">
                    <img
                      src={reel.user.avatar}
                      alt={reel.user.name}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <span className="font-semibold">{reel.user.name}</span>
                  </div>
                  <p>{reel.caption}</p>
                </div>
                <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-4">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-6 w-6" />
                    <span className="text-xs">{reel.likes}</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-6 w-6" />
                    <span className="text-xs">{reel.comments}</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-50">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg"
              onClick={() => handleScroll("up")}
              disabled={currentReelIndex === 0}
            >
              <ChevronUp className="h-6 w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg"
              onClick={() => handleScroll("down")}
              disabled={currentReelIndex === mockReels.length - 1}
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
