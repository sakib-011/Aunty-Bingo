/**
 * Social Sharing and Clipboard Utilities for Aunty Bingo
 * Provides native Web Share API with image file sharing on mobile web,
 * automatic PNG download + direct clipboard image copy on desktop web.
 */

export function toBengaliDigits(str) {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(str).split('').map((c) => bnDigits[c] || c).join('');
}

export function getShareDetails(lang, elapsedTime = '01:30') {
  const url = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://aunty-bingo.example';
  const displayTime = lang === 'bn' ? toBengaliDigits(elapsedTime) : elapsedTime;

  const text = lang === 'bn'
    ? `আন্টি বিঙ্গো! আমি মাত্র ${displayTime} মিনিটে আন্টির সব জেরার মুখে বিঙ্গো পেয়েছি! আপনিও টিকে থাকতে পারবেন তো? খেলুন:`
    : `Aunty Bingo! I survived the family interrogation in ${displayTime}! Can you handle Aunty? Play here:`;

  return { url, text, displayTime };
}

/**
 * Helper to convert dataUrl to Blob
 */
async function dataUrlToBlob(dataUrl) {
  if (!dataUrl) return null;
  try {
    const res = await fetch(dataUrl);
    return await res.blob();
  } catch (err) {
    console.warn('Failed to convert dataUrl to blob', err);
    return null;
  }
}

/**
 * Check if Web Share API with file sharing is supported
 */
function canShareFiles(file) {
  if (!navigator.share) return false;
  if (file && navigator.canShare) {
    try {
      return navigator.canShare({ files: [file] });
    } catch {
      return false;
    }
  }
  return true;
}

export async function shareToSocial(platform, { lang, elapsedTime, dataUrl, onToast }) {
  const { url, text } = getShareDetails(lang, elapsedTime);
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  switch (platform) {
    case 'facebook': {
      let blob = null;
      if (dataUrl) {
        blob = await dataUrlToBlob(dataUrl);
      }

      // 1. Mobile Web with native Web Share API file attachment
      if (isMobile && blob && navigator.share) {
        const shareFile = new File([blob], 'aunty-bingo-card.png', { type: 'image/png' });
        if (canShareFiles(shareFile)) {
          try {
            await navigator.share({
              title: 'Aunty Bingo Card',
              text: `${text}\n${url}`,
              files: [shareFile]
            });
            if (onToast) {
              onToast(lang === 'bn' ? 'ফেসবুকে শেয়ার হচ্ছে...' : 'Sharing to Facebook...');
            }
            return;
          } catch (err) {
            if (err.name === 'AbortError') return;
            console.warn('Mobile native share failed, falling back to desktop/download flow:', err);
          }
        }
      }

      // 2. Desktop Web (and mobile fallback)
      // Step A: Trigger immediate card download so user has the high-res file
      if (dataUrl) {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `aunty-bingo-card-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      // Step B: Copy image directly to clipboard so user can press Ctrl + V on Facebook!
      let copiedToClipboard = false;
      if (blob && navigator.clipboard && window.ClipboardItem && navigator.clipboard.write) {
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          copiedToClipboard = true;
        } catch (clipErr) {
          console.warn('Clipboard image copy not supported, trying text copy:', clipErr);
        }
      }

      if (!copiedToClipboard) {
        try {
          await navigator.clipboard.writeText(`${text}\n${url}`);
        } catch {
          // ignore
        }
      }

      // Step C: Inform user with clear instruction toast
      if (onToast) {
        if (copiedToClipboard) {
          onToast(
            lang === 'bn'
              ? 'কার্ড ডাউনলোড হয়েছে ও কপি হয়েছে! ফেসবুকে গিয়ে শুধু Ctrl+V চেপে পেস্ট করুন।'
              : 'Card downloaded & copied! Just press Ctrl+V in Facebook to paste your image.'
          );
        } else {
          onToast(
            lang === 'bn'
              ? 'কার্ড ডাউনলোড হয়েছে! ফেসবুকে ফটো হিসেবে আপলোড করুন।'
              : 'Card downloaded! Upload as photo in Facebook.'
          );
        }
      }

      // Step D: Open Facebook in a new tab/window
      setTimeout(() => {
        window.open('https://www.facebook.com/', '_blank', 'noopener,noreferrer');
      }, 700);
      return;
    }

    case 'whatsapp': {
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text}\n${url}`)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      if (onToast) {
        onToast(lang === 'bn' ? 'হোয়াটসঅ্যাপ ওপেন হচ্ছে...' : 'Opening WhatsApp...');
      }
      return;
    }

    case 'messenger': {
      if (isMobile) {
        window.location.href = `fb-messenger://share/?link=${encodeURIComponent(url)}`;
      } else {
        const messengerUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(url)}`;
        window.open(messengerUrl, '_blank', 'width=600,height=500,noopener,noreferrer');
      }
      if (onToast) {
        onToast(lang === 'bn' ? 'মেসেঞ্জার শেয়ার ওপেন হচ্ছে...' : 'Opening Messenger...');
      }
      return;
    }

    case 'instagram': {
      if (dataUrl && navigator.share) {
        try {
          const blob = await dataUrlToBlob(dataUrl);
          if (blob) {
            const file = new File([blob], 'aunty-bingo-victory.png', { type: 'image/png' });
            if (canShareFiles(file)) {
              await navigator.share({
                title: 'Aunty Bingo',
                text,
                files: [file]
              });
              return;
            }
          }
        } catch (err) {
          if (err.name === 'AbortError') return;
        }
      }

      if (dataUrl) {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `aunty-bingo-card-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
      } catch {
        // Ignore clipboard error
      }

      if (onToast) {
        onToast(
          lang === 'bn'
            ? 'কার্ড ডাউনলোড হয়েছে এবং ক্যাপশন কপি হয়েছে! ইনস্টাগ্রামে পোস্ট করুন।'
            : 'Card downloaded & caption copied! Ready to post on Instagram.'
        );
      }
      return;
    }

    case 'copy': {
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        if (onToast) {
          onToast(lang === 'bn' ? 'লিংক এবং বার্তা কপি হয়েছে!' : 'Link & text copied!');
        }
      } catch {
        if (onToast) {
          onToast(lang === 'bn' ? 'কপি করা যায়নি' : 'Failed to copy');
        }
      }
      return;
    }

    case 'native':
    default: {
      if (navigator.share) {
        try {
          if (dataUrl) {
            const blob = await dataUrlToBlob(dataUrl);
            if (blob) {
              const file = new File([blob], 'aunty-bingo.png', { type: 'image/png' });
              if (canShareFiles(file)) {
                await navigator.share({ title: 'Aunty Bingo', text, files: [file] });
                return;
              }
            }
          }
          await navigator.share({ title: 'Aunty Bingo', text, url });
          return;
        } catch (err) {
          if (err.name === 'AbortError') return;
        }
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      if (onToast) {
        onToast(lang === 'bn' ? 'লিংক কপি হয়েছে!' : 'Link copied!');
      }
    }
  }
}
