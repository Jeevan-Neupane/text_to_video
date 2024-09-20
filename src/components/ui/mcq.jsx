"use client";
import React, { useState } from 'react';

const MCQQuestion = ({ question, options, correctAnswer, questionId }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (selectedOption === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`option-${questionId}-${index}`}
              name={`mcq-${questionId}`} // Unique name for each question
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
              disabled={isSubmitted}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <label
              htmlFor={`option-${questionId}-${index}`}
              className="ml-3 text-gray-700"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      ) : (
        <div className={`mt-4 text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}
        </div>
      )}
    </div>
  );
};

export default MCQQuestion;

