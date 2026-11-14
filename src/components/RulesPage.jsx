import React from 'react';
import auntyAvatarUrl from '../assets/mascots/aunty_avatar_perfect.png';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function RulesPage({ lang, onStartPlaying, onBack }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8E1B3A] hover:underline cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{lang === 'bn' ? 'ফিরে যান' : 'Back'}</span>
        </button>
      </div>

      {/* Hero Title & Avatar with Clear Hands */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#D8C6B6] shadow-sm flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div className="w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0">
          <img src={auntyAvatarUrl} alt="Aunty Avatar" className="w-full h-full object-contain" />
        </div>
        <div>
          <span className="bg-[#F4E8D9] text-[#8E1B3A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {lang === 'bn' ? 'খেলার নিয়মাবলী ও নির্দেশিকা' : 'Official Rules & Guide'}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#8E1B3A] font-serif mt-2">
            {lang === 'bn' ? 'আন্টি বিঙ্গো কীভাবে খেলবেন?' : 'How to Play Aunty Bingo'}
          </h1>
          <p className="text-xs sm:text-sm text-[#6E554D] font-medium mt-2 leading-relaxed">
            {lang === 'bn'
              ? 'আমাদের বাঙালি পরিবারে যে কোনো আড্ডায় আন্টিদের জেরার হাত থেকে বাঁচার কোনো উপায় নেই—তবে এখন আপনি এই প্রশ্নগুলো দিয়েই বিঙ্গো জিতে নিতে পারেন!'
              : 'Surviving intrusive family questions at weddings, Eid, and family addas made fun! Read the official rules and winning combinations.'}
          </p>
        </div>
      </div>

      {/* Rules Content Cards */}
      <div className="space-y-6">
        {/* Rule 1: The Objective */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D8C6B6] shadow-sm">
          <h2 className="text-lg sm:text-xl font-black text-[#8E1B3A] flex items-center gap-2 mb-2">
            <span>🎯</span>
            <span>{lang === 'bn' ? '১. খেলার মূল উদ্দেশ্য' : '1. Game Objective'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#2B1B17] leading-relaxed font-medium">
            {lang === 'bn'
              ? 'আপনার নির্বাচিত অনুষ্ঠানের বোর্ডটিতে আত্মীয়দের করা প্রশ্নগুলো থাকবে। যে কোনো আত্মীয় কোনো প্রশ্ন জিজ্ঞেস করা মাত্রই সেই ঘরে ট্যাপ করে দাগ দিন। যে কোনো একটি পূর্ণ লাইন মিলালেই বিঙ্গো হবে!'
              : 'Listen to the conversations around you during family gatherings. Whenever an aunty, uncle, or elder asks one of the questions on your board, tap the tile to stamp it. Complete any full line to trigger BINGO!'}
          </p>
        </div>

        {/* Rule 2: Board Modes (3x3 vs 5x5) */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D8C6B6] shadow-sm">
          <h2 className="text-lg sm:text-xl font-black text-[#8E1B3A] flex items-center gap-2 mb-2">
            <span>📐</span>
            <span>{lang === 'bn' ? '২. দুটি বোর্ড মোড' : '2. Two Board Modes'}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="p-4 rounded-xl bg-[#FFF6E5] border border-[#D8C6B6]/60">
              <h3 className="font-bold text-sm text-[#8E1B3A]">
                {lang === 'bn' ? '⚡ ৩×৩ কুইক ম্যাচ (Figma মোড)' : '⚡ 3×3 Quick Match'}
              </h3>
              <p className="text-xs text-[#6E554D] mt-1 leading-relaxed">
                {lang === 'bn'
                  ? '৯টি ঘর। ৩টি সারি, ৩টি কলাম এবং ২টি কোণাকুণি—মোট ৮ উপায়ে দ্রুত বিঙ্গো মেলানো সম্ভব।'
                  : '9 tiles total. 3 rows, 3 columns, and 2 diagonals = 8 ways to win. Fast and casual.'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FFF6E5] border border-[#D8C6B6]/60">
              <h3 className="font-bold text-sm text-[#0F7B5F]">
                {lang === 'bn' ? '🏆 ৫×৫ ক্লাসিক গ্রিড (SRS মোড)' : '🏆 5×5 Classic Grid'}
              </h3>
              <p className="text-xs text-[#6E554D] mt-1 leading-relaxed">
                {lang === 'bn'
                  ? '২৫টি ঘর। মাঝখানে ১টি বোনাস ফ্রি ঘর (Family Immunity) সবসময় দাগানো থাকে। ৫টি সারি, ৫টি কলাম এবং ২টি কোণাকুণি—মোট ১২ উপায়ে বিঙ্গো।'
                  : '25 tiles with permanent center FREE TILE (Family Immunity). 5 rows, 5 columns, and 2 diagonals = 12 winning lines.'}
              </p>
            </div>
          </div>
        </div>

        {/* Rule 3: Winning Lines & Scoring */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D8C6B6] shadow-sm">
          <h2 className="text-lg sm:text-xl font-black text-[#8E1B3A] flex items-center gap-2 mb-2">
            <span>✨</span>
            <span>{lang === 'bn' ? '৩. জয়ের লাইনসমূহ' : '3. Winning Lines'}</span>
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#2B1B17] font-medium leading-relaxed">
            <li><strong>{lang === 'bn' ? 'অনুভূমিক সারি:' : 'Horizontal Rows:'}</strong> {lang === 'bn' ? 'একই সারির সবগুলো ঘর দাগালে।' : 'Any completed horizontal row.'}</li>
            <li><strong>{lang === 'bn' ? 'উল্লম্ব কলাম:' : 'Vertical Columns:'}</strong> {lang === 'bn' ? 'একই কলামের সবগুলো ঘর দাগালে।' : 'Any completed vertical column.'}</li>
            <li><strong>{lang === 'bn' ? 'কোণাকুণি লাইন:' : 'Diagonal Lines:'}</strong> {lang === 'bn' ? 'কোণা থেকে কোণায় পুরো লাইন মিললে।' : 'From top-left to bottom-right or top-right to bottom-left.'}</li>
          </ul>
        </div>

        {/* Rule 4: Sharing & Fair Play */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D8C6B6] shadow-sm">
          <h2 className="text-lg sm:text-xl font-black text-[#8E1B3A] flex items-center gap-2 mb-2">
            <span>📱</span>
            <span>{lang === 'bn' ? '৪. কার্ড এক্সপোর্ট ও শেয়ার' : '4. Card Export & Sharing'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#2B1B17] leading-relaxed font-medium">
            {lang === 'bn'
              ? 'বিঙ্গো হওয়ার পর বা খেলার যে কোনো পর্যায়ে "কার্ড এক্সপোর্ট" বাটনে চাপ দিয়ে ১০৮০×১৩৫০ সাইজের হাই-রেজুলিউশন কার্ড ডাউনলোড করতে পারবেন। সরাসরি ইনস্টাগ্রাম স্টোরি, ফেসবুক ও মেসেঞ্জারে শেয়ার করুন।'
              : 'Export your board at any time as a high-resolution 1080×1350 PNG card. Share directly to Instagram Stories, Facebook, and WhatsApp using your mobile share sheet.'}
          </p>
        </div>
      </div>

      {/* CTA at Bottom */}
      <div className="mt-8 text-center">
        <button
          onClick={onStartPlaying}
          className="px-8 py-3.5 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] text-white font-bold text-base flex items-center justify-center gap-2 shadow-xl mx-auto active:scale-95 transition-all cursor-pointer"
        >
          <Gamepad2 size={20} />
          <span>{lang === 'bn' ? 'এখনই খেলা শুরু করুন' : 'Start Playing Now'}</span>
        </button>
      </div>
    </div>
  );
}
