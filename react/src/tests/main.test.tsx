import { describe, it, expect, vi, beforeEach } from "vitest";

const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({
  render: mockRender,
}));

vi.mock("react-dom/client", () => ({
  createRoot: mockCreateRoot,
}));

vi.mock("react", () => ({
  createContext: vi.fn(() => ({})),
  StrictMode: vi.fn(({ children }) => children),
}));

vi.mock("./App.tsx", () => ({
  default: vi.fn(() => "App Component"),
}));

Object.defineProperty(document, "getElementById", {
  value: vi.fn(() => ({
    id: "root",
  })),
  writable: true,
});

describe("Main Entry Point", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call createRoot with root element", async () => {
    await import("../main");

    expect(document.getElementById).toHaveBeenCalledWith("root");
    expect(mockCreateRoot).toHaveBeenCalledWith({ id: "root" });
  });
});
