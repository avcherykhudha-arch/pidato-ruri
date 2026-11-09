import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  Maximize2,
  Minimize2,
  Clock,
  Sliders,
  FlipHorizontal,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { SpeechParagraph, SPEECH_METADATA } from '../data/speechData';
import { FormattedSpeechText } from './IntonationBadge';
import { ceremonyAudio } from '../services/audioService';

interface ModeTeleprompterProps {
  paragraphs: SpeechParagraph[];
  onClose?: () => void;
  isModal?: boolean;
}

export const ModeTeleprompter: React.FC<ModeTeleprompterProps> = ({
  paragraphs,
  onClose,
  isModal = false,
}) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(2); // 1 to 6
  const [fontSize, setFontSize] = useState<number>(32); // in px
  const [isMirrored, setIsMirrored] = useState<boolean>(false);
  const [isAmbientOn, setIsAmbientOn] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [totalTargetSeconds] = useState<number>(20 * 60); // 20 minutes

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAnimRef = useRef<number | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isScrolling) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isScrolling]);

  // Smooth autoscroll loop
  useEffect(() => {
    const scrollStep = () => {
      if (containerRef.current && isScrolling) {
        // Calculate scroll rate: base multiplier
        const step = scrollSpeed * 0.6;
        containerRef.current.scrollTop += step;

        // Check if bottom reached
        const isBottom =
          containerRef.current.scrollTop + containerRef.current.clientHeight >=
          containerRef.current.scrollHeight - 5;
        if (isBottom) {
          setIsScrolling(false);
          return;
        }
      }
      scrollAnimRef.current = requestAnimationFrame(scrollStep);
    };

    if (isScrolling) {
      scrollAnimRef.current = requestAnimationFrame(scrollStep);
    } else {
      if (scrollAnimRef.current) {
        cancelAnimationFrame(scrollAnimRef.current);
      }
    }

    return () => {
      if (scrollAnimRef.current) {
        cancelAnimationFrame(scrollAnimRef.current);
      }
    };
  }, [isScrolling, scrollSpeed]);

  const toggleScroll = () => {
    if (!isScrolling && secondsElapsed === 0) {
      // Play solemn starting chime
      ceremonyAudio.playCeremonyChime(440);
    }
    setIsScrolling(!isScrolling);
  };

  const handleReset = () => {
    setIsScrolling(false);
    setSecondsElapsed(0);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleAmbient = () => {
    const next = !isAmbientOn;
    setIsAmbientOn(next);
    ceremonyAudio.toggleAmbientField(next, 0.15);
  };

  // Format time mm:ss
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingSeconds = Math.max(0, totalTargetSeconds - secondsElapsed);
  const isNearTime = remainingSeconds <= 300 && remainingSeconds > 0; // <= 5 min
  const isCriticalTime = remainingSeconds <= 120 && remainingSeconds > 0; // <= 2 min

  return (
    <div
      className={`relative w-full bg-slate-950 text-white flex flex-col font-sans select-none overflow-hidden ${
        isModal ? 'fixed inset-0 z-50 h-screen' : 'rounded-2xl min-h-[680px] h-[80vh] border border-slate-800'
      }`}
    >
      {/* Top Teleprompter HUD / Toolbar */}
      <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Tutup Teleprompter"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase">
              MIMBAR PEMBINA UPACARA · HARI PAHLAWAN 2026
            </h3>
            <span className="text-[11px] text-red-400 font-medium">
              SMAS TUNAS BARU JIN SEUNG BATAM
            </span>
          </div>
        </div>

        {/* 20-Minute Ceremony Timer HUD */}
        <div className="flex items-center gap-3 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
          <Clock className="w-4 h-4 text-slate-400" />
          <div className="flex items-baseline gap-2 text-xs">
            <span className="text-slate-400">Berjalan:</span>
            <span className="font-mono font-bold text-base text-white tabular-nums">
              {formatTime(secondsElapsed)}
            </span>
            <span className="text-slate-500">/</span>
            <span
              className={`font-mono font-bold text-xs tabular-nums ${
                isCriticalTime
                  ? 'text-red-400 animate-pulse'
                  : isNearTime
                  ? 'text-amber-400'
                  : 'text-slate-400'
              }`}
            >
              Sisa {formatTime(remainingSeconds)}
            </span>
          </div>
        </div>

        {/* Controls: Speed, Font Size, Audio, Play/Pause */}
        <div className="flex items-center gap-2">
          {/* Scroll Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg text-xs">
            <span className="text-slate-400 font-medium">Kec:</span>
            <button
              onClick={() => setScrollSpeed((s) => Math.max(1, s - 1))}
              className="px-1 text-slate-300 hover:text-white cursor-pointer"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono font-bold text-amber-400 w-4 text-center">{scrollSpeed}</span>
            <button
              onClick={() => setScrollSpeed((s) => Math.min(6, s + 1))}
              className="px-1 text-slate-300 hover:text-white cursor-pointer"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Font Size Selector */}
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg text-xs">
            <span className="text-slate-400 font-medium">Teks:</span>
            <button
              onClick={() => setFontSize((f) => Math.max(22, f - 4))}
              className="px-1.5 text-slate-300 hover:text-white cursor-pointer"
              title="Perkecil huruf"
            >
              A-
            </button>
            <span className="font-mono text-white text-[11px]">{fontSize}px</span>
            <button
              onClick={() => setFontSize((f) => Math.min(52, f + 4))}
              className="px-1.5 text-slate-300 hover:text-white cursor-pointer"
              title="Perbesar huruf"
            >
              A+
            </button>
          </div>

          {/* Mirror Flip Button */}
          <button
            onClick={() => setIsMirrored(!isMirrored)}
            className={`p-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isMirrored
                ? 'bg-red-700 text-white border-red-600'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Cermin Horizontal (Mirror Teleprompter)"
          >
            <FlipHorizontal className="w-4 h-4" />
          </button>

          {/* Ambient Sound Button */}
          <button
            onClick={toggleAmbient}
            className={`p-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isAmbientOn
                ? 'bg-amber-600 text-white border-amber-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title={isAmbientOn ? 'Matikan Suara Angin Upacara' : 'Nyalakan Suasana Angin Upacara'}
          >
            {isAmbientOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
            title="Ulangi dari Awal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Main Play/Pause Button */}
          <button
            onClick={toggleScroll}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white shadow-md transition-all cursor-pointer ${
              isScrolling
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-red-700 hover:bg-red-800'
            }`}
          >
            {isScrolling ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Jeda Scroll</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Mulai Scroll</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Prompter Scrolling Canvas */}
      <div
        ref={containerRef}
        className={`flex-1 overflow-y-auto px-6 sm:px-16 lg:px-28 py-16 scroll-smooth ${
          isMirrored ? 'scale-x-[-1]' : ''
        }`}
        style={{
          scrollBehavior: 'auto',
        }}
      >
        <div className="max-w-4xl mx-auto space-y-16 pb-96">
          {/* Header Marker */}
          <div className="text-center space-y-3 pb-8 border-b border-slate-800 text-slate-400">
            <span className="text-xs uppercase tracking-widest text-red-500 font-bold block">
              UPACARA HARI PAHLAWAN 10 NOVEMBER 2026
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              {SPEECH_METADATA.title}
            </h1>
            <p className="text-xs text-slate-400">
              Pembina Upacara: Bu Ruri Okvawani · SMAS Tunas Baru Jin Seung Batam
            </p>
          </div>

          {/* Paragraphs */}
          {paragraphs.map((p) => (
            <div key={p.id} className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-red-400 uppercase tracking-wider font-bold">
                <span>{p.sectionTitle}</span>
                <span className="text-slate-600">·</span>
                <span>Paragraf {p.order}</span>
              </div>

              <div
                className="font-serif leading-relaxed text-slate-100 transition-all"
                style={{ fontSize: `${fontSize}px` }}
              >
                <FormattedSpeechText text={p.text} />
              </div>

              {/* Quiet Intonation Reminder Footer */}
              <div className="text-xs text-amber-400/80 font-sans italic pt-1">
                [Panduan: {p.guidance.tone} · {p.guidance.speed}]
              </div>
            </div>
          ))}

          {/* End of Speech Marker */}
          <div className="text-center py-16 border-t border-slate-800 text-slate-500">
            <p className="text-lg font-bold text-slate-400">
              — AKHIR DARI NASKAH AMANAT UPACARA —
            </p>
            <p className="text-xs mt-2 text-slate-600">
              Lakukan penghormatan penutup dan tutup map naskah pidato dengan anggun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
