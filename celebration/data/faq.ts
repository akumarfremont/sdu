import type { FaqItem } from "./types";

export const faqs: FaqItem[] = [
  {
    id: "which-days",
    topic: "Planning",
    question: "I can only come for part of the week. Which days should I choose?",
    answer:
      "The 25th, 26th and 27th. Those are the three main guest days — the bhajan evening, the garba and cake cutting, and the closing celebration. If you can add a fourth, arrive on the evening of the 24th so you are settled before the 25th begins.",
  },
  {
    id: "bhagwat-newcomer",
    topic: "Bhagwat",
    question: "I have never been to a Bhagwat. Will I be lost?",
    answer:
      "Not at all, and nobody expects you to follow every reference. It is told as a story rather than a lecture, people come and go throughout the afternoon, and sitting quietly at the back for half an hour is a perfectly normal way to attend.",
  },
  {
    id: "bhagwat-length",
    topic: "Bhagwat",
    question: "Do I have to stay for the whole afternoon?",
    answer:
      "No. Three and a half hours is a long sit, and guests drift in and out constantly. There is a break around 3:45 PM if you would like a natural moment to step away.",
  },
  {
    id: "seating",
    topic: "Bhagwat",
    question: "Is there chair seating? I cannot sit on the floor.",
    answer:
      "Yes — chairs are set out along the back and both sides of the canopy at every session, and the family will happily find you one if the row looks full.",
  },
  {
    id: "food-jain",
    topic: "Food",
    question: "Is there Jain food?",
    answer:
      "At every single meal, cooked in a separate section of the kitchen with separate utensils and served from its own counter, signed in green. The satvik counter, cooked without onion or garlic, runs alongside it.",
  },
  {
    id: "alcohol",
    topic: "Food",
    question: "Is alcohol served?",
    answer:
      "No. The celebration is entirely alcohol-free and pure vegetarian throughout the week.",
  },
  {
    id: "allergies",
    topic: "Food",
    question: "I have an allergy. What should I do?",
    answer:
      "Tell us on the RSVP form and the kitchen will plan around it. It also helps to mention it again at the counter on the first day so the service staff know your face.",
  },
  {
    id: "what-to-wear",
    topic: "Dress",
    question: "What do I actually need to bring?",
    answer:
      "Indian traditional wear for the Bhagwat afternoons, one bright outfit for the garba on the 26th, one festive outfit for the 27th, activewear for the mornings and a warm layer for every evening. Full guidance is on the Dress Code page.",
  },
  {
    id: "kids",
    topic: "Children",
    question: "Is there anything for young children?",
    answer:
      "A great deal. Supervised Kids' Corner every afternoon for ages 3–11, plus skating, carnival games, kite flying, matki stacking, the cow shed and caterpillar races. Highchairs and a children's counter at every meal.",
  },
  {
    id: "wellness-booking",
    topic: "Wellness",
    question: "How do I book a massage or shirodhara?",
    answer:
      "Request it on your RSVP and we will hold a slot. Shirodhara and massage book out first — six and twenty-four slots a day respectively. Steam, acupressure and sound healing can be signed up for at the wellness desk on the day.",
  },
  {
    id: "excursion",
    topic: "Planning",
    question: "Can I still join the excursion if I arrive on the 24th?",
    answer:
      "The coach leaves at 9:15 AM on the 24th, so only if you arrive the night before. Cars with drivers can be arranged through the transport desk on any other day with a day's notice.",
  },
  {
    id: "transport",
    topic: "Travel",
    question: "How do I get between the hotel and the farm?",
    answer:
      "Shuttles run three times a day each way, with extra late returns on the 26th and 27th. Cars can also be requested at any time from the transport desk. Full timings are on the Guest Information page.",
  },
  {
    id: "gifts",
    topic: "Planning",
    question: "What about gifts?",
    answer:
      "Your presence is genuinely the whole point, and Sharda and Manoj have asked us to say so plainly. If you would still like to mark the occasion, a note or a photograph for the memory table means far more than anything wrapped.",
  },
  {
    id: "photos",
    topic: "Planning",
    question: "Where will the photographs be shared?",
    answer:
      "A shared album goes up after the week and the link will be added to the Gallery page here. If you take something lovely, please send it in — most of the best pictures every year come from guests.",
  },
  {
    id: "rsvp-change",
    topic: "Planning",
    question: "Can I change my RSVP later?",
    answer:
      "Yes, up to a week before. Simply submit the form again with your updated details, or call the guest coordination number on the Guest Information page.",
  },
];

export const faqTopics = Array.from(new Set(faqs.map((faq) => faq.topic)));
