"use client";

import { useMemo, useState } from "react";
import { days } from "@/data/days";
import { ageGroups, categories, registrationLevels, segments } from "@/data/event";
import type {
  AgeGroupId,
  CategoryId,
  RegistrationId,
  ScheduledActivity,
  SegmentId,
} from "@/data/types";
import { allActivities, filterActivities } from "@/lib/schedule";
import { cn } from "@/lib/cn";
import { toMinutes } from "@/lib/format";
import { ActivityCard } from "./ActivityCard";
import { IconClose, IconSearch } from "./Icons";

type Grouping = "unique" | "all";

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

/** Sort by day, then start time. */
const sorted = [...allActivities].sort(
  (a, b) => a.dayId.localeCompare(b.dayId) || toMinutes(a.start) - toMinutes(b.start),
);

export function ActivitiesExplorer() {
  const [query, setQuery] = useState("");
  const [selectedCategories, setCategories] = useState<CategoryId[]>([]);
  const [selectedDays, setDays] = useState<string[]>([]);
  const [selectedAges, setAges] = useState<AgeGroupId[]>([]);
  const [selectedSegments, setSegments] = useState<SegmentId[]>([]);
  const [selectedRegistrations, setRegistrations] = useState<RegistrationId[]>([]);
  const [grouping, setGrouping] = useState<Grouping>("unique");

  const matches = useMemo(
    () =>
      filterActivities(sorted, {
        query,
        categories: selectedCategories,
        dayIds: selectedDays,
        audiences: selectedAges,
        segments: selectedSegments,
        registrations: selectedRegistrations,
      }),
    [query, selectedCategories, selectedDays, selectedAges, selectedSegments, selectedRegistrations],
  );

  const { visible, repeats } = useMemo(() => {
    if (grouping === "all") return { visible: matches, repeats: new Map<string, string[]>() };
    const seen = new Map<string, ScheduledActivity>();
    const dayMap = new Map<string, string[]>();
    matches.forEach((activity) => {
      if (!seen.has(activity.id)) seen.set(activity.id, activity);
      dayMap.set(activity.id, [...(dayMap.get(activity.id) ?? []), activity.dayLabel]);
    });
    return { visible: [...seen.values()], repeats: dayMap };
  }, [matches, grouping]);

  const activeFilters =
    selectedCategories.length +
    selectedDays.length +
    selectedAges.length +
    selectedSegments.length +
    selectedRegistrations.length +
    (query ? 1 : 0);

  function clearAll() {
    setQuery("");
    setCategories([]);
    setDays([]);
    setAges([]);
    setSegments([]);
    setRegistrations([]);
  }

  return (
    <div>
      <div className="card space-y-4 p-5 sm:p-6 lg:sticky lg:top-[4.5rem] lg:z-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search activities</span>
            <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search yoga, garba, cricket, chaat…"
              className="min-h-[2.75rem] w-full rounded-full border border-sand bg-white pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-marigold-300"
            />
          </label>
          <div className="inline-flex shrink-0 rounded-full border border-sand bg-white p-1">
            {(
              [
                { id: "unique" as const, label: "One per activity" },
                { id: "all" as const, label: "Every session" },
              ]
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={grouping === option.id}
                onClick={() => setGrouping(option.id)}
                className={cn(
                  "min-h-[2.25rem] rounded-full px-3.5 text-xs font-semibold transition-colors",
                  grouping === option.id
                    ? "bg-plum-600 text-ivory"
                    : "text-ink-soft hover:text-plum-600",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <FilterRow label="Category">
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              active={selectedCategories.includes(category.id)}
              onClick={() => setCategories(toggle(selectedCategories, category.id))}
            >
              {category.name}
            </FilterChip>
          ))}
        </FilterRow>

        <FilterRow label="Day">
          {days.map((day) => (
            <FilterChip
              key={day.id}
              active={selectedDays.includes(day.id)}
              main={day.isMainDay}
              onClick={() => setDays(toggle(selectedDays, day.id))}
            >
              {day.label}
            </FilterChip>
          ))}
        </FilterRow>

        <details className="group">
          <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint hover:text-plum-600">
            More filters
            <span className="ml-1 inline-block transition-transform group-open:rotate-90">›</span>
          </summary>
          <div className="mt-4 space-y-4">
            <FilterRow label="Who it's for">
              {ageGroups.map((group) => (
                <FilterChip
                  key={group.id}
                  active={selectedAges.includes(group.id)}
                  onClick={() => setAges(toggle(selectedAges, group.id))}
                >
                  {group.name}
                </FilterChip>
              ))}
            </FilterRow>
            <FilterRow label="Time of day">
              {segments.map((segment) => (
                <FilterChip
                  key={segment.id}
                  active={selectedSegments.includes(segment.id)}
                  onClick={() => setSegments(toggle(selectedSegments, segment.id))}
                >
                  {segment.name}
                </FilterChip>
              ))}
            </FilterRow>
            <FilterRow label="Planning">
              {registrationLevels.map((level) => (
                <FilterChip
                  key={level.id}
                  active={selectedRegistrations.includes(level.id)}
                  onClick={() => setRegistrations(toggle(selectedRegistrations, level.id))}
                >
                  {level.name}
                </FilterChip>
              ))}
            </FilterRow>
          </div>
        </details>

        <div className="flex items-center justify-between gap-3 border-t border-sand/70 pt-3">
          <p className="text-sm text-ink-soft">
            <span className="font-semibold text-plum-600">{visible.length}</span>{" "}
            {visible.length === 1 ? "activity" : "activities"}
            {grouping === "all" ? " scheduled" : " to explore"}
          </p>
          {activeFilters > 0 ? (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 rounded-full border border-sand bg-white px-3 py-1.5 text-xs font-semibold text-plum-600 hover:border-marigold-200"
            >
              <IconClose className="h-3.5 w-3.5" />
              Clear {activeFilters} filter{activeFilters === 1 ? "" : "s"}
            </button>
          ) : null}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="card mt-6 p-8 text-center text-sm text-ink-soft">
          Nothing matches those filters yet.{" "}
          <button type="button" onClick={clearAll} className="link-underline font-semibold text-plum-600">
            Clear them
          </button>{" "}
          and start again.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((activity) => {
            const labels = repeats.get(activity.id) ?? [];
            return (
              <li key={activity.key} className="flex">
                <div className="flex w-full flex-col">
                  <ActivityCard activity={activity} variant="grid" showDay className="flex-1" />
                  {grouping === "unique" && labels.length > 1 ? (
                    <p className="mt-1.5 px-2 text-[0.72rem] text-ink-faint">
                      Also on {labels.slice(1).join(", ")}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </p>
      <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  main,
  onClick,
  children,
}: {
  active: boolean;
  main?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-medium transition-all active:scale-95",
        active
          ? "border-plum-600 bg-plum-600 text-ivory"
          : main
            ? "border-marigold-200 bg-marigold-50 text-plum-600 hover:border-marigold-300"
            : "border-sand bg-white text-ink-soft hover:border-marigold-200 hover:text-plum-600",
      )}
    >
      {children}
    </button>
  );
}
