import { useCallback, useRef } from "react";

export function useInfiniteScroll(callback: () => void, deps: unknown[] = []) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) callback();
    });

    if (node) observerRef.current.observe(node);
  }, deps);

  return lastElementRef;
}
