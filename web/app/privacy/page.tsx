"use client";

import {
  Baby,
  Cookie,
  Database,
  Eye,
  History,
  Lock,
  RefreshCcw,
  ShieldCheck,
  UserCheck,
  type LucideIcon
} from "lucide-react";
import LegalLayout, { type LegalSection } from "@/components/LegalLayout";

const sections: LegalSection[] = [
  {
    id: "overview",
    icon: Eye,
    title: "Privacy at a glance",
    paragraphs: [
      "EchoGPT is designed to be private by default. This Privacy Policy explains what we collect on echogpt.live and in the Chrome extension, why we collect it, and the controls you have — including reviewing and deleting history at any time.",
      "In this frontend demo build there is no production backend: chat, history, newsletter signup, and settings are simulated with local state and reset on reload. The policy below describes the live Service; anywhere the demo differs, the page itself says so."
    ],
    bullets: [
      "We never sell your personal data or your prompts.",
      "Chats are encrypted in transit and visible only to you and systems that operate the Service.",
      "You can delete conversations from the History page whenever you like."
    ]
  },
  {
    id: "collect",
    icon: Database,
    title: "Data we collect",
    paragraphs: [
      "We collect the minimum needed to run your workspace. Account details come from the sign-in method you choose; workspace content comes from what you type, upload, or generate; and technical signals help us keep the app fast and safe."
    ],
    bullets: [
      "Account: name, email, avatar, plan tier, and sign-in provider (email, Google, X, or GitHub).",
      "Content: prompts, uploaded context, generated images/videos, resume and SOP drafts, and Compare selections.",
      "Preferences: theme (echogpt-theme), default model, and studio settings saved in your browser.",
      "Technical: device type, approximate region, and error logs used for reliability and abuse prevention."
    ]
  },
  {
    id: "use",
    icon: UserCheck,
    title: "How we use your data",
    paragraphs: [
      "Your data powers your workspace — generating replies, rendering studio previews, syncing history across web and extension, remembering your theme, and supporting you when you contact us. We also use aggregated, de-identified signals to improve models routing, fix bugs, and prevent misuse."
    ],
    bullets: [
      "Operate the Service: chat replies, image/video generation, Compare results, and saved history.",
      "Personalize: default model, theme, and studio presets follow you across sessions.",
      "Support & safety: respond to tickets, enforce Acceptable Use, and detect fraud or attacks.",
      "Improve: measure which features help, never by reading your private chats for ads."
    ]
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies & on-device storage",
    paragraphs: [
      "EchoGPT prefers on-device storage over tracking cookies. Your theme choice (echogpt-theme), default model, and composer drafts live in localStorage so the app loads instantly and respects dark mode everywhere. The Chrome extension additionally uses chrome.storage to keep the side panel in sync across tabs.",
      "We do not use third-party advertising cookies. If analytics are ever introduced, they will be privacy-preserving, documented here first, and easy to opt out of."
    ],
    bullets: [
      "Strictly necessary: theme, model preference, and session state — always on.",
      "Functional: history cache and studio presets — disable by clearing site data (features gracefully reset).",
      "No ad trackers, no cross-site profiling, no data-broker sharing."
    ]
  },
  {
    id: "sharing",
    icon: History,
    title: "Sharing & third parties",
    paragraphs: [
      "We share data only to operate EchoGPT: AI model providers process your prompt to generate a reply, hosting and email providers deliver the app and support messages, and payment processors handle Pro checkout. Each processes data under contract and for no other purpose.",
      "We disclose information only when required by law, to protect safety and the integrity of the Service, or with your explicit consent — for example when you tap Share and choose Telegram, WhatsApp, Facebook, Discord, or LinkedIn."
    ]
  },
  {
    id: "security",
    icon: Lock,
    title: "Security & retention",
    paragraphs: [
      "Data is encrypted in transit (HTTPS/TLS) and at rest with access limited to authorized systems. We review permissions regularly, log administrative access, and rotate credentials. No system is perfect — if we ever detect a breach affecting your account, we will notify you promptly with steps to take.",
      "We keep workspace content while your account is active and for a short recovery window after deletion requests, then remove or irreversibly anonymize it. Backups age out on the same schedule. Theme and model preferences disappear when you clear site data."
    ]
  },
  {
    id: "rights",
    icon: ShieldCheck,
    title: "Your rights & choices",
    paragraphs: [
      "You control your data. Open the History page to review, search, and delete conversations; use Settings to change theme and default model; use Newsletter and Support pages to manage outreach. Wherever you live, you can ask for a copy, correction, or deletion of your personal data."
    ],
    bullets: [
      "Access & portability: request an export of your account data and history.",
      "Correction: fix an inaccurate name or email from account settings or support.",
      "Deletion: delete chats in History, or email us to erase the whole account.",
      "Marketing: unsubscribe in one click — the newsletter confirms without spam."
    ],
    note: "To exercise a right, email us from your account address. We verify identity, respond within 30 days, and never charge for reasonable requests."
  },
  {
    id: "children",
    icon: Baby,
    title: "Children's privacy",
    paragraphs: [
      "EchoGPT is not directed at children under 13, and we do not knowingly collect their data. If you believe a child has created an account, contact us and we will promptly review and delete the relevant information."
    ]
  },
  {
    id: "changes",
    icon: RefreshCcw,
    title: "Changes to this policy & contact",
    paragraphs: [
      "When this Policy changes, we update the \"Last updated\" date above and highlight material changes in-app before they take effect. Continuing to use EchoGPT after the effective date means the updated Policy applies.",
      "Data-controller questions, rights requests, and security reports all go to the same inbox — we aim to reply within one business day."
    ]
  }
];

const summary = [
  "Private by default: never sold, encrypted in transit, deletable anytime.",
  "Only what's needed: account, prompts, preferences, and reliability logs.",
  "No ad trackers — theme and settings stay on your device.",
  "Full control: review and delete history, export or erase your account."
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      badgeIcon={ShieldCheck as LucideIcon}
      title="Privacy Policy"
      subtitle="How EchoGPT collects, uses, and protects your information — in plain language, with real controls on the History, Settings, and Support pages."
      updated="September 24, 2026"
      readingTime="5 min"
      summary={summary}
      sections={sections}
      related={[
        { label: "Terms & Conditions", desc: "Accounts, Pro plans, and acceptable use.", href: "/terms" },
        { label: "Support", desc: "Contact us about privacy or your data.", href: "/support" }
      ]}
    />
  );
}
