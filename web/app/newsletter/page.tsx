"use client";

import { useState } from "react";
import { ArrowRight, BadgeCheck, Mail, ShieldCheck } from "lucide-react";
import AppShell from "@/components/AppShell";

const benefits = [
  {
    title: "Industry Trends",
    description: "Stay updated with the latest breakthroughs in LLMs and generative AI."
  },
  {
    title: "Power Usage",
    description: "Advanced techniques to get the most out of EchoGPT's toolset."
  },
  {
    title: "Early Access",
    description: "Be the first to test new models and experimental features."
  }
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setDone(true);
  }

  return (
    <AppShell>
      <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto w-full max-w-[1180px] px-5 pb-16 pt-14 sm:px-8">
          <h1 className="text-center text-[36px] font-extrabold leading-[1.1] tracking-tight text-ink-900 dark:text-slate-100 sm:text-[44px]">
            Elevate Your <span className="text-brand-600 dark:text-brand-300">AI Strategy</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[640px] text-center text-[16px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
            Join 50,000+ professionals receiving curated insights on AI productivity, industry trends,
            and exclusive EchoGPT features.
          </p>

          <form onSubmit={subscribe} className="mx-auto mt-10 w-full max-w-[450px]">
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                strokeWidth={2}
                aria-hidden
              />
              <label htmlFor="newsletter-email" className="sr-only">
                Enter your business email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setDone(false);
                }}
                placeholder="Enter your business email"
                className="h-14 w-full rounded-xl border border-[#E8E5EF] bg-white pl-12 pr-4 text-[15px] font-normal text-ink-900 shadow-[0_1px_3px_rgba(24,18,43,0.06)] placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
            <button
              type="submit"
              className="mt-3 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-brand-600 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(109,58,230,0.4)] transition hover:bg-brand-700 active:scale-[0.99]"
            >
              Join the Newsletter
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
            </button>
            {done && (
              <p role="status" className="mt-3 text-center text-[13px] font-medium text-emerald-600">
                You are on the list — check your inbox to confirm.
              </p>
            )}
          </form>

          <div className="mt-5 flex items-center justify-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4 text-brand-600" strokeWidth={2} aria-hidden />
              No spam policy
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <BadgeCheck className="h-4 w-4 text-brand-600" strokeWidth={2} aria-hidden />
              Premium insights
            </span>
          </div>

          <div className="mx-auto mt-12 grid max-w-[1060px] grid-cols-1 gap-5 sm:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group rounded-2xl border border-[#E8E5EF] bg-white p-6 shadow-[0_1px_3px_rgba(24,18,43,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-composer dark:border-white/10 dark:bg-[#1a1528] dark:hover:border-brand-500/30"
              >
                <h2 className="text-[16px] font-semibold text-ink-900 dark:text-slate-100">{b.title}</h2>
                <p className="mt-2 text-[13.5px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </AppShell>
  );
}
