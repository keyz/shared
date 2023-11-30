import { recaptureErrorStack } from "./recaptureErrorStack";

export function assertNever(input: never, name: string = "<unknown>"): never {
  throw recaptureErrorStack(
    new Error(`${name}: unexpected non-never ${JSON.stringify(input)}`),
    assertNever,
  );
}
