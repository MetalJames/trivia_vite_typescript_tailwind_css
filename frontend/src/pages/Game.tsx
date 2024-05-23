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

    const selectedQuestions = useMemo(() => {
        const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
        return shuffledQuestions.slice(0, numberOfQuestions);
    }, [questions, numberOfQuestions]);

    return (
        <div className="flex justify-around items-center h-screen">
            {/* player one section */}
            <div>
                <h1>{playerOneName}</h1>
                <QuestionsList questions={selectedQuestions} />
            </div>
            {/* player two section */}
            <div>
                {multiplayerEnabled && <h2>{playerTwoName}</h2>}
                <QuestionsList questions={selectedQuestions} />
            </div>
        </div>
    );
}

export default Game;