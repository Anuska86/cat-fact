import "./App.css";

import { useState } from "react";
import type { CatFact } from "./types";

function App() {
  const [catData, setCatData] = useState<CatFact | null>(null);

  const fetchFact = async () => {
    try {
      const response = await fetch("https://catfact.ninja/fact");
      const data: CatFact = await response.json();
      setCatData(data);
    } catch (error) {
      console.error("Error fetching the cat fact:", error);
    }
  };

  return (
    <div className="app-div">
      <h1>Daily Cat Facts</h1>

      <div className="fact-card">
        <button onClick={fetchFact}>Get a New Cat Fact</button>
        {catData ? (
          <p className="fact-text">{catData.fact}</p>
        ) : (
          <p>Click the button if you want to know something funny about cats</p>
        )}
      </div>
    </div>
  );
}
export default App;
