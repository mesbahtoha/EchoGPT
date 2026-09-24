import {
  ArrowLeftRight,
  Clapperboard,
  FileText,
  Image as ImageIcon,
  Languages,
  PenLine,
  Blocks,
  type LucideIcon
} from "lucide-react";

export type ToolId = "chat" | "write" | "read" | "translate" | "image" | "video" | "compare" | "mcp";

export interface QuickTool {
  id: ToolId;
  label: string;
  hint: string;
  icon: LucideIcon;
  chip: string; // tailwind bg for icon container
  iconColor: string;
}

export const quickTools: QuickTool[] = [
  { id: "write", label: "Write", hint: "Draft & polish", icon: PenLine, chip: "bg-violet-100", iconColor: "text-violet-600" },
  { id: "translate", label: "Translate", hint: "Any language", icon: Languages, chip: "bg-sky-100", iconColor: "text-sky-600" },
  { id: "read", label: "Read page", hint: "Summarize", icon: FileText, chip: "bg-emerald-100", iconColor: "text-emerald-600" },
  { id: "image", label: "Image", hint: "Generate", icon: ImageIcon, chip: "bg-amber-100", iconColor: "text-amber-600" },
  { id: "video", label: "Video", hint: "Create clips", icon: Clapperboard, chip: "bg-rose-100", iconColor: "text-rose-600" },
  { id: "compare", label: "Compare", hint: "Side by side", icon: ArrowLeftRight, chip: "bg-indigo-100", iconColor: "text-indigo-600" },
  { id: "mcp", label: "MCP", hint: "Connect tools", icon: Blocks, chip: "bg-slate-100", iconColor: "text-slate-600" }
];

export const suggestedPrompts: string[] = [
  "Tell me an interesting fun fact",
  "Explain quantum computing in simple terms",
  "Recommend 5 great sci-fi movies",
  "How can I improve my English speaking skills?"
];
