import React, { useEffect, useState } from "react";
import { fetchFromAPI, BASE_URL } from "./fetchMongo";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { BrowserRouter, Route, Routes } from "react-router-dom";

interface Question {
  QuestionID: string;
  Question: string;
}

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [playerOneName, setPlayerOneName] = useState('Player One');
  const [playerTwoName, setPlayerTwoName] = useState('Player Two');
  const [multiplayerEnabled, setMultiplayerEnabled] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

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
                multiplayerEnabled={multiplayerEnabled} 
                questions={questions} 
                numberOfQuestions={numberOfQuestions}
              />}
            />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
