export default function Card({ emoji, isFlipped, onClick }) {
  return (
    <div
      className="card"
      role="button"
      data-testid="card"
      aria-pressed={isFlipped}
      aria-label={isFlipped ? `${emoji} card` : "Hidden card"}
      tabIndex={0}
      onClick={onClick}
      style={{
        width: "5rem",
        height: "5rem",
        fontSize: "2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #ccc",
        backgroundColor: isFlipped ? "#fff" : "#eee",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
    >
      {isFlipped ? emoji : " "}
    </div>
  );
}
