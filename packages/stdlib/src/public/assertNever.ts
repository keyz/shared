import { recaptureErrorStack } from "./recaptureErrorStack";

export function assertNever(input: never, name: string): never {
  throw recaptureErrorStack(
    new Error(`${name}: unexpected non-never ${JSON.stringify(input)}`),
    assertNever,
  );
}
