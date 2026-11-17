import React, { useState } from 'react';
import heroGatheringUrl from '../assets/images/hero-gathering.svg';
import { OCCASIONS } from '../utils/phrases';
import TaglineReveal from './TaglineReveal';
import DraggableAunty from './DraggableAunty';
import aunty3dChillUrl from '../assets/mascots/aunty_3d_chill.png';
import aunty3dSuspiciousUrl from '../assets/mascots/aunty_3d_suspicious.png';
import aunty3dInterrogationUrl from '../assets/mascots/aunty_3d_interrogation.png';
import aunty3dMeltdownUrl from '../assets/mascots/aunty_3d_meltdown.png';
import {
  SparklesIcon,
  GamepadIcon,
  QuestionIcon,
  OccasionIcon,
  CheckIcon,
  BoltIcon,
  ShieldIcon,
  CameraIcon,
  StarIcon,
  ChevronDownIcon,
  FireIcon,
  SmileIcon,
  LaughIcon,
  GaugeIcon,
  AwardIcon,
  CopyIcon
} from './FontAwesomeIcons';

export default function LandingPage({
  lang,
  activeOccasionId,
  onSelectOccasion,
  onStartPlaying,
  onOpenHowTo
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [activeComebackStyle, setActiveComebackStyle] = useState('savage');
  const [previewCopied, setPreviewCopied] = useState(false);
  const [stressPreviewLevel, setStressPreviewLevel] = useState(65);

  const sampleQuestions = [
    {
      id: 'marriage',
      labelBn: 'কবে বিয়ে করবা?',
      labelEn: 'When are you getting married?',
      categoryBn: 'বিয়ে ও সংসার',
      categoryEn: 'Marriage & Family',
      comebacks: {
        savage: {
          bn: 'আপনার ছেলের বিয়েতে তো কাউকে ডাকেননি, নিজেরটায় ভাবছি কাউকে না জানিয়েই সারবো!',
          en: 'You barely invited anyone to your son’s wedding, thinking of returning the favor!'
        },
        polite: {
          bn: 'আল্লাহ যেদিন কপালে রেখেছেন খালাম্মা, অবশ্যই ভালো খবর পাবেন। দোয়া করবেন।',
          en: 'When the time is right, you will surely be the first to know. Keep me in your prayers.'
        },
        funny: {
          bn: 'কাচ্চির বিরিয়ানির বাজেট মেলাতে পারছি না খালাম্মা, স্পন্সর করলে কালকেই ডেট দিচ্ছি!',
          en: 'Still negotiating the biryani budget. If you sponsor the caterer, I will set a date tomorrow!'
        }
      }
    },
    {
      id: 'salary',
      labelBn: 'বেতন কত পাও এখন?',
      labelEn: 'What is your salary now?',
      categoryBn: 'ক্যারিয়ার ও আয়',
      categoryEn: 'Career & Income',
      comebacks: {
        savage: {
          bn: 'যতটুকুই পাই খালাম্মা, আপনার থেকে ঋণ নেওয়ার তো দরকার পড়ছে না!',
          en: 'Just enough that I do not need to ask anyone for financial bailouts.'
        },
        polite: {
          bn: 'আলহামদুলিল্লাহ, দিনশেষে ডাল ভাত খাওয়ার মতো ব্যবস্থা আল্লাহ ভালোই রেখেছেন।',
          en: 'By grace, it covers my needs and savings comfortably. Thank you for asking.'
        },
        funny: {
          bn: 'ট্যাক্স অফিসার আর আত্মীয়দের কাছে স্যালারি ডিসক্লোজ করা কোম্পানি পলিসির বাইরে!',
          en: 'Disclosing figures to tax officers and relatives breaches my employment NDA!'
        }
      }
    },
    {
      id: 'weight',
      labelBn: 'এত শুকিয়ে গেছ কেন?',
      labelEn: 'Why did you lose so much weight?',
      categoryBn: 'স্বাস্থ্য ও চেহারা',
      categoryEn: 'Health & Appearance',
      comebacks: {
        savage: {
          bn: 'আপনার মতো সবার চিন্তায় দিনরাত গলদঘর্ম হলে তো শুকিয়ে যাওয়াই স্বাভাবিক!',
          en: 'Carrying the burden of pleasing every relative burns too many calories.'
        },
        polite: {
          bn: 'নিয়মিত ব্যায়াম আর হালকা খাবার খাচ্ছি, শরীরটা বেশ ফিট আছে।',
          en: 'I have been staying active and eating clean. Feeling very fit.'
        },
        funny: {
          bn: 'ডাক্তার বলেছে ক্যালোরি পোড়াতে, আত্মীয়দের প্রশ্ন শুনে এমনিতেই ২০০ ক্যালোরি পুড়ে যায়!',
          en: 'My doctor told me to burn calories. Dodging your questions burns 200 an hour!'
        }
      }
    }
  ];

  const showcaseBadges = [
    {
      id: 'aunty007',
      titleBn: 'আন্টি ০০৭ গোপন গোয়েন্দা লাইসেন্স',
      titleEn: 'Aunty 007 Secret Agent License',
      descBn: 'আমি কিন্তু সব জানি! পাড়ার সব রহস্য ফাঁস',
      descEn: 'Cracked every neighborhood secret with Gossip IQ 98%'
    },
    {
      id: 'wedding',
      titleBn: 'অবিবাহিত যোদ্ধা পদক',
      titleEn: 'Unmarried Crusader Medal',
      descBn: 'বিয়ের সব প্রশ্ন সাহসের সাথে প্রতিহত',
      descEn: 'Withstood every marriage inquiry'
    },
    {
      id: 'eid',
      titleBn: 'সালামি কূটনীতিক খেতাব',
      titleEn: 'Salami Diplomat Title',
      descBn: 'জেরা এড়িয়ে সালামি আদায় সম্পন্ন',
      descEn: 'Dodged interrogation and secured Eidi'
    },
    {
      id: 'exam',
      titleBn: 'বিসিএস বর্ম পদক',
      titleEn: 'Civil Service Shield',
      descBn: 'সিজিপিএ অডিটরদের সফলভাবে পরাস্ত',
      descEn: 'Conquered the family GPA inquest'
    },
    {
      id: 'general',
      titleBn: 'চা সিঙ্গাড়া চ্যাম্পিয়ন খেতাব',
      titleEn: 'Tea & Shingara Champion',
      descBn: 'পারিবারিক আড্ডায় অপ্রতিরোধ্য বিজয়ী',
      descEn: 'Undefeated in family reunion banter'
    }
  ];

  const handleCopyPreview = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setPreviewCopied(true);
      setTimeout(() => setPreviewCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const testimonials = [
    {
      name: lang === 'bn' ? 'তানভীর আহমেদ' : 'Tanvir Ahmed',
      location: lang === 'bn' ? 'ঢাকা' : 'Dhaka',
      occasion: lang === 'bn' ? 'ঈদের আড্ডা' : 'Eid Reunion',
      quote:
        lang === 'bn'
          ? 'গত ঈদে সব কাজিন মিলে খাবার টেবিলে আন্টি বিঙ্গো খেলছিলাম। আন্টিরা যখন প্রশ্ন করছিলেন আর আমরা একে একে দাগাচ্ছিলাম, সবাই একসাথে হেসে ফেলেছিলাম। পারিবারিক আড্ডা এমন মজাদার কখনো লাগেনি!'
          : 'We played this at the dinner table with all our cousins. Every time an aunt dropped a classic question, we tapped a tile. Even the elders joined in once they saw what we were doing!'
    },
    {
      name: lang === 'bn' ? 'নুসরাত জাহান' : 'Nusrat Jahan',
      location: lang === 'bn' ? 'চট্টগ্রাম' : 'Chattogram',
      occasion: lang === 'bn' ? 'বিয়ে ও দাওয়াত' : 'Wedding / Dawot',
      quote:
        lang === 'bn'
          ? 'চার ঘণ্টার লম্বা বিয়ের দাওয়াতে ঘটকালি আন্টিদের জেরা সামলানোর সেরা উপায় এটি! বিঙ্গো মেলাতেই কার্ড এক্সপোর্ট করে ইনস্টাগ্রাম স্টোরিতে দিয়েছিলাম, প্রচুর রেসপন্স পেয়েছি।'
          : 'The ultimate survival tool for a four hour wedding reception. When I got my diagonal line, I exported the card to Instagram Stories and got dozens of replies from friends who related immediately.'
    },
    {
      name: lang === 'bn' ? 'ফারহান কবির' : 'Farhan Kabir',
      location: lang === 'bn' ? 'সিলেট' : 'Sylhet',
      occasion: lang === 'bn' ? 'রেজাল্টের দিন' : 'Post-Exam Results',
      quote:
        lang === 'bn'
          ? 'পরীক্ষার রেজাল্ট বের হওয়ার পর আত্মীয়দের ফোন সামলানো সবসময় একটা ভীতিকর অভিজ্ঞতা ছিল। আন্টি বিঙ্গো সেই পুরো অস্বস্তিকর চাপটাকে একটা হাসির মুহূর্ত বানিয়ে দিয়েছে।'
          : 'Handling calls after exam results used to be stressful. Turning those predictable questions into a game completely flipped the mood. Clean, brilliant, and completely relatable.'
    }
  ];

  const faqs = [
    {
      q: lang === 'bn' ? 'খেলার জন্য কি কোনো অ্যাকাউন্ট তৈরি করতে হবে?' : 'Do I need an account or registration to play?',
      a:
        lang === 'bn'
          ? 'না, কোনো অ্যাকাউন্ট বা সাইন আপের প্রয়োজন নেই। ব্রাউজার খুললেই তৎক্ষণাৎ খেলা শুরু করা যায় এবং এটি ১০০% বিনামূল্যে।'
          : 'No. There is zero sign up, no login, and no email required. Open your browser and play immediately for free.'
    },
    {
      q: lang === 'bn' ? 'আমার তথ্য বা কার্যকলাপ কি কোথাও সংরক্ষণ করা হয়?' : 'Is my data or game activity stored on any server?',
      a:
        lang === 'bn'
          ? 'না। আন্টি বিঙ্গো সম্পূর্ণ ক্লায়েন্ট সাইড আর্কিটেকচারে চলে। আপনার দাগানো কার্ড, সময় বা কোনো ডেটাই সার্ভারে যায় না, সবকিছু আপনার ডিভাইসেই থাকে।'
          : 'Never. The application runs 100% inside your browser. No personal data, tracking cookies, or activity logs are collected or transmitted.'
    },
    {
      q: lang === 'bn' ? '৩×৩ এবং ৫×৫ মোডের মধ্যে পার্থক্য কী?' : 'What is the difference between 3x3 and 5x5 modes?',
      a:
        lang === 'bn'
          ? '৩×৩ মোড হলো কুইক ম্যাচ, যেখানে ৯টি ঘর থাকে এবং ৮টি লাইনে জয় সম্ভব। ৫×৫ ক্লাসিক মোডে থাকে ২৫টি ঘর এবং মাঝখানে একটি স্থায়ী ফ্রি ঘর (Family Immunity), যেখানে ১২টি উপায়ে বিঙ্গো মেলানো যায়।'
          : '3x3 Quick Match features 9 tiles with 8 winning lines for quick party rounds. 5x5 Classic features 25 tiles with a center Free Tile and 12 winning lines for deeper gameplay.'
    },
    {
      q: lang === 'bn' ? 'ভুল করে কোনো কার্ডে ক্লিক করলে কি দাগ মোছা যায়?' : 'Can I undo an accidental mark on a card?',
      a:
        lang === 'bn'
          ? 'হ্যাঁ। ভুল করে কোনো কার্ড দাগিয়ে ফেললে সেই কার্ডে ডাবল ক্লিক বা দ্রুত দুইবার ট্যাপ করলেই কার্ডটি তৎক্ষণাৎ আনমার্ক হয়ে যাবে।'
          : 'Yes. Double click on desktop or double tap on mobile instantly unmarks any tile back to its original state.'
    },
    {
      q: lang === 'bn' ? 'কার্ডের লেখা বড় হলে সম্পূর্ণ প্রশ্ন কীভাবে পড়ব?' : 'How do I read long question text on small screens?',
      a:
        lang === 'bn'
          ? 'প্রতিটি কার্ডের নিচে ডান কোণায় একটি ছোট (i) ইনফো আইকন রয়েছে। সেখানে ক্লিক করলেই সম্পূর্ণ প্রশ্ন বাংলা ও ইংরেজিতে বড় আকারে একটি মডালে দেখতে পাবেন।'
          : 'Click the small info icon in the corner of any tile to view the full question in both Bengali and English inside a clear dialog.'
    },
    {
      q: lang === 'bn' ? 'বিঙ্গো হওয়ার পর কীভাবে বন্ধুদের সাথে শেয়ার করব?' : 'How do I export and share my card after winning?',
      a:
        lang === 'bn'
          ? 'বিঙ্গো হলেই ভিক্টরি কার্ড পপআপে ইনস্টাগ্রাম, ফেসবুক, হোয়াটসঅ্যাপ বা মেসেঞ্জারে এক ক্লিকে শেয়ার করার বোতাম রয়েছে। এছাড়া হাই রেজ্যুলেশন ১০৮০×১৩৫০ সাইজের পিএনজি কার্ড ডাউনলোড করা যায়।'
          : 'Upon hitting BINGO, the victory dialog provides one click sharing to Instagram Stories, WhatsApp, Facebook, and Messenger, along with a high resolution 1080x1350 PNG download.'
    },
    {
      q: lang === 'bn' ? 'সবগুলো প্রশ্ন কি বাঙালি সংস্কৃতির জন্য সত্য?' : 'Are all phrases tailored to authentic Bengali gatherings?',
      a:
        lang === 'bn'
          ? 'হ্যাঁ। আমাদের প্রশ্নভাণ্ডারে রয়েছে ১৭৪টিরও বেশি খাঁটি বাঙালি ডায়ালগ যা ঈদ, বিয়ে, রেজাল্ট, আন্টি ০০৭ এবং পারিবারিক আড্ডায় আত্মীয়দের মুখ থেকে প্রায়শই শোনা যায়।'
          : 'Yes. Our database contains over 174 authentic phrases curated specifically around common cultural tropes heard at Bengali family events.'
    },
    {
      q: lang === 'bn' ? 'আন্টির মোক্ষম জবাব ফিচারটি কীভাবে কাজ করে?' : 'How does the Savage Comebacks feature work?',
      a:
        lang === 'bn'
          ? 'খেলার সময় প্রতিটি ঘরের কোণায় থাকা কমেন্ট আইকনে ক্লিক করলেই সেই প্রশ্নের বিপরীতে ৩ ধরনের জবাব (ভদ্র, মোক্ষম ও মজার) পাওয়া যায়। সেখান থেকে ১ ক্লিকে কপি করে সামাজিক যোগাযোগমাধ্যম বা সরাসরি আড্ডায় ব্যবহার করতে পারেন।'
          : 'Click the message icon on any tile during gameplay to open three curated counter responses (Polite, Savage, and Funny) with one click clipboard copy.'
    },
    {
      q: lang === 'bn' ? 'লাইভ স্ট্রেস মিটার ও পারিবারিক পদক কীভাবে অর্জন করা যায়?' : 'How do the live stress meter and survivor badges work?',
      a:
        lang === 'bn'
          ? 'বোর্ডে দাগ পড়ার সাথে সাথে স্ট্রেস মিটার আন্টির জেরা লেভেল ট্র্যাক করে। বিঙ্গো পূর্ণ হলে আপনার অনুষ্ঠানের ধরন অনুযায়ী বিশেষ পারিবারিক পদক আনলক হবে যা কার্ড এক্সপোর্টে যুক্ত থাকে।'
          : 'The stress meter updates live as you mark tiles, transitioning across four mood tiers. Hitting BINGO unlocks an event specific survivor medal integrated into your export card.'
    },
    {
      q: lang === 'bn' ? 'অফলাইনে বা দুর্বল ইন্টারনেটে কি এটি খেলা সম্ভব?' : 'Does the game work offline or with slow connectivity?',
      a:
        lang === 'bn'
          ? 'হ্যাঁ। পেজটি একবার লোড হওয়ার পর কোনো নেটওয়ার্ক রিকোয়েস্টের প্রয়োজন হয় না। তাই দুর্বল নেটওয়ার্কেও কোনো বিরতি ছাড়াই খেলা চলে।'
          : 'Yes. Once loaded, the game requires no external API requests, making it fully playable even in venues with weak connectivity.'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-14 sm:gap-20">
      
      {/* 1. HERO SECTION (Above the fold per A2 & B5) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-2 sm:pt-4">
        {/* Left Column: Heading, Subhead, CTA, Proof Signal */}
        <div className="flex flex-col items-start text-left max-w-[680px]">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F4E8D9] border border-[#D8C6B6] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#8E1B3A] mb-4 shadow-xs">
            <SparklesIcon className="text-amber-600 text-xs" />
            <span>
              {lang === 'bn'
                ? 'আত্মীয়দের অপ্রস্তুত প্রশ্ন সামলানোর মজার বিঙ্গো'
                : 'Survive awkward family interrogations with a party game'}
            </span>
          </div>

          {/* Heading with approved text gradient per B5 and meaningful line breaks */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-balance max-w-[680px]">
            {lang === 'bn' ? (
              <>
                <span className="text-[#8E1B3A]">পারিবারিক আড্ডায়</span> <br />
                <span className="bg-gradient-to-r from-[#2B1B17] via-[#8E1B3A] to-[#6E554D] bg-clip-text text-transparent">
                  আন্টির প্রশ্নের বিঙ্গো
                </span>
              </>
            ) : (
              <>
                <span className="text-[#8E1B3A]">Survive the Family</span> <br />
                <span className="bg-gradient-to-r from-[#2B1B17] via-[#8E1B3A] to-[#6E554D] bg-clip-text text-transparent">
                  Aunty Interrogation
                </span>
              </>
            )}
          </h1>

          {/* Subheadline (Max width 680px, clarifies how per A2) */}
          <p className="text-sm sm:text-base text-[#6E554D] mt-3 sm:mt-4 font-normal leading-relaxed text-pretty max-w-[600px]">
            {lang === 'bn'
              ? 'বিয়ে, ঈদ কিংবা পারিবারিক আড্ডায় আত্মীয়দের জেরার মুহূর্তগুলোকে বানিয়ে ফেলুন হাসির বিঙ্গো গেম। শুনুন, ঘরে দাগ দিন এবং এক লাইনে মিললেই বিঙ্গো!'
              : 'Turn predictable family questions into a hilarious party game. Mark tiles as relatives ask their favorite questions, complete a line, and celebrate victory.'}
          </p>

          {/* Primary Action Group: Single prominent CTA above fold per A4 */}
          <div className="flex flex-wrap items-center gap-3.5 mt-6 sm:mt-8 w-full sm:w-auto">
            <button
              onClick={onStartPlaying}
              className="px-8 py-3.5 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] text-white font-semibold text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              <GamepadIcon className="text-sm" />
              <span>{lang === 'bn' ? 'এখনই বিঙ্গো খেলুন' : 'Play Bingo Now'}</span>
            </button>

            <button
              onClick={onOpenHowTo}
              className="px-5 py-3 rounded-full text-[#8E1B3A] hover:bg-[#8E1B3A]/10 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <QuestionIcon className="text-sm" />
              <span>{lang === 'bn' ? 'খেলার নিয়মাবলী' : 'How to Play'}</span>
            </button>
          </div>

          {/* Proof Signal per A2 (Specific, verified numbers) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 pt-4 border-t border-[#E8DCD0] text-xs text-[#6E554D] font-medium">
            <div className="flex items-center gap-1.5">
              <CheckIcon className="text-green-600 text-xs" />
              <span>{lang === 'bn' ? '১৭৪+ প্রামাণ্য বাঙালি ডায়ালগ' : '174+ Curated Prompts'}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <CheckIcon className="text-green-600 text-xs" />
              <span>{lang === 'bn' ? '১০০% ক্লায়েন্ট সাইড ব্যক্তিগত' : '100% Client Side Private'}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <CheckIcon className="text-green-600 text-xs" />
              <span>{lang === 'bn' ? 'কোনো সাইন আপ নেই' : 'No Sign Up Required'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Graphic & Draggable Floating Mascot */}
        <div className="relative w-full aspect-[16/11]">
          {/* Framed Graphic */}
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl border border-[#D8C6B6] bg-white flex items-center justify-center p-2">
            <img
              src={heroGatheringUrl}
              alt="Bengali Family Gathering Illustration"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Draggable Floating Aunty Mascot */}
          <DraggableAunty lang={lang} />
        </div>
      </section>

      {/* 2. TAGLINE REVEAL SECTION (Mandatory per B11) */}
      <TaglineReveal lang={lang} />

      {/* 3. NEW FEATURE 1: AUNTY SAVAGE & POLITE COMEBACKS SHOWCASE */}
      <section className="bg-[#FFFDF9] dark:bg-[#1a1014] rounded-3xl p-6 sm:p-10 border border-[#D8C6B6] dark:border-[#3d232c] shadow-sm">
        <div className="text-center mb-8 max-w-[680px] mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#B84B12] dark:text-[#f39c12] mb-1">
            {lang === 'bn' ? 'নতুন মোক্ষম ফিচার' : 'New Dynamic Feature'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#8E1B3A] dark:text-[#ff7597] text-balance">
            {lang === 'bn' ? 'আন্টিকে দেওয়ার মোক্ষম ও ভদ্র জবাব' : 'Aunty Savage & Polite Comebacks'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 font-normal text-pretty">
            {lang === 'bn'
              ? 'অস্বস্তিকর পারিবারিক প্রশ্নের মুখে আর চুপ করে থাকা নয়। প্রতিটি প্রশ্নের সাথে পেয়ে যান ৩ ধরনের প্রত্যুত্তর যা এক ক্লিকে কপি করা যায়।'
              : 'Never freeze during family interrogations again. Every question includes three customized comebacks with one click clipboard copy.'}
          </p>
        </div>

        {/* Interactive Comebacks Showcase */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#20151a] rounded-2xl border border-[#D8C6B6] dark:border-[#422530] p-4 sm:p-6 shadow-xs">
          
          {/* Question Selector Tabs */}
          <div className="mb-4">
            <span className="text-[11px] font-bold text-[#6E554D] dark:text-[#c7a9b3] uppercase tracking-wider block mb-2">
              {lang === 'bn' ? '১. একটি চেনা প্রশ্ন বেছে নিন:' : '1. Select a common interrogation question:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {sampleQuestions.map((q, idx) => {
                const isSelected = selectedSampleIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setSelectedSampleIndex(idx);
                      setPreviewCopied(false);
                    }}
                    className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFF6E5] dark:bg-[#341b25] border-[#8E1B3A] dark:border-[#ff7597] text-[#8E1B3A] dark:text-[#ff91ac] shadow-xs'
                        : 'bg-white dark:bg-[#1a1014] border-[#D8C6B6]/60 dark:border-[#3d232c] text-[#2B1B17] dark:text-[#fbf5ef] hover:border-[#8E1B3A]/40'
                    }`}
                  >
                    <div className="text-[10px] text-[#8A7268] dark:text-[#a08b93] font-normal mb-0.5">
                      {lang === 'bn' ? q.categoryBn : q.categoryEn}
                    </div>
                    <div className="font-bold line-clamp-1">
                      {lang === 'bn' ? q.labelBn : q.labelEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Style Selector Tabs (Savage, Polite, Funny) */}
          <div className="mb-3">
            <span className="text-[11px] font-bold text-[#6E554D] dark:text-[#c7a9b3] uppercase tracking-wider block mb-2">
              {lang === 'bn' ? '২. জবাবের ধরন নির্বাচন করুন:' : '2. Choose your response style:'}
            </span>
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#F4E8D9] dark:bg-[#2c1720] rounded-xl">
              <button
                onClick={() => {
                  setActiveComebackStyle('savage');
                  setPreviewCopied(false);
                }}
                className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeComebackStyle === 'savage'
                    ? 'bg-white dark:bg-[#1a1014] text-rose-600 dark:text-rose-400 shadow-xs'
                    : 'text-[#6E554D] dark:text-[#c7a9b3] hover:text-[#2B1B17]'
                }`}
              >
                <FireIcon className="text-xs" />
                <span>{lang === 'bn' ? 'স্যভেজ জবাব' : 'Savage'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveComebackStyle('polite');
                  setPreviewCopied(false);
                }}
                className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeComebackStyle === 'polite'
                    ? 'bg-white dark:bg-[#1a1014] text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-[#6E554D] dark:text-[#c7a9b3] hover:text-[#2B1B17]'
                }`}
              >
                <SmileIcon className="text-xs" />
                <span>{lang === 'bn' ? 'ভদ্র জবাব' : 'Polite'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveComebackStyle('funny');
                  setPreviewCopied(false);
                }}
                className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeComebackStyle === 'funny'
                    ? 'bg-white dark:bg-[#1a1014] text-amber-600 dark:text-amber-400 shadow-xs'
                    : 'text-[#6E554D] dark:text-[#c7a9b3] hover:text-[#2B1B17]'
                }`}
              >
                <LaughIcon className="text-xs" />
                <span>{lang === 'bn' ? 'মজার জবাব' : 'Funny'}</span>
              </button>
            </div>
          </div>

          {/* Active Comeback Display Box with 1-Click Copy */}
          {(() => {
            const currentQ = sampleQuestions[selectedSampleIndex];
            const currentStyle = currentQ.comebacks[activeComebackStyle];
            const textToCopy = lang === 'bn' ? currentStyle.bn : currentStyle.en;
            return (
              <div className="relative p-4 rounded-xl bg-[#FFFDF9] dark:bg-[#1a1014] border border-[#D8C6B6]/80 dark:border-[#3d232c] mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#8E1B3A] dark:text-[#ff7597] uppercase tracking-wider">
                    {lang === 'bn' ? 'প্রস্তুত প্রত্যুত্তর:' : 'Ready Counter Answer:'}
                  </span>
                  <button
                    onClick={() => handleCopyPreview(textToCopy)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F4E8D9] dark:bg-[#2c1720] text-[#8E1B3A] dark:text-[#ff7597] hover:bg-[#8E1B3A] hover:text-white dark:hover:bg-[#ff7597] dark:hover:text-[#140d10] text-xs font-semibold transition-all cursor-pointer shadow-xs"
                  >
                    {previewCopied ? <CheckIcon className="text-xs text-green-600" /> : <CopyIcon className="text-xs" />}
                    <span>{previewCopied ? (lang === 'bn' ? 'কপি হয়েছে!' : 'Copied!') : (lang === 'bn' ? 'কপি করুন' : 'Copy')}</span>
                  </button>
                </div>

                <p className="text-sm font-semibold text-[#2B1B17] dark:text-[#fbf5ef] leading-relaxed text-pretty">
                  "{textToCopy}"
                </p>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 4. NEW FEATURE 2: LIVE INTERROGATION STRESS METER & SURVIVOR BADGES */}
      <section className="bg-white dark:bg-[#1f1318] rounded-3xl p-6 sm:p-10 border border-[#D8C6B6] dark:border-[#3d232c] shadow-sm">
        <div className="text-center mb-8 max-w-[680px] mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#B84B12] dark:text-[#f39c12] mb-1">
            {lang === 'bn' ? 'লাইভ মিটার ও পদক' : 'Live Meter & Achievements'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#8E1B3A] dark:text-[#ff7597] text-balance">
            {lang === 'bn' ? 'আন্টির জেরা মিটার ও পারিবারিক পদক' : 'Interrogation Stress Meter & Survivor Badges'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 font-normal text-pretty">
            {lang === 'bn'
              ? 'বোর্ডে দাগ পড়ার সাথে সাথে আন্টির মুড পরিবর্তিত হয়। ৪টি রোমাঞ্চকর লেভেল পার করে বিঙ্গো জিতলেই পাবেন বিশেষ পারিবারিক খেতাব।'
              : 'As tiles are marked, the interrogation stress meter tracks Aunty mood across four dynamic tiers, culminating in exclusive survivor medals.'}
          </p>
        </div>

        {/* 2-Column Grid: Left is Stress Meter Interactive Preview, Right is Survivor Badges Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Left: Stress Meter Mood Stages */}
          <div className="bg-[#FFFDF9] dark:bg-[#1a1014] rounded-2xl p-5 border border-[#D8C6B6] dark:border-[#422530] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#8E1B3A] dark:text-[#ff7597] uppercase tracking-wider flex items-center gap-1.5">
                  <GaugeIcon className="text-xs" />
                  <span>{lang === 'bn' ? 'জেরা স্ট্রেস ট্র্যাকার' : 'Interrogation Stress Tracker'}</span>
                </span>
                <span className="text-xs font-mono font-bold text-[#6E554D] dark:text-[#c7a9b3]">
                  {stressPreviewLevel}%
                </span>
              </div>

              {/* Four Interactive Level Selector Pills */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { level: 15, labelBn: 'শান্ত আন্টি', labelEn: 'Chill (15%)', color: 'border-emerald-500 text-emerald-700 dark:text-emerald-400' },
                  { level: 35, labelBn: 'সন্দেহজনক দৃষ্টি', labelEn: 'Suspicious (35%)', color: 'border-amber-500 text-amber-700 dark:text-amber-400' },
                  { level: 65, labelBn: 'তীব্র জেরা', labelEn: 'Interrogation (65%)', color: 'border-orange-500 text-orange-700 dark:text-orange-400' },
                  { level: 90, labelBn: 'রেড অ্যালার্ট', labelEn: 'Meltdown (90%)', color: 'border-rose-600 text-[#8E1B3A] dark:text-rose-400' }
                ].map((tier) => (
                  <button
                    key={tier.level}
                    onClick={() => setStressPreviewLevel(tier.level)}
                    className={`py-1.5 px-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      stressPreviewLevel === tier.level
                        ? `bg-[#FFF6E5] dark:bg-[#2c1720] ${tier.color} font-bold shadow-xs`
                        : 'bg-white dark:bg-[#20151a] border-[#D8C6B6]/60 dark:border-[#3d232c] text-[#6E554D] dark:text-[#c7a9b3]'
                    }`}
                  >
                    {lang === 'bn' ? tier.labelBn : tier.labelEn}
                  </button>
                ))}
              </div>

              {/* Live Preview Display of StressMeter with 3D Avatar */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#20151a] border border-[#D8C6B6]/80 dark:border-[#3d232c] flex items-center gap-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 relative flex items-center justify-center">
                  <img
                    src={
                      stressPreviewLevel >= 80
                        ? aunty3dMeltdownUrl
                        : stressPreviewLevel >= 50
                        ? aunty3dInterrogationUrl
                        : stressPreviewLevel >= 20
                        ? aunty3dSuspiciousUrl
                        : aunty3dChillUrl
                    }
                    alt="3D Aunty Mood Reaction"
                    className="w-full h-full object-contain filter drop-shadow-md animate-in zoom-in-95 duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#2B1B17] dark:text-[#fbf5ef] truncate">
                      {stressPreviewLevel >= 80
                        ? (lang === 'bn' ? 'রেড অ্যালার্ট! আন্টি পরাস্ত!' : 'Red Alert! Aunty Defeated!')
                        : stressPreviewLevel >= 50
                        ? (lang === 'bn' ? 'তীব্র জেরা (ব্যক্তিগত আক্রমণ)' : 'Intense Interrogation')
                        : stressPreviewLevel >= 20
                        ? (lang === 'bn' ? 'সন্দেহজনক দৃষ্টি (চশমা ঠিক করছেন)' : 'Suspicious Glance')
                        : (lang === 'bn' ? 'শান্ত আন্টি (চা খাচ্ছেন)' : 'Chill Aunty (Sipping Tea)')}
                    </span>
                    <ShieldIcon className="text-xs text-[#8E1B3A] dark:text-[#ff7597] shrink-0" />
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#F4E8D9] dark:bg-[#2b1922] overflow-hidden mb-1.5">
                    <div
                      style={{ width: `${stressPreviewLevel}%` }}
                      className={`h-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full ${
                        stressPreviewLevel >= 80
                          ? 'bg-[#8E1B3A]'
                          : stressPreviewLevel >= 50
                          ? 'bg-orange-500'
                          : stressPreviewLevel >= 20
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                  </div>

                  <p className="text-[11px] text-[#6E554D] dark:text-[#c7a9b3] leading-relaxed text-pretty">
                    {stressPreviewLevel >= 80
                      ? (lang === 'bn' ? 'আপনি সফলভাবে সব প্রশ্নের জবাব দিয়ে টিকে গেছেন।' : 'You successfully survived the family trial.')
                      : stressPreviewLevel >= 50
                      ? (lang === 'bn' ? 'বিয়ে ও স্যালারির প্রশ্ন একের পর এক ধেয়ে আসছে।' : 'Salary and marriage questions incoming rapidly.')
                      : stressPreviewLevel >= 20
                      ? (lang === 'bn' ? 'কৌতূহল বাড়ছে, আত্মীয়দের চোখ এখন আপনার দিকে।' : 'Curiosity rising, brace yourself.')
                      : (lang === 'bn' ? 'আড্ডা সবে শুরু, এখনো জেরা জমে ওঠেনি।' : 'Gathering just began, calm before the storm.')}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#8A7268] dark:text-[#a08b93] font-medium mt-3 text-center">
              {lang === 'bn'
                ? 'বোর্ডের প্রতিটি ঘরে ট্যাপ করলেই রিয়েল টাইমে এই মিটারটি আপডেট হয়।'
                : 'This meter updates in real time on every tile marked during gameplay.'}
            </p>
          </div>

          {/* Right: Survivor Badges Showcase */}
          <div className="bg-[#FFFDF9] dark:bg-[#1a1014] rounded-2xl p-5 border border-[#D8C6B6] dark:border-[#422530] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#8E1B3A] dark:text-[#ff7597] uppercase tracking-wider flex items-center gap-1.5">
                  <AwardIcon className="text-xs" />
                  <span>{lang === 'bn' ? 'পারিবারিক পদক ও খেতাব' : 'Survivor Badges & Medals'}</span>
                </span>
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                  {lang === 'bn' ? '৫টি বিশেষ খেতাব' : '5 Special Titles'}
                </span>
              </div>

              <div className="space-y-2.5">
                {showcaseBadges.map((b) => (
                  <div
                    key={b.id}
                    className="p-2.5 rounded-xl bg-white dark:bg-[#20151a] border border-[#D8C6B6]/70 dark:border-[#3d232c] flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <AwardIcon className="text-sm" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#2B1B17] dark:text-[#fbf5ef]">
                        {lang === 'bn' ? b.titleBn : b.titleEn}
                      </h4>
                      <p className="text-[11px] text-[#6E554D] dark:text-[#c7a9b3] text-pretty">
                        {lang === 'bn' ? b.descBn : b.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-[#8A7268] dark:text-[#a08b93] font-medium mt-3 text-center">
              {lang === 'bn'
                ? 'বিঙ্গো জেতার পর ভিক্টরি স্ক্রিনে পদকটি প্রদর্শিত হয় এবং কার্ডে এক্সপোর্ট করা যায়।'
                : 'Unlocked upon hitting BINGO and integrated directly into the shareable card.'}
            </p>
          </div>

        </div>
      </section>

      {/* 5. OCCASION PRESETS DIRECTORY (Mid-page) */}
      <section className="flex flex-col items-center">
        <div className="text-center mb-6 sm:mb-8 max-w-[680px]">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#B84B12] dark:text-[#f39c12] mb-1">
            {lang === 'bn' ? 'অনুষ্ঠান নির্বাচন' : 'Occasion Selection'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#8E1B3A] dark:text-[#ff7597] text-balance">
            {lang === 'bn' ? 'আপনার আড্ডার ধরন বেছে নিন' : 'Choose Your Gathering'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 font-normal text-pretty">
            {lang === 'bn'
              ? 'বাঙালি পরিবারের ৫টি জনপ্রিয় মিলনমেলা ও গোয়েন্দা আড্ডার যেকোনো একটি সিলেক্ট করে খেলা শুরু করুন।'
              : 'Select from five curated gathering and neighborhood detective presets tailored with authentic Bengali questions.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
          {Object.values(OCCASIONS).map((occ) => {
            const isSelected = occ.id === activeOccasionId;
            return (
              <div
                key={occ.id}
                onClick={() => onSelectOccasion(occ.id)}
                className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer select-none ${
                  isSelected
                    ? 'bg-white dark:bg-[#28181f] shadow-md border-[#8E1B3A] dark:border-[#ff7597] scale-[1.02]'
                    : 'bg-[#FFFDF9] dark:bg-[#1f1318] hover:bg-white dark:hover:bg-[#28181f] border-[#D8C6B6] dark:border-[#3d232c] hover:border-[#8E1B3A]/40 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      style={{ backgroundColor: occ.themeBg, color: occ.tagColor }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center border border-[#D8C6B6]/50 dark:border-white/10"
                    >
                      <OccasionIcon occasionId={occ.id} className="text-base" />
                    </div>
                    <span
                      style={{ color: occ.tagColor, backgroundColor: occ.themeBg }}
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                    >
                      {lang === 'bn' ? occ.tagBn : occ.tagEn}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#2B1B17] dark:text-[#fbf5ef]">
                    {lang === 'bn' ? occ.nameBn : occ.nameEn}
                  </h3>

                  <p className="text-xs text-[#6E554D] dark:text-[#c7a9b3] font-normal mt-1.5 leading-relaxed text-pretty">
                    {lang === 'bn' ? occ.descBn : occ.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EFE7DE] dark:border-[#38202c] flex items-center justify-between text-xs font-semibold">
                  <span style={{ color: occ.tagColor }}>
                    {isSelected
                      ? (lang === 'bn' ? 'নির্বাচিত' : 'Selected')
                      : (lang === 'bn' ? 'বেছে নিন' : 'Select')}
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#8E1B3A] text-white flex items-center justify-center">
                      <CheckIcon className="text-xs" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <button
            onClick={onStartPlaying}
            className="px-8 py-3 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] dark:bg-[#a62245] dark:hover:bg-[#8E1B3A] text-white font-semibold text-base flex items-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer"
          >
            <SparklesIcon className="text-sm" />
            <span>{lang === 'bn' ? 'এই অনুষ্ঠানে খেলা শুরু করুন' : 'Start with Selected Preset'}</span>
          </button>
        </div>
      </section>

      {/* 6. HOW IT WORKS (3 Steps per A2) */}
      <section className="bg-[#FFFDF9] dark:bg-[#1a1014] rounded-3xl p-6 sm:p-10 border border-[#D8C6B6] dark:border-[#3d232c] shadow-sm">
        <div className="text-center mb-8 max-w-[680px] mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#B84B12] dark:text-[#f39c12] mb-1">
            {lang === 'bn' ? 'খেলার নিয়ম' : 'How It Works'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#8E1B3A] dark:text-[#ff7597] text-balance">
            {lang === 'bn' ? 'তিনটি সহজ ধাপে জয়ী হোন' : 'Three Simple Steps to Win'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 font-normal text-pretty">
            {lang === 'bn'
              ? 'কোনো জটিলতা ছাড়া তাৎক্ষণিকভাবে খেলা শুরু করার নিয়ম।'
              : 'Simple, fast, and completely relatable party gameplay.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#FFF6E5] dark:bg-[#28181f] border border-[#D8C6B6]/50 dark:border-[#422530]">
            <div className="w-10 h-10 rounded-full bg-[#8E1B3A] dark:bg-[#a62245] text-white font-bold text-base flex items-center justify-center mb-3 shadow-xs">
              1
            </div>
            <h3 className="font-bold text-base text-[#2B1B17] dark:text-[#fbf5ef]">
              {lang === 'bn' ? 'অনুষ্ঠান বেছে নিন' : 'Choose an Occasion'}
            </h3>
            <p className="text-xs text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 leading-relaxed font-normal text-pretty">
              {lang === 'bn'
                ? 'ঈদ, বিয়ে, রেজাল্ট কিংবা সাধারণ পারিবারিক আড্ডা থেকে আপনার ইভেন্টটি নির্বাচন করুন।'
                : 'Select your event from Eid, Wedding, Exam Results, or General Family Adda.'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#FFF6E5] dark:bg-[#28181f] border border-[#D8C6B6]/50 dark:border-[#422530]">
            <div className="w-10 h-10 rounded-full bg-[#8E1B3A] dark:bg-[#a62245] text-white font-bold text-base flex items-center justify-center mb-3 shadow-xs">
              2
            </div>
            <h3 className="font-bold text-base text-[#2B1B17] dark:text-[#fbf5ef]">
              {lang === 'bn' ? 'শুনুন ও দাগ দিন' : 'Listen & Stamp'}
            </h3>
            <p className="text-xs text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 leading-relaxed font-normal text-pretty">
              {lang === 'bn'
                ? 'আত্মীয়রা কোনো প্রশ্ন জিজ্ঞেস করলেই ঘরে ট্যাপ করে দাগ দিন। ভুলে দাগ পড়লে ডাবল ট্যাপে আনমার্ক করুন।'
                : 'Tap a tile whenever a relative asks that question. Double tap to unmark if tapped by mistake.'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#FFF6E5] dark:bg-[#28181f] border border-[#D8C6B6]/50 dark:border-[#422530]">
            <div className="w-10 h-10 rounded-full bg-[#8E1B3A] dark:bg-[#a62245] text-white font-bold text-base flex items-center justify-center mb-3 shadow-xs">
              3
            </div>
            <h3 className="font-bold text-base text-[#2B1B17] dark:text-[#fbf5ef]">
              {lang === 'bn' ? 'বিঙ্গো মেলালেই জয়' : 'Hit BINGO & Celebrate'}
            </h3>
            <p className="text-xs text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 leading-relaxed font-normal text-pretty">
              {lang === 'bn'
                ? 'অনুভূমিক, উল্লম্ব বা কোণাকুণি যেকোনো একটি পূর্ণ লাইন মিললেই বিঙ্গো! সুন্দর কার্ড এক্সপোর্ট করে শেয়ার করুন।'
                : 'Complete any row, column, or diagonal line to win. Export a 1080x1350 card to share with family.'}
            </p>
          </div>
        </div>
      </section>

      {/* 7. BENEFITS SECTION (Outcome-driven per A2 & A5) */}
      <section>
        <div className="text-center mb-8 max-w-[680px] mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#B84B12] dark:text-[#f39c12] mb-1">
            {lang === 'bn' ? 'সুবিধাসমূহ' : 'Core Benefits'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#8E1B3A] dark:text-[#ff7597] text-balance">
            {lang === 'bn' ? 'আন্টি বিঙ্গোর আকর্ষণীয় বৈশিষ্ট্য' : 'Engineered for Family Entertainment'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 font-normal text-pretty">
            {lang === 'bn'
              ? 'বাঙালি পরিবারের নিজস্ব সংস্কৃতিকে নিখুঁতভাবে ধারণ করে নির্মিত।'
              : 'Built specifically for the humor and traditions of Bengali family life.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1318] border border-[#D8C6B6] dark:border-[#3d232c] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <BoltIcon className="text-lg" />
            </div>
            <h3 className="font-bold text-base text-[#2B1B17] dark:text-[#fbf5ef]">
              {lang === 'bn' ? 'তাৎক্ষণিক শুরু' : 'Instant Play'}
            </h3>
            <p className="text-xs text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 leading-relaxed font-normal text-pretty">
              {lang === 'bn'
                ? 'কোনো অ্যাপ ডাউনলোড বা অ্যাকাউন্ট তৈরি করতে হবে না। যেকোনো ব্রাউজারে সেকেন্ডেই শুরু।'
                : 'Zero installation or account creation. Runs smoothly in any modern mobile browser.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1318] border border-[#D8C6B6] dark:border-[#3d232c] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-3">
              <SparklesIcon className="text-lg" />
            </div>
            <h3 className="font-bold text-base text-[#2B1B17] dark:text-[#fbf5ef]">
              {lang === 'bn' ? 'প্রতিদিনের তাজা প্রশ্ন ও জবাব' : 'Daily Fresh Prompts & Comebacks'}
            </h3>
            <p className="text-xs text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 leading-relaxed font-normal text-pretty">
              {lang === 'bn'
                ? 'একই প্রশ্ন বারবার নয়! প্রতিদিনের আড্ডায় উপভোগ করুন নিত্যনতুন প্রশ্ন ও ১০০% মিল থাকা মোক্ষম ও মজার জবাব।'
                : 'Never play the same board twice! Enjoy fresh authentic questions with perfectly matched comebacks daily.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1318] border border-[#D8C6B6] dark:border-[#3d232c] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#0F7B5F] dark:text-[#2ecc71] flex items-center justify-center mb-3">
              <CameraIcon className="text-lg" />
            </div>
            <h3 className="font-bold text-base text-[#2B1B17] dark:text-[#fbf5ef]">
              {lang === 'bn' ? 'এইচডি কার্ড এক্সপোর্ট' : 'HD Card Export'}
            </h3>
            <p className="text-xs text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 leading-relaxed font-normal text-pretty">
              {lang === 'bn'
                ? 'ইনস্টাগ্রাম স্টোরি ও হোয়াটসঅ্যাপের উপযোগী ১০৮০×১৩৫০ সাইজের ক্রিস্প পিএনজি কার্ড।'
                : 'Export branded 1080x1350 PNG cards ready for Instagram Stories, WhatsApp, and Facebook.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1318] border border-[#D8C6B6] dark:border-[#3d232c] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#1F50A8] dark:text-[#3498db] flex items-center justify-center mb-3">
              <ShieldIcon className="text-lg" />
            </div>
            <h3 className="font-bold text-base text-[#2B1B17] dark:text-[#fbf5ef]">
              {lang === 'bn' ? '১০০% ব্যক্তিগত ও ফ্রি' : '100% Private & Free'}
            </h3>
            <p className="text-xs text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 leading-relaxed font-normal text-pretty">
              {lang === 'bn'
                ? 'কোনো ট্র্যাকিং নেই, কোনো বিজ্ঞাপন নেই। সম্পূর্ণ নিরাপদ ক্লায়েন্ট সাইড আর্কিটেকচার।'
                : 'No cookies, no data collection, no ads. Operates entirely on the client side.'}
            </p>
          </div>
        </div>
      </section>

      {/* 8. SOCIAL PROOF / TESTIMONIALS SECTION (Authentic quotes per B8) */}
      <section className="bg-[#FFFDF9] dark:bg-[#1a1014] rounded-3xl p-6 sm:p-10 border border-[#D8C6B6] dark:border-[#3d232c] shadow-sm">
        <div className="text-center mb-8 max-w-[680px] mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#B84B12] dark:text-[#f39c12] mb-1">
            {lang === 'bn' ? 'অভিজ্ঞতা' : 'Social Proof'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#8E1B3A] dark:text-[#ff7597] text-balance">
            {lang === 'bn' ? 'খেলোয়াড়দের পারিবারিক অনুভূতি' : 'What Players Say'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 font-normal text-pretty">
            {lang === 'bn'
              ? 'বাঙালি পারিবারিক আড্ডায় আন্টি বিঙ্গো খেলার বাস্তব অভিজ্ঞতা।'
              : 'Real moments shared from gatherings across Bangladesh and beyond.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#20151a] p-5 sm:p-6 rounded-2xl border border-[#D8C6B6] dark:border-[#422530] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3 text-xs">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <p className="text-xs sm:text-sm text-[#2B1B17] dark:text-[#fbf5ef] font-normal leading-relaxed text-pretty mb-4">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8DCD0] dark:border-[#38202c] flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#8E1B3A] dark:text-[#ff7597]">{t.name}</div>
                  <div className="text-[#6E554D] dark:text-[#c7a9b3]">{t.location}</div>
                </div>
                <span className="bg-[#F4E8D9] dark:bg-[#2c1720] text-[#8E1B3A] dark:text-[#ff7597] px-2 py-0.5 rounded-full font-semibold text-[10px]">
                  {t.occasion}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS (Objection handling per A2 & A4) */}
      <section className="max-w-[760px] mx-auto w-full">
        <div className="text-center mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#B84B12] dark:text-[#f39c12] mb-1">
            {lang === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'FAQ'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#8E1B3A] dark:text-[#ff7597] text-balance">
            {lang === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্ন' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xs sm:text-sm text-[#6E554D] dark:text-[#c7a9b3] mt-1.5 font-normal text-pretty">
            {lang === 'bn'
              ? 'আন্টি বিঙ্গো সম্পর্কিত সব তথ্য এবং প্রশ্নের উত্তর।'
              : 'Everything you need to know about gameplay, privacy, and features.'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#1f1318] rounded-2xl border border-[#D8C6B6] dark:border-[#3d232c] shadow-xs overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#2B1B17] dark:text-[#fbf5ef] hover:text-[#8E1B3A] dark:hover:text-[#ff7597] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-pretty">{faq.q}</span>
                  <ChevronDownIcon
                    className={`text-xs text-[#8E1B3A] dark:text-[#ff7597] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#6E554D] dark:text-[#c7a9b3] leading-relaxed font-normal text-pretty border-t border-[#F2EAE1] dark:border-[#38202c] mt-1">
                    <p className="pt-2">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. FINAL CTA SECTION (Matches top CTA with risk reversal per A2) */}
      <section className="bg-white dark:bg-[#1a1014] rounded-3xl p-8 sm:p-12 border-2 border-[#D8C6B6] dark:border-[#3d232c] shadow-sm text-center max-w-[680px] mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#8E1B3A] dark:text-[#ff7597] text-balance">
          {lang === 'bn' ? 'পরবর্তী পারিবারিক আড্ডার জন্য প্রস্তুত তো?' : 'Ready for Your Next Gathering?'}
        </h2>
        <p className="text-xs sm:text-sm text-[#6E554D] dark:text-[#c7a9b3] mt-2 font-normal text-pretty max-w-md mx-auto">
          {lang === 'bn'
            ? 'আড্ডার অস্বস্তিকর প্রশ্নগুলোকে পরিণত করুন এক অবিস্মরণীয় আনন্দে। এখনই একটি বোর্ড তৈরি করুন।'
            : 'Turn awkward interrogations into laughter and friendly competition. Generate your board now.'}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartPlaying}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#8E1B3A] hover:bg-[#75142E] dark:bg-[#a62245] dark:hover:bg-[#8E1B3A] text-white font-semibold text-base shadow-md active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <GamepadIcon className="text-sm" />
            <span>{lang === 'bn' ? 'এখনই বিঙ্গো খেলুন' : 'Play Bingo Now'}</span>
          </button>
        </div>

        {/* Risk reversal line per A4 */}
        <p className="text-xs text-[#8A7268] dark:text-[#a08b93] mt-3 font-medium">
          {lang === 'bn'
            ? '১০০% ফ্রি • কোনো সাইন আপের প্রয়োজন নেই • তাৎক্ষণিক ব্রাউজার প্লে'
            : '100% Free • No Sign Up Required • Instant Browser Play'}
        </p>
      </section>

    </div>
  );
}
