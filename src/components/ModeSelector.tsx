import React from 'react';
import {
  Volume2,
  Layers,
  EyeOff,
  Brain,
  MonitorPlay,
  FileText,
  Sparkles,
} from 'lucide-react';

export type AppMode = 'read' | 'sections' | 'cloze' | 'recall' | 'teleprompter' | 'cuecards' | 'tones';

interface ModeSelectorProps {
  activeMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ activeMode, onSelectMode }) => {
  const modes: Array<{ id: AppMode; label: string; icon: React.ReactNode; shortDesc: string }> = [
    {
      id: 'read',
      label: '1. Baca & Dengarkan',
      icon: <Volume2 className="w-4 h-4" />,
      shortDesc: 'Teks lengkap & TTS',
    },
    {
      id: 'sections',
      label: '2. Per Bagian (A-G)',
      icon: <Layers className="w-4 h-4" />,
      shortDesc: 'Tahap 7 bagian pidato',
    },
    {
      id: 'cloze',
      label: '3. Hafalan Bertahap',
      icon: <EyeOff className="w-4 h-4" />,
      shortDesc: 'Sembunyikan 25-100%',
    },
    {
      id: 'recall',
      label: '4. Uji Ingatan',
      icon: <Brain className="w-4 h-4" />,
      shortDesc: 'Pemicu kata kunci',
    },
    {
      id: 'teleprompter',
      label: '5. Simulasi Pembina',
      icon: <MonitorPlay className="w-4 h-4" />,
      shortDesc: 'Teleprompter 20 menit',
    },
    {
      id: 'cuecards',
      label: '6. Kartu Podium',
      icon: <FileText className="w-4 h-4" />,
      shortDesc: 'Cue cards tanpa teks',
    },
    {
      id: 'tones',
      label: 'Pelatihan Ekspresi',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      shortDesc: '3 Gaya & 7 Kutipan',
    },
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          {modes.map((mode) => {
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => onSelectMode(mode.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-red-700 text-white shadow-sm ring-1 ring-red-800'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
                aria-label={`Pilih ${mode.label}`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-500'}>{mode.icon}</span>
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
