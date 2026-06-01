import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useRef } from "react";

export type Language = "en" | "bn";

// Each piece of question copy carries both languages. English is the default;
// Bangla (bn) is shown when the user picks Bangla at Q1 or flips the EN/বাংলা toggle.
export type Localized = { en: string; bn: string };

export type QuestionType = {
  id: number;
  tagline: Localized;
  question: Localized;
  options: Localized[];
  condition?: (answers: Record<number, string>) => boolean;
};

// A question with every Localized field already collapsed to a single language.
export type ResolvedQuestion = {
  id: number;
  tagline: string;
  question: string;
  options: string[];
};

export const questions: QuestionType[] = [
  {
    id: 1,
    tagline: { en: "Q1 — Language Comfort", bn: "প্রশ্ন ১ — ভাষার স্বাচ্ছন্দ্য" },
    question: {
      en: "Before we start — which language feels **more comfortable** for you to chat in?",
      bn: "শুরু করার আগে — কোন ভাষায় কথা বলতে আপনার **বেশি স্বাচ্ছন্দ্য** লাগে?"
    },
    options: [
      { en: "English", bn: "ইংরেজি" },
      { en: "Bangla", bn: "বাংলা" },
      { en: "Mix both — I'll switch when I need to", bn: "দুটোই — দরকার হলে পাল্টে নেব" }
    ]
  },
  {
    id: 2,
    tagline: { en: "Q2 — Study Level", bn: "প্রশ্ন ২ — পড়ার স্তর" },
    question: {
      en: "What are you planning to **study abroad** for?",
      bn: "আপনি **বিদেশে কী পড়ার** পরিকল্পনা করছেন?"
    },
    options: [
      { en: "Bachelor's degree — my first degree", bn: "ব্যাচেলর ডিগ্রি — আমার প্রথম ডিগ্রি" },
      { en: "Master's degree", bn: "মাস্টার্স ডিগ্রি" },
      { en: "Still deciding between the two", bn: "এখনো দুটোর মধ্যে ভাবছি" }
    ]
  },
  {
    id: 3,
    tagline: { en: "Q3 — Personal Ties", bn: "প্রশ্ন ৩ — ব্যক্তিগত বন্ধন" },
    question: {
      en: "When you picture **settling into a new country**, which of these feels closest to your own situation?",
      bn: "**নতুন একটা দেশে গিয়ে থিতু হওয়ার** কথা কল্পনা করলে নিচের কোনটা আপনার নিজের পরিস্থিতির সবচেয়ে কাছাকাছি?"
    },
    options: [
      {
        en: "Someone close to me would share this move — I wouldn't be settling abroad on my own",
        bn: "আমার কাছের একজন মানুষ এই যাত্রায় সঙ্গী হবে — আমি একা বিদেশে গিয়ে থিতু হব না"
      },
      {
        en: "I'd be making this move on my own, even though loved ones at home stay close to my heart",
        bn: "আমি একাই এই যাত্রা করব, যদিও দেশে থাকা প্রিয় মানুষগুলো সবসময় মনে থাকবে"
      },
      {
        en: "It isn't fully settled yet — who joins me depends on how the next year unfolds",
        bn: "এখনো পুরোপুরি ঠিক হয়নি — কে আমার সঙ্গে যাবে তা আগামী এক বছর কীভাবে এগোয় তার উপর নির্ভর করছে"
      }
    ],
    condition: (answers) => answers[2] === "Master's degree"
  },
  {
    id: 4,
    tagline: { en: "Q4 — Yearly Budget", bn: "প্রশ্ন ৪ — বছরের বাজেট" },
    question: {
      en: "Roughly how much can your family arrange for **one full year** abroad — tuition and living costs together?",
      bn: "আপনার পরিবার বিদেশে **এক বছরের জন্য** মোটামুটি কত টাকা জোগাড় করতে পারবে — টিউশন আর থাকা-খাওয়া মিলিয়ে?"
    },
    options: [
      { en: "€1,500 – €8,000 — the most affordable path", bn: "€1,500 – €8,000 — সবচেয়ে কম খরচের পথ" },
      { en: "€8,000 – €15,000", bn: "€8,000 – €15,000" },
      { en: "€15,000 – €25,000", bn: "€15,000 – €25,000" },
      { en: "€25,000 – €40,000", bn: "€25,000 – €40,000" },
      { en: "€40,000 or more", bn: "€40,000 বা তার বেশি" },
      { en: "I'm not sure yet — show me options at every level", bn: "এখনো নিশ্চিত না — সব ধরনের অপশন দেখান" }
    ]
  },
  {
    id: 5,
    tagline: { en: "Q5 — Tuition Mindset", bn: "প্রশ্ন ৫ — টিউশন ভাবনা" },
    question: {
      en: "When you think about **tuition fees**, which sentence sounds most like you?",
      bn: "**টিউশন ফি** নিয়ে ভাবলে কোন কথাটা আপনার সঙ্গে সবচেয়ে বেশি মেলে?"
    },
    options: [
      { en: "\"I want tuition as close to free as possible.\"", bn: "“আমি চাই টিউশন যতটা সম্ভব কম, প্রায় ফ্রি হলে ভালো।”" },
      { en: "\"I'll pay a moderate fee if the country is worth it.\"", bn: "“দেশটা ভালো হলে মাঝারি ফি দিতে আমি রাজি।”" },
      { en: "\"Tuition isn't my worry — quality matters more than the price tag.\"", bn: "“টিউশন নিয়ে চিন্তা নেই — দামের চেয়ে মান বেশি জরুরি।”" }
    ]
  },
  {
    id: 6,
    tagline: { en: "Q6 — Everyday Living Cost", bn: "প্রশ্ন ৬ — দৈনন্দিন জীবনযাত্রার খরচ" },
    question: {
      en: "Picture your **daily life** abroad — rent, food, transport. What suits you best?",
      bn: "বিদেশে আপনার **প্রতিদিনের জীবন** কল্পনা করুন — বাসা ভাড়া, খাবার, যাতায়াত। কোনটা আপনার জন্য বেশি মানানসই?"
    },
    options: [
      { en: "Keep it very low — I'm happy to share a room and cook at home", bn: "যতটা সম্ভব কম — রুম শেয়ার করতে আর নিজে রান্না করতে আমার আপত্তি নেই" },
      { en: "Moderate — a simple, comfortable life is enough", bn: "মাঝারি — সাধারণ, আরামদায়ক জীবন হলেই হলো" },
      { en: "Higher is fine — I want my own space and an easy lifestyle", bn: "একটু বেশি হলেও ঠিক আছে — নিজের আলাদা জায়গা আর সহজ জীবন চাই" }
    ]
  },
  {
    id: 7,
    tagline: { en: "Q7 — Weather", bn: "প্রশ্ন ৭ — আবহাওয়া" },
    question: {
      en: "Bangladesh is warm most of the year. How do you feel about **cold, snowy winters**?",
      bn: "বাংলাদেশে প্রায় সারা বছরই গরম থাকে। **ঠান্ডা, বরফ পড়া শীত** নিয়ে আপনার অনুভূতি কেমন?"
    },
    options: [
      { en: "I'd love it — snow sounds exciting", bn: "দারুণ লাগবে — বরফ দেখতে মজাই হবে" },
      { en: "I can manage it with a good jacket", bn: "ভালো একটা জ্যাকেট থাকলে সামলে নিতে পারব" },
      { en: "I'd rather have mild, moderate weather", bn: "বরং নাতিশীতোষ্ণ, মাঝারি আবহাওয়া পছন্দ" },
      { en: "I really don't want long, harsh winters", bn: "লম্বা, কঠিন শীত আমি একদমই চাই না" }
    ]
  },
  {
    id: 8,
    tagline: { en: "Q8 — Language of Study & Daily Life", bn: "প্রশ্ন ৮ — পড়া ও দৈনন্দিন জীবনের ভাষা" },
    question: {
      en: "Studying in English is easy for you. But would you be okay living in a country where the local language **isn't English**?",
      bn: "ইংরেজিতে পড়াশোনা আপনার জন্য সহজ। কিন্তু এমন একটা দেশে থাকতে কি আপনার সমস্যা হবে যেখানে **স্থানীয় ভাষা ইংরেজি নয়**?"
    },
    options: [
      { en: "I'd prefer English everywhere — study and daily life", bn: "সব জায়গায় ইংরেজি চাই — পড়াশোনা আর প্রতিদিনের জীবন দুটোতেই" },
      { en: "English classes are a must, but a local language around me is fine", bn: "ক্লাস ইংরেজিতে হতেই হবে, তবে আশেপাশে অন্য ভাষা থাকলে সমস্যা নেই" },
      { en: "No problem at all — I'd enjoy a non-English country", bn: "একদম সমস্যা নেই — ইংরেজি নয় এমন দেশেও আমার ভালো লাগবে" }
    ]
  },
  {
    id: 9,
    tagline: { en: "Q9 — IELTS Exam Status", bn: "প্রশ্ন ৯ — IELTS পরীক্ষার অবস্থা" },
    question: {
      en: "Have you taken the **IELTS exam** yet?",
      bn: "আপনি কি এখনো **IELTS পরীক্ষা** দিয়েছেন?"
    },
    options: [
      { en: "Yes — I have already taken the IELTS and have my result", bn: "হ্যাঁ — আমি IELTS দিয়েছি এবং আমার ফলাফল আছে" },
      { en: "I haven't taken it yet", bn: "আমি এখনো এটা দিইনি" }
    ]
  },
  {
    id: 10,
    tagline: { en: "Q10 — IELTS Band Score", bn: "প্রশ্ন ১০ — IELTS ব্যান্ড স্কোর" },
    question: {
      en: "Great — what **overall band score** did you receive?",
      bn: "চমৎকার — আপনি সব মিলিয়ে কত **ওভারঅল ব্যান্ড স্কোর** পেয়েছেন?"
    },
    options: [
      { en: "Band 7.0 or above", bn: "ব্যান্ড ৭.০ বা তার বেশি" },
      { en: "Band 6.0 – 6.5", bn: "ব্যান্ড ৬.০ – ৬.৫" },
      { en: "Band 5.0 – 5.5", bn: "ব্যান্ড ৫.০ – ৫.৫" },
      { en: "Below Band 5.0", bn: "ব্যান্ড ৫.০-এর নিচে" }
    ],
    condition: (answers) => answers[9] === "Yes — I have already taken the IELTS and have my result"
  },
  {
    id: 11,
    tagline: { en: "Q11 — IELTS Test Plan", bn: "প্রশ্ন ১১ — IELTS পরিকল্পনা" },
    question: {
      en: "No problem — when are you **planning to take** the IELTS?",
      bn: "সমস্যা নেই — আপনি **কখন IELTS দেওয়ার পরিকল্পনা** করছেন?"
    },
    options: [
      { en: "Within the next 3 months", bn: "আগামী ৩ মাসের মধ্যে" },
      { en: "In about 3 to 6 months", bn: "মোটামুটি ৩ থেকে ৬ মাসের মধ্যে" },
      { en: "Later than 6 months from now", bn: "এখন থেকে ৬ মাসেরও পরে" },
      { en: "I'm not sure yet", bn: "এখনো নিশ্চিত না" }
    ],
    condition: (answers) => answers[9] === "I haven't taken it yet"
  },
  {
    id: 12,
    tagline: { en: "Q12 — Work While Studying", bn: "প্রশ্ন ১২ — পড়ার পাশাপাশি কাজ" },
    question: {
      en: "Many students **work part-time** to support themselves. How important is that for you?",
      bn: "অনেক শিক্ষার্থী পড়ার পাশাপাশি **পার্ট-টাইম কাজ** করে নিজের খরচ চালায়। এটা আপনার জন্য কতটা জরুরি?"
    },
    options: [
      { en: "Very important — I need to earn while I study", bn: "খুব জরুরি — পড়ার পাশাপাশি আমার আয় করা দরকার" },
      { en: "Helpful, but not something I depend on", bn: "কাজে লাগবে, তবে এর উপর আমি নির্ভর করছি না" },
      { en: "Not important — my funds will cover everything", bn: "জরুরি নয় — আমার টাকায় সব খরচ চলে যাবে" }
    ]
  },
  {
    id: 13,
    tagline: { en: "Q13 — Staying Long-term", bn: "প্রশ্ন ১৩ — দীর্ঘমেয়াদে থাকা" },
    question: {
      en: "**After your degree**, what feels right to you?",
      bn: "**ডিগ্রি শেষ করার পর** আপনার কাছে কোনটা ঠিক মনে হয়?"
    },
    options: [
      { en: "I'd love to settle there and build a life (PR / long-term stay)", bn: "ওখানেই থেকে যেতে চাই, জীবন গড়তে চাই (PR / দীর্ঘমেয়াদি থাকা)" },
      { en: "I'll stay if good chances come, otherwise return", bn: "ভালো সুযোগ এলে থাকব, না হলে দেশে ফিরব" },
      { en: "I plan to come back to Bangladesh", bn: "বাংলাদেশে ফিরে আসার পরিকল্পনা আছে" }
    ]
  },
  {
    id: 14,
    tagline: { en: "Q14 — University Reputation", bn: "প্রশ্ন ১৪ — বিশ্ববিদ্যালয়ের সুনাম" },
    question: {
      en: "Two real options: a **world-famous university**, or a lesser-known one that costs much less. Which pulls you more?",
      bn: "দুটো বাস্তব অপশন: একটা **বিশ্ববিখ্যাত বিশ্ববিদ্যালয়**, আর একটা কম পরিচিত কিন্তু অনেক কম খরচের। কোনটা আপনাকে বেশি টানে?"
    },
    options: [
      { en: "The famous name — reputation matters to me", bn: "বিখ্যাত নাম — আমার কাছে সুনাম গুরুত্বপূর্ণ" },
      { en: "Somewhere in between — decent reputation, fair price", bn: "মাঝামাঝি কিছু — ভালো সুনাম, যুক্তিসঙ্গত দাম" },
      { en: "The affordable one — the degree matters more than the name", bn: "কম খরচেরটা — নামের চেয়ে ডিগ্রিটাই বেশি জরুরি" }
    ]
  },
  {
    id: 15,
    tagline: { en: "Q15 — Bangladeshi Community", bn: "প্রশ্ন ১৫ — বাংলাদেশি কমিউনিটি" },
    question: {
      en: "When you land, would you like to have **other Bangladeshis** around you?",
      bn: "নতুন দেশে পৌঁছে আপনি কি আশেপাশে **আরও বাংলাদেশি মানুষ** চাইবেন?"
    },
    options: [
      { en: "Yes — a familiar community would help me settle", bn: "হ্যাঁ — পরিচিত একটা কমিউনিটি থাকলে মানিয়ে নিতে সুবিধা হবে" },
      { en: "A few would be nice, but it's not a deciding factor", bn: "কয়েকজন থাকলে ভালো, তবে এটাই মূল বিষয় নয়" },
      { en: "I'd actually prefer a fresh, totally new crowd", bn: "বরং আমি একদম নতুন পরিবেশ আর নতুন মানুষ চাই" }
    ]
  },
  {
    id: 16,
    tagline: { en: "Q16 — Learning a New Language", bn: "প্রশ্ন ১৬ — নতুন ভাষা শেখা" },
    question: {
      en: "Picture two routes to the same career goal. Route A is in an English-speaking country and costs noticeably more. Route B costs far less and has good job prospects — but for your first year you would be **learning the local language** alongside your studies. Which route would you choose?",
      bn: "একই ক্যারিয়ার লক্ষ্যে পৌঁছানোর দুটো পথ কল্পনা করুন। পথ A একটি ইংরেজিভাষী দেশে এবং খরচ লক্ষণীয়ভাবে বেশি। পথ B-তে খরচ অনেক কম আর চাকরির সুযোগও ভালো — তবে প্রথম বছর পড়াশোনার পাশাপাশি আপনাকে **স্থানীয় ভাষা শিখতে হবে**। আপনি কোন পথটি বেছে নেবেন?"
    },
    options: [
      { en: "Route B — learning a new language is a fair trade for that lower cost and opportunity", bn: "পথ B — কম খরচ আর সুযোগের জন্য একটা নতুন ভাষা শেখা যুক্তিসঙ্গত বিনিময়" },
      { en: "It depends — I'd first want to know how difficult the local language is", bn: "নির্ভর করছে — আগে জানতে চাইব স্থানীয় ভাষাটা কতটা কঠিন" },
      { en: "Route A — I'd rather not carry the extra weight of learning a new language", bn: "পথ A — নতুন ভাষা শেখার বাড়তি চাপ আমি বরং নিতে চাই না" }
    ]
  },
  {
    id: 17,
    tagline: { en: "Q17 — Comfort Zone vs. Risk", bn: "প্রশ্ন ১৭ — স্বাচ্ছন্দ্য বনাম ঝুঁকি" },
    question: {
      en: "One student chose a familiar, well-known country where everything felt predictable and safe. The other chose a newer, less obvious country with a **bigger possible payoff but more unknowns**. Whose decision feels closer to one you would make?",
      bn: "একজন শিক্ষার্থী এমন একটা পরিচিত, সুপরিচিত দেশ বেছে নিল যেখানে সবকিছু অনুমেয় আর নিরাপদ মনে হয়। আরেকজন বেছে নিল তুলনামূলক নতুন, কম পরিচিত একটা দেশ — যেখানে **সম্ভাবনা বড় কিন্তু অনিশ্চয়তাও বেশি**। কার সিদ্ধান্ত আপনার নিজের সিদ্ধান্তের বেশি কাছাকাছি?"
    },
    options: [
      { en: "The first student — I'd want a smooth, predictable journey", bn: "প্রথম শিক্ষার্থী — আমি একটা মসৃণ, অনুমেয় যাত্রা চাই" },
      { en: "Somewhere between the two — some comfort, with some new challenges", bn: "দুজনের মাঝামাঝি — কিছুটা স্বাচ্ছন্দ্য, সঙ্গে কিছু নতুন চ্যালেঞ্জ" },
      { en: "The second student — I'd take the risk if the future payoff is bigger", bn: "দ্বিতীয় শিক্ষার্থী — ভবিষ্যতের প্রাপ্তি বড় হলে আমি ঝুঁকি নেব" }
    ]
  },
  {
    id: 18,
    tagline: { en: "Q18 — A Cold Country with the Best Prospects", bn: "প্রশ্ন ১৮ — সেরা সুযোগের ঠান্ডা দেশ" },
    question: {
      en: "Imagine the country that offers you the **strongest job and PR prospects** also happens to have long, cold, snowy winters. Knowing your future could be noticeably brighter there, what would you decide?",
      bn: "কল্পনা করুন যে দেশটি আপনাকে **সবচেয়ে ভালো চাকরি আর PR-এর সুযোগ** দেয়, সেখানেই লম্বা, ঠান্ডা, বরফে ঢাকা শীত। জেনে যে ওখানে আপনার ভবিষ্যৎ লক্ষণীয়ভাবে উজ্জ্বল হতে পারে, আপনি কী সিদ্ধান্ত নেবেন?"
    },
    options: [
      { en: "I'd go — a strong future is worth a few hard winters", bn: "আমি যাব — উজ্জ্বল ভবিষ্যতের জন্য কয়েকটা কঠিন শীত মেনে নেওয়া যায়" },
      { en: "I'd hesitate — I'd need to weigh it carefully before deciding", bn: "আমি দ্বিধায় পড়ব — সিদ্ধান্তের আগে ভালোভাবে ভেবে দেখতে হবে" },
      { en: "I'd pass — comfort and climate matter too much for me to give up", bn: "আমি যাব না — আরাম আর আবহাওয়া আমার কাছে এতটাই গুরুত্বপূর্ণ যে ছাড়তে পারব না" }
    ]
  },
  {
    id: 19,
    tagline: { en: "Q19 — Lifestyle & Surroundings", bn: "প্রশ্ন ১৯ — জীবনধারা ও পরিবেশ" },
    question: {
      en: "**Outside class**, what kind of place would make you happiest?",
      bn: "**ক্লাসের বাইরে** কেমন একটা জায়গা আপনাকে সবচেয়ে বেশি খুশি রাখবে?"
    },
    options: [
      { en: "A big, busy city with lots happening", bn: "বড়, ব্যস্ত শহর — যেখানে অনেক কিছু ঘটে" },
      { en: "A calm, mid-sized town — peaceful but not boring", bn: "শান্ত, মাঝারি আকারের শহর — নিরিবিলি কিন্তু একঘেয়ে নয়" },
      { en: "Doesn't matter much — I'll adjust anywhere", bn: "খুব একটা যায়-আসে না — আমি যেকোনো জায়গায় মানিয়ে নেব" }
    ]
  },
  {
    id: 20,
    tagline: { en: "Q20 — Long-term Goal", bn: "প্রশ্ন ২০ — দীর্ঘমেয়াদি লক্ষ্য" },
    question: {
      en: "**Think 5–10 years ahead**. What does success look like for you?",
      bn: "**৫–১০ বছর পরের কথা** ভাবুন। আপনার কাছে সফলতা মানে কী?"
    },
    options: [
      { en: "A strong career and life abroad", bn: "বিদেশে শক্ত একটা ক্যারিয়ার আর জীবন" },
      { en: "International experience, then a good career back in Bangladesh", bn: "আন্তর্জাতিক অভিজ্ঞতা, তারপর দেশে ফিরে ভালো ক্যারিয়ার" },
      { en: "A globally respected degree that opens doors anywhere", bn: "বিশ্বজুড়ে সম্মানিত একটা ডিগ্রি, যা সব জায়গায় দরজা খুলে দেয়" },
      { en: "Honestly, I'm still figuring this out", bn: "সত্যি বলতে, এটা নিয়ে আমি এখনো ভাবছি" }
    ]
  },
  {
    id: 21,
    tagline: { en: "Q21 — The Deciding Factor (Tie-breaker)", bn: "প্রশ্ন ২১ — চূড়ান্ত নির্ধারক" },
    question: {
      en: "Last one! If you could keep only **ONE thing** as your top priority, what would it be?",
      bn: "শেষ প্রশ্ন! যদি শুধু **একটা জিনিসকেই** সবচেয়ে বড় অগ্রাধিকার হিসেবে রাখতে পারতেন, সেটা কী হতো?"
    },
    options: [
      { en: "Lowest possible cost", bn: "যতটা সম্ভব কম খরচ" },
      { en: "A top, well-known university", bn: "সেরা, সুপরিচিত একটা বিশ্ববিদ্যালয়" },
      { en: "The best job and PR chances", bn: "সবচেয়ে ভালো চাকরি আর PR-এর সুযোগ" },
      { en: "Comfort — climate, community, easy life", bn: "স্বাচ্ছন্দ্য — আবহাওয়া, কমিউনিটি, সহজ জীবন" },
      { en: "The richest new experience and culture", bn: "নতুন অভিজ্ঞতা আর সংস্কৃতির সবচেয়ে বড় স্বাদ" }
    ]
  }
];

// Collapse a question's bilingual fields down to one language. The English value
// of an option is always the canonical answer key, so conditions keep working
// no matter which language is on screen.
export const resolveQuestion = (q: QuestionType, lang: Language): ResolvedQuestion => ({
  id: q.id,
  tagline: q.tagline[lang],
  question: q.question[lang],
  options: q.options.map((o) => o[lang])
});

// Bilingual copy for the AI "analyzing" + destination-reveal experience (ported
// from the newer AI Studio build). English is the default; Bangla (bn) shows
// when the active `language` is "bn", matching the rest of the quiz.
const analyzingTexts: Record<Language, string[]> = {
  en: [
    "Synthesizing profile data...",
    "Evaluating academic pathways...",
    "Mapping global opportunities...",
    "Calculating visa viability...",
    "Finalizing ideal destination..."
  ],
  bn: [
    "প্রোফাইল ডেটা বিশ্লেষণ করা হচ্ছে...",
    "একাডেমিক পথগুলো যাচাই করা হচ্ছে...",
    "বিশ্বজুড়ে সুযোগগুলো খোঁজা হচ্ছে...",
    "ভিসার সম্ভাবনা হিসাব করা হচ্ছে...",
    "সেরা গন্তব্য চূড়ান্ত করা হচ্ছে..."
  ]
};

// Alternative-destination chips shown under the matched country.
export const alternativeDestinations = [
  { flag: "🇦🇺", name: "Australia",       percent: 82 },
  { flag: "🇩🇪", name: "Germany",         percent: 76 },
  { flag: "🇬🇧", name: "United Kingdom",  percent: 71 }
];

type RevealCopy = {
  processing: string;
  processingSub: string;
  calculatingMatch: string;
  analyzingDataPoints: string;
  destinationLabel: string;
  matchFound: string;
  alternativesLabel: string;
  roadmapTitle: string;
  roadmapSubtitle: string;
  liveResults: string;
  whyTitle: string; // contains a {country} placeholder
  reasons: { title: string; desc: string }[]; // desc may contain {country}
  topMatchesTitle: string;
  topMatchesBadge: string;
  topMatchesDesc: string;
  scholarshipsTitle: string;
  scholarshipsBadge: string;
  scholarshipsDesc: string;
  scholarshipItems: string[];
  visaTitle: string;
  visaBadge: string;
  visaDesc: string;
  visaSteps: string[];
  applicationTitle: string;
  applicationBadge: string;
  applicationDesc: string;
  applicationItems: string[];
  unlockTitle: string;
  unlockDesc: string;
  unlockCta: string;
};

// Bilingual strings for the analyzing core, match counter, and reveal screen.
// Shared by both QuizFlow and DemoQuiz so the two stay in sync.
export const revealContent: Record<Language, RevealCopy> = {
  en: {
    processing: "Processing",
    processingSub: "AI is finding the best country & strategy for you",
    calculatingMatch: "Calculating Profile Match",
    analyzingDataPoints: "Analyzing Data Points",
    destinationLabel: "Your Ideal Destination is",
    matchFound: "89% Match Found",
    alternativesLabel: "Alternative Destinations",
    roadmapTitle: "Your Customized Roadmap",
    roadmapSubtitle: "Tailored to your budget, academics & goals",
    liveResults: "Live Results",
    whyTitle: "Why {country} for you?",
    reasons: [
      {
        title: "High Post-Study PR Success",
        desc: "Based on your long-term goal of settling abroad, {country} offers one of the most favorable points-based immigration systems."
      },
      {
        title: "Budget Alignment",
        desc: "Your selected yearly budget closely matches the affordable tuition rates and living costs in targeted regional cities."
      },
      {
        title: "Seamless Academic Transfer",
        desc: "Your current qualifications are directly recognized by {country}'s top-tier institutions, requiring zero foundation years."
      },
      {
        title: "Vibrant Cultural Fit",
        desc: "Matches your preference for a multicultural society with a strong existing professional community network."
      },
      {
        title: "World-Class Research Facilities",
        desc: "Access to extensive funding opportunities and state-of-the-art innovation hubs that perfectly complement your academic background."
      },
      {
        title: "Exceptional ROI & Tech Ecosystem",
        desc: "A booming local industry offers abundant post-graduation placements and internships with global leading companies."
      }
    ],
    topMatchesTitle: "Top University Matches",
    topMatchesBadge: "4 Universities Found",
    topMatchesDesc: "Detailed list of universities matching your academic profile and IELTS plans.",
    scholarshipsTitle: "Matched Scholarship Opportunities",
    scholarshipsBadge: "3 Grants Found",
    scholarshipsDesc: "Need-based and merit grants you qualify for based on your budget and academic profile.",
    scholarshipItems: ["Government Merit Grant", "University Excellence Award", "International Mobility Bursary"],
    visaTitle: "Visa Route & Step-by-Step Timeline",
    visaBadge: "Tailored to You",
    visaDesc: "Full visa roadmap for your destination — documents, costs, timelines, and common rejection triggers.",
    visaSteps: ["Document checklist prepared", "Financial proof threshold", "Interview prep guide", "Post-arrival registration"],
    applicationTitle: "Your Application Action Plan",
    applicationBadge: "Ready to Execute",
    applicationDesc: "Ranked list of universities to apply to, with deadlines, fee waivers, and acceptance likelihood.",
    applicationItems: ["Priority universities with open intakes", "Fee waiver eligibility check", "SOP & LOR strategy"],
    unlockTitle: "Unlock Your Full Roadmap",
    unlockDesc: "Get immediate access to your personalized university list, hidden scholarship opportunities, application strategy, and a step-by-step visa guide.",
    unlockCta: "Unlock Masterclass & Insights"
  },
  bn: {
    processing: "বিশ্লেষণ চলছে",
    processingSub: "AI আপনার জন্য সেরা দেশ ও কৌশল খুঁজে বের করছে",
    calculatingMatch: "প্রোফাইল ম্যাচ হিসাব করা হচ্ছে",
    analyzingDataPoints: "ডেটা পয়েন্ট বিশ্লেষণ করা হচ্ছে",
    destinationLabel: "আপনার আদর্শ গন্তব্য হলো",
    matchFound: "89% ম্যাচ পাওয়া গেছে",
    alternativesLabel: "বিকল্প গন্তব্য",
    roadmapTitle: "আপনার নিজস্ব রোডম্যাপ",
    roadmapSubtitle: "আপনার বাজেট, পড়াশোনা ও লক্ষ্য অনুযায়ী সাজানো",
    liveResults: "লাইভ ফলাফল",
    whyTitle: "কেন আপনার জন্য {country}?",
    reasons: [
      {
        title: "পড়াশোনার পর উচ্চ PR সফলতা",
        desc: "বিদেশে থিতু হওয়ার আপনার দীর্ঘমেয়াদি লক্ষ্যের ভিত্তিতে, {country} সবচেয়ে সুবিধাজনক পয়েন্ট-ভিত্তিক ইমিগ্রেশন ব্যবস্থাগুলোর একটি দেয়।"
      },
      {
        title: "বাজেটের সঙ্গে মিল",
        desc: "আপনার বেছে নেওয়া বছরের বাজেট নির্দিষ্ট আঞ্চলিক শহরগুলোর সাশ্রয়ী টিউশন ফি ও জীবনযাত্রার খরচের সঙ্গে ভালোভাবে মেলে।"
      },
      {
        title: "নির্বিঘ্ন একাডেমিক ট্রান্সফার",
        desc: "আপনার বর্তমান যোগ্যতা {country}-এর শীর্ষ প্রতিষ্ঠানগুলো সরাসরি স্বীকৃতি দেয়, কোনো ফাউন্ডেশন বছরের প্রয়োজন হয় না।"
      },
      {
        title: "প্রাণবন্ত সাংস্কৃতিক মিল",
        desc: "একটি বহুসাংস্কৃতিক সমাজ ও শক্তিশালী পেশাদার কমিউনিটি নেটওয়ার্কের প্রতি আপনার পছন্দের সঙ্গে মিলে যায়।"
      },
      {
        title: "বিশ্বমানের গবেষণা সুবিধা",
        desc: "বিস্তৃত ফান্ডিং সুযোগ ও অত্যাধুনিক উদ্ভাবন কেন্দ্রে প্রবেশাধিকার, যা আপনার একাডেমিক পটভূমির সঙ্গে চমৎকারভাবে মানানসই।"
      },
      {
        title: "অসাধারণ ROI ও টেক ইকোসিস্টেম",
        desc: "ক্রমবর্ধমান স্থানীয় শিল্প গ্র্যাজুয়েশনের পর প্রচুর চাকরি ও বিশ্বসেরা কোম্পানিতে ইন্টার্নশিপের সুযোগ দেয়।"
      }
    ],
    topMatchesTitle: "শীর্ষ বিশ্ববিদ্যালয় ম্যাচ",
    topMatchesBadge: "4টি বিশ্ববিদ্যালয় পাওয়া গেছে",
    topMatchesDesc: "আপনার একাডেমিক প্রোফাইল ও IELTS পরিকল্পনার সঙ্গে মেলে এমন বিশ্ববিদ্যালয়ের বিস্তারিত তালিকা।",
    scholarshipsTitle: "ম্যাচড স্কলারশিপ সুযোগ",
    scholarshipsBadge: "3টি অনুদান পাওয়া গেছে",
    scholarshipsDesc: "আপনার বাজেট ও একাডেমিক প্রোফাইলের ভিত্তিতে আপনি যেসব প্রয়োজনভিত্তিক ও মেধাভিত্তিক অনুদানের যোগ্য।",
    scholarshipItems: ["সরকারি মেধা অনুদান", "বিশ্ববিদ্যালয় শ্রেষ্ঠত্ব পুরস্কার", "আন্তর্জাতিক মোবিলিটি বৃত্তি"],
    visaTitle: "ভিসার পথ ও ধাপে-ধাপে সময়রেখা",
    visaBadge: "আপনার জন্য কাস্টমাইজড",
    visaDesc: "আপনার গন্তব্যের জন্য পূর্ণ ভিসা রোডম্যাপ — কাগজপত্র, খরচ, সময়সীমা এবং প্রত্যাখ্যানের সাধারণ কারণ।",
    visaSteps: ["ডকুমেন্ট চেকলিস্ট প্রস্তুত", "আর্থিক প্রমাণের সীমা", "ইন্টারভিউ প্রস্তুতি গাইড", "আগমনের পর নিবন্ধন"],
    applicationTitle: "আপনার আবেদন অ্যাকশন প্ল্যান",
    applicationBadge: "বাস্তবায়নের জন্য প্রস্তুত",
    applicationDesc: "ডেডলাইন, ফি-মওকুফ ও গ্রহণযোগ্যতার সম্ভাবনাসহ আবেদনের জন্য বিশ্ববিদ্যালয়ের অগ্রাধিকার তালিকা।",
    applicationItems: ["উন্মুক্ত ইনটেকসহ অগ্রাধিকার বিশ্ববিদ্যালয়", "ফি মওকুফের যোগ্যতা যাচাই", "SOP ও LOR কৌশল"],
    unlockTitle: "আপনার সম্পূর্ণ রোডম্যাপ আনলক করুন",
    unlockDesc: "আপনার ব্যক্তিগতকৃত বিশ্ববিদ্যালয়ের তালিকা, গোপন স্কলারশিপ সুযোগ, আবেদন কৌশল ও ধাপে-ধাপে ভিসা গাইডে এখনই প্রবেশাধিকার নিন।",
    unlockCta: "মাস্টারক্লাস ও ইনসাইট আনলক করুন"
  }
};

export function AnalyzingUX({
  onComplete,
  language = "en"
}: {
  onComplete: () => void;
  language?: Language;
}) {
  const [textIndex, setTextIndex] = useState(0);
  const texts = analyzingTexts[language];

  useEffect(() => {
    // Cycle every 1600 ms — 5 phrases × 1600 ms = 8 s total
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 1600);
    const completeTimer = setTimeout(onComplete, 8000);
    return () => {
      clearInterval(textInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete, texts.length]);

  return (
    <motion.div
      key="analyzing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 z-50 overflow-hidden bg-black"
    >
      {/* ── Full-screen video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="https://res.cloudinary.com/dhwpo1sot/video/upload/v1780316725/hf_20260601_114031_01c42934-c2c1-4d01-a9c0-30332885bc36_ilvrq8.mp4"
      />

      {/*
        ── Text block ──
        Video analysis:
          Desktop 1440 px: person + puzzle at x 55–78%, y 25–80%.
            → Entire left 55 % is pure black. Text sits at left 8–10 %, vertically centered.
          Mobile ~390 px (object-cover crops to center): person visible in right ~60 % of screen.
            → Top 22 % of screen (above person's head) is still dark edge-to-edge.
            → Text sits at top 14–20 %, left-aligned.
      */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-10
          left-6 top-[14%]
          sm:left-8 sm:top-[18%]
          md:left-10 md:top-1/2 md:-translate-y-1/2
          lg:left-16
          xl:left-20
          max-w-[88vw] md:max-w-[46%] lg:max-w-[42%] xl:max-w-[38%]"
      >
        {/* Pulse dot + label */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-2.5 mb-4 md:mb-5"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-blue-400/80 text-[10px] md:text-xs font-semibold tracking-[0.28em] uppercase select-none">
            {language === "bn" ? "বিশ্লেষণ চলছে" : "AI Analyzing"}
          </span>
        </motion.div>

        {/*
          Flip-dice container.
          perspective set on the parent; perspectiveOrigin 0% 50% puts the
          vanishing point at the left edge → the flip sweeps away from the
          left-anchored text, giving a realistic page-flip feel on this side.
        */}
        <div style={{ perspective: "700px", perspectiveOrigin: "0% 50%" }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0,   opacity: 1 }}
              exit={{    rotateX:  90, opacity: 0 }}
              transition={{
                rotateX: { duration: 0.26, ease: [0.4, 0, 0.2, 1] },
                opacity:  { duration: 0.2 },
              }}
              style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              className="
                font-black tracking-tight leading-[1.1]
                text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] lg:text-[3.2rem] xl:text-[3.8rem]
                text-transparent bg-clip-text
                bg-gradient-to-b from-white via-blue-100 to-blue-500
                drop-shadow-[0_0_45px_rgba(59,130,246,0.9)]
              "
            >
              {texts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar — 5 segments, active one fills fully */}
        <div className="flex gap-1.5 mt-4 md:mt-6">
          {texts.map((_, i) => (
            <motion.div
              key={i}
              className="h-[2px] rounded-full bg-blue-500"
              animate={{
                width:   i === textIndex ? "28px" : "7px",
                opacity: i === textIndex ? 1 : 0.3,
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export const renderQuestionHighlight = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={index} className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] font-semibold">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <span key={index} className="text-white">{part}</span>;
  });
};

// Animated count-up to the profile-match percentage, shown before the
// destination is revealed. Calls onComplete a beat after it reaches the target.
// Animated chip for each alternative destination.
// Slides in from the right, then count-up fires after the slide delay.
export function AlternativeChip({
  flag, name, percent, index, startDelay = 1.4
}: {
  flag: string; name: string; percent: number; index: number; startDelay?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const delay = (startDelay + index * 0.2) * 1000; // matches the motion delay below
    const timeout = setTimeout(() => {
      let st: number;
      const dur = 900;
      const tick = (ts: number) => {
        if (!st) st = ts;
        const t = Math.min((ts - st) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 2);
        setCount(Math.floor(eased * percent));
        if (t < 1) requestAnimationFrame(tick);
        else setCount(percent);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [percent, index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 36 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: startDelay + index * 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.1] transition-colors border border-white/10 px-4 py-2 md:py-2.5 rounded-full backdrop-blur-sm cursor-default"
    >
      <span className="text-base md:text-lg leading-none">{flag}</span>
      <span className="text-white/75 font-medium text-xs md:text-sm">{name}</span>
      <span className="text-blue-400 font-bold text-xs md:text-sm tabular-nums">{count}%</span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CountingMatch — the animated number that starts huge (full-screen, on a
// fading black overlay) and shrinks into the "89 % Match Found" badge.
//
// Design behaviour:
//   • 0 → ~70 % of count:  large number sits centered, black bg opaque
//   • 70 → 100 % of count: number shrinks + moves toward the badge while
//                           "Match Found" text fades in beside it
//   • On completion:       fixed overlay disappears, the real badge fades in
// ─────────────────────────────────────────────────────────────────────────────
export function MatchPercentage({
  targetScore = 89,
  onComplete,
  language = "en",
}: {
  targetScore?: number;
  onComplete: () => void;
  language?: Language;
}) {
  const [score, setScore] = useState(0);
  const copy = revealContent[language];

  useEffect(() => {
    let startTime: number;
    const duration = 2500;

    const updateScore = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setScore(Math.floor(easeProgress * targetScore));
      if (progress < 1) {
        requestAnimationFrame(updateScore);
      } else {
        setTimeout(onComplete, 800);
      }
    };

    requestAnimationFrame(updateScore);
  }, [targetScore, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        transition: { duration: 0.6 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center p-8 relative"
    >
      <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border border-white/10 rounded-full border-dashed w-[150%] h-[150%] left-[-25%] top-[-25%]"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border border-emerald-400/20 rounded-full w-[130%] h-[130%] left-[-15%] top-[-15%]"
      />

      <span className="text-white/50 uppercase tracking-[0.4em] text-xs md:text-sm font-semibold mb-6 flex items-center gap-3">
        <div className="w-8 h-[1px] bg-white/20" />
        {copy.calculatingMatch}
        <div className="w-8 h-[1px] bg-white/20" />
      </span>

      <div className="flex items-end gap-2 drop-shadow-[0_0_30px_rgba(52,211,153,0.5)] relative z-10">
        <motion.span
          key={score}
          initial={{ opacity: 0.5, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-emerald-100 via-emerald-300 to-emerald-600 leading-none"
        >
          {score}
        </motion.span>
        <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-emerald-400 mb-4 md:mb-6 leading-none">
          %
        </span>
      </div>

      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-8 px-6 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md"
      >
        <span className="text-emerald-300 font-medium tracking-[0.15em] text-xs uppercase">
          {copy.analyzingDataPoints}
        </span>
      </motion.div>
    </motion.div>
  );
}


export default function QuizFlow({ onClose, mode = "full" }: { onClose: () => void; mode?: "full" | "result" }) {
  const resultMode = mode === "result";
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [language, setLanguage] = useState<Language>("en");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [history, setHistory] = useState<number[]>([]);
  // When mode="result", jump straight to the destination reveal (its own page/URL).
  const [isFinished, setIsFinished] = useState(resultMode);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDestination, setShowDestination] = useState(resultMode);
  const [revealStep, setRevealStep] = useState<"counting" | "completed">(resultMode ? "completed" : "counting");
  const [destinationCountry, setDestinationCountry] = useState("Canada");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Only cleanup frame loop if necessary
  }, [isAnalyzing]);

  useEffect(() => {
    let animationFrameId: number;

    const performUpdate = () => {
      const video = videoRef.current;
      if (!video || isNaN(video.duration) || video.duration === 0) {
        animationFrameId = requestAnimationFrame(performUpdate);
        return;
      }

      const targetProgress = isFinished ? 1 : (questions.length > 1 ? currentQuestion / (questions.length - 1) : 0);
      let targetTime = targetProgress * video.duration;
      targetTime = Math.max(0, Math.min(video.duration, targetTime));

      const currentTime = video.currentTime;
      const diff = targetTime - currentTime;

      if (diff > 0.05) {
        if (video.paused) {
          video.play().catch(() => {});
        }
        if (diff > 1.5) {
          video.playbackRate = 1.5;
        } else {
          video.playbackRate = 1.0;
        }
        if (video.currentTime >= targetTime - 0.05) {
          video.pause();
          video.currentTime = targetTime;
        }
      } else if (diff < -0.05) {
        if (!video.paused) video.pause();
        video.currentTime = currentTime + diff * 0.1;
      } else {
        if (!video.paused) video.pause();
      }

      animationFrameId = requestAnimationFrame(performUpdate);
    };

    animationFrameId = requestAnimationFrame(performUpdate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentQuestion, isFinished]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuestion]);

  const handleOptionClick = (optionIndex: number) => {
    const current = questions[currentQuestion];
    // Always store the English value so conditions match regardless of display language.
    const canonicalAnswer = current.options[optionIndex].en;
    const newAnswers = { ...answers, [current.id]: canonicalAnswer };
    setAnswers(newAnswers);

    // Q1 sets the display language for the rest of the flow (English / Bangla / Mix→English).
    if (current.id === 1) {
      setLanguage(canonicalAnswer === "Bangla" ? "bn" : "en");
    }

    setHistory([...history, currentQuestion]);

    let nextQ = currentQuestion + 1;

    // Find the next question that condition satisfies
    while (nextQ < questions.length) {
      if (questions[nextQ].condition) {
        if (questions[nextQ].condition!(newAnswers)) {
          break;
        } else {
          // skip this question
          nextQ++;
        }
      } else {
        break;
      }
    }

    if (nextQ < questions.length) {
      setCurrentQuestion(nextQ);
    } else {
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevQuestion = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentQuestion(prevQuestion);
    }
  };

  const resolvedQuestion = resolveQuestion(questions[currentQuestion], language);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex bg-[#030509] text-white overflow-hidden font-sans"
    >
      {/* Background Video Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.video
          ref={videoRef}
          src="https://res.cloudinary.com/dyalnmjj5/video/upload/v1779632558/hf_20260524_130816_d0e147d9-4b3b-4dc2-a02f-0919a012d1af_tgqtup.mp4"
          className="absolute inset-0 w-full h-full object-cover lg:object-center"
          playsInline
          animate={{
            opacity: isFinished ? 0 : 1,
            objectPosition:
              typeof window !== "undefined" && window.innerWidth < 1024
                ? `${20 + (currentQuestion / Math.max(1, questions.length - 1)) * 60}% 50%`
                : "50% 50%"
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }}
        />

        <AnimatePresence>
          {isFinished && (
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              src="https://res.cloudinary.com/dyalnmjj5/video/upload/v1779642013/migrateproperly_eee40w.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={() => setIsAnalyzing(true)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Top Nav Elements */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/5 bg-black/20 backdrop-blur-xl">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-medium text-white/70 tracking-widest uppercase">Assess & Match</span>
        </div>
      </div>

      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-50 flex items-center gap-4">
        {history.length > 0 && !isFinished && (
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        )}
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Analyzing screen — rendered as a direct child of the fixed root so
          its absolute inset-0 covers everything including the background video */}
      <AnimatePresence>
        {isAnalyzing && (
          <AnalyzingUX language={language} onComplete={() => {
            setIsAnalyzing(false);
            setShowDestination(true);
            // Give the result its own shareable URL once it appears.
            if (window.location.pathname.startsWith("/quiz")) {
              window.history.pushState({}, "", "/quiz/result");
            }
          }} />
        )}
      </AnimatePresence>

      {/* Split Content Area */}
      <div className="relative z-20 w-full h-full flex flex-col lg:flex-row">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full h-full flex flex-col lg:flex-row overflow-hidden bg-transparent"
            >
              {/* LEFT HALF - Question */}
              <div className="shrink-0 w-full lg:w-[45%] xl:w-1/2 p-6 pt-24 pb-8 md:p-16 lg:p-24 flex flex-col justify-center relative z-10">
                {/* Progress Indicator */}
                <div className="absolute top-0 left-0 w-full lg:w-1 lg:h-full bg-white/5">
                  <motion.div
                    initial={{ width: "0%", height: "0%" }}
                    animate={{
                      width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? "100%" : `${((currentQuestion) / questions.length) * 100}%`,
                      height: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${((currentQuestion) / questions.length) * 100}%` : "100%"
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] h-1 lg:h-auto lg:w-1"
                  />
                </div>

                <div className="max-w-xl mx-auto lg:mx-0 w-full relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col gap-6 mb-8"
                  >
                    <div className="inline-flex items-center gap-3">
                      <span className="text-blue-400 font-mono text-sm tracking-widest">{String(currentQuestion + 1).padStart(2, '0')}</span>
                      <div className="w-12 h-[1px] bg-blue-500/30" />
                      <span className="text-white/40 font-mono text-sm tracking-widest">{String(questions.length).padStart(2, '0')}</span>
                    </div>

                    <span className="text-white/60 uppercase tracking-[0.2em] text-xs font-semibold">
                      {resolvedQuestion.tagline}
                    </span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-medium tracking-tight leading-[1.2] lg:leading-[1.1] ${
                      resolvedQuestion.question.length > 120 ? "text-xl md:text-3xl lg:text-4xl" :
                      resolvedQuestion.question.length > 80 ? "text-2xl md:text-4xl lg:text-5xl" :
                      "text-2xl md:text-5xl lg:text-6xl"
                    }`}
                  >
                    {renderQuestionHighlight(resolvedQuestion.question)}
                  </motion.h2>
                </div>
              </div>

              {/* RIGHT HALF - Options */}
              <div
                ref={scrollContainerRef}
                className="flex-1 w-full lg:w-[55%] xl:w-1/2 p-6 pb-32 pt-8 md:p-16 lg:p-24 flex flex-col justify-start lg:justify-center overflow-y-auto overflow-x-hidden scrollbar-hide bg-gradient-to-l from-transparent to-white/[0.01] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)] [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)] lg:[-webkit-mask-image:none] lg:[mask-image:none]"
              >
                <div className="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0 w-full mb-20 lg:mb-0">
                  {resolvedQuestion.options.map((option, idx) => {
                    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
                    return (
                      <motion.button
                        key={option}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.4 + idx * 0.1,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOptionClick(idx)}
                        className="group relative border border-white/10 bg-[#0a0f1c]/90 lg:bg-black/40 p-4 py-5 md:p-8 rounded-xl lg:rounded-2xl flex items-center lg:items-center gap-4 md:gap-6 text-left transition-all duration-300 backdrop-blur-xl lg:backdrop-blur-md shadow-xl lg:shadow-none hover:bg-black/60 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                        <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 mt-0 rounded-full border border-white/20 bg-black/60 lg:bg-transparent group-hover:border-blue-400 group-hover:bg-blue-500/20 flex items-center justify-center transition-colors duration-300 text-white/50 group-hover:text-blue-300 font-medium text-sm md:text-base relative z-10">
                          {letters[idx]}
                        </div>

                        <span className="text-sm md:text-xl font-light text-white/80 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300 flex-1 leading-snug relative z-10">
                          {option}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            showDestination ? (
              <motion.div
                key="destination"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-start p-6 md:p-12 text-center bg-[#02040a] overflow-y-auto overflow-x-hidden no-scrollbar"
              >
                <div className="fixed inset-0 pointer-events-none">
                  <img
                    src="https://res.cloudinary.com/dyalnmjj5/image/upload/v1779722888/hf_20260525_152410_d9d195a6-7e6b-4f28-bd0d-5dd71701b3c4_ilupfc.png"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  {/* Atmospheric Grid */}
                  <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)' }} />
                  {/* Glowing core */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] rounded-full bg-blue-600/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto pt-10 pb-24">
                  <AnimatePresence mode="wait">
                    {revealStep === "counting" ? (
                      <motion.div
                        key="counting"
                        className="flex flex-col items-center justify-center min-h-[60vh] w-full"
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                      >
                        <MatchPercentage
                          language={language}
                          onComplete={() => setRevealStep("completed")}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="revealed"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full flex flex-col items-center"
                      >
                        <span className="text-white/50 uppercase tracking-[0.3em] text-xs md:text-sm font-light mb-4">
                          {revealContent[language].destinationLabel}
                        </span>
                        <div
                          className="flex flex-col items-center justify-center mb-16"
                          style={{ perspective: 1000 }}
                        >
                          <motion.h2 className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[7.5rem] font-black tracking-tighter flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 mb-2 pb-2 leading-[1.1] text-center px-4">
                            {destinationCountry.split(" ").map((word, wordIndex) => (
                              <span key={wordIndex} className="inline-block whitespace-nowrap">
                                {word.split("").map((char, index) => (
                                  <motion.span
                                    key={`${wordIndex}-${index}`}
                                    initial={{ opacity: 0, y: 80, scale: 0.8, filter: "blur(20px)" }}
                                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                                    transition={{
                                      duration: 1.2,
                                      delay: (wordIndex * 5 + index) * 0.08,
                                      type: "spring",
                                      damping: 12,
                                      stiffness: 150
                                    }}
                                    className="text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-500 drop-shadow-[0_0_45px_rgba(59,130,246,0.9)] inline-block"
                                  >
                                    {char}
                                  </motion.span>
                                ))}
                              </span>
                            ))}
                          </motion.h2>

                          <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                            className="flex items-center justify-center gap-2 md:gap-3 bg-emerald-500/20 border-2 border-emerald-500/50 px-6 py-3 md:px-8 md:py-4 rounded-full backdrop-blur-md shadow-[0_0_50px_rgba(52,211,153,0.4)] max-w-[90vw]"
                          >
                            <svg
                              className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 font-black tracking-[0.1em] uppercase text-xl sm:text-2xl md:text-3xl drop-shadow-md text-center">
                              {revealContent[language].matchFound}
                            </span>
                          </motion.div>

                          {/* Other Matches */}
                          <div className="flex flex-col items-center gap-2 mt-8">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.3, duration: 0.6 }}
                              className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold mb-2"
                            >
                              {revealContent[language].alternativesLabel}
                            </motion.div>
                            <div className="flex flex-wrap justify-center gap-3">
                              {alternativeDestinations.map((country, idx) => (
                                <React.Fragment key={idx}>
                                  <AlternativeChip
                                    flag={country.flag}
                                    name={country.name}
                                    percent={country.percent}
                                    index={idx}
                                  />
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Custom blurred content section */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full relative"
                        >
                          <div className="text-left mb-6 flex items-center justify-between px-2">
                            <div>
                              <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">{revealContent[language].roadmapTitle}</h3>
                              <p className="text-white/50 text-sm">{revealContent[language].roadmapSubtitle}</p>
                            </div>
                            <div className="hidden md:flex items-center gap-2 text-blue-400/80 text-sm font-medium">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                              </span>
                              {revealContent[language].liveResults}
                            </div>
                          </div>

                          <div className="relative rounded-[2rem] border border-white/10 bg-[#060B1A]/80 backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl">

                            {/* ── SECTION 1: Why {country} — VISIBLE ── */}
                            <div className="p-6 md:p-8 flex flex-col gap-4 border-b border-white/5 bg-white/[0.02]">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                  <span className="text-xl">✨</span>
                                </div>
                                <h4 className="text-lg md:text-xl font-medium text-white text-left">
                                  {revealContent[language].whyTitle.replace("{country}", destinationCountry)}
                                </h4>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                {revealContent[language].reasons.map((reason, idx) => (
                                  <div key={idx} className="flex items-start gap-3 bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                    <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <div>
                                      <h5 className="text-white font-medium text-sm">{reason.title}</h5>
                                      <p className="text-white/60 text-xs mt-1">{reason.desc.replace(/\{country\}/g, destinationCountry)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* ── SECTION 2: Top University Matches — header visible, content locked ── */}
                            <div className="border-b border-white/5">
                              {/* Header — clear, same style as Why section */}
                              <div className="p-6 md:p-8 pb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/25 shrink-0">
                                  <span className="text-xl">🎓</span>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h4 className="text-lg md:text-xl font-medium text-white">
                                    {revealContent[language].topMatchesTitle}
                                  </h4>
                                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                                    {revealContent[language].topMatchesBadge}
                                  </span>
                                </div>
                              </div>
                              {/* Content — blurred & locked */}
                              <div className="px-6 md:px-8 pb-6 flex flex-col gap-3 blur-[3px] opacity-60 select-none pointer-events-none">
                                {[
                                  { pct: "94%", tag: "Best Match" },
                                  { pct: "88%", tag: "Strong Fit" },
                                  { pct: "81%", tag: "Good Fit" },
                                  { pct: "76%", tag: "Possible" },
                                ].map((u, i) => (
                                  <div key={i} className="flex items-center gap-3 bg-white/[0.04] p-3 rounded-xl border border-white/5">
                                    <div className="w-9 h-9 rounded-lg bg-white/10 shrink-0" />
                                    <div className="flex-1">
                                      <div className="h-3.5 w-36 bg-white/25 rounded mb-1.5" />
                                      <div className="h-2.5 w-24 bg-white/10 rounded" />
                                    </div>
                                    <span className="text-emerald-400 font-bold text-sm shrink-0">{u.pct}</span>
                                    <span className="text-[10px] text-emerald-400/70 font-medium shrink-0 hidden md:block">{u.tag}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* ── SECTION 3: Scholarship Opportunities — header visible, content locked ── */}
                            <div className="border-b border-white/5">
                              <div className="p-6 md:p-8 pb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center border border-amber-500/25 shrink-0">
                                  <span className="text-xl">💰</span>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h4 className="text-lg md:text-xl font-medium text-white">
                                    {revealContent[language].scholarshipsTitle}
                                  </h4>
                                  <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-semibold">
                                    {revealContent[language].scholarshipsBadge}
                                  </span>
                                </div>
                              </div>
                              <div className="px-6 md:px-8 pb-6 flex flex-col gap-3 blur-[4px] opacity-50 select-none pointer-events-none">
                                {revealContent[language].scholarshipItems.map((item, i) => (
                                  <div key={i} className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/5">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/20 shrink-0" />
                                    <div className="flex-1">
                                      <div className="h-3 w-40 bg-white/20 rounded mb-1.5" />
                                      <div className="h-2.5 w-28 bg-white/10 rounded" />
                                    </div>
                                    <div className="h-5 w-14 bg-amber-400/20 rounded-full" />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* ── SECTION 4: Visa Route & Timeline — header visible, content locked ── */}
                            <div className="border-b border-white/5">
                              <div className="p-6 md:p-8 pb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center border border-blue-500/25 shrink-0">
                                  <span className="text-xl">🛂</span>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h4 className="text-lg md:text-xl font-medium text-white">
                                    {revealContent[language].visaTitle}
                                  </h4>
                                  <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-semibold">
                                    {revealContent[language].visaBadge}
                                  </span>
                                </div>
                              </div>
                              <div className="px-6 md:px-8 pb-6 blur-[4px] opacity-45 select-none pointer-events-none">
                                <div className="flex flex-col gap-2.5">
                                  {revealContent[language].visaSteps.map((_, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                      <div className="w-6 h-6 rounded-full bg-blue-500/30 border border-blue-500/30 flex items-center justify-center shrink-0">
                                        <span className="text-blue-300 text-xs font-bold">{i + 1}</span>
                                      </div>
                                      <div className="flex-1 h-3 bg-white/15 rounded" style={{ width: `${80 - i * 10}%` }} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* ── SECTION 5: Application Action Plan — header visible, content locked ── */}
                            <div>
                              <div className="p-6 md:p-8 pb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center border border-purple-500/25 shrink-0">
                                  <span className="text-xl">📋</span>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h4 className="text-lg md:text-xl font-medium text-white">
                                    {revealContent[language].applicationTitle}
                                  </h4>
                                  <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-semibold">
                                    {revealContent[language].applicationBadge}
                                  </span>
                                </div>
                              </div>
                              <div className="px-6 md:px-8 pb-6 blur-[5px] opacity-35 select-none pointer-events-none">
                                <div className="flex flex-col gap-2.5">
                                  {revealContent[language].applicationItems.map((_, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/5">
                                      <div className="w-4 h-4 rounded border border-purple-400/40 mt-0.5 shrink-0" />
                                      <div className="flex-1 h-3 bg-white/15 rounded" style={{ width: `${70 - i * 8}%` }} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* ── Overlay gradient + Lock CTA ── */}
                            <div className="absolute bottom-0 left-0 right-0 h-[72%] bg-gradient-to-t from-[#060B1A] via-[#060B1A]/85 to-transparent flex flex-col items-center justify-end pb-10 px-6">
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 2, ease: "backOut" }}
                                className="w-16 h-16 rounded-full bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 flex items-center justify-center mb-5 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                              >
                                <svg className="w-7 h-7 text-blue-400 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              </motion.div>
                              <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 2.2 }}
                                className="text-center"
                              >
                                <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">{revealContent[language].unlockTitle}</h4>
                                <p className="text-white/60 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">{revealContent[language].unlockDesc}</p>
                                                                <button onClick={onClose} className="group relative overflow-hidden bg-blue-600 text-white w-full sm:w-auto px-8 py-4 md:py-5 rounded-full font-bold uppercase tracking-[0.1em] text-sm hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all shrink-0">
                                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                  <span className="relative z-10 flex items-center justify-center gap-3">
                                    {revealContent[language].unlockCta}
                                    <svg className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </span>
                                </button>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div key="waiting" className="w-full h-full pointer-events-none" exit={{ opacity: 0 }} />
            )
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
