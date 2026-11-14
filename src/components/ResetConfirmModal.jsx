import React from 'react';

export default function ResetConfirmModal({ isOpen, onConfirm, onCancel, lang }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xs sm:max-w-sm bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#D8C6B6] p-5 sm:p-6 text-center animate-in zoom-in-95 duration-200">
        <h3 className="text-xl sm:text-2xl font-black text-[#8E1B3A] mb-1">
          {lang === 'bn' ? 'নতুন বোর্ড শুরু করবেন?' : 'Start a new board?'}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-[#6E554D] mb-5">
          {lang === 'bn' ? 'আপনার দাগ ও টাইমার রিসেট হয়ে যাবে।' : 'Your marks and timer will reset.'}
        </p>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={onConfirm}
            className="w-full py-3 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] text-white font-bold text-sm sm:text-base active:scale-[0.99] transition-all shadow-md"
          >
            {lang === 'bn' ? 'নতুন বোর্ড' : 'New Board'}
          </button>

          <button
            onClick={onCancel}
            className="w-full py-2.5 rounded-full border border-[#D8C6B6] bg-[#FFF6E5] text-[#2B1B17] font-bold text-sm hover:bg-[#F2EAE1] active:scale-[0.99] transition-all"
          >
            {lang === 'bn' ? 'বাতিল' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
}
