# Sharda & Manoj — 50th Anniversary Celebration

A mobile-first event website for a seven-day family celebration. Built for guests
who will open it from a WhatsApp message on a phone, and designed so that every
piece of content can be edited without touching a single component.

- **Stack** — Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Dependencies** — four in total (`next`, `react`, `react-dom`, plus `clsx` +
  `tailwind-merge` for class handling). No UI library, no CMS, no backend.
- **Everything is static.** All 16 routes prerender at build time.

---

## Run it

```bash
cd celebration
pnpm install
pnpm dev        # http://localhost:3000
```

Other scripts:

```bash
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # eslint
pnpm typecheck  # tsc --noEmit
```

> This app lives in the `celebration/` sub-folder of the repository, alongside the
> existing SDU project at the repo root. The repo's root `vercel.json` installs,
> builds and serves *this* app, so a Vercel deployment of the repository is the
> anniversary site. If Vercel's Next.js detection ever objects to the nested
> output, the supported alternative is to set the project's **Root Directory** to
> `celebration` — `celebration/vercel.json` is already set up for that.

---

## Where to edit things

Everything a guest reads lives in `data/`. The components in `components/` only
know about the *shapes* in `data/types.ts`, so you can rewrite any text, time or
location and nothing else needs to change.

| I want to change… | Edit |
| --- | --- |
| Names, dates, venue, countdown, phone numbers, welcome message, nav order | `data/event.ts` |
| The seven-day schedule — times, days, day titles, main-day features | `data/days.ts` |
| Descriptions of activities that repeat (yoga, meals, Bhagwat…) | `data/activities.ts` |
| Areas of the property and the map pins | `data/venues.ts` |
| What to wear, per occasion | `data/dressCodes.ts` |
| Menus and food stations | `data/food.ts` |
| Bhagwat timings, speaker, topics, seating notes | `data/spiritual.ts` |
| Arrival, transport, packing, accessibility… | `data/guestInfo.ts` |
| Frequently asked questions | `data/faq.ts` |
| Their story, the 50-year timeline, gallery captions | `data/story.ts` |
| Colours, fonts, shadows, rounding | `tailwind.config.ts` |

### Placeholders to replace before you send this out

These are made up and clearly marked in the files:

- **The month and year.** `event.startDate` / `endDate` / `countdownTo` /
  `dateRange` in `data/event.ts` are set to **22–28 November 2026**. Change them
  and every weekday label, date heading and the countdown follow automatically.
- **The venue** (`event.venue`) — name, area, city and the Google Maps link.
- **Phone numbers** (`event.contacts`) — all four are `+91 98XXX XXXXn`.
- **The site URL** (`event.siteUrl`) — used in share text and social previews.
- **Family names and the story** in `data/story.ts`.
- **The Bhagwat speaker** in `data/spiritual.ts`.
- **Photographs** — see below.

---

## Editing the schedule

`data/days.ts` is the file you will spend the most time in. Each day has two
kinds of entry:

**1. `occurrences`** reuse an activity described once in `data/activities.ts`.
You only give the times:

```ts
{ templateId: "sunrise-yoga", start: "06:45", end: "07:45" },
```

Add an `override` to change the wording for one day only:

```ts
{
  templateId: "bhagwat",
  start: "14:00",
  end: "17:30",
  override: { summary: "Day four — the Krishna leelas begin." },
},
```

**2. `inline`** activities exist on that day only, and carry their own full
description:

```ts
{
  id: "cake-cutting",
  name: "Cake Cutting & Toast to Fifty Years",
  category: "family",
  segment: "evening",
  start: "21:00",
  end: "21:15",
  summary: "The moment of the week.",
  description: "A short toast from the family, the cake, and a photograph.",
  locationId: "back-lawn",       // an id from data/venues.ts
  dressCodeId: "garba",          // an id from data/dressCodes.ts
  audience: "everyone",
  registration: "open",
},
```

Times are 24-hour `"HH:MM"`. Order doesn't matter — the site sorts by start time
and groups by `segment` (morning → breakfast → late-morning → lunch → bhagwat →
tea → evening → dinner → late-evening). Events that run past midnight are handled.

**Main days.** Setting `isMainDay: true` on a day gives it the marigold treatment
everywhere — the tabs, the day header, the food menus and My Celebration. Adding
a `feature` block to a main day gives it the rich editorial card in
*Schedule → Main days*.

TypeScript will tell you immediately if you reference a template, venue or dress
code that doesn't exist — run `pnpm typecheck`.

---

## Adding photographs

Everywhere a photo can go, there is a tasteful placeholder until you supply one.
Drop files into `public/images/` and point at them:

| Placeholder | Give it a photo by |
| --- | --- |
| Main-day feature image | `feature.image: "/images/25th.jpg"` in `data/days.ts` |
| Timeline milestones | `image: "/images/1976.jpg"` on an entry in `timeline` |
| Gallery tiles | `src: "/images/gallery/wedding-01.jpg"` on an entry in `gallery` |
| Bhagwat speaker | `speaker.image` in `data/spiritual.ts` |
| The property map | `venueMapImage = "/images/venue-map.jpg"` in `data/venues.ts` — the pins keep working on top of it |

The social preview card that WhatsApp shows is generated from your data at build
time in `app/opengraph-image.tsx`; the browser tab icon is `app/icon.svg`.

---

## Changing the look

All colour lives in `tailwind.config.ts` under `theme.extend.colors`:

- `marigold` — the festive accent and everything main-day
- `peacock` — spiritual and wellness
- `rose` — celebration and dance
- `plum` — headings and primary buttons
- `leaf` — nature and outdoors
- `ivory` / `cream` / `sand` — the warm paper grounds

Change a hex and every card, chip and button follows. Fonts are set in
`app/layout.tsx` (Cormorant Garamond for display, Jost for body); shared card,
button and chip classes are in `app/globals.css` under `@layer components`.

---

## How it's put together

```
app/                     one route per page, all statically rendered
  page.tsx               home — hero, countdown, main days, today's schedule
  schedule/              by-day tabs + the three main-day features
  activities/            filterable catalogue of everything
  experiences/           Bhagwat, wellness programme, excursions
  food/  venue/  faq/  guest-info/  dress-code/  story/  gallery/
  rsvp/                  mock form
  my-celebration/        the guest's saved picks
components/              reusable UI — nothing holds content of its own
data/                    all editable content (see the table above)
lib/
  schedule.ts            resolves data/ into a sorted, filterable list
  format.ts              time, date and duration formatting
  useItinerary.ts        "My Celebration", backed by localStorage
  share.ts               WhatsApp-friendly share text
  rsvp.ts                the RSVP payload shape and its mock submit
```

### My Celebration

Guests tap **+** on any activity. Selections are stored in `localStorage` under
`celebration.itinerary.v1` — no account, no server. They are grouped by day on
`/my-celebration`, shareable as text, and sent along with the RSVP form.

### Sharing

Every share button uses the device's native share sheet (`navigator.share`) and
falls back to copying to the clipboard on desktop. The text is written to read
well when pasted into WhatsApp. Three flavours: the whole site, a single day, and
the guest's own picks — all in `lib/share.ts`.

### The RSVP form

`lib/rsvp.ts` defines the full submission shape — name, family, dates, adults,
children, hotel, transport, dietary needs, activity picks, wellness and excursion
bookings. `submitRsvp()` currently waits a moment and writes to `localStorage`.

To connect it to something real, replace only the body of that function:

```ts
export async function submitRsvp(submission: RsvpSubmission): Promise<RsvpResult> {
  const res = await fetch("/api/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });
  return res.ok
    ? { ok: true, reference: (await res.json()).reference }
    : { ok: false, error: "Something went wrong — please try again." };
}
```

Nothing in the UI needs to change. No payment handling is included, by design.

---

## Notes on accessibility and performance

- Semantic landmarks throughout, a skip link, visible focus rings, `aria-current`
  on the active nav item, and labelled dialogs that close on Escape.
- Every tap target is at least 44px tall; nothing relies on hover.
- All animation is disabled under `prefers-reduced-motion`.
- No images to download in the default build, so first load is ~102 kB of shared
  JS and the pages are static HTML.
