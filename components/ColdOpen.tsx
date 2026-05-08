"use client";

// Cold open redesigned for user-paced advancement.
// One screen with all three voiceover lines visible + a highlighted
// "Enter Sharp Diligence Unit" button. Voiceover (which contains the
// dun-dun sting appended at the end) auto-plays on mount; user taps the
// button to advance to the title card. If user waits, the audio's `ended`
// event auto-advances. This eliminates the timing fragility of the
// multi-phase auto-progressing version.

import { useEffect, useRef, useState } from "react";

type Phase = "text" | "title" | "fadeOut";

const LINES = [
  "In the M&A justice system, the analysis is done by machines.",
  "But the judgment calls — the ones that close deals or sink them — are made by humans.",
  "These are their cases.",
];

type Props = {
  onDone: () => void;
  /** Kept for backward compat; ignored. The cold open always plays. */
  autoPlay?: boolean;
};

export default function ColdOpen({ onDone }: Props) {
  const [phase, setPhase] = useState<Phase>("text");
  const [flashOn, setFlashOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onDoneRef = useRef(onDone);
  const advancedRef = useRef(false);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  // Auto-play voiceover on mount. Browser may block (no recent gesture);
  // visuals run regardless. The audio file is expected to contain the
  // dun-dun sting concatenated to the end.
  useEffect(() => {
    const a = audioRef.current;
    if (a) {
      a.currentTime = 0;
      a.play().catch(() => {
        /* autoplay blocked or file missing — ok */
      });
    }
    return () => {
      const cur = audioRef.current;
      if (cur) cur.pause();
    };
  }, []);

  function advance() {
    if (advancedRef.current) return;
    advancedRef.current = true;

    setPhase("title");
    setFlashOn(true);
    window.setTimeout(() => setFlashOn(false), 160);
    window.setTimeout(() => setPhase("fadeOut"), 2200);
    window.setTimeout(() => onDoneRef.current(), 2700);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-ink text-bone transition-opacity duration-500 ${
        phase === "fadeOut" ? "opacity-0" : "opacity-100"
      }`}
    >
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        onEnded={advance}
      >
        <source src="/audio/voiceover.mp3" type="audio/mpeg" />
        <source src="/audio/voiceover.m4a" type="audio/mp4" />
      </audio>

      {phase === "text" && (
        <div className="mx-auto flex w-full max-w-screen flex-1 flex-col px-6 pb-8 pt-12">
          <div className="flex flex-1 flex-col justify-center gap-7">
            {LINES.map((line, i) => (
              <p
                key={i}
                className="text-center font-proc text-[19px] leading-[1.55] tracking-[0.04em] text-bone animate-coldFadeIn"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                {line}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={advance}
            className="mt-8 flex h-14 w-full items-center justify-center bg-evidence font-mono text-[13px] font-semibold uppercase tracking-[0.22em] text-ink shadow-[0_0_0_1px_rgba(201,169,97,0.5),0_0_28px_rgba(201,169,97,0.35)] transition hover:bg-evidence/90 active:animate-tapPulse"
          >
            Enter Sharp Diligence Unit
          </button>
        </div>
      )}

      {/* Brief white pulse on phase transition (~160ms) */}
      <div
        className={`pointer-events-none absolute inset-0 bg-bone transition-opacity duration-150 ${
          flashOn ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {(phase === "title" || phase === "fadeOut") && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center animate-titleZoom">
          <div className="font-proc text-[64px] font-bold tracking-proc leading-none text-bone">
            SDU
          </div>
          <div className="font-proc text-[14px] italic tracking-[0.22em] text-bone/80">
            Sharp Diligence Unit
          </div>
        </div>
      )}
    </div>
  );
}
