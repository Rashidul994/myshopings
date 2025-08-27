import React from 'react'

export default function Colormach() {
  return (
    <div>Colormach</div>
  )
}


// "use client";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// /**
//  * Color Match – Professional Web Game (React / Next.js)
//  * ----------------------------------------------------
//  * Drop this file into your Next.js app and render <ColorMatchGame />
//  * - TailwindCSS styling
//  * - Framer Motion animations
//  * - Mobile & desktop friendly (tap, click, keyboard)
//  * - Difficulty levels, timer, streak combo, level-ups
//  * - Pause/Resume, Sound toggle, High Score in localStorage
//  * - No external assets
//  *
//  * Keyboard: Enter (start), Space (pause/resume), R (restart)
//  */

// // ---------- Types ----------
// interface Settings {
//   difficulty: "easy" | "normal" | "hard";
//   showHex: boolean;
//   masterTimerSec: number; // total time per game
//   sound: boolean;
// }

// type Phase = "menu" | "playing" | "paused" | "gameover";

// // ---------- Utils ----------
// function clamp(n: number, min: number, max: number) {
//   return Math.max(min, Math.min(max, n));
// }

// function randInt(min: number, max: number) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function hslToRgb(h: number, s: number, l: number) {
//   // h: 0-360, s: 0-100, l: 0-100 → returns [r,g,b] 0-255
//   s /= 100;
//   l /= 100;
//   const k = (n: number) => (n + h / 30) % 12;
//   const a = s * Math.min(l, 1 - l);
//   const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
//   return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
// }

// function rgbToHex(r: number, g: number, b: number) {
//   const toHex = (v: number) => v.toString(16).padStart(2, "0");
//   return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
// }

// function hslToHex(h: number, s: number, l: number) {
//   const [r, g, b] = hslToRgb(h, s, l);
//   return rgbToHex(r, g, b);
// }

// function randomBaseColor() {
//   // Prefer medium lightness for better contrast
//   const h = randInt(0, 360);
//   const s = randInt(55, 80);
//   const l = randInt(45, 60);
//   return { h, s, l };
// }

// function varyColor({ h, s, l }: { h: number; s: number; l: number }, delta: number) {
//   // Create nearby color variation
//   const vh = (h + randInt(-delta, delta) + 360) % 360;
//   const vs = clamp(s + randInt(-delta, delta), 35, 95);
//   const vl = clamp(l + randInt(-delta, delta), 20, 80);
//   return { h: vh, s: vs, l: vl };
// }

// function playBeep(freq = 660, duration = 100, vol = 0.03) {
//   if (typeof window === "undefined") return;
//   const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
//   if (!AC) return;
//   const ctx = new AC();
//   const o = ctx.createOscillator();
//   const g = ctx.createGain();
//   o.connect(g);
//   g.connect(ctx.destination);
//   o.frequency.value = freq;
//   g.gain.value = vol;
//   o.start();
//   setTimeout(() => {
//     o.stop();
//     ctx.close();
//   }, duration);
// }

// // Compute grid size progression based on level & difficulty
// function gridSizeFor(level: number, difficulty: Settings["difficulty"]) {
//   const base = difficulty === "easy" ? 2 : difficulty === "normal" ? 3 : 4;
//   const growEvery = difficulty === "easy" ? 3 : difficulty === "normal" ? 2 : 1;
//   const extra = Math.floor((level - 1) / growEvery);
//   return clamp(base + extra, 2, 7); // max 7x7
// }

// function diffDeltaFor(level: number, difficulty: Settings["difficulty"]) {
//   // Smaller delta = harder
//   const start = difficulty === "easy" ? 28 : difficulty === "normal" ? 20 : 14;
//   const decay = difficulty === "easy" ? 1.0 : difficulty === "normal" ? 1.4 : 1.8;
//   const d = Math.max(6, Math.round(start - (level - 1) * decay));
//   return d;
// }

// function pointsFor(streak: number, difficulty: Settings["difficulty"]) {
//   const base = difficulty === "easy" ? 10 : difficulty === "normal" ? 15 : 20;
//   const bonus = Math.min(4, Math.floor(streak / 3)); // every 3 streak adds +1x up to 4x
//   return base * (1 + bonus);
// }

// function secondsBonusFor(difficulty: Settings["difficulty"]) {
//   return difficulty === "easy" ? 4 : difficulty === "normal" ? 3 : 2;
// }

// // ---------- Component ----------
// export default function ColorMatchGame() {
//   // Settings
//   const [settings, setSettings] = useState<Settings>(() => {
//     if (typeof window !== "undefined") {
//       const saved = localStorage.getItem("cm_settings");
//       if (saved) return JSON.parse(saved);
//     }
//     return { difficulty: "normal", showHex: true, masterTimerSec: 60, sound: true };
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("cm_settings", JSON.stringify(settings));
//     }
//   }, [settings]);

//   // Game State
//   const [phase, setPhase] = useState<Phase>("menu");
//   const [level, setLevel] = useState(1);
//   const [score, setScore] = useState(0);
//   const [streak, setStreak] = useState(0);
//   const [best, setBest] = useState<number>(() => {
//     if (typeof window !== "undefined") {
//       const b = localStorage.getItem("cm_best");
//       return b ? parseInt(b) : 0;
//     }
//     return 0;
//   });
//   const [timeLeft, setTimeLeft] = useState(settings.masterTimerSec);

//   // Round State
//   const [targetHex, setTargetHex] = useState("#FFFFFF");
//   const [palette, setPalette] = useState<string[]>([]);
//   const [targetIndex, setTargetIndex] = useState(0);
//   const [feedback, setFeedback] = useState<null | { ok: boolean; at: number }>(null);

//   const grid = gridSizeFor(level, settings.difficulty);
//   const delta = diffDeltaFor(level, settings.difficulty);

//   const totalTiles = grid * grid;

//   const focusBtn = useRef<HTMLButtonElement | null>(null);

//   // Generate a new round
//   const makeRound = () => {
//     const base = randomBaseColor();
//     const target = varyColor(base, 0); // the base itself
//     const targetHexNew = hslToHex(target.h, target.s, target.l);

//     const tiles: string[] = [];
//     const noise = delta; // similarity spread
//     for (let i = 0; i < totalTiles - 1; i++) {
//       const v = varyColor(base, noise);
//       tiles.push(hslToHex(v.h, v.s, v.l));
//     }
//     // Insert target at a random index
//     const idx = randInt(0, totalTiles - 1);
//     tiles.splice(idx, 0, targetHexNew);

//     setTargetHex(targetHexNew);
//     setPalette(tiles);
//     setTargetIndex(idx);
//   };

//   // Start / Restart
//   const startGame = () => {
//     setPhase("playing");
//     setLevel(1);
//     setScore(0);
//     setStreak(0);
//     setTimeLeft(settings.masterTimerSec);
//     setFeedback(null);
//     makeRound();
//     setTimeout(() => focusBtn.current?.focus(), 0);
//   };

//   const restart = () => startGame();

//   // Handle pick
//   const onPick = (i: number) => {
//     if (phase !== "playing") return;
//     const ok = i === targetIndex;
//     setFeedback({ ok, at: i });

//     if (ok) {
//       const pts = pointsFor(streak + 1, settings.difficulty);
//       setScore((s) => s + pts);
//       setStreak((k) => k + 1);
//       setLevel((lv) => lv + 1);
//       setTimeLeft((t) => clamp(t + secondsBonusFor(settings.difficulty), 0, 999));
//       if (settings.sound) playBeep(880, 120, 0.04);
//       // Next round
//       setTimeout(() => {
//         setFeedback(null);
//         makeRound();
//       }, 180);
//     } else {
//       setStreak(0);
//       setTimeLeft((t) => clamp(t - 3, 0, 999));
//       if (settings.sound) playBeep(220, 180, 0.05);
//       // Subtle shake handled by animation
//     }
//   };

//   // Timer
//   useEffect(() => {
//     if (phase !== "playing") return;
//     if (timeLeft <= 0) {
//       setPhase("gameover");
//       setBest((b) => {
//         const nb = Math.max(b, score);
//         if (typeof window !== "undefined") {
//           localStorage.setItem("cm_best", String(nb));
//         }
//         return nb;
//       });
//       return;
//     }
//     const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
//     return () => clearInterval(id);
//   }, [phase, timeLeft, score]);

//   // Pause / Resume
//   const togglePause = () => {
//     if (phase === "playing") setPhase("paused");
//     else if (phase === "paused") setPhase("playing");
//   };

//   // Keyboard shortcuts
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.code === "Space") {
//         e.preventDefault();
//         if (phase === "menu") startGame();
//         else togglePause();
//       } else if (e.code === "Enter" && phase === "menu") {
//         startGame();
//       } else if (e.key.toLowerCase() === "r") {
//         restart();
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [phase, settings]);

//   const headerStats = (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
//       <Stat label="স্কোর" value={score} />
//       <Stat label="লেভেল" value={level} />
//       <Stat label="স্ট্রিক" value={streak} />
//       <Stat label="টাইম" value={`${timeLeft}s`} />
//     </div>
//   );

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="rounded-2xl shadow-xl bg-slate-900/60 backdrop-blur border border-slate-800 p-5 md:p-8"
//         >
//           <div className="flex items-center justify-between gap-4 mb-5">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold tracking-tight">🎨 Color Match</h1>
//               <p className="text-slate-400 text-sm">রং মেলাও, স্কোর বাড়াও — ফোকাস & গতির খেলা</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setSettings((s) => ({ ...s, sound: !s.sound }))}
//                 className={`px-3 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 transition ${
//                   settings.sound ? "opacity-100" : "opacity-60"
//                 }`}
//                 aria-label="Toggle sound"
//               >
//                 {settings.sound ? "🔊" : "🔈"}
//               </button>
//               <button
//                 onClick={() => setSettings((s) => ({ ...s, showHex: !s.showHex }))}
//                 className="px-3 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 transition"
//                 aria-label="Toggle hex"
//               >
//                 {settings.showHex ? "#HEX" : "◻︎"}
//               </button>
//             </div>
//           </div>

//           {phase !== "menu" && (
//             <div className="mb-5">{headerStats}</div>
//           )}

//           {/* Phase Views */}
//           <AnimatePresence mode="wait">
//             {phase === "menu" && (
//               <motion.div
//                 key="menu"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="grid md:grid-cols-2 gap-6"
//               >
//                 <div className="space-y-4">
//                   <Card title="সেটিংস" subtitle="তোমার খেলার ধরণ ঠিক করে নাও">
//                     <div className="grid gap-3">
//                       <div className="flex items-center justify-between">
//                         <label className="text-sm text-slate-300">ডিফিকাল্টি</label>
//                         <div className="flex gap-2">
//                           {(["easy", "normal", "hard"] as const).map((d) => (
//                             <Chip
//                               key={d}
//                               active={settings.difficulty === d}
//                               onClick={() => setSettings((s) => ({ ...s, difficulty: d }))}
//                               label={d === "easy" ? "Easy" : d === "normal" ? "Normal" : "Hard"}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <label className="text-sm text-slate-300">মোট সময়</label>
//                         <div className="flex gap-2">
//                           {[45, 60, 90].map((t) => (
//                             <Chip
//                               key={t}
//                               active={settings.masterTimerSec === t}
//                               onClick={() => setSettings((s) => ({ ...s, masterTimerSec: t }))}
//                               label={`${t}s`}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <label className="text-sm text-slate-300">কালার কোড দেখাবে?</label>
//                         <div className="flex gap-2">
//                           <Chip
//                             active={settings.showHex}
//                             onClick={() => setSettings((s) => ({ ...s, showHex: true }))}
//                             label="On"
//                           />
//                           <Chip
//                             active={!settings.showHex}
//                             onClick={() => setSettings((s) => ({ ...s, showHex: false }))}
//                             label="Off"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </Card>

//                   <Card title="হাই স্কোর" subtitle="তোমার সেরা স্কোর">
//                     <div className="text-3xl font-extrabold">{best}</div>
//                   </Card>
//                 </div>

//                 <div className="flex flex-col gap-4">
//                   <Card title="কিভাবে খেলবে" subtitle="খুব সিম্পল!">
//                     <ul className="text-slate-300 text-sm list-disc pl-5 space-y-2">
//                       <li>উপরে দেখানো টার্গেট রং-এর সাথে মিল আছে এমন বক্সে ক্লিক/ট্যাপ করো।</li>
//                       <li>সঠিক হলে স্কোর + টাইম বোনাস পাবে, ভুল হলে ৩ সেকেন্ড টাইম কেটে যাবে।</li>
//                       <li>প্রতি লেভেলে গ্রিড বড় হবে এবং রং আরও কাছাকাছি হবে।</li>
//                       <li>কিবোর্ড: <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">Enter</kbd> স্টার্ট, <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">Space</kbd> পজ/রিজিউম, <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">R</kbd> রিস্টার্ট।</li>
//                     </ul>
//                   </Card>

//                   <div className="flex gap-3">
//                     <button
//                       ref={focusBtn}
//                       onClick={startGame}
//                       className="flex-1 py-3 rounded-2xl text-center font-semibold bg-emerald-500 hover:bg-emerald-600 active:scale-[.99] transition shadow"
//                     >
//                       ▶️ শুরু করো
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {phase === "playing" && (
//               <motion.div
//                 key="play"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="space-y-5"
//               >
//                 <div className="flex items-center justify-between gap-3">
//                   <TargetColor hex={targetHex} showHex={settings.showHex} />
//                   <div className="flex gap-2">
//                     <Button onClick={togglePause} label="⏸️ পজ" aria="Pause" />
//                     <Button onClick={restart} label="🔄 রিস্টার্ট" aria="Restart" />
//                   </div>
//                 </div>

//                 <motion.div
//                   animate={feedback?.ok === false ? { x: [0, -6, 6, -4, 4, 0] } : {}}
//                   transition={{ duration: 0.25 }}
//                 >
//                   <div
//                     className="grid"
//                     style={{
//                       gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))`,
//                       gap: "10px",
//                     }}
//                   >
//                     {palette.map((hex, i) => (
//                       <Tile
//                         key={i}
//                         hex={hex}
//                         onClick={() => onPick(i)}
//                         pulse={feedback?.ok && feedback.at === i}
//                         wrong={feedback?.ok === false && feedback.at === i}
//                       />
//                     ))}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             )}

//             {phase === "paused" && (
//               <motion.div
//                 key="paused"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="space-y-6"
//               >
//                 {headerStats}
//                 <div className="flex items-center justify-between">
//                   <TargetColor hex={targetHex} showHex={settings.showHex} />
//                   <div className="flex gap-2">
//                     <Button onClick={togglePause} label="▶️ রিজিউম" aria="Resume" />
//                     <Button onClick={restart} label="🔄 রিস্টার্ট" aria="Restart" />
//                   </div>
//                 </div>
//                 <div className="text-center text-slate-400">গেম পজ করা আছে</div>
//               </motion.div>
//             )}

//             {phase === "gameover" && (
//               <motion.div
//                 key="over"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="space-y-6"
//               >
//                 <div className="grid md:grid-cols-3 gap-4">
//                   <Card title="ফাইনাল স্কোর" subtitle="এই রাউন্ডে">
//                     <div className="text-4xl font-extrabold">{score}</div>
//                   </Card>
//                   <Card title="সর্বোচ্চ স্কোর" subtitle="হাই স্কোর">
//                     <div className="text-4xl font-extrabold">{Math.max(best, score)}</div>
//                   </Card>
//                   <Card title="সর্বোচ্চ স্ট্রিক" subtitle="কতবার টানা সঠিক">
//                     <div className="text-4xl font-extrabold">{streak}</div>
//                   </Card>
//                 </div>
//                 <div className="flex gap-3">
//                   <Button onClick={restart} label="▶️ আবার খেলো" aria="Play again" className="flex-1" />
//                   <Button onClick={() => setPhase("menu")} label="🏠 মেনু" aria="Menu" />
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         <Footer />
//       </div>
//     </div>
//   );
// }

// // ---------- UI Bits ----------
// function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: any }) {
//   return (
//     <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 md:p-5 shadow">
//       <div className="mb-3">
//         <h3 className="text-lg font-semibold">{title}</h3>
//         {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
//       </div>
//       {children}
//     </div>
//   );
// }

// function Stat({ label, value }: { label: string; value: number | string }) {
//   return (
//     <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-center">
//       <div className="text-slate-400 text-xs">{label}</div>
//       <div className="text-2xl font-bold">{value}</div>
//     </div>
//   );
// }

// function Chip({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-3 py-1 rounded-xl border text-sm transition ${
//         active
//           ? "bg-emerald-500/10 border-emerald-500 text-emerald-300"
//           : "border-slate-700 text-slate-300 hover:bg-slate-800"
//       }`}
//     >
//       {label}
//     </button>
//   );
// }

// function Button({ label, aria, onClick, className = "" }: { label: string; aria?: string; onClick?: () => void; className?: string }) {
//   return (
//     <button
//       onClick={onClick}
//       aria-label={aria}
//       className={`px-4 py-2 rounded-2xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 font-medium shadow-sm active:scale-[.99] transition ${className}`}
//     >
//       {label}
//     </button>
//   );
// }

// function TargetColor({ hex, showHex }: { hex: string; showHex: boolean }) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="w-12 h-12 rounded-xl border border-slate-700 shadow-inner" style={{ background: hex }} />
//       <div>
//         <div className="text-xs text-slate-400">টার্গেট কালার</div>
//         <div className="text-lg font-semibold">{showHex ? hex : "Match this color"}</div>
//       </div>
//     </div>
//   );
// }

// function Tile({ hex, onClick, pulse, wrong }: { hex: string; onClick: () => void; pulse?: boolean; wrong?: boolean }) {
//   return (
//     <motion.button
//       onClick={onClick}
//       className="aspect-square rounded-xl border border-slate-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500"
//       style={{ background: hex }}
//       whileTap={{ scale: 0.98 }}
//       animate={
//         pulse ? { scale: [1, 1.06, 1] } : wrong ? { x: [0, -6, 6, -3, 3, 0] } : { scale: 1 }
//       }
//       transition={{ duration: 0.25 }}
//       aria-label={`Color tile ${hex}`}
//     />
//   );
// }

// function Footer() {
//   return (
//     <div className="text-center text-slate-500 text-xs mt-5">
//       Made with ❤ – Use in any Next.js page: <code className="bg-slate-800 px-2 py-1 rounded">&lt;ColorMatchGame /&gt;</code>
//     </div>
//   );
// }

