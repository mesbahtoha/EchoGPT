"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PromptCard from "@/components/PromptCard";
import Composer from "@/components/Composer";
import ChatMessage from "@/components/ChatMessage";
import SignInModal from "@/components/SignInModal";
import HistorySidebar from "@/components/HistorySidebar";
import { promptCards, type PromptCardData } from "@/lib/prompts";
import { mockAssistantReply, type ChatMessageData } from "@/lib/conversations";
import { routeMap } from "@/lib/routes";

export default function HomePage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [recentOpen, setRecentOpen] = useState(false);
  const [modelId, setModelId] = useState("echogpt");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (replyTimer.current !== null) window.clearTimeout(replyTimer.current);
    };
  }, []);

  const isEmpty = messages.length === 0;

  const greeting = useMemo(() => "Hello There! 👋 How can I assist you today?", []);

  function scrollToBottom() {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }

  function handleSelectCard(card: PromptCardData) {
    setInput(card.fullPrompt);
    document.getElementById("composer-input")?.focus();
  }

  function handleSend() {
    const text = input.trim();
    if (!text || sending) return;
    const userMsg: ChatMessageData = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);
    scrollToBottom();
    if (replyTimer.current !== null) window.clearTimeout(replyTimer.current);
    replyTimer.current = window.setTimeout(() => {
      const reply: ChatMessageData = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: mockAssistantReply(text)
      };
      setMessages((prev) => [...prev, reply]);
      setSending(false);
      scrollToBottom();
    }, 650);
  }

  function handleNewChat() {
    setMessages([]);
    setInput("");
    setActiveNav("home");
    setSidebarOpen(false);
  }

  function handleNavigate(id: string) {
    setSidebarOpen(false);
    const route = routeMap[id];
    if (route && route !== "/") {
      router.push(route);
      return;
    }
    setActiveNav(id);
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-[#100d1a]">
      <Sidebar
        activeNav={activeNav}
        onNavigate={handleNavigate}
        onNewChat={handleNewChat}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header onMenu={() => setSidebarOpen(true)} onSignIn={() => setSignInOpen(true)} />

        <main className="relative flex min-h-0 min-w-0 flex-1 flex-col">
          <div ref={scrollRef} className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
            {isEmpty ? (
              <div className="mx-auto flex min-h-full w-full max-w-[1122px] flex-col px-[22px] pb-[190px] pt-[60px] sm:px-[35px] sm:pb-[242px]">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-center"
                >
                  <h1 className="mx-auto max-w-[990px] text-[26px] font-bold leading-[1.15] text-ink-900 dark:text-slate-100 sm:text-[33px] sm:leading-[1.1] xl:whitespace-nowrap min-[1440px]:text-[37px] lg:text-[35px]">
                    {greeting}
                  </h1>
                  <p className="mx-auto mt-[13px] max-w-[704px] text-[16px] font-normal leading-relaxed text-[#777386] dark:text-slate-400 sm:text-[17.5px]">
                    Your personal AI assistant is ready to help—ask me anything, anytime.
                  </p>
                </motion.div>

                <div className="mx-auto mt-[42px] grid w-full max-w-[1078px] grid-cols-1 gap-[15px] sm:grid-cols-2 sm:gap-[18px]">
                  {promptCards.map((card, i) => (
                    <PromptCard key={card.id} card={card} index={i} onSelect={handleSelectCard} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto w-full max-w-[858px] space-y-5 px-[18px] pb-[190px] pt-[35px] sm:px-[26px] sm:pb-[242px]">
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <ChatMessage key={m.id} message={m} />
                  ))}
                </AnimatePresence>
                {sending && (
                  <div className="flex items-center gap-2 text-[14px] text-slate-400 dark:text-slate-500" aria-live="polite">
                    <span className="flex gap-1" aria-hidden>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400" />
                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400"
                        style={{ animationDelay: "0.12s" }}
                      />
                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400"
                        style={{ animationDelay: "0.24s" }}
                      />
                    </span>
                    EchoGPT is thinking…
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Composer dock: fixed to viewport bottom, offset for the sidebar so it
              stays centered within the main content area */}
          <div className="fixed bottom-4 left-0 right-0 z-20 px-[18px] sm:bottom-[46px] lg:left-[284px] lg:px-[35px]">
            <div className="relative mx-auto w-full max-w-[1078px]">
              <Composer
                value={input}
                onChange={setInput}
                onSend={handleSend}
                modelId={modelId}
                onModelChange={setModelId}
                onOpenHistory={() => setRecentOpen((v) => !v)}
                sending={sending}
              />
            </div>
          </div>
        </main>
      </div>

      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
      <HistorySidebar
        open={recentOpen}
        onClose={() => setRecentOpen(false)}
        onPick={(title) => setInput(`Continue: ${title} — `)}
        onNewChat={handleNewChat}
      />
    </div>
  );
}
