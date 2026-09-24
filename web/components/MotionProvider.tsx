"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global motion standard for EchoGPT web:
 * - one consistent spring-free tween language (fast, easeOut)
 * - automatically disables animation for users who prefer reduced motion
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
