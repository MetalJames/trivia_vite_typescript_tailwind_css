import { mainScreen } from "../assets";
import { Link } from "react-router-dom";
import useGame from "../hooks/useGame";
import { PlayerSelection, GameOptions, TopScores } from "../components/";

export const Home = () => {
    const { state, actions } = useGame();
    const { multiplayerEnabled } = state;
    const { setPlayerOneName, setPlayerTwoName, setMultiplayerEnabled, setNumberOfQuestions, setChosenCategory } = actions;

    return (
        <div className="flex flex-col justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${mainScreen})` }}>
            <div className="flex flex-col justify-center bg-white h-full bg-opacity-70">
                <div className="h-[5%] sm:h-[20%]"></div>
                <div className="flex flex-col justify-around sm:justify-between items-center h-[80%] sm:h-[60%]">
                    <h1 className="text-4xl sm:text-7xl font-bold text-sky-700">Trivia Quiz Game</h1>
                    <div className='flex flex-col justify-center items-center bg-white bg-opacity-90 rounded-md'>
                        <div className="flex flex-col justify-around items-center w-[80vw] md:w-[60vw] lg:w-[40vw] h-auto sm:h-[250px] p-5 sm:p-auto">
                            <PlayerSelection
                                multiplayerEnabled={multiplayerEnabled}
                                onPlayerOneChange={(e) => setPlayerOneName(e.target.value)}
                                onPlayerTwoChange={(e) => setPlayerTwoName(e.target.value)}
                                onMultiplayerToggle={(e) => setMultiplayerEnabled(e.target.checked)}
                            />
                            <GameOptions
                                onCategoryChange={(e) => setChosenCategory(e.target.value)}
                                onQuestionCountChange={(value) => setNumberOfQuestions(value)}
                            />
                        </div>
                    </div>
                    <Link to="game">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
                        >
                            Start the Game
                        </button>
                    </Link>
                </div>
                <TopScores />
            </div>
        </div>
    );
};