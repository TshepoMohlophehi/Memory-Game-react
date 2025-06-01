import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GameBoard from "../components/GameBoard";

test("renders 16 cards", () => {
  render(<GameBoard setGameState={() => {}} />);
  expect(screen.getAllByRole("button")).toHaveLength(16);
});

test("restart button appears after first click", () => {
  render(<GameBoard setGameState={() => {}} />);
  const cards = screen.getAllByRole("button");
  fireEvent.click(cards[0]);
  expect(screen.getByText(/Restart/i)).toBeInTheDocument();
});
