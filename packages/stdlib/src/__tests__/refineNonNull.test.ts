import { test } from "@jest/globals";
import { refineNonNull } from "../public/refineNonNull";

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
