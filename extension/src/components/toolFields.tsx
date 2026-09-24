import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { extensionModels } from "../lib/models";
import { cn } from "../lib/cn";

export function FieldLabel({ children }: { children: ReactNode }) {
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

export function PillGroup({ options, value, onChange, label }: PillGroupProps) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          aria-pressed={value === o}
          className={cn(
            "rounded-lg border px-2.5 py-1 text-[11.5px] font-medium transition",
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

interface SelectShellProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

export function SelectShell({ id, label, value, onChange, options }: SelectShellProps) {
  return (
    <div className="relative min-w-0">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-[10px] border border-slate-200 bg-white py-2 pl-2.5 pr-8 text-[12.5px] font-medium text-slate-800 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden
      />
    </div>
  );
}

interface ModelSelectProps {
  id: string;
  value: string;
  onChange: (v: string) => void;
}

export function ModelSelect({ id, value, onChange }: ModelSelectProps) {
  return (
    <div className="relative flex shrink-0 items-center gap-1.5 rounded-[10px] border border-slate-200 bg-white py-2 pl-2.5 pr-7">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
      <label htmlFor={id} className="sr-only">
        Model
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-transparent text-[12px] font-semibold text-slate-800 focus:outline-none"
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
  );
}

export const textareaClass =
  "w-full rounded-[10px] border border-slate-200 bg-white px-2.5 py-2 text-[12.5px] font-normal text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
