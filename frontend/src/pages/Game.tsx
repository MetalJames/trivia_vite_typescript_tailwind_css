import { useMemo } from "react";
import QuestionsList from "../components/QuestionsList";

type GameStuff = {
    questions: Question[];
    playerOneName: string;
    playerTwoName: string;
    multiplayerEnabled: boolean;
    numberOfQuestions: number;
};

type Question = {
    QuestionID: string;
    Question: string;
}

const Game = (props: GameStuff) => {

    const { questions, playerOneName, playerTwoName, multiplayerEnabled, numberOfQuestions } = props;

    const [playerOneQuestions, playerTwoQuestions] = useMemo(() => {
        const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
        const playerOneQuestions = shuffledQuestions.slice(0, numberOfQuestions);
        const playerTwoQuestions = shuffledQuestions.slice(numberOfQuestions, numberOfQuestions *2);
        return [playerOneQuestions, playerTwoQuestions];
    }, [questions, numberOfQuestions]);

    return (
        <div className="flex justify-around items-center h-screen">
            {/* player one section */}
            <div>
                <h1>{playerOneName}</h1>
                <QuestionsList questions={playerOneQuestions} />
            </div>
            {/* player two section */}
            <div>
                {multiplayerEnabled && <h2>{playerTwoName}</h2>}
                <QuestionsList questions={playerTwoQuestions} />
            </div>
        </div>
    );
}

export default Game;