import { externalLinks } from "./links";
import {
  ArrowLeftRight,
  Blocks,
  Clapperboard,
  FileBarChart,
  History,
  Home,
  Image as ImageIcon,
  KanbanSquare,
  LifeBuoy,
  Mail,
  Plug,
  Settings,
  Share2,
  Store,
  CreditCard,
  TerminalSquare,
  MessagesSquare,
  type LucideIcon
} from "lucide-react";

export interface SidebarItemData {
  id: string;
  label: string;
  icon: LucideIcon;
  pro?: boolean;
  href?: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItemData[];
}

export const sidebarSections: SidebarSection[] = [
  {
    title: "Engagement",
    items: [
      { id: "image-studio", label: "Image Studio", icon: ImageIcon, pro: true },
      { id: "video-studio", label: "Video Studio", icon: Clapperboard, pro: true },
      { id: "compare", label: "Compare", icon: ArrowLeftRight },
      { id: "connectors", label: "Connectors", icon: Plug },
      { id: "history", label: "History", icon: History },
      { id: "store", label: "Store", icon: Store },
      { id: "ai-tasks", label: "AI Tasks", icon: KanbanSquare },
      { id: "ai-job", label: "AI Job Analysis", icon: FileBarChart },
      { id: "ai-sop", label: "AI SOP Builder", icon: Blocks }
    ]
  },
  {
    title: "Help & Support",
    items: [
      { id: "support", label: "Support", icon: LifeBuoy },
      { id: "newsletter", label: "Newsletter", icon: Mail },
      { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
      { id: "api", label: "API Platform", icon: TerminalSquare, href: externalLinks.apiPlatform },
      { id: "discord", label: "Discord", icon: MessagesSquare, href: externalLinks.discord }
    ]
  }
];

export const bottomIcons: { id: string; icon: LucideIcon; label: string }[] = [
  { id: "home", icon: Home, label: "Website" },
  { id: "share", icon: Share2, label: "Share" },
  { id: "settings", icon: Settings, label: "Settings" }
];
