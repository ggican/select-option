import { useEffect, useRef, useState } from "react";

export type DetectBottomPositionResultType = "BOTTOM" | "TOP" | "";

export function useOnDetectBottomPosition(
  ref: React.RefObject<HTMLDivElement>,
): DetectBottomPositionResultType {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState<DetectBottomPositionResultType>("");
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsOnScreen("BOTTOM");
        } else {
          setIsOnScreen("TOP");
        }
      },
      {
        rootMargin: `0px 0px -250px 0px`,
        threshold: 0,
      },
    );
  }, []);

  useEffect(() => {
    if (observerRef?.current && ref?.current) {
      observerRef?.current.observe(ref?.current);
    }

    return () => {
      if (observerRef?.current) observerRef?.current.disconnect();
    };
  }, [ref]);

  return isOnScreen;
}
