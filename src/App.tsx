import { useState, useEffect } from 'react';
import { Zikr, AppState } from './types';
import { DEFAULT_ZIKRS } from './data/presets';
import { Navbar } from './components/Navbar';
import { TasbihCounter } from './components/TasbihCounter';
import { ZikrList } from './components/ZikrList';
import { Analytics } from './components/Analytics';
import { About } from './components/About';
import { Privacy } from './components/Privacy';
import { Contact } from './components/Contact';

const STORAGE_KEY = 'sunnah_tasbih_app_state_v1';

export default function App() {
  // Initialize State from Local Storage or Defaults
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: AppState = JSON.parse(saved);
        // Ensure zikrs array exists
        if (parsed.zikrs && parsed.zikrs.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load local storage:', e);
    }

    return {
      activeZikrId: 'subhanallah',
      zikrs: DEFAULT_ZIKRS,
      historyLogs: [],
      language: 'en',
      theme: 'dark',
      soundEnabled: true,
      hapticEnabled: true,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      lifetimeCount: 0,
      currentPage: 'home',
      showPwaBanner: true,
    };
  });

  // Calculate Streak on Mount & Date Changes
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = state.lastActiveDate;

    if (lastActive !== today) {
      const lastDate = new Date(lastActive);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let newStreak = state.streakDays;
      if (diffDays === 1) {
        // Consecutive day
        newStreak += 1;
      } else if (diffDays > 1) {
        // Streak broken
        newStreak = 1;
      }

      setState((prev) => ({
        ...prev,
        streakDays: newStreak,
        lastActiveDate: today,
      }));
    }
  }, []);

  // Save State to Local Storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save to local storage:', e);
    }
  }, [state]);

  // Helpers
  const activeZikr = state.zikrs.find((z) => z.id === state.activeZikrId) || state.zikrs[0];

  const handleIncrement = () => {
    setState((prev) => {
      let newLog = null;
      const updatedZikrs = prev.zikrs.map((z) => {
        if (z.id === prev.activeZikrId) {
          const newCount = z.count + 1;
          if (newCount === z.goal) {
            // Reached goal exactly now, log to history
            newLog = {
              id: `log_${Date.now()}`,
              zikrId: z.id,
              arabic: z.arabic,
              name: z.transliteration[prev.language] || z.transliteration.en,
              count: newCount,
              goal: z.goal,
              completedAt: new Date().toLocaleString(),
            };
          }
          return { ...z, count: newCount };
        }
        return z;
      });

      return {
        ...prev,
        zikrs: updatedZikrs,
        historyLogs: newLog ? [newLog, ...(prev.historyLogs || [])] : (prev.historyLogs || []),
        lifetimeCount: prev.lifetimeCount + 1,
      };
    });
  };

  const handleReset = () => {
    setState((prev) => {
      let newLog = null;
      const updatedZikrs = prev.zikrs.map((z) => {
        if (z.id === prev.activeZikrId) {
          if (z.count > 0 && z.count < z.goal) {
            // Resetting partial progress, let's log what they achieved
            newLog = {
              id: `log_${Date.now()}`,
              zikrId: z.id,
              arabic: z.arabic,
              name: z.transliteration[prev.language] || z.transliteration.en,
              count: z.count,
              goal: z.goal,
              completedAt: new Date().toLocaleString(),
            };
          }
          return { ...z, count: 0 };
        }
        return z;
      });

      return {
        ...prev,
        zikrs: updatedZikrs,
        historyLogs: newLog ? [newLog, ...(prev.historyLogs || [])] : (prev.historyLogs || []),
      };
    });
  };

  const handleSetGoal = (goal: number) => {
    setState((prev) => {
      const updatedZikrs = prev.zikrs.map((z) => {
        if (z.id === prev.activeZikrId) {
          return { ...z, goal };
        }
        return z;
      });

      return { ...prev, zikrs: updatedZikrs };
    });
  };

  const handleAddZikr = (newZikrData: Omit<Zikr, 'id' | 'count' | 'createdAt'>) => {
    const newId = `custom_${Date.now()}`;
    const newZikr: Zikr = {
      ...newZikrData,
      id: newId,
      count: 0,
      createdAt: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      zikrs: [newZikr, ...prev.zikrs],
      activeZikrId: newId,
    }));
  };

  const handleEditZikr = (id: string, updatedData: Partial<Zikr>) => {
    setState((prev) => ({
      ...prev,
      zikrs: prev.zikrs.map((z) => (z.id === id ? { ...z, ...updatedData } : z)),
    }));
  };

  const handleDeleteZikr = (id: string) => {
    setState((prev) => {
      const filtered = prev.zikrs.filter((z) => z.id !== id);
      const nextActiveId = prev.activeZikrId === id ? filtered[0]?.id || '' : prev.activeZikrId;
      return {
        ...prev,
        zikrs: filtered,
        activeZikrId: nextActiveId,
      };
    });
  };

  const handleToggleFavorite = (id: string) => {
    setState((prev) => ({
      ...prev,
      zikrs: prev.zikrs.map((z) => (z.id === id ? { ...z, isFavorite: !z.isFavorite } : z)),
    }));
  };

  const handleDeleteHistoryLog = (id: string) => {
    setState((prev) => ({
      ...prev,
      historyLogs: (prev.historyLogs || []).filter((log) => log.id !== id),
    }));
  };

  const themeClass = state.theme === 'dark' ? 'bg-[#0B1215] text-slate-100 islamic-pattern' : 'bg-[#EBF3ED] text-slate-900 islamic-pattern-light';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${themeClass}`}>
      
      {/* Navigation */}
      <Navbar
        language={state.language}
        setLanguage={(lang) => setState((prev) => ({ ...prev, language: lang }))}
        theme={state.theme}
        setTheme={(th) => setState((prev) => ({ ...prev, theme: th }))}
        soundEnabled={state.soundEnabled}
        setSoundEnabled={(enabled) => setState((prev) => ({ ...prev, soundEnabled: enabled }))}
        hapticEnabled={state.hapticEnabled}
        setHapticEnabled={(enabled) => setState((prev) => ({ ...prev, hapticEnabled: enabled }))}
        streakDays={state.streakDays}
        currentPage={state.currentPage}
        setCurrentPage={(page) => setState((prev) => ({ ...prev, currentPage: page }))}
      />

      {/* PWA / Install Banner (Hidden per request) */}

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {state.currentPage === 'home' && (
          <div className="space-y-6 animate-fade-in">
            {/* Centerpiece Interactive Tasbih Counter */}
            <TasbihCounter
              activeZikr={activeZikr}
              onIncrement={handleIncrement}
              onReset={handleReset}
              onSetGoal={handleSetGoal}
              language={state.language}
              soundEnabled={state.soundEnabled}
              hapticEnabled={state.hapticEnabled}
            />

            {/* Spiritual Habit Analytics Dashboard */}
            <Analytics
              zikrs={state.zikrs}
              historyLogs={state.historyLogs || []}
              onDeleteHistoryLog={handleDeleteHistoryLog}
              lifetimeCount={state.lifetimeCount}
              streakDays={state.streakDays}
              language={state.language}
            />

            {/* Custom Zikr Management & Presets */}
            <ZikrList
              zikrs={state.zikrs}
              activeZikrId={state.activeZikrId}
              onSelectZikr={(id) => setState((prev) => ({ ...prev, activeZikrId: id }))}
              onAddZikr={handleAddZikr}
              onEditZikr={handleEditZikr}
              onDeleteZikr={handleDeleteZikr}
              onToggleFavorite={handleToggleFavorite}
              language={state.language}
            />
          </div>
        )}

        {state.currentPage === 'about' && <About language={state.language} />}
        {state.currentPage === 'privacy' && <Privacy language={state.language} />}
        {state.currentPage === 'contact' && <Contact language={state.language} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 px-4 bg-[#0B1215]/60 backdrop-blur-md text-slate-400 text-xs text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white">Sunnah Tasbih Counter</p>
            <p className="text-[10px] text-slate-500">Premium Offline-Ready Islamic Zikr Application</p>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setState((prev) => ({ ...prev, currentPage: 'home' }))} className="hover:text-white">Home</button>
            <button onClick={() => setState((prev) => ({ ...prev, currentPage: 'about' }))} className="hover:text-white">Virtues</button>
            <button onClick={() => setState((prev) => ({ ...prev, currentPage: 'privacy' }))} className="hover:text-white">Privacy</button>
            <button onClick={() => setState((prev) => ({ ...prev, currentPage: 'contact' }))} className="hover:text-white">Contact</button>
          </div>
          <div>
            <p className="text-[11px] text-emerald-500">Made with sincerity & dedication</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
