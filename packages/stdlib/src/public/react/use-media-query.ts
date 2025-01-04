// eslint-disable-next-line import/no-extraneous-dependencies
import { useCallback, useRef, useSyncExternalStore } from "react";

const returnsUndefined = () => undefined;

export function useMediaQuery(query: string): boolean | undefined {
  const cacheRef = useRef<{ query: string; result: boolean } | null>(null);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const media = window.matchMedia(query);

      const abortController = new AbortController();

      media.addEventListener(
        "change",
        (event) => {
          const isDirty = cacheRef.current?.result !== event.matches;
          cacheRef.current = { query, result: event.matches };

          if (isDirty) {
            onStoreChange();
          }
        },
        { signal: abortController.signal },
      );

      return () => {
        abortController.abort();
      };
    },
    [query],
  );

  return useSyncExternalStore<boolean | undefined>(
    subscribe,
    (): boolean => {
      // client
      if (cacheRef.current?.query !== query) {
        const media = window.matchMedia(query);
        cacheRef.current = { query, result: media.matches };
      }

      return cacheRef.current.result;
    },
    returnsUndefined, // server
  );
}
