import React from 'react';
import { PlayIcon, PauseIcon, ResetIcon } from './FontAwesomeIcons';

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
    <div className="w-full flex items-center justify-between py-1.5 px-1">
      {/* Timer Display & Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="font-mono font-bold text-base sm:text-lg text-[#2B1B17] tracking-wider" title="Stopwatch Timer">
          {timeFormatted}
        </span>

        {/* Play/Pause Button */}
        <button
          onClick={onToggleTimer}
          className="w-7 h-7 rounded-full text-[#8E1B3A] hover:bg-[#8E1B3A]/10 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          title={isRunning ? (lang === 'bn' ? 'থামুন' : 'Pause') : (lang === 'bn' ? 'চালান' : 'Play')}
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? <PauseIcon className="text-sm" /> : <PlayIcon className="text-sm" />}
        </button>

        {/* Reset All Option */}
        <button
          onClick={onResetAll}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-[#8E1B3A] bg-[#8E1B3A]/10 hover:bg-[#8E1B3A]/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          title={lang === 'bn' ? 'প্রথম থেকে রিসেট করুন' : 'Reset from beginning'}
          aria-label="Reset game"
        >
          <ResetIcon className="text-[11px]" />
          <span>{lang === 'bn' ? 'রিসেট' : 'Reset'}</span>
        </button>
      </div>

      {/* Marked Counter Pill */}
      <div
        className="bg-[#F4E8D9] text-[#2B1B17] font-bold text-xs sm:text-sm px-3 py-1 rounded-full border border-[#D8C6B6] whitespace-nowrap"
        title={lang === 'bn' ? `${markedCount}টি ঘর চিহ্নিত` : `${markedCount} tiles marked`}
      >
        {markedCount}/{totalTiles}
      </div>
    </div>
  );
}
