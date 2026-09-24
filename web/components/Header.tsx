"use client";

import { Menu } from "lucide-react";
import Logo from "./Logo";

interface HeaderProps {
  onMenu: () => void;
  onSignIn: () => void;
}

export default function Header({ onMenu, onSignIn }: HeaderProps) {
  return (
    <header className="flex h-[70px] shrink-0 items-center justify-between border-b border-slate-100 bg-white px-[18px] dark:border-white/10 dark:bg-[#100d1a] sm:px-[26px]">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open menu"
          className="rounded-lg p-2 text-ink-500 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-brand-300 lg:hidden"
        >
          <Menu className="h-[22px] w-[22px]" strokeWidth={2} aria-hidden />
        </button>
        <a href="/" aria-label="EchoGPT home" className="shrink-0 lg:hidden">
          <Logo compact />
        </a>
      </div>
      <div className="ml-auto flex items-center justify-end">
        <button
          type="button"
          onClick={onSignIn}
          className="h-11 w-[106px] rounded-[11px] bg-brand-600 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(109,58,230,0.4)] transition hover:bg-brand-700 active:scale-[0.98]"
        >
          Sign In
        </button>
      </div>
    </header>
  );
}
