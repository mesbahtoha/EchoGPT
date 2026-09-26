"use client";

import { useState } from "react";
import { Clock, Lightbulb, Plus, SendHorizontal } from "lucide-react";
import AppShell from "@/components/AppShell";
import JobHistorySidebar from "@/components/JobHistorySidebar";
import { useToast } from "@/components/Toast";

const features = [
  {
    title: "Analyze Job Description",
    description: "Instantly get AI-powered insights for any job posting."
  },
  {
    title: "Tailor Your Resume",
    description: "Get suggestions to match your CV to the job requirements."
  },
  {
    title: "Prepare for Interviews",
    description: "Practice with AI-generated interview questions and tips."
  },
  {
    title: "Skill Gap Analysis",
    description: "Discover key skills to focus on for your target role."
  }
];

export default function ResumePage() {
  const toast = useToast();
  const [jobText, setJobText] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <AppShell>
      <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-[1080px] flex-col px-5 pb-12 pt-12 sm:px-8">
          <h1 className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-[32px] font-extrabold leading-[1.15] tracking-tight text-ink-900 dark:text-slate-100 sm:text-[40px]">
            <span>EchoGPT – AI Job Insight</span>
            <span className="-rotate-2 rounded-[10px] bg-brand-600 px-4 py-1 text-white shadow-[0_8px_24px_rgba(109,58,230,0.45)]">
              Assistant
            </span>
          </h1>

          <div className="mx-auto mt-10 grid w-full max-w-[900px] grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-[#E8E5EF] bg-white px-6 py-7 text-center shadow-[0_1px_3px_rgba(24,18,43,0.05)] dark:border-white/10 dark:bg-[#1a1528]"
              >
                <h2 className="text-[17px] font-semibold text-brand-600 dark:text-brand-300">{f.title}</h2>
                <p className="mx-auto mt-2 max-w-[330px] text-[14px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
                  {f.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-10">
            <div className="rounded-2xl border border-[#E8E5EF] bg-white p-4 shadow-[0_2px_8px_rgba(24,18,43,0.05)] dark:border-white/10 dark:bg-[#1a1528]">
              <div className="flex items-start gap-3">
                <label htmlFor="job-composer" className="sr-only">
                  Paste job title and description here
                </label>
                <textarea
                  id="job-composer"
                  value={jobText}
                  onChange={(e) => setJobText(e.target.value)}
                  rows={4}
                  placeholder="Paste job title & description here..."
                  className="min-h-[110px] min-w-0 flex-1 resize-none bg-transparent text-[15px] font-normal text-ink-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
                />
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label="Add attachment"
                    className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-brand-400 dark:hover:text-brand-300"
                  >
                    <Plus className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label="Recent analyses"
                    onClick={() => setHistoryOpen(true)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-brand-400 dark:hover:text-brand-300"
                  >
                    <Clock className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex min-w-0 items-center justify-between gap-3">
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-300 px-3.5 py-[7px] text-[13px] font-medium text-brand-600 dark:border-brand-500/40 dark:text-brand-300">
                  <Lightbulb className="h-4 w-4" strokeWidth={2} aria-hidden />
                  Job Insights
                </span>
                <button
                  type="button"
                  onClick={() => toast("Demo: job analysis runs on the live site")}
                  className="flex h-10 shrink-0 items-center gap-2 rounded-[10px] bg-brand-300 px-5 text-[14px] font-semibold text-white transition hover:bg-brand-600"
                >
                  Analyze Job
                  <SendHorizontal className="h-4 w-4" strokeWidth={2} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <JobHistorySidebar
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onNewChat={() => setJobText("")}
      />
    </AppShell>
  );
}
