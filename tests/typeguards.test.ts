import { describe, expect, it } from "vitest";
import {
  isDefined,
  isDiscriminatedUnionMember,
  isNonEmptyArray,
  isNumber,
  isOneOf,
  isPlainObject,
  isString,
} from "../src/typeguards/index.js";

describe("typeguards", () => {
  it("detects defined values", () => {
    expect(isDefined("value")).toBe(true);
    expect(isDefined(null)).toBe(false);
  });

  it("checks strings and non-empty option", () => {
    expect(isString("hello")).toBe(true);
    expect(isString("", false)).toBe(false);
  });

  it("checks numbers and arrays", () => {
    expect(isNumber(42)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isNonEmptyArray([1])).toBe(true);
    expect(isNonEmptyArray([])).toBe(false);
  });

  it("validates plain objects and literal sets", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(null)).toBe(false);
    expect(isOneOf("a", ["a", "b"] as const)).toBe(true);
    expect(isOneOf("c", ["a", "b"] as const)).toBe(false);
  });

  it("narrows discriminated unions by tag", () => {
    type Shape = { kind: "circle"; radius: number } | { kind: "square"; size: number };
    const circle: Shape = { kind: "circle", radius: 5 };
    const square: Shape = { kind: "square", size: 10 };

    if (isDiscriminatedUnionMember(circle, "kind", "circle")) {
      expect(circle.radius).toBe(5);
    } else {
      throw new Error("circle should be narrowed");
    }

    expect(isDiscriminatedUnionMember(square, "kind", "circle")).toBe(false);
  });
});
