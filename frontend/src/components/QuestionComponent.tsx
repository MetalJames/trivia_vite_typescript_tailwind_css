import React from "react";
import { Question } from "../types/types"; 

// type Question = {
//     _id: string;
//     QuestionID: string;
//     Question: string;
//     AnswerOne: string;
//     AnswerTwo: string;
//     AnswerThree: string;
//     AnswerFour: string;
//     CorrectAnswer: string;
// };

type QuestionComponentProps = {
    question: Question;
    onAnswer: (answe: string) => void;
    multiplayerEnabled: boolean;
};

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, onAnswer, multiplayerEnabled }) => {
    const commonClasses = "bg-blue-500 lg:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all break-words text-center";

    // Determine the specific classes based on multiplayerEnabled
    const sizeClasses = multiplayerEnabled
        ? "w-40 sm:w-[20vw] h-56 sm:h-28"
        : "w-36 sm:w-[40vw] h-48 sm:h-28"; // Replace with different sizes if needed
    if (!question) {
        return <div>No question available</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-lg sm:text-2xl font-bold mb-8 w-[70%] bg-white bg-opacity-70 rounded-md p-3 text-center h-28 flex justify-center items-center">{question.Question}</h2>
            <div className="grid grid-cols-2 gap-7">
                <button
                    className={`${commonClasses} ${sizeClasses}`}
                    onClick={() => onAnswer(question.AnswerOne)}
                >
                    {question.AnswerOne}
                </button>
                <button
                    className={`${commonClasses} ${sizeClasses}`}
                    onClick={() => onAnswer(question.AnswerTwo)}
                >
                    {question.AnswerTwo}
                </button>
                <button
                    className={`${commonClasses} ${sizeClasses}`}
                    onClick={() => onAnswer(question.AnswerThree)}
                >
                    {question.AnswerThree}
                </button>
                <button
                    className={`${commonClasses} ${sizeClasses}`}
                    onClick={() => onAnswer(question.AnswerFour)}
                >
                    {question.AnswerFour}
                </button>
            </div>
        </div>
    );
};

export default QuestionComponent;
