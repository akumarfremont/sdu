"use client";

import { useState } from "react";
import type { ScheduledActivity } from "@/data/types";
import { cn } from "@/lib/cn";
import { formatDuration, formatTime } from "@/lib/format";
import { categoryById, registrationById, venueFor } from "@/lib/schedule";
import { ActivityDetailSheet } from "./ActivityDetailSheet";
import { FavoriteButton } from "./FavoriteButton";
import { IconChevron, IconClock, IconPin, IconShirt } from "./Icons";
import { dressCodeById } from "@/data/dressCodes";

/**
 * The card used everywhere an activity appears. `variant="timeline"` is the
 * day schedule (time rail on the left); `variant="grid"` is the browse view.
 */
export function ActivityCard({
  activity,
  variant = "timeline",
  showDay = false,
  className,
}: {
  activity: ScheduledActivity;
  variant?: "timeline" | "grid";
  showDay?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const category = categoryById[activity.category];
  const registration = registrationById[activity.registration];
  const venue = venueFor(activity);
  const dress = dressCodeById[activity.dressCodeId];
  const needsBooking = activity.registration !== "open";

  return (
    <>
      <article
        className={cn(
          "card card-hover group relative overflow-hidden",
          variant === "timeline" ? "p-4 sm:p-5" : "flex h-full flex-col p-5",
          className,
        )}
      >
        <div className="flex items-start gap-3">
          {variant === "timeline" ? (
            <div className="w-[4.25rem] shrink-0 pt-0.5 sm:w-20">
              <p className="font-display text-lg font-semibold leading-none text-plum-600">
                {formatTime(activity.start)}
              </p>
              <p className="mt-1 text-[0.7rem] leading-tight text-ink-faint">
                to {formatTime(activity.end)}
              </p>
            </div>
          ) : null}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={cn("chip", category?.tone)}>{category?.name}</span>
              {showDay ? (
                <span className="chip bg-cream text-ink-soft ring-sand">{activity.dayLabel}</span>
              ) : null}
              {needsBooking ? (
                <span className={cn("chip", registration?.tone)}>{registration?.name}</span>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-2 block w-full text-left"
              aria-haspopup="dialog"
            >
              <h3 className="text-[1.15rem] font-semibold leading-snug text-plum-600 transition-colors group-hover:text-marigold-600 sm:text-xl">
                {activity.name}
                <span className="sr-only"> — open details</span>
              </h3>
            </button>

            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{activity.summary}</p>

            <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.78rem] text-ink-faint">
              {variant === "grid" ? (
                <li className="inline-flex items-center gap-1.5">
                  <IconClock className="h-3.5 w-3.5" />
                  {formatTime(activity.start)} – {formatTime(activity.end)}
                </li>
              ) : (
                <li className="inline-flex items-center gap-1.5">
                  <IconClock className="h-3.5 w-3.5" />
                  {formatDuration(activity.durationMinutes)}
                </li>
              )}
              <li className="inline-flex items-center gap-1.5">
                <IconPin className="h-3.5 w-3.5" />
                {venue?.name}
              </li>
              <li className="inline-flex items-center gap-1.5">
                <IconShirt className="h-3.5 w-3.5" />
                {dress?.summary}
              </li>
            </ul>
          </div>

          <div className={cn("flex shrink-0 flex-col items-center gap-2", variant === "grid" && "self-start")}>
            <FavoriteButton activityKey={activity.key} name={activity.name} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "mt-3 inline-flex items-center gap-1 text-[0.8rem] font-semibold text-marigold-600 transition-colors hover:text-marigold-500",
            variant === "grid" && "mt-auto pt-3",
          )}
          aria-haspopup="dialog"
        >
          Details
          <IconChevron className="h-3.5 w-3.5" />
          <span className="sr-only">about {activity.name}</span>
        </button>
      </article>

      {open ? <ActivityDetailSheet activity={activity} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
