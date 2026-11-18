/* ============================================================
   VERTICALS — categories with guided questions (facets).
   Each option carries a hard filter (must) and/or a soft score,
   read from product attributes on window.PRODUCTS. English UI.
   Shape expected by engine.js + survey.js.
   ============================================================ */
window.VERTICALS = [
  {
    id: "air-fryers",
    name: "Air fryers",
    singular: "air fryer",
    short: "Air fryers for every kitchen",
    keywords: "air fryer, air fryers, airfryer, air-fryer, air frying, dual basket air fryer, ninja air fryer",
    facets: [
      {
        id: "people",
        question: "How many people do you usually cook for?",
        options: [
          { id: "12", label: "1 to 2", reason: "one or two people",
            score: p => (p.footprint === "small" ? 4 : 0) + (p.baskets === 1 ? 1 : 0) },
          { id: "34", label: "3 to 4", reason: "three or four people",
            score: p => ((p.litres >= 5 && p.litres <= 8) ? 4 : 0) + (p.people >= 3 ? 2 : 0) },
          { id: "5plus", label: "5 or more", reason: "five or more people",
            must: p => p.litres >= 7 },
        ],
      },
      {
        id: "together",
        question: "Do you want to cook two things at once (a main and a side together)?",
        options: [
          { id: "yes", label: "Yes, two things at once", reason: "cooking two things at once",
            must: p => p.baskets === 2 },
          { id: "no", label: "No, one at a time is fine", reason: "cooking one at a time",
            score: p => (p.baskets === 1 ? 3 : 0) },
        ],
      },
      {
        id: "space",
        question: "How much worktop space can you give it?",
        options: [
          { id: "tight", label: "Not much, keep it compact", reason: "tight on worktop",
            score: p => (p.footprint === "small" ? 5 : 0) },
          { id: "plenty", label: "Plenty of space", reason: "plenty of worktop",
            score: p => 0 },
        ],
      },
    ],
  },
  {
    id: "cordless-vacuums",
    name: "Cordless vacuums",
    singular: "cordless vacuum",
    short: "Cordless vacuums for every home",
    keywords: "cordless vacuum, cordless vacuums, stick vacuum, vacuum cleaner, cordless hoover, dyson, shark cordless, handheld vacuum",
    facets: [
      {
        id: "home",
        question: "How big is your home?",
        options: [
          { id: "flat", label: "A flat or small place", reason: "a flat or small place",
            score: p => (p.weightKg <= 2.7 ? 2 : 0) },
          { id: "house", label: "A 2 to 3 bed house", reason: "a 2 to 3 bed house",
            score: p => (p.runtime >= 45 ? 4 : 0) },
          { id: "big", label: "A big house, lots of floor", reason: "a big house",
            must: p => p.runtime >= 50 },
        ],
      },
      {
        id: "pets",
        question: "Have you got pets or long hair in the house?",
        options: [
          { id: "yes", label: "Yes, pets or long hair", reason: "pets or long hair",
            must: p => p.petHair === true },
          { id: "no", label: "No", reason: "no pets",
            score: p => 0 },
        ],
      },
      {
        id: "weight",
        question: "Does weight matter (lots of stairs, or reaching up high)?",
        options: [
          { id: "light", label: "Yes, keep it light", reason: "light to carry",
            score: p => (p.weightKg <= 2 ? 6 : (p.weightKg <= 2.7 ? 3 : 0)) },
          { id: "nomatter", label: "Not really", reason: "weight not an issue",
            score: p => 0 },
        ],
      },
    ],
  },
];
