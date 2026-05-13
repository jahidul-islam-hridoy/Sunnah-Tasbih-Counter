import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RotateCcw, Target, Sparkles, CheckCircle2, Trophy } from 'lucide-react';
import { Zikr, Language } from '../types';
import { DICTIONARY } from '../data/presets';
import { playTapSound, triggerHaptic } from '../utils/audio';

interface TasbihCounterProps {
  activeZikr: Zikr;
  onIncrement: () => void;
  onReset: () => void;
  onSetGoal: (goal: number) => void;
  language: Language;
  soundEnabled: boolean;
  hapticEnabled: boolean;
}

export const TasbihCounter: React.FC<TasbihCounterProps> = ({
  activeZikr,
  onIncrement,
  onReset,
  onSetGoal,
  language,
  soundEnabled,
  hapticEnabled,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showVirtueModal, setShowVirtueModal] = useState(false);
  const dict = DICTIONARY[language];

  const progressPercent = Math.min(Math.round((activeZikr.count / activeZikr.goal) * 100), 100);

  const handleTap = () => {
    if (activeZikr.count >= activeZikr.goal) {
      // Goal reached, stop counting further.
      return;
    }

    if (soundEnabled) playTapSound();
    if (hapticEnabled) triggerHaptic();

    // Check if reaching goal right now
    if (activeZikr.count + 1 === activeZikr.goal) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    onIncrement();
  };

  const handleGoalChange = (newGoal: number) => {
    onSetGoal(newGoal);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6">
      <div className="glass-panel rounded-3xl p-6 md:p-8 relative shadow-2xl border border-white/10 overflow-hidden">
        
        {/* Subtle decorative background ring */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

        {/* Active Zikr Header Info */}
        <div className="text-center mb-8 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
              {dict.presets}
            </span>
            {activeZikr.virtue && (
              <button 
                onClick={() => setShowVirtueModal(true)}
                className="text-emerald-400 hover:text-emerald-300 p-1 bg-emerald-500/10 rounded-full transition-colors flex items-center gap-1 text-xs px-2.5 py-0.5 border border-emerald-500/20"
                title="View Virtue"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Virtue</span>
              </button>
            )}
          </div>

          <h2 className="text-4xl md:text-5xl font-arabic font-bold text-emerald-400 mb-3 drop-shadow-md leading-relaxed py-1">
            {activeZikr.arabic}
          </h2>

          <h3 className="text-lg font-bold text-white mb-1 font-bangla">
            {activeZikr.transliteration[language] || activeZikr.transliteration.en}
          </h3>

          <p className="text-sm text-slate-300 italic font-bangla max-w-md mx-auto">
            "{activeZikr.translation[language] || activeZikr.translation.en}"
          </p>
        </div>

        {/* Centerpiece Counter Display */}
        <div className="flex flex-col items-center justify-center relative my-8">
          
          {/* Main Tap Button & Display Ring */}
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={handleTap}
            className="w-72 h-72 md:w-80 md:h-80 rounded-full relative flex flex-col items-center justify-center cursor-pointer select-none group shadow-2xl"
          >
            {/* Outer Progress Ring Background */}
            <div className="absolute inset-0 rounded-full border-8 border-white/5" />
            
            {/* Animated Pulse Ring Effect */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-pulse-ring pointer-events-none" />

            {/* SVG Progress Circle */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-emerald-500 transition-all duration-300 ease-out"
                strokeWidth="7"
                strokeDasharray="282.743"
                strokeDashoffset={`${282.743 * (1 - progressPercent / 100)}`}
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Interactive Circle */}
            <div className="absolute inset-3 rounded-full bg-gradient-to-b from-[#142129] to-[#0D161C] flex flex-col items-center justify-center border border-white/10 group-hover:border-emerald-500/40 transition-all duration-300 shadow-inner">
              
              {/* Tap feedback ripple indicator */}
              <div className="text-xs font-semibold tracking-widest text-emerald-500/60 mb-2 uppercase group-hover:text-emerald-400 transition-colors">
                {activeZikr.count >= activeZikr.goal ? 'GOAL REACHED' : dict.tap_to_count}
              </div>

              <motion.span
                key={activeZikr.count}
                initial={{ scale: 0.85, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="text-6xl md:text-7xl font-bold font-mono tracking-tight text-white mb-1"
              >
                {activeZikr.count}
              </motion.span>

              {/* Goal Status Badge */}
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mt-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <Target className="w-3.5 h-3.5 text-amber-500" />
                <span>{dict.goal}: {activeZikr.goal}</span>
                <span className="text-emerald-400 ml-1 font-semibold">({progressPercent}%)</span>
              </div>

              {progressPercent >= 100 && (
                <div className="absolute bottom-6 flex items-center gap-1 bg-emerald-500 text-[#0B1215] font-bold text-xs px-3 py-1 rounded-full shadow-lg animate-bounce">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{dict.completed}</span>
                </div>
              )}
            </div>
          </motion.div>

        </div>

        {/* Quick Goal Preset Selector */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              {dict.choose_preset_goal}
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { label: '33', value: 33 },
                { label: '100', value: 100 },
                { label: '500', value: 500 },
                { label: '1k', value: 1000 },
                { label: '10k', value: 10000 },
                { label: '20k', value: 20000 },
                { label: '30k', value: 30000 },
                { label: '40k', value: 40000 },
                { label: '50k', value: 50000 },
                { label: '100k', value: 100000 },
              ].map((goalObj) => (
                <button
                  key={goalObj.value}
                  onClick={() => handleGoalChange(goalObj.value)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                    activeZikr.goal === goalObj.value
                      ? 'bg-amber-500 text-[#0B1215] shadow-md shadow-amber-500/20 scale-105'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {goalObj.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Action Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowResetConfirm(true)}
              disabled={activeZikr.count === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{dict.reset}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#121B22] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center"
            >
              <h3 className="text-lg font-bold text-white mb-2">{dict.reset_confirm}</h3>
              <p className="text-xs text-slate-300 mb-6">
                This will reset the count for "{activeZikr.transliteration[language] || activeZikr.transliteration.en}" back to 0.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex-1"
                >
                  {dict.cancel}
                </button>
                <button
                  onClick={() => {
                    onReset();
                    setShowResetConfirm(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 transition-colors flex-1"
                >
                  {dict.yes}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Virtue Explanation Modal */}
      <AnimatePresence>
        {showVirtueModal && activeZikr.virtue && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#121B22] border border-emerald-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl text-left relative"
            >
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-base font-bold">Virtue & Reward of Dhikr</h3>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-bangla mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
                {activeZikr.virtue[language] || activeZikr.virtue.en}
              </p>
              <button
                onClick={() => setShowVirtueModal(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
