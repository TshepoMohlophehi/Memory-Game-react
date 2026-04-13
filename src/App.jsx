import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import ReactionGif from "./components/ReactionGif";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState("waiting");

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-badge">✦ Memory Challenge ✦</div>
        <h1 className="app-title">
          <span className="title-icon">🧠</span> Brain Flip
        </h1>
        <p className="app-subtitle">Match all the pairs to win!</p>
      </header>

      <main className="app-main">
        <GameBoard setGameState={setGameState} />
        <ReactionGif gameState={gameState} />
      </main>
    </div>
  );
}

export default App;