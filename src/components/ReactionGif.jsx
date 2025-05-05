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
      },
      win: {
        gif: matchGif,
        message: "🎉 Congratulations! You matched all the fruits!"
      },
};

export default function ReactionGif({ gameState }) {
    const feedback = feedbackMap[gameState]
  return (
    <div style={{ width: '250px', height: '250px', marginTop: '50px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={feedback.gif}
        alt={gameState}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      <h3 style={feedback.message === "Waiting for your move..." ? { marginTop: '10px', color: 'black', whiteSpace: 'nowrap'} : 
      feedback.message === "😬 Not Matched!" ? { marginTop: '10px', color: 'red', whiteSpace: 'nowrap'} : { marginTop: '10px', color: 'green', whiteSpace: 'nowrap'}}> {feedback.message} </h3>
    </div>
  );
}
