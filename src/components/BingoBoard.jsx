import React, { useRef } from 'react';
import { StarIcon, CheckIcon, CommentsIcon, DragIcon } from './FontAwesomeIcons';
import StressMeter from './StressMeter';

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
      className={`relative w-full mx-auto transition-all duration-300 ${
        is5x5
          ? 'w-full max-w-full lg:max-w-[860px] xl:max-w-[940px] 2xl:max-w-[1020px]'
          : 'max-w-[380px] sm:max-w-[420px] md:max-w-[460px]'
      }`}
    >
      {/* Dynamic Interrogation Stress Meter */}
      <StressMeter
        markedCount={markedSet.size}
        totalTiles={board.length}
        lang={lang}
      />

      {/* Mobile Horizontal Scroll Hint for 5x5 */}
      {is5x5 && (
        <div className="lg:hidden flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#8E1B3A] dark:text-[#ff7597] bg-[#F4E8D9] dark:bg-[#28181f] border border-[#D8C6B6]/60 dark:border-[#3d232c] px-3.5 py-1 rounded-full mb-2.5 shadow-xs mx-auto w-fit animate-pulse">
          <DragIcon className="text-xs" />
          <span>{lang === 'bn' ? 'বোর্ডটি ডানে বা বামে স্ক্রোল করে সব প্রশ্ন পড়ুন ↔' : 'Scroll horizontally to view all tiles ↔'}</span>
        </div>
      )}

      {/* Outer Scroll Container for Mobile 5x5 Matrix */}
      <div className={is5x5 ? 'w-full overflow-x-auto pb-3 scrollbar-thin touch-pan-x' : 'w-full'}>
        <div className={`relative p-1.5 sm:p-2 ${is5x5 ? 'min-w-[620px] sm:min-w-[680px] lg:min-w-0 w-full' : 'w-full aspect-square'}`}>
          {/* Grid of Tiles */}
          <div
            className={`grid w-full h-full ${
              is5x5
                ? 'grid-cols-5 gap-1.5 sm:gap-2 xl:gap-2.5'
                : 'grid-cols-3 grid-rows-3 gap-2 sm:gap-3'
            }`}
          >
          {board.map((tile, index) => {
            const isFree = tile.isFree;
            const isMarked = markedSet.has(index) || isFree;
            const isWinning = winningTileSet.has(index);
            const phraseText = lang === 'bn' ? tile.bn : tile.en;
            const isLong = (phraseText || '').length > (is5x5 ? 24 : 26);

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
                  is5x5
                    ? 'p-1.5 sm:p-2.5 xl:p-3 rounded-xl sm:rounded-2xl border min-h-[96px] sm:min-h-[110px] md:min-h-[118px] xl:min-h-[126px]'
                    : 'p-2 sm:p-3.5 rounded-2xl sm:rounded-3xl border-2'
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
                  <div className="flex flex-col items-center justify-center">
                    <StarIcon className="text-[#E69C24] text-sm sm:text-base md:text-lg animate-spin" />
                    <span className="font-black text-xs sm:text-sm md:text-base text-[#B84B12] dark:text-[#f39c12] mt-0.5 uppercase tracking-wider">
                      {lang === 'bn' ? tile.bn : tile.en}
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#8A7268] dark:text-[#a08b93] mt-0.5">
                      {lang === 'bn' ? tile.subBn : tile.subEn}
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Checkmark Stamp Badge in Top Right */}
                    {isMarked && (
                      <div
                        className={`absolute top-1 right-1 rounded-full border flex items-center justify-center animate-in zoom-in-75 duration-150 ${
                          is5x5 ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5 sm:w-6 sm:h-6 border-2'
                        } ${
                          isWinning
                            ? 'border-[#0F7B5F] dark:border-[#2ecc71] text-[#0F7B5F] dark:text-[#2ecc71]'
                            : 'border-[#CB3C3B] dark:border-[#ff5e62] text-[#CB3C3B] dark:text-[#ff5e62]'
                        }`}
                        title={lang === 'bn' ? 'দাগ দেওয়া হয়েছে (ডাবল ক্লিকে মুছুন)' : 'Marked (Double-click to unmark)'}
                      >
                        <CheckIcon className={is5x5 ? 'text-[10px]' : 'text-[11px]'} />
                      </div>
                    )}

                    {/* Phrase Text */}
                    <span
                      className={`font-bold leading-snug px-0.5 break-words hyphens-auto ${
                        isMarked
                          ? 'text-[#8E1B3A] dark:text-[#ff91ac]'
                          : 'text-[#2B1B17] dark:text-[#fbf5ef]'
                      } ${
                        is5x5
                          ? 'text-[11px] sm:text-xs md:text-[13px] xl:text-[14px]'
                          : isLong
                          ? 'text-xs sm:text-sm line-clamp-3'
                          : 'text-xs sm:text-base leading-snug'
                      }`}
                    >
                      {phraseText}
                    </span>

                    {/* Small Icon to View Full Question and Savage Comebacks */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewFullQuestion(tile, index);
                      }}
                      className={`absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 rounded-full bg-[#8E1B3A]/10 dark:bg-white/10 text-[#8E1B3A] dark:text-[#ff7597] hover:bg-[#8E1B3A] hover:text-white dark:hover:bg-[#ff7597] dark:hover:text-[#140d10] flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                        is5x5 ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-4 h-4 sm:w-5 sm:h-5'
                      } ${isLong ? 'opacity-90' : 'opacity-40 group-hover:opacity-100'}`}
                      title={lang === 'bn' ? 'আন্টির মোক্ষম জবাব ও সম্পূর্ণ প্রশ্ন' : 'View question & savage comebacks'}
                      aria-label="View question and comebacks"
                    >
                      <CommentsIcon className={is5x5 ? 'text-[8px] sm:text-[10px]' : 'text-[9px]'} />
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
            className="absolute inset-0 w-full h-full pointer-events-none p-1.5 sm:p-2"
            viewBox="0 0 300 300"
            preserveAspectRatio="none"
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
      </div>
    </div>
  );
}
