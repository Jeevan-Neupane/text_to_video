"use client";
import React from "react";
import { Button } from "./button";

const MCQQuestion = ({
  question,
  options,
  correctAnswer,
  questionId,
  selectedOption,
  isSubmitted,
  onOptionChange,
  onSubmit,
  setCorrectAnswers,
  currentQuestionNumber,
}) => {
  console.log("correctAnswer ", correctAnswer);
  return (
    <div className='w-full bg-white'>
      <h2 className='text-xl font-semibold mb-4'>
        {currentQuestionNumber}.{question}
      </h2>
      <div className='space-y-3'>
        {options.map((option, index) => (
          <div
            key={index}
            className='flex items-center'
          >
            <input
              type='radio'
              id={`option-${questionId}-${index}`}
              name={`mcq-${questionId}`} // Unique name for each question
              value={option}
              checked={selectedOption === option}
              onChange={() => onOptionChange(option)}
              disabled={isSubmitted}
              className='form-radio h-5 w-5 text-blue-600'
            />
            <label
              htmlFor={`option-${questionId}-${index}`}
              className='ml-3 text-gray-700'
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      {!isSubmitted ? (
        <Button
          onClick={onSubmit}
          className='mt-4'
        >
          Submit
        </Button>
      ) : (
        <div>
          <div
            className={`mt-4 text-lg ${
              selectedOption === correctAnswer
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {selectedOption === correctAnswer ? (
              "Correct Answer!"
            ) : (
              <p>
                <span>Incorrect Answer</span>
                <p className='text-orange-500'>
                  Correct Answer : {correctAnswer}
                </p>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MCQQuestion;
