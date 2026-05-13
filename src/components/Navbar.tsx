import React from 'react';
import { Volume2, VolumeX, Vibrate, Moon, Sun, Flame, Globe } from 'lucide-react';
import { Language, Theme, Page } from '../types';
import { DICTIONARY } from '../data/presets';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  hapticEnabled: boolean;
  setHapticEnabled: (enabled: boolean) => void;
  streakDays: number;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  theme,
  setTheme,
  soundEnabled,
  setSoundEnabled,
  hapticEnabled,
  setHapticEnabled,
  streakDays,
  currentPage,
  setCurrentPage,
}) => {
  const dict = DICTIONARY[language];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B1215]/90 border-b border-white/10 px-4 py-3 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Streak Badge */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0B1215] rounded-[10px] flex items-center justify-center">
                <span className="text-xl font-arabic text-emerald-400 font-bold">ﷲ</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                {dict.app_name}
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {dict.offline_mode}
                </span>
              </h1>
              <p className="text-xs text-slate-400">{dict.app_tagline}</p>
            </div>
          </button>

          {/* Daily Streak Badge */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full text-amber-400 text-xs font-semibold shadow-inner ml-2">
            <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>{streakDays} {dict.days} {dict.streak}</span>
          </div>
        </div>

        {/* Navigation Tabs & Control Toggles */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3 flex-wrap">
          <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                currentPage === 'home'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {dict.home}
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                currentPage === 'about'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {dict.about}
            </button>
            <button
              onClick={() => setCurrentPage('privacy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                currentPage === 'privacy'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {dict.privacy}
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                currentPage === 'contact'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {dict.contact}
            </button>
          </nav>

          {/* Quick Action Toggles */}
          <div className="flex items-center gap-1.5">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={dict.sound}
              className={`p-2 rounded-xl border transition-all duration-200 ${
                soundEnabled 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Haptic Toggle */}
            <button
              onClick={() => setHapticEnabled(!hapticEnabled)}
              title={dict.vibration}
              className={`p-2 rounded-xl border transition-all duration-200 ${
                hapticEnabled 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              <Vibrate className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={dict.theme}
              className="p-2 rounded-xl border bg-white/5 border-white/10 text-amber-400 hover:bg-white/10 transition-all duration-200"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Language Selection */}
            <div className="relative inline-flex items-center bg-white/5 border border-white/10 rounded-xl px-2 py-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-xs font-semibold text-white outline-none cursor-pointer pr-1"
              >
                <option value="en" className="bg-[#0B1215] text-white">English</option>
                <option value="bn" className="bg-[#0B1215] text-white">বাংলা</option>
                <option value="ar" className="bg-[#0B1215] text-white">العربية</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
