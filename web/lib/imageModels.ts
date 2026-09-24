export interface ImageModelOption {
  name: string;
  description: string;
}

export interface ImageModelGroup {
  label: string;
  models: ImageModelOption[];
}

export const imageModelGroups: ImageModelGroup[] = [
  {
    label: "Google",
    models: [
      { name: "Nano Banana 2 Lite", description: "Lightest Google tier. Quickest and cheapest." },
      { name: "Nano Banana 2", description: "Fast Google model with well-balanced quality." },
      { name: "Nano Banana Pro", description: "Google's best. Highest fidelity and the strongest at text in images." },
      { name: "Nano Banana", description: "Previous Google generation. Quick and dependable." }
    ]
  },
  {
    label: "OpenAI",
    models: [
      { name: "ChatGPT Image Latest", description: "Tracks whatever ChatGPT currently uses for images." },
      { name: "GPT Image 1", description: "Reliable all-rounder. Handles text in images well." },
      { name: "GPT Image 1 Mini", description: "Cheapest tier, lower fidelity." },
      { name: "GPT Image 1.5", description: "High quality with good prompt following." }
    ]
  }
];

export const imageModelNames: string[] = imageModelGroups.flatMap((g) => g.models.map((m) => m.name));
