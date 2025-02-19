import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gameScreen } from "../assets";
import { CategoryOfQuestions } from "../types/types";
import { Player, ModalAnswer } from "../components"
import useGame from "../hooks/useGame";
import { useGameQuestions } from "../hooks/useGameQuestions";

export const Game = () => {
    const { state, actions } = useGame();
    const { questions, playerOneName, playerTwoName, playerOneScore, playerTwoScore, multiplayerEnabled, numberOfQuestions, chosenCategory } = state;
    const { setPlayerOneScore, setPlayerTwoScore, resetGame } = actions;

    const navigate = useNavigate();

    const [currentQuestionIndexPlayerOne, setCurrentQuestionIndexPlayerOne] = useState(0);
    const [currentQuestionIndexPlayerTwo, setCurrentQuestionIndexPlayerTwo] = useState(0);

    const [modalAnswerPlayerOne, setModalAnswerPlayerOne] = useState(false);
    const [modalAnswerPlayerTwo, setModalAnswerPlayerTwo] = useState(false);
    const [isCorrectPlayerOne, setIsCorrectPlayerOne] = useState<boolean | null>(null);
    const [isCorrectPlayerTwo, setIsCorrectPlayerTwo] = useState<boolean | null>(null);

    const [playerOneQuestions, playerTwoQuestions] = useGameQuestions(questions, chosenCategory as keyof CategoryOfQuestions, multiplayerEnabled, numberOfQuestions);

    const handleAnswerPlayerOne = (selectedAnswer: string) => {
        const currentQuestionPlayerOne = playerOneQuestions[currentQuestionIndexPlayerOne];

        const correct = currentQuestionPlayerOne?.CorrectAnswer === selectedAnswer;
        setIsCorrectPlayerOne(correct);

            setPlayerOneScore(correct ? playerOneScore + 1 : playerOneScore);

            setModalAnswerPlayerOne(true);
            setTimeout(() => {
                setModalAnswerPlayerOne(false);
                setIsCorrectPlayerOne(null);
            }, 2000)

        setCurrentQuestionIndexPlayerOne(currentQuestionIndexPlayerOne + 1);
    };

    const handleAnswerPlayerTwo = (selectedAnswer: string) => {
        const currentQuestionPlayerTwo = playerTwoQuestions[currentQuestionIndexPlayerTwo];

        const correct2 = currentQuestionPlayerTwo?.CorrectAnswer === selectedAnswer;
        setIsCorrectPlayerTwo(correct2);

            setPlayerTwoScore(correct2 ? playerTwoScore + 1 : playerTwoScore);
            setModalAnswerPlayerTwo(true);
            setTimeout(() => {
                setModalAnswerPlayerTwo(false);
                setIsCorrectPlayerTwo(null);
            }, 2000)

        setCurrentQuestionIndexPlayerTwo(currentQuestionIndexPlayerTwo + 1);
    };

    const currentPlayerOneQuestion = playerOneQuestions[currentQuestionIndexPlayerOne];
    const currentPlayerTwoQuestion = multiplayerEnabled ? playerTwoQuestions[currentQuestionIndexPlayerTwo] : null;

    const handleHomeClick = () => {
        resetGame();
    };

    useEffect(() => {
        if (
            currentQuestionIndexPlayerOne >= playerOneQuestions.length &&
            (!multiplayerEnabled || currentQuestionIndexPlayerTwo >= playerTwoQuestions.length)
        ) {
            setTimeout(() => {            
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
            }, 2250);
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
                <div className="flex w-full h-full">
                    <Player 
                        playerName={playerOneName} 
                        playerScore={playerOneScore} 
                        questions={currentPlayerOneQuestion}
                        onAnswer={handleAnswerPlayerOne}
                        multiplayerEnabled={multiplayerEnabled}
                    />
                    {!multiplayerEnabled &&
                        <div>{modalAnswerPlayerOne && <ModalAnswer message={isCorrectPlayerOne ? "You are right!" : "Nope, wrong one."} />}</div>
                    }
                    {multiplayerEnabled &&                     
                        <div>
                            {modalAnswerPlayerOne && isCorrectPlayerOne !== null && (
                            <ModalAnswer message={isCorrectPlayerOne ? `${playerOneName} is right!` : `${playerOneName} is wrong.`} />
                        )}
                            {multiplayerEnabled && modalAnswerPlayerTwo && (
                            <ModalAnswer message={isCorrectPlayerTwo ? `${playerTwoName} is right!` : `${playerTwoName} is wrong.`} />
                        )}
                        </div>
                    }
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
};