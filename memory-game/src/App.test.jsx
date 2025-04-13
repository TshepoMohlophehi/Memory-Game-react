import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders game title and 16 cards', () => {
  render(<App />);
  expect(screen.getByText(/Emoji Memory Game/i)).toBeInTheDocument();

  // Wait for 16 cards (❓ initially)
  const cards = screen.getAllByText('❓');
  expect(cards.length).toBe(16);
});

test('flips a card when clicked', async () => {
  render(<App />);
  const cards = screen.getAllByText('❓');
  userEvent.click(cards[0]);

  // After click, expect at least one not to be ❓
  const newCards = screen.getAllByRole('button');
  const flipped = newCards.filter(card => card.textContent !== '❓');
  expect(flipped.length).toBeGreaterThan(0);
});
