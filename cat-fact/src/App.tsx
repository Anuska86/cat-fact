import "./App.css";
import toast from "react-hot-toast";

import catLogo from "./assets/logo.png";

import { useState } from "react";
import type { CatFact } from "./types";

function App() {
  const [catData, setCatData] = useState<CatFact | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Data fetch

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

  //Copy Clipbboard

  const copyToClipboard = async () => {
    if (catData?.fact) {
      try {
        await navigator.clipboard.writeText(catData.fact);
        toast.success("Fact copied to clipboard!", {
          style: {
            border: "2px solid var(--color-teal)",
            padding: "16px",
            color: "var(--text-main)",
            background: "var(--color-cream)",
          },
          iconTheme: {
            primary: "var(--color-teal)",
            secondary: "#FFFAEE",
          },
        });
      } catch (error) {
        toast.error("Could not copy fact.");
      }
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
        <button className="copy-btn" onClick={copyToClipboard}>
          📋 Copy
        </button>
      </div>
    </div>
  );
}
export default App;
