import React from 'react';
import { CloseIcon, CheckIcon, RotateLeftIcon } from './FontAwesomeIcons';
import auntyAvatarUrl from '../assets/mascots/aunty_avatar_perfect.png';

export default function QuestionModal({
  tile,
  isMarked,
  onToggleMark,
  onClose,
  lang,
  occasionName
}) {
  if (!tile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#FFFDF9] rounded-3xl shadow-2xl border-2 border-[#8E1B3A] p-5 sm:p-6 text-center animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F4E8D9] text-[#8E1B3A] flex items-center justify-center hover:bg-[#EBDDCB] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <CloseIcon className="text-sm" />
        </button>

        {/* Small Mascot Avatar */}
        <div className="w-14 h-14 mx-auto mb-2">
          <img src={auntyAvatarUrl} alt="Aunty Avatar" className="w-full h-full object-contain" />
        </div>

        {/* Category Tag */}
        <div className="inline-block bg-[#F4E8D9] text-[#8E1B3A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          {occasionName}
        </div>

        {/* Title */}
        <h3 className="text-xs font-bold text-[#6E554D] uppercase tracking-wider mb-2">
          {lang === 'bn' ? 'সম্পূর্ণ প্রশ্ন' : 'Full Question'}
        </h3>

        {/* Full Question in Bengali */}
        <div className="bg-[#FFF6E5] rounded-2xl p-4 sm:p-5 border border-[#D8C6B6] mb-3">
          <p className="font-bold text-lg sm:text-xl text-[#2B1B17] leading-relaxed">
            {tile.bn}
          </p>
          {tile.en && (
            <p className="text-xs sm:text-sm text-[#6E554D] mt-2 font-medium border-t border-[#D8C6B6]/60 pt-2">
              "{tile.en}"
            </p>
          )}
        </div>

        {/* Action Button: Mark or Unmark */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={() => {
              onToggleMark();
              onClose();
            }}
            className={`w-full py-3 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer ${
              isMarked
                ? 'bg-[#F2EAE1] border border-[#8E1B3A] text-[#8E1B3A] hover:bg-[#EBDDCB]'
                : 'bg-[#8E1B3A] hover:bg-[#75142E] text-white'
            }`}
          >
            {isMarked ? (
              <>
                <RotateLeftIcon className="text-sm" />
                <span>{lang === 'bn' ? 'দাগ মুছে ফেলুন (Unmark)' : 'Unmark this Tile'}</span>
              </>
            ) : (
              <>
                <CheckIcon className="text-sm" />
                <span>{lang === 'bn' ? 'ঘরে দাগ দিন (Mark Tile)' : 'Mark this Tile'}</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-bold text-[#6E554D] hover:text-[#8E1B3A] transition-colors cursor-pointer"
          >
            {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>

        {/* Microcopy Tip */}
        <p className="text-[11px] text-[#8A7268] mt-2 border-t border-[#EFE7DE] pt-2">
          {lang === 'bn'
            ? 'টিপস: বোর্ডে কোনো কার্ডে ডাবল ক্লিক করলেই সেটি আনমার্ক হয়ে যাবে।'
            : 'Tip: Double-click any card on the board anytime to unmark it.'}
        </p>
      </div>
    </div>
  );
}
