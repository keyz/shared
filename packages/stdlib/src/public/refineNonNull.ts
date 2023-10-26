import { recaptureErrorStack } from "./recaptureErrorStack";

export function refineNonNull<T>(input: T | null | undefined, name: string): T {
  if (input == null) {
    throw recaptureErrorStack(
      new Error(`${name}: unexpected nullish ${JSON.stringify(input)}`),
      refineNonNull,
    );
  }

  return input;
}
