import { test } from "vitest";
import type { TAnyLiteralObject } from "../../types.js";

test("types: typedObjectHasOwn", () => {
  onlyLiteralObject({});
  onlyLiteralObject({ a: 3 });
  onlyLiteralObject({ a: 3 } as const);

  // @ts-expect-error
  onlyLiteralObject([]);
  // @ts-expect-error
  onlyLiteralObject(null);

  class Foo {
    something = 123;
  }

  // @ts-expect-error
  onlyLiteralObject(new Foo());

  function onlyLiteralObject(x: TAnyLiteralObject) {
    return x;
  }
});
