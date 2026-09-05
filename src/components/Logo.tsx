type LogoProps = {
  theme?: "dark" | "light";
  showTagline?: boolean;
  className?: string;
  markOnly?: boolean;
};

export function Logo({
  theme = "dark",
  showTagline = true,
  className = "",
  markOnly = false,
}: LogoProps) {
  const ink = theme === "dark" ? "#0a1f38" : "#ffffff";
  const sub = theme === "dark" ? "#34495f" : "#c3d3e0";
  const teal = "#1f9fb8";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
        aria-hidden="true"
      >
        <line x1="4" y1="38" x2="52" y2="4" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="14" y1="48" x2="64" y2="4" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M10 90 L10 22 L46 6 L80 34 L80 90 Z"
          fill="none"
          stroke={ink}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <rect x="47" y="32" width="26" height="50" fill={teal} />
        <rect x="55" y="44" width="4.5" height="4.5" fill={ink} />
        <rect x="63" y="44" width="4.5" height="4.5" fill={ink} />
        <rect x="55" y="52" width="4.5" height="4.5" fill={ink} />
        <rect x="63" y="52" width="4.5" height="4.5" fill={ink} />
        <line x1="10" y1="90" x2="80" y2="90" stroke={ink} strokeWidth="5" strokeLinecap="round" />
      </svg>

      {!markOnly && (
        <div className="leading-none">
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-heading text-2xl font-bold tracking-tight sm:text-[26px]"
              style={{ color: ink }}
            >
              AGI
            </span>
            <span
              className="hidden font-heading text-[11px] font-semibold uppercase tracking-[0.2em] sm:inline"
              style={{ color: teal }}
            >
              Interior Specialists
            </span>
          </div>
          {showTagline && (
            <p
              className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] sm:hidden"
              style={{ color: sub }}
            >
              Interior Specialists
            </p>
          )}
        </div>
      )}
    </div>
  );
}
