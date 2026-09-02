import type { DressCode } from "./types";

/**
 * Dress guidance. Every activity points at one of these by id, so changing
 * a description here updates it everywhere on the site.
 * These are friendly suggestions — edit freely.
 */
export const dressCodes: DressCode[] = [
  {
    id: "bhagwat",
    name: "Bhagwat",
    summary: "Indian traditional",
    detail:
      "Kurta pyjama, dhoti, saree or salwar kameez. Shoulders covered and something easy to sit cross-legged in. A light shawl is useful once the shade cools.",
    palette: ["#F6EEE1", "#EFB65B", "#CBE5E2", "#E5D7E2"],
    footwear: "Slip-on sandals or chappals — shoes come off at the carpet.",
    tips: [
      "Loose, breathable fabrics are far more comfortable over three hours.",
      "A stole or dupatta doubles as a head covering if you would like one.",
    ],
    appliesTo: "Afternoon Bhagwat sessions, daily",
  },
  {
    id: "bhajan",
    name: "Bhajan Evening",
    summary: "Festive Indian casual",
    detail:
      "Comfortable, relaxed Indian wear in soft colours. Nothing formal — this is an evening spent sitting close together on cushions and rugs.",
    palette: ["#FBE8C6", "#CBE5E2", "#F7D9DC", "#FDFAF4"],
    footwear: "Flat and easy to slip off.",
    tips: ["Bring a shawl — the evening cools quickly after 8 PM."],
    appliesTo: "Evening of the 25th",
  },
  {
    id: "garba",
    name: "Garba & Dandiya",
    summary: "Colourful traditional Indian attire",
    detail:
      "Chaniya choli, kediyu, bandhani, mirror work — the brighter the better. Anything you can spin in. Dupattas pinned rather than draped.",
    palette: ["#C4596A", "#E49A2B", "#1F8079", "#744C74"],
    footwear: "Mojris, juttis or bare feet on the lawn. Avoid heels on grass.",
    tips: [
      "Dandiya sticks are provided at the edge of the lawn.",
      "Tie back long dupattas and jewellery before the circles start.",
    ],
    appliesTo: "Evening of the 26th",
  },
  {
    id: "anniversary",
    name: "Anniversary Evening",
    summary: "Festive & elegant Indian attire",
    detail:
      "The dressiest evening of the week. Silk, brocade, sherwani, lehenga or a well-cut Indian formal — whatever makes you feel like celebrating.",
    palette: ["#3B2141", "#B8912F", "#7B2C3C", "#F6EEE1"],
    footwear: "Anything you can stand and dance in for a few hours.",
    tips: [
      "Family photographs are taken at 7:15 PM, before dinner.",
      "The lawn is soft underfoot — block heels travel better than stilettos.",
    ],
    appliesTo: "Evening of the 27th",
  },
  {
    id: "wellness",
    name: "Wellness",
    summary: "Comfortable activewear",
    detail:
      "Loose cotton or stretch layers you can move and fold in. Therapies are done in provided robes, so come in something easy to change out of.",
    palette: ["#CBE5E2", "#FDFAF4", "#E3EBD4", "#EADFCC"],
    footwear: "Bare feet on the mats. Slip-ons to walk over.",
    tips: [
      "Mornings on the lawn are cool — a light layer you can shed helps.",
      "Hair tied back for pranayama and sound sessions.",
    ],
    appliesTo: "Yoga, pranayama, therapies and sound healing",
  },
  {
    id: "casual",
    name: "Morning & Daytime",
    summary: "Casual",
    detail:
      "Whatever you would wear for a relaxed day outdoors. Sun hat, sunglasses and a light layer for the shade.",
    palette: ["#EADFCC", "#A8BE84", "#FBE8C6", "#FDFAF4"],
    footwear: "Closed shoes for the garden and sports areas.",
    tips: ["Sunscreen from 10 AM — the winter sun is deceptive."],
    appliesTo: "Breakfast, walks, garden activities, excursions",
  },
  {
    id: "sports",
    name: "Sports & Games",
    summary: "Activewear and closed shoes",
    detail:
      "Sports clothes and trainers. Skating and cricket both need proper shoes rather than sandals.",
    palette: ["#E3EBD4", "#FDFAF4", "#94CBC6", "#EADFCC"],
    footwear: "Closed sports shoes — mandatory on the court and the skating apron.",
    tips: ["Pads and helmets are provided at the skating area."],
    appliesTo: "Cricket, pickleball, skating, carnival games",
  },
  {
    id: "holi",
    name: "Phoolon Ki Holi",
    summary: "Whites and colours you don't mind",
    detail:
      "Only flower petals are used, but petals stain a little. White or pale cotton looks wonderful in the photographs and washes clean.",
    palette: ["#FDFAF4", "#EFB65B", "#F7D9DC", "#A8BE84"],
    footwear: "Something washable, or bare feet on the grass.",
    tips: ["A change of clothes back in your room is a good idea."],
    appliesTo: "Morning of the 27th",
  },
];

export const dressCodeById = Object.fromEntries(
  dressCodes.map((code) => [code.id, code]),
) as Record<string, DressCode>;
