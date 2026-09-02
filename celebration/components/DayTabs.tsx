"use client";

import { days } from "@/data/days";
import { cn } from "@/lib/cn";
import { weekdayName } from "@/lib/format";

/**
 * Horizontal day picker. Main days (25th–27th) are visually raised.
 */
export function DayTabs({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <div
        role="tablist"
        aria-label="Choose a day"
        className="flex min-w-max gap-2 pb-1 sm:justify-center"
      >
        {days.map((day) => {
          const active = day.id === activeId;
          return (
            <button
              key={day.id}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => onSelect(day.id)}
              className={cn(
                "relative min-w-[4.75rem] rounded-2xl border px-3 py-2.5 text-center transition-all duration-200 active:scale-[0.98]",
                active
                  ? "border-plum-600 bg-plum-600 text-ivory shadow-lift"
                  : day.isMainDay
                    ? "border-marigold-300 bg-marigold-50 text-marigold-600 shadow-card hover:border-marigold-400"
                    : "border-sand bg-white/80 text-ink-soft hover:border-marigold-200",
              )}
            >
              <span className="block text-[0.62rem] uppercase tracking-[0.14em] opacity-75">
                {weekdayName(day.date, "short")}
              </span>
              <span className="mt-0.5 block font-display text-lg font-semibold leading-none">
                {day.label}
              </span>
              {day.isMainDay ? (
                <span
                  aria-hidden
                  className={cn(
                    "mx-auto mt-1.5 block h-1 w-1 rounded-full",
                    active ? "bg-marigold-300" : "bg-marigold-400",
                  )}
                />
              ) : (
                <span aria-hidden className="mt-1.5 block h-1" />
              )}
              {day.isMainDay ? <span className="sr-only">Main celebration day</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
