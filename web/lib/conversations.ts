export interface Conversation {
  id: string;
  title: string;
  preview: string;
  time: string;
}

export const recentConversations: Conversation[] = [
  { id: "1", title: "Resume polish for frontend role", preview: "Tailored bullets + summary...", time: "2m ago" },
  { id: "2", title: "7-day deep work challenge", preview: "Habits, tracking, check-ins...", time: "1h ago" },
  { id: "3", title: "Instagram captions — coffee", preview: "5 warm + witty options...", time: "Yesterday" },
  { id: "4", title: "Compare GPT vs Claude", preview: "Side-by-side strengths...", time: "Tue" }
];

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function mockAssistantReply(userText: string): string {
  const t = userText.toLowerCase();
  if (t.includes("resume"))
    return "Here's a polished starting point:\n\n**Summary** — Frontend developer with 2+ years building responsive, accessible React interfaces.\n\n**Bullets**\n• Shipped a design-system migration that cut UI inconsistencies by 40%.\n• Improved Lighthouse performance from 82 → 96 with code-splitting.\n• Built reusable form + table components used across 4 teams.\n\nTell me your last role and I'll tailor this further.";
  if (t.includes("challenge"))
    return "Your 7-day transformation challenge:\n\n**Day 1–2** — 90-min deep work + 20-min walk, no phone.\n**Day 3–4** — Ship one small project + journal the friction.\n**Day 5–6** — Teach what you learned in a 300-word post.\n**Day 7** — Review, rest, and set next week's goal.\n\nWant me to turn this into a daily checklist?";
  if (t.includes("caption") || t.includes("social"))
    return "Here are 5 captions for your cozy coffee photo:\n\n1. Slow mornings, strong coffee ☕\n2. Poured with intention.\n3. Chapter one: caffeine.\n4. Golden light + second refills.\n5. Romanticizing the ordinary.\n\nWant more playful or minimal options?";
  if (t.includes("creative") || t.includes("prompt"))
    return "5 prompts in your reflective voice:\n\n1. Describe a room that changed how you think.\n2. What would you tell your 16-year-old self about patience?\n3. Write about a small ritual that keeps you grounded.\n4. A letter to a future collaborator.\n5. The city at 6am — who is awake and why?\n\nPick one and I'll expand it with you.";
  return `Got it — “${userText.slice(0, 90)}${userText.length > 90 ? "…" : ""}”\n\nHere's how I'd help: I'll break this into steps, draft a first version, then refine it with you. Tell me a bit more context (goal, audience, tone) and I'll go deeper.`;
}
