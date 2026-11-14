/**
 * Bingo Win Detection Utility supporting both 3x3 (Figma UI/UX) and 5x5 (SRS Classic) modes.
 */

// 3x3 Winning Lines (8 total)
export const WINNING_LINES_3X3 = [
  { id: 'row-0', type: 'row', index: 0, indices: [0, 1, 2], nameEn: 'Row 1', nameBn: '১ম সারি' },
  { id: 'row-1', type: 'row', index: 1, indices: [3, 4, 5], nameEn: 'Row 2', nameBn: '২য় সারি' },
  { id: 'row-2', type: 'row', index: 2, indices: [6, 7, 8], nameEn: 'Row 3', nameBn: '৩য় সারি' },
  { id: 'col-0', type: 'col', index: 0, indices: [0, 3, 6], nameEn: 'Col 1', nameBn: '১ম কলাম' },
  { id: 'col-1', type: 'col', index: 1, indices: [1, 4, 7], nameEn: 'Col 2', nameBn: '২য় কলাম' },
  { id: 'col-2', type: 'col', index: 2, indices: [2, 5, 8], nameEn: 'Col 3', nameBn: '৩য় কলাম' },
  { id: 'diag-0', type: 'diag', index: 0, indices: [0, 4, 8], nameEn: 'Main Diagonal', nameBn: 'প্রধান কোণাকুণি' },
  { id: 'diag-1', type: 'diag', index: 1, indices: [2, 4, 6], nameEn: 'Anti-Diagonal', nameBn: 'বিপরীত কোণাকুণি' }
];

// 5x5 Winning Lines (12 total, SRS Section 6.7)
export const WINNING_LINES_5X5 = [
  // 5 Rows
  { id: 'row-0', type: 'row', index: 0, indices: [0, 1, 2, 3, 4] },
  { id: 'row-1', type: 'row', index: 1, indices: [5, 6, 7, 8, 9] },
  { id: 'row-2', type: 'row', index: 2, indices: [10, 11, 12, 13, 14] },
  { id: 'row-3', type: 'row', index: 3, indices: [15, 16, 17, 18, 19] },
  { id: 'row-4', type: 'row', index: 4, indices: [20, 21, 22, 23, 24] },
  // 5 Columns
  { id: 'col-0', type: 'col', index: 0, indices: [0, 5, 10, 15, 20] },
  { id: 'col-1', type: 'col', index: 1, indices: [1, 6, 11, 16, 21] },
  { id: 'col-2', type: 'col', index: 2, indices: [2, 7, 12, 17, 22] },
  { id: 'col-3', type: 'col', index: 3, indices: [3, 8, 13, 18, 23] },
  { id: 'col-4', type: 'col', index: 4, indices: [4, 9, 14, 19, 24] },
  // 2 Diagonals
  { id: 'diag-0', type: 'diag', index: 0, indices: [0, 6, 12, 18, 24] },
  { id: 'diag-1', type: 'diag', index: 1, indices: [4, 8, 12, 16, 20] }
];

export function checkBingo(markedIndices, gridSize = 3) {
  const markedSet = new Set(markedIndices);
  const lines = gridSize === 5 ? WINNING_LINES_5X5 : WINNING_LINES_3X3;

  const completedLines = lines.filter(line =>
    line.indices.every(idx => markedSet.has(idx))
  );

  const winningTileIndices = new Set();
  completedLines.forEach(line => {
    line.indices.forEach(idx => winningTileIndices.add(idx));
  });

  return {
    hasBingo: completedLines.length > 0,
    completedLines,
    winningTileIndices: Array.from(winningTileIndices),
    isWinningTile: (index) => winningTileIndices.has(index)
  };
}

export function isOneAway(markedIndices, gridSize = 3) {
  const markedSet = new Set(markedIndices);
  const lines = gridSize === 5 ? WINNING_LINES_5X5 : WINNING_LINES_3X3;
  const targetNeeded = gridSize === 5 ? 4 : 2;

  return lines.some(line => {
    const markedCount = line.indices.filter(idx => markedSet.has(idx)).length;
    return markedCount === targetNeeded;
  });
}
