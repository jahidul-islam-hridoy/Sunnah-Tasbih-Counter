import React from 'react';
import { ShieldAlert, HardDrive, WifiOff, Lock } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data/presets';

interface PrivacyProps {
  language: Language;
}

export const Privacy: React.FC<PrivacyProps> = ({ language }) => {
  const dict = DICTIONARY[language];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 border border-emerald-500/30 mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3 font-bangla">{dict.privacy_title}</h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto font-bangla leading-relaxed">
          {dict.privacy_desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Local Storage Feature */}
        <div className="glass-panel rounded-2xl p-6 border-white/10 flex flex-col items-start">
          <div className="p-3 bg-white/5 rounded-xl text-emerald-400 mb-4 border border-white/10">
            <HardDrive className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-2 font-bangla">100% Local Storage</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-bangla">
            All counts, custom zikrs, and personal preference settings are saved directly in your web browser's Local Storage or IndexedDB.
          </p>
        </div>

        {/* Offline First Feature */}
        <div className="glass-panel rounded-2xl p-6 border-white/10 flex flex-col items-start">
          <div className="p-3 bg-white/5 rounded-xl text-amber-400 mb-4 border border-white/10">
            <WifiOff className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-2 font-bangla">Offline Capable</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-bangla">
            No internet connection is required to count, edit, or track streaks. You can safely bookmark this web app or install it to your home screen.
          </p>
        </div>

        {/* Zero Tracking Feature */}
        <div className="glass-panel rounded-2xl p-6 border-white/10 flex flex-col items-start md:col-span-2">
          <div className="p-3 bg-white/5 rounded-xl text-sky-400 mb-4 border border-white/10">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-2 font-bangla">Zero External Analytics Tracking</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-bangla">
            We do not collect, sell, or monitor your personal dhikr habits. Your spiritual devotion is between you and Almighty Allah alone.
          </p>
        </div>

      </div>
    </div>
  );
};
