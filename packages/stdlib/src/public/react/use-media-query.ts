// eslint-disable-next-line import/no-extraneous-dependencies
import { useCallback, useRef, useSyncExternalStore } from "react";
import { refineNonNull } from "../refineNonNull";

const noop = () => undefined;

export function useMediaQuery(query: string): boolean | undefined {
  const resultRef = useRef<boolean | null>(null);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const media = window.matchMedia(query);
      resultRef.current = media.matches; // update immediately

      media.addEventListener("change", (event) => {
        resultRef.current = event.matches;
        onStoreChange();
      });
      return () => {
        media.removeEventListener("change", onStoreChange);
      };
    },
    [query],
  );

  return useSyncExternalStore<boolean | undefined>(
    subscribe,
    () => refineNonNull(resultRef.current, "resultRef.current"),
    noop, // server
  );
}
