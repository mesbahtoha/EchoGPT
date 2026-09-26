"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AppShell from "@/components/AppShell";
import SignInModal from "@/components/SignInModal";
import PlanCard, { SubscribeButton } from "@/components/PlanCard";
import { plans } from "@/lib/plans";
import { accordionAnim } from "@/lib/motion";
import { cn } from "@/lib/cn";

const faqs = [
  {
    q: "What platforms is EchoGPT available on?",
    a: "EchoGPT is available on the web at echogpt.live, as a Chrome extension, and on mobile browsers. Sign in once and your chats, models, and PRO tools sync everywhere."
  },
  {
    q: "Is my personal data safe and secure when using EchoGPT?",
    a: "Yes. Your chats are encrypted in transit, never sold to third parties, and you can review or delete your history at any time from the History page."
  },
  {
    q: "Who do I contact if I have questions or need support?",
    a: "Reach out to our customer support team via the Support page and we will get back to you, usually within one business day."
  },
  {
    q: "How can I cancel my subscription?",
    a: "You can cancel anytime from the Subscriptions page. Your Pro features stay active until the end of the current billing period, and you won't be charged again."
  }
];

export default function SubscriptionsPage() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <AppShell>
      <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto w-full max-w-[1360px] px-5 pb-16 pt-10 sm:px-8">
          <p className="mx-auto w-fit rounded-full bg-brand-50 px-3 py-1 text-[12px] font-semibold text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
            Pricing
          </p>
          <h1 className="mt-3 text-center text-[30px] font-bold leading-tight text-ink-900 dark:text-slate-100">
            Affordable plans for every need
          </h1>
          <p className="mx-auto mt-3 max-w-[640px] text-center text-[16px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
            Want to get more out of EchoGPT Plus? Subscribe to one of our professional plans.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} action={<SubscribeButton onClick={() => setSignInOpen(true)} />} />
            ))}
          </div>

          {/* FAQ */}
          <div className="mx-auto mt-16 w-full max-w-[900px]">
            <h2 className="text-center text-[28px] font-bold tracking-tight text-ink-900 dark:text-slate-100 sm:text-[32px]">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-3 max-w-[640px] text-center text-[15px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
              Cannot find the answer you are looking for? Reach out to our{" "}
              <a href="/support" className="font-medium text-brand-600 underline dark:text-brand-300">
                customer support
              </a>{" "}
              team
            </p>

            <div className="mt-8 space-y-3.5">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div
                    key={f.q}
                    className="overflow-hidden rounded-[14px] border border-[#E8E5EF] bg-white shadow-[0_1px_3px_rgba(24,18,43,0.05)] dark:border-white/10 dark:bg-[#1a1528]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`subs-faq-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-[15px] font-medium text-ink-900 dark:text-slate-100">{f.q}</span>
                      <ChevronDown
                        className={cn("h-5 w-5 shrink-0 text-slate-400 transition-transform", open && "rotate-180")}
                        aria-hidden
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div {...accordionAnim} id={`subs-faq-${i}`} role="region">
                          <p className="px-5 pb-5 text-[14px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
    </AppShell>
  );
}
