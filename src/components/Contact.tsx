import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data/presets';

interface ContactProps {
  language: Language;
}

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const dict = DICTIONARY[language];
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 border border-emerald-500/30 mb-4">
          <Mail className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3 font-bangla">{dict.contact_title}</h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto font-bangla leading-relaxed">
          {dict.contact_desc}
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 md:p-8 border-white/10 shadow-2xl">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white font-bangla">{dict.message_sent}</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto font-bangla">
              We appreciate your suggestions to improve Sunnah Tasbih.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="px-6 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-bangla">
                {dict.name_label}
              </label>
              <input
                type="text"
                required
                placeholder="Abdullah"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors font-bangla"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-bangla">
                {dict.email_label}
              </label>
              <input
                type="email"
                required
                placeholder="abdullah@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-bangla">
                {dict.msg_label} *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Assalamu Alaikum, I would like to request a feature..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors font-bangla resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                <span>{dict.send_message}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
