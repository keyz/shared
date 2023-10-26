import { recaptureErrorStack } from "./recaptureErrorStack";

export function refineTypePredicate<T>(
  input: unknown,
  predicate: (input: unknown) => input is T,
  name: string,
): T {
  if (!predicate(input)) {
    throw recaptureErrorStack(
      new Error(
        `${name}: unexpected predicate result ${JSON.stringify(input)}`,
      ),
      refineTypePredicate,
    );
  }

  return input;
}
