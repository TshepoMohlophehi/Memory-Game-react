import { render, screen, fireEvent } from "@testing-library/react";
import GameBoard from "../components/GameBoard";

describe("GameBoard component", () => {
  it("should render 16 cards", () => {
    render(<GameBoard setGameState={() => {}} />);
    expect(screen.getAllByRole("button")).toHaveLength(16);
  });

  it("should display the restart button after the first card is clicked", () => {
    render(<GameBoard setGameState={() => {}} />);
    const cards = screen.getAllByRole("button");
    fireEvent.click(cards[0]);
    expect(screen.getByText(/Restart/i)).toBeInTheDocument();
  });
});
