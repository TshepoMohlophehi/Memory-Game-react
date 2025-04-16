import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders game title and 16 cards', () => {
  render(<App />);
  expect(screen.getByText(/Memory Game/i)).toBeInTheDocument();

  const cards = screen.getAllByText('❓');
  expect(cards.length).toBe(16);
});

test('flips a card when clicked', async () => {
  render(<App />);
  const cards = screen.getAllByText('❓');
  userEvent.click(cards[0]);


  const newCards = screen.getAllByRole('button');
  const flipped = newCards.filter(card => card.textContent !== '❓');
  expect(flipped.length).toBeGreaterThan(0);
});
