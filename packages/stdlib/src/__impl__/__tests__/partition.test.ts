import { test } from "vitest";
import { partition } from "../../partition.js";

test("types: partition", () => {
  function onlyNumber(x: number) {
    return x;
  }

  const [pass1, fail1] = partition(
    [1, 2, 3, "ok", "here"],
    (x): x is number => typeof x === "number",
  );

  for (const item of pass1) {
    onlyNumber(item);
    //         ^?
  }
  for (const item of fail1) {
    // @ts-expect-error
    onlyNumber(item);
    //         ^?
  }

  const [pass2, fail2] = partition([1, 2, 3, 4, 5], (x) => x > 2);

  for (const item of pass2) {
    onlyNumber(item);
    //         ^?
  }
  for (const item of fail2) {
    onlyNumber(item);
    //         ^?
  }
});
