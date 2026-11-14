import React from 'react';

export default function StatusHeader({ markedCount, isOneAway, hasWon, lang, isDesktop = false }) {
  let title = '';
  let subtitle = '';

  if (hasWon) {
    title = lang === 'bn' ? 'বিঙ্গো! চলতে থাকুক।' : 'BINGO! Keep going.';
    subtitle = lang === 'bn' ? "দাগ থাকবেই। আন্টির প্রশ্ন এখনো শেষ হয়নি।" : "Your marks stay. Aunty's not done yet.";
  } else if (isOneAway || markedCount >= 4) {
    title = lang === 'bn' ? 'আর মাত্র একটি প্রশ্ন...' : 'One question away...';
    subtitle = lang === 'bn' ? 'আন্টির প্রশ্ন চলছেই। শুনলেই ট্যাপ করুন।' : 'Aunty is on a roll. Tap what you hear.';
  } else if (markedCount > 0) {
    title = lang === 'bn' ? 'প্রশ্ন আসছে?' : 'Question incoming?';
    subtitle = lang === 'bn' ? 'আন্টি প্রস্তুতি নিচ্ছেন। শুনলেই ট্যাপ করুন।' : 'Aunty is warming up. Tap what you hear.';
  } else {
    // Initial state
    if (isDesktop) {
      title = lang === 'bn' ? 'প্রশ্ন শুরু হোক!' : 'Bring on the questions.';
      subtitle = lang === 'bn'
        ? 'যে প্রশ্ন শুনবেন, সেটিতে ট্যাপ করুন। এক লাইনে ৩টি হলেই বিঙ্গো!'
        : 'Tap the Bangla questions you hear. Any line of 3 = BINGO.';
    } else {
      title = lang === 'bn' ? 'প্রশ্ন শুরু হোক!' : 'Question incoming?';
      subtitle = lang === 'bn'
        ? 'কোনো আত্মীয় প্রশ্নটি জিজ্ঞেস করলেই ঘরে ট্যাপ করে দাগ দিন।'
        : 'Tap a question when a relative asks.';
    }
  }

  return (
    <div className="text-center my-3 sm:my-4 transition-all duration-200">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#8E1B3A] tracking-tight">
        {title}
      </h2>
      <p className="text-xs sm:text-sm text-[#6E554D] mt-0.5 sm:mt-1 font-medium">
        {subtitle}
      </p>
    </div>
  );
}
