export interface AIModel {
  id: string;
  name: string;
  tag?: string;
  description: string;
}

export const webModels: AIModel[] = [
  { id: "echogpt", name: "EchoGPT", tag: "Default", description: "Balanced speed and quality" },
  { id: "echogpt-pro", name: "EchoGPT Pro", tag: "PRO", description: "Most capable reasoning" },
  { id: "deepseek-v4", name: "DeepSeek V4 Pro", description: "Long context, code strong" },
  { id: "gpt-56", name: "GPT-5.6", description: "Creative + general knowledge" },
  { id: "claude", name: "Claude", description: "Careful writing & analysis" }
];
