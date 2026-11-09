import React from 'react';
import { RotateCcw, Heart, Shield, Award } from 'lucide-react';
import { SPEECH_METADATA } from '../data/speechData';

interface FooterProps {
  onResetProgress: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetProgress }) => {
  const handleResetConfirm = () => {
    if (
      window.confirm(
        'Apakah Anda yakin ingin mereset seluruh progres hafalan dan catatan latihan Bu Ruri?'
      )
    ) {
      onResetProgress();
    }
  };

  return (
    <footer className="no-print bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-bold text-white text-sm">
              SPEECH COACH · HARI PAHLAWAN 10 NOVEMBER 2026
            </p>
            <p className="text-slate-400">
              {SPEECH_METADATA.school} · Pembina Upacara: {SPEECH_METADATA.speaker}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetConfirm}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-400" />
              <span>Reset Progres Latihan</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>
            Tema: &ldquo;{SPEECH_METADATA.title}&rdquo; · Bekerja offline melalui Web Speech API & LocalStorage.
          </p>
          <p className="flex items-center gap-1">
            <span>Didedikasikan untuk perjuangan para guru dan pahlawan bangsa Indonesia</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
