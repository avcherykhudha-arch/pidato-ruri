import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Square,
  Play,
  Pause,
  Download,
  RotateCcw,
  X,
  Volume2,
  AlertCircle,
} from 'lucide-react';

interface VoiceRecorderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceRecorderModal: React.FC<VoiceRecorderModalProps> = ({ isOpen, onClose }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
    };
  }, [recordedAudioUrl]);

  if (!isOpen) return null;

  const startRecording = async () => {
    setPermissionError(null);
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      setPermissionError(
        'Izin mikrofon tidak diberikan atau mikrofon tidak terdeteksi. Silakan periksa pengaturan mikrofon di browser Anda.'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  };

  const resetRecording = () => {
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }
    setRecordingSeconds(0);
    setIsPlayingAudio(false);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-6 relative animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Perekam Suara Latihan Mandiri
              </h3>
              <p className="text-xs text-slate-500">
                Rekam pembacaan pidato Bu Ruri dan dengarkan kembali untuk evaluasi.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup jendela perekam suara"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error notification if mic blocked */}
        {permissionError && (
          <div className="p-3 bg-red-50 text-red-800 rounded-xl text-xs flex items-start gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{permissionError}</span>
          </div>
        )}

        {/* Recording Visual Stage */}
        <div className="py-8 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="relative">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-red-600 text-white shadow-lg animate-pulse ring-8 ring-red-200'
                  : recordedAudioUrl
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              <Mic className="w-9 h-9" />
            </div>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
              {formatTime(recordingSeconds)}
            </span>
            <p className="text-xs text-slate-500 font-medium">
              {isRecording
                ? 'Sedang Merekam Suara Bu Ruri...'
                : recordedAudioUrl
                ? 'Rekaman Tersimpan Sempurna'
                : 'Klik tombol di bawah untuk mulai merekam'}
            </p>
          </div>
        </div>

        {/* Player if audio is recorded */}
        {recordedAudioUrl && (
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-700 block">
              Dengarkan Ulang Rekaman Pidato:
            </span>
            <audio
              ref={audioPlayerRef}
              src={recordedAudioUrl}
              controls
              className="w-full h-10 accent-red-600"
              onPlay={() => setIsPlayingAudio(true)}
              onPause={() => setIsPlayingAudio(false)}
              onEnded={() => setIsPlayingAudio(false)}
            />
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              <Mic className="w-4 h-4" />
              <span>{recordedAudioUrl ? 'Rekam Ulang' : 'Mulai Rekam Suara'}</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-sm font-bold shadow-sm transition-all cursor-pointer animate-bounce"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Selesai & Simpan Rekaman</span>
            </button>
          )}

          {recordedAudioUrl && !isRecording && (
            <a
              href={recordedAudioUrl}
              download="Latihan_Pidato_Hari_Pahlawan_Bu_Ruri.webm"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh File Audio</span>
            </a>
          )}

          {recordedAudioUrl && !isRecording && (
            <button
              onClick={resetRecording}
              className="p-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Hapus Rekaman"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tips Footer */}
        <div className="pt-2 text-center text-[11px] text-slate-500">
          💡 <strong>Tips Pembina:</strong> Jaga jarak mulut sekitar 15–20 cm dari mikrofon dan ucapkan kalimat pembuka dengan napas diafragma yang stabil.
        </div>
      </div>
    </div>
  );
};
