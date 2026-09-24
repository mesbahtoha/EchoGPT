import type { ToolId } from "../lib/tools";
import WritePanel from "./WritePanel";
import ReadPanel from "./ReadPanel";
import TranslatePanel from "./TranslatePanel";
import ImagePanel from "./ImagePanel";
import VideoPanel from "./VideoPanel";
import ComparePanel from "./ComparePanel";
import ConnectorsPanel from "./ConnectorsPanel";

interface Props {
  tool: ToolId;
  onUse: (text: string) => void;
}

export default function ToolPanel({ tool, onUse }: Props) {
  switch (tool) {
    case "write":
      return <WritePanel onUse={onUse} />;
    case "read":
      return <ReadPanel onUse={onUse} />;
    case "translate":
      return <TranslatePanel onUse={onUse} />;
    case "image":
      return <ImagePanel onUse={onUse} />;
    case "video":
      return <VideoPanel onUse={onUse} />;
    case "compare":
      return <ComparePanel onUse={onUse} />;
    case "mcp":
      return <ConnectorsPanel />;
    default:
      return null;
  }
}
