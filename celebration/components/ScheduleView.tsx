"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { days } from "@/data/days";
import { getDayActivities } from "@/lib/schedule";
import { filterActivities } from "@/lib/schedule";
import { dayShareText } from "@/lib/share";
import { longDate, weekdayName } from "@/lib/format";
import { cn } from "@/lib/cn";
import { DaySchedule } from "./DaySchedule";
import { DayTabs } from "./DayTabs";
import { MainDayFeature } from "./MainDayFeature";
import { ShareButton } from "./ShareButton";
import { IconSearch, IconStar } from "./Icons";
import { DiamondRule } from "./Motifs";

type View = "day" | "main";

const mainDays = days.filter((day) => day.isMainDay);

export function ScheduleView() {
  const router = useRouter();
  const params = useSearchParams();
  const paramDay = params.get("day");
  const paramView = params.get("view");

  const [view, setView] = useState<View>(paramView === "main" ? "main" : "day");
  const [activeDay, setActiveDay] = useState(
    paramDay && days.some((day) => day.id === paramDay) ? paramDay : days[0].id,
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (paramDay && days.some((day) => day.id === paramDay)) {
      setActiveDay(paramDay);
      setView("day");
    }
  }, [paramDay]);

  const day = days.find((item) => item.id === activeDay) ?? days[0];
  const dayActivities = useMemo(() => getDayActivities(day.id), [day.id]);
  const visible = useMemo(
    () => filterActivities(dayActivities, { query }),
    [dayActivities, query],
  );

  function selectDay(id: string) {
    setActiveDay(id);
    setQuery("");
    router.replace(`/schedule?day=${id}`, { scroll: false });
  }

  function selectView(next: View) {
    setView(next);
    router.replace(next === "main" ? "/schedule?view=main" : `/schedule?day=${activeDay}`, {
      scroll: false,
    });
  }

  return (
    <div>
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Schedule view"
          className="inline-flex rounded-full border border-sand bg-white/80 p-1 shadow-card"
        >
          {(
            [
              { id: "day" as const, label: "By day" },
              { id: "main" as const, label: "Main days" },
            ]
          ).map((option) => (
            <button
              key={option.id}
              role="tab"
              type="button"
              aria-selected={view === option.id}
              onClick={() => selectView(option.id)}
              className={cn(
                "min-h-[2.5rem] rounded-full px-5 text-sm font-semibold transition-colors",
                view === option.id ? "bg-plum-600 text-ivory" : "text-ink-soft hover:text-plum-600",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {view === "day" ? (
        <div className="mt-7">
          <DayTabs activeId={day.id} onSelect={selectDay} />

          <div
            className={cn(
              "mt-6 rounded-4xl border p-6 sm:p-8",
              day.isMainDay
                ? "border-marigold-200 bg-gradient-to-br from-marigold-50 via-white to-white shadow-lift"
                : "border-sand bg-white/70 shadow-card",
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              {day.isMainDay ? (
                <span className="chip bg-plum-600 text-ivory ring-plum-600">
                  <IconStar className="h-3.5 w-3.5" />
                  Main celebration day
                </span>
              ) : null}
              <span className="chip bg-cream text-ink-soft ring-sand">
                {weekdayName(day.date)} · {longDate(day.date)}
              </span>
            </div>
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl">{day.title}</h2>
            <p className="mt-2 max-w-prose leading-relaxed text-ink-soft">{day.description}</p>
            {day.highlight ? (
              <p className="mt-4 rounded-2xl border border-marigold-200 bg-marigold-50/70 px-4 py-3 text-sm font-medium text-plum-600">
                {day.highlight}
              </p>
            ) : null}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="relative flex-1">
                <span className="sr-only">Search the {day.label} schedule</span>
                <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search the ${day.label}…`}
                  className="min-h-[2.75rem] w-full rounded-full border border-sand bg-white pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-marigold-300"
                />
              </label>
              <ShareButton
                text={() => dayShareText(day.id, dayActivities)}
                label={`Share the ${day.label}`}
              />
            </div>
          </div>

          <div className="mt-8">
            {query && visible.length === 0 ? (
              <p className="card p-6 text-center text-sm text-ink-soft">
                Nothing on the {day.label} matches “{query}”.{" "}
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="link-underline font-semibold text-plum-600"
                >
                  Clear the search
                </button>
              </p>
            ) : (
              <DaySchedule activities={visible} />
            )}
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          <div className="text-center">
            <p className="mx-auto max-w-prose leading-relaxed text-ink-soft">
              These are the three days built for guests travelling in. Each one has its own
              character — an evening of music, a night of garba and cake, and a closing celebration.
            </p>
            <DiamondRule className="mx-auto mt-5 w-40" />
          </div>
          {mainDays.map((mainDay, index) => (
            <MainDayFeature key={mainDay.id} day={mainDay} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
