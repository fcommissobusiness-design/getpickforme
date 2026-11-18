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
  {
    id: "robot-vacuums",
    name: "Robot vacuums",
    singular: "robot vacuum",
    short: "Robot vacuums for every home",
    keywords: "robot vacuum, robot vacuums, robot hoover, robovac, robotic vacuum, roomba, roborock, eufy robot, self-emptying robot vacuum, robot mop",
    facets: [
      {
        id: "budget",
        question: "What's your budget?",
        options: [
          { id: "u300", label: "Under £300", reason: "under £300",
            must: p => p.price <= 300 },
          { id: "u600", label: "£300 to £600", reason: "£300 to £600",
            must: p => p.price <= 600 },
          { id: "any", label: "Best one, price aside", reason: "the best regardless of price",
            score: p => 0 },
        ],
      },
      {
        id: "station",
        question: "Do you want a dock that empties itself?",
        options: [
          { id: "yes", label: "Yes, self-emptying dock", reason: "a self-emptying dock",
            must: p => p.selfEmpty === true },
          { id: "no", label: "Not fussed, I'll empty it", reason: "happy to empty it yourself",
            score: p => 0 },
        ],
      },
      {
        id: "clean",
        question: "Pets or thick carpet to deal with?",
        options: [
          { id: "yes", label: "Yes, pets or thick carpet", reason: "pets or thick carpet",
            score: p => (p.suction >= 20000 ? 6 : (p.suction >= 12000 ? 3 : 0)) },
          { id: "no", label: "Mostly hard floors", reason: "mostly hard floors",
            score: p => 0 },
        ],
      },
    ],
  },
  {
    id: "dehumidifiers",
    name: "Dehumidifiers",
    singular: "dehumidifier",
    short: "Dehumidifiers for every home",
    keywords: "dehumidifier, dehumidifiers, dehumidify, damp, condensation, mould, mold, drying clothes, drying washing, meaco, pro breeze, ecoair, desiccant, compressor dehumidifier",
    facets: [
      {
        id: "space",
        question: "Where will it mostly run?",
        options: [
          { id: "heated", label: "Heated rooms (a normal home)", reason: "a normal heated home",
            score: p => (p.type === "compressor" ? 4 : 0) },
          { id: "cold", label: "A cold or unheated space (garage, conservatory, caravan)", reason: "a cold or unheated space",
            must: p => p.type === "desiccant" },
        ],
      },
      {
        id: "size",
        question: "How much space, and how bad is the damp?",
        options: [
          { id: "room", label: "One room or a small flat", reason: "one room or a small flat",
            score: p => (p.capLpd <= 12 ? 3 : 0) },
          { id: "home", label: "A typical 2 to 3 bed home", reason: "a typical home",
            score: p => (p.capLpd >= 16 && p.capLpd <= 20 ? 4 : (p.capLpd > 12 ? 2 : 0)) },
          { id: "big", label: "A big or very damp house", reason: "a big or very damp house",
            score: p => (p.capLpd >= 30 ? 6 : (p.capLpd >= 20 ? 3 : 0)) },
        ],
      },
      {
        id: "laundry",
        question: "Will you use it to dry washing indoors?",
        options: [
          { id: "yes", label: "Yes, that's a big reason", reason: "drying washing indoors",
            score: p => p.dryClothes },
          { id: "no", label: "No, mainly damp and condensation", reason: "mainly damp and condensation",
            score: p => 0 },
        ],
      },
    ],
  },
];
