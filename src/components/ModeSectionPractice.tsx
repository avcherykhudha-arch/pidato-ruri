import React, { useState } from 'react';
import {
  Layers,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  Check,
  BookOpen,
} from 'lucide-react';
import { SpeechParagraph } from '../data/speechData';
import { FormattedSpeechText } from './IntonationBadge';

interface ModeSectionPracticeProps {
  paragraphs: SpeechParagraph[];
  completedIds: string[];
  onToggleComplete: (id: string) => void;
  onPlaySection: (sectionParagraphs: SpeechParagraph[]) => void;
  onPlayParagraph: (paragraph: SpeechParagraph) => void;
  currentPlayingId: string | null;
}

const SECTIONS = [
  { id: 'A', name: 'Bagian A: Pembukaan Berkesan', duration: '2 Menit', desc: 'Salam Kristen (Syalom), Syukur kepada Tuhan Bapa Surgawi, Penghormatan Kepala Sekolah (Bpk. Sabam Sitinjak, S.Th) & Guru, Pantun Pembuka' },
  { id: 'B', name: 'Bagian B: Mengenang Jasa Pahlawan', duration: '3 Menit', desc: 'Surabaya 10 Nov 1945, Pahlawan Bahari Kepri (Raja Haji Fisabilillah & Sultan Mahmud Riayat Syah)' },
  { id: 'C', name: 'Bagian C: Pahlawanku Teladanku', duration: '4 Menit', desc: 'Bukan sekadar buku sejarah. Keteladanan kejujuran, disiplin, kerja keras ayah/ibu di Batam & dewan guru' },
  { id: 'D', name: 'Bagian D: Perjuangan Generasi Muda', duration: '4 Menit', desc: 'Melawan kemalasan, scrolling medsos, stop perundungan/bullying, jauhi narkoba & judi online, etalase Batam' },
  { id: 'E', name: 'Bagian E: Melangkah Bersama', duration: '4 Menit', desc: 'Persatuan gotong royong, Bhinneka Tunggal Ika, solidaritas SMAS Tunas Baru Jin Seung Batam' },
  { id: 'F', name: 'Bagian F: Momen Refleksi Hening', duration: '2 Menit', desc: 'Pertanyaan menyentuh nurani, jeda hening hening 5-8 detik, membahagiakan ayah dan ibu' },
  { id: 'G', name: 'Bagian G: Penutup yang Kuat', duration: '1 Menit', desc: 'Ajakan konkret, tekad bulat, pantun penutup, dan salam penutup Kristen (Syalom & Berkat Tuhan Yesus)' },
];

export const ModeSectionPractice: React.FC<ModeSectionPracticeProps> = ({
  paragraphs,
  completedIds,
  onToggleComplete,
  onPlaySection,
  onPlayParagraph,
  currentPlayingId,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('A');

  const currentSectionMeta = SECTIONS.find((s) => s.id === activeSectionId) || SECTIONS[0];
  const sectionParagraphs = paragraphs.filter((p) => p.sectionId === activeSectionId);
  const sectionCompletedCount = sectionParagraphs.filter((p) => completedIds.includes(p.id)).length;
  const isAllSectionCompleted = sectionParagraphs.length > 0 && sectionCompletedCount === sectionParagraphs.length;

  const handleNextSection = () => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSectionId);
    if (currentIndex < SECTIONS.length - 1) {
      setActiveSectionId(SECTIONS[currentIndex + 1].id);
    }
  };

  const handlePrevSection = () => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSectionId);
    if (currentIndex > 0) {
      setActiveSectionId(SECTIONS[currentIndex - 1].id);
    }
  };

  const handleMarkAllInSection = () => {
    sectionParagraphs.forEach((p) => {
      if (!completedIds.includes(p.id)) {
        onToggleComplete(p.id);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Horizontal Section Picker */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {SECTIONS.map((sec, idx) => {
            const secParas = paragraphs.filter((p) => p.sectionId === sec.id);
            const countDone = secParas.filter((p) => completedIds.includes(p.id)).length;
            const isDone = secParas.length > 0 && countDone === secParas.length;
            const isSelected = activeSectionId === sec.id;

            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`flex flex-col items-start p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-red-700 text-white border-red-800 shadow-sm'
                    : isDone
                    ? 'bg-emerald-50/80 border-emerald-200 text-slate-800 hover:bg-emerald-100/50'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-white' : 'text-red-700'}`}>
                    Tahap {sec.id}
                  </span>
                  {isDone && (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-200' : 'text-emerald-600'}`}
                    />
                  )}
                </div>
                <span className={`text-xs font-semibold truncate w-full mt-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {sec.duration}
                </span>
                <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-red-100' : 'text-slate-500'}`}>
                  {countDone}/{secParas.length} hafal
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Section Header Banner */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-red-200">
              Fokus Latihan Terarah
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {currentSectionMeta.name}
            </h2>
            <p className="text-xs sm:text-sm text-red-100 max-w-2xl">
              {currentSectionMeta.desc}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPlaySection(sectionParagraphs)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-red-800 font-bold text-xs sm:text-sm rounded-lg hover:bg-red-50 transition-colors shadow-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Dengarkan Seluruh Bagian {activeSectionId} (TTS)</span>
            </button>

            {!isAllSectionCompleted && (
              <button
                onClick={handleMarkAllInSection}
                className="flex items-center gap-1.5 px-3 py-2 bg-red-700/80 hover:bg-red-700 border border-red-500 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Tandai Semua Selesai</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress bar for this section */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-xs font-medium text-red-200">
            <span>Progres Bagian {activeSectionId}: {sectionCompletedCount} dari {sectionParagraphs.length} paragraf</span>
            <span className="font-mono font-bold text-white">
              {Math.round((sectionCompletedCount / sectionParagraphs.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-red-950/60 rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-400 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(sectionCompletedCount / sectionParagraphs.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Paragraphs in this section */}
      <div className="space-y-4">
        {sectionParagraphs.map((p) => {
          const isDone = completedIds.includes(p.id);
          const isPlaying = currentPlayingId === p.id;

          return (
            <div
              key={p.id}
              className={`p-5 rounded-2xl border transition-all ${
                isPlaying
                  ? 'bg-amber-50 border-amber-400 shadow-md ring-2 ring-amber-300'
                  : isDone
                  ? 'bg-emerald-50/40 border-emerald-200 shadow-xs'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    Paragraf {p.order}
                  </span>
                  <span className="text-xs text-slate-500">
                    Alokasi Waktu: ~{p.targetDurationMinutes} menit
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPlayParagraph(p)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-red-600" />
                    <span>Dengar</span>
                  </button>
                  <button
                    onClick={() => onToggleComplete(p.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isDone ? 'Sudah Dihafal' : 'Tandai Hafal'}</span>
                  </button>
                </div>
              </div>

              <div className="text-base sm:text-lg font-serif text-slate-900 leading-relaxed">
                <FormattedSpeechText text={p.text} />
              </div>

              {/* Quick Guidance Tag */}
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-600">
                <span>
                  <strong className="text-slate-800">Nada:</strong> {p.guidance.tone}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>
                  <strong className="text-slate-800">Tempo:</strong> {p.guidance.speed}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>
                  <strong className="text-slate-800">Fokus:</strong> {p.guidance.facialExpression}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prev / Next Section Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={handlePrevSection}
          disabled={activeSectionId === 'A'}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Bagian Sebelumnya</span>
        </button>

        <button
          onClick={handleNextSection}
          disabled={activeSectionId === 'G'}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold bg-red-700 text-white hover:bg-red-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Bagian Berikutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
