import React, { useState } from "react";
import { HiMiniSpeakerWave, HiMiniPause } from "react-icons/hi2";
import { Button } from "./button";

const Description = () => {
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

  const descriptionText = `A circle is a simple geometric shape that can be described as the set of all points in a plane that are at a fixed distance (called the radius) from a given point (called the center). The distance between any of the points and the center is constant.

Key Properties of a Circle
Radius: The distance from the center of the circle to any point on the circle.
Diameter: The longest distance across the circle, passing through the center. It is twice the length of the radius.
Circumference: The perimeter or boundary line of the circle. The formula to calculate the circumference is ( C = 2\\pi r ), where ( r ) is the radius.
Area: The amount of space enclosed within the circle. It is given by the formula ( A = \\pi r^2 ).
Equations Involving Circles
Standard Equation: For a circle with a center at the origin (0,0), the equation is ( x^2 + y^2 = r^2 ).
General Equation: For a circle with a center at (h, k), the equation is ( (x-h)^2 + (y-k)^2 = r^2 ).
Applications of Circles
Circles are not just theoretical constructs; they have practical applications in various fields:

Engineering and Architecture: Wheels, gears, and other rotary mechanisms are based on circular designs.
Astronomy: Orbits of planets and celestial bodies are often approximated as circular paths.
Art and Design: Circles are used for their aesthetic appeal and symmetry in designs and artworks.
Technology: Optical devices, such as cameras and telescopes, use lenses that are typically shaped in circular forms to focus light.
Interesting Facts about Circles
A circle is a special type of ellipse where both foci are at the same point (the center).
The ratio of a circle’s circumference to its diameter is ( \\pi ), an irrational number approximately equal to 3.14159.
Circles have the highest area-to-perimeter ratio of any closed figure, making them extremely efficient shapes for enclosing space.
Mathematical Theorems Involving Circles
Thales' Theorem: States that if A, B, and C are points on a circle where the line AC is a diameter, then the angle ABC is a right angle.
The Inscribed Angle Theorem: States that an angle inscribed in a circle is half of the central angle that subtends the same arc.
Tangent and Secant Theorem: Provides relationships involving lengths of tangents, secants, and chords that intersect.
Circles, with their intrinsic simplicity and symmetry, continue to be a subject of study not only in geometry but also in fields like calculus and physics, illustrating the deep interconnectedness of mathematical principles.`;

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
