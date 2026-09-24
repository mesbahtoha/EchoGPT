import { History, Plus } from "lucide-react";

interface Props {
  title: string;
  onNewChat: () => void;
  onHistory: () => void;
  historyActive: boolean;
}

export default function ExtensionHeader({ title, onNewChat, onHistory, historyActive }: Props) {
  return (
    <header className="flex h-[52px] min-w-0 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-3">
      <h1 className="truncate text-[14px] font-bold text-slate-900">{title}</h1>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={onNewChat}
          className="flex items-center gap-1 rounded-lg bg-brand-500 px-2.5 py-[7px] text-[12px] font-medium text-white shadow-sm transition hover:bg-brand-600 active:scale-[0.97]"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          New Chat
        </button>
        <button
          type="button"
          onClick={onHistory}
          aria-label="Open chat history"
          aria-pressed={historyActive}
          className={`grid h-8 w-8 place-items-center rounded-lg transition ${
            historyActive ? "bg-brand-50 text-brand-600" : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          }`}
        >
          <History className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </header>
  );
}
