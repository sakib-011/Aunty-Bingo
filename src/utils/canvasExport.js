/**
 * High-Resolution (1080x1350) HTML5 Canvas Card Exporter
 * Generates branded, social-ready PNG cards with character reactions and prominent player identification.
 */

import mascotCelebratingUrl from '../assets/mascots/aunty_avatar_perfect.png';
import mascotAngryUrl from '../assets/mascots/aunty_3d_interrogation.png';
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
  board = [],
  markedIndices = [],
  winningLines = [],
  occasionId = 'eid',
  lang = 'bn',
  elapsedTime = '01:48',
  winTimeOfDay = '4:32 PM',
  gridSize = 3,
  playerName = '',
  hasBingo
}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  const occasion = OCCASIONS[occasionId] || OCCASIONS.eid;
  const themeColor = occasion.tagColor || '#0F7B5F';
  const markedSet = new Set(markedIndices || []);

  const isBingo = typeof hasBingo === 'boolean'
    ? hasBingo
    : Boolean(winningLines && winningLines.length > 0);

  // Load avatar: laughing for Bingo victory, angry for Non-Bingo survival
  const mascotSrc = isBingo ? mascotCelebratingUrl : mascotAngryUrl;
  const mascotImg = await loadImage(mascotSrc);

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
  ctx.font = 'bold 50px "Noto Sans Bengali", "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Aunty Bingo', 100, 238);

  // Sub-row: Occasion badge & Language pill
  const occasionText = (occasion.badgeTextEn || 'EID REUNION').toUpperCase();
  ctx.fillStyle = themeColor;
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText(occasionText, 100, 274);
  const occMetrics = ctx.measureText(occasionText);

  // Language pill tag (positioned cleanly after occasion badge)
  const langPillX = Math.min(100 + occMetrics.width + 18, 480);
  const langText = lang === 'bn' ? 'BN UI • বাংলা' : 'EN UI • English';
  ctx.font = '600 13px "Noto Sans Bengali", "Plus Jakarta Sans", sans-serif';
  const langTextMetrics = ctx.measureText(langText);
  const langPillW = langTextMetrics.width + 24;

  ctx.fillStyle = '#EFE5D5';
  ctx.beginPath();
  ctx.roundRect(langPillX, 256, langPillW, 26, 13);
  ctx.fill();

  ctx.fillStyle = '#6E554D';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(langText, langPillX + 12, 270);

  // Prominent Player Name Badge / Pill (for BOTH Bingo and Non-Bingo)
  const hasPlayer = Boolean(playerName && playerName.trim());
  const pName = hasPlayer ? playerName.trim() : '';

  if (hasPlayer) {
    ctx.save();
    const pillX = 100;
    const pillY = 296;
    const pillH = 52;
    const maxPillW = 590; // safely leaves buffer before mascot at X=740
    const minPillW = 240;

    ctx.font = 'bold 26px "Noto Sans Bengali", "Plus Jakarta Sans", sans-serif';

    // Ellipsize player name if necessary so it never overflows
    let displayName = pName;
    const maxTextWidth = maxPillW - 76;
    if (ctx.measureText(displayName).width > maxTextWidth) {
      while (displayName.length > 0 && ctx.measureText(displayName + '…').width > maxTextWidth) {
        displayName = displayName.slice(0, -1);
      }
      displayName = displayName + '…';
    }

    const textWidth = ctx.measureText(displayName).width;
    const pillW = Math.min(Math.max(textWidth + 76, minPillW), maxPillW);

    // Pill drop shadow
    ctx.shadowColor = 'rgba(43, 27, 23, 0.18)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;

    // Pill background: rich high-contrast brand maroon
    ctx.fillStyle = '#8E1B3A';
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, pillH / 2);
    ctx.fill();

    // Reset shadow for crisp borders
    ctx.shadowColor = 'transparent';

    // Golden decorative border
    ctx.strokeStyle = '#F5C242';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Circular avatar icon badge on left
    const iconX = pillX + 27;
    const iconY = pillY + pillH / 2;
    ctx.fillStyle = '#F5C242';
    ctx.beginPath();
    ctx.arc(iconX, iconY, 16, 0, Math.PI * 2);
    ctx.fill();

    // User silhouette inside avatar badge
    ctx.fillStyle = '#8E1B3A';
    // Head
    ctx.beginPath();
    ctx.arc(iconX, iconY - 4, 5, 0, Math.PI * 2);
    ctx.fill();
    // Shoulder contour
    ctx.beginPath();
    ctx.arc(iconX, iconY + 11, 9, Math.PI * 1.15, Math.PI * 1.85);
    ctx.fill();

    // Player name text (prominent 26px bold white)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px "Noto Sans Bengali", "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(displayName, pillX + 54, iconY);

    ctx.restore();
  }

  // 5. Result Banner: Tilted BINGO Celebration or Survival Banner
  const bannerY = hasPlayer ? 366 : 344;

  if (isBingo) {
    // Tilted BINGO Celebration Banner
    ctx.save();
    ctx.translate(100, bannerY);
    ctx.rotate((-2.5 * Math.PI) / 180);

    // Banner Shadow
    ctx.shadowColor = 'rgba(43, 27, 23, 0.22)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = '#8E1B3A';
    ctx.beginPath();
    ctx.roundRect(0, 0, 480, 84, 14);
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#2B1B17';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Golden accent inner border
    ctx.strokeStyle = '#F5C242';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(6, 6, 468, 72, 10);
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 52px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BINGO!', 240, 44);
    ctx.restore();
  } else {
    // Distinct Survival Banner communicating relief and survival
    ctx.save();
    ctx.translate(100, bannerY);

    // Banner Shadow
    ctx.shadowColor = 'rgba(15, 123, 95, 0.25)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    // Deep survivor green background
    ctx.fillStyle = '#0F7B5F';
    ctx.beginPath();
    ctx.roundRect(0, 0, 540, 84, 14);
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#083E30';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Golden accent inner border
    ctx.strokeStyle = '#F5C242';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(6, 6, 528, 72, 10);
    ctx.stroke();

    // Protective Shield / Survival Emblem on left
    const shieldX = 44;
    const shieldY = 42;
    ctx.fillStyle = '#F5C242';
    ctx.beginPath();
    ctx.arc(shieldX, shieldY, 20, 0, Math.PI * 2);
    ctx.fill();

    // Shield shape inside
    ctx.fillStyle = '#0F7B5F';
    ctx.beginPath();
    ctx.moveTo(shieldX - 9, shieldY - 9);
    ctx.lineTo(shieldX + 9, shieldY - 9);
    ctx.lineTo(shieldX + 9, shieldY);
    ctx.quadraticCurveTo(shieldX + 9, shieldY + 11, shieldX, shieldY + 13);
    ctx.quadraticCurveTo(shieldX - 9, shieldY + 11, shieldX - 9, shieldY);
    ctx.closePath();
    ctx.fill();

    // White checkmark inside shield
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(shieldX - 4, shieldY);
    ctx.lineTo(shieldX - 1, shieldY + 4);
    ctx.lineTo(shieldX + 5, shieldY - 3);
    ctx.stroke();

    // Survival text lines
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    if (lang === 'bn') {
      // Primary Bangla text: আজকের জন্য বেঁচে গেলা
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 28px "Noto Sans Bengali", "Plus Jakarta Sans", sans-serif';
      ctx.fillText('আজকের জন্য বেঁচে গেলা', 78, 30);

      // Subtitle English text: You have survived for the day
      ctx.fillStyle = '#FFE599';
      ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '1px';
      ctx.fillText('You have survived for the day', 78, 58);
    } else {
      // Primary English text: You have survived for the day
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 25px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('You have survived for the day', 78, 30);

      // Subtitle Bangla text: আজকের জন্য বেঁচে গেলা
      ctx.fillStyle = '#FFE599';
      ctx.font = 'bold 18px "Noto Sans Bengali", sans-serif';
      ctx.fillText('আজকের জন্য বেঁচে গেলা', 78, 58);
    }

    ctx.restore();
  }

  // 6. Mascot Image (laughing for Bingo, angry for Non-Bingo)
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
  if (isBingo && winningLines && winningLines.length > 0) {
    winningLines.forEach(l => l.indices.forEach(idx => winningIndices.add(idx)));
  }

  board.forEach((tile, index) => {
    const row = Math.floor(index / numCols);
    const col = index % numCols;
    const tx = gridX + col * (colWidth + gap);
    const ty = gridY + row * (rowHeight + gap);

    const isMarked = markedSet.has(index);
    const isWinning = isBingo && winningIndices.has(index);
    const isFree = Boolean(tile.isFree);

    // Tile Background
    ctx.beginPath();
    ctx.roundRect(tx, ty, colWidth, rowHeight, gridSize === 5 ? 12 : 18);
    ctx.fillStyle = isFree
      ? '#FFF9E6'
      : isWinning
      ? '#E2EEE1'
      : isMarked
      ? '#FCEAE1'
      : '#FFFFFF';
    ctx.fill();

    // Tile Border
    ctx.strokeStyle = isFree
      ? '#E69C24'
      : isWinning
      ? '#0F7B5F'
      : isMarked
      ? '#CB3C3B'
      : '#D8C6B6';
    ctx.lineWidth = isWinning ? 3.5 : isMarked ? 2.5 : 1.5;
    ctx.stroke();

    // Checkmark stamp badge for marked tiles
    if (isMarked && !isFree) {
      const stampRadius = gridSize === 5 ? 12 : 16;
      const stampX = tx + colWidth - (gridSize === 5 ? 20 : 30);
      const stampY = ty + (gridSize === 5 ? 18 : 28);
      const stampColor = isWinning ? '#0F7B5F' : '#CB3C3B';

      ctx.save();
      // Filled circle badge
      ctx.fillStyle = stampColor;
      ctx.beginPath();
      ctx.arc(stampX, stampY, stampRadius, 0, Math.PI * 2);
      ctx.fill();

      // High-contrast white checkmark
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = gridSize === 5 ? 2 : 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(stampX - stampRadius * 0.45, stampY);
      ctx.lineTo(stampX - stampRadius * 0.1, stampY + stampRadius * 0.35);
      ctx.lineTo(stampX + stampRadius * 0.45, stampY - stampRadius * 0.4);
      ctx.stroke();
      ctx.restore();
    }

    // Free space star badge
    if (isFree) {
      const starX = tx + colWidth - (gridSize === 5 ? 18 : 26);
      const starY = ty + (gridSize === 5 ? 16 : 24);
      ctx.save();
      ctx.fillStyle = '#E69C24';
      ctx.font = `${gridSize === 5 ? 14 : 18}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('★', starX, starY);
      ctx.restore();
    }

    // Tile text
    ctx.save();
    ctx.fillStyle = isFree ? '#B84B12' : isMarked ? '#2B1B17' : '#5A4842';
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

  // Draw Strikethrough for Completed Winning Lines (ONLY for Bingo victory)
  if (isBingo && winningLines && winningLines.length > 0) {
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
  }

  // 8. Bottom Status Pill
  const pillY = 1040;
  ctx.fillStyle = isBingo ? themeColor : '#0F7B5F';
  ctx.beginPath();
  ctx.roundRect(100, pillY, gridWidth, 54, 27);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "Noto Sans Bengali", "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  const statusLeft = isBingo
    ? (lang === 'bn' ? `বিঙ্গো হয়েছে ${elapsedTime} মিনিটে` : `Got BINGO in ${elapsedTime}`)
    : (lang === 'bn' ? `আজকের জন্য বেঁচে গেলা • সময়: ${elapsedTime}` : `Survived for ${elapsedTime} today`);
  ctx.fillText(statusLeft, 130, pillY + 27);

  if (winTimeOfDay) {
    ctx.textAlign = 'right';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`at ${winTimeOfDay}`, 100 + gridWidth - 30, pillY + 27);
  }

  // 9. Sub-footer
  ctx.fillStyle = '#8E1B3A';
  ctx.font = 'bold 20px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
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
