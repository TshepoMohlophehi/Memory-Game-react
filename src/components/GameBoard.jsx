import { useEffect, useState } from "react";
import { generateGrid } from "../utils/generateGrid";
import Card from "./Card";

export default function GameBoard({ setGameState }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    setCards(generateGrid());
  }, []);

  const handleClick = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index) ||
      showCongrats
    )
      return;

    if (flipped.length === 0) setGameState("waiting");

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;

      if (cards[first] === cards[second]) {
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setGameState("match");

        setTimeout(() => {
          setFlipped([]);
          if (newMatched.length === cards.length) {
            setShowCongrats(true);
            setTimeout(() => {
              setShowCongrats(false);
              setMatched([]);
              setFlipped([]);
              setCards(generateGrid());
              setGameState("waiting");
            }, 3000);
          } else {
            setGameState("waiting");
          }
        }, 2000);
      } else {
        setGameState("no-match");

        setTimeout(() => {
          setFlipped([]);
          setGameState("waiting");
        }, 2000);
      }
    }
  };

  const resetGame = () => {
    setFlipped([]);
    setMatched([]);
    setCards(generateGrid());
    setShowCongrats(false);
    setGameState("waiting");
  };

  return (
    <>
      {showCongrats && (
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#2e7d32",
            marginBottom: "20px",
          }}
        >
          {setGameState("win")};
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 80px)",
          gap: "10px",
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

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <button
          onClick={resetGame}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          data-testid="restart-button"
        >
          Restart Game 🔄
        </button>
      </div>
    </>
  );
}
