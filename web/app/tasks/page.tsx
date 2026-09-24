"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import SearchInput from "@/components/SearchInput";
import { taskCards, taskTabs, type TaskTab } from "@/lib/tasks";
import { cn } from "@/lib/cn";

export default function TasksPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<TaskTab>("Ideas");

  const cards = useMemo(() => {
    const all = taskCards[tab];
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [query, tab]);

  return (
    <AppShell>
      <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto w-full max-w-[1180px] px-5 pb-16 pt-10 sm:px-8">
          <h1 className="text-center text-[30px] font-bold leading-tight text-ink-900 dark:text-slate-100">
            EchoGPT AI Tasks
          </h1>
          <p className="mx-auto mt-3 max-w-[900px] text-center text-[16px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
            Discover and create custom versions of ChatGPT that combine instructions, extra knowledge,
            and any combination of skills.
          </p>

          <div className="mx-auto mt-8 max-w-[1060px]">
            <SearchInput value={query} onChange={setQuery} placeholder="Search for the Apps" />
          </div>

          <div className="mx-auto mt-6 max-w-[1060px] border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-7" role="tablist" aria-label="Task categories">
              {taskTabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "relative pb-2.5 text-[15px] transition",
                    tab === t
                      ? "font-semibold text-brand-600 dark:text-brand-300"
                      : "font-normal text-slate-500 hover:text-ink-900 dark:text-slate-400 dark:hover:text-slate-100"
                  )}
                >
                  {t}
                  {tab === t && (
                    <span aria-hidden className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-brand-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {cards.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  className="rounded-[14px] border border-[#E8E5EF] bg-white p-6 text-left shadow-[0_1px_3px_rgba(24,18,43,0.05)] transition hover:shadow-composer dark:border-white/10 dark:bg-[#1a1528]"
                >
                  <span aria-hidden className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-[22px] dark:bg-brand-500/15">
                    {card.emoji}
                  </span>
                  <span className="mt-4 block text-[16px] font-semibold text-ink-900 dark:text-slate-100">{card.title}</span>
                  <span className="mt-2 block text-[13.5px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
                    {card.description}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-[15px] font-normal text-slate-400 dark:text-slate-500">
              No tasks match your search.
            </p>
          )}
        </div>
      </main>
    </AppShell>
  );
}
