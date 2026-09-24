"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SquarePen, X } from "lucide-react";
import Logo from "./Logo";
import { SidebarItem } from "./SidebarItem";
import ThemeToggle from "./ThemeToggle";
import ShareModal from "./ShareModal";
import SettingsModal from "./SettingsModal";
import { bottomIcons, sidebarSections } from "@/lib/sidebarItems";
import { backdropAnim } from "@/lib/motion";

interface SidebarProps {
  activeNav: string;
  onNavigate: (id: string) => void;
  onNewChat: () => void;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeNav, onNavigate, onNewChat, open, onClose }: SidebarProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  function handleBottom(id: string) {
    if (id === "share") {
      setShareOpen(true);
      return;
    }
    if (id === "settings") {
      setSettingsOpen(true);
      return;
    }
    if (id === "home") {
      onNavigate("landing");
      return;
    }
    onNavigate(id);
  }

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && (
          <motion.button
            {...backdropAnim}
            aria-label="Close menu"
            onClick={onClose}
            className="fixed inset-0 z-30 bg-[#18122b]/40 backdrop-blur-[1px] lg:hidden"
          />
        )}
      </AnimatePresence>
      <aside
        aria-label="Primary"
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-[308px] shrink-0 flex-col bg-sidebar transition-transform duration-200 ease-out sm:w-[330px] lg:static lg:w-[284px] lg:min-w-[284px] lg:translate-x-0 ${
          open ? "translate-x-0 shadow-pop" : "-translate-x-full"
        } border-r border-brand-100/80 dark:border-white/10 dark:bg-[#161224]`}
      >
        <div className="flex items-center justify-between px-[22px] pb-1 pt-[22px]">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-full border border-slate-200 p-1.5 text-ink-400 transition hover:bg-brand-100 hover:text-brand-700 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-brand-300 lg:hidden"
          >
            <X className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div className="px-[17px] pt-[18px]">
          <button
            type="button"
            onClick={onNewChat}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-[11px] bg-brand-600 px-3 text-[15px] font-semibold text-white shadow-[0_6px_16px_rgba(109,58,230,0.35)] transition hover:bg-brand-700 active:scale-[0.99]"
          >
            <SquarePen className="h-5 w-5" strokeWidth={2} aria-hidden />
            New Chat
          </button>
        </div>

        <nav className="mt-[18px] flex-1 overflow-y-auto pb-4">
          {sidebarSections.map((section, si) => (
            <div
              key={section.title}
              className={si > 0 ? "mb-[22px] border-t border-brand-100/70 pt-[18px] dark:border-white/10" : "mb-[22px]"}
            >
              <p className="px-[22px] pb-[9px] text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-400 dark:text-slate-500">
                {section.title}
              </p>
              <ul className="space-y-[2px]">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <SidebarItem
                      icon={item.icon}
                      label={item.label}
                      pro={item.pro}
                      href={item.href}
                      active={activeNav === item.id}
                      onClick={() => onNavigate(item.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-brand-100/80 px-[17px] py-[14px] dark:border-white/10">
          <div className="flex items-center justify-between">
            {bottomIcons.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                type="button"
                aria-label={label}
                title={label}
                onClick={() => handleBottom(id)}
                className="rounded-lg p-[11px] text-ink-500 transition hover:bg-brand-100 hover:text-brand-700 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-brand-300"
              >
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </button>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </aside>
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
