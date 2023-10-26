import { test, expect } from "@jest/globals";
import { assertNever } from "../public/assertNever";

test("`assertNever` itself doesn't pollute the error stack", () => {
  try {
    assertNever(3 as any as never, "3");
  } catch (error) {
    const stack = (error as any as Error).stack ?? "";

    expect(stack).toBeTruthy(); // Not empty
    expect(stack).not.toMatch(/assertNever/i); // Does not include the module name
  }
});
