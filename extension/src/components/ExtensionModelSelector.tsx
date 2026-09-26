import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { extensionModels } from "../lib/models";
import { useExitAnimation } from "../lib/useExitAnimation";

interface Props {
  modelId: string;
  onChange: (id: string) => void;
}

export default function ExtensionModelSelector({ modelId, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { visible: menuVisible, closing: menuClosing } = useExitAnimation(open, 150);
  const active = extensionModels.find((m) => m.id === modelId) ?? extensionModels[0];

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative min-w-0 shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex min-w-0 max-w-[140px] items-center gap-1 rounded-md px-1.5 py-1 text-[12.5px] font-semibold text-slate-800 transition hover:bg-slate-100"
      >
        <span className="min-w-0 flex-1 truncate whitespace-nowrap">{active.name}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {menuVisible && (
        <ul
          role="listbox"
          aria-label="Select model"
          className={menuClosing ? "anim-drop-out absolute bottom-[calc(100%+8px)] left-0 z-50 max-h-60 w-52 origin-bottom-left overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-[0_16px_40px_rgba(16,24,64,0.18)]" : "anim-drop-in absolute bottom-[calc(100%+8px)] left-0 z-50 max-h-60 w-52 origin-bottom-left overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-[0_16px_40px_rgba(16,24,64,0.18)]"}
        >
          {extensionModels.map((m) => {
            const selected = m.id === modelId;
            return (
              <li key={m.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(m.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12.5px] ${
                    selected
                      ? "bg-brand-50 font-semibold text-brand-700"
                      : "font-medium text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap">
                    {m.name}
                    {m.badge && (
                      <span className="ml-1.5 rounded bg-brand-100 px-1 py-[1px] text-[10px] font-bold text-brand-600">
                        {m.badge}
                      </span>
                    )}
                  </span>
                  {selected && <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
