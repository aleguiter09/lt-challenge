import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/Card/Card";

vi.mock("@/components/Controls/Controls", () => ({
  Controls: ({ setIsOpen }: { setIsOpen: (v: boolean) => void }) => (
    <button data-testid="controls" onClick={() => setIsOpen(true)}>
      Controls
    </button>
  ),
}));

vi.mock("@/components/List/List", () => ({
  List: () => <div data-testid="list">List</div>,
}));

describe("Card", () => {
  it("renders the title", () => {
    render(<Card setIsOpen={vi.fn()} />);
    expect(screen.getByText("This is a technical proof")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<Card setIsOpen={vi.fn()} />);
    expect(
      screen.getByText(/Lorem ipsum dolor sit amet consectetur/i)
    ).toBeInTheDocument();
  });

  it("renders the List component", () => {
    render(<Card setIsOpen={vi.fn()} />);
    expect(screen.getByTestId("list")).toBeInTheDocument();
  });

  it("renders the Controls component", () => {
    render(<Card setIsOpen={vi.fn()} />);
    expect(screen.getByTestId("controls")).toBeInTheDocument();
  });

  it("calls setIsOpen when Controls button is clicked", () => {
    const setIsOpen = vi.fn();
    render(<Card setIsOpen={setIsOpen} />);
    screen.getByTestId("controls").click();
    expect(setIsOpen).toHaveBeenCalledWith(true);
  });
});
