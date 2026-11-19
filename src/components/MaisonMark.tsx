interface MaisonMarkProps {
  className?: string;
  dark?: boolean;
}

export function MaisonMark({ className = 'h-9 w-12', dark = false }: MaisonMarkProps) {
  const stroke = dark ? '#FAFAF7' : '#0B2B1F';
  return (
    <svg
      viewBox="0 0 56 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="52" height="36" stroke="#D4AF37" strokeWidth="1.1" />
      <path
        d="M11 29V11L19.5 23L28 11V29"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M28 11L33 29L38.5 16L44 29L48 11"
        stroke="#D4AF37"
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

interface MaisonLogoProps {
  dark?: boolean;
  subline?: boolean;
}

export function MaisonLogo({ dark = false, subline = true }: MaisonLogoProps) {
  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap shrink-0">
      <MaisonMark className="h-9 w-12 shrink-0" dark={dark} />
      <span className="leading-none">
        <span
          className={`block font-serif text-[17px] font-medium tracking-[0.3em] ${
            dark ? 'text-cream' : 'text-forest'
          }`}
        >
          MAISON&nbsp;WEAVE
        </span>
        {subline && (
          <span className="mt-1.5 block font-mono text-[8px] tracking-[0.44em] text-gold-deep">
            CRAFTED LUXURY LIVING
          </span>
        )}
      </span>
    </span>
  );
}
