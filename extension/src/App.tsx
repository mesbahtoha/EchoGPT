import { useRef, useState } from "react";
import ExtensionHeader from "./components/ExtensionHeader";
import RightRail from "./components/RightRail";
import QuickActionCard from "./components/QuickActionCard";
import SuggestedPrompts from "./components/SuggestedPrompt";
import ExtensionComposer from "./components/ExtensionComposer";
import SettingsModal from "./components/SettingsModal";
import ToolPanel from "./components/ToolPanel";
import HistoryView from "./components/HistoryView";
import { quickTools, suggestedPrompts, type ToolId } from "./lib/tools";
import { initialHistory } from "./lib/history";
import { mockExtReply, type ExtMessage } from "./lib/user";

type MainView = "chat" | "history";

const toolTitles: Record<ToolId, string> = {
  chat: "Chat",
  write: "Write",
  read: "Read",
  translate: "Translate",
  image: "Image Studio",
  video: "Video Studio",
  compare: "Compare",
  mcp: "Connectors"
};

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolId>("chat");
  const [view, setView] = useState<MainView>("chat");
  const [modelId, setModelId] = useState("deepseek-v4");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ExtMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [history, setHistory] = useState(initialHistory);
  const [historyQuery, setHistoryQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollDown() {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }

  function handleSend() {
    const text = input.trim();
    if (!text || sending) return;
    const user: ExtMessage = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages((p) => [...p, user]);
    setInput("");
    setSending(true);
    scrollDown();
    window.setTimeout(() => {
      setMessages((p) => [...p, { id: `a-${Date.now()}`, role: "assistant", content: mockExtReply(text, activeTool) }]);
      setSending(false);
      scrollDown();
    }, 600);
  }

  function handleNewChat() {
    setMessages([]);
    setInput("");
    setActiveTool("chat");
    setView("chat");
  }

  function handleSelectTool(id: ToolId) {
    setActiveTool(id);
    setView("chat");
  }

  function handlePickHistory(title: string) {
    setInput(title);
    setView("chat");
    document.getElementById("ext-input")?.focus();
  }

  const isHome = messages.length === 0 && activeTool === "chat";
  const isChatView = view === "chat" && activeTool === "chat";
  const headerTitle = view === "history" ? "History" : toolTitles[activeTool];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white font-sans">
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {view === "history" ? (
          <HistoryView
            conversations={history}
            query={historyQuery}
            onQuery={setHistoryQuery}
            onClear={() => setHistory([])}
            onPick={handlePickHistory}
            onClose={() => setView("chat")}
          />
        ) : (
          <>
            <ExtensionHeader
              title={headerTitle}
              onNewChat={handleNewChat}
              onHistory={() => setView("history")}
              historyActive={false}
            />

            <div ref={scrollRef} className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
              {isHome ? (
                <div key="ext-home" className="anim-fade-in flex min-h-full min-w-0 flex-1 flex-col px-3">
                  {/* Responsive upper whitespace: large on tall panels, collapses on short ones */}
                  <div aria-hidden className="min-h-[clamp(24px,9vh,110px)] flex-[3]" />
                  <div className="min-w-0 shrink-0">
                    <p className="text-[12.5px] font-normal leading-tight text-slate-500">Hi, good evening</p>
                    <h2 className="mt-0.5 text-[19px] font-bold leading-tight text-slate-900">
                      How can I help you?
                    </h2>

                    <div className="mt-3 grid min-w-0 grid-cols-2 gap-2">
                      {quickTools.map((t) => (
                        <QuickActionCard key={t.id} tool={t} onSelect={handleSelectTool} />
                      ))}
                    </div>

                    <div className="mt-2 min-w-0">
                      <SuggestedPrompts prompts={suggestedPrompts} onPick={setInput} />
                    </div>
                  </div>
                  {/* Flexible remaining space: keeps composer pinned, never overlaps */}
                  <div aria-hidden className="min-h-3 flex-[2]" />
                </div>
              ) : (
                <div key={`ext-tool-${activeTool}`} className="anim-fade-in min-w-0 space-y-2.5 px-3 py-3">
                  {activeTool !== "chat" && <ToolPanel tool={activeTool} onUse={setInput} />}

                  {messages.map((m) => (
                    <div key={m.id} className={`anim-msg-in flex min-w-0 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[92%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-[12.5px] font-normal leading-relaxed ${
                          m.role === "user"
                            ? "rounded-br-md bg-brand-500 text-white"
                            : "rounded-bl-md border border-slate-200 bg-white text-slate-800 shadow-card"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {sending && (
                    <p className="text-[11.5px] font-normal text-slate-400" aria-live="polite">
                      Thinking…
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* Global Chat composer: Chat view only — hidden on tools + History so
            non-Chat pages use the full available height */}
        {isChatView && (
          <div className="relative shrink-0 overflow-visible border-t border-slate-100 bg-white px-3 pb-3 pt-2">
            <ExtensionComposer
              value={input}
              onChange={setInput}
              onSend={handleSend}
              modelId={modelId}
              onModelChange={setModelId}
              sending={sending}
            />
          </div>
        )}
      </div>

      <RightRail active={activeTool} onSelect={handleSelectTool} onOpenSettings={() => setSettingsOpen(true)} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
