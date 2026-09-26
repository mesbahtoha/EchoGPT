import { useEffect, useRef, useState } from "react";

/**
 * Delayed-unmount helper for exit animations (no animation library needed).
 * While `open` is true the content is visible; when it flips to false,
 * `closing` becomes true for `duration`ms so a CSS exit animation can play,
 * then the content unmounts.
 */
export function useExitAnimation(open: boolean, duration = 160) {
  const [visible, setVisible] = useState(open);
  const [closing, setClosing] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      if (timer.current !== null) window.clearTimeout(timer.current);
      setClosing(false);
      setVisible(true);
      return;
    }
    if (!visible) return;
    setClosing(true);
    timer.current = window.setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, duration);
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, [open, visible, duration]);

  return { visible, closing };
}
