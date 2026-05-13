export interface Zikr {
  id: string;
  arabic: string;
  transliteration: {
    en: string;
    bn: string;
    ar: string;
  };
  translation: {
    en: string;
    bn: string;
    ar: string;
  };
  virtue?: {
    en: string;
    bn: string;
    ar: string;
  };
  count: number;
  goal: number;
  isCustom?: boolean;
  isFavorite?: boolean;
  createdAt: string;
}

export type Language = 'en' | 'bn' | 'ar';
export type Theme = 'dark' | 'light';
export type Page = 'home' | 'about' | 'privacy' | 'contact';

export interface HistoryLog {
  id: string;
  zikrId: string;
  arabic: string;
  name: string;
  count: number;
  goal: number;
  completedAt: string;
}

export interface AppState {
  activeZikrId: string;
  zikrs: Zikr[];
  historyLogs: HistoryLog[];
  language: Language;
  theme: Theme;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  streakDays: number;
  lastActiveDate: string;
  lifetimeCount: number;
  currentPage: Page;
  showPwaBanner: boolean;
}
