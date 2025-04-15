import React from 'react';
import waitingGif from '../assets/waitReaction.gif';
import matchGif from '../assets/winReaction.gif';
import noMatchGif from '../assets/loseReaction.gif';

const feedbackMap = {
    waiting: {
        gif: waitingGif,
        message: "Waiting for your move..."
      },
      match: {
        gif: matchGif,
        message: "🎉🎉🎉🎉🎉🎉 Matched!"
      },
      'no-match': {
        gif: noMatchGif,
        message: "😬 Not Matched!"
      }
};

export default function ReactionGif({ gameState }) {
    const feedback = feedbackMap[gameState]
  return (
    <div style={{ width: '250px', height: '250px', marginTop: '50px'}}>
      <img
        src={feedback.gif}
        alt={gameState}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      <h3 style={{ marginTop: '10px', color: 'green', whiteSpace: 'nowrap'}}> {feedback.message} </h3>
    </div>
  );
}
