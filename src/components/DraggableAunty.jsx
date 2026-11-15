import React, { useState, useEffect, useRef, useCallback } from 'react';
import auntyAvatarUrl from '../assets/mascots/aunty_avatar_perfect.png';
import { RotateLeftIcon, HandPointIcon } from './FontAwesomeIcons';

const AUNTY_QUOTES = {
  bn: [
    'বিয়ে কবে করবা শুনি?',
    'স্যালারি কত তোমার? মাসে লাখ টাকা হয়?',
    'আমাকে টেনে কোথায় নিয়ে যাচ্ছো?!',
    'চাকরি পাইছো নাকি এখনো ঘুরে বেড়াচ্ছো?',
    'খালা কিন্তু তোমার সব খবর জানে!',
    'বিঙ্গো খেলছো তো? নাকি খালি বসে আছো?',
    'পাশের বাসার ছেলে তো বিসিএস ফার্স্ট হইছে!',
    'এত রাতে বাইরে কী? বাড়ি যাও!',
    'এক কাপ লাল চা আর সিঙ্গাড়া খেয়ে যাও!'
  ],
  en: [
    'When are you getting married?',
    'How much is your salary? At least a lakh?',
    'Where are you dragging me?!',
    'Did you get a job yet or still searching?',
    'Aunty knows all your secrets!',
    'Are you playing Aunty Bingo?',
    'Neighbor’s son topped the BCS exams!',
    'Why stay out so late? Go home!',
    'Have a cup of tea and a samosa!'
  ]
};

export default function DraggableAunty({ lang = 'bn' }) {
  const [position, setPosition] = useState(null); // null means docked at hero anchor
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [quote, setQuote] = useState('');
  const [showHint, setShowHint] = useState(true);
  const auntyRef = useRef(null);
  const quoteTimerRef = useRef(null);
  const hasMovedRef = useRef(false);

  // Auto-dismiss initial hint after 6 seconds
  useEffect(() => {
    const hintTimer = setTimeout(() => {
      setShowHint(false);
    }, 6000);
    return () => clearTimeout(hintTimer);
  }, []);

  // Show a random Aunty quote
  const triggerRandomQuote = useCallback(() => {
    const quotes = AUNTY_QUOTES[lang] || AUNTY_QUOTES.bn;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);

    if (quoteTimerRef.current) clearTimeout(quoteTimerRef.current);
    quoteTimerRef.current = setTimeout(() => {
      setQuote('');
    }, 4000);
  }, [lang]);

  // Pointer down handler (mouse & touch unified)
  const handlePointerDown = (e) => {
    // Only drag with primary pointer (left mouse click or touch)
    if (e.button !== undefined && e.button !== 0) return;

    setShowHint(false);
    hasMovedRef.current = false;

    const el = auntyRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragOffset({ x: offsetX, y: offsetY });

    // Switch to fixed position coordinates if currently docked
    if (!position) {
      setPosition({ x: rect.left, y: rect.top });
    }

    setIsDragging(true);

    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      // fallback
    }
  };

  // Pointer move handler
  const handlePointerMove = (e) => {
    if (!isDragging) return;

    hasMovedRef.current = true;
    const el = auntyRef.current;
    const width = el ? el.offsetWidth : 120;
    const height = el ? el.offsetHeight : 120;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Clamp inside viewport
    const clampedX = Math.max(8, Math.min(window.innerWidth - width - 8, newX));
    const clampedY = Math.max(8, Math.min(window.innerHeight - height - 8, newY));

    setPosition({ x: clampedX, y: clampedY });
  };

  // Pointer up handler
  const handlePointerUp = (e) => {
    if (!isDragging) return;

    setIsDragging(false);
    const el = auntyRef.current;
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // fallback
      }
    }

    // Trigger funny quote on click or drag release
    triggerRandomQuote();
  };

  // Reset Aunty back to hero docked position
  const handleResetPosition = (e) => {
    e.stopPropagation();
    setPosition(null);
    setQuote('');
  };

  const isDocked = position === null;

  return (
    <div
      ref={auntyRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={handleResetPosition}
      style={
        isDocked
          ? undefined
          : {
              position: 'fixed',
              left: `${position.x}px`,
              top: `${position.y}px`,
              zIndex: 999
            }
      }
      className={`group select-none touch-none cursor-grab active:cursor-grabbing ${
        isDocked
          ? 'absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 z-20'
          : 'transition-[transform,filter] duration-75'
      }`}
      title={lang === 'bn' ? 'আমাকে স্ক্রিনের যেকোনো জায়গায় টেনে নিয়ে যাও!' : 'Drag me anywhere across the screen!'}
    >
      {/* 1. Speech Bubble / Dialogue */}
      {quote && (
        <div className="absolute bottom-[105%] left-1/2 -translate-x-1/2 mb-2 w-48 sm:w-56 bg-[#FFFDF9] dark:bg-stone-900 border-2 border-[#8E1B3A] dark:border-rose-500 rounded-2xl p-2.5 sm:p-3 shadow-2xl animate-pop-speech pointer-events-none z-30">
          <p className="text-xs sm:text-sm font-bold text-[#8E1B3A] dark:text-rose-300 text-center leading-snug">
            "{quote}"
          </p>
          {/* Comic Pointer Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#8E1B3A] dark:border-t-rose-500" />
          <div className="absolute top-[calc(100%-2px)] left-1/2 -translate-x-1/2 w-0 h-0 border-x-7 border-x-transparent border-t-7 border-t-[#FFFDF9] dark:border-t-stone-900" />
        </div>
      )}

      {/* 2. Initial Playful Hint Badge (No emoji, uses FontAwesome HandPointIcon) */}
      {showHint && !quote && isDocked && (
        <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#8E1B3A] dark:bg-rose-700 text-[#FFF6E5] text-[10px] sm:text-xs font-bold py-1 px-2.5 rounded-full shadow-lg animate-bounce pointer-events-none z-30 flex items-center gap-1.5">
          <HandPointIcon className="text-xs text-amber-300" />
          <span>{lang === 'bn' ? 'আমাকে টেনে স্ক্রিনে সরাও!' : 'Drag me anywhere!'}</span>
        </div>
      )}

      {/* 3. Reset Button (Visible when Aunty has been moved away) */}
      {!isDocked && (
        <button
          onClick={handleResetPosition}
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#8E1B3A] dark:bg-rose-700 text-white hover:bg-[#75142E] shadow-md flex items-center justify-center text-xs transition-transform hover:scale-110 z-30 cursor-pointer"
          title={lang === 'bn' ? 'আন্টিকে আগের জায়গায় ফিরিয়ে নাও' : 'Reset Aunty to original spot'}
          aria-label="Reset position"
        >
          <RotateLeftIcon className="text-[10px]" />
        </button>
      )}

      {/* 4. Aunty Mascot Floating Avatar Card */}
      <div
        className={`relative w-28 h-28 sm:w-36 sm:h-36 bg-[#FFFDF9] dark:bg-stone-900 rounded-full p-2 border-2 sm:border-[3px] border-[#8E1B3A] dark:border-rose-500 shadow-2xl flex items-center justify-center transition-all ${
          isDragging
            ? 'scale-105 rotate-6 shadow-2xl opacity-95 ring-4 ring-[#8E1B3A]/30 dark:ring-rose-400/30'
            : 'animate-aunty-float group-hover:scale-105'
        }`}
      >
        <img
          src={auntyAvatarUrl}
          alt="Aunty Avatar"
          draggable={false}
          className="w-full h-full object-contain pointer-events-none"
        />

        {/* Floating Pulsing Glow Accent Behind Avatar */}
        <div className="absolute inset-0 rounded-full bg-[#FFD166]/20 -z-10 animate-pulse pointer-events-none" />
      </div>

      {/* 5. Dynamic Shadow Under Aunty that Scales when Floating */}
      <div
        className={`w-20 sm:w-24 h-3 sm:h-4 mx-auto mt-1 rounded-full bg-black/25 blur-[3px] pointer-events-none ${
          isDragging ? 'opacity-10 scale-90' : 'animate-aunty-shadow'
        }`}
      />
    </div>
  );
}
