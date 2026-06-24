import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  /** How much of the element must be visible before it reveals (0–1). */
  threshold?: number;
  /** Root margin passed to the IntersectionObserver. */
  rootMargin?: string;
}

/**
 * Reveals an element once, the first time it scrolls into view. Returns a ref
 * to attach to the target and a boolean that flips to `true` a single time
 * (the observer disconnects after firing — it never re-animates on scroll back).
 *
 * Respects `prefers-reduced-motion`: when the user opts out of motion, the
 * element is considered revealed immediately so nothing animates.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = options;
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isRevealed };
}

/**
 * Base transition classes for a scroll-revealed element. Pair with
 * `revealStateClass(isRevealed)`. Disabled under `prefers-reduced-motion`.
 */
export const revealBaseClass =
  'transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none';

/** Hidden vs. revealed state classes for a scroll-revealed element. */
export function revealStateClass(isRevealed: boolean): string {
  return isRevealed
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-5 motion-reduce:opacity-100';
}
