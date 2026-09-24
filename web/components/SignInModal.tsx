"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import LoginCard from "./LoginCard";
import { backdropAnim, modalAnim } from "@/lib/motion";

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignInModal({ open, onClose }: SignInModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          {...backdropAnim}
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#18122b]/45 p-4 backdrop-blur-[2px]"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Sign in to EchoGPT"
            {...modalAnim}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[440px]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sign in"
              className="absolute -right-2 -top-2 z-10 rounded-full border border-slate-200 bg-white p-1.5 text-slate-400 shadow-md transition hover:text-ink-900 dark:border-white/10 dark:bg-[#262040] dark:hover:text-slate-100"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
            <LoginCard compact onDone={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
