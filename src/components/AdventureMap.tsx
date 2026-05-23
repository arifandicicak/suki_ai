import React, { useState, useEffect } from "react";
import { Lesson, UserStats } from "../types";
import {
  LANGUAGES_CURRICULUM,
  LanguageCurriculum,
  LanguageUnit
} from "../data/languagesData";
import {
  Lock,
  Unlock,
  Check,
  Compass,
  Star,
  Sparkles,
  Trophy,
  Globe2,
  Terminal,
  ChevronRight,
  BookOpen,
  Crown,
  ArrowLeft
} from "lucide-react";

const DIALECTS_MAP: Record<string, string[]> = {
  en: ["British (RP, Cockney, Scottish)", "American (General, Southern, NYC)", "Commonwealth (Aussie, Kiwi, Indian)"],
  de: ["Hochdeutsch", "Bayerisch", "Berlinerisch", "Plattdeutsch"],
  es: ["Castilian", "Andalusia", "Rioplatense", "Mexican", "Caribbean"],
  fr: ["Standar Paris", "Méridional", "Québécois", "African French"],
  tr: ["Istanbul (Standar)", "Karadeniz", "Doğu (Anatolia)", "Ege"],
  id: ["Logat Jawa (Medok)", "Logat Sunda", "Logat Batak/Medan", "Logat Papua (Singkatan)", "Logat Manado/Ambon", "Logat Melayu"],
  jv: ["Ngoko", "Krama Lugu", "Krama Alus"],
  pap: ["Papua Melayu", "Papua Pegunungan", "Papua Pesisir"],
  mc: ["Munegascu (Ligurian-Mediterania)"],
  th: ["Central Thai", "Isan (Lao)", "Northern (Lanna)", "Southern Thai"],
  jp: ["Hyojungo (Tokyo)", "Kansai-ben", "Tohoku-ben", "Kyushu-ben", "Okinawa-ben"],
  zh: ["Beijing (North-Erhua)", "Southern Mandarin (Taiwan/Guangdong)", "Sichuanese"]
};

function getCustomizedUnit(unit: LanguageUnit, dialect: string, langName: string): LanguageUnit {
  const adapted = JSON.parse(JSON.stringify(unit)) as LanguageUnit;
  const rawCleanTitle = unit.title.replace(/^.* - /, "");
  adapted.title = `${langName} (${dialect}) - ${rawCleanTitle}`;
  adapted.content = `${adapted.content}\n\n---\n\n### 🗣️ Aksen/Dialek: ${dialect}\n\nDalam variasi bahasa daerah atau aksen **${dialect}**, pelafalan serta kosa kata berubah menyesuaikan lidah & dinamika kedaerahan asli secara mendalam. Perhatikan rangkuman ciri berikut:\n\n`;

  if (dialect.includes("British")) {
    adapted.examplePhrase = "Hello, cheers mate! Splendid, innit?";
    adapted.examplePhraseTranslation = "Halo, terima kasih kawan! Hebat sekali, kan?";
    adapted.content += `* **Pelafalan Suara r (Non-Rhoticity)**: Huruf 'r' di akhir kata sering tidak disuarakan (contoh: "water" diucapkan "wot-ah").\n* **Glottal Stop**: Konsonan hambat glotis di mana huruf 't' sering dilesapkan atau ditelan di tengah kata.\n* **Kosakata Ikonik**: Menggunakan 'Cheers' untuk berterima kasih atau menyatakan pertemanan akrab, dan tag tanya 'innit?' di akhir kalimat.`;
    adapted.quiz = {
      question: "Dari penjelasan materi, manakah frasa khas British informal berikut yang paling tepat untuk berterima kasih kepada sahabat?",
      options: ["Cheers, mate!", "Howdy, partner!", "What is up y'all!", "Merci beaucoup."],
      answerIndex: 0,
      explanation: "Penutur British English sangat populer mengaitkan kata 'Cheers' sebagai ucapan terima kasih nan akrab kepada sesama kawan ('mate')."
    };
  } else if (dialect.includes("American")) {
    adapted.examplePhrase = "Howdy y'all! It is a beautiful morning in the city.";
    adapted.examplePhraseTranslation = "Halo kalian semua! Pagi yang indah di kota.";
    adapted.content += `* **Rhoticity Kuat**: Pelafalan huruf 'r' yang sangat tegas dan meliuk diucapkan penuh pada seluruh posisi kata.\n* **Pronoun 'Y'all'**: Gabungan 'you all' yang sangat bersahabat di wilayah Amerika Selatan.\n* **Penyederhanaan Vokal**: Flapping suara 't' di antara dua vokal sehingga terdengar seperti suara 'd' cepat (misalkan 'butter' dilafalkan 'bud-er').`;
    adapted.quiz = {
      question: "Kata ganti jamak ramah manakah yang menjadi penanda utama identitas dialek American Southern?",
      options: ["Y'all (You all)", "Youse", "Ye", "Thou"],
      answerIndex: 0,
      explanation: "'Y'all' adalah kontraksi legendaris dari 'you all' yang melambangkan kehangatan dialek wilayah Southern United States."
    };
  } else if (dialect.includes("Commonwealth")) {
    adapted.examplePhrase = "No worries, mate! Let's grab some brekkie at the beach.";
    adapted.examplePhraseTranslation = "Santai saja kawan! Mari kita sarapan di pantai.";
    adapted.content += `* **No Worries**: Idiom legendaris Australia (Aussie)/Selandia Baru yang setara dengan 'Sama-sama' atau 'Tidak masalah'.\n* **Mutilasi Kosakata Ramah (Hypocorisms)**: Kecenderungan menyingkat kata lalu menambahkan sufiks '-ie' atau '-o' (contoh: 'brekkie' untuk breakfast, 'barbie' untuk barbecue).\n* **Rising Intonation**: Kebiasaan menaikkan intonasi suara di akhir kalimat biasa sehingga terdengar seperti mengajukan pertanyaan.`;
    adapted.quiz = {
      question: "Dalam percakapan santai di Australia (Aussie slang), kosakata manakah yang merujuk pada sarapan pagi?",
      options: ["Brekkie", "Barbie", "Arvo", "Dunny"],
      answerIndex: 0,
      explanation: "Masyarakat Australia gemar menyingkat kata; 'Brekkie' adalah istilah lokal super populer penganti 'breakfast'."
    };
  } else if (dialect.includes("Hochdeutsch")) {
    adapted.examplePhrase = "Guten Tag, wie geht es Ihnen heute?";
    adapted.examplePhraseTranslation = "Selamat siang, bagaimana kabar Anda hari ini?";
    adapted.content += `* **Standarisasi Nasional**: Bahasa Jerman baku resmi yang diajarkan secara umum, minim lekukan logat kedaerahan.\n* **Konsistensi Fonetik**: Pelafalan konsonan letup ganda dan vokal bulat 'umlaut' (ä, ö, ü) diucapkan presisi sesuai aturan kamus Duden.`;
    adapted.quiz = {
      question: "Dialek manakah yang menjadi rujukan baku pengajaran Bahasa Jerman standar internasional?",
      options: ["Hochdeutsch", "Bayerisch", "Plattdeutsch", "Schwyzerdütsch"],
      answerIndex: 0,
      explanation: "Hochdeutsch (Jerman Standar) adalah variasi bahasa resmi yang digunakan dalam media, dokumen kenegaraan, dan pengajaran bahasa asing."
    };
  } else if (dialect.includes("Bayerisch")) {
    adapted.examplePhrase = "Servus! Wie beinander? Pfiad di gott!";
    adapted.examplePhraseTranslation = "Halo! Bagaimana kabarnya? Semoga Tuhan menjaga Anda!";
    adapted.content += `* **Sapaan Servus**: Menggantikan kata 'Hallo' dalam keseharian di wilayah selatan (Bayern & Austria).\n* **Pfiad di**: Ungkapan perpisahan bernilai reliji agung khas lokal.\n* **Peleburan Diftong**: Suara vokal 'ist' sering diucapkan 'is', dan akhiran kata kerja '-en' dilesapkan menjadi suara '-a' lembut.`;
    adapted.quiz = {
      question: "Sapaan ramah khas penuh keakraban apakah yang mutlak digunakan penutur daerah Bayern saat menyapa?",
      options: ["Servus", "Moin", "Hallo", "Guten Tag"],
      answerIndex: 0,
      explanation: "'Servus' adalah sapaan legendaris di Bayern, Austria, dan sekitarnya yang bernilai persaudaraan erat."
    };
  } else if (dialect.includes("Castilian")) {
    adapted.examplePhrase = "Hola, ¿cómo estás tú? Es un placer saludarte.";
    adapted.examplePhraseTranslation = "Halo, bagaimana kabarmu? Suatu kehormatan menyapamu.";
    adapted.content += `* **Pelafalan Ceceo/Distinción**: Huruf 'z' dan 'c' sebelum 'e' atau 'i' diucapkan ditiup layaknya suara 'th' dalam Bahasa Inggris (misal: 'gracias' terdengar seperti 'grathias').\n* **Kata Ganti Vosotros**: Menggunakan bentuk plural informal 'vosotros' beserta konjugasi khususnya secara murni di daratan Spanyol.`;
    adapted.quiz = {
      question: "Bagaimanakah bunyi huruf 'c' pada kata 'gracias' menurut ciri khas pelafalan Castilian Spanyol standar?",
      options: ["Disuarakan ditiup seperti 'th' (gra-thias)", "Disuarakan tegas seperti 'k' (gra-kias)", "Disuarakan mendesis tajam 's' (gra-sias)", "Dilesapkan sepenuhnya (gra-ias)"],
      answerIndex: 0,
      explanation: "Gaya pelafalan Castilian dari Spanyol tengah mendefinisikan suara 'c' (sebelum e/i) dengan desis lidah digigit lembut serupa fonem 'th' Inggris."
    };
  } else if (dialect.includes("Rioplatense")) {
    adapted.examplePhrase = "Che boludo, ¿mirá cómo anda el auto de mi viejo?";
    adapted.examplePhraseTranslation = "Hei kawan, coba lihat bagaimana kondisi mobil ayahku?";
    adapted.content += `* **Voseo Mutlak**: Mengganti kata ganti 'tú' menjadi 'vos' disertai konjugasi unik (misal: 'tú tienes' menjadi 'vos tenés').\n* **Yeísmo/Shismo**: Huruf 'll' dan 'y' diucapkan tebal seperti suara 'sh' atau 'sy' (misal: 'calle' dibaca 'ca-she' dan 'yo' dibaca 'sho').\n* **Pengaruh Italia**: Intonasi dan melodi kalimat mengalun bergelombang menyerupai dialek Napoli akibat imigrasi historis.`;
    adapted.quiz = {
      question: "Fenomena pelafalan huruf 'll' dan 'y' menjadi bunyi desis tebal 'sh/zh' di Argentina disebut...",
      options: ["Yeísmo / Shismo Rioplatense", "Ceceo Castilian", "Voseo", "Ustedes"],
      answerIndex: 0,
      explanation: "Shismo/Shísmo adalah sidik jari kebahasaan terbesar dari Buenos Aires dan Uruguay yang mengubah suara 'y' menjadi bunyian 'sh'."
    };
  } else if (dialect.includes("Standar Paris")) {
    adapted.examplePhrase = "Bonjour! C'est magnifique de vous rencontrer aujourd'hui.";
    adapted.examplePhraseTranslation = "Halo! Luar biasa sekali bisa bertemu dengan Anda hari ini.";
    adapted.content += `* **Uvular R**: Suara huruf 'r' yang diucapkan bergetar di pangkal langit-langit kerongkongan secara halus.\n* **Kekosongan Vokal Tengah**: Mengedepankan vokal nasal (sengau) yang sangat kontras sebagai standar keindahan bahasa Prancis modern.`;
    adapted.quiz = {
      question: "Bunyi konsonan unik apakah yang mendominasi pelafalan huruf 'r' dalam bahasa Prancis Standar Paris?",
      options: ["Getar uvular belakang tenggorokan (R serak)", "Getar ujung lidah keras (R medok)", "Lantunan letup gigi", "Hilang total tanpa sisa"],
      answerIndex: 0,
      explanation: "Huruf 'r' Prancis dilafalkan di bagian belakang rongga mulut dekat anak tekak (uvula), menghasilkan hembusan bersuara serak yang khas."
    };
  } else if (dialect.includes("Jawa (Medok)")) {
    adapted.examplePhrase = "Lho mas, mbok nggih dahar rumiyin supados mboten masuk angin.";
    adapted.examplePhraseTranslation = "Lho mas, alangkah baiknya makan dulu biar tidak masuk angin.";
    adapted.content += `* **Penekanan Voiced Plosives (b, d, g, j)**: Konsonan letup dirasuki desah tebal udara (aspirasi) yang berat di dada.\n* **Partikel Emosional**: Penggunaan kata penegas rasa khas seperti 'lho', 'mbok', 'kok', 'to' dalam struktur kalimat.\n* **Reduplikasi Penguat**: Penulisan tata bahasa santai yang meminjam frasa dari kosa kata bahasa daerah demi kedekatan silaturahmi.`;
    adapted.quiz = {
      question: "Manakah letupan konsonan aksen khas Jawa Medok yang disuaracak sangat berat dari pangkal dada?",
      options: ["B, D, G, J tebal", "P, T, K, C tipis", "S, X, Z melayang", "M, N, NG teredam"],
      answerIndex: 0,
      explanation: "Konsonan letup bersuara b, d, g, j dalam bahasa Indonesia berlogat Jawa diucapkan dengan hembusan napas tebal, yang dikenal secara populer sebagai logat 'Medok'."
    };
  } else if (dialect.includes("Sunda")) {
    adapted.examplePhrase = "Punten teh, abdi mah bade tumaros pami panyabaan palih mana?";
    adapted.examplePhraseTranslation = "Permisi teh (kakak perempuan), saya mau bertanya kalau tempat tujuan di sebelah mana?";
    adapted.content += `* **Fonem f/v menjadi p**: Kecenderungan fonologis akrab mengganti bunyi 'f' dan 'v' menjadi 'p' padat.\n* **Partikel teh/mah**: Kata sandang penegas yang disisipkan hampir di setiap jeda frasa kalimat untuk melunakkan kehalusan intonasi.\n* **Sapaan Sampurasun**: Pembuka restu agung bagi sesama saudara Sunda.`;
    adapted.quiz = {
      question: "Apakah sapaan pembuka tradisional khas daerah parahyangan Sunda?",
      options: ["Sampurasun", "Kula nuwun", "Horas", "Mejuah-juah"],
      answerIndex: 0,
      explanation: "Sapaan 'Sampurasun' adalah bentuk penghormatan luhur dalam adat Sunda."
    };
  } else if (dialect.includes("Batak")) {
    adapted.examplePhrase = "Horas bah! Kemasi kian barangmu itu biar abis urusan!";
    adapted.examplePhraseTranslation = "Halo kawan! Segera rapikan barangmu di situ agar perkara cepat selesai!";
    adapted.content += `* **Intonasi Tegas-Suku Kata Jelas**: Pengucapan kata dengan ketukan suku kata yang pendek, lantang, dan cepat.\n* **Kata Keterangan Kian**: Berarti 'sekalian' atau 'langsung saja' yang diletakkan persis setelah kata kerja.\n* **Partikel Bah**: Penegas emosi ekspresif penanda rasa akrab, heroisme, dan kejujuran berinteraksi.`;
    adapted.quiz = {
      question: "Partikel penegas khas manakah yang hampir selalu disisipkan dalam percakapan Logat Batak/Medan?",
      options: ["Bah", "Tah", "Kah", "Dong"],
      answerIndex: 0,
      explanation: "Partikel 'bah' memberi penegasan rasa tegas dan akrab dalam emosionalitas logat Batak."
    };
  } else if (dialect.includes("Papua")) {
    adapted.examplePhrase = "Halo kaka, ko mau pergi ka mana kah?";
    adapted.examplePhraseTranslation = "Halo kakak, kamu mau pergi ke mana?";
    adapted.content += `* **Efisiensi Kontraksi**: Menyingkat kata demi percakapan kilat (sa = saya, ko = kamu, tra = tidak, pu = punya).\n* **Partikel kah / toh**: Digunakan sebagai pelunak di akhir kalimat tanya agar mengesankan keramahan natural.\n* **Nasal r**: Penghilangan getar r di posisi tertentu demi efisiensi pelafalan Papua pesisir.`;
    adapted.quiz = {
      question: "Bagaimanakah penyingkatan kata 'kamu' dan 'tidak' dalam logat asri Papua?",
      options: ["Ko dan Tra", "Mu dan Nggak", "Kowe dan Ora", "Kamu dan Dek"],
      answerIndex: 0,
      explanation: "Bahasa papua menyingkat kata demi efisiensi: sa (saya), ko (kamu), tra (tidak)."
    };
  } else if (dialect.includes("Beijing")) {
    adapted.examplePhrase = "Nǐ kàn na, nàr yǒu gè bànr.";
    adapted.examplePhraseTranslation = "Lihatlah di sana ada seorang teman.";
    adapted.content += `* **Erhua kental**: Suara akhiran '-r' ditambahkan ke suku kata utama untuk merubah rasa kata menjadi ramah dan imut.\n* **Retroflexion kuat**: Pelafalan bunyi desis langit-langit (zh, ch, sh) diucapkan melengkung tebal ke belakang yang sangat dihormati di wilayah utara.`;
    adapted.quiz = {
      question: "Ciri fonologi khas dari dialek Beijing dalam percakapan sehari-hari adalah...",
      options: ["Erhua (Sufiks -r)", "Toneless total", "Peleburan sengau", "Tanpa vokal bulat"],
      answerIndex: 0,
      explanation: "'Erhua' adalah fenomena pembubuhan fonem akhir '-r' yang kental pada dialek Beijing."
    };
  } else if (dialect.includes("Kansai")) {
    adapted.examplePhrase = "Maido! Honma ni ookini ya de!";
    adapted.examplePhraseTranslation = "Halo/Selamat datang! Sungguh terima kasih banyak lho!";
    adapted.content += `* **Ookini**: Menggantikan ucapan terima kasih standar 'Arigatou'.\n* **Honma**: Setara dengan 'Hontou' yang berarti sungguh/beneran.\n* **Akhiran ya de / ya nen**: Penegasan argumen ramah yang khas di jalanan Osaka & Kyoto.`;
    adapted.quiz = {
      question: "Kata apakah yang digunakan penutur Kansai-ben (Osaka) untuk menyatakan rasa berterima kasih?",
      options: ["Ookini", "Arigatou", "Oasobi", "Nandeyanen"],
      answerIndex: 0,
      explanation: "'Ookini' adalah kata terima kasih ikonik dari dialek regional Kansai."
    };
  } else {
    adapted.examplePhrase = `${unit.examplePhrase} [Dialek: ${dialect}]`;
    adapted.content += `* **Variasi Karakteristik Lokal**: Menghidupkan nada suara kedaerahan setempat, penyederhanaan tata bahasa kolokial, serta pelafalan vokal murni agar mendekati fasih penutur asli tingkat tinggi.`;
  }

  return adapted;
}

interface AdventureMapProps {
  lessons: Lesson[];
  stats: UserStats;
  selectedLesson: Lesson | null;
  onSelectLesson: (lesson: any) => void;
  onUnlockTree: (tree: "sedang" | "susah", cost: number) => void;
}

export default function AdventureMap({
  lessons,
  stats,
  selectedLesson,
  onSelectLesson,
  onUnlockTree,
}: AdventureMapProps) {
  // We allow user to toggle between "languages" and "technology" curriculum tracks
  const [currentTrack, setCurrentTrack] = useState<"languages" | "tech">("languages");
  
  // Track selected language within the languages curriculum (defaults to 'en' - Inggris)
  const [selectedLangCode, setSelectedLangCode] = useState<string>("en");

  // Two-step dynamic dialect state machines
  const [tempLangCode, setTempLangCode] = useState<string | null>("en");
  const [selectedDialect, setSelectedDialect] = useState<string | null>(() => {
    return localStorage.getItem("studysuki_selected_dialect") || "American (General, Southern, NYC)";
  });

  const activeLanguage = LANGUAGES_CURRICULUM.find(
    (lang) => lang.code === selectedLangCode
  ) || LANGUAGES_CURRICULUM[0];

  // Helper to check if a CS tech tier is unlocked
  const isTechCategoryUnlocked = (category: "mudah" | "sedang" | "susah") => {
    return stats.unlockedTrees.includes(category);
  };

  // Click handler for CS Tech tier unlocks
  const handleTechTreeUnlockClick = (category: "mudah" | "sedang" | "susah") => {
    if (category === "mudah") return;

    if (!isTechCategoryUnlocked(category)) {
      const cost = category === "sedang" ? 500 : 1000;
      if (stats.exp < cost) {
        alert("Your EXP is not enough to unlock this level!");
      } else {
        const confirmUnlock = window.confirm(
          `Apakah kamu ingin menebus gerbang Tree ${category.toUpperCase()} seharga ${cost} EXP?`
        );
        if (confirmUnlock) {
          onUnlockTree(category, cost);
        }
      }
    }
  };

  // Click handler for CS standard lesson
  const handleTechLessonClick = (lesson: Lesson) => {
    if (!isTechCategoryUnlocked(lesson.category)) {
      alert("Your EXP is not enough to unlock this level!");
      return;
    }
    onSelectLesson(lesson);
  };

  // Click handler for Language Unit Lesson (Duolingo Zig-Zag node)
  const handleLanguageUnitClick = (unit: LanguageUnit, isLocked: boolean, prevUnitTitle: string) => {
    if (isLocked) {
      alert(`Unit ini terkunci 🔒! Silakan selesaikan '${prevUnitTitle}' terlebih dahulu untuk menerobos gembok.`);
      return;
    }
    
    // Adapt LanguageUnit to the shape of standard Lesson dynamically to keep components compatible
    const adaptedLesson = {
      id: unit.id,
      title: `${activeLanguage.flag} ${activeLanguage.name} - ${unit.title}`,
      category: unit.level === "Pemula" ? "mudah" : unit.level === "Menengah" ? "sedang" : "susah",
      shortDesc: unit.shortDesc,
      content: unit.content,
      xpReward: 50,
      examplePhrase: unit.examplePhrase,
      examplePhraseTranslation: unit.examplePhraseTranslation,
      quiz: {
        id: `q_${unit.id}`,
        question: unit.quiz.question,
        options: unit.quiz.options,
        answerIndex: unit.quiz.answerIndex,
        explanation: unit.quiz.explanation
      }
    };

    onSelectLesson(adaptedLesson);
  };

  // Group traditional CS lessons
  const easyLessons = lessons.filter((l) => l.category === "mudah");
  const mediumLessons = lessons.filter((l) => l.category === "sedang");
  const hardLessons = lessons.filter((l) => l.category === "susah");

  return (
    <div className="space-y-6 select-none">
      {/* 2-WAY ROADMAP TRACK SELECTOR */}
      <div className="grid grid-cols-2 gap-3 p-1.5 bg-stone-100 border border-stone-200 rounded-2xl max-w-xl mx-auto shadow-sm">
        <button
          onClick={() => setCurrentTrack("languages")}
          className={`py-3 px-4 rounded-xl text-xs md:text-sm font-sans font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
            currentTrack === "languages"
              ? "bg-[#22c55e] text-white shadow-md shadow-emerald-700/20"
              : "text-stone-500 hover:text-stone-800"
          }`}
        >
          <Globe2 className="w-4 h-4" />
          <span>Kurikulum Bahasa Dunia</span>
        </button>
        <button
          onClick={() => setCurrentTrack("tech")}
          className={`py-3 px-4 rounded-xl text-xs md:text-sm font-sans font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
            currentTrack === "tech"
              ? "bg-slate-800 text-white shadow-md shadow-slate-900/20"
              : "text-stone-500 hover:text-stone-800"
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Teknologi & Coding RPG</span>
        </button>
      </div>

      {/* CURRICULUM VIEW RENDERER */}
      {currentTrack === "languages" ? (
        <div id="languages-curriculum-panel" className="space-y-8 animate-fade-in">
          {/* HORIZONTAL FLAGS/LANGUAGES BAR */}
          <div className="bg-white border-2 border-stone-200 rounded-3xl p-5 shadow-sm">
            <h4 className="font-sans font-extrabold text-xs text-stone-400 uppercase tracking-widest text-center mb-3.5">
              Pilih Bahasa Tujuan Belajar (12 Bahasa Lengkap &amp; Kedaerahan)
            </h4>
            
            {/* Scrollable grid list */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {LANGUAGES_CURRICULUM.map((lang) => {
                const isActive = lang.code === tempLangCode;
                // Count completed lessons in this specific language
                const completedInThisLang = lang.units.filter((u) => 
                  stats.completedLessons.includes(u.id)
                ).length;
                
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setTempLangCode(lang.code);
                      setSelectedDialect(null);
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer hover:scale-105 active:scale-95 ${
                      isActive
                        ? "border-[#22c55e] bg-emerald-50/40 shadow-sm"
                        : "border-stone-150 bg-white hover:bg-stone-50"
                    }`}
                  >
                    <span className="text-3xl leading-none filter drop-shadow-sm select-none">
                      {lang.flag}
                    </span>
                    <span className={`text-[11px] font-sans font-extrabold ${isActive ? "text-emerald-800" : "text-stone-700"}`}>
                      {lang.name}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-stone-400">
                      {completedInThisLang}/{lang.units.length} Selesai
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TWO-STEP SELECTION: ACCENT / DIALECT TRANSITION SUBMENU */}
          {tempLangCode && !selectedDialect ? (
            <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setTempLangCode(null);
                  }}
                  className="flex items-center gap-1.5 text-xs font-sans font-black text-stone-500 hover:text-stone-850 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali ke Ganti Bahasa</span>
                </button>
                <div className="text-2xl">🗣️</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl leading-none filter drop-shadow-sm">
                    {LANGUAGES_CURRICULUM.find((l) => l.code === tempLangCode)?.flag}
                  </span>
                  <h3 className="font-sans font-black text-lg md:text-xl text-stone-900">
                    Pilih Aksen &amp; Dialek Bahasa {LANGUAGES_CURRICULUM.find((l) => l.code === tempLangCode)?.name}
                  </h3>
                </div>
                <p className="text-xs text-stone-500 font-sans leading-relaxed break-words whitespace-normal">
                  Materi bacaan, pelafalan mikrofon, kuis pemahaman, dan panduan belajar akan disesuaikan secara khusus dengan karakteristik variasi penuturan lokal yang dipilih.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(DIALECTS_MAP[tempLangCode] || ["Standar Baku"]).map((dlct) => (
                  <button
                    key={dlct}
                    onClick={() => {
                      setSelectedDialect(dlct);
                      setSelectedLangCode(tempLangCode);
                      localStorage.setItem("studysuki_selected_dialect", dlct);
                    }}
                    type="button"
                    className="p-4 text-left rounded-2xl border-2 border-stone-150 hover:border-[#22c55e] focus:border-[#22c55e] hover:bg-emerald-55/10 transition-all cursor-pointer flex flex-col justify-between group active:scale-98"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs sm:text-sm font-sans font-black text-stone-900 group-hover:text-emerald-800 transition-colors">
                        {dlct}
                      </span>
                      <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-emerald-550 group-hover:translate-x-1 transition-all" />
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1.5 font-mono uppercase tracking-tight">Aktifkan Dialek Ini</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* DUOLINGO ZIG-ZAG PATH CONTAINER */
            <div className="bg-white border-2 border-stone-200 rounded-[2.5rem] p-6 md:p-10 shadow-sm relative min-h-[500px]">
              {/* Watermark decorations */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

              {/* Path Header info card */}
              <div className="max-w-xl mx-auto text-center mb-10 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-250 text-[10px] font-mono font-bold rounded-full uppercase mb-2">
                  <Globe2 className="w-3.5 h-3.5 animate-spin" />
                  Active Roadmap • {activeLanguage.name} • Dialek: {selectedDialect}
                </div>
                <h3 className="font-sans font-black text-xl md:text-2xl text-stone-900">
                  Peta Meliuk {activeLanguage.name} {activeLanguage.flag}
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto leading-relaxed break-words whitespace-normal">
                  Selesaikan unit secara berurutan. Klik lingkaran aktif untuk membaca materi dialek <strong className="text-emerald-800">{selectedDialect}</strong>, melatih pelafalan mikrofon, dan menguji kemampuan lewat kuis!
                </p>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setSelectedDialect(null)}
                    type="button"
                    className="inline-flex items-center gap-1.5 py-1.5 px-3.5 border border-stone-200 hover:border-[#22c55e] hover:bg-emerald-50/10 text-stone-500 hover:text-emerald-900 rounded-xl text-[10px] font-sans font-extrabold transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                    <span>Ganti Aksen / Dialek Lain</span>
                  </button>
                </div>
              </div>

              {/* THE ROAD (CONNECTOR LINE + ZIG-ZAG NODES) */}
              <div className="relative max-w-md mx-auto py-10 flex flex-col items-center">
                
                {/* Vertical dotted road line inside the background path */}
                <div className="absolute top-10 bottom-10 w-2.5 bg-stone-100 rounded-full border-l-2 border-r-2 border-dashed border-stone-300 pointer-events-none z-0"></div>

                {/* Path units map */}
                <div className="w-full space-y-16 relative z-10 flex flex-col">
                  {activeLanguage.units.map((rawUnit, idx) => {
                    const unit = getCustomizedUnit(rawUnit, selectedDialect || "American (General, Southern, NYC)", activeLanguage.name);
                    const isCompleted = stats.completedLessons.includes(unit.id);
                    
                    // LOGICAL LOCKED SYSTEM:
                    // Unit 1 is ALWAYS unlocked.
                    // Unit K is unlocked only when Unit K-1 is in completedLessons.
                    const isFirstUnit = idx === 0;
                    const prevUnit = isFirstUnit ? null : activeLanguage.units[idx - 1];
                    const isUnlocked = isFirstUnit || (prevUnit ? stats.completedLessons.includes(prevUnit.id) : false);

                    // Zig-zag offsets calculations (alternate positions: slightly left, center, slightly right, center)
                    let alignmentClass = "justify-center";
                    let offsetStyle: React.CSSProperties = {};
                    
                    if (idx % 4 === 0) {
                      // Left offset
                      offsetStyle = { transform: "translateX(-48px)" };
                    } else if (idx % 4 === 1) {
                      // Center
                      offsetStyle = { transform: "translateX(0px)" };
                    } else if (idx % 4 === 2) {
                      // Right offset
                      offsetStyle = { transform: "translateX(48px)" };
                    } else if (idx % 4 === 3) {
                      // Center
                      offsetStyle = { transform: "translateX(0px)" };
                    }

                    return (
                      <div
                        key={unit.id}
                        className={`flex w-full ${alignmentClass} items-center`}
                        style={offsetStyle}
                      >
                        {/* Interactive circular learning node */}
                        <div className="relative flex flex-col items-center group">
                          
                          {/* Circular node body with custom colors based on state */}
                          <button
                            onClick={() => handleLanguageUnitClick(unit, !isUnlocked, prevUnit ? prevUnit.title : "")}
                            id={`lang-unit-${unit.id}`}
                            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center transition-all duration-300 relative shadow-md z-10 select-none cursor-pointer border-4 ${
                              isCompleted
                                ? "bg-emerald-500 border-white hover:bg-emerald-600 text-white hover:scale-105 active:scale-95 shadow-emerald-500/20"
                                : isUnlocked
                                ? "bg-emerald-100 border-[#22c55e] hover:bg-emerald-250 text-emerald-800 animate-pulse hover:scale-110 active:scale-95 shadow-emerald-400/30"
                                : "bg-stone-150 border-stone-300 text-stone-400 cursor-not-allowed opacity-85"
                            }`}
                          >
                            {/* Inner icon state */}
                            {isCompleted ? (
                              <div className="flex flex-col items-center">
                                <Crown className="w-5 h-5 text-amber-300 animate-bounce" />
                                <span className="text-[8px] font-mono font-bold tracking-tight uppercase">Lulus</span>
                              </div>
                            ) : isUnlocked ? (
                              <div className="flex flex-col items-center">
                                <Unlock className="w-4 h-4 text-emerald-600 mb-0.5" />
                                <span className="text-[10px] font-sans font-black">{idx + 1}</span>
                              </div>
                            ) : (
                              <Lock className="w-4 h-4 text-stone-400" />
                            )}

                            {/* Level difficulty mini banner hanging on the node */}
                            {isUnlocked && (
                              <div className={`absolute -top-3.5 px-2 py-0.5 rounded-full border text-[8px] font-mono font-black uppercase ${
                                unit.level === "Pemula"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : unit.level === "Menengah"
                                  ? "bg-cyan-50 text-cyan-800 border-cyan-200"
                                  : "bg-purple-50 text-purple-800 border-purple-200"
                              }`}>
                                {unit.level}
                              </div>
                            )}
                          </button>

                          {/* Floating pulsing rings for current active unit only */}
                          {isUnlocked && !isCompleted && (
                            <span className="absolute -inset-1 rounded-full border-2 border-emerald-300 animate-ping opacity-35 pointer-events-none"></span>
                          )}

                          {/* Label beneath or floating around the node */}
                          <div className="mt-3.5 bg-white border border-stone-200 px-3.5 py-1.5 rounded-xl text-center max-w-[160px] shadow-sm z-12">
                            <p className="text-[9px] font-mono font-extrabold text-[#22c55e] uppercase tracking-wide">
                              Unit {idx + 1} • {unit.miniTitle}
                            </p>
                            <h5 className="font-sans font-extrabold text-stone-900 text-[10px] sm:text-xs truncate break-words whitespace-normal" title={unit.title}>
                              {unit.title.replace(/^.* - /, "")}
                            </h5>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Bottom finish victory point */}
              <div className="flex flex-col items-center justify-center mt-12 pt-6 border-t border-stone-100">
                <div className="w-12 h-12 bg-amber-50 rounded-full border-2 border-amber-300 text-amber-600 flex items-center justify-center shadow-md animate-bounce">
                  <Trophy className="w-6 h-6" />
                </div>
                <h4 className="font-sans font-black text-stone-800 text-xs md:text-sm mt-2 uppercase tracking-wide text-center">
                  Gerbang Master Bahasa
                </h4>
                <p className="text-[11px] text-stone-450 mt-0.5 text-center leading-relaxed break-words whitespace-normal">
                  Selesaikan seluruh 6 Unit di atas untuk menguasai kefasihan bersosialisasi secara total dengan dialek pilihan Anda!
                </p>
              </div>

            </div>
          )}
        </div>
      ) : (
        /* TRADITIONAL COMPUTER SCIENCE TRACK VIEW (PRESERVED FUNCTIONAL CAPABILITY) */
        <div id="tech-curriculum-panel" className="space-y-8 animate-fade-in">
          {/* 1. EASY TREE */}
          <div 
            id="tree-mudah"
            className="bg-white border-2 border-stone-200 rounded-[2rem] p-6 relative overflow-hidden transition-all duration-300 shadow-md"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-6 bg-emerald-500 rounded-full"></div>
                <div>
                  <h4 className="font-sans font-extrabold text-sm text-stone-900 tracking-wider uppercase flex items-center gap-1.5">
                    Tree Mudah 🌲
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Terbuka
                    </span>
                  </h4>
                  <p className="text-[11px] text-stone-500">Fondasi utama penulisan kode & internet.</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-stone-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-emerald-500" />
                3 Sub-Materi • +150 EXP Total
              </span>
            </div>

            {/* Nodes flow layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {easyLessons.map((lesson, idx) => {
                const isCompleted = stats.completedLessons.includes(lesson.id);
                const isCurrent = selectedLesson?.id === lesson.id;

                return (
                  <div
                    key={lesson.id}
                    id={`lesson-node-${lesson.id}`}
                    onClick={() => handleTechLessonClick(lesson)}
                    className={`group relative rounded-2xl p-4 border transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? "border-[#22c55e] ring-2 ring-emerald-500/10 bg-emerald-50/10 translate-y-[-2px]"
                        : isCompleted
                        ? "border-emerald-500/30 hover:border-emerald-400 bg-emerald-50/5"
                        : "border-stone-200 bg-stone-50 hover:border-stone-300 hover:bg-stone-55"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-250 font-mono text-xs text-emerald-800 font-bold">
                        0{idx + 1}
                      </div>
                      {isCompleted && (
                        <div className="bg-emerald-100 text-emerald-800 p-1 rounded-full border border-emerald-350">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <h5 className="font-sans font-bold text-stone-900 group-hover:text-emerald-700 text-xs md:text-sm mt-3 transition-colors uppercase tracking-tight">
                      {lesson.title}
                    </h5>
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                      {lesson.shortDesc}
                    </p>

                    <div className="flex items-center gap-1 mt-4 text-[10px] font-mono font-bold text-emerald-750">
                      <Star className="w-3 h-3 fill-emerald-500/20 text-emerald-600" />
                      +50 EXP
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. MEDIUM TREE */}
          <div 
            id="tree-sedang"
            onClick={() => handleTechTreeUnlockClick("sedang")}
            className={`bg-white border-2 border-stone-200 rounded-[2rem] p-6 relative overflow-hidden transition-all duration-300 cursor-pointer shadow-md ${
              isTechCategoryUnlocked("sedang")
                ? "text-stone-850"
                : "grayscale opacity-85 hover:opacity-100 bg-[#FAF9F5]"
            }`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

            {/* Locked Overlay Screen */}
            {!isTechCategoryUnlocked("sedang") && (
              <div className="absolute inset-0 bg-[#FDFCF8]/95 flex flex-col items-center justify-center z-20 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-3 animate-bounce shadow-sm">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-sans font-extrabold text-sm text-cyan-800 uppercase tracking-widest">
                  GERBANG TREE SEDANG LOCKED!
                </h4>
                <p className="text-xs text-stone-500 mt-1 max-w-sm leading-relaxed">
                  Kamu butuh akumulasi <span className="text-cyan-700 font-extrabold">500 EXP</span> untuk mengupgrade gerbang ini.
                </p>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTechTreeUnlockClick("sedang");
                  }}
                  type="button"
                  className="mt-3.5 px-4.5 py-2.5 text-xs font-sans font-bold bg-cyan-600 hover:bg-cyan-750 border border-cyan-500 rounded-xl text-white shadow-xl shadow-cyan-600/10 transition-all cursor-pointer"
                >
                  Fasilitasi Upgrade • Tebus Gerbang 500 EXP
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-6 bg-cyan-500 rounded-full"></div>
                <div>
                  <h4 className="font-sans font-extrabold text-sm text-stone-900 tracking-wider uppercase flex items-center gap-1.5">
                    Tree Sedang 🚀
                    <span className="text-[10px] bg-cyan-50 text-cyan-800 px-2.5 py-0.5 rounded-full border border-cyan-200">
                      Terbuka (Premium)
                    </span>
                  </h4>
                  <p className="text-[11px] text-stone-500">Algoritma AI, struktur data kompleks, dan machine learning.</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-stone-405 flex items-center gap-1">
                <Unlock className="w-3.5 h-3.5 text-cyan-500" />
                3 Sub-Materi • +150 EXP Total
              </span>
            </div>

            {/* Nodes flow layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mediumLessons.map((lesson, idx) => {
                const isCompleted = stats.completedLessons.includes(lesson.id);
                const isCurrent = selectedLesson?.id === lesson.id;

                return (
                  <div
                    key={lesson.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTechLessonClick(lesson);
                    }}
                    className={`group relative rounded-2xl p-4 border transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? "border-cyan-500 ring-2 ring-cyan-500/15 bg-cyan-50/10 translate-y-[-2px]"
                        : isCompleted
                        ? "border-cyan-500/30 hover:border-cyan-400 bg-cyan-50/5"
                        : "border-stone-200 bg-stone-50 hover:border-stone-300 hover:bg-stone-55"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-50 border border-cyan-250 font-mono text-xs text-cyan-800 font-bold">
                        0{idx + 1}
                      </div>
                      {isCompleted && (
                        <div className="bg-cyan-100 text-cyan-800 p-1 rounded-full border border-cyan-300">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <h5 className="font-sans font-bold text-stone-900 group-hover:text-cyan-700 text-xs md:text-sm mt-3 transition-colors uppercase tracking-tight">
                      {lesson.title}
                    </h5>
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                      {lesson.shortDesc}
                    </p>

                    <div className="flex items-center gap-1 mt-4 text-[10px] font-mono font-bold text-cyan-755">
                      <Star className="w-3 h-3 fill-cyan-500/20 text-cyan-600" />
                      +50 EXP
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. HARD TREE */}
          <div 
            id="tree-susah"
            onClick={() => handleTechTreeUnlockClick("susah")}
            className={`bg-white border-2 border-stone-200 rounded-[2rem] p-6 relative overflow-hidden transition-all duration-300 cursor-pointer shadow-md ${
              isTechCategoryUnlocked("susah")
                ? "text-stone-850"
                : "grayscale opacity-85 hover:opacity-100 bg-[#FAF9F5]"
            }`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>

            {/* Locked Overlay Screen */}
            {!isTechCategoryUnlocked("susah") && (
              <div className="absolute inset-0 bg-[#FDFCF8]/95 flex flex-col items-center justify-center z-20 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-3 animate-bounce shadow-sm">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-sans font-extrabold text-sm text-purple-800 uppercase tracking-widest">
                  GERBANG TREE SUSAH LOCKED!
                </h4>
                <p className="text-xs text-stone-500 mt-1 max-w-sm leading-relaxed">
                  Kamu butuh akumulasi <span className="text-purple-700 font-extrabold">1000 EXP</span> untuk mengupgrade gerbang ini.
                </p>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTechTreeUnlockClick("susah");
                  }}
                  type="button"
                  className="mt-3.5 px-4.5 py-2.5 text-xs font-sans font-bold bg-purple-600 hover:bg-purple-750 border border-purple-500 rounded-xl text-white shadow-xl shadow-purple-600/10 transition-all cursor-pointer"
                >
                  Fasilitasi Upgrade • Tebus Gerbang 1000 EXP
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-6 bg-purple-500 rounded-full"></div>
                <div>
                  <h4 className="font-sans font-extrabold text-sm text-stone-900 tracking-wider uppercase flex items-center gap-1.5">
                    Tree Susah 🔥
                    <span className="text-[10px] bg-purple-50 text-purple-800 px-2.5 py-0.5 rounded-full border border-purple-200">
                      Terbuka (Master)
                    </span>
                  </h4>
                  <p className="text-[11px] text-stone-500">Saraf buatan tingkat lanjut, model transformer bahasa, dan teori komputasi milenium.</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-stone-405 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-purple-500" />
                3 Sub-Materi • +150 EXP Total
              </span>
            </div>

            {/* Nodes flow layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hardLessons.map((lesson, idx) => {
                const isCompleted = stats.completedLessons.includes(lesson.id);
                const isCurrent = selectedLesson?.id === lesson.id;

                return (
                  <div
                    key={lesson.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTechLessonClick(lesson);
                    }}
                    className={`group relative rounded-2xl p-4 border transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? "border-purple-550 ring-2 ring-purple-500/15 bg-purple-50/10 translate-y-[-2px]"
                        : isCompleted
                        ? "border-purple-500/30 hover:border-purple-400 bg-purple-50/5"
                        : "border-stone-200 bg-stone-50 hover:border-stone-300 hover:bg-stone-55"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-50 border border-purple-250 font-mono text-xs text-purple-800 font-bold">
                        0{idx + 1}
                      </div>
                      {isCompleted && (
                        <div className="bg-purple-100 text-purple-800 p-1 rounded-full border border-purple-300">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <h5 className="font-sans font-bold text-stone-900 group-hover:text-purple-700 text-xs md:text-sm mt-3 transition-colors uppercase tracking-tight">
                      {lesson.title}
                    </h5>
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                      {lesson.shortDesc}
                    </p>

                    <div className="flex items-center gap-1 mt-4 text-[10px] font-mono font-bold text-purple-755">
                      <Star className="w-3 h-3 fill-purple-500/20 text-purple-600" />
                      +50 EXP
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
