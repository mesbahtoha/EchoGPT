"use client";

import { motion } from "framer-motion";
import type { PromptCardData } from "@/lib/prompts";

interface PromptCardProps {
  card: PromptCardData;
  index: number;
  onSelect: (card: PromptCardData) => void;
}

export default function PromptCard({ card, index, onSelect }: PromptCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      onClick={() => onSelect(card)}
      className="group min-h-[110px] rounded-[15px] border border-[#E8E5EF] bg-white p-[22px] text-left shadow-card transition-shadow hover:shadow-composer focus-visible:outline-brand-500 dark:border-white/10 dark:bg-[#1a1528]"
      aria-label={`Use prompt: ${card.title}`}
    >
      <h3 className="text-[15px] font-semibold leading-snug text-ink-900 group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-300">
        {card.title}
      </h3>
      <p className="mt-[7px] line-clamp-3 text-[14px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
        {card.description}
      </p>
    </motion.button>
  );
}
