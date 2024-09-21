"use client";
import MCQQuestion from "@/components/ui/mcq";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import ReactPlayer from "react-player";
import { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoSparklesSharp } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Query_Chat from "@/components/chat/query_chat";
import Description from "@/components/ui/description";

const mcqs = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    correctAnswer: "Mars",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "J.K. Rowling",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "NaCl"],
    correctAnswer: "H2O",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Thailand", "South Korea"],
    correctAnswer: "Japan",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Diamond", "Iron", "Silver"],
    correctAnswer: "Diamond",
  },
];

const Page = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState([]); // Track submission for each question
  const [correctAnswers, setCorrectAnswers] = useState("");

  const [score, setScore] = useState(0);

  console.log("correctAnswers", correctAnswers);

  const {
    data: video,
    isLoading: isVideoLoading,
    isError: isVideoError,
  } = useQuery({
    queryKey: ["video", id],
    queryFn: async () => {
      console.log("id", id);
      const response = await axios.get(
        "http://localhost:3000/api/video/getById",
        {
          params: {
            id,
          },
        }
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
    select: (data) => data.video,
  });

  console.log("video", video);



  const handleNext = () => {
    if (currentQuestionIndex < mcqs.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleOptionChange = (option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = () => {
    console.log("Submitted");
    const newIsSubmitted = [...isSubmitted];
    newIsSubmitted[currentQuestionIndex] = true; // Mark current question as submitted
    setIsSubmitted(newIsSubmitted);

    if (
      selectedOptions[currentQuestionIndex] !==
      mcqs[currentQuestionIndex].correctAnswer
    ) {
      setCorrectAnswers(mcqs[currentQuestionIndex].correctAnswer);
    }

    if (
      selectedOptions[currentQuestionIndex] ===
      mcqs[currentQuestionIndex].correctAnswer
    ) {
      setScore((prevScore) => prevScore + 10); // Increment score
    }
  };
  console.log("score", score);

  return (
    <div className="text-black bg-white">
      <div className="mb-8">
        <MaxWidthWrapper>
          {video && (
            <div className="w-full flex gap-10">
              <div className="w-[70%]">
                <div className="pt-4 w-full flex justify-center items-center flex-col text-center">
                  <video
                    width="100%"
                    height="500px"
                    controls
                    autoplay
                    poster={video.thumbnail||"https://images.unsplash.com/photo-1515310787031-25ac2d68610d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    className="w-full h-[500px] rounded-md object-cover"
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                  </video>
                </div>
                <h1 className="text-4xl font-bold mt-5 uppercase">
                  {video.title}
                </h1>
                <Query_Chat />
                <Description description={video.caption}/>
              </div>

              <div className="w-[30%] pt-6 border-l border-l-gray-200">
                <h1 className="text-3xl font-bold text-center mb-2">
                  MCQ Quizzes
                </h1>
                <div className="mb-4 ml-2">
                  <p className="text-lg font-semibold">
                    Total Questions: {mcqs.length}
                  </p>
                  <p className="text-lg font-semibold">
                    Correct Questions :{score / 10}
                  </p>
                  <p className="text-lg font-semibold">Score: {score}</p>
                </div>
                <div className="border-t">
                  <div className="flex flex-col p-6">
                    {mcqs.length > 0 && (
                      <MCQQuestion
                        questionId={currentQuestionIndex}
                        question={mcqs[currentQuestionIndex].question}
                        options={mcqs[currentQuestionIndex].options}
                        correctAnswer={mcqs[currentQuestionIndex].correctAnswer}
                        selectedOption={
                          selectedOptions[currentQuestionIndex] || null
                        }
                        isSubmitted={isSubmitted[currentQuestionIndex] || false} // Use the array for submission status
                        onOptionChange={handleOptionChange}
                        onSubmit={handleSubmit} // Call handleSubmit on submit
                        score={score}
                        setScore={setScore}
                        setCorrectAnswers={setCorrectAnswers}
                        currentQuestionNumber={currentQuestionIndex + 1}
                      />
                    )}
                    <div className="flex justify-between mt-4">
                      <Button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={handleNext}
                        disabled={currentQuestionIndex === mcqs.length - 1}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default Page;
