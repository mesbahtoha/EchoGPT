"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { backdropAnim, drawerAnim } from "@/lib/motion";

interface JobHistorySidebarProps {
  open: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

export default function JobHistorySidebar({ open, onClose, onNewChat }: JobHistorySidebarProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open ]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            {...backdropAnim}
            className="fixed inset-0 z-40 bg-[#18122b]/45 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Job Analysis History"
            {...drawerAnim}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-[min(92vw,380px)] flex-col bg-[#faf8ff] shadow-pop dark:bg-[#161224] sm:w-[380px]"
          >
            <div className="flex items-center justify-between px-5 pb-3 pt-5">
              <h2 className="text-[17px] font-bold text-ink-900 dark:text-slate-100">
                Job Analysis History
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close job history"
                className="rounded-[10px] bg-red-500 p-2 text-white transition hover:bg-red-600 active:scale-95"
              >
                <X className="h-5 w-5" strokeWidth={2.5} aria-hidden />
              </button>
            </div>

            <div className="px-5 pb-4">
              <button
                type="button"
                onClick={() => {
                  onNewChat();
                  onClose();
                }}
                className="h-11 w-full rounded-[10px] border border-brand-400 bg-brand-50 text-[14px] font-medium text-brand-600 transition hover:bg-brand-100 active:scale-[0.99] dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/15"
              >
                + New Chat
              </button>
            </div>

            <div className="grid min-h-0 flex-1 place-items-center px-5 pb-10">
              <p className="text-[15px] font-normal text-slate-500 dark:text-slate-400">
                No jobs found.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
