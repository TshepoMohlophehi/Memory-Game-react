import React, { useState } from "react";
import Card from "./Card";

const emojis = ["🐶", "🐱", "🐰", "🐼", "🦊", "🐸"];
const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

const Board = () => {
  const [flippedCards, setFlippedCards] = useState([]);

  const handleCardClick = (index) => {
    if (flippedCards.length < 2) {
      setFlippedCards([...flippedCards, index]);
    }
  };

  return (
    <div
      data-testid="game-board"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        width: "220px",
      }}
    >
      {shuffledEmojis.map((emoji, index) => (
        <Card
          key={index}
          emoji={emoji}
          isFlipped={flippedCards.includes(index)}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
