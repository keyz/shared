import { typedObjectKeys } from "./typedObjectKeys";
import type { TAnyLiteralObject } from "./types";

export function sortObject<const T extends TAnyLiteralObject>(
  input: T,
  compareFn: (x: keyof T, y: keyof T) => number,
): T {
  const keyList = typedObjectKeys(input);
  keyList.sort(compareFn);

  const result = {} as any as T;
  for (const key of keyList) {
    result[key] = input[key];
  }

  return result;
}
