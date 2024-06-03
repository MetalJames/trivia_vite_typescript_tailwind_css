import { Link, useLocation } from "react-router-dom";
import { addScore5, addScore10, addScore15 } from "../firestoreService";
import { winnerScreen } from "../assets";

type GameStuff = {
    playerOneName: string;
    playerTwoName: string;
    playerOneScore: number;
    playerTwoScore: number;
    multiplayerEnabled: boolean;
    numberOfQuestions: number;
};

type ResetAll = {
    resetAll: () => void;
}

const Winner = (props: ResetAll) => {

    const { resetAll } = props;

    const location = useLocation();

    const { playerOneName, playerTwoName, playerOneScore, playerTwoScore, multiplayerEnabled, numberOfQuestions } = location.state as GameStuff;

    const winner = playerOneScore > playerTwoScore ? playerOneName : playerOneScore < playerTwoScore ? playerTwoName : 'It\'s a tie';

    const handleHomeClick = () => {
        resetAll();
        if (!multiplayerEnabled) {
            if (numberOfQuestions === 5) {
                addScore5(playerOneName, playerOneScore);
            } else if (numberOfQuestions === 10) {
                addScore10(playerOneName, playerOneScore);
            } else if (numberOfQuestions === 15) {
                addScore15(playerOneName, playerOneScore);
            }
        }
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-cover bg-[center_top_74rem]"
            style={{ backgroundImage: `url(${winnerScreen})` }}>
            <div className="flex flex-col items-center justify-around bg-white bg-opacity-70 h-full w-full">
                <h1 className="text-xl sm:text-5xl font-bold text-sky-700 h-[10%]">Trivia Quiz Game</h1>
                {multiplayerEnabled ? (
                    <div>
                        <p>{playerOneName}: {playerOneScore}</p>
                        <p>{playerTwoName}: {playerTwoScore}</p>
                        <h2 className="text-2xl mt-4">{winner === 'It\'s a tie!' ? winner : `Winner: ${winner}`}</h2>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-around h-[70%]">
                        <h1 className="text-3xl font-bold">Winner: {playerOneName}</h1>
                        <h1 className="text-xl sm:text-7xl font-bold text-sky-700 opacity-20">CONGRATULATION!</h1>
                        <h2 className="text-2xl mt-4">Your Score: {playerOneScore}</h2>
                    </div>
                )}
                <Link to="/">
                    <button onClick={handleHomeClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
                        Home
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Winner