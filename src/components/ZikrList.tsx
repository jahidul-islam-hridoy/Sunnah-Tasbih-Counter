import React, { useState, useMemo } from 'react';
import { Plus, Search, Star, Trash2, Edit3, Check } from 'lucide-react';
import { Zikr, Language } from '../types';
import { DICTIONARY } from '../data/presets';

interface ZikrListProps {
  zikrs: Zikr[];
  activeZikrId: string;
  onSelectZikr: (id: string) => void;
  onAddZikr: (zikr: Omit<Zikr, 'id' | 'count' | 'createdAt'>) => void;
  onEditZikr: (id: string, zikr: Partial<Zikr>) => void;
  onDeleteZikr: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  language: Language;
}

export const ZikrList: React.FC<ZikrListProps> = ({
  zikrs,
  activeZikrId,
  onSelectZikr,
  onAddZikr,
  onEditZikr,
  onDeleteZikr,
  onToggleFavorite,
  language,
}) => {
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editZikrId, setEditZikrId] = useState<string | null>(null);

  // Form State
  const [formArabic, setFormArabic] = useState('');
  const [formTrans, setFormTrans] = useState('');
  const [formMeaning, setFormMeaning] = useState('');
  const [formGoal, setFormGoal] = useState<number>(100);

  const dict = DICTIONARY[language];

  // Filtered Zikrs
  const filteredZikrs = useMemo(() => {
    return zikrs.filter((z) => {
      const matchSearch =
        z.arabic.includes(search) ||
        (z.transliteration[language] || z.transliteration.en).toLowerCase().includes(search.toLowerCase()) ||
        (z.translation[language] || z.translation.en).toLowerCase().includes(search.toLowerCase());

      if (filter === 'favorites') {
        return z.isFavorite && matchSearch;
      }
      return matchSearch;
    });
  }, [zikrs, filter, search, language]);

  const openAddModal = () => {
    setEditZikrId(null);
    setFormArabic('');
    setFormTrans('');
    setFormMeaning('');
    setFormGoal(100);
    setShowAddModal(true);
  };

  const openEditModal = (zikr: Zikr) => {
    setEditZikrId(zikr.id);
    setFormArabic(zikr.arabic);
    setFormTrans(zikr.transliteration[language] || zikr.transliteration.en);
    setFormMeaning(zikr.translation[language] || zikr.translation.en);
    setFormGoal(zikr.goal);
    setShowAddModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formArabic || !formTrans) return;

    if (editZikrId) {
      onEditZikr(editZikrId, {
        arabic: formArabic,
        transliteration: { en: formTrans, bn: formTrans, ar: formTrans },
        translation: { en: formMeaning, bn: formMeaning, ar: formMeaning },
        goal: formGoal,
      });
    } else {
      onAddZikr({
        arabic: formArabic,
        transliteration: { en: formTrans, bn: formTrans, ar: formTrans },
        translation: { en: formMeaning, bn: formMeaning, ar: formMeaning },
        goal: formGoal,
        isCustom: true,
        isFavorite: true,
      });
    }

    setShowAddModal(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-bangla">
            <span>{dict.presets} & {dict.custom_zikrs}</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-sans font-semibold">
              {filteredZikrs.length}
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          {/* Search Bar */}
          <div className="relative flex-1 md:w-60">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={dict.search_placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {dict.filter_all}
            </button>
            <button
              onClick={() => setFilter('favorites')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                filter === 'favorites'
                  ? 'bg-amber-500 text-[#0B1215] font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{dict.filter_favorites}</span>
            </button>
          </div>

          {/* Add Custom Zikr Button */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all duration-200 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{dict.add_zikr}</span>
          </button>
        </div>
      </div>

      {/* Grid of Zikrs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredZikrs.map((zikr) => {
          const isSelected = zikr.id === activeZikrId;
          const transText = zikr.transliteration[language] || zikr.transliteration.en;
          const meanText = zikr.translation[language] || zikr.translation.en;
          const progressPercent = Math.min(Math.round((zikr.count / zikr.goal) * 100), 100);

          return (
            <div
              key={zikr.id}
              onClick={() => onSelectZikr(zikr.id)}
              className={`glass-panel rounded-2xl p-5 relative cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                isSelected 
                  ? 'border-emerald-500/60 shadow-xl shadow-emerald-500/10 bg-[#121B22]/90 scale-[1.02]' 
                  : 'hover:border-white/20 hover:bg-[#121B22]/50'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(zikr.id);
                      }}
                      className="p-1 rounded-lg hover:bg-white/10 text-amber-400 transition-colors"
                      title="Favorite"
                    >
                      <Star className={`w-4 h-4 ${zikr.isFavorite ? 'fill-current text-amber-400' : 'text-slate-500'}`} />
                    </button>
                    {zikr.isCustom && (
                      <span className="text-[10px] bg-sky-500/10 border border-sky-500/20 text-sky-400 px-2 py-0.5 rounded uppercase font-semibold">
                        Custom
                      </span>
                    )}
                  </div>

                  {/* Actions for custom zikr */}
                  {zikr.isCustom && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(zikr);
                        }}
                        className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(dict.delete_confirm)) {
                            onDeleteZikr(zikr.id);
                          }
                        }}
                        className="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Arabic Text Display */}
                <h4 className="text-2xl font-arabic font-bold text-emerald-400 mb-2 leading-relaxed text-right py-1">
                  {zikr.arabic}
                </h4>

                <h5 className="text-sm font-bold text-white font-bangla mb-1">
                  {transText}
                </h5>

                <p className="text-xs text-slate-400 italic line-clamp-2 font-bangla mb-4">
                  "{meanText}"
                </p>
              </div>

              {/* Progress and Count Indicator */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-medium">Count</span>
                  <span className="text-lg font-bold font-mono text-white">
                    {zikr.count} <span className="text-xs font-normal text-slate-400">/ {zikr.goal}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[#0B1215] shadow-md shadow-emerald-500/30">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#121B22] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {editZikrId ? dict.edit_zikr : dict.add_zikr}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {dict.zikr_arabic} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="سُبْحَانَ ٱللَّٰهِ"
                  value={formArabic}
                  onChange={(e) => setFormArabic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-emerald-400 font-arabic focus:outline-none focus:border-emerald-500 text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {dict.zikr_name} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="SubhanAllah"
                  value={formTrans}
                  onChange={(e) => setFormTrans(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500 font-bangla"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {dict.zikr_translation}
                </label>
                <input
                  type="text"
                  placeholder="Glory be to Allah"
                  value={formMeaning}
                  onChange={(e) => setFormMeaning(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500 font-bangla"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {dict.zikr_goal}
                </label>
                <input
                  type="number"
                  min={1}
                  max={100000}
                  value={formGoal}
                  onChange={(e) => setFormGoal(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                >
                  {dict.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-colors"
                >
                  {dict.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
