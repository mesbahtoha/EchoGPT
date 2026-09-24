export interface MockUser {
  name: string;
  email: string;
  plan: "Free" | "Pro";
  initials: string;
}

export const mockUser: MockUser = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  plan: "Free",
  initials: "AM"
};

export interface ExtMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function mockExtReply(input: string, tool: string): string {
  if (tool === "translate") return `Translation (EN → ES):\n“${input.slice(0, 80)}” → mock translated text. Pick source/target languages above to refine.`;
  if (tool === "write") return `Polished draft:\n\n${input.slice(0, 120)}…\n\nTone: confident + friendly. Want shorter, longer, or more formal?`;
  if (tool === "read") return "Page summary (mock):\n• Main point: side panels work best when compact.\n• 3 key takeaways extracted.\n• Suggested follow-ups listed below.";
  if (tool === "image") return "Image queued (mock). Describe style, ratio, and mood — I'll render 4 variations here.";
  if (tool === "video") return "Video storyboard (mock): hook → demo → CTA, 3 scenes with captions.";
  if (tool === "compare") return "Compare (mock):\nDeepSeek V4 Pro — concise, code-strong.\nGPT-5.6 — creative, verbose.\nTell me which answer you prefer.";
  if (tool === "mcp") return "MCP (mock): 3 servers connected. Toggle tools in the panel below, then ask me to use one.";
  const t = input.toLowerCase();
  if (t.includes("fun fact")) return "Fun fact: Honey never spoils — 3,000-year-old pots found in Egypt were still edible. 🍯";
  if (t.includes("quantum")) return "Quantum computing in simple terms: normal bits are 0 or 1; qubits can be both at once, letting quantum computers explore many answers in parallel. Think maze-solving all paths simultaneously.";
  if (t.includes("sci-fi")) return "5 great sci-fi picks:\n1. Dune: Part Two\n2. Interstellar\n3. Arrival\n4. Blade Runner 2049\n5. The Matrix\n\nWant mood-based picks (cerebral vs action)?";
  return `Got it — “${input.slice(0, 90)}${input.length > 90 ? "…" : ""}”\n\nHere's a mock answer from DeepSeek V4 Pro. Ask a follow-up or switch models above.`;
}
