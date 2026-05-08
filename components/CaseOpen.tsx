"use client";

// The two pre-case cards — date stamp + disclaimer — that play before the
// case file loads. Each card holds for ~2 seconds. Black ground, white serif.
// On capstone cases, a gavel hit plays as the date stamp appears.

import { useEffect, useRef, useState } from "react";

type Phase = "stamp" | "disclaimer" | "done";

const DISCLAIMER =
  "The following case is inspired by a real transaction. Names, identifying details, and certain particulars have been changed for the protection of innocent parties.";

export default function CaseOpen({
  dateStamp,
  onDone,
  isCapstone = false,
}: {
  dateStamp: string;
  onDone: () => void;
  /** If true, plays /audio/gavel.mp3 (or .m4a) at the moment the date stamp
   *  appears. Soft graceful failure if the file isn't present. */
  isCapstone?: boolean;
}) {
  const [phase, setPhase] = useState<Phase>("stamp");
  const gavelRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isCapstone) {
      const g = gavelRef.current;
      if (g) {
        g.currentTime = 0;
        g.play().catch(() => {
          /* missing file or autoplay blocked — silent capstone open */
        });
      }
    }

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase("disclaimer"), 2200));
    timers.push(window.setTimeout(() => setPhase("done"), 4400));
    timers.push(window.setTimeout(() => onDone(), 4900));
    return () => {
      for (const t of timers) window.clearTimeout(t);
      if (gavelRef.current) gavelRef.current.pause();
    };
  }, [onDone, isCapstone]);

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-ink text-bone transition-opacity duration-500 ${
        phase === "done" ? "opacity-0" : "opacity-100"
      }`}
    >
      {isCapstone && (
        <audio ref={gavelRef} preload="auto" playsInline>
          <source src="/audio/gavel.mp3" type="audio/mpeg" />
          <source src="/audio/gavel.m4a" type="audio/mp4" />
        </audio>
      )}

      {phase === "stamp" && (
        <div className="px-7 text-center animate-coldFadeIn">
          <p className="stamp text-[18px] leading-[1.6] text-bone">
            {dateStamp}
          </p>
        </div>
      )}
      {phase === "disclaimer" && (
        <div className="max-w-[340px] px-7 text-center animate-coldFadeIn">
          <p className="font-proc text-[15px] italic leading-[1.65] tracking-[0.02em] text-bone/85">
            {DISCLAIMER}
          </p>
        </div>
      )}
    </div>
  );
}
