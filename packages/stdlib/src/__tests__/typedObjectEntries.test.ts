import { test } from "vitest";
import { typedObjectEntries } from "../public/typedObjectEntries.js";

test("types: typedObjectEntries", () => {
  const staticMap = { aaa: 123, bbb: "hello", ccc: true };

  function onlyString(x: string) {
    return x;
  }

  function onlyNumber(x: number) {
    return x;
  }

  function onlyBoolean(x: boolean) {
    return x;
  }

  const entryList = typedObjectEntries(staticMap);
  //    ^?

  for (const [key, value] of entryList) {
    if (key === "aaa") {
      onlyNumber(value);
      //          ^?
    } else if (key === "bbb") {
      onlyString(value);
      //          ^?
    } else {
      onlyBoolean(value);
      //          ^?
    }
  }
});
