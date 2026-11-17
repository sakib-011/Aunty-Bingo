import { getStoredQuestions } from './questionStore';

export const OCCASIONS = {
  eid: {
    id: 'eid',
    nameEn: 'Eid Reunion',
    nameBn: 'ঈদের আড্ডা',
    tagColor: '#0F7B5F',
    themeBg: '#E8F5EE',
    calendarNoteEn: 'Auto-picked from the calendar',
    calendarNoteBn: 'ক্যালেন্ডার থেকে নিজে বেছে নেওয়া',
    badgeTextEn: 'EID REUNION',
    badgeTextBn: 'ঈদের আড্ডা',
    descEn: 'For all those Eid family questions, salami collections, and sweet overload.',
    descBn: 'ঈদের সালামি জেরা, সেমাইয়ের স্বাদ আর পরিবারের অফুরন্ত আড্ডার মিষ্টি মুহূর্ত।',
    tagEn: 'Emerald & Gold',
    tagBn: 'পান্না ও সোনালী',
    iconKey: 'eid'
  },
  wedding: {
    id: 'wedding',
    nameEn: 'Wedding / Dawot',
    nameBn: 'বিয়ে ও দাওয়াত',
    tagColor: '#A81D37',
    themeBg: '#FCECEF',
    calendarNoteEn: 'Wedding season special',
    calendarNoteBn: 'বিয়ের মৌসুমের বিশেষ আড্ডা',
    badgeTextEn: 'WEDDING / DAWOT',
    badgeTextBn: 'বিয়ে ও দাওয়াত',
    descEn: 'Survive the wedding interrogation, matchmaking aunts, and biryani debates.',
    descBn: 'বিয়ের দাওয়াতে ঘটকালি আন্টিদের জেরা, গয়না নিরীক্ষা আর কাচ্চির আলোচনা।',
    tagEn: 'Pink & Coral',
    tagBn: 'গোলাপী ও প্রবাল',
    iconKey: 'wedding'
  },
  exam: {
    id: 'exam',
    nameEn: 'Post-Exam Results',
    nameBn: 'রেজাল্টের দিন',
    tagColor: '#1F50A8',
    themeBg: '#EEF4FF',
    calendarNoteEn: 'Exam result day special',
    calendarNoteBn: 'রেজাল্ট পরবর্তী আড্ডা',
    badgeTextEn: 'POST-EXAM RESULTS',
    badgeTextBn: 'রেজাল্টের দিন',
    descEn: 'Ready for the GPA barrage, BCS advice, and comparison with Sharma ji’s son?',
    descBn: 'গোল্ডেন এ প্লাসের জেরা, বিসিএস পরামর্শ আর পাশের বাসার ছেলের সাথে তুলনা!',
    tagEn: 'Blue & Purple',
    tagBn: 'নীল ও বেগুনী',
    iconKey: 'exam'
  },
  general: {
    id: 'general',
    nameEn: 'General Family Adda',
    nameBn: 'সাধারণ পারিবারিক আড্ডা',
    tagColor: '#B84B12',
    themeBg: '#FFF2EB',
    calendarNoteEn: 'Weekend family gathering',
    calendarNoteBn: 'সাধারণ পারিবারিক আড্ডা',
    badgeTextEn: 'GENERAL FAMILY ADDA',
    badgeTextBn: 'পারিবারিক আড্ডা',
    descEn: 'Everyday family conversation classics, career checks, and nostalgic lectures.',
    descBn: 'ফোন আসক্তি নিয়ে আন্টির লেকচার, চাকরি-বাকরি আর ফেলে আসা দিনের স্মৃতিচারণ।',
    tagEn: 'Orange & Yellow',
    tagBn: 'কমলা ও হলুদ',
    iconKey: 'general'
  },
  aunty007: {
    id: 'aunty007',
    nameEn: 'Aunty 007 (Spy Mode)',
    nameBn: 'আন্টি ০০৭ (গোপন গোয়েন্দা)',
    tagColor: '#6B21A8',
    themeBg: '#F3E8FF',
    calendarNoteEn: 'License to Gossip Special',
    calendarNoteBn: 'লাইসেন্স টু গসিপ স্পেশাল',
    badgeTextEn: 'AUNTY 007 SPY',
    badgeTextBn: 'আন্টি ০০৭',
    descEn: 'Investigate neighborhood gossip, secret romance files, and biryani leg piece mysteries.',
    descBn: 'পাড়ার গোপন খবর, কাচ্চির মাংস রহস্য আর ঘটকালি ইনভেস্টিগেশন। আমি কিন্তু সব জানি!',
    tagEn: 'Purple & Gold',
    tagBn: 'বেগুনি ও সোনালী',
    iconKey: 'aunty007'
  }
};

// Track questions played in this session so each play shows fresh unplayed questions
let playedPhraseIds = new Set();

/**
 * Resets the session memory of played phrases (e.g. on full hard reset)
 */
export function clearPlayedPhraseHistory() {
  playedPhraseIds.clear();
}

/**
 * Fisher-Yates array shuffle utility
 */
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Returns randomized phrases for a selected occasion.
 * gridSize can be 3 (9 tiles) or 5 (25 tiles with center free tile).
 * Guaranteed to prioritize unplayed questions from today's pool for each new board.
 */
export function generateBoardPhrases(occasionId = 'eid', forceRandom = false, gridSize = 3, customPool = null) {
  const allPhrases = getStoredQuestions();

  // 1. Gather all curated phrases for this occasion
  let occasionCurated;
  if (occasionId === 'all') {
    occasionCurated = allPhrases;
  } else {
    occasionCurated = allPhrases.filter(p =>
      !p.occasions || p.occasions.includes(occasionId) || p.occasions.includes('general')
    );
  }

  // 2. Blend with custom/AI daily phrases if available, removing duplicates by ID
  const poolMap = new Map();
  if (customPool && Array.isArray(customPool)) {
    customPool.forEach(p => {
      if (p && p.id) poolMap.set(p.id, p);
    });
  }
  occasionCurated.forEach(p => {
    if (p && p.id && !poolMap.has(p.id)) {
      poolMap.set(p.id, p);
    }
  });

  const sourcePool = Array.from(poolMap.values());
  const targetCount = gridSize === 5 ? 24 : 9;

  // Initial load Figma preset only for first initial load of 3x3 eid when not forced random and no previous marks
  if (gridSize === 3 && !forceRandom && occasionId === 'eid' && playedPhraseIds.size === 0 && (!customPool || customPool.length === 0)) {
    const figmaIds = [9001, 9002, 9003, 9004, 9005, 9006, 9007, 9008, 9009];
    const initialTiles = figmaIds
      .map(id => sourcePool.find(p => p.id === id))
      .filter(Boolean);

    if (initialTiles.length === 9) {
      initialTiles.forEach(p => playedPhraseIds.add(p.id));
      return initialTiles;
    }
  }

  // 3. Smart Anti-Repetition / Fresh Questions Rotation:
  // Separate into questions NOT yet played this session vs already played
  let unplayedPhrases = sourcePool.filter(p => !playedPhraseIds.has(p.id));
  let alreadyPlayedPhrases = sourcePool.filter(p => playedPhraseIds.has(p.id));

  // If unplayed questions are insufficient to fill a full board, reset session played memory
  if (unplayedPhrases.length < targetCount) {
    playedPhraseIds.clear();
    unplayedPhrases = [...sourcePool];
    alreadyPlayedPhrases = [];
  }

  const shuffledUnplayed = shuffleArray(unplayedPhrases);
  const shuffledPlayed = shuffleArray(alreadyPlayedPhrases);

  let chosen;
  if (shuffledUnplayed.length >= targetCount) {
    // 100% brand new, unplayed questions for this game!
    chosen = shuffledUnplayed.slice(0, targetCount);
  } else {
    // Take all remaining unplayed, fill remainder from already played
    const needed = targetCount - shuffledUnplayed.length;
    chosen = shuffledUnplayed.concat(shuffledPlayed.slice(0, needed));
  }

  // Final scramble
  chosen = shuffleArray(chosen);

  // Mark these chosen questions as played in this session
  chosen.forEach(p => playedPhraseIds.add(p.id));

  if (gridSize === 3) {
    return chosen;
  }

  // 5x5 mode: 24 phrases + 1 center Free Tile at index 12
  const freeTile = {
    id: 'free-tile-12',
    en: 'FREE TILE',
    bn: 'ফ্রি ঘর',
    subEn: 'Family Immunity',
    subBn: 'বোনাস ঘর',
    isFree: true
  };

  const board25 = [];
  let phraseIdx = 0;
  for (let i = 0; i < 25; i++) {
    if (i === 12) {
      board25.push(freeTile);
    } else {
      board25.push(chosen[phraseIdx++]);
    }
  }

  return board25;
}
