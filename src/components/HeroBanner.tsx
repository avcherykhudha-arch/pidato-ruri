import React from 'react';
import { Play, Mic, Clock, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { SPEECH_METADATA } from '../data/speechData';

interface HeroBannerProps {
  completedCount: number;
  totalParagraphs: number;
  totalPracticeMinutes: number;
  onStartSequentialTTS: () => void;
  onOpenTeleprompter: () => void;
  onOpenRecorder: () => void;
  isTTSPlaying: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  completedCount,
  totalParagraphs,
  totalPracticeMinutes,
  onStartSequentialTTS,
  onOpenTeleprompter,
  onOpenRecorder,
  isTTSPlaying,
}) => {
  const percentComplete = Math.round((completedCount / totalParagraphs) * 100);

  return (
    <div className="relative bg-gradient-to-b from-red-50/70 via-white to-slate-50 border-b border-slate-200 overflow-hidden">
      {/* Decorative subtle national red accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Context, Title, Description, CTAs */}
          <div className="lg:col-span-7 space-y-5">
            {/* Unboxed metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-700">
              <span>{SPEECH_METADATA.school}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>KEPALA SEKOLAH: {SPEECH_METADATA.principal}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>{SPEECH_METADATA.date}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>PEMBINA: {SPEECH_METADATA.speaker}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                SPEECH COACH <span className="text-red-700">HARI PAHLAWAN 2026</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-700 font-medium italic border-l-2 border-red-600 pl-3">
                &ldquo;{SPEECH_METADATA.tema || 'PAHLAWANKU TELADANKU, MELANGKAH BERSAMA MELANJUTKAN PERJUANGAN'}&rdquo;
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Pelatih pidato pribadi untuk Bu Ruri Okvawani menjelang amanat Upacara Penaikan Bendera 10 November 2026.
              Latih intonasi berwibawa, penghayatan sejarah, jeda hening refleksi, serta simulasi teleprompter 20 menit di hadapan seluruh siswa dan dewan guru.
            </p>

            {/* Unboxed Metadata Metrics */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-600 pt-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Target Durasi: {SPEECH_METADATA.targetDuration}</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-red-600" />
                <span>Panjang: 2.076 Kata (24 Paragraf)</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>{completedCount} dari {totalParagraphs} Paragraf Dihafal ({percentComplete}%)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartSequentialTTS}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer active:scale-95 ${
                  isTTSPlaying
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-red-700 hover:bg-red-800 text-white'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isTTSPlaying ? 'Jeda / Hentikan Audio TTS' : 'Dengarkan Naskah Lengkap (TTS)'}</span>
              </button>

              <button
                onClick={onOpenTeleprompter}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer active:scale-95"
              >
                <Clock className="w-4 h-4 text-slate-600" />
                <span>Simulasi Teleprompter</span>
              </button>

              <button
                onClick={onOpenRecorder}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer active:scale-95"
              >
                <Mic className="w-4 h-4 text-red-600" />
                <span>Rekam Latihan Mandiri</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Stage with Generated Photo and Progress summary */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-white">
              {/* Photo of ceremony ground & flag with fallback */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src="/src/assets/images/ceremony_flag_morning_1794214546498.jpg"
                  alt="Suasana Upacara Penaikan Bendera Hari Pahlawan SMAS Tunas Baru Jin Seung Batam"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="text-xs font-semibold tracking-wider uppercase text-amber-300">
                    Lapangan Upacara SMAS Tunas Baru Jin Seung
                  </p>
                  <p className="text-sm font-bold text-white drop-shadow-sm">
                    Mimbar Pembina Upacara Hari Pahlawan 2026
                  </p>
                </div>
              </div>

              {/* Progress Bar & Practice Stats */}
              <div className="p-4 space-y-3 bg-white">
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Progres Penguasaan Naskah
                  </span>
                  <span className="font-bold text-slate-900 tabular-nums">{percentComplete}% Selesai</span>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-red-600 to-amber-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${percentComplete}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="block text-slate-500">Total Waktu Latihan</span>
                    <span className="text-sm font-bold text-slate-900 tabular-nums">{totalPracticeMinutes} Menit</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="block text-slate-500">Paragraf Dikuasai</span>
                    <span className="text-sm font-bold text-emerald-700 tabular-nums">
                      {completedCount} / {totalParagraphs}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
