export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-[11px]" aria-label="EchoGPT home">
      <img
        src="/logo.svg"
        alt="EchoGPT logo"
        width={37}
        height={37}
        className="h-[37px] w-[37px] shrink-0 rounded-[10px]"
      />
      {!compact && (
        <span className="truncate text-[21px] font-bold tracking-[0.14em] text-brand-600 dark:text-brand-300">EchoGPT</span>
      )}
    </div>
  );
}
