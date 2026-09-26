"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  FileText,
  Mail,
  Printer,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";
import AppShell from "./AppShell";
import { externalLinks } from "@/lib/links";
import { cn } from "@/lib/cn";

export interface LegalSection {
  id: string;
  icon: LucideIcon;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
}

interface LegalLayoutProps {
  eyebrow: string;
  badgeIcon: LucideIcon;
  title: string;
  subtitle: string;
  updated: string;
  readingTime: string;
  summary: string[];
  sections: LegalSection[];
  related: { label: string; desc: string; href: string }[];
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function LegalLayout({
  eyebrow,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  updated,
  readingTime,
  summary,
  sections,
  related
}: LegalLayoutProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <AppShell>
      <main className="legal-scroll min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto w-full max-w-[1180px] px-5 pb-20 pt-10 sm:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px]">
            <a
              href="/"
              className="group inline-flex items-center gap-1.5 rounded-lg px-1 py-0.5 font-medium text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden />
              Back to app
            </a>
            <span aria-hidden className="text-slate-300 dark:text-slate-600">/</span>
            <a href="/support" className="rounded px-1 py-0.5 font-medium text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300">
              Support
            </a>
            <span aria-hidden className="text-slate-300 dark:text-slate-600">/</span>
            <span aria-current="page" className="px-1 py-0.5 font-semibold text-ink-900 dark:text-slate-100">
              {eyebrow}
            </span>
          </nav>

          {/* Hero */}
          <Reveal>
            <div className="relative mt-6 overflow-hidden rounded-3xl border border-[#E8E5EF] bg-gradient-to-br from-brand-50 via-white to-white p-7 shadow-card dark:border-white/10 dark:from-brand-500/10 dark:via-[#1a1528] dark:to-[#1a1528] sm:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-400/15 blur-3xl dark:bg-brand-500/10" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-fuchsia-400/10 blur-3xl" />
              <div className="relative">
                <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-[12px] font-semibold text-white shadow-[0_4px_14px_rgba(109,58,230,0.35)]">
                  <BadgeIcon className="h-3.5 w-3.5" aria-hidden />
                  {eyebrow}
                </p>
                <h1 className="mt-4 max-w-[720px] text-[30px] font-extrabold leading-[1.1] tracking-tight text-ink-900 dark:text-slate-100 sm:text-[42px]">
                  {title}
                </h1>
                <p className="mt-3 max-w-[680px] text-[15.5px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
                  {subtitle}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-brand-600 dark:text-brand-300" aria-hidden />
                    Last updated: {updated}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4 text-brand-600 dark:text-brand-300" aria-hidden />
                    {readingTime} read
                  </span>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-brand-600 transition hover:bg-brand-50 hover:text-brand-700 dark:text-brand-300 dark:hover:bg-white/5"
                  >
                    <Printer className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Summary */}
          <Reveal delay={0.05}>
            <div className="mt-6 rounded-2xl border border-brand-200/70 bg-brand-50/60 p-5 dark:border-brand-500/20 dark:bg-brand-500/10 sm:p-6">
              <p className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                The short version
              </p>
              <ul className="mt-3 space-y-2">
                {summary.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-[14px] font-normal leading-relaxed text-ink-700 dark:text-slate-300">
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* TOC — sticky on desktop, chips on mobile */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <nav aria-label="On this page" className="hidden lg:block">
                <p className="px-3 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
                  On this page
                </p>
                <ul className="mt-2 space-y-1">
                  {sections.map((s, i) => {
                    const isActive = active === s.id;
                    return (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          aria-current={isActive ? "true" : undefined}
                          className={cn(
                            "group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all duration-200",
                            isActive
                              ? "bg-brand-600 text-white shadow-[0_4px_14px_rgba(109,58,230,0.35)]"
                              : "text-[#55516b] hover:translate-x-0.5 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-brand-300"
                          )}
                        >
                          <span
                            className={cn(
                              "grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[11px] font-bold transition",
                              isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-brand-100 group-hover:text-brand-700 dark:bg-white/5 dark:text-slate-400"
                            )}
                          >
                            {i + 1}
                          </span>
                          <span className="truncate">{s.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 rounded-2xl border border-[#E8E5EF] bg-white p-4 shadow-card dark:border-white/10 dark:bg-[#1a1528]">
                  <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-900 dark:text-slate-100">
                    <Mail className="h-4 w-4 text-brand-600 dark:text-brand-300" aria-hidden />
                    Questions?
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">
                    We reply within one business day.
                  </p>
                  <a
                    href={externalLinks.email}
                    className="mt-2.5 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600 transition hover:gap-2 hover:text-brand-700 dark:text-brand-300"
                  >
                    {externalLinks.emailAddress}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              </nav>

              {/* Mobile chips */}
              <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden" role="navigation" aria-label="On this page">
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={cn(
                      "shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-medium transition active:scale-[0.97]",
                      active === s.id
                        ? "border-brand-600 bg-brand-600 text-white shadow-[0_4px_14px_rgba(109,58,230,0.35)]"
                        : "border-slate-200 bg-white text-ink-700 hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    )}
                  >
                    {i + 1}. {s.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="min-w-0 space-y-5">
              {sections.map((s, i) => (
                <Reveal key={s.id} delay={0.03 * (i % 3)}>
                  <section
                    id={s.id}
                    aria-labelledby={`${s.id}-heading`}
                    className="group scroll-mt-6 overflow-hidden rounded-2xl border border-[#E8E5EF] bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-composer dark:border-white/10 dark:bg-[#1a1528] dark:hover:border-brand-500/30 sm:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:bg-brand-500/15 dark:text-brand-300">
                        <s.icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                          Section {i + 1}
                        </p>
                        <h2 id={`${s.id}-heading`} className="mt-1 text-[19px] font-bold tracking-tight text-ink-900 dark:text-slate-100 sm:text-[21px]">
                          {s.title}
                        </h2>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3.5">
                      {s.paragraphs.map((p, j) => (
                        <p key={j} className="text-[14.5px] font-normal leading-relaxed text-[#55516b] dark:text-slate-400">
                          {p}
                        </p>
                      ))}
                      {s.bullets && (
                        <ul className="space-y-2 rounded-xl bg-slate-50 p-4 dark:bg-white/5">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-700 dark:text-slate-300">
                              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                      {s.note && (
                        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13.5px] leading-relaxed text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
                          {s.note}
                        </p>
                      )}
                    </div>
                  </section>
                </Reveal>
              ))}

              {/* Contact CTA */}
              <Reveal>
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 p-6 text-white shadow-[0_8px_28px_rgba(109,58,230,0.4)] sm:p-8">
                  <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15">
                      <FileText className="h-6 w-6" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[18px] font-bold">Still have questions about this policy?</h2>
                      <p className="mt-1 text-[14px] text-white/80">
                        Contact our team — we usually reply within one business day.
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                      <a
                        href={externalLinks.email}
                        className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-white px-5 text-[14px] font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50 hover:shadow-xl active:scale-[0.98]"
                      >
                        Email us <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </a>
                      <a
                        href="/support"
                        className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-white/40 px-5 text-[14px] font-semibold text-white transition hover:bg-white/10 active:scale-[0.98]"
                      >
                        Support <ArrowRight className="h-4 w-4" aria-hidden />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Related */}
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <a
                    key={r.href}
                    href={r.href}
                    className="group rounded-2xl border border-[#E8E5EF] bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-composer dark:border-white/10 dark:bg-[#1a1528] dark:hover:border-brand-500/30"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-[15px] font-semibold text-ink-900 transition group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-300">
                        {r.label}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-brand-600" aria-hidden />
                    </span>
                    <span className="mt-1.5 block text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
                      {r.desc}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
