import { render, screen } from "@testing-library/react";
import ReactionGif from "../components/ReactionGif";

test.each([
  ["waiting", /Waiting for your move/i],
  ["match", /Matched!/i],
  ["no-match", /Not Matched!/i],
])("shows correct message and image for state", (state, expectedMessage) => {
  render(<ReactionGif gameState={state} />);
  expect(screen.getByText(expectedMessage)).toBeInTheDocument();
  expect(screen.getByRole("img")).toBeInTheDocument();
});

