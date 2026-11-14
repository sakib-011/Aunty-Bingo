import React from 'react';
import heroGatheringUrl from '../assets/images/hero-gathering.svg';
import auntyAvatarUrl from '../assets/mascots/aunty_avatar_perfect.png';
import { OCCASIONS } from '../utils/phrases';
import { Check, Sparkles, Gamepad2, HelpCircle } from 'lucide-react';

export default function LandingPage({
  lang,
  activeOccasionId,
  onSelectOccasion,
  onStartPlaying,
  onOpenHowTo
}) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-12 sm:gap-16">
      {/* HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Text & CTAs */}
        <div className="flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 bg-[#F4E8D9] border border-[#D8C6B6] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#8E1B3A] mb-4 shadow-sm">
            <span>✨</span>
            <span>
              {lang === 'bn'
                ? 'আত্মীয়দের অপ্রস্তুত প্রশ্ন সামলানোর মজার বিঙ্গো গেম'
                : 'Turning awkward family questions into a fun, interactive game'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#8E1B3A] leading-tight font-serif">
            {lang === 'bn' ? (
              <>
                আন্টির প্রশ্নের জন্য <br />
                <span className="text-[#0F7B5F]">প্রস্তুত তো?</span>
              </>
            ) : (
              <>
                Ready for the <br />
                <span className="text-[#0F7B5F]">Aunty Questions?</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-[#6E554D] mt-3 sm:mt-4 font-medium leading-relaxed max-w-lg">
            {lang === 'bn'
              ? 'বিয়ে, ঈদ কিংবা পারিবারিক আড্ডায় আত্মীয়দের জেরার মুহূর্তগুলোকে বানিয়ে ফেলুন হাসির বিঙ্গো গেম! দাগ দিন, বিঙ্গো মিলান আর সোশ্যাল মিডিয়ায় শেয়ার করুন।'
              : 'Turn those awkward family moments into a hilarious Bingo game! Survive the interrogation at your next gathering.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6 sm:mt-8 w-full sm:w-auto">
            <button
              onClick={onStartPlaying}
              className="flex-1 sm:flex-none px-7 py-3.5 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Gamepad2 size={20} />
              <span>{lang === 'bn' ? 'এখনই খেলুন' : 'Play Now'}</span>
            </button>

            <button
              onClick={onOpenHowTo}
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-full border-2 border-[#8E1B3A] text-[#8E1B3A] hover:bg-[#8E1B3A]/5 font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <HelpCircle size={19} />
              <span>{lang === 'bn' ? 'নিয়মাবলী' : 'How to Play'}</span>
            </button>
          </div>
        </div>

        {/* Right: Graphic & Avatar */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-xl border border-[#D8C6B6] bg-white flex items-center justify-center p-2">
          <img
            src={heroGatheringUrl}
            alt="Family Gathering Scene"
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Floating Aunty Mascot Overlay with Clear Hands */}
          <div className="absolute -bottom-2 -right-2 w-32 h-32 sm:w-40 sm:h-40 bg-[#FFFDF9]/95 rounded-full p-2 border-2 border-[#8E1B3A] shadow-2xl flex items-center justify-center animate-bounce duration-1000">
            <img
              src={auntyAvatarUrl}
              alt="Aunty Avatar"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* OCCASION SELECTION SECTION */}
      <section className="flex flex-col items-center">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#8E1B3A] font-serif">
            {lang === 'bn' ? 'অনুষ্ঠান বেছে নিন' : 'Choose Your Gathering'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6E554D] mt-1 font-medium">
            {lang === 'bn'
              ? 'আপনি যে অনুষ্ঠানে যোগ দিচ্ছেন সেটি সিলেক্ট করে বিশেষায়িত বোর্ড তৈরি করুন।'
              : "Pick the gathering you're attending to generate a tailored board."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {Object.values(OCCASIONS).map((occ) => {
            const isSelected = occ.id === activeOccasionId;
            return (
              <div
                key={occ.id}
                onClick={() => onSelectOccasion(occ.id)}
                className={`relative flex flex-col justify-between p-5 rounded-3xl border-2 transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'bg-white shadow-lg border-[#8E1B3A] scale-[1.02]'
                    : 'bg-[#FFFDF9] hover:bg-white border-[#D8C6B6] hover:border-[#8E1B3A]/40 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{occ.icon}</span>
                    <span
                      style={{ color: occ.tagColor, backgroundColor: occ.themeBg }}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                    >
                      {lang === 'bn' ? occ.tagBn : occ.tagEn}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#2B1B17]">
                    {lang === 'bn' ? occ.nameBn : occ.nameEn}
                  </h3>

                  <p className="text-xs text-[#6E554D] font-medium mt-1.5 leading-relaxed">
                    {lang === 'bn' ? occ.descBn : occ.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EFE7DE] flex items-center justify-between text-xs font-bold">
                  <span style={{ color: occ.tagColor }}>
                    {isSelected
                      ? (lang === 'bn' ? '✓ নির্বাচিত' : '✓ Selected')
                      : (lang === 'bn' ? 'বেছে নিন' : 'Select')}
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#8E1B3A] text-white flex items-center justify-center">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <button
            onClick={onStartPlaying}
            className="px-9 py-3.5 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] text-white font-bold text-base sm:text-lg flex items-center gap-2 shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles size={20} />
            <span>{lang === 'bn' ? 'খেলা শুরু করুন' : 'Start Playing'}</span>
          </button>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#D8C6B6] shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#8E1B3A] font-serif">
            {lang === 'bn' ? 'কীভাবে খেলবেন?' : 'How It Works'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6E554D] mt-1 font-medium">
            {lang === 'bn' ? 'সহজ, মজার এবং শতভাগ খাঁটি অভিজ্ঞতা।' : 'Simple, hilarious, and 100% relatable.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#FFF6E5]">
            <div className="w-12 h-12 rounded-full bg-[#8E1B3A] text-white font-black text-lg flex items-center justify-center mb-3 shadow-md">
              1
            </div>
            <h3 className="font-black text-base text-[#2B1B17]">
              {lang === 'bn' ? '১. অনুষ্ঠান বেছে নিন' : '1. Pick an Occasion'}
            </h3>
            <p className="text-xs text-[#6E554D] mt-1.5 leading-relaxed font-medium">
              {lang === 'bn'
                ? 'ঈদ, বিয়ে, রেজাল্ট কিংবা সাধারণ আড্ডা—আপনার ইভেন্ট সিলেক্ট করুন।'
                : 'Choose your event: Eid, Wedding, Exam Results, or General Adda.'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#FFF6E5]">
            <div className="w-12 h-12 rounded-full bg-[#8E1B3A] text-white font-black text-lg flex items-center justify-center mb-3 shadow-md">
              2
            </div>
            <h3 className="font-black text-base text-[#2B1B17]">
              {lang === 'bn' ? '২. শুনুন ও দাগ দিন' : '2. Listen & Mark'}
            </h3>
            <p className="text-xs text-[#6E554D] mt-1.5 leading-relaxed font-medium">
              {lang === 'bn'
                ? 'কোনো আত্মীয় কোনো প্রশ্ন জিজ্ঞেস করলেই সেই ঘরে ট্যাপ করে দাগ দিন।'
                : 'Whenever an aunty or uncle asks one of the questions, tap the tile to stamp it.'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#FFF6E5]">
            <div className="w-12 h-12 rounded-full bg-[#8E1B3A] text-white font-black text-lg flex items-center justify-center mb-3 shadow-md">
              3
            </div>
            <h3 className="font-black text-base text-[#2B1B17]">
              {lang === 'bn' ? '৩. বিঙ্গো মেলালেই জয়!' : '3. Get BINGO!'}
            </h3>
            <p className="text-xs text-[#6E554D] mt-1.5 leading-relaxed font-medium">
              {lang === 'bn'
                ? 'সারি, কলাম বা কোণাকুণি লাইন মিললেই বিঙ্গো! সুন্দর কার্ড এক্সপোর্ট করে বন্ধুদের দেখান।'
                : 'Complete a row, column, or diagonal. Export your victory card to share on social media!'}
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#8E1B3A] font-serif">
            {lang === 'bn' ? 'আন্টি বিঙ্গোর বিশেষত্ব' : 'Why Everyone Loves Aunty Bingo'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6E554D] mt-1 font-medium">
            {lang === 'bn' ? 'আমাদের নিজস্ব সংস্কৃতি মাথায় রেখে নির্মিত।' : 'Made specifically for Bengali family culture.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-[#D8C6B6] shadow-sm">
            <span className="text-3xl">⚡</span>
            <h3 className="font-black text-base text-[#2B1B17] mt-2">
              {lang === 'bn' ? 'সাইন-আপ ছাড়া খেলুন' : 'Zero Signup'}
            </h3>
            <p className="text-xs text-[#6E554D] mt-1 leading-relaxed font-medium">
              {lang === 'bn'
                ? 'কোনো রেজিস্ট্রেশন বা অ্যাপ ইনস্টল লাগবে না। ব্রাউজার খুললেই খেলা শুরু।'
                : 'No login, no installation. Open your mobile browser and start playing instantly.'}
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#D8C6B6] shadow-sm">
            <span className="text-3xl">💬</span>
            <h3 className="font-black text-base text-[#2B1B17] mt-2">
              {lang === 'bn' ? '১৩৯+ খাঁটি প্রশ্ন' : '130+ Authentic Phrases'}
            </h3>
            <p className="text-xs text-[#6E554D] mt-1 leading-relaxed font-medium">
              {lang === 'bn'
                ? 'বাঙালি আড্ডায় শোনা যায় এমন সব চেনা, মজার এবং মিষ্টি প্রশ্ন।'
                : 'Every awkward, funny, and well-meaning question you have ever heard at home.'}
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#D8C6B6] shadow-sm">
            <span className="text-3xl">📸</span>
            <h3 className="font-black text-base text-[#2B1B17] mt-2">
              {lang === 'bn' ? 'এইচডি কার্ড এক্সপোর্ট' : 'HD Card Export'}
            </h3>
            <p className="text-xs text-[#6E554D] mt-1 leading-relaxed font-medium">
              {lang === 'bn'
                ? 'ইনস্টাগ্রাম স্টোরি ও হোয়াটসঅ্যাপের জন্য ১০৮০×১৩৫০ সাইজের ক্রিস্প পিএনজি কার্ড।'
                : 'Download a crisp 1080×1350 PNG card perfect for Instagram Stories & WhatsApp.'}
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#D8C6B6] shadow-sm">
            <span className="text-3xl">🔒</span>
            <h3 className="font-black text-base text-[#2B1B17] mt-2">
              {lang === 'bn' ? '১০০% নিরাপদ ও ফ্রি' : '100% Private & Free'}
            </h3>
            <p className="text-xs text-[#6E554D] mt-1 leading-relaxed font-medium">
              {lang === 'bn'
                ? 'কোনো ট্র্যাকিং নেই, কোনো বিজ্ঞাপন নেই। সম্পূর্ণ নিরাপদ ক্লায়েন্ট-সাইড আর্কিটেকচার।'
                : 'No tracking, no cookies, no personal data. Pure client-side static application.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
