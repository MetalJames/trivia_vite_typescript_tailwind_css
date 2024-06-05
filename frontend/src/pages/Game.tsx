import { useEffect, useMemo, useState } from "react";
import QuestionComponent from "../components/QuestionComponent";
import { gameScreen } from "../assets";
// Getting types
import { GameStuffGameScreen } from "../types/types";
import { Link, useNavigate } from "react-router-dom";

const Game = (props: GameStuffGameScreen) => {
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
        chosenCategory,
        resetAll,
    } = props;

    const navigate = useNavigate();
    console.log(chosenCategory);

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
                    numberOfQuestions,
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
        numberOfQuestions,
        navigate, 
        playerOneName, 
        playerOneScore, 
        playerTwoName, 
        playerTwoScore
    ]);

    return (
        <div className="flex justify-around items-center h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${gameScreen})` }}>
            <div className="flex flex-col justify-center items-center bg-white h-full bg-opacity-70 w-full">
            <div className="flex w-full">
            <div className="flex flex-col justify-start sm:justify-center h-full w-full">
                <div className="h-[20vw] w-full flex flex-col justify-center items-center">
                    <h1 className="text-3xl sm:text-5xl font-bold text-sky-700 mt-5">{playerOneName}</h1>
                    <p className="font-bold">Your Score: {playerOneScore}</p>
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
                    <div className="flex justify-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-sky-700 mt-5">No more questions</h3>
                    </div>
                )}
            </div>
            {multiplayerEnabled && (
                <div className="flex flex-col justify-start sm:justify-center h-full w-full">
                    <div className="h-[20vw] w-full flex flex-col justify-center items-center">
                        <h2 className="text-3xl sm:text-5xl font-bold text-sky-700 mt-5">{playerTwoName}</h2>
                        <p className="font-bold">Your Score: {playerTwoScore}</p>
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
                    <div className="flex justify-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-sky-700 mt-5">No more questions</h3>
                    </div>
                    )}
                </div>
            )}
            </div>
            <Link to="/">
                <button onClick={handleHomeClick} className="bg-blue-500 lg:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-6 transition-all">
                    Home
                </button>
            </Link>
            </div>
        </div>
    );
}

export default Game;
