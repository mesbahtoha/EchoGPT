export interface Plan {
  name: string;
  price: string;
  per: string;
  blurb: string;
}

export interface PlanModel {
  name: string;
  color: string;
}

/** Single source of truth for subscriptions — used by /subscriptions and /landing. */
export const plans: Plan[] = [
  {
    name: "Monthly Plan",
    price: "USD $9.99",
    per: "USD $9.99/month",
    blurb: "Experience the benefits of Pro membership with unlimited chats for one month."
  },
  {
    name: "Quarterly Plan",
    price: "USD $29.99",
    per: "USD $29.99/3 month",
    blurb: "Unlock three months of Pro features and save with quarterly billing."
  },
  {
    name: "Half-Yearly Plan",
    price: "USD $59.99",
    per: "USD $59.99/6 month",
    blurb: "Enjoy six months of Pro features at a discounted rate, paid biannually."
  },
  {
    name: "Annual Plan",
    price: "USD $99.99",
    per: "USD $99.99/12 month",
    blurb: "Access all Pro member features for a full year, with significant savings."
  }
];

export const basicModels: PlanModel[] = [
  { name: "EchoGPT", color: "#6d3ae6" },
  { name: "Nemotron 3 Ultra", color: "#22c55e" },
  { name: "LongCat 2.0", color: "#0d9488" }
];

export const advancedModels: PlanModel[] = [
  { name: "DeepSeek V4 Pro", color: "#4d6bfe" },
  { name: "GLM-5.2", color: "#17151c" },
  { name: "DeepSeek V4 Flash", color: "#4d6bfe" },
  { name: "Tencent Hy3", color: "#7c3aed" },
  { name: "MiMo V2.5 Pro", color: "#17151c" },
  { name: "Qwen 3.7 Plus", color: "#8b5cf6" },
  { name: "GPT-5.6 Sol", color: "#17151c" },
  { name: "Kimi K2", color: "#17151c" }
];
