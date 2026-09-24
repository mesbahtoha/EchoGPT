import { Search, Trash2, X } from "lucide-react";
import type { HistoryConversation } from "../lib/history";

interface HistoryItemProps {
  conversation: HistoryConversation;
  onPick: (title: string) => void;
}

export function HistoryItem({ conversation, onPick }: HistoryItemProps) {
  return (
    <button
      type="button"
      onClick={() => onPick(conversation.title)}
      className="flex w-full items-center gap-2.5 rounded-xl border border-slate-200/90 bg-white px-2.5 py-2 text-left shadow-sm transition hover:border-brand-300 hover:shadow-card"
      aria-label={`Open conversation: ${conversation.title}`}
    >
      <img
        src="./logo.svg"
        alt=""
        aria-hidden
        width={32}
        height={32}
        className="h-8 w-8 shrink-0 rounded-lg"
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] font-semibold text-slate-900">{conversation.title}</span>
        <span className="mt-0.5 block truncate text-[11px] font-normal text-slate-400">
          Last Updated: {conversation.updated}
        </span>
      </span>
    </button>
  );
}

interface HistoryViewProps {
  conversations: HistoryConversation[];
  query: string;
  onQuery: (q: string) => void;
  onClear: () => void;
  onPick: (title: string) => void;
  onClose: () => void;
}

export default function HistoryView({ conversations, query, onQuery, onClear, onPick, onClose }: HistoryViewProps) {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? conversations.filter((c) => c.title.toLowerCase().includes(q))
    : conversations;

  return (
    <section aria-label="History chats" className="anim-fade-in flex min-h-0 flex-1 flex-col">
      <div className="flex h-[52px] shrink-0 items-center justify-between border-b border-slate-100 px-3">
        <h2 className="text-[14px] font-semibold text-slate-900">History Chats</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close history"
          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-2 px-3 py-2.5">
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <label htmlFor="history-search" className="sr-only">
            Search conversations
          </label>
          <input
            id="history-search"
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-2.5 text-[12.5px] font-normal text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <button
          type="button"
          onClick={onClear}
          aria-label="Delete all conversations"
          title="Delete all"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
        {filtered.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-3 py-6 text-center text-[12px] font-normal text-slate-400">
            {conversations.length === 0 ? "No conversations yet." : "No matches for your search."}
          </p>
        ) : (
          <ul className="space-y-2">
            {filtered.map((c) => (
              <li key={c.id}>
                <HistoryItem conversation={c} onPick={onPick} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
