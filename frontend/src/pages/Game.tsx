import QuestionsList from "../components/QuestionsList";

type GameStuff = {
    questions: Question[];
    playerOneName: string;
    playerTwoName: string;
    multiplayerEnabled: boolean;
};

type Question = {
    QuestionID: string;
    Question: string;
}

const Game = (props: GameStuff) => {

    const { questions,playerOneName, playerTwoName, multiplayerEnabled } = props;

    return (
        <div>
            <div>
                <h1>{playerOneName}</h1>
                {multiplayerEnabled && <h2>{playerTwoName}</h2>}
            </div>
            <QuestionsList questions={questions} />
        </div>
    );
}

export default Game;