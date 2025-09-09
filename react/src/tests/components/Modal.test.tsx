import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useState } from "react";
import { Modal } from "@/components/Modal/Modal";

const mockDispatch = vi.fn();
vi.mock("@/context/useList", () => ({
  useList: vi.fn(() => ({
    dispatch: mockDispatch,
  })),
}));

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useState: vi.fn(),
  };
});

describe("Modal Component", () => {
  const mockSetIsOpen = vi.fn();
  const mockSetValue = vi.fn();
  const mockUseState = vi.mocked(useState);

  const defaultProps = {
    isOpen: true,
    setIsOpen: mockSetIsOpen,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseState
      .mockReturnValueOnce(["", mockSetValue])
      .mockReturnValue([false, vi.fn()]);
  });

  describe("Rendering", () => {
    it("should render modal when isOpen is true", () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByText("Add item to list")).toBeInTheDocument();
      expect(screen.getByText("Add")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it('should apply "show" class when isOpen is true', () => {
      const { container } = render(<Modal {...defaultProps} />);

      const modalElement = container.querySelector(".modal");
      expect(modalElement).toHaveClass("modal", "show");
    });

    it('should not apply "show" class when isOpen is false', () => {
      const { container } = render(<Modal {...defaultProps} isOpen={false} />);

      const modalElement = container.querySelector(".modal");
      expect(modalElement).toHaveClass("modal");
      expect(modalElement).not.toHaveClass("show");
    });
  });

  describe("Input handling", () => {
    it("should call setValue when input changes", async () => {
      const user = userEvent.setup();
      render(<Modal {...defaultProps} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "New item");

      expect(mockSetValue).toHaveBeenCalledTimes(8);
    });
  });

  describe("Cancel button functionality", () => {
    it("should close modal when Cancel is clicked", () => {
      render(<Modal {...defaultProps} />);

      const cancelButton = screen.getByRole("button", { name: "Cancel" });
      fireEvent.click(cancelButton);

      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });

    it("should not dispatch any action when Cancel is clicked", () => {
      render(<Modal {...defaultProps} />);

      const cancelButton = screen.getByRole("button", { name: "Cancel" });
      fireEvent.click(cancelButton);

      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("should not clear input when Cancel is clicked", () => {
      render(<Modal {...defaultProps} />);

      const cancelButton = screen.getByRole("button", { name: "Cancel" });
      fireEvent.click(cancelButton);

      expect(mockSetValue).not.toHaveBeenCalledWith("");
    });
  });
});
