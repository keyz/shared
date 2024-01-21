import { test } from "vitest";
import { typedArrayIncludes } from "../public/typedArrayIncludes.js";

test("types: typedArrayIncludes", () => {
  const staticList = ["aaa", "bbb"] as const;
  type TStaticKeys = (typeof staticList)[number];

  function onlyEnum(x: TStaticKeys) {
    return x;
  }

  const actuallyKey: string = "aaa";
  const notKey: string = "something-else";

  // @ts-expect-error -- before refining
  onlyEnum(actuallyKey);
  //       ^?

  if (typedArrayIncludes(staticList, actuallyKey)) {
    // Good
    onlyEnum(actuallyKey);
    //       ^?
  }

  if (!typedArrayIncludes(staticList, notKey)) {
    // @ts-expect-error -- did not pass check
    onlyEnum(notKey);
    //       ^?
  }
});
