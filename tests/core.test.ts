import { describe, expect, it } from "vitest";
import { clamp, identity, noop, pipe } from "../src/helpers/core.js";

describe("core helpers", () => {
  it("returns the same value via identity and noop does nothing", () => {
    expect(identity({ a: 1 })).toEqual({ a: 1 });
    expect(() => noop()).not.toThrow();
  });

  it("pipes values through multiple transforms", () => {
    const result = pipe(
      2,
      (n: number) => n + 3,
      (n) => n * 2,
    );
    expect(result).toBe(10);
  });

  it("clamps numbers to the provided range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(20, 0, 10)).toBe(10);
  });
});
