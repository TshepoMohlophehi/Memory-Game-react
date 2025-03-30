import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../components/Card";

test("renders a card with hidden content", () => {
  render(<Card emoji="🐶" isFlipped={false} onClick={() => {}} />);
  const cardElement = screen.getByTestId("card");
  expect(cardElement).toHaveTextContent(""); // Should be hidden initially
});

test("shows emoji when flipped", () => {
  render(<Card emoji="🐶" isFlipped={true} onClick={() => {}} />);
  const cardElement = screen.getByTestId("card");
  expect(cardElement).toHaveTextContent("🐶"); // Should show emoji when flipped
});

test("calls onClick function when clicked", () => {
  const handleClick = jest.fn();
  render(<Card emoji="🐶" isFlipped={false} onClick={handleClick} />);
  const cardElement = screen.getByTestId("card");
  
  fireEvent.click(cardElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
