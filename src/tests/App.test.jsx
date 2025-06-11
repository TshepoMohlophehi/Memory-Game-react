import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should render the title", () => {
    expect(screen.getByText(/Memory Game/i)).toBeInTheDocument();
  });

  it("should render GameBoard and ReactionGif", () => {
    expect(screen.getAllByRole("button")).toHaveLength(16);
    expect(screen.getByText(/Waiting for your move/i)).toBeInTheDocument();
  });

  it("should not flip back a single clicked card", async () => {
    const cards = screen.getAllByRole("button");
    const firstCard = cards[0];

    expect(firstCard.textContent).toBe(" ");
    fireEvent.click(firstCard);
    expect(firstCard.textContent).not.toBe(" ");

    // Wait and ensure it’s still visible (not flipped back)
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

    fireEvent.click(cards[0]); // Clicking already flipped
    fireEvent.click(cards[1]); // Clicking already flipped
    // No change expected – still same emoji, still only 2 flipped
    expect(cards.filter((card) => card.textContent !== " ").length).toBe(2);
  });

  it("should reset the grid when Restart button is clicked", async () => {
    const cards = screen.getAllByRole("button");
    fireEvent.click(cards[0]);

    const restartButton = screen.getByText(/Restart/i);
    expect(restartButton).toBeInTheDocument();

    const beforeReset = [...screen.getAllByRole("button")].map(
      (btn) => btn.textContent
    );
    fireEvent.click(restartButton);

    const afterReset = [...screen.getAllByRole("button")].map(
      (btn) => btn.textContent
    );
    expect(afterReset).not.toEqual(beforeReset);
  });

  it("should display winning message when all cards are matched", async () => {
    const cards = screen.getAllByRole("button");

    let matched = false;
    for (let i = 0; i < cards.length && !matched; i++) {
      for (let j = i + 1; j < cards.length && !matched; j++) {
        fireEvent.click(cards[i]);
        fireEvent.click(cards[j]);

        if (
          cards[i].textContent !== " " &&
          cards[i].textContent === cards[j].textContent
        ) {
          await waitFor(() => {
            expect(cards[i].textContent).not.toBe(" ");
          });
        }
        matched = true;
      }
    }

    expect(
      screen.getByText(/🎉 Congratulations! You matched all the fruits!/i)
    ).toBeInTheDocument();
  });

  it("should update button text to 'Play Again' after win", async () => {
    const cards = screen.getAllByRole("button");

    let won = false;
    for (let i = 0; i < cards.length && !won; i++) {
      for (let j = i + 1; j < cards.length && !won; j++) {
        fireEvent.click(cards[i]);
        fireEvent.click(cards[j]);

        if (
          cards[i].textContent !== " " &&
          cards[i].textContent === cards[j].textContent
        ) {
          await waitFor(() => {
            expect(cards[i].textContent).not.toBe(" ");
          });
        }

        if (screen.queryByText(/Play Again/i)) {
          won = true;
        }
      }
    }

    expect(screen.getByText(/Play Again/i)).toBeInTheDocument();
  });
});
