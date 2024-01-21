import { recaptureErrorStack } from "./recaptureErrorStack.js";

export function refineNonNull<T>(
  input: T | null | undefined,
  name: string = "<unknown>",
): T {
  if (input == null) {
    throw recaptureErrorStack(
      new Error(`${name}: unexpected nullish ${JSON.stringify(input)}`),
      refineNonNull,
    );
  }

  return input;
}
