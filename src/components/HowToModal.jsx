import React from 'react';
import mascotPointingUrl from '../assets/mascots/mascot_pointing.png';
import { CloseIcon } from './FontAwesomeIcons';

export default function HowToModal({ isOpen, onClose, lang }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#FFF6E5] rounded-3xl shadow-2xl border border-[#D8C6B6] p-5 sm:p-6 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F4E8D9] text-[#8E1B3A] flex items-center justify-center hover:bg-[#EBDDCB] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <CloseIcon className="text-sm" />
        </button>

        {/* Top Branding & Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-serif font-black text-xl text-[#8E1B3A]">Aunty Bingo</span>
          <span className="bg-[#F4E8D9] text-[#8E1B3A] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            {lang === 'bn' ? 'নিয়মাবলী' : 'HOW TO'}
          </span>
        </div>

        {/* Hero Headline & Mascot */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#8E1B3A] leading-tight">
              Aunty asks.<br />You win.
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#2B1B17] mt-1">
              {lang === 'bn' ? 'আত্মীয়দের প্রশ্ন সামলান' : 'Survive the interrogation.'}
            </p>
          </div>
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
            <img
              src={mascotPointingUrl}
              alt="Aunty Bingo Mascot"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3.5 mb-5">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#8E1B3A] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#8E1B3A]">
                {lang === 'bn' ? 'বিঙ্গো বোর্ড পান' : 'Get your board'}
              </h3>
              <p className="text-xs text-[#2B1B17] font-medium leading-relaxed">
                {lang === 'bn' ? '৩×৩ গ্রিডে ৯টি মজার প্রশ্ন' : '3×3 grid with 9 funny family questions'}
              </p>
              <p className="text-[11px] text-[#6E554D]">
                {lang === 'bn' ? 'Get your board: 9 funny questions' : 'Auto-randomized for your chosen occasion'}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#8E1B3A] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#8E1B3A]">
                {lang === 'bn' ? 'ঘরে ট্যাপ করুন' : 'Tap what you hear'}
              </h3>
              <p className="text-xs text-[#2B1B17] font-medium leading-relaxed">
                {lang === 'bn'
                  ? 'কোনো আত্মীয় প্রশ্নটি জিজ্ঞেস করলেই ঘরে ট্যাপ করে দাগ দিন'
                  : 'Tap a tile whenever an aunty or uncle asks that question'}
              </p>
              <p className="text-[11px] text-[#6E554D]">
                {lang === 'bn' ? 'Tap a tile when a relative asks' : 'Shows an authentic stamp mark'}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#8E1B3A] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#8E1B3A]">
                {lang === 'bn' ? 'লাইন মেলালেই বিঙ্গো' : 'Complete any line to win'}
              </h3>
              <p className="text-xs text-[#2B1B17] font-medium leading-relaxed">
                {lang === 'bn'
                  ? 'যেকোনো অনুভূমিক, উল্লম্ব বা কোনাকুনি ৩টি ঘর পূর্ণ করলেই বিঙ্গো!'
                  : 'Any 3 in a row horizontally, vertically, or diagonally!'}
              </p>
              <p className="text-[11px] text-[#6E554D]">
                {lang === 'bn' ? 'Complete any line to win' : 'Export and share your victory card!'}
              </p>
            </div>
          </div>
        </div>

        {/* 8 Ways to Bingo Diagram Box */}
        <div className="bg-[#F2EAE1] rounded-2xl p-3 sm:p-4 mb-5 border border-[#D8C6B6]">
          <div className="grid grid-cols-3 gap-2 text-center">
            {/* 3 rows diagram */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white rounded-lg border border-[#D8C6B6] p-1 flex flex-col justify-around">
                <div className="h-2 bg-[#8E1B3A]/20 rounded-sm"></div>
                <div className="h-2 bg-[#0F7B5F] rounded-sm"></div>
                <div className="h-2 bg-[#8E1B3A]/20 rounded-sm"></div>
              </div>
              <span className="text-[11px] font-bold text-[#2B1B17] mt-1">
                {lang === 'bn' ? '৩ সারি' : '3 rows'}
              </span>
            </div>

            {/* 3 columns diagram */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white rounded-lg border border-[#D8C6B6] p-1 flex justify-around">
                <div className="w-2 bg-[#8E1B3A]/20 rounded-sm"></div>
                <div className="w-2 bg-[#0F7B5F] rounded-sm"></div>
                <div className="w-2 bg-[#8E1B3A]/20 rounded-sm"></div>
              </div>
              <span className="text-[11px] font-bold text-[#2B1B17] mt-1">
                {lang === 'bn' ? '৩ কলাম' : '3 columns'}
              </span>
            </div>

            {/* 2 diagonals diagram */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white rounded-lg border border-[#D8C6B6] relative p-1">
                <svg className="w-full h-full" viewBox="0 0 50 50">
                  <line x1="5" y1="5" x2="45" y2="45" stroke="#0F7B5F" strokeWidth="4" strokeLinecap="round" />
                  <line x1="45" y1="5" x2="5" y2="45" stroke="#8E1B3A" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-[#2B1B17] mt-1">
                {lang === 'bn' ? '২ কোণাকুণি' : '2 diagonals'}
              </span>
            </div>
          </div>

          <div className="text-center text-[11px] font-bold text-[#6E554D] mt-2 pt-2 border-t border-[#D8C6B6]/60">
            {lang === 'bn' ? '৩ + ৩ + ২ = মোট ৮ উপায়ে বিঙ্গো!' : '3 + 3 + 2 = 8 ways to BINGO'}
          </div>
        </div>

        {/* Start Playing Primary Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] text-white font-bold text-base active:scale-[0.99] transition-all text-center shadow-lg"
        >
          {lang === 'bn' ? 'বুঝেছি, খেলা শুরু করি!' : "Got it, let's play!"}
        </button>

        <div className="text-center mt-2.5">
          <button
            onClick={onClose}
            className="text-xs font-bold text-[#8E1B3A] hover:underline"
          >
            {lang === 'bn' ? 'খেলা শুরু করুন →' : 'Start playing →'}
          </button>
        </div>
      </div>
    </div>
  );
}
