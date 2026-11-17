import React from 'react';
import { GaugeIcon, SmileIcon, FireIcon, TrophyIcon, ShieldIcon } from './FontAwesomeIcons';

export default function StressMeter({ markedCount, totalTiles, lang = 'bn' }) {
  const percentage = Math.min(100, Math.round((markedCount / Math.max(1, totalTiles)) * 100));

  let tier = 'chill';
  if (percentage >= 80) tier = 'meltdown';
  else if (percentage >= 50) tier = 'interrogation';
  else if (percentage >= 20) tier = 'suspicious';

  const tierData = {
    chill: {
      color: 'bg-emerald-500',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      borderColor: 'border-emerald-300 dark:border-emerald-800',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
      icon: SmileIcon,
      title: lang === 'bn' ? 'শান্ত আন্টি (চা খাচ্ছেন)' : 'Chill Aunty (Sipping Tea)',
      subtitle: lang === 'bn' ? 'আড্ডা সবে শুরু, এখনো জেরা জমে ওঠেনি' : 'Gathering just began, calm before the storm'
    },
    suspicious: {
      color: 'bg-amber-500',
      textColor: 'text-amber-800 dark:text-amber-300',
      borderColor: 'border-amber-300 dark:border-amber-800',
      badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
      icon: GaugeIcon,
      title: lang === 'bn' ? 'সন্দেহজনক দৃষ্টি (চশমা ঠিক করছেন)' : 'Suspicious Glance (Adjusting Glasses)',
      subtitle: lang === 'bn' ? 'কৌতূহল বাড়ছে, প্রস্তুত থাকুন' : 'Curiosity rising, brace yourself'
    },
    interrogation: {
      color: 'bg-orange-500',
      textColor: 'text-orange-800 dark:text-orange-300',
      borderColor: 'border-orange-300 dark:border-orange-800',
      badgeBg: 'bg-orange-100 dark:bg-orange-950/60',
      icon: FireIcon,
      title: lang === 'bn' ? 'তীব্র জেরা (ব্যক্তিগত আক্রমণে আন্টি)' : 'Intense Interrogation Mode',
      subtitle: lang === 'bn' ? 'বিয়ে ও স্যালারির প্রশ্ন একের পর এক ধেয়ে আসছে' : 'Salary and marriage questions incoming'
    },
    meltdown: {
      color: 'bg-[#8E1B3A]',
      textColor: 'text-[#8E1B3A] dark:text-rose-400',
      borderColor: 'border-rose-300 dark:border-rose-800',
      badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
      icon: TrophyIcon,
      title: lang === 'bn' ? 'রেড অ্যালার্ট! আন্টি পরাস্ত!' : 'Red Alert! Aunty Defeated!',
      subtitle: lang === 'bn' ? 'আপনি সফলভাবে সব প্রশ্নের জবাব দিয়ে টিকে গেছেন' : 'You successfully survived the family trial'
    }
  };

  const current = tierData[tier];
  const IconComponent = current.icon;

  return (
    <div className="w-full max-w-md mx-auto mb-3 px-3 py-2.5 rounded-2xl bg-white dark:bg-[#1f1318] border border-[#D8C6B6] dark:border-[#422530] shadow-xs">
      {/* Top Header Label */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5">
          <div className={`w-5 h-5 rounded-md ${current.badgeBg} ${current.textColor} flex items-center justify-center text-xs`}>
            <IconComponent className="text-[11px]" />
          </div>
          <span className="text-xs font-semibold text-[#2B1B17] dark:text-[#fbf5ef]">
            {current.title}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#6E554D] dark:text-[#c7a9b3]">
          <ShieldIcon className="text-[10px] text-[#8E1B3A] dark:text-rose-400" />
          <span>{percentage}%</span>
        </div>
      </div>

      {/* Progress Track Bar */}
      <div className="w-full h-2 rounded-full bg-[#F4E8D9] dark:bg-[#2b1922] overflow-hidden">
        <div
          style={{ width: `${percentage}%` }}
          className={`h-full ${current.color} transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full`}
        />
      </div>

      {/* Microcopy Subtitle */}
      <p className="text-[11px] font-normal text-[#6E554D] dark:text-[#a89098] mt-1.5 text-pretty leading-tight">
        {current.subtitle}
      </p>
    </div>
  );
}
