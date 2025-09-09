import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Controls } from "@/components/Controls/Controls";

vi.mock("@/context/useList", () => ({
  useList: () => ({
    dispatch: vi.fn(),
  }),
}));

describe("Controls", () => {
  let setIsOpen: (v: boolean) => void;
  let dispatch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setIsOpen = vi.fn();

    dispatch = vi.fn();
    vi.doMock("@/context/useList", () => ({
      useList: () => ({ dispatch }),
    }));
  });

  it("renders all buttons", () => {
    render(<Controls setIsOpen={setIsOpen} />);
    expect(screen.getByText("⟲")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("calls setIsOpen(true) when Add button is clicked", () => {
    render(<Controls setIsOpen={setIsOpen} />);
    screen.getByText("Add").click();
    expect(setIsOpen).toHaveBeenCalledWith(true);
  });
});
