import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ModeSelector, AppMode } from './components/ModeSelector';
import { TTSControlBar } from './components/TTSControlBar';
import { ModeReadListen } from './components/ModeReadListen';
import { ModeSectionPractice } from './components/ModeSectionPractice';
import { ModeStepCloze } from './components/ModeStepCloze';
import { ModeMemoryRecall } from './components/ModeMemoryRecall';
import { ModeTeleprompter } from './components/ModeTeleprompter';
import { ModeCueCards } from './components/ModeCueCards';
import { ToneExplorer } from './components/ToneExplorer';
import { VoiceRecorderModal } from './components/VoiceRecorderModal';
import { PrintableSpeechModal } from './components/PrintableSpeechModal';
import { Footer } from './components/Footer';

import { SPEECH_PARAGRAPHS, SpeechParagraph, SPEECH_METADATA } from './data/speechData';
import { ttsService, PlaybackState } from './services/ttsService';
import {
  loadPracticeProgress,
  savePracticeProgress,
  resetPracticeProgress,
  PracticeProgress,
} from './utils/storage';

export default function App() {
  const [activeMode, setActiveMode] = useState<AppMode>('read');
  const [progress, setProgress] = useState<PracticeProgress>(loadPracticeProgress);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [currentQueueIndex, setCurrentQueueIndex] = useState<number>(-1);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [pauseCountdown, setPauseCountdown] = useState<number | null>(null);

  // Modals
  const [isTeleprompterModalOpen, setIsTeleprompterModalOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isRecorderModalOpen, setIsRecorderModalOpen] = useState<boolean>(false);

  // Subscribe to TTS Service
  useEffect(() => {
    const unsub = ttsService.subscribe({
      onStateChange: (state) => setPlaybackState(state),
      onParagraphChange: (id, idx) => {
        setCurrentPlayingId(id);
        setCurrentQueueIndex(idx);
        if (id) {
          // Scroll paragraph into view smoothly if in read mode
          const el = document.getElementById(`paragraph-${id}`);
          if (el && activeMode === 'read') {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      },
      onPauseDelayCountdown: (sec) => setPauseCountdown(sec),
    });

    return () => unsub();
  }, [activeMode]);

  // Track practice duration (1 minute timer tick when actively practicing)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextMinutes = prev.totalPracticeMinutes + 1;
        savePracticeProgress({ totalPracticeMinutes: nextMinutes });
        return { ...prev, totalPracticeMinutes: nextMinutes };
      });
    }, 60000); // every minute

    return () => clearInterval(timer);
  }, []);

  const handleToggleComplete = useCallback((id: string) => {
    setProgress((prev) => {
      const exists = prev.completedParagraphIds.includes(id);
      const nextCompleted = exists
        ? prev.completedParagraphIds.filter((item) => item !== id)
        : [...prev.completedParagraphIds, id];

      const updated = {
        ...prev,
        completedParagraphIds: nextCompleted,
        lastPracticeDate: new Date().toISOString(),
      };
      savePracticeProgress(updated);
      return updated;
    });
  }, []);

  const handleSaveNote = useCallback((id: string, noteText: string) => {
    setProgress((prev) => {
      const nextNotes = { ...prev.paragraphNotes, [id]: noteText };
      const updated = { ...prev, paragraphNotes: nextNotes };
      savePracticeProgress(updated);
      return updated;
    });
  }, []);

  const handleResetProgress = useCallback(() => {
    const cleared = resetPracticeProgress();
    setProgress(cleared);
  }, []);

  // TTS Actions
  const handleStartSequentialTTS = () => {
    if (playbackState === 'playing') {
      ttsService.stop();
    } else {
      ttsService.speakSequential(
        SPEECH_PARAGRAPHS.map((p) => ({ id: p.id, text: p.text }))
      );
    }
  };

  const handlePlayParagraph = (paragraph: SpeechParagraph) => {
    ttsService.speakParagraph(paragraph);
  };

  const handlePlaySection = (sectionParagraphs: SpeechParagraph[]) => {
    ttsService.speakSequential(
      sectionParagraphs.map((p) => ({ id: p.id, text: p.text }))
    );
  };

  const handleStopTTS = () => {
    ttsService.stop();
    setCurrentPlayingId(null);
    setCurrentQueueIndex(-1);
    setPauseCountdown(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* 3-Zone Header */}
      <Header
        activeTab={activeMode}
        onSelectTab={(tab) => setActiveMode(tab as AppMode)}
        onOpenTeleprompter={() => setIsTeleprompterModalOpen(true)}
        onOpenPrint={() => setIsPrintModalOpen(true)}
        onOpenRecorder={() => setIsRecorderModalOpen(true)}
      />

      {/* Hero Banner */}
      <HeroBanner
        completedCount={progress.completedParagraphIds.length}
        totalParagraphs={SPEECH_PARAGRAPHS.length}
        totalPracticeMinutes={progress.totalPracticeMinutes}
        onStartSequentialTTS={handleStartSequentialTTS}
        onOpenTeleprompter={() => setIsTeleprompterModalOpen(true)}
        onOpenRecorder={() => setIsRecorderModalOpen(true)}
        isTTSPlaying={playbackState === 'playing'}
      />

      {/* 6 Modes Tab Selector */}
      <ModeSelector activeMode={activeMode} onSelectMode={(m) => setActiveMode(m)} />

      {/* Main Workspace Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Sticky TTS Control Console */}
        <TTSControlBar
          currentParagraphId={currentPlayingId}
          currentQueueIndex={currentQueueIndex}
          totalParagraphs={SPEECH_PARAGRAPHS.length}
          pauseCountdown={pauseCountdown}
          onPlayAll={handleStartSequentialTTS}
          onStop={handleStopTTS}
        />

        {/* Dynamic Mode Views */}
        {activeMode === 'read' && (
          <ModeReadListen
            paragraphs={SPEECH_PARAGRAPHS}
            completedIds={progress.completedParagraphIds}
            notes={progress.paragraphNotes}
            currentPlayingId={currentPlayingId}
            onToggleComplete={handleToggleComplete}
            onSaveNote={handleSaveNote}
            onPlayParagraph={handlePlayParagraph}
            onStopTTS={handleStopTTS}
            isPlayingTTS={playbackState === 'playing'}
          />
        )}

        {activeMode === 'sections' && (
          <ModeSectionPractice
            paragraphs={SPEECH_PARAGRAPHS}
            completedIds={progress.completedParagraphIds}
            onToggleComplete={handleToggleComplete}
            onPlaySection={handlePlaySection}
            onPlayParagraph={handlePlayParagraph}
            currentPlayingId={currentPlayingId}
          />
        )}

        {activeMode === 'cloze' && (
          <ModeStepCloze
            paragraphs={SPEECH_PARAGRAPHS}
            onPlayParagraph={handlePlayParagraph}
          />
        )}

        {activeMode === 'recall' && (
          <ModeMemoryRecall
            paragraphs={SPEECH_PARAGRAPHS}
            completedIds={progress.completedParagraphIds}
            onToggleComplete={handleToggleComplete}
            onPlayParagraph={handlePlayParagraph}
          />
        )}

        {activeMode === 'teleprompter' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>
                💡 <strong>Mode Simulasi Teleprompter Lapangan:</strong> Tampilan gelap tanpa gangguan dengan auto-scroll dan hitung mundur 20 menit.
              </span>
              <button
                onClick={() => setIsTeleprompterModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-red-700 text-white font-bold hover:bg-red-800 cursor-pointer"
              >
                Buka Layar Penuh (Fullscreen)
              </button>
            </div>
            <ModeTeleprompter paragraphs={SPEECH_PARAGRAPHS} />
          </div>
        )}

        {activeMode === 'cuecards' && <ModeCueCards />}

        {activeMode === 'tones' && <ToneExplorer />}
      </main>

      {/* Fullscreen Teleprompter Modal */}
      {isTeleprompterModalOpen && (
        <ModeTeleprompter
          paragraphs={SPEECH_PARAGRAPHS}
          onClose={() => setIsTeleprompterModalOpen(false)}
          isModal={true}
        />
      )}

      {/* Voice Recorder Modal */}
      <VoiceRecorderModal
        isOpen={isRecorderModalOpen}
        onClose={() => setIsRecorderModalOpen(false)}
      />

      {/* Print Speech Modal */}
      <PrintableSpeechModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        paragraphs={SPEECH_PARAGRAPHS}
      />

      {/* Footer */}
      <Footer onResetProgress={handleResetProgress} />
    </div>
  );
}
