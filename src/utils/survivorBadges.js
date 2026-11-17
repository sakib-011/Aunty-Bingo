/**
 * Dynamic Survivor Badges & Gossip IQ Generator for Aunty Bingo
 * Generates context-aware, varied titles, descriptions, and dynamic IQ metrics for every win.
 */

export const OCCASION_SURVIVOR_POOLS = {
  eid: {
    badges: [
      {
        titleBn: 'সালামি কূটনীতিক খেতাব',
        titleEn: 'Salami Diplomat Title',
        descBn: 'জেরা এড়িয়ে সর্বোচ্চ সালামি আদায় সম্পন্ন!',
        descEn: 'Dodged interrogation and secured maximum Eidi!'
      },
      {
        titleBn: 'সেমাই স্পেশালিস্ট মেডেল',
        titleEn: 'Semai Specialist Medal',
        descBn: 'মিষ্টি খেয়ে খালাম্মার ব্যক্তিগত প্রশ্ন পাশ কাটাতে পারদর্শী!',
        descEn: 'Mastered deflecting aunties’ inquiries while savoring dessert!'
      },
      {
        titleBn: 'পোশাক নিরীক্ষা বিজয়ী',
        titleEn: 'Eid Outfit Defense Star',
        descBn: 'ঈদ পোশাকের দাম না বলে আন্টিকে সফলভাবে ঘোল খাওয়ালেন!',
        descEn: 'Concealed outfit prices and successfully outwitted relatives!'
      },
      {
        titleBn: 'বড় খালাম্মা সারভাইভার',
        titleEn: 'Senior Aunty Survivor',
        descBn: 'সব আত্মীয়দের সালামি জেরা হাসিমুখে ফেস করে চ্যাম্পিয়ন!',
        descEn: 'Smiled through every probing question and triumphed!'
      },
      {
        titleBn: 'ঈদ সালামি গ্র্যান্ডমাস্টার',
        titleEn: 'Eidi Grandmaster Trophy',
        descBn: 'এক হাজার প্রশ্নের মুখেও সালামির বাজেট সফলভাবে রক্ষা!',
        descEn: 'Protected your festival budget against 1,000 inquiries!'
      },
      {
        titleBn: 'রিইউনিয়ন মাস্টারমাইন্ড',
        titleEn: 'Reunion Mastermind Award',
        descBn: 'সকাল থেকে দুপুর পর্যন্ত সব জেরার মাঝেও অক্ষত রইলেন!',
        descEn: 'Emerged unscathed from morning-to-noon interrogation!'
      }
    ]
  },
  wedding: {
    badges: [
      {
        titleBn: 'অবিবাহিত যোদ্ধা পদক',
        titleEn: 'Unmarried Crusader Medal',
        descBn: 'বিয়ে কবে প্রশ্নের জবাবে পুরো আসর মাতিয়ে চ্যাম্পিয়ন!',
        descEn: 'Rocked the wedding hall despite endless marriage probes!'
      },
      {
        titleBn: 'কাচ্চি ও বোরহানি ডিফেন্ডার',
        titleEn: 'Kacchi & Borhani Defender',
        descBn: 'লেগ পিস উদ্ধার এবং ঘটকালি আন্টির জেরা দুটোই সফলভাবে শেষ!',
        descEn: 'Protected the biryani leg piece and survived matchmaking!'
      },
      {
        titleBn: 'ঘটকালি এস্কেপ আর্টিস্ট',
        titleEn: 'Matchmaker Escape Artist',
        descBn: 'রিলেশনশিপ স্ট্যাটাস গোপন রেখে সফলভাবে বিয়ের প্যান্ডেল ত্যাগ!',
        descEn: 'Kept relationship status confidential and made a clean exit!'
      },
      {
        titleBn: 'সোনার ভরি পরিদর্শক জয়ী',
        titleEn: 'Jewelry Inspector Champion',
        descBn: 'গয়না ও শাড়ির দাম নিয়ে সব জেরাকে পাশ কাটিয়ে সেরা জয়!',
        descEn: 'Deflected gold weight and saree price gossip like a pro!'
      },
      {
        titleBn: 'দাওয়াত সারভাইভাল এক্সপার্ট',
        titleEn: 'Feast Survival Legend',
        descBn: 'আত্মীয়দের শত জেরার মাঝেও পেটপুরে কাচ্চি ভোজন সম্পন্ন!',
        descEn: 'Ate delicious biryani in peace amidst dozens of probes!'
      },
      {
        titleBn: 'দুই পক্ষের কূটনীতি স্টার',
        titleEn: 'Bilateral Wedding Diplomat',
        descBn: 'বরের পক্ষ আর কনের পক্ষের জেরার লড়াইয়ে অক্ষত বিজয়ী!',
        descEn: 'Balanced both wedding parties and walked away a winner!'
      }
    ]
  },
  exam: {
    badges: [
      {
        titleBn: 'বিসিএস বর্ম পদক',
        titleEn: 'Civil Service Shield',
        descBn: 'সিজিপিএ অডিটরদের সফলভাবে পরাস্ত করলেন!',
        descEn: 'Shielded yourself against GPA and BCS interrogators!'
      },
      {
        titleBn: 'পাশের বাসার ছেলে ট্রফি',
        titleEn: 'Sharma Ji Son Defeater',
        descBn: 'পাশের বাসার ফার্স্ট বয়কেও যুক্তিতে হারিয়ে পরিবারের মুখ উজ্জ্বল!',
        descEn: 'Out-argued the neighborhood top student comparisons!'
      },
      {
        titleBn: 'গোল্ডেন জিপিএ শিল্ড',
        titleEn: 'Golden GPA Sentinel',
        descBn: 'মার্কশিট দেখতে চাওয়া আত্মীয়দের নিখুঁত উত্তরে কুপোকাত!',
        descEn: 'Outsmarted relatives demanding to inspect the marksheet!'
      },
      {
        titleBn: 'পড়াশোনা ডিফেন্স মাস্টার',
        titleEn: 'Academic Defense Master',
        descBn: 'চাকরি আর রেজাল্ট নিয়ে আন্টির সব বুলেট সফলভাবে ব্লক!',
        descEn: 'Blocked career queries and academic criticism gracefully!'
      },
      {
        titleBn: 'কনফিডেন্স গ্র্যান্ডমাস্টার',
        titleEn: 'Confidence Grandmaster',
        descBn: 'রেজাল্ট যেমনই হোক, আত্মবিশ্বাসে আপনিই সেরা বিজয়ী!',
        descEn: 'Grades may vary, but confidence is 100% gold standard!'
      },
      {
        titleBn: 'ভবিষ্যৎ পরিকল্পনাবিদ পদক',
        titleEn: 'Master Strategist Title',
        descBn: 'উচ্চশিক্ষার দীর্ঘ লেকচার পাশ কাটিয়ে নিজের লক্ষ্যে অটল!',
        descEn: 'Held steady to personal goals despite unsolicited advice!'
      }
    ]
  },
  general: {
    badges: [
      {
        titleBn: 'চা সিঙ্গাড়া চ্যাম্পিয়ন',
        titleEn: 'Tea & Shingara Champion',
        descBn: 'আড্ডায় নাশতা সাবাড় করে আন্টির সব প্রশ্ন প্রতিহত!',
        descEn: 'Finished the snacks and deflected intrusive questions!'
      },
      {
        titleBn: 'স্যালারি প্রটেকশন মেডেল',
        titleEn: 'Salary NDA Champion',
        descBn: 'ট্যাক্স অফিসার আন্টিকে স্যালারি না জানিয়েই ঐতিহাসিক জয়!',
        descEn: 'Protected monthly income secrets from aunties and tax audits!'
      },
      {
        titleBn: 'স্মার্টফোন আসক্তি ডিফেন্ডার',
        titleEn: 'Screen Time Defender',
        descBn: 'সব দোষ ফোনের ডায়লগ শুনেও হাসিমুখে জয় ছিনিয়ে নিলেন!',
        descEn: 'Smiled through phone addiction lectures and conquered the adda!'
      },
      {
        titleBn: 'ড্রইংরুম গ্র্যান্ডমাস্টার',
        titleEn: 'Drawing Room Grandmaster',
        descBn: 'পারিবারিক কূটনীতিতে সবাইকে টেক্কা দিয়ে অক্ষত রইলেন!',
        descEn: 'Mastered family politics without dropping a single sweat!'
      },
      {
        titleBn: 'খাবার টেবিল ডিফেন্ডার',
        titleEn: 'Dinner Table Sentinel',
        descBn: 'আরেকটু খাও বলার আগেই প্লেট শেষ করে আন্টিকে পরাস্ত করলেন!',
        descEn: 'Cleaned the plate and dodged second-helping interrogation!'
      },
      {
        titleBn: 'পারিবারিক কূটনৈতিক স্টার',
        titleEn: 'Family Diplomat Star',
        descBn: 'বড়দের উপদেশ শুনে ঘাড় নেড়ে নিজের পথেই বিজয় লাভ!',
        descEn: 'Nodded politely, agreed cheerfully, and won on your own terms!'
      }
    ]
  },
  aunty007: {
    badges: [
      {
        titleBn: 'আন্টি ০০৭ লাইসেন্স (গোপন গোয়েন্দা)',
        titleEn: 'Aunty 007 Secret Agent License',
        descBn: 'আমি কিন্তু সব জানি! পাড়ার সব গোপন খবর ফাঁস!',
        descEn: 'License to Gossip Certified! Solved the neighborhood mystery!'
      },
      {
        titleBn: 'টপ সিক্রেট ইনভেস্টিগেটর',
        titleEn: 'Top Secret Investigator',
        descBn: 'ছাদের ইশারা আর রিকশার যাত্রীদের রহস্য একা হাতে সমাধান!',
        descEn: 'Solved the rooftop signals and rickshaw passenger mystery!'
      },
      {
        titleBn: 'সিসিটিভি খালাম্মা শিল্ড',
        titleEn: 'CCTV Khalammma Shield',
        descBn: 'পাড়ার কানাকানি ফাইভ-জি স্পিডে ক্যাচ করায় ওস্তাদ!',
        descEn: 'Caught neighborhood rumors with 5G speed and precision!'
      },
      {
        titleBn: 'লাইসেন্স টু গসিপ বিজয়ী',
        titleEn: 'License to Gossip Winner',
        descBn: 'গোয়েন্দা নজরদারিতে ১০০ তে ১০০ পেয়ে সার্টিফিকেট অর্জন!',
        descEn: 'Scored 100/100 in investigative family gossip surveillance!'
      },
      {
        titleBn: 'ডিটেকটিভ আন্টি মাস্টারমাইন্ড',
        titleEn: 'Detective Aunty Mastermind',
        descBn: 'মিশন কমপ্লিট! কোনো রহস্যই আপনার নজর এড়াতে পারল না!',
        descEn: 'Mission accomplished! No family secret escaped your radar!'
      },
      {
        titleBn: 'সিঙ্গেল সোর্স গোয়েন্দা পদক',
        titleEn: 'Single-Source Intel Medal',
        descBn: 'পাড়ার হট নিউজের আসল সোর্সকে চিনে ফেলে ঐতিহাসিক জয়!',
        descEn: 'Identified the true gossip mastermind and cracked the case!'
      }
    ]
  }
};

// Memory of last selected badge index per occasion to guarantee non-repeating consecutive wins
const lastBadgeIndexMap = {};

/**
 * Returns a fresh, dynamic Survivor Badge for the winning board
 */
export function getDynamicSurvivorBadge({ occasionId = 'general', elapsedTime = '00:00', winningLines = [] } = {}) {
  const pool = OCCASION_SURVIVOR_POOLS[occasionId] || OCCASION_SURVIVOR_POOLS.general;
  const list = pool.badges;

  const lastIdx = lastBadgeIndexMap[occasionId] ?? -1;
  let nextIdx = Math.floor(Math.random() * list.length);
  if (list.length > 1 && nextIdx === lastIdx) {
    nextIdx = (nextIdx + 1) % list.length;
  }
  lastBadgeIndexMap[occasionId] = nextIdx;
  const badge = list[nextIdx];

  // Parse elapsed seconds
  const [minsStr, secsStr] = (elapsedTime || '00:00').split(':');
  const totalSeconds = (parseInt(minsStr, 10) || 0) * 60 + (parseInt(secsStr, 10) || 0);

  // Dynamic Gossip IQ: 92% to 99% based on speed and lines
  let calculatedIq = 94;
  if (totalSeconds < 45) calculatedIq = 99;
  else if (totalSeconds < 90) calculatedIq = 98;
  else if (totalSeconds < 150) calculatedIq = 97;
  else if (totalSeconds < 240) calculatedIq = 96;
  else if (totalSeconds < 360) calculatedIq = 95;
  else calculatedIq = 93;

  if (winningLines && winningLines.length > 1) {
    calculatedIq = Math.min(99, calculatedIq + 1);
  }

  // Dynamic Agent Secret Tag
  const agentCodes = ['007', '024', '042', '077', '089', '099'];
  const agentCode = agentCodes[Math.floor(Math.random() * agentCodes.length)];

  const iqLabels = ['GOSSIP IQ', 'SURVIVAL IQ', 'DEFENSE IQ'];
  const iqLabel = iqLabels[nextIdx % iqLabels.length];

  return {
    titleBn: badge.titleBn,
    titleEn: badge.titleEn,
    descBn: badge.descBn,
    descEn: badge.descEn,
    iqText: `${iqLabel} ${calculatedIq}%`,
    secretCode: `AGENT #${agentCode} TOP SECRET`,
    iqValue: calculatedIq
  };
}
