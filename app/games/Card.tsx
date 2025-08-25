"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ---------------- Confetti ----------------
function Confetti({ show }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!show) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      dx: (Math.random() - 0.5) * 5,
      dy: Math.random() * -7 - 3,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    }));

    let anim;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        p.dy += 0.3;
        if (p.y > canvas.height) p.y = canvas.height;
      });
      anim = requestAnimationFrame(draw);
    }
    draw();
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    const timeout = setTimeout(() => cancelAnimationFrame(anim), 3000);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(anim);
      clearTimeout(timeout);
    };
  }, [show]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
}

// ---------------- UI ----------------
function Primary({ label, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-2xl border border-emerald-600 bg-emerald-600/10 hover:bg-emerald-600/20 font-medium shadow-sm active:scale-[.99] transition ${className}`}
    >
      {label}
    </button>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-center">
      <div className="text-slate-400 text-xs">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function CardUI({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 md:p-5 shadow">
      <div className="mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// ---------------- Memory Match Logic ----------------
const baseIcons = ["🍎", "🍌", "🍇", "🍒", "🍉", "🥝", "🍍", "🍑", "🍓", "🥭", "🍋", "🍈", "🥥", "🍏", "🍐", "🍊"];

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function MemoryMatch({ onWin }) {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [won, setWon] = useState(false);

  const touchStartRef = useRef(null);

  useEffect(() => loadGame(gridSize), [gridSize]);

  useEffect(() => {
    if (won) return;
    const timer = setInterval(() => {
      setSeconds((s) => {
        localStorage.setItem("memoryTime", s + 1);
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [won]);

  function loadGame(size) {
    const totalPairs = (size * size) / 2;
    const selectedIcons = shuffle(baseIcons).slice(0, totalPairs);
    const doubled = shuffle([...selectedIcons, ...selectedIcons]);

    setCards(doubled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setSeconds(0);
    setWon(false);

    localStorage.setItem("memoryCards", JSON.stringify(doubled));
    localStorage.setItem("memoryMatched", JSON.stringify([]));
    localStorage.setItem("memoryMoves", "0");
    localStorage.setItem("memoryTime", "0");
  }

  function flipCard(index) {
    if (flipped.includes(index) || matched.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;
      setMoves((m) => {
        const newM = m + 1;
        localStorage.setItem("memoryMoves", newM);
        return newM;
      });

      if (cards[a] === cards[b]) {
        setMatched((m) => {
          const newMatched = [...m, a, b];
          localStorage.setItem("memoryMatched", JSON.stringify(newMatched));
          return newMatched;
        });
      }

      setTimeout(() => setFlipped([]), 800);
    }
  }

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setWon(true);
      onWin && onWin();
    }
  }, [matched, cards, onWin]);

  // ---------------- Touch Swipe ----------------
  function onTouchStart(e) {
    touchStartRef.current = e.touches[0];
  }

  function onTouchEnd(e, index) {
    if (!touchStartRef.current) return;
    const touchEnd = e.changedTouches[0];
    const dx = touchEnd.clientX - touchStartRef.current.clientX;
    const dy = touchEnd.clientY - touchStartRef.current.clientY;

    if (Math.abs(dx) < 30 && Math.abs(dy) < 30) {
      flipCard(index);
    }

    touchStartRef.current = null;
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {[4, 6, 8].map((size) => (
          <Primary
            key={size}
            label={`${size}x${size}`}
            onClick={() => setGridSize(size)}
            className={gridSize === size ? "bg-emerald-500/20 border-emerald-500" : ""}
          />
        ))}
        <Primary label="🔄 Shuffle" onClick={() => loadGame(gridSize)} />
      </div>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0,1fr))` }}
      >
        {cards.map((icon, i) => {
          const isFlipped = flipped.includes(i) || matched.includes(i);
          return (
            <motion.div
              key={i}
              className="aspect-square relative"
              onTouchStart={onTouchStart}
              onTouchEnd={(e) => onTouchEnd(e, i)}
              onClick={() => flipCard(i)}
            >
              <motion.div
                className={`absolute inset-0 rounded-xl border border-slate-800 flex items-center justify-center cursor-pointer text-3xl select-none backface-hidden`}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <span
                  style={{
                    position: "absolute",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {icon}
                </span>
                <span
                  style={{
                    position: "absolute",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  ❓
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Moves" value={moves} />
        <Stat label="Time" value={`${seconds}s`} />
        <Stat label="Grid" value={`${gridSize}x${gridSize}`} />
      </div>

      {won && (
        <CardUI title="🎉 সমাধান সম্পন্ন!" subtitle="Memory Match Game">
          <Primary label="▶️ আবার খেলো" onClick={() => loadGame(gridSize)} />
        </CardUI>
      )}
    </div>
  );
}

// ---------------- Main Page ----------------
export default function MemoryMatchPage() {
  const [showConfetti, setShowConfetti] = useState(false);

  function handleWin() {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Memory Match Game</h2>
      <MemoryMatch onWin={handleWin} />
      <Confetti show={showConfetti} />
    </div>
  );
}

