import React from "react";
import useGame from "../../hooks/useGame";

type Props = {
    onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onQuestionCountChange: (value: number) => void;
};

export const GameOptions = ({ onCategoryChange, onQuestionCountChange }: Props) => {
    const { state } = useGame();
    const categoryKeys = Object.keys(state.questions).filter(key => key !== "_id");

    return (
        <div className="flex flex-col sm:flex-row w-full justify-around items-center">
            <div className="w-full sm:w-48 flex flex-col items-center">
                <h3 className="pb-1 text-center">Category of Questions</h3>
                <select 
                    name="category" 
                    id="category" 
                    className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md px-3 py-2 w-[85%] xl:w-full"
                    onChange={onCategoryChange}
                >
                    {categoryKeys.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="w-full sm:w-48 flex flex-col items-center">
                <h3 className="pb-1 text-center">Questions per Game</h3>
                <select 
                    name="numberOfQuestions" 
                    id="numberOfQuestions" 
                    className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md px-3 py-2 w-[85%] xl:w-full"
                    onChange={(e) => onQuestionCountChange(Number(e.target.value))}
                >
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                    <option value={15}>15 Questions</option>
                </select>
            </div>
        </div>
    );
};