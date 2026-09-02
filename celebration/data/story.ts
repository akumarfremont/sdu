import type { GalleryItem, TimelineMilestone } from "./types";

/**
 * The family story. Everything here is a placeholder — replace the words
 * with the real ones, and add `image: "/images/…"` to any milestone once
 * you have a photograph for it.
 */
export const story = {
  heading: "Fifty Years of Sharda & Manoj",
  standfirst:
    "Married in 1976, in a ceremony that ran three hours late because the barat stopped for jalebis. Five decades, two children, five grandchildren and one very well-fed extended family later, here we all are.",
  paragraphs: [
    "They met the way most people did then — through families, over tea, with a great many relatives pretending not to listen from the next room. She thought he talked too much. He agreed, and talked more.",
    "The first years were small ones: a rented flat, one scooter between them, and a rule that whatever happened during the day, dinner was eaten together. That rule has survived fifty years, three cities, two businesses and every argument either of them can remember.",
    "What they built is not really a house. It is a standing invitation — to cousins, neighbours, colleagues, strangers who came once for lunch and somehow never left the family. Anyone who has sat at their table knows exactly what this week is for.",
  ],
  quote: {
    text: "We never planned fifty years. We only ever planned dinner.",
    attribution: "Manoj, when asked for the secret",
  },
  family: [
    { role: "Children", names: "Names to be added" },
    { role: "Grandchildren", names: "Names to be added" },
    { role: "Hosted by", names: "The Maheshwari family" },
  ],
};

export const timeline: TimelineMilestone[] = [
  { year: "1976", title: "The wedding", body: "A winter wedding, a late barat, and a photograph nobody can find the negative of." },
  { year: "1979", title: "The first home", body: "A rented flat, one scooter, and the dinner-together rule that has never once been broken." },
  { year: "1982", title: "A family begins", body: "The first of two children, and the beginning of a decade measured in school runs." },
  { year: "1988", title: "The first antakshari", body: "Started at a family wedding, still running, still disputed." },
  { year: "1994", title: "The move", body: "A new city, a new business, and a house with a door that was never locked." },
  { year: "2001", title: "Weddings of their own", body: "The children marry, and the table gets longer for the first time." },
  { year: "2006", title: "Grandchildren", body: "The first grandchild arrives and the household rules are quietly rewritten." },
  { year: "2013", title: "The farm", body: "A piece of land, a plan for a vegetable patch, and a project that never quite finished." },
  { year: "2019", title: "Forty-three and counting", body: "The first full-family week at the farm — the rehearsal for this one." },
  { year: "2026", title: "Fifty years", body: "Seven days, one family, and the celebration you are reading about now." },
];

/**
 * Gallery placeholders. Add `src: "/images/gallery/your-photo.jpg"` to any
 * item and it renders the real photograph instead of the tinted placeholder.
 * Drop the files into `public/images/gallery/`.
 */
export const galleryAlbums = ["Wedding, 1976", "Early Years", "The Family", "Recent"];

export const gallery: GalleryItem[] = [
  { id: "g1", album: "Wedding, 1976", caption: "The wedding day, December 1976", tint: "#EFB65B" },
  { id: "g2", album: "Wedding, 1976", caption: "The barat, three hours late", tint: "#C4596A" },
  { id: "g3", album: "Wedding, 1976", caption: "The pheras", tint: "#744C74" },
  { id: "g4", album: "Wedding, 1976", caption: "Both families, one frame", tint: "#1F8079" },
  { id: "g5", album: "Early Years", caption: "The first flat, 1979", tint: "#A8BE84" },
  { id: "g6", album: "Early Years", caption: "The scooter years", tint: "#E49A2B" },
  { id: "g7", album: "Early Years", caption: "First birthday, 1983", tint: "#EDAFB6" },
  { id: "g8", album: "Early Years", caption: "Summer holidays, mid-eighties", tint: "#94CBC6" },
  { id: "g9", album: "The Family", caption: "The table, extended", tint: "#B8912F" },
  { id: "g10", album: "The Family", caption: "Grandchildren, all five", tint: "#9D739A" },
  { id: "g11", album: "The Family", caption: "Diwali at the house", tint: "#DC7C88" },
  { id: "g12", album: "The Family", caption: "The antakshari, still disputed", tint: "#6E8A4A" },
  { id: "g13", album: "Recent", caption: "The farm, first winter", tint: "#4FA8A2" },
  { id: "g14", album: "Recent", caption: "Breakfast under the pergola", tint: "#F6D293" },
  { id: "g15", album: "Recent", caption: "Forty-nine years", tint: "#C6A9C0" },
  { id: "g16", album: "Recent", caption: "Waiting for everyone to arrive", tint: "#A03F51" },
];
