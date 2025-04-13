import React, { useEffect, useState } from 'react';
import { generateGrid } from '../utils/generateGrid';
import Card from './Card';

export default function GameBoard() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    setCards(generateGrid());
  }, []);

  const handleClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, first, second]);
      }

      setTimeout(() => {
        setFlipped([]);
      }, 1000);
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 80px)',
        gap: '10px',
        justifyContent: 'center',
        paddingTop: '20px'
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
  );
}
