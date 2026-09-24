"use client";

import {
  AlertCircle,
  Briefcase,
  FlaskConical,
  Globe,
  GraduationCap,
  Palette,
  Sparkles,
  Users,
  type LucideIcon
} from "lucide-react";
import AppShell from "@/components/AppShell";

const stats: { icon: LucideIcon; title: string; lines: string[] }[] = [
  { icon: Sparkles, title: "AI-Enhanced", lines: ["Powered by Google", "Gemini"] },
  { icon: Globe, title: "6 Countries", lines: ["Country-specific", "guidelines"] },
  { icon: Users, title: "4 Templates", lines: ["Academic,", "Professional, Research,", "Creative"] }
];

const templates: { icon: LucideIcon; title: string; description: string; tags: string[] }[] = [
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description: "Ideal for students with strong academic records applying to graduate programs.",
    tags: ["Academic", "Graduate Studies", "Scholarships"]
  },
  {
    icon: Briefcase,
    title: "Professional Track",
    description: "Designed for applicants with significant work experience seeking advanced degrees.",
    tags: ["Career", "Professional Development", "MBA"]
  },
  {
    icon: FlaskConical,
    title: "Research Focused",
    description: "Perfect for research-oriented applicants targeting PhD or research-intensive programs.",
    tags: ["Research", "PhD", "Innovation"]
  },
  {
    icon: Palette,
    title: "Creative Arts",
    description: "Tailored for applicants to creative programs like fine arts, design, or writing.",
    tags: ["Creative", "Arts", "Portfolio"]
  }
];

export default function SopPage() {
  return (
    <AppShell>
      <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        {/* Lavender hero */}
        <div className="bg-[#F6F4FF] px-5 pb-12 pt-10 dark:bg-[#141122] sm:px-8">
          <div className="mx-auto max-w-[900px] text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-600 text-white shadow-[0_10px_28px_rgba(109,58,230,0.45)]">
              <GraduationCap className="h-8 w-8" strokeWidth={2} aria-hidden />
            </span>
            <h1 className="mt-5 text-[32px] font-bold leading-tight text-brand-600 dark:text-brand-300 sm:text-[40px]">
              AI-Powered SOP Builder
            </h1>
            <p className="mx-auto mt-3 max-w-[620px] text-[16px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
              Create compelling Statements of Purpose with AI assistance, tailored for your dream
              university and destination country.
            </p>

            <div className="mx-auto mt-8 grid max-w-[660px] grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map(({ icon: Icon, title, lines }) => (
                <div
                  key={title}
                  className="rounded-[14px] border border-[#E8E5EF] bg-white px-4 py-5 text-center shadow-[0_1px_3px_rgba(24,18,43,0.05)] dark:border-white/10 dark:bg-[#1a1528]"
                >
                  <span className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </span>
                  <p className="mt-3 text-[17px] font-bold text-ink-900 dark:text-slate-100">{title}</p>
                  {lines.map((l) => (
                    <p key={l} className="text-[12px] font-normal leading-snug text-[#777386] dark:text-slate-400">
                      {l}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* White template section */}
        <div className="bg-white px-5 pb-16 pt-10 dark:bg-[#100d1a] sm:px-8">
          <div className="mx-auto max-w-[1180px]">
            <h2 className="text-center text-[26px] font-semibold text-brand-600 dark:text-brand-300">
              Choose Your SOP Template
            </h2>
            <p className="mx-auto mt-3 max-w-[680px] text-center text-[14px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
              Select the template that best matches your background and the focus of your application.
              Each template is optimized for different types of applicants and academic goals.
            </p>

            <div className="mx-auto mt-8 grid max-w-[1060px] grid-cols-1 gap-5 lg:grid-cols-2">
              {templates.map(({ icon: Icon, title, description, tags }) => (
                <button
                  key={title}
                  type="button"
                  className="rounded-[14px] border border-[#E8E5EF] bg-white p-5 text-left shadow-[0_1px_3px_rgba(24,18,43,0.05)] transition hover:shadow-composer dark:border-white/10 dark:bg-[#1a1528]"
                >
                  <span className="flex min-w-0 items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold text-ink-900 dark:text-slate-100">{title}</span>
                      <span className="mt-1 block text-[12.5px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
                        {description}
                      </span>
                    </span>
                  </span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </span>
                </button>
              ))}
            </div>

            <div
              role="alert"
              className="mx-auto mt-8 grid max-w-[1060px] place-items-center rounded-[14px] border border-[#E8E5EF] bg-white px-5 py-12 text-center shadow-[0_1px_3px_rgba(24,18,43,0.05)] dark:border-white/10 dark:bg-[#1a1528]"
            >
              <AlertCircle className="h-10 w-10 text-red-500" strokeWidth={2} aria-hidden />
              <p className="mt-4 text-[16px] font-semibold text-red-600 dark:text-red-400">
                Failed to load SOP history
              </p>
              <p className="mt-2 text-[14px] font-normal text-[#777386] dark:text-slate-400">
                Please try again later or contact support.
              </p>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
