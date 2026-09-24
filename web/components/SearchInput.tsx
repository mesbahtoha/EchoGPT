"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}

export default function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="relative w-full">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        strokeWidth={2}
        aria-hidden
      />
      <label htmlFor="page-search" className="sr-only">
        {placeholder}
      </label>
      <input
        id="page-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-14 w-full rounded-xl border border-[#E8E5EF] bg-white pl-12 pr-4 text-[15px] font-normal text-ink-900 shadow-[0_1px_3px_rgba(24,18,43,0.06)] placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
    </div>
  );
}
