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
  let url = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://aunty-bingo.vercel.app';
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    url = 'https://aunty-bingo.vercel.app';
  }
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
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
      } catch {
        // ignore
      }

      // Open official Facebook Post sharing dialog with Aunty Bingo link and quote
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
      window.open(fbUrl, '_blank', 'width=650,height=550,noopener,noreferrer');

      if (onToast) {
        onToast(lang === 'bn' ? 'ফেসবুক পোস্ট ডায়ালগ ওপেন হচ্ছে...' : 'Opening Facebook share dialog...');
      }
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
