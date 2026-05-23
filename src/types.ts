export interface Quiz {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: "mudah" | "sedang" | "susah";
  shortDesc: string;
  content: string;
  xpReward: number;
  quiz: Quiz;
}

export interface UserStats {
  exp: number;
  unlockedTrees: ("mudah" | "sedang" | "susah")[];
  completedLessons: string[];
  chessWins: number;
  gamesPlayed: number;
  unlockedAchievements?: string[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
