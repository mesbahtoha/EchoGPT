"use client";

import { useState } from "react";
import { Expand, LayoutGrid } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useToast } from "@/components/Toast";
import { cn } from "@/lib/cn";

const allModels = ["EchoGPT", "DeepSeek V4 Pro", "Nemotron 3 Ultra"];

const avatarColors = ["#6d3ae6", "#3fa9f5", "#f5a623"];

export default function ComparePage() {
  const toast = useToast();
  const [mode, setMode] = useState<"compare" | "focus">("focus");
  const [selected, setSelected] = useState<string[]>(allModels);
  const [input, setInput] = useState("");

  function toggleModel(m: string) {
    setSelected((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
  }

  const indicator =
    selected.length === 0
      ? "No model selected"
      : selected.length === 1
        ? selected[0]
        : `${selected[0]} +${selected.length - 1} more`;

  return (
    <AppShell>
      <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full flex-col px-5 pb-8 pt-8 sm:px-8">
          {/* Focus switch */}
          <div
            className="mx-auto flex items-center gap-1 rounded-full border border-[#E8E5EF] bg-white p-1 dark:border-white/10 dark:bg-[#1a1528]"
            role="group"
            aria-label="Compare or Focus"
          >
            {(
              [
                { id: "compare", label: "Compare", icon: LayoutGrid },
                { id: "focus", label: "Focus", icon: Expand }
              ] as const
            ).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                aria-pressed={mode === id}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-5 py-2 text-[14px] font-semibold transition",
                  mode === id
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-ink-900 dark:text-slate-400 dark:hover:text-slate-100"
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                {label}
              </button>
            ))}
          </div>

          {/* Model pills — shown in Focus mode only, like the live reference */}
          {mode === "focus" && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {allModels.map((m) => {
              const on = selected.includes(m);
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleModel(m)}
                  aria-pressed={on}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[13px] font-medium transition",
                    on
                      ? "border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/15 dark:text-brand-300"
                      : "border-slate-200 bg-white text-slate-500 hover:border-brand-300 dark:border-white/10 dark:bg-[#1a1528] dark:text-slate-400"
                  )}
                >
                  {m}
                </button>
              );
            })}
          </div>
          )}

          {/* Empty message */}
          <div className="grid min-w-0 flex-1 place-items-center py-10">
            <p className="max-w-[420px] text-center text-[15px] font-normal leading-relaxed text-slate-400 dark:text-slate-500">
              Ask one question and see how 3 models answer it.
            </p>
          </div>

          {/* Compare composer */}
          <div className="min-h-[148px] rounded-[13px] border border-[#E8E5EF] bg-white p-4 shadow-composer dark:border-white/10 dark:bg-[#1a1528]">
            <label htmlFor="compare-input" className="sr-only">
              Message 3 models
            </label>
            <textarea
              id="compare-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
              placeholder="Message 3 models..."
              className="min-h-[56px] w-full resize-none bg-transparent text-[16px] font-normal text-ink-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
            />
            <div className="mt-2 flex min-w-0 items-end justify-between gap-3">
              <div className="min-w-0">
                <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#E8E5EF] px-3 py-1.5 dark:border-white/10">
                  <span className="flex shrink-0 items-center" aria-hidden>
                    {allModels.slice(0, 3).map((m, i) => (
                      <span
                        key={m}
                        className="-ml-1 grid h-5 w-5 place-items-center rounded-full text-[9px] font-bold text-white ring-2 ring-white first:ml-0"
                        style={{ background: avatarColors[i % avatarColors.length] }}
                      >
                        {m.charAt(0)}
                      </span>
                    ))}
                  </span>
                  <span className="truncate text-[13px] font-semibold text-ink-900 dark:text-slate-100">{indicator}</span>
                </span>
                <p className="mt-1.5 text-[11px] font-normal text-slate-400 dark:text-slate-500">
                  Every selected model answers the same prompt.
                </p>
              </div>
              <button
                type="button"
                onClick={() => toast("Demo: multi-model comparison runs on the live site")}
                className="h-10 w-[110px] shrink-0 rounded-[10px] bg-brand-600 text-[14px] font-semibold text-white shadow-[0_4px_12px_rgba(109,58,230,0.3)] transition hover:bg-brand-700 active:scale-[0.98]"
              >
                Compare
              </button>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
