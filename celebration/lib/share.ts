import { event } from "@/data/event";
import type { ScheduledActivity } from "@/data/types";
import { dayById } from "./schedule";
import { formatTime, longDate } from "./format";

/** Shareable plain text, written to read well when pasted into WhatsApp. */
export function siteShareText(): string {
  return [
    `🌼 ${event.title}`,
    event.tagline,
    "",
    `${event.dateRange} · ${event.venue.name}, ${event.venue.city}`,
    `Main celebration days: ${event.mainDaysLabel}`,
    "",
    "Schedule, activities, dress code and travel details:",
    event.siteUrl,
  ].join("\n");
}

export function dayShareText(dayId: string, activities: ScheduledActivity[]): string {
  const day = dayById[dayId];
  if (!day) return siteShareText();
  const lines = activities
    .slice(0, 14)
    .map((activity) => `• ${formatTime(activity.start)} — ${activity.name}`);
  return [
    `🌼 Here's the schedule for the ${day.label} — ${event.title}`,
    "",
    `${longDate(day.date)} · ${day.title}`,
    "",
    ...lines,
    activities.length > 14 ? `…and ${activities.length - 14} more` : "",
    "",
    `Full schedule: ${event.siteUrl}/schedule?day=${day.id}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function itineraryShareText(activities: ScheduledActivity[]): string {
  if (activities.length === 0) {
    return `I haven't picked anything yet for ${event.title}. ${event.siteUrl}`;
  }
  const byDay = new Map<string, ScheduledActivity[]>();
  activities.forEach((activity) => {
    const list = byDay.get(activity.dayId) ?? [];
    list.push(activity);
    byDay.set(activity.dayId, list);
  });

  const blocks: string[] = [];
  byDay.forEach((list, dayId) => {
    const day = dayById[dayId];
    blocks.push(`*${day?.label ?? dayId} — ${day?.title ?? ""}*`);
    list.forEach((activity) => {
      blocks.push(`• ${formatTime(activity.start)} — ${activity.name}`);
    });
    blocks.push("");
  });

  return [
    `🌼 My plan for ${event.title}`,
    "",
    ...blocks,
    `Build your own: ${event.siteUrl}`,
  ].join("\n");
}

export function activityShareText(activity: ScheduledActivity): string {
  return [
    `🌼 ${activity.name} — ${event.coupleShort}'s 50th`,
    "",
    `${activity.dayLabel}, ${formatTime(activity.start)} – ${formatTime(activity.end)}`,
    activity.summary,
    "",
    `${event.siteUrl}/schedule?day=${activity.dayId}`,
  ].join("\n");
}

/**
 * Uses the native share sheet where it exists (every phone), and falls
 * back to the clipboard on desktop. Returns how it was handled.
 */
export async function share(text: string, title = event.title): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ title, text });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return "failed";
    }
  }
  try {
    await navigator.clipboard.writeText(text);
    return "copied";
  } catch {
    return "failed";
  }
}
