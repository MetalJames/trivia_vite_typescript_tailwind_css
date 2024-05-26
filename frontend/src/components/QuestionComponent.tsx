import React from "react";

type Question = {
    _id: string;
    QuestionID: string;
    Question: string;
    AnswerOne: string;
    AnswerTwo: string;
    AnswerThree: string;
    AnswerFour: string;
    CorrectAnswer: string;
};

type QuestionComponentProps = {
    question: Question;
    onAnswer: (answe: string) => void;
};

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, onAnswer }) => {
    if (!question) {
        return <div>No question available</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl mb-4">{question.Question}</h2>
            <div className="grid grid-cols-2 gap-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
                    onClick={() => onAnswer(question.AnswerOne)}
                >
                    {question.AnswerOne}
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
                    onClick={() => onAnswer(question.AnswerTwo)}
                >
                    {question.AnswerTwo}
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
                    onClick={() => onAnswer(question.AnswerThree)}
                >
                    {question.AnswerThree}
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
                    onClick={() => onAnswer(question.AnswerFour)}
                >
                    {question.AnswerFour}
                </button>
            </div>
        </div>
    );
};

export default QuestionComponent;
