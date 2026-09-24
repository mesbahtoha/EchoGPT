import { cn } from "../lib/cn";
import type { QuickTool, ToolId } from "../lib/tools";

interface Props {
  tool: QuickTool;
  onSelect: (id: ToolId) => void;
}

export default function QuickActionCard({ tool, onSelect }: Props) {
  const Icon = tool.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(tool.id)}
      className="flex min-h-[56px] min-w-0 items-center gap-2 rounded-xl border border-slate-200/90 bg-white p-2.5 text-left shadow-card transition hover:-translate-y-[1px] hover:border-brand-200 hover:shadow-composer"
      aria-label={`Open ${tool.label} tool`}
    >
      <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg", tool.chip)}>
        <Icon className={cn("h-4 w-4", tool.iconColor)} strokeWidth={2} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] font-semibold leading-tight text-slate-900">{tool.label}</span>
        <span className="mt-0.5 block truncate text-[11px] font-normal leading-tight text-slate-400">{tool.hint}</span>
      </span>
    </button>
  );
}
