"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";

/**
 * SpinWheelGame — Next.js/React single-file component
 * ---------------------------------------------------
 * ✅ Mobile + Desktop responsive
 * ✅ Colorful Tailwind UI (dark/light friendly)
 * ✅ Random fair spin with easing
 * ✅ Pointer + rotation math to land exactly on a segment
 * ✅ Win/lose logic with coin balance saved in localStorage
 * ✅ History + daily spin limit
 * ✅ Easy customization of labels, rewards, and colors
 */

type WheelItem = {
  label: string;
  coins: number | null;
  color?: string;
};

export default function SpinWheelGame() {
  const items: WheelItem[] = [
    { label: "10 Coin", coins: 10, color: "#22c55e" },
    { label: "Try Again", coins: null, color: "#64748b" },
    { label: "50 Coin", coins: 50, color: "#3b82f6" },
    { label: "Spin x2", coins: null, color: "#a855f7" },
    { label: "20 Coin", coins: 20, color: "#f59e0b" },
    { label: "-5 Coin", coins: -5, color: "#ef4444" },
    { label: "100 Coin", coins: 100, color: "#06b6d4" },
    { label: "Bonus", coins: 30, color: "#eab308" },
  ];

  const MAX_SPINS_PER_DAY = 20;

  const [balance, setBalance] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<{ label: string; coins: number | null }[]>([]);
  const locked = useRef(false);

  // Load/save balance from localStorage
  useEffect(() => {
    const saved = window.localStorage.getItem("spin_balance");
    if (saved) setBalance(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("spin_balance", String(balance));
  }, [balance]);

  const todayKey = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `spin_count_${yyyy}-${mm}-${dd}`;
  }, []);

  const getTodaySpins = () => {
    const raw = window.localStorage.getItem(todayKey);
    return raw ? parseInt(raw, 10) || 0 : 0;
  };

  const setTodaySpins = (n: number) => {
    window.localStorage.setItem(todayKey, String(n));
  };

  const segAngle = 360 / items.length;

  const wheelGradient = useMemo(() => {
    const stops: string[] = [];
    for (let i = 0; i < items.length; i++) {
      const start = i * segAngle;
      const end = start + segAngle;
      const color = items[i].color || `hsl(${(i * 360) / items.length} 85% 55%)`;
      stops.push(`${color} ${start}deg ${end}deg`);
    }
    return `conic-gradient(${stops.join(", ")})`;
  }, [items.length, segAngle]);

  const pointerOffset = -90;

  const spin = () => {
    if (isSpinning || locked.current) return;
    const count = getTodaySpins();
    if (count >= MAX_SPINS_PER_DAY) {
      alert(`আজকের দৈনিক স্পিন লিমিট শেষ ( ${MAX_SPINS_PER_DAY} )। কাল আবার চেষ্টা করুন।`);
      return;
    }

    setIsSpinning(true);
    locked.current = true;

    const targetIndex = Math.floor(Math.random() * items.length);
    const segmentCenter = targetIndex * segAngle + segAngle / 2;
    const baseRotation = 360 * 6;
    const finalRotation = baseRotation + (360 - segmentCenter) + pointerOffset;

    setResultIndex(null);
    setRotation((prev) => prev + finalRotation);

    const durationMs = 4300;
    window.setTimeout(() => {
      setIsSpinning(false);
      locked.current = false;
      setResultIndex(targetIndex);
      const item = items[targetIndex];
      if (item.coins !== null) {
        setBalance((b) => Math.max(0, b + item.coins!));
      } else if (item.label.toLowerCase().includes("x2")) {
        setBalance((b) => b + 5);
      }
      setHistory((h) => [{ label: item.label, coins: item.coins }, ...h].slice(0, 8));
      setTodaySpins(count + 1);
    }, durationMs + 100);
  };

  const resultText = useMemo(() => {
    if (resultIndex === null) return "Spin করে জিতুন!";
    const it = items[resultIndex];
    if (it.coins === null) return `Result: ${it.label}`;
    const sign = it.coins > 0 ? "+" : "";
    return `Result: ${it.label} (${sign}${it.coins} coins)`;
  }, [resultIndex, items]);

  return (
    <div className="w-full mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            🎡 Spin & Win
          </h1>
          <p className="text-sm text-slate-400">স্পিন করে কয়েন জিতুন (Responsive for PC & Mobile)</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg">
            <div className="text-[10px] uppercase">Balance</div>
            <div className="text-lg font-semibold">🪙 {balance}</div>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
            <div className="text-[10px] uppercase">Today Left</div>
            <div className="text-lg font-semibold">
              {Math.max(0, MAX_SPINS_PER_DAY - getTodaySpins())}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative" style={{ width: "min(90vw, 420px)", height: "min(90vw, 420px)" }}>
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 z-20">
              <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-b-[22px] border-l-transparent border-r-transparent border-b-yellow-400 drop-shadow-lg" />
            </div>
            <div
              className="absolute inset-0 rounded-full border-8 border-white shadow-2xl"
              style={{
                background: wheelGradient,
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? "transform 4.3s cubic-bezier(0.12, 0.78, 0.11, 1)" : "none",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-white shadow-lg flex items-center justify-center text-center">
                <span className="text-xs text-white font-bold">Tap<br />to Spin</span>
              </div>
            </div>
            <div className="absolute inset-0 z-10">
              {items.map((it, i) => {
                const angle = i * segAngle + segAngle / 2;
                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 text-[11px] sm:text-xs font-semibold text-white drop-shadow"
                    style={{
                      transform: `rotate(${angle}deg) translate(0, -42%) rotate(${-angle}deg)`,
                      transformOrigin: "0 0",
                    }}
                  >
                    <span className="px-2 py-1 rounded-lg bg-black/30 backdrop-blur border border-white/10 whitespace-nowrap">
                      {it.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={spin}
              disabled={isSpinning}
              className="absolute inset-0 cursor-pointer active:scale-[.995] rounded-full"
            />
          </div>

          <button
            onClick={spin}
            disabled={isSpinning}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {isSpinning ? "Spinning..." : "SPIN NOW"}
          </button>

          <div className="text-center text-base sm:text-lg font-semibold text-amber-300">
            {resultText}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="font-semibold text-lg mb-2">📜 রুলস</h3>
            <ul className="text-slate-300 text-sm list-disc ml-5 space-y-1">
              <li>প্রতিদিন সর্বোচ্চ {MAX_SPINS_PER_DAY} বার স্পিন করতে পারবেন।</li>
              <li>লোকালস্টোরেজে আপনার কয়েন সেভ থাকবে।</li>
              <li>রঙ ও রিওয়ার্ড <code>items</code> অ্যারে থেকে কাস্টমাইজ করুন।</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="font-semibold text-lg mb-3">🧾 Recent Results</h3>
            {history.length === 0 ? (
              <p className="text-slate-400 text-sm">এখনও কিছু নেই। স্পিন করুন!</p>
            ) : (
              <ul className="space-y-2">
                {history.map((h, idx) => (
                  <li key={idx} className="flex items-center justify-between rounded-xl bg-black/20 px-3 py-2 border border-white/5">
                    <span className="text-sm">{h.label}</span>
                    <span className={`text-sm font-semibold ${
                      h.coins === null ? "text-slate-300" : h.coins >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}>
                      {h.coins === null ? "—" : (h.coins > 0 ? "+" : "") + h.coins}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

