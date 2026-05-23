 import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

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
  function generateLocalChatResponse(messages: any[], topic: string): string {
    try {
      const lastUserMsg = [...messages].reverse().find(m => m.role === "user")?.content || "";
      const query = lastUserMsg.toLowerCase();
      
      const intro = `🎓 **[StudySuki Offline Mode]** Halo pembelajar hebat! Karena lalu lintas platform masa ini sedang sangat padat, saya beralih sementara ke asisten tanggap cerdas mandiri lokal agar belajarmu tetap lancar tanpa hambatan!

Terkait sub-materi kita hari ini: **"${topic}"**.\n\n`;

      if (query.includes("halo") || query.includes("hai") || query.includes("pagi") || query.includes("siang") || query.includes("sore") || query.includes("malam")) {
        return `${intro}Hai! Senang bisa berbincang denganmu lagi. Saya siap membimbing pemahamanmu melompati tantangan peta kursus ini.

Untuk memulai, mari kita fokus ulas sub-materi **"${topic}"**. Apakah kamu ingin bertanya seputar tata bahasa, menceritakan cara pelafalan kata, atau menelaah kuis? Utarakan saja apa yang masih mengganjal di pikiranmu ya!`;
      } 
      
      if (query.includes("kuis") || query.includes("soal") || query.includes("jawab") || query.includes("ujian")) {
        return `${intro}Mengerjakan kuis adalah sarana ampuh melatih ingatan aktif otak kita! 

Pada setiap sub-materi **"${topic}"** di aplikasi StudySuki, kamu akan disajikan pertanyaan pilihan ganda yang dirancang cermat.

💡 **Saran Sukses:**
1. Pelajari panduan teks rangkuman di layar tengah.
2. Amati susunan contoh kalimat dan transkrip suaranya.
3. Ingat, menjawab kuis dengan tepat akan menyumbang **+50 EXP** berharga untuk profil belajarmu!`;
      } 
      
      if (query.includes("bantuan") || query.includes("help") || query.includes("cara") || query.includes("tips") || query.includes("belajar") || query.includes("sulit")) {
        return `${intro}Merasa kesulitan di awal mempelajari bahasa baru adalah bukti bahwa sel-sel otakmu sedang berkembang kreatif membentuk relasi memori baru!

Berikut kiat jitu menaklukkan materi **"${topic}"**:
- 🗣️ **Asosiasi Bunyi**: Lafalkan kalimat contoh keras-keras mengikuti transkrip fonetis untuk melatih refleks motorik mulut.
- 📝 **Tulis Mandiri**: Cobalah menulis ulang minimal 3 kosakata baru dari sub-materi ini di selembar kertas.
- 🎯 **Fokus Bertahap**: Mulai dari kuis Pemula yang lebih mudah sebelum beralih ke tantangan Menengah dan Master.`;
      } 
      
      if (query.includes("terjemah") || query.includes("arti") || query.includes("artinya") || query.includes("kamus")) {
        return `${intro}Mempelajari arti kata dan membandingkannya secara kontekstual membantu kita memahami logika berpikir penutur asli bahasa tersebut.

Dalam sub-materi **"${topic}"**, setiap contoh kalimat telah dilengkapi dengan ejaan Pinyin/fonetik yang ramah pembelajar serta terjemahan harfiah yang jernih agar kamu langsung paham tujuannya dalam sekali lihat!`;
      }

      // General intelligent tutoring fallback
      return `${intro}Itu pertanyaan yang sangat bagus untuk didiskusikan! Mari kita bedah konsep penting ini bersama-sama.

Bila membahas sub-materi **"${topic}"**, ada beberapa pilar utama yang patut kita cermati:
1. **Aturan Sintaksis**: Amati susunan urutan subjek (S), predikat (V), dan objek (O) apakah ada perubahan unik dibanding Bahasa Indonesia biasa.
2. **Kekayaan Kosakata**: Cermati istilah khusus, getaran huruf, atau tanda baca yang dipelajari.
3. **Praktek Mandiri**: Cobalah bayangkan satu skenario percakapan singkat di kepalamu yang menggunakan ungkapan baru ini dalam tugas barumu kelak.

Ayo tuntaskan materi pembelajaran di panel sebelah kiri dan selesaikan kuis di bawahnya! Semangat belajar tak boleh padam! 💪`;
    } catch (e) {
      return `🎓 **[StudySuki Offline Mode]** Halo! Saya asisten pintar StudySuki. Kamu sedang belajar sub-materi **"${topic}"**. Mari cermati panduan di layar sebelah kiri, ulas kalimat contohnya secara seksama, lalu tuntaskan kuisnya dengan benar untuk meraih kuis sukses dan mendulang **+50 EXP**!`;
    }
  }

  // API Route for Study chat explanations
  app.post("/api/chat", async (req: any, res: any) => {
    try {
      const { messages, topic, taskContext } = req.body;
      
      if (!ai) {
        const fallbackText = generateLocalChatResponse(messages || [], topic || "Belajar Bahasa");
        return res.json({ text: fallbackText });
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
      console.warn("Gemini Study Tutor API rate-limited or failed. Using highly smart dynamic local Indonesian fallback explainer.", error.message || error);
      const fallbackText = generateLocalChatResponse(req.body.messages || [], req.body.topic || "Belajar Bahasa");
      res.json({ text: fallbackText });
    }
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
        const localAdvice = generateLocalChessAdvice(boardState, movesHistory, difficulty);
        return res.json({ advice: localAdvice });
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
      console.warn("Chess adviser API rate-limited or failed. Using highly smart dynamic local Indonesian fallback evaluator.", error.message || error);
      const fallbackAdvice = generateLocalChessAdvice(boardState, movesHistory, difficulty);
      res.json({ advice: fallbackAdvice });
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
