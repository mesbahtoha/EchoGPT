"use client";

import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import ModelPickerModal from "./ModelPickerModal";
import type { ImageModelGroup } from "@/lib/imageModels";

interface StudioGenerationPanelProps {
  prompt: string;
  onPromptChange: (v: string) => void;
  promptPlaceholder: string;
  aspects: string[];
  aspect: string;
  onAspectChange: (v: string) => void;
  counts?: string[];
  count?: string;
  onCountChange?: (v: string) => void;
  models: string[];
  model: string;
  onModelChange: (v: string) => void;
  modelGroups?: ImageModelGroup[];
  paidNote: string;
  onGenerate: () => void;
  onAdd?: () => void;
}

function Segmented({
  options,
  value,
  onChange,
  label
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div
      className="flex min-w-0 flex-wrap items-center gap-0.5 rounded-full border border-[#E8E5EF] bg-white p-1 dark:border-white/10 dark:bg-white/5"
      role="group"
      aria-label={label}
    >
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          aria-pressed={value === o}
          className={cn(
            "rounded-full px-3 py-[7px] text-[13px] font-medium transition",
            value === o
              ? "bg-brand-600 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-100 hover:text-ink-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function StudioGenerationPanel({
  prompt,
  onPromptChange,
  promptPlaceholder,
  aspects,
  aspect,
  onAspectChange,
  counts,
  count,
  onCountChange,
  models,
  model,
  onModelChange,
  modelGroups,
  paidNote,
  onGenerate,
  onAdd
}: StudioGenerationPanelProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const groups: ImageModelGroup[] =
    modelGroups ?? [{ label: "Models", models: models.map((m) => ({ name: m, description: "" })) }];

  return (
    <div className="rounded-[14px] border border-[#E8E5EF] bg-white shadow-[0_1px_2px_rgba(24,18,43,0.04)] dark:border-white/10 dark:bg-[#1a1528]">
      <label htmlFor="studio-prompt" className="sr-only">
        {promptPlaceholder}
      </label>
      <textarea
        id="studio-prompt"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        rows={2}
        placeholder={promptPlaceholder}
        className="min-h-[56px] w-full resize-none bg-transparent px-5 pt-4 text-[14px] font-normal text-ink-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
      />

      <div className="flex min-w-0 flex-wrap items-center gap-2 px-4 pb-3 pt-1">
        <button
          type="button"
          onClick={onAdd}
          aria-label="Add attachment"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#E8E5EF] bg-white text-slate-500 transition hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:text-brand-300"
        >
          <Plus className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
        <Segmented options={aspects} value={aspect} onChange={onAspectChange} label="Aspect ratio" />
        {counts && count !== undefined && onCountChange && (
          <Segmented options={counts} value={count} onChange={onCountChange} label="Count" />
        )}
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          aria-haspopup="dialog"
          className="flex h-10 shrink-0 items-center gap-1 rounded-[10px] border border-[#E8E5EF] bg-white pl-3 pr-2.5 text-[13px] font-medium text-ink-900 transition hover:border-brand-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:border-brand-400"
        >
          <span className="max-w-[160px] truncate">{model}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden />
        </button>
        <span className="min-w-0 flex-1" aria-hidden />
        <button
          type="button"
          onClick={onGenerate}
          className="h-10 w-[110px] shrink-0 rounded-[10px] bg-brand-600 text-[14px] font-semibold text-white shadow-[0_4px_12px_rgba(109,58,230,0.3)] transition hover:bg-brand-700 active:scale-[0.98]"
        >
          Generate
        </button>
      </div>

      <p className="border-t border-slate-100 px-5 py-2.5 text-[12px] font-normal text-slate-400 dark:border-white/10 dark:text-slate-500">{paidNote}</p>

      <ModelPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        groups={groups}
        value={model}
        onChange={onModelChange}
      />
    </div>
  );
}
