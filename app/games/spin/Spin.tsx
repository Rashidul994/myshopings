import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Gift, Coins, Droplets, Package, Barrel, Shovel, Plus } from "lucide-react";

// ---- Helper types ----
type Segment = {
  id: string;
  label: string;
  icon: JSX.Element;
  color: string; // tailwind bg color (use arbitrary color via style if needed)
  weight?: number; // for future weighted spins
};

// ---- Component ----
export default function LuckySpin() {
  // 8 segments like the reference image
  const segments: Segment[] = useMemo(
    () => [
      { id: "coins", label: "3000", icon: <Coins className="w-6 h-6" />, color: "#F5C542" },
      { id: "watering", label: "Can", icon: <Droplets className="w-6 h-6" />, color: "#2FB4FF" },
      { id: "seed", label: "Seeds", icon: <Package className="w-6 h-6" />, color: "#BE4D9E" },
      { id: "barrel", label: "Barrel", icon: <BarrelIcon />, color: "#2FA36E" },
      { id: "bundle", label: "Bundle", icon: <Gift className="w-6 h-6" />, color: "#F7D74F" },
      { id: "shovel2", label: "Shovel", icon: <Shovel className="w-6 h-6" />, color: "#2A9DF4" },
      { id: "x2", label: "x2", icon: <span className="font-black text-lg">2×</span>, color: "#C62828" },
      { id: "shovel1", label: "Shovel", icon: <Shovel className="w-6 h-6" />, color: "#31A24C" },
    ],
    []
  );

  const [spinning, setSpinning] = useState(false);
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [rotate, setRotate] = useState(0);
  const controls = useAnimation();
  const wheelRef = useRef<HTMLDivElement>(null);

  const segmentAngle = 360 / segments.length;

  // Lock to one free spin per day
  const canSpin = useMemo(() => {
    const last = localStorage.getItem("luckySpinLast");
    if (!last) return true;
    const lastDate = new Date(parseInt(last, 10));
    const now = new Date();
    return lastDate.toDateString() !== now.toDateString();
  }, [spinning, resultIndex]);

  useEffect(() => {
    if (resultIndex == null) return;
    // store date for daily limit
    localStorage.setItem("luckySpinLast", String(Date.now()));
  }, [resultIndex]);

  // Spin handler
  const spin = async () => {
    if (spinning || !canSpin) return;
    setSpinning(true);
    setResultIndex(null);

    // Choose winning index uniformly (replace with weighted logic if needed)
    const index = Math.floor(Math.random() * segments.length);

    // Target angle so that the pointer (at 0deg) lands on chosen segment center
    const randomTurns = 6 + Math.floor(Math.random() * 4); // 6-9 full turns for drama
    const targetFromZero = index * segmentAngle + segmentAngle / 2; // center of segment in degrees

    // We rotate negative to keep pointer fixed at top
    const newRotate = -randomTurns * 360 - targetFromZero + (360 - (rotate % 360));
    setRotate((prev) => prev + newRotate);

    await controls.start({ rotate: rotate + newRotate, transition: { duration: 4.5, ease: [0.12, 0.22, 0.03, 1] } });

    setResultIndex(index);
    setSpinning(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-sky-200 to-emerald-200 p-4">
      <div className="relative w-[380px] max-w-full">
        {/* Top bar with coin icon and + button (use your own image if desired) */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-1 shadow">
            <CoinBadge />
            <span className="text-slate-700 font-bold">0</span>
          </div>
          <button className="p-2 rounded-full bg-white shadow active:scale-95 transition"><Plus className="w-5 h-5" /></button>
        </div>

        {/* Panel */}
        <div className="relative rounded-3xl bg-[#F2D6A5] shadow-xl border-4 border-[#E5BF86] overflow-hidden">
          {/* Header with close button */}
          <div className="absolute right-2 top-2">
            <button className="w-9 h-9 grid place-items-center bg-rose-500 text-white rounded-full shadow">✕</button>
          </div>
          <h2 className="text-4xl mt-5 mb-2 text-center font-extrabold text-[#2FA34E] drop-shadow">Lucky Spin</h2>

          {/* Wheel + pointer area */}
          <div className="relative px-6 pt-2 pb-6">
            <div className="relative mx-auto w-[300px] h-[300px]">
              {/* Pointer */}
              <div className="absolute -right-6 bottom-10 z-20 rotate-[20deg]">
                <PointerHandle />
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 z-10">
                {/* decorative base arc */}
                <div className="w-[260px] h-4 bg-[#E66A31] rounded-full" />
              </div>

              {/* Fixed triangle pointer at right */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-30">
                <div className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[22px] border-l-orange-500 drop-shadow" />
                <div className="w-5 h-5 rounded-full bg-orange-500 border-2 border-white -ml-1 -mt-2" />
              </div>

              {/* Wheel */}
              <motion.div
                ref={wheelRef}
                animate={controls}
                className="relative w-full h-full rounded-full shadow-2xl"
                style={{ background: buildConicGradient(segments) }}
              >
                {/* Rim */}
                <div className="absolute inset-1 rounded-full border-8 border-[#F7E0AE]" />
                {/* Center hub */}
                <div className="absolute inset-0 grid place-items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-300 border-4 border-amber-500 shadow-inner" />
                </div>
                {/* Icons placed per-slice */}
                {segments.map((s, i) => (
                  <SliceIcon key={s.id} index={i} total={segments.length} icon={s.icon} label={s.label} />
                ))}
              </motion.div>
            </div>

            {/* Caption */}
            <p className="text-center mt-4 font-bold text-lg text-[#5A3E2B]">Daily free spin once!</p>

            {/* Result Toast */}
            <AnimatePresence>
              {resultIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-2 text-center"
                >
                  <span className="inline-flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1.5 rounded-full shadow">
                    You won <b>{segments[resultIndex].label}</b>!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <div className="flex justify-center mt-4 mb-6">
              <button
                onClick={spin}
                disabled={spinning || !canSpin}
                className="px-10 py-3 rounded-full text-white font-extrabold text-2xl shadow active:scale-[0.98] transition disabled:opacity-60"
                style={{ background: canSpin ? "#54C23B" : "#8CA78A" }}
              >
                {canSpin ? (spinning ? "Spinning…" : "Free") : "Come back tomorrow"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helpers ---
function buildConicGradient(segments: Segment[]) {
  const step = 360 / segments.length;
  let start = 0;
  const parts = segments.map((s) => {
    const end = start + step;
    const str = `${s.color} ${start}deg ${end}deg`;
    start = end;
    return str;
  });
  return `conic-gradient(${parts.join(",")})`;
}

function SliceIcon({ index, total, icon, label }: { index: number; total: number; icon: JSX.Element; label: string }) {
  const angle = (360 / total) * index + (360 / total) / 2; // center of segment
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ transform: `rotate(${angle}deg) translate(0, -38%)` }}
    >
      <div className="-rotate-[var(--angle)]" style={{ ["--angle" as any]: `${angle}deg` }}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 grid place-items-center rounded-full bg-white/80 shadow">
            {icon}
          </div>
          <span className="text-xs font-bold text-white drop-shadow">{label}</span>
        </div>
      </div>
    </div>
  );
}

function PointerHandle() {
  return (
    <div className="relative">
      <div className="w-28 h-8 bg-orange-400 rounded-full shadow-lg" />
      <div className="absolute right-0 -top-4 w-14 h-14 bg-orange-500 rounded-2xl grid place-items-center shadow-xl border-4 border-white">
        <div className="w-6 h-6 rounded-full bg-orange-600 border-2 border-white" />
      </div>
    </div>
  );
}

function CoinBadge() {
  return (
    <div className="flex items-center gap-1">
      <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-amber-300 border-2 border-amber-500 font-black">¢</span>
    </div>
  );
}

function BarrelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M7 3h10c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm0 4h10M7 9h10M7 15h10M7 19h10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}



