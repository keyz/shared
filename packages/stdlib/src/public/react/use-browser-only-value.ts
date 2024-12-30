// eslint-disable-next-line import/no-extraneous-dependencies
import { useSyncExternalStore } from "react";

const returnsUndefined = () => undefined;
const noopSubscribe = () => returnsUndefined;

export function useBrowserOnlyValue<T>(browserThunk: () => T): T | undefined {
  return useSyncExternalStore<T | undefined>(
    noopSubscribe,
    browserThunk, // client
    returnsUndefined, // server
  );
}
