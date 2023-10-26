import { recaptureErrorStack } from "./recaptureErrorStack";

export function assertNonNull<T>(
  input: T | null | undefined,
  name: string,
): asserts input is T {
  if (input == null) {
    throw recaptureErrorStack(
      new Error(`${name}: unexpected nullish ${JSON.stringify(input)}`),
      assertNonNull,
    );
  }
}
