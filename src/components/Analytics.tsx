import React from 'react';
import { Activity, Flame, Award, HeartHandshake, ShieldCheck, History, CheckCircle2, Trash2 } from 'lucide-react';
import { Zikr, HistoryLog, Language } from '../types';
import { DICTIONARY } from '../data/presets';

interface AnalyticsProps {
  zikrs: Zikr[];
  historyLogs: HistoryLog[];
  onDeleteHistoryLog: (id: string) => void;
  lifetimeCount: number;
  streakDays: number;
  language: Language;
}

export const Analytics: React.FC<AnalyticsProps> = ({
  zikrs,
  historyLogs,
  onDeleteHistoryLog,
  lifetimeCount,
  streakDays,
  language,
}) => {
  const dict = DICTIONARY[language];

  const totalCurrentCount = zikrs.reduce((acc, z) => acc + z.count, 0);
  const completedGoals = zikrs.filter((z) => z.count >= z.goal).length;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2 font-bangla">
          <Activity className="w-6 h-6 text-emerald-500 animate-pulse" />
          <span>{dict.analytics_title}</span>
        </h2>
        <p className="text-xs text-slate-400 font-bangla">{dict.analytics_subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        
        {/* Total Lifetime Count */}
        <div className="glass-panel rounded-2xl p-6 border-emerald-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-emerald-500/10 blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 border border-emerald-500/30 mb-3">
            <Award className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 font-bangla">
            {dict.lifetime_count}
          </span>
          <span className="text-4xl font-bold font-mono text-white tracking-tight">
            {lifetimeCount + totalCurrentCount}
          </span>
        </div>

        {/* Daily Streak Tracker */}
        <div className="glass-panel rounded-2xl p-6 border-amber-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-amber-500/10 blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400 border border-amber-500/30 mb-3">
            <Flame className="w-6 h-6 animate-bounce" />
          </div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 font-bangla">
            {dict.streak}
          </span>
          <span className="text-4xl font-bold font-mono text-white tracking-tight">
            {streakDays} <span className="text-base font-normal text-slate-400">{dict.days}</span>
          </span>
        </div>

        {/* Goals Reached */}
        <div className="glass-panel rounded-2xl p-6 border-sky-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-sky-500/10 blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="p-3 bg-sky-500/20 rounded-2xl text-sky-400 border border-sky-500/30 mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 font-bangla">
            Completed Goals
          </span>
          <span className="text-4xl font-bold font-mono text-white tracking-tight">
            {completedGoals} <span className="text-base font-normal text-slate-400">/ {zikrs.length}</span>
          </span>
        </div>

      </div>

      {/* Encouragement Quote Card */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 border-white/10 mb-8">
        <div className="p-4 bg-emerald-500/20 rounded-2xl text-emerald-400 border border-emerald-500/30 shrink-0">
          <HeartHandshake className="w-8 h-8" />
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-base font-bold text-white mb-2 font-bangla">
            Spiritual Consistency & Dedication
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-bangla">
            {dict.daily_streak_desc} Even when you are offline or close the browser, your progress is permanently recorded and securely kept on your device. May Allah accept your sincere remembrance.
          </p>
        </div>
      </div>

      {/* Past Dhikr History Logs */}
      <div className="glass-panel rounded-2xl p-6 border-white/10">
        <div className="flex items-center gap-2 mb-6">
          <History className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white font-bangla">Past Dhikr Sessions History</h3>
          <span className="text-xs bg-white/10 text-slate-300 px-2.5 py-0.5 rounded-full ml-auto font-mono">
            {historyLogs.length} sessions
          </span>
        </div>

        {historyLogs.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs font-bangla bg-white/5 rounded-xl border border-white/5">
            No past dhikr sessions recorded yet. Reach your goal or reset partial counts to build your history!
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {historyLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-arabic font-bold text-emerald-300 mb-0.5">{log.arabic}</h4>
                    <p className="text-xs font-semibold text-white font-bangla">{log.name}</p>
                    <span className="text-[10px] text-slate-400">{log.completedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-white">
                      {log.count}
                    </span>
                    <span className="text-xs text-slate-400 font-mono"> / {log.goal}</span>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 mt-0.5">
                      {log.count >= log.goal ? 'Goal Met' : 'Session Saved'}
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteHistoryLog(log.id)}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Delete History Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
