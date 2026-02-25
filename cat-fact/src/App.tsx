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

  return <h1>Daily Cat Facts</h1>;
}
export default App;
