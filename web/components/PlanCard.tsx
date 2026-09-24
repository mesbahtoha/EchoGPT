"use client";

import { Sparkle } from "lucide-react";
import { GoogleIcon, LinkedInIcon, TelegramIcon, XIcon } from "./BrandIcons";
import { advancedModels, basicModels, type Plan, type PlanModel } from "@/lib/plans";
import { storeApps } from "@/lib/store";
import { cn } from "@/lib/cn";

const brandByName = new Map(storeApps.map((a) => [a.name, a]));

function ModelMark({ name, color }: { name: string; color: string }) {
  const app = brandByName.get(name);
  if (app?.logo) {
    return (
      <img src={app.logo} alt="" aria-hidden width={18} height={18} className="h-[18px] w-[18px] shrink-0 rounded-[5px]" />
    );
  }
  if (app?.glyph) {
    return (
      <svg viewBox={app.glyph.viewBox} aria-hidden className="h-[18px] w-[18px] shrink-0" fill={app.glyph.color}>
        {app.glyph.paths.map((p, i) => (
          <path key={i} d={p.d} fillRule={p.fillRule as "evenodd" | undefined} />
        ))}
      </svg>
    );
  }
  return <span aria-hidden className="h-4 w-4 shrink-0 rounded-full" style={{ background: color }} />;
}

function ModelRow({ name, color }: PlanModel) {
  return (
    <li className="flex items-center gap-2 py-[5px] text-[13px] font-normal text-[#777386] dark:text-slate-400">
      <ModelMark name={name} color={color} />
      <span className="truncate">{name}</span>
    </li>
  );
}

interface PlanCardProps {
  plan: Plan;
  action: React.ReactNode;
}

/** Shared subscription plan card — identical on /subscriptions and /landing. */
export default function PlanCard({ plan, action }: PlanCardProps) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border-[1.5px] border-brand-200 bg-white p-6 pt-7 shadow-[0_2px_10px_rgba(109,58,230,0.08)] dark:border-brand-500/40 dark:bg-[#1a1528]">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-600 px-3 py-[3px] text-[10px] font-bold uppercase tracking-wide text-white">
        Recommended
      </span>
      <p className="flex items-center gap-1.5 text-[14px] font-semibold text-ink-900 dark:text-slate-100">
        <Sparkle className="h-4 w-4 text-brand-600" strokeWidth={2} aria-hidden />
        {plan.name}
      </p>
      <p className="mt-3 text-[28px] font-bold tracking-tight text-ink-900 dark:text-slate-100">{plan.price}</p>
      <p className="mt-1 text-[12px] font-normal text-slate-400 dark:text-slate-500">{plan.per}</p>
      <div className="mt-4">{action}</div>

      <p className="mt-5 text-[13px] font-semibold text-ink-900 dark:text-slate-100">Access to basic models</p>
      <ul className="mt-1">
        {basicModels.map((m) => (
          <ModelRow key={m.name} name={m.name} color={m.color} />
        ))}
      </ul>

      <div className="my-3 border-t border-slate-100 dark:border-white/10" aria-hidden />

      <p className="text-[13px] font-semibold text-ink-900 dark:text-slate-100">Access to advanced models</p>
      <ul className="mt-1">
        {advancedModels.map((m) => (
          <ModelRow key={m.name} name={m.name} color={m.color} />
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <div className="border-t border-slate-100 dark:border-white/10" aria-hidden />
        <div className="divide-y divide-slate-100 dark:divide-white/10">
          <p className="py-3 text-[14px] font-normal leading-relaxed text-[#55516b] dark:text-slate-400">{plan.blurb}</p>
          <p className="py-3 text-[14px] font-normal leading-relaxed text-[#55516b] dark:text-slate-400">2000 Advance Credits/month</p>
          <p className="py-3 text-[14px] font-normal leading-relaxed text-[#55516b] dark:text-slate-400">EchoGpt Membership Benefits</p>
          <p className="py-3 text-[14px] font-medium leading-relaxed text-ink-900 dark:text-slate-100">Multi-Code Membership Benefits</p>
        </div>

        <div className="mt-3 flex items-center gap-2.5" aria-label="Available on">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
            <TelegramIcon className="h-5 w-5" />
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
            <GoogleIcon className="h-[18px] w-[18px]" />
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-ink-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
            <XIcon className="h-4 w-4" />
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
            <LinkedInIcon className="h-5 w-5" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function SubscribeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 w-full rounded-[10px] bg-brand-600 text-[14px] font-semibold text-white",
        "shadow-[0_4px_14px_rgba(109,58,230,0.35)] transition hover:bg-brand-700 active:scale-[0.99]"
      )}
    >
      Subscribe Now
    </button>
  );
}
