import React, { useState, useMemo } from 'react';
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
  ArrowLeftIcon
} from './FontAwesomeIcons';

const ADMIN_PIN_KEY = 'aunty_admin_pin';

export default function AdminPanel({ lang = 'bn', onBackToGame }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'analytics'

  // Question Management State
  const [questions, setQuestions] = useState(() => getStoredQuestions());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOccasionFilter, setSelectedOccasionFilter] = useState('all');
  const [editingQuestion, setEditingQuestion] = useState(null); // null or question object
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Form State for Add/Edit
  const [formEn, setFormEn] = useState('');
  const [formBn, setFormBn] = useState('');
  const [formOccasions, setFormOccasions] = useState(['general']);

  // Analytics State
  const [stats, setStats] = useState(() => getAnalyticsStats());
  const [ga4Input, setGa4Input] = useState(() => getGA4MeasurementId());
  const [ga4Saved, setGa4Saved] = useState(false);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // PIN verification
  const handleVerifyPin = (e) => {
    e.preventDefault();
    const storedPin = localStorage.getItem(ADMIN_PIN_KEY) || '1234';
    if (enteredPin === storedPin) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError(lang === 'bn' ? 'ভুল পিন কোড! ডিফল্ট পিন: 1234' : 'Incorrect PIN! Default PIN: 1234');
    }
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

  // Save Add or Edit
  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!formEn.trim() || !formBn.trim()) {
      alert(lang === 'bn' ? 'ইংরেজি ও বাংলা উভয় প্রশ্ন পূরণ করুন!' : 'Please fill both English and Bengali text.');
      return;
    }

    if (editingQuestion) {
      const updated = updateQuestion(editingQuestion.id, {
        en: formEn,
        bn: formBn,
        occasions: formOccasions
      });
      setQuestions(updated);
      showToast(lang === 'bn' ? 'প্রশ্ন সফলভাবে আপডেট হয়েছে!' : 'Question updated successfully!');
    } else {
      addQuestion({
        en: formEn,
        bn: formBn,
        occasions: formOccasions
      });
      setQuestions(getStoredQuestions());
      showToast(lang === 'bn' ? 'নতুন প্রশ্ন যোগ হয়েছে!' : 'New question added successfully!');
    }

    setIsAddModalOpen(false);
  };

  // Delete Question
  const handleDelete = (id) => {
    if (window.confirm(lang === 'bn' ? 'আপনি কি নিশ্চিত এই প্রশ্নটি ডিলিট করতে চান?' : 'Are you sure you want to delete this question?')) {
      const updated = deleteQuestion(id);
      setQuestions(updated);
      showToast(lang === 'bn' ? 'প্রশ্ন মুছে ফেলা হয়েছে।' : 'Question deleted.');
    }
  };

  // Reset to default 164 phrases
  const handleResetDefaults = () => {
    if (window.confirm(lang === 'bn' ? 'সব প্রশ্ন রিসেট করে মূল ১৬৪টি প্রশ্নে ফিরিয়ে নিতে চান?' : 'Reset all questions back to original 164 presets?')) {
      const restored = resetQuestionsToDefault();
      setQuestions(restored);
      showToast(lang === 'bn' ? 'মূল প্রশ্নে রিসেট সম্পন্ন!' : 'Reset to factory questions complete!');
    }
  };

  // Import JSON File
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
          showToast(lang === 'bn' ? `${result.count}টি প্রশ্ন সফলভাবে ইমপোর্ট হয়েছে!` : `Imported ${result.count} questions!`);
        } else {
          alert('Import failed: ' + result.error);
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
    showToast(lang === 'bn' ? 'গুগল অ্যানালিটিক্স ৪ আইডি সেভ হয়েছে!' : 'Google Analytics 4 ID saved!');
    setTimeout(() => setGa4Saved(false), 3000);
  };

  // Reset Analytics Stats
  const handleResetStats = () => {
    if (window.confirm(lang === 'bn' ? 'সব লোকাল অ্যানালিটিক্স ডেটা মুছে ফেলতে চান?' : 'Reset all local stats?')) {
      setStats(resetAnalyticsStats());
      showToast(lang === 'bn' ? 'অ্যানালিটিক্স ডেটা রিসেট হয়েছে।' : 'Analytics reset.');
    }
  };

  // If not authenticated, show PIN entry screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF6E5] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#FFFDF9] rounded-3xl border-2 border-[#D8C6B6] p-6 sm:p-8 shadow-2xl text-center animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-[#8E1B3A]/10 text-[#8E1B3A] flex items-center justify-center mx-auto mb-4 text-2xl">
            <LockIcon />
          </div>
          <h1 className="text-2xl font-bold text-[#8E1B3A]">
            {lang === 'bn' ? 'অ্যাডমিন প্যানেল লগইন' : 'Creator Admin Access'}
          </h1>
          <p className="text-xs sm:text-sm text-[#6E554D] mt-1 mb-6">
            {lang === 'bn'
              ? 'প্রশ্ন নিয়ন্ত্রণ ও ইউজার মনিটরিং ড্যাশবোর্ডে প্রবেশ করতে পিন কোড দিন (ডিফল্ট: 1234)'
              : 'Enter your Admin PIN to manage questions and monitor traffic (Default: 1234)'}
          </p>

          <form onSubmit={handleVerifyPin} className="flex flex-col gap-3">
            <input
              type="password"
              maxLength={8}
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              placeholder="PIN: 1234"
              className="w-full px-4 py-3 rounded-2xl border-2 border-[#D8C6B6] focus:border-[#8E1B3A] focus:outline-none text-center font-mono text-lg tracking-widest bg-white"
              autoFocus
            />
            {pinError && <p className="text-xs text-red-600 font-bold">{pinError}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#8E1B3A] hover:bg-[#75142E] text-white font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {lang === 'bn' ? 'প্রবেশ করুন' : 'Unlock Dashboard'}
            </button>
            <button
              type="button"
              onClick={onBackToGame}
              className="text-xs text-[#6E554D] hover:text-[#8E1B3A] font-semibold mt-2 cursor-pointer"
            >
              ← {lang === 'bn' ? 'গেমে ফিরে যান' : 'Back to Game'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF6E5] text-[#2B1B17] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2B1B17] text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-2xl shadow-xl animate-in slide-in-from-top-2 duration-150">
          {toastMsg}
        </div>
      )}

      {/* Top Navbar */}
      <header className="w-full bg-[#FFFDF9] border-b border-[#D8C6B6] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToGame}
            className="w-9 h-9 rounded-xl bg-[#F4E8D9] hover:bg-[#E8DCD0] text-[#8E1B3A] flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
            title="Back to Game"
          >
            <ArrowLeftIcon className="text-sm" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg sm:text-xl text-[#8E1B3A]">
                {lang === 'bn' ? 'আন্টি বিঙ্গো ক্রিয়েটর হাব' : 'Aunty Bingo Creator Hub'}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-[#8E1B3A]/10 text-[#8E1B3A] px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
            <p className="text-[11px] text-[#6E554D]">
              {lang === 'bn' ? 'প্রশ্ন ব্যবস্থাপনা ও রিয়েল-টাইম ইউজার ট্র্যাকিং' : 'Question Management & User Monitoring'}
            </p>
          </div>
        </div>

        {/* Tab Switcher & Return */}
        <div className="flex items-center gap-2">
          <div className="flex bg-[#F4E8D9] p-1 rounded-2xl border border-[#D8C6B6]/60">
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'questions'
                  ? 'bg-[#8E1B3A] text-white shadow-sm'
                  : 'text-[#6E554D] hover:text-[#8E1B3A]'
              }`}
            >
              📋 {lang === 'bn' ? 'প্রশ্নসমূহ' : 'Questions'} ({questions.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#8E1B3A] text-white shadow-sm'
                  : 'text-[#6E554D] hover:text-[#8E1B3A]'
              }`}
            >
              📊 {lang === 'bn' ? 'ট্রাফিক ও মনিটরিং' : 'Monitoring'}
            </button>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs font-bold text-[#8E1B3A] hover:bg-[#F4E8D9] px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
            title="Lock Dashboard"
          >
            <LockIcon className="text-xs" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* ============================================================== */}
        {/* TAB 1: QUESTION CONTROL & MANAGEMENT                          */}
        {/* ============================================================== */}
        {activeTab === 'questions' && (
          <div className="flex flex-col gap-6">
            {/* Action Bar */}
            <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8C6B6] p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search & Occasion Filter */}
              <div className="flex flex-wrap items-center gap-2.5 flex-1 max-w-2xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'bn' ? 'প্রশ্ন সার্চ করুন (বাংলা বা ইংরেজি)...' : 'Search questions by text...'}
                  className="flex-1 min-w-[200px] px-4 py-2.5 rounded-2xl border border-[#D8C6B6] bg-white text-sm focus:outline-none focus:border-[#8E1B3A]"
                />
                <select
                  value={selectedOccasionFilter}
                  onChange={(e) => setSelectedOccasionFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-2xl border border-[#D8C6B6] bg-white text-xs font-bold text-[#6E554D] focus:outline-none focus:border-[#8E1B3A] cursor-pointer"
                >
                  <option value="all">{lang === 'bn' ? 'সকল আয়োজন (All)' : 'All Occasions'}</option>
                  <option value="eid">{lang === 'bn' ? 'ঈদের আড্ডা (Eid)' : 'Eid Reunion'}</option>
                  <option value="wedding">{lang === 'bn' ? 'বিয়ে ও দাওয়াত (Wedding)' : 'Wedding'}</option>
                  <option value="exam">{lang === 'bn' ? 'রেজাল্টের দিন (Exam)' : 'Exam Results'}</option>
                  <option value="general">{lang === 'bn' ? 'সাধারণ আড্ডা (General)' : 'General Adda'}</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2.5 rounded-2xl bg-[#8E1B3A] hover:bg-[#75142E] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <span>+</span>
                  <span>{lang === 'bn' ? 'নতুন প্রশ্ন যোগ করুন' : 'Add Question'}</span>
                </button>
                <button
                  onClick={exportQuestionsAsJSON}
                  className="px-3.5 py-2.5 rounded-2xl bg-white border border-[#D8C6B6] hover:bg-[#F9F4ED] text-[#6E554D] text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                  title="Export questions to phrases.json"
                >
                  <DownloadIcon className="text-xs" />
                  <span>{lang === 'bn' ? 'এক্সপোর্ট JSON' : 'Export JSON'}</span>
                </button>
                <label className="px-3.5 py-2.5 rounded-2xl bg-white border border-[#D8C6B6] hover:bg-[#F9F4ED] text-[#6E554D] text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer">
                  <span>📥</span>
                  <span>{lang === 'bn' ? 'ইমপোর্ট' : 'Import'}</span>
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
                  title="Reset to 164 presets"
                >
                  <RotateLeftIcon className="text-xs" />
                  <span>{lang === 'bn' ? 'রিসেট' : 'Reset'}</span>
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8C6B6] overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-[#E8DCD0] flex items-center justify-between bg-[#FBF6EE]">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#6E554D]">
                  {lang === 'bn' ? 'মোট প্রশ্নসমূহ' : 'Questions List'} ({filteredQuestions.length})
                </span>
                <span className="text-xs text-[#8A7268]">
                  {lang === 'bn' ? 'পরিবর্তনসমূহ সাথে সাথে গেমে কাজ করবে' : 'Changes apply immediately in the live game'}
                </span>
              </div>

              {filteredQuestions.length === 0 ? (
                <div className="p-12 text-center text-[#8A7268]">
                  <p className="text-base font-bold">{lang === 'bn' ? 'কোনো প্রশ্ন পাওয়া যায়নি' : 'No questions matched your search.'}</p>
                </div>
              ) : (
                <div className="divide-y divide-[#EFE7DE] max-h-[600px] overflow-y-auto">
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
                                {occ ? (lang === 'bn' ? occ.nameBn : occ.nameEn) : occId}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Edit / Delete Buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleOpenEdit(q)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-[#D8C6B6] text-xs font-bold text-[#2B1B17] hover:bg-[#F4E8D9] shadow-sm transition-transform active:scale-95 cursor-pointer"
                        >
                          {lang === 'bn' ? 'এডিট' : 'Edit'}
                        </button>
                        <button
                          onClick={() => handleDelete(q.id)}
                          className="px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-600 hover:bg-red-100 shadow-sm transition-transform active:scale-95 cursor-pointer"
                        >
                          {lang === 'bn' ? 'মুছুন' : 'Delete'}
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
        {/* TAB 2: ANALYTICS & TRAFFIC MONITORING                         */}
        {/* ============================================================== */}
        {activeTab === 'analytics' && (
          <div className="flex flex-col gap-6">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="bg-[#FFFDF9] rounded-2xl border border-[#D8C6B6] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#8E1B3A]">
                  {stats.pageViews || 0}
                </div>
                <div className="text-xs font-bold text-[#6E554D] mt-1">
                  👥 {lang === 'bn' ? 'পেজ ভিজিট' : 'Page Visits'}
                </div>
              </div>

              <div className="bg-[#FFFDF9] rounded-2xl border border-[#D8C6B6] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F7B5F]">
                  {stats.gamesStarted || 0}
                </div>
                <div className="text-xs font-bold text-[#6E554D] mt-1">
                  🎮 {lang === 'bn' ? 'গেম শুরু' : 'Games Started'}
                </div>
              </div>

              <div className="bg-[#FFFDF9] rounded-2xl border border-[#D8C6B6] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#B84B12]">
                  {stats.bingosWon || 0}
                </div>
                <div className="text-xs font-bold text-[#6E554D] mt-1">
                  🏆 {lang === 'bn' ? 'বিঙ্গো জয়' : 'Bingos Won'}
                </div>
              </div>

              <div className="bg-[#FFFDF9] rounded-2xl border border-[#D8C6B6] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1877F2]">
                  {stats.facebookShares || 0}
                </div>
                <div className="text-xs font-bold text-[#6E554D] mt-1">
                  📢 {lang === 'bn' ? 'ফেসবুক শেয়ার' : 'FB Shares'}
                </div>
              </div>

              <div className="bg-[#FFFDF9] rounded-2xl border border-[#D8C6B6] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#6854C7]">
                  {stats.cardDownloads || 0}
                </div>
                <div className="text-xs font-bold text-[#6E554D] mt-1">
                  📸 {lang === 'bn' ? 'কার্ড ডাউনলোড' : 'Downloads'}
                </div>
              </div>

              <div className="bg-[#FFFDF9] rounded-2xl border border-[#D8C6B6] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#39B980]">
                  {stats.tilesMarked || 0}
                </div>
                <div className="text-xs font-bold text-[#6E554D] mt-1">
                  🎯 {lang === 'bn' ? 'জেরা মার্ক' : 'Tiles Marked'}
                </div>
              </div>
            </div>

            {/* Google Analytics 4 (GA4) Real-Time Monitoring Integration Card */}
            <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#8E1B3A] p-6 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <ShieldIcon className="text-lg text-[#8E1B3A]" />
                <h3 className="text-lg font-bold text-[#8E1B3A]">
                  {lang === 'bn' ? 'গুগল অ্যানালিটিক্স ৪ (GA4) ফ্রি ট্র্যাকিং সেটাপ' : 'Google Analytics 4 (GA4) Free Tracking'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6E554D] mb-4 leading-relaxed">
                {lang === 'bn'
                  ? 'গুগল অ্যানালিটিক্স ৪ সম্পূর্ণ ফ্রি। এটি আপনার গেমে কে আসছে, কোন শহর বা দেশ থেকে খেলছে, মোবাইল নাকি ল্যাপটপ থেকে খেলছে—সব লাইভ দেখতে দেয়।'
                  : 'Google Analytics 4 is 100% free. It tracks live users, countries, cities, and device types in real-time without needing a backend server.'}
              </p>

              <form onSubmit={handleSaveGA4} className="flex flex-col sm:flex-row items-center gap-3 max-w-xl">
                <input
                  type="text"
                  value={ga4Input}
                  onChange={(e) => setGa4Input(e.target.value)}
                  placeholder="G-XXXXXXXXXX (e.g. G-K982BKL7PQ)"
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#D8C6B6] bg-white font-mono text-sm focus:outline-none focus:border-[#8E1B3A]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-[#8E1B3A] hover:bg-[#75142E] text-white text-xs font-bold shadow-md active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                >
                  {ga4Saved ? '✓ Saved!' : (lang === 'bn' ? 'সেভ ও চালু করুন' : 'Save & Activate')}
                </button>
              </form>

              {/* Step by step helper */}
              <div className="mt-4 pt-4 border-t border-[#E8DCD0] text-xs text-[#6E554D] grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#FAF5EC] p-3 rounded-xl border border-[#D8C6B6]/50">
                  <div className="font-bold text-[#8E1B3A] mb-1">১. ফ্রি একাউন্ট খুলুন</div>
                  <p>analytics.google.com এ গিয়ে আপনার গুগল একাউন্ট দিয়ে একটি ফ্রি Web Property তৈরি করুন।</p>
                </div>
                <div className="bg-[#FAF5EC] p-3 rounded-xl border border-[#D8C6B6]/50">
                  <div className="font-bold text-[#8E1B3A] mb-1">২. Measurement ID কপি করুন</div>
                  <p>Data Streams থেকে `G-` দিয়ে শুরু হওয়া Measurement ID টি কপি করে উপরের বক্সে বসিয়ে Save চাপুন।</p>
                </div>
                <div className="bg-[#FAF5EC] p-3 rounded-xl border border-[#D8C6B6]/50">
                  <div className="font-bold text-[#8E1B3A] mb-1">৩. রিয়েল-টাইম ভিজিটর দেখুন</div>
                  <p>Google Analytics ড্যাশবোর্ডের "Realtime" ট্যাবে গেলেই সাথে সাথে দেখতে পারবেন কয়জন লাইভ খেলছে!</p>
                </div>
              </div>
            </div>

            {/* Occasion Popularity Stats */}
            <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8C6B6] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#8E1B3A]">
                  {lang === 'bn' ? 'জনপ্রিয় আয়োজনসমূহ (Occasion Plays)' : 'Popular Occasion Gatherings'}
                </h3>
                <button
                  onClick={handleResetStats}
                  className="text-xs text-red-600 hover:underline font-bold cursor-pointer"
                >
                  {lang === 'bn' ? 'পরিসংখ্যান রিসেট করুন' : 'Reset Stats'}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['eid', 'wedding', 'exam', 'general'].map((occId) => {
                  const occ = OCCASIONS[occId];
                  const count = stats.occasionPlays?.[occId] || 0;
                  return (
                    <div
                      key={occId}
                      style={{ backgroundColor: occ?.themeBg || '#F4E8D9', borderColor: occ?.tagColor || '#D8C6B6' }}
                      className="p-4 rounded-2xl border flex flex-col items-center text-center"
                    >
                      <span className="text-2xl font-extrabold" style={{ color: occ?.tagColor || '#8E1B3A' }}>
                        {count}
                      </span>
                      <span className="text-xs font-bold mt-1 text-[#2B1B17]">
                        {lang === 'bn' ? occ?.nameBn : occ?.nameEn}
                      </span>
                    </div>
                  );
                })}
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
                {editingQuestion
                  ? (lang === 'bn' ? 'প্রশ্ন সম্পাদনা করুন' : 'Edit Question')
                  : (lang === 'bn' ? 'নতুন আন্টির প্রশ্ন যোগ করুন' : 'Add New Question')}
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
                  {lang === 'bn' ? 'বাংলা প্রশ্ন (Bengali)' : 'Bangla Question'} *
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
                  {lang === 'bn' ? 'ইংরেজি অনুবাদ (English)' : 'English Translation'} *
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
                  {lang === 'bn' ? 'প্রযোজ্য আয়োজনসমূহ (Occasions)' : 'Applicable Occasions'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'eid', label: 'ঈদের আড্ডা (Eid)' },
                    { id: 'wedding', label: 'বিয়ে ও দাওয়াত (Wedding)' },
                    { id: 'exam', label: 'রেজাল্টের দিন (Exam)' },
                    { id: 'general', label: 'সাধারণ আড্ডা (General)' }
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
                        <span>{occ.label}</span>
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
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-2xl bg-[#8E1B3A] hover:bg-[#75142E] text-white text-xs font-bold shadow-md active:scale-95 cursor-pointer"
                >
                  {editingQuestion ? (lang === 'bn' ? 'আপডেট করুন' : 'Update') : (lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
