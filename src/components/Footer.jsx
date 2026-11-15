import React from 'react';
import { HeartIcon } from './FontAwesomeIcons';
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
          <span className="font-bold text-xl text-[#8E1B3A]">Aunty Bingo</span>
        </div>

        {/* Love Note */}
        <p className="text-xs sm:text-sm font-semibold text-[#2B1B17] max-w-lg">
          {lang === 'bn' ? (
            <span>
              আন্টি বিঙ্গো <HeartIcon className="text-[#8E1B3A] text-xs inline mx-1" /> বিশ্বজুড়ে বাঙালি পরিবারগুলোর আনন্দময় আড্ডার জন্য তৈরি।
            </span>
          ) : (
            <span>
              Aunty Bingo <HeartIcon className="text-[#8E1B3A] text-xs inline mx-1" /> Made for Bengali family gatherings everywhere.
            </span>
          )}
        </p>

        {/* Cultural Disclaimer */}
        <p className="text-xs text-[#6E554D] max-w-xl mt-1.5 leading-relaxed">
          {lang === 'bn'
            ? 'সবগুলো প্রশ্ন আমাদের মিষ্টি সংস্কৃতির অংশ হিসেবে মজার ছলে পরিবেশন করা হয়েছে। কোনো অপমান বা অসম্মান উদ্দেশ্য নয়।'
            : 'All phrases are lighthearted celebrations of Bengali family culture. No offence intended.'}
        </p>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 my-4 text-xs font-semibold text-[#8E1B3A]">
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
            {lang === 'bn' ? 'নিয়মাবলী' : 'Rules'}
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className="hover:underline transition-colors cursor-pointer flex items-center gap-1 opacity-80 hover:opacity-100"
            title="Admin & Question Control"
          >
            <span>🔒</span>
            <span>{lang === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}</span>
          </button>
        </nav>

        {/* Legal & Privacy Links (per B10 ship requirement) */}
        <div className="flex items-center gap-4 text-xs text-[#8A7268] mt-1 pt-3 border-t border-[#E8DCD0] w-full max-w-md justify-center">
          <span>{lang === 'bn' ? 'গোপনীয়তা ১০০% ব্যক্তিগত' : '100% Client-side Private'}</span>
          <span>•</span>
          <span>{lang === 'bn' ? 'কপিরাইট ২০২৬' : 'Copyright 2026'}</span>
          <span>•</span>
          <span>{lang === 'bn' ? 'কোনো কুকি ট্র্যাকিং নেই' : 'No Tracking Cookies'}</span>
        </div>
      </div>
    </footer>
  );
}
