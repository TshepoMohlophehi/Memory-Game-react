import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should render the title", () => {
    expect(screen.getByText(/Memory Game/i)).toBeInTheDocument();
  });

  it("should render GameBoard with 16 cards", () => {
    expect(screen.getAllByRole("button")).toHaveLength(16);
    expect(screen.getByText(/Waiting for your move/i)).toBeInTheDocument();
  });

  it("should render ReactionGif with the approriate image at the start of the game", () => {
    expect(screen.getByText(/Waiting for your move/i)).toBeInTheDocument();
  });

  it("restart button should only appear after the first click", () => {
    expect(screen.queryByText(/Restart/i)).not.toBeInTheDocument();
    const cards = screen.getAllByRole("button");
    const firstCard = cards[0];
    fireEvent.click(firstCard);
    expect(screen.getByText(/Restart/i)).toBeInTheDocument();
  });

  it("first card should not flip back after being clicked card", async () => {
    const cards = screen.getAllByRole("button");
    const firstCard = cards[0];

    expect(firstCard.textContent).toBe(" ");
    fireEvent.click(firstCard);
    expect(firstCard.textContent).not.toBe(" ");

    await waitFor(
      () => {
        expect(firstCard.textContent).not.toBe(" ");
      },
      { timeout: 2500 }
    );
  });

  it("should prevent flipping already flipped or matched cards", async () => {
    const cards = screen.getAllByRole("button");

    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    await waitFor(() => {
      expect(cards[0].textContent).not.toBe(" ");
      expect(cards[1].textContent).not.toBe(" ");
    });

    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    expect(cards.filter((card) => card.textContent !== " ").length).toBe(2);
  });

  it("should reset the grid when Restart button is clicked", async () => {
    const cards = screen.getAllByRole("button");
    fireEvent.click(cards[0]);

    const restartButton = screen.getByText(/Restart/i);
    expect(restartButton).toBeInTheDocument();

    const beforeResetCards = [...screen.getAllByRole("button")].map(
      (btn) => btn.textContent
    );

    fireEvent.click(restartButton);

    const afterResetCards = [...screen.getAllByRole("button")].map(
      (btn) => btn.textContent
    );

    expect(afterResetCards).not.toEqual(beforeResetCards);
  });
});
