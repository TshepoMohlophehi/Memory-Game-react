import { render, screen } from "@testing-library/react";
import ReactionGif from "../components/ReactionGif";

describe("ReactionGif component", () => {
  describe("when gameState is 'waiting'", () => {
    it("should display the waiting message and image", () => {
      render(<ReactionGif gameState="waiting" />);
      expect(screen.getByText(/Waiting for your move/i)).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  describe("when gameState is 'match'", () => {
    it("should display the match message and image", () => {
      render(<ReactionGif gameState="match" />);
      expect(screen.getByText(/Matched!/i)).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  describe("when gameState is 'no-match'", () => {
    it("should display the no-match message and image", () => {
      render(<ReactionGif gameState="no-match" />);
      expect(screen.getByText(/Not Matched!/i)).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  describe("when gameState is 'win'", () => {
    it("should display the win message and image", () => {
      render(<ReactionGif gameState="win" />);
      expect(screen.getByText(/Congratulations!/i)).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });
});
