import React, { useState, useEffect } from 'react';
import auntyLaughingUrl from '../assets/mascots/aunty_avatar_perfect.png';
import auntyAngryUrl from '../assets/mascots/aunty_3d_interrogation.png';
import {
  CloseIcon,
  DownloadIcon,
  ShareIcon,
  CopyIcon,
  CheckIcon,
  InstagramIcon,
  FacebookIcon,
  MessengerIcon,
  WhatsAppIcon,
  TrophyIcon,
  ShieldIcon
} from './FontAwesomeIcons';
import { generateCardCanvas } from '../utils/canvasExport';
import { shareToSocial } from '../utils/share';

export default function ExportModal({
  isOpen,
  onClose,
  board,
  markedIndices = [],
  winningLines = [],
  occasionId = 'eid',
  lang = 'bn',
  elapsedTime = '00:00',
  winTimeOfDay = '',
  gridSize = 3,
  playerName = '',
  hasBingo = false
}) {
  const [dataUrl, setDataUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const isWon = Boolean(hasBingo ?? (winningLines && winningLines.length > 0));

  useEffect(() => {
    if (!isOpen) return;

    let isCancelled = false;
    generateCardCanvas({
      board,
      markedIndices,
      winningLines,
      occasionId,
      lang,
      elapsedTime,
      winTimeOfDay,
      gridSize,
      playerName,
      hasBingo: isWon
    }).then((canvas) => {
      if (!isCancelled) {
        setDataUrl(canvas.toDataURL('image/png'));
        setIsGenerating(false);
      }
    }).catch((err) => {
      console.error('Failed to generate canvas:', err);
      if (!isCancelled) {
        setIsGenerating(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [isOpen, board, markedIndices, winningLines, occasionId, lang, elapsedTime, winTimeOfDay, gridSize, playerName, isWon]);

  if (!isOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 5000);
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    const prefix = isWon ? 'aunty-bingo-win' : 'aunty-bingo-survival';
    a.download = `${prefix}-${occasionId}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSocialClick = async (platform) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#FFFDF9] dark:bg-stone-900 rounded-3xl shadow-2xl border border-[#D8C6B6] dark:border-stone-700 p-4 sm:p-5 max-h-[95vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F4E8D9] dark:bg-stone-800 text-[#8E1B3A] dark:text-rose-400 flex items-center justify-center hover:bg-[#EBDDCB] dark:hover:bg-stone-700 transition-colors cursor-pointer z-10"
          aria-label="Close"
        >
          <CloseIcon className="text-sm" />
        </button>

        {/* Header Block with Character Expression & Title */}
        <div className="flex items-center gap-3.5 mb-3.5 pr-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center bg-[#FFF6E5] dark:bg-stone-800 rounded-2xl border-2 border-[#D8C6B6] dark:border-stone-700 p-1 overflow-hidden shadow-sm">
            <img
              src={isWon ? auntyLaughingUrl : auntyAngryUrl}
              alt={isWon ? (lang === 'bn' ? 'হাস্যোজ্জ্বল আন্টি' : 'Laughing Aunty') : (lang === 'bn' ? 'রাগান্বিত আন্টি' : 'Frustrated Aunty')}
              className="w-full h-full object-contain filter drop-shadow-sm transition-transform hover:scale-105 duration-200"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-black text-[#8E1B3A] dark:text-rose-400 leading-tight">
              {isWon
                ? (lang === 'bn' ? 'অভিনন্দন! আপনার বিঙ্গো কার্ড' : 'BINGO! Victory Card')
                : (lang === 'bn' ? 'আজকের জন্য বেঁচে গেলা' : 'You have survived for the day')}
            </h2>
            {playerName && (
              <div className="inline-flex items-center gap-1.5 mt-1 bg-[#F4E8D9] dark:bg-[#28181f] border-2 border-[#8E1B3A]/40 dark:border-rose-500/50 px-3 py-0.5 rounded-full text-xs sm:text-sm font-extrabold text-[#8E1B3A] dark:text-[#ff7597] shadow-xs">
                {isWon ? <TrophyIcon className="text-amber-500 text-xs" /> : <ShieldIcon className="text-emerald-600 dark:text-emerald-400 text-xs" />}
                <span className="truncate">{playerName}</span>
              </div>
            )}
            <p className="text-xs font-semibold text-[#6E554D] dark:text-stone-400 mt-1 leading-snug">
              {isWon
                ? (lang === 'bn' ? 'আপনার বিজয়ী কার্ড বন্ধুদের সাথে শেয়ারের জন্য প্রস্তুত' : 'Celebration card ready to share with friends and family')
                : (lang === 'bn' ? 'আন্টির হাত থেকে বাঁচার স্বস্তির কার্ড বন্ধুদের সাথে শেয়ারের জন্য প্রস্তুত' : 'Relief & survival card ready to share with friends and family')}
            </p>
          </div>
        </div>

        {/* Card Preview Container */}
        <div className="relative aspect-[4/5] w-full max-w-[280px] sm:max-w-[320px] mx-auto bg-[#FFF6E5] dark:bg-stone-800 rounded-2xl overflow-hidden shadow-inner border border-[#D8C6B6] dark:border-stone-700 flex items-center justify-center mb-4">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-2 text-[#8E1B3A] dark:text-rose-400">
              <span className="text-xs font-bold animate-pulse">
                {lang === 'bn' ? 'কার্ড তৈরি হচ্ছে...' : 'Generating card...'}
              </span>
            </div>
          ) : dataUrl ? (
            <img
              src={dataUrl}
              alt={isWon ? "Generated Aunty Bingo Celebration Card" : "Generated Aunty Bingo Survival Card"}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-xs text-red-500 font-bold">
              {lang === 'bn' ? 'কার্ড লোড করা যায়নি' : 'Failed to generate card'}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {/* Share Button (Native Web Share) */}
          <button
            onClick={() => handleSocialClick('native')}
            disabled={isGenerating || !dataUrl}
            className="w-full py-3 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] dark:bg-rose-700 dark:hover:bg-rose-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
          >
            <ShareIcon className="text-sm" />
            <span>{lang === 'bn' ? 'দ্রুত শেয়ার' : 'Quick Share'}</span>
          </button>

          {/* Download PNG Button */}
          <button
            onClick={handleDownload}
            disabled={isGenerating || !dataUrl}
            className="w-full py-2.5 rounded-full border-2 border-[#8E1B3A] dark:border-rose-500 text-[#8E1B3A] dark:text-rose-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#8E1B3A]/5 dark:hover:bg-rose-500/10 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
          >
            <DownloadIcon className="text-sm" />
            <span>{lang === 'bn' ? 'ডাউনলোড পিএনজি (1080×1350)' : 'Download PNG (1080×1350)'}</span>
          </button>

          {/* Social Platform Share Icons */}
          <div className="mt-1 pt-2 border-t border-[#E8DCD0] dark:border-stone-700">
            <p className="text-xs font-bold text-center text-[#6E554D] dark:text-stone-400 mb-2">
              {lang === 'bn' ? 'সোশ্যাল মিডিয়ায় এক-ক্লিকে শেয়ার করুন:' : 'Share directly to platforms:'}
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              <button
                onClick={() => handleSocialClick('instagram')}
                className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#F4E8D9]/70 dark:bg-stone-800 hover:bg-[#F4E8D9] dark:hover:bg-stone-700 border border-[#D8C6B6]/60 dark:border-stone-700 transition-colors cursor-pointer"
                title="Instagram Stories"
              >
                <InstagramIcon className="text-sm text-[#8E1B3A] dark:text-rose-400" />
                <span className="text-xs font-bold text-[#6E554D] dark:text-stone-300 mt-1">Stories</span>
              </button>
              <button
                onClick={() => handleSocialClick('facebook')}
                className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#F4E8D9]/70 dark:bg-stone-800 hover:bg-[#F4E8D9] dark:hover:bg-stone-700 border border-[#D8C6B6]/60 dark:border-stone-700 transition-colors cursor-pointer"
                title="Facebook"
              >
                <FacebookIcon className="text-sm text-[#1877F2]" />
                <span className="text-xs font-bold text-[#6E554D] dark:text-stone-300 mt-1">Facebook</span>
              </button>
              <button
                onClick={() => handleSocialClick('whatsapp')}
                className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#F4E8D9]/70 dark:bg-stone-800 hover:bg-[#F4E8D9] dark:hover:bg-stone-700 border border-[#D8C6B6]/60 dark:border-stone-700 transition-colors cursor-pointer"
                title="WhatsApp"
              >
                <WhatsAppIcon className="text-sm text-[#25D366]" />
                <span className="text-xs font-bold text-[#6E554D] dark:text-stone-300 mt-1">WhatsApp</span>
              </button>
              <button
                onClick={() => handleSocialClick('messenger')}
                className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#F4E8D9]/70 dark:bg-stone-800 hover:bg-[#F4E8D9] dark:hover:bg-stone-700 border border-[#D8C6B6]/60 dark:border-stone-700 transition-colors cursor-pointer"
                title="Messenger"
              >
                <MessengerIcon className="text-sm text-[#0084FF]" />
                <span className="text-xs font-bold text-[#6E554D] dark:text-stone-300 mt-1">Messenger</span>
              </button>
              <button
                onClick={() => handleSocialClick('copy')}
                className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#F4E8D9]/70 dark:bg-stone-800 hover:bg-[#F4E8D9] dark:hover:bg-stone-700 border border-[#D8C6B6]/60 dark:border-stone-700 transition-colors cursor-pointer"
                title="Copy Link"
              >
                {copied ? <CheckIcon className="text-sm text-green-600 dark:text-green-400" /> : <CopyIcon className="text-sm text-[#6E554D] dark:text-stone-300" />}
                <span className="text-xs font-bold text-[#6E554D] dark:text-stone-300 mt-1">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Toast Message */}
          {toastMessage && (
            <div className="bg-[#2B1B17] dark:bg-stone-800 text-white text-xs font-semibold px-4 py-2 rounded-2xl text-center shadow-lg animate-in slide-in-from-bottom-2 duration-150">
              {toastMessage}
            </div>
          )}

          <p className="text-xs text-[#8A7268] dark:text-stone-400 text-center font-medium mt-0.5">
            {lang === 'bn' ? 'কোনো লগইন বা সাইন-আপের প্রয়োজন নেই • ১০০% ব্যক্তিগত' : 'No sign-up needed • 100% private'}
          </p>
        </div>
      </div>
    </div>
  );
}
