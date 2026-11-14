import React from 'react';
import auntyAvatarUrl from '../assets/mascots/aunty_avatar_perfect.png';

export default function Footer({ lang, onNavigate }) {
  return (
    <footer className="w-full bg-[#FFFDF9] border-t border-[#D8C6B6]/60 mt-12 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Brand & Mascot */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-full bg-[#F4E8D9] p-0.5 overflow-hidden flex items-center justify-center border border-[#D8C6B6]">
            <img src={auntyAvatarUrl} alt="Aunty Avatar" className="w-full h-full object-contain" />
          </div>
          <span className="font-serif font-black text-xl text-[#8E1B3A]">Aunty Bingo</span>
        </div>

        {/* Love Note */}
        <p className="text-xs sm:text-sm font-semibold text-[#2B1B17] max-w-lg">
          {lang === 'bn'
            ? 'আন্টি বিঙ্গো — বিশ্বজুড়ে বাঙালি পরিবারগুলোর আনন্দময় আড্ডার জন্য তৈরি।'
            : 'Aunty Bingo — Made with ❤️ for Bengali family gatherings everywhere.'}
        </p>

        {/* Cultural Disclaimer */}
        <p className="text-[11px] sm:text-xs text-[#6E554D] max-w-xl mt-1.5 leading-relaxed">
          {lang === 'bn'
            ? 'সবগুলো প্রশ্ন আমাদের মিষ্টি সংস্কৃতির অংশ হিসেবে মজার ছলে পরিবেশন করা হয়েছে। কোনো অপমান বা অসম্মান উদ্দেশ্য নয়।'
            : 'All phrases are lighthearted celebrations of Bengali family culture. No offence intended!'}
        </p>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 my-4 text-xs font-bold text-[#8E1B3A]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:underline transition-colors cursor-pointer"
          >
            {lang === 'bn' ? 'হোম' : 'Home'}
          </button>
          <button
            onClick={() => onNavigate('game')}
            className="hover:underline transition-colors cursor-pointer"
          >
            {lang === 'bn' ? 'বিঙ্গো খেলুন' : 'Play Bingo'}
          </button>
          <button
            onClick={() => onNavigate('occasions')}
            className="hover:underline transition-colors cursor-pointer"
          >
            {lang === 'bn' ? 'অনুষ্ঠানসমূহ' : 'Occasions'}
          </button>
          <button
            onClick={() => onNavigate('rules')}
            className="hover:underline transition-colors cursor-pointer"
          >
            {lang === 'bn' ? 'নিয়মাবলী' : 'Rules & How to Play'}
          </button>
        </nav>

        {/* Copyright */}
        <div className="text-[11px] text-[#8A7268] font-medium pt-3 border-t border-[#EFE7DE] w-full max-w-md">
          {lang === 'bn'
            ? '© ২০২৬ আন্টি বিঙ্গো (Aunty Bingo)। সম্পূর্ণ ক্লায়েন্ট-সাইড ওয়েব অ্যাপ্লিকেশন।'
            : '© 2026 Aunty Bingo. Pure client-side static web application.'}
        </div>
      </div>
    </footer>
  );
}
