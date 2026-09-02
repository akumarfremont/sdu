import type { GuestInfoSection } from "./types";

export const guestInfoIntro = {
  heading: "Everything practical, in one place",
  body:
    "Most guests join for the 25th, 26th and 27th — the three main celebration days. The 22nd to the 24th are quieter days at the farm for family and early arrivals, and the 28th is primarily a departure day with the final morning session and the bhandara lunch.",
};

export const guestInfoSections: GuestInfoSection[] = [
  {
    id: "arrival",
    title: "Arrival",
    icon: "arrival",
    summary: "Welcome desk at the Main House porch, open 9 AM to 9 PM daily.",
    points: [
      "Rooms are ready from 12 noon. Arrive earlier and we will hold your bags and pour you a chai.",
      "The nearest airport is roughly 90 minutes away; the railway station is about 60 minutes.",
      "Send us your flight or train details on the RSVP form and a car will be waiting with your name on it.",
      "Drivers should follow signs for the Farm Gate, not the service entrance.",
    ],
  },
  {
    id: "departure",
    title: "Departure",
    icon: "departure",
    summary: "Check-out by 11 AM on the 28th; luggage can be stored at the Main House.",
    points: [
      "The final morning session runs 9:30 – 11:30 AM, followed by the bhandara lunch at 12:30 PM.",
      "Airport and station cars run continuously from 2 PM onwards on the 28th.",
      "Allow 90 minutes to the airport and 60 to the station, plus a buffer for the highway.",
      "Please collect your prasad packet from the welcome desk before you leave.",
    ],
  },
  {
    id: "hotel-transport",
    title: "Hotel Transportation",
    icon: "transport",
    summary: "Shuttles run between the partner hotels and the farm all week.",
    points: [
      "Shuttles leave the hotel lobbies at 8:00 AM, 12:30 PM and 5:30 PM.",
      "Return shuttles leave the farm at 3:00 PM, 10:30 PM and 12:15 AM.",
      "On the 26th and 27th an extra late return runs at 1:15 AM.",
      "Cars can be requested at any time from the transport desk beside the welcome desk.",
    ],
  },
  {
    id: "parking",
    title: "Parking & Valet",
    icon: "parking",
    summary: "Self-parking is signposted from the gate; valet runs on the main evenings.",
    points: [
      "Attendants are on duty at the parking area from 7 AM to midnight.",
      "Valet operates at the porch on the evenings of the 25th, 26th and 27th.",
      "Guest drop-off is under the covered porch — the easiest point for elders.",
      "Please do not leave valuables in parked cars; the farm cannot take responsibility for them.",
    ],
  },
  {
    id: "weather",
    title: "Weather",
    icon: "weather",
    summary: "Warm, dry afternoons around 26°C; evenings drop to 11–13°C.",
    points: [
      "Late November is the best weather of the year here — bright days and genuinely cold nights.",
      "Every evening event is outdoors. A shawl, stole or light jacket is not optional after 8 PM.",
      "The winter sun is stronger than it feels. Sunscreen and a hat from mid-morning.",
      "Rain is very unlikely, but there is covered seating at every venue if it appears.",
    ],
  },
  {
    id: "packing",
    title: "What to Pack",
    icon: "packing",
    summary: "Indian wear for the evenings, comfort for the mornings, a warm layer for both.",
    points: [
      "Traditional Indian dress for the Bhagwat afternoons — something you can sit cross-legged in.",
      "One bright, colourful outfit for the garba on the 26th, and one festive outfit for the 27th.",
      "Activewear for yoga, zumba and the courts. Closed sports shoes for cricket and skating.",
      "A shawl or pashmina, sunglasses, a hat, sunscreen, and any regular medication.",
      "Slip-on footwear will save you a hundred small annoyances over the week.",
    ],
  },
  {
    id: "footwear",
    title: "Footwear",
    icon: "footwear",
    summary: "Shoes come off in a lot of places. Plan for it.",
    points: [
      "Shoes off at the Bhagwat carpet, the wellness zone and the puja areas.",
      "The lawns are soft — flats, mojris and block heels travel much better than stilettos.",
      "Closed shoes for the gardens, the cow shed and everything in the sports zone.",
      "Helmets and pads are provided at the skating area; skates come in most sizes.",
    ],
  },
  {
    id: "meals",
    title: "Meals",
    icon: "meals",
    summary: "Pure vegetarian and alcohol-free, with Jain and satvik counters at every service.",
    points: [
      "Breakfast 8:00 – 10:00, lunch 12:30 – 2:00, tea 5:30 – 6:15, dinner from 8:00 PM onwards.",
      "Timings shift on the main evenings — check the day's schedule.",
      "Jain and satvik (no onion, no garlic) counters are signed at every meal.",
      "Tell us about allergies on the RSVP form and the kitchen will plan around them.",
    ],
  },
  {
    id: "children",
    title: "Children",
    icon: "children",
    summary: "Supervised Kids' Corner every afternoon, plus games, skating and carnival stalls.",
    points: [
      "The Kids' Corner runs 2:00 – 5:30 PM daily for ages 3–11, with two carers.",
      "Sign up at the welcome desk each morning so we can staff it properly.",
      "Highchairs, a children's food counter and cut fruit are available at every meal.",
      "The property is fenced and gated, but the water feature is unfenced — please keep an eye on toddlers.",
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    icon: "accessibility",
    summary: "Step-free routes to every main venue, chair seating everywhere.",
    points: [
      "Step-free paths connect the porch, the Bhagwat area, the dining area and the back lawn.",
      "Chair seating is set out at every session, including the Bhagwat and the evening programmes.",
      "Two wheelchairs and a golf buggy are available — ask at the welcome desk.",
      "Accessible washrooms are beside the Main House and the dining area.",
      "Tell us on the RSVP if you would like a room closest to the main lawn.",
    ],
  },
  {
    id: "transportation",
    title: "Getting Around",
    icon: "shuttle",
    summary: "A golf buggy loops the property continuously from 7 AM to midnight.",
    points: [
      "Flag the buggy anywhere on the main path, or ask at the welcome desk.",
      "The far corners — sports zone, nursery, walking loop — are a five-minute walk from the house.",
      "Paths are lit after dark, but a phone torch is useful on the garden edges.",
    ],
  },
  {
    id: "sightseeing",
    title: "Local Sightseeing",
    icon: "sightseeing",
    summary: "The organised excursion is on the 24th; cars can be arranged on other days.",
    points: [
      "The guided old city and fort excursion runs on the morning of the 24th — book in advance.",
      "The fort, the stepwell and the bazaar are all within an hour's drive.",
      "Cars with drivers can be arranged through the transport desk with a day's notice.",
      "Block prints, bangles, mojris and blue pottery are the things worth carrying home.",
    ],
  },
  {
    id: "emergency",
    title: "Help & Emergencies",
    icon: "emergency",
    summary: "The farm desk is staffed 24 hours. A doctor is on call.",
    points: [
      "The welcome desk is staffed through the night on the 25th, 26th and 27th.",
      "A doctor is on call and can reach the farm within about twenty minutes.",
      "A first-aid station is at the Main House, and a second one at the sports zone.",
      "Save the farm desk number in your phone before you arrive.",
    ],
  },
];
