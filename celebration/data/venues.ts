import type { VenueZone } from "./types";

/**
 * Areas of the property. `map.x` / `map.y` are percentages inside the
 * stylised map box in components/VenueMap.tsx — nudge them to reposition
 * a pin. When a real property map is ready, drop the image into
 * `public/images/venue-map.jpg` and set `venueMapImage` below; the pins
 * keep working on top of it.
 */
export const venueMapImage: string | null = null;

export const venueZones: VenueZone[] = [
  {
    id: "main-house",
    name: "Main House",
    description: "The heart of the farm. Welcome desk, lost property and a quiet sitting room with tea all day.",
    kind: "indoor",
    map: { x: 50, y: 46 },
    note: "Step-free entrance from the front porch.",
  },
  {
    id: "front-garden",
    name: "Front Garden",
    description: "Marigold beds and a shaded lawn — where the mornings begin and guests are welcomed.",
    kind: "outdoor",
    map: { x: 30, y: 62 },
  },
  {
    id: "waterfall-stage",
    name: "Waterfall Stage",
    description: "The main performance stage, set against the water wall and lit after sundown.",
    kind: "outdoor",
    map: { x: 72, y: 30 },
    note: "Seating on cushions in front, chairs along the sides.",
  },
  {
    id: "pergola",
    name: "Pergola",
    description: "A vine-covered walkway of long tables — chai, chaat and long conversations.",
    kind: "outdoor",
    map: { x: 62, y: 55 },
  },
  {
    id: "bhagwat-area",
    name: "Bhagwat Area",
    description: "A shaded canopy with the vyas peeth at the centre. Floor seating with bolsters, chairs at the back.",
    kind: "outdoor",
    map: { x: 41, y: 26 },
    note: "Shoes off at the edge of the carpet. Shawls available.",
  },
  {
    id: "back-lawn",
    name: "Back Lawn",
    description: "The big open lawn — garba, dandiya, kite flying and cricket all happen here.",
    kind: "outdoor",
    map: { x: 78, y: 68 },
  },
  {
    id: "dining-area",
    name: "Dining Area",
    description: "Covered dining with Jain, satvik and regular vegetarian counters clearly signed.",
    kind: "outdoor",
    map: { x: 50, y: 76 },
    note: "Highchairs and a children's counter at the near end.",
  },
  {
    id: "wellness-zone",
    name: "Wellness Zone",
    description: "Therapy rooms, steam, mud and hydro treatments, and the sound-healing tent.",
    kind: "indoor",
    map: { x: 20, y: 36 },
    note: "Please arrive ten minutes before your slot.",
  },
  {
    id: "sports-zone",
    name: "Sports Zone",
    description: "Nets, bats, rackets and the equipment shed. Sign out what you need and return it by dusk.",
    kind: "outdoor",
    map: { x: 88, y: 46 },
  },
  {
    id: "pickleball-court",
    name: "Pickleball Court",
    description: "One full court with paddles and balls. Doubles ladder pinned to the fence.",
    kind: "outdoor",
    map: { x: 90, y: 34 },
  },
  {
    id: "skating-area",
    name: "Skating Area",
    description: "Smooth apron behind the sports zone. Skates and pads in a range of sizes.",
    kind: "outdoor",
    map: { x: 86, y: 58 },
    note: "Helmets required for under-16s.",
  },
  {
    id: "nursery",
    name: "Nursery",
    description: "Rows of saplings and flowering pots. The naturalist walk starts from the gate here.",
    kind: "outdoor",
    map: { x: 14, y: 58 },
  },
  {
    id: "vegetable-garden",
    name: "Vegetable Garden",
    description: "Winter greens, tomatoes and herbs — much of what reaches the breakfast table.",
    kind: "outdoor",
    map: { x: 16, y: 74 },
  },
  {
    id: "fruit-garden",
    name: "Fruit Garden",
    description: "Guava, ber and citrus. Shady in the afternoon and full of birds at first light.",
    kind: "outdoor",
    map: { x: 30, y: 12 },
  },
  {
    id: "walking-loop",
    name: "Walking Loop",
    description: "A level 1.2 km path around the property edge. Roughly eighteen unhurried minutes.",
    kind: "outdoor",
    map: { x: 62, y: 12 },
  },
  {
    id: "parking",
    name: "Parking",
    description: "Signposted from the main gate, with attendants on duty from 7 AM to midnight.",
    kind: "service",
    map: { x: 8, y: 88 },
  },
  {
    id: "valet",
    name: "Valet",
    description: "Hand your keys at the porch on the 25th, 26th and 27th evenings.",
    kind: "service",
    map: { x: 22, y: 92 },
  },
  {
    id: "guest-drop-off",
    name: "Guest Drop-Off",
    description: "Covered porch right by the welcome desk — the easiest arrival point for elders.",
    kind: "service",
    map: { x: 38, y: 92 },
    note: "Wheelchair available on request.",
  },
];

export const venueById = Object.fromEntries(
  venueZones.map((zone) => [zone.id, zone]),
) as Record<string, VenueZone>;
