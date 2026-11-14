import React, { useState } from 'react';
import { OCCASIONS } from '../utils/phrases';
import { ChevronDown, Check } from 'lucide-react';

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
        className="text-white px-5 py-2 rounded-full font-bold text-sm sm:text-base inline-flex items-center gap-2 shadow-sm transition-transform active:scale-95 hover:opacity-95"
      >
        <span>{active.icon}</span>
        <span>{lang === 'bn' ? active.nameBn : active.nameEn}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
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
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-[#FFFDF9] rounded-2xl shadow-xl border border-[#D8C6B6] p-2 z-30 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-xs font-bold uppercase tracking-wider text-[#6E554D] px-3 py-1.5 border-b border-[#EFE7DE]">
              {lang === 'bn' ? 'অনুষ্ঠান বেছে নিন' : 'Select Occasion'}
            </div>
            <div className="flex flex-col gap-1 mt-1">
              {Object.values(OCCASIONS).map((occ) => {
                const isCurrent = occ.id === activeOccasionId;
                return (
                  <button
                    key={occ.id}
                    onClick={() => handleSelect(occ.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-sm font-semibold transition-colors ${
                      isCurrent
                        ? 'bg-[#F2EAE1] text-[#8E1B3A]'
                        : 'text-[#2B1B17] hover:bg-[#F9F4ED]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{occ.icon}</span>
                      <span>{lang === 'bn' ? occ.nameBn : occ.nameEn}</span>
                    </div>
                    {isCurrent && <Check size={16} className="text-[#8E1B3A]" />}
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
