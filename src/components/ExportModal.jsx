import React, { useState, useEffect } from 'react';
import { X, Download, Share2, Loader2, Copy, Check } from 'lucide-react';
import { InstagramIcon, FacebookIcon, MessengerIcon, WhatsAppIcon } from './SocialIcons';
import { generateCardCanvas } from '../utils/canvasExport';
import { shareToSocial } from '../utils/share';

export default function ExportModal({
  isOpen,
  onClose,
  board,
  markedIndices,
  winningLines,
  occasionId,
  lang,
  elapsedTime,
  winTimeOfDay,
  gridSize = 3
}) {
  const [dataUrl, setDataUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isCancelled = false;
    generateCardCanvas({
      board,
      markedIndices,
      winningLines,
      occasionId,
      lang,
      elapsedTime,
      winTimeOfDay,
      gridSize
    }).then((canvas) => {
      if (!isCancelled) {
        setDataUrl(canvas.toDataURL('image/png'));
        setIsGenerating(false);
      }
    }).catch((err) => {
      console.error('Failed to generate canvas:', err);
      if (!isCancelled) {
        setIsGenerating(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [isOpen, board, markedIndices, winningLines, occasionId, lang, elapsedTime, winTimeOfDay, gridSize]);

  if (!isOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `aunty-bingo-${occasionId}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSocialClick = async (platform) => {
    if (platform === 'copy') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    await shareToSocial(platform, {
      lang,
      elapsedTime,
      dataUrl,
      onToast: showToast
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#D8C6B6] p-4 sm:p-5 max-h-[95vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F4E8D9] text-[#8E1B3A] flex items-center justify-center hover:bg-[#EBDDCB] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div className="mb-3 pr-8">
          <h2 className="text-xl sm:text-2xl font-black text-[#8E1B3A]">
            {lang === 'bn' ? 'আপনার বিঙ্গো কার্ড' : 'Your Bingo Card'}
          </h2>
          <p className="text-xs font-semibold text-[#6E554D]">
            {lang === 'bn' ? 'সোশ্যাল মিডিয়ায় শেয়ার করার জন্য প্রস্তুত' : 'Ready to share with friends and family'}
          </p>
        </div>

        {/* Card Preview Container */}
        <div className="relative aspect-[4/5] w-full max-w-[280px] sm:max-w-[320px] mx-auto bg-[#FFF6E5] rounded-2xl overflow-hidden shadow-inner border border-[#D8C6B6] flex items-center justify-center mb-4">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-2 text-[#8E1B3A]">
              <Loader2 size={32} className="animate-spin" />
              <span className="text-xs font-bold">
                {lang === 'bn' ? 'কার্ড তৈরি হচ্ছে...' : 'Generating card...'}
              </span>
            </div>
          ) : dataUrl ? (
            <img
              src={dataUrl}
              alt="Generated Aunty Bingo Card"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-xs text-red-500 font-bold">
              {lang === 'bn' ? 'কার্ড লোড করা যায়নি' : 'Failed to generate card'}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {/* Share Button (Native Web Share) */}
          <button
            onClick={() => handleSocialClick('native')}
            disabled={isGenerating || !dataUrl}
            className="w-full py-3 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
          >
            <Share2 size={18} />
            <span>{lang === 'bn' ? 'দ্রুত শেয়ার' : 'Quick Share'}</span>
          </button>

          {/* Download PNG Button */}
          <button
            onClick={handleDownload}
            disabled={isGenerating || !dataUrl}
            className="w-full py-2.5 rounded-full border-2 border-[#8E1B3A] text-[#8E1B3A] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#8E1B3A]/5 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
          >
            <Download size={18} />
            <span>{lang === 'bn' ? 'ডাউনলোড পিএনজি (1080×1350)' : 'Download PNG (1080×1350)'}</span>
          </button>

          {/* Social Platform Share Icons */}
          <div className="mt-1 pt-2 border-t border-[#E8DCD0]">
            <p className="text-[11px] font-bold text-center text-[#6E554D] mb-2">
              {lang === 'bn' ? 'সোশ্যাল মিডিয়ায় এক-ক্লিকে শেয়ার করুন:' : 'Share directly to platforms:'}
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              <button
                onClick={() => handleSocialClick('instagram')}
                className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#F4E8D9]/70 hover:bg-[#F4E8D9] border border-[#D8C6B6]/60 transition-colors cursor-pointer"
                title="Instagram Stories / Feed"
              >
                <InstagramIcon size={18} className="text-[#8E1B3A]" />
                <span className="text-[10px] font-bold text-[#6E554D] mt-1">Stories</span>
              </button>
              <button
                onClick={() => handleSocialClick('facebook')}
                className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#F4E8D9]/70 hover:bg-[#F4E8D9] border border-[#D8C6B6]/60 transition-colors cursor-pointer"
                title="Facebook"
              >
                <FacebookIcon size={18} className="text-[#1877F2]" />
                <span className="text-[10px] font-bold text-[#6E554D] mt-1">Facebook</span>
              </button>
              <button
                onClick={() => handleSocialClick('whatsapp')}
                className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#F4E8D9]/70 hover:bg-[#F4E8D9] border border-[#D8C6B6]/60 transition-colors cursor-pointer"
                title="WhatsApp"
              >
                <WhatsAppIcon size={18} className="text-[#25D366]" />
                <span className="text-[10px] font-bold text-[#6E554D] mt-1">WhatsApp</span>
              </button>
              <button
                onClick={() => handleSocialClick('messenger')}
                className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#F4E8D9]/70 hover:bg-[#F4E8D9] border border-[#D8C6B6]/60 transition-colors cursor-pointer"
                title="Messenger"
              >
                <MessengerIcon size={18} className="text-[#0084FF]" />
                <span className="text-[10px] font-bold text-[#6E554D] mt-1">Messenger</span>
              </button>
              <button
                onClick={() => handleSocialClick('copy')}
                className="flex flex-col items-center py-2 px-1 rounded-xl bg-[#F4E8D9]/70 hover:bg-[#F4E8D9] border border-[#D8C6B6]/60 transition-colors cursor-pointer"
                title="Copy Link"
              >
                {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} className="text-[#6E554D]" />}
                <span className="text-[10px] font-bold text-[#6E554D] mt-1">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Toast Message */}
          {toastMessage && (
            <div className="bg-[#2B1B17] text-white text-xs font-semibold px-4 py-2.5 rounded-2xl text-center shadow-lg animate-in slide-in-from-bottom-2 duration-150">
              {toastMessage}
            </div>
          )}

          <p className="text-[11px] text-[#8A7268] text-center font-medium mt-0.5">
            {lang === 'bn' ? 'কোনো লগইন বা সাইন-আপের প্রয়োজন নেই • ১০০% ব্যক্তিগত' : 'No sign-up needed • 100% private'}
          </p>
        </div>
      </div>
    </div>
  );
}
