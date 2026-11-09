/**
 * Pure helper functions for Speech Coach
 */

// Regex to detect speech markers in brackets like [TEGAS], [LEMBUT], [JEDA 3 DETIK], etc.
export const INTONATION_REGEX = /\[(TEGAS|LEMBUT|JEDA\s*[^\]]*|TEKANAN|SEMANGAT|KHIDMAT|HARU|BANGGA|SENYUM|TATAP[^\]]*)\]/gi;

/**
 * Strips all speech guidance markers from text so TTS reads pure speech text cleanly.
 */
export function stripIntonationTags(text: string): string {
  if (!text) return '';
  return text
    .replace(INTONATION_REGEX, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Prepares text specifically for Web Speech API Indonesian synthesis.
 * Strips brackets and ensures proper pacing around punctuation.
 */
export function prepareTextForTTS(text: string): string {
  const cleaned = stripIntonationTags(text);
  // Enhance natural reading of acronyms in Indonesian
  return cleaned
    .replace(/SMAS/g, 'S-M-A Swasta')
    .replace(/Bpk\./g, 'Bapak')
    .replace(/Ibu\./g, 'Ibu')
    .replace(/Dr\./g, 'Dokter')
    .replace(/Drs\./g, 'Doktorandus')
    .replace(/(\d{4})/g, '$1') // years like 2026 read naturally
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculates estimated speech duration in minutes given word count and wpm.
 * Standard Indonesian ceremonial speech rate is ~95-105 WPM with solemn pauses.
 */
export function calculateReadingDuration(wordCount: number, wpm: number = 100): number {
  if (wordCount <= 0) return 0;
  return Number((wordCount / wpm).toFixed(1));
}

/**
 * Counts total words in a text block, ignoring intonation tags.
 */
export function countWords(text: string): number {
  const clean = stripIntonationTags(text);
  if (!clean) return 0;
  const matches = clean.match(/[\w\u00C0-\u024F-]+/g);
  return matches ? matches.length : 0;
}

export interface ClozeWordItem {
  id: string;
  original: string;
  cleanWord: string;
  punctuationPrefix: string;
  punctuationSuffix: string;
  isHidden: boolean;
  isRevealed: boolean;
}

/**
 * Generates cloze text items for Mode 3 (Hafalan Bertahap).
 * Hides a percentage of words (25%, 50%, 75%, 100%) based on difficulty.
 */
export function generateClozeItems(paragraphText: string, difficultyPercent: number): ClozeWordItem[] {
  const clean = stripIntonationTags(paragraphText);
  if (!clean) return [];

  const rawTokens = clean.split(/(\s+)/);
  const items: ClozeWordItem[] = [];
  let wordIndex = 0;

  for (let i = 0; i < rawTokens.length; i++) {
    const token = rawTokens[i];
    if (/^\s+$/.test(token)) {
      items.push({
        id: `space-${i}`,
        original: token,
        cleanWord: '',
        punctuationPrefix: '',
        punctuationSuffix: '',
        isHidden: false,
        isRevealed: true,
      });
      continue;
    }

    const match = token.match(/^([^\w\u00C0-\u024F]*)([\w\u00C0-\u024F-]+)([^\w\u00C0-\u024F]*)$/);
    if (!match) {
      items.push({
        id: `sym-${i}`,
        original: token,
        cleanWord: token,
        punctuationPrefix: '',
        punctuationSuffix: '',
        isHidden: false,
        isRevealed: true,
      });
      continue;
    }

    const [, prefix, word, suffix] = match;
    wordIndex++;

    // Determine whether this word is hidden based on difficultyPercent
    // E.g. at 25%, 1 in 4 words hidden. At 50%, 1 in 2 words. At 75%, 3 in 4 words. At 100%, all words.
    let shouldHide = false;
    if (difficultyPercent >= 100) {
      shouldHide = true;
    } else if (difficultyPercent === 75) {
      shouldHide = wordIndex % 4 !== 0; // 3 out of 4 hidden
    } else if (difficultyPercent === 50) {
      shouldHide = wordIndex % 2 === 0; // 1 out of 2 hidden
    } else if (difficultyPercent === 25) {
      shouldHide = wordIndex % 4 === 0; // 1 out of 4 hidden
    }

    items.push({
      id: `w-${wordIndex}-${word}`,
      original: token,
      cleanWord: word,
      punctuationPrefix: prefix,
      punctuationSuffix: suffix,
      isHidden: shouldHide,
      isRevealed: !shouldHide,
    });
  }

  return items;
}

/**
 * Extracts a prompt trigger (first 5-7 words) and main keywords for Mode 4 & Mode 6.
 */
export function extractParagraphCue(paragraphText: string): { triggerText: string; totalWords: number } {
  const clean = stripIntonationTags(paragraphText);
  const words = clean.split(/\s+/).filter(Boolean);
  const triggerWords = words.slice(0, 6).join(' ');
  return {
    triggerText: triggerWords + (words.length > 6 ? ' ...' : ''),
    totalWords: words.length,
  };
}
