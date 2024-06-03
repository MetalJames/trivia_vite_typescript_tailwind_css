import { Link, useLocation } from "react-router-dom";
// Updating Solo Game Score to FireBase
import { addScore5, addScore10, addScore15 } from "../firestoreService";
import { winnerScreen } from "../assets";
// Getting types
import { GameStuffWinnerScreen } from "../types/types";

type ResetAll = {
    resetAll: () => void;
}

const Winner = (props: ResetAll) => {

    const { resetAll } = props;

    const location = useLocation();

    const { playerOneName, playerTwoName, playerOneScore, playerTwoScore, multiplayerEnabled, numberOfQuestions } = location.state as GameStuffWinnerScreen;

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
        <div className="flex flex-col items-center h-screen justify-center bg-[length:1500px_1500px] sm:bg-cover bg-[center_top_-21rem] sm:bg-center "
            style={{ backgroundImage: `url(${winnerScreen})` }}>
            <div className="flex flex-col items-center justify-around bg-white bg-opacity-70 h-full w-full">
                <h1 className="text-4xl sm:text-6xl font-bold text-sky-700 h-[10%]">Trivia Quiz Game</h1>
                {multiplayerEnabled ? (
                    <div className="flex flex-col items-center justify-between h-[30%]">
                        <div className="flex flex-col h-[30%] justify-between items-center">
                            <h1 className="text-2xl font-bold text-sky-700">{playerOneName} - Your Score: {playerOneScore}</h1>
                            <h1 className="text-2xl font-bold text-sky-700">{playerTwoName} - Your Score: {playerTwoScore}</h1>
                        </div>
                        <div className="flex flex-col h-[70%] justify-center items-center">
                            <h1 className="text-4xl sm:text-7xl font-bold text-sky-700 opacity-20">CONGRATULATION!</h1>
                            <h2 className="text-xl sm:text-5xl font-bold text-sky-700 mt-4">{winner === 'It\'s a tie!' ? winner : `Winner: ${winner}`}</h2>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-between h-[20%]">
                        <div className="flex flex-col h-[20%] justify-center items-center">
                            <h1 className="text-3xl sm:text-4xl font-bold text-sky-700">You Win</h1>
                            <h1 className="sm:text-3xl font-bold text-sky-700">{playerOneName}</h1>
                            <h2 className="text-2xl mt-4 font-bold text-sky-700">Your Score: {playerOneScore}</h2>
                        </div>
                        <div className="flex h-[30%] justify-center items-start">
                            <h1 className="text-4xl sm:text-7xl font-bold text-sky-700 opacity-20">CONGRATULATION!</h1>
                        </div>
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