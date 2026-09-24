import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { extensionModels } from "../lib/models";
import { cn } from "../lib/cn";

type WriteTab = "compose" | "reply" | "grammar";

const tabs: { id: WriteTab; label: string }[] = [
  { id: "compose", label: "Compose" },
  { id: "reply", label: "Reply" },
  { id: "grammar", label: "Grammar" }
];

const composeFormats = [
  "Automatic",
  "Email",
  "Message",
  "Paragraph",
  "Idea",
  "Outline",
  "Blog Post",
  "Comment",
  "Article",
  "Twitter"
];

const replyFormats = ["Automatic", "Email", "Message", "Comment", "Twitter"];

const tones = [
  "Automatic",
  "Formal",
  "Casual",
  "Friendly",
  "Professional",
  "Straightforward",
  "Confident",
  "Funny",
  "Enthusiastic"
];

const lengths = ["Automatic", "Short", "Medium", "Long"];

const languages = [
  "Automatic",
  "English",
  "Bengali",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Russian",
  "Turkish",
  "Dutch",
  "Indonesian",
  "Urdu"
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">{children}</p>
  );
}

interface PillGroupProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}

function PillGroup({ options, value, onChange, label }: PillGroupProps) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          aria-pressed={value === o}
          className={cn(
            "rounded-full border px-2.5 py-1 text-[11.5px] font-medium transition",
            value === o
              ? "border-brand-500 bg-brand-500 text-white"
              : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-600"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

const textareaClass =
  "w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-[12.5px] font-normal text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

interface Props {
  onUse: (text: string) => void;
}

export default function WritePanel({ onUse }: Props) {
  const [tab, setTab] = useState<WriteTab>("compose");
  const [topic, setTopic] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [grammarText, setGrammarText] = useState("");
  const [format, setFormat] = useState("Automatic");
  const [tone, setTone] = useState("Automatic");
  const [length, setLength] = useState("Automatic");
  const [language, setLanguage] = useState("Automatic");
  const [modelId, setModelId] = useState("echogpt");

  function describe(value: string, fallback = "automatic"): string {
    return value === "Automatic" ? fallback : value.toLowerCase();
  }

  function handleCompose() {
    const subject = topic.trim() ? `"${topic.trim()}"` : "my topic";
    onUse(
      `Write a ${describe(format, "post")} about ${subject} in a ${describe(tone, "neutral")} tone, ${describe(length, "medium")} length. Output language: ${language}.`
    );
  }

  function handleReply() {
    const orig = originalText.trim() ? `"${originalText.trim()}"` : "the text below";
    const reply = replyContent.trim() ? `"${replyContent.trim()}"` : "an appropriate response";
    onUse(
      `Reply to ${orig} with ${reply}. Format: ${describe(format)}. Tone: ${describe(tone)}. Length: ${describe(length)}. Output language: ${language}.`
    );
  }

  function handleGrammar() {
    onUse(grammarText.trim() ? `Fix the grammar, spelling, and punctuation: "${grammarText.trim()}"` : "Fix my grammar: ");
  }

  return (
    <section aria-label="Write tool" className="min-w-0">
      <h2 className="text-[13px] font-bold text-slate-900">Write</h2>

      {/* Full-width tab bar */}
      <div className="mt-2 grid w-full grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Write mode">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-lg py-1.5 text-[12px] font-semibold transition",
              tab === t.id ? "bg-brand-500 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "compose" && (
        <div className="mt-3 space-y-3">
          <div>
            <SectionLabel>Topic</SectionLabel>
            <label htmlFor="write-topic" className="sr-only">
              The topic you want to write about
            </label>
            <textarea
              id="write-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              placeholder="The topic you want to write about"
              className={cn(textareaClass, "min-h-[72px] resize-y")}
            />
          </div>
          <div>
            <SectionLabel>Format</SectionLabel>
            <PillGroup options={composeFormats} value={format} onChange={setFormat} label="Format" />
          </div>
          <div>
            <SectionLabel>Tone</SectionLabel>
            <PillGroup options={tones} value={tone} onChange={setTone} label="Tone" />
          </div>
          <div>
            <SectionLabel>Length</SectionLabel>
            <PillGroup options={lengths} value={length} onChange={setLength} label="Length" />
          </div>
          <div>
            <SectionLabel>Output Language</SectionLabel>
            <div className="relative">
              <label htmlFor="write-lang" className="sr-only">
                Output language
              </label>
              <select
                id="write-lang"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-2.5 pr-8 text-[12.5px] font-medium text-slate-800 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                {languages.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
            </div>
          </div>
          <div className="flex min-w-0 items-stretch gap-2">
            <div className="relative shrink-0">
              <label htmlFor="write-model" className="sr-only">
                Model
              </label>
              <select
                id="write-model"
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                className="h-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-2.5 pr-7 text-[12px] font-semibold text-slate-800 focus:border-brand-400 focus:outline-none"
              >
                {extensionModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
            </div>
            <button
              type="button"
              onClick={handleCompose}
              className="min-w-0 flex-1 rounded-xl bg-brand-500 py-2 text-[12.5px] font-semibold text-white transition hover:bg-brand-600 active:scale-[0.99]"
            >
              Generate
            </button>
          </div>
        </div>
      )}

      {tab === "reply" && (
        <div className="mt-3 space-y-3">
          <div>
            <SectionLabel>Original Text</SectionLabel>
            <label htmlFor="write-original" className="sr-only">
              The original text which you want to reply
            </label>
            <textarea
              id="write-original"
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              rows={3}
              placeholder="The original text which you want to reply"
              className={cn(textareaClass, "min-h-[72px] resize-y")}
            />
          </div>
          <div>
            <SectionLabel>What to Reply</SectionLabel>
            <label htmlFor="write-reply" className="sr-only">
              The general content of your reply to the above text
            </label>
            <textarea
              id="write-reply"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={2}
              placeholder="The general content of your reply to the above text"
              className={cn(textareaClass, "min-h-[56px] resize-y")}
            />
          </div>
          <div>
            <SectionLabel>Format</SectionLabel>
            <PillGroup options={replyFormats} value={format} onChange={setFormat} label="Format" />
          </div>
          <div>
            <SectionLabel>Tone</SectionLabel>
            <PillGroup options={tones} value={tone} onChange={setTone} label="Tone" />
          </div>
          <div>
            <SectionLabel>Length</SectionLabel>
            <PillGroup options={lengths} value={length} onChange={setLength} label="Length" />
          </div>
          <div>
            <SectionLabel>Output Language</SectionLabel>
            <div className="relative">
              <label htmlFor="write-reply-lang" className="sr-only">
                Output language
              </label>
              <select
                id="write-reply-lang"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-2.5 pr-8 text-[12.5px] font-medium text-slate-800 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                {languages.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
            </div>
          </div>
          <div className="flex min-w-0 items-stretch gap-2">
            <div className="relative shrink-0">
              <label htmlFor="write-reply-model" className="sr-only">
                Model
              </label>
              <select
                id="write-reply-model"
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                className="h-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-2.5 pr-7 text-[12px] font-semibold text-slate-800 focus:border-brand-400 focus:outline-none"
              >
                {extensionModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
            </div>
            <button
              type="button"
              onClick={handleReply}
              className="min-w-0 flex-1 rounded-xl bg-brand-500 py-2 text-[12.5px] font-semibold text-white transition hover:bg-brand-600 active:scale-[0.99]"
            >
              Generate
            </button>
          </div>
        </div>
      )}

      {tab === "grammar" && (
        <div className="mt-3 space-y-3">
          <div>
            <label htmlFor="write-grammar" className="sr-only">
              Paste or enter your text to check for grammar, spelling, punctuation, and other errors
            </label>
            <textarea
              id="write-grammar"
              value={grammarText}
              onChange={(e) => setGrammarText(e.target.value)}
              rows={6}
              placeholder="Paste or enter your text to check for grammar, spelling, punctuation, and other errors"
              className={cn(textareaClass, "min-h-[140px] resize-y")}
            />
          </div>
          <div className="flex min-w-0 items-stretch gap-2">
            <div className="relative shrink-0">
              <label htmlFor="write-grammar-model" className="sr-only">
                Model
              </label>
              <select
                id="write-grammar-model"
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                className="h-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-2.5 pr-7 text-[12px] font-semibold text-slate-800 focus:border-brand-400 focus:outline-none"
              >
                {extensionModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
            </div>
            <button
              type="button"
              onClick={handleGrammar}
              className="min-w-0 flex-1 rounded-xl bg-brand-500 py-2 text-[12.5px] font-semibold text-white transition hover:bg-brand-600 active:scale-[0.99]"
            >
              Fix Grammar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
