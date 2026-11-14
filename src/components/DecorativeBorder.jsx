import React from 'react';

export default function DecorativeBorder({ themeColor = '#0F7B5F' }) {
  const motifs = Array.from({ length: 16 });

  return (
    <>
      {/* Left Festive Gutter Decoration */}
      <div className="fixed left-3 top-0 bottom-0 hidden xl:flex flex-col justify-around py-8 pointer-events-none select-none opacity-60">
        {motifs.map((_, i) => (
          <div key={`left-${i}`} className="flex items-center gap-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill={themeColor} />
              <path
                d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"
                stroke={themeColor}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Right Festive Gutter Decoration */}
      <div className="fixed right-3 top-0 bottom-0 hidden xl:flex flex-col justify-around py-8 pointer-events-none select-none opacity-60">
        {motifs.map((_, i) => (
          <div key={`right-${i}`} className="flex items-center gap-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill={themeColor} />
              <path
                d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"
                stroke={themeColor}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}
