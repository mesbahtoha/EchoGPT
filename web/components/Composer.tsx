"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CirclePlus, History, Link2, Mic, Rocket, SendHorizontal, Shapes, Paperclip, Image as ImageIcon, FileText } from "lucide-react";
import ModelSelector from "./ModelSelector";
import ToolButton from "./ToolButton";
import { useToast } from "./Toast";
import { recentConversations } from "@/lib/conversations";
import { dropdownAnim } from "@/lib/motion";

interface ComposerProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  modelId: string;
  onModelChange: (id: string) => void;
  onOpenHistory: () => void;
  sending: boolean;
}

const attachMenu = [
  { id: "file", label: "Upload file", icon: Paperclip },
  { id: "image", label: "Generate image", icon: ImageIcon },
  { id: "doc", label: "From template", icon: FileText }
];

export default function Composer({ value, onChange, onSend, modelId, onModelChange, onOpenHistory, sending }: ComposerProps) {
  const [plusOpen, setPlusOpen] = useState(false);
  const plusRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const demo = (feature: string) => toast(`Demo: ${feature} is enabled on the live site`);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (plusRef.current && !plusRef.current.contains(e.target as Node)) setPlusOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setPlusOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="overflow-visible rounded-[15px] border border-[#E8E5EF] bg-white p-2 shadow-composer dark:border-white/10 dark:bg-[#1a1528] sm:p-[11px]">
      {/* Top toolbar */}
      <div className="flex h-11 min-w-0 items-center gap-[5px] px-[5px] sm:h-[53px]">
        <ModelSelector modelId={modelId} onChange={onModelChange} />
        <span className="mx-[7px] h-[26px] w-px shrink-0 bg-slate-200 dark:bg-white/10" aria-hidden />
        <ToolButton icon={Shapes} label="Connectors" onClick={() => demo("Connectors")} />
        <span className="mx-[5px] h-[26px] w-px shrink-0 bg-slate-200 dark:bg-white/10" aria-hidden />
        <ToolButton icon={Rocket} label="Boost" accent onClick={() => demo("Boost")} />
        <span className="min-w-0 flex-1" aria-hidden />
        <div className="relative shrink-0" ref={plusRef}>
          <ToolButton icon={CirclePlus} label="More tools" active={plusOpen} onClick={() => setPlusOpen((v) => !v)} />
          <AnimatePresence>
            {plusOpen && (
              <motion.div
                {...dropdownAnim}
                className="absolute bottom-[calc(100%+8px)] right-0 z-30 w-[229px] origin-bottom-right overflow-hidden rounded-xl border border-brand-100 bg-white p-[7px] shadow-pop dark:border-white/10 dark:bg-[#221d33]"
                role="menu"
              >
                {attachMenu.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setPlusOpen(false);
                      demo(label);
                    }}
                    className="flex w-full items-center gap-[11px] rounded-lg px-[13px] py-[9px] text-[14px] font-medium text-ink-700 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-brand-300"
                  >
                    <Icon className="h-[18px] w-[18px] text-slate-400 dark:text-slate-500" strokeWidth={2} aria-hidden />
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ToolButton icon={History} label="Recent chats" onClick={onOpenHistory} />
      </div>

      {/* Input row */}
      <div className="mx-[5px] mt-2 flex h-14 min-w-0 items-center gap-[9px] rounded-[12px] border border-[#E8E5EF] bg-white px-[13px] dark:border-white/10 dark:bg-white/5 sm:mt-[11px] sm:h-[62px]">
        <ToolButton icon={Link2} label="Attach link" onClick={() => demo("Link attachments")} />
        <label htmlFor="composer-input" className="sr-only">
          Ask a question
        </label>
        <textarea
          id="composer-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Ask a question..."
          className="min-w-0 flex-1 resize-none bg-transparent text-[15px] font-normal text-ink-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        <ToolButton icon={Mic} label="Voice input" onClick={() => demo("Voice input")} />
        <button
          type="button"
          onClick={onSend}
          disabled={!value.trim() || sending}
          aria-label="Send message"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 text-white shadow-[0_4px_14px_rgba(109,58,230,0.4)] transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
        >
          <SendHorizontal className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={2} aria-hidden />
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {recentConversations.length} recent conversations available
      </span>
    </div>
  );
}
