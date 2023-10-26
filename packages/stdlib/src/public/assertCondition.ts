import { recaptureErrorStack } from "./recaptureErrorStack";

export function assertCondition(
  condition: unknown,
  name: string,
): asserts condition {
  if (!condition) {
    throw recaptureErrorStack(
      new Error(`${name}: unexpected condition ${JSON.stringify(condition)}`),
      assertCondition,
    );
  }
}
