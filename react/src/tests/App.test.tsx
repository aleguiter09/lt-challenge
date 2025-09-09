import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { useState } from "react";

vi.mock("@/components/Card/Card", () => ({
  Card: vi.fn(({ setIsOpen }) => (
    <div data-testid="card-component">
      <button onClick={() => setIsOpen(true)} data-testid="open-modal-button">
        Open Modal
      </button>
    </div>
  )),
}));

vi.mock("../components/Modal/Modal", () => ({
  Modal: vi.fn(({ isOpen, setIsOpen }) =>
    isOpen ? (
      <div data-testid="modal-component">
        <button
          onClick={() => setIsOpen(false)}
          data-testid="close-modal-button"
        >
          Close Modal
        </button>
      </div>
    ) : null
  ),
}));

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useState: vi.fn(),
  };
});

describe("App Component", () => {
  const mockSetState = vi.fn();
  const mockUseState = vi.mocked(useState);

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseState.mockReturnValue([false, mockSetState]);
  });

  it("should render Card and Modal", () => {
    render(<App />);
    expect(screen.getByTestId("card-component")).toBeInTheDocument();
    expect(screen.queryByTestId("modal-component")).not.toBeInTheDocument();
  });

  it("should initialize with modal closed (isOpen = false)", () => {
    render(<App />);

    expect(mockUseState).toHaveBeenCalledWith(false);
    expect(screen.queryByTestId("modal-component")).not.toBeInTheDocument();
  });

  it("should show modal when isOpen is true", () => {
    mockUseState.mockReturnValue([true, mockSetState]);

    render(<App />);
    expect(screen.getByTestId("modal-component")).toBeInTheDocument();
  });
});
