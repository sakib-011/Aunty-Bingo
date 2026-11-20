import React from 'react';
import {
  HeartIcon,
  LockIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldIcon
} from './FontAwesomeIcons';
import auntyAvatarUrl from '../assets/mascots/aunty_avatar_perfect.png';
import pointfexLogoUrl from '../assets/images/pointfex-logo.jpg';

export default function Footer({ lang, onNavigate }) {
  return (
    <footer className="w-full bg-[#FFFDF9] dark:bg-[#1a1014] border-t border-[#D8C6B6]/60 dark:border-[#3d232c] mt-16 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col gap-8 sm:gap-10">
        
        {/* POINTFEX DEVELOPER SPOTLIGHT CARD */}
        <div className="rounded-2xl bg-[#FFF6E5]/80 dark:bg-[#23151b] border border-[#D8C6B6]/70 dark:border-[#422530] p-5 sm:p-6 transition-all duration-300 hover:border-[#8E1B3A]/30 dark:hover:border-[#ff7597]/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
            {/* PointFex Official Logo */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-[#D8C6B6] dark:border-blue-900/50 shadow-sm shrink-0 bg-[#070b19] p-0.5 flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <img
                src={pointfexLogoUrl}
                alt="PointFex Official Logo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Developer Details */}
            <div className="flex flex-col items-center sm:items-start">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#8E1B3A]/10 text-[#8E1B3A] dark:bg-[#ff7597]/15 dark:text-[#ff91ac] w-fit mb-1">
                <SparklesIcon className="text-[10px]" />
                <span>{lang === 'bn' ? 'সফটওয়্যার স্টুডিও' : 'Software Studio'}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#2B1B17] dark:text-[#fbf5ef] tracking-tight">
                {lang === 'bn' ? 'পয়েন্টফেক্স (PointFex) কর্তৃক ভালোবাসায় নির্মিত' : 'Proudly developed by PointFex'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E554D] dark:text-[#c7a9b3] mt-0.5 leading-relaxed">
                {lang === 'bn'
                  ? 'অর্থপূর্ণ ও আধুনিক ডিজিটাল অভিজ্ঞতার বিশ্বস্ত রূপকার।'
                  : 'Building digital experiences that make a difference.'}
              </p>
            </div>
          </div>

          {/* Company Website CTA Link */}
          <a
            href="https://pointfex.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] dark:bg-[#a62245] dark:hover:bg-[#8E1B3A] text-white text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98] cursor-pointer group whitespace-nowrap"
            title="Explore PointFex official website"
          >
            <span>{lang === 'bn' ? 'পয়েন্টফেক্স ভিজিট করুন' : 'Visit PointFex'}</span>
            <ArrowRightIcon className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* MIDDLE SECTION: AUNTY BINGO APP INFO & NAVIGATION */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pt-2 text-center md:text-left">
          {/* Brand & Cultural Note */}
          <div className="flex flex-col items-center md:items-start max-w-md">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 mb-2 cursor-pointer select-none group"
            >
              <div className="w-8 h-8 rounded-full bg-[#F4E8D9] dark:bg-[#2c1720] p-0.5 overflow-hidden flex items-center justify-center border border-[#D8C6B6] dark:border-[#4d2736] group-hover:scale-105 transition-transform duration-300">
                <img src={auntyAvatarUrl} alt="Aunty Avatar" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-xl text-[#8E1B3A] dark:text-[#ff7597] tracking-tight">
                Aunty Bingo
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-[#2B1B17] dark:text-[#fbf5ef]">
              {lang === 'bn' ? (
                <span>
                  আন্টি বিঙ্গো <HeartIcon className="text-[#8E1B3A] dark:text-[#ff7597] text-xs inline mx-0.5" /> বিশ্বজুড়ে বাঙালি পরিবারগুলোর আনন্দময় আড্ডার জন্য তৈরি।
                </span>
              ) : (
                <span>
                  Aunty Bingo <HeartIcon className="text-[#8E1B3A] dark:text-[#ff7597] text-xs inline mx-0.5" /> Made for Bengali family gatherings everywhere.
                </span>
              )}
            </p>

            <p className="text-xs text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 leading-relaxed">
              {lang === 'bn'
                ? 'সবগুলো প্রশ্ন আমাদের মিষ্টি সংস্কৃতির অংশ হিসেবে মজার ছলে পরিবেশন করা হয়েছে। কোনো অপমান বা অসম্মান উদ্দেশ্য নয়।'
                : 'All phrases are lighthearted celebrations of Bengali family culture. No offence intended.'}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-end gap-2.5">
            <span className="text-xs font-bold text-[#6E554D] dark:text-[#c7a9b3] uppercase tracking-wider">
              {lang === 'bn' ? 'ন্যাভিগেশন' : 'Quick Links'}
            </span>
            <nav className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-5 text-xs font-semibold text-[#8E1B3A] dark:text-[#ff7597]">
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
                className="hover:underline transition-colors cursor-pointer flex items-center gap-1.5 opacity-80 hover:opacity-100"
                title="Admin & Question Control"
              >
                <LockIcon className="text-xs" />
                <span>{lang === 'bn' ? 'অ্যাডমিন' : 'Admin'}</span>
              </button>
            </nav>
          </div>
        </div>

        {/* BOTTOM SECTION: ELEGANT COPYRIGHT & CLIENT PRIVACY */}
        <div className="border-t border-[#E8DCD0] dark:border-[#38202c] pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8A7268] dark:text-[#a08b93]">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              © 2026 PointFex. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium">
            <span className="inline-flex items-center gap-1">
              <ShieldIcon className="text-[10px] text-[#8E1B3A] dark:text-[#ff7597]" />
              {lang === 'bn' ? '১০০% ক্লায়েন্ট-সাইড সুরক্ষিত' : '100% Client-side Private'}
            </span>
            <span>•</span>
            <span>{lang === 'bn' ? 'কুকি ট্র্যাকিং মুক্ত' : 'Zero Cookie Tracking'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
