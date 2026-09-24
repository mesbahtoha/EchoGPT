"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import LoginCard from "@/components/LoginCard";
import { modalAnim } from "@/lib/motion";

function DecoWaves({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 260" fill="none" aria-hidden className={className}>
      {Array.from({ length: 9 }).map((_, i) => (
        <path
          key={i}
          d={`M-20 ${30 + i * 22} C 120 ${-10 + i * 22}, 260 ${70 + i * 22}, 440 ${10 + i * 22}`}
          stroke="#E9E9F0"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

function Ring({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`absolute h-4 w-4 rounded-full border-[1.5px] border-brand-400 ${className}`} />;
}

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-[#100d1a]">
      {/* Decorative background (matches echogpt.live/login reference) */}
      <DecoWaves className="pointer-events-none absolute -right-24 -top-16 w-[420px] opacity-80" />
      <div className="pointer-events-none absolute -bottom-20 -left-28 w-[480px] rotate-[8deg] opacity-80">
        <DecoWaves className="w-full" />
      </div>
      <Ring className="left-[6%] top-[26%]" />
      <Ring className="left-[15%] top-[56%]" />
      <Ring className="left-[7%] top-[78%]" />
      <Ring className="left-[5%] top-[95%]" />
      <Ring className="left-[36%] top-[97%]" />
      <Ring className="right-[4%] top-[27%]" />
      <Ring className="right-[38%] top-[6%]" />

      {/* Bottom-right chevrons */}
      <svg viewBox="0 0 140 80" aria-hidden className="pointer-events-none absolute -bottom-2 right-2 w-[130px]">
        <path d="M20 10 L55 40 L20 70" fill="none" stroke="#6d3ae6" strokeWidth="2" />
        <path d="M75 10 L110 40 L75 70" fill="#6d3ae6" />
        <path d="M75 10 L110 40 L75 70" fill="url(#chevGrad)" />
        <defs>
          <linearGradient id="chevGrad" x1="75" y1="10" x2="110" y2="70">
            <stop stopColor="#8057f2" />
            <stop offset="1" stopColor="#5b2bcf" />
          </linearGradient>
        </defs>
      </svg>

      {/* Back */}
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="absolute left-4 top-4 rounded-xl border border-slate-200 bg-white p-2.5 text-ink-900 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 sm:left-6 sm:top-6"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden />
      </button>

      {/* Card */}
      <div className="relative grid min-h-screen place-items-center p-4 py-16">
        <motion.div {...modalAnim} className="w-full max-w-[440px]">
          <LoginCard onDone={() => router.push("/")} />
        </motion.div>
      </div>
    </div>
  );
}
