import { describe, expect, it } from "vitest";
import {
  drop,
  filterIterable,
  flatMapIterable,
  mapIterable,
  reduceIterable,
  take,
  toArray,
} from "../src/helpers/iterable.js";

describe("iterable helpers", () => {
  const sample = [1, 2, 3, 4];

  it("maps and filters lazily", () => {
    const result = toArray(filterIterable(mapIterable(sample, (v) => v * 2), (value) => value > 4));
    expect(result).toEqual([6, 8]);
  });

  it("takes and drops elements", () => {
    expect(toArray(take(sample, 2))).toEqual([1, 2]);
    expect(toArray(drop(sample, 2))).toEqual([3, 4]);
  });

  it("flat maps and reduces to accumulator", () => {
    const flattened = toArray(flatMapIterable(sample, (value) => [value, value * 10]));
    expect(flattened).toEqual([1, 10, 2, 20, 3, 30, 4, 40]);

    const sum = reduceIterable(sample, (acc, value) => acc + value, 0);
    expect(sum).toBe(10);
  });
});
