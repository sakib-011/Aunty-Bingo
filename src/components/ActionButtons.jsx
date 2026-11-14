import React from 'react';
import { RotateCcw } from 'lucide-react';
import { InstagramIcon, FacebookIcon, MessengerIcon, WhatsAppIcon } from './SocialIcons';

export default function ActionButtons({
  onShuffle,
  onReset,
  onExport,
  onSocialClick,
  lang,
  isDesktop = false
}) {
  return (
    <div className="w-full max-w-[420px] sm:max-w-[460px] md:max-w-[480px] mx-auto flex flex-col gap-2.5 sm:gap-3 px-3 sm:px-4">
      {/* Buttons Row: Shuffle & Reset */}
      <div className="flex items-center gap-2">
        <button
          onClick={onShuffle}
          className="flex-1 py-2.5 sm:py-3 rounded-full border-2 border-[#8E1B3A] text-[#8E1B3A] font-bold text-xs sm:text-sm hover:bg-[#8E1B3A]/5 active:scale-[0.99] transition-all text-center select-none shadow-sm cursor-pointer"
        >
          {lang === 'bn' ? 'নতুন বোর্ড (Shuffle)' : 'Shuffle / New Board'}
        </button>

        <button
          onClick={onReset}
          className="py-2.5 sm:py-3 px-4 rounded-full border border-[#D8C6B6] bg-white text-[#2B1B17] font-bold text-xs sm:text-sm hover:bg-[#F2EAE1] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          title={lang === 'bn' ? 'প্রথম থেকে শুরু করুন' : 'Start over from beginning'}
        >
          <RotateCcw size={15} />
          <span>{lang === 'bn' ? 'প্রথম থেকে' : 'Start Over'}</span>
        </button>
      </div>

      {/* Export Card & Social Row */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={onExport}
          className="flex-1 py-2.5 sm:py-3 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] text-white font-bold text-xs sm:text-base active:scale-[0.99] transition-all text-center select-none shadow-md cursor-pointer"
        >
          {lang === 'bn' ? 'কার্ড এক্সপোর্ট' : 'Export Card'}
        </button>

        {/* Instagram Share Button */}
        <button
          onClick={() => onSocialClick('instagram')}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-[#D8C6B6] bg-white hover:bg-[#F9F4ED] text-[#8E1B3A] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          title="Share to Instagram"
          aria-label="Share to Instagram"
        >
          <InstagramIcon size={19} />
        </button>

        {/* Facebook Share Button */}
        <button
          onClick={() => onSocialClick('facebook')}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-[#D8C6B6] bg-white hover:bg-[#F9F4ED] text-[#1877F2] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          title="Share to Facebook"
          aria-label="Share to Facebook"
        >
          <FacebookIcon size={19} />
        </button>

        {/* WhatsApp Share Button */}
        <button
          onClick={() => onSocialClick('whatsapp')}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-[#D8C6B6] bg-white hover:bg-[#F9F4ED] text-[#25D366] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          title="Share to WhatsApp"
          aria-label="Share to WhatsApp"
        >
          <WhatsAppIcon size={19} />
        </button>

        {/* Messenger Share Button */}
        <button
          onClick={() => onSocialClick('messenger')}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-[#D8C6B6] bg-white hover:bg-[#F9F4ED] text-[#0084FF] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          title="Share via Messenger"
          aria-label="Share via Messenger"
        >
          <MessengerIcon size={19} />
        </button>
      </div>

      {/* Microcopy below with clear double click instructions */}
      <div className="text-center mt-0.5">
        {isDesktop ? (
          <>
            <p className="text-xs font-bold text-[#8E1B3A]">
              {lang === 'bn'
                ? '৩ সারি • ৩ কলাম • ২ কোণাকুণি • ৮টি জয়ের লাইন'
                : '3 rows • 3 columns • 2 diagonals • 8 winning lines'}
            </p>
            <p className="text-[11px] text-[#6E554D] mt-0.5">
              {lang === 'bn'
                ? 'ট্যাপ করে দাগ দিন • ভুলে ক্লিক করলে ডাবল ক্লিকে আনমার্ক করুন • সম্পূর্ণ প্রশ্ন দেখতে (i) চাপুন'
                : 'Click to mark • Double-click to unmark if clicked by mistake • Click (i) for full text'}
            </p>
          </>
        ) : (
          <p className="text-[11px] text-[#6E554D] font-medium">
            {lang === 'bn'
              ? 'ভুলে ক্লিক করলে ডাবল ক্লিকে আনমার্ক করুন • সম্পূর্ণ প্রশ্ন দেখতে (i) চাপুন'
              : 'Double-tap to unmark if marked by mistake • Tap (i) to read full text'}
          </p>
        )}
      </div>
    </div>
  );
}
