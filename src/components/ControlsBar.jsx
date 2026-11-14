import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function ControlsBar({
  timeFormatted,
  isRunning,
  onToggleTimer,
  onResetAll,
  markedCount,
  totalTiles = 9,
  lang
}) {
  return (
    <div className="w-full max-w-[420px] sm:max-w-[460px] md:max-w-[480px] mx-auto flex items-center justify-between py-2 px-3 sm:px-4">
      {/* Timer Display & Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="font-mono font-bold text-lg sm:text-xl text-[#2B1B17] tracking-wider" title="Stopwatch Timer">
          {timeFormatted}
        </span>

        {/* Play/Pause Button */}
        <button
          onClick={onToggleTimer}
          className="p-1.5 rounded-full text-[#8E1B3A] hover:bg-[#8E1B3A]/10 active:scale-95 transition-all cursor-pointer"
          title={isRunning ? (lang === 'bn' ? 'থামুন (Pause)' : 'Pause') : (lang === 'bn' ? 'চালান (Play)' : 'Play')}
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? <Pause size={17} fill="#8E1B3A" /> : <Play size={17} fill="#8E1B3A" />}
        </button>

        {/* Reset All Option (Timer & Board restart from beginning) */}
        <button
          onClick={onResetAll}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-[#8E1B3A] bg-[#8E1B3A]/10 hover:bg-[#8E1B3A]/20 active:scale-95 transition-all cursor-pointer"
          title={lang === 'bn' ? 'প্রথম থেকে রিসেট করুন' : 'Reset from beginning'}
          aria-label="Reset game"
        >
          <RotateCcw size={14} />
          <span>{lang === 'bn' ? 'রিসেট' : 'Reset'}</span>
        </button>
      </div>

      {/* Marked Counter Pill */}
      <div
        className="bg-[#F4E8D9] text-[#2B1B17] font-bold text-xs sm:text-sm px-3.5 py-1 rounded-full border border-[#D8C6B6]"
        title={lang === 'bn' ? `${markedCount}টি ঘর চিহ্নিত` : `${markedCount} tiles marked`}
      >
        {markedCount}/{totalTiles}
      </div>
    </div>
  );
}
