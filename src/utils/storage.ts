export interface PracticeProgress {
  completedParagraphIds: string[];
  paragraphNotes: Record<string, string>;
  totalPracticeMinutes: number;
  practiceSessionsCount: number;
  lastPracticeDate: string;
  ttsRate: number;
  ttsPitch: number;
}

const STORAGE_KEY = 'speech_coach_hari_pahlawan_2026';

const DEFAULT_PROGRESS: PracticeProgress = {
  completedParagraphIds: [],
  paragraphNotes: {},
  totalPracticeMinutes: 0,
  practiceSessionsCount: 0,
  lastPracticeDate: '',
  ttsRate: 0.95,
  ttsPitch: 1.0,
};

export function loadPracticeProgress(): PracticeProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function savePracticeProgress(progress: Partial<PracticeProgress>): PracticeProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const current = loadPracticeProgress();
    const updated = { ...current, ...progress };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function resetPracticeProgress(): PracticeProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}
