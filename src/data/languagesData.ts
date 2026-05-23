export interface LangQuiz {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface LanguageUnit {
  id: string;
  title: string;
  miniTitle: string;
  level: "Pemula" | "Menengah" | "Master";
  shortDesc: string;
  content: string;
  examplePhrase: string; // Used for speech synthesis and recognition!
  examplePhraseTranslation: string;
  quiz: LangQuiz;
}

export interface LanguageCurriculum {
  code: string;
  name: string;
  flag: string;
  units: LanguageUnit[];
}

export interface HistoricalBook {
  id: string;
  title: string;
  author: string;
  era: "Kuno" | "Pertengahan" | "Modern";
  year: string;
  coverColor: string;
  shortSummary: string;
  detailedContent: string;
}

const BASE_LANGUAGES_CURRICULUM: LanguageCurriculum[] = [
  {
    code: "en",
    name: "Inggris",
    flag: "🇬🇧",
    units: [
      {
        id: "en-u1",
        title: "Perkenalan & Sapaan Dasar (Greetings)",
        miniTitle: "Sapaan",
        level: "Pemula",
        shortDesc: "Belajar menyapa orang, menanyakan kabar, dan memperkenalkan nama sendiri dalam Bahasa Inggris.",
        content: `### Greetings & Introduction

Dalam Bahasa Inggris, kesopanan dimulai dengan sapaan yang tepat. Berikut adalah panduan singkat tentang sapaan dasar:

#### Sapaan Formal & Informal
- **Formal**: "Hello", "Good morning" (Pagi), "Good afternoon" (Siang-Sore), "Good evening" (Malam).
- **Informal**: "Hi", "Hey", "What's up?" (Ada apa?/Apa kabar?).

#### Cara Bertanya Kabar
- "How are you?" (Bagaimana kabarmu?)
- "How is it going?" (Bagaimana jalannya?)
- Respon: "I am doing well, thank you." (Saya baik-baik saja, terima kasih) atau "Pretty good!" (Sangat baik!).

#### Memperkenalkan Diri
- "My name is Suki." (Nama saya Suki.)
- "Nice to meet you!" (Senang bertemu denganmu!)`,
        examplePhrase: "Hello my name is Suki nice to meet you",
        examplePhraseTranslation: "Halo nama saya Suki, senang bertemu denganmu",
        quiz: {
          question: "Manakah ekspresi memperkenalkan diri yang paling tepat ketika pertama kali bertemu seseorang?",
          options: [
            "Nice to meet you, my name is Suki.",
            "Goodbye, see you tomorrow.",
            "I am order a hot tea.",
            "Excuse me, where is the station?"
          ],
          answerIndex: 0,
          explanation: "'Nice to meet you, my name is Suki' adalah kalimat perkenalan diri yang sopan dan ramah untuk mengawali hubungan."
        }
      },
      {
        id: "en-u2",
        title: "Percakapan Sehari-Hari & Kehidupan Sosial",
        miniTitle: "Sosial",
        level: "Pemula",
        shortDesc: "Mempelajari frasa-frasa utama untuk menanyakan arah, mengucapkan terima kasih, dan meminta bantuan.",
        content: `### Everyday Conversations

Setelah bisa menyapa, unit ini akan membimbingmu berinteraksi dalam lingkungan sosial umum seperti di jalan atau tempat publik.

#### Frasa Penting Sopan Santun
- **Excuse me**: Permisi (untuk menarik perhatian atau lewat).
- **Please**: Mohon / Tolong (disisipkan di setiap permintaan).
- **Thank you very much**: Terima kasih banyak.
- **You're welcome**: Sama-sama.

#### Menanyakan Tempat / Arah
- "Excuse me, where is the nearest train station?" (Permisi, di mana stasiun kereta terdekat?)
- "Can you help me, please?" (Bisakah Anda membantu saya?)`,
        examplePhrase: "Excuse me where is the nearest train station",
        examplePhraseTranslation: "Permisi, di mana stasiun kereta api terdekat?",
        quiz: {
          question: "Bagaimana cara menanyakan arah stasiun kereta dengan sopan?",
          options: [
            "Where station now?",
            "Excuse me, where is the nearest train station?",
            "Give me station directions!",
            "I want train check."
          ],
          answerIndex: 1,
          explanation: "Menambahkan 'Excuse me' di awal membuat pertanyaan 'where is the nearest train station' terdengar jauh lebih sopan."
        }
      },
      {
        id: "en-u3",
        title: "Pemesanan Makanan di Restoran (Dining Out)",
        miniTitle: "Kuliner",
        level: "Menengah",
        shortDesc: "Bagaimana cara melakukan pesanan makanan dan minuman, serta meminta tagihan kasir.",
        content: `### Food & Dining Out

Berwisata kuliner memerlukan keberanian untuk memesan langsung pada pelayan. Berikut kuncinya:

#### Melakukan Pemesanan
- "Could I have the menu, please?" (Boleh saya lihat menunya?)
- "I would like to order a cup of coffee and a chocolate cake." (Saya ingin memesan secangkir kopi dan kue cokelat.)
- "Is this dish spicy?" (Apakah hidangan ini pedas?)

#### Meminta Tagihan
- "Could we have the bill, please?" (Boleh kami minta tagihannya?)`,
        examplePhrase: "I would like to order a cup of hot coffee",
        examplePhraseTranslation: "Saya ingin memesan secangkir kopi hangat",
        quiz: {
          question: "Kalimat mana yang digunakan untuk memesan kopi secara sopan?",
          options: [
            "I want coffee now.",
            "I would like to order a cup of hot coffee.",
            "Hey servant bring me coffee.",
            "Is there any liquid sugar?"
          ],
          answerIndex: 1,
          explanation: "Pola 'I would like to order...' adalah standar memesan makanan atau minuman secara sopan (polite request) di lingkungan internasional."
        }
      },
      {
        id: "en-u4",
        title: "Karir & Dunia Profesional (Workplace English)",
        miniTitle: "Bisnis",
        level: "Menengah",
        shortDesc: "Frasa bisnis untuk mengadakan rapat, merundingkan proyek, dan surat-surat formal kantor.",
        content: `### Workplace & Professional English

Gunakan bahasa Inggris formal untuk meningkatkan karirmu secara global.

#### Alur Rapat (Meetings)
- "Let's schedule a meeting to discuss our project milestones." (Mari jadwalkan rapat untuk membicarakan pencapaian proyek.)
- "I would like to share my thoughts on this strategy." (Saya ingin membagikan pemikiran saya tentang strategi ini.)
- "We need to meet the deadline." (Kita harus memenuhi tenggat waktu.)`,
        examplePhrase: "Let us schedule a meeting to discuss the project",
        examplePhraseTranslation: "Mari kita jadwalkan rapat untuk mendiskusikan proyek ini",
        quiz: {
          question: "Apa arti dari frasa 'meet the deadline' di dunia kerja?",
          options: [
            "Menghidupkan komputer tepat waktu",
            "Saling bertemu dengan kepala divisi di koridor",
            "Menyelesaikan pekerjaan sebelum atau tepat pada batas waktu yang ditentukan",
            "Membatalkan seluruh rencana proyek kerja"
          ],
          answerIndex: 2,
          explanation: "'Meet the deadline' berarti berhasil menyelesaikan tugas sesuai waktu yang dijanjikan agar proyek tidak telat."
        }
      },
      {
        id: "en-u5",
        title: "Perdebatan Opini & Analisis Kritis",
        miniTitle: "Opini",
        level: "Master",
        shortDesc: "Berdebat secara akademis, mengutarakan sudut pandang ilmiah, dan menyanggah asumsi dengan sopan.",
        content: `### Academic & Critical Expression

Tingkat master menuntutmu mampu menjelaskan argumen abstrak berbobot.

#### Menyatakan Sudut Pandang
- "In my perspective, technology is constantly evolving and shaping human cognition." (Dalam sudut pandang saya, teknologi terus berevolusi dan membentuk kognisi manusia.)
- "From an economic standpoint..." (Dari sudut pandang ekonomi...)

#### Menyanggah dengan Sopan (Disagreement)
- "I respect your opinion, however, I believe there is another factor to consider." (Saya menghargai pendapatmu, namun saya yakin ada faktor lain yang perlu dipertimbangkan.)`,
        examplePhrase: "In my perspective technology is constantly evolving",
        examplePhraseTranslation: "Dalam pandangan saya, teknologi terus-menerus berevolusi",
        quiz: {
          question: "Frasa mana yang paling tepat untuk mengawali penyangkalan argumen secara anggun di debat akademik?",
          options: [
            "Your argument is completely wrong and bad.",
            "I respect your opinion, however, I believe there is another factor to consider.",
            "Shut up, let me talk first.",
            "I agree with everything you said."
          ],
          answerIndex: 1,
          explanation: "Ungkapan 'I respect your opinion, however...' menyanggah argumen lawan bicara tanpa menyerang integritas mereka."
        }
      },
      {
        id: "en-u6",
        title: "Idiom Tradisional & Nuansa Budaya",
        miniTitle: "Master",
        level: "Master",
        shortDesc: "Pelajari kiasan-kiasan populer seperti 'piece of cake' dan cara membaur dengan penutur asli.",
        content: `### Idioms & Cultural Nuances

Idiom membuat percakapanmu terdengar sangat alami seperti 'native speaker'.

#### Contoh Idiom Terkenal
- **A piece of cake**: Sangat mudah.
- **Break a leg**: Semoga sukses (biasanya untuk penampil seni pertunjukan).
- **Once in a blue moon**: Sangat jarang terjadi.
- **Under the weather**: Sedang merasa tidak enak badan / sakit ringan.

#### Penggunaan Kontekstual
- "Don't worry about the entrance exam, it’s a piece of cake!" (Jangan khawatir tentang ujian masuk, itu sangat mudah!)`,
        examplePhrase: "Do not worry the English test is a piece of cake",
        examplePhraseTranslation: "Jangan khawatir, ujian Bahasa Inggris itu sangatlah gampang",
        quiz: {
          question: "Jika temanmu berkata 'I am feeling under the weather,' apa yang sebaiknya kamu katakan?",
          options: [
            "Excellent! Keep up the good work.",
            "Get well soon! Take some rest.",
            "Where is the weather station located?",
            "Can you umbrella me please?"
          ],
          answerIndex: 1,
          explanation: "'Under the weather' berarti sakit atau kurang fit, sehingga respon terbaik adalah mendoakan kesembuhannya: 'Get well soon!'"
        }
      }
    ]
  },
  {
    code: "de",
    name: "Jerman",
    flag: "🇩🇪",
    units: [
      {
        id: "de-u1",
        title: "Perkenalan Diri (Begrüßung und Vorstellung)",
        miniTitle: "Sapaan",
        level: "Pemula",
        shortDesc: "Bagaimana menyapa seseorang secara resmi dan santai, serta memperkenalkan diri Anda.",
        content: `### Begrüßung & Vorstellung

Mulai petualangan Jerman Anda!

#### Sapaan
- **Hallo**: Halo (umum).
- **Guten Morgen**: Selamat pagi.
- **Guten Tag**: Selamat siang/sore.
- **Guten Abend**: Selamat malam.

#### Perkenalan
- "Ich heiße Suki." (Nama saya Suki.)
- "Freut mich, Sie kennenzulernen!" (Senang bertemu dengan Anda!)`,
        examplePhrase: "Guten Tag ich heisse Suki freut mich",
        examplePhraseTranslation: "Selamat siang nama saya Suki, senang bertemu denganmu",
        quiz: {
          question: "Bagaimana cara memperkenalkan nama di Jerman secara formal?",
          options: [
            "Ich heiße...",
            "Auf Wiedersehen...",
            "Deutschland ist groß...",
            "Bitte schön..."
          ],
          answerIndex: 0,
          explanation: "'Ich heiße...' memiliki arti 'Nama saya adalah...', dan merupakan kalimat standar mengenalkan identitas diri."
        }
      },
      {
        id: "de-u2",
        title: "Kehidupan Sehari-hari (Alltagsleben)",
        miniTitle: "Sosial",
        level: "Pemula",
        shortDesc: "Membeli tiket, menanyakan waktu, dan meminta informasi penting di jalan kota.",
        content: `### Alltagsgespräche in Deutschland

#### Menanyakan Tempat
- "Entschuldigung, wo ist der Bahnhof?" (Permisi, di mana stasiun kereta?)
- "Wie viel kostet dieses Ticket?" (Berapa harga tiket ini?)

#### Sopan Santun
- **Bitte**: Tolong / Silakan / Sama-sama.
- **Danke sehr**: Terima kasih banyak.`,
        examplePhrase: "Entschuldigung wo ist der Bahnhof",
        examplePhraseTranslation: "Permisi, di mana stasiun kereta apinya?",
        quiz: {
          question: "Bahasa Jerman dari 'stasiun kereta api' adalah...",
          options: [
            "Flughafen",
            "Bahnhof",
            "Krankenhaus",
            "Supermarkt"
          ],
          answerIndex: 1,
          explanation: "Bahnhof adalah stasiun kereta api. Bandara adalah Flughafen, Rumah sakit adalah Krankenhaus."
        }
      },
      {
        id: "de-u3",
        title: "Kuliner & Restoran (Essen & Trinken)",
        miniTitle: "Kuliner",
        level: "Menengah",
        shortDesc: "Kuasai seni memesan makanan khas Jerman seperti Schnitzel, Bretzel, dan kopi hangat.",
        content: `### Essen & Trinken bestellen

#### Di Restoran (Im Restaurant)
- "Ich möchte eine Tasse Kaffee bestellen." (Saya ingin memesan secangkir kopi.)
- "Die Rechnung, bitte!" (Minta bil tagihan pembayarannya, tolong!)
- "Guten Appetit!": Selamat makan!`,
        examplePhrase: "Ich moechte eine Tasse Kaffee bestellen",
        examplePhraseTranslation: "Saya ingin memesan secangkir kopi",
        quiz: {
          question: "Bagaimana cara meminta nota/rekening pembayaran saat selesai makan di Jerman?",
          options: [
            "Die Rechnung bitte",
            "Guten Morgen Herr",
            "Das Essen ist salzig",
            "Wo ist das Salz?"
          ],
          answerIndex: 0,
          explanation: "'Die Rechnung, bitte!' adalah cara terstandar dan sopan meminta pelayan membawakan tagihan meja makan."
        }
      },
      {
        id: "de-u4",
        title: "Bahasa Kerja (Beruf und Karriere)",
        miniTitle: "Bisnis",
        level: "Menengah",
        shortDesc: "Membahas proyek, menulis email bisnis formal, dan menegosiasikan kontrak kesepakatan.",
        content: `### Beruf & Geschäftswelt

Jerman merupakan raksasa ekonomi Eropa, menguasai komunikasi kantor akan sangat menguntungkan.

#### Rapat Bisnis
- "Lassen Sie uns ein Treffen vereinbaren." (Mari kita buat janji temu / rapat.)
- "Das Budget für dieses Projekt ist begrenzt." (Anggaran proyek ini terbatas.)`,
        examplePhrase: "Lassen Sie uns ein Treffen vereinbaren",
        examplePhraseTranslation: "Mari kita buat janji temu / rapat kerja",
        quiz: {
          question: "Apa arti dari 'Treffen' dalam konteks profesional?",
          options: [
            "Gaji bulanan",
            "Pertemuan / Rapat",
            "Tembok pembatas",
            "Liburan bersama"
          ],
          answerIndex: 1,
          explanation: "Ein Treffen adalah sebuah pertemuan atau rapat."
        }
      },
      {
        id: "de-u5",
        title: "Filsafat & Diskusi Akademis Jerman",
        miniTitle: "Opini",
        level: "Master",
        shortDesc: "Membahas konsep pemikiran filosofis Kant hingga Nietzsche, mengekspresikan opini kompleks.",
        content: `### Akademische Diskussion

Jerman adalah 'Land der Dichter und Denker' (Negeri Penyair dan Pemikir). Di tingkat ini kamu belajar argumen teoretis.

#### Kosakata Kompleks
- **Meiner Ansicht nach**: Menurut pandangan saya...
- **Das Phänomen**: Fenomena.
- **Ich stimme Ihnen zu, aber...**: Saya setuju dengan Anda, namun...`,
        examplePhrase: "Meiner Ansicht nach ist das sehr wichtig",
        examplePhraseTranslation: "Menurut pandangan saya, hal itu sangatlah penting",
        quiz: {
          question: "Bagaimana memulai menyatakan pendapat subjektif teoretis secara halus dalam diskusi Jerman?",
          options: [
            "Du bist dumm...",
            "Meiner Ansicht nach...",
            "Es gibt kein Wasser...",
            "Ich will schlafen..."
          ],
          answerIndex: 1,
          explanation: "'Meiner Ansicht nach...' (Menurut pendapat/perspektif saya) mengawali argumen opini dengan objektif."
        }
      },
      {
        id: "de-u6",
        title: "Sastra & Redewendungen (Gaya Bahasa)",
        miniTitle: "Master",
        level: "Master",
        shortDesc: "Menyelami sosiolinguistik, metafora, dan puisi klasik Jerman dari Johann Wolfgang von Goethe.",
        content: `### Sastra & Idiom Jerman

#### Redewendungen (Kiasan)
- **Tomaten auf den Augen haben**: Tidak menyadari apa yang terjadi di depan mata (harfiah: memiliki tomat di mata).
- **Das ist ein Kinderspiel**: Sangat mudah (harfiah: permainan anak kecil).`,
        examplePhrase: "Das ist ein Kinderspiel fuer uns alle",
        examplePhraseTranslation: "Itu adalah perkara yang sangat gampang (permainan anak-anak) bagi kita semua",
        quiz: {
          question: "Apa kiasan Jerman yang sepadan dengan 'piece of cake' (sangat mudah) di Bahasa Inggris?",
          options: [
            "Kinderspiel",
            "Tomaten auf den Augen",
            "Kartoffelsalat",
            "Unter dem Wetter"
          ],
          answerIndex: 0,
          explanation: "'Kinderspiel' (permainan anak kecil) merupakan idiom Jerman untuk menggambarkan tugas yang terlampau mudah dikerjakan."
        }
      }
    ]
  },
  {
    code: "es",
    name: "Spanyol",
    flag: "🇪🇸",
    units: [
      {
        id: "es-u1",
        title: "Perkenalan & Sapaan Dasar (Saludos y Presentación)",
        miniTitle: "Sapaan",
        level: "Pemula",
        shortDesc: "Pelajari cara menyapa 'Hola', menanyakan kabar, dan menyebutkan nama Anda dalam Bahasa Spanyol.",
        content: `### Saludos y Presentación

Selamat datang di dunia ramah bahasa Spanyol!

#### Saludos Dasar
- **Hola**: Halo.
- **Buenos días**: Selamat pagi.
- **Buenas tardes**: Selamat siang/sore.
- **Buenas noches**: Selamat malam.

#### Introducción diri
- "Me llamo Suki." (Nama saya Suki.)
- "Mucho gusto." (Senang bertemu denganmu.)`,
        examplePhrase: "Hola buenos dias me llamo Suki mucho gusto",
        examplePhraseTranslation: "Halo, selamat pagi, nama saya Suki, senang bertemu denganmu",
        quiz: {
          question: "Apa arti dari ungkapan Spanyol 'Mucho gusto'?",
          options: [
            "Terima kasih banyak atas makanannya",
            "Senang bertemu denganmu",
            "Sampai jumpa minggu depan",
            "Tolong bawakan air minum"
          ],
          answerIndex: 1,
          explanation: "'Mucho gusto' diucapkan setelah bertukar nama, mengisyaratkan kesenangan bersosialisasi."
        }
      },
      {
        id: "es-u2",
        title: "Perjalanan & Bertanya Arah (El Viaje)",
        miniTitle: "Sosial",
        level: "Pemula",
        shortDesc: "Bagaimana cara menanyakan arah jalan kaki, stasiun kereta, dan museum dalam Bahasa Spanyol.",
        content: `### Viajar y Preguntar Direcciones

#### Preguntar (Bertanya)
- "¿Dónde está la estación de tren?" (Di mana stasiun kereta?)
- "¿Cuánto cuesta el billete?" (Berapa harga tiketnya?)

#### Palabras de cortesía (Sopansantun)
- **Por favor**: Tolong / Mohon.
- **Gracias**: Terima kasih.` ,
        examplePhrase: "Disculpe donde esta la estacion de tren",
        examplePhraseTranslation: "Permisi, di mana stasiun kereta apinya?",
        quiz: {
          question: "Bagaimana menanyakan 'Di mana stasiun kereta' di Spanyol?",
          options: [
            "¿Dónde está la estación de tren?",
            "¿Qué hora es ahora?",
            "Quiero comprar una manzana.",
            "Hola, buenas noches."
          ],
          answerIndex: 0,
          explanation: "'¿Dónde está la estación de tren?' menerangkan pertanyaan lokasi stasiun kereta secara tepat."
        }
      },
      {
        id: "es-u3",
        title: "Kuliner & Restoran (La Gastronomía)",
        miniTitle: "Kuliner",
        level: "Menengah",
        shortDesc: "Memesan menu tapas, paella, churros, serta berinteraksi aktif dengan pelayan restoran.",
        content: `### Comer en Restaurantes

#### Pedir (Memesan)
- "Me gustaría pedir una taza de café, por favor." (Saya ingin memesan secangkir kopi hangat, mohon.)
- "¿Me trae la cuenta, por favor?" (Bisa bawakan tagihannya untuk saya?)
- "¡Buen provecho!": Selamat makan!`,
        examplePhrase: "Me gustaria pedir una taza de cafe por favor",
        examplePhraseTranslation: "Saya ingin memesan secangkir kopi hangat, tolong.",
        quiz: {
          question: "Apa sebutan ikonik tagihan pembayaran dalam bahasa meja restoran Spanyol?",
          options: [
            "La cuenta",
            "El dinero",
            "La comida",
            "El vaso"
          ],
          answerIndex: 0,
          explanation: "'La cuenta' secara harfiah adalah akun atau tagihan (the bill) di restoran."
        }
      },
      {
        id: "es-u4",
        title: "Bisnis & Karir (Español de Negocios)",
        miniTitle: "Bisnis",
        level: "Menengah",
        shortDesc: "Kuasai perdagangan global, korespondensi profesional, dan teknik rapat formal Amerika Latin.",
        content: `### Negocios y Oficina

#### Frasa Kantor
- "Programemos una reunión de negocios." (Mari jadwalkan pertemuan bisnis.)
- "El contrato ha sido firmado." (Kontraknya telah ditandatangani.)`,
        examplePhrase: "Programemos una reunion para discutir el proyecto",
        examplePhraseTranslation: "Mari jadwalkan rapat untuk membicarakan proyek ini",
        quiz: {
          question: "Apa padanan kata 'reunión' dalam ranah kantor?",
          options: [
            "Dokumen tertulis",
            "Rapat / Pertemuan",
            "Kantor utama",
            "Tunjangan gaji"
          ],
          answerIndex: 1,
          explanation: "Una reunión adalah pertemuan atau rapat."
        }
      },
      {
        id: "es-u5",
        title: "Analisis & Opini Sastra Spanyol",
        miniTitle: "Opini",
        level: "Master",
        shortDesc: "Diskusi politik, filosofi, sastra magis realisme Gabriel García Márquez di tingkat tinggi.",
        content: `### Expresiones de Opinión Avanzada

#### Expresar (Menyatakan)
- "En mi opinión, es crucial fomentar la educación." (Menurut opini saya, penting untuk membina pendidikan.)
- "Desde mi punto de vista..." (Dari sudut pandang saya...)`,
        examplePhrase: "En mi opinion la educacion es muy importante",
        examplePhraseTranslation: "Menurut opini saya, pendidikan sangatlah krusial",
        quiz: {
          question: "Bagaimana cara menyatakan 'Menurut opini saya' dalam bahasa Spanyol yang elegan?",
          options: [
            "Yo quiero Taco Bell",
            "En mi opinión...",
            "No comprendo nada",
            "Buenos días señor"
          ],
          answerIndex: 1,
          explanation: "'En mi opinión...' memposisikan pemikiran kita sebagai pembuka argumen."
        }
      },
      {
        id: "es-u6",
        title: "Kedaulatan Budaya & Modul Idiom",
        miniTitle: "Master",
        level: "Master",
        shortDesc: "Kiasan kebahasaan Spanyol yang unik demi membangun kefasihan sejati seperti warga lokal.",
        content: `### Expresiones Idiomáticas

#### Modismos (Idiom)
- **Pan comido**: Sangat gampang (harfiah: roti termakan).
- **Estar en las nubes**: Melamun (harfiah: berada di awan).`,
        examplePhrase: "Este examen de espanol es pan comido",
        examplePhraseTranslation: "Ujian Bahasa Spanyol ini sangatlah mudah gampang sekali",
        quiz: {
          question: "Idiom Spanyol 'Pan comido' memiliki makna kiasan...",
          options: [
            "Memanggang roti tawar",
            "Tugas yang teramat mudah dikerjakan",
            "Roti sudah kedaluwarsa",
            "Lapar yang tidak tertahankan"
          ],
          answerIndex: 1,
          explanation: "'Pan comido' bermakna sesuatu yang gampang sekali dicapai, sepadan dengan 'piece of cake'."
        }
      }
    ]
  },
  {
    code: "fr",
    name: "Prancis",
    flag: "🇫🇷",
    units: [
      {
        id: "fr-u1",
        title: "Sapaan & Perkenalan Diri (Salutations)",
        miniTitle: "Sapaan",
        level: "Pemula",
        shortDesc: "Pelajari pesona 'Bonjour', 'Je m'appelle Suki', dan cara menunjukkan sopan santun Prancis.",
        content: `### Salutations & Présentation

Bahasa Prancis sangat mementingkan etika kesopanan sapaan awal.

#### Salutations
- **Bonjour**: Halo / Selamat pagi/siang.
- **Bonsoir**: Selamat malam.
- **Salut**: Hai (informal).

#### Présentation
- "Je m'appelle Suki." (Nama saya Suki.)
- "Enchanté de vous rencontrer!" (Senang bertemu dengan Anda!)`,
        examplePhrase: "Bonjour je m'appelle Suki enchante",
        examplePhraseTranslation: "Halo, nama saya Suki, sangat senang bertemu dengan Anda",
        quiz: {
          question: "Kalimat perkenalan 'Je m'appelle Suki' mempunyai arti...",
          options: [
            "Saya tinggal di Paris.",
            "Nama saya adalah Suki.",
            "Umur saya sepuluh tahun.",
            "Saya suka sekali jus cokelat."
          ],
          answerIndex: 1,
          explanation: "'Je m'appelle...' secara harfiah artinya 'Saya menyebut diri saya...' atau 'Nama saya adalah...'."
        }
      },
      {
        id: "fr-u2",
        title: "Navigasi Kota & Transportasi (Voyage & Transports)",
        miniTitle: "Sosial",
        level: "Pemula",
        shortDesc: "Bagaimana cara membeli karcis kereta bawah tanah (Metro) dan menanyakan arah Menara Eiffel.",
        content: `### Voyager à Paris

#### Demander (Bertanya)
- "Excusez-moi, où est la station de métro la plus proche ?" (Permisi, di mana stasiun metro terdekat?)
- "Un billet pour Paris, s'il vous plaît." (Satu tiket ke Paris, please.)`,
        examplePhrase: "Excusez-moi ou est la station de metro",
        examplePhraseTranslation: "Permisi, di mana letak stasiun metronya?",
        quiz: {
          question: "Apa arti ekspresi kesopanan 's'il vous plaît'?",
          options: [
            "Terima kasih kembali",
            "Mohon / Silakan (Please)",
            "Selamat jalan jauh",
            "Berapa harganya"
          ],
          answerIndex: 1,
          explanation: "'s'il vous plaît' adalah frasa formal wajib saat meminta sesuatu kepada siapapun."
        }
      },
      {
        id: "fr-u3",
        title: "Seni Kuliner Bistro (Au Restaurant)",
        miniTitle: "Kuliner",
        level: "Menengah",
        shortDesc: "Memesan croissant, quiche, steak frites, hingga meminta nota pembayaran kafe Paris.",
        content: `### Commander au Bistro Café

#### Di Restoran
- "Je voudrais commander un café au lait et un croissant, s'il vous plaît." (Saya ingin memesan kopi susu dan croissant, tolong.)
- "L'addition, s'il vous plaît !" (Minta bil tagihan kasirnya, please!)`,
        examplePhrase: "Je voudrais commander un cafe au lait",
        examplePhraseTranslation: "Saya ingin memesan secangkir kopi susu",
        quiz: {
          question: "Bagaimana meminta pelayan kafe membawakan bill pembayaran di Prancis?",
          options: [
            "L'addition, s'il vous plaît",
            "Bonjour monsieur",
            "Où sont les toilettes",
            "Je t'aime beaucoup"
          ],
          answerIndex: 0,
          explanation: "'L'addition' adalah istilah resmi Prancis untuk tagihan makan minum di restoran."
        }
      },
      {
        id: "fr-u4",
        title: "Komunikasi Bisnis Paris (Le Français des Affaires)",
        miniTitle: "Bisnis",
        level: "Menengah",
        shortDesc: "Frasa bisnis formal untuk berkirim email profesional dan berdiplomasi dengan korporat Eropa.",
        content: `### Affaires & Négociations

#### Frasa Bisnis
- "Planifions une réunion pour discuter de ce projet." (Mari kita rencanakan rapat untuk membahas proyek ini.)
- "Le taux de croissance économique..." (Tingkat pertumbuhan ekonomi...)`,
        examplePhrase: "Planifions une reunion pour discuter du projet",
        examplePhraseTranslation: "Mari jadwalkan rapat kerja untuk merundingkan proyek ini",
        quiz: {
          question: "Kata bahasa Prancis untuk rapat kerja di kantor adalah...",
          options: [
            "La salade",
            "La réunion",
            "La voiture",
            "La bouteille"
          ],
          answerIndex: 1,
          explanation: "'La réunion' merujuk pada rapat, bersua mengoreksi jalannya proyek kerja."
        }
      },
      {
        id: "fr-u5",
        title: "Filsafat & Sastra Eksistensialisme",
        miniTitle: "Opini",
        level: "Master",
        shortDesc: "Analisis fiksi klasik Jean-Paul Sartre, Albert Camus, mengutarakan pemikiran teoretis abstrak.",
        content: `### Débat & Philosophie

#### Exprimer (Opini)
- "À mon avis, l'art reflète l'âme de la société." (Menurut pandangan saya, seni merefleksikan jiwa masyarakat.)
- "D'un autre côté..." (Di sisi lain...)`,
        examplePhrase: "A mon avis l'art est le reflet de la societe",
        examplePhraseTranslation: "Menurut pandangan saya, seni adalah cerminan dari masyarakat",
        quiz: {
          question: "Bagaimana cara yang paling anggun untuk membuka opini teologis menurut pendapat sendiri?",
          options: [
            "Je déteste ça",
            "À mon avis...",
            "Au revoir madame",
            "C'est trop cher"
          ],
          answerIndex: 1,
          explanation: "'À mon avis...' (Menurut pendapat saya...) adalah pembuka opini standar di debat-debat formal Prancis."
        }
      },
      {
        id: "fr-u6",
        title: "Metodologi Idiomatis & Gaya Naratif",
        miniTitle: "Master",
        level: "Master",
        shortDesc: "Peribahasa tingkat lanjut untuk memperoleh akurasi pengucapan sempurna mirip penutur asli Prancis.",
        content: `### Idiotismes Gastronomiques & Culturels

#### Idiom
- **C'est simple comme bonjour**: Sangat mudah (harfiah: semudah mengucapkan halo).
- **Avoir le coup de foudre**: Jatuh cinta pada pandangan pertama (harfiah: tersambar kilat).`,
        examplePhrase: "Ce projet est simple comme bonjour pour nous",
        examplePhraseTranslation: "Proyek kerja ini sangat lah gampang sekali bagi kita",
        quiz: {
          question: "Apa kiasan Prancis yang sepadan dengan tugas yang amat mudah laksana 'piece of cake'?",
          options: [
            "Simple comme bonjour",
            "Avoir le coup de foudre",
            "Manger du pain",
            "La Tour Eiffel"
          ],
          answerIndex: 0,
          explanation: "'Simple comme bonjour' berarti semudah membalik telapak tangan karena kita mengucapkan bonjour tiap hari."
        }
      }
    ]
  },
  {
    code: "tr",
    name: "Turki",
    flag: "🇹🇷",
    units: [
      {
        id: "tr-u1",
        title: "Sapaan Dasar & Selamat Datang (Tanışma ve Selamlaşma)",
        miniTitle: "Sapaan",
        level: "Pemula",
        shortDesc: "Belajar menyapa 'Merhaba', memperkenalkan nama, dan mengucapkan 'Teşekkür ederim'.",
        content: `### Selamlaşma & Giriş

Turki terkenal dengan keramahan budaya yang hangat. Mari menyapa mereka dengan ramah!

#### Sapaan
- **Merhaba**: Halo.
- **Günaydın**: Selamat pagi.
- **İyi günler**: Semoga harimu menyenangkan.
- **Hoş geldiniz**: Selamat datang.

#### Tanışma (Perkenalan)
- "Benim adım Suki." (Nama saya Suki.)
- "Memnun oldum!" (Senang bertemu denganmu!)`,
        examplePhrase: "Merhaba benim adim Suki memnun oldum",
        examplePhraseTranslation: "Halo nama saya Suki, senang bertemu denganmu",
        quiz: {
          question: "Bagaimana Anda membalas perkenalan rekan baru di Istanbul?",
          options: [
            "Memnun oldum",
            "Güle güle",
            "Hesap lütfen",
            "Çok pahalı"
          ],
          answerIndex: 0,
          explanation: "'Memnun oldum' adalah respon balas tulus yang menandakan 'Saya sangat senang bertemu Anda'."
        }
      },
      {
        id: "tr-u2",
        title: "Perjalanan di Istanbul & Kehidupan Kota",
        miniTitle: "Sosial",
        level: "Pemula",
        shortDesc: "Mencari jalan ke Masjid Biru (Blue Mosque), menyeberangi Bosforus, menanyakan harga barang.",
        content: `### Seyahat ve Şehir Hayatı

#### Yol Tarifi (Arah)
- "Affedersiniz, en yakın metro istasyonu nerede?" (Permisi, di mana stasiun metro terdekat?)
- "Bu ne kadar?" (Ini berapa harganya?)

#### Kibarlık (Sopan Santun)
- **Lütfen**: Silakan / Tolong.
- **Teşekkür ederim**: Terima kasih banyak.`,
        examplePhrase: "Affedersiniz en yakin istasyon nerede",
        examplePhraseTranslation: "Permisi, di mana stasiun terdekatnya berada?",
        quiz: {
          question: "Apa kosa kata Turki untuk 'terima kasih banyak'?",
          options: [
            "Teşekkür ederim",
            "Günaydın",
            "Nerede",
            "Güle güle"
          ],
          answerIndex: 0,
          explanation: "'Teşekkür ederim' diucapkan tulus sebagai apresiasi terima kasih yang formal."
        }
      },
      {
        id: "tr-u3",
        title: "Memesan Kuliner (Kebab & Baklava)",
        miniTitle: "Kuliner",
        level: "Menengah",
        shortDesc: "Teknik memesan kuliner teh Turki, Kebab, Baklava di restoran khas tepian pantai.",
        content: `### Restoranda Yemek Siparişi

#### Sipariş (Pesanan)
- "Bir bardak Türk çayı sipariş etmek istiyorum." (Saya ingin memesan secangkir teh Turki.)
- "Hesap, lütfen!" (Minta bil tagihan kasirnya, please!)
- "Afiyet olsun!": Selamat menikmati hidangan makanmu!`,
        examplePhrase: "Bir bardak Turk cayi siparis etmek istiyorum",
        examplePhraseTranslation: "Saya hendak memesan secangkir teh murni Turki",
        quiz: {
          question: "Bagaimana meminta bill tagihan akhir di kafe Grand Bazaar?",
          options: [
            "Hesap lütfen",
            "Merhaba kardeş",
            "Su nerede",
            "Kebab çok güzel"
          ],
          answerIndex: 0,
          explanation: "'Hesap lütfen' (Tagihan, tolong) dipakai mengakhiri santapan di restoran Turki."
        }
      },
      {
        id: "tr-u4",
        title: "Kemitraan Komersial (İş Dünyası)",
        miniTitle: "Bisnis",
        level: "Menengah",
        shortDesc: "Bagaimana melakukan komunikasi bisnis profesional di pasar tekstil, maritim, dan pariwisata Turki.",
        content: `### İş ve Ticaret dili

#### İş terimleri (Istilah Kantor)
- "Bu projeyi görüşmek üzere bir toplantı planlayalım." (Mari jadwalkan rapat guna mendiskusikan rencana proyek ini.)
- "İş sözleşmesi..." (Kontrak kerja...)`,
        examplePhrase: "Projeyi gorusmek uzere bir toplanti planlayalim",
        examplePhraseTranslation: "Mari jadwalkan pertemuan rapat membicarakan proyek ini",
        quiz: {
          question: "Apa arti dari kosa kata 'toplantı' dalam administrasi kantor Turki?",
          options: [
            "Toko kain",
            "Pertemuan / Rapat",
            "Tunjangan pensiun",
            "Hari libur nasional"
          ],
          answerIndex: 1,
          explanation: "'Toplantı' merujuk pada rapat bersatunya direksi membahas pengembangan bisnis."
        }
      },
      {
        id: "tr-u5",
        title: "Retorika & Debat Bahasa Turki",
        miniTitle: "Opini",
        level: "Master",
        shortDesc: "Bahasa sastra tingkat tinggi untuk mengkritik isu sosio-ekonomi dan filsafat klasik Anatolia.",
        content: `### Düşünce ve Görüş Bildirme

#### Görüş (Opini)
- "Bana göre, eğitim bir toplumun temel taşıdır." (Menurut pendapat saya, pendidikan adalah batu pijakan utama suatu masyarakat.)
- "Öte yandan..." (Di sisi lain...)`,
        examplePhrase: "Bana gore egitim bir toplumun temel tasidir",
        examplePhraseTranslation: "Menurut pandangan saya, pendidikan adalah batu pijakan sebuah masyarakat",
        quiz: {
          question: "Bagaimana mengekspresikan opini pribadi seperti 'Bagi saya / Menurut saya'?",
          options: [
            "Bana göre...",
            "Günaydın...",
            "Kebab lütfen...",
            "Ben istemiyorum..."
          ],
          answerIndex: 0,
          explanation: "'Bana göre...' berarti 'Menurut pendapat saya/Bagi saya' untuk memulai argumen logis."
        }
      },
      {
        id: "tr-u6",
        title: "Idiom Khas Anatolia (Deyimler)",
        miniTitle: "Master",
        level: "Master",
        shortDesc: "Selami keindahan ungkapan mistis Sufi, metafora Turki, dan idiom puitis populer.",
        content: `### Türk Deyimleri (Peribahasa)

#### Deyimler (Idiom)
- **Çantada keklik**: Sangat mudah dicapai (harfiah: burung puyuh di dalam tas, sepadan dengan 'piece of cake').
- **Bal dök yala**: Sangat bersih mengilap (harfiah: tuangkan madu lalu jilat).`,
        examplePhrase: "Merak etme bu sınav cantada keklik",
        examplePhraseTranslation: "Jangan risau, ujian penyaringan ini sangat lah gampang diperoleh",
        quiz: {
          question: "Ungkapan Turki 'Çantada keklik' melambangkan...",
          options: [
            "Kehilangan barang penting di pasar",
            "Sesuatu kiasan yang dijamin sangat mudah diraih",
            "Lauk burung puyuh panggang",
            "Berburu satwa liar di hutan Anatolia"
          ],
          answerIndex: 1,
          explanation: "'Çantada keklik' melambangkan urusan yang gampang sekali dituntaskan (an easy win / piece of cake)."
        }
      }
    ]
  },
  {
    code: "id",
    name: "Indonesia",
    flag: "🇮🇩",
    units: [
      {
        id: "id-u1",
        title: "Sapaan Nusantara & Tata Krama Sopan",
        miniTitle: "Sapaan",
        level: "Pemula",
        shortDesc: "Kuasai kata halo, selamat pagi, cara berkenalan secara sopan di berbagai situasi sosial.",
        content: `### Tata Krama Perkenalan Bahasa Indonesia

Bahasa Indonesia terkenal dengan penuturnya yang santun dan menjunjung tinggi kekerabatan.

#### Sapaan Standar
- **Halo / Hai**: Merupakan sapaan umum hangat.
- **Selamat pagi / siang / sore / malam**: Bergantung waktu hari berjalan.

#### Berkenalan
- "Nama saya Suki."
- "Senang berkenalan dengan Anda!"`,
        examplePhrase: "Halo selamat pagi nama saya Suki senang bertemu Anda",
        examplePhraseTranslation: "Halo, selamat pagi, nama saya Suki, senang bertemu denganmu",
        quiz: {
          question: "Manakah kalimat perkenalan yang paling formal dalam Bahasa Indonesia?",
          options: [
            "Oi, kenalin gue Suki.",
            "Nama saya Suki, senang berkenalan dengan Anda.",
            "Suki di sini, ada apa?",
            "Siapakah namamu itu?"
          ],
          answerIndex: 1,
          explanation: "Menyebut 'Nama saya... senang berkenalan dengan Anda' adalah kombinasi aman formal dan penuh sopan santun."
        }
      },
      {
        id: "id-u2",
        title: "Navigasi Kota & Menanyakan Tempat",
        miniTitle: "Sosial",
        level: "Pemula",
        shortDesc: "Mencari stasiun MRT, rute halte Transjakarta, atau lokasi warung makan lokal.",
        content: `### Transportasi & Arah Publik

#### Bertanya Lokasi
- "Permisi, di manakah letak stasiun kereta terdekat?"
- "Berapakah ongkos tiket untuk naik commuter line?"

#### Ungkapan Kunci
- **Permisi**: Memulai percakapan dengan orang asing.
- **Terima kasih banyak**: Mengapresiasi pertolongan.`,
        examplePhrase: "Permisi di manakah letak stasiun kereta api terdekat",
        examplePhraseTranslation: "Permisi, di mana letak stasiun kereta api terdekat?",
        quiz: {
          question: "Kata sopan pertama yang harus diucapkan untuk menanyakan arah jalan kepada warga lokal yaitu...",
          options: [
            "Cepat tunjukkan jalan!",
            "Permisi",
            "Halo saya lapar sekali",
            "Berapa harga mobil ini"
          ],
          answerIndex: 1,
          explanation: "'Permisi' melambangkan etika merendah sebelum meminta pertolongan warga sekitar."
        }
      },
      {
        id: "id-u3",
        title: "Petualangan Kuliner Warung Makan",
        miniTitle: "Kuliner",
        level: "Menengah",
        shortDesc: "Seni memesan Nasi Goreng, Rendang, Sate, hingga meminta bill nota kasir.",
        content: `### Memesan Kuliner Indonesia

#### Di Warung / Restoran
- "Saya ingin memesan sepiring nasi goreng pedas dan segelas teh manis hangat."
- "Tolong bawa nota tagihan pembayarannya, ya."
- "Selamat menikmati hidangan!"`,
        examplePhrase: "Saya ingin memesan sepiring nasi goreng pedas",
        examplePhraseTranslation: "Saya ingin memesan sepiring nasi goreng pedas",
        quiz: {
          question: "Kalimat memesan kuliner yang santun di warung makan lokal yakni...",
          options: [
            "Woi ambilkan nasi goreng!",
            "Saya ingin memesan sepiring nasi goreng pedas, tolong.",
            "Berapa kilogram beras di dapur Anda?",
            "Saya tidak mau membayar tagihan makan."
          ],
          answerIndex: 1,
          explanation: "'Saya ingin memesan... tolong' menjaga komunikasi santun dengan juru masak warung."
        }
      },
      {
        id: "id-u4",
        title: "Komunikasi Kantor & Profesional",
        miniTitle: "Bisnis",
        level: "Menengah",
        shortDesc: "Bagaimana cara menyusun email bisnis, menjadwalkan rapat, dan berdiskusi kontrak kerja resmi.",
        content: `### Korespondensi & Bisnis Indonesia

#### Komunikasi Kantor
- "Mari kita jadwalkan rapat kerja untuk mengevaluasi milestones proyek ini."
- "Kontrak kerja sama bisnis telah disepakati kedua belah pihak."`,
        examplePhrase: "Mari kita jadwalkan rapat kerja untuk membahas proyek",
        examplePhraseTranslation: "Mari kita jadwalkan rapat kerja untuk membahas proyek ini",
        quiz: {
          question: "'Rapat kerja' mengacu pada aktivitas kantor berbentuk...",
          options: [
            "Liburan tamasya bersama ke pantai",
            "Pertemuan terencana jajaran staf membahas isu strategi korporat",
            "Kenaikan tunjangan jabatan karyawan",
            "Pembelian komputer baru divisi TI"
          ],
          answerIndex: 1,
          explanation: "Rapat kerja adalah wahana kolaboratif mengevaluasi kemajuan bisnis."
        }
      },
      {
        id: "id-u5",
        title: "Retorika Indonesia & Tajuk Rencana",
        miniTitle: "Opini",
        level: "Master",
        shortDesc: "Menganalisis artikel opini koran Kompas, memperdebatkan isu sosio-geografis nasional.",
        content: `### Penyusunan Opini & Debat Kritis

#### Menyusun Gagasan
- "Menurut pandangan saya, pelestarian lingkungan sejalan dengan pembangunan ekonomi inklusif."
- "Namun di sisi lain, tantangan infrastruktur perlu ditangani darurat."`,
        examplePhrase: "Menurut pandangan saya pembangunan ekonomi harus merata",
        examplePhraseTranslation: "Menurut pandangan saya pembangunan ekonomi harus merata",
        quiz: {
          question: "Pola pembuka argumentasi bernilai opini intelektual tinggi di Indonesia adalah...",
          options: [
            "Terserah kamu saja...",
            "Menurut pandangan saya...",
            "Sudahlah jangan didebat...",
            "Semua orang tahu itu salah..."
          ],
          answerIndex: 1,
          explanation: "'Menurut pandangan saya...' memprakarsai landasan argumen yang obyektif dan elegan."
        }
      },
      {
        id: "id-u6",
        title: "Peribahasa Klasik & Sosiolinguistik",
        miniTitle: "Sastra",
        level: "Master",
        shortDesc: "Menyelami khazanah peribahasa kuno seperti 'Ada udang di balik batu' dan 'Bagai pinang dibelah dua'.",
        content: `### Khazanah Sastra & Peribahasa Indonesia

#### Contoh Peribahasa Terkenal
- **Ada udang di balik batu**: Memiliki niat tersembunyi.
- **Sangat mudah (Gampang sekali)**: Diistilahkan kiasan populer seperti "Kecil", "Perkara sepele" atau "Enteng".`,
        examplePhrase: "Mengerjakan tugas sekolah ini perkara sepele bagi saya",
        examplePhraseTranslation: "Mengerjakan tugas sekolah ini perkara sepele bagi saya",
        quiz: {
          question: "Apa arti dari kiasan peribahasa 'Ada udang di balik batu'?",
          options: [
            "Memancing udang sungai",
            "Terdapat motif tersembunyi di balik suatu tindakan atau kebaikan",
            "Udang bersembunyi dari incaran predator",
            "Menikmati hidangan sate udang laut"
          ],
          answerIndex: 1,
          explanation: "'Ada udang di balik batu' merujuk perilaku tersirat bermotivasi rahasia."
        }
      }
    ]
  },
  {
    code: "jv",
    name: "Jawa",
    flag: "👑",
    units: [
      {
        id: "jv-u1",
        title: "Unggah-Ungguh Basa Jawa & Perkenalan",
        miniTitle: "Sapaan",
        level: "Pemula",
        shortDesc: "Belajar kosakata dasar krama inggil, nyapa sedulur, lan nepangaken asmanipun panjenengan.",
        content: `### Nepangaken lan Sugeng Rawuh

Bahasa Jawa menggunakan sistem bertingkat (Ngoko slept santai, Krama nduweni sopan santun).

#### Sapaan Krama
- **Sugeng enjang**: Selamat pagi.
- **Sugeng siang**: Selamat siang.
- **Matur nuwun**: Terima kasih.

#### Nepangaken (Perkenalan Krama)
- "Nami kula Suki." (Nama saya Suki.)
- "Sugeng pepanggihan kaliyan panjenengan." (Senang bertemu dengan Anda!)`,
        examplePhrase: "Sugeng enjang nami kula Suki matur nuwun",
        examplePhraseTranslation: "Selamat pagi nama saya Suki, terima kasih",
        quiz: {
          question: "Bagaimana cara mengucapkan 'terima kasih' secara sopan krama inggil di tanah Jawa?",
          options: [
            "Nuwun sewu",
            "Matur nuwun",
            "Ampun ngoten",
            "Monggo kerso"
          ],
          answerIndex: 1,
          explanation: "'Matur nuwun' adalah bentuk apresiasi berterima kasih luhur."
        }
      },
      {
        id: "jv-u2",
        title: "Tanya Arah Sing Krama Alus (Srawung Dusun)",
        miniTitle: "Sosial",
        level: "Pemula",
        shortDesc: "Nyuwun pirsa stasiun, terminal, utawi griya pak RT ngangge basa krama inggil.",
        content: `### Nyuwun Pirsa Margi (Tanya Arah)

Srawung dusun nuntut andhap asor.

#### Ungkapan Krama Alus
- "Nuwun sewu, wonten pundi dalemipun stasiun sepur badhe dumugi?" (Permisi, di mana arah stasiun kereta terdekat?)
- "Nuwun sewu": Permisi (sembari membungkuk santun).`,
        examplePhrase: "Nuwun sewu wonten pundi dalemipun stasiun sepur",
        examplePhraseTranslation: "Permisi, di manakah letak stasiun kereta aslinya?",
        quiz: {
          question: "Ungkapan andhap asor 'Nuwun sewu' memiliki guna mirip...",
          options: [
            "Excuse me (Permisi)",
            "I don't care (Bodo amat)",
            "Hurry up (Cepatlah)",
            "Very expensive (Mahal sekali)"
          ],
          answerIndex: 0,
          explanation: "'Nuwun sewu' diucapkan sebelum menyela atau meminta perhatian warga lokal secara andhap asor."
        }
      },
      {
        id: "jv-u3",
        title: "Nedha ing Warung & Krama Madya",
        miniTitle: "Kuliner",
        level: "Menengah",
        shortDesc: "Pesen sega goreng, wedang jahe, lan takon rega panganan ngangge basa krama.",
        content: `### Nedha ing Warung Makan

#### Pesen Panganan
- "Kula badhe pesen sekul goreng kaliyan wedang benter, mbak." (Saya mau pesan nasi goreng sama minuman hangat, mbak.)
- "Menika pinten reganipun?" (Ini berapa harganya?)`,
        examplePhrase: "Kula badhe pesen sekul goreng kaliyan wedang",
        examplePhraseTranslation: "Saya ingin memesan nasi goreng dengan minuman hangat",
        quiz: {
          question: "Sega goreng dalam basa krama inggil dadi...",
          options: [
            "Sekul goreng",
            "Roti panggang",
            "Soto ayam",
            "Gendis manis"
          ],
          answerIndex: 0,
          explanation: "Sekul adalah istilah halus krama dari sega (nasi)."
        }
      },
      {
        id: "jv-u4",
        title: "Tiyang Kantor & Tata Praja",
        miniTitle: "Bisnis",
        level: "Menengah",
        shortDesc: "Rembukan perkawis damelan, rapat ing balai desa, lan nulis layang dhumateng priyayi.",
        content: `### Rembukan Damelan Kantor

#### Krama Rapat
- "Monggo kita miwiti rapat menika kangge ngrembug proyek bebarengan." (Mari kita mulai rapat ini untuk mendiskusikan proyek bersama.)
- "Mugi-mugi proyek menika saged lumaku lancar."`,
        examplePhrase: "Monggo kita miwiti rapat menika kangge proyek",
        examplePhraseTranslation: "Mari kita mulai pertemuan rapat ini untuk kelancaran proyek",
        quiz: {
          question: "Ucapan 'Monggo kita miwiti...' bermakna mengajak untuk...",
          options: [
            "Makan bersama",
            "Memulai aktivitas rapat",
            "Menunda kepulangan",
            "Membayar belanjaan"
          ],
          answerIndex: 1,
          explanation: "'Monggo kita miwiti...' mengajak rekan-rekan membuka tirai rapat korporasi."
        }
      },
      {
        id: "jv-u5",
        title: "Gagasan Wiwitan & Argumentasi Sastra",
        miniTitle: "Opini",
        level: "Master",
        shortDesc: "Ngandharake panemu ing diskusi babagan budaya Jawa, ngginakaken krama inggil alus.",
        content: `### Ngandharake Panemu (Argumentasi)

#### Pengantar Opini
- "Miturut pamawas kula, kabudayan Jawi menika prigel dipun lestariaken." (Menurut pandangan saya, kebudayaan Jawa ini wajib dilestarikan.)`,
        examplePhrase: "Miturut pamawas kula kabudayan Jawi kedah lestari",
        examplePhraseTranslation: "Menurut pemikiran saya kebudayaan Jawa haruslah lestari",
        quiz: {
          question: "Bagaimana cara menyatakan 'Menurut pandangan / pendapat saya' dalam Basa Krama?",
          options: [
            "Aku emoh rono...",
            "Miturut pamawas kula...",
            "Koe arep nandi...",
            "Sithik-sithik wae..."
          ],
          answerIndex: 1,
          explanation: "'Miturut pamawas kula' menerangkan opini penalaran intelektual puitis."
        }
      },
      {
        id: "jv-u6",
        title: "Cangkriman, Paribasan lan Sanepa",
        miniTitle: "Sastra",
        level: "Master",
        shortDesc: "Menyelami pralambang falsafah urip, unen-unen Jawa lawas, lan cangkriman puitis kearifan lokal.",
        content: `### Sanepa & Paribasan Jawi

#### Idiom / Unen-Unen Jami
- **Kacang ora ninggal lanjaran**: Sifat anak mirip orang tua.
- **Sangat mudah (gampang)**: Diarani "Entheng sanget" utawi "Gampil" kaya dolanan bocah.`,
        examplePhrase: "Damelan niki entheng sanget lan gampil",
        examplePhraseTranslation: "Pekerjaan membuat karya ini tergolong sangat enteng dan mudah",
        quiz: {
          question: "Apa arti paribasan 'Kacang ora ninggal lanjaran'?",
          options: [
            "Menyiangi kebun kacang panjang",
            "Anak biasanya mewarisi watak dan kebiasaan dari orang tuanya",
            "Rebusan sayur lodeh kacang",
            "Kacang terlepas jatuh dari tangkainya"
          ],
          answerIndex: 1,
          explanation: "Peribahasa ini melambangkan keterikatan genetis watak anak yang menduplikasi teladan bapak-ibunya."
        }
      }
    ]
  },
  {
    code: "pap",
    name: "Papua",
    flag: "🏹",
    units: [
      {
        id: "pap-u1",
        title: "Bahasa Melayu Papua & Sapaan Dasar (Kawan Baik)",
        miniTitle: "Sapaan",
        level: "Pemula",
        shortDesc: "Belajar menyapa kawan, memperkenalkan diri dalam dialek melayu Papua dan kata 'Kitorang'.",
        content: `### Belajar Dialek Melayu Papua

Melayu Papua kaya akan kesederhanaan, keakraban sosial, dan ritme ceria.

#### Sapaan Akrab
- **Halo Kawan!**: Sapaan ramah umum.
- **Selamat pagi kawan**: Sapaan pagi.
- **Matur**: Terima kasih (diserap lokal/nasional) atau **Terima kasih banyak kawan**.

#### Perkenalan
- "Sa pu nama Suki." (Nama saya Suki.)
- "Senang ketemu ko!" (Senang bertemu denganmu!)`,
        examplePhrase: "Halo kawan sa pu nama Suki senang ketemu ko",
        examplePhraseTranslation: "Halo teman nama saya Suki, senang bertemu denganmu",
        quiz: {
          question: "Bagaimana cara menyebut nama sendiri dalam dialek khas Melayu Papua?",
          options: [
            "Sa pu nama Suki",
            "Kula niki kasmaran",
            "My label index Suki",
            "Gue punya panggilan Suki"
          ],
          answerIndex: 0,
          explanation: "'Sa pu nama...' kependekan dari 'Saya punya nama...' bermakna 'Nama saya adalah'."
        }
      },
      {
        id: "pap-u2",
        title: "Navigasi Jalan & Bertanya Tempat",
        miniTitle: "Sosial",
        level: "Pemula",
        shortDesc: "Bagaimana bertanya jalur ke pelabuhan, bandara Sentani, atau lokasi pasar khas mama-mama Papua.",
        content: `### Bertanya Jalan di Papua

#### Tanya Tempat
- "Permisi, pelabuhan di sebelah mana?"
- "Bisa kasih tunjuk jalan ka?" (Bisa beri petunjuk jalan?)`,
        examplePhrase: "Permisi kawan bisa kasih tunjuk jalan ka",
        examplePhraseTranslation: "Permisi kawan bisakah menunjukkan arah jalan?",
        quiz: {
          question: "Bagaimana cara bertanya arah jalan di daerah Papua secara ramah dialek lokal?",
          options: [
            "Kawan, bisa kasih tunjuk jalan ka?",
            "Woi buruan di mana bandara?",
            "Saya butuh taksi cepat sekarang.",
            "Tutup jalanan utama itu!"
          ],
          answerIndex: 0,
          explanation: "Menyebut 'kawan' di awal disusul pertanyaan 'Bisa kasih tunjuk jalan ka?' membentuk kalimat akrab yang direspon hangat."
        }
      },
      {
        id: "pap-u3",
        title: "Makan Keladi & Ikan Kuah Kuning Papua",
        miniTitle: "Kuliner",
        level: "Menengah",
        shortDesc: "Bahasa memesan papeda hangat, sajian ikan kuah kuning segar, dan singkong bakar katering pantai.",
        content: `### Menikmati Kuliner Papua

#### Cara Memesan
- "Sa mau pesan ikan kuah kuning dan papeda satu porsi kawan."
- "Makanan ini mantap sekali!" (Enak sekali!)`,
        examplePhrase: "Sa mau pesan ikan kuah kuning dan papeda",
        examplePhraseTranslation: "Saya mau memesan masakan ikan kuah kuning dan makanan papeda",
        quiz: {
          question: "Sajian kuliner andalan utama khas bumi Papua berpati sagu bening kental bernama...",
          options: [
            "Papeda",
            "Gudeg",
            "Rendang",
            "Bakso"
          ],
          answerIndex: 0,
          explanation: "Papeda adalah bubur sagu khas daerah Maluku dan Papua, dimakan hangat bersanding ikan bumbu kuah kuning."
        }
      },
      {
        id: "pap-u4",
        title: "Kerja Komunitas & Koperasi Kelapa",
        miniTitle: "Bisnis",
        level: "Menengah",
        shortDesc: "Mengatur rapat perkumpulan buruh kelapa, distribusi laut, dan koperasi kerajinan noken gembira.",
        content: `### Kerja Sama Sektor Komunitas

Sektor kelautan, perkebunan pala, dan kerajinan tangan noken adalah corak ekonomi utama.

#### Rapat Komunitas
- "Mari kitorang kumpul rapat bicarakan koperasi kawan." (Mari kita berkumpul rapat mengulas koperasi daerah.)`,
        examplePhrase: "Mari kitorang kumpul rapat bicarakan koperasi",
        examplePhraseTranslation: "Mari kita berkumpul rapat mendiskusikan urusan koperasi bersama",
        quiz: {
          question: "Apakah makna dari kata 'Kitorang' di Papua?",
          options: [
            "Kerajinan noken tari",
            "Kita semua (Kita orang)",
            "Ikan laut dalam",
            "Alat musik tifa"
          ],
          answerIndex: 1,
          explanation: "'Kitorang' (singkatan dari kita orang) digunakan untuk membangkitkan kebersamaan dan kekeluargaan kolektif."
        }
      },
      {
        id: "pap-u5",
        title: "Gagasan Masa Depan Papua Hijau",
        miniTitle: "Opini",
        level: "Master",
        shortDesc: "Berdiskusi ilmiah tentang pelestarian hutan hujan Lorentz dan pengembangan pendidikan pelosok.",
        content: `### Diskusi Pembangunan Papua Hijau

#### Mengutarakan Ide
- "Menurut sa, kitorang harus jaga hutan adat Lorentz tetap lestari." (Menurut pendapat saya, kita wajib melestarikan hutan Lorentz tetap asri.)`,
        examplePhrase: "Menurut sa kitorang harus jaga hutan Lorentz",
        examplePhraseTranslation: "Menurut saya kita semua wajib melestarikan hutan adat Lorentz",
        quiz: {
          question: "Bagaimana cara elegan membobot pendapat pribadi di depan umum di Papua?",
          options: [
            "Menurut sa...",
            "Mana harganya...",
            "Sa mau pergi...",
            "Jangan berisik..."
          ],
          answerIndex: 0,
          explanation: "'Menurut sa...' merupakan ekspresi lokal jujur menuangkan gagasan orisinalitas pemikiran individu."
        }
      },
      {
        id: "pap-u6",
        title: "Sastra Lagu & Filosofi Alam Papua",
        miniTitle: "Sastra",
        level: "Master",
        shortDesc: "Menyelami kearifan kosmos di balik lagu tradisional Apuse, tari Yospan, dan pelestarian burung Cendrawasih.",
        content: `### Tradisi Lisan & Alam Papua

Pelajari filosofi perlindungan satwa hutan.

#### Idiom Kehidupan
- **Pekerjaan mudah**: Sering disebut "Kecil kawan!" atau "Bisa kawan!" perlambang mentalitas pantang menyerah.`,
        examplePhrase: "Pekerjaan membuat karya ini kecil kawan bisa",
        examplePhraseTranslation: "Pekerjaan membuat karya ini sangatlah gampang pasti bisa dilakukan",
        quiz: {
          question: "Burung eksotis berbulu indah yang dianggap lambang keagungan dan pelindung alam hutan adat Papua adalah...",
          options: [
            "Cendrawasih",
            "Pinguin",
            "Merak India",
            "Elang Bondol"
          ],
          answerIndex: 0,
          explanation: "Burung Cendrawasih (Bird of Paradise) disakralkan dan dilindungi ketat oleh hukum adat ulayat Papua."
        }
      }
    ]
  },
  {
    code: "mc",
    name: "Monako",
    flag: "🇲🇨",
    units: [
      {
        id: "mc-u1",
        title: "Dialek Monegasque (A Lenga Munegasca)",
        miniTitle: "Sapaan",
        level: "Pemula",
        shortDesc: "Pelajari ungkapan lokal unik Monako, menyapa aristokrat, dan pengenalan nama di istana.",
        content: `### Sapaan Tradisional Monegasque

Monako memelihara dialek unik gabungan Liguria (Italia) dan Prancis Provence.

#### Sapaan Khas
- **Bon ror** / **Ciau**: Sapaan tradisional mirip Ciao.
- **Masser**: Terima kasih banyak.

#### Perkenalan
- "O miu nome è Suki." (Nama saya Suki.)
- "Piaçé de cunusceve." (Senang bertemu dengan Anda.)`,
        examplePhrase: "Ciau o miu nome e Suki mace",
        examplePhraseTranslation: "Ciao nama saya Suki, terima kasih banyak",
        quiz: {
          question: "Sapaan tradisional akrab Monako yang mirip pengaruh wilayah Italia utara adalah...",
          options: [
            "Ciau",
            "Sugeng",
            "Günaydın",
            "Bonjour"
          ],
          answerIndex: 0,
          explanation: "'Ciau' (Ciao) membaur alami berasimilasi akibat jalur perbatasan geografis Riviera yang menyatu dengan Italia."
        }
      },
      {
        id: "mc-u2",
        title: "Navigasi Pelabuhan Yacht & Sirkuit GP",
        miniTitle: "Sosial",
        level: "Pemula",
        shortDesc: "Bagaimana cara berjalan melintasi Monte Carlo Yacht Club, sirkuit tikungan terkenal, atau kasir butik megah.",
        content: `### Menjelajahi Monte Carlo Yacht Club

#### Pertanyaan Wisatawan
- "Entschuldigung, ueste Port Hercule?" (Permisi, di seberang mana dermaga kapal pesiar Port Hercule?)
- "Billet pour le Palais Princier, s'il vous plaît!" (Karcis berkunjung ke Istana Pangeran Grimaldi, please!)`,
        examplePhrase: "Permisi di mana sirkuit Monte Carlo berada kawan",
        examplePhraseTranslation: "Permisi di mana sirkuit Monte Carlo berada kawan",
        quiz: {
          question: "Pelabuhan legendaris sentra parkir kapal pesiar mewah milyuner di Monako bernama...",
          options: [
            "Port Hercule",
            "Tanjung Priok",
            "Port of Rotterdam",
            "Marina Bay"
          ],
          answerIndex: 0,
          explanation: "Port Hercule adalah pelabuhan alam megah utama milik wilayah Monte Carlo Grimaldi."
        }
      },
      {
        id: "mc-u3",
        title: "Kuliner Restoran Berbintang Michelin",
        miniTitle: "Kuliner",
        level: "Menengah",
        shortDesc: "Teknik memesan hidangan gastronomi kelas atas Prancis-Italia dengan etika makan anggun.",
        content: `### Etika Gastronomi Monako

#### Ungkapan Meja Makan
- "Nous aimerions commander le menu de dégustation, s'il vous plaît." (Kami ingin memesan paket menu uji rasa eksklusif chef, tolong.)
- "Une bouteille d'eau minérale d'Evian, s'il vous plaît."`,
        examplePhrase: "Nous aimerions commander le menu degustation sil vous plait",
        examplePhraseTranslation: "Kami hendak memesan sajian paket menu degustation istimewa chef",
        quiz: {
          question: "Jika Anda ingin memesan paket hidangan uji rasa kompilasi chef terbaik di Monako, tanyakan...",
          options: [
            "Menu de dégustation",
            "Kebab goreng",
            "Air keran dapur",
            "Kacang goreng mentah"
          ],
          answerIndex: 0,
          explanation: "'Menu de dégustation' menyajikan aneka kreasi mahakarya kuliner mini chef terbaik bertahap masif."
        }
      },
      {
        id: "mc-u4",
        title: "Pembiayaan Global & Bisnis Kemakmuran",
        miniTitle: "Bisnis",
        level: "Menengah",
        shortDesc: "Bagaimana melakukan korespondensi perbankan swasta, asuransi aset maritim, pertukaran devisa multinasional.",
        content: `### High-End Finance & Wealth Management

Monako adalah pusat perbankan ekuitas dan kekayaan internasional yang terproteksi ketat secara regulasi keuangan.

#### Istilah Finansial
- "Le cabinet de conseil en investissement immobilier..." (Firma jasa penasihat penanaman modal investasi real estat mewah...)`,
        examplePhrase: "We need an investment meeting to manage our assets Portfolio",
        examplePhraseTranslation: "Kita butuh pertemuan investasi untuk memajukan portofolio aset berharga kami",
        quiz: {
          question: "Apakah fokus utama transaksi bisnis korporasi global di kerajaan Monako?",
          options: [
            "Penambangan batubara bumi",
            "Manajemen aset keuangan eksklusif (Wealth Management) & Industri Maritim Superyacht",
            "Perkebunan padi basah",
            "Manufaktur alat berat pertanian"
          ],
          answerIndex: 1,
          explanation: "Sektor finansial swasta bebas pajak tinggi dan layanan maritim superyacht mewah menopang pilar ekonomi Monako."
        }
      },
      {
        id: "mc-u5",
        title: "Diplomasi Ekologis Yayasan Pangeran Monako",
        miniTitle: "Opini",
        level: "Master",
        shortDesc: "Menganalisis inisiatif Yayasan Pangeran Albert II dalam menyelamatkan ekosistem laut global dari sampah mikroplastik.",
        content: `### Marine Conservation Debate

#### Ide Melindungi Lautan
- "Nous devons interdire le plastique à usage unique pour protéger la biodiversité marine." (Kita wajib melarang total botol plastik sekali pakai guna mengamankan keanekaragaman satwa bawah laut.)`,
        examplePhrase: "We must ban single use plastics to save oceans",
        examplePhraseTranslation: "Kita harus memboikot plastik sekali pakai demi kelestarian lautan dunia",
        quiz: {
          question: "Isu ekologis global terpenting yang didanai secara masif oleh Yayasan Pangeran Monako di forum internasional adalah...",
          options: [
            "Penyelamatan bioma padang pasir",
            "Konservasi keanekaragaman hayati lautan luas & transisi energi nol emisi karbon",
            "Pembangunan jalur MRT bawah tanah",
            "Peluncuran satelit komersial orbit rendah"
          ],
          answerIndex: 1,
          explanation: "Yayasan Pangeran Albert II dari Monako menggalang dana penyelamatan ekosistem maritim dan perubahan cuaca ekstrem di belahan bumi."
        }
      },
      {
        id: "mc-u6",
        title: "Peribahasa Klasik Ligurian (U Proverbiu)",
        miniTitle: "Sastra",
        level: "Master",
        shortDesc: "Peribahasa bangsawan Grimaldi kuno, naskah puitis sastrawan Louis Notari tentang jati diri Monako.",
        content: `### Sastra & Louis Notari Monegasque

#### Unen-Unen Tradisional (Proverb)
- **A can che abaia nun morde**: Anjing menggonggong jarang menggigit.
- **Sangat gampang (Facile)**: Istilah aristokrat sirkuit "Layanan mulus" atau "Mulus meluncur".`,
        examplePhrase: "This superyacht transaction is smooth sailing and easy",
        examplePhraseTranslation: "Transaksi superyacht kapal pesiar ini sangatlah mulus berjalan lurus tanpa rintangan",
        quiz: {
          question: "Tokoh nasional peletak dasar tata penulisan kamus sastra tata bahasa lisan orisinal Monegasque bernama...",
          options: [
            "Louis Notari",
            "Julius Caesar",
            "Alexander Agung",
            "Kant we"
          ],
          answerIndex: 0,
          explanation: "Louis Notari membukukan puisi dan sistem tata bahasa Monegasque agar bahasa leluhur kerajaan tidak punah tergilas industrialisasi modern."
        }
      }
    ]
  },
  {
    code: "th",
    name: "Thailand",
    flag: "🇹🇭",
    units: [
      {
        id: "th-u1",
        title: "Sapaan Hangat Gajah Putih (Sawatdee)",
        miniTitle: "Sapaan",
        level: "Pemula",
        shortDesc: "Mempelajari sapaan khas 'Krap / Ka', memohon maaf, dan mengidentifikasi nama Anda.",
        content: `### Sawatdee & Perkenalan Thailand

Thailand terkenal sebagai "Negeri Senyuman". Akhiran sopan berdasarkan gender pembicara wajib ditambahkan:
- **Krap** (สำหรับผู้ชาย): Jika pembicara adalah laki-laki.
- **Ka** (สำหรับผู้หญิง): Jika pembicara adalah perempuan.

#### Sapaan Dasar
- **Sawatdee krap / ka**: Halo / Selamat pagi/siang/malam.
- **Khob khun krap / ka**: Terima kasih.

#### Perkenalan
- "Phom chue Suki krap." (Nama saya Suki - pria.)
- "Chan chue Suki ka." (Nama saya Suki - wanita.)`,
        examplePhrase: "Sawatdee krap chan chue Suki khob khun ka",
        examplePhraseTranslation: "Halo selamat siang nama saya Suki terima kasih kawan",
        quiz: {
          question: "Partikel sopan penutup kalimat yang diucapkan oleh seorang wanita Thailand adalah...",
          options: [
            "Ka",
            "Krap",
            "Matur",
            "Bitte"
          ],
          answerIndex: 0,
          explanation: "Wanita mengakhiri kalimat dengan partikel 'Ka' (ค่ะ/ขา) untuk melembutkan intonasi pengucapan di telinga pendengar."
        }
      },
      {
        id: "th-u2",
        title: "Tuk-Tuk & Navigasi di Bangkok (Seyahat)",
        miniTitle: "Sosial",
        level: "Pemula",
        shortDesc: "Bagaimana cara menyewa layanan Tuk-tuk di Jalan Khao San, meluncur naik feri sungai Chao Phraya.",
        content: `### Bertualang Naik Tuk-tuk di Bangkok

#### Tanya Lokasi
- "Sanam bin yoo tee nai krap / ka?" (Bandara berada di mana?)
- "Nee tao rai?" (Ini harganya berapa?)`,
        examplePhrase: "Excuse me Sanam bin yoo tee nai ka",
        examplePhraseTranslation: "Permisi, bandar udara terletak di sebelah mana berada?",
        quiz: {
          question: "Kosa kata 'Sanam bin' merujuk pada sarana infrastruktur kota berupa...",
          options: [
            "Bandar udara",
            "Kuil Buddha emas",
            "Pasar buah terapung",
            "Stasiun kereta api"
          ],
          answerIndex: 0,
          explanation: "'Sanam bin' (สนามบิน) merujuk pada sarana lalu lintas penerbangan bandar udara."
        }
      },
      {
        id: "th-u3",
        title: "Menikmati Rasa Masakan Tom Yum Goong",
        miniTitle: "Kuliner",
        level: "Menengah",
        shortDesc: "Bahasa memesan semangkuk sup Tom Yum bumbu asam pedas khas, nasi ketan mangga (Mango Sticky Rice).",
        content: `### Kuliner Khas Muangthai

#### Memesan Makanan
- "Phom yak sang Tom Yum Goong yoo krap." (Saya ingin memesan sup Tom Yum udang krap.)
- "Nee phed mai?" (Apakah hidangan ini pedas?)
- **Aroy mak!**: Lezat sekali!`,
        examplePhrase: "Phom yak sang Tom Yum Goong ka",
        examplePhraseTranslation: "Saya hendak memesan sepiring masakan Tom Yum Goong lezat",
        quiz: {
          question: "Bagaimana cara memberi pujian jika rasa masakan sup yang dihidangkan amat lezat?",
          options: [
            "Aroy mak!",
            "Phed mak!",
            "Nee tao rai?",
            "Sawatdee krap"
          ],
          answerIndex: 0,
          explanation: "'Aroy mak' (อร่อยมาก) maknanya adalah sangat enak/lezat."
        }
      },
      {
        id: "th-u4",
        title: "Industri Pariwisata Bisnis Bangkok",
        miniTitle: "Bisnis",
        level: "Menengah",
        shortDesc: "Mengelola agensi perjalanan liburan, negosiasi impor sutra Thailand, investasi spa kecantikan herbal.",
        content: `### Industri Pariwisata & Bisnis Sutra

#### Ekspresi Meeting Kantor
- "Rao kuan nat prachum pua haru rueang krong karn nee." (Kita sebaiknya menjadwalkan rapat kerja guna mengulas proyek penting ini.)`,
        examplePhrase: "Rao kuan nat prachum pua haru rueang krong karn",
        examplePhraseTranslation: "Kita lebih baik mengadakan rapat mengoreksi pilar rencana proyek",
        quiz: {
          question: "Komoditas kerajinan tekstil kain kebanggaan ekspor komersial Thailand ke mancanegara yaitu...",
          options: [
            "Kain batik tulis",
            "Sutra murni Thailand (Thai Silk)",
            "Kain tenun wol tebal",
            "Kulit hewan reptil"
          ],
          answerIndex: 1,
          explanation: "Sutra Thailand terkenal karena kehalusan jalin serat benang alami hasil ulat lokal yang mendunia."
        }
      },
      {
        id: "th-u5",
        title: "Filsafat Ajaran Kuil & Konservasi Gajah",
        miniTitle: "Opini",
        level: "Master",
        shortDesc: "Berdiskusi sosiologis tentang peran etika biksu, meditasi vipassana, program pelepasliaran satwa liar.",
        content: `### Konservasi Satwa & Kehidupan Biara

#### Mengemukakan Perspektif
- "Phom kid wa kan rak sa pa dong dip pen sing samkhan krab." (Menurut pemikiran saya, upaya melestarikan keasrian hutan adat adalah tugas vital krusial.)`,
        examplePhrase: "Phom kid wa kan rak sa pa dong dip pen ka",
        examplePhraseTranslation: "Bagi pemikiran saya melestarikan rimba belantara merupakan urusan krusial",
        quiz: {
          question: "Bagaimana cara pembicara pria berkata 'Saya rasa/pikir...' dalam diskursus formal?",
          options: [
            "Phom kid wa...",
            "Ka...",
            "Sawatdee ka...",
            "Aroy krap..."
          ],
          answerIndex: 0,
          explanation: "'Phom kid wa...' (ผมคิดว่า) digunakan pria untuk menyampaikan gagasan analitis logika rasional."
        }
      },
      {
        id: "th-u6",
        title: "Metafora & Idiom Sastra Siam",
        miniTitle: "Sastra",
        level: "Master",
        shortDesc: "Menyelami bahasa kuno epik Ramakien Raja Rama II, kiasan lokal gajah putih dalam sastra lisan.",
        content: `### Idiom Tradisional Muangthai

#### Idiom / Peribahasa (สำนวนไทย)
- **Kluay kluay**: Sangat mudah gampang sekali (harfiah: pisang-pisangan, sepadan dengan 'piece of cake').
- **Gajah putih**: Barang milik mewah berharga tinggi bersalin ongkos perawatan yang teramat menguras kantong tanpa laba berarti.`,
        examplePhrase: "Jangan risau ujian menyanyi ini sangat kluay kluay saja",
        examplePhraseTranslation: "Jangan bersedih ujian vokal ini tergolong sangat gampang sekali",
        quiz: {
          question: "Idiom populer 'Kluay kluay' (pisang) bermakna kiasan...",
          options: [
            "Urusan yang teramat gampang/mudah dikerjakan",
            "Menanam pohon buah-buahan",
            "Rasa lapar sore hari",
            "Memetik daun pisang liar"
          ],
          answerIndex: 0,
          explanation: "'Kluay kluay' (กล้วยๆ) laksana pisang kupas gampang ditelan, disetarakan dengan istilah 'piece of cake'."
        }
      }
    ]
  },
  {
    code: "jp",
    name: "Jepang",
    flag: "🇯🇵",
    units: [
      {
        id: "jp-u1",
        title: "Sapaan Sopan Negeri Sakura (Aisatsu)",
        miniTitle: "Sapaan",
        level: "Pemula",
        shortDesc: "Tata cara menyapa Konnichiwa, menyebutkan nama sendiri, membungkukkan badan (Ojigi) yang anggun.",
        content: `### Aisatsu & Perkenalan Diri

Sapaan (Aisatsu) adalah pondasi mutlak penghormatan di Jepang.

#### Aisatsu Dasar
- **Konnichiwa**: Selamat siang.
- **Ohayou gozaimasu**: Selamat pagi.
- **Arigatou gozaimasu**: Terima kasih banyak.

#### Perkenalan Sopan
- "Hajimemashite. Watashi wa Suki desu. Douzo yoroshiku onegaishimasu." (Perkenalkan, nama saya Suki. Senang bertemu dengan Anda!)`,
        examplePhrase: "Hajimemashite Watashi wa Suki desu yoroshiku",
        examplePhraseTranslation: "Perkenalkan nama saya Suki, mohon bimbingannya selalu",
        quiz: {
          question: "Ekspresi penutup perkenalan diri wajib di Jepang yang berarti 'Mohon bimbingannya' adalah...",
          options: [
            "Douzo yoroshiku onegaishimasu",
            "Arigatou gozaimasu",
            "Konnichiwa sensei",
            "Gomen nasai"
          ],
          answerIndex: 0,
          explanation: "'Douzo yoroshiku onegaishimasu' mengukuhkan ikatan awal sosial baru dengan komitmen saling menghormati."
        }
      },
      {
        id: "jp-u2",
        title: "Naik Shinkansen & Navigasi di Tokyo",
        miniTitle: "Sosial",
        level: "Pemula",
        shortDesc: "Bagaimana cara naik kereta supercepat, melacak rute Stasiun Shinjuku, membeli karcis harian.",
        content: `### Menjelajahi Jaringan Kereta Tokyo

#### Bertanya Jalan
- "Sumimasen, eki wa doko desu ka?" (Permisi, stasiun kereta posisinya ada di sebelah mana?)
- "Chikatetsu no kippu wa ikura desu ka?" (Karcis kereta bawah tanah harganya berapa yen?)

#### Kosakata
- **Sumimasen**: Permisi / Maaf permisi.`,
        examplePhrase: "Sumimasen eki wa doko desu ka",
        examplePhraseTranslation: "Permisi, di manakah letak stasiun keretanya?",
        quiz: {
          question: "Ekspresi multifungsi paling vital 'Sumimasen' dapat memiliki arti...",
          options: [
            "Permisi, minta maaf, atau menginisiasi panggilan pelayan kafe",
            "Selamat tidur nyenyak",
            "Makanan ini hambar rasanya",
            "Berapa harga barang kuno itu"
          ],
          answerIndex: 0,
          explanation: "'Sumimasen' (すみません) melambangkan ungkapan andalan memulai interaksi sosial tanpa terkesan mengagetkan."
        }
      },
      {
        id: "jp-u3",
        title: "Memesan Ramen, Sushi, Okonomiyaki",
        miniTitle: "Kuliner",
        level: "Menengah",
        shortDesc: "Etika memegang sumpit (Hashi), cara memesan ramen kuah gurih murni, meminta nota pembayaran.",
        content: `### Etika Meja Makan Jepang

#### Ucapan Wajib
- **Itadakimasu**: Diucapkan khidmat sebelum menyuap makanan pembuka (harfiah: menerima).
- **Gochisousama deshita**: Diucapkan setelah selesai menyantap (apresiasi jerih lelah memasak).
- "Kore wo chuumon shitai desu." (Saya ingin memesan menu hidangan masakan ini, tolong.)
- "Okaikei wo onegaishimasu." (Minta bil tagihan kasirnya, please!)`,
        examplePhrase: "Kore wo chuumon shitai desu Okaikei",
        examplePhraseTranslation: "Saya ingin memesan menu makanan ini, minta tagihan bayarnya",
        quiz: {
          question: "Kalimat sakral yang diucapkan penuh takzim luhur sesaat sebelum makan masakan dinamakan...",
          options: [
            "Itadakimasu",
            "Gochisousama deshita",
            "Sumimasen",
            "Konnichiwa"
          ],
          answerIndex: 0,
          explanation: "'Itadakimasu' (いただきます) melambangkan rasa syukur mendalam kepada seluruh siklus rantai makanan penyokong kehidupan."
        }
      },
      {
        id: "jp-u4",
        title: "Tata Krama Keidanren & Bisnis Jepang",
        miniTitle: "Bisnis",
        level: "Menengah",
        shortDesc: "Bagaimana cara menyerahkan kartu nama (Meishi), tata bahasa keigo resmi, bernegosiasi korporat murni.",
        content: `### Meishi Koukan & Keigo Bisnis

Jepang dikenal akan keruwetan etis pertukaran kartu nama bisnis (Meishi Koukan) dan ragam halus bahasa Keigo.

#### Rapat Bisnis
- "Kaigi wo hajimemashou." (Mari kita mulai agenda sidang rapat ini.)
- "Kono keiyaku-sho wo gokakuninください." (Mohon periksa teliti lembar kontrak ini.)`,
        examplePhrase: "Kaigi wo hajimemashou yoroshiku onegaishimasu",
        examplePhraseTranslation: "Mari buka jalannya agenda rapat ini, mohon kerja samanya selalu",
        quiz: {
          question: "Ritual wajib perkenalan bisnis awal melambangkan keseriusan relasi korporasi di Jepang dinamakan...",
          options: [
            "Sake bar party",
            "Meishi Koukan (Pertukaran Kartu Nama)",
            "Tari Yospan",
            "Ceker bebek goreng"
          ],
          answerIndex: 1,
          explanation: "Menyerahkan Meishi menggunakan kedua belah telapak tangan sejajar dada melambangkan penghormatan profesional tertinggi kepada mitra usaha."
        }
      },
      {
        id: "jp-u5",
        title: "Pemikiran Keindahan Budaya Wabi-Sabi",
        miniTitle: "Opini",
        level: "Master",
        shortDesc: "Berdiskusi filsafat penerimaan ketidaksempurnaan kosmos (Wabi-Sabi), estetika upacara minum teh (Chado).",
        content: `### Wabi-Sabi & Filsafat Upacara Teh

Wabi-Sabi mengajarkan kita menemukan harmoni estetis di balik kerapuhan benda antik yang tak sempurna retak.

#### Menyatakan Opini Filosofis
- "Watashi no iken de wa, wabi-sabi wa kanzen na utsukushisa desu." (Menurut opini saya, pemikiran wabi-sabi merefleksikan keindahan yang paling mendekati sempurna alam.)`,
        examplePhrase: "Watashi no iken de wa wabi sabi wa kanzen de",
        examplePhraseTranslation: "Menurut visi pendapat saya pemikiran wabi-sabi melambangkan keindahan murni",
        quiz: {
          question: "Apakah esensi utama di balik cara pandang filosofis jepang 'Wabi-Sabi'?",
          options: [
            "Mengharuskan semua barang berkilau baru tanpa goresan",
            "Menghargai kesederhanaan, penuaan benda alami, dan keelokan di balik ketidaksempurnaan fana",
            "Menjual aneka peralatan teh keramik mahal",
            "Membuang semua perkakas pecah belah kuno"
          ],
          answerIndex: 1,
          explanation: "Wabi-Sabi mengusung filsafat budi pekerti merangkul keretakan, usia tua, kelapukan tekstur sebagai letak keanggunan sejati."
        }
      },
      {
        id: "jp-u6",
        title: "Apresiasi Sastra Kuno Haiku (Basho)",
        miniTitle: "Sastra",
        level: "Master",
        shortDesc: "Bagaimana menganalisis esai Haiku pola suku kata 5-7-5 dari Matsuo Basho, idiom gaul modis.",
        content: `### Seni Puisi Singkat Haiku

Haiku memadatkan emosi kosmos luas ke dalam pola irama suku kata 17 jalinan (5-7-5).

#### Idiom / Peribahasa (Kotowaza)
- **Asameshi mae**: Sangat gampang (harfiah: perkara sepele sebelum melahap sarapan pagi, sepadan dengan 'piece of cake').
- **Nanakorobi yaoki**: Jatuh tujuh kali, bangun delapan kali (filsafat ketangguhan hidup).`,
        examplePhrase: "Kono shukudai wa asameshi mae desu yo",
        examplePhraseTranslation: "Urusan tugas pekerjaan rumah ini terlampau gampang sekali bagi saya",
        quiz: {
          question: "Apa peribahasa Jepang (Kotowaza) yang berarti urusan yang amat mudah bagai membalik tangan?",
          options: [
            "Asameshi mae",
            "Nanakorobi yaoki",
            "Sushi tabetai",
            "Ojigi shite"
          ],
          answerIndex: 0,
          explanation: "'Asameshi mae' (朝飯前) mendeskripsikan aktivitas ringan yang kelar dibereskan sebelum kita bersantap makan pagi."
        }
      }
    ]
  },
  {
    code: "zh",
    name: "Mandarin",
    flag: "🇨🇳",
    units: [
      {
        id: "zh-u1",
        title: "Intonasi Tonal & Sapaan Dasar (Nǐ Hǎo)",
        miniTitle: "Sapaan",
        level: "Pemula",
        shortDesc: "Belajar menguasai 4 nada (tones) penting pinyin aksara Hanzi, mengucapkan halo, dan berkenalan.",
        content: `### Menguasai 4 Tonal Mandarin & Perkenalan

Bahasa Mandarin mengandalkan presisi nada (Tonal). Beda nada pengucapan, beda makna aksara Hanzi!

#### Sapaan Dasar
- **Nǐ hǎo**: Halo (kamu baik).
- **Xièxie**: Terima kasih.
- **Zàijiàn**: Sampai jumpa.

#### Perkenalan Diri
- "Wǒ jiào Suki." (Nama saya Suki.)
- "Hěn gāoxìng rènshi nǐ!" (Sangat senang berkenalan denganmu!)`,
        examplePhrase: "Nǐ hǎo wǒ jiào Suki xièxie zàijiàn",
        examplePhraseTranslation: "Halo nama saya Suki terima kasih sampai jumpa",
        quiz: {
          question: "Bagaimana cara menyatakan 'Terima kasih banyak' dalam ejaan Pinyin Mandarin?",
          options: [
            "Xièxie",
            "Nǐ hǎo",
            "Zàijiàn",
            "Bù kèqì"
          ],
          answerIndex: 0,
          explanation: "'Xièxie' (谢谢) adalah sapaan terima kasih standar internasional."
        }
      },
      {
        id: "zh-u2",
        title: "Navigasi Kota & Menemukan Jalan (Ditie)",
        miniTitle: "Sosial",
        level: "Pemula",
        shortDesc: "Bagaimana cara bertransaksi naik Subway metro bawah tanah, menanyakan kedutaan, atau arah pusat belanja.",
        content: `### Menjelajahi Kota Menggunakan Metro Subway

#### Bertanya Jalan
- "Qǐngwèn, dìtiě zhàn zài nǎlǐ?" (Permisi tanya, stasiun metro bawah tanah posisinya di sebelah mana?)
- "Zhège duōshǎo qián?" (Ini berapa harganya?)

#### Kosakata
- **Qǐngwèn**: Mohon tanya / Permisi numpang tanya.`,
        examplePhrase: "Qingwen ditie zhan zai nali",
        examplePhraseTranslation: "Permisi menanyakan, stasiun metro bawah tanah berada di seberang mana?",
        quiz: {
          question: "Kosa kata 'Dìtiě zhàn' merepresentasikan tempat transit kota berupa...",
          options: [
            "Stasiun kereta bawah tanah (Subway)",
            "Kedai roti",
            "Kuil leluhur konfusius",
            "Pasar loak barang antik"
          ],
          answerIndex: 0,
          explanation: "'Dìtiě zhàn' (地铁站) tersusun atas kata Di (bawah tanah), Tie (besi/rel), Zhan (stasiun)."
        }
      },
      {
        id: "zh-u3",
        title: "Pemesanan Kuliner Bebek Peking (Dian Cai)",
        miniTitle: "Kuliner",
        level: "Menengah",
        shortDesc: "Tata krama meja sirkular dandan, teknik memesan bebek peking panggang, meminta bil penutup kasir.",
        content: `### Dian Cai (Memesan Sajian Meja Circular)

#### Kalimat Praktis Dian Cai
- "Wǒ xiǎng dān bǎijīng kǎoyā." (Saya ingin memesan menu gurih Bebek Peking panggang harum.)
- "Mǎidān, xièxie!" (Kasir, minta bil pembayarannya tolong!)
- **Hěn hǎochī!**: Enak dan gurih lezat sekali!`,
        examplePhrase: "Wo xiang dan beijing kaoya Maidan xiexie",
        examplePhraseTranslation: "Saya mau memesan masakan Bebek Peking, tolong minta bon tagihannya kasir",
        quiz: {
          question: "Sapaan andalan menutup santapan untuk memanggil pramusaji membawakan bill pembayaran adalah...",
          options: [
            "Mǎidān",
            "Nǐ hǎo",
            "Duōshǎo qián",
            "Xièxie"
          ],
          answerIndex: 0,
          explanation: "'Mǎidān' (买单/埋单) adalah instruksi resmi membayarkan seluruh hidangan meja makan."
        }
      },
      {
        id: "zh-u4",
        title: "Komunikasi Niaga Internasional Canton",
        miniTitle: "Bisnis",
        level: "Menengah",
        shortDesc: "Bagaimana menjalin kemitraan pabrik, menyepakati negosiasi dagang harga container, pameran kanton.",
        content: `### Manajemen Bisnis Ekspor Impor Canton

#### Rapat Niaga
- "Wǒmen ànpái yīgè huìyì lái tǎolùn zhège xiàngmù bā." (Mari jadwalkan pertemuan rapat mengupas detail jalin proyek ekspor ini.)
- "Signed Contract..." (Menandatangani piagam kesepakatan kontrak...)`,
        examplePhrase: "Women anpai yige huiyi lai taolun xiangmu",
        examplePhraseTranslation: "Mari jadwalkan satu pertemuan rapat guna mengecek kelangsungan proyek",
        quiz: {
          question: "Kata bahasa mandarin untuk 'Rapat / Sidang Pertemuan' kantor kantor adalah...",
          options: [
            "Huìyì",
            "Dìtiě",
            "Mǎidān",
            "Kǎoyā"
          ],
          answerIndex: 0,
          explanation: "'Huìyì' (会议) berarti agenda persidangan rapat memantapkan langkah strategis korporat."
        }
      },
      {
        id: "zh-u5",
        title: "Filsafat Konfusius Kuno & Sun Tzu Art of War",
        miniTitle: "Opini",
        level: "Master",
        shortDesc: "Mengulas konsep moralitas, strategi taktik perang Sun Tzu, mengutarakan logika debat kompleks.",
        content: `### Retorika Klasik filsafat Tiongkok

#### Menyusun Gagasan
- "Yī wǒ de guāndiǎn lái kàn, dáodé xíngwéi hěn zhòngyào." (Berdasarkan kacamata perspektif saya, perilaku etis moral merupakan pilar terpenting kemajuan.)`,
        examplePhrase: "Yi wo de guandian lai kan xingwei hen ka",
        examplePhraseTranslation: "Dari perspektif pandangan saya perilaku moral mutlak merupakan hal vital",
        quiz: {
          question: "Bagaimana cara menyatakan 'Berdasarkan kacamata pandangan saya' di debat formal?",
          options: [
            "Yī wǒ de guāndiǎn lái kàn...",
            "Wǒ bù xǐhuān...",
            "Nǐ hǎo kawan...",
            "Zàijiàn..."
          ],
          answerIndex: 0,
          explanation: "'Yī jǔ liǎng dé' (一举两得) menggambarkan tindakan tunggal berencana yang melahirkan aneka pencapaian sukses beruntun sekaligus."
        }
      }
    ]
  }
];

const LANGUAGE_SPECIFICS: Record<string, {
  phonetics: string;
  char1: string;
  char2: string;
  easyPhrase: string;
  easyPhraseTr: string;
  easyQuizQ: string;
  easyQuizOpts: string[];
  easyQuizAns: number;
  easyQuizExp: string;
  vocab: { word: string; meaning: string }[];
  idiom: string;
  idiomMeaning: string;
  idiomExp: string;
  businessPhrase: string;
  businessPhraseTr: string;
  literatureExcerpt: string;
  literatureAuthor: string;
  grammarDesc?: string;
  numbersDesc?: string;
}> = {
  en: {
    phonetics: "Bahasa Inggris menggunakan 44 fonem suara berbeda untuk melafalkan 26 huruf alfabet Latin dasar. Tekanan kata (Word Stress) adalah penentu ketepatan makna kata.",
    char1: "Fonem /th/ (seperti pada word 'thank')",
    char2: "Vokal panjang /i:/ (seperti pada word 'meet')",
    easyPhrase: "The phonetics of English are beautiful",
    easyPhraseTr: "Sistem fonetik Bahasa Inggris sangat indah",
    easyQuizQ: "Manakah yang merupakan vokal panjang (long vowel) dalam Bahasa Inggris?",
    easyQuizOpts: ["bila melafalkan 'sheep'", "bila melafalkan 'ship'", "bila melafalkan 'cat'", "bila melafalkan 'bus'"],
    easyQuizAns: 0,
    easyQuizExp: "Kata 'sheep' memiliki vokal panjang /i:/, sedangkan 'ship' memiliki vokal pendek /ɪ/.",
    vocab: [
      { word: "Book", meaning: "Buku" },
      { word: "House", meaning: "Rumah" },
      { word: "School", meaning: "Sekolah" },
      { word: "Water", meaning: "Air" }
    ],
    idiom: "Under the weather",
    idiomMeaning: "Kurang enak badan / sakit",
    idiomExp: "Berasal dari istilah pelayaran masa lampau, merujuk kondisi pelaut yang merasa mual karena badai samudera.",
    businessPhrase: "Let's align on the quarterly core objectives and deliver the results.",
    businessPhraseTr: "Mari kita selaraskan tujuan inti triwulanan dan memberikan hasil nyata.",
    literatureExcerpt: "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer...",
    literatureAuthor: "William Shakespeare"
  },
  de: {
    phonetics: "Bahasa Jerman sangat taat aturan fonetis. Hampir semua huruf dilafalkan tegas, disertai vokal Umlaut Ä, Ö, Ü dan penekanan konsonan ganda.",
    char1: "Umlaut 'Ö' (seperti pada 'schön')",
    char2: "Eszett 'ß' (bunyi 's' ganda tajam)",
    easyPhrase: "Deutsch zu lernen macht mir großen Spaß",
    easyPhraseTr: "Belajar Bahasa Jerman memberiku kegembiraan besar",
    easyQuizQ: "Bagaimana cara melafalkan karakter Umlaut 'Ä' jerman secara tepat?",
    easyQuizOpts: ["Mirip 'e' terbuka seperti pada kata 'bebek'", "Mirip vokal 'u' bulat penuh", "Sama persis dengan huruf 'o' tertutup", "Tidak dilafalkan sama sekali"],
    easyQuizAns: 0,
    easyQuizExp: "Umlaut Ä dilafalkan sebagai vokal depan terbuka sedang, mirip suara 'e' pada kata 'bebek'.",
    vocab: [
      { word: "Buch", meaning: "Buku" },
      { word: "Haus", meaning: "Rumah" },
      { word: "Schule", meaning: "Sekolah" },
      { word: "Wasser", meaning: "Air" }
    ],
    idiom: "Da steppt der Bär",
    idiomMeaning: "Acara yang sangat meriah / asyik sekali",
    idiomExp: "Harfiah berarti 'beruang menari di sana', ungkapan populer untuk menggambarkan tempat pesta yang ramai dan seru.",
    businessPhrase: "Wir müssen die Verkaufszahlen steigern und die Effizienz unserer Lieferkette optimieren.",
    businessPhraseTr: "Kita harus meningkatkan angka penjualan dan mengoptimalkan efisiensi rantai pasok kita.",
    literatureExcerpt: "Habe nun, ach! Philosophie, Juristerei und Medizin, und leider juga Theologie studiert...",
    literatureAuthor: "Johann Wolfgang von Goethe"
  },
  es: {
    phonetics: "Bahasa Spanyol sangat murni secara vokal (A, E, I, O, U murni). Getaran kencang alveolar r berulang (rr) sangat krusial dalam percakapan umum.",
    char1: "Karakter 'ñ' (seperti bunyi 'ny' pada kata 'nyanyi')",
    char2: "Huruf 'rr' bergetar alveolar trill",
    easyPhrase: "Hablar español es maravilloso para mí",
    easyPhraseTr: "Berbicara Bahasa Spanyol sangatlah menyenangkan bagiku",
    easyQuizQ: "Manakah pelafalan karakter khusus 'ñ' dalam Bahasa Spanyol yang benar?",
    easyQuizOpts: ["Dilafalkan seperti bunyi 'ny' Indonesia", "Dilafalkan seperti huruf 'ng'", "Sama dengan bunyi 'sh' inggris", "Diucapkan senyap tanpa desah"],
    easyQuizAns: 0,
    easyQuizExp: "Karakter 'ñ' (enya) diucapkan mutlak sebagai bunyi nasal palatal, sama seperti 'ny' pada kata 'nyaman'.",
    vocab: [
      { word: "Libro", meaning: "Buku" },
      { word: "Casa", meaning: "Rumah" },
      { word: "Escuela", meaning: "Sekolah" },
      { word: "Agua", meaning: "Air" }
    ],
    idiom: "Ponerse las pilas",
    idiomMeaning: "Memasang baterai (Mulai konsentrasi & semangat kerja)",
    idiomExp: "Kiasan kontemporer untuk memotivasi diri atau orang lain agar siap siaga, giat, dan fokus mencurahkan tenaga penuh pada tugas.",
    businessPhrase: "Necesitamos diversificar nuestra cartera de inversiones para mitigar los riesgos globales.",
    businessPhraseTr: "Kita perlu mendiversifikasi portofolio investasi kita guna memitigasi risiko global.",
    literatureExcerpt: "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo...",
    literatureAuthor: "Miguel de Cervantes"
  },
  fr: {
    phonetics: "Bahasa Prancis mengandalkan konsonan senyap (silent letters) di akhir kata, huruf nasal di rongga hidung, dan bunyi vokal bulat /y/.",
    char1: "Karakter s cédille 'ç' (dilafalkan 's' lembut)",
    char2: "Vokal nasal 'an/en/in' dari lubang hidung",
    easyPhrase: "La prononciation du français est élégante",
    easyPhraseTr: "Pelafalan Bahasa Prancis sangat anggun",
    easyQuizQ: "Huruf konsonan apa yang biasanya mutlak 'senyap' / tidak dibunyikan di akhir kata Bahasa Prancis?",
    easyQuizOpts: ["Huruf s, t, d atau x", "Huruf r secara umum", "Hanya huruf c saja", "Huruf l saja"],
    easyQuizAns: 0,
    easyQuizExp: "Secara aturan baku liasion/e-muet, huruf seperti s, t, d, g, x di akhir kata umumnya tidak dibunyikan sama sekali.",
    vocab: [
      { word: "Livre", meaning: "Buku" },
      { word: "Maison", meaning: "Rumah" },
      { word: "École", meaning: "Sekolah" },
      { word: "Eau", meaning: "Air" }
    ],
    idiom: "Tomber dans les pommes",
    idiomMeaning: "Pingsan / Hilang kesadaran karena lelah",
    idiomExp: "Harfiah berarti 'jatuh ke dalam apel', sebuah ungkapan jenaka yang umum dipakai saat seseorang sangat syok.",
    businessPhrase: "Nous devons renforcer notre position sur le marché international en développant des partenariats stratégiques.",
    businessPhraseTr: "Kita harus memperkuat posisi kita di pasar internasional dengan mengembangkan kemitraan strategis.",
    literatureExcerpt: "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient...",
    literatureAuthor: "Marcel Proust"
  },
  tr: {
    phonetics: "Bahasa Turki bersifat harmonis vokal (Vowel Harmony). Huruf diucapkan sejalan persis dengan sistem fonetis abjad Latin Turki modern.",
    char1: "Karakter yumuşak g 'ğ' (memperpanjang vokal sebelumunya)",
    char2: "Huruf ş dan ç (dilafalkan 'sy' dan 'c-inggris')",
    easyPhrase: "Türkçe öğrenmek çok zevkli bir yolculuk",
    easyPhraseTr: "Belajar Bahasa Turki adalah petualangan yang sangat asyik",
    easyQuizQ: "Apakah fungsi utama karakter 'ğ' (yumuşak g) dalam ejaan Bahasa Turki?",
    easyQuizOpts: ["Memperpanjang pelafalan vokal sebelumnya", "Dibunyikan keras seperti huruf 'g' biasa", "Merupakan desah konsonan h", "Hanya pembatas suku kata"],
    easyQuizAns: 0,
    easyQuizExp: "Karakter 'ğ' disebut 'g lembut' yang tidak berbunyi mandiri, melainkan memperhalus dan memperpanjang vokal di depannya.",
    vocab: [
      { word: "Kitap", meaning: "Buku" },
      { word: "Ev", meaning: "Rumah" },
      { word: "Okul", meaning: "Sekolah" },
      { word: "Su", meaning: "Air" }
    ],
    idiom: "İki ayağı bir pabuca girmek",
    idiomMeaning: "Sangat panik / terburu-buru dikejar tenggat",
    idiomExp: "Harfiah 'memasukkan kedua kaki ke satu sepatu'. Kiasan menggelitik ketika seseorang kewalahan karena dibayangi keterbatasan waktu.",
    businessPhrase: "Uluslararası pazarda rekabet gücümüzü artırmak için yeni yatırım stratejileri geliştirmeliyiz.",
    businessPhraseTr: "Kita harus mengembangkan strategi investasi baru guna meningkatkan daya saing di kancah global.",
    literatureExcerpt: "Ben sana mecburum bilemezsin, adını mıh gibi aklımda tutuyorum, büyüdükçe büyüyor gözlerin...",
    literatureAuthor: "Atillâ İlhan"
  },
  id: {
    phonetics: "Bahasa Indonesia memiliki pelafalan yang lugas secara fonemik. Suku kata diucapkan stabil tanpa tonalitas naik turun yang membingungkan.",
    char1: "Diftong 'au' (seperti pelafalan kata 'harimau')",
    char2: "Konsonan ganda 'ng' dan 'ny'",
    easyPhrase: "Belajar bahasa baru membuka jendela wawasan dunia",
    easyPhraseTr: "Learning a new language opens a window to world wisdom",
    easyQuizQ: "Manakah contoh diftong murni dalam pelafalan Bahasa Indonesia baku?",
    easyQuizOpts: ["Suku kata pada 'pantai'", "Suku kata pada 'makan'", "Suku kata pada 'tidur'", "Suku kata pada 'sekolah'"],
    easyQuizAns: 0,
    easyQuizExp: "Diftong adalah penggabungan dua vokal yang menghasilkan satu bunyi luncur, contohnya 'ai' pada kata 'pantai'.",
    vocab: [
      { word: "Buku", meaning: "Buku" },
      { word: "Rumah", meaning: "Rumah" },
      { word: "Sekolah", meaning: "Sekolah" },
      { word: "Air", meaning: "Air" }
    ],
    idiom: "Kabar angin",
    idiomMeaning: "Rumor hampa / desas-desus yang belum sahih",
    idiomExp: "Menggambarkan suatu berita yang melayang bebas tak berdasar di udara seperti partikel hembusan angin.",
    businessPhrase: "Laporan keuntungan kuartal ini menunjukkan tren peningkatan ekspor komoditas non-migas.",
    businessPhraseTr: "This quarter's profit report shows an upward trend in non-oil and gas commodity exports.",
    literatureExcerpt: "Aku ini binatang jalang, dari kumpulannya yang terbuang. Biar peluru menembus kulitku, aku tetap meradang menerjang...",
    literatureAuthor: "Chairil Anwar"
  },
  jv: {
    phonetics: "Bahasa Jawa memiliki phonology khas dengan huruf konsonan beraspirasi berat (dh, th) dan pelafalan huruf vokal terbuka/tertutup.",
    char1: "Konsonan retrofleks 'th' dan 'dh'",
    char2: "Vokal jejeg dan vokal miring",
    easyPhrase: "Sinau basa Jawa iku nengsemake banget",
    easyPhraseTr: "Belajar Bahasa Jawa itu sangatlah mengesankan sekali",
    easyQuizQ: "Karakter swara konsonan bumbung dh/th jowo diproduksi dengan melipat lidah menyentuh...",
    easyQuizOpts: ["Langit-langit mulut bagian atas (Retrofleks)", "Bagian gigi kelinci depan", "Bibir rapat bagian luar", "Tenggorokan pangkal"],
    easyQuizAns: 0,
    easyQuizExp: "Konsonan 'th' dan 'dh' dalam pengucapan Jawa diucapkan secara retrofleks (lidah ditarik menekuk ke belakang langit-langit keras).",
    vocab: [
      { word: "Buku", meaning: "Buku" },
      { word: "Omah", meaning: "Rumah" },
      { word: "Sekolahan", meaning: "Sekolah" },
      { word: "Banyu", meaning: "Air" }
    ],
    idiom: "Ngganteng-ngganteng kok kemproh",
    idiomMeaning: "Tampan rupawan namun jorok",
    idiomExp: "Sindiran gurauan sehari-hari untuk mengingatkan agar selalu peduli kebersihan diri dan kerapian lingkungan sekitar.",
    businessPhrase: "Kula kersa masrahaken laporan asil sadean kerajinan bathik saking para pengrajin daerah.",
    businessPhraseTr: "Saya hendak menyerahkan laporan hasil penjualan kerajinan batik dari para pengrajin daerah.",
    literatureExcerpt: "Mulat sarira angrasa wani, rumangsa melu handarbeni, wajib melu nggondheli...",
    literatureAuthor: "Raden Mas Said"
  },
  pap: {
    phonetics: "Melayu Papua mengandalkan intonasi bernada tegas, penyisipan vokal pendek, kontraksi gramatikal cepat, serta pemakaian dialek ekspresif.",
    char1: "Partikel penekanan rasa 'kah' dan 'to'",
    char2: "Kontraksi kata seperti 'ko' (kamu) dan 'sa' (saya)",
    easyPhrase: "Belajar bicara Papua bikin hati senang sekali",
    easyPhraseTr: "Learning to speak Papuan dialect makes the heart very happy",
    easyQuizQ: "Apakah makna kontraksi kata 'sa' dan 'ko' dalam percakapan akrab Melayu Papua?",
    easyQuizOpts: ["Saya dan Kamu", "Satu dan Dua", "Sana dan Sini", "Sapu dan Kotak"],
    easyQuizAns: 0,
    easyQuizExp: "'Sa' merupakan pemendekan dari kata 'saya' dan 'ko' disingkat dari 'kamu' dalam dialek percakapan akrab Papua.",
    vocab: [
      { word: "Buku", meaning: "Buku" },
      { word: "Rumah", meaning: "Rumah" },
      { word: "Sekolah", meaning: "Sekolah" },
      { word: "Air", meaning: "Air" }
    ],
    idiom: "Tra kosong",
    idiomMeaning: "Sangat hebat / tidak kosong (berisi & berkualitas)",
    idiomExp: "Ungkapan apresiasi atau pujian tinggi untuk seseorang yang menunjukkan kemampuan mumpuni.",
    businessPhrase: "Tong musti kumpul hasil penjualan noken supaya bisa bantu ekonomi mama-mama di pasar.",
    businessPhraseTr: "Kita harus mengumpulkan hasil penjualan tas noken agar dapat membantu perekonomian ibu-ibu di pasar.",
    literatureExcerpt: "Papua, tanahku yang kaya raya. Tempat sa lahir dan dibesarkan oleh cinta hutan rimba...",
    literatureAuthor: "Nyanyian Rakyat Papua"
  },
  mc: {
    phonetics: "Bahasa Minangkabau kental dengan pelafalan konsonan letup, vokal ganda akhir seperti 'au' dan akhiran vokal yang digeser ke huruf 'o'.",
    char1: "Akhiran 'a' diubah miring ke 'o' (seperti 'apa' jadi 'apo')",
    char2: "Akhiran kata 'ang' (seperti 'sajak' jadi 'sajak')",
    easyPhrase: "Rancak bana baraja baso Minang ko sanak",
    easyPhraseTr: "Sangat indah belajar Bahasa Minang ini wahai saudara",
    easyQuizQ: "Perubahan fonem ujung kata apakah yang paling khas pada Bahasa Minang dibanding Indonesia?",
    easyQuizOpts: ["Huruf 'a' akhir berganti suara menjadi 'o'", "Huruf 'u' akhir berganti miring ke 'e'", "Semua vokal ditiadakan senyap", "Konsonan diletupkan keras sekali"],
    easyQuizAns: 0,
    easyQuizExp: "Karakteristik kognitif Bahasa Minang salah satunya adalah transformasi vokal 'a' akhir kata dalam Bahasa Indonesia menjadi vokal 'o' pelan.",
    vocab: [
      { word: "Buku", meaning: "Buku" },
      { word: "Rumah", meaning: "Rumah" },
      { word: "Sakolah", meaning: "Sekolah" },
      { word: "Aia", meaning: "Air" }
    ],
    idiom: "Gadang ota",
    idiomMeaning: "Omong besar / membual hampa tanpa bukti",
    idiomExp: "Sebutan satire Minang bagi orang yang suka berbicara muluk-muluk, penuh fantasi, namun miskin dalam tindakan nyata.",
    businessPhrase: "Kito musti baretong rancak-rancak untuak mambagi hasil ladang sawah kito.",
    businessPhraseTr: "Kita harus berhitung dengan baik dan musyawarah untuk membagi hasil panen ladang padi kita.",
    literatureExcerpt: "Pikiran rang Minang laksana aia mengalir, batinnyo kokoh laksana gunuang marapi...",
    literatureAuthor: "Sastra Tradisional Minang"
  },
  th: {
    phonetics: "Bahasa Thai memiliki lima sistem nada utama (tonal language) dan penulisan karakter berlekuk melengkung indah.",
    char1: "Sistem Tonal (nada naik, jatuh, datar, rendah, tinggi)",
    char2: "Penulisan konsonan 'ก' (ko kai)",
    easyPhrase: "Rian phasa thai sanuk mak khrap",
    easyPhraseTr: "Belajar Bahasa Thai sangat menyenangkan sekali",
    easyQuizQ: "Berapakah jumlah tingkatan nada tonal utama dalam Bahasa Thai?",
    easyQuizOpts: ["5 Nada", "3 Nada", "7 Nada", "Tidak menggunakan nada"],
    easyQuizAns: 0,
    easyQuizExp: "Bahasa Thai memiliki 5 nada (tones): datar (mid), rendah (low), jatuh (falling), tinggi (high), dan naik (rising).",
    vocab: [
      { word: "Nang-sue", meaning: "Buku" },
      { word: "Baan", meaning: "Rumah" },
      { word: "Rong-rian", meaning: "Sekolah" },
      { word: "Nam", meaning: "Air" }
    ],
    idiom: "Phak-chi-roi-na",
    idiomMeaning: "Menghias permukaan (Bagian luarnya saja yang tampak cantik)",
    idiomExp: "Harfiah berarti 'menaburkan daun ketumbar di atas makanan'. Kiasan untuk tindakan polesan luar agar terlihat beres padahal dalamnya berantakan.",
    businessPhrase: "Rao tong pra-prueng krabuan-kan phalit pheua torm-snong khwam-tong-kan khong talat.",
    businessPhraseTr: "Kita wajib menyempurnakan proses produksi guna memenuhi tuntutan pasar modern.",
    literatureExcerpt: "Chao praya lai rrin rrueng, mueang luhur man khuan than, phan nam lai saen sai...",
    literatureAuthor: "Sunthorn Phu"
  },
  jp: {
    phonetics: "Bahasa Jepang memiliki pelafalan moraik stabil, aksen tinggi rendah (pitch accent), dan tiga jenis sistem aksara penulisan terhormat.",
    char1: "Suku kata aksara Kana (Hiragana & Katakana)",
    char2: "Pelafalan bunyi vokal ganda (Chōon)",
    easyPhrase: "Nihongo o manabu no wa totemo tanoshii desu",
    easyPhraseTr: "Belajar Bahasa Jepang itu sangatlah menyenangkan sekali",
    easyQuizQ: "Manakah aksara yang dipakai khusus untuk menulis kata serapan asing dalam Bahasa Jepang?",
    easyQuizOpts: ["Katakana", "Hiragana", "Kanji kuno", "Romaji saja"],
    easyQuizAns: 0,
    easyQuizExp: "Katakana digunakan khusus untuk menulis istilah serapan (gairaigo), nama warga asing, serta onomatope dalam ejaan Jepang.",
    vocab: [
      { word: "Hon (本)", meaning: "Buku" },
      { word: "Ie (家)", meaning: "Rumah" },
      { word: "Gakkō (学校)", meaning: "Sekolah" },
      { word: "Mizu (水)", meaning: "Air" }
    ],
    idiom: "Neko o kaburu",
    idiomMeaning: "Berpura-pura manis / menyembunyikan sifat asli",
    idiomExp: "Harfiah berarti 'memakai penyamaran kucing'. Julukan bagi orang yang bersikap sangat alim, patuh, atau pemalu di depan publik padahal aslinya pemberani.",
    businessPhrase: "Kisha no gijutsu o donyū shi, kyōdo de shinseihin o kaihatsu shitai to kangaete orimasu.",
    businessPhraseTr: "Kami berencana mengadopsi teknologi perusahaan Anda untuk bersama-sama mengembangkan produk baru.",
    literatureExcerpt: "Kuni no sakai no nagai tonneru o nukeru to yukiguni de atta. Yoru no soko ga shiroku natta...",
    literatureAuthor: "Yasunari Kawabata"
  },
  zh: {
    phonetics: "Bahasa Mandarin memiliki empat nada vokal utama (tonal) dan satu nada netral yang mutlak berkuasa penuh mengubah makna dasar karakter.",
    char1: "4 Tonal Infleksi (datar, naik, meliuk, jatuh)",
    char2: "Suku kata inisial Pinyin 'zh', 'ch', 'sh'",
    easyPhrase: "Xuéxí hànyǔ duì wǒ lái shuō hěn yǒuqù",
    easyPhraseTr: "Belajar Bahasa Mandarin sangatlah menarik bagiku",
    easyQuizQ: "Berbeda nada maka berbeda arti. Suku kata 'mā' (nada 1 datar) dalam Pinyin bermakna...",
    easyQuizOpts: ["Ibu", "Rami/Ganja", "Kuda", "Memaki"],
    easyQuizAns: 0,
    easyQuizExp: "Dalam nada Mandarin: mā (nada 1) = ibu, má (nada 2) = rami, mǎ (nada 3) = kuda, mà (nada 4) = memaki.",
    vocab: [
      { word: "Shū (书)", meaning: "Buku" },
      { word: "Fángzi (房子)", meaning: "Rumah" },
      { word: "Xuéxiào (学校)", meaning: "Sekolah" },
      { word: "Shuǐ (水)", meaning: "Air" }
    ],
    idiom: "Huàshétiānzú",
    idiomMeaning: "Melukis kaki ular (Berlebih-lebihan tidak berguna)",
    idiomExp: "Berasal dari kisah pelukis yang kalah taruhan karena menambah lukisan kaki pada ular, bermakna melakukan pekerjaan sia-sia yang merusak keindahan asli.",
    businessPhrase: "Wǒmen xūyào jiaqiáng kahuò qúdào kòngzhì, lái tígāo bǎozhàng liàn wěndìng xìng.",
    businessPhraseTr: "Kita perlu memperkuat kendali saluran logistik guna menjamin stabilitas rantai pasok kita.",
    literatureExcerpt: "Dào kě dào, fēi cháng dào. Míng kě míng, fēi cháng míng. Wú míng tiān dì zhī shǐ...",
    literatureAuthor: "Laozi"
  }
};

function createExtendedUnitsForLanguage(lang: LanguageCurriculum): LanguageUnit[] {
  const { code, name, flag, units: originalUnits } = lang;
  const spec = LANGUAGE_SPECIFICS[code] || LANGUAGE_SPECIFICS["en"];

  const origU1 = originalUnits.find(u => u.id.endsWith("-u1")) || originalUnits[0];
  const origU2 = originalUnits.find(u => u.id.endsWith("-u2")) || originalUnits[1] || origU1;
  const origU3 = originalUnits.find(u => u.id.endsWith("-u3")) || originalUnits[2] || origU2;
  const origU4 = originalUnits.find(u => u.id.endsWith("-u4")) || originalUnits[3] || origU3;
  const origU5 = originalUnits.find(u => u.id.endsWith("-u5")) || originalUnits[4] || origU4;
  const origU6 = originalUnits.find(u => u.id.endsWith("-u6")) || originalUnits[5] || origU5;

  const result: LanguageUnit[] = [];

  // Unit 1: Fonetik & Karakter Dasar (Tingkat Bayi)
  result.push({
    id: `${code}-u1`,
    title: `Unit 1: Fonetik & Karakter Dasar (Tingkat Bayi)`,
    miniTitle: "Fonetik",
    level: "Pemula",
    shortDesc: "Langkah terawal: Pahami sistem bunyi, artikulasi lidah, dan simbol tulisan abjad.",
    content: `### Unit 1: Fonetik & Karakter Dasar (${name}) ${flag}

Selamat datang di Tingkat Bayi! Di sini kita mempelajari cara memproduksi bunyi asli, penekanan suara (stress), vokal murni, dan karakter unik dari sudut pandang penutur asli.

#### Panduan Resonansi Bunyi
- **Karakteristik**: ${spec.phonetics}
- **Bunyi Utama 1**: ${spec.char1}
- **Bunyi Utama 2**: ${spec.char2}`,
    examplePhrase: spec.easyPhrase,
    examplePhraseTranslation: spec.easyPhraseTr,
    quiz: {
      question: spec.easyQuizQ,
      options: spec.easyQuizOpts,
      answerIndex: spec.easyQuizAns,
      explanation: spec.easyQuizExp
    }
  });

  // Unit 2: Tata Bahasa Dasar (Tingkat Pemula)
  result.push({
    id: `${code}-u2`,
    title: `Unit 2: Tata Bahasa Dasar (Tingkat Pemula)`,
    miniTitle: "Sintaks",
    level: "Pemula",
    shortDesc: `Mempelajari subjek kata ganti, struktur kalimat dasar SVO, serta identitas pelaku.`,
    content: `### Unit 2: Struktur Sintaks & Kata Ganti (${name})

Pondasi utama menyusun kalimat adalah memahami kata ganti subjek dan predikat pelengkap kalimat secara serasi.

#### Kata Ganti Subjek Utama
- **Saya / Kami**: Menunjuk diri sendiri.
- **Kamu / Mereka**: Menunjuk lawan bicara atau kelompok.
- **Dia / Ia**: Kata ganti orang ketiga laki-laki/perempuan/benda.

#### Karakteristik Grammar
${spec.grammarDesc || "Bahasa ini mementingkan keharmonisan kalimat dan keselarasan urutan kata dasar SVO."}`,
    examplePhrase: spec.vocab[0] ? `${spec.vocab[0].word} ${spec.vocab[1].word}` : "I study everyday",
    examplePhraseTranslation: spec.vocab[0] ? `Menyebutkan kata dasar: ${spec.vocab[0].meaning} dan ${spec.vocab[1].meaning}` : "Saya belajar setiap hari",
    quiz: {
      question: `Manakah susunan struktur kata ganti pelaku yang paling sesuai dalam menyusun gagasan aktif di Bahasa ${name}?`,
      options: [
        `Menyisipkan subjek pelindung kata di awal kalimat`,
        `Meletakkan kata verba sebelum pengucapan objek utama saja`,
        `Mengikuti panduan tatanan SVO (Subject-Verb-Object)`,
        `Menghapus seluruh kata ganti orang`
      ],
      answerIndex: 2,
      explanation: "Keumuman sintaks bahasa modern bersandar pada struktur Subject-Verb-Object (SVO) untuk menyuarakan perbuatan aktif."
    }
  });

  // Unit 3: Angka, Waktu, & Kalender Mingguan
  result.push({
    id: `${code}-u3`,
    title: `Unit 3: Angka, Waktu, & Kalender Mingguan`,
    miniTitle: "Waktu",
    level: "Pemula",
    shortDesc: `Kuasai angka kardinal, penanggalan bulanan, hari-hari sepekan, dan membaca jam mekanis.`,
    content: `### Unit 3: Sistem Bilangan & Waktu (${name})

Mempelajari cara menanyakan waktu, berhitung belanjaan kasar, dan merencanakan janji harian.

#### Konsep Angka & Satuan waktu
- **Sistem Bilangan**: ${spec.numbersDesc || "Menggunakan rantaian bilangan teratur berbasis sepuluh desimal dasar."}
- **Kata Tanya Hari**: Menanyakan tanggal atau jadwal kegiatan.
- **Satuan Hari**: Senin sampai Minggu secara laras.`,
    examplePhrase: spec.vocab[3] ? `${spec.vocab[3].word}` : "One two three four five",
    examplePhraseTranslation: spec.vocab[3] ? `Kata dasar: ${spec.vocab[3].meaning}` : "Satu dua tiga empat lima",
    quiz: {
      question: `Mengapa penguasaan format penanggalan dan angka kardinal sangat disarankan di Tingkat Pemula?`,
      options: [
        "Agar bisa melakukan transaksi keuangan harian dan konfirmasi jadwal waktu",
        "Untuk membaca naskah puisi klasik",
        "Guna menyusun pidato kenegaraan",
        "Untuk lulus ujian penerjemah tingkat tinggi"
      ],
      answerIndex: 0,
      explanation: "Membaca jam, hari, dan menghitung nominal belanjaan dasar adalah pilar survival paling penting saat berada di luar negeri."
    }
  });

  // Unit 4: Sapaan Akbar (Original Unit 1)
  result.push({
    ...origU1,
    id: `${code}-u4`,
    title: `Unit 4: Sapaan Akbar & Memperkenalkan Diri`,
    miniTitle: "Sapaan",
    level: "Pemula"
  });

  // Unit 5: Tanya Arah (Original Unit 2)
  result.push({
    ...origU2,
    id: `${code}-u5`,
    title: `Unit 5: Tanya Arah & Komunikasi Tempat Wisata`,
    miniTitle: "Sosial",
    level: "Pemula"
  });

  // Unit 6: Bersantap (Original Unit 3)
  result.push({
    ...origU3,
    id: `${code}-u6`,
    title: `Unit 6: Bersantap & Pemesanan Kuliner Warung`,
    miniTitle: "Kuliner",
    level: "Pemula"
  });

  // Unit 7: Kosakata Deskriptif (Tingkat Menengah)
  result.push({
    id: `${code}-u7`,
    title: `Unit 7: Kosakata Deskriptif (Tingkat Menengah)`,
    miniTitle: "Benda",
    level: "Menengah",
    shortDesc: `Memperkaya kosakata benda sekitar kita di rumah, ruang kerja, dan cara memberi warna.`,
    content: `### Unit 7: Benda-Benda Terdekat & Sifat Deskriptif (${name})

Belajar menunjuk objek secara deiktis, menambahkan kata keterangan warna, ukuran, dan kegunaan barang.

#### Kosakata Benda Inti
- **Buku**: ${spec.vocab[0]?.word} (${spec.vocab[0]?.meaning})
- **Rumah**: ${spec.vocab[1]?.word} (${spec.vocab[1]?.meaning})
- **Sekolah**: ${spec.vocab[2]?.word} (${spec.vocab[2]?.meaning})
- **Air**: ${spec.vocab[3]?.word} (${spec.vocab[3]?.meaning})`,
    examplePhrase: spec.vocab[0] ? `I love my new ${spec.vocab[0].word.toLowerCase()}` : "These objects are close to me",
    examplePhraseTranslation: spec.vocab[0] ? `Saya menyukai ${spec.vocab[0].meaning.toLowerCase()} baru milik saya` : "Benda-benda ini sangat dekat dengan saya",
    quiz: {
      question: `Manakah kosakata dalam Bahasa ${name} yang menyatakan '${spec.vocab[1]?.meaning || "Rumah"}'?`,
      options: [
        spec.vocab[1]?.word || "House",
        spec.vocab[0]?.word || "Book",
        "Random",
        "WrongAnswer"
      ],
      answerIndex: 0,
      explanation: `Kata '${spec.vocab[1]?.word || "House"}' adalah sinonim langsung dari '${spec.vocab[1]?.meaning || "Rumah"}' yang kerap ditemui sehari-hari.`
    }
  });

  // Unit 8: Kamus Anggota Tubuh & Klinik Kesehatan
  result.push({
    id: `${code}-u8`,
    title: `Unit 8: Kamus Anggota Tubuh & Klinik Kesehatan`,
    miniTitle: "Medis",
    level: "Menengah",
    shortDesc: `Kosakata nama anatomi tubuh manusia, menjelaskan gejala sakit ringan, dan meminta pertolongan medis.`,
    content: `### Unit 8: Anatomi Tubuh & Keluhan Medis Sederhana (${name})

Membantu Anda bersiap menghadapi keadaan darurat kesehatan, berkomunikasi dengan dokter, atau membeli obat pencegah demam di apotek.

#### Anggota Tubuh Kunci
- **Kepala / Mata**: Organ pengolah kognisi dan penglihatan.
- **Tangan / Kaki**: Untuk beraktivitas fisik dinamis.
- **Jantung / Lambung**: Organ internal vital.`,
    examplePhrase: "Please help me point out the head",
    examplePhraseTranslation: "Tolong bantu saya menunjukkan kepala",
    quiz: {
      question: "Mengapa mempelajari nama bagian tubuh sangat direkomendasikan saat berkunjung ke wilayah asing?",
      options: [
        "Agar bisa memaparkan letak rasa sakit atau cidera fisik secara presisi kepada petugas medis",
        "Hanya untuk melengkapi ujian teori",
        "Guna memperindah lukisan potret manusia",
        "Agar bisa menari bersama penari adat"
      ],
      answerIndex: 0,
      explanation: "Menyebutkan organ tubuh yang terasa sakit (seperti kepala atau lambung) akan mempercepat penanganan medis darurat."
    }
  });

  // Unit 9: Karir Modern (Original Unit 4)
  result.push({
    ...origU4,
    id: `${code}-u9`,
    title: `Unit 9: Karir Modern, Kantor, & Bisnis Dasar`,
    miniTitle: "Bisnis",
    level: "Menengah"
  });

  // Unit 10: Pengungkapan Pendapat (Original Unit 5)
  result.push({
    ...origU5,
    id: `${code}-u10`,
    title: `Unit 10: Pengungkapan Pendapat & Argumentasi Opini`,
    miniTitle: "Opini",
    level: "Menengah"
  });

  // Unit 11: Sekolah, Pendidikan, & Kompetensi Belajar
  result.push({
    id: `${code}-u11`,
    title: `Unit 11: Sekolah, Pendidikan, & Kompetensi Belajar`,
    miniTitle: "Kampus",
    level: "Menengah",
    shortDesc: `Mendalami interaksi akademik, kosakata ruang kelas, mata pelajaran sains, ujian, dan gelar kelulusan.`,
    content: `### Unit 11: Dunia Pendidikan & Aktivitas Kampus (${name})

Meningkatkan kompetensi berbicara di lingkungan akademik, mendiskusikan tugas kelompok, sains, riset ilmiah, dan beasiswa internasional.

#### Kosakata Akademik
- **Mata Pelajaran**: Matematika, Sejarah, Sains, dan Seni.
- **Tugas / Ujian**: Mengukur tingkat pemahaman dan pencapaian akademik.
- **Perpustakaan**: Pusat riset dan melahap informasi luhur.`,
    examplePhrase: "The university education has rich resources",
    examplePhraseTranslation: "Pendidikan universitas memiliki sumber daya yang melimpah",
    quiz: {
      question: "Manakah perbuatan di bawah ini yang paling lazim dilakukan siswa di dalam perpustakaan kampus?",
      options: [
        "Membaca buku referensi dengan khidmat tanpa membuat kegaduhan",
        "Bermain sepak bola lapangan",
        "Tidur pulas menyalakan musik keras-keras",
        "Memasak ramen instan pedas"
      ],
      answerIndex: 0,
      explanation: "Perpustakaan adalah tempat sakral membaca dan menelaah buku literatur, wajib tenang dan tertib."
    }
  });

  // Unit 12: Wisata, Destinasi Perjalanan, & Geografi
  result.push({
    id: `${code}-u12`,
    title: `Unit 12: Wisata, Destinasi Perjalanan, & Geografi`,
    miniTitle: "Wisata",
    level: "Menengah",
    shortDesc: `Percakapan seputar check-in hotel, merencanakan tur, membeli cinderamata, dan menilik geografi bumi.`,
    content: `### Unit 12: Tur Perjalanan Wisata & Keajaiban Alam (${name})

Membimbing Anda berpetualang menjelajah kota-kota bersejarah, memesan kamar hotel, dan berinteraksi asyik dengan pemandu lokal.

#### Istilah Hotel & Penginapan
- **Pemesanan (Reservation)**: Mengunci akomodasi secara aman sebelum mendarat.
- **Pariwisata / Lokasi**: Candi, museum, pegunungan salju, atau pantai tropis yang menakjubkan.`,
    examplePhrase: "I would like to check in my hotel room",
    examplePhraseTranslation: "Saya hendak check-in memesan kamar hotel saya",
    quiz: {
      question: "Sebelum melakukan rekreasi wisata ke luar negeri, dokumen administratif manakah yang wajib dipersiapkan terlebih dahulu?",
      options: [
        "Paspor resmi penunjuk dokumen identitas kenegaraan internasional",
        "Sertifikat kepemilikan tanah kebun",
        "Kartu keanggotaan perpustakaan lokal",
        "Struk belanja warung nasi goreng"
      ],
      answerIndex: 0,
      explanation: "Paspor adalah tanda pengenal resmi legal internasional yang wajib dimiliki ketika menginjakkan kaki di negara lain."
    }
  });

  // Unit 13: Cuaca, Musim, & Fenomena Alam Raya
  result.push({
    id: `${code}-u13`,
    title: `Unit 13: Cuaca, Musim, & Fenomena Alam Raya`,
    miniTitle: "Cuaca",
    level: "Master",
    shortDesc: `Diskusi meteorologi: curah hujan, salju dingin, badai gurun, pergantian musim, dan korelasi iklim global.`,
    content: `### Unit 13: Iklim Esensial & Cuaca Musiman (${name})

Kuasai cara memprediksi prakiraan cuaca, mendeskripsikan suhu udara, dan merespon perubahan musim sepanjang tahun.

#### Pembagian Empat Musim Klasik
- **Musim Semi & Panas**: Masa bercocok tanam dan liburan ceria penuh cahaya matahari.
- **Musim Gugur & Dingin**: Hembusan angin beku, tumpukan salju putih, dan gugurnya dedaunan jingga.`,
    examplePhrase: "The winter brings white snow on the mountains",
    examplePhraseTranslation: "Musim dingin membawa timbunan salju putih di pegunungan luhur",
    quiz: {
      question: "Apakah dampak pergantian cuaca dingin ekstrem terhadap pola pakaian warga lokal?",
      options: [
        "Memakai mantel bulu tebal, syal leher hangat, dan pelindung telinga dari angin es",
        "Cukup melilitkan handuk basah di pinggang",
        "Menggunakan pakaian renang tipis menerobos badai salju",
        "Tidak mengenakan alas kaki di jalanan beku"
      ],
      answerIndex: 0,
      explanation: "Musim dingin dengan suhu di bawah nol derajat menuntut penggunaan berlapis serat mantel penghangat wool tebal."
    }
  });

  // Unit 14: Kiasan, Slang Sehari-Hari & Istilah Idiom
  result.push({
    id: `${code}-u14`,
    title: `Unit 14: Kiasan, Slang Sehari-Hari & Istilah Idiom`,
    miniTitle: "Idiom",
    level: "Master",
    shortDesc: `Menguasai ungkapan metaforis lokal agar terdengar sealami penutur asli yang tumbuh besar di sana.`,
    content: `### Unit 14: Ungkapan Idiom Kaya Filosofi Kehidupan (${name})

Idiom mencerminkan kearifan narasi sejarah dan kelucuan kiasan masyarakat lokal pembentuk budaya tutur.

#### Idiom Kultural Unggulan
- **Metafora**: "${spec.idiom}"
- **Arti Maknawi**: ${spec.idiomMeaning}
- **Historis Asal-Usul**: ${spec.idiomExp}`,
    examplePhrase: spec.idiom ? `That idiom is a ${spec.idiom.toLowerCase()}` : "Speak like native master",
    examplePhraseTranslation: spec.idiom ? `Kiasan tersebut bermakna: ${spec.idiomMeaning.toLowerCase()}` : "Berbicara sealami ahli master",
    quiz: {
      question: `Apakah guna menyisipkan peribahasa idiom seperti '${spec.idiom}' dalam obrolan santai kita dengan rekan bisnis asing?`,
      options: [
        "Membuat obrolan lebih luwes, intim, humoris, dan menunjukkan kedalaman apresiasi kita terhadap bahasa mereka",
        "Untuk mempercepat durasi rapat kerja perdagangan",
        "Agar rekan bisnis menjadi kebingungan setengah mati",
        "Hanya untuk menyombongkan hafalan semata"
      ],
      answerIndex: 0,
      explanation: "Mengutarakan idiom secara tepat menunjukkan penghargaan mendalam atas keluhuran dinamika sastra bahasa lokal."
    }
  });

  // Unit 15: Sastra Kuno & Sajak Filosofis Dinasti (Original Unit 6)
  result.push({
    ...origU6,
    id: `${code}-u15`,
    title: `Unit 15: Sastra Kuno & Sajak Filosofis Dinasti`,
    miniTitle: "Sastra",
    level: "Master",
    content: `### Khazanah Sastra Tinggi Kuno (${name})

Eksplorasi karya tulis fiksi, drama puisi, fragmen lakon teater luhur, dan hikayat kuno yang diwariskan dari para pujangga besar.

#### Prosa & Kutipan Legendaris
- **Kutipan Karya**: "${spec.literatureExcerpt}"
- **Disusun Oleh**: ${spec.literatureAuthor}

#### Keindahan Makna Simbolis
Sastra melampaui logika tata bahasa kaku; ia menggali relung emosi, kontemplasi eksistensi diri, kepedihan cinta, perjuangan patriotisme, serta kesunyian malam di bawah naungan sinar rembulan.`
  });

  // Unit 16: Bisnis Internasional & Negosiasi Tingkat Tinggi (Tingkat Master)
  result.push({
    id: `${code}-u16`,
    title: `Unit 16: Bisnis Internasional & Negosiasi Tingkat Tinggi (Master)`,
    miniTitle: "Global",
    level: "Master",
    shortDesc: `Mengadopsi kosakata korporasi multi-nasional, perundingan ekspor impor, struktur saham, dan peluncuran produk global.`,
    content: `### Unit 16: Komunikasi Korporat & Diplomasi Perdagangan Dunia (${name})

Mencapai kompetensi mutlak (Tingkat Master): Menganalisis pasar internasional, menyusun kontrak hukum komersial, bernegosiasi merger, dan berekspansi bisnis global.

#### Frasa Bisnis Kunci
- **Frasa Strategis**: "${spec.businessPhrase}"
- **Makna Terjemahan**: "${spec.businessPhraseTr}"
- **Topik Pembahasan**: Negosiasi margin profit, alokasi sumber daya bernilai mumpuni, mitigasi resiko keuangan.`
    ,
    examplePhrase: spec.businessPhrase,
    examplePhraseTranslation: spec.businessPhraseTr,
    quiz: {
      question: `Manakah strategi diplomasi yang paling disarankan saat menghadapi kebuntuan perundingan kontrak ekspor-impor internasional?`,
      options: [
        "Mencari titik temu kompromi win-win solution yang saling melipatgandakan kesejahteraan kedua belah pihak",
        "Meluncurkan ancaman boikot bersenjata",
        "Meninggalkan meja perundingan sambil menggebrak lembaran berkas",
        "Mendiamkan lawan bicara tanpa memberi kabar selama setahun"
      ],
      answerIndex: 0,
      explanation: "Tingkat Master mengedepankan logika diplomasi rasional win-win solution guna menjaga stabilitas rantai kemakmuran jangka panjang."
    }
  });

  return result;
}

export const LANGUAGES_CURRICULUM: LanguageCurriculum[] = BASE_LANGUAGES_CURRICULUM.map(lang => {
  return {
    ...lang,
    units: createExtendedUnitsForLanguage(lang)
  };
});

export const WORLD_HISTORY_ARCHIVE: HistoricalBook[] = [
  {
    id: "hist-1",
    title: "Alexander Agung & Penaklukan Persia",
    author: "Prof. Marcus Aurelius Jr.",
    era: "Kuno",
    year: "334 SM",
    coverColor: "from-amber-700 to-yellow-900",
    shortSummary: "Kisah epik penaklukan militer termuda dalam sejarah dunia, menunggangi kudanya Bucephalus menantang takdir kekaisaran Darius.",
    detailedContent: `Alexander III dari Makedonia, yang kemudian dikenal sebagai **Alexander Agung**, naik takhta pada usia yang sangat muda, 20 tahun, setelah kematian ayahnya, Philip II. Dilatih secara intelektual langsung oleh filsuf legendaris **Aristoteles**, Alexander menggabungkan taktik penempuran brilian dengan kecintaan mendalam pada filsafat dan sains.

Pada tahun 334 SM, ia menyeberangi Hellespont menuju Asia Minor dengan membawa sekitar 40.000 pasukan. Tujuan utamanya sangat ambisius: menantang dan meruntuhkan kekuasaan Kekaisaran Persia Achaemenid yang dipimpin oleh Raja Darius III.

#### Pertempuran Kunci
1. **Pertempuran Granicus (334 SM)**: Kemenangan taktis pertama di wilayah sungai Asia Minor, meloloskan baris pasukan Alexander menyusuri garis pantai.
2. **Pertempuran Issus (333 SM)**: Konfrontasi krusial di mana taktik kavaleri Makedonia mumpuni membuat formasi Darius kocar-kacir.
3. **Pemberontakan Tirus (332 SM)**: Penguasaan kota pulau berbenteng kokoh melalui reklamasi dermaga apung pengepungan spektakuler selama 7 bulan.
4. **Pertempuran Gaugamela (331 SM)**: Puncak kehancuran kekuatan Persia berjalan mutlak. Dengan struktur pergerakan baji kavaleri yang menusuk langsung ke poros tengah pertahanan Darius, Persia hancur total.

Alexander terus berderap ke timur melewati Bactria dan Sogdiana, melintasi pegunungan Hindu Kush hingga mencapai tepian Sungai Indus di India utara. Di sanalah pasukannya yang sudah bertahun-tahun berkelana dan didera kerinduan rumah menolak melanjutkan perjalanan (Garda Mutiny).

Alexander wafat misterius pada usia 32 tahun di Babilonia, meninggalkan imperium darat terluas yang membentang dari Yunani hingga perbatasan luhur India. Kematiannya menandai lahirnya **Era Helenistik**, era di mana budaya Yunani berdifusi mendalam dengan peradaban Timur Tengah, meletakkan dasar sains kosmopolitan masa depan.`
  },
  {
    id: "hist-2",
    title: "Julius Caesar & Runtuhnya Republik Roma",
    author: "Dr. Octavianus Gracchus",
    era: "Kuno",
    year: "49 SM",
    coverColor: "from-rose-800 to-stone-900",
    shortSummary: "Dari penyeberangan sungai legendaris Rubicon hingga insiden berdarah Idus Maret yang merubah takdir Republik Roma.",
    detailedContent: `Di pertengahan abad ke-1 SM, Republik Romawi mengalami guncangan internal tiada henti karena perang saudara sipil dan melebarnya kesenjangan sosial ekonomi. **Julius Caesar**, seorang jenderal aristokrat kharismatik yang sukses menaklukkan suku-suku Galia (Perancis modern), menjadi ancaman politik bagi kekuasaan oligarki Senat Roma yang dipimpin oleh Pompeius Magnus.

Faksi Senat yang khawatir akan dominasi mutlak Caesar menuntutnya meletakkan komando pasukan legionnya sebelum memasuki gerbang batas suci kota Roma. Menolak tunduk pada tirani politisi Senat, pada malam **10 Januari 49 SM**, Caesar melakukan tindakan makar revolusioner.

#### Menyeberangi Sungai Rubicon
Caesar memimpin pasukan setianya menyeberangi **Sungai Rubicon**, batas sakral demiliterisasi utara republik Romawi. Dalam rute penyeberangan beresiko mati tersebut, ia mengucapkan maklumat takdir legendaris: 

> *"Alea iacta est"* (Dadu telah dilemparkan / Nasi telah menjadi bubur).

Langkah agresif ini memicu pecahnya perang saudara hebat berdarah di seluruh semenanjung Mediterania. Caesar mengejar musuh-musuhnya dari Spanyol, Yunani, hingga ke singgasana Dinasti Ptolemeus di Mesir kuno (tempat ia bersua dengan Cleopatra). Setelah memenangkan perang sipil, Caesar dinobatkan Senat Romawi sebagai **Dictator Perpetuo** (Diktator Seumur Hidup).

#### Idus Maret & Berakhirnya Republik
Kondisi kediktatoran Caesar memicu keprihatinan mendalam para senator loyalis republik yang dipimpin oleh Marcus Junius Brutus dan Gaius Cassius Longinus. Pada hari sakral **15 Maret 44 SM (Idus Maret)**, Caesar dikepung dan ditusuk secara keji sebanyak 23 kali di aula teater Pompeius dalam jalannya sidang Senat.

Kendati tewas berlumuran darah di kaki patung saingannya Pompeius, cita-cita pembunuhan Caesar untuk memulihkan republik romawi gagal total. Rakyat kelas bawah mengamuk menentang para senator pengkhianat. Peristiwa tragis ini melontarkan babak perang saudara baru yang berakhir dengan berkuasanya anak angkat Caesar, **Gaius Octavianus**, sebagai Kaisar Romawi pertama bergelar **Augustus**, menandai runtuhnya republik lama dan bangkitnya kejayaan imperium monarki Kekaisaran Roma.`
  },
  {
    id: "hist-3",
    title: "Misteri Piramida Agung Giza & Firaun Mesir",
    author: "Elena Carter, Ph.D.",
    era: "Kuno",
    year: "2560 SM",
    coverColor: "from-yellow-650 to-amber-900",
    shortSummary: "Menelusuri mahakarya arsitektur kuno firaun Khufu, sebuah struktur keabadian kosmologi buatan tangan perunggu.",
    detailedContent: `Berdiri kokoh di atas dataran tinggi berbatu Giza, **Piramida Agung Giza** merupakan monumen tertinggi di bumi buatan tangan manusia selama lebih dari 3.800 tahun. Dibangun sebagai mausoleum suci makam abadi untuk **Firaun Khufu** (Kaisar Cheops dalam versi bahasa Yunani) dari Dinasti Keempat Kerajaan Lama Mesir, piramida ini menyiratkan kemajuan teknik sipil dan ketepatan perhitungan astronomi Mesir kuno yang memukau.

Piramida ini dibangun menggunakan sekitar 2,3 juta bongkah batu kapur dan granit raksasa, dengan bobot rata-rata tiap balok mencapai 2,5 htg hingga 15 ton!

#### Ketepatan Matematika & Astronomis
- **Orientasi Kompas**: Sisi-sisi dasar piramida mengarah hampir sempurna tanpa cela ke arah mata angin utama (Utara, Selatan, Timur, Barat) dengan margin kesalahan kurang dari seperseratus derajat!
- **Korelasi Bintang**: Lorong interior dalam struktur piramida sejajar konstan mengarah langsung ke konstelasi rasi bintang Orion dan Bintang Polaris, menghantarkan transisi jiwa Firaun menyatu abadi ke surga kosmos.

Metode pengangkutan bongkah batu raksasa ini tanpa menggunakan roda (yang belum ditemukan pada skala masif saat itu) diselesaikan lewat sistem saluran kanal sungai Nil buatan yang ditarik menggunakan pelumas air sabun di atas landasan kereta seret kayu raksasa. 

Arsip papirus kuno yang ditemukan di laut merah membuktikan bahwa para pekerja pembangunan piramida bukanlah budak belian cambuk, melainkan barisan buruh konstruksi profesional terampil yang digaji layak, diberi logistik jatah makanan bergizi, dan diberikan asuransi pemakaman terhormat di dekat kawasan sakral monumen agung tersebut.`
  },
  {
    id: "hist-4",
    title: "Kejayaan Kekaisaran Bizantium",
    author: "Dr. Constantinos Palaeologus",
    era: "Pertengahan",
    year: "527 M",
    coverColor: "from-indigo-900 to-purple-800",
    shortSummary: "Bagaimana Roma Timur bertahan seribu tahun dari runtuhnya Roma Barat berkat dinding ganda Theodosius.",
    detailedContent: `Ketika Roma Barat runtuh pada abad ke-5 M tergilas serbuan invasi suku-suku Jermanik, separuh wilayah timur kekaisaran yang kaya yang dikenal sebagai **Kekaisaran Bizantium** (Kekaisaran Roma Timur) berhasil bertahan tangguh di Konstantinopel selama seribu tahun berikutnya.

Bizantium mencapai masa keemasan puncaknya di bawah roda pemerintahan **Kaisar Justinianus I** (berkuasa 527-565 M). Didampingi oleh permaisurinya yang cerdas **Theodora**, Justinianus melancarkan kampanye militer agung merebut kembali wilayah inti Italia, Afrika Utara, dan Spanyol selatan yang hilang.

#### Tiga Pilar Kejayaan Bizantium
1. **Kodifikasi Hukum Justinianus (Corpus Juris Civilis)**: Rekodifikasi komprehensif seluruh traktat hukum romawi klasik yang menjadi cetak biru hukum perdata modern benua Eropa saat ini.
2. **Kubah Hagia Sophia**: Pembangunan basilika katedral raksasa kubah gantung di Konstantinopel yang merupakan pencapaian arsitektur kristen ortodoks paling menakjubkan di dunia.
3. **Api Yunani (Greek Fire)**: Senjata pertahanan maritim raksasa misterius rahasia negara berupa cairan minyak pembakar yang menyembur hebat di atas air laut, mampu menghanguskan ratusan armada kapal pengepung.

Bizantium bertindak sebagai perisai tangguh Eropa timur dari aneka gempuran bangsa asing sepanjang abad pertengahan. Didekorasi oleh lukisan mosaik emas yang menyilaukan mata di dinding katedral ortodoks, Bizantium melestarikan naskah tulisan filsafat klasik sains Yunani-Romawi dari kepunahan zaman kegelapan Barat, sebuah warisan emas yang kelak diimpor menuju lahirlah era Renaissance di Italia.`
  },
  {
    id: "hist-5",
    title: "Zaman Keemasan Islam (The Golden Age)",
    author: "Prof. Tariq Al-Farabi",
    era: "Pertengahan",
    year: "786 M",
    coverColor: "from-emerald-800 to-teal-950",
    shortSummary: "Era kegemilangan ilmu sains, matematika astronomi, dan kedokteran di perpustakaan Baitul Hikmah Baghdad.",
    detailedContent: `Dimulai pada abad ke-8 M di bawah kekuasaan Kekhalifahan Abbasiyah di bawah kepemimpinan Khalifah **Harun Ar-Rasyid**, dunia Islam memicu revolusi keilmuan terbesar abad pertengahan yang berpusat di **Baitul Hikmah** (House of Wisdom) di Baghdad.

Baitul Hikmah berfungsi sebagai institusi perpustakaan raksasa penerjemahan naskah ilmiah Yunani, Sansekerta, Persia, dan Siria kuno secara masif ke dalam Bahasa Arab, disusul riset penemuan mutakhir teoretis.

#### Tokoh Ilmuwan & Penemuan Spektakuler
- **Muhammad bin Musa Al-Khwarizmi**: Bapak logika Aljabar (Algebra) dan peletak dasar aritmatika sistem angka desimal nol, yang namanya diserap dunia modern komputer sebagai kata dasar **Algoritma**.
- **Ibnu Sina (Avicenna)**: Penulis ensiklopedia kedokteran medis *The Canon of Medicine* yang menjadi buku rujukan kurikulum medis wajib akademi-akademi Eropa selama ratusan tahun.
- **Ibnu Al-Haytham (Alhazen)**: Bapak optika modern yang memformulasikan prinsip kerja lensa, kanta retina, kamera obscura, dan fondasi metodologi eksperimen sains empiris sistematis.

Zaman keemasan ini menginspirasi asimilasi multikultural yang damai di Andalusia (Spanyol Islam), tempat para ilmuwan Muslim, Kristen, dan Yahudi berkolaborasi memajukan kemanusiaan, mendirikan universitas pertama, menerjemahkan naskah kedokteran, mendesain navigasi astrolabe maritim, yang menghantarkan peradaban benua Eropa keluar dari zaman kegelapan intelektual.`
  },
  {
    id: "hist-6",
    title: "Kesatria Samurai & Keshogunan Kamakura",
    author: "Kenji Tanaka, Ph.D.",
    era: "Pertengahan",
    year: "1192 M",
    coverColor: "from-stone-800 to-red-950",
    shortSummary: "Kode etik kesatria Bushido, sejarah pedang katana, dan kegigihan pertahanan menahan invasi armada Mongol.",
    detailedContent: `Menjelang akhir abad ke-12 M di Jepang, kekuasaan aristokrat kekaisaran di Heian-kyo perlahan meredup seiring naiknya dominasi klan-klan militer daerah. Setelah memenangkan Perang Genpei yang meletus dahsyat, jenderal **Minamoto no Yoritomo** dinobatkan oleh kaisar sebagai **Sei-i Taishōgun** (Panglima Tertinggi), mendirikan sistem pemerintahan militer keshogunan pertama di **Kamakura**.

Di era inilah terbentuk faksi militer elit bernama **Samurai** yang mengabdi setia kepada tuan tanah (Daimyo) berlandaskan hukum tak tertulis **Bushido** (Jalan Kesatria).

#### Nilai Inti Bushido
- **Gi (Keadilan)**: Memiliki sikap lurus dalam bertindak adil.
- **Yu (Keberanian)**: Berani menghadapi maut tanpa gemetar.
- **Rei (Sopan Santun)**: Menghormat tiada cela kepada kawan maupun lawan tanding.
- **Meiyo (Kehormatan)**: Menjaga harga diri di atas segalanya, rela mati bunuh diri terhormat (Seppuku) jika terhina melanggar hukum kesatria.

#### Menahan Invasi Kublai Khan Mongol (1274 & 1281 M)
Ujian terbesar keshogunan samurai tiba saat kaisar China Mongol **Kublai Khan** meluncurkan ribuan bahtera perang menuntut Jepang takluk. Melawan senjata bubuk mesiu dan taktik formasi barbar penyerbu mongol, samurai bertaruh nyawa di benteng pantai Hakata. 

Di tengah desakan kritis, badai topan dahsyat misterius melanda menghantam hancur lebur ratusan armada kapal mongol. Bangsa Jepang mengapresiasi badai penyelamat ini sebagai **Kamikaze** (Angin Dewa), melambangkan kedigdayaan samurai tangguh melindungi kesucian bumi leluhur.`
  },
  {
    id: "hist-7",
    title: "Revolusi Industri & Lahirnya Dunia Modern",
    author: "Dr. Arthur Toynbee II",
    era: "Modern",
    year: "1760 M",
    coverColor: "from-slate-700 to-indigo-950",
    shortSummary: "Bagaimana roda uap mesin James Watt memicu transformasi urbanisasi perkakas tangan, merubah tatanan hidup global.",
    detailedContent: `Selama ribuan tahun sejarah manusia, perekonomian bumi bersandar mutlak pada bercocok tanam manual, tenaga traksi hewan domestik, dan perkakas tangan tradisional dari logam mentah. Pola hidup agraris lambat tersebut lenyap selamanya sejak meletusnya **Revolusi Industri** di Britania Raya pada pertengahan abad ke-18 M.

Pemicu utama revolusi ini merupakan modifikasi efisiensi penemuan **Mesin Uap** oleh jenius teknik **James Watt** pada tahun 1769, mengubah energi panas hasil batubara bakar menjadi gerakan kinetik putaran mekanis raksasa tanpa batas lelah.

#### Dampak Transformasi Masif
1. **Mekanisasi Tekstil**: Penggunaan alat tenun mekanis mesin menggantikan tenaga penenun manual tangan, melipatgandakan pasokan garmen dunia dalam hitungan hari.
2. **Revolusi Transportasi**: Lahirnya kereta api uap besi (Locomotive George Stephenson) dan kapal uap maritim yang memangkas waktu tempuh benua dari hitungan minggu menjadi hari.
3. **Urbanisasi Eksplosif**: Perpindahan jutaan kaum tani pedesaan menuju kota-kota pabrik cerobong asap hitam (seperti Manchester dan London) untuk bekerja sebagai lapisan buruh industri.

Meskipun Revolusi Industri memicu ketimpangan ekonomi, jam kerja kejam buruh anak-anak di pabrik, dan polusi udara awal pemanasan global, ia melambangkan titik balik paling revolusioner kemajuan teknologi material. Ia meletakkan dasar bagi dunia modern, sistem pasar kapitalisme bebas global, kemajuan standar kesehatan massal, dan lompatan dramatis kesejahteraan material umat manusia hari ini.`
  },
  {
    id: "hist-8",
    title: "Perang Dunia & Tata Dunia Baru (PBB)",
    author: "Prof. Harold Evans",
    era: "Modern",
    year: "1945 M",
    coverColor: "from-blue-900 to-slate-905",
    shortSummary: "Menganalisis konflik terdahsyat abad ke-20, kejatuhan fasisme, dan perumusan piagam perdamaian perserikatan bangsa-bangsa.",
    detailedContent: `Paruh pertama abad ke-20 M dicoreng oleh dua benturan konflik skala global paling menghancurkan dalam sejarah peradaban, melahirkan korban jiwa masif dari kalangan militer maupun warga sipil tak berdosa.

**Perang Dunia I (1914-1918)** dipicu oleh pertikaian aliansi Eropa, perlombaan imperialisme, dan pembunuhan putra mahkota Austria Franz Ferdinand di Sarajevo, melahirkan perang parit berlumpur statis berdarah yang menewaskan 20 juta jiwa.

**Perang Dunia II (1939-1945)** meletus dipicu oleh agresi ekspansionis fasisme totalitarian Adolf Hitler (Jerman Nazi), Benito Mussolini (Italia), dan kaisar militeristik Shōwa Jepang. Perang ini menyaksikan tragedi kemanusiaan paling mengerikan: kamp pemusnahan massal Holocaust Yahudi, pemerkosaan massal Nanking, dan debut senjata pemusnah massal bom atom di kota Hiroshima dan Nagasaki.

#### Kebangkitan Tata Dunia Baru (PBB)
Menyadari kehancuran kiamat peradaban jika konflik global serupa kembali terulang, para pemimpin blok sekutu bersekutu merumuskan wadah penengah konflik rasional. Pada **24 Oktober 1945**, di San Francisco dipiagamkan berdirinya **Perserikatan Bangsa-Bangsa (PBB)** atau *United Nations*.

PBB didirikan membawa visi:
- Memelihara perdamaian dan keamanan internasional mencegah konfrontasi senjata nuklir.
- Membina hubungan persahabatan antar bangsa berlandaskan hak asasi manusia universal.
- Membuka ruang kerjasama internasional dalam menuntaskan isu sosial, ekonomi, budaya di berbagai pelosok negara.

Piagam Deklarasi Hak Asasi Manusia PBB (UDHR 1948) menjadi kompas etik kebangkitan moral global, mentransformasikan tatanan sosiopolitis dunia lama kolonialisme menjadi ruang dekolonisasi kedaulatan merdeka yang damai.`
  },
  {
    id: "hist-9",
    title: "Era Informasi & Lompatan Kecerdasan Buatan",
    author: "Dr. Alan Turing III",
    era: "Modern",
    year: "2026 M",
    coverColor: "from-emerald-950 to-stone-900",
    shortSummary: "Dari sirkuit silikon mikroprosesor awal hingga revolusi kecerdasan buatan komersial model bahasa transformer.",
    detailedContent: `Setelah paruh akhir abad ke-20, umat manusia memasuki era baru revolusi industri kognitif yang memindahkan landasan kemakmuran dari kekuatan otot material menuju akselerasi kognisi data digital: **Era Informasi**.

Revolusi ini dipelopori oleh penemuan **Transistor** silikon semi-konduktor (1947), yang merampingkan ukuran superkomputer raksasa tabung hampa menjadi lembar sirkuit mikroprosesor tipis padat.

#### Tonggak Milestones Era Digital
1. **Lahirnya Internet (ARPANET)**: Desentralisasi jaringan berkirim paket data dalam protokol TCP/IP melintasi benua.
2. **Komputer Pribadi (PC)**: Demokratisasi kepemilikan komputasi oleh warga sipil lewat prakarsa pendiri Apple dan Microsoft di Silicon Valley.
3. **World Wide Web (WWW)**: Hasil temuan Tim Berners-Lee (1989) mengaitkan miliaran lembar halaman dokumen hypermedia di jagat maya secara bebas gratis.

#### Keajaiban Kecerdasan Buatan (AI) & Deep Learning
Memasuki abad ke-21, ketersediaan mahadata (Big Data) internet berkolaborasi dahsyat dengan daya hitung akselerator grafis GPU modern. Hal ini melahirkan kebangkitan algoritma **Jaringan Saraf Tiruan Mendalam** (Deep Neural Networks) khususnya arsitektur **Transformer** (diperkenalkan 2017).

Model kecerdasan buatan generatif modern (seperti Large Language Models) mampu menerjemahkan aneka bahasa kompleks secara real-time, melukis karya digital seni orisinal dari perintah teks biasa, mendiagnosis pencitraan medis sel tumor, hingga menjadi asisten coding andalan manusia. 

Kecerdasan buatan tidak lagi menjadi subjek fiksi sains melainkan mesin pengungkit potensial kognisi umat manusia melangkah menyongsong lompatan evolusi peradaban kosmos cerdas.`
  },
  {
    id: "hist-10",
    title: "Kemaharajaan Majapahit & Sumpah Palapa Gajah Mada",
    author: "Prof. Slamet Muljana",
    era: "Pertengahan",
    year: "1336 M",
    coverColor: "from-amber-600 to-red-800",
    shortSummary: "Kisah penyatuan besar Nusantara di bawah naungan kedaulatan Majapahit melalui sumpah legendaris sang Mahapatih.",
    detailedContent: `Di abad ke-14, kepulauan Nusantara menyaksikan puncak kemahsyuran peradaban maritim terbesar melalui **Kemaharajaan Majapahit**. Berpusat di Trowulan, Jawa Timur, imperium bercorak Hindu-Buddha ini berdiri kokoh setelah Raden Wijaya berhasil mengelabui dan menghancurkan pasukan Mongol yang dikirim Kublai Khan pada 1293 M.

Majapahit mencapai zaman keemasan di bawah kepemimpinan Raja **Hayam Wuruk** dan Mahapatih legendaris **Gajah Mada**.

#### Sumpah Palapa yang Menggetarkan Nusantara
Pada pelantikannya sebagai Amangkhubhumi (Perdana Menteri) pada tahun 1336 M, Gajah Mada mengucapkan sumpah keramat yang tercatat dalam Kitab Pararaton:

> *"Sira Gajah Mada patih Amangkubhumi tan ayun amukti palapa, sira Gajah Mada: 'Lamun huwus kalah nusantara isun amukti palapa, lamun kalah ring Gurun, ring Seran, Tanjung Pura, ring Haru, ring Pahang, Dompo, ring Bali, Sunda, Palembang, Tumasik, samana isun amukti palapa'."*
> *(Artinya: Jika Nusantara telah tunduk, barulah aku akan melepaskan puasaku / beristirahat).*

Sumpah ini diwujudkan melalui armada angkatan laut tangguh yang dipimpin oleh Laksamana Mpu Nala. Majapahit tidak hanya menguasai jalur perdagangan rempah-rempah yang berharga, tetapi juga mengikat jalinan persahabatan regional (*Mitreka Satata*) dari Madagaskar hingga Filipina utara. Keunggulan Majapahit terletak pada sistem irigasi persawahan yang subur serta kerukunan beragama yang melahirkan semboyan abadi bangsa Indonesia hari ini: **Bhinneka Tunggal Ika**.`
  },
  {
    id: "hist-11",
    title: "Fajar Renaissance: Kebangkitan Seni & Sains Eropa",
    author: "Dr. Giorgio Vasari, Jr.",
    era: "Pertengahan",
    year: "1450 M",
    coverColor: "from-blue-800 to-amber-950",
    shortSummary: "Kebangkitan kebebasan berpikir humanisme yang melahirkan mahakarya Leonardo da Vinci dan Galileo Galilei.",
    detailedContent: `Setelah berabad-abad dalam belenggu tradisi skolastik abad pertengahan, benua Eropa mengalami fajar pencerahan budaya luar biasa yang bermula dari Florence, Italia: **Renaissance** (Kelahiran Kembali). Didukung oleh kemakmuran dinasti perbankan Medici, para seniman dan ilmuwan mulai menggali kembali filsafat klasik Yunani dan Romawi kuno.

Pilar utama gerakan ini adalah **Humanisme**, sebuah pandangan hidup yang memuliakan akal budi, potensi kreatif, serta kebebasan berpikir kritis manusia.

#### Tokoh Utama & Revolusi Ilmu Pengetahuan
1. **Leonardo da Vinci**: Manusia Universal (*Uomo Universale*) yang merancang purwarupa helikopter, kapal selam, dan anatomi manusia presisi, sembari melukis mahakarya abadi *Mona Lisa*.
2. **Michelangelo Buonarotti**: Pematung jenius yang memahat patung marmer *David* yang agung serta melukis langit-langit Kapel Sistina dengan detail anatomi yang menakjubkan.
3. **Johannes Gutenberg (1450 M)**: Menemukan mesin cetak bergerak pertama di dunia barat, mendemokratisasi penyebaran gagasan literasi sehingga buku tak lagi menjadi monopoli kaum elit pendeta.
4. **Galileo Galilei & Nicolaus Copernicus**: Mendobrak dogma geosentrisme gereja dengan membuktikan secara empiris bahwa bumi mengitari matahari (Heliosentris), meletakkan pilar utama metode astronomi modern.

Renaissance melahirkan keberanian intelektual yang luar biasa, membebaskan imajinasi manusia dari belenggu takhayul, dan memacu lahirnya Era Penjelajahan Samudera serta Revolusi Ilmiah yang selamanya mendefinisikan peradaban modern barat.`
  },
  {
    id: "hist-12",
    title: "Kaisar Qin Shi Huang & Unifikasi Tiongkok Kuno",
    author: "Prof. Sima Qian, Ph.D.",
    era: "Kuno",
    year: "221 SM",
    coverColor: "from-purple-950 to-stone-900",
    shortSummary: "Unifikasi legendaris tujuh negara bertikai, pembangunan Tembok Besar, dan legenda Tentara Terakota.",
    detailedContent: `Selama lebih dari dua ratus tahun, daratan Tiongkok kuno tercabik-cabik dalam peperangan saudara yang kejam dan berdarah yang dikenal sebagai Era Negara-Negara Bertikai (*Warring States Period*). Kekacauan ini berakhir mutlak pada tahun 221 SM ketika **Ying Zheng**, raja dari negara Qin yang ambisius, menaklukkan enam saingan beratnya dan menobatkan dirinya sebagai **Qin Shi Huang** (Kaisar Pertama Dinasti Qin).

Qin Shi Huang merintis lahirnya poros kekuasaan terpusat Tiongkok yang bertahan selama dua milenium berikutnya dengan menerapkan falsafah **Legalisme** yang ketat dan disiplin militer mutlak.

#### Standardisasi & Mega Proyek Kekaisaran
- **Unifikasi Administrasi**: Ia menyatukan mata uang, sistem ukuran dan timbangan fisik, lebar poros roda kereta perang, hingga aksara tulisan mandarin di seluruh kekaisaran.
- **Tembok Besar Tiongkok**: Ribuan mil barisan benteng pertahanan tanah dipadatkan disambungkan untuk menghalau serbuan suku-suku nomaden Xiongnu dari utara.
- **Tentara Terakota (Terracotta Warriors)**: Mahakarya pemakaman misterius berupa barisan lebih dari 8.000 patung tanah liat prajurit, kavaleri, dan kereta perang seukuran manusia asli yang dikubur bersama sang kaisar untuk mengawalnya bertempur di alam baka.

Meskipun terkenal otoriter, membakar buku-buku ajaran Konfusianisme, dan mengeksekusi banyak kaum cendekiawan, kepemimpinan baja Qin Shi Huang berhasil meletakkan integritas geografis dan identitas budaya persatuan Tiongkok yang abadi.`
  },
  {
    id: "hist-13",
    title: "Peradaban Maya & Astro-Matematika yang Hilang",
    author: "Elena Carter, Ph.D.",
    era: "Kuno",
    year: "250 M",
    coverColor: "from-emerald-700 to-amber-950",
    shortSummary: "Menyingkap kecanggihan ksatria suku hutan hujan Mesoamerika dalam menghitung pergerakan bintang dan kalender.",
    detailedContent: `Jauh di dalam lebatnya belantara hutan hujan tropis Meksiko selatan, Guatemala, dan Honduras, berkembang salah satu peradaban kuno paling canggih di belahan bumi barat: **Peradaban Maya**. Suku Maya mendirikan kota-kota batu berarsitektur piramida berundak spektakuler seperti Tikal, Palenque, dan Chichen Itza tanpa bantuan traksi hewan beban besar mumpuni.

Mereka menolak bersandar pada teknologi logam berat besi, melainkan fokus memahat kemajuan sains abstrak di langit berbintang.

#### Keajaiban Matematika & Kosmologi Astronomi
- **Sistem Bilangan Vigesimal (Basis 20)**: Suku Maya adalah salah satu peradaban pertama dunia yang secara independen menemukan dan mendefinisikan konsep angka **Nol** (0), memungkinkan mereka melakukan perhitungan matematika yang rumit.
- **Kalender Prasasti Presisi**: Melalui pengamatan cermat terhadap siklus orbit matahari, venus, dan bulan, mereka merancang sistem penanggalan yang mengagumkan seperti Kalender *Haab'* berdurasi 365,2420 hari (hanya selisih desimal sangat kecil dibanding sains modern!).
- **Arsitektur Astronomis**: Di piramida Chichen Itza (El Castillo), saat titik balik matahari musim semi, bayangan yang dihasilkan oleh tangga bangunan membentuk bayangan ular raksasa (Kukulcan) yang perlahan merayap turun ke dasar kuil seiring gerak matahari.

Sayangnya, peradaban agung ini runtuh misterius pada abad ke-9 M karena faktor kekeringan panjang masif akibat deklamasi lingkungan, perang saudara, dan gagal panen pangan jagung, sebelum akhirnya benar-benar hancur total oleh invasi penakluk Conquistador Spanyol.`
  },
  {
    id: "hist-14",
    title: "Srivijaya: Imperium Bahari Selat Malaka",
    author: "Prof. Poerbatjaraka II",
    era: "Pertengahan",
    year: "650 M",
    coverColor: "from-teal-700 to-emerald-900",
    shortSummary: "Bagaimana kerajaan buddhis maritim mengoordinasikan rute rempah nusantara dan pusat pembelajaran sanskerta.",
    detailedContent: `Membentang anggun di pesisir Sumatera Tengah hingga Semenanjung Malaya, **Kedatuan Srivijaya** mengukuhkan posisinya sebagai hegemon bahari terbesar yang mengontrol lalu lintas pelayaran rempah dunia di Selat Malaka. Berpusat di Palembang (Sumatera Selatan modern), Srivijaya berkembang pesat berkat keunggulan maritim, hubungan diplomasi timbal balik yang erat dengan Dinasti Tang di Tiongkok serta Dinasti Pala di India.

Kedaulatan armada laut Srivijaya didayagunakan secara luhur untuk melindungi kapal-kapal saudagar asing dari pembajakan, mengikat monopoli niat perdagangan rempah-rempah bernilai selangit seperti lada, gaharu, dan kapur barus.

#### Pusat Pembatikan Spiritual & Pendidikan Dunia
Tidak hanya mahir mengelola transaksi komersial perdagangan bebas bahari, Srivijaya diakui secara internasional sebagai mercusuar pusat studi teologi dan bahasa tertua di Asia Tenggara.

Seorang biarawan pengembara legendaris asal Tiongkok, **I-Tsing (Yijing)**, menetap di Srivijaya selama enam bulan pada tahun 671 M untuk mempelajari tatabahasa Sanskerta sebelum melanjutkan safar ke India. I-Tsing amat mengagumi keteraturan sistem pengajaran Srivijaya dan menulis laporan dunia timur yang menganjurkan para biksu Tiongkok untuk belajar di Palembang terlebih dahulu.

Raja-raja Srivijaya, khususnya dari **Silsilah Syailendra**, menyumbangkan lahan biara megah di Universitas Nalanda (India), membuktikan pengaruh kosmopolitan finansial yang merambah jaringan edukasi antar-samudra secara impresif.`
  },
  {
    id: "hist-15",
    title: "Wangsa Syailendra & Mahakarya Borobudur",
    author: "Dr. Soekmono",
    era: "Pertengahan",
    year: "778 M",
    coverColor: "from-amber-800 to-stone-900",
    shortSummary: "Teknologi konstruksi batu andesit saling kunci (interlocking) tanpa perekat membentuk mandala kosmis agung.",
    detailedContent: `Di masa subur peradaban Jawa kuno abad ke-8 M, sebuah keluarga dinasti berdaulat penganut Buddha Mahayana bernama **Wangsa Syailendra** memimpin wilayah bumi Mataram Kuno. Berlandaskan kedamaian spiritualitas, mereka memprakarsai pembangunan candi terbesar di dunia: **Borobudur**.

Berdiri kokoh di atas bukit berselimut pemandangan pegunungan Menoreh, Jawa Tengah, candi ini dirancang oleh arsitek legendaris bernama Gunadharma sebagai representasi simbolis perjalanan kosmik batin manusia mencapai pencerahan Nirwana.

#### Keajaiban Rekayasa Sipil & Andesit Saling Kunci
- **Metode Tanpa Perekat**: Borobudur dibangun menggunakan lebih dari 2 juta bongkah batu andesit abu-abu yang diperoleh dari aliran lava kali sekitarnya. Setiap blok dipotong presisi dan dipasangkan menggunakan teknik kuncian tak berperekat (*interlocking joint*) mirip bongkar pasang puzle balok modern!
- **Sistem Drainase Canggih**: Guna menyiasati potensi longsor bukit karena curah hujan tinggi ekstrem di Jawa, Gunadharma melengkapi candi dengan sistem saluran air internal terselubung dan saluran hiasan kepala singa (*Gargoyle / Jaladwara*) yang berfungsi menyemburkan air keluar secara merata.
- **Kosmologi Tiga Ranah**: Struktur megah Borobudur membagi tingkatan alam spiritualitas menjadi:
  1. **Kamadhatu**: Kaki candi yang memuat 160 relief perilaku terikat nafsu duniawi manusia.
  2. **Rupadhatu**: Tingkat lorong persegi berisi ribuan relief suci kehidupan sang Buddha.
  3. **Arupadhatu**: Pelataran lingkaran terbuka di puncak di mana deretan stupa berlubang membungkus patung Buddha meditasi dalam kesunyian mutlak batin.

Borobudur melambangkan harmoni luar biasa antara estetika seni relief pahat tinggi, rekayasa sipil tangguh tahan gempa bumi, serta kedalaman filosofi spiritualitas budaya Indonesia.`
  },
  {
    id: "hist-16",
    title: "Revolusi Perancis & Kebangkitan Bonaparte",
    author: "Prof. Georges Lefebvre",
    era: "Modern",
    year: "1789 M",
    coverColor: "from-blue-700 to-rose-900",
    shortSummary: "Runtuhnya tirani absolut Bastille, deklarasi hak asasi manusia warga, hingga penataan hukum Code Napoléon.",
    detailedContent: `Dipicu oleh ketimpangan sosial luar biasa, krisis kelaparan hebat, serta kebangkrutan khasana negara karena foya-foya istana Versailles, rakyat Perancis meletuskan revolusi sosial paling masif yang selamanya menghancurkan struktur feodalisme absolut Eropa. Pada tanggal **14 Juli 1789**, massa rakyat berkumpul menyerbu **Penjara Bastille** di kota Paris, simbol teror terkejam otokrasi monarki Raja Louis XVI.

Revolusi melahirkan semboyan persaudaraan abadi:
> *"Liberté, Égalité, Fraternité"* (Kebebasan, Keadilan, Persaudaraan).

Majelis konstituante nasional segera meratifikasi *Deklarasi Hak Asasi Manusia dan Warga Negara* yang menegaskan bahwa seluruh umat manusia dilahirkan setara di mata hukum negara.

#### Kebangkitan Napoleon Bonaparte
Di tengah carut-marut politik pasca-eksekusi guillotine sang Raja dan naiknya tirani teror Robespierre, seorang perwira kavaleri muda asal Korsika berotak encer tampil menyelamatkan stabilitas Perancis: **Napoleon Bonaparte**.

Napoleon menata ulang tatanan Perancis dan memimpin kampanye militer spektakuler menundukkan monarki-monarki Eropa yang berniat menginvasi kembali ideologi revolusi Perancis. Warisan hukum terpentingnya adalah **Code Napoléon** (1804). Kitab undang-undang hukum perdata ini mendemokratisasikan sistem peradilan sipil, menghapus privilege hak istimewa bangsawan berdasarkan kelahiran, melegitimasi toleransi beragama secara resmi, serta menjadi inspirasi struktur dasar tatanan hukum modern di puluhan negara seluruh dunia.`
  },
  {
    id: "hist-17",
    title: "Restorasi Meiji Jepang: Modernisasi Kilat",
    author: "Dr. Inazo Nitobe",
    era: "Modern",
    year: "1868 M",
    coverColor: "from-red-800 to-stone-950",
    shortSummary: "Transformasi mencengangkan kekaisaran Jepang dari era isolasi feodal Sakoku menjadi industri maju dunia.",
    detailedContent: `Selama lebih dari 250 tahun di bawah kekuasaan Keshogunan Tokugawa, Jepang menutup rapat perbatasan mereka dari dunia luar melalui kebijakan isolasi ketat **Sakoku**. Namun, kedatangan empat kapal perang hitam komodor Amerika Serikat, Matthew Perry, pada 1853 memaksa Jepang membuka pelabuhan mereka dengan perjanjian tidak adil yang menghina kehormatan imperium.

Sadar akan ancaman mematikan kolonialisme barat jika mereka tetap bersikap defensif tradisional, sekelompok samurai muda progresif mendesak runtuhnya keshogunan militer dan memulihkan kekuasaan politik eksekutif penuh di tangan **Kaisar Meiji** pada permulaan tahun **1868**.

#### Transformasi Teknologi & Falsafah Kemajuan
Restorasi Meiji merombak total kebudayaan Jepang dalam kurun waktu kurang dari tiga dekade saja melalui slogan pembebasan dinamis:

> *"Fukoku Kyōhei"* (Negara Makmur, Militer Kuat).

- **Sistem Pembelajaran Global**: Jepang mengirim utusan cendekiawan terbaik ke seantero AS dan Eropa barat untuk menyerap ilmu teknik sipil, perkapalan baja, manajemen keuangan bank, serta taktik militer modern terbaik.
- **Hibriditas Budaya (*Wakon Yosai*)**: Berarti *Jiwa Jepang, Teknologi Barat*. Suku samurai membanggakan pedang katana diganti menjadi insinyur pabrik uap, meluncurkan jaringan kereta api listrik melintasi daratan, memicu industri tekstil massal modern.

Jepang berhasil membuktikan secara spektakuler bahwa bangsa ketimuran Asia sanggup sejajar memimpin industri kemajuan sains global modern tanpa kehilangan pilar luhur moralitas kebudayaan aslinya.`
  }
];
