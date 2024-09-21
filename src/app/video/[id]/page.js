"use client";
import MCQQuestion from "@/components/ui/mcq";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Query_Chat from "@/components/chat/query_chat";
import Description from "@/components/ui/description";
import { useSession } from "next-auth/react";

const Page = () => {
  const { id } = useParams();
  const [mcqs, setMcqs] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState("");
  const [score, setScore] = useState(0);
  const { data: session } = useSession();

  const queryClient = useQueryClient()

  const {
    data: video,
    isLoading: isVideoLoading,
    isError: isVideoError,
  } = useQuery({
    queryKey: ["video", id],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/video/getById", {
        params: { id },
      });
      return response.data;
    },
    onSuccess: (data) => {
      setMcqs(data.video?.mcqs || []);
    },
    onError: (error) => {
      console.error("Error fetching videos:", error);
    },
    select: (data) => data.video,
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("http://localhost:3000/api/user", data);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Data submitted successfully:", data);
      queryClient.invalidateQueries('user')

    },
    onError: (error) => {
      console.error("Error submitting data:", error);
    },
  });

  useEffect(() => {
    if (video) {
      setMcqs(video.mcqs || []);
    }
  }, [video]);

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
    const newIsSubmitted = [...isSubmitted];
    newIsSubmitted[currentQuestionIndex] = true;
    setIsSubmitted(newIsSubmitted);

    if (selectedOptions[currentQuestionIndex] !== mcqs[currentQuestionIndex].correctAnswer) {
      setCorrectAnswers(mcqs[currentQuestionIndex].correctAnswer);
    }

    if (selectedOptions[currentQuestionIndex] === mcqs[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 10);
    }

    const userData = {
      id: "66ed6ab3484bd204309dd44a",
      rewards: score,
    };

    mutation.mutate(userData);
  };

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
                    poster={video.thumbnail || "https://images.unsplash.com/photo-1515310787031-25ac2d68610d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    className="w-full h-[500px] rounded-md object-contain"
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                  </video>
                </div>
                <h1 className="text-4xl font-bold mt-5 uppercase">{video.title}</h1>
                <Query_Chat />
                <Description description={video.caption} />
              </div>

              <div className="w-[30%] pt-6 border-l border-l-gray-200">
                <h1 className="text-3xl font-bold text-center mb-2">MCQ Quizzes</h1>
                <div className="mb-4 ml-2">
                  <p className="text-lg font-semibold">Total Questions: {mcqs.length}</p>
                  <p className="text-lg font-semibold">Correct Questions: {score / 10}</p>
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
                        selectedOption={selectedOptions[currentQuestionIndex] || null}
                        isSubmitted={isSubmitted[currentQuestionIndex] || false}
                        onOptionChange={handleOptionChange}
                        onSubmit={handleSubmit}
                        score={score}
                        setScore={setScore}
                        setCorrectAnswers={setCorrectAnswers}
                        currentQuestionNumber={currentQuestionIndex + 1}
                      />
                    )}
                    <div className="flex justify-between mt-4">
                      <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                        Previous
                      </Button>
                      <Button onClick={handleNext}>
                        {currentQuestionIndex === mcqs.length - 1 ? "Completed" : "Next"}
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
