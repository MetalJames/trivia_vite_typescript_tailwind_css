//import { useState } from "react";
import React, { useEffect, useState } from "react";
import { mainScreen } from "../assets";
import { Link } from "react-router-dom";
//import { LenghtoftheLastWord } from "../components/LenghtoftheLastWord";
import { getTopScores } from "../firestoreService";

//implement type
interface HomeProps {
    setPlayerOneName: (name: string) => void;
    setPlayerTwoName: (name: string) => void;
    multiplayerEnabled: boolean;
    setMultiplayerEnabled: (enable: boolean) => void;
    setNumberOfQuestions: (number: number) => void;
}

interface Score {
    name: string;
    score: number;
}

const Home = (props: HomeProps) => {

    const [topScores, setTopScores] = useState<Score[]>([]);

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
            const scores = await getTopScores();
            setTopScores(scores);
        };
        fetchScores();
    })

    return (
        <div className="flex flex-col justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${mainScreen})` }}>
                {/* <LenghtoftheLastWord /> */}

            {/* firebase scores */}
            <div>
                <h1>Top Scores</h1>
                <ul>
                    {topScores.map((score, index) => (
                        <li key={index}>{score.name}: {score.score}</li>
                    ))}
                </ul>
            </div>





            <div className="flex flex-col justify-center bg-white h-full bg-opacity-70">
            <div className="flex flex-col justify-around items-center h-[70%]">
            <h1 className="text-7xl font-bold text-sky-700">Trivia Quiz Game</h1>
            <div className='flex flex-col justify-center items-center bg-white bg-opacity-90 rounded-md'>
                <div className="flex flex-col justify-around items-center w-[40vw] h-[250px]">
                    <div className="flex flex-col w-full">
                        <div className="flex justify-around">
                            {/* Player One section */}
                            <div className="w-48">
                                <h3>Player One</h3>
                                <input 
                                    type="text" 
                                    placeholder='Enter Your Name'
                                    className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md px-3 py-2"
                                    onChange={handlePlayerOneNameChange}
                                />
                            </div>
                            {/* Player Two Section */}
                            <div className="w-48">
                                <h3>Player Two</h3>
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
                    <div className="flex w-full justify-around">
                        {/* Category Section */}
                        <div className="w-52">
                            <h3>Category of Questions</h3>
                            <select name="" id="" className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md px-3 py-2 w-full">
                                <option value="Games">Games</option>
                                <option value="IT">IT</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                        {/* Question per Game Section */}
                        <div className="w-52">
                            <h3>Questions per Game</h3>
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
            </div>
        </div>
    );
}


export default Home;