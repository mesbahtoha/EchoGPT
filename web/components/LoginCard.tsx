"use client";

import { useState } from "react";
import { Check, Github, Mail } from "lucide-react";
import { GoogleGIcon, XIcon } from "./BrandIcons";
import { cn } from "@/lib/cn";

interface LoginCardProps {
  compact?: boolean;
  onDone: () => void;
  onEmailAuth?: (email: string, password: string) => void;
}

/**
 * Shared EchoGPT login card (used by the /login page and the sign-in modal),
 * matching the echogpt.live/login reference design.
 */
export default function LoginCard({ compact = false, onDone, onEmailAuth }: LoginCardProps) {
  const [emailMode, setEmailMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updates, setUpdates] = useState(true);

  function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (onEmailAuth) onEmailAuth(email, password);
    onDone();
  }

  const btn =
    "flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white text-[15px] font-medium text-ink-900 transition hover:border-brand-300 hover:bg-brand-50/50 active:scale-[0.99] dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:border-brand-400/50";

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-[#E8E5EF] bg-white shadow-[0_2px_16px_rgba(24,18,43,0.06)] dark:border-white/10 dark:bg-[#1a1528]",
        compact ? "p-6 sm:p-7" : "p-8 sm:p-10"
      )}
    >
      <div className="flex items-center justify-center gap-2.5">
        <img src="/logo.svg" alt="EchoGPT logo" width={36} height={36} className="h-9 w-9 rounded-[10px]" />
        <span className="text-[20px] font-bold text-ink-900 dark:text-slate-100">EchoGPT</span>
      </div>
      <p className="mt-3 text-center text-[13.5px] font-normal text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?
        <button type="button" onClick={onDone} className="ml-1.5 font-medium text-brand-600 hover:underline dark:text-brand-300">
          Sign up for free
        </button>
      </p>

      {!emailMode ? (
        <div className="mt-6 space-y-2.5">
          <button type="button" onClick={() => setEmailMode(true)} className={btn}>
            <Mail className="h-5 w-5 text-slate-500 dark:text-slate-400" strokeWidth={2} aria-hidden />
            Sign in with email
          </button>
          <button type="button" onClick={onDone} className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-brand-600 text-[15px] font-medium text-white shadow-[0_6px_18px_rgba(109,58,230,0.4)] transition hover:bg-brand-700 active:scale-[0.99]">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white">
              <GoogleGIcon className="h-4 w-4" />
            </span>
            Sign in with Google
          </button>
          <button type="button" onClick={onDone} className={btn}>
            <XIcon className="h-[18px] w-[18px] text-ink-900 dark:text-slate-100" />
            Sign in with Twitter
          </button>
          <button type="button" onClick={onDone} className={btn}>
            <Github className="h-5 w-5 text-ink-900 dark:text-slate-100" aria-hidden />
            Sign in with GitHub
          </button>
        </div>
      ) : (
        <form onSubmit={submitEmail} className="mt-6 space-y-2.5">
          <div>
            <label htmlFor="login-email" className="mb-1 block text-[13px] font-semibold text-ink-700 dark:text-slate-300">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-slate-200 px-3.5 text-[14px] focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>
          <div>
            <label htmlFor="login-pass" className="mb-1 block text-[13px] font-semibold text-ink-700 dark:text-slate-300">
              Password
            </label>
            <input
              id="login-pass"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 w-full rounded-xl border border-slate-200 px-3.5 text-[14px] focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center rounded-xl bg-brand-600 text-[15px] font-medium text-white shadow-[0_6px_18px_rgba(109,58,230,0.4)] transition hover:bg-brand-700 active:scale-[0.99]"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={() => setEmailMode(false)}
            className="w-full py-1 text-center text-[13px] font-medium text-slate-500 hover:text-brand-600 dark:text-slate-400"
          >
            ← Back to all options
          </button>
        </form>
      )}

      <button
        type="button"
        role="checkbox"
        aria-checked={updates}
        onClick={() => setUpdates((v) => !v)}
        className="mt-5 flex w-full items-center justify-center gap-2"
      >
        <span
          aria-hidden
          className={cn(
            "grid h-5 w-5 place-items-center rounded-[6px] border transition",
            updates ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300 bg-white dark:border-white/20"
          )}
        >
          {updates && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </span>
        <span className="text-[13.5px] font-normal text-slate-600 dark:text-slate-300">
          I want to receive updates about EchoGPT
        </span>
      </button>

      <p className="mt-3 text-center text-[12px] font-normal leading-relaxed text-slate-400 dark:text-slate-500">
        By proceeding, you agree to our{" "}
        <a href="/terms" className="text-brand-600 hover:underline dark:text-brand-300">
          Terms of use
        </a>
        . Read our{" "}
        <a href="/privacy" className="text-brand-600 hover:underline dark:text-brand-300">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
