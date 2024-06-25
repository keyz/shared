export function typedArrayIncludes<T>(
  list: Array<T> | ReadonlyArray<T>,
  item: unknown,
): item is T {
  return list.includes(item as any);
}
