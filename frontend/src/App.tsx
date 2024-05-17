import React, { useEffect, useState } from "react";
import QuestionsList from "./components/QuestionsList";
import { fetchFromAPI, BASE_URL } from "./fetchMongo";

interface Question {
  QuestionID: string;
  Question: string;
}

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

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
    <div className="App">
      <QuestionsList questions={questions} />
    </div>
  );
};

export default App;
