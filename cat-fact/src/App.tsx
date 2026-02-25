import "./App.css";

import catLogo from "./assets/logo.png";

import { useState } from "react";
import type { CatFact } from "./types";

function App() {
  const [catData, setCatData] = useState<CatFact | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchFact = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("https://catfact.ninja/fact");
      const data: CatFact = await response.json();
      setCatData(data);
    } catch (error) {
      console.error("Error fetching the cat fact:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-div">
      <img src={catLogo} className="logo" alt="Cute cat logo" />

      <h1>Daily Cat Facts</h1>

      <div className="fact-card">
        <button onClick={fetchFact} disabled={isLoading}>
          {isLoading ? "Fetching a new cat fact..." : "Get a new cat fact"}
        </button>

        {catData ? (
          <p className="fact-text">{catData.fact}</p>
        ) : (
          <p>
            {isLoading
              ? "Finding the best cat fact..."
              : "Click the button to get a cat fact!"}
          </p>
        )}
      </div>
    </div>
  );
}
export default App;
