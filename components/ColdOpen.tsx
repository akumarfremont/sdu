"use client";

// Cold open. The audio file at /audio/voiceover.mp3 contains the full
// sequence: voice ("In the M&A justice system..." through "These are their
// cases."), a brief beat of silence, then the dun-dun sting at the end.
// The visual phases are timed to that single track. If the file is missing
// or autoplay is blocked, the visuals run silent on the same schedule.

import { useEffect, useRef, useState } from "react";

type Phase =
  | "primer"
  | "v1"
  | "v2"
  | "v3"
  | "dunDun"
  | "title"
  | "fadeOut";

type Props = {
  onDone: () => void;
  /** Skips the "Press to begin" gate — for the splash hand-off after a tap. */
  autoPlay?: boolean;
};

const LINE_1 =
  "In the M&A justice system, the analysis is done by machines.";
const LINE_2 =
  "But the judgment calls — the ones that close deals or sink them — are made by humans.";
const LINE_3 = "These are their cases.";

// Default timings assume a merged audio file ~12.5s long with the dun-dun
// landing at ~11.5s. If the actual file's duration loads in time, we
// recompute against it so the visuals stay in sync regardless of file length.
const DEFAULT_TOTAL_MS = 12500;
const DEFAULT_DUN_DUN_AT = 11500;
const TITLE_HOLD_MS = 2500;
const FADE_MS = 500;

export default function ColdOpen({ onDone, autoPlay = false }: Props) {
  const [phase, setPhase] = useState<Phase>(autoPlay ? "v1" : "primer");
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const startedRef = useRef(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  function startSequence() {
    if (startedRef.current) return;
    startedRef.current = true;
    setPhase("v1");

    const v = voiceRef.current;
    let totalMs = DEFAULT_TOTAL_MS;
    let dunDunAt = DEFAULT_DUN_DUN_AT;

    if (v && Number.isFinite(v.duration) && v.duration > 0) {
      totalMs = Math.round(v.duration * 1000);
      // Dun-dun sting is the last ~1.0s of the file
      dunDunAt = Math.max(8000, totalMs - 1000);
    }

    // Visual line 3 ("These are their cases.") shows for the last ~3s
    // of the voice, ending right before the dun-dun.
    const v3At = Math.max(7000, dunDunAt - 3500);
    const titleAt = totalMs;
    const fadeAt = titleAt + TITLE_HOLD_MS;
    const doneAt = fadeAt + FADE_MS;

    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {
        /* missing file or autoplay blocked — visuals run silent */
      });
    }

    const t = timersRef.current;
    t.push(window.setTimeout(() => setPhase("v2"), 3500));
    t.push(window.setTimeout(() => setPhase("v3"), v3At));
    t.push(window.setTimeout(() => setPhase("dunDun"), dunDunAt));
    t.push(window.setTimeout(() => setPhase("title"), titleAt));
    t.push(window.setTimeout(() => setPhase("fadeOut"), fadeAt));
    t.push(window.setTimeout(() => onDoneRef.current(), doneAt));
  }

  // Run once on mount: kick off if autoPlay; always wire unmount cleanup.
  useEffect(() => {
    if (autoPlay) startSequence();
    return () => {
      for (const id of timersRef.current) window.clearTimeout(id);
      timersRef.current = [];
      const v = voiceRef.current;
      if (v) v.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-ink text-bone transition-opacity duration-500 ${
        phase === "fadeOut" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Single merged audio file. .mp3 and .m4a sources both attempted. */}
      <audio ref={voiceRef} preload="auto" playsInline>
        <source src="/audio/voiceover.mp3" type="audio/mpeg" />
        <source src="/audio/voiceover.m4a" type="audio/mp4" />
      </audio>

      {phase === "primer" ? (
        <button
          type="button"
          onClick={startSequence}
          className="group flex flex-col items-center gap-6 px-6 text-center"
        >
          <span className="font-proc text-[15px] tracking-proc text-bone/60">
            Press to begin
          </span>
          <span className="font-proc text-[28px] tracking-proc text-bone">
            COLD OPEN
          </span>
          <span className="mt-2 h-px w-12 bg-bone/30 transition-all group-active:w-20" />
        </button>
      ) : (
        <>
          <VOLine visible={phase === "v1"} text={LINE_1} />
          <VOLine visible={phase === "v2"} text={LINE_2} />
          <VOLine visible={phase === "v3"} text={LINE_3} />
          <div
            className={`pointer-events-none absolute inset-0 bg-bone transition-opacity duration-150 ${
              phase === "dunDun" ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />
          {(phase === "title" || phase === "fadeOut") && (
            <div className="flex flex-col items-center gap-3 px-6 text-center animate-titleZoom">
              <div className="font-proc text-[64px] font-bold tracking-proc leading-none text-bone">
                SDU
              </div>
              <div className="font-proc text-[14px] italic tracking-[0.22em] text-bone/80">
                Sharp Diligence Unit
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function VOLine({ visible, text }: { visible: boolean; text: string }) {
  return (
    <p
      className={`absolute max-w-[320px] px-6 text-center font-proc text-[19px] leading-[1.55] tracking-[0.04em] text-bone transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {text}
    </p>
  );
}
