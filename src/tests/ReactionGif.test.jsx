import { render, screen } from "@testing-library/react";
import ReactionGif from "../components/ReactionGif";

describe("ReactionGif component", () => {
  it("should display the waiting message and image when waiting for a player move", () => {
    render(<ReactionGif gameState="waiting" />);
    expect(screen.getByText(/Waiting for your move/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should display the match message and image when the is a match", () => {
    render(<ReactionGif gameState="match" />);
    expect(screen.getByText(/Matched!/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should display the no-match message and image when the is no match", () => {
    render(<ReactionGif gameState="no-match" />);
    expect(screen.getByText(/Not Matched!/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  describe("when gameState is 'win'", () => {
    it("should display the win message and image when the game is won", () => {
      render(<ReactionGif gameState="win" />);
      expect(screen.getByText(/Congratulations!/i)).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });
});
