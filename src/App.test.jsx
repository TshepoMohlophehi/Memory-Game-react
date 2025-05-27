import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Memory Game", () => {
  test("renders the game title and 16 cards", () => {
    render(<App />);
    expect(screen.getByText(/Memory Game/i)).toBeInTheDocument();

    const cards = screen.getAllByRole("button");
    expect(cards.length).toBe(16);
  });

  test("flips a card on click", () => {
    render(<App />);
    const cards = screen.getAllByRole("button");
    const firstCard = cards[0];

    expect(firstCard.textContent).toBe(" ");

    fireEvent.click(firstCard);
    expect(firstCard.textContent).not.toBe(" ");
  });

  test("matches two cards with same emoji", async () => {
    render(<App />);
    const cards = screen.getAllByRole("card");

    let matched = false;
    for (let i = 0; i < cards.length && !matched; i++) {
      for (let j = i + 1; j < cards.length && !matched; j++) {
        fireEvent.click(cards[i]);
        fireEvent.click(cards[j]);

        if (
          cards[i].textContent !== "" &&
          cards[i].textContent === cards[j].textContent
        ) {
          matched = true;
          await waitFor(() => {
            expect(cards[i].textContent).not.toBe("");
            expect(cards[j].textContent).not.toBe("");
          });
        }
      }
    }

    expect(matched).toBe(true);
  });

  test("reaction gif updates based on game state", async () => {
    render(<App />);
    const cards = screen.getAllByRole("button");
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    await waitFor(() => {
      const message = screen.getByText(/Matched!|Not Matched!/i);
      expect(message).toBeInTheDocument();
    });
  });

  test("restart button resets the game", async () => {
    render(<App />);
//    const cards = screen.getAllByRole("button");
    const cards = screen.getAllByTestId("button");
    const firstCard = cards[0];
    userEvent.click(firstCard);

    await waitFor(() => {
      expect(firstCard.textContent).not.toBe(" ");
    });

    const restartButton = screen.getByTestId("restart-button");
    userEvent.click(restartButton);

    await waitFor(() => {
      const refreshedCards = screen.getAllByTestId("button");
      refreshedCards.forEach((card) => {
        expect(card.textContent).toBe(" ");
      });
    });
  });
});
