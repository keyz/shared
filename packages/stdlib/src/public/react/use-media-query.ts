// eslint-disable-next-line import/no-extraneous-dependencies
import { useCallback, useRef, useSyncExternalStore } from "react";
import { refineNonNull } from "../refineNonNull";

const returnsUndefined = () => undefined;

export function useMediaQuery(query: string): boolean | undefined {
  const resultRef = useRef<boolean | null>(null);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const media = window.matchMedia(query);
      resultRef.current = media.matches; // update immediately

      const abortController = new AbortController();

      media.addEventListener(
        "change",
        (event) => {
          resultRef.current = event.matches;
          onStoreChange();
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
    () => refineNonNull(resultRef.current, "resultRef.current"),
    returnsUndefined, // server
  );
}
