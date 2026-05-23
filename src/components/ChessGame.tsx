import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { UserStats } from "../types";
import { Award, Zap, RefreshCw, Sparkles, Smile, ShieldAlert } from "lucide-react";

interface Piece {
  type: "p" | "r" | "n" | "b" | "q" | "k";
  color: "w" | "b";
}

type Board = (Piece | null)[][];

interface ChessGameProps {
  stats: UserStats;
  onRewardXP: (xp: number) => void;
  onWinChess: () => void;
}

// Map pieces to descriptive Unicode characters
const unicodePieces: Record<Piece["color"], Record<Piece["type"], string>> = {
  w: {
    p: "♙",
    r: "♖",
    n: "♘",
    b: "♗",
    q: "♕",
    k: "♔",
  },
  b: {
    p: "♟",
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
  },
};

const pieceNames: Record<Piece["type"], string> = {
  p: "Pion",
  r: "Benteng",
  n: "Kuda",
  b: "Gajah",
  q: "Menteri",
  k: "Raja",
};

export default function ChessGame({ stats, onRewardXP, onWinChess }: ChessGameProps) {
  // Initialize Chess.js
  const [game, setGame] = useState(() => new Chess());
  const [board, setBoard] = useState<Board>(() => game.board() as any);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [validMoves, setValidMoves] = useState<[number, number][]>([]);
  const [turn, setTurn] = useState<"w" | "b">("w");
  const [gameStatus, setGameStatus] = useState<"active" | "user_win" | "ai_win">("active");
  const [movesLog, setMovesLog] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<"mudah" | "sedang" | "sulit" | "sangat_sulit">("sedang");
  const [aiCommentary, setAiCommentary] = useState<string>(
    "Selamat datang di Arena Catur AI StudySuki! Gerakkan pion putihmu untuk memulai kontes taktik."
  );
  const [loadingCommentary, setLoadingCommentary] = useState(false);

  // Trigger AI advice on board changes
  const fetchAiAdvice = async (boardState: Board, lastMove: string) => {
    setLoadingCommentary(true);
    try {
      const response = await fetch("/api/chess-move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boardState,
          movesHistory: lastMove || "Game in progress",
          pgn: movesLog.join(" "),
          difficulty: difficulty === "mudah" ? "Mudah" : difficulty === "sedang" ? "Sedang" : difficulty === "sulit" ? "Sulit" : "Sangat Sulit",
        }),
      });
      const data = await response.json();
      if (data.advice) {
        setAiCommentary(data.advice);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCommentary(false);
    }
  };

  const handleGameOverState = () => {
    if (game.isCheckmate()) {
      const winner = game.turn() === "w" ? "b" : "w";
      if (winner === "w") {
        setGameStatus("user_win");
        onWinChess();
        setAiCommentary("Luar biasa! Raja hitam telah diskakmat. Kamu keluar sebagai pemenang!");
      } else {
        setGameStatus("ai_win");
        setAiCommentary("Skakmat! Rajamu telah tumbang oleh rute pertarungan taktik AI.");
      }
    } else if (game.isDraw()) {
      setGameStatus("ai_win"); // treat draw as finished game status
      setAiCommentary("Permainan berakhir remis (Draw/Stalemate/Remis)!");
    } else {
      setGameStatus("ai_win");
      setAiCommentary("Permainan selesai.");
    }
  };

  // Run AI movement for opponent (Black)
  const makeAIMove = () => {
    if (gameStatus !== "active") return;

    // Gather all legal moves for current turn (Black)
    const moves = game.moves({ verbose: true }) as any[];
    if (moves.length === 0) {
      handleGameOverState();
      return;
    }

    const aiMoves = moves.map((m) => {
      let weight = 0;

      if (difficulty === "mudah") {
        weight = Math.random() * 50;
        if (m.captured) {
          if (m.captured === "k") weight = 10000;
        }
      } else if (difficulty === "sedang") {
        if (m.captured) {
          if (m.captured === "p") weight = 10;
          else if (m.captured === "n") weight = 30;
          else if (m.captured === "b") weight = 35;
          else if (m.captured === "r") weight = 50;
          else if (m.captured === "q") weight = 90;
          else if (m.captured === "k") weight = 1000;
        }
        const rankValue = parseInt(m.to[1]); // 1 to 8 (favor lower ranks for Black to move down)
        weight += (8 - rankValue) * 0.1 + Math.random() * 2;
      } else {
        // Sulit & Sangat Sulit
        if (m.captured) {
          if (m.captured === "p") weight = 15;
          else if (m.captured === "n") weight = 40;
          else if (m.captured === "b") weight = 45;
          else if (m.captured === "r") weight = 60;
          else if (m.captured === "q") weight = 100;
          else if (m.captured === "k") weight = 2000;
        }

        // Test safety in a simulated board state using move-undo-check
        game.move(m);
        const isAttacked = game.isAttacked(m.to, "w");
        game.undo();

        if (isAttacked) {
          weight -= 30;
        } else {
          weight += 10;
        }

        if (difficulty === "sangat_sulit") {
          // If in check, push king moves or capturing attacker moves
          if (game.inCheck()) {
            if (m.piece === "k") {
              weight += 150;
            } else {
              weight += 80;
            }
          }
        }
        const rankValue = parseInt(m.to[1]);
        weight += (8 - rankValue) * 0.2 + Math.random() * 4;
      }

      return { move: m, weight, captureType: m.captured || null };
    });

    // Sort moves descending by weight
    aiMoves.sort((a, b) => b.weight - a.weight);
    const bestChoice = aiMoves[0];

    try {
      const result = game.move(bestChoice.move);
      if (result) {
        setBoard(game.board() as any);
        const logText = `AI: ${pieceNames[result.piece]} ${result.from} ➔ ${result.to}${
          result.captured ? ` (makan ${pieceNames[result.captured]})` : ""
        }`;
        setMovesLog((prev) => [...prev, logText]);

        if (game.isGameOver()) {
          handleGameOverState();
        } else {
          setTurn("w");
        }

        fetchAiAdvice(game.board() as any, logText);
      }
    } catch (err) {
      console.error("AI failed to execute move:", err);
    }
  };

  // Set timeout trigger to let user see board update before AI responds
  useEffect(() => {
    if (turn === "b" && gameStatus === "active") {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [turn, gameStatus]);

  // Handle Square clicks
  const handleSquareClick = (r: number, c: number) => {
    if (gameStatus !== "active") return;
    if (turn !== "w") return;

    // Is there a clicked piece?
    const clickedPiece = board[r][c];

    // If there is a selected piece and the clicked square is highlighted as a valid destination
    const isDestination = validMoves.some(([vr, vc]) => vr === r && vc === c);

    // Let's add King-Rook castling click bypass to ensure players can castle naturally
    let isCastlingClick = false;
    let castlingTargetFile = "";
    if (selected) {
      const [fromR, fromC] = selected;
      const currentPiece = board[fromR][fromC];
      if (currentPiece && currentPiece.type === "k" && currentPiece.color === "w") {
        // If they click on h1 rook while g1 is a legal destination
        if (r === 7 && c === 7 && validMoves.some(([vr, vc]) => vr === 7 && vc === 6)) {
          isCastlingClick = true;
          castlingTargetFile = "g1";
        }
        // If they click on a1 rook while c1 is a legal destination
        if (r === 7 && c === 0 && validMoves.some(([vr, vc]) => vr === 7 && vc === 2)) {
          isCastlingClick = true;
          castlingTargetFile = "c1";
        }
      }
    }

    if ((isDestination || isCastlingClick) && selected) {
      const [fromR, fromC] = selected;
      const currentPiece = board[fromR][fromC];
      if (!currentPiece) return;

      const fromCell = `${String.fromCharCode(97 + fromC)}${8 - fromR}`;
      const toCell = isCastlingClick ? castlingTargetFile : `${String.fromCharCode(97 + c)}${8 - r}`;
      const targetPiece = isCastlingClick ? null : board[r][c];

      try {
        // Enforce potential promotion (white pawn to row 0)
        let promotionPiece: string | undefined = undefined;
        if (currentPiece.type === "p" && r === 0) {
          promotionPiece = "q"; // promote to Queen by default for FIDE compliance
        }

        const moveResult = game.move({
          from: fromCell,
          to: toCell,
          promotion: promotionPiece,
        });

        if (moveResult) {
          // Success! Update board & details
          setBoard(game.board() as any);
          const isReallyCastle = moveResult.san.includes("O-O");
          const moveLogText = isReallyCastle 
            ? `User: ${isReallyCastle === true && toCell === "g1" ? "Rokade Sayap Raja (O-O)" : "Rokade Sayap Menteri (O-O-O)"}`
            : `User: ${pieceNames[currentPiece.type]} ${fromCell} ➔ ${toCell}${
                targetPiece ? ` (makan ${pieceNames[targetPiece.type]})` : ""
              }`;
          setMovesLog((prev) => [...prev, moveLogText]);
          setSelected(null);
          setValidMoves([]);

          if (game.isGameOver()) {
            handleGameOverState();
          } else {
            setTurn("b");
          }
        }
      } catch (err) {
        console.error("Invalid move attempted:", err);
      }
    } else {
      // Piece selection
      if (clickedPiece && clickedPiece.color === "w") {
        setSelected([r, c]);
        const fromCell = `${String.fromCharCode(97 + c)}${8 - r}`;
        const moves = game.moves({ square: fromCell as any, verbose: true }) as any[];
        
        // Map moves to destination [r, c] grid coordinates
        const dests = moves.map((m) => {
          const fileIndex = m.to.charCodeAt(0) - 97;
          const rankIndex = 8 - parseInt(m.to[1]);
          return [rankIndex, fileIndex] as [number, number];
        });
        setValidMoves(dests);
      } else {
        setSelected(null);
        setValidMoves([]);
      }
    }
  };

  const handleReset = () => {
    const newGame = new Chess();
    setGame(newGame);
    setBoard(newGame.board() as any);
    setSelected(null);
    setValidMoves([]);
    setTurn("w");
    setGameStatus("active");
    setMovesLog([]);
    setAiCommentary("Permainan diatur ulang. Giliran putih melangkah!");
  };

  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 md:p-6 w-full max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      
      {/* Background glow lines */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        
        {/* Left Side: Chess Board Grid */}
        <div className="flex-1 flex flex-col items-center w-full">
          <div className="flex justify-between items-center w-full mb-4">
            <div className="flex items-center gap-2">
              <Zap className="text-amber-400 w-5 h-5 animate-pulse shrink-0" />
              <h3 className="font-sans font-semibold text-sm md:text-lg text-slate-100 flex items-center gap-1.5 wrap-normal break-words max-w-[200px] md:max-w-none">
                Catur Taktik Lawan AI 
                <span className="text-[10px] bg-slate-800 border border-slate-700/60 px-2 py-0.5 rounded-full text-slate-300 md:inline">
                  +50 EXP
                </span>
              </h3>
            </div>
            
            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 text-[10px] md:text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Log
            </button>
          </div>

          {/* Difficulty Selection Bar */}
          <div className="flex flex-col gap-1.5 bg-slate-950 p-3 border border-slate-800/60 rounded-xl mb-4 w-full">
            <span className="font-mono text-[9px] text-[#22c55e] font-black uppercase tracking-wider">
              ⚙️ Pilih Tingkat Kesulitan AI:
            </span>
            <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 w-full">
              {(["mudah", "sedang", "sulit", "sangat_sulit"] as const).map((diff) => {
                const isActive = difficulty === diff;
                const labels = {
                  mudah: "Mudah",
                  sedang: "Sedang",
                  sulit: "Sulit",
                  sangat_sulit: "Sangat Sulit"
                };
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`flex-1 py-1 px-1 rounded text-[9px] md:text-xs font-sans font-black transition-all cursor-pointer ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {labels[diff]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 8x8 Board Container with touch/overflow break-preventing layout */}
          <div className="bg-slate-950 p-2 md:p-3 rounded-lg border border-slate-800/80 shadow-md w-full flex justify-center overflow-x-hidden">
            <div className="grid grid-cols-8 grid-rows-8 w-full max-w-[340px] aspect-square sm:max-w-[384px] select-none border border-slate-900">
              {board.map((row, r) =>
                row.map((piece, c) => {
                  const isBlackSquare = (r + c) % 2 === 1;
                  const isSecSelected = selected && selected[0] === r && selected[1] === c;
                  const isDestination = validMoves.some(([vr, vc]) => vr === r && vc === c);
                  
                  // Board Square color calculation
                  let squareBg = isBlackSquare ? "bg-slate-800" : "bg-slate-700/50";
                  if (isSecSelected) {
                    squareBg = "bg-sky-500/50";
                  } else if (isDestination) {
                    squareBg = "bg-emerald-500/40 ring-1 md:ring-2 ring-emerald-400/50 cursor-pointer";
                  }

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => handleSquareClick(r, c)}
                      className={`relative flex items-center justify-center font-sans transition-all duration-150 ${squareBg} ${
                        piece && piece.color === "w" && turn === "w" ? "cursor-grab" : ""
                      }`}
                    >
                      {/* Square Coordinates hint (bottom row & left col) */}
                      {c === 0 && (
                        <span className="absolute top-0.5 left-1 text-[8px] md:text-[9px] font-mono font-medium text-slate-500">
                          {8 - r}
                        </span>
                      )}
                      {r === 7 && (
                        <span className="absolute bottom-0.5 right-1 text-[8px] md:text-[9px] font-mono font-medium text-slate-500">
                          {String.fromCharCode(97 + c)}
                        </span>
                      )}

                      {/* Rendering Piece */}
                      {piece && (
                        <span
                          className={`text-2xl md:text-4xl leading-none font-medium select-none transition-all ${
                            piece.color === "w"
                              ? "text-slate-100 drop-shadow-[0_2px_4px_rgba(255,255,255,0.15)]"
                              : "text-slate-950 drop-shadow-[0_2px_3px_rgba(255,255,255,0.8)]"
                          }`}
                        >
                          {unicodePieces[piece.color][piece.type]}
                        </span>
                      )}

                      {/* Small green dot indicator for empty destination squares */}
                      {isDestination && !piece && (
                        <div className="w-2 md:w-3.5 h-2 md:h-3.5 rounded-full bg-emerald-400/60 shadow-lg shadow-emerald-400/30"></div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <span className="text-[10px] md:text-xs text-slate-400 py-1 px-2.5 rounded-full bg-slate-950 border border-slate-900 flex items-center gap-1.5 whitespace-nowrap">
              <span className={`w-2 h-2 rounded-full ${turn === "w" ? "bg-cyan-400 animate-pulse" : "bg-slate-700"}`} />
              Giliran kamu (Putih)
            </span>
            <span className="text-[10px] md:text-xs text-slate-400 py-1 px-2.5 rounded-full bg-slate-950 border border-slate-900 flex items-center gap-1.5 whitespace-nowrap">
              <span className={`w-2 h-2 rounded-full ${turn === "b" ? "bg-amber-500 animate-pulse" : "bg-slate-700"}`} />
              Giliran AI (Hitam)
            </span>
          </div>
        </div>

        {/* Right Side: Log & AI Commentary */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 md:p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Smile className="text-cyan-400 w-4 h-4 animate-bounce shrink-0" />
                <h4 className="font-sans font-medium text-[10px] md:text-xs text-cyan-400 tracking-wider uppercase">
                  Ulasan Strategi StudySuki AI
                </h4>
              </div>
              <p className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed italic break-words">
                "{aiCommentary}"
              </p>
              {loadingCommentary && (
                <div className="mt-2 text-[9px] md:text-[10px] text-slate-500 font-mono flex items-center gap-1 animate-pulse">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                  Menganalisis papan...
                </div>
              )}
            </div>

            <div className="h-36 md:h-44 flex flex-col justify-between border border-slate-800 bg-slate-950/40 rounded-xl p-3 md:p-4">
              <h5 className="font-mono text-[9px] md:text-[10px] text-slate-400 font-semibold tracking-widest uppercase mb-2">
                Log Kontes Taktis:
              </h5>
              <div className="flex-1 overflow-y-auto space-y-1 pr-1 font-mono text-[10px] md:text-xs text-slate-400">
                {movesLog.length === 0 ? (
                  <div className="text-slate-600 italic">Belum ada gerakan tercatat. Silakan geser salah satu bidak putihmu!</div>
                ) : (
                  movesLog.map((move, idx) => (
                    <div key={idx} className="border-b border-slate-900 pb-0.5 leading-relaxed break-all">
                      {idx + 1}. {move}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-2">
            {gameStatus === "user_win" && (
              <div className="bg-emerald-500/10 border border-emerald-500 rounded-lg p-3 text-center mb-2 animate-fade-in">
                <div className="flex justify-center mb-1 text-emerald-400 animate-bounce">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-sans font-bold text-xs md:text-sm text-emerald-400">Kamu Menang Catur!</h4>
                <p className="text-[10px] md:text-xs text-emerald-200 mt-1">Kamu berhasil menjebak Raja AI hitam. EXP +50 ditambahkan!</p>
              </div>
            )}

            {gameStatus === "ai_win" && (
              <div className="bg-rose-500/10 border border-rose-500 rounded-lg p-3 text-center mb-2">
                <div className="flex justify-center mb-1 text-rose-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h4 className="font-sans font-bold text-xs md:text-sm text-rose-400">AI Menang Pertandigan!</h4>
                <p className="text-[10px] md:text-xs text-rose-200 mt-1">Rajamu berhasil ditaklukkan oleh AI. Jangan berkecil hati, klik Reset untuk tanding ulang!</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
