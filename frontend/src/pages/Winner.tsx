import { Link, useLocation } from "react-router-dom";
import { addScore5, addScore10, addScore15 } from "../firestoreService";

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
        if(numberOfQuestions == 5) {
            if(multiplayerEnabled) {
                addScore5(playerOneName, playerOneScore);
                addScore5(playerTwoName, playerTwoScore);
            } else {
                addScore5(playerOneName, playerOneScore);
            }
        } else if (numberOfQuestions == 10) {
            if(multiplayerEnabled) {
                addScore10(playerOneName, playerOneScore);
                addScore10(playerTwoName, playerTwoScore);
            } else {
                addScore10(playerOneName, playerOneScore);
            }
        } else {
            if(multiplayerEnabled) {
                addScore15(playerOneName, playerOneScore);
                addScore15(playerTwoName, playerTwoScore);
            } else {
                addScore15(playerOneName, playerOneScore);
            }
        }
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center">
            <h1 className="text-4xl font-bold mb-4">Game Over</h1>
            {multiplayerEnabled ? (
                <div>
                    <p>{playerOneName}: {playerOneScore}</p>
                    <p>{playerTwoName}: {playerTwoScore}</p>
                    <h2 className="text-2xl mt-4">{winner === 'It\'s a tie!' ? winner : `Winner: ${winner}`}</h2>
                </div>
            ) : (
                <div>
                    <p>{playerOneName}'s Score: {playerOneScore}</p>
                    <h2 className="text-2xl mt-4">Your Score: {playerOneScore}</h2>
                </div>
            )}
            <Link to="/">
                <button onClick={handleHomeClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
                    Home
                </button>
            </Link>
        </div>
    )
}

export default Winner