"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Link2, Share, X } from "lucide-react";
import { FacebookIcon, LinkedInIcon, TelegramIcon, WhatsAppIcon } from "./BrandIcons";
import { externalLinks } from "@/lib/links";
import { backdropAnim, modalAnim } from "@/lib/motion";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ShareModal({ open, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      setCopied(false);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function siteUrl() {
    if (typeof window !== "undefined") return window.location.origin;
    return "https://echogpt.ai";
  }

  function shareTo(network: "facebook" | "linkedin" | "whatsapp" | "telegram") {
    const links: Record<string, string> = {
      facebook: externalLinks.facebook,
      linkedin: externalLinks.linkedin,
      whatsapp: externalLinks.whatsapp,
      telegram: externalLinks.telegram
    };
    window.open(links[network], "_blank", "noopener,noreferrer,width=640,height=560");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(siteUrl());
    } catch {
      const ta = document.createElement("textarea");
      ta.value = siteUrl();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const rows = [
    { id: "facebook" as const, label: "Facebook", icon: <FacebookIcon /> },
    { id: "linkedin" as const, label: "LinkedIn", icon: <LinkedInIcon /> },
    { id: "whatsapp" as const, label: "WhatsApp", icon: <WhatsAppIcon /> },
    { id: "telegram" as const, label: "Telegram", icon: <TelegramIcon /> }
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          {...backdropAnim}
          className="fixed inset-0 z-50 grid place-items-center bg-[#18122b]/45 p-4 backdrop-blur-[2px]"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Share website"
            {...modalAnim}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[400px] rounded-2xl bg-white shadow-pop dark:bg-[#1e1930] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3.5 pt-4">
              <h2 className="text-[17px] font-medium text-[#211d33] dark:text-slate-100">Share Website</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close share"
                className="rounded-lg p-1 text-[#6b6584] transition hover:bg-slate-100 hover:text-[#211d33] dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100"
              >
                <X className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
              </button>
            </div>
            <div className="h-px bg-[#ece8f6] dark:bg-white/10" />

            {/* Body */}
            <div className="px-5 py-1.5">
              {rows.map((row) => (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => shareTo(row.id)}
                  className="group flex w-full items-center justify-between py-[13px] text-left"
                >
                  <span className="flex items-center gap-3">
                    {row.icon}
                    <span className="text-[14.5px] font-normal text-[#36324d] dark:text-slate-200">{row.label}</span>
                  </span>
                  <span className="p-1 text-[#6b6584] transition group-hover:text-[#211d33] dark:text-slate-400 dark:group-hover:text-slate-100">
                    <Share className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />
                  </span>
                </button>
              ))}
            </div>

            <div className="px-5">
              <div className="h-px bg-[#ece8f6] dark:bg-white/10" />
            </div>

            <div className="px-5 pb-4 pt-1.5">
              <button type="button" onClick={copyLink} className="group flex w-full items-center justify-between py-[13px] text-left">
                <span className="flex items-center gap-3">
                  <Link2 className="h-5 w-5 text-[#36324d] dark:text-slate-200" strokeWidth={1.8} aria-hidden />
                  <span className="text-[14.5px] font-normal text-[#36324d] dark:text-slate-200">Copy Link</span>
                </span>
                <span className="p-1 text-[#6b6584] transition group-hover:text-[#211d33] dark:text-slate-400 dark:group-hover:text-slate-100">
                  {copied ? (
                    <Check className="h-[18px] w-[18px] text-emerald-500" strokeWidth={2} aria-hidden />
                  ) : (
                    <Copy className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />
                  )}
                </span>
              </button>
              {copied && <p className="pb-1 text-[12px] font-medium text-emerald-600 dark:text-emerald-400">Link copied to clipboard</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
