import { test } from "vitest";
import { unionToExhaustiveListCheckerFactory } from "../public/unionToExhaustiveListCheckerFactory";

test("types: unionToExhaustiveListCheckerFactory", () => {
  const checker1 = unionToExhaustiveListCheckerFactory<"a" | "b" | 1>();

  // Good
  checker1(["a", "b", 1]);

  // @ts-expect-error
  const _error1 = checker1();
  // @ts-expect-error
  const _error2 = checker1([]);
  // @ts-expect-error
  const _error3 = checker1(["a"]);
  // @ts-expect-error
  checker1();
  // @ts-expect-error
  checker1([]);
  // @ts-expect-error
  checker1(["a"]);

  const badChecker = unionToExhaustiveListCheckerFactory();
  // @ts-expect-error
  const _error4 = badChecker();
  // @ts-expect-error
  const _error5 = badChecker([]);
  // @ts-expect-error
  const _error6 = badChecker(["a"]);
  // @ts-expect-error
  badChecker();
  // @ts-expect-error
  badChecker([]);
  // @ts-expect-error
  badChecker(["a"]);
});
