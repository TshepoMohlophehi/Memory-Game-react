import "./Card.css";

export default function Card({ emoji, isFlipped, onClick, isMatched }) {
  return (
    <div
      className={`card-scene ${isFlipped ? "is-flipped" : ""} ${isMatched ? "is-matched" : ""}`}
      role="button"
      data-testid="card"
      aria-pressed={isFlipped}
      aria-label={isFlipped ? `${emoji} card` : "Hidden card"}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="card-inner">
        {/* Back face */}
        <div className="card-face card-back">
          <span className="card-back-pattern">✦</span>
        </div>

        {/* Front face */}
        <div className="card-face card-front">
          <span className="card-emoji">{emoji}</span>
        </div>
      </div>
    </div>
  );
}