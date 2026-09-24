import { useState } from "react";
import { Plus } from "lucide-react";

interface Props {
  onUse: (text: string) => void;
}

export default function ComparePanel({ onUse }: Props) {
  const [prompt, setPrompt] = useState("");

  function handleCompare() {
    onUse(prompt.trim() ? `Compare answers from 3 models: "${prompt.trim()}"` : "Compare answers from 3 models: ");
  }

  function handleNew() {
    setPrompt("");
    document.getElementById("cmp-input")?.focus();
  }

  return (
    <section aria-label="Compare tool" className="flex min-h-[50vh] min-w-0 flex-col">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={handleNew}
          className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-[7px] text-[12px] font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-600"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          New comparison
        </button>
      </div>

      <div className="grid min-w-0 flex-1 place-items-center px-2 py-8">
        <p className="max-w-[240px] text-center text-[12.5px] font-normal leading-relaxed text-slate-500">
          Ask one question and see how multiple models answer it.
        </p>
      </div>

      <div className="sticky bottom-0 min-w-0 bg-white pb-1 pt-2">
        <div className="rounded-[10px] border border-slate-200 bg-white shadow-composer">
          <div className="flex min-w-0 items-center gap-2 px-2.5 pt-2">
            <label htmlFor="cmp-input" className="sr-only">
              Message 3 models
            </label>
            <input
              id="cmp-input"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCompare();
              }}
              placeholder="Message 3 models..."
              className="min-w-0 flex-1 bg-transparent py-1.5 text-[12.5px] font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCompare}
              className="shrink-0 rounded-lg bg-brand-500 px-3.5 py-[7px] text-[12px] font-semibold text-white transition hover:bg-brand-600 active:scale-[0.98]"
            >
              Compare
            </button>
          </div>
          <p className="flex min-w-0 items-center gap-1.5 px-2.5 pb-2 pt-1 text-[11px] font-normal text-slate-400">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
            <span className="truncate font-medium text-slate-600">EchoGPT</span>
            <span className="shrink-0">+2 more</span>
          </p>
        </div>
      </div>
    </section>
  );
}
