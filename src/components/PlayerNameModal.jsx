import React, { useState, useRef, useEffect } from 'react';
import { UserIcon, GamepadIcon, CloseIcon, ArrowRightIcon } from './FontAwesomeIcons';

export default function PlayerNameModal({
  isOpen,
  onSubmit,
  onSkip,
  lang = 'bn'
}) {
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to let the modal animate in before focusing
      const timer = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    onSubmit(trimmed || '');
  };

  const handleSkip = () => {
    onSkip();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#FFFDF9] dark:bg-[#1a1014] rounded-3xl shadow-2xl border-2 border-[#D8C6B6] dark:border-[#422530] p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200 overflow-hidden">

        {/* Skip / Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F4E8D9] dark:bg-[#28181f] text-[#8E1B3A] dark:text-[#ff7597] flex items-center justify-center hover:bg-[#EBDDCB] dark:hover:bg-[#341b25] transition-colors cursor-pointer"
          aria-label="Skip"
        >
          <CloseIcon className="text-sm" />
        </button>

        {/* Avatar Circle */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#8E1B3A] to-[#B84B12] flex items-center justify-center shadow-lg">
          <UserIcon className="text-white text-xl sm:text-2xl" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#8E1B3A] dark:text-[#ff7597] mb-1">
          {lang === 'bn' ? 'খেলোয়াড়ের নাম দিন' : 'Enter Your Name'}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-[#6E554D] dark:text-[#c7a9b3] mb-5 font-medium leading-relaxed max-w-[320px] mx-auto">
          {lang === 'bn'
            ? 'আপনার নাম বিঙ্গো কার্ডে দেখা যাবে! বন্ধুদের সাথে শেয়ার করলে আরও মজা।'
            : 'Your name will appear on the bingo card! Makes sharing with friends even more fun.'}
        </p>

        {/* Name Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E1B3A] dark:text-[#ff7597]">
              <UserIcon className="text-sm" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === 'bn' ? 'আপনার নাম লিখুন...' : 'Type your name...'}
              maxLength={30}
              className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-2xl border-2 border-[#D8C6B6] dark:border-[#422530] bg-white dark:bg-[#20151a] text-[#2B1B17] dark:text-[#fbf5ef] text-sm sm:text-base font-semibold placeholder:text-[#8A7268] dark:placeholder:text-[#6a5560] focus:border-[#8E1B3A] dark:focus:border-[#ff7597] focus:outline-none focus:ring-2 focus:ring-[#8E1B3A]/20 dark:focus:ring-[#ff7597]/20 transition-all"
              autoComplete="off"
              spellCheck={false}
            />
            {name.trim() && (
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-[#8A7268] dark:text-[#6a5560]">
                {name.trim().length}/30
              </span>
            )}
          </div>

          {/* Play Button */}
          <button
            type="submit"
            className="w-full py-3 sm:py-3.5 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] dark:bg-[#8E1B3A] dark:hover:bg-[#75142E] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer"
          >
            <GamepadIcon className="text-sm" />
            <span>
              {name.trim()
                ? (lang === 'bn' ? `${name.trim()} হিসেবে খেলুন` : `Play as ${name.trim()}`)
                : (lang === 'bn' ? 'এখনই বিঙ্গো খেলুন' : 'Play Bingo Now')}
            </span>
            <ArrowRightIcon className="text-xs" />
          </button>
        </form>

        {/* Skip Link */}
        <button
          onClick={handleSkip}
          className="mt-3 text-xs font-semibold text-[#8A7268] dark:text-[#6a5560] hover:text-[#8E1B3A] dark:hover:text-[#ff7597] transition-colors cursor-pointer underline underline-offset-2"
        >
          {lang === 'bn' ? 'নাম ছাড়াই খেলুন →' : 'Skip & play without name →'}
        </button>

        {/* Privacy Note */}
        <p className="mt-3 text-[10px] text-[#8A7268] dark:text-[#6a5560] font-medium">
          {lang === 'bn'
            ? 'আপনার নাম শুধু এই ডিভাইসে সংরক্ষিত থাকবে। কোনো সার্ভারে পাঠানো হবে না।'
            : 'Your name stays only on this device. Nothing is sent to any server.'}
        </p>
      </div>
    </div>
  );
}
