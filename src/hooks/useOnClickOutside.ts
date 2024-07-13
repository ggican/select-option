import { RefObject, useEffect } from "react";

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void,
  mouseEvent: "mousedown" | "mouseup" = "mousedown",
): void {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    window.addEventListener(mouseEvent, listener);

    return () => {
      window.removeEventListener(mouseEvent, listener);
    };
  }, [handler, mouseEvent, ref]);
}
