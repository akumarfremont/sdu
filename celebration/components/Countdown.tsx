"use client";

import { useEffect, useState } from "react";
import { event } from "@/data/event";
import { cn } from "@/lib/cn";

function diff(target: number) {
  const total = Math.max(0, target - Date.now());
  return {
    total,
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function Countdown({ className }: { className?: string }) {
  const target = new Date(event.countdownTo).getTime();
  const [now, setNow] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setNow(diff(target));
    const id = window.setInterval(() => setNow(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: now?.days },
    { label: "Hours", value: now?.hours },
    { label: "Minutes", value: now?.minutes },
    { label: "Seconds", value: now?.seconds },
  ];

  const started = now !== null && now.total === 0;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <p className="eyebrow">
        {started ? "The celebration has begun" : "Counting down to the 25th"}
      </p>
      <div className="grid w-full max-w-md grid-cols-4 gap-2 sm:gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="rounded-2xl border border-marigold-100 bg-white/80 py-3 text-center shadow-card"
          >
            <span
              className="block font-display text-2xl font-semibold tabular-nums text-plum-600 sm:text-3xl"
              suppressHydrationWarning
            >
              {unit.value === undefined ? "—" : String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-0.5 block text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
