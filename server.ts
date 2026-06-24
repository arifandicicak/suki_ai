 import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ override: true });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client if key exists
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("Gemini client initialized successfully.");
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI:", err);
    }
  } else {
    console.warn("GEMINI_API_KEY is not defined. AI Study companion will operate with beautiful local smart responses.");
  }

  // Dynamic Local Indonesian Study Tutor Companion (acts as robust offline fallback when rate-limited or API is unavailable)
  function generateLocalChatResponse(messages: any[], topic: string, taskContext: string = ""): string {
    try {
      const lastUserMsg = [...messages].reverse().find(m => m.role === "user")?.content || "";
      const query = lastUserMsg.toLowerCase();
      
      const isGajahMada = taskContext.includes("Gajah Mada");
      const isTolkien = taskContext.includes("Tolkien");
      const isKenArok = taskContext.includes("Ken Arok");
      
      let intro = "";
      if (isGajahMada) {
        intro = `⚔️ **[Sabda Mahapatih Gajah Mada - Offline Mode]** Demi Sumpah Palapa yang menggetarkan Nusantara! Aku, Mahapatih Gajah Mada, beralih ke saluran taktis cadangan kerajaan demi membimbing belajarmu tentang **"${topic}"**! 🐘\n\n`;
      } else if (isTolkien) {
        intro = `📜 **[J.R.R. Tolkien - Offline Mode]** Ah, pengelana budiman! Angin utara membawa kabut tebal, namun pena kita tidak akan berhenti menulis kisah agung **"${topic}"**. Selamat datang di perpustakaan legenda! ✒️\n\n`;
      } else if (isKenArok) {
        intro = `👑 **[Ken Arok - Offline Mode]** Berani sekali engkau menghadap sang Raja Singasari! Kerajaan sedang dalam transisi taktik, namun titah pendidikan tentang **"${topic}"** tetap harus menyala! 🗡️\n\n`;
      } else {
        intro = `🌸 **[Suki Off-line Mode]** OwO! Halooo kawan belajarku! Karena sinyal dari angkasa sedang padat merayap (kuota harian habis), Suki beralih ke mode offline ceria untukmu! ✨💖\n\nKira-kira tentang sub-materi **"${topic}"**, ada yang bisa Suki bantuin? >w<\n\n`;
      }

      // 1. Gajah Mada responses
      if (isGajahMada) {
        if (query.includes("halo") || query.includes("hai") || query.includes("pagi") || query.includes("siang") || query.includes("sore") || query.includes("malam") || query.includes("salam")) {
          return `${intro}Salam sejahtera, ksatria tangguh! Kehadiranmu membakar semangat juang di balairung Singasari dan Majapahit. Untuk menaklukkan **"${topic}"** ini, persiapkan ketajaman pikiranmu bagai bilah keris pusaka!\n\nApakah ada bait naskah kuno, tata bahasa, atau kuis yang ingin engkau bedah denganku hari ini? Katakan, dan kita akan taklukkan bersama!`;
        }
        if (query.includes("kuis") || query.includes("soal") || query.includes("jawab") || query.includes("ujian")) {
          return `${intro}Ujian dan kuis adalah medan laga rahasia untuk menempa keahlian bertarungmu!\n\nDalam tantangan **"${topic}"**, setiap rintangan yang kamu lalui dengan tepat akan menuai penghargaan agung berupa **+50 EXP**! Bacalah teks rangkuman di layar tengah dengan saksama bagai membaca taktik perang musuh sebelum menyerbu!`;
        }
        if (query.includes("bantuan") || query.includes("cara") || query.includes("tips") || query.includes("belajar") || query.includes("sulit")) {
          return `${intro}Rasa ragu dan kesulitan di awal perjalanan adalah hal lumrah bagi calon pemimpin besar Nusantara. Gunakan kiat ksatria ini:\n- 🎯 **Konsentrasi Penuh**: Matikan segala gangguan di sekitarmu.\n- 🗣️ **Nyaringkan Suara**: Lafalkan contoh kalimat di layar agar lidahmu terbiasa.\n- 🏆 **Ulangi Latihan**: Jangan menyerah jika gagal di kuis pertama, bangkitlah dan asah pedang pengetahuanmu sekali lagi!`;
        }
        return `${intro}Pertanyaan yang sangat berbobot! Dalam mengarungi sub-materi **"${topic}"**, ingatlah selalu tiga pilar keilmuan Majapahit:\n1. **Sintaksis (Tata Atur)**: Amati bagaimana kata-kata dirangkai membentuk makna agung.\n2. **Kosa Istilah**: Cermati setiap kata dan getaran suaranya.\n3. **Amalan**: Jangan hanya disimpan dalam benak, suarakan dan tulis agar abadi.\n\nAyo, selesaikan peta petualangan dan tuntaskan kuis di bawah agar nama kebesaranmu terpahat di prasasti kejayaan! 🚩`;
      }

      // 2. Tolkien responses
      if (isTolkien) {
        if (query.includes("halo") || query.includes("hai") || query.includes("pagi") || query.includes("siang") || query.includes("sore") || query.includes("malam")) {
          return `${intro}Salam hangat di bawah naungan pohon emas! Duduklah di dekat perapian. Mempelajari bahasa dan legenda baru bagaikan menguak peta rahasia menuju kerajaan kuno yang hilang.\n\nMari kita jelajahi misteri sub-materi **"${topic}"** bersama. Bertanyalah sesukamu, apakah tentang mitologi, tata bahasa peri, atau kuis epik!`;
        }
        if (query.includes("kuis") || query.includes("soal") || query.includes("jawab") || query.includes("ujian")) {
          return `${intro}Kuis bukanlah sekadar soal, melainkan teka-teki kuno di gerbang bawah tanah Khazad-dûm! Hanya jiwa yang jeli yang mampu memecahkannya.\n\nSelesaikan tantangan kuis **"${topic}"** di bawah layar untuk membuktikan ketajaman visimu, dan dapatkan upeti agung senilai **+50 EXP**!`;
        }
        if (query.includes("bantuan") || query.includes("cara") || query.includes("tips") || query.includes("belajar") || query.includes("sulit")) {
          return `${intro}Bahkan Hobbit terkecil pun bisa mengubah jalannya masa depan! Jika belajarmu terasa berat, camkan nasihat elf ini:\n- ✍️ **Lestarikan Catatan**: Tuliskan kata sulit dengan tintamu sendiri.\n- 🎧 **Dengarkan Angin**: Putar transkrip audio berulang kali untuk menangkap intonasi aslinya.\n- ⏳ **Sabar & Setia**: Satu langkah demi satu langkah akan membawamu melewati puncak gunung bersalju!`;
        }
        return `${intro}Pertanyaanmu sungguh kaya akan gairah keingintahuan! Menilik aspek **"${topic}"**, kita sedang menapaki jalan pemikiran yang memikat.\n\nFokuslah mempelajari kosakata baru ini dan selesaikan seluruh pos latihan di layar sebelah kiri. Kemenangan belajar menantimu di ujung petualangan! 🏹`;
      }

      // 3. Ken Arok responses
      if (isKenArok) {
        if (query.includes("halo") || query.includes("hai") || query.includes("pagi") || query.includes("siang") || query.includes("sore") || query.includes("malam")) {
          return `${intro}Kukira siapa yang berani mengetuk gerbang takhta! Senang melihat ambisi membara di matamu. Bagiku, menguasai tatabahasa **"${topic}"** tak ubahnya merancang strategi merebut takhta kerajaan!\n\nKatakan, apa yang ingin kau kuasai terlebih dulu? Biar kuajari caraku menaklukkan dunia!`;
        }
        if (query.includes("kuis") || query.includes("soal") || query.includes("jawab") || query.includes("ujian")) {
          return `${intro}Setiap kuis di unit **"${topic}"** adalah rintangan yang dipasang takdir untuk menguji nyalimu!\n\nJawab dengan tegas dan kumpulkan **+50 EXP** demi memperluas wilayah kekuasaanmu di papan klasemen!`;
        }
        return `${intro}Ambisi adalah separuh dari kemenangan! Dalam mempelajari **"${topic}"**, jangan biarkan keraguan memperlambat langkahmu!\n\nSelesaikan babak pembelajaran di sebelah kiri dan kuasai ujian kuis di bawah ini sekarang juga!`;
      }

      // 4. Cheerful Suki Mascot responses
      if (query.includes("halo") || query.includes("hai") || query.includes("pagi") || query.includes("siang") || query.includes("sore") || query.includes("malam")) {
        return `${intro}Yaaaay! Halo sahabat belajarku yang imut dan rajin! Suki senang banget deh bisa nemenin kamu belajar **"${topic}"** lagi hari ini! UwO\n\nYuk, biar makin akrab, kamu mau nanya apa nih tentang materi hari ini? Suki siap kasi tips lucu biar belajarnya gak ngebosenin! ✨🌸`;
      } 
      
      if (query.includes("kuis") || query.includes("soal") || query.includes("jawab") || query.includes("ujian")) {
        return `${intro}Waaaa! Ada kuis seru menantimu, lho! >w<\n\nMengerjakan kuis itu seru banget, kayak dapet peti harta karun rahasia! Setiap jawaban benar bakal ngasih kamu **+50 EXP** buat naikin level karakter belajarmu! 💖\n\n🌸 **Tips Imut dari Suki:** Bacalah ringkasan materi di sebelah kiri dulu, dengerin audionya baik-baik, terus jawab deh kuis cerianya!`;
      } 
      
      if (query.includes("bantuan") || query.includes("help") || query.includes("cara") || query.includes("tips") || query.includes("belajar") || query.includes("sulit")) {
        return `${intro}Uuuh, materi **"${topic}"** bikin pusing ya? Tenang, Suki ada di sini bareng kamu! Suki peluk dulu biar pusingnya hilang! ＼(★^∀^★)／\n\nBiar gampang taklukin materinya, coba cara comel ini:\n- 🗣️ **Ikutin Suki**: Tirukan kalimat contoh keras-keras biar lidahnya gak kaku!\n- 💖 **Bayangin Skenario**: Bayangkan kamu lagi ngomong langsung sama bule imut di sana!\n- 🍩 **Istirahat Sebentar**: Kalau lelah, makan donat dulu, lalu coba lagi kuisnya, pasti bisa!`;
      } 
      
      if (query.includes("terjemah") || query.includes("arti") || query.includes("artinya") || query.includes("kamus")) {
        return `${intro}Mempelajari arti kata dan membandingkannya bikin kita makin peka sama logika bahasa tersebut, lho! 💡\n\nDi materi **"${topic}"**, kosa kata baru semuanya udah Suki kasih arti yang jernih dan gampang diingat! Yuk dibaca kembali daftar kosakatanya biar makin mantap!`;
      }

      // General intelligent Suki Mascot conversational fallback
      return `${intro}Ooh! Itu pertanyaan yang baguuuus banget! Suki kagum sama rasa penasaranmu! >w<\n\nJadi, pas kita bahas materi **"${topic}"**, ada beberapa rahasia seru yang perlu diingat nih:\n1. **Tata Urutan Kata 📝**: Cek apakah subjek sama objeknya agak beda posisi dibanding Bahasa Indonesia.\n2. **Bunyi Unik 🗣️**: Tirukan terus intonasinya berulang kali!\n3. **Coba Sendiri ✨**: Tulis ulang di buku belajarmu ya!\n\nYuk, selesaikan peta petualangan di sebelah kiri dan tuntaskan kuis seru biar dapet **+50 EXP**! Go, go, semangat belajarnya! 🌸🔥`;
    } catch (e) {
      return `🌸 **[Suki Off-line Mode]** Halo kawan belajarku! Suki beralih ke mode offline ceria demi membimbing belajarmu tentang **"${topic}"**. Mari cermati kartu panduan di sebelah kiri dan kerjakan kuisnya untuk mengumpulkan **+50 EXP** emas! ✨`;
    }
  }

  // API Route for Study chat explanations
  app.post("/api/chat", async (req: any, res: any) => {
    try {
      const { messages, topic, taskContext } = req.body;
      
      if (!ai) {
        return res.json({ text: "⚠️ Sistem AI Gemini belum terkoneksi. Mohon buka pengaturan **Secrets** di AI Studio dan tambahkan **GEMINI_API_KEY** Anda agar Suki dapat membantu secara langsung." });
      }

      const systemPrompt = `You are StudySuki AI, an engaging, supportive, and clever bilingual (Indonesian/English, predominantly Indonesian) AI tutor for students.
You are helping the student study the topic: "${topic}".
Context about student's current task: ${taskContext || 'Learning sub-material.'}
Provide insightful, concise, clear, and easy-to-understand explanations. Include analogies, code snippets, or bullet points if applicable. Form responses nicely in markdown format. Keep answers medium-length so they are highly readable on card interfaces.`;

      // Format messages into contents array
      const contents = messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      const errMsg = error.message || String(error);
      if (error.status === "RESOURCE_EXHAUSTED" || error.status === 429 || errMsg.includes("quota") || errMsg.includes("429")) {
        console.warn(`[Gemini API Quota Exceeded] 429 - Falling back gracefully to rich local smart companion for: "${req.body.topic || 'unknown'}"`);
      } else {
        console.warn("Gemini Study Tutor API failed. Falling back to local smart engine.", errMsg);
      }
      
      const { messages, topic, taskContext } = req.body;
      const fallbackText = generateLocalChatResponse(messages || [], topic || "Bahasa & Budaya", taskContext || "");
      res.json({ text: fallbackText });
    }
  });

  // Secure API endpoint to deliver Firebase configuration without hardcoding it in client-side HTML/JS source code
  app.get("/api/firebase-config", (req: any, res: any) => {
    try {
      const configPath = path.join(process.cwd(), "firebase-applet-config.json");
      if (fs.existsSync(configPath)) {
        const configRaw = fs.readFileSync(configPath, "utf-8");
        return res.json(JSON.parse(configRaw));
      }
    } catch (err) {
      console.error("Failed to read firebase-applet-config.json:", err);
    }
    // Return empty configuration gracefully if not present
    res.json({
      projectId: "",
      appId: "",
      apiKey: "",
      authDomain: "",
      firestoreDatabaseId: "",
      storageBucket: "",
      messagingSenderId: "",
      measurementId: ""
    });
  });

  // Dynamic Local Indonesian Chess Coaching Advisor (acts as robust offline fallback when rate-limited)
  function generateLocalChessAdvice(boardState: any, movesHistory: string, difficulty: string): string {
    try {
      if (!boardState || !Array.isArray(boardState)) {
        return "Kembangkan perwira kecilmu ke petak aktif di pusat papan dan amankan posisi Rajamu.";
      }

      let whiteMaterial = 0;
      let blackMaterial = 0;
      let whitePiecesCount = 0;
      let blackPiecesCount = 0;
      
      let whiteKingPos = { r: -1, c: -1 };
      let whiteQueenAlive = false;
      let blackQueenAlive = false;

      for (let r = 0; r < 8; r++) {
        if (!boardState[r] || !Array.isArray(boardState[r])) continue;
        for (let c = 0; c < 8; c++) {
          const piece = boardState[r][c];
          if (piece && typeof piece === 'object') {
            const type = piece.type;
            const color = piece.color;
            
            let val = 0;
            if (type === 'p') val = 1;
            else if (type === 'n') val = 3;
            else if (type === 'b') val = 3;
            else if (type === 'r') val = 5;
            else if (type === 'q') val = 9;

            if (color === 'w') {
              whiteMaterial += val;
              whitePiecesCount++;
              if (type === 'k') whiteKingPos = { r, c };
              if (type === 'q') whiteQueenAlive = true;
            } else if (color === 'b') {
              blackMaterial += val;
              blackPiecesCount++;
              if (type === 'q') blackQueenAlive = true;
            }
          }
        }
      }

      const totalPieces = whitePiecesCount + blackPiecesCount;
      const isOpening = totalPieces >= 24;
      const isEndgame = totalPieces <= 10;
      const justCaptured = movesHistory && (movesHistory.includes("makan") || movesHistory.includes("capture") || movesHistory.includes("➔"));

      const openingTips = [
        "Kuasai empat petak pusat (e4, d4, e5, d5) di awal laga demi mendominasi ruang gerak perwira!",
        "Fokus kembangkan perwira kecilmu (Kuda & Gajah) ke petak aktif sebelum meluncurkan serangan menteri.",
        "Siapkan kastil (rokade) seawal mungkin untuk menempatkan Rajamu di posisi berlindung yang aman.",
        "Awas taktik serbuan kilat di sayap f2/f7. Kuatkan koordinasi pion pertahananmu sejak awal.",
        "Keluarkan Kuda ke pusat daripada pinggir papan demi jangkauan serang yang maksimal."
      ];

      const middlegameTips = [
        "Arahkan Bentengmu ke lajur terbuka (open files) untuk mendukung manuver serang jarak jauh.",
        "Waspadai perwira AI yang tidak terkawal (undefended pieces), manfaatkan taktik garpusala (fork) jika ada celah!",
        "Menteri sangat kuat dalam kombinasi dengan Kuda atau Gajah perkasa di garis serang terpapar.",
        "Perbaiki struktur pionmu dan pasang jebakan paku (pin) pada gajah atau kuda musuh.",
        "Sebelum memajukan pion penyerang terlalu jauh, pastikan petak pertahanan Rajamu tetap kokoh."
      ];

      const endgameTips = [
        "Di akhir pertandingan, aktifkan Rajamu! Dorong ia naik mendekati baris pusat untuk mendukung promosi pion.",
        "Pion bebas (passed pawn) adalah tiket emas. Kawal ketat ia melaju hingga baris promosi kedelapan!",
        "Utamakan mempermudah penyerangan. Jika kamu unggul materi, beralihlah ke pertukaran perwira yang setara.",
        "Maksimalkan kekuatan Benteng untuk memutus pergerakan Raja musuh di baris belakang.",
        "Gunakan oposisi Raja untuk mendesak pertahanan kubu lawan dan membuka celah kemenangan."
      ];

      const generalTips = [
        "Selalu periksa ancaman lawan sebelum mematangkan keputusan melangkah. Kewaspadaan adalah kunci!",
        "Fokuslah pada perlindungan perwira yang tidak terjaga dan koordinasi taktis tingkat tinggi.",
        "Miliki rencana jangka panjang: kuasai baris pusat, minimalkan kelemahan pion, dan manfaatkan blunder AI.",
        "Taktik serangan pin/fork bisa dengan cepat mengecoh lawan di tingkat kesulitan kritis.",
        "Tetap tenang! Lindungi perwiramu yang terancam dan kendalikan pusat pertarungan."
      ];

      if (justCaptured) {
        if (whiteMaterial > blackMaterial) {
          return "Langkah cerdas! Kamu sedang unggul keuntungan materi. Teruskan dominasi ini dan sederhanakan permainan.";
        } else {
          return "Terjadi pertukaran sengit di papan! Pastikan posisi pengawalan Rajamu tidak runtuh setelah aksi ini.";
        }
      }

      if (whiteKingPos.r !== -1) {
        const kr = whiteKingPos.r;
        const kc = whiteKingPos.c;
        let kingGuarded = false;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = kr + dr;
            const nc = kc + dc;
            if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
              const neighboringPiece = boardState[nr][nc];
              if (neighboringPiece && neighboringPiece.color === 'w') {
                kingGuarded = true;
              }
            }
          }
        }
        if (!kingGuarded && kr <= 6) {
          return "Rajamu tampak sedikit terbuka tanpa pengawal dekat. Rapatkan kembali perwiramu sebelum AI menyusun serangan balik.";
        }
      }

      if (!blackQueenAlive && whiteQueenAlive) {
        return "Menteri hitam lawan sudah gugur! Ini adalah kesempatan emas bagimu untuk bermanuver menguasai papan.";
      }

      if (whiteMaterial > blackMaterial + 2) {
        return `Kamu memimpin materi dengan keunggulan +${whiteMaterial - blackMaterial}! Lompati perwira musuh dan selesaikan tantangan dengan cermat.`;
      }

      if (blackMaterial > whiteMaterial + 1) {
        return "Kamu sedikit tertinggal materi. Fokus pada taktik ganda (fork/skew) untuk merebut kembali keuntungan.";
      }

      if (isOpening) {
        const idx = Math.floor((totalPieces * 7) % openingTips.length);
        return openingTips[idx];
      } else if (isEndgame) {
        const idx = Math.floor((totalPieces * 11) % endgameTips.length);
        return endgameTips[idx];
      } else {
        const idx = Math.floor((totalPieces * 13) % middlegameTips.length);
        return middlegameTips[idx];
      }
    } catch (e) {
      return "Kuasai bagian pusat papan dengan pionmu, kembangkan seluruh perwira aktif, dan siapkan rokade amankan Raja!";
    }
  }

  // API Route for Chess AI move hints / commentary
  app.post("/api/chess-move", async (req: any, res: any) => {
    const { boardState, movesHistory, pgn, difficulty } = req.body;
    try {
      if (!ai) {
        return res.json({ advice: "⚠️ AI Gemini tidak terdeteksi. Harap pasang **GEMINI_API_KEY** di pengaturan Secrets Anda untuk mendapatkan nasihat taktis." });
      }

      const prompt = `We are playing chess. Difficulty: "${difficulty || 'Sedang'}"
White is User, Black is AI.
History of moves: "${movesHistory || 'Game started'}"
Recent board representation: "${JSON.stringify(boardState)}"
Provide a brief, clever commentary or tactical advice in Indonesian (max 2 sentences) for the white player (User), telling them a tip or motivating them about their current position. Make it educational, referencing chess principles!`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a professional, motivating friendly Indonesian chess Grandmaster coaching a student.",
          temperature: 0.7,
        }
      });

      res.json({ advice: response.text });
    } catch (error: any) {
      const errMsg = error.message || String(error);
      if (error.status === "RESOURCE_EXHAUSTED" || error.status === 429 || errMsg.includes("quota") || errMsg.includes("429")) {
        console.warn("[Gemini Chess Quota Exceeded] 429 - Falling back gracefully to Chess Advisor local engine.");
      } else {
        console.error("Chess adviser API error. Falling back to local advisor.", errMsg);
      }
      const advice = generateLocalChessAdvice(boardState, movesHistory, difficulty);
      res.json({ advice: `[Local Advisor] ${advice}` });
    }
  });

  // API Route for Speech Practice AI Analysis
  app.post("/api/analyze-speech", async (req: any, res: any) => {
    const { spokenText, targetPhrase, langCode } = req.body;
    try {
      if (!ai) {
        return res.json({ error: "Gemini API key is not configured." });
      }

      const systemPrompt = `You are an expert language teacher.
Compare the user's spoken text ("${spokenText}") with the target phrase ("${targetPhrase}").
Evaluate their pronunciation/accuracy.
Provide:
1. A boolean 'isCorrect' (80% or higher).
2. A 'feedback' message, explaining specifically what they got wrong if incorrect, in Indonesian, for a language learner.
Format as JSON: { "isCorrect": boolean, "feedback": string, "accuracyScore": number }`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [{role: "user", parts: [{text: `Spoken: "${spokenText}", Target: "${targetPhrase}"`}]}],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      });
      
      res.json(JSON.parse(response.text));
    } catch (error: any) {
      const errMsg = error.message || String(error);
      if (error.status === "RESOURCE_EXHAUSTED" || error.status === 429 || errMsg.includes("quota") || errMsg.includes("429")) {
        console.warn("[Gemini Speech Quota Exceeded] 429 - Falling back gracefully to localized speech analysis matcher.");
      } else {
        console.error("Speech analysis error. Falling back to simple matching.", errMsg);
      }
      // Basic local matching if AI fails
      const similarity = spokenText.toLowerCase() === targetPhrase.toLowerCase() ? 100 : 70;
      res.json({ 
        isCorrect: similarity >= 80, 
        feedback: "Koneksi AI sedang sibuk. Pastikan pelafalanmu jelas dan ikuti contoh suara yang tersedia!", 
        accuracyScore: similarity 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
