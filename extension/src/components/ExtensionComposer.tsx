import { AtSign, BookOpen, Link2, SendHorizontal, Sparkles, Users, Wrench } from "lucide-react";
import ExtensionModelSelector from "./ExtensionModelSelector";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  modelId: string;
  onModelChange: (id: string) => void;
  sending: boolean;
}

const toolbarIcons = [
  { icon: Wrench, label: "Tools" },
  { icon: Link2, label: "Attach" },
  { icon: BookOpen, label: "Knowledge" },
  { icon: AtSign, label: "Mention" },
  { icon: Sparkles, label: "Enhance" },
  { icon: Users, label: "Context" }
];

export default function ExtensionComposer({ value, onChange, onSend, modelId, onModelChange, sending }: Props) {
  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-composer">
      {/* Model + tools row: overflow-visible so the upward model menu is never clipped */}
      <div className="flex min-w-0 items-center gap-[2px] overflow-visible border-b border-slate-100 px-2 py-1.5">
        <ExtensionModelSelector modelId={modelId} onChange={onModelChange} />
        <span className="mx-1 h-4 w-px shrink-0 bg-slate-200" aria-hidden />
        <div className="flex min-w-0 flex-1 items-center gap-[2px] overflow-x-auto">
          {toolbarIcons.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              title={label}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-slate-400 transition hover:bg-brand-50 hover:text-brand-600"
            >
              <Icon className="h-[15px] w-[15px]" strokeWidth={2} aria-hidden />
            </button>
          ))}
        </div>
      </div>

      <div className="px-3 pt-2">
        <label htmlFor="ext-input" className="sr-only">
          Ask a question
        </label>
        <textarea
          id="ext-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          rows={2}
          placeholder="Ask a question..."
          className="max-h-28 min-h-[48px] w-full resize-none bg-transparent text-[13px] font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      <div className="flex min-w-0 items-center justify-between gap-2 px-3 pb-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            className="shrink-0 rounded-lg border border-slate-200 px-2.5 py-[5px] text-[12px] font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-600"
          >
            Search
          </button>
          <span className="hidden truncate text-[11px] font-normal text-slate-400 min-[380px]:block">
            Enter to send · Shift+Enter new line
          </span>
        </div>
        <button
          type="button"
          onClick={onSend}
          disabled={!value.trim() || sending}
          aria-label="Send message"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-500 text-white shadow-sm transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
        >
          <SendHorizontal className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}
