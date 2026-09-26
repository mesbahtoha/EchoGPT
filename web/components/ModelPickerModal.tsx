"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { backdropAnim, modalAnim } from "@/lib/motion";
import { useDialogFocus } from "@/lib/useDialogFocus";
import type { ImageModelGroup } from "@/lib/imageModels";

interface ModelPickerModalProps {
  open: boolean;
  onClose: () => void;
  groups: ImageModelGroup[];
  value: string;
  onChange: (name: string) => void;
}

export default function ModelPickerModal({ open, onClose, groups, value, onChange }: ModelPickerModalProps) {
  const focusRef = useDialogFocus<HTMLDivElement>(open);
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
          className="fixed inset-0 z-50 grid place-items-center bg-[#18122b]/45 p-4 backdrop-blur-[2px]"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Choose a model"
            {...modalAnim}
            ref={focusRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[85vh] w-full max-w-[600px] flex-col overflow-hidden rounded-2xl bg-white shadow-pop dark:bg-[#1e1930] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pb-1 pt-5">
              <div>
                <h2 className="text-[18px] font-bold text-[#211d33] dark:text-slate-100">Choose a model</h2>
                <p className="mt-1 text-[14px] font-normal text-[#777386] dark:text-slate-400">
                  Picks the model used for your next generation.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close model picker"
                className="rounded-full border border-slate-300 p-1 text-[#6b6584] transition hover:bg-slate-100 hover:text-[#211d33] dark:border-white/15 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100"
              >
                <X className="h-4 w-4" strokeWidth={2} aria-hidden />
              </button>
            </div>

            {/* Scrollable cards */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-3">
              {groups.map((group) => (
                <div key={group.label} className="mb-5 last:mb-0">
                  <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.06em] text-[#8b86a0] dark:text-slate-500">
                    {group.label}
                  </p>
                  <div className="space-y-2.5">
                    {group.models.map((m) => {
                      const selected = m.name === value;
                      return (
                        <button
                          key={m.name}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          onClick={() => {
                            onChange(m.name);
                            onClose();
                          }}
                          className={cn(
                            "flex w-full items-center justify-between gap-3 rounded-[12px] border px-4 py-3 text-left transition",
                            selected
                              ? "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-500/15"
                              : "border-[#e6e1f2] bg-white hover:border-brand-300 hover:bg-brand-50/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-400/50 dark:hover:bg-white/10"
                          )}
                        >
                          <span className="min-w-0">
                            <span className="block text-[14px] font-semibold text-[#211d33] dark:text-slate-100">
                              {m.name}
                            </span>
                            {m.description && (
                              <span className="mt-0.5 block text-[13px] font-normal leading-snug text-[#777386] dark:text-slate-400">
                                {m.description}
                              </span>
                            )}
                          </span>
                          {selected && (
                            <span
                              aria-hidden
                              className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-600 text-white"
                            >
                              <Check className="h-3.5 w-3.5" strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
