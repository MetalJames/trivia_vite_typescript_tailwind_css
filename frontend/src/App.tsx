import React, { useEffect, useState } from "react";
// Fetching MongoDB
import { fetchFromAPI, BASE_URL } from "./fetchMongo";
import { Home, Game, Winner } from "./pages"
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Getting types
import { CategoryOfQuestions } from "./types/types";
import ErrorBoundary from "./components/ErroAppOnRender";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<CategoryOfQuestions[]>([]);
  const [chosenCategory, setChosenCategory] = useState('General');
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
    setChosenCategory('General');
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
                setChosenCategory={setChosenCategory}
              />}
            />
          <Route 
            path="game" 
            element={
              <ErrorBoundary>
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
                  chosenCategory={chosenCategory}
                  resetAll={resetAll}
                />
              </ErrorBoundary>
              }
            />
            <Route 
            path="winner" 
            element={
              <Winner 
                resetAll={resetAll}
              />}
            />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
