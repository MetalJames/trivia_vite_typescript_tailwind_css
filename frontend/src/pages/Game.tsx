import { useMemo, useState } from "react";
import QuestionComponent from "../components/QuestionComponent";

type GameStuff = {
    questions: Question[];
    playerOneName: string;
    playerTwoName: string;
    multiplayerEnabled: boolean;
    numberOfQuestions: number;
};

type Question = {
    _id: string;
    QuestionID: string;
    Question: string;
    AnswerOne: string;
    AnswerTwo: string;
    AnswerThree: string;
    AnswerFour: string;
    CorrectAnswer: string;
}

const Game = (props: GameStuff) => {

    const { questions, playerOneName, playerTwoName, multiplayerEnabled, numberOfQuestions } = props;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScrore] = useState(0);

    const [playerOneQuestions, playerTwoQuestions] = useMemo(() => {
        const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
        const playerOneQuestions = shuffledQuestions.slice(0, numberOfQuestions);
        const playerTwoQuestions = shuffledQuestions.slice(numberOfQuestions, numberOfQuestions *2);
        return [playerOneQuestions, playerTwoQuestions];
    }, [questions, numberOfQuestions]);

    const handleAnswer = (selectedAnswer: string) => {
        const currentQuestion = playerOneQuestions[currentQuestionIndex];
        if(currentQuestion.CorrectAnswer == selectedAnswer) {
            setScrore(score + 1)
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const currentPlayerOneQuestion = playerOneQuestions[currentQuestionIndex];
    const currentPlayerTwoQuestion = multiplayerEnabled ? playerTwoQuestions[currentQuestionIndex] : null;

    return (
<div className="flex justify-around items-center h-screen">
            <div>
                <h1>{playerOneName}</h1>
                <p>Your Score: {score}</p>
                {currentPlayerOneQuestion ? (
                    <QuestionComponent
                        question={currentPlayerOneQuestion}
                        onAnswer={handleAnswer}
                    />
                ) : (
                    <p>No more questions</p>
                )}
            </div>
            {multiplayerEnabled && (
                <div>
                    <h2>{playerTwoName}</h2>
                    {currentPlayerTwoQuestion ? (
                        <QuestionComponent
                            question={currentPlayerTwoQuestion}
                            onAnswer={handleAnswer}
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