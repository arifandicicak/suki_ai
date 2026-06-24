import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lesson, UserStats } from "./types";
import { LESSONS } from "./data/lessons";
import AdventureMap from "./components/AdventureMap";
import ChessGame from "./components/ChessGame";
import AIStudyCompanion from "./components/AIStudyCompanion";
import SpeechPractice from "./components/SpeechPractice";
import SukiMascot from "./components/SukiMascot";
import HistoryLibrary from "./components/HistoryLibrary";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  db, 
  handleFirestoreError, 
  OperationType, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp 
} from "./lib/firebase";

import {
  GraduationCap,
  Flame,
  Trophy,
  Sparkles,
  BookOpen,
  Crown,
  Award,
  CheckCircle2,
  Gamepad2,
  RefreshCw,
  AlertCircle,
  Clock,
  ArrowLeft,
  ChevronRight,
  Shield,
  Zap,
  BookMarked,
  Compass,
  User,
  X,
  ShieldAlert
} from "lucide-react";

interface LoggedInUser {
  uid: string;
  name: string;
  email: string;
  picture: string;
  isGuest: boolean;
}

interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  condition: (stats: UserStats) => boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "beginner_explorer",
    title: "Beginner Explorer",
    desc: "Mencapai total 100 EXP dalam petualangan belajarmu.",
    icon: "Compass",
    condition: (s) => s.exp >= 100,
  },
  {
    id: "topic_master",
    title: "Topic Master",
    desc: "Menyelesaikan seluruh 3 sub-materi di Tree Mudah.",
    icon: "BookOpen",
    condition: (s) => s.completedLessons.includes("m1") && s.completedLessons.includes("m2") && s.completedLessons.includes("m3"),
  },
  {
    id: "chess_champion",
    title: "Chess Champion",
    desc: "Memenangkan pertandingan Catur AI sebanyak 5 kali.",
    icon: "Trophy",
    condition: (s) => s.chessWins >= 5,
  }
];

const INITIAL_STATS: UserStats = {
  exp: 0,
  unlockedTrees: ["mudah"],
  completedLessons: [],
  chessWins: 0,
  gamesPlayed: 0,
  unlockedAchievements: [],
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [authLoading, setAuthLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [activeTab, setActiveTab ] = useState<"adventure" | "chess" | "history" | "guide">("adventure");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [xpToast, setXpToast] = useState<{ show: boolean; msg: string; amt: number }>({
    show: false,
    msg: "",
    amt: 0,
  });
  const [levelUpToast, setLevelUpToast] = useState<{ show: boolean; level: number } | null>(null);
  const prevLevelRef = React.useRef<number | null>(null);

  useEffect(() => {
    if (stats && typeof stats.exp === "number") {
      const currentLvl = Math.floor(stats.exp / 200) + 1;
      if (prevLevelRef.current === null) {
        prevLevelRef.current = currentLvl;
      } else if (currentLvl > prevLevelRef.current) {
        setLevelUpToast({ show: true, level: currentLvl });
        prevLevelRef.current = currentLvl;
      } else if (currentLvl < prevLevelRef.current) {
        prevLevelRef.current = currentLvl;
      }
    }
  }, [stats.exp]);
  const [achievementToast, setAchievementToast] = useState<{ show: boolean; title: string; desc: string } | null>(null);
  const [streak, setStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("suki_streak_count");
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });
  const [readBooksCount, setReadBooksCount] = useState<number>(() => {
    try {
      const arr = JSON.parse(localStorage.getItem("suki_read_books") || "[]");
      return Array.isArray(arr) ? arr.length : 0;
    } catch {
      return 0;
    }
  });
  const [streakBonusMsg, setStreakBonusMsg] = useState<string | null>(null);

  const getStatsForUser = (user: LoggedInUser | null): UserStats => {
    const key = user ? (user.isGuest ? "studysuki_user_stats_guest" : `studysuki_user_stats_${encodeURIComponent(user.email)}`) : "studysuki_user_stats_guest";
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.exp === "number") {
          return {
            exp: parsed.exp,
            unlockedTrees: parsed.unlockedTrees || ["mudah"],
            completedLessons: parsed.completedLessons || [],
            chessWins: parsed.chessWins || 0,
            gamesPlayed: parsed.gamesPlayed || 0,
            unlockedAchievements: parsed.unlockedAchievements || [],
          };
        }
      } catch (e) {
        console.error("Gagal membaca profil EXP level:", e);
      }
    }
    return INITIAL_STATS;
  };

  // 1. Core Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthLoading(true);
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const userDoc = await getDoc(userDocRef);
          let userStats: UserStats;
          
          if (userDoc.exists()) {
            const data = userDoc.data();
            userStats = {
              exp: data.exp ?? 0,
              unlockedTrees: data.unlockedTrees ?? ["mudah"],
              completedLessons: data.completedLessons ?? [],
              chessWins: data.chessWins ?? 0,
              gamesPlayed: data.gamesPlayed ?? 0,
              unlockedAchievements: data.unlockedAchievements ?? [],
            };
            if (data.streak) setStreak(data.streak);
            if (data.readBooks) {
               localStorage.setItem("suki_read_books", JSON.stringify(data.readBooks));
               setReadBooksCount(data.readBooks.length);
            }
          } else {
            userStats = INITIAL_STATS;
            await setDoc(userDocRef, {
              userId: user.uid,
              name: user.displayName || "User",
              email: user.email,
              picture: user.photoURL || "",
              ...INITIAL_STATS,
              streak: 1,
              lastActiveDate: new Date().toDateString(),
              lastActiveTimestamp: Date.now(),
              readBooks: [],
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          }

          setCurrentUser({
            uid: user.uid,
            name: user.displayName || "User",
            email: user.email || "",
            picture: user.photoURL || "",
            isGuest: false,
          });
          setStats(userStats);
        } catch (error) {
          console.error("Auth sync error:", error);
        }
      } else {
        const savedGuest = localStorage.getItem("studysuki_current_user");
        if (savedGuest) {
          try {
            const parsed = JSON.parse(savedGuest);
            if (parsed.isGuest) {
              setCurrentUser(parsed);
              setStats(getStatsForUser(parsed));
            }
          } catch {}
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Sync to Firestore on changes
  useEffect(() => {
    if (!currentUser || currentUser.isGuest) return;

    const timer = setTimeout(async () => {
      setIsSyncing(true);
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          exp: stats.exp,
          unlockedTrees: stats.unlockedTrees,
          completedLessons: stats.completedLessons,
          chessWins: stats.chessWins,
          gamesPlayed: stats.gamesPlayed,
          unlockedAchievements: stats.unlockedAchievements || [],
          streak,
          lastActiveDate: localStorage.getItem("suki_last_active_date") || new Date().toDateString(),
          lastActiveTimestamp: parseInt(localStorage.getItem("suki_last_active_timestamp") || Date.now().toString(), 10),
          readBooks: JSON.parse(localStorage.getItem("suki_read_books") || "[]"),
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Firestore sync error:", error);
      } finally {
        setIsSyncing(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [stats, currentUser, streak, readBooksCount]);

  const handleLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged handles the rest
    } catch (error) {
      console.error("Google login error:", error);
      alert("Gagal masuk dengan Google. Silakan coba lagi.");
    }
  };

  const handleLoginAsGuest = () => {
    const guestUser: LoggedInUser = {
      uid: "guest-" + Math.random().toString(36).substr(2, 9),
      name: "Tamu",
      email: "guest",
      picture: "",
      isGuest: true,
    };
    setCurrentUser(guestUser);
    setStats(getStatsForUser(guestUser));
    localStorage.setItem("studysuki_current_user", JSON.stringify(guestUser));
  };

  // Sync books read counter reactively
  useEffect(() => {
    const syncStats = () => {
      try {
        const arr = JSON.parse(localStorage.getItem("suki_read_books") || "[]");
        setReadBooksCount(Array.isArray(arr) ? arr.length : 0);
      } catch {}
    };
    window.addEventListener("suki_stats_updated", syncStats);
    window.dispatchEvent(new Event("suki_stats_updated")); // Run once on load/mount
    return () => window.removeEventListener("suki_stats_updated", syncStats);
  }, []);

  // Save stats to localStorage when they change to support Guest profile saving in real-time
  useEffect(() => {
    if (currentUser) {
      const key = currentUser.isGuest
        ? "studysuki_user_stats_guest"
        : `studysuki_user_stats_${encodeURIComponent(currentUser.email)}`;
      localStorage.setItem(key, JSON.stringify(stats));
    }
  }, [stats, currentUser]);

  // Daily Streak Tracking Logic
  useEffect(() => {
    try {
      const lastActiveStr = localStorage.getItem("suki_last_active_date");
      const streakStr = localStorage.getItem("suki_streak_count");
      const now = new Date();
      const todayStr = now.toDateString();

      let currentStreak = streakStr ? parseInt(streakStr, 10) : 0;

      if (!lastActiveStr) {
        currentStreak = 1;
        localStorage.setItem("suki_last_active_date", todayStr);
        localStorage.setItem("suki_streak_count", "1");
        localStorage.setItem("suki_last_active_timestamp", now.getTime().toString());
        setStreak(1);
      } else {
        const lastActiveTime = parseInt(localStorage.getItem("suki_last_active_timestamp") || Date.now().toString(), 10);
        const lastActiveDate = new Date(lastActiveTime);
        
        // Match calendar day diff accurately
        const t1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const t2 = new Date(lastActiveDate.getFullYear(), lastActiveDate.getMonth(), lastActiveDate.getDate());
        const diffTime = t1.getTime() - t2.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak += 1;
          const bonusEXP = Math.min(50, 10 + currentStreak * 5); // caps reward at 50 EXP
          
          localStorage.setItem("suki_last_active_date", todayStr);
          localStorage.setItem("suki_streak_count", currentStreak.toString());
          localStorage.setItem("suki_last_active_timestamp", now.getTime().toString());
          setStreak(currentStreak);
          
          // Reward XP
          setStats((prev) => ({
            ...prev,
            exp: prev.exp + bonusEXP,
          }));

          setStreakBonusMsg(`Selamat! Akumulasi login ${currentStreak} hari berturut-turut! Anda mendapat bonus +${bonusEXP} EXP! 🔥`);
        } else if (diffDays > 1) {
          currentStreak = 1;
          localStorage.setItem("suki_last_active_date", todayStr);
          localStorage.setItem("suki_streak_count", "1");
          localStorage.setItem("suki_last_active_timestamp", now.getTime().toString());
          setStreak(1);
        } else {
          if (currentStreak === 0) currentStreak = 1;
          setStreak(currentStreak);
        }
      }
      localStorage.setItem("suki_last_active_timestamp", now.getTime().toString());
    } catch (e) {
      console.error("Streak calculations failed:", e);
    }
  }, []);

  // Save current user changes to localStorage for quick hydration on refresh
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("studysuki_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("studysuki_current_user");
    }
  }, [currentUser]);

  // Handle Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setStats(INITIAL_STATS);
      localStorage.removeItem("studysuki_current_user");
      setShowProfileModal(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Continuously scan and unlock achievements in the background
  useEffect(() => {
    if (!currentUser) return;

    const currentUnlocked = stats.unlockedAchievements || [];
    const newlyUnlocked: string[] = [];

    ACHIEVEMENTS.forEach((ach) => {
      if (ach.condition(stats) && !currentUnlocked.includes(ach.id)) {
        newlyUnlocked.push(ach.id);
      }
    });

    if (newlyUnlocked.length > 0) {
      setStats((prev) => ({
        ...prev,
        unlockedAchievements: [...(prev.unlockedAchievements || []), ...newlyUnlocked],
      }));

      // Trigger achievement notifications
      newlyUnlocked.forEach((id) => {
        const ach = ACHIEVEMENTS.find((a) => a.id === id);
        if (ach) {
          setAchievementToast({
            show: true,
            title: ach.title,
            desc: ach.desc,
          });
        }
      });
    }
  }, [stats.exp, stats.completedLessons, stats.chessWins, currentUser]);

  // Flash XP rewards notifier
  const triggerXpNotice = (amount: number, message: string) => {
    setXpToast({ show: true, msg: message, amt: amount });
    const timer = setTimeout(() => {
      setXpToast((prev) => ({ ...prev, show: false }));
    }, 4500);
    return () => clearTimeout(timer);
  };

  // Give target EXP and reward UI
  const awardXP = (amount: number, message: string) => {
    setStats((prev) => ({
      ...prev,
      exp: prev.exp + amount,
    }));
    triggerXpNotice(amount, message);
  };

  // Safely wrap triggerXNotice
  const triggerX_Notice = (amount: number, message: string) => {
    setXpToast({ show: true, msg: message, amt: amount });
  };

  // Compute Rank/Title and Progress ratios based on accumulated EXP
  const getRankInfo = (exp: number) => {
    if (exp < 200) {
      return {
        title: "Pemula Pintar 🌟",
        min: 0,
        max: 200,
        pct: Math.min((exp / 200) * 100, 100),
        color: "from-emerald-500 to-emerald-600",
        bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
        badge: "Pemula"
      };
    } else if (exp < 500) {
      return {
        title: "Pejuang Kode 🚀",
        min: 200,
        max: 500,
        pct: Math.min(((exp - 200) / 300) * 100, 100),
        color: "from-emerald-600 to-teal-500",
        bg: "bg-teal-50 border-teal-200 text-teal-800",
        badge: "Pejuang"
      };
    } else if (exp < 1000) {
      return {
        title: "Sarjana Algoritma 🎓",
        min: 500,
        max: 1000,
        pct: Math.min(((exp - 500) / 500) * 100, 100),
        color: "from-emerald-500 to-amber-500",
        bg: "bg-amber-50 border-amber-200 text-amber-900",
        badge: "Sarjana"
      };
    } else {
      return {
        title: "Grandmaster AI 💎",
        min: 1000,
        max: 2500,
        pct: Math.min(((exp - 1000) / 1500) * 100, 100),
        color: "from-emerald-600 to-stone-800",
        bg: "bg-emerald-100 border-emerald-300 text-emerald-900",
        badge: "Grandmaster"
      };
    }
  };

  const rank = getRankInfo(stats.exp);
  const currentLevel = Math.floor(stats.exp / 200) + 1;

  // Trigger unlocking a tree gate
  const handleUnlockTree = (tree: "sedang" | "susah", cost: number) => {
    if (stats.exp >= cost) {
      setStats((prev) => {
        // Double check they don't buy it twice
        if (prev.unlockedTrees.includes(tree)) return prev;

        return {
          ...prev,
          exp: prev.exp - cost,
          unlockedTrees: [...prev.unlockedTrees, tree],
        };
      });
      awardXP(0, `Sukses membeli gerbang Tree ${tree.toUpperCase()}`);
    } else {
      alert("Your EXP is not enough to unlock this level!");
    }
  };

  // Handle lesson selected
  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    // Reset quiz options for the new material
    setSelectedOption(null);
    setQuizSubmitted(false);
    setQuizFeedback(null);
  };

  // Validate submitted Quiz answer
  const handleSubmitQuiz = () => {
    if (selectedOption === null || !selectedLesson) return;

    const quiz = selectedLesson.quiz;
    const isCorrect = selectedOption === quiz.answerIndex;
    const alreadyCompleted = stats.completedLessons.includes(selectedLesson.id);

    setQuizSubmitted(true);

    if (isCorrect) {
      setQuizFeedback({
        isCorrect: true,
        text: `Hebat sekali! Jawabanmu benar. ${quiz.explanation}`,
      });

      if (!alreadyCompleted) {
        // Award the +50 EXP
        setStats((prev) => ({
          ...prev,
          completedLessons: [...prev.completedLessons, selectedLesson.id],
          exp: prev.exp + 50,
        }));
        triggerXpNotice(50, `Menyelesaikan sub-materi: ${selectedLesson.title}`);
      }
    } else {
      setQuizFeedback({
        isCorrect: false,
        text: `Kurang tepat. Coba tinjau kembali penjelasan materi di atas. \nAnalisis: ${quiz.explanation}`,
      });
    }
  };

  // Trigger reward for winning a chess match
  const handleWinChessGame = () => {
    setStats((prev) => ({
      ...prev,
      exp: prev.exp + 50,
      chessWins: prev.chessWins + 1,
      gamesPlayed: prev.gamesPlayed + 1,
    }));
    triggerXpNotice(50, "Memenangkan tantangan Catur AI!");
  };



  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d121a]">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-center">
            <h2 className="text-white font-sans font-bold text-xl">StudySuki AI</h2>
            <p className="text-emerald-500 font-mono text-xs mt-2 animate-pulse font-bold">MENGHUBUNGKAN AKUN...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
        
        {/* Transparent outer wrapper allows Suki's blackboard-bg and decorative formulas from index.html to shine */}
        <div className="absolute inset-0 bg-[#0d121a]/60 z-0"></div>

        {/* Core Screen Container */}
        <div id="login-container-card" className="w-full max-w-lg bg-white border-4 border-stone-200 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative z-10 text-center space-y-8 animate-fade-in text-stone-900">
          
          {/* Aesthetic Logo Header */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden flex items-center justify-center shadow-lg relative bg-white border border-stone-100">
              <img src="/logo.png" alt="StudySuki Logo" className="w-full h-full object-contain" />
            </div>
            
            <div className="space-y-1">
              <h1 className="font-sans font-extrabold text-3xl tracking-tight text-stone-900">
                StudySuki <span className="text-emerald-700">AI</span>
              </h1>
              <span className="inline-block text-[10px] uppercase font-mono font-bold tracking-widest bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-stone-200">
                v2.0 Stable • Smart Learning Platform
              </span>
            </div>

            <p className="text-xs md:text-sm text-stone-600 max-w-sm leading-relaxed">
              Jelajahi petualangan pelajaran RPG interaktif, kumpulkan EXP, selesaikan peta petualangan, dan asah taktikmu di arena catur AI.
            </p>
          </div>

          <div className="border-t border-stone-200"></div>

          {/* Buttons Area */}
          <div className="space-y-4 flex flex-col items-center w-full">
            
            <div className="flex flex-col items-center w-full space-y-3">
              <span className="text-[10px] uppercase font-mono font-black text-amber-800 tracking-wider">
                Masuk Untuk Menyimpan Progress Akun
              </span>

              {/* Secure interactive Google Account Firebase pop-up logic */}
              <button
                onClick={handleLoginWithGoogle}
                type="button"
                className="w-full py-3.5 px-5 select-none rounded-2xl border-2 border-stone-200 bg-white hover:bg-stone-50 text-stone-900 text-xs md:text-sm font-sans font-black flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Logo" className="w-4 h-4" />
                <span>Masuk dengan Google</span>
              </button>
            </div>

            <div className="flex items-center justify-center w-full gap-3 text-stone-300">
              <hr className="w-1/4 border-stone-300" />
              <span className="text-[10px] font-mono tracking-wider text-stone-400 font-bold uppercase">ATAU</span>
              <hr className="w-1/4 border-stone-300" />
            </div>

            {/* Tombol 2: Guest Mode (Tamu) */}
            <button
              onClick={handleLoginAsGuest}
              type="button"
              className="px-6 py-2.5 rounded-xl text-stone-500 hover:text-stone-850 text-xs md:text-sm font-sans font-bold transition-all hover:bg-stone-100 cursor-pointer border border-transparent hover:border-stone-300"
            >
              Masuk sebagai Tamu (Coba Dulu) →
            </button>
          </div>

          <div className="border-t border-stone-300 pt-5">
            <p className="text-[10px] text-stone-450 font-mono">
              Petualangan belajarmu tersimpan permanen di cloud Firebase jika menggunakan akun Google.
            </p>
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="h-full flex flex-col font-sans bg-[#FCFAF2]/90 backdrop-blur-[1px] text-stone-800 overflow-y-auto pb-10 relative">
      
      {/* Background paper grid motif */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8b7e66" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 1. APP HERO HEADER (WITH EXP STATISTICS) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 md:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4 relative z-10">
          
          {/* Brand Logo Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
              <img src="/logo.png" alt="StudySuki Logo" className="w-full h-full object-contain bg-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans font-extrabold text-xl tracking-tight text-stone-900">
                  StudySuki <span className="text-emerald-600">AI</span>
                </span>
                <span className="text-[10px] uppercase font-mono font-bold bg-emerald-50 text-emerald-700 py-0.5 px-2 rounded-full border border-emerald-250">
                  v2.0 Stable
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-mono tracking-wide font-bold">
                SISTEM PEMBELAJARAN ADAPTIF & RPG
              </p>
              <p className="text-[10px] text-stone-400 font-sans italic mt-0.5 max-w-[280px] leading-tight">
                Perpustakaan Adaptif & Preservasi Bahasa Daerah Indonesia. Ringan, Gratis, Tanpa Lag.
              </p>
            </div>
          </div>

          {/* User EXP Telemetry Bar System */}
          <div id="exp-telemetry-header" className="bg-stone-50 border border-stone-200 rounded-2xl px-5 py-2.5 flex-1 max-w-xl shadow-sm flex flex-col md:flex-row items-center gap-4 text-stone-700">
            {/* Rank Badge and Title */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="bg-amber-50 p-2 rounded-lg border border-amber-200 text-amber-700 animate-bounce">
                {stats.exp >= 1000 ? <Crown className="w-5 h-5" /> : <Flame className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider font-mono">Gelar Akun</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-sans font-extrabold text-stone-900">{rank.title}</p>
                  <span className="px-1.5 py-0.5 bg-indigo-50 border border-indigo-200 rounded text-[9px] text-indigo-700 font-mono font-black">
                    Lvl {currentLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* EXP Progress Bar (0 - 200 EXP for next level) */}
            <div className="w-full flex-1 pl-0 md:pl-4 md:border-l border-stone-200/50">
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span className="text-stone-500 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  Total EXP: <span className="font-bold text-stone-900">{stats.exp}</span>
                </span>
                <span className="text-stone-900 font-bold">
                  {stats.exp % 200}
                  <span className="text-stone-400 font-normal"> / 200 XP</span>
                </span>
              </div>

              {/* Level Progress track */}
              <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden flex shadow-inner border border-stone-300/40">
                <span
                  className="h-full bg-emerald-500 rounded-full block transition-all duration-700 ease-out"
                  style={{ width: `${((stats.exp % 200) / 200) * 100}%` }}
                />
              </div>

              {/* Status footer for Level milestone */}
              <div className="flex justify-between items-center mt-1 text-[9px] font-mono text-stone-450 font-bold">
                <span>0 XP</span>
                <span>
                  {200 - (stats.exp % 200) > 0 
                    ? `+${200 - (stats.exp % 200)} XP ke Lvl ${currentLevel + 1}` 
                    : "Reset!"
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Statistics Summary Widget (Value Proposition) & Streak Indicator */}
          <div id="stats-summary-widget" className="bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2 flex flex-row items-center gap-3 shadow-sm text-stone-700 shrink-0 self-start xl:self-auto w-full xl:w-auto overflow-x-auto">
            {/* Streak flame indicator */}
            <div className="flex items-center gap-1 bg-rose-50 border border-rose-200 rounded-xl px-2.5 py-1 text-rose-700 animate-pulse shrink-0">
              <Flame className="w-4 h-4 fill-rose-500 text-rose-600" />
              <span className="text-xs font-sans font-black">{streak} Hari Streak</span>
            </div>

            <div className="flex items-center gap-3 divide-x divide-stone-200 shrink-0 text-center">
              <div className="flex flex-col items-center px-1">
                <span className="text-[8px] text-stone-400 font-mono uppercase font-bold tracking-tight leading-none">Modul</span>
                <span className="text-[11px] font-sans font-black text-stone-900 mt-0.5 leading-none">{stats.completedLessons?.length || 0} Selesai</span>
              </div>
              
              <div className="flex flex-col items-center pl-3">
                <span className="text-[8px] text-stone-400 font-mono uppercase font-bold tracking-tight leading-none">Buku</span>
                <span className="text-[11px] font-sans font-black text-stone-900 mt-0.5 leading-none">{readBooksCount} Dibuka</span>
              </div>

              <div className="flex flex-col items-center pl-3">
                <span className="text-[8px] text-stone-400 font-mono uppercase font-bold tracking-tight leading-none">Catur</span>
                <span className="text-[11px] font-sans font-black text-stone-900 mt-0.5 leading-none">{stats.chessWins || 0} Menang</span>
              </div>
            </div>
          </div>

          {/* Tab Selection Navigator */}
          <nav className="flex items-center gap-1.5 p-1 bg-stone-100 border border-stone-200 rounded-xl shrink-0">
            <button
              onClick={() => {
                setActiveTab("adventure");
                setSelectedLesson(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "adventure"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Peta Belajar
            </button>
            <button
              onClick={() => {
                setActiveTab("chess");
                setSelectedLesson(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "chess"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              Catur AI
            </button>
            <button
              onClick={() => {
                setActiveTab("history");
                setSelectedLesson(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "history"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              Arsip Sejarah
            </button>
            <button
              onClick={() => {
                setActiveTab("guide");
                setSelectedLesson(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "guide"
                  ? "bg-stone-800 text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              Bantuan
            </button>
          </nav>

          {/* User Profile Avatar Corner */}
          <div className="relative shrink-0 flex items-center gap-2">
            {isSyncing && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 rounded-lg border border-amber-200 animate-pulse">
                <RefreshCw className="w-3 h-3 text-amber-600 animate-spin" />
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase">Syncing</span>
              </div>
            )}
            <button
              onClick={() => setShowProfileModal(!showProfileModal)}
              type="button"
              className="w-10 h-10 rounded-full border-2 border-emerald-600 overflow-hidden bg-emerald-50 hover:scale-105 active:scale-95 shadow-sm transition-all flex items-center justify-center cursor-pointer relative"
              id="header-user-avatar"
            >
              {currentUser?.picture ? (
                <img src={currentUser.picture} alt="User Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User className="w-5 h-5 text-emerald-800" />
              )}
              {currentUser && !currentUser.isGuest && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full"></span>
              )}
            </button>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-stone-900 leading-none">{currentUser?.name || "Tamu"}</span>
              <span className="text-[10px] text-stone-400 font-mono leading-none mt-1">{currentUser?.isGuest ? "Sesi Tamu" : currentUser?.email}</span>
            </div>
          </div>

        </div>
      </header>

      {streakBonusMsg && (
        <div className="bg-rose-500 text-white text-xs font-sans font-bold py-2.5 px-4 flex items-center justify-between shadow-md relative z-30 animate-pulse select-none">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 fill-white text-white shrink-0 animate-bounce" />
            <span>{streakBonusMsg}</span>
          </div>
          <button 
            onClick={() => setStreakBonusMsg(null)}
            className="text-white hover:text-rose-200 font-extrabold p-1 shrink-0 ml-4 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. FLOATING REAL-TIME XP TOAST ALERT */}
      {xpToast.show && (
        <div className="fixed bottom-6 right-6 z-55 bg-white border-2 border-emerald-500 shadow-2xl p-4 rounded-2xl flex items-center gap-3.5 animate-bounce max-w-sm">
          <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600 shrink-0 border border-emerald-200">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h5 className="font-sans font-extrabold text-sm text-emerald-700 flex items-center gap-1">
              +{xpToast.amt} EXP Ditambahkan!
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            </h5>
            <p className="text-xs text-stone-600 mt-0.5">{xpToast.msg}</p>
          </div>
          <button
            onClick={() => setXpToast((prev) => ({ ...prev, show: false }))}
            className="text-stone-400 hover:text-stone-600 font-mono text-xs cursor-pointer ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2.5 FLOATING REAL-TIME LEVEL UP NOTIFICATION ALERT */}
      {levelUpToast && levelUpToast.show && (
        <div className="fixed bottom-24 right-6 z-55 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 border-2 border-indigo-500/60 shadow-2xl p-5 rounded-3xl flex flex-col gap-3 animate-bounce max-w-sm text-white">
          <div className="flex items-center gap-3.5">
            <div className="bg-indigo-50/20 p-2.5 rounded-2xl text-indigo-400 shrink-0 border border-indigo-500/30">
              <Sparkles className="w-6 h-6 animate-pulse text-indigo-400" />
            </div>
            <div>
              <h5 className="font-sans font-black text-sm text-indigo-250 flex items-center gap-1.5 uppercase tracking-wide">
                Akun Naik Level! 🎉
              </h5>
              <p className="text-[11px] text-indigo-300 font-mono">
                Prestasi belajar terlampaui dengan luar biasa!
              </p>
            </div>
            <button
              onClick={() => setLevelUpToast(null)}
              className="text-indigo-400 hover:text-white font-mono text-xs cursor-pointer ml-auto"
            >
              ✕
            </button>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center justify-around text-center my-0.5">
            <div>
              <p className="text-[9px] text-white/40 uppercase tracking-widest font-mono">Level Lama</p>
              <p className="text-lg font-sans font-extrabold text-white/60 line-through">Lvl {levelUpToast.level - 1}</p>
            </div>
            <div className="text-xl text-indigo-400 font-black animate-pulse">→</div>
            <div>
              <p className="text-[9px] text-indigo-400 uppercase tracking-widest font-mono font-black">Level Baru</p>
              <p className="text-xl font-sans font-black text-indigo-300">Lvl {levelUpToast.level}</p>
            </div>
          </div>
          
          <p className="text-[10px] text-white/60 font-sans italic text-center">
            Setiap 200 XP terkumpul, Anda akan terus naik level. Pertahankan perjuangan belajarmu!
          </p>
        </div>
      )}

      {/* 3. MAIN WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-6 flex-1 w-full flex flex-col gap-6">
        
        {/* TAB 1: ADVENTURE MAP (STUDY NODE MAP TREE) */}
        {activeTab === "adventure" && !selectedLesson && (
          <div className="space-y-6">
            
            {/* Introductory Hero Welcome card */}
            <div className="bg-white border-2 border-stone-200 rounded-[2rem] p-6 md:p-8 relative overflow-hidden shadow-xl shadow-stone-900/5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 w-full">
                <div className="w-full">
                  <h2 className="font-sans font-extrabold text-xl md:text-2xl text-stone-900 leading-tight">
                    Petualangan Belajar StudySuki AI
                  </h2>
                  <p className="text-stone-500 text-xs md:text-sm mt-1.5 max-w-3xl leading-relaxed">
                    Selesaikan sub-materi teknologi dan kecerdasan buatan terpopuler di setiap Pohon (Tree).
                    Tebus gerbang tingkatan baru menggunakan tabungan EXP hasil belajarmu secara interaktif.
                  </p>
                  
                  {/* Status metrics summary bar */}
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <span className="text-xs py-1 px-3.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full font-mono flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Selesai: {stats.completedLessons.length} / {LESSONS.length} Sub-Materi
                    </span>
                    <span className="text-xs py-1 px-3.5 bg-stone-50 text-stone-700 border border-stone-200 rounded-full font-mono flex items-center gap-1.5 font-bold">
                      <Trophy className="w-4 h-4 text-emerald-600" />
                      Menang Catur AI: {stats.chessWins} Kali
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Adventure Node Map Tree Grid Router */}
            <AdventureMap
              lessons={LESSONS}
              stats={stats}
              selectedLesson={selectedLesson}
              onSelectLesson={handleSelectLesson}
              onUnlockTree={handleUnlockTree}
            />

          </div>
        )}

        {/* ACTIVE STUDY VIEW: SPLIT SECTION SHEET */}
        {activeTab === "adventure" && selectedLesson && (
          <div className="flex flex-col gap-4 relative z-10">
            
            {/* Navigation back and header banner */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <button
                onClick={() => setSelectedLesson(null)}
                className="px-3.5 py-2 text-xs font-bold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-600" />
                Kembali ke Peta
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1 capitalize border border-stone-200 rounded-full font-mono bg-stone-100 text-stone-600 font-bold">
                  Kategori: {selectedLesson.category}
                </span>
                <span className="text-xs px-3 py-1 border border-emerald-200 rounded-full font-mono bg-emerald-50 text-emerald-800 font-bold">
                  +50 EXP Reward
                </span>
              </div>
            </div>

            {/* Main Interactive Workspace Area: Left side text content, right side AI assistant chatbot */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2">
              
              {/* LEFT COLUMN: Lesson materials & multiple choice Quiz questions (Col Span: 7) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Core Material Reader Card */}
                <div className="bg-white border-2 border-stone-200 rounded-[2rem] p-6 md:p-8 shadow-xl shadow-stone-900/5">
                  <div className="flex items-center gap-2 mb-3">
                    <BookMarked className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-black">
                      Materi Inti Belajar
                    </span>
                  </div>

                  <h1 className="font-sans font-extrabold text-xl md:text-2xl text-stone-900">
                    {selectedLesson.title}
                  </h1>
                  <p className="text-xs text-stone-400 mt-1 italic">
                    "{selectedLesson.shortDesc}"
                  </p>

                  <div className="border-t border-stone-200 my-5"></div>

                  {/* Render content safely using clean custom element markup styling */}
                  <div className="prose text-xs md:text-sm text-stone-850 leading-relaxed font-sans space-y-4">
                    {selectedLesson.content.split("\n\n").map((para, i) => {
                      if (para.startsWith("###")) {
                        return (
                          <h3 key={i} className="font-sans font-bold text-stone-900 text-base md:text-lg mt-6 mb-2">
                            {para.replace("### ", "")}
                          </h3>
                        );
                      }
                      if (para.startsWith("####")) {
                        return (
                          <h4 key={i} className="font-sans font-semibold text-stone-900 text-sm md:text-base mt-4 mb-2">
                            {para.replace("#### ", "")}
                          </h4>
                        );
                      }
                      if (para.startsWith("- ") || para.startsWith("1. ")) {
                        return (
                          <ul key={i} className="list-disc pl-5 space-y-1 my-3 text-stone-700">
                            {para.split("\n").map((li, j) => (
                              <li key={j}>{li.replace(/^- |^\d+\. /, "")}</li>
                            ))}
                          </ul>
                        );
                      }
                      if (para.startsWith("```")) {
                        const lines = para.split("\n");
                        const code = lines.slice(1, -1).join("\n");
                        return (
                          <pre key={i} className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl font-mono text-xs text-emerald-700 overflow-x-auto shadow-inner my-4">
                            <code>{code}</code>
                          </pre>
                        );
                      }
                      return <p key={i} className="text-stone-700 leading-relaxed">{para}</p>;
                    })}
                  </div>
                </div>

                {/* 1.5 Dynamic Speech Practice Challenge (Only for Language Units which have examplePhrase) */}
                {(selectedLesson as any).examplePhrase && (
                  <SpeechPractice
                    phrase={(selectedLesson as any).examplePhrase}
                    translation={(selectedLesson as any).examplePhraseTranslation || ""}
                    langCode={selectedLesson.id.split("-")[0] || "en"}
                    onSuccess={() => awardXP(15, "Pelafalan Sempurna")}
                  />
                )}

                {/* 2. Interactive Multiple Choice Assessment Card */}
                <div className="bg-white border-2 border-stone-200 rounded-[2rem] p-6 shadow-xl shadow-stone-900/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="flex items-center gap-2 mb-3.5 relative z-10">
                    <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="font-mono text-xs uppercase tracking-wider text-amber-600 font-bold">
                      Uji Pemahaman & Kuis (+50 EXP)
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-sm md:text-base text-stone-900 mb-4 bg-stone-50 p-4 rounded-xl border border-stone-150 relative z-10">
                    {selectedLesson.quiz.question}
                  </h3>

                  {/* Options container list */}
                  <div className="space-y-2.5 relative z-10">
                    {selectedLesson.quiz.options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      let optionStyle = "border-stone-200 bg-white hover:bg-stone-50 text-stone-700";
                      
                      if (isSelected) {
                        optionStyle = "border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/10 shadow-sm";
                      }
                      
                      if (quizSubmitted) {
                        if (idx === selectedLesson.quiz.answerIndex) {
                          optionStyle = "border-emerald-600 bg-emerald-100 text-emerald-900 ring-2 ring-emerald-500/20 shadow-sm font-bold";
                        } else if (isSelected) {
                          optionStyle = "border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20";
                        } else {
                          optionStyle = "border-stone-100 bg-stone-50 text-stone-400 cursor-not-allowed opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={quizSubmitted}
                          onClick={() => setSelectedOption(idx)}
                          className={`w-full text-left p-3.5 rounded-xl border font-sans text-xs md:text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-lg font-mono text-xs font-bold shrink-0 flex items-center justify-center ${
                              isSelected ? "bg-emerald-600 text-white" : "bg-stone-100 text-stone-650"
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{option}</span>
                          </div>
                          {quizSubmitted && idx === selectedLesson.quiz.answerIndex && (
                            <span className="text-[10px] uppercase font-mono font-bold bg-emerald-100 text-emerald-800 py-0.5 px-2.5 rounded-full border border-emerald-250">
                              BENAR
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submission and Action buttons */}
                  <div className="mt-5 pt-4 border-t border-stone-200 flex flex-wrap gap-3 items-center justify-between relative z-10">
                    <div>
                      {stats.completedLessons.includes(selectedLesson.id) && (
                        <span className="text-xs text-emerald-700 font-mono font-bold flex items-center gap-1.5 bg-emerald-50 py-1 px-3 border border-emerald-150 rounded-full animate-pulse">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Sub-materi selesai (+50 EXP diperoleh)
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {!quizSubmitted ? (
                        <button
                          onClick={handleSubmitQuiz}
                          disabled={selectedOption === null}
                          className="px-6 py-2.5 text-xs font-sans font-bold bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-100 disabled:text-stone-400 text-white rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
                        >
                          Periksa Jawaban
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedOption(null);
                            setQuizSubmitted(false);
                            setQuizFeedback(null);
                          }}
                          className="px-4 py-2.5 text-xs font-sans font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-all cursor-pointer border border-stone-200"
                        >
                          Coba Kuis Lagi
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Quiz analytical commentary feedbacks */}
                  {quizFeedback && (
                    <div className={`mt-4 p-4 rounded-xl border text-xs md:text-sm animate-fade-in relative z-10 ${
                      quizFeedback.isCorrect
                        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                        : "bg-amber-50 border-amber-200 text-amber-900"
                    }`}>
                      <p className="font-extrabold">{quizFeedback.isCorrect ? "Jawaban Benar! 🎉" : "Kuis Kurang Tepat ❌"}</p>
                      <p className="mt-1 leading-relaxed text-stone-700">{quizFeedback.text}</p>
                    </div>
                  )}

                </div>

              </div>

              {/* RIGHT COLUMN: AI StudyCompanion Robot Companion (Col Span: 5) */}
              <div className="lg:col-span-5 h-full lg:sticky lg:top-24">
                <AIStudyCompanion
                  activeLesson={selectedLesson}
                  userExp={stats.exp}
                  userPicture={currentUser?.picture}
                />
              </div>

            </div>

          </div>
        )}

             {/* TAB 2: AI CHESS ARENA GRID */}
        {activeTab === "chess" && (
          <div className="space-y-6 relative z-10">
            
            {/* Context title introduction to chess match */}
            <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 shadow-xl shadow-stone-900/5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="font-sans font-extrabold text-xl md:text-2xl text-stone-900 flex items-center gap-2">
                    Arena Taktik Catur AI
                    <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-205 px-2.5 py-0.5 rounded-full font-mono font-bold shrink-0">
                      +50 EXP on Victory
                    </span>
                  </h2>
                  <p className="text-stone-500 text-xs md:text-sm mt-1.5 max-w-2xl leading-relaxed">
                    AI juga pintar bermain taktis! Uji dan buktikan pemahaman strategismu dengan mengalahkan bot hitam. 
                    Mainkan bidak putihmu dengan mengklik bidak dan kotak tujuan hijau yang menyala.
                  </p>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 shrink-0 text-center md:text-right">
                  <p className="text-[10px] font-mono text-stone-450 font-bold uppercase tracking-wider">Rekam Pertandingan:</p>
                  <p className="text-xs text-stone-700 mt-1 font-bold">
                    Catur Dimainkan: <strong className="text-stone-900">{stats.gamesPlayed}</strong> | Menang: <strong className="text-emerald-700">{stats.chessWins}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Chess component core implementation imports */}
            <ChessGame
              stats={stats}
              onRewardXP={(amt) => awardXP(amt, "Menerima EXP dari Arena Catur")}
              onWinChess={handleWinChessGame}
            />

          </div>
        )}

        {/* TAB 3: FUTURISTIC WORLD HISTORY digital catalog bookshelves */}
        {activeTab === "history" && (
          <HistoryLibrary />
        )}

        {/* TAB 4: GUIDE & DOCUMENTATION ONBOARDING */}
        {activeTab === "guide" && (
          <div className="bg-white border-2 border-stone-200 rounded-[2.5rem] p-6 md:p-8 space-y-6 shadow-xl shadow-stone-900/5 relative z-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <h2 className="font-sans font-extrabold text-xl md:text-2xl text-stone-900 flex items-center gap-2 relative z-10">
              Panduan Bermain StudySuki AI 📔
            </h2>
            
            <div className="border-t border-stone-200 relative z-10"></div>

            {/* COMPREHENSIVE MEDALI & PENCAPAIAN INTERAKTIF */}
            <div id="guide-achievements-panel" className="bg-stone-50 border border-stone-200 rounded-[2rem] p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <Trophy className="w-5 h-5 text-amber-500 animate-bounce" />
                <h3 className="font-sans font-extrabold text-[#111111] text-sm md:text-base">
                  Lemari Medali & Pencapaian StudySuki AI
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                {ACHIEVEMENTS.map((ach) => {
                  const isEarned = ach.condition(stats);
                  return (
                    <div 
                      key={ach.id}
                      className={`p-4 border rounded-2xl bg-white transition-all shadow-sm ${
                        isEarned 
                          ? "border-emerald-500/35 bg-gradient-to-br from-white to-emerald-50/10" 
                          : "border-stone-200 opacity-70"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className={`p-2.5 rounded-xl border ${
                          isEarned ? "bg-amber-50 border-amber-200 text-amber-600 font-bold" : "bg-stone-100 border-stone-200 text-stone-400"
                        }`}>
                          {ach.icon === "Compass" ? <Compass className="w-4 h-4" /> : ach.icon === "BookOpen" ? <BookOpen className="w-4 h-4" /> : <Trophy className="w-4 h-4" />}
                        </div>
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                          isEarned ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-stone-150 text-stone-500 border-stone-200"
                        }`}>
                          {isEarned ? "Milikmu! 🏆" : "Terkunci"}
                        </span>
                      </div>

                      <h5 className="font-sans font-black text-stone-950 mt-3 text-xs md:text-sm uppercase tracking-tight">
                        {ach.title}
                      </h5>
                      <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                        {ach.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-stone-200 relative z-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed relative z-10">
              <div>
                <h4 className="font-sans font-extrabold text-stone-900 text-sm md:text-base flex items-center gap-2 text-emerald-700 mb-2">
                  <Zap className="w-5 h-5 shrink-0 text-emerald-600" />
                  Bagaimana Cara Mengumpulkan EXP?
                </h4>
                <p className="text-xs md:text-sm text-stone-600">
                  Kamu bisa memperoleh poin EXP (Experience Points) melalui dua aktivitas utama dalam aplikasi:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs text-stone-500">
                  <li><strong>Kuis Sub-Materi (+50 EXP):</strong> Pelajari materi menarik di peta petualangan, lalu kerjakan kuis satu pilihan di bagian bawah materi.</li>
                  <li><strong>Pertandingan Catur AI (+50 EXP):</strong> Kalahkan bot catur hitam asisten StudySuki AI di Arena Catur AI.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-sans font-extrabold text-stone-900 text-sm md:text-base flex items-center gap-2 text-emerald-700 mb-2">
                  <Shield className="w-5 h-5 shrink-0 text-emerald-600" />
                  Mengapa Beberapa Level Terkunci (Locked)?
                </h4>
                <p className="text-xs md:text-sm text-stone-600">
                  Petualangan dibagi menjadi tiga tingkatan (Mudah, Sedang, Susah) sejajar dengan aslinya:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs text-stone-500">
                  <li><strong>Tree Mudah:</strong> Terbuka sejak awal perjalanan belajarmu.</li>
                  <li><strong>Tree Sedang:</strong> Biaya upgrade gerbang 500 EXP untuk lulus melangkah masuk.</li>
                  <li><strong>Tree Susah:</strong> Biaya upgrade gerbang 1000 EXP untuk lulus melangkah masuk.</li>
                </ul>
                <p className="text-xs text-amber-700 mt-2 font-bold bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                  Catatan: Jika tabungan EXP belum mencukupi untuk tingkat tersebut, tombol pemicu gerbang tebusan akan mengeluarkan peringatan alert berbunyi 'Your EXP is not enough to unlock this level!'.
                </p>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-4 text-center relative z-10">
              <p className="text-xs text-stone-450 font-mono font-medium">
                StudySuki AI © 2026 • Dirancang khusus dengan rasa petualangan belajar di era cerdas.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* 4. REAL-TIME ACHIEVEMENT UNKOCKED TOAST */}
      {achievementToast && achievementToast.show && (
        <div id="achievement-unlocked-toast" className="fixed top-6 left-1/2 transform -translate-x-1/2 z-55 bg-gradient-to-r from-amber-500 to-amber-600 border-2 border-amber-300 shadow-2xl p-5 rounded-[2rem] flex items-center gap-4 text-white animate-bounce max-w-md">
          <div className="bg-white/20 p-2.5 rounded-2xl text-white shrink-0 border border-white/20">
            <Trophy className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h5 className="font-sans font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              Pencapaian Terbuka! 🏆
            </h5>
            <p className="text-xs font-bold text-amber-100 mt-0.5">{achievementToast.title}</p>
            <p className="text-[11px] text-white/90 mt-0.5">{achievementToast.desc}</p>
          </div>
          <button
            onClick={() => setAchievementToast(null)}
            className="text-white/80 hover:text-white font-mono text-xs cursor-pointer ml-3 bg-white/10 hover:bg-white/25 w-6 h-6 rounded-full flex items-center justify-center transition-all border border-white/20"
          >
            ✕
          </button>
        </div>
      )}

      {/* 5. GORGEOUS PROFILE & ACHIEVEMENTS OVERLAY MODAL */}
      {showProfileModal && (
        <div id="profile-modal-overlay" className="fixed inset-0 z-50 bg-stone-900/45 backdrop-blur-sm flex items-center justify-center p-4">
          <div id="profile-container-card" className="w-full max-w-md bg-white border-2 border-stone-200 rounded-[2.5rem] p-6 shadow-2xl animate-fade-in relative">
            
            {/* Close button */}
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-705 font-mono text-base bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer select-none transition-all"
            >
              ✕
            </button>

            {/* Modal Body Profile Header */}
            <div className="flex flex-col items-center text-center space-y-3 mt-2">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-600 bg-emerald-50 shadow-md">
                {currentUser?.picture ? (
                  <img src={currentUser.picture} alt={currentUser.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-emerald-800 bg-emerald-50">
                    <User className="w-10 h-10" />
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-sans font-extrabold text-base text-stone-900">{currentUser?.name}</h3>
                <p className="text-xs text-stone-500 font-mono">{currentUser?.isGuest ? "Selancar Tamu Percobaan" : currentUser?.email}</p>
              </div>

              <div className="w-full space-y-1.5 px-4" id="exp-progress-container">
                <div className="flex justify-between text-[10px] font-mono font-bold text-stone-600">
                  <motion.span
                    key={stats.exp >= 200 ? "lvl2" : "lvl1"}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-700"
                  >
                    Level {stats.exp >= 200 ? "2" : "1"}
                  </motion.span>
                  <motion.span
                    key={stats.exp}
                    initial={{ scale: 1.1, color: "#059669" }}
                    animate={{ scale: 1, color: "#57534e" }}
                    className="font-mono"
                  >
                    {stats.exp} / 200 EXP
                  </motion.span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((stats.exp / 200) * 100, 100)}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  />
                </div>
              </div>

              <div className="inline-block bg-emerald-50 border border-emerald-250 text-emerald-800 text-[10px] font-mono font-bold py-1 px-3.5 rounded-full shadow-sm">
                Gelar: {rank.title}
              </div>
            </div>

            <div className="border-t border-stone-150 my-5"></div>

            {/* Stats list summary */}
            <h4 className="text-xs font-mono font-extrabold text-stone-400 uppercase tracking-widest mb-3 text-center">
              Statistik Prestasi Belajar
            </h4>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 text-center animate-fade-in">
                <p className="text-[9px] font-mono font-bold text-stone-400 uppercase">Kuis Unit Dilalui</p>
                <p className="text-sm font-sans font-extrabold text-stone-900 mt-0.5">
                  {stats.completedLessons.length}
                </p>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 text-center">
                <p className="text-[9px] font-mono font-bold text-stone-400 uppercase">Buku Dibaca</p>
                <p className="text-sm font-sans font-extrabold text-stone-900 mt-0.5">
                  {readBooksCount}
                </p>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 text-center">
                <p className="text-[9px] font-mono font-bold text-stone-400 uppercase">Menang Catur</p>
                <p className="text-sm font-sans font-extrabold text-stone-900 mt-0.5">
                  {stats.chessWins}
                </p>
              </div>
            </div>

            {/* Achievements Checklist Section */}
            <h4 className="text-xs font-mono font-extrabold text-stone-400 uppercase tracking-widest mb-3">
              Daftar Pencapaian Terbuka (Achievements)
            </h4>
            <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
              {ACHIEVEMENTS.map((ach) => {
                const isEarned = ach.condition(stats);
                return (
                  <div 
                    key={ach.id}
                    className={`flex items-start gap-3 p-3 border rounded-2xl text-left bg-stone-50 transition-all ${
                      isEarned 
                        ? "border-emerald-500/30 bg-emerald-50/20" 
                        : "border-stone-155 opacity-65"
                    }`}
                  >
                    <div className={`p-2 rounded-xl text-xs shrink-0 self-start ${
                      isEarned ? "bg-amber-100 text-amber-700 border border-amber-250 animate-pulse" : "bg-stone-200 text-stone-500 border border-stone-300"
                    }`}>
                      {ach.icon === "Compass" ? <Compass className="w-4 h-4" /> : ach.icon === "BookOpen" ? <BookOpen className="w-4 h-4" /> : <Trophy className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-sans font-extrabold text-stone-950 uppercase tracking-tight">{ach.title}</p>
                        <span className={`text-[9px] font-mono font-black uppercase tracking-wider py-0.5 px-2 rounded-full border ${
                          isEarned ? "bg-emerald-100 text-emerald-800 border-emerald-250" : "bg-stone-200 text-stone-600 border-stone-300"
                        }`}>
                          {isEarned ? "Milikmu! 🏆" : "Terkunci"}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">{ach.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-stone-150 my-5"></div>

            {/* Logout trigger button */}
            <div className="flex gap-2">
              <button
                onClick={handleLogout}
                type="button"
                className="w-full py-3 px-4 font-sans font-bold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl transition-all text-xs cursor-pointer text-center"
              >
                Keluar Sesi (Logout/Pindah Akun)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Suki Mascot Floating Companion Element */}
      <SukiMascot
        currentUnitTitle={selectedLesson ? selectedLesson.title : undefined}
        userExp={stats.exp}
      />

    </div>
  );
}
