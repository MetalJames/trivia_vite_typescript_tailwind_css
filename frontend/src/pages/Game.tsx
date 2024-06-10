import { useEffect, useMemo, useState } from "react";
import { gameScreen } from "../assets";
// Getting types
import { Question } from "../types/types";
import { Link, useNavigate } from "react-router-dom";
import { Player, ErrorCategory } from "../components"
import useGame from "../hooks/useGame";

const Game = () => {
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
    } = useGame();

    const navigate = useNavigate();

    const { Games, General, IT } = questions[0];

    const [currentQuestionIndexPlayerOne, setCurrentQuestionIndexPlayerOne] = useState(0);
    const [currentQuestionIndexPlayerTwo, setCurrentQuestionIndexPlayerTwo] = useState(0);

    const [playerOneQuestions, playerTwoQuestions] = useMemo(() => {

        let categoryQuestions: Question[] = [];

        if (chosenCategory === "Games") {
            categoryQuestions = Games;
        } else if (chosenCategory === "General") {
            categoryQuestions = General;
        } else if (chosenCategory === "IT") {
            categoryQuestions = IT;
        } else {
            console.error("Chosen category is not recognized:", chosenCategory);
        }

        const shuffledQuestions = [...categoryQuestions].sort(() => 0.5 - Math.random());
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
    }, [chosenCategory, multiplayerEnabled, Games, General, IT, numberOfQuestions]);

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

    const isValidCategory = chosenCategory === "Games" || chosenCategory === "General" || chosenCategory === "IT";

    if (!isValidCategory) {
        return <ErrorCategory chosenCategory={chosenCategory} />;
    }

    return (
        <div className="flex justify-around items-center h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${gameScreen})` }}>
            <div className="flex flex-col justify-center items-center bg-white h-full bg-opacity-70 w-full">
                <div className="flex w-full">
                    <Player 
                        playerName={playerOneName} 
                        playerScore={playerOneScore} 
                        questions={currentPlayerOneQuestion}
                        onAnswer={handleAnswerPlayerOne}
                        multiplayerEnabled={multiplayerEnabled}
                    />
                    {multiplayerEnabled && (
                        <Player 
                            playerName={playerTwoName} 
                            playerScore={playerTwoScore} 
                            questions={currentPlayerTwoQuestion}
                            onAnswer={handleAnswerPlayerTwo}
                            multiplayerEnabled={multiplayerEnabled}
                        />
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
