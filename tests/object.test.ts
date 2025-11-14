import { describe, expect, it } from "vitest";
import { pick } from "../src/helpers/object.js";

describe("object helpers", () => {
  it("picks provided keys from source object", () => {
    const source = { a: 1, b: 2, c: 3 };
    expect(pick(source, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });
});
