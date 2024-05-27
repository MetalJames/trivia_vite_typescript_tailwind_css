import { Link, useLocation } from "react-router-dom";

type GameStuff = {
    playerOneName: string;
    playerTwoName: string;
    playerOneScore: number;
    playerTwoScore: number;
    multiplayerEnabled: boolean;
};

const Winner = () => {

    const location = useLocation();

    const { playerOneName, playerTwoName, playerOneScore, playerTwoScore, multiplayerEnabled } = location.state as GameStuff;

    const winner = playerOneScore > playerTwoScore ? playerOneName : playerOneScore < playerTwoScore ? playerTwoName : 'It\'s a tie';

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
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
                    Home
                </button>
            </Link>
        </div>
    )
}

export default Winner