import React, { useState } from 'react';
import {
  Volume2,
  Square,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Edit3,
  Bookmark,
  Sparkles,
  Info,
} from 'lucide-react';
import { SpeechParagraph } from '../data/speechData';
import { FormattedSpeechText } from './IntonationBadge';

interface ModeReadListenProps {
  paragraphs: SpeechParagraph[];
  completedIds: string[];
  notes: Record<string, string>;
  currentPlayingId: string | null;
  onToggleComplete: (id: string) => void;
  onSaveNote: (id: string, note: string) => void;
  onPlayParagraph: (paragraph: SpeechParagraph) => void;
  onStopTTS: () => void;
  isPlayingTTS: boolean;
}

export const ModeReadListen: React.FC<ModeReadListenProps> = ({
  paragraphs,
  completedIds,
  notes,
  currentPlayingId,
  onToggleComplete,
  onSaveNote,
  onPlayParagraph,
  onStopTTS,
  isPlayingTTS,
}) => {
  const [expandedGuidanceIds, setExpandedGuidanceIds] = useState<Set<string>>(new Set());
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState<string>('');
  const [fontSize, setFontSize] = useState<'md' | 'lg' | 'xl'>('lg');

  const toggleGuidance = (id: string) => {
    const next = new Set(expandedGuidanceIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedGuidanceIds(next);
  };

  const handleStartEditNote = (id: string) => {
    setEditingNoteId(id);
    setTempNoteText(notes[id] || '');
  };

  const handleSaveNote = (id: string) => {
    onSaveNote(id, tempNoteText);
    setEditingNoteId(null);
  };

  const getTextSizeClass = () => {
    switch (fontSize) {
      case 'md':
        return 'text-base leading-relaxed';
      case 'xl':
        return 'text-xl sm:text-2xl leading-relaxed';
      case 'lg':
      default:
        return 'text-lg sm:text-xl leading-relaxed';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Font Size, Tip */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-100/90 border border-slate-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
          <Info className="w-4 h-4 text-red-600 shrink-0" />
          <span>
            Klik tombol <strong>Dengarkan</strong> pada setiap paragraf untuk mendengar pelafalan bahasa Indonesia dengan tempo upacara.
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <span>Ukuran Huruf:</span>
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setFontSize('md')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                fontSize === 'md' ? 'bg-red-700 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Standar
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                fontSize === 'lg' ? 'bg-red-700 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Besar
            </button>
            <button
              onClick={() => setFontSize('xl')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                fontSize === 'xl' ? 'bg-red-700 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ekstra
            </button>
          </div>
        </div>
      </div>

      {/* Paragraphs List */}
      <div className="space-y-6">
        {paragraphs.map((p) => {
          const isCompleted = completedIds.includes(p.id);
          const isPlayingThis = currentPlayingId === p.id;
          const isGuidanceOpen = expandedGuidanceIds.has(p.id);
          const hasNote = Boolean(notes[p.id]);

          return (
            <div
              key={p.id}
              id={`paragraph-${p.id}`}
              className={`rounded-2xl transition-all duration-300 border ${
                isPlayingThis
                  ? 'bg-amber-50/70 border-amber-400 shadow-md ring-2 ring-amber-400/40'
                  : isCompleted
                  ? 'bg-white border-emerald-200/90 shadow-xs'
                  : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/70 rounded-t-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    Paragraf {p.order}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 truncate max-w-xs sm:max-w-md">
                    {p.sectionTitle}
                  </span>
                  <span aria-hidden="true" className="text-slate-300 hidden sm:inline">·</span>
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    ~{p.targetDurationMinutes} Menit
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mark Completed Checkbox */}
                  <button
                    onClick={() => onToggleComplete(p.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                    aria-label={`Tandai paragraf ${p.order} sudah dihafal`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                        <span>Hafal</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Belum Hafal</span>
                      </>
                    )}
                  </button>

                  {/* Play Paragraph TTS */}
                  <button
                    onClick={() => {
                      if (isPlayingThis) {
                        onStopTTS();
                      } else {
                        onPlayParagraph(p);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                      isPlayingThis
                        ? 'bg-amber-600 hover:bg-amber-700 text-white animate-pulse'
                        : 'bg-red-700 hover:bg-red-800 text-white'
                    }`}
                    aria-label={`Dengarkan pelafalan paragraf ${p.order}`}
                  >
                    {isPlayingThis ? (
                      <>
                        <Square className="w-3 h-3 fill-current" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3" />
                        <span>Dengar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Speech Text Content */}
              <div className="p-5 sm:p-6 space-y-4">
                <div
                  className={`font-serif text-slate-900 tracking-normal ${getTextSizeClass()} ${
                    isPlayingThis ? 'font-medium' : ''
                  }`}
                >
                  <FormattedSpeechText text={p.text} />
                </div>

                {/* Personal Notes Section */}
                {editingNoteId === p.id ? (
                  <div className="pt-2 space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <label className="block text-xs font-bold text-slate-700">
                      Catatan Pribadi Bu Ruri untuk Paragraf {p.order}:
                    </label>
                    <textarea
                      rows={2}
                      value={tempNoteText}
                      onChange={(e) => setTempNoteText(e.target.value)}
                      placeholder="Contoh: Di bagian ini, jangan lupa tatap barisan guru di sebelah kiri mimbar..."
                      className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 bg-white"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => handleSaveNote(p.id)}
                        className="px-3 py-1 text-xs font-semibold bg-red-700 text-white rounded hover:bg-red-800 cursor-pointer"
                      >
                        Simpan Catatan
                      </button>
                    </div>
                  </div>
                ) : hasNote ? (
                  <div className="flex items-start justify-between gap-3 p-3 bg-amber-50/80 rounded-lg border border-amber-200 text-xs text-amber-900">
                    <div className="flex items-start gap-2">
                      <Bookmark className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Catatan Pembina: </span>
                        <span>{notes[p.id]}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartEditNote(p.id)}
                      className="text-amber-800 hover:text-amber-950 p-1 cursor-pointer"
                      title="Edit catatan"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartEditNote(p.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>+ Tambah catatan pribadi untuk paragraf ini</span>
                  </button>
                )}
              </div>

              {/* Guidance Accordion Footer */}
              <div className="border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
                <button
                  onClick={() => toggleGuidance(p.id)}
                  className="w-full px-5 py-3 flex items-center justify-between text-xs font-bold text-slate-700 hover:text-red-700 hover:bg-slate-100/60 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Panduan Sikap, Nada Suara & Ekspresi Pembina Upacara
                  </span>
                  {isGuidanceOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </button>

                {isGuidanceOpen && (
                  <div className="px-5 pb-5 pt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs border-t border-slate-100 bg-white">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="block font-bold text-red-700 mb-1">Nada & Karakter Suara:</span>
                      <p className="text-slate-700">{p.guidance.tone}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="block font-bold text-slate-800 mb-1">Kecepatan & Jeda Napas:</span>
                      <p className="text-slate-700">{p.guidance.speed}</p>
                      <p className="text-slate-500 mt-1 italic">{p.guidance.pauseMoment}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="block font-bold text-slate-800 mb-1">Kata Kunci Penekanan:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {p.guidance.emphasisWords.map((word, wIdx) => (
                          <span
                            key={wIdx}
                            className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-semibold text-[11px]"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 md:col-span-2 lg:col-span-1">
                      <span className="block font-bold text-slate-800 mb-1">Ekspresi Wajah:</span>
                      <p className="text-slate-700">{p.guidance.facialExpression}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 md:col-span-2">
                      <span className="block font-bold text-slate-800 mb-1">Sikap Tubuh & Kontak Mata:</span>
                      <p className="text-slate-700">{p.guidance.bodyPosture}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
