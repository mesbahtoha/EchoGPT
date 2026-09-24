"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import AppShell from "@/components/AppShell";
import PageHeading from "@/components/PageHeading";

const filterOptions = ["All", "Today", "This week", "This month"];

export default function HistoryPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  return (
    <AppShell>
      <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto w-full max-w-[1020px] px-5 pb-16 pt-10 sm:px-8">
          <PageHeading
            title="My Chat History"
            subtitle="Access your complete chat history across diverse topics and interactions with different models or characters."
          />

          <div className="mx-auto mt-8 flex w-full max-w-[980px] flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
                strokeWidth={2}
                aria-hidden
              />
              <label htmlFor="history-search" className="sr-only">
                Search chat history
              </label>
              <input
                id="history-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chat history..."
                className="h-10 w-full rounded-[10px] border border-[#E8E5EF] bg-white pl-10 pr-3 text-[14px] font-normal text-ink-900 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
            <div className="relative shrink-0 sm:w-[230px]">
              <label htmlFor="history-filter" className="sr-only">
                Filter chat history
              </label>
              <select
                id="history-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-10 w-full appearance-none rounded-[10px] border border-brand-300 bg-white pl-3 pr-9 text-[14px] font-medium text-ink-900 focus:border-brand-400 focus:outline-none dark:border-brand-500/40 dark:bg-[#1a1528] dark:text-slate-100"
              >
                {filterOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
            </div>
          </div>

          <p className="mt-16 text-center text-[15px] font-normal text-slate-400 dark:text-slate-500">Empty Chat History</p>
        </div>
      </main>
    </AppShell>
  );
}
