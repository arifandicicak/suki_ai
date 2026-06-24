import React, { useState, useEffect } from "react";
import { WORLD_HISTORY_ARCHIVE, HistoricalBook } from "../data/languagesData";
import { Book, Bookmark, History, Calendar, Feather, Search, X, BookOpen, Clock, Award, Sparkles, Check } from "lucide-react";

const getHistoricalFigure = (bookId: string): string => {
  const mapping: Record<string, string> = {
    "hist-1": "Alexander Agung",
    "hist-2": "Julius Caesar",
    "hist-3": "Firaun Khufu",
    "hist-4": "Kaisar Justinian I",
    "hist-5": "Khalifah Harun al-Rasyid",
    "hist-6": "Minamoto no Yoritomo",
    "hist-7": "James Watt",
    "hist-8": "Franklin D. Roosevelt",
    "hist-9": "Alan Turing",
    "hist-10": "Mahapatih Gajah Mada",
    "hist-11": "Leonardo da Vinci",
    "hist-12": "Kaisar Qin Shi Huang",
    "hist-13": "Ah Cacao (Raja Maya)",
    "hist-14": "Dapunta Hyang Śrī Jayanāśa",
    "hist-15": "Gunadharma (Arsitek Borobudur)",
    "hist-16": "Napoleon Bonaparte",
    "hist-17": "Kaisar Meiji"
  };
  return mapping[bookId] || "Tokoh Sejarah Agung";
};

export default function HistoryLibrary() {
  const [selectedBook, setSelectedBook] = useState<HistoricalBook | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeEraFilter, setActiveEraFilter] = useState<"All" | "Kuno" | "Pertengahan" | "Modern">("All");
  const [currentPage, setCurrentPage] = useState(0);

  const [readBookIds, setReadBookIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("suki_read_books") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleSync = () => {
      try {
        const arr = JSON.parse(localStorage.getItem("suki_read_books") || "[]");
        setReadBookIds(arr);
      } catch {}
    };
    window.addEventListener("suki_stats_updated", handleSync);
    return () => window.removeEventListener("suki_stats_updated", handleSync);
  }, []);

  // Parse detailedContent into separate page-turner batches
  const getPages = (content: string) => {
    const blocks = content.split("\n\n");
    const pagesList: string[][] = [];
    let currentChunk: string[] = [];

    blocks.forEach((block) => {
      if (block.trim().startsWith("####") && currentChunk.length >= 1) {
        pagesList.push(currentChunk);
        currentChunk = [block];
      } else {
        currentChunk.push(block);
        if (currentChunk.length >= 2) {
          pagesList.push(currentChunk);
          currentChunk = [];
        }
      }
    });
    if (currentChunk.length > 0) {
      pagesList.push(currentChunk);
    }
    return pagesList;
  };

  // Filter books list based on search key and era
  const filteredBooks = WORLD_HISTORY_ARCHIVE.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.shortSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEra = activeEraFilter === "All" || book.era === activeEraFilter;
    return matchesSearch && matchesEra;
  });

  // Group books by Era for the classic bookshelf look
  const kunoBooks = filteredBooks.filter((b) => b.era === "Kuno");
  const pertengahanBooks = filteredBooks.filter((b) => b.era === "Pertengahan");
  const modernBooks = filteredBooks.filter((b) => b.era === "Modern");

  const renderBookShelf = (books: HistoricalBook[], shelfTitle: string, subtitle: string) => {
    if (books.length === 0) return null;

    return (
      <div className="space-y-4 mb-10">
        {/* Shelf banner headers */}
        <div className="flex items-center justify-between pb-2 border-b border-stone-200">
          <div>
            <h4 className="font-sans font-black text-xs md:text-sm text-stone-800 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-650 shrink-0"></span>
              {shelfTitle}
            </h4>
            <p className="text-[10px] text-stone-400 font-mono uppercase">{subtitle}</p>
          </div>
          <span className="text-[10px] bg-stone-100 text-stone-500 font-bold px-2 py-0.5 rounded border border-stone-200 font-mono">
            {books.length} Karya Terdaftar
          </span>
        </div>

        {/* Realistic Book Shelves Grid */}
        <div className="relative pt-6 pb-2.5 px-4 bg-stone-50/50 border border-stone-200 rounded-2xl shadow-inner my-2">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => {
                  setSelectedBook(book);
                  setCurrentPage(0);
                  try {
                    const saved = JSON.parse(localStorage.getItem("suki_read_books") || "[]");
                    if (Array.isArray(saved) && !saved.includes(book.id)) {
                      saved.push(book.id);
                      localStorage.setItem("suki_read_books", JSON.stringify(saved));
                      window.dispatchEvent(new Event("suki_stats_updated"));
                    }
                  } catch (e) {
                    console.error("Failed to track read book:", e);
                  }
                }}
                className="group flex flex-col items-center justify-end text-center cursor-pointer relative"
              >
                {/* 3D-ish Book Spine Component Wrapper */}
                <div className="relative w-28 h-40 rounded-r-lg shadow-md hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 active:scale-95 group-hover:-translate-y-2 overflow-hidden flex flex-col justify-between p-2.5 select-none border-l-[6px] border-stone-900/40"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.1) 100%), var(--bg-grad, #7c2d12)`
                  }}
                >
                  {/* Tailwind classes compiled using style inline var injection */}
                  <span className="hidden" style={{ color: "invisible" }}>
                    {/* Make sure gradient values exist */}
                    {book.coverColor}
                  </span>

                  {/* Programmatic cover colors using dynamic classes safely */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${book.coverColor} opacity-95 z-0`}></div>

                  {/* Golden Bookmark Ribbon outline */}
                  <div className="absolute top-0 right-3.5 w-2 h-8 bg-amber-400 rounded-b shadow z-10 pointer-events-none"></div>

                  {/* Miniature Spine elements */}
                  <div className="relative z-10 text-left border-b border-white/20 pb-1.5 pointer-events-none">
                    <p className="text-[8px] font-mono text-amber-200 font-black tracking-widest uppercase truncate">{book.year}</p>
                    <div className="w-4 h-0.5 bg-amber-300 mt-0.5"></div>
                  </div>

                  {/* Main cover text */}
                  <div className="relative z-10 text-center my-auto py-1 pointer-events-none">
                    <h5 className="font-sans font-black text-[10px] md:text-[11px] text-stone-50 tracking-tight leading-tight line-clamp-3 uppercase drop-shadow">
                      {book.title}
                    </h5>
                  </div>

                  {/* Cover footer */}
                  <div className="relative z-10 text-center pointer-events-none">
                    <hr className="border-white/10 my-1" />
                    <p className="text-[7px] font-mono text-stone-200 font-semibold truncate uppercase tracking-tighter" title={book.author}>
                      {book.author.replace(/^(Prof\.|Dr\.) /, "")}
                    </p>
                  </div>
                </div>

                {/* Wooden shelf floor deck beneath the books */}
                <div className="w-full h-2.5 bg-amber-900/80 rounded-full mt-3 shadow-sm border-t border-amber-800"></div>

                {/* Simple metadata book labels */}
                <div className="mt-1.5 max-w-[130px]">
                  <h6 className="font-sans font-extrabold text-[11px] text-stone-900 leading-tight truncate group-hover:text-amber-700 transition-colors">
                    {book.title}
                  </h6>
                  <p className="text-[9px] text-stone-400 font-mono mt-0.5">{book.year}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Wooden backboard border decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-300 rounded-b-xl"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 relative z-10">
      
      {/* 1. INTRO CATALOG HEADER BAR */}
      <div className="bg-white border-2 border-stone-200 rounded-[2rem] p-6 shadow-xl shadow-stone-900/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <h2 className="font-sans font-black text-xl md:text-2xl text-stone-900 flex items-center gap-2">
              <History className="w-6 h-6 text-amber-700" />
              Arsip Perpustakaan Sejarah Dunia 📔
            </h2>
            <p className="text-stone-500 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
              Selamat datang di rak buku digital interaktif. Jelajahi catatan peradaban luhur, taktik militer para raja, hingga kebangkitan modernisme sains secara obyektif dan mendalam.
            </p>
          </div>

          <div id="shelf-stats" className="bg-stone-50 p-4 border border-stone-200 rounded-xl flex items-center gap-3.5 shadow-sm shrink-0">
            <div className="bg-amber-50 p-2.5 border border-amber-200 rounded-lg text-amber-700 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-mono text-stone-400 uppercase tracking-widest font-bold">Total Pustaka</p>
              <p className="text-xs font-sans font-black text-stone-900">{WORLD_HISTORY_ARCHIVE.length} Buku Doktrin Sejarah</p>
            </div>
          </div>
        </div>

        {/* ERA FILTER AND SEARCH BAR BAR */}
        <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-stone-150 pt-5 mt-5 relative z-10">
          
          {/* Search box input selector */}
          <div className="relative w-full sm:flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Cari buku sejarah, tokoh, kerajaan atau tahun..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 bg-stone-50 border border-stone-200 hover:border-stone-300 focus:bg-white text-xs md:text-sm font-sans rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/25 transition-all outline-none text-stone-850"
            />
          </div>

          {/* Era Filter Selector pill list */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 border border-stone-200 rounded-xl shrink-0 w-full sm:w-auto overflow-x-auto">
            {["All", "Kuno", "Pertengahan", "Modern"].map((era) => {
              const active = activeEraFilter === era;
              return (
                <button
                  key={era}
                  onClick={() => setActiveEraFilter(era as any)}
                  className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-sans font-black transition-all cursor-pointer ${
                    active
                      ? "bg-amber-700 text-white shadow-sm"
                      : "text-stone-500 hover:text-stone-850"
                  }`}
                >
                  {era === "All" ? "Semua Era" : era}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 2. THE THREE DISTINCT SHELVES SECTION CONTAINER */}
      <div className="bg-white border-2 border-stone-200 rounded-[2.5rem] p-6 md:p-8 shadow-sm space-y-4">
        
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <div className="w-14 h-14 bg-stone-50 border border-stone-200 text-stone-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Search className="w-6 h-6" />
            </div>
            <h5 className="font-sans font-bold text-stone-900 text-sm">Tidak ada buku sejarah ditemukan</h5>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Cobalah kata kunci lain seperti 'Kuno', 'Alexander', 'Perang', 'Roma', atau ganti filter era tujuan.
            </p>
          </div>
        ) : (
          <>
            {renderBookShelf(kunoBooks, "🏺 Era Kuno & Klasik", "Era Kejayaan Peradaban Mesir, Yunani, dan Kekaisaran Pertama Romawi.")}
            {renderBookShelf(pertengahanBooks, "🏰 Era Abad Pertengahan & Feodalisme", "Era Kavaleri Kuda, Perang Salib, Kejayaan Islam, Dinasti Mongol, dan Renaisans.")}
            {renderBookShelf(modernBooks, "🚂 Era Revolusi Modern & Sejarah Baru", "Era Kemajuan Industri, Perang Dunia Global, Penjelajahan Kosmik, dan Lahirnya Dunia Digital.")}
          </>
        )}

      </div>

      {/* 3. PROFESSIONAL CLEAN BOOK READER POPUP DIALOG WINDOW (MODAL POPUP) */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fade-in">
          
          {/* E-book frame casing container */}
          <div className="relative bg-[#FCFAF2] border-4 border-stone-950 w-full max-w-4xl rounded-2xl md:rounded-[2.5rem] shadow-2xl p-5 md:p-10 flex flex-col md:flex-row gap-5 md:gap-8 max-h-[90vh] md:max-h-[88vh] overflow-y-auto select-text">
            
            {/* Elegant close badge on the absolute edge corner */}
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full border border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 text-stone-500 hover:text-stone-850 flex items-center justify-center shadow transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left E-book Side: Stylized Spine presentation cover */}
            <div className="md:w-1/3 flex flex-col items-center justify-between shrink-0 bg-stone-100 border border-stone-200 p-5 rounded-3xl relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-b from-stone-500/5 to-stone-900/10 pointer-events-none"></div>

              {/* Spine Visual Illustration representation model */}
              <div className={`w-36 h-52 rounded-r-xl shadow-lg flex flex-col justify-between p-4 border-l-8 border-stone-950/30 relative text-left select-none bg-gradient-to-br ${selectedBook.coverColor}`}>
                <div className="text-[9px] font-mono text-amber-200 font-extrabold tracking-wider">{selectedBook.year}</div>
                <h4 className="font-sans font-black text-xs text-white leading-tight mt-3 uppercase line-clamp-4 select-none">
                  {selectedBook.title}
                </h4>
                <div className="border-t border-white/20 pt-1 text-[8px] font-mono text-stone-200 uppercase tracking-tighter truncate">
                  {selectedBook.author}
                </div>
              </div>

              {/* Book Info Panel */}
              <div className="mt-5 space-y-2 select-none">
                <div className="flex items-center justify-center gap-1.5 text-stone-500 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  Tahun Rilis: {selectedBook.year}
                </div>
                <div className="flex items-center justify-center gap-1.5 text-stone-500 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <Feather className="w-3.5 h-3.5 text-amber-700" />
                  Karya: {selectedBook.author}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[9px] font-mono bg-stone-200 rounded-full border border-stone-300 text-stone-700 font-extrabold uppercase">
                  ERA: {selectedBook.era}
                </div>
              </div>

              {/* AI Roleplay Summoning Button */}
              <div className="mt-5 w-full select-none">
                <button
                  onClick={() => {
                    const character = getHistoricalFigure(selectedBook.id);
                    // Emit custom event to inform Suki Mascot to possess that character
                    window.dispatchEvent(
                      new CustomEvent("suki-trigger-roleplay", {
                        detail: { character, bookTitle: selectedBook.title }
                      })
                    );
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-stone-900 via-indigo-950 to-stone-900 hover:from-indigo-900 hover:to-indigo-950 text-white rounded-xl border border-indigo-400/30 text-[10px] font-sans font-extrabold shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer group"
                  title="Koneksikan Roh Tokoh Sejarah via AI"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-300 group-hover:animate-pulse" />
                  <span>Koneksikan Roh Tokoh Sejarah 🔮</span>
                </button>
                <p className="text-[8px] text-stone-400 font-mono mt-1 text-center">
                  Saluran Obrolan Interaktif via Gemini AI
                </p>
              </div>

              {/* Read completion button */}
              <div className="mt-4 w-full select-none border-t border-stone-200/50 pt-4">
                {readBookIds.includes(selectedBook.id) ? (
                  <div className="w-full py-2.5 px-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5 text-[10.5px] font-sans font-black shadow-sm select-none">
                    <Check className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>Selesai Dibaca ✓</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      try {
                        const saved = JSON.parse(localStorage.getItem("suki_read_books") || "[]");
                        if (Array.isArray(saved) && !saved.includes(selectedBook.id)) {
                          saved.push(selectedBook.id);
                          localStorage.setItem("suki_read_books", JSON.stringify(saved));
                          setReadBookIds(saved);
                          window.dispatchEvent(new Event("suki_stats_updated"));
                        }
                      } catch (e) {
                        console.error("Failed to track read book:", e);
                      }
                    }}
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl border border-amber-400/20 text-[10.5px] font-sans font-black shadow-md hover:shadow-amber-500/10 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>Tandai Selesai Dibaca ✓</span>
                  </button>
                )}
              </div>

              <div className="border-t border-stone-200 w-full pt-3 mt-3 text-[9px] font-mono text-stone-400 select-none">
                Miliki Pengetahuan, Kuasai Masa Depan.
              </div>
            </div>

            {/* Right E-book Side: Interactive Clean Scroll reading area */}
            <div className="flex-1 flex flex-col justify-between">
              
              {/* Reading header info */}
              <div className="border-b border-stone-200 pb-3 mb-3">
                <span className="text-[10px] uppercase font-mono font-black text-amber-700 flex items-center gap-1 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 w-max">
                  <Bookmark className="w-3 h-3" />
                  Arsip Buku Digital Sejarah
                </span>
                <h1 className="font-sans font-black text-[#1c1917] text-xl md:text-2xl mt-1.5 leading-tight">
                  {selectedBook.title}
                </h1>
                <p className="text-xs text-stone-500 mt-1 italic pr-8">
                  "{selectedBook.shortSummary}"
                </p>
              </div>

              {/* Realistic elegant book text pages scroll area */}
              {(() => {
                const bookPages = getPages(selectedBook.detailedContent);
                return (
                  <div className="flex-1 flex flex-col justify-between min-h-[380px]">
                    <div className="overflow-y-auto max-h-[46vh] pr-2 space-y-4 font-sans text-[#27272a] leading-relaxed text-xs md:text-sm scrollbar-thin">
                      {bookPages[currentPage]?.map((chunk, idx) => {
                        // Catch system format elements elegantly
                        if (chunk.startsWith("####")) {
                          return (
                            <h4 key={idx} className="font-sans font-black text-[#7c2d12] text-sm md:text-base mt-4 mb-1.5 border-l-4 border-amber-600 pl-2.5">
                              {chunk.replace("#### ", "")}
                            </h4>
                          );
                        }
                        if (chunk.trim().startsWith("1.") || chunk.trim().startsWith("-")) {
                          return (
                            <ul key={idx} className="list-disc pl-5 space-y-1.5 font-sans text-stone-700 text-xs md:text-sm my-3 border bg-white/40 border-stone-150 p-4 rounded-xl shadow-xs">
                              {chunk.split("\n").map((line, lidx) => (
                                <li key={lidx}>
                                  {line.replace(/^-\s*|^\d+\.\s*/, "")}
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        if (chunk.trim().startsWith(">")) {
                          return (
                            <blockquote key={idx} className="border-l-4 border-amber-500 pl-4 py-1.5 italic text-stone-600 my-3 bg-amber-50/50 rounded-r-xl">
                              {chunk.replace(/^>\s*/, "").replace(/["]/g, "")}
                            </blockquote>
                          );
                        }

                        // Default reading paragraphs with beautiful initial drops
                        return (
                          <p key={idx} className="text-[#3f3f46] leading-relaxed whitespace-pre-line text-xs md:text-sm">
                            {chunk}
                          </p>
                        );
                      })}
                    </div>

                    {/* SLIDE NAVIGATION CONTROLS */}
                    <div className="flex items-center justify-between border-t border-stone-200 pt-3.5 mt-4 select-none">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                        disabled={currentPage === 0}
                        className="px-4 py-2 bg-stone-100 hover:bg-stone-200 disabled:bg-stone-50 disabled:text-stone-300 border border-stone-200 text-stone-700 rounded-xl text-xs font-sans font-black transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                      >
                        ← Halaman Sebelumnya
                      </button>
                      <span className="text-xs font-mono font-bold text-stone-500">
                        Halaman {currentPage + 1} dari {bookPages.length}
                      </span>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(bookPages.length - 1, p + 1))}
                        disabled={currentPage === bookPages.length - 1}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-100 disabled:text-stone-300 border border-amber-700/30 text-white disabled:border-stone-200 rounded-xl text-xs font-sans font-black transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                      >
                        Halaman Selanjutnya →
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Reading footer toolbar */}
              <div className="border-t border-stone-200 pt-3 mt-4 flex justify-between items-center text-[10px] font-mono text-stone-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-300" />
                  Waktu Baca: ~4 mnt
                </span>
                <span className="uppercase text-amber-850 font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  Katalog Terverifikasi Objektif
                </span>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
