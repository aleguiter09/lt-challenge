import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  ListProvider,
  type ListState,
  type ListAction,
} from "@/context/ListProvider";

// Mock del contexto useList
const mockListContext = {
  Provider: vi.fn(({ children, value }) => (
    <div data-testid="list-context-provider" data-value={JSON.stringify(value)}>
      {children}
    </div>
  )),
};

vi.mock("./useList", () => ({
  ListContext: mockListContext,
}));

// Mock de React hooks
const mockDispatch = vi.fn();
const mockState: ListState = {
  items: ["Item 1", "Item 2", "Item 3", "Item 4"],
  selected: [],
  history: [],
};

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useReducer: vi.fn(() => [mockState, mockDispatch]),
    useMemo: vi.fn((fn) => fn()),
  };
});

describe("ListProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render children", () => {
    render(
      <ListProvider>
        <div data-testid="test-child">Test Child</div>
      </ListProvider>
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });
});

describe("Reducer", () => {
  let reducer: (state: ListState, action: ListAction) => ListState;

  beforeEach(async () => {
    // Importar el módulo completo para acceder al reducer
    const module = await import("@/context/ListProvider");
    const React = await import("react");
    // El reducer no está exportado, pero podemos testearlo a través de useReducer
    render(
      <module.ListProvider>
        <div />
      </module.ListProvider>
    );
    reducer = vi.mocked(React.useReducer).mock.calls[0][0]; // Obtener la función reducer
  });

  it("should add item", () => {
    const state: ListState = {
      items: ["Item 1"],
      selected: [],
      history: [],
    };

    const result = reducer(state, { type: "ADD_ITEM", payload: "New Item" });

    expect(result.items).toEqual(["Item 1", "New Item"]);
    expect(result.history).toHaveLength(1);
  });

  it("should not add empty item", () => {
    const state: ListState = {
      items: ["Item 1"],
      selected: [],
      history: [],
    };

    const result = reducer(state, { type: "ADD_ITEM", payload: "" });

    expect(result).toBe(state); // Debe retornar el mismo estado
  });

  it("should toggle selection", () => {
    const state: ListState = {
      items: ["Item 1", "Item 2"],
      selected: [0],
      history: [],
    };

    // Deseleccionar
    const result1 = reducer(state, { type: "TOGGLE_SELECT", payload: 0 });
    expect(result1.selected).toEqual([]);

    // Seleccionar
    const result2 = reducer(state, { type: "TOGGLE_SELECT", payload: 1 });
    expect(result2.selected).toEqual([0, 1]);
  });

  it("should remove selected items", () => {
    const state: ListState = {
      items: ["Item 1", "Item 2", "Item 3"],
      selected: [0, 2],
      history: [],
    };

    const result = reducer(state, { type: "REMOVE_SELECTED" });

    expect(result.items).toEqual(["Item 2"]);
    expect(result.selected).toEqual([]);
    expect(result.history).toHaveLength(1);
  });

  it("should handle undo", () => {
    const state: ListState = {
      items: ["Item 1"],
      selected: [],
      history: [["Original Item"]],
    };

    const result = reducer(state, { type: "UNDO" });

    expect(result.items).toEqual(["Original Item"]);
    expect(result.history).toEqual([]);
  });

  it("should not undo when no history", () => {
    const state: ListState = {
      items: ["Item 1"],
      selected: [],
      history: [],
    };

    const result = reducer(state, { type: "UNDO" });

    expect(result).toBe(state);
  });
});
