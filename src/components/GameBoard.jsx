import { useEffect, useState } from "react";
import { generateGrid } from "../utils/generateGrid";
import Card from "./Card";
import "./GameBoard.css";

export default function GameBoard({ setGameState }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [moves, setMoves] = useState(0);

  const isGameWon = matched.length === cards.length && cards.length > 0;

  useEffect(() => {
    setCards(generateGrid());
  }, []);

  useEffect(() => {
    if (isGameWon) setGameState("win");
  }, [isGameWon, setGameState]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      const isMatch = cards[first] === cards[second];
      const timeoutId = setTimeout(() => {
        if (isMatch) {
          setMatched((prev) => [...prev, first, second]);
          setGameState("match");
        } else {
          setGameState("no-match");
        }
        setFlipped([]);
      }, 1200);
      return () => clearTimeout(timeoutId);
    }
  }, [flipped, cards, setGameState]);

  const handleClick = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index) ||
      isGameWon
    )
      return;
    setHasStarted(true);
    if (flipped.length === 0) setGameState("waiting");
    setFlipped((prev) => [...prev, index]);
    if (flipped.length === 1) setMoves((m) => m + 1);
  };

  const resetGame = () => {
    setFlipped([]);
    setMatched([]);
    setCards(generateGrid());
    setGameState("waiting");
    setHasStarted(false);
    setMoves(0);
  };

  const pairsFound = matched.length / 2;
  const totalPairs = cards.length / 2;

  return (
    <div className="gameboard">
      {/* Stats bar */}
      <div className="gameboard-stats">
        <div className="stat-chip">
          <span className="stat-label">Pairs</span>
          <span className="stat-value">{pairsFound} / {totalPairs}</span>
        </div>
        <div className="stat-chip">
          <span className="stat-label">Moves</span>
          <span className="stat-value">{moves}</span>
        </div>
      </div>

      {/* Win banner */}
      {isGameWon && (
        <div className="win-banner">
          <span className="win-emoji">🎉</span>
          <span>You did it in <strong>{moves}</strong> moves!</span>
        </div>
      )}

      {/* Progress bar */}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: cards.length > 0 ? `${(matched.length / cards.length) * 100}%` : "0%" }}
        />
      </div>

      {/* Card grid */}
      <div className="card-grid">
        {cards.map((emoji, index) => (
          <Card
            key={index}
            emoji={emoji}
            isFlipped={flipped.includes(index) || matched.includes(index)}
            isMatched={matched.includes(index)}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="gameboard-actions">
        {!hasStarted ? (
          <button className="btn btn-primary" onClick={resetGame} data-testid="restart-button">
            Start Game 🚀
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={resetGame} data-testid="restart-button">
            {isGameWon ? "Play Again 🎉" : "Restart 🔄"}
          </button>
        )}
      </div>
    </div>
  );
}