"use client"
import MCQQuestion from '@/components/ui/mcq';
import MaxWidthWrapper from '../components/common/max-width-wrapper'
import ReactPlayer from 'react-player'
import { useEffect, useState } from 'react';

const page = () => {
    const [clientState, setClientState] = useState(false);

    useEffect(() => {
        setClientState(true); // Triggers after hydration
    }, []);

    // Make sure initial state renders the same on server and client
    if (!clientState) {
        return null; // Avoid rendering on the server
    }
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
            options: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Mark Twain"],
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
    return (
        <div className="text-black bg-white">
            <div className="h-[52px] bg-white border-b border-b-gray-200 shadow-md flex items-center">
                <MaxWidthWrapper>
                    <div>
                        Navbar
                    </div>
                </MaxWidthWrapper>

            </div>

            <div className="mb-8">
                <MaxWidthWrapper>
                    <div className="pt-4 w-full flex justify-center items-center flex-col text-center">
                        <h1 className="text-2xl font-bold text-center mb-6">Video</h1>
                        <ReactPlayer
                            url='https://www.youtube.com/watch?v=LXb3EKWsInQ'
                            width="100%"
                            height="80vh"  // Set height to 80% of the viewport height
                        />
                    </div>
                </MaxWidthWrapper>
            </div>



            <div className="mt-1 ">

                <MaxWidthWrapper>
                    <div>
                        <h1 className="text-4xl font-bold">Title</h1>
                        <p className="text-justify">
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through  the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.





                        </p>
                    </div>


                </MaxWidthWrapper>



            </div>

            <div>

                <MaxWidthWrapper>
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-center mb-8">MCQ Quiz</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mcqs.map((mcq, index) => (
                                <MCQQuestion
                                    key={index}
                                    questionId={index} // Pass the index as a unique ID
                                    question={mcq.question}
                                    options={mcq.options}
                                    correctAnswer={mcq.correctAnswer}
                                />
                            ))}
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>




        </div>
    )
}

export default page