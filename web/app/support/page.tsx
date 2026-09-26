"use client";

import { ChevronRight, Facebook, Instagram, Linkedin, Mail, ScrollText, ShieldCheck, type LucideIcon } from "lucide-react";
import AppShell from "@/components/AppShell";
import { externalLinks } from "@/lib/links";

function ContactRow({
  icon: Icon,
  title,
  description,
  href
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}) {
  const classes =
    "group flex w-full items-center gap-4 rounded-2xl border border-[#E8E5EF] bg-white p-5 text-left shadow-[0_1px_3px_rgba(24,18,43,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-composer active:scale-[0.99] dark:border-white/10 dark:bg-[#1a1528] dark:hover:border-brand-500/30";

  const inner = (
    <>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-50 text-ink-900 transition-transform duration-300 group-hover:scale-110 dark:bg-brand-500/15 dark:text-slate-100">
        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] font-semibold text-ink-900 dark:text-slate-100">{title}</span>
        <span className="mt-1 block text-[13px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
          {description}
        </span>
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-600 dark:text-slate-500" strokeWidth={2} aria-hidden />
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={classes}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={classes}>
      {inner}
    </button>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">{children}</p>
      <div className="mt-2 border-t border-slate-200 dark:border-white/10" aria-hidden />
    </div>
  );
}

export default function SupportPage() {
  return (
    <AppShell>
      <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto w-full max-w-[1060px] px-5 pb-16 pt-10 sm:px-8">
          <h1 className="text-center text-[30px] font-bold leading-tight text-ink-900 dark:text-slate-100">
            Talk with Our Team
          </h1>

          <div className="mt-10">
            <SectionLabel>Your preferred option</SectionLabel>
            <div className="mt-5">
              <ContactRow
                icon={Mail}
                title="Email Us"
                description="We will aim to respond in 1 day"
                href={externalLinks.email}
              />
            </div>
          </div>

          <div className="mt-10">
            <SectionLabel>Legal</SectionLabel>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <ContactRow
                icon={ScrollText}
                title="Terms & Conditions"
                description="Accounts, plans, acceptable use, and AI accuracy."
                href="/terms"
              />
              <ContactRow
                icon={ShieldCheck}
                title="Privacy Policy"
                description="What we collect, why, and the controls you have."
                href="/privacy"
              />
            </div>
          </div>

          <div className="mt-10">
            <SectionLabel>Follow us</SectionLabel>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <ContactRow
                icon={Facebook}
                title="Facebook"
                description="Follow us on Facebook for the latest updates and news!"
                href={externalLinks.facebook}
              />
              <ContactRow
                icon={Instagram}
                title="Instagram"
                description="See behind the scenes and fresh updates!"
                href={externalLinks.instagram}
              />
              <ContactRow
                icon={Linkedin}
                title="LinkedIn"
                description="Connect with us professionally on LinkedIn."
                href={externalLinks.linkedin}
              />
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
