import React, { useState, useMemo } from 'react';
import {
  EyeOff,
  Eye,
  Sliders,
  RotateCcw,
  Sparkles,
  Volume2,
  CheckCircle,
} from 'lucide-react';
import { SpeechParagraph } from '../data/speechData';
import { generateClozeItems, ClozeWordItem } from '../utils/speechLogic';

interface ModeStepClozeProps {
  paragraphs: SpeechParagraph[];
  onPlayParagraph: (paragraph: SpeechParagraph) => void;
}

export const ModeStepCloze: React.FC<ModeStepClozeProps> = ({ paragraphs, onPlayParagraph }) => {
  const [difficulty, setDifficulty] = useState<number>(50);
  const [selectedParagraphId, setSelectedParagraphId] = useState<string>('all');
  const [revealedWordIds, setRevealedWordIds] = useState<Set<string>>(new Set());

  // Filter paragraphs based on selection
  const activeParagraphs = useMemo(() => {
    if (selectedParagraphId === 'all') return paragraphs;
    return paragraphs.filter((p) => p.id === selectedParagraphId);
  }, [selectedParagraphId, paragraphs]);

  // Generate cloze items for active paragraphs
  const clozeData = useMemo(() => {
    const map = new Map<string, ClozeWordItem[]>();
    activeParagraphs.forEach((p) => {
      map.set(p.id, generateClozeItems(p.text, difficulty));
    });
    return map;
  }, [activeParagraphs, difficulty]);

  const toggleRevealWord = (wordId: string) => {
    setRevealedWordIds((prev) => {
      const next = new Set(prev);
      if (next.has(wordId)) {
        next.delete(wordId);
      } else {
        next.add(wordId);
      }
      return next;
    });
  };

  const handleRevealAll = () => {
    const allIds = new Set<string>();
    clozeData.forEach((items) => {
      items.forEach((item) => {
        if (item.isHidden) allIds.add(item.id);
      });
    });
    setRevealedWordIds(allIds);
  };

  const handleResetHiding = () => {
    setRevealedWordIds(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Control Banner: Difficulty & Paragraph Filter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-red-600" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Mode Hafalan Bertahap (Fill-in-the-Blanks)
              </h2>
            </div>
            <p className="text-xs text-slate-600">
              Sembunyikan sebagian kata untuk menguji daya ingat. Klik pada kata yang disamarkan untuk mengintip.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRevealAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Buka Semua Kata</span>
            </button>
            <button
              onClick={handleResetHiding}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sembunyikan Lagi</span>
            </button>
          </div>
        </div>

        {/* Difficulty Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Tingkat Kesulitan:</span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              {[25, 50, 75, 100].map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    setDifficulty(level);
                    setRevealedWordIds(new Set());
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    difficulty === level
                      ? 'bg-red-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {level}% Tersembunyi
                </button>
              ))}
            </div>
          </div>

          {/* Paragraph Filter Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-600">Pilih Bagian / Paragraf:</label>
            <select
              value={selectedParagraphId}
              onChange={(e) => setSelectedParagraphId(e.target.value)}
              className="text-xs font-medium bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer"
            >
              <option value="all">Tampilkan Semua 24 Paragraf</option>
              {paragraphs.map((p) => (
                <option key={p.id} value={p.id}>
                  P{p.order}: {p.sectionTitle.split(':')[0]} (~{p.targetDurationMinutes} mnt)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cloze Paragraphs Cards */}
      <div className="space-y-5">
        {activeParagraphs.map((p) => {
          const items = clozeData.get(p.id) || [];
          const totalWords = items.filter((i) => i.cleanWord).length;
          const hiddenWords = items.filter((i) => i.isHidden).length;
          const revealedCount = items.filter((i) => i.isHidden && revealedWordIds.has(i.id)).length;

          return (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    Paragraf {p.order}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {p.sectionTitle}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">
                    {hiddenWords - revealedCount} kata tersamar
                  </span>
                  <button
                    onClick={() => onPlayParagraph(p)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-red-600" />
                    <span>Dengar Suara Asli</span>
                  </button>
                </div>
              </div>

              {/* Render Cloze Text with interactive buttons */}
              <div className="font-serif text-lg sm:text-xl text-slate-900 leading-loose">
                {items.map((item) => {
                  if (!item.cleanWord) {
                    return <span key={item.id}>{item.original}</span>;
                  }

                  const isCurrentlyRevealed = revealedWordIds.has(item.id);

                  if (item.isHidden && !isCurrentlyRevealed) {
                    return (
                      <span key={item.id} className="inline-block mx-0.5">
                        {item.punctuationPrefix}
                        <button
                          type="button"
                          onClick={() => toggleRevealWord(item.id)}
                          className="inline-flex items-center justify-center px-2 py-0.5 bg-red-50 hover:bg-red-100 border border-red-300 text-red-800 rounded font-sans text-xs font-bold cursor-pointer transition-colors shadow-2xs select-none active:scale-95"
                          title="Klik untuk mengintip kata ini"
                        >
                          <span className="tracking-widest">······</span>
                        </button>
                        {item.punctuationSuffix}
                      </span>
                    );
                  }

                  if (item.isHidden && isCurrentlyRevealed) {
                    return (
                      <span key={item.id} className="inline-block mx-0.5">
                        {item.punctuationPrefix}
                        <span
                          onClick={() => toggleRevealWord(item.id)}
                          className="inline-flex px-1.5 py-0.5 bg-emerald-100 text-emerald-950 font-bold border border-emerald-300 rounded cursor-pointer text-base"
                          title="Kata berhasil diintip (klik untuk menyembunyikan lagi)"
                        >
                          {item.cleanWord}
                        </span>
                        {item.punctuationSuffix}
                      </span>
                    );
                  }

                  return (
                    <span key={item.id}>
                      {item.punctuationPrefix}
                      {item.cleanWord}
                      {item.punctuationSuffix}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
