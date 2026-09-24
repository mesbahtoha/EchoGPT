export const routeMap: Record<string, string> = {
  home: "/",
  landing: "/landing",
  "image-studio": "/image-studio",
  "video-studio": "/video-studio",
  compare: "/compare",
  connectors: "/connectors",
  history: "/history",
  store: "/store",
  "ai-tasks": "/tasks",
  "ai-job": "/resume",
  "ai-sop": "/sop",
  support: "/support",
  newsletter: "/newsletter",
  subscriptions: "/subscriptions"
};

const pathToNav: Record<string, string> = {
  "/": "home",
  "/image-studio": "image-studio",
  "/video-studio": "video-studio",
  "/compare": "compare",
  "/connectors": "connectors",
  "/history": "history",
  "/store": "store",
  "/tasks": "ai-tasks",
  "/resume": "ai-job",
  "/sop": "ai-sop",
  "/support": "support",
  "/newsletter": "newsletter",
  "/subscriptions": "subscriptions"
};

export function navIdFromPath(pathname: string | null): string {
  if (!pathname) return "";
  return pathToNav[pathname] ?? "";
}
