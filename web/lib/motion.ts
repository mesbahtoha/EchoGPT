/**
 * Shared open/close motion tokens for EchoGPT web.
 * Every modal, drawer, dropdown, and popover uses these so motion feels
 * identical across the app (industry-standard fast ease-out language).
 */

export const backdropAnim = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
} as const;

export const modalAnim = {
  initial: { opacity: 0, scale: 0.96, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 10 },
  transition: { duration: 0.18, ease: "easeOut" as const }
};

export const drawerAnim = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { type: "tween" as const, duration: 0.22, ease: "easeOut" as const }
};

export const dropdownAnim = {
  initial: { opacity: 0, y: 6, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 6, scale: 0.98 },
  transition: { duration: 0.15, ease: "easeOut" as const }
};

export const accordionAnim = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto" as const, opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.2, ease: "easeOut" as const }
};
