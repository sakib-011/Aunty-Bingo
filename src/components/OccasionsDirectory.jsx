import React from 'react';
import { OCCASIONS } from '../utils/phrases';
import { ArrowLeft, Play } from 'lucide-react';

export default function OccasionsDirectory({ lang, onSelectAndPlay, onBack }) {
  const samplePhrases = {
    eid: [
      { bn: 'চাকরি করো, সেলামি চাও কেন?', en: "You have a job, why are you asking for Eidi?" },
      { bn: 'বিয়ে কবে করছ?', en: "When are you getting married?" },
      { bn: 'একটু সেমাই খেয়ে দেখ তো!', en: "Taste some of this semai!" },
      { bn: 'গত ঈদের চেয়েও শুকিয়ে গেছ!', en: "You look even thinner than last Eid!" }
    ],
    wedding: [
      { bn: 'পরের বিয়েটা কার? তোমার নাকি?', en: "Whose wedding is next? Yours?" },
      { bn: 'পাশের বাসার ছেলেটা কিন্তু ভালো পাত্র!', en: "The boy next door is a great match!" },
      { bn: 'কাচ্চিতে কি আলু কম দিল?', en: "Did they skimp on potatoes in the kacchi?" },
      { bn: 'এই বয়সে এত মিষ্টি খাওয়া ঠিক না!', en: "You shouldn't eat this much sweet at this age!" }
    ],
    exam: [
      { bn: 'গোল্ডেন এ প্লাস আসছে তো?', en: "Did you get Golden A+?" },
      { bn: 'বিসিএস ছাড়া সমাজে কোনো দাম নেই!', en: "BCS is the only respectable career!" },
      { bn: 'সারাদিন ফোনে মুখ গুঁজে রাখলে রেজাল্ট হবে ক্যামনে?', en: "How can you get good grades if you're always on your phone?" },
      { bn: 'অমুকের ছেলে তো ঢাবিতে চান্স পাইছে!', en: "Look, so-and-so's son got into DU!" }
    ],
    general: [
      { bn: 'স্যালারি কত পাচ্ছ এখন?', en: "What's your current salary?" },
      { bn: 'একটু মোটা হয়ে গেছ না?', en: "Haven't you gotten a bit chubby?" },
      { bn: 'বাচ্চা কবে নিচ্ছ?', en: "When are you having a baby?" },
      { bn: 'আমাদের আমলে তো আমরা এমন ছিলাম না!', en: "In our days, we were never like this!" }
    ]
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8E1B3A] hover:underline cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{lang === 'bn' ? 'ফিরে যান' : 'Back'}</span>
        </button>
      </div>

      <div className="text-center mb-8 sm:mb-10">
        <span className="bg-[#F4E8D9] text-[#8E1B3A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {lang === 'bn' ? 'পারিবারিক আড্ডার ধরন' : 'Gathering Presets'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#8E1B3A] font-serif mt-2">
          {lang === 'bn' ? 'অনুষ্ঠান পরিচিতি ও বিশেষ আড্ডা' : 'Explore All 4 Occasions'}
        </h1>
        <p className="text-xs sm:text-sm text-[#6E554D] font-medium mt-2 max-w-lg mx-auto">
          {lang === 'bn'
            ? 'প্রতিটি বাঙালি অনুষ্ঠানের রয়েছে নিজস্ব ধাঁচের প্রশ্ন ও মিষ্টি খোঁচা। যেকোনো একটি বেছে নিয়ে শুরু করুন খেলা।'
            : 'Every Bengali gathering has its own unique flavor of repetitive, well-meaning questions. Choose one to start playing.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(OCCASIONS).map((occ) => {
          const samples = samplePhrases[occ.id] || [];
          return (
            <div
              key={occ.id}
              className="bg-white rounded-3xl p-6 border-2 border-[#D8C6B6] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{occ.icon}</span>
                    <h2 className="text-xl font-black text-[#2B1B17]">
                      {lang === 'bn' ? occ.nameBn : occ.nameEn}
                    </h2>
                  </div>
                  <span
                    style={{ color: occ.tagColor, backgroundColor: occ.themeBg }}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                  >
                    {lang === 'bn' ? occ.tagBn : occ.tagEn}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#6E554D] font-medium mb-4 leading-relaxed">
                  {lang === 'bn' ? occ.descBn : occ.descEn}
                </p>

                {/* Sample Phrases */}
                <div className="bg-[#FFF6E5] rounded-2xl p-3.5 mb-4 border border-[#D8C6B6]/60">
                  <div className="text-[11px] font-bold text-[#8E1B3A] uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'নমুনাস্বরূপ কিছু প্রশ্ন:' : 'Sample Questions You Will Hear:'}
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#2B1B17] font-semibold">
                    {samples.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#8E1B3A]">•</span>
                        <span>{lang === 'bn' ? s.bn : s.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => onSelectAndPlay(occ.id)}
                style={{ backgroundColor: occ.tagColor }}
                className="w-full py-3 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-95 transition-all cursor-pointer"
              >
                <Play size={16} fill="white" />
                <span>
                  {lang === 'bn'
                    ? `${occ.nameBn}-এ বিঙ্গো খেলুন`
                    : `Play ${occ.nameEn}`}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
