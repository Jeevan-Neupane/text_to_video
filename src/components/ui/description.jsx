import React, { useState } from "react";
import { HiMiniSpeakerWave, HiMiniPause } from "react-icons/hi2";
import { Button } from "./button";

const Description = ({description}) => {
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if TTS is speaking

  // Function to handle text-to-speech
  const speakText = (text) => {
    const synth = window.speechSynthesis;

    // If it's already speaking, cancel the current speech
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    // Otherwise, start speaking the text
    const utterance = new SpeechSynthesisUtterance(text);
    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false); // Reset speaking state when done
    };

    utterance.onerror = (event) => {
      console.error("SpeechSynthesisUtterance.onerror", event);
      setIsSpeaking(false); // Reset speaking state in case of error
    };

    synth.speak(utterance);
  };

  const descriptionText = description || "No description available"

  return (
    <div className={`mt-5 ${"border-t border-t-gray-200 pt-2 relative"}`}>
      <h2 className='text-3xl'>Description</h2>
      <p className='text-justify'>{descriptionText}</p>
      {/* Speaker button at the end */}
      <Button
        onClick={() => speakText(descriptionText)}
        className='absolute top-2 right-2 p-2  rounded-full   text-white w-auto h-auto text-lg'
      >
        {isSpeaking ? <HiMiniPause /> : <HiMiniSpeakerWave />}
      </Button>
    </div>
  );
};

export default Description;
