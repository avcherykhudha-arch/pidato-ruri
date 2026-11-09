import React, { useEffect, useState } from 'react';
import {
  Play,
  Pause,
  Square,
  Volume2,
  Sliders,
  RotateCcw,
  Clock,
} from 'lucide-react';
import { ttsService, TTSVoiceOption, PlaybackState } from '../services/ttsService';

interface TTSControlBarProps {
  currentParagraphId: string | null;
  currentQueueIndex: number;
  totalParagraphs: number;
  pauseCountdown: number | null;
  onPlayAll: () => void;
  onStop: () => void;
}

export const TTSControlBar: React.FC<TTSControlBarProps> = ({
  currentParagraphId,
  currentQueueIndex,
  totalParagraphs,
  pauseCountdown,
  onPlayAll,
  onStop,
}) => {
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [voices, setVoices] = useState<TTSVoiceOption[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [rate, setRate] = useState<number>(0.95);
  const [pitch, setPitch] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1.0);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  useEffect(() => {
    const unsub = ttsService.subscribe({
      onStateChange: (state) => setPlaybackState(state),
    });

    const loadedVoices = ttsService.getAvailableVoiceOptions();
    setVoices(loadedVoices);
    const currVoice = ttsService.getSelectedVoice();
    if (currVoice) {
      setSelectedVoiceName(currVoice.name);
    }
    setRate(ttsService.getRate());
    setPitch(ttsService.getPitch());
    setVolume(ttsService.getVolume());

    return () => unsub();
  }, []);

  const handleTogglePlayPause = () => {
    if (playbackState === 'playing') {
      ttsService.pause();
    } else if (playbackState === 'paused') {
      ttsService.resume();
    } else {
      onPlayAll();
    }
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    setSelectedVoiceName(name);
    ttsService.setVoice(name);
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    ttsService.setRate(newRate);
  };

  const handlePitchChange = (newPitch: number) => {
    setPitch(newPitch);
    ttsService.setPitch(newPitch);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    ttsService.setVolume(newVol);
  };

  return (
    <div className="bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Playback Controls & Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleTogglePlayPause}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-md transition-transform active:scale-90 cursor-pointer"
            aria-label={playbackState === 'playing' ? 'Jeda TTS' : 'Putar TTS'}
          >
            {playbackState === 'playing' ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={() => {
              ttsService.stop();
              onStop();
            }}
            disabled={playbackState === 'idle'}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
            aria-label="Hentikan TTS"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">
                {playbackState === 'playing'
                  ? 'Sedang Membaca...'
                  : playbackState === 'paused'
                  ? 'Dipause'
                  : 'Siap Membacakan'}
              </span>
              {currentQueueIndex >= 0 && (
                <span className="text-xs font-mono text-red-400 font-bold">
                  Paragraf {currentQueueIndex + 1}/{totalParagraphs}
                </span>
              )}
            </div>
            {pauseCountdown !== null && pauseCountdown > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-amber-300 animate-pulse font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Jeda Hening Refleksi: {pauseCountdown} detik...</span>
              </div>
            )}
          </div>
        </div>

        {/* Speed Quick Selector & Settings Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 bg-slate-800 p-1 rounded-lg text-xs font-medium">
            {[0.8, 0.95, 1.1].map((r) => (
              <button
                key={r}
                onClick={() => handleRateChange(r)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  Math.abs(rate - r) < 0.05
                    ? 'bg-red-700 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r === 0.8 ? 'Lambat (0.8x)' : r === 0.95 ? 'Normal (1x)' : 'Cepat (1.1x)'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              showSettings
                ? 'bg-slate-800 border-red-500 text-white'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Pengaturan Suara</span>
          </button>
        </div>
      </div>

      {/* Expandable Voice & Audio Settings */}
      {showSettings && (
        <div className="pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Voice Selector */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-medium">Pilihan Suara TTS (id-ID):</label>
            <select
              value={selectedVoiceName}
              onChange={handleVoiceChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              {voices.length === 0 ? (
                <option value="">Suara Default Browser</option>
              ) : (
                voices.map((v) => (
                  <option key={v.voice.name} value={v.voice.name}>
                    {v.isIndonesian ? '🇮🇩 ' : '🌐 '}
                    {v.voice.name} {v.isFemaleLikely ? '(Perempuan)' : ''}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Speed / Rate Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-400 font-medium">
              <span>Kecepatan Berbicara (Rate):</span>
              <span className="text-white font-mono">{rate.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.6"
              max="1.4"
              step="0.05"
              value={rate}
              onChange={(e) => handleRateChange(parseFloat(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>

          {/* Pitch & Volume Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-400 font-medium">
              <span>Nada Vokal (Pitch):</span>
              <span className="text-white font-mono">{pitch.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.3"
              step="0.1"
              value={pitch}
              onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
