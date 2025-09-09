import { createContext, useContext, type Dispatch } from "react";
import type { ListAction, ListState } from "./ListProvider";

interface ListContextProps {
  state: ListState;
  dispatch: Dispatch<ListAction>;
}

export const ListContext = createContext<ListContextProps | undefined>(
  undefined
);

export function useList() {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList must be used within a ListProvider");
  }
  return context;
}
