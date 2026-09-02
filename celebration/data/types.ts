/**
 * Shared types for every piece of celebration content.
 * The UI reads only these shapes, so the files in `data/` can be edited
 * freely without touching a single component.
 */

/** Broad ways of browsing the celebration. */
export type CategoryId =
  | "spiritual"
  | "music"
  | "dance"
  | "wellness"
  | "sports"
  | "nature"
  | "family"
  | "kids"
  | "food"
  | "entertainment"
  | "excursions";

/** The rhythm of a day, in the order it unfolds. */
export type SegmentId =
  | "morning"
  | "breakfast"
  | "late-morning"
  | "lunch"
  | "bhagwat"
  | "tea"
  | "evening"
  | "dinner"
  | "late-evening";

export type AgeGroupId = "everyone" | "adults" | "teens" | "kids" | "seniors";

/** How much advance planning an activity needs. */
export type RegistrationId = "open" | "signup" | "limited" | "advance";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  /** Tailwind classes for the category chip / accent. */
  tone: string;
}

export interface Segment {
  id: SegmentId;
  name: string;
  /** Shown under the segment heading in the day view. */
  note?: string;
}

export interface AgeGroup {
  id: AgeGroupId;
  name: string;
}

export interface RegistrationLevel {
  id: RegistrationId;
  name: string;
  description: string;
  /** Tailwind classes for the badge. */
  tone: string;
}

/** A single area of the property. */
export interface VenueZone {
  id: string;
  name: string;
  description: string;
  kind: "indoor" | "outdoor" | "service";
  /** Position on the stylised map, as a percentage of the map box. */
  map: { x: number; y: number };
  /** Optional practical note — shade, seating, footwear. */
  note?: string;
}

/** A dress suggestion, reused by activities and shown on its own page. */
export interface DressCode {
  id: string;
  name: string;
  summary: string;
  detail: string;
  /** Swatch hexes shown as little dots. Purely decorative. */
  palette: string[];
  footwear: string;
  tips: string[];
  appliesTo: string;
}

/**
 * A repeated item (breakfast, yoga, Bhagwat…) described once.
 * Days reference it by id and supply only the times.
 */
export interface ActivityTemplate {
  id: string;
  name: string;
  category: CategoryId;
  segment: SegmentId;
  summary: string;
  description: string;
  locationId: string;
  dressCodeId: string;
  audience: AgeGroupId;
  registration: RegistrationId;
  /** Optional extras surfaced in the detail sheet. */
  capacity?: string;
  bring?: string;
  goodToKnow?: string[];
  /** Wellness experiences flag this so they also appear on /experiences. */
  wellness?: {
    duration: string;
    booking: string;
    wear: string;
    avoidIf: string;
  };
}

/** One occurrence of an activity on one day. */
export interface Occurrence {
  /** Reference to an ActivityTemplate, or omit and provide the fields inline. */
  templateId?: string;
  /** Unique within the day when a template is reused twice. */
  slug?: string;
  start: string; // "07:00" — 24h, local to the venue
  end: string; // "08:00"
  /** Anything here overrides the template for this day only. */
  override?: Partial<Omit<ActivityTemplate, "id">>;
}

/** A one-off activity written directly into a day. */
export interface InlineActivity extends Omit<ActivityTemplate, "id"> {
  id: string;
  start: string;
  end: string;
}

export interface Day {
  /** Stable id used in URLs and localStorage: "22", "23"… */
  id: string;
  /** ISO date — weekday and month labels are derived from this. */
  date: string;
  /** Short label for tabs: "22nd". */
  label: string;
  /** Headline for the day. */
  title: string;
  /** One line under the title. */
  subtitle: string;
  /** Longer, warmer paragraph — used on the main-day view. */
  description: string;
  /** 25th / 26th / 27th. Drives all the visual prominence. */
  isMainDay: boolean;
  /** Optional short note pinned to the top of the day. */
  highlight?: string;
  /** Extra editorial shown only on main days. */
  feature?: {
    eyebrow: string;
    heading: string;
    body: string;
    dressCodeId: string;
    /** Replace with a real photo path when you have one. */
    image?: string;
    bullets: string[];
  };
  occurrences: Occurrence[];
  inline?: InlineActivity[];
}

/** Fully resolved activity, ready to render. Built by lib/schedule.ts. */
export interface ScheduledActivity extends ActivityTemplate {
  /** Unique across the whole event — used for favourites. */
  key: string;
  dayId: string;
  dayLabel: string;
  date: string;
  isMainDay: boolean;
  start: string;
  end: string;
  durationMinutes: number;
}

export interface FoodStation {
  id: string;
  name: string;
  blurb: string;
  detail: string;
  tags: string[];
}

export interface DayMenu {
  dayId: string;
  breakfast: string[];
  lunch: string[];
  snacks: string[];
  dinner: string[];
  note?: string;
}

export interface GuestInfoSection {
  id: string;
  title: string;
  icon: string;
  summary: string;
  points: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  topic: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  body: string;
  /** Replace with a real photo path later. */
  image?: string;
}

export interface GalleryItem {
  id: string;
  caption: string;
  album: string;
  /** Replace with `/images/…` once real photos are added. */
  src?: string;
  /** Decorative placeholder tint used until a photo exists. */
  tint: string;
}
