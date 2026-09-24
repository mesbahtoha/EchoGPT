"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import SearchInput from "@/components/SearchInput";
import { storeApps } from "@/lib/store";

export default function StorePage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return storeApps;
    return storeApps.filter(
      (a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <AppShell>
      <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto w-full max-w-[1180px] px-5 pb-16 pt-10 sm:px-8">
          <h1 className="text-center text-[30px] font-bold leading-tight text-ink-900 dark:text-slate-100">
            EchoGPT Store
          </h1>
          <p className="mx-auto mt-3 max-w-[680px] text-center text-[16px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
            Discover and create custom versions of ChatGPT that combine instructions, extra knowledge,
            and any combination of skills.
          </p>

          <div className="mx-auto mt-8 max-w-[1060px]">
            <SearchInput value={query} onChange={setQuery} placeholder="Search for the Apps" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((app) => (
              <article
                key={app.id}
                className="flex min-h-[218px] flex-col rounded-[14px] border border-[#E8E5EF] bg-white p-6 shadow-[0_1px_3px_rgba(24,18,43,0.05)] dark:border-white/10 dark:bg-[#1a1528]"
              >
                <div className="flex items-start justify-between gap-3">
                  {app.logo ? (
                    <img
                      src={app.logo}
                      alt={`${app.name} logo`}
                      width={44}
                      height={44}
                      className="h-11 w-11 shrink-0 rounded-xl"
                    />
                  ) : app.glyph ? (
                    <span
                      role="img"
                      aria-label={`${app.name} logo`}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-100 bg-white shadow-[0_1px_2px_rgba(24,18,43,0.06)] dark:border-white/10"
                    >
                      <svg
                        viewBox={app.glyph.viewBox}
                        aria-hidden
                        className="h-6 w-6"
                        fill={app.glyph.color}
                      >
                        {app.glyph.paths.map((p, i) => (
                          <path key={i} d={p.d} fillRule={p.fillRule as "evenodd" | undefined} />
                        ))}
                      </svg>
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[15px] font-bold text-white"
                      style={{ background: app.badgeBg }}
                    >
                      {app.initials}
                    </span>
                  )}
                  <button
                    type="button"
                    className="shrink-0 rounded-full border border-slate-200 px-4 py-[7px] text-[13px] font-medium text-ink-900 transition hover:border-brand-400 hover:text-brand-700 dark:border-white/10 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
                  >
                    Try App
                  </button>
                </div>
                <h2 className="mt-4 text-[16px] font-semibold text-ink-900 dark:text-slate-100">{app.name}</h2>
                <p className="mt-2 flex-1 text-[13.5px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
                  {app.description}
                </p>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-center text-[15px] font-normal text-slate-400 dark:text-slate-500">
              No apps match your search.
            </p>
          )}
        </div>
      </main>
    </AppShell>
  );
}
