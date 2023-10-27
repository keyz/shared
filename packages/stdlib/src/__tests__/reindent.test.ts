import { expect, test } from "@jest/globals";
import { reindent } from "../public/reindent";

test("reindent", () => {
  expect(reindent``).toEqual("");
  expect(reindent`${""}`).toEqual("");
  expect(reindent`hello`).toEqual("hello");
  expect(reindent`h${"e"}l${"l"}o`).toEqual("hello");
  expect(reindent`${"h"}e${"l"}l${"o"}`).toEqual("hello");
  expect(reindent`${"n"}${"o"}`).toEqual("no");
  expect(reindent`${"y"}${"e"}${"s"}`).toEqual("yes");
  expect(reindent`${88}`).toEqual("88");

  expect(reindent`
    hello
  `).toEqual("hello");

  expect(reindent`
    hello
    world
  `).toEqual(
    [
      "hello", //
      "world",
    ].join("\n"),
  );

  expect(reindent`
    hello
    world
`).toEqual(
    [
      "hello", //
      "world",
    ].join("\n"),
  );

  expect(reindent`
    hello
    world
`).toEqual(
    [
      "hello", //
      "world",
    ].join("\n"),
  );

  expect(reindent`
    function foo() {
      // this is a comment
      // another one
      return "bar";
    }
  `).toEqual(
    [
      "function foo() {",
      "  // this is a comment",
      "  // another one",
      '  return "bar";',
      "}",
    ].join("\n"),
  );
});
