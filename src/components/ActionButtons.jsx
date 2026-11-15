import React from 'react';
import {
  DownloadIcon,
  ShuffleIcon,
  RotateLeftIcon,
  InstagramIcon,
  FacebookIcon,
  MessengerIcon,
  WhatsAppIcon
} from './FontAwesomeIcons';

export default function ActionButtons({
  onShuffle,
  onReset,
  onExport,
  onSocialClick,
  lang,
  isDesktop = false
}) {
  return (
    <div className={`w-full flex flex-col gap-2.5 sm:gap-3 ${isDesktop ? 'px-0' : 'max-w-[420px] mx-auto px-3'}`}>
      {/* 1. Primary Action: Full-width Export Card Button */}
      <button
        onClick={onExport}
        className="w-full py-3 px-4 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] dark:bg-[#a62245] dark:hover:bg-[#8E1B3A] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all cursor-pointer whitespace-nowrap"
      >
        <DownloadIcon className="text-sm" />
        <span>{lang === 'bn' ? 'কার্ড এক্সপোর্ট' : 'Export Card'}</span>
      </button>

      {/* 2. Secondary Row: Equal 50/50 columns for Shuffle and Reset */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onShuffle}
          className="w-full py-2.5 px-2 rounded-full border-2 border-[#8E1B3A] dark:border-[#ff7597] text-[#8E1B3A] dark:text-[#ff7597] font-bold text-xs sm:text-sm hover:bg-[#8E1B3A]/5 dark:hover:bg-white/5 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
          title={lang === 'bn' ? 'নতুন প্রশ্ন দিয়ে বোর্ড সাজান' : 'Shuffle phrases and get new board'}
        >
          <ShuffleIcon className="text-xs" />
          <span>{lang === 'bn' ? 'নতুন বোর্ড' : 'Shuffle'}</span>
        </button>

        <button
          onClick={onReset}
          className="w-full py-2.5 px-2 rounded-full border border-[#D8C6B6] dark:border-[#422530] bg-white dark:bg-[#20151a] text-[#2B1B17] dark:text-[#fbf5ef] font-bold text-xs sm:text-sm hover:bg-[#F2EAE1] dark:hover:bg-[#2c1720] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
          title={lang === 'bn' ? 'প্রথম থেকে শুরু করুন' : 'Start over from beginning'}
        >
          <RotateLeftIcon className="text-xs" />
          <span>{lang === 'bn' ? 'প্রথম থেকে' : 'Start Over'}</span>
        </button>
      </div>

      {/* 3. Social Platform Share Row */}
      <div className="pt-2 border-t border-[#E8DCD0] dark:border-[#38202c] flex items-center justify-center gap-2">
        <span className="text-xs font-bold text-[#6E554D] dark:text-[#c7a9b3] mr-0.5 whitespace-nowrap">
          {lang === 'bn' ? 'শেয়ার:' : 'Share:'}
        </span>

        {/* Instagram Share Button */}
        <button
          onClick={() => onSocialClick('instagram')}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#D8C6B6] dark:border-[#422530] bg-white dark:bg-[#20151a] hover:bg-[#F9F4ED] dark:hover:bg-[#2c1720] text-[#8E1B3A] dark:text-[#ff7597] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          title="Share to Instagram"
          aria-label="Share to Instagram"
        >
          <InstagramIcon className="text-base" />
        </button>

        {/* Facebook Share Button */}
        <button
          onClick={() => onSocialClick('facebook')}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#D8C6B6] dark:border-[#422530] bg-white dark:bg-[#20151a] hover:bg-[#F9F4ED] dark:hover:bg-[#2c1720] text-[#1877F2] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          title="Share to Facebook"
          aria-label="Share to Facebook"
        >
          <FacebookIcon className="text-base" />
        </button>

        {/* WhatsApp Share Button */}
        <button
          onClick={() => onSocialClick('whatsapp')}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#D8C6B6] dark:border-[#422530] bg-white dark:bg-[#20151a] hover:bg-[#F9F4ED] dark:hover:bg-[#2c1720] text-[#25D366] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          title="Share to WhatsApp"
          aria-label="Share to WhatsApp"
        >
          <WhatsAppIcon className="text-base" />
        </button>

        {/* Messenger Share Button */}
        <button
          onClick={() => onSocialClick('messenger')}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#D8C6B6] dark:border-[#422530] bg-white dark:bg-[#20151a] hover:bg-[#F9F4ED] dark:hover:bg-[#2c1720] text-[#0084FF] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          title="Share via Messenger"
          aria-label="Share via Messenger"
        >
          <MessengerIcon className="text-base" />
        </button>
      </div>

      {/* 4. Microcopy below with clear instructions */}
      <div className="text-center mt-1">
        {isDesktop ? (
          <>
            <p className="text-xs font-bold text-[#8E1B3A] dark:text-[#ff7597]">
              {lang === 'bn'
                ? '৩ সারি • ৩ কলাম • ২ কোণাকুণি • ৮টি জয়ের লাইন'
                : '3 rows • 3 columns • 2 diagonals • 8 winning lines'}
            </p>
            <p className="text-xs text-[#6E554D] dark:text-[#c7a9b3] mt-0.5 leading-tight">
              {lang === 'bn'
                ? 'ট্যাপ করে দাগ দিন • ভুলে ক্লিক করলে ডাবল ক্লিকে আনমার্ক করুন • সম্পূর্ণ প্রশ্ন দেখতে (i) চাপুন'
                : 'Click to mark • Double-click to unmark • Click (i) for full text'}
            </p>
          </>
        ) : (
          <p className="text-xs text-[#6E554D] dark:text-[#c7a9b3] font-medium leading-tight">
            {lang === 'bn'
              ? 'ভুলে ক্লিক করলে ডাবল ক্লিকে আনমার্ক করুন • সম্পূর্ণ প্রশ্ন দেখতে (i) চাপুন'
              : 'Double-tap to unmark • Tap (i) to read full text'}
          </p>
        )}
      </div>
    </div>
  );
}
