import { describe, expect, it } from "vitest";
import { capitalize, ensurePrefix, ensureSuffix, truncate } from "../src/helpers/string.js";

describe("string helpers", () => {
  it("ensures prefix and suffix correctly", () => {
    expect(ensurePrefix("kit", "ts-")).toBe("ts-kit");
    expect(ensurePrefix("ts-kit", "ts-")).toBe("ts-kit");
    expect(ensureSuffix("ts", "-kit")).toBe("ts-kit");
    expect(ensureSuffix("ts-kit", "-kit")).toBe("ts-kit");
  });

  it("capitalizes the first character", () => {
    expect(capitalize("kit")).toBe("Kit");
    expect(capitalize("")).toBe("");
  });

  it("truncates and appends ellipsis when needed", () => {
    expect(truncate("typescript", 4)).toBe("t...");
    expect(truncate("ts", 10)).toBe("ts");
    expect(truncate("typescript", 0)).toBe("");
  });
});
