import React from 'react';
import aunty3dChillUrl from '../assets/mascots/aunty_3d_chill.png';
import aunty3dSuspiciousUrl from '../assets/mascots/aunty_3d_suspicious.png';
import aunty3dInterrogationUrl from '../assets/mascots/aunty_3d_interrogation.png';
import aunty3dMeltdownUrl from '../assets/mascots/aunty_3d_meltdown.png';
import {
  SmileIcon,
  GaugeIcon,
  FireIcon,
  TrophyIcon,
  CommentsIcon
} from './FontAwesomeIcons';

export default function Reactive3DAunty({
  markedCount = 0,
  totalTiles = 9,
  lang = 'bn',
  hasWon = false,
  isOneAway = false,
  compact = false,
  occasionId = 'eid'
}) {
  const percentage = Math.min(100, Math.round((markedCount / Math.max(1, totalTiles)) * 100));

  let tier = 'chill';
  if (hasWon || percentage >= 80) tier = 'meltdown';
  else if (percentage >= 50) tier = 'interrogation';
  else if (percentage >= 20) tier = 'suspicious';

  const tierConfig = {
    chill: {
      image: aunty3dChillUrl,
      alt: '3D Chill Aunty sipping tea',
      icon: SmileIcon,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
      tagBn: 'মুড: শান্ত (চা খাচ্ছেন)',
      tagEn: 'Mood: Chill (Sipping Tea)',
      dialogueBn: 'আড্ডা সবে শুরু হলো, এক কাপ চা খেয়ে নিই আগে...',
      dialogueEn: 'Gathering just began, let me enjoy my hot tea first...'
    },
    suspicious: {
      image: aunty3dSuspiciousUrl,
      alt: '3D Suspicious Aunty peering over glasses',
      icon: GaugeIcon,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
      tagBn: 'মুড: সন্দেহজনক দৃষ্টি',
      tagEn: 'Mood: Suspicious Glance',
      dialogueBn: 'দাঁড়াও... চশমাটা ঠিক করে ভালো মতো জেরা করি!',
      dialogueEn: 'Hold on... let me adjust my glasses and investigate!'
    },
    interrogation: {
      image: aunty3dInterrogationUrl,
      alt: '3D Interrogation Aunty pointing finger',
      icon: FireIcon,
      badgeColor: 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950/70 dark:text-orange-300 dark:border-orange-800',
      tagBn: 'মুড: তীব্র জেরা মোড',
      tagEn: 'Mood: Interrogation Mode',
      dialogueBn: 'এবার বলো! তোমার আসল বেতন কত আর বিয়ে কবে?!',
      dialogueEn: 'Confess! What is your real salary and when is the wedding?!'
    },
    meltdown: {
      image: aunty3dMeltdownUrl,
      alt: '3D Shocked Aunty in complete defeat',
      icon: TrophyIcon,
      badgeColor: 'bg-rose-100 text-[#8E1B3A] border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800',
      tagBn: 'মুড: রেড অ্যালার্ট (পরাস্ত)',
      tagEn: 'Mood: Red Alert (Defeated)',
      dialogueBn: 'হায় হায়! সব প্রশ্নের উত্তর দিয়ে দিল?! আন্টি পরাস্ত!',
      dialogueEn: 'Oh no! You survived every question?! Aunty is defeated!'
    }
  };

  const current = { ...tierConfig[tier] };

  if (occasionId === 'aunty007') {
    if (tier === 'chill') {
      current.dialogueBn = 'আমি কিন্তু সব জানি! আগে এক কাপ চা খেয়ে নিই...';
      current.dialogueEn = 'Agent Aunty knows everything! Let me finish my tea first...';
      current.tagBn = 'গোয়েন্দা আন্টি: প্রস্তুতি';
      current.tagEn = 'Aunty 007: Standby';
    } else if (tier === 'suspicious') {
      current.dialogueBn = 'চশমা দিয়ে সব দেখছি... পাড়ার গোপন খবর ফাঁস হবেই!';
      current.dialogueEn = 'Watching through my lenses... neighborhood secrets will be uncovered!';
      current.tagBn = 'গোয়েন্দা আন্টি: নজরদারি';
      current.tagEn = 'Aunty 007: Surveillance';
    } else if (tier === 'interrogation') {
      current.dialogueBn = 'সত্যি বলো! কার সাথে কার কী চলছে আমি কিন্তু জানি?!';
      current.dialogueEn = 'Confess! Who was seen with whom? Nothing escapes me!';
      current.tagBn = 'গোয়েন্দা আন্টি: জেরা পর্ব';
      current.tagEn = 'Aunty 007: Interrogation';
    } else if (tier === 'meltdown') {
      current.dialogueBn = 'হায় আল্লাহ! আমার আগেই সব রহস্য ফাঁস করে লাইসেন্স পেয়ে গেলা?!';
      current.dialogueEn = 'Impossible! You solved the case before Aunty?! Agent License earned!';
      current.tagBn = 'গোয়েন্দা আন্টি: পরাস্ত!';
      current.tagEn = 'Aunty 007: Case Closed!';
    }
  }

  if (isOneAway && !hasWon) {
    if (occasionId === 'aunty007') {
      current.dialogueBn = 'আর একটি ক্লু পেলেই সব রহস্য ফাঁস?! দাঁড়াও দেখছি!';
      current.dialogueEn = 'Just one clue away from cracking the case?! Hold on!';
    } else {
      current.dialogueBn = 'আর মাত্র একটি প্রশ্ন মিললেই তো জিতে যাবে?! সাবধান!';
      current.dialogueEn = 'Just one more question to win?! Watch out!';
    }
  }
  const IconComponent = current.icon;

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white dark:bg-[#1f1318] border border-[#D8C6B6] dark:border-[#3d232c] shadow-xs mb-3">
        <div className="w-14 h-14 relative shrink-0">
          <img
            key={tier}
            src={current.image}
            alt={current.alt}
            className="w-full h-full object-contain filter drop-shadow-md animate-in zoom-in-95 duration-300"
          />
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${current.badgeColor}`}>
              <IconComponent className="text-[9px]" />
              <span>{lang === 'bn' ? current.tagBn : current.tagEn}</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-[#6E554D] dark:text-[#c7a9b3]">
              {percentage}%
            </span>
          </div>
          <p className="text-xs font-semibold text-[#2B1B17] dark:text-[#fbf5ef] leading-tight">
            "{lang === 'bn' ? current.dialogueBn : current.dialogueEn}"
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center p-3 sm:p-4 select-none group">
      {/* Dynamic Header */}
      <h3 className="font-serif font-black text-lg sm:text-xl text-[#8E1B3A] dark:text-[#ff7597] mb-2 leading-snug">
        {lang === 'bn' ? 'আন্টির অনেক প্রশ্ন।' : "Aunty's got questions."}
      </h3>

      {/* Live Speech Bubble */}
      <div className="relative max-w-[210px] bg-white dark:bg-[#1f1318] rounded-2xl p-2.5 sm:p-3 border border-[#D8C6B6] dark:border-[#3d232c] shadow-xs mb-1.5 transition-all duration-300">
        <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8E1B3A] dark:text-[#ff7597] mb-1">
          <CommentsIcon className="text-[9px]" />
          <span>{lang === 'bn' ? 'আন্টির প্রতিক্রিয়া' : 'Live Reaction'}</span>
        </div>
        <p className="text-xs font-medium text-[#2B1B17] dark:text-[#fbf5ef] leading-snug">
          "{lang === 'bn' ? current.dialogueBn : current.dialogueEn}"
        </p>

        {/* Speech Bubble Arrow pointing down */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-[#1f1318] border-b border-r border-[#D8C6B6] dark:border-[#3d232c] transform rotate-45" />
      </div>

      {/* 3D Character Avatar with Live Reactive Expression */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 my-1 flex items-center justify-center">
        {/* Soft 3D Glow / Lighting Backdrop */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#8E1B3A]/10 via-amber-500/10 to-transparent blur-xl pointer-events-none" />

        <img
          key={tier}
          src={current.image}
          alt={current.alt}
          className="w-full h-full object-contain filter drop-shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:-rotate-1 animate-in zoom-in-95"
        />
      </div>

      {/* Live Mood Indicator Pill */}
      <div className="mt-1">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs transition-all duration-300 ${current.badgeColor}`}>
          <IconComponent className="text-xs" />
          <span>{lang === 'bn' ? current.tagBn : current.tagEn}</span>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-xs font-bold text-[#8E1B3A] dark:text-[#ff7597] mt-2.5">
        {lang === 'bn' ? 'আপনার আছে বিঙ্গো বোর্ড।' : "You've got a bingo board."}
      </p>
    </div>
  );
}
