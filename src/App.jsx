import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import RulesPage from './components/RulesPage';
import OccasionsDirectory from './components/OccasionsDirectory';
import OccasionPicker from './components/OccasionPicker';
import StatusHeader from './components/StatusHeader';
import BingoBoard from './components/BingoBoard';
import ControlsBar from './components/ControlsBar';
import ActionButtons from './components/ActionButtons';
import HowToModal from './components/HowToModal';
import BingoModal from './components/BingoModal';
import ExportModal from './components/ExportModal';
import ResetConfirmModal from './components/ResetConfirmModal';
import QuestionModal from './components/QuestionModal';
import DecorativeBorder from './components/DecorativeBorder';

import { checkBingo, isOneAway } from './utils/bingo';
import { generateBoardPhrases, OCCASIONS } from './utils/phrases';
import { playStampSound, playUnstampSound, playBingoFanfare } from './utils/sound';
import auntyAvatarUrl from './assets/mascots/aunty_avatar_perfect.png';
import { ArrowLeftIcon, Grid3x3Icon, Grid5x5Icon } from './components/FontAwesomeIcons';
import { shareToSocial } from './utils/share';
import AdminPanel from './components/AdminPanel';
import { trackEvent, initGA4 } from './utils/analytics';
import { getStoredTheme, setStoredTheme, applyTheme } from './utils/theme';

function formatTimer(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getTimeOfDay(lang) {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const isPM = hours >= 12;
  hours = hours % 12 || 12;

  if (lang === 'bn') {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const toBn = (numStr) => String(numStr).split('').map(d => bnDigits[d] || d).join('');
    const period = now.getHours() < 12 ? 'সকাল' : now.getHours() < 16 ? 'দুপুর' : now.getHours() < 19 ? 'বিকাল' : 'রাত';
    return `${period} ${toBn(hours)}:${toBn(minutes)}`;
  }

  return `${hours}:${minutes} ${isPM ? 'PM' : 'AM'}`;
}

export default function App() {
  // Navigation View: 'home' | 'game' | 'occasions' | 'rules' | 'admin'
  const [activeView, setActiveView] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.search.includes('admin') || window.location.hash.includes('admin')) {
        return 'admin';
      }
    }
    return 'home';
  });

  // Localization
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('aunty_bingo_lang') || 'bn';
  });

  // Theme Mode: 'light' | 'dark'
  const [theme, setTheme] = useState(() => getStoredTheme());

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setStoredTheme(next);
    applyTheme(next);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Grid Mode: 3 (3x3 Quick) or 5 (5x5 Classic)
  const [gridSize, setGridSize] = useState(3);

  // Occasion
  const [occasionId, setOccasionId] = useState('eid');

  // Board Data
  const [board, setBoard] = useState(() => generateBoardPhrases('eid', false, 3));
  const [markedIndices, setMarkedIndices] = useState([]);

  // Win State
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [winTime, setWinTime] = useState({ elapsed: '01:48', timeOfDay: '4:32 PM' });

  // Timer State (Auto-starts when playing)
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Sound Toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modals
  const [showHowTo, setShowHowTo] = useState(false);
  const [showBingoModal, setShowBingoModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Question Details Modal
  const [selectedQuestionTile, setSelectedQuestionTile] = useState(null);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('aunty_bingo_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Analytics & Admin Shortcuts
  useEffect(() => {
    initGA4();
    trackEvent('page_view');

    // Admin shortcut: Ctrl + Shift + A
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setActiveView((prev) => (prev === 'admin' ? 'home' : 'admin'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Live reload board if questions are edited in admin panel
    const onQuestionsUpdated = () => {
      setBoard(generateBoardPhrases(occasionId, true, gridSize));
    };
    window.addEventListener('aunty:questions_updated', onQuestionsUpdated);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('aunty:questions_updated', onQuestionsUpdated);
    };
  }, [occasionId, gridSize]);

  // Timer Tick
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  // Check Win Condition
  const { hasBingo, completedLines } = checkBingo(markedIndices, gridSize);
  const oneAway = isOneAway(markedIndices, gridSize);

  // Single Click: Toggle Tile
  const handleToggleTile = useCallback((index) => {
    if (gridSize === 5 && index === 12) return;

    // Ensure timer is running
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    setMarkedIndices((prev) => {
      const isAlreadyMarked = prev.includes(index);
      const next = isAlreadyMarked ? prev.filter((i) => i !== index) : [...prev, index];

      if (isAlreadyMarked) {
        if (soundEnabled) playUnstampSound();
        const { hasBingo: stillWon } = checkBingo(next, gridSize);
        if (!stillWon) setHasCelebrated(false);
      } else {
        if (soundEnabled) playStampSound();
        trackEvent('tile_mark', { phraseId: board[index]?.id });
        const { hasBingo: wonNow } = checkBingo(next, gridSize);
        if (wonNow && !hasCelebrated) {
          setHasCelebrated(true);
          trackEvent('bingo_win', { occasionId, gridSize });
          const elapsed = formatTimer(seconds);
          const timeOfDay = getTimeOfDay(lang);
          setWinTime({ elapsed, timeOfDay });

          if (soundEnabled) {
            playBingoFanfare();
          }

          setTimeout(() => {
            setShowBingoModal(true);
          }, 350);
        }
      }

      return next;
    });
  }, [gridSize, isTimerRunning, seconds, soundEnabled, hasCelebrated, lang, board, occasionId]);

  // Double Click / Accidental Click: Immediately unmark tile back to original state
  const handleUnmarkTile = useCallback((index) => {
    if (gridSize === 5 && index === 12) return;

    setMarkedIndices((prev) => {
      if (!prev.includes(index)) return prev;
      if (soundEnabled) playUnstampSound();
      const next = prev.filter((i) => i !== index);
      const { hasBingo: stillWon } = checkBingo(next, gridSize);
      if (!stillWon) {
        setHasCelebrated(false);
      }
      return next;
    });
  }, [gridSize, soundEnabled]);

  // Mode Switch (3x3 vs 5x5)
  const handleSwitchGridSize = (newSize) => {
    if (newSize === gridSize) return;
    setGridSize(newSize);
    setBoard(generateBoardPhrases(occasionId, false, newSize));
    setMarkedIndices(newSize === 5 ? [12] : []);
    setHasCelebrated(false);
    setSeconds(0);
    setIsTimerRunning(true); // Auto-start timer
  };

  // Change Occasion
  const handleSelectOccasion = (newOccasionId) => {
    setOccasionId(newOccasionId);
    setBoard(generateBoardPhrases(newOccasionId, true, gridSize));
    setMarkedIndices(gridSize === 5 ? [12] : []);
    setHasCelebrated(false);
    setSeconds(0);
    setIsTimerRunning(true); // Auto-start timer
  };

  // Occasion select and play immediately from Landing / Occasions page
  const handleSelectAndPlay = (newOccasionId) => {
    handleSelectOccasion(newOccasionId);
    setActiveView('game');
    setIsTimerRunning(true); // Auto-start timer
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset from Start: questions restart fresh from the beginning, timer resets and auto-starts!
  const handleResetFromStart = () => {
    // Generate fresh board starting from the beginning
    setBoard(generateBoardPhrases(occasionId, false, gridSize));
    setMarkedIndices(gridSize === 5 ? [12] : []);
    setHasCelebrated(false);
    setSeconds(0);
    setIsTimerRunning(true); // Timer auto-starts
    setShowResetConfirm(false);
  };

  // Shuffle button click (prompts confirmation if tiles are marked)
  const handleShuffleClick = () => {
    const activeMarks = gridSize === 5 ? markedIndices.filter(i => i !== 12) : markedIndices;
    if (activeMarks.length > 0) {
      setShowResetConfirm(true);
    } else {
      handleResetFromStart();
    }
  };

  const handleToggleTimer = () => setIsTimerRunning(!isTimerRunning);

  const activeOccasion = OCCASIONS[occasionId] || OCCASIONS.eid;
  const timeFormatted = formatTimer(seconds);

  const handleSocialClick = useCallback((platform) => {
    if (platform === 'instagram' || platform === 'facebook') {
      setShowExportModal(true);
      return;
    }
    shareToSocial(platform, {
      lang,
      elapsedTime: timeFormatted,
      onToast: () => {}
    });
  }, [lang, timeFormatted]);

  // VIEW: CREATOR ADMIN PANEL
  if (activeView === 'admin') {
    return (
      <AdminPanel
        lang={lang}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onBackToGame={() => {
          setActiveView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF6E5] dark:bg-[#140d10] text-[#2B1B17] dark:text-[#fbf5ef] flex flex-col font-sans selection:bg-[#8E1B3A] selection:text-white transition-colors duration-300">
      {/* Decorative Gutters on Desktop */}
      <DecorativeBorder themeColor={activeOccasion.tagColor} />

      {/* Main Header with Navigation */}
      <Header
        lang={lang}
        setLang={setLang}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenHowTo={() => setShowHowTo(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          if (view === 'game') setIsTimerRunning(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* VIEW 1: LANDING PAGE */}
      {activeView === 'home' && (
        <LandingPage
          lang={lang}
          activeOccasionId={occasionId}
          onSelectOccasion={handleSelectOccasion}
          onStartPlaying={() => {
            setActiveView('game');
            setIsTimerRunning(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenHowTo={() => setShowHowTo(true)}
        />
      )}

      {/* VIEW 2: OCCASIONS DIRECTORY */}
      {activeView === 'occasions' && (
        <OccasionsDirectory
          lang={lang}
          onSelectAndPlay={handleSelectAndPlay}
          onBack={() => setActiveView('home')}
        />
      )}

      {/* VIEW 3: RULES & HOW TO PLAY */}
      {activeView === 'rules' && (
        <RulesPage
          lang={lang}
          onStartPlaying={() => {
            setActiveView('game');
            setIsTimerRunning(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBack={() => setActiveView('home')}
        />
      )}

      {/* VIEW 4: MAIN GAME BOARD VIEW */}
      {activeView === 'game' && (
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col justify-center">
          {/* Top Bar: Back to Home + Mode Switcher (3x3 vs 5x5) */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <button
              onClick={() => setActiveView('home')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8E1B3A] dark:text-[#ff7597] hover:underline cursor-pointer"
            >
              <ArrowLeftIcon className="text-xs" />
              <span>{lang === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
            </button>

            {/* Grid Size Switcher Pill */}
            <div className="flex items-center bg-[#F4E8D9] dark:bg-[#28181f] p-1 rounded-full border border-[#D8C6B6] dark:border-[#422530]">
              <button
                onClick={() => handleSwitchGridSize(3)}
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  gridSize === 3
                    ? 'bg-[#8E1B3A] text-white shadow-sm'
                    : 'text-[#6E554D] dark:text-[#c7a9b3] hover:text-[#8E1B3A] dark:hover:text-[#ff7597]'
                }`}
              >
                <Grid3x3Icon className="text-xs" />
                <span>{lang === 'bn' ? '৩×৩ কুইক' : '3×3 Quick'}</span>
              </button>
              <button
                onClick={() => handleSwitchGridSize(5)}
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  gridSize === 5
                    ? 'bg-[#8E1B3A] text-white shadow-sm'
                    : 'text-[#6E554D] dark:text-[#c7a9b3] hover:text-[#8E1B3A] dark:hover:text-[#ff7597]'
                }`}
              >
                <Grid5x5Icon className="text-xs" />
                <span>{lang === 'bn' ? '৫×৫ ক্লাসিক' : '5×5 Classic'}</span>
              </button>
            </div>
          </div>

          {/* DESKTOP LAYOUT (3 Columns: Mascot Sidebar, Board, Controls Card) */}
          <div className="hidden lg:grid grid-cols-[200px_1fr_280px] xl:grid-cols-[220px_1fr_310px] 2xl:grid-cols-[240px_1fr_330px] gap-6 items-start">
            {/* Left Column: Mascot with Clear Hands */}
            <div className="flex flex-col items-center text-center p-4">
              <h3 className="font-serif font-black text-xl text-[#8E1B3A] mb-3 leading-snug">
                {lang === 'bn' ? 'আন্টির অনেক প্রশ্ন।' : "Aunty's got questions."}
              </h3>
              <div className="w-44 h-44 my-2">
                <img
                  src={auntyAvatarUrl}
                  alt="Aunty Avatar"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              <p className="text-xs font-bold text-[#8E1B3A] mt-2">
                {lang === 'bn' ? 'আপনার আছে বিঙ্গো বোর্ড।' : "You've got a bingo board."}
              </p>
            </div>

            {/* Center Column: Status Heading & Board */}
            <div className="flex flex-col items-center">
              <StatusHeader
                markedCount={markedIndices.length}
                isOneAway={oneAway}
                hasWon={hasBingo}
                lang={lang}
                isDesktop={true}
              />

              <BingoBoard
                board={board}
                markedIndices={markedIndices}
                winningLines={completedLines}
                onToggleTile={handleToggleTile}
                onUnmarkTile={handleUnmarkTile}
                onViewFullQuestion={(tile, index) => setSelectedQuestionTile({ tile, index })}
                lang={lang}
                occasionColor={activeOccasion.tagColor}
                gridSize={gridSize}
              />

              <div className="text-center mt-3 text-xs text-[#6E554D]">
                <p className="font-bold text-[#8E1B3A]">
                  {gridSize === 5
                    ? (lang === 'bn' ? '৫ সারি • ৫ কলাম • ২ কোণাকুণি • ১২টি জয়ের লাইন' : '5 rows • 5 columns • 2 diagonals • 12 winning lines')
                    : (lang === 'bn' ? '৩ সারি • ৩ কলাম • ২ কোণাকুণি • ৮টি জয়ের লাইন' : '3 rows • 3 columns • 2 diagonals • 8 winning lines')}
                </p>
                <p className="text-[11px] mt-0.5">
                  {lang === 'bn'
                    ? 'ট্যাপ করে দাগ দিন • ভুলে ক্লিক করলে ডাবল ক্লিকে আনমার্ক করুন • সম্পূর্ণ প্রশ্ন দেখতে (i) চাপুন'
                    : 'Click to mark • Double-click to unmark if marked by mistake • Click (i) for full text'}
                </p>
              </div>
            </div>

            {/* Right Column: Occasion, Controls, Actions */}
            <div className="bg-[#FFFDF9] rounded-3xl p-5 border border-[#D8C6B6] shadow-sm flex flex-col gap-4">
              <OccasionPicker
                activeOccasionId={occasionId}
                onSelectOccasion={handleSelectOccasion}
                lang={lang}
              />

              <ControlsBar
                timeFormatted={timeFormatted}
                isRunning={isTimerRunning}
                onToggleTimer={handleToggleTimer}
                onResetAll={handleResetFromStart}
                markedCount={markedIndices.length}
                totalTiles={gridSize === 5 ? 25 : 9}
                lang={lang}
              />

              <ActionButtons
                onShuffle={handleShuffleClick}
                onReset={handleResetFromStart}
                onExport={() => setShowExportModal(true)}
                onSocialClick={handleSocialClick}
                lang={lang}
                isDesktop={true}
              />

              <p className="text-[11px] text-center text-[#8A7268] font-medium pt-2 border-t border-[#EFE7DE]">
                {lang === 'bn' ? 'অ্যাকাউন্ট নয়, শুধু আড্ডা।' : 'No accounts. Just aunties.'}
              </p>
            </div>
          </div>

          {/* MOBILE & TABLET LAYOUT */}
          <div className="lg:hidden flex flex-col items-center w-full max-w-sm sm:max-w-md mx-auto">
            <OccasionPicker
              activeOccasionId={occasionId}
              onSelectOccasion={handleSelectOccasion}
              lang={lang}
            />

            <StatusHeader
              markedCount={markedIndices.length}
              isOneAway={oneAway}
              hasWon={hasBingo}
              lang={lang}
              isDesktop={false}
            />

            <BingoBoard
              board={board}
              markedIndices={markedIndices}
              winningLines={completedLines}
              onToggleTile={handleToggleTile}
              onUnmarkTile={handleUnmarkTile}
              onViewFullQuestion={(tile, index) => setSelectedQuestionTile({ tile, index })}
              lang={lang}
              occasionColor={activeOccasion.tagColor}
              gridSize={gridSize}
            />

            <ControlsBar
              timeFormatted={timeFormatted}
              isRunning={isTimerRunning}
              onToggleTimer={handleToggleTimer}
              onResetAll={handleResetFromStart}
              markedCount={markedIndices.length}
              totalTiles={gridSize === 5 ? 25 : 9}
              lang={lang}
            />

            <ActionButtons
              onShuffle={handleShuffleClick}
              onReset={handleResetFromStart}
              onExport={() => setShowExportModal(true)}
              onSocialClick={handleSocialClick}
              lang={lang}
              isDesktop={false}
            />
          </div>
        </main>
      )}

      {/* COMPREHENSIVE APPLICATION FOOTER */}
      <Footer
        lang={lang}
        onNavigate={(view) => {
          setActiveView(view);
          if (view === 'game') setIsTimerRunning(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* MODALS */}
      <HowToModal
        isOpen={showHowTo}
        onClose={() => setShowHowTo(false)}
        lang={lang}
      />

      <BingoModal
        isOpen={showBingoModal}
        onClose={() => setShowBingoModal(false)}
        onExport={() => setShowExportModal(true)}
        onReset={handleResetFromStart}
        elapsedTime={winTime.elapsed}
        winTimeOfDay={winTime.timeOfDay}
        lang={lang}
        board={board}
        markedIndices={markedIndices}
        winningLines={completedLines}
        occasionId={occasionId}
        gridSize={gridSize}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        board={board}
        markedIndices={markedIndices}
        winningLines={completedLines}
        occasionId={occasionId}
        lang={lang}
        elapsedTime={timeFormatted}
        winTimeOfDay={getTimeOfDay(lang)}
        gridSize={gridSize}
      />

      <ResetConfirmModal
        isOpen={showResetConfirm}
        onConfirm={handleResetFromStart}
        onCancel={() => setShowResetConfirm(false)}
        lang={lang}
      />

      {/* Question Details Modal */}
      {selectedQuestionTile && (
        <QuestionModal
          tile={selectedQuestionTile.tile}
          isMarked={markedIndices.includes(selectedQuestionTile.index)}
          onToggleMark={() => handleToggleTile(selectedQuestionTile.index)}
          onClose={() => setSelectedQuestionTile(null)}
          lang={lang}
          occasionName={lang === 'bn' ? activeOccasion.nameBn : activeOccasion.nameEn}
        />
      )}
    </div>
  );
}
