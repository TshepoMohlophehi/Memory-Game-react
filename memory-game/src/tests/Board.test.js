import { render, screen } from "@testing-library/react";
import Board from "../components/Board";

test("renders memory game board", () => {
  render(<Board />);
  const boardElement = screen.getByTestId("game-board");
  expect(boardElement).toBeInTheDocument();
});
