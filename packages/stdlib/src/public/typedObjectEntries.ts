import type { TAnyLiteralObject } from "./types";

// https://stackoverflow.com/a/60142095
export function typedObjectEntries<const T extends TAnyLiteralObject>(
  input: T,
): Array<
  {
    [K in keyof T]: [K, T[K]];
  }[keyof T]
> {
  return Object.entries(input) as any as Array<
    {
      [K in keyof T]: [K, T[K]];
    }[keyof T]
  >;
}
