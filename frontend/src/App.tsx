import React, { useEffect, useState } from "react";
import { fetchFromAPI, BASE_URL } from "./fetchMongo";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Winner from "./pages/Winner"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Question } from "./types/types";

// interface Question {
//   QuestionID: string;
//   Question: string;
// }

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [playerOneName, setPlayerOneName] = useState('Player One');
  const [playerTwoName, setPlayerTwoName] = useState('Player Two');
  const [playerOneScore, setPlayerOneScrore] = useState(0);
  const [playerTwoScore, setPlayerTwoScrore] = useState(0);
  const [multiplayerEnabled, setMultiplayerEnabled] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const resetAll = () => {
    setPlayerOneName('Player One');
    setPlayerTwoName('Player Two');
    setPlayerOneScrore(0);
    setPlayerTwoScrore(0);
    setMultiplayerEnabled(false);
    setNumberOfQuestions(5);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFromAPI(BASE_URL);
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                setPlayerOneName={setPlayerOneName} 
                setPlayerTwoName={setPlayerTwoName} 
                setMultiplayerEnabled={setMultiplayerEnabled} 
                multiplayerEnabled={multiplayerEnabled}
                setNumberOfQuestions={setNumberOfQuestions}
              />}
            />
          <Route 
            path="game" 
            element={
              <Game 
                playerOneName={playerOneName} 
                playerTwoName={playerTwoName} 
                playerOneScore={playerOneScore} 
                playerTwoScore={playerTwoScore} 
                setPlayerOneScore={setPlayerOneScrore}
                setPlayerTwoScore={setPlayerTwoScrore}
                multiplayerEnabled={multiplayerEnabled} 
                questions={questions} 
                numberOfQuestions={numberOfQuestions}
                resetAll={resetAll}
              />}
            />
            <Route 
            path="winner" 
            element={
              <Winner 
                //playerOneName={playerOneName} 
                //playerTwoName={playerTwoName}
                //playerOneScore ={playerOneScore}
                //playerTwoScore={playerTwoScore}
                //multiplayerEnabled={multiplayerEnabled}
                resetAll={resetAll}
              />}
            />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
