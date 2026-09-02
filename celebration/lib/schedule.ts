import { templateById } from "@/data/activities";
import { days } from "@/data/days";
import { categories, registrationLevels, segments } from "@/data/event";
import { dressCodeById } from "@/data/dressCodes";
import { venueById } from "@/data/venues";
import type {
  AgeGroupId,
  CategoryId,
  Day,
  RegistrationId,
  ScheduledActivity,
  SegmentId,
} from "@/data/types";
import { durationBetween, toMinutes } from "./format";

/**
 * Resolves the editable data in `data/` into a flat, sorted list of
 * activities. Every view on the site is a filter over `allActivities`.
 */
function resolveDay(day: Day): ScheduledActivity[] {
  const fromTemplates = day.occurrences.map((occurrence) => {
    const template = occurrence.templateId ? templateById[occurrence.templateId] : undefined;
    if (!template) {
      throw new Error(
        `Unknown activity template "${occurrence.templateId}" on day ${day.id}. ` +
          `Add it to data/activities.ts or write the activity inline.`,
      );
    }
    const merged = { ...template, ...occurrence.override };
    const suffix = occurrence.slug ? `-${occurrence.slug}` : "";
    return buildActivity(day, merged, `${template.id}${suffix}`, occurrence.start, occurrence.end);
  });

  const fromInline = (day.inline ?? []).map((activity) =>
    buildActivity(day, activity, activity.id, activity.start, activity.end),
  );

  return [...fromTemplates, ...fromInline].sort(
    (a, b) => toMinutes(a.start) - toMinutes(b.start) || a.name.localeCompare(b.name),
  );
}

function buildActivity(
  day: Day,
  source: Omit<ScheduledActivity, "id" | "key" | "dayId" | "dayLabel" | "date" | "isMainDay" | "start" | "end" | "durationMinutes"> & { id?: string },
  id: string,
  start: string,
  end: string,
): ScheduledActivity {
  return {
    ...source,
    id,
    key: `${day.id}:${id}`,
    dayId: day.id,
    dayLabel: day.label,
    date: day.date,
    isMainDay: day.isMainDay,
    start,
    end,
    durationMinutes: durationBetween(start, end),
  };
}

const activitiesByDayEntries = days.map((day) => [day.id, resolveDay(day)] as const);

export const activitiesByDay: Record<string, ScheduledActivity[]> =
  Object.fromEntries(activitiesByDayEntries);

export const allActivities: ScheduledActivity[] = activitiesByDayEntries.flatMap(
  ([, list]) => list,
);

export const dayById = Object.fromEntries(days.map((day) => [day.id, day])) as Record<string, Day>;

export function getDayActivities(dayId: string): ScheduledActivity[] {
  return activitiesByDay[dayId] ?? [];
}

export function getActivityByKey(key: string): ScheduledActivity | undefined {
  return allActivities.find((activity) => activity.key === key);
}

/** Groups a day's activities into the segments of the daily rhythm. */
export function groupBySegment(activities: ScheduledActivity[]) {
  return segments
    .map((segment) => ({
      segment,
      activities: activities.filter((activity) => activity.segment === segment.id),
    }))
    .filter((group) => group.activities.length > 0);
}

/** Distinct activities across the week, keeping the earliest occurrence. */
export function uniqueActivities(activities: ScheduledActivity[]): ScheduledActivity[] {
  const seen = new Set<string>();
  return activities.filter((activity) => {
    if (seen.has(activity.id)) return false;
    seen.add(activity.id);
    return true;
  });
}

export interface ActivityFilters {
  query?: string;
  categories?: CategoryId[];
  dayIds?: string[];
  audiences?: AgeGroupId[];
  registrations?: RegistrationId[];
  segments?: SegmentId[];
}

export function filterActivities(
  activities: ScheduledActivity[],
  filters: ActivityFilters,
): ScheduledActivity[] {
  const query = filters.query?.trim().toLowerCase() ?? "";
  return activities.filter((activity) => {
    if (filters.categories?.length && !filters.categories.includes(activity.category)) return false;
    if (filters.dayIds?.length && !filters.dayIds.includes(activity.dayId)) return false;
    if (filters.audiences?.length && !filters.audiences.includes(activity.audience)) return false;
    if (filters.registrations?.length && !filters.registrations.includes(activity.registration))
      return false;
    if (filters.segments?.length && !filters.segments.includes(activity.segment)) return false;
    if (!query) return true;
    const haystack = [
      activity.name,
      activity.summary,
      activity.description,
      venueById[activity.locationId]?.name ?? "",
      categoryById[activity.category]?.name ?? "",
      activity.dayLabel,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });
}

export const categoryById = Object.fromEntries(
  categories.map((category) => [category.id, category]),
) as Record<CategoryId, (typeof categories)[number]>;

export const segmentById = Object.fromEntries(
  segments.map((segment) => [segment.id, segment]),
) as Record<SegmentId, (typeof segments)[number]>;

export const registrationById = Object.fromEntries(
  registrationLevels.map((level) => [level.id, level]),
) as Record<RegistrationId, (typeof registrationLevels)[number]>;

export function venueFor(activity: ScheduledActivity) {
  return venueById[activity.locationId];
}

export function dressFor(activity: ScheduledActivity) {
  return dressCodeById[activity.dressCodeId];
}

/** Every wellness experience offered during the week, de-duplicated. */
export const wellnessExperiences = uniqueActivities(
  allActivities.filter((activity) => Boolean(activity.wellness)),
);

/** Categories that actually have something in them, in display order. */
export const activeCategories = categories.filter((category) =>
  allActivities.some((activity) => activity.category === category.id),
);

export function countForCategory(categoryId: CategoryId): number {
  return uniqueActivities(allActivities.filter((a) => a.category === categoryId)).length;
}
