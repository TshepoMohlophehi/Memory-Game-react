import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('Memory Game', () => {
  test('renders the game title and 16 cards', () => {
    render(<App />);
    expect(screen.getByText(/Memory Game/i)).toBeInTheDocument();

    const cards = screen.getAllByRole('button');
    expect(cards.length).toBe(16);
  });

  test('flips a card on click', () => {
    render(<App />);
    const cards = screen.getAllByRole('button');
    const firstCard = cards[0];

    expect(firstCard.textContent).toBe(' ');

    fireEvent.click(firstCard);
    expect(firstCard.textContent).not.toBe(' ');
  });

  test('matches two cards with same emoji', async () => {
    render(<App />);
    const cards = screen.getAllByRole('button');

 
    let matched = false;
    for (let i = 0; i < cards.length && !matched; i++) {
      for (let j = i + 1; j < cards.length && !matched; j++) {
        fireEvent.click(cards[i]);
        fireEvent.click(cards[j]);

        if (cards[i].textContent !== ' ' && cards[i].textContent === cards[j].textContent) {
          matched = true;
          await waitFor(() => {
            expect(cards[i].textContent).not.toBe(' ');
            expect(cards[j].textContent).not.toBe(' ');
          });
        } else {
          await waitFor(() => {
            expect(cards[i].textContent).toBe('');
            expect(cards[j].textContent).toBe('');
          }, { timeout: 3000 });
        }
      }
    }

    expect(matched).toBe(true);
  });

  test('displays congrats message after all cards are matched', async () => {
    render(<App />);
    const cards = screen.getAllByRole('button');
    const values = [];

    // Extract all emojis after flipping all cards
    for (const card of cards) {
      fireEvent.click(card);
      values.push(card.textContent);
    }

    // Reset the board to simulate valid matching sequence
    const seen = {};
    for (let i = 0; i < values.length; i++) {
      const val = values[i];
      if (seen[val] !== undefined) {
        fireEvent.click(cards[seen[val]]);
        fireEvent.click(cards[i]);
      } else {
        seen[val] = i;
      }

      await new Promise((r) => setTimeout(r, 300)); // allow match delay
    }

    await waitFor(() =>
      expect(screen.getByText(/🎉 Congratulations! You matched all the fruits!/i)).toBeInTheDocument(),
    );

    await waitFor(() =>
      expect(screen.queryByText(/🎉 Congratulations! You matched all the fruits!/i)).not.toBeInTheDocument(),
      { timeout: 4000 },
    );
  });

  test('reaction gif updates based on game state', async () => {
    render(<App />);
    const cards = screen.getAllByRole('button');
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    await waitFor(() => {
      const message = screen.getByText(/Matched!|Not Matched!/i);
      expect(message).toBeInTheDocument();
    });
  });

  test('restart button resets the game', async () => {
    render(<App />);
  
    const cards = screen.getAllByTestId('card');
    const firstCard = cards[0];
    userEvent.click(firstCard);
  
    // Card should now be flipped (emoji visible)
    await waitFor(() => {
      expect(firstCard.textContent).not.toBe(' ');
    });
  
    // Click restart
    const restartButton = screen.getByTestId('restart-button');
    userEvent.click(restartButton);
  
    // All cards should be unflipped (text content should be empty string or space)
    await waitFor(() => {
      const refreshedCards = screen.getAllByTestId('card');
      refreshedCards.forEach(card => {
        expect(card.textContent).toBe(' ');
      });
    });
  });



});
