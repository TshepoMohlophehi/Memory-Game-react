import React from "react";

const Card = ({ emoji, isFlipped, onClick }) => {
  return (
    <div
      data-testid="card"
      onClick={onClick}
      style={{
        width: "50px",
        height: "50px",
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        cursor: "pointer",
        backgroundColor: isFlipped ? "lightgray" : "darkgray",
      }}
    >
      {isFlipped ? emoji : ""}
    </div>
  );
};

export default Card;
