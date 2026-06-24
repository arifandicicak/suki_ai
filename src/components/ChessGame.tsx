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

const unicodePieces: Record<Piece["color"], Record<Piece["type"], string>> = {
  w: { p: "♙", r: "♖", n: "♘", b: "♗", q: "♕", k: "♔" },
  b: { p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚" },
};

const pieceNames: Record<Piece["type"], string> = {
  p: "Pion", r: "Benteng", n: "Kuda", b: "Gajah", q: "Menteri", k: "Raja",
};

export default function ChessGame({ stats, onRewardXP, onWinChess }: ChessGameProps) {
  const [game, setGame] = useState(() => new Chess());
  const [board, setBoard] = useState<Board>(() => game.board() as any);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [promotionMove, setPromotionMove] = useState<{from: string, to: string} | null>(null);
  const [validMoves, setValidMoves] = useState<[number, number][]>([]);
  const [turn, setTurn] = useState<"w" | "b">("w");
  const [gameStatus, setGameStatus] = useState<"active" | "user_win" | "ai_win">("active");
  const [movesLog, setMovesLog] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<"mudah" | "sedang" | "sulit" | "sangat_sulit">("sedang");
  const [aiCommentary, setAiCommentary] = useState<string>(
    "Selamat datang di Arena Catur AI StudySuki! Gerakkan pion putihmu untuk memulai kontes taktik."
  );
  const [loadingCommentary, setLoadingCommentary] = useState(false);

  const executePromotion = (piece: "q" | "r" | "b" | "n") => {
    if (promotionMove) {
      game.move({ from: promotionMove.from, to: promotionMove.to, promotion: piece });
      setBoard(game.board() as any);
      setMovesLog((prev) => [...prev, `User: Promosi ke ${pieceNames[piece]}`]);
      setPromotionMove(null);
      setTurn("b");
    }
  };

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
          difficulty,
        }),
      });
      const data = await response.json();
      if (data.advice) setAiCommentary(data.advice);
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
        setAiCommentary("Luar biasa! Kamu pemenangnya!");
      } else {
        setGameStatus("ai_win");
        setAiCommentary("Skakmat! AI menang.");
      }
    } else {
      setGameStatus("ai_win");
      setAiCommentary("Permainan selesai.");
    }
  };

  const makeAIMove = () => {
    if (gameStatus !== "active") return;
    const moves = game.moves({ verbose: true }) as any[];
    if (moves.length === 0) {
      handleGameOverState();
      return;
    }
    const move = moves[Math.floor(Math.random() * moves.length)];
    const result = game.move(move);
    if (result) {
        setBoard(game.board() as any);
        fetchAiAdvice(game.board() as any, "AI Move");
        if (game.isGameOver()) handleGameOverState();
        else setTurn("w");
    }
  };

  useEffect(() => {
    if (turn === "b" && gameStatus === "active") {
      const timer = setTimeout(makeAIMove, 700);
      return () => clearTimeout(timer);
    }
  }, [turn, gameStatus]);

  const handleSquareClick = (r: number, c: number) => {
    if (gameStatus !== "active" || turn !== "w") return;
    const clickedPiece = board[r][c];
    const isDestination = validMoves.some(([vr, vc]) => vr === r && vc === c);

    if (isDestination && selected) {
      const [fromR, fromC] = selected;
      const fromCell = `${String.fromCharCode(97 + fromC)}${8 - fromR}`;
      const toCell = `${String.fromCharCode(97 + c)}${8 - r}`;
      const currentPiece = board[fromR][fromC];

      if (currentPiece?.type === 'p' && (r === 0 || r === 7)) {
        setPromotionMove({ from: fromCell, to: toCell });
        return;
      }
      
      const moveResult = game.move({ from: fromCell, to: toCell });
      if (moveResult) {
        setBoard(game.board() as any);
        setTurn("b");
        setSelected(null);
        setValidMoves([]);
      }
    } else if (clickedPiece?.color === "w") {
      setSelected([r, c]);
      const fromCell = `${String.fromCharCode(97 + c)}${8 - r}`;
      const moves = game.moves({ square: fromCell as any, verbose: true }) as any[];
      setValidMoves(moves.map(m => [8 - parseInt(m.to[1]), m.to.charCodeAt(0) - 97]));
    } else {
      setSelected(null);
      setValidMoves([]);
    }
  };

  return (
    <div className="relative p-6 bg-slate-900 rounded-2xl">
      {promotionMove && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-2xl">
          <div className="bg-white p-4 rounded-xl flex gap-2">
            {(["q", "r", "b", "n"] as const).map(p => (
              <button key={p} className="p-4 bg-slate-100 hover:bg-slate-200 rounded" onClick={() => executePromotion(p)}>
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-8 gap-0">
        {board.map((row, r) => row.map((piece, c) => (
          <div key={`${r}-${c}`} onClick={() => handleSquareClick(r, c)} className={`w-12 h-12 flex items-center justify-center ${(r + c) % 2 === 1 ? 'bg-slate-700' : 'bg-slate-500'}`}>
            {piece && unicodePieces[piece.color][piece.type]}
          </div>
        )))}
      </div>
    </div>
  );
}
