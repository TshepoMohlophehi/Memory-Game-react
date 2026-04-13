import waitingGif from "../assets/waitReaction.gif";
import matchGif from "../assets/winReaction.gif";
import noMatchGif from "../assets/loseReaction.gif";
import "./ReactionGif.css";

const feedbackMap = {
  waiting: {
    gif: waitingGif,
    message: "Waiting for your move…",
    mood: "neutral",
    icon: "👀",
  },
  match: {
    gif: matchGif,
    message: "Perfect match!",
    mood: "success",
    icon: "🎉",
  },
  "no-match": {
    gif: noMatchGif,
    message: "Not quite!",
    mood: "error",
    icon: "😬",
  },
  win: {
    gif: matchGif,
    message: "You won!",
    mood: "win",
    icon: "🏆",
  },
};

export default function ReactionGif({ gameState }) {
  const feedback = feedbackMap[gameState] ?? feedbackMap.waiting;

  return (
    <div className={`reaction-panel mood-${feedback.mood}`}>
      <div className="reaction-gif-frame">
        <img
          src={feedback.gif}
          alt={gameState}
          className="reaction-gif"
          key={gameState}
        />
      </div>

      <div className="reaction-label">
        <span className="reaction-icon">{feedback.icon}</span>
        <span className="reaction-message">{feedback.message}</span>
      </div>
    </div>
  );
}