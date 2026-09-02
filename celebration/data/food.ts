import type { DayMenu, FoodStation } from "./types";

/**
 * Food. `stations` describe the counters that run all week;
 * `menus` are per-day and can be filled in closer to the date —
 * leave an array empty and the site simply shows "menu to follow".
 */
export const foodIntro = {
  heading: "Everything is vegetarian. Nothing is rushed.",
  body: [
    "The whole week is pure vegetarian and alcohol-free. Most of what reaches the table is grown a few hundred metres from it — the winter greens, the tomatoes, the herbs and the guavas all come out of the farm's own gardens.",
    "Every meal has a Jain counter and a satvik counter alongside the regular vegetarian service, all clearly signed. On Bhagwat days the satvik counter is cooked entirely without onion or garlic.",
  ],
  notes: [
    "Pure vegetarian throughout. No alcohol is served.",
    "Jain and satvik (no onion, no garlic) counters at every meal.",
    "Nut allergies and other requirements — please tell us on your RSVP.",
    "Children's counter with smaller portions and cut fruit at every service.",
  ],
};

export const foodStations: FoodStation[] = [
  {
    id: "farm-breakfast",
    name: "Breakfast at the Farm",
    blurb: "Two slow hours under the pergola, with the garden's own produce.",
    detail:
      "Poha, upma, stuffed parathas with white butter, seasonal fruit, curd, cereals and bakes made without egg. The chai counter opens at 6 AM for the early risers.",
    tags: ["Daily", "Pergola", "8:00 – 10:00"],
  },
  {
    id: "traditional-breakfast",
    name: "Traditional Indian Breakfast",
    blurb: "A rotating regional counter — a different state every morning.",
    detail:
      "Idli and sambhar one day, poori bhaji the next, then thepla and chundo, then chhole bhature on the 26th because somebody insisted.",
    tags: ["Daily", "Rotating"],
  },
  {
    id: "jain",
    name: "Jain Station",
    blurb: "A full Jain menu at every meal, cooked and served separately.",
    detail:
      "No root vegetables, prepared in a dedicated section of the kitchen with separate utensils and separate service staff. Signed in green at the near end of every counter.",
    tags: ["Every meal", "Dedicated kitchen"],
  },
  {
    id: "satvik",
    name: "Satvik Station",
    blurb: "No onion, no garlic — the counter for Bhagwat days.",
    detail:
      "Full satvik cooking throughout the week, and the entire lunch service on the 28th is satvik for the bhandara.",
    tags: ["Every meal", "No onion / garlic"],
  },
  {
    id: "rajasthani",
    name: "Rajasthan Table",
    blurb: "Dal baati churma, gatte ki sabzi, ker sangri and papad ki sabzi.",
    detail:
      "The evening speciality counter, with baatis roasted over coals in front of you and rather more ghee than anybody needs to think about.",
    tags: ["Dinner", "Dining Area"],
  },
  {
    id: "chaat",
    name: "Chaat Counter",
    blurb: "Golgappe, dahi puri, aloo tikki and a raj kachori worth queueing for.",
    detail:
      "Runs every afternoon with tea, and again before dinner on the main evenings. Jain versions available on request at the counter.",
    tags: ["Daily", "Tea time"],
  },
  {
    id: "chai",
    name: "The Chai Cart",
    blurb: "Masala, adrak, elaichi and kadak. Open from six in the morning.",
    detail:
      "Plus filter coffee, kesar milk for the children, tulsi and lemongrass infusions, and a hot ginger-honey water that the wellness team swears by.",
    tags: ["All day", "Pergola & Front Garden"],
  },
  {
    id: "dessert",
    name: "Mithai & Dessert",
    blurb: "Ghewar, malpua, rabri, jalebi and a live gulab jamun counter.",
    detail:
      "Opens half an hour after the main dinner counters each night. On the 26th there is also cake, for obvious reasons.",
    tags: ["Dinner", "Nightly"],
  },
];

export const dayMenus: DayMenu[] = [
  {
    dayId: "22",
    breakfast: ["Poha with sev", "Aloo paratha, white butter", "Seasonal fruit", "Masala chai"],
    lunch: ["Moong dal", "Lauki ki sabzi", "Phulka, jeera rice", "Boondi raita", "Besan laddoo"],
    snacks: ["Samosa", "Golgappe", "Ginger chai"],
    dinner: ["Paneer butter masala", "Dal tadka", "Naan, pulao", "Salad bar", "Gulab jamun"],
    note: "A gentle first day — nothing too heavy while everyone is still arriving.",
  },
  {
    dayId: "23",
    breakfast: ["Idli, sambhar, coconut chutney", "Upma", "Papaya and guava", "Filter coffee"],
    lunch: ["Arhar dal", "Bhindi masala", "Roti, steamed rice", "Kachumber", "Shrikhand"],
    snacks: ["Dahi puri", "Corn chaat", "Adrak chai"],
    dinner: ["Dal baati churma", "Gatte ki sabzi", "Ker sangri", "Bajra roti", "Ghewar"],
  },
  {
    dayId: "24",
    breakfast: ["Thepla with chundo", "Methi muthiya", "Cut fruit", "Elaichi chai"],
    lunch: ["Kadhi", "Aloo gobi", "Puri, rice", "Papad", "Rabri"],
    snacks: ["Aloo tikki", "Masala corn", "Lemongrass infusion"],
    dinner: ["Malai kofta", "Dal makhani", "Missi roti", "Veg biryani", "Malpua"],
  },
  {
    dayId: "25",
    breakfast: ["Poori bhaji", "Sabudana khichdi", "Fruit platter", "Masala chai"],
    lunch: ["Satvik dal", "Seasonal sabzi", "Phulka, rice", "Curd", "Kheer"],
    snacks: ["Raj kachori", "Pyaz-free kanda bhajiya", "Kesar milk"],
    dinner: ["Shahi paneer", "Dum aloo", "Laccha paratha", "Jeera rice", "Jalebi with rabri"],
    note: "Lunch is kept satvik and light — the Bhagwat runs long today.",
  },
  {
    dayId: "26",
    breakfast: ["Chhole bhature", "Moong dal chilla", "Fruit and curd", "Masala chai"],
    lunch: ["Panchmel dal", "Papad ki sabzi", "Bajra roti, rice", "Salad", "Moong dal halwa"],
    snacks: ["Chaat counter", "Dhokla", "Kadak chai"],
    dinner: ["Rajasthani thali", "Live tandoor", "Paneer tikka", "Anniversary cake", "Live gulab jamun"],
    note: "The big dinner of the week, served after the cake cutting.",
  },
  {
    dayId: "27",
    breakfast: ["Masala dosa", "Poha", "Guava and orange", "Filter coffee"],
    lunch: ["Satvik dal", "Kaddu ki sabzi", "Puri, rice", "Raita", "Rasgulla"],
    snacks: ["Pav bhaji", "Sev puri", "Tulsi infusion"],
    dinner: ["Kashmiri dum aloo", "Paneer lababdar", "Sheermal", "Hyderabadi veg biryani", "Shahi tukda"],
  },
  {
    dayId: "28",
    breakfast: ["Aloo paratha", "Poha", "Fruit", "Masala chai"],
    lunch: ["Mahaprasad thali — satvik, no onion or garlic", "Dal, sabzi, puri, rice", "Kheer", "Prasad packet to take home"],
    snacks: ["Farewell chai and mathri on the porch"],
    dinner: ["Khichdi", "Kadhi", "Seasonal sabzi", "Fruit"],
    note: "The bhandara at noon is served by the family. Please eat before you travel.",
  },
];

export const menuByDay = Object.fromEntries(
  dayMenus.map((menu) => [menu.dayId, menu]),
) as Record<string, DayMenu>;
