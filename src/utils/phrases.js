import allPhrases from '../data/phrases.json';

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
    icon: '🌙'
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
    icon: '💍'
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
    icon: '🎓'
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
    icon: '☕'
  }
};

/**
 * Returns randomized phrases for a selected occasion.
 * gridSize can be 3 (9 tiles) or 5 (25 tiles with center free tile).
 */
export function generateBoardPhrases(occasionId = 'eid', forceRandom = false, gridSize = 3) {
  if (gridSize === 3 && !forceRandom && occasionId === 'eid') {
    const figmaIds = [9001, 9002, 9003, 9004, 9005, 9006, 9007, 9008, 9009];
    const initialTiles = figmaIds
      .map(id => allPhrases.find(p => p.id === id))
      .filter(Boolean);

    if (initialTiles.length === 9) {
      return initialTiles;
    }
  }

  // Filter phrases for this occasion
  const pool = allPhrases.filter(p =>
    !p.occasions || p.occasions.includes(occasionId) || p.occasions.includes('general')
  );

  const sourcePool = pool.length >= (gridSize === 5 ? 24 : 9) ? pool : allPhrases;

  // Shuffle
  const shuffled = [...sourcePool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  if (gridSize === 3) {
    return shuffled.slice(0, 9);
  }

  // 5x5 mode: 24 phrases + 1 center Free Tile at index 12
  const chosen24 = shuffled.slice(0, 24);
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
      board25.push(chosen24[phraseIdx++]);
    }
  }

  return board25;
}
