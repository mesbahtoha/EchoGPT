import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  pro?: boolean;
  href?: string;
  onClick?: () => void;
}

export function SidebarItem({ icon: Icon, label, active, pro, href, onClick }: SidebarItemProps) {
  const classes = cn(
    "group relative flex h-[46px] w-full items-center gap-[13px] px-[22px] text-left text-[15px] transition-colors",
    active && !href
      ? "bg-brand-100/80 font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
      : "font-normal text-ink-700 hover:bg-brand-50/70 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-brand-300"
  );

  const inner = (
    <>
      {active && !href && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 h-[26px] w-[3px] -translate-y-1/2 rounded-r-full bg-brand-600"
        />
      )}
      <Icon
        className={cn(
          "h-5 w-5 shrink-0",
          active && !href
            ? "text-brand-600 dark:text-brand-300"
            : "text-ink-400 group-hover:text-brand-600 dark:text-slate-500 dark:group-hover:text-brand-300"
        )}
        strokeWidth={2}
        aria-hidden
      />
      <span className="flex-1 truncate">{label}</span>
      {pro && (
        <span className="shrink-0 rounded-md bg-brand-100 px-[7px] py-[3px] text-[11px] font-bold leading-4 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">PRO</span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={classes}
    >
      {inner}
    </button>
  );
}
