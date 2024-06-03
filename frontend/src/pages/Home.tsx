import React, { useEffect, useState } from "react";
import { mainScreen } from "../assets";
import { Link } from "react-router-dom";
import { getTopScores5, getTopScores10, getTopScores15 } from "../firestoreService";

//implement type
type HomeProps = {
    setPlayerOneName: (name: string) => void;
    setPlayerTwoName: (name: string) => void;
    multiplayerEnabled: boolean;
    setMultiplayerEnabled: (enable: boolean) => void;
    setNumberOfQuestions: (number: number) => void;
}

type Score = {
    name: string;
    score: number;
}

const Home = (props: HomeProps) => {

    const [topScores5, setTopScores5] = useState<Score[]>([]);
    const [topScores10, setTopScores10] = useState<Score[]>([]);
    const [topScores15, setTopScores15] = useState<Score[]>([]);
    
    const { setPlayerOneName, setPlayerTwoName, setMultiplayerEnabled, multiplayerEnabled, setNumberOfQuestions } = props;

    const handlePlayerOneNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerOneName(event.target.value);
    }

    const handlePlayerTwoNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerTwoName(event.target.value);
    }

    const handleMultiplayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMultiplayerEnabled(event.target.checked);
    };

    const  handleNumberOfQuestionsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNumberOfQuestions(parseInt(event.target.value, 10));
    }

    useEffect(() => {
        const fetchScores = async () => {
            const scores5 = await getTopScores5();
            const scores10 = await getTopScores10();
            const scores15 = await getTopScores15();
            setTopScores5(scores5);
            setTopScores10(scores10);
            setTopScores15(scores15);
        };
        fetchScores();
    })

    return (
        <div className="flex flex-col justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${mainScreen})` }}>
            <div className="flex flex-col justify-center bg-white h-full bg-opacity-70">
                <div className="h-[5%] sm:h-[20%]"></div>
                <div className="flex flex-col justify-around sm:justify-between items-center h-[80%] sm:h-[60%]">
                    <h1 className="text-4xl sm:text-7xl font-bold text-sky-700">Trivia Quiz Game</h1>
                    <div className='flex flex-col justify-center items-center bg-white bg-opacity-90 rounded-md'>
                        <div className="flex flex-col justify-around items-center w-[80vw] sm:w-[40vw] h-auto sm:h-[250px] p-5 sm:p-auto">
                            <div className="flex flex-col w-full pb-5 sm:pb-0">
                                <div className="flex flex-col sm:flex-row justify-around items-center">
                                    {/* Player One section */}
                                    <div className="w-48">
                                        <h3 className="pb-1">Player One</h3>
                                        <input 
                                            type="text" 
                                            placeholder='Enter Your Name'
                                            className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md px-3 py-2"
                                            onChange={handlePlayerOneNameChange}
                                        />
                                    </div>
                                    {/* Player Two Section */}
                                    <div className="w-48">
                                        <h3 className="pb-1">Player Two</h3>
                                        <input 
                                            type="text" 
                                            placeholder='Enter Your Name'
                                            className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md px-3 py-2"
                                            disabled={!multiplayerEnabled}
                                            onChange={handlePlayerTwoNameChange}
                                        />
                                    </div>
                                </div>
                                {/* Multiplayer Checkbox Section */}
                                <div className="flex justify-center mt-4">
                                    <input 
                                        type="checkbox" 
                                        name="multiplayer" 
                                        id="multiplayerCheckbox" 
                                        className="mr-4"
                                        onChange={handleMultiplayerChange}
                                    />
                                    <label htmlFor="multiplayerCheckbox">Multiplayer</label>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row w-full justify-around items-center">
                                {/* Category Section */}
                                <div className="w-52">
                                    <h3 className="pb-1">Category of Questions</h3>
                                    <select name="" id="" className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md px-3 py-2 w-full">
                                        <option value="Games">Games</option>
                                        <option value="IT">IT</option>
                                        <option value="General">General</option>
                                    </select>
                                </div>
                                {/* Question per Game Section */}
                                <div className="w-52">
                                    <h3 className="pb-1">Questions per Game</h3>
                                    <select 
                                        name="numberOfQuestions" 
                                        id="numberOfQuestions" 
                                        className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md px-3 py-2 w-full"
                                        onChange={handleNumberOfQuestionsChange}
                                    >
                                        <option value="5">5 Questions</option>
                                        <option value="10">10 Questions</option>
                                        <option value="15">15 Questions</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Start Button */}
                    <Link to="game">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
                        >
                            Start the Game
                        </button>
                    </Link>
                </div>
                {/* firebase scores */}
                <div className="flex flex-col sm:flex-row justify-around  pt-5 h-[20%] w-[70%] sm:w-full m-auto">
                    {/* Top Scores 5 Questions */}
                    <div>
                        <h1 className="font-bold text-sky-700 bg-white bg-opacity-70 rounded px-2 text-center">Top Scores 5 Questions</h1>
                        <ul>
                            {topScores5.map((score, index) => (
                                <li key={index}>{score.name}: {score.score}</li>
                            ))}
                        </ul>
                    </div>
                    {/* Top Scores 10 Questions */}
                    <div>
                        <h1 className="font-bold text-sky-700 bg-white bg-opacity-70 rounded px-2 text-center">Top Scores 10 Questions</h1>
                        <ul>
                            {topScores10.map((score, index) => (
                                <li key={index}>{score.name}: {score.score}</li>
                            ))}
                        </ul>
                    </div>
                    {/* Top Scores 15 Questions */}
                    <div>
                        <h1 className="font-bold text-sky-700 bg-white bg-opacity-70 rounded px-2 text-center">Top Scores 15 Questions</h1>
                        <ul>
                            {topScores15.map((score, index) => (
                                <li key={index}>{score.name}: {score.score}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Home;