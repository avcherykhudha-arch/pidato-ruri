import React, { useState } from 'react';
import { Printer, X, FileText, Check, Eye } from 'lucide-react';
import { SpeechParagraph, SPEECH_METADATA } from '../data/speechData';
import { FormattedSpeechText } from './IntonationBadge';
import { stripIntonationTags } from '../utils/speechLogic';

interface PrintableSpeechModalProps {
  isOpen: boolean;
  onClose: () => void;
  paragraphs: SpeechParagraph[];
}

export const PrintableSpeechModal: React.FC<PrintableSpeechModalProps> = ({
  isOpen,
  onClose,
  paragraphs,
}) => {
  const [includeIntonationTags, setIncludeIntonationTags] = useState<boolean>(true);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn my-auto">
        {/* Modal Top Bar (Hidden during print) */}
        <div className="no-print p-4 sm:p-5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Format Cetak Map Pembina Upacara
              </h3>
              <p className="text-xs text-slate-300">
                Disusun khusus untuk diselipkan di dalam Map Upacara Bu Ruri Okvawani.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeIntonationTags}
                onChange={(e) => setIncludeIntonationTags(e.target.checked)}
                className="rounded accent-red-600 cursor-pointer"
              />
              <span>Sertakan Panduan Intonasi [TEGAS / LEMBUT]</span>
            </label>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sekarang (Print / PDF)</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Tutup jendela cetak"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-12 font-serif text-slate-900 bg-white">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* School Letterhead & Formal Document Header */}
            <div className="text-center pb-6 border-b-2 border-slate-900 space-y-2">
              <p className="font-sans font-bold text-xs uppercase tracking-widest text-slate-600">
                PEMERINTAH PROVINSI KEPULAUAN RIAU · DINAS PENDIDIKAN
              </p>
              <h1 className="font-sans font-extrabold text-lg sm:text-xl text-slate-950 uppercase tracking-tight">
                SMAS TUNAS BARU JIN SEUNG BATAM
              </h1>
              <p className="font-sans text-xs text-slate-600">
                Naskah Amanat Pembina Upacara Penaikan Bendera Hari Pahlawan Nasional 2026
              </p>

              <div className="pt-3 font-sans text-xs flex flex-wrap justify-center gap-4 text-slate-800 border-t border-slate-200 mt-3 font-semibold">
                <span>Kepala Sekolah: {SPEECH_METADATA.principal}</span>
                <span>·</span>
                <span>Hari/Tanggal: {SPEECH_METADATA.date}</span>
                <span>·</span>
                <span>Pembina Upacara: {SPEECH_METADATA.speaker}</span>
                <span>·</span>
                <span>Alokasi: {SPEECH_METADATA.targetDuration}</span>
              </div>
            </div>

            {/* Speech Title */}
            <div className="text-center space-y-2 py-2">
              <h2 className="font-sans text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-wide">
                &ldquo;{SPEECH_METADATA.title}&rdquo;
              </h2>
            </div>

            {/* Paragraphs with formal indentation and numbering */}
            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-justify">
              {paragraphs.map((p) => (
                <div key={p.id} className="space-y-1">
                  <div className="font-sans text-[11px] font-bold text-red-800 uppercase tracking-wider mb-1">
                    {p.sectionTitle} · Paragraf {p.order} (~{p.targetDurationMinutes} mnt)
                  </div>
                  <p className="indent-8 text-slate-900">
                    {includeIntonationTags ? (
                      <FormattedSpeechText text={p.text} />
                    ) : (
                      stripIntonationTags(p.text)
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* Sign-off Seal */}
            <div className="pt-10 grid grid-cols-2 gap-8 font-sans text-xs text-slate-800 border-t border-slate-200">
              <div className="text-center space-y-12">
                <div>
                  <p>Mengetahui,</p>
                  <p className="font-semibold">Kepala SMAS Tunas Baru Jin Seung Batam</p>
                </div>
                <div>
                  <p className="font-bold underline text-sm">{SPEECH_METADATA.principal}</p>
                  <p className="text-slate-600">Kepala Sekolah</p>
                </div>
              </div>

              <div className="text-center space-y-12">
                <div>
                  <p>Batam, 10 November 2026</p>
                  <p className="font-semibold">Guru / Pembina Upacara,</p>
                </div>
                <div>
                  <p className="font-bold underline text-sm">{SPEECH_METADATA.speaker}</p>
                  <p className="text-slate-600">{SPEECH_METADATA.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
