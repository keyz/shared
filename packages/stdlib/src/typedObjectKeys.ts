import type { TAnyLiteralObject } from "./types.js";

export function typedObjectKeys<const T extends TAnyLiteralObject>(
  input: T,
): Array<keyof T> {
  return Object.keys(input) as any as Array<keyof T>;
}
