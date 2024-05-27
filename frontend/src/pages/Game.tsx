import { useEffect, useMemo, useState } from "react";
import QuestionComponent from "../components/QuestionComponent";

import { Question } from "../types/types";
import { Link, useNavigate } from "react-router-dom";

type GameStuff = {
    questions: Question[];
    playerOneName: string;
    playerTwoName: string;
    playerOneScore: number;
    playerTwoScore: number;
    setPlayerOneScore: (score: number) => void;
    setPlayerTwoScore: (score: number) => void;
    multiplayerEnabled: boolean;
    numberOfQuestions: number;
};

// type Question = {
//     _id: string;
//     QuestionID: string;
//     Question: string;
//     AnswerOne: string;
//     AnswerTwo: string;
//     AnswerThree: string;
//     AnswerFour: string;
//     CorrectAnswer: string;
// }

const Game = (props: GameStuff) => {

    const { 
        questions, 
        playerOneName, 
        playerTwoName, 
        playerOneScore, 
        playerTwoScore,
        setPlayerOneScore,
        setPlayerTwoScore,
        multiplayerEnabled, 
        numberOfQuestions 
    } = props;

    const navigate = useNavigate();

    const [currentQuestionIndexPlayerOne, setCurrentQuestionIndexPlayerOne] = useState(0);
    const [currentQuestionIndexPlayerTwo, setCurrentQuestionIndexPlayerTwo] = useState(0);


    const [playerOneQuestions, playerTwoQuestions] = useMemo(() => {
        const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
        const playerOneQuestions = [];
        const playerTwoQuestions = [];

        for (let i=0; i < numberOfQuestions *2; i++) {
            if (i % 2 === 0 && playerOneQuestions.length < numberOfQuestions) {
                playerOneQuestions.push(shuffledQuestions[i]);
            } else if (playerTwoQuestions.length < numberOfQuestions) {
                playerTwoQuestions.push(shuffledQuestions[i])
            }
        }

        return [playerOneQuestions, playerTwoQuestions];
    }, [questions, numberOfQuestions]);

    const handleAnswerPlayerOne = (selectedAnswer: string) => {
        const currentQuestionPlayerOne = playerOneQuestions[currentQuestionIndexPlayerOne];
        if(currentQuestionPlayerOne.CorrectAnswer == selectedAnswer) {
            setPlayerOneScore(playerOneScore + 1);
        }
        setCurrentQuestionIndexPlayerOne(currentQuestionIndexPlayerOne + 1);
    };

    const handleAnswerPlayerTwo = (selectedAnswer: string) => {
        const currentQuestionPlayerTwo = playerTwoQuestions[currentQuestionIndexPlayerTwo];
        if(currentQuestionPlayerTwo.CorrectAnswer == selectedAnswer) {
            setPlayerTwoScore(playerTwoScore + 1);
        }
        setCurrentQuestionIndexPlayerTwo(currentQuestionIndexPlayerTwo + 1);
    };

    const currentPlayerOneQuestion = playerOneQuestions[currentQuestionIndexPlayerOne];
    const currentPlayerTwoQuestion = multiplayerEnabled ? playerTwoQuestions[currentQuestionIndexPlayerTwo] : null;

    useEffect(() => {
        if (currentQuestionIndexPlayerOne >= numberOfQuestions && 
            (!multiplayerEnabled || currentQuestionIndexPlayerTwo >= numberOfQuestions)) {
            navigate("/winner", {
                state: {
                    playerOneName,
                    playerOneScore,
                    playerTwoName,
                    playerTwoScore,
                    multiplayerEnabled
                }
            });
        }
    }, [currentQuestionIndexPlayerOne, currentQuestionIndexPlayerTwo, numberOfQuestions, navigate, playerOneName, playerOneScore, playerTwoName, playerTwoScore, multiplayerEnabled]);

    return (
        <div>
            <div className="flex justify-around items-center h-screen">
                <div>
                    <h1>{playerOneName}</h1>
                    <p>Your Score: {playerOneScore}</p>
                    {currentPlayerOneQuestion ? (
                        <QuestionComponent
                            question={currentPlayerOneQuestion}
                            onAnswer={handleAnswerPlayerOne}
                        />
                    ) : (
                        <p>No more questions</p>
                    )}
                </div>
                {multiplayerEnabled && (
                    <div>
                        <h2>{playerTwoName}</h2>
                        <p>Your Score: {playerTwoScore}</p>
                        {currentPlayerTwoQuestion ? (
                            <QuestionComponent
                                question={currentPlayerTwoQuestion}
                                onAnswer={handleAnswerPlayerTwo}
                            />
                        ) : (
                            <p>No more questions</p>
                        )}
                    </div>
                )}
            </div>
            <Link to="/">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
                >
                    Home
                </button>
            </Link>
        </div>
    );
}

export default Game;