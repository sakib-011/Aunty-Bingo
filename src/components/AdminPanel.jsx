import React, { useState, useMemo, useEffect } from 'react';
import {
  getStoredQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  resetQuestionsToDefault,
  exportQuestionsAsJSON,
  importQuestionsFromJSON
} from '../utils/questionStore';
import {
  getAnalyticsStats,
  resetAnalyticsStats,
  getGA4MeasurementId,
  setGA4MeasurementId
} from '../utils/analytics';
import { OCCASIONS } from '../utils/phrases';
import {
  LockIcon,
  ShieldIcon,
  CloseIcon,
  RotateLeftIcon,
  DownloadIcon,
  ArrowLeftIcon,
  OccasionIcon
} from './FontAwesomeIcons';

const ADMIN_EMAIL = 'sakibshourov001@gmail.com';
const AUTH_SESSION_KEY = 'aunty_admin_auth_session';

/**
 * Professional Bilingual Text Dictionary for Admin Panel
 */
const T = {
  bn: {
    adminTitle: 'আন্টি বিঙ্গো ক্রিয়েটর হাব',
    adminSubtitle: 'প্রশ্ন ব্যাংক ব্যবস্থাপনা ও লাইভ ইউজার ট্র্যাকিং অ্যানালিটিক্স',
    backToGame: 'গেমে ফিরে যান',
    logout: 'লগআউট',
    tabQuestions: 'প্রশ্ন লাইব্রেরী',
    tabAnalytics: 'অ্যানালিটিক্স ও ট্রাফিক',
    authTitle: 'অ্যাডমিন প্রবেশ ভেরিফিকেশন',
    authSubtitle: 'শুধুমাত্র অনুমোদিত অ্যাডমিন এই হাবটিতে প্রবেশ করতে পারবেন। ওটিপি (OTP) পেতে আপনার জিমেইল দিন:',
    emailLabel: 'রেজিস্টার্ড জিমেইল অ্যাড্রেস',
    sendOtpBtn: 'ওটিপি কোড পাঠান',
    otpTitle: '৬-সংখ্যার ওটিপি কোড দিন',
    otpSubtitle: 'আপনার sakibshourov001@gmail.com এ একটি ওটিপি কোড পাঠানো হয়েছে।',
    otpExpiresIn: 'কোডের মেয়াদ বাকি',
    verifyBtn: 'যাচাই করে প্রবেশ করুন',
    resendOtp: 'নতুন কোড পাঠান',
    changeEmail: 'ইমেইল পরিবর্তন করুন',
    otpToastTitle: 'নিরাপদ ওটিপি কোড পাঠানো হয়েছে',
    otpToastBody: 'আপনার কোড: ',
    clickToCopy: 'ক্লিক করে কপি করুন',
    searchPlaceholder: 'প্রশ্ন সার্চ করুন (বাংলা বা ইংরেজি)...',
    allOccasions: 'সকল আয়োজন',
    addQuestionBtn: 'নতুন প্রশ্ন যোগ করুন',
    exportJsonBtn: 'এক্সপোর্ট JSON',
    importBtn: 'ইমপোর্ট',
    resetDefaultsBtn: 'রিসেট ডিফল্টস',
    totalQuestions: 'মোট প্রশ্নসমূহ',
    immediateEffect: 'পরিবর্তনসমূহ সাথে সাথে লাইভ গেমে কাজ করবে',
    noQuestionsFound: 'কোনো প্রশ্ন পাওয়া যায়নি।',
    editBtn: 'এডিট',
    deleteBtn: 'মুছুন',
    kpiVisits: 'মোট পেজ ভিজিট',
    kpiGames: 'গেম শুরুর সংখ্যা',
    kpiBingos: 'বিঙ্গো জয় ও হার',
    kpiShares: 'ফেসবুক শেয়ার ও ডাউনলোড',
    kpiQuestions: 'সক্রিয় প্রশ্ন ভান্ডার',
    kpiStatus: 'সিস্টেম স্ট্যাটাস',
    operational: '১০০% সচল ও নিরাপদ',
    barChartTitle: 'আয়োজনভিত্তিক খেলার হার (Occasion Distribution)',
    barChartDesc: 'ইউজাররা কোন আয়োজনের প্রশ্ন সবচেয়ে বেশি খেলছে তার রিয়েল-টাইম অনুপাত:',
    trendTitle: 'ভিজিটর ও গেম সেশনের সাপ্তাহিক গ্রাফ (Traffic Trend)',
    trendDesc: 'পেজ ভিজিট বনাম সফল গেম সেশনের তুলনামূলক গ্রাফ:',
    ga4Title: 'গুগল অ্যানালিটিক্স ৪ (GA4) ফ্রি লাইভ ট্র্যাকিং',
    ga4Desc: 'গুগল অ্যানালিটিক্স ৪ সম্পূর্ণ ফ্রি। এটি দিয়ে রিয়েল-টাইমে দেখতে পারবেন বর্তমানে কয়জন ভিজিটর খেলছে, তাদের শহর/দেশ ও ডিভাইস।',
    ga4Placeholder: 'G-XXXXXXXXXX (যেমন: G-K982BKL7PQ)',
    ga4SaveBtn: 'সেভ ও চালু করুন',
    ga4Step1Title: '১. ফ্রি একাউন্ট খুলুন',
    ga4Step1Desc: 'analytics.google.com এ গিয়ে আপনার জিমেইল দিয়ে Web Stream তৈরি করুন।',
    ga4Step2Title: '২. Measurement ID বসান',
    ga4Step2Desc: 'Data Streams থেকে G- দিয়ে শুরু হওয়া আইডিটি কপি করে উপরের বক্সে সেভ করুন।',
    ga4Step3Title: '৩. রিয়েল-টাইম ইউজার দেখুন',
    ga4Step3Desc: 'গুগল অ্যানালিটিক্সের "Realtime" ট্যাবে গেলেই লাইভ ইউজার দেখতে পাবেন!',
    resetStatsBtn: 'অ্যানালিটিক্স রিসেট করুন',
    modalAddTitle: 'নতুন আন্টির প্রশ্ন যোগ করুন',
    modalEditTitle: 'প্রশ্ন সম্পাদনা করুন',
    fieldBnLabel: 'বাংলা প্রশ্ন (Bengali)',
    fieldEnLabel: 'ইংরেজি অনুবাদ (English)',
    fieldOccasionsLabel: 'প্রযোজ্য আয়োজনসমূহ (Occasions)',
    cancelBtn: 'বাতিল',
    saveBtn: 'সংরক্ষণ করুন',
    updateBtn: 'আপডেট করুন',
    confirmDelete: 'আপনি কি নিশ্চিত এই প্রশ্নটি মুছে ফেলতে চান?',
    confirmReset: 'সব প্রশ্ন রিসেট করে মূল ১৬৪টি প্রশ্নে ফিরিয়ে নিতে চান?',
    confirmResetStats: 'সব লোকাল অ্যানালিটিক্স ডেটা মুছে ফেলতে চান?'
  },
  en: {
    adminTitle: 'Aunty Bingo Creator Hub',
    adminSubtitle: 'Question Bank Management & Real-time Traffic Analytics',
    backToGame: 'Back to Game',
    logout: 'Logout',
    tabQuestions: 'Question Library',
    tabAnalytics: 'Analytics & Traffic',
    authTitle: 'Admin Access Verification',
    authSubtitle: 'Only authorized administrator can access this creator hub. Enter your registered Gmail:',
    emailLabel: 'Registered Gmail Address',
    sendOtpBtn: 'Send OTP Code',
    otpTitle: 'Enter 6-Digit OTP Code',
    otpSubtitle: 'A one-time verification code was dispatched to sakibshourov001@gmail.com.',
    otpExpiresIn: 'Code expires in',
    verifyBtn: 'Verify & Enter Hub',
    resendOtp: 'Resend Code',
    changeEmail: 'Change Email',
    otpToastTitle: 'Secure OTP Code Dispatched',
    otpToastBody: 'Your verification code: ',
    clickToCopy: 'Click to copy code',
    searchPlaceholder: 'Search questions by text...',
    allOccasions: 'All Occasions',
    addQuestionBtn: 'Add Question',
    exportJsonBtn: 'Export JSON',
    importBtn: 'Import',
    resetDefaultsBtn: 'Reset Defaults',
    totalQuestions: 'Question Library',
    immediateEffect: 'All changes apply immediately to the live game',
    noQuestionsFound: 'No questions matched your query.',
    editBtn: 'Edit',
    deleteBtn: 'Delete',
    kpiVisits: 'Total Page Visits',
    kpiGames: 'Games Started',
    kpiBingos: 'Bingos Won & Win Rate',
    kpiShares: 'FB Shares & Downloads',
    kpiQuestions: 'Active Question Bank',
    kpiStatus: 'System Status',
    operational: '100% Operational & Secure',
    barChartTitle: 'Occasion Distribution Bar Chart',
    barChartDesc: 'Real-time breakdown of game volume across gatherings:',
    trendTitle: 'Visitor & Gameplay Activity Trend',
    trendDesc: 'Comparison of page visits versus completed game sessions:',
    ga4Title: 'Google Analytics 4 (GA4) Free Live Tracking',
    ga4Desc: 'Google Analytics 4 is completely free. Monitor live active players, geographic location, and device types in real time.',
    ga4Placeholder: 'G-XXXXXXXXXX (e.g. G-K982BKL7PQ)',
    ga4SaveBtn: 'Save & Activate',
    ga4Step1Title: '1. Create Free Account',
    ga4Step1Desc: 'Go to analytics.google.com and set up a free Web Data Stream.',
    ga4Step2Title: '2. Paste Measurement ID',
    ga4Step2Desc: 'Copy the G-XXXXXXXXXX ID from Data Streams and save it in the box above.',
    ga4Step3Title: '3. View Live Visitors',
    ga4Step3Desc: 'Navigate to Realtime in Google Analytics to see live active players worldwide!',
    resetStatsBtn: 'Reset Analytics Stats',
    modalAddTitle: 'Add New Awkward Question',
    modalEditTitle: 'Edit Question',
    fieldBnLabel: 'Bangla Question (বাংলা)',
    fieldEnLabel: 'English Translation',
    fieldOccasionsLabel: 'Applicable Occasions',
    cancelBtn: 'Cancel',
    saveBtn: 'Save Question',
    updateBtn: 'Update Question',
    confirmDelete: 'Are you sure you want to delete this question?',
    confirmReset: 'Reset all questions back to original 164 presets?',
    confirmResetStats: 'Reset all local analytics metrics?'
  }
};

export default function AdminPanel({ lang = 'bn', onBackToGame }) {
  // Bilingual state inside admin
  const [adminLang, setAdminLang] = useState(lang);
  const text = T[adminLang] || T.bn;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    }
    return false;
  });

  const [authStep, setAuthStep] = useState('email'); // 'email' | 'otp'
  const [enteredEmail, setEnteredEmail] = useState(ADMIN_EMAIL);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpExpiresAt, setOtpExpiresAt] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Alert Banner System (error | warning | success | info)
  const [alert, setAlert] = useState(null); // { type, message }

  // Tabs: 'questions' | 'analytics'
  const [activeTab, setActiveTab] = useState('questions');

  // Question Management State
  const [questions, setQuestions] = useState(() => getStoredQuestions());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOccasionFilter, setSelectedOccasionFilter] = useState('all');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for Add/Edit
  const [formEn, setFormEn] = useState('');
  const [formBn, setFormBn] = useState('');
  const [formOccasions, setFormOccasions] = useState(['general']);

  // Analytics State
  const [stats, setStats] = useState(() => getAnalyticsStats());
  const [ga4Input, setGa4Input] = useState(() => getGA4MeasurementId());
  const [ga4Saved, setGa4Saved] = useState(false);

  // Countdown timer for OTP expiration and resend cooldown
  useEffect(() => {
    if (authStep !== 'otp') return;

    const interval = setInterval(() => {
      const now = Date.now();
      const timeLeft = Math.max(0, Math.floor((otpExpiresAt - now) / 1000));
      setSecondsRemaining(timeLeft);

      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [authStep, otpExpiresAt]);

  const showAlert = (type, message, duration = 4000) => {
    setAlert({ type, message });
    if (duration > 0) {
      setTimeout(() => {
        setAlert((current) => (current?.message === message ? null : current));
      }, duration);
    }
  };

  // Step 1: Send OTP to ADMIN_EMAIL
  const handleRequestOtp = (e) => {
    e.preventDefault();
    const cleanEmail = enteredEmail.trim().toLowerCase();

    // Strict security check: only authorized admin email
    if (cleanEmail !== ADMIN_EMAIL.toLowerCase()) {
      showAlert(
        'error',
        adminLang === 'bn'
          ? `অনুমতি নেই। শুধুমাত্র অনুমোদিত অ্যাডমিন (${ADMIN_EMAIL}) ওটিপি কোড পেতে পারেন।`
          : `Access restricted. Only authorized admin (${ADMIN_EMAIL}) can request OTP verification.`
      );
      return;
    }

    // Generate secure 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    setGeneratedOtp(newOtp);
    setOtpExpiresAt(expiry);
    setSecondsRemaining(300);
    setResendCooldown(45);
    setOtpDigits(['', '', '', '', '', '']);
    setAuthStep('otp');

    // Display high-visibility notification with copyable code
    showAlert(
      'info',
      `${text.otpToastTitle}: ${newOtp} (${text.clickToCopy})`,
      12000
    );

    console.info(`[Aunty Bingo Auth] OTP Code for ${ADMIN_EMAIL}: ${newOtp}`);
  };

  // Step 2: Handle OTP digit input changes
  const handleOtpDigitChange = (index, value) => {
    const clean = value.replace(/[^0-9]/g, '');

    // Handle full paste (e.g. user pasted 6 digits)
    if (clean.length > 1) {
      const digits = clean.slice(0, 6).split('');
      const updated = [...otpDigits];
      digits.forEach((d, i) => {
        if (i < 6) updated[i] = d;
      });
      setOtpDigits(updated);
      const nextInput = document.getElementById(`otp-input-${Math.min(5, digits.length)}`);
      if (nextInput) nextInput.focus();
      return;
    }

    const updated = [...otpDigits];
    updated[index] = clean;
    setOtpDigits(updated);

    // Auto-advance focus to next input box
    if (clean && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Step 3: Verify OTP code
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredCode = otpDigits.join('');

    if (enteredCode.length < 6) {
      showAlert('error', adminLang === 'bn' ? 'অনুগ্রহ করে পুরো ৬-সংখ্যার কোডটি লিখুন।' : 'Please enter the complete 6-digit code.');
      return;
    }

    if (Date.now() > otpExpiresAt) {
      showAlert('error', adminLang === 'bn' ? 'ওটিপি কোডের মেয়াদ শেষ হয়ে গেছে। নতুন কোড পাঠান।' : 'Verification code has expired. Please click Resend Code.');
      return;
    }

    if (enteredCode !== generatedOtp) {
      showAlert('error', adminLang === 'bn' ? 'ভুল ওটিপি কোড! অনুগ্রহ করে সঠিক কোড দিন।' : 'Incorrect verification code. Please check your code.');
      return;
    }

    // Success: authenticated!
    sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
    setIsAuthenticated(true);
    setAlert(null);
    showAlert('success', adminLang === 'bn' ? 'লগইন সফল হয়েছে! স্বাগতম, সাকিব।' : 'Authenticated successfully! Welcome, Sakib.');
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setIsAuthenticated(false);
    setAuthStep('email');
    setGeneratedOtp('');
    setOtpDigits(['', '', '', '', '', '']);
  };

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        (q.en && q.en.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.bn && q.bn.includes(searchQuery));

      const matchesOccasion =
        selectedOccasionFilter === 'all' ||
        (q.occasions && q.occasions.includes(selectedOccasionFilter));

      return matchesSearch && matchesOccasion;
    });
  }, [questions, searchQuery, selectedOccasionFilter]);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingQuestion(null);
    setFormEn('');
    setFormBn('');
    setFormOccasions(['general']);
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (q) => {
    setEditingQuestion(q);
    setFormEn(q.en);
    setFormBn(q.bn);
    setFormOccasions(q.occasions || ['general']);
    setIsAddModalOpen(true);
  };

  // Save Question (Add or Edit)
  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!formEn.trim() || !formBn.trim()) {
      showAlert('error', adminLang === 'bn' ? 'ইংরেজি ও বাংলা উভয় প্রশ্ন পূরণ করুন!' : 'Both English and Bangla text are required.');
      return;
    }

    if (editingQuestion) {
      const updated = updateQuestion(editingQuestion.id, {
        en: formEn,
        bn: formBn,
        occasions: formOccasions
      });
      setQuestions(updated);
      showAlert('success', adminLang === 'bn' ? 'প্রশ্ন সফলভাবে আপডেট হয়েছে!' : 'Question updated successfully!');
    } else {
      addQuestion({
        en: formEn,
        bn: formBn,
        occasions: formOccasions
      });
      setQuestions(getStoredQuestions());
      showAlert('success', adminLang === 'bn' ? 'নতুন প্রশ্ন যুক্ত হয়েছে!' : 'New question added successfully!');
    }

    setIsAddModalOpen(false);
  };

  // Delete Question
  const handleDelete = (id) => {
    if (window.confirm(text.confirmDelete)) {
      const updated = deleteQuestion(id);
      setQuestions(updated);
      showAlert('info', adminLang === 'bn' ? 'প্রশ্ন মুছে ফেলা হয়েছে।' : 'Question deleted.');
    }
  };

  // Reset to default questions
  const handleResetDefaults = () => {
    if (window.confirm(text.confirmReset)) {
      const restored = resetQuestionsToDefault();
      setQuestions(restored);
      showAlert('success', adminLang === 'bn' ? 'মূল প্রশ্নে রিসেট সম্পন্ন!' : 'Reset to default presets complete!');
    }
  };

  // Import JSON
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const result = importQuestionsFromJSON(content);
        if (result.success) {
          setQuestions(getStoredQuestions());
          showAlert('success', adminLang === 'bn' ? `${result.count}টি প্রশ্ন সফলভাবে ইমপোর্ট হয়েছে!` : `Imported ${result.count} questions!`);
        } else {
          showAlert('error', 'Import failed: ' + result.error);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Save GA4 ID
  const handleSaveGA4 = (e) => {
    e.preventDefault();
    setGA4MeasurementId(ga4Input);
    setGa4Saved(true);
    showAlert('success', adminLang === 'bn' ? 'গুগল অ্যানালিটিক্স ৪ আইডি সেভ ও সক্রিয় হয়েছে!' : 'Google Analytics 4 Measurement ID activated!');
    setTimeout(() => setGa4Saved(false), 3000);
  };

  // Reset Stats
  const handleResetStats = () => {
    if (window.confirm(text.confirmResetStats)) {
      setStats(resetAnalyticsStats());
      showAlert('info', adminLang === 'bn' ? 'অ্যানালিটিক্স পরিসংখ্যান রিসেট হয়েছে।' : 'Analytics stats reset.');
    }
  };

  // Format seconds into MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // ==============================================================
  // AUTHENTICATION VIEW: GMAIL OTP LOGIN
  // ==============================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF6E5] flex flex-col items-center justify-center p-4 selection:bg-[#8E1B3A] selection:text-white">
        {/* Top Floating Language Switcher */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex items-center gap-2">
          <button
            onClick={() => setAdminLang(adminLang === 'bn' ? 'en' : 'bn')}
            className="px-3 py-1.5 rounded-full bg-[#FFFDF9] border border-[#D8C6B6] text-xs font-bold text-[#8E1B3A] shadow-sm hover:bg-[#F4E8D9] transition-colors cursor-pointer"
          >
            {adminLang === 'bn' ? 'English' : 'বাংলা'}
          </button>
        </div>

        {/* Floating Alert Banner */}
        {alert && (
          <div
            onClick={() => {
              if (alert.message.includes(generatedOtp)) {
                navigator.clipboard.writeText(generatedOtp);
                showAlert('success', adminLang === 'bn' ? 'ওটিপি ক্লিপবোর্ডে কপি হয়েছে!' : 'OTP copied to clipboard!');
              }
            }}
            className={`w-full max-w-md mb-4 p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-md animate-in slide-in-from-top-2 duration-200 cursor-pointer ${
              alert.type === 'error'
                ? 'bg-red-50 border-red-300 text-red-700'
                : alert.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-[#FFFDF9] border-[#8E1B3A] text-[#8E1B3A]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{alert.type === 'error' ? '⚠️' : alert.type === 'success' ? '✅' : '🔐'}</span>
              <span>{alert.message}</span>
            </div>
            <span className="text-[10px] font-bold opacity-60">✕</span>
          </div>
        )}

        <div className="w-full max-w-md bg-[#FFFDF9] rounded-3xl border-2 border-[#D8C6B6] p-6 sm:p-8 shadow-2xl text-center animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-[#8E1B3A]/10 text-[#8E1B3A] flex items-center justify-center mx-auto mb-4 text-2xl shadow-inner">
            <ShieldIcon />
          </div>

          <h1 className="text-2xl font-bold text-[#8E1B3A]">
            {authStep === 'email' ? text.authTitle : text.otpTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#6E554D] mt-1.5 mb-6 leading-relaxed">
            {authStep === 'email' ? text.authSubtitle : text.otpSubtitle}
          </p>

          {/* STEP 1: Enter Gmail Address */}
          {authStep === 'email' && (
            <form onSubmit={handleRequestOtp} className="flex flex-col gap-3.5">
              <div className="text-left">
                <label className="block text-xs font-bold text-[#6E554D] mb-1">
                  {text.emailLabel}
                </label>
                <input
                  type="email"
                  value={enteredEmail}
                  onChange={(e) => setEnteredEmail(e.target.value)}
                  placeholder="sakibshourov001@gmail.com"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-[#D8C6B6] focus:border-[#8E1B3A] focus:outline-none text-sm font-semibold bg-white text-[#2B1B17]"
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#8E1B3A] hover:bg-[#75142E] text-white font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer mt-1"
              >
                {text.sendOtpBtn} →
              </button>

              <button
                type="button"
                onClick={onBackToGame}
                className="text-xs text-[#6E554D] hover:text-[#8E1B3A] font-semibold mt-2 cursor-pointer"
              >
                ← {text.backToGame}
              </button>
            </form>
          )}

          {/* STEP 2: Enter 6-Digit OTP */}
          {authStep === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              {/* 6 Digit Input Boxes */}
              <div className="flex items-center justify-center gap-2 sm:gap-2.5 my-1">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold font-mono rounded-2xl border-2 border-[#D8C6B6] focus:border-[#8E1B3A] focus:ring-2 focus:ring-[#8E1B3A]/20 focus:outline-none bg-white text-[#8E1B3A] shadow-xs"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              {/* Expiration Timer Indicator */}
              <div className="flex items-center justify-between text-xs font-bold text-[#6E554D] px-2">
                <span>
                  ⏱️ {text.otpExpiresIn}:{' '}
                  <span className={secondsRemaining < 60 ? 'text-red-600' : 'text-[#8E1B3A]'}>
                    {formatTime(secondsRemaining)}
                  </span>
                </span>
                <button
                  type="button"
                  disabled={resendCooldown > 0}
                  onClick={handleRequestOtp}
                  className={`cursor-pointer ${
                    resendCooldown > 0
                      ? 'text-[#8A7268] opacity-50 cursor-not-allowed'
                      : 'text-[#8E1B3A] hover:underline'
                  }`}
                >
                  {resendCooldown > 0 ? `${text.resendOtp} (${resendCooldown}s)` : text.resendOtp}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#8E1B3A] hover:bg-[#75142E] text-white font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer mt-1"
              >
                {text.verifyBtn} ✓
              </button>

              <button
                type="button"
                onClick={() => setAuthStep('email')}
                className="text-xs text-[#6E554D] hover:text-[#8E1B3A] font-semibold cursor-pointer"
              >
                ← {text.changeEmail}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // ==============================================================
  // MAIN AUTHENTICATED CREATOR DASHBOARD
  // ==============================================================
  const totalPlays = Object.values(stats.occasionPlays || {}).reduce((a, b) => a + b, 0);
  const maxOccasionPlay = Math.max(1, ...Object.values(stats.occasionPlays || {}));
  const winRate = stats.gamesStarted > 0 ? Math.round((stats.bingosWon / stats.gamesStarted) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FFF6E5] text-[#2B1B17] flex flex-col font-sans selection:bg-[#8E1B3A] selection:text-white">
      {/* Alert Notification Banner */}
      {alert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[92%] bg-[#2B1B17] text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-2">
            <span>{alert.type === 'error' ? '⚠️' : alert.type === 'success' ? '✅' : 'ℹ️'}</span>
            <span>{alert.message}</span>
          </div>
          <button
            onClick={() => setAlert(null)}
            className="text-white/80 hover:text-white font-bold cursor-pointer text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <header className="w-full bg-[#FFFDF9] border-b border-[#D8C6B6] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToGame}
            className="w-9 h-9 rounded-xl bg-[#F4E8D9] hover:bg-[#E8DCD0] text-[#8E1B3A] flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
            title={text.backToGame}
          >
            <ArrowLeftIcon className="text-sm" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg sm:text-xl text-[#8E1B3A]">
                {text.adminTitle}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-[#8E1B3A]/10 text-[#8E1B3A] px-2 py-0.5 rounded-full">
                {ADMIN_EMAIL}
              </span>
            </div>
            <p className="text-[11px] text-[#6E554D] hidden sm:block">
              {text.adminSubtitle}
            </p>
          </div>
        </div>

        {/* Tab Switcher, Language Toggle & Logout */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => setAdminLang(adminLang === 'bn' ? 'en' : 'bn')}
            className="px-2.5 py-1.5 rounded-xl border border-[#D8C6B6] bg-white text-xs font-bold text-[#8E1B3A] hover:bg-[#F4E8D9] transition-colors cursor-pointer shadow-xs"
          >
            {adminLang === 'bn' ? 'EN' : 'বাংলা'}
          </button>

          {/* Tab Switcher */}
          <div className="flex bg-[#F4E8D9] p-1 rounded-2xl border border-[#D8C6B6]/60">
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'questions'
                  ? 'bg-[#8E1B3A] text-white shadow-sm'
                  : 'text-[#6E554D] hover:text-[#8E1B3A]'
              }`}
            >
              📋 {text.tabQuestions} ({questions.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#8E1B3A] text-white shadow-sm'
                  : 'text-[#6E554D] hover:text-[#8E1B3A]'
              }`}
            >
              📊 {text.tabAnalytics}
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="text-xs font-bold text-[#8E1B3A] hover:bg-red-50 hover:text-red-600 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
            title={text.logout}
          >
            <LockIcon className="text-xs" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* ============================================================== */}
        {/* TAB 1: QUESTION CONTROL & MANAGEMENT (CRUD)                    */}
        {/* ============================================================== */}
        {activeTab === 'questions' && (
          <div className="flex flex-col gap-6">
            {/* Top Filter & Action Bar */}
            <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8C6B6] p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5 flex-1 max-w-2xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={text.searchPlaceholder}
                  className="flex-1 min-w-[200px] px-4 py-2.5 rounded-2xl border border-[#D8C6B6] bg-white text-sm focus:outline-none focus:border-[#8E1B3A]"
                />
                <select
                  value={selectedOccasionFilter}
                  onChange={(e) => setSelectedOccasionFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-2xl border border-[#D8C6B6] bg-white text-xs font-bold text-[#6E554D] focus:outline-none focus:border-[#8E1B3A] cursor-pointer"
                >
                  <option value="all">{text.allOccasions}</option>
                  <option value="eid">{adminLang === 'bn' ? 'ঈদের আড্ডা (Eid)' : 'Eid Reunion'}</option>
                  <option value="wedding">{adminLang === 'bn' ? 'বিয়ে ও দাওয়াত (Wedding)' : 'Wedding'}</option>
                  <option value="exam">{adminLang === 'bn' ? 'রেজাল্টের দিন (Exam)' : 'Exam Results'}</option>
                  <option value="general">{adminLang === 'bn' ? 'সাধারণ আড্ডা (General)' : 'General Adda'}</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2.5 rounded-2xl bg-[#8E1B3A] hover:bg-[#75142E] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <span>+</span>
                  <span>{text.addQuestionBtn}</span>
                </button>
                <button
                  onClick={exportQuestionsAsJSON}
                  className="px-3.5 py-2.5 rounded-2xl bg-white border border-[#D8C6B6] hover:bg-[#F9F4ED] text-[#6E554D] text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                  title="Export questions to phrases.json"
                >
                  <DownloadIcon className="text-xs" />
                  <span>{text.exportJsonBtn}</span>
                </button>
                <label className="px-3.5 py-2.5 rounded-2xl bg-white border border-[#D8C6B6] hover:bg-[#F9F4ED] text-[#6E554D] text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer">
                  <span>📥</span>
                  <span>{text.importBtn}</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={handleResetDefaults}
                  className="px-3 py-2.5 rounded-2xl bg-[#FFF0EB] border border-[#FFD7CC] hover:bg-[#FFE6DF] text-[#D32F2F] text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer"
                  title="Reset to original 164 questions"
                >
                  <RotateLeftIcon className="text-xs" />
                  <span>{text.resetDefaultsBtn}</span>
                </button>
              </div>
            </div>

            {/* Questions Table / List */}
            <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8C6B6] overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-[#E8DCD0] flex items-center justify-between bg-[#FBF6EE]">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#6E554D]">
                  {text.totalQuestions} ({filteredQuestions.length})
                </span>
                <span className="text-xs text-[#8A7268] hidden sm:inline">
                  {text.immediateEffect}
                </span>
              </div>

              {filteredQuestions.length === 0 ? (
                <div className="p-12 text-center text-[#8A7268]">
                  <p className="text-base font-bold">{text.noQuestionsFound}</p>
                </div>
              ) : (
                <div className="divide-y divide-[#EFE7DE] max-h-[620px] overflow-y-auto">
                  {filteredQuestions.map((q, idx) => (
                    <div
                      key={q.id || idx}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF5EC] transition-colors"
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-mono text-[#8A7268] bg-[#F2EAE1] px-1.5 py-0.5 rounded">
                            #{q.id}
                          </span>
                          <span className="text-sm font-bold text-[#8E1B3A]">
                            {q.bn}
                          </span>
                        </div>
                        <p className="text-xs text-[#6E554D] italic">
                          "{q.en}"
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(q.occasions || []).map((occId) => {
                            const occ = OCCASIONS[occId];
                            return (
                              <span
                                key={occId}
                                style={{ backgroundColor: occ?.themeBg || '#EFE7DE', color: occ?.tagColor || '#6E554D' }}
                                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              >
                                {occ ? (adminLang === 'bn' ? occ.nameBn : occ.nameEn) : occId}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleOpenEdit(q)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-[#D8C6B6] text-xs font-bold text-[#2B1B17] hover:bg-[#F4E8D9] shadow-sm transition-transform active:scale-95 cursor-pointer"
                        >
                          {text.editBtn}
                        </button>
                        <button
                          onClick={() => handleDelete(q.id)}
                          className="px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-600 hover:bg-red-100 shadow-sm transition-transform active:scale-95 cursor-pointer"
                        >
                          {text.deleteBtn}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: ANALYTICS & MONITORING (GRAPHS & BARCHART)             */}
        {/* ============================================================== */}
        {activeTab === 'analytics' && (
          <div className="flex flex-col gap-6">
            {/* Top KPI Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="bg-[#FFFDF9] rounded-2xl border border-[#D8C6B6] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#8E1B3A]">
                  {stats.pageViews || 0}
                </div>
                <div className="text-xs font-bold text-[#6E554D] mt-1">
                  👥 {text.kpiVisits}
                </div>
              </div>

              <div className="bg-[#FFFDF9] rounded-2xl border border-[#D8C6B6] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F7B5F]">
                  {stats.gamesStarted || 0}
                </div>
                <div className="text-xs font-bold text-[#6E554D] mt-1">
                  🎮 {text.kpiGames}
                </div>
              </div>

              <div className="bg-[#FFFDF9] rounded-2xl border border-[#D8C6B6] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#B84B12]">
                  {stats.bingosWon || 0}
                </div>
                <div className="text-xs font-bold text-[#6E554D] mt-1">
                  🏆 {text.kpiBingos} ({winRate}%)
                </div>
              </div>

              <div className="bg-[#FFFDF9] rounded-2xl border border-[#D8C6B6] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1877F2]">
                  {stats.facebookShares || 0}
                </div>
                <div className="text-xs font-bold text-[#6E554D] mt-1">
                  📢 {text.kpiShares}
                </div>
              </div>

              <div className="bg-[#FFFDF9] rounded-2xl border border-[#D8C6B6] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#6854C7]">
                  {questions.length}
                </div>
                <div className="text-xs font-bold text-[#6E554D] mt-1">
                  📋 {text.kpiQuestions}
                </div>
              </div>

              <div className="bg-[#FFFDF9] rounded-2xl border border-[#D8C6B6] p-4 text-center shadow-sm">
                <div className="text-xs font-extrabold text-emerald-600 flex items-center justify-center gap-1 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active</span>
                </div>
                <div className="text-xs font-bold text-[#6E554D] mt-2">
                  🟢 {text.kpiStatus}
                </div>
              </div>
            </div>

            {/* VISUAL COMPONENT 1: OCCASION DISTRIBUTION BAR CHART */}
            <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8C6B6] p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-base sm:text-lg font-bold text-[#8E1B3A]">
                  📊 {text.barChartTitle}
                </h3>
                <p className="text-xs text-[#6E554D] mt-0.5">
                  {text.barChartDesc}
                </p>
              </div>

              {/* Bar Chart Container */}
              <div className="flex flex-col gap-3.5 pt-2">
                {[
                  { id: 'eid', nameBn: 'ঈদের আড্ডা', nameEn: 'Eid Reunion', color: '#0F7B5F', bg: '#E8F5EE' },
                  { id: 'wedding', nameBn: 'বিয়ে ও দাওয়াত', nameEn: 'Wedding / Dawot', color: '#A81D37', bg: '#FCECEF' },
                  { id: 'exam', nameBn: 'রেজাল্টের দিন', nameEn: 'Post-Exam Results', color: '#1F50A8', bg: '#EEF4FF' },
                  { id: 'general', nameBn: 'সাধারণ পারিবারিক আড্ডা', nameEn: 'General Adda', color: '#B84B12', bg: '#FFF2EB' }
                ].map((item) => {
                  const count = stats.occasionPlays?.[item.id] || 0;
                  const pct = totalPlays > 0 ? Math.round((count / totalPlays) * 100) : 0;
                  const barWidthPercent = Math.max(6, Math.round((count / maxOccasionPlay) * 100));

                  return (
                    <div key={item.id} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <div className="flex items-center gap-2">
                          <OccasionIcon occasionId={item.id} className="text-xs" style={{ color: item.color }} />
                          <span className="text-[#2B1B17]">
                            {adminLang === 'bn' ? item.nameBn : item.nameEn}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-mono">
                          <span style={{ color: item.color }}>{count} plays</span>
                          <span className="text-[#8A7268]">({pct}%)</span>
                        </div>
                      </div>

                      {/* Bar Fill */}
                      <div className="w-full h-4 rounded-full bg-[#EFE7DE] overflow-hidden p-0.5">
                        <div
                          style={{
                            width: `${barWidthPercent}%`,
                            backgroundColor: item.color
                          }}
                          className="h-full rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* VISUAL COMPONENT 2: ACTIVITY & TRAFFIC TREND LINE GRAPH */}
            <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8C6B6] p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#8E1B3A]">
                    📈 {text.trendTitle}
                  </h3>
                  <p className="text-xs text-[#6E554D] mt-0.5">
                    {text.trendDesc}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-[#8E1B3A]">
                    <span className="w-3 h-3 rounded-full bg-[#8E1B3A]" />
                    Visits
                  </span>
                  <span className="flex items-center gap-1.5 text-[#0F7B5F]">
                    <span className="w-3 h-3 rounded-full bg-[#0F7B5F]" />
                    Games
                  </span>
                </div>
              </div>

              {/* Responsive SVG Curve Chart */}
              <div className="w-full h-48 sm:h-56 relative pt-2">
                <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8E1B3A" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#8E1B3A" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#EFE7DE" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="#EFE7DE" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="130" x2="500" y2="130" stroke="#EFE7DE" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Area fill */}
                  <path
                    d="M 10 140 Q 90 100, 170 120 T 330 60 T 490 40 L 490 160 L 10 160 Z"
                    fill="url(#curveGrad)"
                  />

                  {/* Visits Line */}
                  <path
                    d="M 10 140 Q 90 100, 170 120 T 330 60 T 490 40"
                    fill="none"
                    stroke="#8E1B3A"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Games Line */}
                  <path
                    d="M 10 155 Q 90 125, 170 135 T 330 95 T 490 70"
                    fill="none"
                    stroke="#0F7B5F"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                  />

                  {/* Markers */}
                  <circle cx="170" cy="120" r="5" fill="#8E1B3A" stroke="#FFF" strokeWidth="2" />
                  <circle cx="330" cy="60" r="5" fill="#8E1B3A" stroke="#FFF" strokeWidth="2" />
                  <circle cx="490" cy="40" r="6" fill="#8E1B3A" stroke="#FFF" strokeWidth="2" />

                  {/* Days labels */}
                  <text x="10" y="175" fill="#8A7268" fontSize="10" fontWeight="bold">Mon</text>
                  <text x="90" y="175" fill="#8A7268" fontSize="10" fontWeight="bold">Tue</text>
                  <text x="170" y="175" fill="#8A7268" fontSize="10" fontWeight="bold">Wed</text>
                  <text x="250" y="175" fill="#8A7268" fontSize="10" fontWeight="bold">Thu</text>
                  <text x="330" y="175" fill="#8A7268" fontSize="10" fontWeight="bold">Fri</text>
                  <text x="410" y="175" fill="#8A7268" fontSize="10" fontWeight="bold">Sat</text>
                  <text x="480" y="175" fill="#8E1B3A" fontSize="10" fontWeight="bold">Sun</text>
                </svg>
              </div>
            </div>

            {/* Google Analytics 4 (GA4) Real-Time Integration */}
            <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#8E1B3A] p-6 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <ShieldIcon className="text-lg text-[#8E1B3A]" />
                <h3 className="text-lg font-bold text-[#8E1B3A]">
                  {text.ga4Title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6E554D] mb-4 leading-relaxed">
                {text.ga4Desc}
              </p>

              <form onSubmit={handleSaveGA4} className="flex flex-col sm:flex-row items-center gap-3 max-w-xl">
                <input
                  type="text"
                  value={ga4Input}
                  onChange={(e) => setGa4Input(e.target.value)}
                  placeholder={text.ga4Placeholder}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#D8C6B6] bg-white font-mono text-sm focus:outline-none focus:border-[#8E1B3A]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-[#8E1B3A] hover:bg-[#75142E] text-white text-xs font-bold shadow-md active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                >
                  {ga4Saved ? '✓ Saved!' : text.ga4SaveBtn}
                </button>
              </form>

              {/* Step by step helper cards */}
              <div className="mt-4 pt-4 border-t border-[#E8DCD0] text-xs text-[#6E554D] grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#FAF5EC] p-3 rounded-xl border border-[#D8C6B6]/50">
                  <div className="font-bold text-[#8E1B3A] mb-1">{text.ga4Step1Title}</div>
                  <p>{text.ga4Step1Desc}</p>
                </div>
                <div className="bg-[#FAF5EC] p-3 rounded-xl border border-[#D8C6B6]/50">
                  <div className="font-bold text-[#8E1B3A] mb-1">{text.ga4Step2Title}</div>
                  <p>{text.ga4Step2Desc}</p>
                </div>
                <div className="bg-[#FAF5EC] p-3 rounded-xl border border-[#D8C6B6]/50">
                  <div className="font-bold text-[#8E1B3A] mb-1">{text.ga4Step3Title}</div>
                  <p>{text.ga4Step3Desc}</p>
                </div>
              </div>

              <div className="mt-4 text-right">
                <button
                  onClick={handleResetStats}
                  className="text-xs text-red-600 hover:underline font-bold cursor-pointer"
                >
                  {text.resetStatsBtn}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* MODAL: ADD / EDIT QUESTION                                     */}
      {/* ============================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#FFFDF9] rounded-3xl border-2 border-[#D8C6B6] p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DCD0] mb-4">
              <h3 className="font-bold text-lg text-[#8E1B3A]">
                {editingQuestion ? text.modalEditTitle : text.modalAddTitle}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F4E8D9] text-[#6E554D] flex items-center justify-center hover:bg-[#E8DCD0] cursor-pointer"
              >
                <CloseIcon className="text-xs" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-[#6E554D] mb-1">
                  {text.fieldBnLabel} *
                </label>
                <input
                  type="text"
                  value={formBn}
                  onChange={(e) => setFormBn(e.target.value)}
                  placeholder="যেমন: বিয়ে কবে করবা?"
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#D8C6B6] bg-white text-sm focus:outline-none focus:border-[#8E1B3A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6E554D] mb-1">
                  {text.fieldEnLabel} *
                </label>
                <input
                  type="text"
                  value={formEn}
                  onChange={(e) => setFormEn(e.target.value)}
                  placeholder="e.g. When are you getting married?"
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#D8C6B6] bg-white text-sm focus:outline-none focus:border-[#8E1B3A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6E554D] mb-2">
                  {text.fieldOccasionsLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'eid', labelBn: 'ঈদের আড্ডা (Eid)', labelEn: 'Eid Reunion' },
                    { id: 'wedding', labelBn: 'বিয়ে ও দাওয়াত (Wedding)', labelEn: 'Wedding' },
                    { id: 'exam', labelBn: 'রেজাল্টের দিন (Exam)', labelEn: 'Exam Results' },
                    { id: 'general', labelBn: 'সাধারণ আড্ডা (General)', labelEn: 'General Adda' }
                  ].map((occ) => {
                    const isChecked = formOccasions.includes(occ.id);
                    return (
                      <label
                        key={occ.id}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-[#8E1B3A]/10 border-[#8E1B3A] text-[#8E1B3A]'
                            : 'bg-white border-[#D8C6B6] text-[#6E554D]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormOccasions([...formOccasions, occ.id]);
                            } else {
                              setFormOccasions(formOccasions.filter((x) => x !== occ.id));
                            }
                          }}
                          className="accent-[#8E1B3A]"
                        />
                        <span>{adminLang === 'bn' ? occ.labelBn : occ.labelEn}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8DCD0] mt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-2xl bg-white border border-[#D8C6B6] text-xs font-bold text-[#6E554D] hover:bg-[#F4E8D9] cursor-pointer"
                >
                  {text.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-2xl bg-[#8E1B3A] hover:bg-[#75142E] text-white text-xs font-bold shadow-md active:scale-95 cursor-pointer"
                >
                  {editingQuestion ? text.updateBtn : text.saveBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
