import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import mascotCelebratingUrl from '../assets/mascots/mascot_celebrating.png';
import {
  InstagramIcon,
  FacebookIcon,
  MessengerIcon,
  WhatsAppIcon,
  DownloadIcon,
  PlayIcon,
  RotateLeftIcon,
  CheckIcon,
  CopyIcon,
  ShareIcon,
  ClockIcon,
  TrophyIcon
} from './FontAwesomeIcons';
import { shareToSocial, toBengaliDigits } from '../utils/share';
import { generateCardCanvas } from '../utils/canvasExport';

export default function BingoModal({
  isOpen,
  onClose,
  onExport,
  onReset,
  elapsedTime = '00:00',
  winTimeOfDay = '',
  lang = 'bn',
  board,
  markedIndices = [],
  winningLines = [],
  occasionId = 'eid',
  gridSize = 3
}) {
  const [toastMessage, setToastMessage] = useState('');
  const [dataUrl, setDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.55 }
        });
        const timer1 = setTimeout(() => {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 220);
        return () => clearTimeout(timer1);
      } catch {
        // Ignore confetti error
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !board || board.length === 0) return;
    let cancelled = false;

    generateCardCanvas({
      board,
      markedIndices,
      winningLines,
      occasionId,
      lang,
      elapsedTime,
      winTimeOfDay,
      gridSize
    }).then((canvas) => {
      if (!cancelled) {
        setDataUrl(canvas.toDataURL('image/png'));
      }
    }).catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [isOpen, board, markedIndices, winningLines, occasionId, lang, elapsedTime, winTimeOfDay, gridSize]);

  if (!isOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 5000);
  };

  const handleSocial = async (platform) => {
    if (platform === 'copy') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    await shareToSocial(platform, {
      lang,
      elapsedTime,
      dataUrl,
      onToast: showToast
    });
  };

  const displayTime = lang === 'bn' ? toBengaliDigits(elapsedTime) : elapsedTime;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#FFFDF9] rounded-3xl shadow-2xl border-2 border-[#D8C6B6] p-5 sm:p-6 text-center animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="absolute top-3 left-4 right-4 z-20 bg-[#2B1B17] text-white text-xs font-bold py-2 px-3 rounded-xl shadow-lg animate-in slide-in-from-top-2 duration-150 flex items-center justify-center gap-1.5">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tilted Maroon BINGO Banner */}
        <div className="inline-block transform -rotate-3 mb-2 shadow-lg">
          <div className="bg-[#8E1B3A] text-white font-bold text-3xl sm:text-4xl tracking-widest px-8 py-2 rounded-2xl border-2 border-[#2B1B17]">
            BINGO!
          </div>
        </div>

        {/* Celebratory Subheading (No emojis) */}
        <div className="text-base sm:text-lg font-bold text-[#8E1B3A] mb-2 flex items-center justify-center gap-2">
          <TrophyIcon className="text-amber-500 text-sm" />
          <span>
            {lang === 'bn'
              ? 'আন্টির জেরার মুখে আপনি বিজয়ী!'
              : 'You survived the family interrogation!'}
          </span>
        </div>

        {/* Celebrating Mascot with Clear Hands */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto my-1 flex items-center justify-center">
          <img
            src={mascotCelebratingUrl}
            alt="Celebrating Aunty Mascot"
            className="w-full h-full object-contain filter drop-shadow-md transition-transform hover:scale-105 duration-200"
          />
        </div>

        {/* Stats Pill (Using FontAwesome ClockIcon instead of emoji) */}
        <div className="bg-[#F2EAE1] rounded-2xl py-2 px-3 my-3 border border-[#D8C6B6] flex items-center justify-center gap-2">
          <ClockIcon className="text-[#8E1B3A] text-xs" />
          <p className="font-bold text-xs sm:text-sm text-[#2B1B17]">
            {lang === 'bn'
              ? `${displayTime} মিনিটে বিঙ্গো সম্পন্ন • ${winTimeOfDay}`
              : `Bingo in ${displayTime} • ${winTimeOfDay}`}
          </p>
        </div>

        {/* SOCIAL SHARE SECTION */}
        <div className="my-3.5 pt-2 border-t border-[#E8DCD0]">
          <p className="text-xs font-bold text-[#6E554D] mb-2">
            {lang === 'bn' ? 'বন্ধুদের সাথে শেয়ার করুন:' : 'Share your win with friends:'}
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-2.5">
            {/* Instagram */}
            <button
              onClick={() => handleSocial('instagram')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FFF6E5] hover:bg-[#FFEECB] border border-[#D8C6B6] text-[#8E1B3A] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Share on Instagram"
              aria-label="Share on Instagram"
            >
              <InstagramIcon className="text-base" />
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleSocial('facebook')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FFF6E5] hover:bg-[#FFEECB] border border-[#D8C6B6] text-[#1877F2] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Share on Facebook"
              aria-label="Share on Facebook"
            >
              <FacebookIcon className="text-base" />
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => handleSocial('whatsapp')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FFF6E5] hover:bg-[#FFEECB] border border-[#D8C6B6] text-[#25D366] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Share on WhatsApp"
              aria-label="Share on WhatsApp"
            >
              <WhatsAppIcon className="text-base" />
            </button>

            {/* Messenger */}
            <button
              onClick={() => handleSocial('messenger')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FFF6E5] hover:bg-[#FFEECB] border border-[#D8C6B6] text-[#0084FF] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Share on Messenger"
              aria-label="Share on Messenger"
            >
              <MessengerIcon className="text-base" />
            </button>

            {/* Copy Link */}
            <button
              onClick={() => handleSocial('copy')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FFF6E5] hover:bg-[#FFEECB] border border-[#D8C6B6] text-[#6E554D] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Copy link to clipboard"
              aria-label="Copy link"
            >
              {copied ? <CheckIcon className="text-green-600 text-sm" /> : <CopyIcon className="text-sm" />}
            </button>

            {/* Native Mobile Share */}
            <button
              onClick={() => handleSocial('native')}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#8E1B3A] text-white hover:bg-[#75142E] flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              title="More Share Options"
              aria-label="More Share Options"
            >
              <ShareIcon className="text-sm" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-2">
          {/* Export Card */}
          <button
            onClick={() => {
              onClose();
              onExport();
            }}
            className="w-full py-2.5 sm:py-3 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] text-white font-bold text-sm sm:text-base active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <DownloadIcon className="text-sm" />
            <span>{lang === 'bn' ? 'কার্ড এক্সপোর্ট ও সেভ' : 'Export & Download Card'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            {/* Keep Playing */}
            <button
              onClick={onClose}
              className="py-2 px-3 rounded-full border border-[#8E1B3A] text-[#8E1B3A] font-bold text-xs sm:text-sm hover:bg-[#8E1B3A]/5 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PlayIcon className="text-xs" />
              <span>{lang === 'bn' ? 'খেলা চালিয়ে যান' : 'Keep Playing'}</span>
            </button>

            {/* Reset / Play Again */}
            <button
              onClick={() => {
                onClose();
                if (onReset) onReset();
              }}
              className="py-2 px-3 rounded-full border border-[#D8C6B6] bg-white text-[#2B1B17] font-bold text-xs sm:text-sm hover:bg-[#F2EAE1] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateLeftIcon className="text-xs" />
              <span>{lang === 'bn' ? 'নতুন করে খেলুন' : 'Play Again'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
