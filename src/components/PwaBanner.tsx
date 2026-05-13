import React from 'react';
import { Download, X } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data/presets';

interface PwaBannerProps {
  language: Language;
  onDismiss: () => void;
}

export const PwaBanner: React.FC<PwaBannerProps> = ({ language, onDismiss }) => {
  const dict = DICTIONARY[language];

  return (
    <div className="bg-gradient-to-r from-emerald-900/80 via-[#0B1215] to-emerald-950 border-b border-emerald-500/20 px-4 py-3 shadow-lg text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30 shrink-0">
            <Download className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">{dict.install_app}</h4>
            <p className="text-xs text-slate-300">{dict.install_desc}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              alert('To install Sunnah Tasbih, tap the Share icon (iOS) or Menu (Android) and select "Add to Home Screen".');
              onDismiss();
            }}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/30 transition-all duration-200"
          >
            {dict.install_button}
          </button>
          <button
            onClick={onDismiss}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title={dict.dismiss}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
