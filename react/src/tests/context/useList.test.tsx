import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ListContext, useList } from "@/context/useList";
import type { ListState, ListAction } from "@/context/ListProvider";

const mockContextValue = {
  state: {
    items: ["Item 1", "Item 2"],
    selected: [],
    history: [],
  } as ListState,
  dispatch: vi.fn() as React.Dispatch<ListAction>,
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ListContext.Provider value={mockContextValue}>
    {children}
  </ListContext.Provider>
);

describe("useList Hook", () => {
  it("should return context value when used within provider", () => {
    const { result } = renderHook(() => useList(), {
      wrapper: TestWrapper,
    });

    expect(result.current.state).toEqual(mockContextValue.state);
    expect(result.current.dispatch).toBe(mockContextValue.dispatch);
  });

  it("should throw error when used outside provider", () => {
    expect(() => {
      renderHook(() => useList());
    }).toThrow("useList must be used within a ListProvider");
  });
});
