import React from 'react';
import { VolumeHighIcon, VolumeXmarkIcon, QuestionIcon, SunIcon, MoonIcon } from './FontAwesomeIcons';
import auntyAvatarUrl from '../assets/mascots/aunty_avatar_perfect.png';

export default function Header({
  lang,
  setLang,
  onOpenHowTo,
  soundEnabled,
  setSoundEnabled,
  activeView,
  onNavigate,
  theme = 'light',
  onToggleTheme
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFDF9]/90 dark:bg-[#1a1014]/90 backdrop-blur-md border-b border-[#D8C6B6]/60 dark:border-[#3d232c] transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-2.5 px-4 sm:px-6">
        {/* Brand Logo & Avatar */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F4E8D9] dark:bg-[#2c1720] p-0.5 overflow-hidden flex items-center justify-center border border-[#D8C6B6] dark:border-[#4d2736] group-hover:scale-105 transition-transform duration-300">
            <img src={auntyAvatarUrl} alt="Aunty Avatar" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#8E1B3A] dark:text-[#ff7597]">
                Aunty Bingo
              </span>
            </div>
            <p className="text-xs text-[#6E554D] dark:text-[#c7a9b3] hidden sm:block">
              {lang === 'bn' ? 'আত্মীয়দের প্রশ্ন সামলান' : 'The family function survival game'}
            </p>
          </div>
        </div>

        {/* Navigation Links for Desktop */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F4E8D9]/70 dark:bg-[#28181f] p-1 rounded-full border border-[#D8C6B6] dark:border-[#422530]">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'home'
                ? 'bg-[#8E1B3A] text-white shadow-sm'
                : 'text-[#6E554D] dark:text-[#c7a9b3] hover:text-[#8E1B3A] dark:hover:text-[#ff91ac]'
            }`}
          >
            {lang === 'bn' ? 'হোম' : 'Home'}
          </button>
          <button
            onClick={() => onNavigate('game')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'game'
                ? 'bg-[#8E1B3A] text-white shadow-sm'
                : 'text-[#6E554D] dark:text-[#c7a9b3] hover:text-[#8E1B3A] dark:hover:text-[#ff91ac]'
            }`}
          >
            {lang === 'bn' ? 'বিঙ্গো খেলুন' : 'Play Bingo'}
          </button>
          <button
            onClick={() => onNavigate('occasions')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'occasions'
                ? 'bg-[#8E1B3A] text-white shadow-sm'
                : 'text-[#6E554D] dark:text-[#c7a9b3] hover:text-[#8E1B3A] dark:hover:text-[#ff91ac]'
            }`}
          >
            {lang === 'bn' ? 'অনুষ্ঠান' : 'Occasions'}
          </button>
          <button
            onClick={() => onNavigate('rules')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'rules'
                ? 'bg-[#8E1B3A] text-white shadow-sm'
                : 'text-[#6E554D] dark:text-[#c7a9b3] hover:text-[#8E1B3A] dark:hover:text-[#ff91ac]'
            }`}
          >
            {lang === 'bn' ? 'নিয়মাবলী' : 'Rules'}
          </button>
        </nav>

        {/* Right Controls: Theme, Sound, Language Switch, Help */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Toggle (Dark / Light) with FontAwesome */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-full text-[#8E1B3A] dark:text-[#ff91ac] hover:bg-[#8E1B3A]/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
            title={theme === 'dark' ? (lang === 'bn' ? 'লাইট মোড চালু করুন' : 'Switch to Light Mode') : (lang === 'bn' ? 'ডার্ক মোড চালু করুন' : 'Switch to Dark Mode')}
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="text-sm text-amber-400" />
            ) : (
              <MoonIcon className="text-sm text-[#8E1B3A]" />
            )}
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-8 h-8 rounded-full text-[#8E1B3A] dark:text-[#ff91ac] hover:bg-[#8E1B3A]/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            {soundEnabled ? <VolumeHighIcon className="text-sm" /> : <VolumeXmarkIcon className="text-sm" />}
          </button>

          {/* Bilingual Switch Pill [ EN | বাং ] */}
          <div className="flex items-center bg-[#F4E8D9] dark:bg-[#28181f] p-0.5 rounded-full border border-[#D8C6B6] dark:border-[#422530]">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#8E1B3A] text-white shadow-sm'
                  : 'text-[#6E554D] dark:text-[#c7a9b3] hover:text-[#8E1B3A] dark:hover:text-[#ff91ac]'
              }`}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <button
              onClick={() => setLang('bn')}
              className={`px-2 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                lang === 'bn'
                  ? 'bg-[#8E1B3A] text-white shadow-sm'
                  : 'text-[#6E554D] dark:text-[#c7a9b3] hover:text-[#8E1B3A] dark:hover:text-[#ff91ac]'
              }`}
              aria-pressed={lang === 'bn'}
            >
              বাং
            </button>
          </div>

          {/* Help Button (?) */}
          <button
            onClick={onOpenHowTo}
            className="w-8 h-8 rounded-full border border-[#8E1B3A] dark:border-[#ff7597] text-[#8E1B3A] dark:text-[#ff7597] flex items-center justify-center font-bold text-xs hover:bg-[#8E1B3A]/10 dark:hover:bg-white/10 transition-colors shadow-sm cursor-pointer"
            title={lang === 'bn' ? 'নিয়মাবলী দেখুন' : 'How to play'}
            aria-label="How to play"
          >
            <QuestionIcon className="text-sm" />
          </button>
        </div>
      </div>
    </header>
  );
}
