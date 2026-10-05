export type Testimonial = {
  name: string;
  // Title, company or both, as the client signs off.
  role: string;
  quote: string;
  // The product's live domain, shown as a chip on the card.
  site?: string;
  // Written for the client to approve. Confirm the wording with each of them
  // before this page replaces the live one.
  draft?: true;
};

// LinkedIn recommendations, trimmed to whole sentences with typos fixed.
const altaf: Testimonial = {
  name: "Altaf Ahmad",
  role: "CEO, Mirza's Construction",
  quote:
    "He was fast, reliable, and highly professional. Oliver built my website from the ground up and made sure to walk me through the process at every stage, making it simple and easy to understand. On top of that, he went above and beyond by designing and printing my business cards.",
  site: "mirzasconstruction.com",
};

const jeff: Testimonial = {
  name: "Jeff Miah",
  role: "Train with Jeffry",
  quote:
    "He approaches challenges thoughtfully, writes clean and maintainable code, and isn't afraid to dig deep to find the right solution rather than just the fastest one. You can trust him to take responsibility for his tasks and see them through to completion.",
  site: "trainwithjeffrey.com",
};

const joanne: Testimonial = {
  name: "Joanne LeBel",
  role: "Crunch Fitness",
  quote:
    "Oliver developed an outstanding inventory management app for our Crunch Fitness facility, revolutionizing how we track and manage our inventory. The app's sleek design and robust features like order printing and sales reset have significantly improved our operational efficiency.",
};

const victoria: Testimonial = {
  name: "Victoria Emem",
  role: "Wellness Operations, New York",
  quote:
    "He was very thorough with the questions he asked in the initial conversation and was great with communication along the way. Sometimes I gave him the bare minimum and he used his own creativity for content and to make it look amazing.",
};

const jonathan: Testimonial = {
  name: "Jonathan Lizama",
  role: "CEO & Founder",
  quote:
    "I have had the pleasure of working with Oliver on multiple occasions for both of my companies regarding website and SEO services. He has been a very responsive and supportive person to work with, very knowledgeable with his line of work and could not recommend him enough!",
};

const johnny: Testimonial = {
  name: "Johnny Luna",
  role: "Personal Trainer, Queens",
  quote:
    "He allocated personal time to chat and discuss my needs and wants! He sent me resources and put such a creative spin on our project! His work effort and genuine care about my website have been nothing but excellent.",
  site: "johnnyluna.com",
};

// Current clients. Drafts until each one approves the wording.
const ruben: Testimonial = {
  name: "Ruben Rivera Luis",
  role: "Altoken · DDPay",
  quote:
    "Oliver built two products for us: Altoken for tokenized real estate and DDPay for payments across Peru. He moves fast, asks the right questions about how money actually flows, and explains every tradeoff so we can decide quickly. He feels like part of the company.",
  site: "ddpay.io",
  draft: true,
};

const joseph: Testimonial = {
  name: "Joseph Czerniawski",
  role: "Magnet",
  quote:
    "Magnet had to feel calm before anyone read a word, and Oliver understood that from the first call. He turned a complex care model into something gentle and simple to use, and he sweats the small details that make people trust a product with their mental health.",
  site: "magnet.care",
  draft: true,
};

const martha: Testimonial = {
  name: "Martha McHugh",
  role: "State Senate campaign, 2026",
  quote:
    "Oliver built our campaign site on a tight timeline and made it feel like it belonged in a much bigger race. My team updates news and events on their own, and when we need something changed, he turns it around fast.",
  draft: true,
};

const ninette: Testimonial = {
  name: "Ninette Diogene",
  role: "Croix Technologies · Bon Gou Foods",
  quote:
    "Oliver has built for both of my businesses: a payments product at Croix Technologies and online ordering for Bon Gou Foods. Two completely different worlds, and he got both right. Clear communication, thoughtful design, and he always delivers what he promises.",
  site: "bongoufoods.com",
  draft: true,
};

const benjamin: Testimonial = {
  name: "Benjamin Kosten",
  role: "Quip · bed.gg · Gambit Dev",
  quote:
    "Oliver has shipped across Quip, bed.gg and Gambit Dev. Real-time games, payments, polished front ends: he handles all of it with the same care. When something is hard, he's the engineer I hand it to.",
  site: "quip.gg",
  draft: true,
};

// Two marquee rows running in opposite directions. Long and short quotes
// alternate so neither row bunches up.
export const rows: Testimonial[][] = [
  [altaf, ruben, victoria, joseph, jeff, martha],
  [joanne, benjamin, johnny, ninette, jonathan],
];
