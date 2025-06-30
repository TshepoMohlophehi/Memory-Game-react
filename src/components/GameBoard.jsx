import { useEffect, useState } from "react";
import { generateGrid } from "../utils/generateGrid";
import Card from "./Card";

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "20px",
};

const congratsStyle = {
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#2e7d32",
  marginBottom: "20px",
};

export default function GameBoard({ setGameState }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);

  const isGameWon = matched.length === cards.length && cards.length > 0;

  useEffect(() => {
    setCards(generateGrid());
  }, []);

  useEffect(() => {
    if (isGameWon) {
      setGameState("win");
    }
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
      }, 2000);

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
  };

  const resetGame = () => {
    setFlipped([]);
    setMatched([]);
    setCards(generateGrid());
    setGameState("waiting");
    setHasStarted(false);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      {isGameWon && (
        <div style={congratsStyle}>
          🎉 Congratulations! You matched all the fruits!
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 5rem)",
          gap: "0.5rem",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        {cards.map((emoji, index) => (
          <Card
            key={index}
            emoji={emoji}
            isFlipped={flipped.includes(index) || matched.includes(index)}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      {hasStarted && (
        <button
          onClick={resetGame}
          style={buttonStyle}
          data-testid="restart-button"
        >
          {isGameWon ? "Play Again! 🎉" : "Restart Game 🔄"}
        </button>
      )}
    </div>
  );
}
