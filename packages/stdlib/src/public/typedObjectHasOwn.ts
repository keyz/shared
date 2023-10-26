export function typedObjectHasOwn<const O extends object>(
  obj: O,
  key: PropertyKey,
): key is keyof O {
  return Object.hasOwn(obj, key);
}
