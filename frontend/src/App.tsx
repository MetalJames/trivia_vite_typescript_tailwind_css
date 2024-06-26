import React, { useEffect } from "react";
// Fetching MongoDB
import { fetchFromAPI, BASE_URL } from "./fetchMongo";
import { Home, Game, Winner } from "./pages"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErroAppOnRender";
import { GameProvider } from "./context/GameContext";
import useGame from "./hooks/useGame";

const RootApp: React.FC = () => (
  <GameProvider>
    <App />
  </GameProvider>
);

const App: React.FC = () => {

  const { questions, setQuestions } = useGame();

  console.log(questions)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFromAPI(BASE_URL);
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    setTimeout(fetchData, 500);
  }, [setQuestions]);

  if (!questions.length) return <h1>Loading...</h1>;
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <Home />}
          />
        <Route 
          path="game" 
          element={
            <ErrorBoundary>
              <Game 
                />
            </ErrorBoundary>
            }
          />
          <Route 
          path="winner" 
          element={
            <Winner />}
          />
      </Routes>
    </BrowserRouter>
  );
};

export default RootApp;
