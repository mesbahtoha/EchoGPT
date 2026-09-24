"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { webModels } from "@/lib/models";
import { dropdownAnim } from "@/lib/motion";

interface ModelSelectorProps {
  modelId: string;
  onChange: (id: string) => void;
}

export default function ModelSelector({ modelId, onChange }: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = webModels.find((m) => m.id === modelId) ?? webModels[0];

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex min-w-0 items-center gap-[9px] rounded-lg px-[7px] py-[5px] text-[13px] font-semibold text-ink-900 transition hover:bg-brand-50 dark:text-slate-100 dark:hover:bg-white/10 sm:text-[15px]"
      >
        <img src="/logo.svg" alt="" aria-hidden width={31} height={31} className="h-7 w-7 shrink-0 rounded-lg sm:h-[31px] sm:w-[31px]" />
        <span className="max-w-[90px] truncate sm:max-w-[121px]">{active.name}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform sm:h-5 sm:w-5 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Select model"
            {...dropdownAnim}
            className="absolute left-0 top-[calc(100%+8px)] z-30 w-[282px] origin-top-left overflow-hidden rounded-xl border border-brand-100 bg-white p-[7px] shadow-pop dark:border-white/10 dark:bg-[#221d33]"
          >
            {webModels.map((m) => {
              const selected = m.id === modelId;
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(m.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-[11px] rounded-lg px-[13px] py-[9px] text-left transition ${
                      selected
                        ? "bg-brand-50 dark:bg-brand-500/15"
                        : "hover:bg-slate-50 dark:hover:bg-white/5"
                    }`}
                  >
                    <span className="flex-1">
                      <span className="flex items-center gap-2 text-[15px] font-semibold text-ink-900 dark:text-slate-100">
                        {m.name}
                        {m.tag && (
                          <span className="rounded bg-brand-100 px-1.5 py-[1px] text-[10px] font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                            {m.tag}
                          </span>
                        )}
                      </span>
                      <span className="block text-[13px] text-slate-500 dark:text-slate-400">{m.description}</span>
                    </span>
                    {selected && <Check className="h-[18px] w-[18px] text-brand-600 dark:text-brand-300" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
