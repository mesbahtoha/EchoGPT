export interface ExtModel {
  id: string;
  name: string;
  badge?: string;
}

export const extensionModels: ExtModel[] = [
  { id: "echogpt", name: "EchoGPT", badge: "Default" },
  { id: "deepseek-v4", name: "DeepSeek V4 Pro", badge: "Fast" },
  { id: "gpt-56", name: "GPT-5.6" },
  { id: "claude", name: "Claude" },
  { id: "gemini", name: "Gemini" },
  { id: "grok", name: "Grok" }
];
