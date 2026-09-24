"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface ToolButtonProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  accent?: boolean;
  onClick?: () => void;
}

export default function ToolButton({ icon: Icon, label, active, accent, onClick }: ToolButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-lg transition sm:h-10 sm:w-10",
        accent
          ? "bg-brand-600 text-white shadow-[0_3px_10px_rgba(109,58,230,0.35)] hover:bg-brand-700"
          : active
            ? "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
            : "text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:text-slate-500 dark:hover:bg-white/10 dark:hover:text-brand-300"
      )}
    >
      <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2} aria-hidden />
    </button>
  );
}
