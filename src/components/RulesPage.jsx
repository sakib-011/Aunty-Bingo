import React from 'react';
import {
  BullseyeIcon,
  RulerIcon,
  BoltIcon,
  TrophyIcon,
  SparklesIcon,
  MobileIcon,
  GamepadIcon,
  BookOpenIcon
} from './FontAwesomeIcons';

export default function RulesPage({ lang, onStartPlaying }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 bg-[#F4E8D9] dark:bg-stone-800 text-[#8E1B3A] dark:text-rose-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <BookOpenIcon className="text-xs" />
          <span>{lang === 'bn' ? 'খেলার নিয়মাবলী' : 'Rules & Guidelines'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#8E1B3A] dark:text-rose-400 tracking-tight">
          {lang === 'bn' ? 'আন্টি বিঙ্গো কীভাবে খেলবেন?' : 'How to Play Aunty Bingo'}
        </h1>
        <p className="text-xs sm:text-sm text-[#6E554D] dark:text-stone-400 max-w-xl mx-auto mt-2 leading-relaxed">
          {lang === 'bn'
            ? 'পারিবারিক আড্ডায় আত্মীয়দের মধুর কিন্তু জটিল প্রশ্নগুলোকে মজার খেলায় পরিণত করার সম্পূর্ণ গাইড।'
            : 'Your survival guide to turning awkward family interrogations into party fun.'}
        </p>
      </div>

      {/* Rules Content Cards */}
      <div className="space-y-6">
        {/* Rule 1: The Objective */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 sm:p-6 border border-[#D8C6B6] dark:border-stone-700 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-[#8E1B3A] dark:text-rose-400 flex items-center gap-2 mb-2">
            <BullseyeIcon className="text-[#8E1B3A] dark:text-rose-400 text-base" />
            <span>{lang === 'bn' ? '১. খেলার মূল উদ্দেশ্য' : '1. Game Objective'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#2B1B17] dark:text-stone-200 leading-relaxed font-medium">
            {lang === 'bn'
              ? 'আপনার নির্বাচিত অনুষ্ঠানের বোর্ডটিতে আত্মীয়দের করা প্রশ্নগুলো থাকবে। যেকোনো আত্মীয় কোনো প্রশ্ন জিজ্ঞেস করা মাত্রই সেই ঘরে ট্যাপ করে দাগ দিন। যেকোনো একটি পূর্ণ লাইন মিলালেই বিঙ্গো হবে!'
              : 'Listen to the conversations around you during family gatherings. Whenever an aunty, uncle, or elder asks one of the questions on your board, tap the tile to stamp it. Complete any full line to trigger BINGO!'}
          </p>
        </div>

        {/* Rule 2: Board Modes (3x3 vs 5x5) */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 sm:p-6 border border-[#D8C6B6] dark:border-stone-700 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-[#8E1B3A] dark:text-rose-400 flex items-center gap-2 mb-2">
            <RulerIcon className="text-[#8E1B3A] dark:text-rose-400 text-base" />
            <span>{lang === 'bn' ? '২. দুটি বোর্ড মোড' : '2. Two Board Modes'}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="p-4 rounded-xl bg-[#FFF6E5] dark:bg-stone-800 border border-[#D8C6B6]/60 dark:border-stone-700">
              <h3 className="font-bold text-sm text-[#8E1B3A] dark:text-rose-400 flex items-center gap-1.5">
                <BoltIcon className="text-xs" />
                <span>{lang === 'bn' ? '৩×৩ কুইক ম্যাচ (Figma মোড)' : '3×3 Quick Match'}</span>
              </h3>
              <p className="text-xs text-[#6E554D] dark:text-stone-400 mt-1 leading-relaxed">
                {lang === 'bn'
                  ? '৯টি ঘর। ৩টি সারি, ৩টি কলাম এবং ২টি কোণাকুণি—মোট ৮ উপায়ে দ্রুত বিঙ্গো মেলানো সম্ভব।'
                  : '9 tiles total. 3 rows, 3 columns, and 2 diagonals = 8 ways to win. Fast and casual.'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FFF6E5] dark:bg-stone-800 border border-[#D8C6B6]/60 dark:border-stone-700">
              <h3 className="font-bold text-sm text-[#0F7B5F] dark:text-emerald-400 flex items-center gap-1.5">
                <TrophyIcon className="text-xs text-amber-500" />
                <span>{lang === 'bn' ? '৫×৫ ক্লাসিক গ্রিড (SRS মোড)' : '5×5 Classic Grid'}</span>
              </h3>
              <p className="text-xs text-[#6E554D] dark:text-stone-400 mt-1 leading-relaxed">
                {lang === 'bn'
                  ? '২৫টি ঘর। মাঝখানে ১টি বোনাস ফ্রি ঘর (Family Immunity) সবসময় দাগানো থাকে। ৫টি সারি, ৫টি কলাম এবং ২টি কোণাকুণি—মোট ১২ উপায়ে বিঙ্গো।'
                  : '25 tiles with permanent center FREE TILE (Family Immunity). 5 rows, 5 columns, and 2 diagonals = 12 winning lines.'}
              </p>
            </div>
          </div>
        </div>

        {/* Rule 3: Winning Lines & Scoring */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 sm:p-6 border border-[#D8C6B6] dark:border-stone-700 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-[#8E1B3A] dark:text-rose-400 flex items-center gap-2 mb-2">
            <SparklesIcon className="text-[#8E1B3A] dark:text-rose-400 text-base" />
            <span>{lang === 'bn' ? '৩. জয়ের লাইনসমূহ' : '3. Winning Lines'}</span>
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#2B1B17] dark:text-stone-200 font-medium leading-relaxed">
            <li><strong>{lang === 'bn' ? 'অনুভূমিক সারি:' : 'Horizontal Rows:'}</strong> {lang === 'bn' ? 'একই সারির সবগুলো ঘর দাগালে।' : 'Any completed horizontal row.'}</li>
            <li><strong>{lang === 'bn' ? 'উল্লম্ব কলাম:' : 'Vertical Columns:'}</strong> {lang === 'bn' ? 'একই কলামের সবগুলো ঘর দাগালে।' : 'Any completed vertical column.'}</li>
            <li><strong>{lang === 'bn' ? 'কোণাকুণি লাইন:' : 'Diagonal Lines:'}</strong> {lang === 'bn' ? 'কোণা থেকে কোণায় পুরো লাইন মিললে।' : 'From top-left to bottom-right or top-right to bottom-left.'}</li>
          </ul>
        </div>

        {/* Rule 4: Sharing & Fair Play */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 sm:p-6 border border-[#D8C6B6] dark:border-stone-700 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-[#8E1B3A] dark:text-rose-400 flex items-center gap-2 mb-2">
            <MobileIcon className="text-[#8E1B3A] dark:text-rose-400 text-base" />
            <span>{lang === 'bn' ? '৪. কার্ড এক্সপোর্ট ও সোশ্যাল শেয়ার' : '4. Export & Social Sharing'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#2B1B17] dark:text-stone-200 leading-relaxed font-medium">
            {lang === 'bn'
              ? 'বিঙ্গো হওয়ার সাথে সাথেই সুন্দর ১০৮০×১৩৫০ রেজ্যুলেশনের উৎসবমুখর কার্ড তৈরি হয়। ইনস্টাগ্রাম স্টোরি, ফেসবুক, হোয়াটসঅ্যাপ বা মেসেঞ্জারে এক-ক্লিকে বন্ধুদের সাথে শেয়ার করুন।'
              : 'As soon as you achieve BINGO, generate a vibrant 1080×1350 PNG card to celebrate your win on Instagram Stories, Facebook, WhatsApp, or Messenger.'}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-10">
        <button
          onClick={onStartPlaying}
          className="px-8 py-3.5 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] dark:bg-rose-700 dark:hover:bg-rose-600 text-white font-bold text-base shadow-lg active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <GamepadIcon className="text-base" />
          <span>{lang === 'bn' ? 'এখনই খেলা শুরু করুন' : 'Start Playing Now'}</span>
        </button>
      </div>
    </div>
  );
}
