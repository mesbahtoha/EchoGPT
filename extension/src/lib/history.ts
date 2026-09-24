export interface HistoryConversation {
  id: string;
  title: string;
  updated: string;
}

export const initialHistory: HistoryConversation[] = [
  { id: "h1", title: "Tell me an interesting fun fact", updated: "Sep 23, 2026 7:46 PM" },
  { id: "h2", title: "Hi", updated: "Sep 23, 2026 7:40 PM" },
  { id: "h3", title: "Explain quantum computing in simple terms", updated: "Sep 23, 2026 6:12 PM" },
  { id: "h4", title: "Recommend 5 great sci-fi movies", updated: "Sep 22, 2026 9:05 PM" }
];
