import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  it("should render the title", () => {
    render(<App />);
    expect(screen.getByText(/Memory Game/i)).toBeInTheDocument();
  });

  it("should render GameBoard and ReactionGif", () => {
    render(<App />);

    const cards = screen.getAllByRole("button");
    expect(cards.length).toBe(16);

    expect(screen.getByText(/Waiting for your move/i)).toBeInTheDocument();
  });
});
