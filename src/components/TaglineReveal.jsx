import React, { useEffect, useRef, useState, useMemo } from 'react';

/**
 * B11 Tagline Reveal Section
 * Mandated by landing-page-design skill:
 * Minimum two lines of text, separate from the hero.
 * Words start in subtle muted tone (25-35% opacity) and transition individually
 * to full text color on scroll using the decelerating curve.
 */
export default function TaglineReveal({ lang }) {
  const containerRef = useRef(null);

  const textBn = 'পারিবারিক আড্ডায় আত্মীয়দের মিষ্টি কিন্তু অস্বস্তিকর প্রশ্নগুলোকে পরিণত করুন এক আনন্দঘন খেলায়। প্রতিটি মিলনমেলা হয়ে উঠুক অবিস্মরণীয়।';
  const textEn = 'Transform awkward family interrogations into wholesome party laughter. Every gathering becomes an unforgettable celebration.';

  const fullText = lang === 'bn' ? textBn : textEn;
  const words = useMemo(() => fullText.split(' '), [fullText]);

  const [revealedCount, setRevealedCount] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 100;
    }
    return 0;
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            words.forEach((_, idx) => {
              setTimeout(() => {
                setRevealedCount((prev) => Math.max(prev, idx + 1));
              }, idx * 60);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [words]);

  return (
    <section
      ref={containerRef}
      className="w-full max-w-[680px] mx-auto my-10 sm:my-16 px-4 text-center select-none"
      aria-label="Core Philosophy"
    >
      <div className="text-xs uppercase tracking-widest text-[#B84B12] font-semibold mb-3">
        {lang === 'bn' ? 'আমাদের দর্শন' : 'Our Philosophy'}
      </div>
      <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed tracking-tight text-balance">
        {words.map((word, idx) => {
          const isRevealed = idx < revealedCount;
          return (
            <span
              key={idx}
              className={`inline-block mr-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isRevealed
                  ? 'text-[#8E1B3A] opacity-100 transform-none'
                  : 'text-[#6E554D] opacity-25 translate-y-1'
              }`}
            >
              {word}
            </span>
          );
        })}
      </p>
    </section>
  );
}
