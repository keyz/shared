export function isNonNull<T>(input: T | null | undefined): input is T {
  return input != null;
}
