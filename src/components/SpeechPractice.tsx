import React, { useState } from "react";
import { Mic, Volume2, Sparkles, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

interface SpeechPracticeProps {
  phrase: string;
  translation: string;
  langCode: string; // e.g. 'en', 'de', 'es'
}

export default function SpeechPractice({ phrase, translation, langCode }: SpeechPracticeProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Map language codes to standard BCP-47 language tags for Speech Recognition & Synthesis
  const getBcpTag = (code: string): string => {
    const map: Record<string, string> = {
      en: "en-US",
      de: "de-DE",
      es: "es-ES",
      fr: "fr-FR",
      tr: "tr-TR",
      id: "id-ID",
      jv: "id-ID",   //fallback
      pap: "id-ID",  //fallback
      mc: "fr-FR",   //fallback
      th: "th-TH",
      jp: "ja-JP",
      zh: "zh-CN"
    };
    return map[code] || "id-ID";
  };

  // Speaks target phrase via Web SpeechSynthesis
  const speakAsBuddy = () => {
    if (!("speechSynthesis" in window)) {
      alert("Maaf, fitur Speech Synthesis (Text-to-Speech) tidak didukung pada browser ini.");
      return;
    }
    
    // Cancel ongoing synthesis speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = getBcpTag(langCode);
    utterance.rate = 0.8; // slightly slower for clear comprehension
    utterance.pitch = 1.05; // conversational friendly tone
    
    window.speechSynthesis.speak(utterance);
  };

  // Calculate clean text match evaluation (0 to 100)
  const calculateMatchScore = (target: string, spoken: string): number => {
    const cleanStr = (s: string) => 
      s.toLowerCase()
       .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
       .replace(/\s+/g, " ")
       .trim();

    const targetWords = cleanStr(target).split(" ");
    const spokenWords = cleanStr(spoken).split(" ");

    if (targetWords.length === 0 || spokenWords.length === 0) return 0;

    let matchCount = 0;
    // Simple set intersection check
    targetWords.forEach((word) => {
      if (spokenWords.includes(word)) {
        matchCount++;
      }
    });

    return Math.round((matchCount / targetWords.length) * 100);
  };

  // Launch Mic & Web Speech Recognition
  const startListeningSession = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Browser Anda tidak mendukung Web Speech Recognition. Gunakan Google Chrome, Microsoft Edge, atau Safari demi fungsionalitas terbaik.");
      return;
    }

    setTranscript("");
    setScore(null);
    setFeedbackMsg("");
    setIsListening(true);

    const recognition = new SpeechRecognition();
    recognition.lang = getBcpTag(langCode);
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const recordedText = event.results[0][0].transcript;
      setTranscript(recordedText);

      const calculated = calculateMatchScore(phrase, recordedText);
      setScore(calculated);

      if (calculated >= 80) {
        setFeedbackMsg("Luar biasa! Pengucapanmu sangat presisi dan terdengar natural. 🎉");
      } else if (calculated >= 50) {
        setFeedbackMsg("Bagus sekali! Cukup dimengerti. Dengarkan kembali audio tutor dan coba lagi agar makin sempurna. 👍");
      } else {
        setFeedbackMsg("Kurang pas. Klik ikon pengeras suara pelan-pelan lalu ulangi pengucapan kata demi kata. 💪");
      }
    };

    recognition.onerror = (e: any) => {
      console.error("Speech Recognition Error:", e);
      setIsListening(false);
      alert("Gagal merekam suara. Pastikan izin izin akses mikrofon (microphone permission) telah diizinkan.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    // Begin recording
    recognition.start();
  };

  return (
    <div className="bg-stone-50 border-2 border-dashed border-stone-200 rounded-[2rem] p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center gap-2 mb-3">
        <Mic className="w-5 h-5 text-emerald-600 shrink-0" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-800 font-extrabold">
          Tantangan Latihan Bicara (Speech Practice) • Web Speech API
        </span>
      </div>

      <div className="space-y-4">
        {/* Core text to pronounce */}
        <div className="bg-white border border-stone-150 p-4 rounded-2xl shadow-sm text-center">
          <p className="text-[10px] font-mono text-stone-400 font-bold uppercase">Ucapkan Frasa Di Bawah Ini:</p>
          <h4 className="font-sans font-black text-emerald-850 text-base md:text-lg tracking-tight mt-1">
            "{phrase}"
          </h4>
          <p className="text-[11px] text-stone-500 mt-1 italic">
            Artinya: "{translation}"
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            {/* Play Sound Button */}
            <button
              onClick={speakAsBuddy}
              type="button"
              className="px-4 py-2 text-xs font-sans font-black bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
              title="Dengarkan pelafalan fonetik AI"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>Dengar Suara AI</span>
            </button>

            {/* Rec Mic Button */}
            <button
              onClick={startListeningSession}
              disabled={isListening}
              type="button"
              className={`px-5 py-2.5 text-xs font-sans font-black rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                isListening
                  ? "bg-rose-500 text-white animate-pulse"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/10"
              }`}
            >
              {isListening ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Mendengarkan...</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5" />
                  <span>Rekam Suara Saya</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic evaluation results display */}
        {(transcript || score !== null) && (
          <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2">
            <h5 className="font-mono text-[10px] text-stone-400 uppercase tracking-widest font-black">
              Hasil Evaluasi Suaramu:
            </h5>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100 pt-2">
              <div className="flex-1">
                <p className="text-[11px] text-stone-450 font-mono">Transkripsi Rekaman:</p>
                <p className="text-xs font-sans font-extrabold text-stone-850 mt-0.5">
                  "{transcript || "Tidak terdengar kalimat jelas."}"
                </p>
              </div>

              {score !== null && (
                <div className="text-center shrink-0 bg-stone-50 border border-stone-150 px-4 py-2 rounded-xl">
                  <p className="text-[9px] font-mono text-stone-400 font-bold uppercase">Skor Akurasi</p>
                  <p className={`text-base font-mono font-black ${
                    score >= 80 ? "text-emerald-700" : score >= 50 ? "text-cyan-700" : "text-amber-700"
                  }`}>
                    {score}%
                  </p>
                </div>
              )}
            </div>

            {feedbackMsg && (
              <div className={`mt-2 p-3 rounded-xl border flex items-center gap-2 text-xs ${
                score !== null && score >= 85 ? "bg-emerald-50 border-emerald-150 text-emerald-800" : "bg-stone-50 border-stone-200 text-stone-650"
              }`}>
                {score !== null && score >= 85 ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />}
                <p className="leading-relaxed">{feedbackMsg}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
