import React, { useState, useRef, useEffect } from "react";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Send, 
  Sparkles, 
  Activity, 
  VolumeX, 
  Check, 
  Flame, 
  Trophy 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SpeechPracticeProps {
  phrase: string;
  translation: string;
  langCode: string;
  onSuccess: () => void;
}

export default function SpeechPractice({ phrase, translation, langCode, onSuccess }: SpeechPracticeProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "fail" | null>(null);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);

  // Focus and Speech Stage states
  const [isFocusStage, setIsFocusStage] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enableKeyboardSimulation, setEnableKeyboardSimulation] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Equalizer frequencies simulation for visual effects when voice triggers
  const [freqBars, setFreqBars] = useState<number[]>(Array(16).fill(10));

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const freqBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth DOM-based frequency visualizer to avoid canvas rendering issues
  const startVisualizer = (stream: MediaStream) => {
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!mediaStreamRef.current) return;
        animationFrameRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        // Map frequencies to our DOM bars
        freqBarsRef.current.forEach((bar, index) => {
          if (bar) {
            const val = dataArray[index] || 10;
            // Map 0-255 to a sensible height in pixels (min 4px, max 48px)
            const height = Math.max(4, Math.min(48, (val / 255) * 48));
            bar.style.height = `${height}px`;
            // Add color intensity based on volume
            const intensity = val / 255;
            if (intensity > 0.6) {
              bar.style.backgroundColor = 'rgb(16, 185, 129)'; // emerald-500
              bar.style.boxShadow = '0 0 8px rgba(16,185,129,0.8)';
            } else {
              bar.style.backgroundColor = 'rgb(52, 211, 153)'; // emerald-400
              bar.style.boxShadow = 'none';
            }
          }
        });
      };
      draw();
    } catch (err) {
      console.warn("Visualizer error", err);
    }
  };

  // Fake frequency visualizer for simulated voice or extra visual style
  useEffect(() => {
    let interval: any;
    if (isListening && isSimulating) {
      interval = setInterval(() => {
        freqBarsRef.current.forEach((bar) => {
          if (bar) {
            bar.style.height = `${Math.floor(Math.random() * 45) + 8}px`;
          }
        });
      }, 100);
    } else if (!isListening) {
      freqBarsRef.current.forEach((bar) => {
        if (bar) bar.style.height = `4px`;
      });
    }
    return () => clearInterval(interval);
  }, [isListening, isSimulating]);

  const getBcpTag = (code: string): string => {
    const map: Record<string, string> = {
      en: "en-US", de: "de-DE", es: "es-ES", fr: "fr-FR", tr: "tr-TR",
      id: "id-ID", jv: "id-ID", pap: "id-ID", mc: "fr-FR", th: "th-TH",
      jp: "ja-JP", zh: "zh-CN"
    };
    return map[code] || "id-ID";
  };

  const speakAsBuddy = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = getBcpTag(langCode);
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const startSimulation = () => {
    handleReset();
    setIsFocusStage(true);
    setIsListening(true);
    setIsSimulating(true);
    setFeedbackMsg("Memulai simulasi ucapan suara AI... Mohon bersuara atau tunggu.");
    
    // Simulate typing the target phrase word-by-word with natural delayed pulses
    const words = phrase.split(" ");
    let currentWordIndex = 0;
    let accumulatedText = "";
    
    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        accumulatedText += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
        setTranscript(accumulatedText);
        currentWordIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsListening(false);
          setIsSimulating(false);
          setHasSpoken(true);
          setFeedbackMsg(`Selesai simulasi! Frasa "${phrase}" berhasil terekam.`);
        }, 800);
      }
    }, 450);
  };

  const cleanPhrase = (text: string): string => {
    if (!text) return "";
    return text.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const calculateSimilarity = (s1: string, s2: string): number => {
    const p1 = cleanPhrase(s1);
    const p2 = cleanPhrase(s2);
    
    if (p1 === p2) return 100;
    if (!p1 || !p2) return 0;

    const words1 = p1.split(" ");
    const words2 = p2.split(" ");
    
    const track = Array(words2.length + 1).fill(null).map(() =>
      Array(words1.length + 1).fill(null));
    for (let i = 0; i <= words1.length; i += 1) {
      track[0][i] = i;
    }
    for (let j = 0; j <= words2.length; j += 1) {
      track[j][0] = j;
    }
    for (let j = 1; j <= words2.length; j += 1) {
      for (let i = 1; i <= words1.length; i += 1) {
        const indicator = words1[i - 1] === words2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j - 1][i] + 1, // deletion
          track[j][i - 1] + 1, // insertion
          track[j - 1][i - 1] + indicator // substitution
        );
      }
    }
    const dist = track[words2.length][words1.length];
    const maxLength = Math.max(words1.length, words2.length);
    const score = Math.round(((maxLength - dist) / maxLength) * 100);
    return Math.min(100, Math.max(0, score));
  };

  const playSuccessChime = () => {
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      
      osc1.start();
      osc1.stop(ctx.currentTime + 0.5);
      osc2.start(ctx.currentTime + 0.1);
      osc2.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.warn("Chime error:", e);
    }
  };

  const analyzeSpeechSubmission = async (spoken: string) => {
    setIsSubmitting(true);
    setFeedbackMsg("Menganalisis hasil pelafalan...");
    try {
      const response = await fetch("/api/analyze-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spokenText: spoken, targetPhrase: phrase, langCode }),
      });
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);

      setAccuracyScore(data.accuracyScore);
      if (data.isCorrect) {
        setFeedbackMsg(`Keren luar biasa! Pelafalan terverifikasi dengan baik. ${data.feedback} 🎉`);
        setFeedbackType("success");
        playSuccessChime();
        onSuccess();
      } else {
        setFeedbackMsg(data.feedback || "Pelafalan kurang pas, mari ulangi.");
        setFeedbackType("fail");
      }
    } catch (e) {
      console.warn("Speech API error, running local similarity evaluation", e);
      const score = calculateSimilarity(spoken, phrase);
      setAccuracyScore(score);
      if (score >= 80) {
        setFeedbackMsg(`Selesai! Pelafalan Anda sangat baik dengan skor keakuratan ${score}%! 🎉`);
        setFeedbackType("success");
        playSuccessChime();
        onSuccess();
      } else {
        setFeedbackMsg(`Skor keselarasan pelafalan: ${score}%. Tekan tombol ulangi sapaan suara untuk mencoba lagi.`);
        setFeedbackType("fail");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const stopListeningSessionOnly = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(console.error);
      audioContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const startListeningSession = async () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    setTranscript("");
    setFeedbackMsg("");
    setFeedbackType(null);
    setAccuracyScore(null);
    setHasSpoken(false);
    setEnableKeyboardSimulation(false);
    setIsFocusStage(true);

    if (!SpeechRecognition) {
      console.warn("Speech API unsupported, opening typing fallback");
      setEnableKeyboardSimulation(true);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      setIsListening(true);
      
      // Spawn canvas visualizer slightly delayed to ensure DOM reference gets mounted
      setTimeout(() => {
        startVisualizer(stream);
      }, 300);
      
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = getBcpTag(langCode);
      recognition.continuous = true; 
      recognition.interimResults = true; 
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setFeedbackMsg("Mikrofon terhubung! Silakan katakan sekarang...");
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentSpoken = finalTranscript || interimTranscript || event.results[event.results.length - 1][0].transcript;
        if (currentSpoken) {
          setTranscript(currentSpoken);
        }
      };

      recognition.onerror = (err: any) => {
        console.warn("Speech recognition error:", err);
        const errorType = err?.error || "";
        if (errorType === "no-speech") {
          setFeedbackMsg("Mendengarkan... Silakan bersuara keras dan jelas.");
          return;
        }
        if (errorType === "aborted") return;
        stopListeningSessionOnly();
        setEnableKeyboardSimulation(true);
      };

      recognition.start();
    } catch (e) {
      console.warn("Speech permission denied:", e);
      stopListeningSessionOnly();
      setEnableKeyboardSimulation(true);
    }
  };

  const handleStopSpeaking = () => {
    stopListeningSessionOnly();
    setHasSpoken(true);
    if (!transcript) {
      setFeedbackMsg("Tidak ada suara terekam. Silakan gunakan tombol simulasi atau rekam kembali.");
    } else {
      setFeedbackMsg("Kalimat Anda berhasil direkam. Tinjau dan edit sebelum submit ke sistem cek.");
    }
  };

  const handleReset = () => {
    stopListeningSessionOnly();
    setTranscript("");
    setFeedbackMsg("");
    setFeedbackType(null);
    setAccuracyScore(null);
    setHasSpoken(false);
    setEnableKeyboardSimulation(false);
    setIsSimulating(false);
    setIsFocusStage(false);
  };

  useEffect(() => {
    return () => {
      stopListeningSessionOnly();
    };
  }, []);

  return (
    <div className="bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-850 rounded-[2rem] p-5 shadow-md flex flex-col gap-4 text-slate-900 dark:text-stone-100 transition-colors relative">
      
      {/* 1. Header component */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Mic className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <span className="text-[9.5px] font-mono tracking-wider font-extrabold text-emerald-600 uppercase">SPEECH PRACTICE UNIT</span>
            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-bold leading-none mt-0.5">Asah artikulasi bahasa asli</p>
          </div>
        </div>
        <button
          onClick={speakAsBuddy}
          className="p-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-stone-800 dark:hover:bg-stone-750 text-indigo-600 dark:text-indigo-400 rounded-xl transition cursor-pointer active:scale-95 border border-indigo-100 dark:border-stone-700 shadow-xs"
          title="Dengarkan Contoh Ucapan"
        >
          <Volume2 className="w-4 h-4 text-indigo-600" />
        </button>
      </div>

      {/* 2. Target Phrase Well */}
      <div className="bg-stone-50 dark:bg-stone-950/40 border border-stone-150/40 dark:border-stone-850 p-4 rounded-2xl text-center flex flex-col items-center justify-center gap-1">
        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Lafalkan Kalimat:</span>
        <h4 className="text-sm font-black text-slate-900 dark:text-white my-1 block select-text">"{phrase}"</h4>
        <span className="text-[10px] text-slate-400 dark:text-stone-500 italic">Arti: {translation}</span>
      </div>

      {/* 3. Base Action Controls & Mode Switcher */}
      <div className="flex flex-col gap-2.5 mt-1">
        <button
          onClick={startListeningSession}
          className="w-full py-3 px-5 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl cursor-pointer transition active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-600/15"
        >
          <Mic className="w-4 h-4 text-white hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse" />
          <span>Nyalakan Mikrofon & Bicara</span>
        </button>

        <button
          onClick={startSimulation}
          className="w-full py-2.5 px-5 text-xs font-black bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl cursor-pointer transition active:scale-95 flex items-center justify-center gap-2 shadow-md hover:shadow-indigo-600/10"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>Simulasikan Ucapan (Uji Tanpa Mic)</span>
        </button>
        
        <button
          onClick={() => {
            setEnableKeyboardSimulation(true);
            setIsFocusStage(true);
          }}
          className="w-full py-1 text-[10px] font-mono text-zinc-400 hover:text-zinc-600 dark:hover:text-stone-300 transition-all cursor-pointer underline decoration-dotted underline-offset-3"
        >
          Gunakan Keyboard Tradisional
        </button>
      </div>

      {/* 4. HIGH-FOCUS IMMERSIVE SCREEN OVERLAY WITH FLOATING SPEECHPOPUP */}
      <AnimatePresence>
        {isFocusStage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/95 backdrop-blur-xl z-[9999] flex flex-col items-center justify-center px-4 md:px-6 py-8 text-white select-none overflow-y-auto"
          >
            <div className="max-w-xl w-full flex flex-col items-center gap-6 text-center">
              
              {/* Overlay Top Badges */}
              <div className="flex flex-col items-center gap-2.5">
                <div className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase animate-pulse flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>{isSimulating ? "AI SPEECH SIMULASI" : "SESI AKTIF: FOCUS MODE PELAFALAN"}</span>
                </div>
                <h3 className="font-sans font-black text-lg md:text-xl text-stone-100 flex items-center gap-1.5">
                  Ikuti Lafal Suki
                </h3>
              </div>

              {/* Display Current Target Phrase (Rujukan Belajar) */}
              <div className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-md">
                <p className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1.5">Misi Kalimat Target Anda:</p>
                <h4 className="text-base md:text-lg font-sans font-black text-emerald-400">"{phrase}"</h4>
                <p className="text-xs text-stone-300 mt-1 italic">Arti: {translation}</p>
              </div>

              {/* DANCING FREQUENCY RESONANCE EQUALIZER WAVES (Dynamic visualizer based on active microphone) */}
              <div className="w-full flex-col items-center justify-center py-4 relative">
                <p className="text-[9px] font-mono uppercase tracking-widest text-stone-500 mb-2">Resonansi Frekuensi Gelombang Suara</p>
                
                {/* Visualizer Canvas & Simulated Equalizer Bars */}
                <div className="flex items-center justify-center gap-1.5 h-20 w-full max-w-sm mx-auto bg-stone-900/80 p-4 rounded-full border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] relative overflow-hidden">
                  {/* Pulsing customized waves bars when mic is active */}
                  <div className="flex items-end justify-center gap-1.5 w-full h-12">
                    {Array.from({ length: 16 }).map((_, index) => (
                      <div
                        key={index}
                        ref={(el) => (freqBarsRef.current[index] = el)}
                        className={`w-2.5 rounded-full shadow-sm transition-all duration-75 ${
                          isSimulating ? "bg-indigo-500" : "bg-emerald-400"
                        }`}
                        style={{ height: '4px' }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* FLOATING SPEECHPOPUP (Melayang di atas mikrofon) - Displays Real-Time Speech as spoken */}
              <div className="relative w-full max-w-md pt-2 pb-6">
                <motion.div
                  initial={{ scale: 0.9, y: 15, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  className="w-full bg-stone-900 border-2 border-emerald-500 rounded-3xl p-6 shadow-[0_15px_40px_rgba(16,185,129,0.25)] relative text-center z-20"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-stone-900 font-mono text-[9px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    SPEECH TO TEXT REALTIME
                  </div>
                  
                  {/* Floating speech balloon pointer */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-4 h-4 bg-stone-900 border-l border-t border-emerald-500 rotate-45 -mb-2 z-10"></div>

                  {/* Dynamic Speech Text changes as user talks */}
                  <div className="min-h-[80px] flex flex-col items-center justify-center py-2 relative">
                    {transcript ? (
                      <p className="text-xl md:text-2xl font-sans font-extrabold italic text-emerald-300 select-text select-all leading-relaxed whitespace-pre-wrap drop-shadow-md">
                        "{transcript}"
                      </p>
                    ) : (
                      <p className="text-sm font-sans font-medium text-stone-400">
                        Memutar mikrofon... Silakan katakan sesuatu.
                      </p>
                    )}
                  </div>

                  {isListening && (
                     <div className="absolute -left-3 -bottom-3 bg-stone-900 border-2 border-rose-500 text-rose-500 font-mono text-[9px] font-black px-3 py-1.5 rounded-2xl uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                       <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                       Sedang Merekam Suara
                     </div>
                  )}
                </motion.div>
              </div>

              {/* KEYBOARD INPUT FALLBACK COMPONENT - IN FOCUS PORTAL */}
              {enableKeyboardSimulation && !hasSpoken && (
                <div className="w-full bg-amber-500/10 border border-amber-500/30 p-4 rounded-3xl text-left flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500 text-stone-950 font-mono text-[9px] font-black py-0.5 px-2 rounded-md">Fallback</span>
                    <p className="text-xs font-bold text-stone-300">Gagal mengaktifkan microphone. Ketikkan ucapan Anda secara manual:</p>
                  </div>
                  <input
                    type="text"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-900 border border-stone-750 focus:border-amber-400 rounded-xl text-stone-100 outline-none transition font-sans text-sm font-semibold"
                    placeholder="Contoh: ketik kalimat bahasa asli di sini..."
                  />
                  <button
                    onClick={() => {
                      setHasSpoken(true);
                      setFeedbackMsg("Verifikasi kalimat sukses dimasukkan.");
                    }}
                    disabled={!transcript}
                    className="py-2 px-4 bg-amber-500 hover:bg-amber-600 disabled:bg-stone-850 disabled:text-stone-600 text-stone-950 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Konfirmasi Teks ✓</span>
                  </button>
                </div>
              )}

              {/* DYNAMIC ACTION WORKFLOW IN THE SCREEN FOCUS */}
              <div className="w-full max-w-sm flex flex-col gap-3 font-sans mt-2">
                
                {/* 1. Stop Recording triggers */}
                {isListening && !hasSpoken && (
                  <button
                    onClick={handleStopSpeaking}
                    className="w-full py-3.5 px-6 font-black bg-rose-600 hover:bg-rose-700 text-white rounded-2xl cursor-pointer active:scale-95 transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20"
                  >
                    <MicOff className="w-4 h-4 text-white animate-spin" />
                    <span>Hentikan Berbicara & Kunci Hasil</span>
                  </button>
                )}

                {/* 2. Review text and glowing Submit button */}
                {hasSpoken && !isListening && (
                  <div className="flex flex-col gap-3.5 w-full bg-stone-900/50 border-2 border-emerald-500/40 p-5 rounded-3xl animate-fade-in text-left shadow-lg">
                    <label className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">Tinjauan Hasil Suara:</label>
                    <textarea
                      rows={2}
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-950 border border-stone-800 focus:border-emerald-500 text-stone-100 focus:ring-1 focus:ring-emerald-500/20 rounded-xl outline-none transition text-sm font-black select-text shadow-inner"
                      placeholder="Konfirmasi kalimat rekaman..."
                    />
                    
                    <div className="flex flex-col gap-2.5">
                      <button
                        onClick={() => analyzeSpeechSubmission(transcript)}
                        disabled={!transcript || isSubmitting}
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-stone-800 disabled:text-stone-600 text-stone-950 font-black transition cursor-pointer active:scale-95 flex items-center justify-center gap-2 font-sans shadow-lg rounded-2xl drop-shadow-md text-sm md:text-base tracking-wide"
                      >
                        {isSubmitting ? (
                          <MicOff className="w-5 h-5 text-stone-950 animate-bounce" />
                        ) : (
                          <Send className="w-5 h-5 text-stone-950" />
                        )}
                        <span>{isSubmitting ? "Mengecek Akurasi..." : "SUBMIT UCAPAN"}</span>
                      </button>

                      <button
                        onClick={handleReset}
                        disabled={isSubmitting}
                        className="w-full py-3 bg-stone-800 hover:bg-stone-750 text-stone-300 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Rekam Ulang Suara</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Check Complete / Close stage */}
                <button
                  onClick={handleReset}
                  className="py-2.5 px-5 text-[10.5px] font-mono text-stone-400 hover:text-white transition duration-200 cursor-pointer text-center"
                >
                  Batal / Keluar Focus Mode Suku
                </button>
              </div>

              {/* LIVE ACCURACY FEEDBACK IN THE OVERLAY WELL */}
              {feedbackMsg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`w-full max-w-md p-5 rounded-3xl text-left border ${
                    feedbackType === "success"
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-250 shadow-[0_10px_35px_rgba(16,185,129,0.15)]"
                      : "bg-amber-500/10 border-amber-500/40 text-stone-200 shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        feedbackType === "success" ? "bg-emerald-500 text-stone-950" : "bg-amber-500 text-stone-950"
                      }`}>
                        {feedbackType === "success" ? (
                          <Check className="w-4 h-4 text-stone-950 stroke-[3]" />
                        ) : (
                          <XCircle className="w-4 h-4 text-stone-950 stroke-[3]" />
                        )}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider block">Artikulasi Anda:</span>
                        <p className="text-[11px] font-sans font-black text-white leading-none mt-0.5">
                          {feedbackType === "success" ? "PELAFALAN MELEWATI AMBANG BATAS!" : "PELAFALAN KURANG PAS"}
                        </p>
                      </div>
                    </div>

                    {accuracyScore !== null && (
                      <div className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20 text-[11px] font-mono font-black text-white">
                        {accuracyScore}% Akurat
                      </div>
                    )}
                  </div>

                  <p className="text-xs font-sans text-stone-200 leading-relaxed bg-black/30 p-3 rounded-2xl select-text border border-white/5 mt-3">
                    {feedbackMsg}
                  </p>

                  <div className="mt-4.5 flex gap-2">
                    {feedbackType === "success" ? (
                      <button
                        onClick={() => setIsFocusStage(false)} // Selesai and close Focus Mode Suku
                        className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-stone-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
                      >
                        <Trophy className="w-4 h-4" />
                        <span>Selesai & Lanjut Belajar (+15 EXP) ✓</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleReset}
                        className="w-full py-2.5 bg-amber-500 text-stone-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Coba Praktik Ulang</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. STATS RECORD LIST ACCORDION FROM RESULTS */}
      {feedbackMsg && !isFocusStage && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-3xl border text-xs flex flex-col gap-3 shadow-md relative overflow-hidden transition-all duration-300 ${
            feedbackType === "success"
              ? "bg-gradient-to-br from-emerald-500/5 to-emerald-500/[0.12] border-emerald-500/35 text-emerald-950 dark:text-emerald-300"
              : "bg-gradient-to-br from-amber-500/5 to-amber-500/[0.12] border-amber-500/35 text-slate-800 dark:text-stone-300"
          }`}
        >
          {feedbackType === "success" && (
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                feedbackType === "success" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
              }`}>
                {feedbackType === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-white stroke-[2.5]" />
                ) : (
                  <XCircle className="w-5 h-5 text-white stroke-[2.5]" />
                )}
              </div>
              <div>
                <span className={`text-[10px] font-mono tracking-wider font-extrabold uppercase ${
                  feedbackType === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600"
                }`}>
                  {feedbackType === "success" ? "PELAFALAN BERHASIL DISINKRONKAN ✓" : "PELAFALAN PERLU DIPERBAIKI"}
                </span>
                <p className="text-[10.5px] font-extrabold text-slate-500 dark:text-stone-400 leading-none mt-0.5">
                  {feedbackType === "success" ? "Kualitas artikulasi sangat luar biasa!" : "Mari coba melatih artikulasi atau ulangi"}
                </p>
              </div>
            </div>

            {accuracyScore !== null && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono font-black shadow-xs ${
                  feedbackType === "success"
                    ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/15 border-amber-400/30 text-amber-700 dark:text-amber-300"
                }`}
              >
                <span>Skor:</span>
                <span className="text-xs">{accuracyScore}%</span>
              </motion.div>
            )}
          </div>

          <div className="border-t border-stone-200/50 dark:border-stone-800/60 pt-3 relative z-10 select-text">
            <p className="font-semibold text-slate-800 dark:text-stone-200 leading-relaxed text-xs">
              {feedbackMsg}
            </p>
          </div>

          {feedbackType === "success" && (
            <div className="bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 max-w-max px-2.5 py-1 rounded-lg text-[9px] font-mono text-emerald-700 dark:text-emerald-300 font-extrabold flex items-center gap-1 leading-none">
              <span>🌟</span>
              <span>Keren! Kamu semakin mahir melafalkan frasa bahasa asli ini! Pertahankan prestasimu!</span>
            </div>
          )}
        </motion.div>
      )}

    </div>
  );
}
