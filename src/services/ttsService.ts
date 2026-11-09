import { prepareTextForTTS } from '../utils/speechLogic';

export interface TTSVoiceOption {
  voice: SpeechSynthesisVoice;
  isIndonesian: boolean;
  isFemaleLikely: boolean;
  label: string;
}

export type PlaybackState = 'idle' | 'playing' | 'paused';

export interface TTSStateListener {
  onStateChange?: (state: PlaybackState) => void;
  onParagraphChange?: (paragraphId: string | null, index: number) => void;
  onBoundaryWord?: (charIndex: number, length: number) => void;
  onPauseDelayCountdown?: (secondsRemaining: number | null) => void;
}

class TTSService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private playbackState: PlaybackState = 'idle';
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private availableVoices: SpeechSynthesisVoice[] = [];
  private rate = 0.95;
  private pitch = 1.0;
  private volume = 1.0;
  private listeners: Set<TTSStateListener> = new Set();
  private queue: Array<{ id: string; text: string; delayAfterMs: number }> = [];
  private currentQueueIndex = -1;
  private delayTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  public subscribe(listener: TTSStateListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyState(state: PlaybackState) {
    this.playbackState = state;
    this.listeners.forEach((l) => l.onStateChange?.(state));
  }

  private notifyParagraph(id: string | null, index: number) {
    this.listeners.forEach((l) => l.onParagraphChange?.(id, index));
  }

  private notifyBoundary(charIndex: number, length: number) {
    this.listeners.forEach((l) => l.onBoundaryWord?.(charIndex, length));
  }

  private notifyDelay(sec: number | null) {
    this.listeners.forEach((l) => l.onPauseDelayCountdown?.(sec));
  }

  public loadVoices(): TTSVoiceOption[] {
    if (!this.synth) return [];
    this.availableVoices = this.synth.getVoices();

    const options: TTSVoiceOption[] = this.availableVoices.map((voice) => {
      const isIndo = voice.lang.toLowerCase().startsWith('id') || voice.lang.toLowerCase().includes('indonesia');
      const name = voice.name.toLowerCase();
      const isFemaleLikely =
        name.includes('female') ||
        name.includes('gadis') ||
        name.includes('damayanti') ||
        name.includes('wanita') ||
        name.includes('siti') ||
        name.includes('ayu') ||
        name.includes('andika') === false;

      return {
        voice,
        isIndonesian: isIndo,
        isFemaleLikely,
        label: `${voice.name} (${voice.lang})`,
      };
    });

    // Auto-select preferred Indonesian voice
    if (!this.selectedVoice) {
      // 1. Indonesian female voice
      const indonesianFemale = options.find((o) => o.isIndonesian && o.isFemaleLikely);
      if (indonesianFemale) {
        this.selectedVoice = indonesianFemale.voice;
      } else {
        // 2. Any Indonesian voice
        const indonesian = options.find((o) => o.isIndonesian);
        if (indonesian) {
          this.selectedVoice = indonesian.voice;
        } else if (this.availableVoices.length > 0) {
          // 3. Fallback
          this.selectedVoice = this.availableVoices[0];
        }
      }
    }

    return options;
  }

  public getAvailableVoiceOptions(): TTSVoiceOption[] {
    return this.loadVoices();
  }

  public setVoice(voiceName: string) {
    const found = this.availableVoices.find((v) => v.name === voiceName);
    if (found) {
      this.selectedVoice = found;
    }
  }

  public getSelectedVoice(): SpeechSynthesisVoice | null {
    return this.selectedVoice;
  }

  public setRate(rate: number) {
    this.rate = Math.max(0.5, Math.min(2.0, rate));
  }

  public getRate(): number {
    return this.rate;
  }

  public setPitch(pitch: number) {
    this.pitch = Math.max(0.5, Math.min(1.5, pitch));
  }

  public getPitch(): number {
    return this.pitch;
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1.0, volume));
  }

  public getVolume(): number {
    return this.volume;
  }

  public getPlaybackState(): PlaybackState {
    return this.playbackState;
  }

  /**
   * Stop any current playback and clear queue.
   */
  public stop() {
    if (this.delayTimeoutId) {
      clearTimeout(this.delayTimeoutId);
      this.delayTimeoutId = null;
    }
    this.notifyDelay(null);
    if (this.synth) {
      this.synth.cancel();
    }
    this.queue = [];
    this.currentQueueIndex = -1;
    this.currentUtterance = null;
    this.notifyState('idle');
    this.notifyParagraph(null, -1);
  }

  /**
   * Pause speech synthesis.
   */
  public pause() {
    if (this.synth && this.playbackState === 'playing') {
      this.synth.pause();
      this.notifyState('paused');
    }
  }

  /**
   * Resume speech synthesis.
   */
  public resume() {
    if (this.synth && this.playbackState === 'paused') {
      this.synth.resume();
      this.notifyState('playing');
    }
  }

  /**
   * Play a single sentence or text snippet with optional custom rate/pitch.
   */
  public speakSnippet(text: string, customRate?: number, customPitch?: number): Promise<void> {
    return new Promise((resolve) => {
      this.stop();
      if (!this.synth) {
        resolve();
        return;
      }

      const cleanText = prepareTextForTTS(text);
      if (!cleanText) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = this.selectedVoice?.lang || 'id-ID';
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }
      utterance.rate = customRate ?? this.rate;
      utterance.pitch = customPitch ?? this.pitch;
      utterance.volume = this.volume;

      utterance.onstart = () => {
        this.notifyState('playing');
      };

      utterance.onend = () => {
        this.notifyState('idle');
        resolve();
      };

      utterance.onerror = () => {
        this.notifyState('idle');
        resolve();
      };

      this.synth.speak(utterance);
    });
  }

  /**
   * Play a single speech paragraph.
   */
  public speakParagraph(paragraph: { id: string; text: string }) {
    this.startQueue([{ id: paragraph.id, text: paragraph.text, delayAfterMs: 0 }]);
  }

  /**
   * Play a series of paragraphs sequentially, honoring pause tags.
   */
  public speakSequential(paragraphs: Array<{ id: string; text: string }>) {
    const queueItems = paragraphs.map((p) => {
      // Calculate delay based on pause tags in text
      let delayMs = 600;
      if (p.text.includes('[JEDA 5-8 DETIK]')) {
        delayMs = 6000;
      } else if (p.text.includes('[JEDA 3 DETIK]')) {
        delayMs = 2500;
      }
      return {
        id: p.id,
        text: p.text,
        delayAfterMs: delayMs,
      };
    });

    this.startQueue(queueItems);
  }

  private startQueue(items: Array<{ id: string; text: string; delayAfterMs: number }>) {
    this.stop();
    if (!this.synth || items.length === 0) return;

    this.queue = items;
    this.currentQueueIndex = 0;
    this.playCurrentQueueItem();
  }

  private playCurrentQueueItem() {
    if (this.currentQueueIndex < 0 || this.currentQueueIndex >= this.queue.length) {
      this.stop();
      return;
    }

    const item = this.queue[this.currentQueueIndex];
    const cleanText = prepareTextForTTS(item.text);

    if (!cleanText) {
      this.advanceQueue();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = this.selectedVoice?.lang || 'id-ID';
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.volume = this.volume;

    utterance.onstart = () => {
      this.notifyState('playing');
      this.notifyParagraph(item.id, this.currentQueueIndex);
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        this.notifyBoundary(event.charIndex, (event as { charLength?: number }).charLength || 5);
      }
    };

    utterance.onend = () => {
      // If there's an intentional delay (like JEDA 5-8 DETIK), hold silence before advancing
      if (item.delayAfterMs > 0 && this.currentQueueIndex < this.queue.length - 1) {
        let secRemaining = Math.round(item.delayAfterMs / 1000);
        this.notifyDelay(secRemaining);

        const countdownInterval = setInterval(() => {
          secRemaining--;
          if (secRemaining > 0) {
            this.notifyDelay(secRemaining);
          } else {
            clearInterval(countdownInterval);
            this.notifyDelay(null);
          }
        }, 1000);

        this.delayTimeoutId = setTimeout(() => {
          clearInterval(countdownInterval);
          this.notifyDelay(null);
          this.advanceQueue();
        }, item.delayAfterMs);
      } else {
        this.advanceQueue();
      }
    };

    utterance.onerror = () => {
      this.advanceQueue();
    };

    this.currentUtterance = utterance;
    this.synth?.speak(utterance);
  }

  private advanceQueue() {
    this.currentQueueIndex++;
    if (this.currentQueueIndex < this.queue.length) {
      this.playCurrentQueueItem();
    } else {
      this.stop();
    }
  }
}

export const ttsService = new TTSService();
