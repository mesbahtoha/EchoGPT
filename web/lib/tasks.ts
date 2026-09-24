export interface TaskCard {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

export const taskTabs = ["Ideas", "Work", "Fun", "Online Content"] as const;

export type TaskTab = (typeof taskTabs)[number];

export const ideaCards: TaskCard[] = [
  {
    id: "outside-box",
    title: "Think Outside the Box",
    description: "Breakthrough ideas await your discovery",
    emoji: "🤔"
  },
  {
    id: "startup",
    title: "Startup",
    description: "Get a list of ambitious startup ideas based on your area of interest",
    emoji: "🚀"
  },
  {
    id: "innovate",
    title: "Innovate and Elevate",
    description: "Your guide to unique and fresh ideas",
    emoji: "📢"
  },
  {
    id: "unleashing",
    title: "Unleashing Creativity",
    description: "Explore a world of brilliant ideas",
    emoji: "🌱"
  },
  {
    id: "sparks",
    title: "Idea Sparks",
    description: "Ignite your creativity for innovative solutions",
    emoji: "💡"
  }
];

export const workCards: TaskCard[] = [
  {
    id: "max-productivity",
    title: "Max Productivity",
    description: "Max productivity, achieve more, stress less",
    emoji: "🤖"
  },
  {
    id: "recruiting",
    title: "Recruiting",
    description: "Define the qualifications for any position",
    emoji: "💼"
  },
  {
    id: "cv-builder",
    title: "CV Builder",
    description: "Generate a creative resume",
    emoji: "📄"
  },
  {
    id: "email",
    title: "Email",
    description: "Get help to craft a compelling email",
    emoji: "✉️"
  },
  {
    id: "interview-tips",
    title: "Interview Tips",
    description: "Receive helpful tips for your interview",
    emoji: "👥"
  }
];

export const funCards: TaskCard[] = [
  {
    id: "joke-generator",
    title: "Joke Generator",
    description: "Get a laugh with fresh jokes on any topic",
    emoji: "😂"
  },
  {
    id: "story-time",
    title: "Story Time",
    description: "Create magical bedtime stories in seconds",
    emoji: "📖"
  },
  {
    id: "trivia-challenge",
    title: "Trivia Challenge",
    description: "Test your knowledge with fun quizzes",
    emoji: "🎯"
  },
  {
    id: "party-planner",
    title: "Party Planner",
    description: "Plan unforgettable parties step by step",
    emoji: "🎉"
  },
  {
    id: "movie-night",
    title: "Movie Night",
    description: "Find the perfect movie for tonight",
    emoji: "🎬"
  }
];

export const onlineContentCards: TaskCard[] = [
  {
    id: "social-posts",
    title: "Social Posts",
    description: "Write scroll-stopping social media posts",
    emoji: "📱"
  },
  {
    id: "blog-writer",
    title: "Blog Writer",
    description: "Draft SEO-friendly blog articles fast",
    emoji: "✍️"
  },
  {
    id: "video-scripts",
    title: "Video Scripts",
    description: "Create engaging scripts for your videos",
    emoji: "🎥"
  },
  {
    id: "ad-copy",
    title: "Ad Copy",
    description: "Generate ad copy that converts",
    emoji: "📢"
  },
  {
    id: "newsletter-pro",
    title: "Newsletter Pro",
    description: "Compose newsletters readers love",
    emoji: "📰"
  }
];

export const taskCards: Record<TaskTab, TaskCard[]> = {
  Ideas: ideaCards,
  Work: workCards,
  Fun: funCards,
  "Online Content": onlineContentCards
};
