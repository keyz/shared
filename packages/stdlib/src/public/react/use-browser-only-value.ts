import { useSyncExternalStore } from "react";

const noop = () => undefined;
const emptySubscribe = () => noop;

export function useBrowserOnlyValue<T>(browserThunk: () => T): T | undefined {
  return useSyncExternalStore<T | undefined>(
    emptySubscribe,
    browserThunk, // client
    noop, // server
  );
}
