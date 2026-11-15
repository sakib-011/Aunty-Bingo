import React, { useRef } from 'react';
import { StarIcon, CheckIcon, InfoIcon } from './FontAwesomeIcons';

export default function BingoBoard({
  board,
  markedIndices,
  winningLines = [],
  onToggleTile,
  onUnmarkTile,
  onViewFullQuestion,
  lang,
  occasionColor = '#0F7B5F',
  gridSize = 3
}) {
  const markedSet = new Set(markedIndices);
  const winningTileSet = new Set();
  winningLines.forEach(line => line.indices.forEach(idx => winningTileSet.add(idx)));

  const is5x5 = gridSize === 5;
  const lastTapRef = useRef({});

  // Handle tap with double-tap detection for mobile devices
  const handleTileClick = (index) => {
    const tile = board[index];
    if (tile.isFree && is5x5) return;

    const now = Date.now();
    const lastTap = lastTapRef.current[index] || 0;

    // Detect double-tap (within 350ms)
    if (now - lastTap < 350) {
      // Double click / tap detected -> unmark it ("abr back chole asbe")!
      if (markedSet.has(index)) {
        onUnmarkTile(index);
      }
      lastTapRef.current[index] = 0;
      return;
    }

    lastTapRef.current[index] = now;
    onToggleTile(index);
  };

  return (
    <div
      className={`relative w-full mx-auto aspect-square p-2 transition-all duration-300 ${
        is5x5
          ? 'max-w-[460px] sm:max-w-[520px] md:max-w-[560px]'
          : 'max-w-[380px] sm:max-w-[420px] md:max-w-[460px]'
      }`}
    >
      {/* Grid of Tiles */}
      <div
        className={`grid w-full h-full ${
          is5x5
            ? 'grid-cols-5 grid-rows-5 gap-1 sm:gap-1.5'
            : 'grid-cols-3 grid-rows-3 gap-2 sm:gap-3'
        }`}
      >
        {board.map((tile, index) => {
          const isFree = tile.isFree;
          const isMarked = markedSet.has(index) || isFree;
          const isWinning = winningTileSet.has(index);
          const phraseText = lang === 'bn' ? tile.bn : tile.en;
          const isLong = (phraseText || '').length > (is5x5 ? 18 : 26);

          return (
            <div
              key={tile.id || index}
              onClick={() => handleTileClick(index)}
              onDoubleClick={(e) => {
                e.preventDefault();
                if (!isFree && markedSet.has(index)) {
                  onUnmarkTile(index);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTileClick(index);
                } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key.toLowerCase() === 'u') {
                  e.preventDefault();
                  if (!isFree) onUnmarkTile(index);
                }
              }}
              role="button"
              tabIndex={0}
              data-tile-index={index}
              aria-pressed={isMarked}
              aria-label={`${phraseText} - ${isFree ? 'Free Tile' : isMarked ? 'Marked. Double-click to unmark' : 'Not marked'}`}
              className={`relative flex flex-col items-center justify-center text-center select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8E1B3A] dark:focus:ring-[#ff7597] transition-all duration-150 group ${
                is5x5 ? 'p-1 sm:p-2 rounded-xl sm:rounded-2xl border' : 'p-2 sm:p-3.5 rounded-2xl sm:rounded-3xl border-2'
              } ${
                isFree
                  ? 'bg-[#FFF9E6] dark:bg-[#2b1f14] border-[#E69C24] dark:border-[#e5a034] shadow-sm'
                  : isWinning
                  ? 'bg-[#E2EEE1] dark:bg-[#1a3827] border-[#0F7B5F] dark:border-[#2ecc71] shadow-sm scale-[1.01]'
                  : isMarked
                  ? 'bg-[#FBE9DF] dark:bg-[#341b25] border-[#8E1B3A] dark:border-[#ff7597] shadow-inner'
                  : 'bg-white dark:bg-[#1f1318] hover:bg-[#FFFDF9] dark:hover:bg-[#2c1720] border-[#8E1B3A] dark:border-[#4d2737] active:scale-[0.98]'
              }`}
            >
              {/* Center Free Tile Star */}
              {isFree ? (
                <div className="flex flex-col items-center">
                  <StarIcon className="text-[#E69C24] text-sm sm:text-base animate-spin" />
                  <span className="font-black text-[10px] sm:text-xs text-[#B84B12] dark:text-[#f39c12] mt-0.5 uppercase tracking-wider">
                    {lang === 'bn' ? tile.bn : tile.en}
                  </span>
                  <span className="text-[9px] text-[#8A7268] dark:text-[#a08b93] hidden sm:block">
                    {lang === 'bn' ? tile.subBn : tile.subEn}
                  </span>
                </div>
              ) : (
                <>
                  {/* Checkmark Stamp Badge in Top Right */}
                  {isMarked && (
                    <div
                      className={`absolute top-1 right-1 rounded-full border flex items-center justify-center animate-in zoom-in-75 duration-150 ${
                        is5x5 ? 'w-4 h-4 sm:w-4.5 sm:h-4.5' : 'w-5 h-5 sm:w-6 sm:h-6 border-2'
                      } ${
                        isWinning
                          ? 'border-[#0F7B5F] dark:border-[#2ecc71] text-[#0F7B5F] dark:text-[#2ecc71]'
                          : 'border-[#CB3C3B] dark:border-[#ff5e62] text-[#CB3C3B] dark:text-[#ff5e62]'
                      }`}
                      title={lang === 'bn' ? 'দাগ দেওয়া হয়েছে (ডাবল ক্লিকে মুছুন)' : 'Marked (Double-click to unmark)'}
                    >
                      <CheckIcon className={is5x5 ? 'text-[9px]' : 'text-[11px]'} />
                    </div>
                  )}

                  {/* Phrase Text */}
                  <span
                    className={`font-bold leading-tight px-0.5 ${
                      isMarked
                        ? 'text-[#8E1B3A] dark:text-[#ff91ac]'
                        : 'text-[#2B1B17] dark:text-[#fbf5ef]'
                    } ${
                      is5x5
                        ? 'text-[10px] sm:text-xs line-clamp-3'
                        : isLong
                        ? 'text-xs sm:text-sm line-clamp-3'
                        : 'text-xs sm:text-base leading-snug'
                    }`}
                  >
                    {phraseText}
                  </span>

                  {/* Small Icon to View Full Question if text is long or user wants full details */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewFullQuestion(tile, index);
                    }}
                    className={`absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 rounded-full bg-[#8E1B3A]/10 dark:bg-white/10 text-[#8E1B3A] dark:text-[#ff7597] hover:bg-[#8E1B3A] hover:text-white dark:hover:bg-[#ff7597] dark:hover:text-[#140d10] flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                      is5x5 ? 'w-3.5 h-3.5 sm:w-4 sm:h-4' : 'w-4 h-4 sm:w-5 sm:h-5'
                    } ${isLong ? 'opacity-90' : 'opacity-40 group-hover:opacity-100'}`}
                    title={lang === 'bn' ? 'সম্পূর্ণ প্রশ্ন দেখুন' : 'View full question'}
                    aria-label="View full question"
                  >
                    <InfoIcon className={is5x5 ? 'text-[8px]' : 'text-[10px]'} />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* SVG Strikethrough Lines */}
      {winningLines.length > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none p-2"
          viewBox="0 0 300 300"
        >
          {winningLines.map((line) => {
            let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
            const step = 300 / gridSize;
            const half = step / 2;

            if (line.type === 'row') {
              const y = half + line.index * step;
              x1 = 15;
              x2 = 285;
              y1 = y;
              y2 = y;
            } else if (line.type === 'col') {
              const x = half + line.index * step;
              y1 = 15;
              y2 = 285;
              x1 = x;
              x2 = x;
            } else if (line.type === 'diag' && line.index === 0) {
              x1 = 20;
              y1 = 20;
              x2 = 280;
              y2 = 280;
            } else if (line.type === 'diag' && line.index === 1) {
              x1 = 280;
              y1 = 20;
              x2 = 20;
              y2 = 280;
            }

            return (
              <line
                key={line.id}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={occasionColor}
                strokeWidth={is5x5 ? '4' : '5'}
                strokeLinecap="round"
                className="animate-in fade-in duration-300"
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}
