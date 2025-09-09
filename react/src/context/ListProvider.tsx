import { useMemo, useReducer, type ReactNode } from "react";
import { ListContext } from "./useList";

export interface ListState {
  items: string[];
  selected: number[];
  history: string[][];
}

export type ListAction =
  | { type: "ADD_ITEM"; payload: string }
  | { type: "REMOVE_SELECTED" }
  | { type: "TOGGLE_SELECT"; payload: number }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UNDO" };

const initialState: ListState = {
  items: ["Item 1", "Item 2", "Item 3", "Item 4"],
  selected: [],
  history: [],
};

function reducer(state: ListState, action: ListAction): ListState {
  switch (action.type) {
    case "ADD_ITEM": {
      if (!action.payload) return state;
      return {
        ...state,
        history: [...state.history, state.items],
        items: [...state.items, action.payload],
      };
    }
    case "REMOVE_SELECTED": {
      return {
        ...state,
        history: [...state.history, state.items],
        items: state.items.filter((_, i) => !state.selected.includes(i)),
        selected: [],
      };
    }
    case "TOGGLE_SELECT": {
      return {
        ...state,
        selected: state.selected.includes(action.payload)
          ? state.selected.filter((i) => i !== action.payload)
          : [...state.selected, action.payload],
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        history: [...state.history, state.items],
        items: state.items.filter((_, i) => i !== action.payload),
        selected: [],
      };
    }
    case "UNDO": {
      if (state.history.length === 0) return state;
      const prev = state.history[state.history.length - 1];
      return {
        ...state,
        items: prev,
        history: state.history.slice(0, -1),
        selected: [],
      };
    }
    default:
      return state;
  }
}

export function ListProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
  );
}
