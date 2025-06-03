import { render, fireEvent } from "@testing-library/react";
import Card from "../components/Card";

describe("Card component", () => {
  it("should display emoji when flipped", () => {
    const { getByTestId } = render(
      <Card emoji="🍎" isFlipped={true} onClick={() => {}} />
    );
    expect(getByTestId("card")).toHaveTextContent("🍎");
  });

  it("should display a blank card when not flipped", () => {
    const { getByTestId } = render(
      <Card emoji="🍎" isFlipped={false} onClick={() => {}} />
    );
    expect(getByTestId("card")).not.toHaveTextContent();
  });

  it("should call onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Card emoji="🍎" isFlipped={false} onClick={handleClick} />
    );
    fireEvent.click(getByTestId("card"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
