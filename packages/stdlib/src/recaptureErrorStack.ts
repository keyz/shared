/**
 * https://nodejs.org/api/errors.html#errorcapturestacktracetargetobject-constructoropt
 */
export function recaptureErrorStack<T extends Error | unknown>(
  error: T,
  // eslint-disable-next-line @typescript-eslint/ban-types
  fn: Function,
): T {
  if (error instanceof Error) {
    Error.captureStackTrace?.(error, fn);
  }

  return error;
}
