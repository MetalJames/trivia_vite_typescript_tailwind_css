import { useMemo, useState } from "react";
import QuestionComponent from "../components/QuestionComponent";

import { Question } from "../types/types";

type GameStuff = {
    questions: Question[];
    playerOneName: string;
    playerTwoName: string;
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

    const { questions, playerOneName, playerTwoName, multiplayerEnabled, numberOfQuestions } = props;

    const [currentQuestionIndexPlayerOne, setCurrentQuestionIndexPlayerOne] = useState(0);
    const [currentQuestionIndexPlayerTwo, setCurrentQuestionIndexPlayerTwo] = useState(0);
    const [playerOneScore, setPlayerOneScrore] = useState(0);
    const [playerTwoScore, setPlayerTwoScrore] = useState(0);

    const [playerOneQuestions, playerTwoQuestions] = useMemo(() => {
        const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
        const playerOneQuestions = shuffledQuestions.slice(0, numberOfQuestions);
        const playerTwoQuestions = shuffledQuestions.slice(numberOfQuestions, numberOfQuestions *2);
        return [playerOneQuestions, playerTwoQuestions];
    }, [questions, numberOfQuestions]);

    const handleAnswerPlayerOne = (selectedAnswer: string) => {
        const currentQuestionPlayerOne = playerOneQuestions[currentQuestionIndexPlayerOne];
        if(currentQuestionPlayerOne.CorrectAnswer == selectedAnswer) {
            setPlayerOneScrore(playerOneScore + 1);
        }
        setCurrentQuestionIndexPlayerOne(currentQuestionIndexPlayerOne + 1);
    };

    const handleAnswerPlayerTwo = (selectedAnswer: string) => {
        const currentQuestionPlayerTwo = playerTwoQuestions[currentQuestionIndexPlayerTwo];
        if(currentQuestionPlayerTwo.CorrectAnswer == selectedAnswer) {
            setPlayerTwoScrore(playerTwoScore + 1);
        }
        setCurrentQuestionIndexPlayerTwo(currentQuestionIndexPlayerTwo + 1);
    };

    const currentPlayerOneQuestion = playerOneQuestions[currentQuestionIndexPlayerOne];
    const currentPlayerTwoQuestion = multiplayerEnabled ? playerTwoQuestions[currentQuestionIndexPlayerTwo] : null;

    return (
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
    );
}

export default Game;