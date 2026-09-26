"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareText, Plus, Search, X } from "lucide-react";
import { recentConversations, type Conversation } from "@/lib/conversations";
import { backdropAnim, drawerAnim } from "@/lib/motion";
import { useDialogFocus } from "@/lib/useDialogFocus";

interface HistorySidebarProps {
  open: boolean;
  onClose: () => void;
  onPick: (title: string) => void;
  onNewChat: () => void;
}

function groupOf(c: Conversation): string {
  const t = c.time.toLowerCase();
  if (t.includes("m ago") || t.includes("h ago") || t === "today") return "Today";
  if (t.includes("yesterday")) return "Yesterday";
  return "Previous";
}

export default function HistorySidebar({ open, onClose, onPick, onNewChat }: HistorySidebarProps) {
  const [query, setQuery] = useState("");
  const focusRef = useDialogFocus<HTMLElement>(open);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      setQuery("");
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll while the drawer is open (mobile).
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open ]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? recentConversations.filter(
          (c) => c.title.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q)
        )
      : recentConversations;
    const order = ["Today", "Yesterday", "Previous"];
    return order
      .map((label) => ({ label, items: list.filter((c) => groupOf(c) === label) }))
      .filter((g) => g.items.length > 0);
  }, [query]);

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
            aria-label="Chat history"
            {...drawerAnim}
            ref={focusRef}
            tabIndex={-1}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-[min(92vw,380px)] flex-col border-l border-brand-100 bg-white shadow-pop dark:border-white/10 dark:bg-[#161224] sm:w-[380px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 pt-5">
              <h2 className="text-[17px] font-semibold text-ink-900 dark:text-slate-100">History</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close history"
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-ink-900 dark:hover:bg-white/10 dark:hover:text-slate-100"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 pb-3">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <label htmlFor="history-drawer-search" className="sr-only">
                  Search history
                </label>
                <input
                  id="history-drawer-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search chats..."
                  className="h-10 w-full rounded-[10px] border border-[#E8E5EF] bg-white pl-9 pr-3 text-[14px] text-ink-900 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* List */}
            <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
              {groups.length === 0 ? (
                <p className="mt-10 px-2 text-center text-[14px] text-slate-400 dark:text-slate-500">
                  No chats match your search.
                </p>
              ) : (
                groups.map((g) => (
                  <div key={g.label} className="mb-4 last:mb-0">
                    <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-400 dark:text-slate-500">
                      {g.label}
                    </p>
                    <ul className="space-y-1">
                      {g.items.map((c) => (
                        <li key={c.id}>
                          <button
                            type="button"
                            onClick={() => {
                              onPick(c.title);
                              onClose();
                            }}
                            className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition hover:bg-brand-50 dark:hover:bg-white/5"
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                              <MessageSquareText className="h-[18px] w-[18px]" aria-hidden />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[14px] font-semibold text-ink-900 dark:text-slate-100">
                                {c.title}
                              </span>
                              <span className="block truncate text-[12.5px] text-slate-500 dark:text-slate-400">
                                {c.preview}
                              </span>
                            </span>
                            <span className="shrink-0 text-[11px] text-slate-400 dark:text-slate-500">
                              {c.time}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-brand-100/80 px-5 py-4 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  onNewChat();
                  onClose();
                }}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-[11px] bg-brand-600 px-3 text-[15px] font-semibold text-white shadow-[0_6px_16px_rgba(109,58,230,0.35)] transition hover:bg-brand-700 active:scale-[0.99]"
              >
                <Plus className="h-5 w-5" strokeWidth={2} aria-hidden />
                New Chat
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
