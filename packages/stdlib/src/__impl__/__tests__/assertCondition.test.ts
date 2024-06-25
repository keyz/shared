import { test } from "vitest";
import { assertCondition } from "../../assertCondition.js";

test("types: assertCondition", () => {
  function onlyString(x: string) {
    return x;
  }

  let foo = "ok" as any as number | string;

  // @ts-expect-error
  onlyString(foo);
  //         ^?

  assertCondition(typeof foo === "string", "foo");

  // Good
  onlyString(foo);
  //         ^?
});
