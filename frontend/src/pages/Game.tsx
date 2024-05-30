import { useEffect, useMemo, useState } from "react";
import QuestionComponent from "../components/QuestionComponent";
import { gameScreen } from "../assets";

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
    resetAll: () => void;
};

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
        numberOfQuestions,
        resetAll,
    } = props;

    const navigate = useNavigate();

    const [currentQuestionIndexPlayerOne, setCurrentQuestionIndexPlayerOne] = useState(0);
    const [currentQuestionIndexPlayerTwo, setCurrentQuestionIndexPlayerTwo] = useState(0);

    const [playerOneQuestions, playerTwoQuestions] = useMemo(() => {
        const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
        const playerOneQuestions = [];
        const playerTwoQuestions = [];

        if(multiplayerEnabled) {
            const totalQuestionsNeeded = numberOfQuestions * 2;
            const availableQuestions = Math.min(totalQuestionsNeeded, shuffledQuestions.length);
            const questionsPerPlayer = Math.floor(availableQuestions / 2);
    
            for (let i = 0; i < availableQuestions; i++) {
                if (i % 2 === 0 && playerOneQuestions.length < questionsPerPlayer) {
                    playerOneQuestions.push(shuffledQuestions[i]);
                } else if (playerTwoQuestions.length < questionsPerPlayer) {
                    playerTwoQuestions.push(shuffledQuestions[i]);
                }
            }
        } else {
            const availableQuestions = Math.min(numberOfQuestions, shuffledQuestions.length);
            for (let i = 0; i < availableQuestions; i++) {
                playerOneQuestions.push(shuffledQuestions[i]);
            }
        }

        return [playerOneQuestions, playerTwoQuestions];
    }, [questions, numberOfQuestions, multiplayerEnabled]);

    const handleAnswerPlayerOne = (selectedAnswer: string) => {
        const currentQuestionPlayerOne = playerOneQuestions[currentQuestionIndexPlayerOne];
        if (currentQuestionPlayerOne?.CorrectAnswer === selectedAnswer) {
            setPlayerOneScore(playerOneScore + 1);
        }
        setCurrentQuestionIndexPlayerOne(currentQuestionIndexPlayerOne + 1);
    };

    const handleAnswerPlayerTwo = (selectedAnswer: string) => {
        const currentQuestionPlayerTwo = playerTwoQuestions[currentQuestionIndexPlayerTwo];
        if (currentQuestionPlayerTwo?.CorrectAnswer === selectedAnswer) {
            setPlayerTwoScore(playerTwoScore + 1);
        }
        setCurrentQuestionIndexPlayerTwo(currentQuestionIndexPlayerTwo + 1);
    };

    const currentPlayerOneQuestion = playerOneQuestions[currentQuestionIndexPlayerOne];
    const currentPlayerTwoQuestion = multiplayerEnabled ? playerTwoQuestions[currentQuestionIndexPlayerTwo] : null;

    const handleHomeClick = () => {
        resetAll();
    };

    useEffect(() => {
        if (
            currentQuestionIndexPlayerOne >= playerOneQuestions.length &&
            (!multiplayerEnabled || currentQuestionIndexPlayerTwo >= playerTwoQuestions.length)
        ) {
            navigate("/winner", {
                state: {
                    playerOneName,
                    playerOneScore,
                    playerTwoName,
                    playerTwoScore,
                    multiplayerEnabled,
                    playerOneQuestionsAvailable: playerOneQuestions.length,
                    playerTwoQuestionsAvailable: playerTwoQuestions.length,
                }
            });
        }
    }, [
        currentQuestionIndexPlayerOne, 
        currentQuestionIndexPlayerTwo, 
        playerOneQuestions.length, 
        playerTwoQuestions.length, 
        multiplayerEnabled, 
        navigate, 
        playerOneName, 
        playerOneScore, 
        playerTwoName, 
        playerTwoScore
    ]);

    return (
        <div>
            <div className="flex justify-around items-center h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${gameScreen})` }}>
                <div className="flex flex-col justify-start sm:justify-center bg-white h-full bg-opacity-70 w-full">
                    <div className="h-[20vw]">
                        <h1>{playerOneName}</h1>
                        <p>Your Score: {playerOneScore}</p>
                    </div>
                    {currentPlayerOneQuestion ? (
                        <div className="flex flex-col justify-center h-full">
                            <QuestionComponent
                                multiplayerEnabled={multiplayerEnabled}
                                question={currentPlayerOneQuestion}
                                onAnswer={handleAnswerPlayerOne}
                            />
                        </div>
                    ) : (
                        <p>No more questions</p>
                    )}
                </div>
                {multiplayerEnabled && (
                    <div className="flex flex-col justify-start sm:justify-center bg-white h-full bg-opacity-70 w-full">
                        <div className="h-[20vw]">
                            <h2>{playerTwoName}</h2>
                            <p>Your Score: {playerTwoScore}</p>
                        </div>
                        {currentPlayerTwoQuestion ? (
                            <div className="flex flex-col justify-center h-full">
                                <QuestionComponent
                                    multiplayerEnabled={multiplayerEnabled}
                                    question={currentPlayerTwoQuestion}
                                    onAnswer={handleAnswerPlayerTwo}
                                />
                            </div>
                        ) : (
                            <p>No more questions</p>
                        )}
                    </div>
                )}
            </div>
            <Link to="/">
                <button onClick={handleHomeClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
                    Home
                </button>
            </Link>
        </div>
    );
}

export default Game;
