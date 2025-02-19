import { useEffect, useState } from 'react'
import { Score } from '../../types/types';
import { getTopScores10, getTopScores15, getTopScores5 } from '../../services/firestoreService';

export const TopScores = () => {
    const [topScores5, setTopScores5] = useState<Score[]>([]);
    const [topScores10, setTopScores10] = useState<Score[]>([]);
    const [topScores15, setTopScores15] = useState<Score[]>([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const scores5 = await getTopScores5();
                const scores10 = await getTopScores10();
                const scores15 = await getTopScores15();
                setTopScores5(scores5);
                setTopScores10(scores10);
                setTopScores15(scores15);
                console.log("Fetching scores...");
            } catch (error) {
                console.error("⚠️ Error fetching scores:", error);
            }
        };
        fetchScores();
    }, []);

    return (
        <div className="flex flex-col sm:flex-row justify-around  pt-5 pb-5 sm:h-[20%] h-auto w-[70%] sm:w-full m-auto">
            <div>
                <h1 className="font-bold text-sky-700 bg-white bg-opacity-70 rounded px-2 text-center">Top Scores 5 Questions</h1>
                <ul className="bg-white bg-opacity-50 text-center">
                    {topScores5.map((score, index) => (
                        <li key={index}>{score.name}: {score.score}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h1 className="font-bold text-sky-700 bg-white bg-opacity-70 rounded px-2 text-center sm:mt-0 mt-5">Top Scores 10 Questions</h1>
                <ul className="bg-white bg-opacity-50 text-center">
                    {topScores10.map((score, index) => (
                        <li key={index}>{score.name}: {score.score}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h1 className="font-bold text-sky-700 bg-white bg-opacity-70 rounded px-2 text-center sm:mt-0 mt-5">Top Scores 15 Questions</h1>
                <ul className="bg-white bg-opacity-50 text-center">
                    {topScores15.map((score, index) => (
                        <li key={index}>{score.name}: {score.score}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
};