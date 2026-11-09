import React from 'react';
import { Play, Printer, Mic } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenTeleprompter: () => void;
  onOpenPrint: () => void;
  onOpenRecorder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenTeleprompter,
  onOpenPrint,
  onOpenRecorder,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element in display face) */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('read');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-red-700 transition-colors"
        >
          SPEECH COACH <span className="text-red-600 font-extrabold">·</span> 10 NOV 2026
        </a>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('read')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer ${
              activeTab === 'read' ? 'text-red-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Naskah & Audio
          </button>
          <button
            onClick={() => onSelectTab('sections')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer ${
              activeTab === 'sections' ? 'text-red-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Latihan Bertahap
          </button>
          <button
            onClick={() => onSelectTab('tones')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer ${
              activeTab === 'tones' ? 'text-red-700 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Panduan Intonasi
          </button>
          <button
            onClick={onOpenRecorder}
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-red-700 cursor-pointer text-slate-700"
          >
            <Mic className="w-4 h-4 text-red-600" />
            Rekam Suara
          </button>
          <button
            onClick={onOpenPrint}
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer text-slate-600"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            Cetak Naskah
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenTeleprompter}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
            aria-label="Mulai Simulasi Teleprompter Lapangan"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Simulasi Teleprompter</span>
          </button>
        </div>
      </div>
    </header>
  );
};
