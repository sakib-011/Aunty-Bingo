import React, { useState } from 'react';
import {
  CloseIcon,
  CheckIcon,
  RotateLeftIcon,
  FireIcon,
  SmileIcon,
  LaughIcon,
  CopyIcon,
  CommentsIcon
} from './FontAwesomeIcons';
import aunty3dInterrogationUrl from '../assets/mascots/aunty_3d_interrogation.png';
import { getComebacksForTile } from '../utils/comebacks';

export default function QuestionModal({
  tile,
  isMarked,
  onToggleMark,
  onClose,
  lang,
  occasionName
}) {
  const [activeComebackTab, setActiveComebackTab] = useState('savage'); // 'savage' | 'polite' | 'funny'
  const [copied, setCopied] = useState(false);

  if (!tile) return null;

  const comebacks = getComebacksForTile(tile, lang);
  const currentComebackText = comebacks[activeComebackTab] || comebacks.savage;

  const handleCopyComeback = async () => {
    try {
      await navigator.clipboard.writeText(currentComebackText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const tabs = [
    { id: 'savage', label: lang === 'bn' ? 'স্যভেজ জবাব' : 'Savage', icon: FireIcon, color: 'text-rose-600 dark:text-rose-400' },
    { id: 'polite', label: lang === 'bn' ? 'ভদ্র জবাব' : 'Polite', icon: SmileIcon, color: 'text-emerald-600 dark:text-emerald-400' },
    { id: 'funny', label: lang === 'bn' ? 'মজার জবাব' : 'Funny', icon: LaughIcon, color: 'text-amber-600 dark:text-amber-400' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#FFFDF9] dark:bg-stone-900 rounded-3xl shadow-2xl border-2 border-[#8E1B3A] dark:border-rose-600 p-5 sm:p-6 text-center animate-in zoom-in-95 duration-150 max-h-[94vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F4E8D9] dark:bg-stone-800 text-[#8E1B3A] dark:text-rose-400 flex items-center justify-center hover:bg-[#EBDDCB] dark:hover:bg-stone-700 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <CloseIcon className="text-sm" />
        </button>

        {/* 3D Character Avatar */}
        <div className="w-16 h-16 mx-auto mb-2 relative">
          <img
            src={aunty3dInterrogationUrl}
            alt="3D Aunty Asking Question"
            className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Category Tag */}
        <div className="inline-block bg-[#F4E8D9] dark:bg-stone-800 text-[#8E1B3A] dark:text-rose-300 text-xs font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
          {occasionName}
        </div>

        {/* Full Question in Bengali */}
        <div className="bg-[#FFF6E5] dark:bg-stone-800 rounded-2xl p-3.5 sm:p-4 border border-[#D8C6B6] dark:border-stone-700 mb-3 text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E1B3A] dark:text-rose-400 block mb-1">
            {lang === 'bn' ? 'আন্টির প্রশ্ন:' : 'Aunty Asks:'}
          </span>
          <p className="font-bold text-base sm:text-lg text-[#2B1B17] dark:text-stone-100 leading-snug">
            {tile.bn}
          </p>
          {tile.en && (
            <p className="text-xs text-[#6E554D] dark:text-stone-400 mt-1 font-medium border-t border-[#D8C6B6]/60 dark:border-stone-700 pt-1">
              "{tile.en}"
            </p>
          )}
        </div>

        {/* NEW FEATURE: AUNTY SAVAGE COMEBACKS (মোক্ষম জবাব) */}
        <div className="bg-white dark:bg-stone-800/80 rounded-2xl p-3 sm:p-3.5 border border-[#D8C6B6] dark:border-stone-700 mb-3 shadow-xs text-left">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-[#8E1B3A] dark:text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
              <CommentsIcon className="text-xs" />
              <span>{lang === 'bn' ? 'আন্টিকে দেওয়ার মোক্ষম জবাব' : 'Aunty Savage Comebacks'}</span>
            </span>
            <span className="text-[10px] font-semibold text-[#6E554D] dark:text-stone-400">
              {lang === 'bn' ? '১-ক্লিকে কপি' : '1-Click Copy'}
            </span>
          </div>

          {/* Comeback Type Selector Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F4E8D9] dark:bg-stone-900 rounded-xl mb-2.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeComebackTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveComebackTab(tab.id)}
                  className={`py-1 px-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-stone-800 text-[#8E1B3A] dark:text-rose-300 shadow-xs'
                      : 'text-[#6E554D] dark:text-stone-400 hover:text-[#2B1B17]'
                  }`}
                >
                  <Icon className={`text-[10px] ${tab.color}`} />
                  <span className="text-[11px]">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Comeback Box */}
          <div className="p-3 rounded-xl bg-[#FFFDF9] dark:bg-stone-900 border border-[#D8C6B6]/60 dark:border-stone-700 relative group">
            <p className="text-xs sm:text-sm font-medium text-[#2B1B17] dark:text-stone-200 leading-relaxed pr-8">
              "{currentComebackText}"
            </p>

            <button
              onClick={handleCopyComeback}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#F4E8D9] dark:bg-stone-800 text-[#8E1B3A] dark:text-rose-300 hover:bg-[#8E1B3A] hover:text-white dark:hover:bg-rose-700 transition-colors cursor-pointer shadow-xs"
              title={lang === 'bn' ? 'জবাব কপি করুন' : 'Copy comeback'}
              aria-label="Copy comeback"
            >
              {copied ? <CheckIcon className="text-xs text-green-600 dark:text-green-400" /> : <CopyIcon className="text-xs" />}
            </button>
          </div>

          {copied && (
            <p className="text-[11px] font-semibold text-green-600 dark:text-green-400 mt-1.5 text-center">
              {lang === 'bn' ? 'জবাব ক্লিপবোর্ডে কপি হয়েছে! মেসেঞ্জারে পেস্ট করুন।' : 'Comeback copied to clipboard! Paste in chat.'}
            </p>
          )}
        </div>

        {/* Action Button: Mark or Unmark */}
        <div className="flex flex-col gap-2 mt-3">
          <button
            onClick={() => {
              onToggleMark();
              onClose();
            }}
            className={`w-full py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer ${
              isMarked
                ? 'bg-[#F2EAE1] dark:bg-stone-800 border border-[#8E1B3A] dark:border-rose-400 text-[#8E1B3A] dark:text-rose-300 hover:bg-[#EBDDCB] dark:hover:bg-stone-700'
                : 'bg-[#8E1B3A] hover:bg-[#75142E] dark:bg-rose-700 dark:hover:bg-rose-600 text-white'
            }`}
          >
            {isMarked ? (
              <>
                <RotateLeftIcon className="text-sm" />
                <span>{lang === 'bn' ? 'দাগ মুছে ফেলুন (Unmark)' : 'Unmark this Tile'}</span>
              </>
            ) : (
              <>
                <CheckIcon className="text-sm" />
                <span>{lang === 'bn' ? 'ঘরে দাগ দিন (Mark Tile)' : 'Mark this Tile'}</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full py-1.5 text-xs font-semibold text-[#6E554D] dark:text-stone-400 hover:text-[#8E1B3A] dark:hover:text-rose-400 transition-colors cursor-pointer"
          >
            {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
