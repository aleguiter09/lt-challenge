import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { List } from "@/components/List/List";
import { ListProvider } from "@/context/ListProvider";

describe("List", () => {
  it("renders lists", () => {
    render(
      <ListProvider>
        <List />
      </ListProvider>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("calls dispatch with TOGGLE_SELECT when item clicked", () => {
    render(
      <ListProvider>
        <List />
      </ListProvider>
    );

    const item = screen.getByText("Item 1");
    fireEvent.click(item);

    const li = screen.getByText("Item 1").closest("li");

    expect(li).toHaveClass("selected");
  });

  it("calls dispatch with REMOVE_ITEM when item is double clicked", () => {
    render(
      <ListProvider>
        <List />
      </ListProvider>
    );
    const item = screen.getByText("Item 2");
    fireEvent.doubleClick(item);

    expect(item).not.toBeInTheDocument();
  });
});
