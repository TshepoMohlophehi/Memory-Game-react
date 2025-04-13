const emojiList = ['🐶','🐱','🐭','🐹','🦊','🐻','🐼','🐨'];

export function generateGrid() {
  const pairs = [...emojiList, ...emojiList]; // 8 pairs = 16 cards
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}
