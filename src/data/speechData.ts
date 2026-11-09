/**
 * Speech Script Data for Hari Pahlawan 10 November 2026
 * Pembina Upacara: Bu Ruri Okvawani
 * Sekolah: SMAS TUNAS BARU JIN SEUNG BATAM
 * Tema: "PAHLAWANKU TELADANKU, MELANGKAH BERSAMA MELANJUTKAN PERJUANGAN"
 * Target Word Count: ~1,900 - 2,150 words (Delivery duration: ~18-20 minutes with solemn pauses)
 */

export interface SpeechParagraph {
  id: string;
  order: number;
  sectionId: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  sectionTitle: string;
  targetDurationMinutes: number;
  text: string;
  guidance: {
    tone: string;
    speed: string;
    pauseMoment: string;
    emphasisWords: string[];
    facialExpression: string;
    bodyPosture: string;
  };
}

export interface IconicQuote {
  id: string;
  quote: string;
  context: string;
  keyAction: string;
}

export interface ToneExample {
  id: string;
  sentence: string;
  styles: {
    tegas: {
      pitch: number;
      rate: number;
      description: string;
      vocalTips: string;
    };
    lembut: {
      pitch: number;
      rate: number;
      description: string;
      vocalTips: string;
    };
    semangat: {
      pitch: number;
      rate: number;
      description: string;
      vocalTips: string;
    };
  };
}

export const SPEECH_METADATA = {
  title: 'PAHLAWANKU TELADANKU, MELANGKAH BERSAMA MELANJUTKAN PERJUANGAN',
  tema: 'PAHLAWANKU TELADANKU, MELANGKAH BERSAMA MELANJUTKAN PERJUANGAN',
  occasion: 'Upacara Penaikan Bendera Memperingati Hari Pahlawan Nasional 2026',
  date: 'Selasa, 10 November 2026',
  speaker: 'Ruri Okvawani',
  role: 'Guru & Pembina Upacara',
  school: 'SMAS TUNAS BARU JIN SEUNG BATAM',
  principal: 'Bapak Sabam Sitinjak, S.Th',
  principalRole: 'Kepala SMAS Tunas Baru Jin Seung Batam',
  targetDuration: '18 – 20 Menit',
  approxWords: 2000,
};

export const ICONIC_QUOTES: IconicQuote[] = [
  {
    id: 'quote-1',
    quote: 'Kemerdekaan ini bukan hadiah yang jatuh cuma-cuma dari meja perundingan, melainkan amanah suci yang ditebus dengan darah, air mata, dan doa yang wajib kita pertahankan dengan segenap jiwa raga.',
    context: 'Bagian B - Mengenang Jasa Para Pahlawan',
    keyAction: 'Ucapkan dengan nada berwibawa, tatap kibaran Sang Merah Putih di tiang bendera.',
  },
  {
    id: 'quote-2',
    quote: 'Pahlawan hari ini bukan lagi mereka yang mengangkat bambu runcing di parit pertempuran, melainkan anak-anak muda yang berani melawan kemalasan, menolak kecurangan, dan teguh merawat kejujuran.',
    context: 'Bagian C - Pahlawanku Teladanku',
    keyAction: 'Ucapkan dengan tegas dan tatap langsung barisan siswa kelas X, XI, dan XII.',
  },
  {
    id: 'quote-3',
    quote: 'Musuh terberat generasimu saat ini bukan serdadu asing di seberang samudra, melainkan rasa malas, kecanduan gawai tanpa arah, tumpulnya empati, dan bibit kebencian di dalam hati sendiri.',
    context: 'Bagian D - Perjuangan Generasi Muda Masa Kini',
    keyAction: 'Tekankan kata "musuh terberat" dengan suara berat dan jeda yang bermakna.',
  },
  {
    id: 'quote-4',
    quote: 'Indonesia tidak pernah ditegakkan oleh kehebatan satu orang yang merasa paling pintar, melainkan oleh jutaan tangan yang saling merangkul dalam satu ikrar persaudaraan kebangsaan.',
    context: 'Bagian E - Melangkah Bersama Melanjutkan Perjuangan',
    keyAction: 'Rentangkan kedua telapak tangan sedikit terbuka ke arah seluruh hadirin.',
  },
  {
    id: 'quote-5',
    quote: 'Jika para pahlawan yang telah gugur itu hadir di lapangan ini hari ini dan menatap mata kita satu per satu... apakah mereka akan tersenyum bangga, ataukah mereka akan menangis melihat waktu mudamu terbuang percuma?',
    context: 'Bagian F - Momen Refleksi yang Menyentuh Hati',
    keyAction: 'Turunkan nada suara menjadi lembut bergetar, beri jeda hening 5-8 detik.',
  },
  {
    id: 'quote-6',
    quote: 'Jadilah pemuda yang ketika melangkah membuat bumi bergetar karena karyamu, bukan pemuda yang membuat orang tuamu menangis diam-diam karena penyesalan di hari tua.',
    context: 'Bagian F - Momen Refleksi yang Menyentuh Hati',
    keyAction: 'Ucapkan dengan ketulusan seorang guru dan ibu, penuh cinta kasih.',
  },
  {
    id: 'quote-7',
    quote: 'Pahlawanku Teladanku! Mari kita melangkah bersama, bergandengan tangan, melanjutkan perjuangan menuju Indonesia Emas dari gerbang SMAS Tunas Baru Jin Seung Batam!',
    context: 'Bagian G - Penutup yang Kuat dan Menggugah',
    keyAction: 'Suara lantang menggelegar, penuh keyakinan dan optimisme membara.',
  },
];

export const TONE_EXAMPLES: ToneExample[] = [
  {
    id: 'tone-1',
    sentence: 'Jangan sampai kita menikmati kemerdekaan, tetapi kita sendiri yang melalaikan masa depan bangsa!',
    styles: {
      tegas: {
        pitch: 0.95,
        rate: 0.95,
        description: 'Vokal berat berwibawa, suku kata diputus rapi, pandangan menusuk tajam ke depan.',
        vocalTips: 'Keluarkan suara dari diafragma, beri penekanan keras pada kata "menikmati" dan "melalaikan".',
      },
      lembut: {
        pitch: 1.05,
        rate: 0.85,
        description: 'Vokal hangat seperti seorang ibu yang menasihati anak tercinta, sedikit melambat.',
        vocalTips: 'Gunakan napas lembut, tahan nada di akhir kalimat seperti memohon dengan ketulusan.',
      },
      semangat: {
        pitch: 1.15,
        rate: 1.1,
        description: 'Vokal menggelegar dengan tempo cepat dinamis, membakar adrenalin pendengar.',
        vocalTips: 'Angkat kepala, intonasi naik di setiap kata, akhiri dengan nada bulat bertenaga.',
      },
    },
  },
  {
    id: 'tone-2',
    sentence: 'Kalian adalah pemilik sah masa depan Indonesia, dan perjuangan itu dimulai dari meja belajarmu hari ini.',
    styles: {
      tegas: {
        pitch: 1.0,
        rate: 0.95,
        description: 'Tegas penuh penegasan hak dan tanggung jawab tanpa keraguan.',
        vocalTips: 'Tekan kata "pemilik sah" dan jeda setengah detik sebelum kata "dimulai".',
      },
      lembut: {
        pitch: 1.05,
        rate: 0.88,
        description: 'Menyentuh kalbu, menanamkan keyakinan berharga pada diri siswa yang sedang ragu.',
        vocalTips: 'Ucapkan kata "Kalian" dengan tatapan mata hangat berpindah dari barisan depan ke belakang.',
      },
      semangat: {
        pitch: 1.12,
        rate: 1.08,
        description: 'Pekikan tekad generasi penerus yang siap menggoncang dunia dengan prestasi.',
        vocalTips: 'Beri energi dorongan di kata "perjuangan itu dimulai!", tahan napas mantap di dada.',
      },
    },
  },
];

export const SPEECH_PARAGRAPHS: SpeechParagraph[] = [
  // ==========================================
  // BAGIAN A: PEMBUKAAN YANG BERKESAN (2 MENIT)
  // ==========================================
  {
    id: 'p-1',
    order: 1,
    sectionId: 'A',
    sectionTitle: 'A. PEMBUKAAN YANG BERKESAN',
    targetDurationMinutes: 0.5,
    text: '[TEGAS] Syalom, damai sejahtera dalam kasih Tuhan kita Yesus Kristus bagi kita semua! [JEDA 3 DETIK] [SEMANGAT] Selamat pagi dan salam sejahtera untuk kita sekalian, keluarga besar SMAS Tunas Baru Jin Seung Batam.',
    guidance: {
      tone: 'Lantang, hangat, ramah, dan penuh wibawa kasih seorang pembina upacara.',
      speed: 'Tempo sedang (~90 WPM), beri jeda khidmat setelah ucapan Syalom.',
      pauseMoment: 'Tarik napas penuh setelah salam pembuka sebelum masuk kalimat penghormatan.',
      emphasisWords: ['Syalom', 'damai sejahtera', 'kasih Tuhan', 'keluarga besar'],
      facialExpression: 'Tatap lurus ke tengah lapangan upacara dengan pandangan hangat dan bersahabat.',
      bodyPosture: 'Berdiri tegak di belakang mimbar, kedua tangan memegang map naskah setinggi dada.',
    },
  },
  {
    id: 'p-2',
    order: 2,
    sectionId: 'A',
    sectionTitle: 'A. PEMBUKAAN YANG BERKESAN',
    targetDurationMinutes: 0.5,
    text: '[KHIDMAT] Yang teramat saya hormati, Bapak Kepala SMAS Tunas Baru Jin Seung Batam, Bapak Sabam Sitinjak, S.Th, [LEMBUT] Bapak dan Ibu Dewan Guru yang kami kasihi dan muliakan, para pendidik yang tak pernah lelah menyalakan lentera ilmu dan iman di sanubari kami, rekan-rekan staf tata usaha dan tenaga kependidikan yang senantiasa berdedikasi dengan setia tanpa pamrih, [JEDA 3 DETIK] [TEKANAN] serta yang teramat saya banggakan, saya kasihi, dan saya rindukan masa depan gemilangnya: anak-anakku, seluruh siswa-siswi SMAS Tunas Baru Jin Seung Batam dari kelas sepuluh, sebelas, hingga kelas dua belas.',
    guidance: {
      tone: 'Penuh takzim dan rasa hormat yang mendalam kepada Bapak Kepala Sekolah dan segenap dewan guru.',
      speed: 'Tempo teratur dan lambat, berbobot dan menenangkan suasana lapangan.',
      pauseMoment: 'Berhenti sejenak saat menatap deretan Bapak/Ibu guru di saf kehormatan.',
      emphasisWords: ['Bapak Sabam Sitinjak, S.Th', 'Dewan Guru yang kami kasihi', 'anak-anakku tercinta'],
      facialExpression: 'Condongkan sedikit anggukan hormat ke arah barisan dewan guru dan staf.',
      bodyPosture: 'Arahkan pandangan dari panggung kehormatan menuju seluruh saf peserta upacara.',
    },
  },
  {
    id: 'p-3',
    order: 3,
    sectionId: 'A',
    sectionTitle: 'A. PEMBUKAAN YANG BERKESAN',
    targetDurationMinutes: 0.5,
    text: '[KHIDMAT] Marilah kita bersama-sama menundukkan kepala sejenak, memanjatkan puji, hormat, dan rasa syukur yang tak terhingga ke hadirat Tuhan Yang Maha Kasih, Bapa Surgawi kita. Atas limpahan berkat keselamatan, sukacita, dan napas kehidupan yang dianugerahkan-Nya bagi kita, pada pagi hari yang teduh dan penuh anugerah ini—Selasa, 10 November 2026—kita dikaruniai kesempatan berdiri tegak bersekutu di halaman sekolah yang kita cintai ini, guna memperingati peristiwa paling bersejarah bagi kehormatan bangsa: [TEKANAN] Hari Pahlawan Nasional tahun 2026.',
    guidance: {
      tone: 'Rasa syukur yang khusyuk dan penuh penghayatan spiritual kristiani.',
      speed: 'Lambat dan khidmat (~85 WPM).',
      pauseMoment: 'Jeda 2 detik setelah menyebutkan tanggal "10 November 2026".',
      emphasisWords: ['puji dan rasa syukur', 'Bapa Surgawi', 'Hari Pahlawan Nasional'],
      facialExpression: 'Wajah tenang, teduh, menghayati rasa syukur mendalam.',
      bodyPosture: 'Posisi berdiri tegak mantap, memancarkan ketenangan batin seorang pembina.',
    },
  },
  {
    id: 'p-4',
    order: 4,
    sectionId: 'A',
    sectionTitle: 'A. PEMBUKAAN YANG BERKESAN',
    targetDurationMinutes: 0.5,
    text: '[LEMBUT] Sebelum kita melangkah lebih jauh menyelami pesan-pesan perjuangan pagi ini, izinkan saya membawakan sebuah untaian pantun khas tanah Melayu yang indah: [JEDA 3 DETIK] [SEMANGAT] Pulau Batam indah membentang, [JEDA 3 DETIK] Perahu berlayar ke Selat Melaka. [JEDA 3 DETIK] Budi pahlawan terkenang terang, [JEDA 3 DETIK] Tugas kita menjaga Indonesia merdeka! [JEDA 3 DETIK] [TEGAS] Anak-anakku sekalian, di bawah kibaran Sang Saka Merah Putih yang berkibar megah di langit Batam pagi ini, kita tidak sedang sekadar berkumpul menjalankan rutinitas hari Selasa. Kita hadir di lapangan ini membawa amanah suci dari jutaan tetes darah, keringat, dan air mata para pendahulu bangsa.',
    guidance: {
      tone: 'Irama pantun Melayu yang merdu dan dinamis, disambung kalimat pembuka yang menggugah.',
      speed: 'Irama pantun beralun jelas, lalu tempo mantap pada kalimat amanah suci.',
      pauseMoment: 'Jeda jelas setelah baris kedua dan baris keempat pantun.',
      emphasisWords: ['Pulau Batam', 'Budi pahlawan', 'amanah suci', 'Sang Saka Merah Putih'],
      facialExpression: 'Senyum bangga saat berpantun, lalu tatapan fokus serius saat membicarakan amanah suci.',
      bodyPosture: 'Angkat pandangan lurus menatap ke tengah lapangan upacara.',
    },
  },

  // ==========================================
  // BAGIAN B: MENGENANG JASA PARA PAHLAWAN (3 MENIT)
  // ==========================================
  {
    id: 'p-5',
    order: 5,
    sectionId: 'B',
    sectionTitle: 'B. MENGENANG JASA PARA PAHLAWAN',
    targetDurationMinutes: 0.75,
    text: '[LEMBUT] Anak-anakku, mari kita pejamkan mata batin kita sejenak, memutar kembali lembaran sejarah delapan puluh satu tahun yang lalu, tepatnya pada 10 November 1945. Bayangkan suasana kota Surabaya saat itu. Langit kota yang biasanya cerah seketika berubah pekat oleh kepulan asap mesiu. Suara desingan mortir, gelegar meriam dari kapal perang sekutu, dan deru pesawat tempur memecah kesunyian fajar. [JEDA 3 DETIK] Pasukan asing pemenang Perang Dunia Kedua datang dengan congkak, membawa persenjataan tercanggih pada masanya, mengeluarkan ultimatum yang merendahkan martabat: mereka menuntut bangsa Indonesia menyerah tanpa syarat sambil mengangkat tangan ke atas sebelum batas fajar tiba.',
    guidance: {
      tone: 'Naratif sejarah yang hidup dan memikat, melukiskan suasana genting perang.',
      speed: 'Tempo tenang, deskriptif, artikulasi jernih.',
      pauseMoment: 'Jeda hening setelah kata "mengeluarkan ultimatum yang merendahkan martabat".',
      emphasisWords: ['delapan puluh satu tahun yang lalu', 'asap mesiu', 'ultimatum yang merendahkan'],
      facialExpression: 'Raut wajah serius mengenang suasana genting perjuangan kemerdekaan.',
      bodyPosture: 'Badan tegak, sedikit mencondongkan badan ke depan untuk memikat perhatian siswa.',
    },
  },
  {
    id: 'p-6',
    order: 6,
    sectionId: 'B',
    sectionTitle: 'B. MENGENANG JASA PARA PAHLAWAN',
    targetDurationMinutes: 0.75,
    text: '[TEGAS] Namun, apa jawaban dari rakyat Indonesia saat itu? Apakah para pemuda pejuang di sana lari ketakutan bersembunyi di balik dinding rumah mereka? [JEDA 3 DETIK] [TEGAS] Tidak! Sama sekali tidak! Melalui siaran radio yang membakar dada, Bung Tomo menyuarakan pekik kemerdekaan dan gelora patriotisme yang menyatukan jutaan jiwa. Arek-arek Surabaya, para pemuda pelajar seusia kalian saat ini, pemuda gereja, buruh, dan segenap rakyat jelata memilih berdiri teguh di baris terdepan. Dengan bermodalkan bambu yang diruncingkan, senjata rampasan seadanya, serta iman dan keberanian yang tak terbeli oleh apa pun, mereka menghadang tank-tank baja lapis baja dengan dada telanjang. Mereka memilih mati berkalang tanah daripada harus dijajah kembali!',
    guidance: {
      tone: 'Tegas, bertenaga, membangkitkan rasa bangga dan heroisme nasional.',
      speed: 'Menghentak pada kalimat penolakan "Tidak! Sama sekali tidak!".',
      pauseMoment: 'Jeda setelah pertanyaan retoris "Apakah para pemuda pejuang lari ketakutan?".',
      emphasisWords: ['Tidak!', 'Sama sekali tidak!', 'bambu yang diruncingkan', 'mati berkalang tanah'],
      facialExpression: 'Mata tajam berbinar, rahang kokoh, ekspresi penuh wibawa keberanian.',
      bodyPosture: 'Tegakkan bahu, dada dibusungkan dengan wibawa seorang patriot.',
    },
  },
  {
    id: 'p-7',
    order: 7,
    sectionId: 'B',
    sectionTitle: 'B. MENGENANG JASA PARA PAHLAWAN',
    targetDurationMinutes: 0.75,
    text: '[KHIDMAT] Semangat pantang bertekuk lutut itu pun sesungguhnya bukan milik satu pulau semata. Di bumi Kepulauan Riau tempat sekolah kita berdiri hari ini, napas kepahlawanan telah diukir dengan tinta emas oleh para pejuang bahari kita. Kita mengenang Yang Dipertuan Muda Raja Haji Fisabilillah yang memimpin pertempuran sengit di Teluk Ketapang melawan armada penjajah. Hingga tetes darah penghabisan, beliau memegang sumpahnya: lebih baik karam ke dasar samudra daripada membiarkan kedaulatan tanah Melayu diinjak-injak bangsa asing. Kita pun mengenang Sultan Mahmud Riayat Syah yang memimpin perang gerilya laut bertahun-tahun di selat-selat Kepri, membuktikan bahwa laut nusantara bukan pemisah, melainkan urat nadi pemersatu kemerdekaan.',
    guidance: {
      tone: 'Penghayatan sejarah maritim lokal yang membanggakan bagi warga Batam.',
      speed: 'Tempo sedang berwibawa.',
      pauseMoment: 'Beri jeda setelah menyebutkan ikrar Raja Haji Fisabilillah.',
      emphasisWords: ['Kepulauan Riau', 'Raja Haji Fisabilillah', 'Sultan Mahmud Riayat Syah', 'laut nusantara'],
      facialExpression: 'Tatapan teduh penuh takzim pada perjuangan pahlawan tanah Melayu.',
      bodyPosture: 'Tangan kiri memegang map, tangan kanan rileks memberi aksen ketegasan santun.',
    },
  },
  {
    id: 'p-8',
    order: 8,
    sectionId: 'B',
    sectionTitle: 'B. MENGENANG JASA PARA PAHLAWAN',
    targetDurationMinutes: 0.75,
    text: '[HARU] Anak-anakku sekalian, renungkanlah dengan hati yang paling jujur: [TEKANAN] Kemerdekaan Republik Indonesia ini bukanlah hadiah cuma-cuma yang jatuh dari langit, bukan pula belas kasihan penjajah yang diberikan di atas kertas perundingan. Kemerdekaan ini ditebus dengan harga yang teramat sangat mahal. Ditebus dengan jeritan air mata para ibu yang merelakan anak bujangnya berpamitan di muka pintu dan tak pernah kembali. Ditebus dengan ribuan pejuang tanpa tanda jasa yang namanya tak sempat tercatat di buku sejarah, yang jasadnya berkalang tanah di rimba sunyi dan dasar lautan demi satu harapan suci: [LEMBUT] agar kelak generasi kalian bisa bersekolah dengan tenang, bisa menuntut ilmu dengan merdeka, dan dapat berdiri sejajar dengan bangsa-bangsa besar di dunia.',
    guidance: {
      tone: 'Sangat menyentuh hati, vokal bergetar lembut membawa rasa haru yang jujur.',
      speed: 'Lambat dan penuh penghayatan jiwa (~85 WPM).',
      pauseMoment: 'Jeda 3 detik setelah frasa "tak pernah kembali".',
      emphasisWords: ['bukan hadiah cuma-cuma', 'air mata para ibu', 'bersekolah dengan tenang'],
      facialExpression: 'Mata teduh dan berkaca-kaca menatap para murid dengan rasa sayang.',
      bodyPosture: 'Merendahkan nada suara namun tetap berwibawa penuh kasih sayang seorang pendidik.',
    },
  },

  // ==========================================
  // BAGIAN C: PAHLAWANKU TELADANKU (4 MENIT)
  // ==========================================
  {
    id: 'p-9',
    order: 9,
    sectionId: 'C',
    sectionTitle: 'C. PAHLAWANKU TELADANKU',
    targetDurationMinutes: 1.0,
    text: '[TEGAS] Peringatan Hari Pahlawan tahun 2026 ini mengusung sebuah tema agung yang sarat makna: [TEKANAN] "PAHLAWANKU TELADANKU, MELANGKAH BERSAMA MELANJUTKAN PERJUANGAN". Mari kita tanyakan dalam benak kita: apa arti sesungguhnya dari kata "Pahlawanku Teladanku"? [JEDA 3 DETIK] Apakah pahlawan itu hanya sebatas sosok berwajah kaku yang gambarnya dipajang di dinding ruang kelas? Apakah pahlawan hanya cerita masa lalu yang hanya kita buka setahun sekali saat upacara bendera? [TEGAS] Tentu tidak! Pahlawan adalah mereka yang memiliki keberanian moral, mereka yang rela mengorbankan kesenangan pribadi demi kemaslahatan orang banyak, dan mereka yang memegang teguh integritas serta kejujuran dalam hidupnya.',
    guidance: {
      tone: 'Filosofis, lugas, mendidik, dan membangun sudut pandang baru bagi siswa.',
      speed: 'Tempo tenang, setiap anak kalimat ditekankan maknanya.',
      pauseMoment: 'Jeda setelah melafalkan tema Hari Pahlawan 2026.',
      emphasisWords: ['PAHLAWANKU TELADANKU', 'Tentu tidak!', 'keberanian moral', 'integritas serta kejujuran'],
      facialExpression: 'Tatap siswa dengan pandangan yang menuntut kesungguhan hati.',
      bodyPosture: 'Posisi dada tegak, kepala terangkat anggun dan percaya diri.',
    },
  },
  {
    id: 'p-10',
    order: 10,
    sectionId: 'C',
    sectionTitle: 'C. PAHLAWANKU TELADANKU',
    targetDurationMinutes: 1.0,
    text: '[LEMBUT] Di bangku sekolah menengah atas ini, keteladanan pahlawan tidak harus diwujudkan dengan hal-hal yang bombastis atau muluk-muluk. Keteladanan pahlawan hadir dalam pilihan-pilihan kecil yang kalian ambil setiap hari. [TEKANAN] Menjadi pahlawan teladan adalah ketika kalian berani berkata jujur saat mengerjakan ujian, meskipun teman di sebelahmu menawarkan contekan. Menjadi pahlawan adalah ketika kalian disiplin hadir tepat waktu sebelum bel masuk berbunyi, bukan karena takut hukuman guru piket, tetapi karena kalian menghargai waktu dan masa depanmu sendiri. Menjadi pahlawan adalah ketika kalian memiliki rasa tanggung jawab untuk menjaga kebersihan kelas dan fasilitas sekolah tempat kita bernaung.',
    guidance: {
      tone: 'Menyentuh aspek praktis kehidupan harian murid di sekolah.',
      speed: 'Tempo sedang, mengalir santai namun sarat nasihat berharga.',
      pauseMoment: 'Jeda pada setiap contoh konkret (jujur saat ujian, disiplin hadir, menjaga fasilitas).',
      emphasisWords: ['pilihan-pilihan kecil', 'berkata jujur', 'disiplin hadir tepat waktu', 'tanggung jawab'],
      facialExpression: 'Senyum hangat membesarkan hati anak didik.',
      bodyPosture: 'Tatap barisan perwakilan kelas secara bergantian dari sayap kiri ke sayap kanan.',
    },
  },
  {
    id: 'p-11',
    order: 11,
    sectionId: 'C',
    sectionTitle: 'C. PAHLAWANKU TELADANKU',
    targetDurationMinutes: 1.0,
    text: '[HARU] Anak-anakku yang sangat saya cintai... cobalah pandang sekelilingmu hari ini. Pahlawan itu sesungguhnya tidak jauh, mereka bernapas dan hidup di tengah-tengah kita. [LEMBUT] Pahlawan terhebat dalam hidupmu adalah kedua orang tuamu di rumah. Bayangkan sosok ayahmu yang bangun di keheningan pagi, bersiap menembus debu jalanan Batam menuju galangan kapal di Tanjung Uncang, pabrik-pabrik di Mukakuning dan Batamindo, pelabuhan di Batu Ampar, atau berpanas-panasan membuka warung di tepi jalan. Telapak tangan ayahmu mungkin kasar dan kapalan, keringatnya menetes membasahi pelipis, namun beliau tak pernah meminta imbalan selain melihat anaknya berhasil menjadi manusia yang bermartabat dan memiliki seragam sekolah yang rapi.',
    guidance: {
      tone: 'Sangat menyentuh kalbu, menggugah empati dan bakti kepada orang tua.',
      speed: 'Perlahan (~85 WPM), biarkan kata-kata meresap ke dalam sanubari siswa.',
      pauseMoment: 'Jeda 3 detik setelah menyebut tempat kerja orang tua di Batam.',
      emphasisWords: ['kedua orang tuamu', 'Tanjung Uncang', 'Mukakuning', 'Batu Ampar', 'telapak tangan ayahmu'],
      facialExpression: 'Ekspresi penuh rasa haru dan kasih sayang tulus seorang ibu guru.',
      bodyPosture: 'Pandangan lembut menyapu wajah-wajah siswa yang mulai terhenyak.',
    },
  },
  {
    id: 'p-12',
    order: 12,
    sectionId: 'C',
    sectionTitle: 'C. PAHLAWANKU TELADANKU',
    targetDurationMinutes: 1.0,
    text: '[LEMBUT] Dan pandanglah pula para pendidikmu, Bapak dan Ibu Guru yang berdiri mendampingi kalian di lapangan upacara ini. Mereka adalah pahlawan tanpa tanda jasa yang senantiasa mengorbankan waktu, pikiran, dan tenaga. Guru-gurumu yang tetap tersenyum menyapa di gerbang sekolah, yang berulang kali menjelaskan rumus matematika atau kaidah bahasa yang rumit hingga kalian benar-benar paham, bahkan ketika di rumah mereka sendiri sedang memikirkan cobaan hidup yang tak ringan. [TEKANAN] Maka anak-anakku, teladanilah ketulusan mereka! Balaslah pengorbanan orang tuamu dan guru-gurumu bukan dengan kata-kata manis di bibir semata, melainkan dengan bukti kesungguhan belajar, kesantunan budi pekerti, dan akhlak yang mulia!',
    guidance: {
      tone: 'Menggugah rasa hormat dan terima kasih mendalam kepada dewan guru.',
      speed: 'Tempo sedang penuh kehangatan apresiasi.',
      pauseMoment: 'Tolehkan pandangan sejenak ke arah dewan guru dengan takzim.',
      emphasisWords: ['pahlawan tanpa tanda jasa', 'tetap tersenyum', 'akhlak yang mulia'],
      facialExpression: 'Tersenyum tulus ke arah barisan guru, lalu kembali menatap siswa.',
      bodyPosture: 'Tangan sedikit terbuka menunjuk arah barisan pendidik dengan santun.',
    },
  },

  // ==========================================
  // BAGIAN D: PERJUANGAN GENERASI MUDA MASA KINI (4 MENIT)
  // ==========================================
  {
    id: 'p-13',
    order: 13,
    sectionId: 'D',
    sectionTitle: 'D. PERJUANGAN GENERASI MUDA MASA KINI',
    targetDurationMinutes: 1.0,
    text: '[TEGAS] Siswa-siswi SMAS Tunas Baru Jin Seung Batam yang saya banggakan! Kita wajib membuka mata selebar-lebarnya: [TEKANAN] Bentuk penjajahan di abad kedua puluh satu ini telah bersalin rupa. Tidak ada lagi serdadu berseragam loreng yang menduduki kota kita dengan senapan bayonet. Tetapi jangan pernah terlena, karena musuh generasi kalian hari ini jauh lebih licik dan tak kasat mata. Musuh itu tidak datang membawa dentuman meriam, melainkan menyelinap perlahan melalui kelalaian, merusak akhlak, menumpulkan akal sehat, dan melumpuhkan masa depan bangsa dari dalam bilik kamar kalian sendiri.',
    guidance: {
      tone: 'Membangunkan kesadaran kritis, bertenaga, tajam, dan realistis.',
      speed: 'Tempo dinamis dan berenergi (~100 WPM).',
      pauseMoment: 'Jeda sejenak setelah kata "musuh generasi kalian hari ini jauh lebih licik".',
      emphasisWords: ['bersalin rupa', 'jauh lebih licik', 'melumpuhkan masa depan bangsa'],
      facialExpression: 'Tatapan mata tajam, waspada, ekspresi menantang keberanian moral murid.',
      bodyPosture: 'Berdiri tegak kokoh di tengah mimbar upacara.',
    },
  },
  {
    id: 'p-14',
    order: 14,
    sectionId: 'D',
    sectionTitle: 'D. PERJUANGAN GENERASI MUDA MASA KINI',
    targetDurationMinutes: 1.0,
    text: '[TEKANAN] Tahukah kalian siapa musuh-musuh nyata generasimu saat ini? [JEDA 3 DETIK] Musuh pertamamu adalah [TEGAS] kemalasan dan sindrom menunda-nunda pekerjaan. Berapa banyak tugas yang terbengkalai hanya karena kalimat "ah, nanti saja"? Musuh keduamu adalah [TEGAS] kecanduan layar gawai dan media sosial yang tak terkendali. Kalian bisa menghabiskan waktu empat, lima, bahkan enam jam sehari hanya untuk scrolling video pendek tanpa makna, tetapi merasa mengantuk saat membuka buku pelajaran selama lima belas menit! Musuh ketigamu adalah [TEGAS] normalisasi kecurangan: mencontek jawaban teman, copy-paste tugas dari internet tanpa berpikir, hingga membiarkan ketidakjujuran menjadi kebiasaan hidup!',
    guidance: {
      tone: 'Korektif, tegas membongkar kebiasaan buruk secara lugas dan menyentil nurani.',
      speed: 'Pacing bertahap, intonasi meninggi pada setiap butir musuh.',
      pauseMoment: 'Jeda tegas setelah melafalkan setiap nomor musuh.',
      emphasisWords: ['kemalasan', 'kecanduan layar gawai', 'normalisasi kecurangan'],
      facialExpression: 'Ekspresi serius, tegas, memancarkan kepedulian seorang ibu guru pembina.',
      bodyPosture: 'Angkat satu tangan dengan isyarat penekanan pada setiap poin bahaya.',
    },
  },
  {
    id: 'p-15',
    order: 15,
    sectionId: 'D',
    sectionTitle: 'D. PERJUANGAN GENERASI MUDA MASA KINI',
    targetDurationMinutes: 1.0,
    text: '[TEGAS] Dan yang paling menyayat hati, musuh berikutnya adalah [TEKANAN] perundungan atau bullying! Baik berupa perundungan fisik, ejekan verbal yang menusuk perasaan, maupun cyberbullying di grup percakapan media sosial. [LEMBUT] Betapa ironisnya, para pahlawan kita berjuang mempersatukan suku bangsa, tetapi di sekolah kita masih ada yang merasa hebat dengan menertawakan nama orang tua temannya, mengucilkan kawan yang pendiam, atau mencibir kekurangan fisik sesamanya. Pahlawan itu merangkul yang lemah, bukan menginjak yang tak berdaya! Belum lagi ancaman bahaya narkoba, judi online berkedok game, konten pornografi, serta pergaulan bebas yang mengintai dan siap merenggut cita-citamu dalam sekejap mata.',
    guidance: {
      tone: 'Keras dan tegas menolak perundungan, namun merangkul kembali dengan nilai kemanusiaan.',
      speed: 'Tempo sedang, penekanan artikulasi sangat jelas pada kata bullying.',
      pauseMoment: 'Jeda panjang setelah "Pahlawan itu merangkul yang lemah, bukan menginjak yang tak berdaya!".',
      emphasisWords: ['perundungan atau bullying', 'merangkul yang lemah', 'bukan menginjak', 'judi online'],
      facialExpression: 'Sorot mata tajam lalu melembut penuh imbauan moral yang tulus.',
      bodyPosture: 'Tegap, kedua tangan menopang map naskah dengan penuh ketegasan.',
    },
  },
  {
    id: 'p-16',
    order: 16,
    sectionId: 'D',
    sectionTitle: 'D. PERJUANGAN GENERASI MUDA MASA KINI',
    targetDurationMinutes: 1.0,
    text: '[SEMANGAT] Ingatlah anak-anakku, posisi kita di SMAS Tunas Baru Jin Seung Batam ini sangat istimewa. Kota Batam adalah beranda terdepan bangsa Indonesia yang berhadapan langsung dengan lalu lintas pelayaran dunia di Selat Singapura dan Selat Malaka. Kita bersentuhan langsung dengan dinamika ekonomi dan kemajuan teknologi internasional. Jika anak-anak Batam tidak membekali diri dengan ilmu yang mendalam, kecakapan bahasa, kemahiran teknologi, dan akhlak yang terpuji, kalian kelak hanya akan menjadi penonton di rumah kalian sendiri! [TEGAS] Maka bangkitlah! Jadikan gawai di tanganmu sebagai alat riset, sarana mengasah bakat, dan jembatan melahirkan inovasi yang membanggakan orang tuamu!',
    guidance: {
      tone: 'Motivator ulung, membakar ambisi positif generasi muda Batam menyongsong masa depan.',
      speed: 'Cepat, energik, berapi-api namun artikulasi vokal tetap terjaga bulat.',
      pauseMoment: 'Jeda 2 detik setelah frasa "penonton di rumah kalian sendiri".',
      emphasisWords: ['beranda terdepan bangsa', 'penonton di rumah sendiri', 'Maka bangkitlah!'],
      facialExpression: 'Wajah bersemangat, mata memancarkan optimisme dan harapan besar.',
      bodyPosture: 'Bahu tegap, dagu terangkat mantap memancarkan wibawa pendidik.',
    },
  },

  // ==========================================
  // BAGIAN E: MELANGKAH BERSAMA MELANJUTKAN PERJUANGAN (4 MENIT)
  // ==========================================
  {
    id: 'p-17',
    order: 17,
    sectionId: 'E',
    sectionTitle: 'E. MELANGKAH BERSAMA MELANJUTKAN PERJUANGAN',
    targetDurationMinutes: 1.0,
    text: '[LEMBUT] Poin krusial berikutnya dalam tema kita adalah frasa: [TEKANAN] "MELANGKAH BERSAMA". Mengapa harus melangkah bersama? Mengapa para pendiri bangsa kita menekankan nilai gotong royong? [JEDA 3 DETIK] Karena tidak ada satu perahu pun yang mampu menyeberangi badai samudra jika para pendayungnya saling bertengkar di atas geladak! Kemerdekaan Indonesia tidak pernah diperjuangkan oleh satu suku sendirian. Kemerdekaan ini ditegakkan oleh darah orang Batak, orang Melayu, orang Minang, orang Sunda, orang Bugis, orang Bali, orang Jawa, warga keturunan Tionghoa, hingga saudara kita di Papua yang bersatu padu di bawah satu janji luhur: Bhinneka Tunggal Ika.',
    guidance: {
      tone: 'Menggelorakan persatuan dalam kebinekaan Indonesia yang majemuk.',
      speed: 'Tempo sedang yang bertambah megah pada ikrar persatuan bangsa.',
      pauseMoment: 'Jeda sejenak setelah analogi badai perahu dan nama-nama suku.',
      emphasisWords: ['MELANGKAH BERSAMA', 'gotong royong', 'Bhinneka Tunggal Ika'],
      facialExpression: 'Senyum bangga merangkul keberagaman siswa yang majemuk di sekolah.',
      bodyPosture: 'Tangan sedikit direntangkan ke arah saf barisan siswa sebagai gestur rangkulan.',
    },
  },
  {
    id: 'p-18',
    order: 18,
    sectionId: 'E',
    sectionTitle: 'E. MELANGKAH BERSAMA MELANJUTKAN PERJUANGAN',
    targetDurationMinutes: 1.0,
    text: '[TEGAS] Di lingkungan SMAS Tunas Baru Jin Seung Batam ini, kita adalah replika kecil dari Indonesia yang kaya warna. Kita belajar di bawah atap yang sama, menghirup udara yang sama, dan menatap kibaran bendera merah putih yang sama. [LEMBUT] Maka dari atas mimbar ini, saya mengajak kalian semua: jadikanlah sekolah ini sebagai rumah yang aman, hangat, dan penuh kasih bagi setiap jiwa di dalamnya. Jadilah kawan yang mengulurkan tangan ketika sahabatmu terpeleset, bukan yang merekam dan menertawakannya. Ketika teman sebangkumu kesulitan memahami materi pelajaran, ajarkan dengan sabar. Ketika temanmu merasa sedih dan tertekan, jadilah pendengar yang setia.',
    guidance: {
      tone: 'Keluargaan, empati tinggi, membangun rasa solidaritas di lingkungan sekolah.',
      speed: 'Tenang, akrab, persuasif, membimbing.',
      pauseMoment: 'Jeda setelah "kita adalah replika kecil dari Indonesia".',
      emphasisWords: ['replika kecil dari Indonesia', 'mengulurkan tangan', 'bukan menertawakannya'],
      facialExpression: 'Mata memancarkan kehangatan seorang guru pembina yang penuh ketulusan.',
      bodyPosture: 'Posisi rileks bersahabat namun tetap mencerminkan kewibawaan upacara.',
    },
  },
  {
    id: 'p-19',
    order: 19,
    sectionId: 'E',
    sectionTitle: 'E. MELANGKAH BERSAMA MELANJUTKAN PERJUANGAN',
    targetDurationMinutes: 1.0,
    text: '[SEMANGAT] Jangan pernah biarkan ada siswa yang merasa kesepian atau terasing di lorong-lorong kelas kita. Prestasi sebuah sekolah tidak hanya dihitung dari deretan piala kejuaraan yang berkilau di lemari kaca kantor, tetapi diukur dari seberapa dalam kepedulian yang kita semaikan kepada sesama insan. [TEKANAN] Ketika salah seorang kawan kita menorehkan prestasi dalam lomba sains, olahraga, atau seni, marilah kita dukung dan rayakan bersama tanpa rasa iri dengki. Dan ketika ada teman kita yang berbuat kekeliruan, marilah kita nasihati dengan santun, kita bimbing agar kembali melangkah ke arah kebaikan.',
    guidance: {
      tone: 'Humanis, menguatkan nilai sportivitas, persahabatan, dan saling mendukung.',
      speed: 'Tempo sedang berbobot (~95 WPM).',
      pauseMoment: 'Jeda setelah kata "lemari kaca kantor" dan kata "kepedulian yang kita semaikan".',
      emphasisWords: ['tidak merasa kesepian', 'kepedulian yang kita semaikan', 'tanpa rasa iri dengki'],
      facialExpression: 'Raut muka penuh keteguhan moral dan kebijaksanaan pendidik.',
      bodyPosture: 'Kedua tangan memegang naskah dengan tenang di depan dada.',
    },
  },
  {
    id: 'p-20',
    order: 20,
    sectionId: 'E',
    sectionTitle: 'E. MELANGKAH BERSAMA MELANJUTKAN PERJUANGAN',
    targetDurationMinutes: 1.0,
    text: '[SEMANGAT] Bapak Kepala Sekolah, Bapak Sabam Sitinjak yang kami hormati, rekan-rekan Dewan Guru yang kami kasihi, staf tata usaha, serta anak-anakku siswa-siswi tercinta: mari kita melangkah bersama! Kita bangun kolaborasi yang kokoh antara guru dan murid, antara sekolah dan orang tua di rumah, guna menciptakan lingkungan pendidikan yang berkarakter luhur, berwawasan global, dan berakar kuat pada nilai-nilai Pancasila. Generasi terdahulu telah memperjuangkan hak kita untuk merdeka. [TEGAS] Kini giliran pundak-pundak mudamu yang harus memikul tanggung jawab estafet perjuangan bangsa ini menyongsong fajar Indonesia Emas 2045!',
    guidance: {
      tone: 'Puncak ajakan aksi kolaboratif, penuh daya gugah emosional dan optimisme.',
      speed: 'Tempo dinamis dan bertenaga penuh (~105 WPM).',
      pauseMoment: 'Jeda sebelum kalimat pamungkas "Kini giliran pundak-pundak mudamu...".',
      emphasisWords: ['Bapak Sabam Sitinjak', 'mari kita melangkah bersama', 'Indonesia Emas 2045'],
      facialExpression: 'Sorot mata tajam bercahaya penuh keyakinan dan harapan.',
      bodyPosture: 'Kepala terangkat tegak, suara memantul merata menjangkau sudut lapangan upacara.',
    },
  },

  // ==========================================
  // BAGIAN F: MOMEN REFLEKSI YANG MENYENTUH HATI (2 MENIT)
  // ==========================================
  {
    id: 'p-21',
    order: 21,
    sectionId: 'F',
    sectionTitle: 'F. MOMEN REFLEKSI YANG MENYENTUH HATI',
    targetDurationMinutes: 1.0,
    text: '[LEMBUT] Anak-anakku seluruh peserta upacara yang saya cintai... [JEDA 3 DETIK] Sejenak, marilah kita heningkan cipta di dalam dada masing-masing. Dengarkan deru angin pagi di lapangan kita, dan tataplah lurus kibaran Sang Merah Putih di pucuk tiang bendera. [JEDA 3 DETIK] Di hadapan bendera pusaka itu, mari kita ajukan pertanyaan paling jujur kepada nurani kita: [HARU] Jika pada pagi hari ini, para pahlawan yang telah mengorbankan nyawanya di medan pertempuran diizinkan oleh Tuhan hadir berdiri di tengah-tengah lapangan ini, menatap tajam ke dalam bola mata kita satu per satu... [JEDA 3 DETIK] Apakah mereka akan tersenyum bangga melihat sikap kita? Ataukah mereka justru akan menunduk pilu?',
    guidance: {
      tone: 'Sangat khidmat, lembut berbisik namun terdengar jelas menusuk relung kalbu.',
      speed: 'Sangat lambat (~75-80 WPM), ciptakan ruang batin yang dalam bagi seluruh peserta.',
      pauseMoment: 'Jeda hening 3 detik di antara setiap pertanyaan batin pemantik refleksi.',
      emphasisWords: ['heningkan cipta', 'pertanyaan paling jujur', 'menatap tajam', 'tersenyum bangga'],
      facialExpression: 'Ekspresi penuh haru, tatapan dalam dan tenang menghipnotis keheningan lapangan.',
      bodyPosture: 'Sedikit tunduk hormat lalu tatap bendera dengan kekhusyukan mendalam.',
    },
  },
  {
    id: 'p-22',
    order: 22,
    sectionId: 'F',
    sectionTitle: 'F. MOMEN REFLEKSI YANG MENYENTUH HATI',
    targetDurationMinutes: 1.0,
    text: '[HARU] Apakah mereka akan menangis melihat anak-anak muda yang dimerdekakan dengan cucuran darah jutaan martir justru menyia-nyiakan masa mudanya dalam kelalaian, bermusuhan karena hal sepele, dan durhaka kepada orang tuanya? [JEDA 5-8 DETIK] [LEMBUT] Dengarkanlah bisikan hatimu anak-anakku... Masa mudamu di seragam putih abu-abu ini hanya datang sekali seumur hidup. Saat waktu itu lewat, ia takkan pernah bisa dibeli kembali dengan tumpukan emas permata. Kelak di masa depan, saat engkau berdiri di tengah masyarakat, engkau tidak akan ditanya seberapa viral videomu di internet, melainkan: seberapa tulus engkau telah membaktikan ilmumu bagi bangsa, dan seberapa besar engkau telah menjadi kebanggaan bagi ayah dan ibu yang melahirkanmu.',
    guidance: {
      tone: 'Klimaks refleksi haru, jeda hening hening 5-8 detik harus dijaga sempurna tanpa gerak.',
      speed: 'Sangat lambat dan bergetar tulus sarat kasih sayang keibuan.',
      pauseMoment: 'PENTING: Tahan napas dan diam hening total selama 5-8 detik saat tag jeda.',
      emphasisWords: ['menangis melihat', 'putih abu-abu', 'kebanggaan bagi ayah dan ibu'],
      facialExpression: 'Pandangan penuh rasa sayang yang mendalam, tidak menghakimi tapi menyadarkan.',
      bodyPosture: 'Tetap berdiri tegak sempurna, hening tanpa gerakan tangan, suasana sakral.',
    },
  },

  // ==========================================
  // BAGIAN G: PENUTUP YANG KUAT DAN MENGGUGAH (1 MENIT)
  // ==========================================
  {
    id: 'p-23',
    order: 23,
    sectionId: 'G',
    sectionTitle: 'G. PENUTUP YANG KUAT DAN MENGGUGAH',
    targetDurationMinutes: 0.5,
    text: '[SEMANGAT] Oleh karena itu, di Hari Pahlawan 10 November 2026 ini, mari kita bulatkan tekad di dalam dada! Angkat kepalamu dengan penuh harga diri, kuatkan langkah kakimu, dan luruskan niatmu. Buktikan bahwa darah para kesatria pejuang masih mengalir hangat dan deras di dalam urat nadimu! Jadilah pahlawan di ruang kelasmu dengan prestasimu yang gemilang. Jadilah pahlawan di rumahmu dengan baktimu yang tulus kepada orang tuamu. Dan jadilah pahlawan bagi bangsamu dengan sumbangsih karya nyatamu yang tak pernah padam!',
    guidance: {
      tone: 'Optimis, heroik, membakar semangat keberanian dan martabat pemuda.',
      speed: 'Tempo bertambah cepat dan tegas berenergi (~110 WPM).',
      pauseMoment: 'Jeda sejenak sebelum frasa "Buktikan bahwa darah para kesatria pejuang".',
      emphasisWords: ['bulatkan tekad', 'Angkat kepalamu', 'Jadilah pahlawan'],
      facialExpression: 'Tersenyum bangga dengan sorot mata penuh gelora optimisme kemenangan.',
      bodyPosture: 'Berdiri tegap gagah di mimbar pembina upacara.',
    },
  },
  {
    id: 'p-24',
    order: 24,
    sectionId: 'G',
    sectionTitle: 'G. PENUTUP YANG KUAT DAN MENGGUGAH',
    targetDurationMinutes: 0.5,
    text: '[LEMBUT] Sebelum saya mengakhiri amanat upacara penaikan bendera ini, terimalah sebuah pantun penutup dari lubuk hati saya yang terdalam: [JEDA 3 DETIK] [SEMANGAT] Burung serindit di dahan bidara, [JEDA 3 DETIK] Terbang tinggi menyongsong fajar. [JEDA 3 DETIK] Mari bersama membangun negara, [JEDA 3 DETIK] Dengan kasih setia dan tekad belajar! [JEDA 3 DETIK] [TEGAS] Selamat Hari Pahlawan Nasional 10 November 2026! Pahlawanku Teladanku, Melangkah Bersama Melanjutkan Perjuangan! [KHIDMAT] Kiranya damai sejahtera dan berkat kelimpahan dari Tuhan kita Yesus Kristus senantiasa menaungi keluarga besar SMAS Tunas Baru Jin Seung Batam. Terima kasih atas segala perhatian dan kedisiplinannya. [TEGAS] Syalom, Tuhan memberkati kita semua!',
    guidance: {
      tone: 'Pantun ceria membakar asa, salam penutup Kristen berkumandang hangat dan berwibawa.',
      speed: 'Irama pantun rapi berima, penutup mantap dan berkharisma tinggi.',
      pauseMoment: 'Jeda jelas di tiap baris pantun dan sebelum salam penutup Syalom.',
      emphasisWords: ['kasih setia', 'Selamat Hari Pahlawan', 'Tuhan memberkati kita', 'Syalom'],
      facialExpression: 'Senyum hangat terhormat memandang seluruh peserta upacara.',
      bodyPosture: 'Tutup map naskah pidato dengan anggun, berdiri sempurna memberi hormat khidmat.',
    },
  },
];
