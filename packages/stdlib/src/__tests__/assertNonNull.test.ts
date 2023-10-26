import { test } from "@jest/globals";
import { assertNonNull } from "../public/assertNonNull";

test("types: assertNonNull", () => {
  function onlyString(x: string) {
    return x;
  }

  const foo = "ok" as any as string | null;

  // @ts-expect-error
  onlyString(foo);
  //         ^?

  assertNonNull(foo, "foo");

  // Good
  onlyString(foo);
  //         ^?
});
