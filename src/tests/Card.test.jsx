import { render, fireEvent, screen } from "@testing-library/react";
import Card from "../components/Card";

describe("Card component", () => {
  it("should display emoji when flipped", () => {
    render(<Card emoji="🍎" isFlipped={true} onClick={() => {}} />);
    const card = screen.getByTestId("card");
    expect(card).toHaveTextContent("🍎");
  });

  it("should display a blank card when not flipped", () => {
    render(<Card emoji="🍎" isFlipped={false} onClick={() => {}} />);
    const card = screen.getByRole("button");
    expect(card).toHaveTextContent("");
    expect(card).not.toHaveTextContent("🍎");
  });

  it("should call onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Card emoji="🍎" isFlipped={false} onClick={handleClick} />);
    const card = screen.getByTestId("card");
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
