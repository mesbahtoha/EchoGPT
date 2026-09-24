"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ClipboardList,
  Palette,
  ShieldCheck,
  SlidersHorizontal,
  X
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { FacebookIcon, LinkedInIcon } from "./BrandIcons";
import { backdropAnim, dropdownAnim, modalAnim } from "@/lib/motion";
import { webModels } from "@/lib/models";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const MODEL_STORAGE_KEY = "echogpt-model";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-0 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#8b86a0] dark:text-slate-500">
      {children}
    </p>
  );
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme();
  const [themeOpen, setThemeOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [modelId, setModelId] = useState("echogpt");
  const themeRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        setThemeOpen(false);
        setModelOpen(false);
      }
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    try {
      const saved = window.localStorage.getItem(MODEL_STORAGE_KEY);
      if (saved && webModels.some((m) => m.id === saved)) setModelId(saved);
    } catch {
      /* ignore */
    }
    setThemeOpen(false);
    setModelOpen(false);
  }, [open ]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) setThemeOpen(false);
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) setModelOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open ]);

  function pickModel(id: string) {
    setModelId(id);
    setModelOpen(false);
    try {
      window.localStorage.setItem(MODEL_STORAGE_KEY, id);
      window.dispatchEvent(new CustomEvent("echogpt:model-change", { detail: id }));
    } catch {
      /* ignore */
    }
  }

  const themeLabel = theme === "dark" ? "Dark Mode" : "Light Mode";
  const activeModel = webModels.find((m) => m.id === modelId) ?? webModels[0];

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
            aria-label="Settings"
            {...modalAnim}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-[400px] overflow-y-auto rounded-2xl bg-white shadow-pop dark:bg-[#1e1930] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3.5 pt-4">
              <h2 className="text-[17px] font-medium text-[#211d33] dark:text-slate-100">Settings</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close settings"
                className="rounded-lg p-1 text-[#6b6584] transition hover:bg-slate-100 hover:text-[#211d33] dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100"
              >
                <X className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
              </button>
            </div>
            <div className="h-px bg-[#ece8f6] dark:bg-white/10" />

            <div className="px-5 py-4">
              <SectionLabel>App Settings</SectionLabel>

              {/* Color Theme */}
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <Palette className="h-[18px] w-[18px] text-[#36324d] dark:text-slate-300" strokeWidth={1.8} aria-hidden />
                  <span className="text-[14px] font-normal text-[#36324d] dark:text-slate-200">Color Theme</span>
                </span>
                <div ref={themeRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setThemeOpen((v) => !v);
                      setModelOpen(false);
                    }}
                    aria-haspopup="listbox"
                    aria-expanded={themeOpen}
                    className="flex w-[148px] items-center justify-between gap-2 rounded-[10px] border border-[#e3ddf2] bg-white px-3.5 py-2 text-[13.5px] font-normal text-[#36324d] transition hover:border-brand-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  >
                    {themeLabel}
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#8b86a0] transition-transform ${themeOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence>
                  {themeOpen && (
                    <motion.ul
                      role="listbox"
                      aria-label="Color theme"
                      {...dropdownAnim}
                      className="absolute right-0 top-[calc(100%+6px)] z-10 w-full origin-top overflow-hidden rounded-xl border border-[#e9e3f7] bg-white p-1 shadow-pop dark:border-white/10 dark:bg-[#262040]"
                    >
                      {(
                        [
                          { id: "light", label: "Light Mode" },
                          { id: "dark", label: "Dark Mode" }
                        ] as const
                      ).map((opt) => (
                        <li key={opt.id}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={theme === opt.id}
                            onClick={() => {
                              setTheme(opt.id);
                              setThemeOpen(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13.5px] transition ${
                              theme === opt.id
                                ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                                : "text-[#36324d] hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5"
                            }`}
                          >
                            {opt.label}
                            {theme === opt.id && <Check className="h-4 w-4" aria-hidden />}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Default Model */}
              <div className="mt-3.5 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <SlidersHorizontal className="h-[18px] w-[18px] text-[#36324d] dark:text-slate-300" strokeWidth={1.8} aria-hidden />
                  <span className="text-[14px] font-normal text-[#36324d] dark:text-slate-200">Default Model</span>
                </span>
                <div ref={modelRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setModelOpen((v) => !v);
                      setThemeOpen(false);
                    }}
                    aria-haspopup="listbox"
                    aria-expanded={modelOpen}
                    className="flex w-[148px] items-center justify-between gap-2 rounded-[10px] border border-[#e3ddf2] bg-white px-3.5 py-2 text-[13.5px] font-normal text-[#36324d] transition hover:border-brand-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  >
                    <span className="truncate">{activeModel.name}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#8b86a0] transition-transform ${modelOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence>
                  {modelOpen && (
                    <motion.ul
                      role="listbox"
                      aria-label="Default model"
                      {...dropdownAnim}
                      className="absolute right-0 top-[calc(100%+6px)] z-10 max-h-56 w-[200px] origin-top overflow-y-auto rounded-xl border border-[#e9e3f7] bg-white p-1 shadow-pop dark:border-white/10 dark:bg-[#262040]"
                    >
                      {webModels.map((m) => (
                        <li key={m.id}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={m.id === modelId}
                            onClick={() => pickModel(m.id)}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13.5px] transition ${
                              m.id === modelId
                                ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                                : "text-[#36324d] hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5"
                            }`}
                          >
                            {m.name}
                            {m.id === modelId && <Check className="h-4 w-4" aria-hidden />}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="my-4 h-px bg-[#ece8f6] dark:bg-white/10" />

              <SectionLabel>Terms and Conditions</SectionLabel>
              <div className="mt-1">
                <a
                  href="/support"
                  onClick={onClose}
                  className="group flex w-full items-center justify-between py-[10px] text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <ClipboardList className="h-[18px] w-[18px] text-[#36324d] dark:text-slate-300" strokeWidth={1.8} aria-hidden />
                    <span className="text-[14px] font-normal text-[#36324d] dark:text-slate-200">Terms of Use</span>
                  </span>
                  <span className="flex items-center gap-1 text-[13.5px] text-[#8b86a0] transition group-hover:text-[#36324d] dark:text-slate-500 dark:group-hover:text-slate-200">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                    Visit
                  </span>
                </a>
                <a
                  href="/support"
                  onClick={onClose}
                  className="group flex w-full items-center justify-between py-[10px] text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <ShieldCheck className="h-[18px] w-[18px] text-[#36324d] dark:text-slate-300" strokeWidth={1.8} aria-hidden />
                    <span className="text-[14px] font-normal text-[#36324d] dark:text-slate-200">Privacy Policy</span>
                  </span>
                  <span className="flex items-center gap-1 text-[13.5px] text-[#8b86a0] transition group-hover:text-[#36324d] dark:text-slate-500 dark:group-hover:text-slate-200">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                    Visit
                  </span>
                </a>
              </div>

              <div className="my-4 h-px bg-[#ece8f6] dark:bg-white/10" />

              <SectionLabel>Follow Us</SectionLabel>
              <div className="mt-1 pb-1">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-between py-[10px] text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <FacebookIcon />
                    <span className="text-[14px] font-normal text-[#36324d] dark:text-slate-200">Facebook</span>
                  </span>
                  <span className="flex items-center gap-1 text-[13.5px] text-[#8b86a0] transition group-hover:text-[#36324d] dark:text-slate-500 dark:group-hover:text-slate-200">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                    Visit
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-between py-[10px] text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <LinkedInIcon />
                    <span className="text-[14px] font-normal text-[#36324d] dark:text-slate-200">LinkedIn</span>
                  </span>
                  <span className="flex items-center gap-1 text-[13.5px] text-[#8b86a0] transition group-hover:text-[#36324d] dark:text-slate-500 dark:group-hover:text-slate-200">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                    Visit
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
