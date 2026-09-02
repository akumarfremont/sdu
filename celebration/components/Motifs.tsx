import { cn } from "@/lib/cn";

/**
 * Decorative SVG motifs — lotus, marigold, temple arch, peacock feather.
 * Used sparingly and always `aria-hidden`; nothing here carries meaning.
 */

export function LotusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 44" fill="none" aria-hidden className={cn("h-6 w-9", className)}>
      <path
        d="M32 6c3.6 4.4 5.4 9.4 5.4 15S35.6 32 32 36c-3.6-4-5.4-9.4-5.4-15S28.4 10.4 32 6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M32 36c-4.9 0-9.4-2.1-12.6-5.8-3.1-3.6-4.6-8.2-4.2-12.8 4.4 1.4 8.2 4 10.9 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M32 36c4.9 0 9.4-2.1 12.6-5.8 3.1-3.6 4.6-8.2 4.2-12.8-4.4 1.4-8.2 4-10.9 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 38h40" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export function DiamondRule({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 text-marigold-300", className)} aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-current opacity-60" />
      <svg viewBox="0 0 24 12" className="h-2.5 w-6" fill="none">
        <path d="M12 1 17 6l-5 5L7 6l5-5Z" fill="currentColor" opacity=".8" />
        <circle cx="2" cy="6" r="1.4" fill="currentColor" opacity=".6" />
        <circle cx="22" cy="6" r="1.4" fill="currentColor" opacity=".6" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-current opacity-60" />
    </div>
  );
}

/** A row of small marigold blossoms — used as a section divider. */
export function MarigoldGarland({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
      className={cn("h-5 w-full text-marigold-300", className)}
    >
      <path
        d="M0 14C24 4 48 4 72 14s48 10 72 0 48-10 72 0 24 10 24 10"
        stroke="currentColor"
        strokeWidth="1"
        opacity=".5"
      />
      {[12, 48, 84, 120, 156, 192, 228].map((x, index) => (
        <g key={x} transform={`translate(${x} ${index % 2 === 0 ? 12 : 15})`}>
          <circle r="4.4" fill="currentColor" opacity=".28" />
          <circle r="2.4" fill="currentColor" opacity=".7" />
        </g>
      ))}
    </svg>
  );
}

/** A temple arch outline used behind hero content. */
export function TempleArch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 420"
      fill="none"
      aria-hidden
      className={cn("h-full w-full text-marigold-200", className)}
    >
      <path
        d="M20 420V180C20 102 82 40 160 40s140 62 140 140v240"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity=".7"
      />
      <path
        d="M44 420V184c0-64 52-116 116-116s116 52 116 116v236"
        stroke="currentColor"
        strokeWidth="1"
        opacity=".45"
      />
      <path d="M160 22v30M148 40h24" stroke="currentColor" strokeWidth="1.4" opacity=".7" />
      <circle cx="160" cy="14" r="5" stroke="currentColor" strokeWidth="1.4" opacity=".7" />
    </svg>
  );
}

export function PeacockFeather({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 120" fill="none" aria-hidden className={cn("h-24 w-10 text-peacock-200", className)}>
      <path d="M24 118V52" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="24" cy="34" rx="18" ry="26" stroke="currentColor" strokeWidth="1.2" opacity=".7" />
      <ellipse cx="24" cy="32" rx="10" ry="15" stroke="currentColor" strokeWidth="1.2" opacity=".85" />
      <ellipse cx="24" cy="31" rx="4.5" ry="6.5" fill="currentColor" opacity=".5" />
      {[-1, 1].map((side) =>
        [0, 1, 2, 3].map((row) => (
          <path
            key={`${side}-${row}`}
            d={`M24 ${62 + row * 12}c${side * 7} -3 ${side * 12} -6 ${side * 15} -12`}
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity=".4"
          />
        )),
      )}
    </svg>
  );
}

/** Soft floral corner watermark. */
export function FloralCorner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden className={cn("h-40 w-40 text-marigold-100", className)}>
      <path
        d="M0 160C0 88 46 30 118 12"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity=".8"
      />
      <path d="M0 160C10 100 52 58 112 44" stroke="currentColor" strokeWidth="1" opacity=".55" />
      {[
        [118, 12],
        [92, 30],
        [66, 56],
        [44, 90],
        [28, 128],
      ].map(([x, y], index) => (
        <g key={index} transform={`translate(${x} ${y})`}>
          <circle r="7" fill="currentColor" opacity=".35" />
          <circle r="3" fill="currentColor" opacity=".7" />
        </g>
      ))}
    </svg>
  );
}

/** Small leaf pair used beside headings. */
export function LeafPair({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 16" fill="none" aria-hidden className={cn("h-3 w-10 text-leaf-300", className)}>
      <path d="M20 14c-6 0-11-4-13-9 6-1 11 1 13 5" fill="currentColor" opacity=".55" />
      <path d="M20 14c6 0 11-4 13-9-6-1-11 1-13 5" fill="currentColor" opacity=".55" />
      <path d="M20 15V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
