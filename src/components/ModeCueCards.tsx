import React, { useState } from 'react';
import {
  FileText,
  Clock,
  Printer,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
} from 'lucide-react';
import { SPEECH_METADATA } from '../data/speechData';

interface CueCardItem {
  sectionId: string;
  title: string;
  timeAllocation: string;
  coreThemes: string[];
  keyQuotesOrPantun?: string;
  podiumPosture: string;
  transitionCue: string;
}

const CUE_CARDS: CueCardItem[] = [
  {
    sectionId: 'A',
    title: 'Bagian A: Pembukaan yang Berkesan',
    timeAllocation: '2 Menit (00:00 - 02:00)',
    coreThemes: [
      'Salam Kristen: Syalom, damai sejahtera dalam kasih Tuhan Yesus Kristus',
      'Syukur atas anugerah keselamatan dan berkah Selasa 10 November 2026',
      'Penghormatan: Bapak Kepala Sekolah (Bpk. Sabam Sitinjak, S.Th), Dewan Guru, Staf TU, siswa-siswi',
      'Amanah suci darah pendahulu di langit Batam',
    ],
    keyQuotesOrPantun:
      'Pantun Pembuka:\n"Pulau Batam indah membentang,\nPerahu berlayar ke Selat Melaka.\nBudi pahlawan terkenang terang,\nTugas kita menjaga Indonesia merdeka!"',
    podiumPosture: 'Berdiri tegak, tangan memegang map setinggi dada, tatap lurus dan senyum hangat bersahabat.',
    transitionCue: 'Setelah pantun, tatap kibaran Sang Merah Putih: "Kita tidak sekadar seremonial..."',
  },
  {
    sectionId: 'B',
    title: 'Bagian B: Mengenang Jasa Para Pahlawan',
    timeAllocation: '3 Menit (02:00 - 05:00)',
    coreThemes: [
      'Surabaya 10 Nov 1945: Langit pekat asap mesiu, ultimatum sombong tentara sekutu',
      'Pekikan takbir Bung Tomo, bambu runcing, tekad merdeka atau mati berkalang tanah',
      'Pahlawan Bahari Kepri: Raja Haji Fisabilillah (Teluk Ketapang) & Sultan Mahmud Riayat Syah (gerilya laut selat)',
      'Kemerdekaan bukan hadiah cuma-cuma, ditebus air mata ibu dan ribuan martir',
    ],
    keyQuotesOrPantun:
      'Kalimat Inti:\n"Kemerdekaan ini ditebus dengan air mata para ibu yang merelakan anaknya berpamitan ke medan laga tanpa pernah kembali..."',
    podiumPosture: 'Dada membusung bangga saat pekikan perjuangan, melembut saat mengenang air mata para ibu.',
    transitionCue: 'Dari pengorbanan masa lalu menuju makna keteladanan hari ini: "Tema Hari Pahlawan 2026..."',
  },
  {
    sectionId: 'C',
    title: 'Bagian C: Pahlawanku Teladanku',
    timeAllocation: '4 Menit (05:00 - 09:00)',
    coreThemes: [
      'Pahlawan bukan hanya deretan nama di buku sejarah atau monumen perunggu',
      'Pahlawan = Keberanian moral mengutamakan kepentingan umum di atas kenyamanan pribadi',
      'Di SMA: Berani jujur saat ujian, disiplin hadir sebelum bel piket, menjaga kelas',
      'Pahlawan nyata: Ayah/Ibu di rumah (Tanjung Uncang, Mukakuning, Batu Ampar, berdagang)',
      'Dewan Guru di saf samping mimbar yang tulus mengulang penjelasan tanpa lelah',
    ],
    keyQuotesOrPantun:
      'Kalimat Inti:\n"Pahlawan hari ini bukan lagi mereka yang memanggul bambu runcing, melainkan anak muda yang berani melawan kemalasan dan teguh merawat kejujuran."',
    podiumPosture: 'Tolehkan pandangan penuh takzim ke dewan guru di panggung, lalu sapu pandangan hangat ke barisan siswa.',
    transitionCue: 'Setelah keteladanan orang tua & guru: "Namun medan perang generasi kalian kini bersalin rupa..."',
  },
  {
    sectionId: 'D',
    title: 'Bagian D: Perjuangan Generasi Muda Masa Kini',
    timeAllocation: '4 Menit (09:00 - 13:00)',
    coreThemes: [
      'Bentuk penjajahan abad 21: Musuh tidak kasat mata, menyusup lewat kelalaian',
      'Musuh 1: Kemalasan & sindrom "ah nanti saja"',
      'Musuh 2: Kecanduan layar gawai & doomscrolling video medsos berjam-jam',
      'Musuh 3: Normalisasi curang (mencontek, plagiasi)',
      'Musuh 4: Perundungan / bullying (fisik, verbal, cyberbullying di medsos)',
      'Bahaya narkoba, judi online, dan pornografi',
      'Batam adalah beranda terdepan Indonesia: Bekali diri ilmu, bahasa, dan karakter agar tidak jadi penonton di rumah sendiri',
    ],
    keyQuotesOrPantun:
      'Kalimat Inti:\n"Pahlawan itu merangkul yang lemah, bukan menginjak yang tak berdaya! Lawanlah kemalasan itu!"',
    podiumPosture: 'Sorot mata tajam berwibawa, nada suara bertenaga membongkar kebiasaan buruk secara mendidik.',
    transitionCue: 'Masuk ke panggilan persatuan: "Mengapa para pendiri bangsa kita menekankan kata Melangkah Bersama?..."',
  },
  {
    sectionId: 'E',
    title: 'Bagian E: Melangkah Bersama Melanjutkan Perjuangan',
    timeAllocation: '4 Menit (13:00 - 17:00)',
    coreThemes: [
      'Gotong royong: Perahu tidak bisa menyeberangi badai samudra jika pendayungnya bertengkar',
      'Kemerdekaan ditegakkan oleh beragam suku (Melayu, Batak, Minang, Jawa, Tionghoa, Papua) dalam Bhinneka Tunggal Ika',
      'SMAS Tunas Baru Jin Seung adalah miniatur Indonesia yang kaya warna',
      'Saling merangkul: Jangan ada teman yang kesepian di lorong sekolah',
      'Ukur keberhasilan bukan hanya dari piala, tapi dari dalamnya kepedulian hati',
      'Estafet menuju fajar Indonesia Emas 2045 dari gerbang sekolah kita',
    ],
    keyQuotesOrPantun:
      'Kalimat Inti:\n"Indonesia tidak dibangun oleh kehebatan satu orang, melainkan oleh jutaan tangan yang saling merangkul dalam satu ikrar persaudaraan."',
    podiumPosture: 'Gestur tangan sedikit terbuka merangkul seluruh peserta, suara membakar optimisme.',
    transitionCue: 'Memasuki keheningan puncak: "Anak-anakku... sejenak rendahkan pandanganmu, dengarkan deru angin..."',
  },
  {
    sectionId: 'F',
    title: 'Bagian F: Momen Refleksi yang Menyentuh Hati',
    timeAllocation: '2 Menit (17:00 - 19:00)',
    coreThemes: [
      'Heningkan cipta batin di hadapan Sang Merah Putih',
      'Pertanyaan nurani: Jika para pahlawan yang gugur hadir di lapangan menatap mata kita... tersenyum banggakah mereka, atau menangis kecewa?',
      'Menangiskah melihat masa muda disia-siakan dalam kelalaian?',
      'JEDA HENING 5-8 DETIK (Diam hening total sempurna di mimbar)',
      'Waktu putih abu-abu takkan terulang: Apa baktimu pada bangsa dan orang tua tercinta?',
    ],
    keyQuotesOrPantun:
      'Momen Sakral:\n[JEDA HENING 5-8 DETIK]\n"Jadilah pemuda yang ketika melangkah membuat bumi bergetar karena karyamu, bukan yang membuat orang tuamu menangis diam-diam..."',
    podiumPosture: 'Berdiri tegak kaku tanpa gerak tangan, kepala hening khusyuk, biarkan jeda hening meresap di lapangan.',
    transitionCue: 'Tarik napas dalam setelah jeda: "Oleh karena itu, di Hari Pahlawan 10 November 2026 ini..."',
  },
  {
    sectionId: 'G',
    title: 'Bagian G: Penutup yang Kuat dan Menggugah',
    timeAllocation: '1 Menit (19:00 - 20:00)',
    coreThemes: [
      'Bulatkan tekad: Jadilah pahlawan di kelas, di rumah, dan bagi bangsa',
      'Pantun Penutup Hari Pahlawan',
      'Salam Kebangsaan: Selamat Hari Pahlawan Nasional 2026!',
      'Doa berkat Kristus, terima kasih, salam penutup Kristen: Syalom, Tuhan memberkati!',
    ],
    keyQuotesOrPantun:
      'Pantun Penutup:\n"Burung serindit di dahan bidara,\nTerbang tinggi menyongsong fajar.\nMari bersama membangun negara,\nDengan kasih setia dan tekad belajar!"',
    podiumPosture: 'Tersenyum bangga, tutup map naskah dengan tenang dan khidmat, beri hormat penutup.',
    transitionCue: 'Syalom, Tuhan memberkati kita semua. Upacara selesai.',
  },
];

export const ModeCueCards: React.FC = () => {
  const [selectedCardIdx, setSelectedCardIdx] = useState<number>(0);

  const card = CUE_CARDS[selectedCardIdx];

  const handlePrintCueCards = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Kartu Contek Podium (Cue Cards Tanpa Teks Penuh)
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            Digunakan saat Bu Ruri sudah menguasai alur pidato dan hanya membutuhkan kartu rangkuman poin serta pantun di map upacara.
          </p>
        </div>

        <button
          onClick={handlePrintCueCards}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xs cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Kartu Cue Podium</span>
        </button>
      </div>

      {/* Card Carousel Navigation */}
      <div className="flex items-center justify-between gap-2 bg-slate-100 p-1.5 rounded-xl">
        <button
          onClick={() => setSelectedCardIdx((i) => Math.max(0, i - 1))}
          disabled={selectedCardIdx === 0}
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
          title="Kartu Sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {CUE_CARDS.map((c, idx) => (
            <button
              key={c.sectionId}
              onClick={() => setSelectedCardIdx(idx)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCardIdx === idx
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tahap {c.sectionId}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSelectedCardIdx((i) => Math.min(CUE_CARDS.length - 1, i + 1))}
          disabled={selectedCardIdx === CUE_CARDS.length - 1}
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
          title="Kartu Berikutnya"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* The Active Cue Card Presentation */}
      <div className="bg-white rounded-3xl border-2 border-red-600/30 p-6 sm:p-8 shadow-md space-y-6 relative overflow-hidden">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 to-amber-500" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-red-700 tracking-wider uppercase block">
              KARTU CONTEK PODIUM #{selectedCardIdx + 1} DARI 7
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              {card.title}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 font-bold text-xs">
            <Clock className="w-4 h-4 text-red-600" />
            <span>Alokasi: {card.timeAllocation}</span>
          </div>
        </div>

        {/* Core Themes Bullet List */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">
            Poin Inti yang Harus Disampaikan:
          </h4>
          <ul className="space-y-2.5">
            {card.coreThemes.map((theme, i) => (
              <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-800">
                <span className="w-2 h-2 rounded-full bg-red-600 mt-2 shrink-0" />
                <span className="font-medium">{theme}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pantun or Iconic Quote Callout if exists */}
        {card.keyQuotesOrPantun && (
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Teks Penting (Wajib Tepat Rima / Kata Kunci):
            </span>
            <pre className="font-serif text-sm sm:text-base text-amber-950 font-bold whitespace-pre-line leading-relaxed italic">
              {card.keyQuotesOrPantun}
            </pre>
          </div>
        )}

        {/* Posture & Transition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
            <span className="font-bold text-slate-700 block">Sikap Tubuh & Kontak Mata:</span>
            <p className="text-slate-600 leading-relaxed">{card.podiumPosture}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
            <span className="font-bold text-red-700 block">Pemicu Kalimat Transisi:</span>
            <p className="text-slate-600 leading-relaxed italic">{card.transitionCue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
