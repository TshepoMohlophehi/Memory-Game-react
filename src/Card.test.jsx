import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./components/Card";

test("renders card with emoji when flipped", () => {
  render(<Card emoji="🍎" isFlipped={true} onClick={() => {}} />);
  expect(screen.getByText("🍎")).toBeInTheDocument();
});

test("does not show emoji when not flipped", () => {
  render(<Card emoji="🍎" isFlipped={false} onClick={() => {}} />);
  const card = screen.getAllByRole("button");
  expect(card[0].textContent).toBe(" ");
});

test("calls onClick when clicked", () => {
  const handleClick = jest.fn();
  render(<Card emoji="🍎" isFlipped={false} onClick={handleClick} />);
  fireEvent.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalled();
});
