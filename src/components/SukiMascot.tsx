import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, MessageSquare, RefreshCw, AlertCircle, HelpCircle, Heart, Flame } from "lucide-react";
import { ChatMessage } from "../types";

interface SukiMascotProps {
  currentUnitTitle?: string;
  userExp: number;
}

export default function SukiMascot({ currentUnitTitle, userExp }: SukiMascotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Active roleplay character possessed state
  const [activeRoleplayChar, setActiveRoleplayChar] = useState<{ character: string; bookTitle: string } | null>(null);

  // Resize custom dimensions state for conversational chat drawer
  const [customDimensions, setCustomDimensions] = useState<{ width: number; height: number } | null>(null);

  const isResizingRef = useRef(false);
  const startResizePos = useRef({ x: 0, y: 0 });
  const initialResizeDim = useRef({ width: 0, height: 0 });

  const handlePointerResizeStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    isResizingRef.current = true;
    startResizePos.current = { x: e.clientX, y: e.clientY };
    initialResizeDim.current = { width: drawerWidth, height: drawerHeight };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}

    window.addEventListener("pointermove", handlePointerResizeMove, { passive: false });
    window.addEventListener("pointerup", handlePointerResizeUp);
    window.addEventListener("pointercancel", handlePointerResizeUp);
  };

  const handlePointerResizeMove = (e: PointerEvent) => {
    if (!isResizingRef.current) return;
    const dx = startResizePos.current.x - e.clientX;
    const dy = startResizePos.current.y - e.clientY;
    performResize(dx, dy);
  };

  const performResize = (dx: number, dy: number) => {
    const minW = window.innerWidth < 640 ? 330 : 380;
    const minH = window.innerWidth < 640 ? 400 : 450;
    const maxW = window.innerWidth - 40;
    const maxH = window.innerHeight - 40;

    let targetW = initialResizeDim.current.width + dx;
    let targetH = initialResizeDim.current.height + dy;

    if (targetW < minW) targetW = minW;
    else if (targetW > maxW) targetW = maxW;

    if (targetH < minH) targetH = minH;
    else if (targetH > maxH) targetH = maxH;

    setCustomDimensions({ width: targetW, height: targetH });
  };

  const handlePointerResizeUp = () => {
    isResizingRef.current = false;
    window.removeEventListener("pointermove", handlePointerResizeMove);
    window.removeEventListener("pointerup", handlePointerResizeUp);
    window.removeEventListener("pointercancel", handlePointerResizeUp);
  };

  // Cleanup resize listeners on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handlePointerResizeMove);
      window.removeEventListener("pointerup", handlePointerResizeUp);
      window.removeEventListener("pointercancel", handlePointerResizeUp);
    };
  }, []);

  // Layout parameters for dragging
  const [position, setPosition] = useState(() => {
    try {
      const saved = localStorage.getItem("suki_position_tl");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    // responsive bottom-right defaults
    const initLeft = window.innerWidth > 640 ? window.innerWidth - 100 : window.innerWidth - 80;
    const initTop = window.innerHeight > 640 ? window.innerHeight - 100 : window.innerHeight - 80;
    return { top: initTop, left: initLeft };
  });

  const [isDragging, setIsDragging] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const renderScheduledRef = useRef(false);
  const latestPosRef = useRef(position);
  const totalMoveRef = useRef(0);
  const startPointerPos = useRef({ x: 0, y: 0 });

  // Sync state coordinates to local reference
  useEffect(() => {
    latestPosRef.current = position;
  }, [position]);

  // Persist position coordinates changes
  useEffect(() => {
    try {
      localStorage.setItem("suki_position_tl", JSON.stringify(position));
    } catch (e) {}
  }, [position]);

  // Handle perfect drag-and-drop mechanics with mouse & touch events
  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;

      const dx = clientX - startPointerPos.current.x;
      const dy = clientY - startPointerPos.current.y;
      totalMoveRef.current = Math.sqrt(dx * dx + dy * dy);

      const targetLeft = clientX - offsetRef.current.x;
      const targetTop = clientY - offsetRef.current.y;

      // Keep Suki bubble strictly inside visual screen boundary (64px width/height buffer)
      const safeLeft = Math.max(10, Math.min(window.innerWidth - 74, targetLeft));
      const safeTop = Math.max(10, Math.min(window.innerHeight - 74, targetTop));

      if (renderScheduledRef.current) return;
      renderScheduledRef.current = true;

      // Use requestAnimationFrame for lag-free rendering at 60fps/120fps
      requestAnimationFrame(() => {
        if (bubbleRef.current) {
          bubbleRef.current.style.left = `${safeLeft}px`;
          bubbleRef.current.style.top = `${safeTop}px`;
        }
        latestPosRef.current = { top: safeTop, left: safeLeft };
        renderScheduledRef.current = false;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      if (e.cancelable) {
        e.preventDefault(); // prevents background bounce / scroll while dragging
      }
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setPosition(latestPosRef.current);
      }
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        setPosition(latestPosRef.current);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseup", handleMouseUp, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const handlePointerDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isMascotBtn = target.closest("#suki-mascot-bubble");
    const isOtherInteractive = target.closest("form") || target.closest("input") || (target.closest("button") && !isMascotBtn);
    if (isOtherInteractive) return;

    e.preventDefault();
    setIsDragging(true);
    totalMoveRef.current = 0;
    startPointerPos.current = { x: e.clientX, y: e.clientY };
    offsetRef.current = {
      x: e.clientX - latestPosRef.current.left,
      y: e.clientY - latestPosRef.current.top
    };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    const target = e.target as HTMLElement;
    const isMascotBtn = target.closest("#suki-mascot-bubble");
    const isOtherInteractive = target.closest("form") || target.closest("input") || (target.closest("button") && !isMascotBtn);
    if (isOtherInteractive) return;

    setIsDragging(true);
    totalMoveRef.current = 0;
    startPointerPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    offsetRef.current = {
      x: e.touches[0].clientX - latestPosRef.current.left,
      y: e.touches[0].clientY - latestPosRef.current.top
    };
  };

  // Set up initial welcoming greeting from Suki Mascot
  useEffect(() => {
    if (!activeRoleplayChar) {
      setMessages([
        {
          role: "assistant",
          content: `Halo! Aku **Suki**, maskot pembimbing setiamu yang siap membantumu kapan saja! 🌸✨\n\n${
            currentUnitTitle 
              ? `Saat ini kamu sedang mempelajari bagian **"${currentUnitTitle}"**.` 
              : "Mari kita taklukkan petualangan belajar bahasa & catur hari ini!"
          }\n\nButuh bantuan kuis, bingung materi, atau mau ngobrol santai denganku? Tanyakan langsung di bawah ini ya! 💖`,
          timestamp: new Date()
        }
      ]);
    }
  }, [currentUnitTitle, activeRoleplayChar]);

  // Listen for historical roleplay trigger event
  useEffect(() => {
    const handleRoleplayTrigger = async (e: Event) => {
      const customEvent = e as CustomEvent<{ character: string; bookTitle: string }>;
      if (!customEvent.detail) return;
      const { character, bookTitle } = customEvent.detail;
      
      setIsOpen(true);
      setActiveRoleplayChar({ character, bookTitle });
      
      const summoningMsg: ChatMessage = {
        role: "assistant",
        content: `🌌 Menyeru ruh dari lorong sejarah tempo doeloe... Mantra spiritual berhasil dirapalkan! \n\nRuh mulia **${character}** dari lembar pustaka *"${bookTitle}"* kini hadir merasuki Suki AI! Silakan ajukan pertanyaan sejarah padaku! ✨🔮`,
        timestamp: new Date()
      };
      
      setMessages([summoningMsg]);
      setLoading(true);
      setErrorMsg(null);
      
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: "Salam! Perkenalkan dirimu dengan gaya bahasa, kepribadian, serta perspektif dari zamanmu berkuasa."
              }
            ],
            topic: `Kehadiran Roh Sejarah ${character}`,
            taskContext: `Bertindaklah sebagai ${character} dari kitab/buku "${bookTitle}". Sapa pembaca dengan gaya bahasa yang agung, sopan, mendalam, dan penuh kepribadian sesuai era sejarahmu secara interaktif.`
          })
        });
        
        if (!response.ok) throw new Error();
        const data = await response.json();
        
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.text || `Hormat kami. Saya adalah ${character}. Tanyakanlah padaku perihal perjuangan, siasat perang, dan misteri di zaman saya.`,
            timestamp: new Date()
          }
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `*Suara sayup bergema...* "Salam waras, wahai generasi masa depan. Aku adalah ${character}. Sungguh kehormatan besar ruhku dipanggil kembali. Silakan tanyakan hal-hal pelik di masa kekuasaanku dahulu."`,
            timestamp: new Date()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener("suki-trigger-roleplay", handleRoleplayTrigger);
    return () => window.removeEventListener("suki-trigger-roleplay", handleRoleplayTrigger);
  }, []);

  // Handle continuous auto-scrolling
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Request clues dynamically
  const handleRequestClue = () => {
    setLoading(true);
    setErrorMsg(null);
    
    setTimeout(async () => {
      try {
        const cluePrompt: ChatMessage = {
          role: "user",
          content: `Tolong berikan Clue / petunjuk rahasia belajarku atau trik cepat menguasai pembelajaran bahasa!`,
          timestamp: new Date()
        };
        
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, cluePrompt],
            topic: currentUnitTitle || "Petualangan Belajar Bahasa",
            taskContext: activeRoleplayChar
              ? `Bertindaklah sebagai ${activeRoleplayChar.character} dari sejarah "${activeRoleplayChar.bookTitle}". Berikan satu wejangan/petunjuk bijak nan luhur dari zamanmu.`
              : `Kamu adalah Suki, mascot imut dan pembimbing jenius untuk aplikasi StudySuki. Guru bijaksana pembimbing, ceria dan lucu. Berikan petunjuk belajar taktis khusus untuk topik "${currentUnitTitle || "Umum"}" secara singkat, gunakan 2-3 baris kalimat lucu berima dan emotikon manis!`
          })
        });

        if (!response.ok) {
          throw new Error("Gagal memanggil Suki AI.");
        }

        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.text || "Tetap semangat! Dengarkan audio lalu ucapkan dengan tenang ya! 🌸",
            timestamp: new Date()
          }
        ]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Suki membisikkan: Fokuslah melafalkan setiap kata pelan-pelan, periksa detail opsi kuis, dan jangan serakah, kemenangan catur bermula dari penguasaan tengah! 🌸✨",
            timestamp: new Date()
          }
        ]);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || loading) return;

    const userText = inputVal;
    setInputVal("");
    setErrorMsg(null);

    const userMsg: ChatMessage = {
      role: "user",
      content: userText,
      timestamp: new Date()
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated,
          topic: currentUnitTitle || (activeRoleplayChar ? `Diskusi dengan ${activeRoleplayChar.character}` : "Obrolan Ceria dengan Suki"),
          taskContext: activeRoleplayChar
            ? `Kamu adalah tokoh sejarah bernama ${activeRoleplayChar.character} dari kitab/buku "${activeRoleplayChar.bookTitle}". Bertindaklah sebagai ${activeRoleplayChar.character} secara penuh. Jawablah pertanyaan pembaca dengan gaya bahasa, kepribadian, argumen logis, cita-cita luhur, dan perspektif zamanmu secara eksklusif dan edukatif.`
            : `Kamu adalah Suki, mascot imut/chibi berambut merah muda pembimbing belajar cerdas berjiwa ceria di dalam aplikasi StudySuki. Kamu harus memotivasi siswa dengan ramah, lucu, manja, menggunakan emoticon lucu (seperti 🌸, ✨, 💖, OwO, >w<), dan memberikan analogi super sederhana beralur komikal.`
        })
      });

      if (!response.ok) throw new Error("Gagal memproses.");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text || "Suki mendengarkan dengan penuh perhatian... Cobalah tanyakan lagi, sahabat cerdas!",
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      setErrorMsg("Koneksi Suki terputus sejenak, coba lagi ya!");
    } finally {
      setLoading(false);
    }
  };

  // Drawer Dimensions & Calculations to prevent clipping (Custom Resizable Settings)
  const baseWidth = window.innerWidth < 640 ? 330 : 380;
  const baseHeight = window.innerWidth < 640 ? 400 : 450;

  const drawerWidth = customDimensions ? customDimensions.width : baseWidth;
  const drawerHeight = customDimensions ? customDimensions.height : baseHeight;

  let drawerTop = position.top - drawerHeight - 15;
  if (drawerTop < 10) {
    drawerTop = position.top + 80; // place below bubble if not enough room above
  }
  drawerTop = Math.max(10, Math.min(window.innerHeight - drawerHeight - 20, drawerTop));

  let drawerLeft = position.left - (drawerWidth / 2) + 32;
  drawerLeft = Math.max(10, Math.min(window.innerWidth - drawerWidth - 10, drawerLeft));

  return (
    <>
      {/* 1. FLOATING MINIMALIST SPARKLY SUKI BUBBLE */}
      <div 
        ref={bubbleRef}
        style={{
          position: "fixed",
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 99999,
          cursor: isDragging ? "grabbing" : "grab"
        }}
        onMouseDown={handlePointerDown}
        onTouchStart={handleTouchStart}
        className="flex flex-col items-start select-none touch-none"
      >
        
        {/* Adorable visual speech popup clue hint label */}
        {!isOpen && (
          <div className="bg-white border-2 border-emerald-500 rounded-2xl px-3 py-1.5 shadow-lg mb-2 text-[10px] md:text-xs font-sans font-extrabold text-stone-900 animate-bounce flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>Seret & Chat Aku! 🌸</span>
          </div>
        )}

        <button
          onClick={(e) => {
            if (totalMoveRef.current > 8) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            setIsOpen(!isOpen);
          }}
          type="button"
          id="suki-mascot-bubble"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-[#22c55e] border-4 border-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer relative"
          title="Klik untuk membuka obrolan / seret untuk menggeser posisi Suki"
        >
          {/* Pulsing decoration rings */}
          <span className="absolute -inset-1 rounded-full border-2 border-[#22c55e] animate-ping opacity-40 pointer-events-none"></span>

          {/* Suki Character Face visual Representation */}
          <div className="w-10 h-10 overflow-hidden relative">
            <img src="/logo.png" alt="Suki Mascot" className="w-full h-full object-contain brightness-100" />
          </div>

          <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full animate-pulse"></span>
        </button>
      </div>

      {/* 2. SLIDE-OUT BEAUTIFUL CONVERSATIONAL HELPER DRAWER PANEL */}
      {isOpen && (
        <div 
          style={{
            position: "fixed",
            zIndex: 99999,
            top: `${drawerTop}px`,
            left: `${drawerLeft}px`,
            width: `${drawerWidth}px`,
            height: `${drawerHeight}px`
          }}
          className="bg-[#FCFAF2] dark:bg-stone-950 border-2 border-stone-950 dark:border-stone-850 rounded-3xl shadow-2xl p-4 flex flex-col overflow-hidden select-text animate-fade-in animate-slide-up relative"
        >
          {/* Resize Handle at Top-Left (Smooth high-contrast emerald-green curve) */}
          <div 
            onPointerDown={handlePointerResizeStart}
            style={{ touchAction: "none" }}
            className="absolute top-0 left-0 w-8 h-8 cursor-nwse-resize select-none z-[99995] rounded-tl-3xl border-t-[4px] border-l-[4px] border-emerald-500 dark:border-emerald-400 active:scale-95 transition-transform"
            title="Geser sudut ini untuk mengubah ukuran panel"
          />
          
          {/* Suki Panel Header */}
          <div className="flex items-center justify-between border-b-2 border-stone-200 dark:border-stone-800 pb-3 select-none">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-white border border-stone-100 flex items-center justify-center">
                <img src="/logo.png" alt="StudySuki Logo" className="w-full h-full object-contain" />
              </div>
              <div className="max-w-[180px] sm:max-w-[220px]">
                <h4 className="font-sans font-black text-xs md:text-sm text-stone-900 dark:text-white flex items-center gap-1 truncate">
                  {activeRoleplayChar ? `Roh: ${activeRoleplayChar.character}` : "Mascot Suki AI"}
                  <span className="text-[7px] bg-emerald-100 text-emerald-850 px-1.5 py-0.5 rounded border border-emerald-300 font-mono tracking-tighter uppercase shrink-0">
                    {activeRoleplayChar ? "POSSESSED" : "ONLINE"}
                  </span>
                </h4>
                <p className="text-[9px] text-stone-400 font-mono tracking-tight truncate uppercase">
                  {activeRoleplayChar ? `ARSIPIST • ${activeRoleplayChar.bookTitle}` : "KASUAL • PEMBIMBING BELAJAR IMUT"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 dark:text-stone-300 hover:text-stone-700 dark:hover:text-white p-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages body area list */}
          <div className="flex-1 overflow-y-auto py-3 space-y-3.5 min-h-0 scrollbar-thin">
            {messages.map((m, idx) => {
              const isAI = m.role === "assistant";
              return (
                <div key={idx} className={`flex gap-2 ${isAI ? "justify-start" : "justify-end"}`}>
                  {isAI && (
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-white border border-stone-100 shrink-0 flex items-center justify-center shadow-sm select-none">
                      <img src="/logo.png" alt="Suki AI" className="w-full h-full object-contain" />
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-sm leading-relaxed ${
                    isAI 
                      ? "bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 font-medium rounded-tl-none pr-8"
                      : "bg-emerald-600 dark:bg-emerald-800 text-white font-medium rounded-tr-none"
                  }`}>
                    <p className="whitespace-pre-line">{m.content}</p>
                    <span className={`block mt-1 text-[8px] font-mono text-right ${isAI ? "text-stone-400" : "text-emerald-100/70"}`}>
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-white border border-stone-100 flex items-center justify-center animate-spin">
                  <img src="/logo.png" alt="Suki Loading" className="w-full h-full object-contain" />
                </div>
                <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200 rounded-2xl px-3.5 py-2.5 text-xs shadow-inner flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 text-emerald-600 animate-spin" />
                  <span className="font-sans italic animate-pulse">Suki sedang bermeditasi...</span>
                </div>
              </div>
            )}

            {errorMsg && (
              <p className="text-[10px] text-amber-700 dark:text-amber-500 italic text-center">{errorMsg}</p>
            )}

            <div ref={scrollRef}></div>
          </div>

          {/* Quick Helper Actions Row bar */}
          <div className="py-2 border-t border-stone-150 dark:border-stone-800 flex flex-wrap items-center justify-between gap-1.5 select-none">
            <button
              onClick={handleRequestClue}
              type="button"
              className="py-1 px-2.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-900/50 rounded-lg text-[9px] font-sans font-black text-amber-800 dark:text-amber-200 flex items-center gap-1 transition-all cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-600 animate-spin" />
              <span>{activeRoleplayChar ? "Minta Sabda Luhur 🔮" : "Minta Clue Pelajaran 💡"}</span>
            </button>

            {activeRoleplayChar && (
              <button
                onClick={() => {
                  setActiveRoleplayChar(null);
                  setMessages([
                    {
                      role: "assistant",
                      content: "🌸 Roh tokoh sejarah telah kembali merenung di lorong masa! Aku kembali menjadi Suki si maskot yang manja. Ada yang bisa kubantu belajar sayang? ✨🌿",
                      timestamp: new Date()
                    }
                  ]);
                }}
                type="button"
                className="bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-850 rounded-lg py-1 px-2.5 text-[9px] font-sans font-black text-stone-700 dark:text-stone-300 transition cursor-pointer"
              >
                Kembalikan Suki Normal 🌸
              </button>
            )}

            <div className="text-[9px] font-mono text-stone-400 dark:text-stone-500 font-bold">
              EXP: {userExp}
            </div>
          </div>

          {/* Chat user input bar */}
          <form onSubmit={handleSendMessage} className="flex gap-1.5 mt-1 border-t border-stone-150 dark:border-stone-800 pt-2 select-none">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={activeRoleplayChar ? `Panggil ${activeRoleplayChar.character}...` : "Ketik pesan untuk Suki..."}
              className="flex-1 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-1.5 text-xs font-sans outline-none focus:bg-white dark:focus:bg-stone-900 focus:ring-1 focus:ring-emerald-500 text-stone-800 dark:text-stone-100"
            />
            <button
              type="submit"
              disabled={loading || !inputVal.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-200 dark:disabled:bg-stone-900 disabled:text-stone-400 text-white p-2 rounded-xl transition-all cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
