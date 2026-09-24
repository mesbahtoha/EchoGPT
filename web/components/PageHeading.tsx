interface PageHeadingProps {
  title: string;
  subtitle: string;
}

export default function PageHeading({ title, subtitle }: PageHeadingProps) {
  return (
    <div className="text-center">
      <h1 className="text-[31px] font-bold leading-tight text-ink-900 dark:text-slate-100 sm:text-[32px]">{title}</h1>
      <p className="mx-auto mt-2 max-w-[704px] text-[17.5px] font-normal leading-relaxed text-[#777386] dark:text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}
