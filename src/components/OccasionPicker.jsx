import React, { useState } from 'react';
import { OCCASIONS } from '../utils/phrases';
import { OccasionIcon, ChevronDownIcon, CheckIcon } from './FontAwesomeIcons';

export default function OccasionPicker({ activeOccasionId, onSelectOccasion, lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const active = OCCASIONS[activeOccasionId] || OCCASIONS.eid;

  const handleSelect = (id) => {
    onSelectOccasion(id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-center w-full max-w-sm mx-auto">
      {/* Active Occasion Chip */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: active.tagColor }}
        className="text-white px-5 py-2 rounded-full font-bold text-sm sm:text-base inline-flex items-center gap-2 shadow-sm transition-transform active:scale-95 hover:opacity-95 cursor-pointer"
      >
        <OccasionIcon occasionId={active.id} className="text-sm" />
        <span>{lang === 'bn' ? active.nameBn : active.nameEn}</span>
        <ChevronDownIcon className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Subtitle */}
      <p style={{ color: active.tagColor }} className="text-xs font-semibold mt-1 tracking-wide">
        {lang === 'bn' ? active.calendarNoteBn : active.calendarNoteEn}
      </p>

      {/* Dropdown Options */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-[#FFFDF9] dark:bg-[#1f1318] rounded-2xl shadow-xl border border-[#D8C6B6] dark:border-[#422530] p-2 z-30 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-xs font-bold uppercase tracking-wider text-[#6E554D] dark:text-[#c7a9b3] px-3 py-1.5 border-b border-[#EFE7DE] dark:border-[#38202c]">
              {lang === 'bn' ? 'অনুষ্ঠান বেছে নিন' : 'Select Occasion'}
            </div>
            <div className="flex flex-col gap-1 mt-1">
              {Object.values(OCCASIONS).map((occ) => {
                const isCurrent = occ.id === activeOccasionId;
                return (
                  <button
                    key={occ.id}
                    onClick={() => handleSelect(occ.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-sm font-semibold transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-[#F2EAE1] dark:bg-[#341b25] text-[#8E1B3A] dark:text-[#ff7597]'
                        : 'text-[#2B1B17] dark:text-[#fbf5ef] hover:bg-[#F9F4ED] dark:hover:bg-[#2c1720]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <OccasionIcon occasionId={occ.id} className="text-base text-[#8E1B3A] dark:text-[#ff7597]" />
                      <span>{lang === 'bn' ? occ.nameBn : occ.nameEn}</span>
                    </div>
                    {isCurrent && <CheckIcon className="text-sm text-[#8E1B3A] dark:text-[#ff7597]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
