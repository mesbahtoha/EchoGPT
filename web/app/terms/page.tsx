"use client";

import {
  BadgeCheck,
  Ban,
  Cpu,
  CreditCard,
  FileWarning,
  Handshake,
  Scale,
  ScrollText,
  UserRound,
  type LucideIcon
} from "lucide-react";
import LegalLayout, { type LegalSection } from "@/components/LegalLayout";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    icon: Handshake,
    title: "Welcome — acceptance of these terms",
    paragraphs: [
      "These Terms & Conditions (\"Terms\") form the agreement between you and EchoGPT for echogpt.live, the Chrome side-panel extension, and every studio, tool, and page inside them (collectively, the \"Service\"). By creating an account, signing in, or simply using the Service, you agree to these Terms and to our Privacy Policy.",
      "If you use EchoGPT on behalf of a company, school, or team, you confirm you have the authority to accept these Terms for that organization, and \"you\" refers to both you and that organization."
    ],
    bullets: [
      "You must be at least 13 years old (or the minimum age in your country) to use EchoGPT.",
      "One person may maintain one free account; teams should contact support for shared workspaces.",
      "We may update these Terms as the product evolves — material changes are announced in-app and take effect on the stated date."
    ]
  },
  {
    id: "account",
    icon: UserRound,
    title: "Your account & security",
    paragraphs: [
      "Signing in is optional for browsing, but an account unlocks history sync, studios, and Pro features. You can sign in with email, Google, X (Twitter), or GitHub from the login card or the Sign In button in the header.",
      "You are responsible for keeping your credentials confidential and for everything that happens under your account. Tell us immediately at our support email if you suspect unauthorized access — we will help secure the account and review recent activity."
    ],
    bullets: [
      "Provide accurate details and keep your email up to date for plan and security notices.",
      "Do not share passwords or sell, rent, or transfer accounts to another person.",
      "Free-tier mock sessions reset on reload in this demo build; signed-in history persists per the Privacy Policy."
    ]
  },
  {
    id: "plans",
    icon: CreditCard,
    title: "Plans, credits & payments",
    paragraphs: [
      "EchoGPT is free to start. Optional Pro plans — Monthly, Quarterly, Half-Yearly, and Annual, as shown on the Subscriptions page — unlock all frontier models, 2,000 Advance Credits per month, and priority speed. Image and video generation each consume one message from your plan, and generation can take up to a minute.",
      "Subscriptions renew automatically for the same term until cancelled. Cancel anytime from Subscriptions: Pro stays active until the end of the current billing period and you will not be charged again. Refunds follow the policy of the store or payment provider used at checkout."
    ],
    bullets: [
      "Prices are shown in USD and exclude taxes where applicable.",
      "Advance Credits reset monthly and do not roll over unless your plan states otherwise.",
      "If a payment fails, we may pause Pro features until billing is resolved."
    ],
    note: "Demo disclosure: in this frontend build every Subscribe, Generate, and Analyze action shows a demo toast instead of charging or calling a model — no real payment is processed."
  },
  {
    id: "acceptable-use",
    icon: Ban,
    title: "Acceptable use — what is not allowed",
    paragraphs: [
      "EchoGPT is built for creation, learning, and work. To keep it safe for everyone, you agree not to misuse the Service, attempt to break it, or use it to harm others. We may rate-limit, suspend, or terminate accounts that violate this section."
    ],
    bullets: [
      "No illegal content, harassment, hate, sexual content involving minors, or encouragement of self-harm or violence.",
      "No spam, phishing, malware, scraping at abusive scale, or bypassing access controls and usage limits.",
      "No misrepresenting AI outputs as human work where disclosure is required (exams, legal filings, medical advice).",
      "No uploading content you do not have the right to use, including other people's private data."
    ]
  },
  {
    id: "ai-outputs",
    icon: Cpu,
    title: "AI outputs, studios & accuracy",
    paragraphs: [
      "Chat answers, image and video generations, resume rewrites, SOP drafts, and Compare-mode results are produced by AI and may be inaccurate, incomplete, or biased. They are provided for assistance — not as professional advice. Always review important outputs (medical, legal, financial, hiring, or safety decisions) with a qualified human before acting on them.",
      "Studios label paid generation clearly: the composer notes when a feature needs Pro, and every generation shows model, aspect ratio, and batch settings before you run it."
    ],
    bullets: [
      "Verify facts, citations, code, and dosage-like instructions independently.",
      "Resume and SOP tools tailor drafts from the text you paste — you own the final wording you submit.",
      "Sample galleries and empty states are static showcases in this build."
    ]
  },
  {
    id: "ip",
    icon: BadgeCheck,
    title: "Intellectual property & your content",
    paragraphs: [
      "EchoGPT, its logo, interface, and studio designs are owned by us and our licensors. We grant you a personal, non-transferable license to use the Service while these Terms are in effect.",
      "You keep the rights to the prompts you write and the original content you upload. You grant us a limited license to process that content solely to operate the Service — generating a reply, rendering a studio preview, or saving history you asked us to keep. We never sell your content."
    ]
  },
  {
    id: "termination",
    icon: FileWarning,
    title: "Suspension & termination",
    paragraphs: [
      "You can stop using EchoGPT at any time and delete your history from the History page. We may suspend or terminate access — with notice where reasonable — for unpaid Pro invoices, acceptable-use violations, security risks, or legal requirements.",
      "On termination, Pro features end immediately while free browsing may remain available. Sections covering payments owed, intellectual property, disclaimers, and liability survive termination."
    ]
  },
  {
    id: "liability",
    icon: Scale,
    title: "Disclaimers & limitation of liability",
    paragraphs: [
      "The Service is provided \"as is\" and \"as available\" without warranties of any kind, including merchantability, fitness for a particular purpose, or uninterrupted availability. To the maximum extent permitted by law, EchoGPT and its team are not liable for indirect, incidental, or consequential damages arising from AI outputs, studio generations, or downtime.",
      "Where liability cannot be excluded, our total liability for any claim is limited to the amount you paid for the Service in the 12 months before the claim — or USD 10 if you used only the free tier."
    ]
  },
  {
    id: "changes",
    icon: ScrollText,
    title: "Changes to these terms & contact",
    paragraphs: [
      "We will post updated Terms on this page with a new \"Last updated\" date and, for material changes, highlight them in-app before they take effect. Continuing to use EchoGPT after the effective date means you accept the updated Terms.",
      "Questions about these Terms? Reach us anytime — the fastest route is email, and the Support page lists every channel including Facebook, Instagram, and LinkedIn."
    ]
  }
];

const summary = [
  "Be kind and lawful: no abuse, spam, scraping, or harmful content.",
  "AI outputs can be wrong — verify important answers with a human expert.",
  "Pro renews until you cancel; credits reset monthly and don't roll over.",
  "You own your prompts; we only process them to run the Service."
];

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      badgeIcon={ScrollText as LucideIcon}
      title="Terms & Conditions"
      subtitle="The plain-language rules for using EchoGPT — accounts, Pro plans, acceptable use, AI accuracy, and your rights. Effective for everyone on echogpt.live and the Chrome extension."
      updated="September 24, 2026"
      readingTime="6 min"
      summary={summary}
      sections={sections}
      related={[
        { label: "Privacy Policy", desc: "How we collect, use, and protect your data.", href: "/privacy" },
        { label: "Support", desc: "Talk to our team about accounts and billing.", href: "/support" }
      ]}
    />
  );
}
