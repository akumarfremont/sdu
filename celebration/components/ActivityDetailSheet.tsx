"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { ScheduledActivity } from "@/data/types";
import { categoryById, dressFor, registrationById, segmentById, venueFor } from "@/lib/schedule";
import { formatDuration, formatTime, longDate } from "@/lib/format";
import { activityShareText } from "@/lib/share";
import { ageGroups } from "@/data/event";
import { FavoriteButton } from "./FavoriteButton";
import { ShareButton } from "./ShareButton";
import { DiamondRule } from "./Motifs";
import {
  IconClock,
  IconClose,
  IconPin,
  IconShirt,
  IconTicket,
  IconUsers,
} from "./Icons";

export function ActivityDetailSheet({
  activity,
  onClose,
}: {
  activity: ScheduledActivity;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const category = categoryById[activity.category];
  const registration = registrationById[activity.registration];
  const venue = venueFor(activity);
  const dress = dressFor(activity);
  const audience = ageGroups.find((group) => group.id === activity.audience);
  const segment = segmentById[activity.segment];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      {/* Backdrop: Escape and the header button are the accessible ways out. */}
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 animate-fadeIn bg-plum-700/45 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="activity-detail-title"
        tabIndex={-1}
        className="relative max-h-[88vh] w-full max-w-2xl animate-sheetUp overflow-y-auto rounded-t-4xl border border-sand bg-ivory shadow-sheet outline-none sm:rounded-4xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-sand/70 bg-ivory/95 px-6 py-4 backdrop-blur">
          <div className="min-w-0">
            <p className="eyebrow truncate">
              {activity.dayLabel} · {segment?.name}
            </p>
            <h2 id="activity-detail-title" className="mt-1 truncate text-2xl">
              {activity.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sand bg-white text-plum-600"
          >
            <IconClose />
          </button>
        </div>

        <div className="px-6 pb-8 pt-5">
          {activity.isMainDay ? (
            <span className="chip mb-3 bg-marigold-50 text-marigold-600 ring-marigold-200">
              Main celebration day
            </span>
          ) : null}

          <p className="text-[1.02rem] leading-relaxed text-ink">{activity.summary}</p>
          <p className="mt-3 leading-relaxed text-ink-soft">{activity.description}</p>

          <DiamondRule className="my-6" />

          <dl className="grid gap-4 sm:grid-cols-2">
            <Detail icon={<IconClock className="h-4 w-4" />} term="When">
              {longDate(activity.date)}
              <br />
              <span className="text-ink">
                {formatTime(activity.start)} – {formatTime(activity.end)}
              </span>{" "}
              <span className="text-ink-faint">({formatDuration(activity.durationMinutes)})</span>
            </Detail>

            <Detail icon={<IconPin className="h-4 w-4" />} term="Where">
              <Link href="/venue" className="link-underline text-ink">
                {venue?.name ?? "To be confirmed"}
              </Link>
              {venue?.note ? <span className="block text-ink-faint">{venue.note}</span> : null}
            </Detail>

            <Detail icon={<IconShirt className="h-4 w-4" />} term="What to wear">
              <Link href="/dress-code" className="link-underline text-ink">
                {dress?.name}
              </Link>
              <span className="block">{dress?.summary}</span>
            </Detail>

            <Detail icon={<IconUsers className="h-4 w-4" />} term="Who it's for">
              {audience?.name ?? "Everyone"}
              <span className="block text-ink-faint">{category?.name}</span>
            </Detail>

            <Detail icon={<IconTicket className="h-4 w-4" />} term="Registration">
              <span className="text-ink">{registration?.name}</span>
              <span className="block">{registration?.description}</span>
            </Detail>

            {activity.capacity ? (
              <Detail icon={<IconUsers className="h-4 w-4" />} term="Capacity">
                {activity.capacity}
              </Detail>
            ) : null}
          </dl>

          {activity.bring ? (
            <p className="mt-5 rounded-2xl border border-marigold-100 bg-marigold-50/60 px-4 py-3 text-sm text-ink-soft">
              <span className="font-semibold text-plum-600">Bring: </span>
              {activity.bring}
            </p>
          ) : null}

          {activity.goodToKnow?.length ? (
            <div className="mt-5 rounded-2xl border border-sand bg-white/70 px-4 py-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Good to know
              </h3>
              <ul className="mt-2 space-y-2">
                {activity.goodToKnow.map((note) => (
                  <li key={note} className="flex gap-2 text-sm text-ink-soft">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold-300" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {activity.wellness ? (
            <div className="mt-5 rounded-2xl border border-peacock-100 bg-peacock-50/60 px-4 py-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-peacock-500">
                Booking this experience
              </h3>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                <Detail term="Duration">{activity.wellness.duration}</Detail>
                <Detail term="How to book">{activity.wellness.booking}</Detail>
                <Detail term="What to wear">{activity.wellness.wear}</Detail>
                <Detail term="Please note">{activity.wellness.avoidIf}</Detail>
              </dl>
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <FavoriteButton
              activityKey={activity.key}
              name={activity.name}
              variant="full"
              className="sm:flex-1"
            />
            <ShareButton
              text={() => activityShareText(activity)}
              label="Share this"
              className="sm:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({
  term,
  children,
  icon,
}: {
  term: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
        {icon}
        {term}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{children}</dd>
    </div>
  );
}
