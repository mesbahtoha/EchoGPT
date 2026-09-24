"use client";

import { motion } from "framer-motion";
import type { ChatMessageData } from "@/lib/conversations";

export default function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-[13px] ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <img
          src="/logo.svg"
          alt="EchoGPT"
          width={35}
          height={35}
          className="h-[35px] w-[35px] shrink-0 rounded-[10px]"
        />
      )}
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-[18px] py-[13px] text-[15px] leading-relaxed ${
          isUser
            ? "rounded-br-md bg-brand-600 text-white shadow-[0_4px_14px_rgba(109,58,230,0.25)]"
            : "rounded-bl-md border border-brand-100 bg-white text-ink-900 shadow-card dark:border-white/10 dark:bg-[#1a1528] dark:text-slate-100"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
