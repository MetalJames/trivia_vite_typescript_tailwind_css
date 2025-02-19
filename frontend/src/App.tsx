import { useCallback, useEffect, useState } from "react";
import { fetchFromAPI, BASE_URL } from "./services/fetchMongo";
import useGame from "./hooks/useGame";
import { AppRoutes } from "./routes";
import { ErrorBoundary } from "./components/";

const App = () => {

  const { actions } = useGame();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchFromAPI(BASE_URL);
      actions.setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  }, [actions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
};

export default App;