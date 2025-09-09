import { describe, it, expect } from "vitest";

function sum(a: number, b: number): number {
  return a + b;
}

describe("sum", () => {
  it("adds two positive numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("adds two negative numbers", () => {
    expect(sum(-2, -3)).toBe(-5);
  });

  it("adds a positive and a negative number", () => {
    expect(sum(5, -3)).toBe(2);
  });

  it("adds zero and a number", () => {
    expect(sum(0, 7)).toBe(7);
    expect(sum(7, 0)).toBe(7);
  });

  it("adds two zeros", () => {
    expect(sum(0, 0)).toBe(0);
  });

  it("adds decimal numbers", () => {
    expect(sum(2.5, 3.1)).toBeCloseTo(5.6);
  });
});
