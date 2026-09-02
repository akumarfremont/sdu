import type {
  AgeGroup,
  Category,
  RegistrationLevel,
  Segment,
} from "./types";

/**
 * ─────────────────────────────────────────────────────────────
 *  START HERE. Names, dates, venue and contacts for the event.
 * ─────────────────────────────────────────────────────────────
 *  The month and year below are placeholders — change them and
 *  the countdown, weekday names and every date label follow.
 */
export const event = {
  coupleShort: "Sharda & Manoj",
  coupleFull: "Sharda & Manoj Maheshwari",
  years: 50,
  title: "Celebrating 50 Years of Sharda & Manoj",
  tagline: "A week of family, faith, music, memories and celebration",

  /** ISO dates. First and last day of the celebration. */
  startDate: "2026-11-22",
  endDate: "2026-11-28",
  /** Countdown target — the first main guest day. */
  countdownTo: "2026-11-25T09:00:00+05:30",
  /** Human-friendly range shown in the hero. */
  dateRange: "22nd – 28th November",
  mainDaysLabel: "25th · 26th · 27th",

  venue: {
    name: "The Family Farm",
    area: "Off Jaipur–Delhi Highway",
    city: "Jaipur, Rajasthan",
    /** Paste a Google Maps share link here. */
    mapsUrl: "https://maps.google.com/?q=Jaipur+Rajasthan",
  },

  /** Used for og: tags and share text. Set to your real domain. */
  siteUrl: "https://sharda-and-manoj.example.com",

  welcome: {
    heading: "A note from the family",
    body: [
      "Fifty years ago, on a bright winter morning, our parents made a quiet promise to each other. What grew from it is the family standing in front of you today — three generations, a great deal of laughter, and a home that has always had room for one more.",
      "We wanted to mark this year not with one evening, but with a whole week: mornings on the lawn, afternoons of Bhagwat, evenings of bhajan, garba and far too much food. Come as you are, stay as long as you can, and please treat the farm as your own.",
    ],
    signature: "With love, the Maheshwari family",
  },

  /** Short practical notes pinned to the homepage. */
  guestNotes: [
    {
      title: "Vegetarian & alcohol-free",
      body: "Every meal through the week is pure vegetarian, and the celebration is alcohol-free. Jain and satvik counters are available at each meal.",
    },
    {
      title: "Main guest days are the 25th – 27th",
      body: "If you can join for only part of the week, these are the three days to plan around. The 28th is a departure day with a final morning session.",
    },
    {
      title: "Bhagwat every afternoon",
      body: "2:00 PM to 5:30 PM. All are warmly welcome — come for a little or for all of it. Floor and chair seating are both available.",
    },
    {
      title: "Dress light, layer for evenings",
      body: "Warm afternoons and cool evenings. Bring a shawl or light jacket, and shoes that are easy to slip off.",
    },
  ],

  contacts: [
    { role: "Guest coordination", name: "Anjali", phone: "+91 98XXX XXXX1" },
    { role: "Transport & arrivals", name: "Rohit", phone: "+91 98XXX XXXX2" },
    { role: "Wellness bookings", name: "Meera", phone: "+91 98XXX XXXX3" },
    { role: "Emergency (24 hours)", name: "Farm desk", phone: "+91 98XXX XXXX9" },
  ],
};

/** Nav order across the whole site. `primary` items show in the mobile bar. */
export const navLinks = [
  { href: "/", label: "Home", primary: true },
  { href: "/schedule", label: "Schedule", primary: true },
  { href: "/activities", label: "Activities", primary: true },
  { href: "/experiences", label: "Experiences" },
  { href: "/food", label: "Food" },
  { href: "/guest-info", label: "Guest Information" },
  { href: "/venue", label: "Venue" },
  { href: "/faq", label: "FAQ" },
];

/** Extra destinations that live in the "More" sheet and the footer. */
export const secondaryLinks = [
  { href: "/story", label: "Their Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/dress-code", label: "Dress Code" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/my-celebration", label: "My Celebration" },
];

export const quickLinks = [
  { href: "/schedule", label: "Schedule", hint: "All seven days" },
  { href: "/dress-code", label: "Dress Code", hint: "What to wear" },
  { href: "/venue", label: "Venue", hint: "Find your way" },
  { href: "/guest-info", label: "Travel", hint: "Arrivals & transport" },
  { href: "/food", label: "Food", hint: "Menus & stations" },
  { href: "/faq", label: "FAQ", hint: "Common questions" },
];

export const categories: Category[] = [
  { id: "spiritual", name: "Spiritual", blurb: "Bhagwat, bhajan and quiet time", tone: "bg-peacock-50 text-peacock-600 ring-peacock-200" },
  { id: "music", name: "Music", blurb: "Singing, jamming and live sets", tone: "bg-plum-50 text-plum-600 ring-plum-200" },
  { id: "dance", name: "Dance", blurb: "Garba, dandiya and family numbers", tone: "bg-rose-50 text-rose-600 ring-rose-200" },
  { id: "wellness", name: "Wellness", blurb: "Yoga, therapies and stillness", tone: "bg-peacock-50 text-peacock-500 ring-peacock-100" },
  { id: "sports", name: "Sports", blurb: "Courts, lawns and friendly rivalry", tone: "bg-leaf-100 text-leaf-600 ring-leaf-300" },
  { id: "nature", name: "Nature", blurb: "Birds, gardens and walks", tone: "bg-leaf-100 text-leaf-600 ring-leaf-300" },
  { id: "family", name: "Family Activities", blurb: "Everyone together", tone: "bg-marigold-50 text-marigold-600 ring-marigold-200" },
  { id: "kids", name: "Kids", blurb: "Built for the little ones", tone: "bg-marigold-50 text-marigold-500 ring-marigold-100" },
  { id: "food", name: "Food", blurb: "Meals, chai and chaat", tone: "bg-cream text-ink-soft ring-sand" },
  { id: "entertainment", name: "Entertainment", blurb: "Performers and surprises", tone: "bg-rose-50 text-rose-500 ring-rose-100" },
  { id: "excursions", name: "Excursions", blurb: "Beyond the farm gates", tone: "bg-plum-50 text-plum-500 ring-plum-100" },
];

export const segments: Segment[] = [
  { id: "morning", name: "Morning", note: "Sunrise wellness on the lawn" },
  { id: "breakfast", name: "Breakfast" },
  { id: "late-morning", name: "Late Morning", note: "Activities, leisure and excursions" },
  { id: "lunch", name: "Lunch" },
  { id: "bhagwat", name: "Bhagwat", note: "2:00 PM – 5:30 PM" },
  { id: "tea", name: "Tea & Snacks" },
  { id: "evening", name: "Evening Celebration" },
  { id: "dinner", name: "Dinner" },
  { id: "late-evening", name: "Late Evening" },
];

export const ageGroups: AgeGroup[] = [
  { id: "everyone", name: "Everyone" },
  { id: "adults", name: "Adults" },
  { id: "teens", name: "Teens" },
  { id: "kids", name: "Kids" },
  { id: "seniors", name: "Comfortable for seniors" },
];

export const registrationLevels: RegistrationLevel[] = [
  { id: "open", name: "Just turn up", description: "No booking needed — come whenever you like.", tone: "bg-leaf-100 text-leaf-600 ring-leaf-300" },
  { id: "signup", name: "Sign-up sheet", description: "Add your name at the welcome desk on the morning of.", tone: "bg-marigold-50 text-marigold-600 ring-marigold-200" },
  { id: "limited", name: "Limited places", description: "Small group. Book at the welcome desk a day ahead.", tone: "bg-rose-50 text-rose-500 ring-rose-200" },
  { id: "advance", name: "Book in advance", description: "Tell us on your RSVP so we can hold a slot for you.", tone: "bg-peacock-50 text-peacock-600 ring-peacock-200" },
];
