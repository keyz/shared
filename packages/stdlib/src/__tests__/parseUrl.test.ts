import { test, expect } from "vitest";
import { parseUrl } from "../public/parseUrl";

test("parseUrl", () => {
  expect(parseUrl("https://example.com")).toEqual(
    new URL("https://example.com"),
  );

  expect(parseUrl("https://google.com/?foo=123#bla")).toEqual(
    new URL("https://google.com/?foo=123#bla"),
  );

  expect(parseUrl("google.com/?foo=123#bla")).toBe(null);
});
