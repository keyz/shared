export function parseUrl(input: string): URL | null {
  try {
    return new URL(input);
  } catch (_) {
    return null;
  }
}
