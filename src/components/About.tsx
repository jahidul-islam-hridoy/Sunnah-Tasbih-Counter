import React from 'react';
import { BookOpen, Sparkles, Heart } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data/presets';

interface AboutProps {
  language: Language;
}

export const About: React.FC<AboutProps> = ({ language }) => {
  const dict = DICTIONARY[language];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 border border-emerald-500/30 mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3 font-bangla">{dict.about_title}</h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto font-bangla leading-relaxed">
          {dict.about_intro}
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Quran Quote */}
        <div className="glass-panel rounded-2xl p-6 border-emerald-500/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
          <div className="flex items-center gap-2 text-emerald-400 mb-2 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Al-Quran al-Kareem</span>
          </div>
          <p className="text-base font-medium text-white italic font-bangla leading-relaxed">
            {dict.about_quran}
          </p>
        </div>

        {/* Hadith Quote */}
        <div className="glass-panel rounded-2xl p-6 border-amber-500/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-500" />
          <div className="flex items-center gap-2 text-amber-400 mb-2 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Hadith Shareef</span>
          </div>
          <p className="text-base font-medium text-white italic font-bangla leading-relaxed">
            {dict.about_hadith}
          </p>
        </div>

        {/* Additional Virtues Overview */}
        <div className="glass-panel rounded-2xl p-6 border-white/10">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-bangla">
            <Heart className="w-5 h-5 text-rose-500" />
            <span>Benefits of Daily Remembrance</span>
          </h3>
          <ul className="space-y-3 text-sm text-slate-300 font-bangla">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Dhikr drives away anxiety and brings joy and pleasure to the heart.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>It strengthens the body and mind, illuminating the face and heart.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>It opens the doors of sustenance and invites divine blessings into daily endeavors.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>It creates an unbreakable spiritual shield against negativity and worldly distractions.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};
