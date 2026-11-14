/**
 * High-Resolution (1080x1350) HTML5 Canvas Card Exporter
 * Generates branded, social-ready PNG cards with the updated crystal-clear Aunty avatar.
 */

import mascotCelebratingUrl from '../assets/mascots/aunty_avatar_perfect.png';
import { OCCASIONS } from './phrases';

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

export async function generateCardCanvas({
  board,
  markedIndices,
  winningLines = [],
  occasionId = 'eid',
  lang = 'bn',
  elapsedTime = '01:48',
  winTimeOfDay = '4:32 PM',
  gridSize = 3
}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  const occasion = OCCASIONS[occasionId] || OCCASIONS.eid;
  const themeColor = occasion.tagColor || '#0F7B5F';
  const markedSet = new Set(markedIndices);

  // Load avatar with clear hands
  const mascotImg = await loadImage(mascotCelebratingUrl);

  // 1. Background
  ctx.fillStyle = '#FFF6E5';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Outer decorative dashed border
  ctx.strokeStyle = themeColor;
  ctx.lineWidth = 3;
  ctx.setLineDash([6, 6]);
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
  ctx.setLineDash([]);

  // Corner florets
  const drawCornerFloret = (x, y) => {
    ctx.save();
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 2.5;
    for (let a = 0; a < 8; a++) {
      const angle = (a * Math.PI) / 4;
      const x1 = x + Math.cos(angle) * 6;
      const y1 = y + Math.sin(angle) * 6;
      const x2 = x + Math.cos(angle) * 16;
      const y2 = y + Math.sin(angle) * 16;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.restore();
  };

  drawCornerFloret(70, 70);
  drawCornerFloret(canvas.width - 70, 70);
  drawCornerFloret(70, canvas.height - 70);
  drawCornerFloret(canvas.width - 70, canvas.height - 70);
  drawCornerFloret(canvas.width / 2, 70);
  drawCornerFloret(canvas.width / 2, 1240);

  // 3. Top Decorative Bunting Garland
  const flagCount = 14;
  const garlandLeft = 80;
  const garlandRight = canvas.width - 80;
  const flagWidth = (garlandRight - garlandLeft) / flagCount;
  const flagY = 150;
  const flagHeight = 44;

  ctx.strokeStyle = themeColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(garlandLeft, flagY);
  ctx.lineTo(garlandRight, flagY);
  ctx.stroke();

  for (let i = 0; i < flagCount; i++) {
    const fx = garlandLeft + i * flagWidth;
    const isOdd = i % 2 === 1;
    ctx.fillStyle = isOdd ? '#E69C24' : themeColor;
    ctx.beginPath();
    ctx.moveTo(fx, flagY);
    ctx.lineTo(fx + flagWidth, flagY);
    ctx.lineTo(fx + flagWidth / 2, flagY + flagHeight);
    ctx.closePath();
    ctx.fill();
  }

  // 4. Header Titles
  ctx.fillStyle = '#8E1B3A';
  ctx.font = 'bold 54px "Noto Sans Bengali", "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Aunty Bingo', 100, 245);

  ctx.fillStyle = themeColor;
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText((occasion.badgeTextEn || 'EID REUNION').toUpperCase(), 100, 285);

  // Language pill tag
  ctx.fillStyle = '#EFE5D5';
  ctx.beginPath();
  ctx.roundRect(100, 305, 180, 32, 16);
  ctx.fill();
  ctx.fillStyle = '#6E554D';
  ctx.font = '600 16px "Noto Sans Bengali", "Plus Jakarta Sans", sans-serif';
  ctx.fillText(lang === 'bn' ? 'BN UI • বাংলা টেক্সট' : 'EN UI • English Text', 115, 327);

  // 5. Tilted BINGO Banner
  ctx.save();
  ctx.translate(100, 360);
  ctx.rotate((-2.5 * Math.PI) / 180);
  ctx.fillStyle = '#8E1B3A';
  ctx.beginPath();
  ctx.roundRect(0, 0, 480, 84, 14);
  ctx.fill();
  ctx.strokeStyle = '#2B1B17';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 52px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '4px';
  ctx.textAlign = 'center';
  ctx.fillText('BINGO!', 240, 60);
  ctx.restore();

  // 6. Mascot Image with clearly visible hands
  if (mascotImg) {
    ctx.drawImage(mascotImg, canvas.width - 340, 200, 240, 240);
  }

  // 7. Grid (3x3 or 5x5)
  const gridX = 100;
  const gridY = 480;
  const gridWidth = canvas.width - 200; // 880px
  const gridHeight = 520;
  const numRows = gridSize;
  const numCols = gridSize;
  const gap = gridSize === 5 ? 8 : 14;
  const colWidth = (gridWidth - (numCols - 1) * gap) / numCols;
  const rowHeight = (gridHeight - (numRows - 1) * gap) / numRows;

  const winningIndices = new Set();
  winningLines.forEach(l => l.indices.forEach(idx => winningIndices.add(idx)));

  board.forEach((tile, index) => {
    const row = Math.floor(index / numCols);
    const col = index % numCols;
    const tx = gridX + col * (colWidth + gap);
    const ty = gridY + row * (rowHeight + gap);

    const isMarked = markedSet.has(index);
    const isWinning = winningIndices.has(index);
    const isFree = tile.isFree;

    // Tile Background
    ctx.beginPath();
    ctx.roundRect(tx, ty, colWidth, rowHeight, gridSize === 5 ? 12 : 18);
    ctx.fillStyle = isFree ? '#FFF9E6' : isWinning ? '#E2EEE1' : isMarked ? '#FBE9DF' : '#FFFFFF';
    ctx.fill();

    // Tile Border
    ctx.strokeStyle = isFree ? '#E69C24' : isWinning ? '#0F7B5F' : '#8E1B3A';
    ctx.lineWidth = isWinning ? 3.5 : 2;
    ctx.stroke();

    // Checkmark stamp badge
    if (isMarked && !isFree) {
      const stampRadius = gridSize === 5 ? 11 : 16;
      const stampX = tx + colWidth - (gridSize === 5 ? 20 : 32);
      const stampY = ty + (gridSize === 5 ? 18 : 30);
      const stampColor = isWinning ? '#0F7B5F' : '#CB3C3B';

      ctx.save();
      ctx.strokeStyle = stampColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(stampX, stampY, stampRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(stampX - stampRadius * 0.45, stampY);
      ctx.lineTo(stampX - stampRadius * 0.1, stampY + stampRadius * 0.35);
      ctx.lineTo(stampX + stampRadius * 0.45, stampY - stampRadius * 0.4);
      ctx.stroke();
      ctx.restore();
    }

    // Tile text
    ctx.save();
    ctx.fillStyle = isFree ? '#B84B12' : '#2B1B17';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = isFree
      ? 'bold 20px "Plus Jakarta Sans", sans-serif'
      : gridSize === 5
      ? 'bold 15px "Noto Sans Bengali", "Plus Jakarta Sans", sans-serif'
      : 'bold 24px "Noto Sans Bengali", "Plus Jakarta Sans", sans-serif';

    const text = isFree ? (lang === 'bn' ? tile.bn : tile.en) : ((lang === 'bn' ? tile.bn : tile.en) || tile.bn);
    const lines = wrapText(ctx, text, colWidth - (gridSize === 5 ? 16 : 36));
    const lineHeight = gridSize === 5 ? 19 : 32;
    const startY = ty + rowHeight / 2 - ((lines.length - 1) * lineHeight) / 2;

    lines.forEach((line, lIdx) => {
      ctx.fillText(line, tx + colWidth / 2, startY + lIdx * lineHeight);
    });
    ctx.restore();
  });

  // Draw Strikethrough for Completed Winning Lines
  winningLines.forEach(line => {
    ctx.save();
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';

    if (line.type === 'row') {
      const cy = gridY + line.index * (rowHeight + gap) + rowHeight / 2;
      ctx.beginPath();
      ctx.moveTo(gridX + 15, cy);
      ctx.lineTo(gridX + gridWidth - 15, cy);
      ctx.stroke();
    } else if (line.type === 'col') {
      const cx = gridX + line.index * (colWidth + gap) + colWidth / 2;
      ctx.beginPath();
      ctx.moveTo(cx, gridY + 15);
      ctx.lineTo(cx, gridY + gridHeight - 15);
      ctx.stroke();
    } else if (line.type === 'diag' && line.index === 0) {
      ctx.beginPath();
      ctx.moveTo(gridX + 25, gridY + 25);
      ctx.lineTo(gridX + gridWidth - 25, gridY + gridHeight - 25);
      ctx.stroke();
    } else if (line.type === 'diag' && line.index === 1) {
      ctx.beginPath();
      ctx.moveTo(gridX + gridWidth - 25, gridY + 25);
      ctx.lineTo(gridX + 25, gridY + gridHeight - 25);
      ctx.stroke();
    }
    ctx.restore();
  });

  // 8. Bottom Status Pill
  const pillY = 1040;
  ctx.fillStyle = themeColor;
  ctx.beginPath();
  ctx.roundRect(100, pillY, gridWidth, 54, 27);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(
    lang === 'bn' ? `বিঙ্গো হয়েছে ${elapsedTime} মিনিটে` : `Got BINGO in ${elapsedTime}`,
    130,
    pillY + 34
  );

  ctx.textAlign = 'right';
  ctx.fillText(`at ${winTimeOfDay}`, 100 + gridWidth - 30, pillY + 34);

  // 9. Sub-footer
  ctx.fillStyle = '#8E1B3A';
  ctx.font = 'bold 20px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('আত্মীয়তার এক আস্বাদ', 100, 1140);

  ctx.fillStyle = '#6E554D';
  ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('auntybingo.example', 100 + gridWidth, 1140);

  ctx.fillStyle = '#9C887E';
  ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.textAlign = 'center';
  ctx.fillText(
    'AUNTY BINGO / THE FAMILY-FUNCTION SURVIVAL GAME',
    canvas.width / 2,
    1285
  );

  return canvas;
}
