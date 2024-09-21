import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {
  IoSparklesSharp,
  IoMicOutline,
  IoMicOffOutline,
} from "react-icons/io5";
import { HiMiniSpeakerWave, HiMiniPause } from "react-icons/hi2";
import { useMutation } from "@tanstack/react-query";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ScrollToBottom component that re-triggers on new messages
const ScrollToBottom = ({ trigger }) => {
  const elementRef = useRef();
  useEffect(() => {
    elementRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [trigger]);

  return <div ref={elementRef} />;
};

const Query_Chat = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false); // Track voice recording
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if TTS is speaking
  const [activeMessageIndex, setActiveMessageIndex] = useState(null); // Track the index of the message being spoken
  const recognitionRef = useRef(null); // Ref to store the recognition instance

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fetchAnswer = async (message) => {
    const raw = JSON.stringify({ message });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch("http://localhost:8000/chat/", requestOptions);
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };

  console.log("isLoading", isLoading);

  const mutation = useMutation({
    mutationFn: fetchAnswer,
    onMutate: () => {
      setIsLoading(true);
      setMessages((prev) => [...prev, { text: question, type: "user" }]);
      setQuestion("");
      setError(null); // Clear previous error
    },
    onSuccess: (data) => {
      const botMessage = data.response || "No response";
      setMessages((prev) => [...prev, { text: botMessage, type: "bot" }]);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching response", type: "bot" },
      ]);
      setIsLoading(false);
      setError(error.message); // Store error message
    },
  });

  // Voice recognition logic using the Web Speech API
  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop(); // Stop recording if already in progress
      setIsRecording(false);
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognitionRef.current = recognition; // Store the recognition instance in the ref

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript); // Set the input field with transcribed speech
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in speech recognition: ", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  // Function to handle text-to-speech
  const speakText = (text, index) => {
    const synth = window.speechSynthesis;

    // If it's already speaking, cancel the current speech
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      setActiveMessageIndex(null);
      return; // Stop speaking on the second click
    }

    // Otherwise, start speaking the text
    const utterance = new SpeechSynthesisUtterance(text);
    setIsSpeaking(true);
    setActiveMessageIndex(index); // Set the active message being spoken

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveMessageIndex(null); // Reset the active message
    };

    utterance.onerror = (event) => {
      console.error("SpeechSynthesisUtterance.onerror", event);
      setIsSpeaking(false);
      setActiveMessageIndex(null); // Reset the active message in case of error
    };

    synth.speak(utterance);
  };

  const handleClick = () => {
    if (question) {
      mutation.mutate(question);
    }
  };

  return (
    <div className='border rounded-lg p-4 w-full mx-auto bg-white shadow-lg'>
      {messages.length > 0 && (
        <div className='chat-messages mb-4 max-h-80 overflow-y-auto p-3 border border-gray-300 rounded-lg bg-gray-50'>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded-lg w-fit max-w-[80%] ${
                msg.type === "user" ? "bg-blue-200 ml-auto" : "bg-gray-200"
              }`}
            >
              <Markdown remarkPlugins={[remarkGfm]}>{msg.text}</Markdown>
              {/* Add a button to trigger TTS for individual messages */}
              {msg.type !== "user" && (
                <Button
                  onClick={() => speakText(msg.text, index)}
                  className='text-lg mt-2 text-white rounded-full p-2 border'
                >
                  {isSpeaking && activeMessageIndex === index ? (
                    <HiMiniPause />
                  ) : (
                    <HiMiniSpeakerWave />
                  )}
                </Button>
              )}
            </div>
          ))}
          {isLoading && (
            <Skeleton
              width='80%'
              height='20px'
            />
          )}
          {error && <div className='text-red-500'>{error}</div>}
          <ScrollToBottom trigger={messages.length} />{" "}
          {/* Scroll on new messages */}
        </div>
      )}
      <div className='flex'>
        <Input
          placeholder='Ask Your Question'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className='h-12 rounded-l-lg border border-gray-300 shadow-sm p-2 flex-grow'
        />
        <Button
          className='text-lg w-fit h-auto rounded-r-lg ml-2 text-white'
          onClick={handleClick}
          disabled={isLoading}
        >
          <IoSparklesSharp />
          <span className='ml-2'>Ask Question</span>
        </Button>
        <Button
          className={`ml-2 ${
            isRecording ? "bg-red-500 pulsating" : ""
          } text-white rounded-full transition-all duration-300 h-auto w-auto`}
          onClick={startRecording}
          disabled={isRecording && !recognitionRef.current}
        >
          {isRecording ? <IoMicOffOutline /> : <IoMicOutline />}
        </Button>
      </div>
    </div>
  );
};

export default Query_Chat;
