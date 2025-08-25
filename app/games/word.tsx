"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

// -------------------------------
// Word Search Game - Single File
// -------------------------------
// ✅ Features
// - Random board generator (8 directions)
// - Mouse drag & touch drag selection
// - Forwards and backwards word matching
// - Found-word highlighting & strike-through list
// - Bangla UI labels, lightweight Tailwind styling
// - Reset / New Puzzle button
//
// 💡 How to use
// - Drop this component anywhere in your Next.js app
// - TailwindCSS is recommended
// - Customize `defaultWords` or pass `words` prop

// Types
 type Cell = { r: number; c: number; letter: string };
 type Direction = { dr: number; dc: number };
 type PlacedWord = {
  word: string;
  cells: { r: number; c: number }[];
};

const DIRS: Direction[] = [
  { dr: 0, dc: 1 }, // →
  { dr: 0, dc: -1 }, // ←
  { dr: 1, dc: 0 }, // ↓
  { dr: -1, dc: 0 }, // ↑
  { dr: 1, dc: 1 }, // ↘
  { dr: -1, dc: -1 }, // ↖
  { dr: 1, dc: -1 }, // ↙
  { dr: -1, dc: 1 }, // ↗
];

// Fallback English words (can be replaced with Bangla if letters are simple)
const defaultWords = [
  "BANGLA",
  "GAME",
  "PUZZLE",
  "LETTER",
  "FRIDAY",
  "NEXTJS",
  "REACT",
  "TAILWIND",
  "BIRD",
  "SPACE",
];

function randomInt(n: number) {
  return Math.floor(Math.random() * n);
}

function inBounds(r: number, c: number, rows: number, cols: number) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

function randomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[randomInt(alphabet.length)];
}

function tryPlaceWord(
  board: string[][],
  word: string,
  rows: number,
  cols: number
): { placed: boolean; cells: { r: number; c: number }[] } {
  const clean = word.replace(/\s+/g, "").toUpperCase();
  const attempts = 250;
  for (let t = 0; t < attempts; t++) {
    const dir = DIRS[randomInt(DIRS.length)];
    const maxR = rows;
    const maxC = cols;
    const startR = randomInt(maxR);
    const startC = randomInt(maxC);

    // Check path fits
    const endR = startR + dir.dr * (clean.length - 1);
    const endC = startC + dir.dc * (clean.length - 1);
    if (!inBounds(endR, endC, rows, cols)) continue;

    // Check no conflict (or overlapping same letter)
    let ok = true;
    const cells: { r: number; c: number }[] = [];
    for (let i = 0; i < clean.length; i++) {
      const r = startR + dir.dr * i;
      const c = startC + dir.dc * i;
      const ch = board[r][c];
      if (ch !== "" && ch !== clean[i]) {
        ok = false;
        break;
      }
      cells.push({ r, c });
    }
    if (!ok) continue;

    // Place
    for (let i = 0; i < clean.length; i++) {
      const { r, c } = cells[i];
      board[r][c] = clean[i];
    }
    return { placed: true, cells };
  }
  return { placed: false, cells: [] };
}

function generateBoard(rows: number, cols: number, words: string[]) {
  const board: string[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => "")
  );
  const placed: PlacedWord[] = [];
  const misses: string[] = [];

  // Shuffle words so puzzle varies
  const shuffled = [...words].sort(() => Math.random() - 0.5);

  for (const w of shuffled) {
    const res = tryPlaceWord(board, w, rows, cols);
    if (res.placed) {
      placed.push({ word: w.toUpperCase(), cells: res.cells });
    } else {
      misses.push(w);
    }
  }

  // Fill empty with random letters
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === "") board[r][c] = randomLetter();
    }
  }

  return { board, placed, misses };
}

function sameLine(a: Cell[], b: Cell) {
  // Returns true if adding b keeps all points colinear and consecutive
  if (a.length === 0) return true;
  if (a.length === 1) {
    const dr = b.r - a[0].r;
    const dc = b.c - a[0].c;
    return Math.abs(dr) <= 1 && Math.abs(dc) <= 1 && !(dr === 0 && dc === 0);
  }
  const dr = a[1].r - a[0].r;
  const dc = a[1].c - a[0].c;
  // Must continue same step
  const prev = a[a.length - 1];
  if (b.r - prev.r !== dr || b.c - prev.c !== dc) return false;
  return true;
}

function cellsToString(path: Cell[]) {
  return path.map((p) => p.letter).join("");
}

function eqPath(a: { r: number; c: number }[], b: Cell[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].r !== b[i].r || a[i].c !== b[i].c) return false;
  }
  return true;
}

export default function WordSearchGame({
  rows = 12,
  cols = 12,
  words = defaultWords,
}: {
  rows?: number;
  cols?: number;
  words?: string[];
}) {
  const [seed, setSeed] = useState(() => Math.random());
  const [board, setBoard] = useState<string[][]>([]);
  const [placed, setPlaced] = useState<PlacedWord[]>([]);
  const [foundPaths, setFoundPaths] = useState<PlacedWord[]>([]);
  const [wordList, setWordList] = useState<string[]>([]);
  const [missed, setMissed] = useState<string[]>([]);

  const [isDown, setIsDown] = useState(false);
  const [path, setPath] = useState<Cell[]>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Generate puzzle on seed change
  useEffect(() => {
    const { board, placed, misses } = generateBoard(rows, cols, words);
    setBoard(board);
    setPlaced(placed);
    setFoundPaths([]);
    setWordList(Array.from(new Set(placed.map((p) => p.word))));
    setMissed(misses);
  }, [rows, cols, words, seed]);

  const isFound = useCallback(
    (w: string) => foundPaths.some((p) => p.word === w.toUpperCase()),
    [foundPaths]
  );

  const onCellEnter = (r: number, c: number) => {
    if (!isDown) return;
    const letter = board[r][c];
    const next: Cell = { r, c, letter };

    // Prevent duplicates
    if (path.some((p) => p.r === r && p.c === c)) return;

    if (sameLine(path, next)) {
      setPath((prev) => [...prev, next]);
    }
  };

  const beginSelect = (r: number, c: number) => {
    setIsDown(true);
    setPath([{ r, c, letter: board[r][c] }]);
  };

  const cancelSelect = () => {
    setIsDown(false);
    setPath([]);
  };

  const finishSelect = () => {
    if (path.length === 0) return;
    const forward = cellsToString(path).toUpperCase();
    const backward = cellsToString([...path].reverse()).toUpperCase();

    // Match by comparing against placed words
    let matched: PlacedWord | null = null;
    for (const pw of placed) {
      const placedStr = pw.cells
        .map(({ r, c }) => board[r][c])
        .join("")
        .toUpperCase();
      if (
        placedStr === forward ||
        placedStr === backward ||
        eqPath(pw.cells, path) ||
        eqPath([...pw.cells].reverse(), path)
      ) {
        matched = pw;
        break;
      }
    }

    if (matched && !isFound(matched.word)) {
      setFoundPaths((prev) => [...prev, matched!]);
    }

    setIsDown(false);
    setPath([]);
  };

  // Touch helpers
  const coordFromTouch = (e: React.TouchEvent) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const touch = e.touches[0];
    if (!touch) return null;
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const cellW = rect.width / cols;
    const cellH = rect.height / rows;
    const c = Math.floor(x / cellW);
    const r = Math.floor(y / cellH);
    if (!inBounds(r, c, rows, cols)) return null;
    return { r, c };
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const pos = coordFromTouch(e);
    if (!pos) return;
    beginSelect(pos.r, pos.c);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const pos = coordFromTouch(e);
    if (!pos) return;
    onCellEnter(pos.r, pos.c);
  };

  const onTouchEnd = () => finishSelect();

  const newPuzzle = () => {
    setSeed(Math.random());
  };

  const allFound = foundPaths.length === wordList.length && wordList.length > 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Board */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl md:text-3xl font-bold">🔎 Word Search</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={newPuzzle}
                className="px-3 py-1.5 rounded-2xl bg-black/80 text-white text-sm shadow hover:opacity-90"
              >
                নতুন পাজল
              </button>
            </div>
          </div>

          <div
            ref={gridRef}
            onMouseLeave={cancelSelect}
            onMouseUp={finishSelect}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
            onTouchStart={onTouchStart}
            className="select-none aspect-square w-full max-w-[640px] bg-white border rounded-2xl shadow grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }}
          >
            {board.map((row, r) =>
              row.map((ch, c) => {
                const selected = path.some((p) => p.r === r && p.c === c);
                const partOfFound = foundPaths.some((fp) =>
                  fp.cells.some((cc) => cc.r === r && cc.c === c)
                );

                return (
                  <div
                    key={`${r}-${c}`}
                    onMouseDown={() => beginSelect(r, c)}
                    onMouseEnter={() => onCellEnter(r, c)}
                    className={`flex items-center justify-center border -m-[0.5px] cursor-pointer font-semibold md:font-bold text-base md:text-xl ${
                      selected
                        ? "bg-yellow-200"
                        : partOfFound
                        ? "bg-green-200"
                        : "bg-gray-50"
                    }`}
                    style={{ userSelect: "none" }}
                  >
                    {ch}
                  </div>
                );
              })
            )}
          </div>

          {/* Progress */}
          <div className="mt-3 text-sm text-gray-600">
            {foundPaths.length}/{wordList.length} শব্দ পাওয়া গেছে
          </div>

          {allFound && (
            <div className="mt-3 p-3 rounded-xl bg-green-100 text-green-900 font-medium">
              দারুণ! সব শব্দ খুঁজে পেয়েছো 🎉
            </div>
          )}
        </div>

        {/* Sidebar: word list */}
        <aside className="w-full md:w-72">
          <div className="rounded-2xl bg-white border shadow p-4">
            <h2 className="text-lg font-semibold mb-3">📝 খুঁজে বের করো:</h2>
            <ul className="grid grid-cols-2 gap-2">
              {wordList.map((w) => (
                <li
                  key={w}
                  className={`px-2 py-1 rounded-lg border text-sm text-center ${
                    isFound(w) ? "line-through opacity-50" : ""
                  }`}
                >
                  {w}
                </li>
              ))}
            </ul>
            {missed.length > 0 && (
              <p className="mt-3 text-xs text-orange-500">
                নোট: কিছু শব্দ বোর্ডে বসানো যায়নি: {missed.join(", ")}
              </p>
            )}

            <div className="mt-4 space-y-2">
              <button
                onClick={newPuzzle}
                className="w-full px-3 py-2 rounded-2xl bg-indigo-600 text-white shadow hover:opacity-90"
              >
                নতুন করে মিক্স করো
              </button>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-gray-50 text-xs text-gray-600">
              টিপস: মাউস বা টাচ দিয়ে সোজা লাইনে ড্রাগ করে অক্ষর সিলেক্ট করো।
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
