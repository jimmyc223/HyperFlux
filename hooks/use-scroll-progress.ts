"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Smoothly tracks how far `ref` has scrolled through a given pixel distance,
 * returning an eased 0–1 progress value.
 *
 * Why this exists: a mouse wheel scrolls the page in large discrete steps, so
 * any animation wired directly to `scrollY` looks "steppy" / janky. This hook
 * keeps a rendered value that is eased toward the real scroll target every
 * animation frame (a lerp), so scroll-linked motion glides with momentum even
 * when the underlying scroll jumps. The single rAF loop also batches updates to
 * one render per frame and parks itself once the value settles, so it costs
 * nothing while idle. Honors `prefers-reduced-motion` by snapping instantly.
 *
 * @param ref         the element whose scroll-through we measure
 * @param getDistance returns the px distance over which progress goes 0 → 1
 * @param ease        per-frame lerp factor; lower = floatier (0.08–0.16 is premium)
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  getDistance: () => number,
  ease = 0.12,
) {
  const [progress, setProgress] = useState(0);

  // Keep the latest distance getter without re-running the effect each render.
  const distanceRef = useRef(getDistance);
  distanceRef.current = getDistance;

  const frame = useRef<number | null>(null);
  const rendered = useRef(0);
  const target = useRef(0);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const distance = Math.max(1, distanceRef.current());
      const scrolled = -el.getBoundingClientRect().top;
      target.current = Math.min(1, Math.max(0, scrolled / distance));
    };

    const loop = () => {
      const t = target.current;
      // Ease toward target (snap instantly when reduced motion is requested).
      rendered.current += (t - rendered.current) * (reduceMotion ? 1 : ease);
      // Settle to avoid sub-pixel jitter, then stop the loop.
      if (Math.abs(t - rendered.current) < 0.0004) rendered.current = t;

      setProgress(rendered.current);
      frame.current =
        rendered.current === t ? null : requestAnimationFrame(loop);
    };

    const onScroll = () => {
      measure();
      if (frame.current == null) frame.current = requestAnimationFrame(loop);
    };

    // Initialise to the current position so the section doesn't animate on mount.
    measure();
    rendered.current = target.current;
    setProgress(target.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, [ref, ease]);

  return progress;
}
