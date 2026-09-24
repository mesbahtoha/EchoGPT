"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clapperboard,
  GitCompareArrows,
  History,
  Image as ImageIcon,
  Menu,
  MessagesSquare,
  Plug,
  ShieldCheck,
  Sparkles,
  X,
  Zap
} from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import PlanCard from "@/components/PlanCard";
import { plans } from "@/lib/plans";
import { FacebookIcon, LinkedInIcon, TelegramIcon, XIcon } from "@/components/BrandIcons";
import { storeApps } from "@/lib/store";
import { externalLinks } from "@/lib/links";
import { cn } from "@/lib/cn";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <Reveal className="mx-auto max-w-[680px] text-center">
      <p className="mx-auto w-fit rounded-full bg-brand-50 px-3 py-1 text-[12px] font-semibold text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[28px] font-bold tracking-tight text-ink-900 dark:text-slate-100 sm:text-[36px]">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-[600px] text-[15.5px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
        {subtitle}
      </p>
    </Reveal>
  );
}

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Models", href: "#models" },
  { label: "Preview", href: "#preview" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" }
];

const features = [
  { icon: MessagesSquare, title: "Multi-Model Chat", desc: "Switch between 9 frontier AI models mid-conversation and always use the best brain for the job." },
  { icon: ImageIcon, title: "Image Studio", desc: "Generate scroll-stopping visuals from text with Google and OpenAI image models." },
  { icon: Clapperboard, title: "Video Studio", desc: "Type what you imagine and get video back — storyboards, clips, and concepts in minutes." },
  { icon: GitCompareArrows, title: "Compare Mode", desc: "Ask once and see how 3 models answer side by side. Pick the winner with confidence." },
  { icon: Plug, title: "Connectors & MCP", desc: "Plug EchoGPT into your tools and data sources with Model Context Protocol support." },
  { icon: History, title: "Synced History", desc: "Every chat, image, and analysis saved and searchable across web and extension." }
];

const whyPoints = [
  { title: "One workspace, every model", desc: "Stop juggling five subscriptions. EchoGPT unifies frontier models behind one clean interface." },
  { title: "Built for creators & pros", desc: "Studios for image, video, resumes, and SOPs turn raw AI power into finished work." },
  { title: "Private by default", desc: "Encrypted in transit, never sold, deletable anytime. Your ideas stay yours." },
  { title: "Free to start", desc: "Generous free tier with no credit card. Upgrade only when you need Pro power." }
];

const faqs = [
  { q: "What is EchoGPT?", a: "EchoGPT is your personal AI workspace — chat, image, and video generation, model comparison, resume and SOP builders, and more, all behind one login." },
  { q: "Which AI models are supported?", a: "EchoGPT, DeepSeek V4 Pro & Flash, Nemotron 3 Ultra, GLM-5.2, Tencent Hy3, MiMo V2.5 Pro, Qwen 3.7 Plus, and GPT-5.6 Sol — switch anytime, even mid-chat." },
  { q: "Is EchoGPT free to use?", a: "Yes. The free tier covers everyday chatting and previews. Pro ($9.99/mo) unlocks all models, 2000 monthly Advance Credits, and priority speed." },
  { q: "Do I need to install anything?", a: "No. The web app runs entirely in your browser. There is also a Chrome extension that brings EchoGPT to any tab as a sidebar." },
  { q: "Is my data private?", a: "Chats are encrypted in transit, never sold, and you can delete your history at any time from the History page." },
  { q: "How do I cancel my subscription?", a: "Cancel anytime from Subscriptions. Pro stays active until the end of your billing period." }
];

const testimonials = [
  { quote: "Compare mode alone is worth it — I finally stopped guessing which model to trust.", name: "Sarah K.", role: "Content Strategist", initials: "SK", color: "#6d3ae6" },
  { quote: "Built my entire resume and tailored it per job in one evening. Got callbacks within a week.", name: "Daniel R.", role: "Frontend Developer", initials: "DR", color: "#0d9488" },
  { quote: "Image Studio replaced three other subscriptions for our social content pipeline.", name: "Amelia T.", role: "Marketing Lead", initials: "AT", color: "#4d6bfe" }
];

function ModelGlyph({ name }: { name: string }) {
  const app = storeApps.find((a) => a.name === name);
  if (app?.logo) {
    return <img src={app.logo} alt="" aria-hidden className="h-5 w-5 rounded-[6px]" />;
  }
  if (app?.glyph) {
    return (
      <svg viewBox={app.glyph.viewBox} aria-hidden className="h-5 w-5" fill={app.glyph.color}>
        {app.glyph.paths.map((p, i) => (
          <path key={i} d={p.d} fillRule={p.fillRule as "evenodd" | undefined} />
        ))}
      </svg>
    );
  }
  return null;
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState("");

  // Scroll-spy: indicate which section (Features, Models, Preview…) is in view.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-ink-900 antialiased dark:bg-[#100d1a] dark:text-slate-100">
      {/* ================= NAV ================= */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-100/80 bg-white/85 backdrop-blur-md dark:border-white/10 dark:bg-[#100d1a]/85">
        <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Landing">
            {navLinks.map((l) => {
              const active = activeSection === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "relative py-1 text-[14px] font-medium transition",
                    active ? "text-brand-600 dark:text-brand-300" : "text-ink-700 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-300"
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-[2.5px] rounded-full bg-brand-600 transition-all dark:bg-brand-300",
                      active ? "opacity-100" : "opacity-0"
                    )}
                  />
                </a>
              );
            })}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <a href="/login" className="rounded-[10px] border border-slate-200 px-4 py-2 text-[14px] font-semibold text-ink-900 transition hover:border-brand-400 hover:text-brand-700 dark:border-white/10 dark:text-slate-100">
              Sign In
            </a>
            <a href="/" className="flex items-center gap-1.5 rounded-[10px] bg-brand-600 px-4 py-2 text-[14px] font-semibold text-white shadow-[0_4px_14px_rgba(109,58,230,0.35)] transition hover:bg-brand-700">
              Open App <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="rounded-lg p-2 text-ink-700 dark:text-slate-300"
            >
              {menuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-slate-100 bg-white px-5 py-4 dark:border-white/10 dark:bg-[#100d1a] lg:hidden" aria-label="Mobile">
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeSection === l.href.slice(1) ? "true" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-[15px] font-medium hover:bg-brand-50 dark:text-slate-200",
                    activeSection === l.href.slice(1) ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300" : "text-ink-700"
                  )}
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2.5">
                <a href="/login" className="flex-1 rounded-[10px] border border-slate-200 px-4 py-2.5 text-center text-[14px] font-semibold dark:border-white/10">
                  Sign In
                </a>
                <a href="/" className="flex-1 rounded-[10px] bg-brand-600 px-4 py-2.5 text-center text-[14px] font-semibold text-white">
                  Open App
                </a>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="cyber-grid-bg relative overflow-hidden pt-[68px]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-0 mx-auto h-[560px] max-w-[1200px] bg-[radial-gradient(600px_320px_at_50%_-60px,rgba(109,58,230,0.14),transparent)]" />
        <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-16 pt-14 text-center sm:px-8 sm:pt-20">
          <Reveal>
            <p className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[12.5px] font-semibold text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
              <Sparkles className="h-3.5 w-3.5" aria-hidden /> New: 9 frontier models in one workspace
            </p>
            <h1 className="mx-auto mt-5 max-w-[820px] text-[36px] font-extrabold leading-[1.08] tracking-tight sm:text-[52px] lg:text-[60px]">
              Your Personal <span data-text="AI Assistant" className="cyber-glitch bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 bg-clip-text text-transparent">AI Assistant</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[620px] text-[16px] font-normal leading-relaxed text-[#777386] dark:text-slate-400 sm:text-[18px]">
              Chat, create images and videos, compare models side by side, and build resumes that get callbacks — all in one fast, beautiful workspace.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="/" className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-7 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(109,58,230,0.4)] transition hover:bg-brand-700 active:scale-[0.99] sm:w-auto">
                Start Chatting Free <ArrowRight className="h-[18px] w-[18px]" aria-hidden />
              </a>
              <a href="/image-studio" className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 text-[15px] font-semibold text-ink-900 transition hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 sm:w-auto">
                Explore Image Studio
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13.5px] text-slate-500 dark:text-slate-400">
              <span><strong className="text-[18px] font-bold text-ink-900 dark:text-slate-100">9</strong> AI models</span>
              <span><strong className="text-[18px] font-bold text-ink-900 dark:text-slate-100">8</strong> creative studios</span>
              <span><strong className="text-[18px] font-bold text-ink-900 dark:text-slate-100">Free</strong> to start</span>
            </div>
            <p className="mt-5 font-mono text-[12.5px] tracking-[0.18em] text-brand-600/80 uppercase dark:text-emerald-400/80">
              &gt; status: 9 models online<span className="cyber-blink">_</span>
            </p>
          </Reveal>

          {/* Product preview */}
          <Reveal delay={0.15} className="relative mx-auto mt-14 max-w-[920px]">
            <div aria-hidden className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl dark:bg-brand-500/10" />
            <div aria-hidden className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-500/10" />

            {/* Floating card: model switch */}
            <div className="cyber-float absolute -left-4 top-16 z-10 hidden w-56 rounded-2xl border border-[#E8E5EF] bg-white/95 p-3.5 shadow-composer backdrop-blur dark:border-white/10 dark:bg-[#1e1930]/95 md:block lg:-left-16">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Active model</p>
              <p className="mt-1.5 flex items-center gap-2 text-[13.5px] font-semibold">
                <Zap className="h-4 w-4 text-brand-600" aria-hidden /> DeepSeek V4 Pro
              </p>
              <p className="mt-1 flex items-center gap-1 text-[12px] text-emerald-600 dark:text-emerald-400">
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /> Switched in 1 click
              </p>
            </div>

            {/* Floating card: image ready */}
            <div className="cyber-float-delayed absolute -right-4 bottom-16 z-10 hidden w-52 overflow-hidden rounded-2xl border border-[#E8E5EF] bg-white/95 shadow-composer backdrop-blur dark:border-white/10 dark:bg-[#1e1930]/95 md:block lg:-right-14">
              <div className="h-24 bg-gradient-to-br from-brand-400 via-fuchsia-400 to-amber-300" />
              <p className="flex items-center gap-1.5 px-3.5 py-2.5 text-[12.5px] font-semibold">
                <ImageIcon className="h-4 w-4 text-brand-600" aria-hidden /> Image ready
              </p>
            </div>

            {/* Main app window */}
            <div className="cyber-glow relative overflow-hidden rounded-2xl border border-[#E8E5EF] bg-white text-left dark:border-white/10 dark:bg-[#1a1528]">
              <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-white/10">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                </span>
                <span className="text-[13px] font-semibold">EchoGPT Workspace</span>
                <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2" aria-hidden>
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </span>
              </div>
              <div className="space-y-3 p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brand-50 px-3 py-1.5 text-[12px] font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">EchoGPT</span>
                  <span className="rounded-full border border-slate-200 px-3 py-1.5 text-[12px] text-slate-500 dark:border-white/10 dark:text-slate-400">DeepSeek V4 Pro</span>
                  <span className="rounded-full border border-slate-200 px-3 py-1.5 text-[12px] text-slate-500 dark:border-white/10 dark:text-slate-400">Nemotron 3 Ultra</span>
                </div>
                <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-2.5 text-[13.5px] text-white">
                  Polish my resume for a frontend role
                </div>
                <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-md border border-brand-100 bg-white px-4 py-2.5 text-[13.5px] shadow-card dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  Here&apos;s a polished summary + 3 tailored bullets. Want me to match it to a specific job posting?
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[#E8E5EF] px-3.5 py-3 text-[13.5px] text-slate-400 dark:border-white/10 dark:text-slate-500">
                  Ask a question...
                  <span className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="scroll-mt-20 bg-[#F7F5FF] py-16 dark:bg-[#141122] sm:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <SectionHeading eyebrow="Features" title="Everything you need to create" subtitle="Studios, comparisons, and pro tools — designed to turn ideas into finished work." />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.05 * (i % 3)}>
                <div className="h-full rounded-2xl border border-[#E8E5EF] bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-composer dark:border-white/10 dark:bg-[#1a1528]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                    <f.icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[16px] font-semibold">{f.title}</h3>
                  <p className="mt-2 text-[14px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODELS ================= */}
      <section id="models" className="scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <SectionHeading eyebrow="AI Models" title="Nine frontier models, zero switching costs" subtitle="Every plan includes the right brain for every task — swap models anytime, even mid-conversation." />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {storeApps.map((m, i) => (
              <Reveal key={m.id} delay={0.04 * (i % 3)}>
                <div className="flex h-full items-center gap-3.5 rounded-2xl border border-[#E8E5EF] bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-composer dark:border-white/10 dark:bg-[#1a1528]">
                  {m.logo ? (
                    <img src={m.logo} alt="" aria-hidden className="h-11 w-11 shrink-0 rounded-xl" />
                  ) : m.glyph ? (
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-100 bg-white dark:border-white/10">
                      <svg viewBox={m.glyph.viewBox} aria-hidden className="h-6 w-6" fill={m.glyph.color}>
                        {m.glyph.paths.map((p, j) => (
                          <path key={j} d={p.d} fillRule={p.fillRule as "evenodd" | undefined} />
                        ))}
                      </svg>
                    </span>
                  ) : (
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[15px] font-bold text-white" style={{ background: m.badgeBg }}>
                      {m.initials}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold">{m.name}</span>
                    <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-[#777386] dark:text-slate-400">{m.description}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PREVIEW ================= */}
      <section id="preview" className="scroll-mt-20 bg-[#F7F5FF] py-16 dark:bg-[#141122] sm:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <SectionHeading eyebrow="Product Tour" title="Take a look inside" subtitle="A workspace that stays out of your way and puts your work front and center." />
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {[
              { tag: "Chat", title: "Ask anything", desc: "Streaming answers with model switching, history sync, and one-click follow-ups.", src: "/landing/shot-home.png", alt: "EchoGPT home screen with suggestion cards and chat composer" },
              { tag: "Image Studio", title: "Describe it, see it", desc: "Aspect ratios, batch counts, and 8 art models with a live creation feed.", src: "/landing/shot-image-studio.png", alt: "EchoGPT Image Studio generation panel" },
              { tag: "Compare", title: "Three answers, one prompt", desc: "Line models up side by side and crown a winner for every question.", src: "/landing/shot-compare.png", alt: "EchoGPT Compare mode with model pills and composer" }
            ].map((c, i) => (
              <Reveal key={c.tag} delay={0.06 * i}>
                <div className="group h-full overflow-hidden rounded-2xl border border-[#E8E5EF] bg-white shadow-card transition hover:-translate-y-1 hover:shadow-composer dark:border-white/10 dark:bg-[#1a1528]">
                  <div className="overflow-hidden border-b border-slate-100 dark:border-white/10">
                    <img src={c.src} alt={c.alt} loading="lazy" className="h-auto w-full transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-5">
                    <p className="text-[12px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-300">{c.tag}</p>
                    <h3 className="mt-1.5 text-[16px] font-semibold">{c.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-[#777386] dark:text-slate-400">{c.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <p className="w-fit rounded-full bg-brand-50 px-3 py-1 text-[12px] font-semibold text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">Why EchoGPT</p>
            <h2 className="mt-3 text-[28px] font-bold tracking-tight sm:text-[36px]">The assistant that keeps up with you</h2>
            <p className="mt-3 max-w-[480px] text-[15.5px] leading-relaxed text-[#777386] dark:text-slate-400">
              Most AI apps lock you into one model and one workflow. EchoGPT gives you the whole frontier — plus the studios to turn answers into outcomes.
            </p>
            <a href="/" className="mt-6 inline-flex h-[50px] items-center gap-2 rounded-xl bg-brand-600 px-6 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(109,58,230,0.4)] transition hover:bg-brand-700">
              Try it now <ArrowRight className="h-[18px] w-[18px]" aria-hidden />
            </a>
          </Reveal>
          <div className="space-y-4">
            {whyPoints.map((w, i) => (
              <Reveal key={w.title} delay={0.06 * i}>
                <div className="flex gap-4 rounded-2xl border border-[#E8E5EF] bg-white p-5 shadow-card dark:border-white/10 dark:bg-[#1a1528]">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                    <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[15.5px] font-semibold">{w.title}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-[#777386] dark:text-slate-400">{w.desc}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="scroll-mt-20 bg-[#F7F5FF] py-16 dark:bg-[#141122] sm:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <SectionHeading eyebrow="Pricing" title="Simple plans, serious power" subtitle="The exact Pro plans from the app — start free, upgrade when you're ready, cancel anytime." />
          <div className="mx-auto mt-10 grid max-w-[1360px] grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={0.05 * i} className="h-full">
                <PlanCard
                  plan={plan}
                  action={
                    <a
                      href="/subscriptions"
                      className="flex h-11 w-full items-center justify-center rounded-[10px] bg-brand-600 text-[14px] font-semibold text-white shadow-[0_4px_14px_rgba(109,58,230,0.35)] transition hover:bg-brand-700 active:scale-[0.99]"
                    >
                      Subscribe Now
                    </a>
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <SectionHeading eyebrow="Loved worldwide" title="What users say" subtitle="From job seekers to marketing teams — here's why people stay." />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={0.06 * i}>
                <figure className="flex h-full flex-col rounded-2xl border border-[#E8E5EF] bg-white p-6 shadow-card dark:border-white/10 dark:bg-[#1a1528]">
                  <div className="flex gap-1 text-brand-500" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Zap key={s} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-900 dark:text-slate-200">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full text-[13px] font-bold text-white" style={{ background: t.color }}>
                      {t.initials}
                    </span>
                    <span>
                      <span className="block text-[14px] font-semibold">{t.name}</span>
                      <span className="block text-[12.5px] text-slate-500">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="scroll-mt-20 bg-[#F7F5FF] py-16 dark:bg-[#141122] sm:py-20">
        <div className="mx-auto w-full max-w-[900px] px-5 sm:px-8">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Everything else you might want to know before diving in." />
          <div className="mt-8 space-y-3.5">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="overflow-hidden rounded-[14px] border border-[#E8E5EF] bg-white shadow-card dark:border-white/10 dark:bg-[#1a1528]">
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                    <span className="text-[15px] font-medium">{f.q}</span>
                    <ChevronDown className={cn("h-5 w-5 shrink-0 text-slate-400 transition-transform", open && "rotate-180")} aria-hidden />
                  </button>
                  {open && <p className="px-5 pb-5 text-[14px] leading-relaxed text-[#777386] dark:text-slate-400">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <Reveal>
            <div className="cyber-chamfer cyber-glow relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
              <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-black/15 blur-2xl" />
              <h2 className="relative text-[28px] font-bold tracking-tight sm:text-[40px]">Ready to meet your AI assistant?</h2>
              <p className="relative mx-auto mt-3 max-w-[520px] text-[15.5px] text-white/85">Join thousands of creators, job seekers, and teams already working faster with EchoGPT.</p>
              <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="/" className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-white px-7 text-[15px] font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50 active:scale-[0.99] sm:w-auto">
                  Open the App <ArrowRight className="h-[18px] w-[18px]" aria-hidden />
                </a>
                <a href="/login" className="flex h-[52px] w-full items-center justify-center rounded-xl border border-white/40 px-7 text-[15px] font-semibold text-white transition hover:bg-white/10 sm:w-auto">
                  Create free account
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-100 bg-white dark:border-white/10 dark:bg-[#100d1a]">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[300px] text-[13.5px] leading-relaxed text-[#777386] dark:text-slate-400">
              Your personal AI assistant for chat, creation, and career growth.
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              <a href={externalLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon className="h-6 w-6" /></a>
              <a href={externalLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 text-[10px] font-bold text-white">ig</span>
              </a>
              <a href={externalLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon className="h-6 w-6" /></a>
              <a href={externalLinks.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram"><TelegramIcon className="h-6 w-6" /></a>
              <a href={externalLinks.discord} target="_blank" rel="noopener noreferrer" aria-label="Discord" className="grid h-6 w-6 place-items-center rounded-full bg-[#5865F2] text-[10px] font-bold text-white">D</a>
              <a href={externalLinks.telegram} target="_blank" rel="noopener noreferrer" aria-label="X" className="text-ink-900 dark:text-slate-100"><XIcon className="h-5 w-5" /></a>
            </div>
          </div>
          <nav aria-label="Product">
            <p className="text-[13px] font-bold uppercase tracking-wider text-slate-400">Product</p>
            <ul className="mt-3 space-y-2.5 text-[14px]">
              {[["Image Studio", "/image-studio"], ["Video Studio", "/video-studio"], ["Compare", "/compare"], ["Store", "/store"], ["AI Tasks", "/tasks"]].map(([l, h]) => (
                <li key={h}><a href={h} className="text-[#55516b] hover:text-brand-600 dark:text-slate-400">{l}</a></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Resources">
            <p className="text-[13px] font-bold uppercase tracking-wider text-slate-400">Resources</p>
            <ul className="mt-3 space-y-2.5 text-[14px]">
              <li><a href="/support" className="text-[#55516b] hover:text-brand-600 dark:text-slate-400">Support</a></li>
              <li><a href="/newsletter" className="text-[#55516b] hover:text-brand-600 dark:text-slate-400">Newsletter</a></li>
              <li><a href={externalLinks.apiPlatform} target="_blank" rel="noopener noreferrer" className="text-[#55516b] hover:text-brand-600 dark:text-slate-400">API Platform</a></li>
              <li><a href={externalLinks.discord} target="_blank" rel="noopener noreferrer" className="text-[#55516b] hover:text-brand-600 dark:text-slate-400">Discord</a></li>
            </ul>
          </nav>
          <nav aria-label="Company">
            <p className="text-[13px] font-bold uppercase tracking-wider text-slate-400">Company</p>
            <ul className="mt-3 space-y-2.5 text-[14px]">
              <li><a href="/subscriptions" className="text-[#55516b] hover:text-brand-600 dark:text-slate-400">Pricing</a></li>
              <li><a href="/login" className="text-[#55516b] hover:text-brand-600 dark:text-slate-400">Sign In</a></li>
              <li><a href="/" className="text-[#55516b] hover:text-brand-600 dark:text-slate-400">Open App</a></li>
              <li><a href={externalLinks.email} className="text-[#55516b] hover:text-brand-600 dark:text-slate-400">{externalLinks.emailAddress}</a></li>
            </ul>
          </nav>
        </div>
        <div className="border-t border-slate-100 dark:border-white/10">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-2 px-5 py-5 text-[13px] text-slate-400 sm:flex-row sm:px-8">
            <p>© 2026 EchoGPT. All rights reserved.</p>
            <p className="flex gap-4">
              <a href="/support" className="hover:text-brand-600">Terms of Use</a>
              <a href="/support" className="hover:text-brand-600">Privacy Policy</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
