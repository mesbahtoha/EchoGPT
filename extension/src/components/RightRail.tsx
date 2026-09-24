import {
  ArrowLeftRight,
  Blocks,
  Clapperboard,
  FileText,
  Image as ImageIcon,
  Languages,
  MessageSquareText,
  PenLine,
  Settings,
  Sparkles,
  type LucideIcon
} from "lucide-react";
import { cn } from "../lib/cn";
import { mockUser } from "../lib/user";
import type { ToolId } from "../lib/tools";

interface RailItem {
  id: ToolId;
  label: string;
  icon: LucideIcon;
}

const railItems: RailItem[] = [
  { id: "chat", label: "Chat", icon: MessageSquareText },
  { id: "write", label: "Write", icon: PenLine },
  { id: "read", label: "Read", icon: FileText },
  { id: "translate", label: "Translate", icon: Languages },
  { id: "image", label: "Image", icon: ImageIcon },
  { id: "video", label: "Video", icon: Clapperboard },
  { id: "compare", label: "Compare", icon: ArrowLeftRight },
  { id: "mcp", label: "MCP", icon: Blocks }
];

interface Props {
  active: ToolId;
  onSelect: (id: ToolId) => void;
  onOpenSettings: () => void;
}

export default function RightRail({ active, onSelect, onOpenSettings }: Props) {
  return (
    <nav
      aria-label="Extension tools"
      className="flex h-full w-[60px] min-h-0 shrink-0 flex-col items-center overflow-hidden border-l border-slate-100 bg-[#fafbff] py-2"
    >
      <div className="flex min-h-0 flex-1 flex-col items-center gap-[2px] overflow-y-auto">
        {railItems.map(({ id, label, icon: Icon }) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              aria-current={selected ? "page" : undefined}
              className={cn(
                "flex w-[52px] flex-col items-center gap-[3px] rounded-xl px-1 py-[7px] text-[10px] font-medium transition",
                selected ? "bg-brand-50 text-brand-600" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
              {label}
            </button>
          );
        })}
      </div>
      <div className="mt-1 flex flex-col items-center gap-1 border-t border-slate-100 pt-2">
        <button
          type="button"
          className="flex w-[52px] flex-col items-center gap-[3px] rounded-xl px-1 py-[7px] text-[10px] font-semibold text-amber-600 transition hover:bg-amber-50"
          aria-label="Upgrade to Pro"
        >
          <Sparkles className="h-4 w-4" strokeWidth={2} aria-hidden />
          Upgrade
        </button>
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Open settings"
          className="flex w-[52px] flex-col items-center gap-[3px] rounded-xl px-1 py-[7px] text-[10px] font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <Settings className="h-4 w-4" strokeWidth={2} aria-hidden />
          Settings
        </button>
        <span
          className="mt-1 grid h-8 w-8 place-items-center rounded-full bg-brand-500 text-[11px] font-bold text-white"
          title={mockUser.name}
          aria-label={mockUser.name}
        >
          {mockUser.initials}
        </span>
      </div>
    </nav>
  );
}
