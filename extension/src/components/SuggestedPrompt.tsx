interface Props {
  prompts: string[];
  onPick: (p: string) => void;
}

export default function SuggestedPrompts({ prompts, onPick }: Props) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5" role="list" aria-label="Suggested prompts">
      {prompts.map((p) => (
        <button
          key={p}
          type="button"
          role="listitem"
          onClick={() => onPick(p)}
          className="w-full truncate rounded-[9px] bg-slate-100/80 px-3 py-2 text-left text-[12.5px] font-normal leading-snug text-slate-700 transition hover:bg-brand-50 hover:text-brand-700 active:bg-brand-100"
          title={p}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
