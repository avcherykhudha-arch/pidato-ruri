import React, { useState } from 'react';
import {
  Brain,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Volume2,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { SpeechParagraph } from '../data/speechData';
import { extractParagraphCue } from '../utils/speechLogic';
import { FormattedSpeechText } from './IntonationBadge';

interface ModeMemoryRecallProps {
  paragraphs: SpeechParagraph[];
  completedIds: string[];
  onToggleComplete: (id: string) => void;
  onPlayParagraph: (paragraph: SpeechParagraph) => void;
}

export const ModeMemoryRecall: React.FC<ModeMemoryRecallProps> = ({
  paragraphs,
  completedIds,
  onToggleComplete,
  onPlayParagraph,
}) => {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleRevealAll = () => {
    setRevealedIds(new Set(paragraphs.map((p) => p.id)));
  };

  const handleHideAll = () => {
    setRevealedIds(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-red-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Mode Uji Ingatan Mandiri (Trigger Recall)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Hanya kalimat pembuka dan kata kunci inti yang ditampilkan. Ucapkan kelanjutan pidato secara lisan dari ingatanmu, lalu klik &quot;Periksa Naskah&quot; untuk mencocokkan ketepatannya.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRevealAll}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors cursor-pointer"
            >
              Buka Semua Naskah
            </button>
            <button
              onClick={handleHideAll}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              Sembunyikan Semua
            </button>
          </div>
        </div>
      </div>

      {/* Paragraph Cards with Cue Prompts */}
      <div className="space-y-4">
        {paragraphs.map((p) => {
          const cue = extractParagraphCue(p.text);
          const isRevealed = revealedIds.has(p.id);
          const isDone = completedIds.includes(p.id);

          return (
            <div
              key={p.id}
              className={`rounded-2xl border transition-all p-5 sm:p-6 ${
                isDone
                  ? 'bg-emerald-50/40 border-emerald-200 shadow-xs'
                  : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    Paragraf {p.order}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {p.sectionTitle}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReveal(p.id)}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Tutup Naskah</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-red-600" />
                        <span>Periksa Naskah Asli</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onPlayParagraph(p)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 cursor-pointer"
                    title="Dengarkan pembacaan naskah ini"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dengar</span>
                  </button>
                </div>
              </div>

              {/* Trigger Cue Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                  Kalimat Pemicu Ingatan (Trigger Speech):
                </span>
                <p className="text-lg sm:text-xl font-serif font-bold text-slate-900 italic">
                  &ldquo;{cue.triggerText}&rdquo;
                </p>

                {/* Keywords Cues */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Kata Kunci:</span>
                  {p.guidance.emphasisWords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-semibold text-[11px]"
                    >
                      {kw}
                    </span>
                  ))}
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">Nada: {p.guidance.tone}</span>
                </div>
              </div>

              {/* Revealed Full Script if toggled */}
              {isRevealed && (
                <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3 animate-fadeIn">
                  <span className="text-xs font-bold text-amber-900 block">
                    Naskah Lengkap Paragraf {p.order}:
                  </span>
                  <div className="font-serif text-base sm:text-lg text-slate-900 leading-relaxed">
                    <FormattedSpeechText text={p.text} />
                  </div>
                </div>
              )}

              {/* Self Assessment Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Evaluasi Diri Paragraf Ini:
                </span>
                <button
                  onClick={() => onToggleComplete(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isDone
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isDone ? 'Sudah Lancar Dihafal' : 'Tandai Sudah Lancar'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
