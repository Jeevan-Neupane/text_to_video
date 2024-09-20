"use client";
import MCQQuestion from "@/components/ui/mcq";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import ReactPlayer from "react-player";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {IoSparklesSharp} from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientState, setClientState] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(mcqs.length).fill(null)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setClientState(true); // Triggers after hydration
  }, []);

  if (!clientState) {
    return null; // Avoid rendering on the server
  }

  const handleClick = () => {
    console.log(question);
    setIsLoading(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < mcqs.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsSubmitted(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setIsSubmitted(false);
    }
  };

  const handleOptionChange = (option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div className="text-black bg-white">
      <div className="mb-8">
        <MaxWidthWrapper>
          <div className="w-full flex gap-10">
            <div className="w-[70%]">
              <div className="pt-4 w-full flex justify-center items-center flex-col text-center">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                  width="100%"
                  height="500px"
                />
              </div>
              <h1 className="text-4xl font-bold mt-5">
                Title asdfasdfkj a sdfkj asf ansdf ansdf k
              </h1>
              <div className="mt-5 flex">
                <Input
                  placeholder="Ask Your Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="h-12 rounded-none"
                />
                <Button
                  className="text-lg w-fit h-auto rounded-none"
                  onClick={handleClick}
                >
                  <IoSparklesSharp />
                  <span className="ml-3">Ask Question</span>
                </Button>
              </div>
              {isLoading && (
                <div className="mt-5">
                  <Skeleton width="90%" height="20px" />
                  <Skeleton width="20%" height="20px" />
                </div>
              )}
              <div
                className={`mt-5 ${
                  isLoading && "border-t border-t-gray-200 pt-2"
                }`}
              >
                <h2 className="text-3xl">Description</h2>
                <p className="text-justify">{/* Description content */}</p>
              </div>
            </div>
            <div className="w-[30%] pt-6 border-l border-l-gray-200">
              <h1 className="text-3xl font-bold text-center mb-2">
                MCQ Quizzes
              </h1>
              <div className="border-t">
                <div className="flex flex-col p-6">
                  {mcqs.length > 0 && (
                    <MCQQuestion
                      questionId={currentQuestionIndex}
                      question={mcqs[currentQuestionIndex].question}
                      options={mcqs[currentQuestionIndex].options}
                      correctAnswer={mcqs[currentQuestionIndex].correctAnswer}
                      selectedOption={selectedOptions[currentQuestionIndex]} // Pass the selected option for the current question
                      isSubmitted={isSubmitted}
                      onOptionChange={handleOptionChange} // Use the new handler
                      onSubmit={() => setIsSubmitted(true)}
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
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default Page;
