export function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const loop = [...items, ...items];

  return (
    <div className={`group overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.3em]">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
          </div>
        ))}
      </div>
    </div>
  );
}
