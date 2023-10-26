import { test } from "@jest/globals";
import { typedObjectHasOwn } from "../public/typedObjectHasOwn";

test("types: typedObjectHasOwn", () => {
  const staticMap = { aaa: 123, bbb: 123 } as const;
  type TStaticKeys = keyof typeof staticMap;

  function onlyEnum(x: TStaticKeys) {
    return x;
  }

  const actuallyKey: string = "aaa";
  const notKey: string = "something-else";

  // @ts-expect-error -- before refining
  onlyEnum(actuallyKey);
  //       ^?

  if (typedObjectHasOwn(staticMap, actuallyKey)) {
    // Good
    onlyEnum(actuallyKey);
    //       ^?
  }

  if (!typedObjectHasOwn(staticMap, notKey)) {
    // @ts-expect-error -- did not pass check
    onlyEnum(notKey);
    //       ^?
  }
});
