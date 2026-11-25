import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const DEFAULT_DURATION_MS = 1200;

const easeOutCubic = (progress: number): number => 1 - Math.pow(1 - progress, 3);

// requestAnimationFrame hanya berjalan selama hitung naik berlangsung, lalu berhenti sendiri.
export function useCountUp(target: number, active: boolean, durationMs: number = DEFAULT_DURATION_MS): number {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || reduceMotion) return;

    let frameId = 0;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / durationMs, 1);
      setValue(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, active, durationMs, reduceMotion]);

  if (reduceMotion) return target;
  return active ? value : 0;
}
