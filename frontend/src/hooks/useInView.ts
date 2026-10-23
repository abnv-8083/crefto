import { useEffect, useRef, useState } from 'react';

/**
 * Returns a [ref, hasBeenInView] tuple.
 * Once the element enters the viewport (+ rootMargin), hasBeenInView
 * becomes true and stays true — so the component mounts once and never unmounts.
 */
export function useInView(rootMargin = '200px 0px'): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasBeenInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasBeenInView, rootMargin]);

  return [ref, hasBeenInView];
}
