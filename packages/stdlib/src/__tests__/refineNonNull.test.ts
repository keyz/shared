import { test } from "vitest";
import { refineNonNull } from "../public/refineNonNull.js";

test("types: refineNonNull", () => {
  function onlyString(x: string) {
    return x;
  }

  const foo = "ok" as any as string | null;

  const x = foo;
  // @ts-expect-error
  onlyString(x);
  //         ^?

  const y = refineNonNull(foo, "foo");
  // Good
  onlyString(y);
  //         ^?
});
