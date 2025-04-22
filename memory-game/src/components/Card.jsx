import React from 'react';

export default function Card({ emoji, isFlipped, onClick }) {
  return (
    <div
      className="card"
      role="button"
      onClick={onClick}
      style={{
        width: '80px',
        height: '80px',
        fontSize: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ccc',
        backgroundColor: isFlipped ? '#fff' : '#eee',
        cursor: 'pointer'
      }}
    >
      {isFlipped ? emoji : ' '}
    </div>
  );
}
