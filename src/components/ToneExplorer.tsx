import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  Award,
  CheckCircle2,
  Bookmark,
  UserCheck,
  Flame,
  Heart,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { ICONIC_QUOTES, TONE_EXAMPLES, IconicQuote, ToneExample } from '../data/speechData';
import { ttsService } from '../services/ttsService';

export const ToneExplorer: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<ToneExample>(TONE_EXAMPLES[0]);
  const [activePlayingStyle, setActivePlayingStyle] = useState<string | null>(null);

  const handlePlayToneStyle = async (
    sentence: string,
    styleName: 'tegas' | 'lembut' | 'semangat',
    pitch: number,
    rate: number
  ) => {
    setActivePlayingStyle(styleName);
    await ttsService.speakSnippet(sentence, rate, pitch);
    setActivePlayingStyle(null);
  };

  const handlePlayQuote = async (quote: string) => {
    await ttsService.speakSnippet(quote, 0.92, 1.0);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-amber-900 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-300">
          <Sparkles className="w-4 h-4" />
          <span>Vocal & Expression Masterclass</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Pelatihan Ekspresi, Intonasi, dan 3 Gaya Karakter Suara
        </h2>
        <p className="text-xs sm:text-sm text-red-100 max-w-3xl leading-relaxed">
          Kekuatan pidato seorang pembina upacara bukan terletak pada volume teriakan, melainkan pada dinamika intonasi: kapan harus berwibawa tegas, kapan harus lembut menyentuh kalbu, dan kapan harus membakar semangat siswa.
        </p>
      </div>

      {/* 2. Interactive 3-Tone Speech Laboratory */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Laboratorium Intonasi: 1 Kalimat dengan 3 Gaya Berbeda
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            Dengarkan contoh pembacaan audio TTS dengan parameter nada (pitch) dan tempo (rate) yang disesuaikan secara khusus.
          </p>
        </div>

        {/* Sentence Selection */}
        <div className="flex flex-wrap gap-2">
          {TONE_EXAMPLES.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => setSelectedExample(ex)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedExample.id === ex.id
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Contoh Kalimat {i + 1}
            </button>
          ))}
        </div>

        {/* Display Sentence */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Kalimat Uji Coba:
          </span>
          <p className="font-serif text-lg sm:text-xl font-bold text-slate-900 italic">
            &ldquo;{selectedExample.sentence}&rdquo;
          </p>
        </div>

        {/* 3 Styles Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Style 1: Tegas & Berwibawa */}
          <div className="p-5 rounded-2xl border border-red-200 bg-red-50/50 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
                <Shield className="w-4 h-4 text-red-600" />
                <span>1. Tegas & Berwibawa</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedExample.styles.tegas.description}
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-red-200 text-xs text-red-900">
                <strong>Tips Vokal:</strong> {selectedExample.styles.tegas.vocalTips}
              </div>
            </div>

            <button
              onClick={() =>
                handlePlayToneStyle(
                  selectedExample.sentence,
                  'tegas',
                  selectedExample.styles.tegas.pitch,
                  selectedExample.styles.tegas.rate
                )
              }
              className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activePlayingStyle === 'tegas'
                  ? 'bg-red-800 text-white animate-pulse'
                  : 'bg-red-700 hover:bg-red-800 text-white shadow-xs'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{activePlayingStyle === 'tegas' ? 'Memutar...' : 'Dengar Versi Tegas'}</span>
            </button>
          </div>

          {/* Style 2: Lembut & Menyentuh Hati */}
          <div className="p-5 rounded-2xl border border-sky-200 bg-sky-50/50 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
                <Heart className="w-4 h-4 text-sky-600" />
                <span>2. Lembut & Menyentuh</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedExample.styles.lembut.description}
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-sky-200 text-xs text-sky-900">
                <strong>Tips Vokal:</strong> {selectedExample.styles.lembut.vocalTips}
              </div>
            </div>

            <button
              onClick={() =>
                handlePlayToneStyle(
                  selectedExample.sentence,
                  'lembut',
                  selectedExample.styles.lembut.pitch,
                  selectedExample.styles.lembut.rate
                )
              }
              className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activePlayingStyle === 'lembut'
                  ? 'bg-sky-800 text-white animate-pulse'
                  : 'bg-sky-700 hover:bg-sky-800 text-white shadow-xs'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{activePlayingStyle === 'lembut' ? 'Memutar...' : 'Dengar Versi Lembut'}</span>
            </button>
          </div>

          {/* Style 3: Bersemangat & Membakar Motivasi */}
          <div className="p-5 rounded-2xl border border-orange-200 bg-orange-50/50 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-orange-900 font-bold text-sm">
                <Flame className="w-4 h-4 text-orange-600" />
                <span>3. Semangat Membakar</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedExample.styles.semangat.description}
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-orange-200 text-xs text-orange-900">
                <strong>Tips Vokal:</strong> {selectedExample.styles.semangat.vocalTips}
              </div>
            </div>

            <button
              onClick={() =>
                handlePlayToneStyle(
                  selectedExample.sentence,
                  'semangat',
                  selectedExample.styles.semangat.pitch,
                  selectedExample.styles.semangat.rate
                )
              }
              className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activePlayingStyle === 'semangat'
                  ? 'bg-orange-700 text-white animate-pulse'
                  : 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{activePlayingStyle === 'semangat' ? 'Memutar...' : 'Dengar Versi Semangat'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. 7 Iconic Speech Quotes */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-slate-900">
              7 Kalimat Ikonik Inti Pidato (Wajib Dihafal di Luar Kepala)
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            Kalimat-kalimat magnetik ini menjadi jangkar emosional pidato Bu Ruri. Simak dan latih agar meluncur alami di hadapan murid-murid.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ICONIC_QUOTES.map((q, index) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-red-300 transition-all shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-red-700 bg-red-100/70 px-2 py-0.5 rounded">
                    Kutipan Ikonik #{index + 1}
                  </span>
                  <span className="text-slate-500 font-medium">{q.context}</span>
                </div>
                <p className="font-serif text-base font-bold text-slate-900 leading-relaxed italic">
                  &ldquo;{q.quote}&rdquo;
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200/60">
                <div className="text-xs text-slate-600 flex items-start gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Aksi Panggung:</strong> {q.keyAction}
                  </span>
                </div>

                <button
                  onClick={() => handlePlayQuote(q.quote)}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-red-600" />
                  <span>Dengarkan Pelafalan</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Podium Posture & Eye Contact Protocol */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-bold text-slate-900">
            Protokol Sikap Tubuh & Kontak Mata Pembina Upacara
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-red-800 text-sm block">1. Cara Memegang Map Naskah</span>
            <p className="text-slate-700 leading-relaxed">
              Pegang map naskah setinggi ulu hati dengan sudut kemiringan 45 derajat. Jangan menutupi dagu atau mikrofon mimbar. Jika hafalan sudah lancar, biarkan map terbuka rileks sebagai sandaran tangan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 text-sm block">2. Pola Sapuan Pandangan Mata</span>
            <p className="text-slate-700 leading-relaxed">
              Bagi lapangan menjadi 3 sektor pandangan: Sektor Kiri (Dewan Guru), Sektor Tengah (Siswa Kelas X & XI), dan Sektor Kanan (Siswa Kelas XII). Tahan tatapan 3-4 detik pada setiap sektor sebelum berpindah.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 text-sm block">3. Rahasia Jeda Hening 5-8 Detik</span>
            <p className="text-slate-700 leading-relaxed">
              Di Bagian F (Refleksi), jangan takut pada keheningan. Berhenti bicara dan tatap seluruh peserta dalam diam selama 5–8 detik. Keheningan yang terkontrol di lapangan upacara menciptakan resonansi emosional yang magis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
