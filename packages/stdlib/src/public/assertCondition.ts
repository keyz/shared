import { recaptureErrorStack } from "./recaptureErrorStack.js";

export function assertCondition(
  condition: unknown,
  name: string = "<unknown>",
): asserts condition {
  if (!condition) {
    throw recaptureErrorStack(
      new Error(`${name}: unexpected condition ${JSON.stringify(condition)}`),
      assertCondition,
    );
  }
}
