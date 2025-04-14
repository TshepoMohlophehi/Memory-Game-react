import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import ReactionGif from './components/ReactionGif';

function App() {
  const [gameState, setGameState] = useState('waiting');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #74ebd5, #acb6e5)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
        fontWeight: 'bold',
        boxSizing: 'border-box'
      }}
    >
      <h1 style={{ color: '#4CAF50', textAlign: 'center', marginBottom: '40px' }}>
        Memory Game
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '40px',
          flexWrap: 'wrap'
        }}
      >
        <GameBoard setGameState={setGameState} />
        <ReactionGif gameState={gameState} />
      </div>
    </div>
  );
}

export default App;
