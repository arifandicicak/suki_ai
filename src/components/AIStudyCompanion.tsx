import React, { useState, useRef, useEffect } from "react";
import { Lesson, ChatMessage } from "../types";
import { Send, Sparkles, User, GraduationCap, RefreshCw, AlertCircle } from "lucide-react";

interface AIStudyCompanionProps {
  activeLesson: Lesson;
  userExp: number;
  userPicture?: string;
}

export default function AIStudyCompanion({ activeLesson, userExp, userPicture }: AIStudyCompanionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [uiInput, setUiInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Set up initial greeting message when active lesson changes
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Halo pembelajar pintar! 👋 Saya **StudySuki AI**, tutor cerdasmu. \n\nKamu sedang mempelajari modul **"${activeLesson.title}"**.\n\nApakah ada bagian dari materi di samping yang ingin kamu tanyakan atau bingung? Tanyakan saja di sini, saya siap membantu mengulasnya dengan analogi mudah!`,
        timestamp: new Date(),
      },
    ]);
    setErrorStatus(null);
  }, [activeLesson]);

  // Keep chat scrolled down
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uiInput.trim()) return;

    const userText = uiInput;
    setUiInput("");
    setErrorStatus(null);

    // Append user message
    const userMsg: ChatMessage = {
      role: "user",
      content: userText,
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          topic: activeLesson.title,
          taskContext: `Sub-materi: ${activeLesson.shortDesc}. User saat ini memiliki ${userExp} EXP.`,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal memperoleh respons dari server.");
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: data.text || "Saya minta maaf, saya mengalami kesulitan menerjemahkan ide saat ini.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorStatus("Terjadi kesalahan pada server. Pastikan API Key telah dipasang atau coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-2 border-stone-200 rounded-[2rem] overflow-hidden shadow-xl shadow-stone-900/5">
      {/* Companion Title Header */}
      <div className="bg-stone-50 px-5 py-4 border-b border-stone-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-50 p-2 rounded-xl text-emerald-800 border border-emerald-100">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-sans font-bold text-sm text-stone-950">StudySuki Robot AI</h4>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            </div>
            <p className="text-[10px] text-stone-400 font-mono">AKTIF • ASISTEN PINTARMU</p>
          </div>
        </div>

        <div className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1 shadow-sm">
          <Sparkles className="w-3 h-3 text-emerald-600 animate-spin" />
          Powered by Gemini
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[480px]">
        {messages.map((m, idx) => {
          const isAI = m.role === "assistant";
          return (
            <div key={idx} className={`flex gap-2.5 ${isAI ? "justify-start" : "justify-end"}`}>
              {isAI && (
                <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 shrink-0 flex items-center justify-center text-emerald-750 shadow-sm">
                  <GraduationCap className="w-4 h-4" />
                </div>
              )}
              
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs md:text-sm shadow-sm leading-relaxed ${
                isAI 
                  ? "bg-stone-50 text-stone-800 rounded-tl-none border border-stone-150" 
                  : "bg-emerald-600 text-white rounded-tr-none"
              }`}>
                {/* Content rendering with linebreaks support */}
                <div className="whitespace-pre-line space-y-2">
                  {m.content}
                </div>
                
                <span className={`block mt-1 text-[9px] font-mono text-right ${isAI ? "text-stone-400" : "text-white/70"}`}>
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {!isAI && (
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm border border-stone-200">
                  {userPicture ? (
                    <img src={userPicture} alt="User Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full bg-emerald-600 flex items-center justify-center text-stone-100">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 shrink-0 flex items-center justify-center text-emerald-650 animate-pulse">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="bg-stone-50 border border-stone-150 text-stone-800 rounded-2xl rounded-tl-none px-4 py-3 text-xs shadow-sm flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
              <span className="animate-pulse">StudySuki sedang berpikir kreatif...</span>
            </div>
          </div>
        )}

        {errorStatus && (
          <div className="bg-amber-50 border border-amber-205 rounded-xl p-3 text-xs text-amber-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-650 shrink-0" />
            <span>{errorStatus}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Message Form */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-stone-200 bg-stone-50 flex gap-2">
        <input
          type="text"
          value={uiInput}
          onChange={(e) => setUiInput(e.target.value)}
          placeholder={`Tanya apa saja tentang "${activeLesson.title}"...`}
          className="flex-1 bg-white hover:border-stone-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-800 outline-none placeholder-stone-400 transition-all font-sans"
        />
        <button
          type="submit"
          disabled={!uiInput.trim() || loading}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-100 disabled:text-stone-400 py-2.5 px-4 rounded-xl text-white font-semibold flex items-center justify-center shadow transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
