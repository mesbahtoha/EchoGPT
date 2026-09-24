export interface PromptCardData {
  id: string;
  title: string;
  description: string;
  fullPrompt: string;
}

export const promptCards: PromptCardData[] = [
  {
    id: "creative-flow",
    title: "Unlock Your Creative Flow",
    description:
      "Receive custom prompts that reflect your writing style, helping you push past creative blocks and spark new ideas for your projects.",
    fullPrompt:
      "Help me unlock my creative flow. Give me 5 custom writing prompts that match a reflective, curious writing style and help me push past creative blocks."
  },
  {
    id: "resume",
    title: "Build a Resume That Shines",
    description:
      "Craft a resume tailored to highlight your experience and match the job you want, designed to grab the attention of potential employers.",
    fullPrompt:
      "Help me build a resume that shines for a Frontend Developer role. Ask me for my experience, then draft strong bullet points tailored to the job."
  },
  {
    id: "challenge",
    title: "Set a Challenge That Transforms You",
    description:
      "Create a personalized challenge based on your goals and habits, designed to push you out of your comfort zone and help you grow.",
    fullPrompt:
      "Create a personalized 7-day challenge based on deep work, exercise, and reading. Push me gently out of my comfort zone with daily tasks."
  },
  {
    id: "social",
    title: "Write Irresistible Social Content",
    description:
      "Generate catchy, clever captions for your photos or videos, perfect for increasing engagement and sparking conversations.",
    fullPrompt:
      "Generate 5 catchy, clever captions for a cozy morning coffee photo. Make them warm, witty, and optimized for engagement."
  }
];
