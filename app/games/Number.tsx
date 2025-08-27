


import React from 'react'

export default function Number() {
  return (
    <div>Number</div>
  )
}




// "use client";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// /**
//  * Guess the Number – Professional Web Game (React / Next.js)
//  * ----------------------------------------------------------
//  * Drop this file into your Next.js app and render <GuessNumberPro />
//  * - TailwindCSS styling
//  * - Framer Motion animations
//  * - Mobile & desktop friendly (tap, click, keyboard)
//  * - Difficulty levels, smart hints, attempt counter
//  * - High score (best attempt), streak, pause, sound beeps
//  * - No external assets
//  *
//  * Keyboard: Enter (guess), R (restart), Space (focus input)
//  */

// type Phase = "menu" | "playing" | "paused" | "won";

// type Difficulty = "easy" | "normal" | "hard" | "insane";

// interface Settings {
//   difficulty: Difficulty;
//   sound: boolean;
//   showRange: boolean;
//   timerSec: number | null; // null = no timer
// }

// function rangeFor(d: Difficulty) {
//   switch (d) {
//     case "easy":
//       return [1, 50] as const;
//     case "normal":
//       return [1, 100] as const;
//     case "hard":
//       return [1, 500] as const;
//     case "insane":
//       return [1, 1000] as const;
//   }
// }

// function hintBand(distance: number, range: number) {
//   // Returns heat-based hint string
//   const pct = distance / range; // 0..1
//   if (distance === 0) return "correct";
//   if (pct <= 0.02) return "🔥 Scorching";
//   if (pct <= 0.05) return "🥵 Very Hot";
//   if (pct <= 0.10) return "🔥 Hot";
//   if (pct <= 0.20) return "🙂 Warm";
//   if (pct <= 0.35) return "🧊 Cool";
//   return "❄️ Cold";
// }

// function playBeep(freq = 660, duration = 80, vol = 0.03) {
//   if (typeof window === "undefined") return;
//   const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
//   if (!AC) return;
//   const ctx = new AC();
//   const osc = ctx.createOscillator();
//   const gain = ctx.createGain();
//   osc.connect(gain);
//   gain.connect(ctx.destination);
//   osc.frequency.value = freq;
//   gain.gain.value = vol;
//   osc.start();
//   setTimeout(() => {
//     osc.stop();
//     ctx.close();
//   }, duration);
// }

// export default function GuessNumberPro() {
//   // ---------- Settings ----------
//   const [settings, setSettings] = useState<Settings>(() => {
//     if (typeof window !== "undefined") {
//       const s = localStorage.getItem("gn_settings");
//       if (s) return JSON.parse(s);
//     }
//     return { difficulty: "normal", sound: true, showRange: true, timerSec: null };
//   });
//   useEffect(() => {
//     if (typeof window !== "undefined") localStorage.setItem("gn_settings", JSON.stringify(settings));
//   }, [settings]);

//   const [min, max] = rangeFor(settings.difficulty);
//   const totalRange = max - min + 1;

//   // ---------- Game State ----------
//   const [phase, setPhase] = useState<Phase>("menu");
//   const [target, setTarget] = useState<number>(() => rand(min, max));
//   const [guess, setGuess] = useState<string>("");
//   const [attempts, setAttempts] = useState(0);
//   const [hint, setHint] = useState<string>("১টি সংখ্যা লিখে Guess করো!");
//   const [history, setHistory] = useState<number[]>([]);
//   const [timeLeft, setTimeLeft] = useState<number | null>(settings.timerSec);
//   const [best, setBest] = useState<number | null>(() => {
//     if (typeof window !== "undefined") {
//       const b = localStorage.getItem("gn_best");
//       return b ? parseInt(b) : null;
//     }
//     return null;
//   });
//   const [streak, setStreak] = useState<number>(() => {
//     if (typeof window !== "undefined") {
//       const k = localStorage.getItem("gn_streak");
//       return k ? parseInt(k) : 0;
//     }
//     return 0;
//   });

//   const inputRef = useRef<HTMLInputElement | null>(null);

//   // Timer
//   useEffect(() => {
//     if (phase !== "playing" || timeLeft == null) return;
//     if (timeLeft <= 0) {
//       setPhase("paused");
//       setHint("⏳ টাইম আপ! Restart চাপো।");
//       return;
//     }
//     const id = setInterval(() => setTimeLeft((t) => (t == null ? t : t - 1)), 1000);
//     return () => clearInterval(id);
//   }, [phase, timeLeft]);

//   // ---------- Actions ----------
//   function start() {
//     setPhase("playing");
//     setTarget(rand(min, max));
//     setGuess("");
//     setAttempts(0);
//     setHint(`👉 ${min} থেকে ${max} এর মধ্যে একটি সংখ্যা অনুমান করো!`);
//     setHistory([]);
//     setTimeLeft(settings.timerSec);
//     setTimeout(() => inputRef.current?.focus(), 0);
//   }

//   function restart() {
//     start();
//   }

//   function onGuess() {
//     if (phase !== "playing") return;
//     const n = parseInt(guess);
//     if (Number.isNaN(n) || n < min || n > max) {
//       setHint(`⚠️ ${min}-${max} রেঞ্জের মধ্যে সঠিক সংখ্যা লিখো।`);
//       shake();
//       return;
//     }
//     setAttempts((a) => a + 1);
//     setHistory((h) => [n, ...h].slice(0, 7));

//     const diff = Math.abs(n - target);
//     if (n === target) {
//       setPhase("won");
//       setHint(`🎉 সঠিক! তুমি ${attempts + 1} বার চেষ্টায় জিতেছো.`);
//       if (settings.sound) playBeep(880, 160, 0.05);
//       // update best & streak
//       setBest((b) => {
//         const nb = b == null ? attempts + 1 : Math.min(b, attempts + 1);
//         if (typeof window !== "undefined") localStorage.setItem("gn_best", String(nb));
//         return nb;
//       });
//       setStreak((s) => {
//         const ns = s + 1;
//         if (typeof window !== "undefined") localStorage.setItem("gn_streak", String(ns));
//         return ns;
//       });
//       return;
//     }

//     // Incorrect → hint
//     const hotter = hintBand(diff, totalRange);
//     const highLow = n > target ? "⬇️ ছোট" : "⬆️ বড়";
//     setHint(`${hotter} • ${highLow} সংখ্যা চেষ্টা করো`);
//     if (settings.sound) playBeep(n > target ? 300 : 520, 90, 0.035);
//     pulse();
//   }

//   // tiny animation flags
//   const [shakeKey, setShakeKey] = useState(0);
//   const [pulseKey, setPulseKey] = useState(0);
//   function shake() { setShakeKey((k) => k + 1); }
//   function pulse() { setPulseKey((k) => k + 1); }

//   // Keyboard
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Enter") {
//         onGuess();
//       } else if (e.key.toLowerCase() === "r") {
//         restart();
//       } else if (e.code === "Space") {
//         e.preventDefault();
//         inputRef.current?.focus();
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [phase, guess, settings]);

//   const progress = useMemo(() => {
//     if (phase !== "playing" || timeLeft == null || settings.timerSec == null) return 1;
//     return Math.max(0, Math.min(1, timeLeft / settings.timerSec));
//   }, [phase, timeLeft, settings.timerSec]);

//   // ---------- UI ----------
//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-slate-950 to-black text-slate-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="rounded-2xl shadow-xl bg-slate-900/60 backdrop-blur border border-slate-800 p-5 md:p-8"
//         >
//           <Header settings={settings} setSettings={setSettings} min={min} max={max} />

//           <div className="grid md:grid-cols-3 gap-3 mb-5">
//             <Stat label="চেষ্টা" value={attempts} />
//             <Stat label="স্ট্রিক" value={streak} />
//             <Stat label="সেরা (কম চেষ্টা)" value={best ?? "—"} />
//           </div>

//           {settings.timerSec != null && (
//             <div className="mb-4">
//               <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
//                 <motion.div
//                   key={timeLeft ?? 0}
//                   initial={{ width: "100%" }}
//                   animate={{ width: `${progress * 100}%` }}
//                   transition={{ ease: "linear", duration: 0.25 }}
//                   className={`h-full ${progress < 0.25 ? "bg-rose-500" : progress < 0.5 ? "bg-amber-400" : "bg-emerald-500"}`}
//                 />
//               </div>
//             </div>
//           )}

//           <AnimatePresence mode="wait">
//             {phase === "menu" && (
//               <motion.div key="menu" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
//                 <Card title="কিভাবে খেলবে" subtitle="খুব সহজ!">
//                   <ul className="text-slate-300 text-sm list-disc pl-5 space-y-1">
//                     <li>{min}–{max} এর মধ্যে একটি সংখ্যা কম্পিউটার লুকিয়ে রাখে।</li>
//                     <li>একটি সংখ্যা লিখে <b>Guess</b> চাপো।</li>
//                     <li>কম/বেশি ও তাপমাত্রা-হিন্ট পাবে: "Cold/Warm/Hot"।</li>
//                     <li>সঠিক হলেই জিতেছো — যত কম চেষ্টায় পারবে তত ভালো!</li>
//                     <li>কিবোর্ড: <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">Enter</kbd> Guess, <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">R</kbd> Restart, <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">Space</kbd> Focus.</li>
//                   </ul>
//                 </Card>
//                 <div className="flex gap-3">
//                   <Primary onClick={start} label="▶️ শুরু করো" className="flex-1" />
//                 </div>
//               </motion.div>
//             )}

//             {phase === "playing" && (
//               <motion.div key="play" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-5">
//                 <motion.div
//                   key={`hint-${shakeKey}`}
//                   animate={{ x: [0, -6, 6, -3, 3, 0] }}
//                   transition={{ duration: 0.25 }}
//                   className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-center"
//                 >
//                   <div className="text-lg font-semibold">{hint}</div>
//                   {settings.showRange && (
//                     <div className="text-slate-400 text-xs mt-1">রেঞ্জ: {min}–{max}</div>
//                   )}
//                 </motion.div>

//                 <div className="flex items-center gap-3">
//                   <input
//                     ref={inputRef}
//                     type="number"
//                     inputMode="numeric"
//                     min={min}
//                     max={max}
//                     value={guess}
//                     onChange={(e) => setGuess(e.target.value)}
//                     onKeyDown={(e) => { if (e.key === "Enter") onGuess(); }}
//                     placeholder={`${min}–${max} এর মধ্যে সংখ্যা`}
//                     className="flex-1 px-4 py-3 rounded-2xl bg-slate-900/60 border border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
//                   />
//                   <Primary onClick={onGuess} label="✅ Guess" />
//                   <Button onClick={restart} label="🔄" aria="Restart" />
//                 </div>

//                 <motion.div key={`pulse-${pulseKey}`} animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 0.25 }}>
//                   <Card title="সাম্প্রতিক চেষ্টা" subtitle="শেষ ৭টি সংখ্যা">
//                     {history.length === 0 ? (
//                       <div className="text-slate-400 text-sm">এখনো কিছু নেই</div>
//                     ) : (
//                       <div className="flex flex-wrap gap-2">
//                         {history.map((n, i) => (
//                           <span key={i} className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-sm">{n}</span>
//                         ))}
//                       </div>
//                     )}
//                   </Card>
//                 </motion.div>
//               </motion.div>
//             )}

//             {phase === "paused" && (
//               <motion.div key="paused" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
//                 <Card title="পজড" subtitle="টাইম শেষ বা পজ করা হয়েছে">
//                   <div className="text-slate-300 text-sm">Restart চাপুন নতুন করে শুরু করতে।</div>
//                 </Card>
//                 <div className="flex gap-3">
//                   <Primary onClick={restart} label="🔄 Restart" className="flex-1" />
//                 </div>
//               </motion.div>
//             )}

//             {phase === "won" && (
//               <motion.div key="won" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-5">
//                 <WinSplash attempts={attempts} target={target} best={best} />
//                 <div className="flex gap-3">
//                   <Primary onClick={restart} label="▶️ আবার খেলো" className="flex-1" />
//                   <Button onClick={() => setPhase("menu")} label="🏠 মেনু" />
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

// // ---------- Helpers & UI bits ----------
// function rand(a: number, b: number) {
//   return Math.floor(Math.random() * (b - a + 1)) + a;
// }

// function Header({ settings, setSettings, min, max }: { settings: Settings; setSettings: (u: any) => void; min: number; max: number }) {
//   return (
//     <div className="flex items-center justify-between gap-4 mb-5">
//       <div>
//         <h1 className="text-2xl md:text-3xl font-bold tracking-tight">🔢 Guess the Number</h1>
//         <p className="text-slate-400 text-sm">সংখ্যা ধরো, কম চেষ্টায় জিতো — স্মার্ট হিন্টসহ</p>
//       </div>
//       <div className="flex items-center gap-2">
//         <button
//           onClick={() => setSettings((s: Settings) => ({ ...s, sound: !s.sound }))}
//           className={`px-3 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 transition ${settings.sound ? "opacity-100" : "opacity-60"}`}
//           aria-label="Toggle sound"
//         >
//           {settings.sound ? "🔊" : "🔈"}
//         </button>
//         <button
//           onClick={() => setSettings((s: Settings) => ({ ...s, showRange: !s.showRange }))}
//           className="px-3 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 transition"
//           aria-label="Toggle range"
//         >
//           {settings.showRange ? "1–100" : "◻︎"}
//         </button>
//         <Dropdown label="⚙️">
//           <div className="grid gap-2 min-w-44">
//             <Row label="ডিফিকাল্টি">
//               {(["easy", "normal", "hard", "insane"] as Difficulty[]).map((d) => (
//                 <Chip key={d} active={settings.difficulty === d} onClick={() => setSettings((s: Settings) => ({ ...s, difficulty: d }))} label={d} />
//               ))}
//             </Row>
//             <Row label="টাইমার">
//               {[null, 30, 60, 90].map((t, i) => (
//                 <Chip key={i} active={settings.timerSec === t} onClick={() => setSettings((s: Settings) => ({ ...s, timerSec: t }))} label={t === null ? "Off" : `${t}s`} />
//               ))}
//             </Row>
//             <div className="text-xs text-slate-400">বর্তমান রেঞ্জ: {min}–{max}</div>
//           </div>
//         </Dropdown>
//       </div>
//     </div>
//   );
// }

// function Row({ label, children }: { label: string; children: any }) {
//   return (
//     <div>
//       <div className="text-xs text-slate-400 mb-1">{label}</div>
//       <div className="flex flex-wrap gap-2">{children}</div>
//     </div>
//   );
// }

// function Dropdown({ label, children }: { label: string; children: any }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="relative">
//       <button onClick={() => setOpen(!open)} className="px-3 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 transition">
//         {label}
//       </button>
//       <AnimatePresence>
//         {open && (
//           <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute right-0 mt-2 z-20">
//             <div className="rounded-2xl border border-slate-700 bg-slate-900/90 backdrop-blur p-3 shadow-xl">
//               {children}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

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

// function Stat({ label, value }: { label: string; value: number | string | null }) {
//   return (
//     <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-center">
//       <div className="text-slate-400 text-xs">{label}</div>
//       <div className="text-2xl font-bold">{value}</div>
//     </div>
//   );
// }

// function Primary({ label, onClick, className = "" }: { label: string; onClick?: () => void; className?: string }) {
//   return (
//     <button onClick={onClick} className={`px-4 py-2 rounded-2xl border border-emerald-600 bg-emerald-600/10 hover:bg-emerald-600/20 font-medium shadow-sm active:scale-[.99] transition ${className}`}>
//       {label}
//     </button>
//   );
// }

// function Button({ label, aria, onClick, className = "" }: { label: string; aria?: string; onClick?: () => void; className?: string }) {
//   return (
//     <button onClick={onClick} aria-label={aria} className={`px-4 py-2 rounded-2xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 font-medium shadow-sm active:scale-[.99] transition ${className}`}>
//       {label}
//     </button>
//   );
// }

// function Chip({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
//   return (
//     <button onClick={onClick} className={`px-3 py-1 rounded-xl border text-sm transition ${active ? "bg-emerald-500/10 border-emerald-500 text-emerald-300" : "border-slate-700 text-slate-300 hover:bg-slate-800"}`}>
//       {label}
//     </button>
//   );
// }

// function WinSplash({ attempts, target, best }: { attempts: number; target: number; best: number | null }) {
//   return (
//     <Card title="🎉 অভিনন্দন!" subtitle="তুমি নম্বরটা ধরে ফেলেছো">
//       <div className="flex flex-col items-center gap-2">
//         <motion.div initial={{ scale: 0.8, rotate: -6 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 14 }} className="text-5xl">🎯</motion.div>
//         <div className="text-xl font-semibold">টার্গেট ছিল: <span className="text-emerald-300">{target}</span></div>
//         <div className="text-slate-300">তোমার চেষ্টা লেগেছে <b>{attempts}</b> বার</div>
//         <div className="text-slate-400 text-sm">সেরা রেকর্ড: {best ?? "—"}</div>
//       </div>
//     </Card>
//   );
// }

// function Footer() {
//   return (
//     <div className="text-center text-slate-500 text-xs mt-5">
//       Made with ❤ – Use anywhere: <code className="bg-slate-800 px-2 py-1 rounded">&lt;GuessNumberPro /&gt;</code>
//     </div>
//   );
// }
