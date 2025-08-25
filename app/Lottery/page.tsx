"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export default function CasinoPage() {
  // ডেমো ডেটা: পরবর্তীতে API থেকে ডেটা লোড করার জন্য এই কাঠামো ব্যবহার করা যাবে।
  const initialPlayers = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: 1000 + i,
        name: `Player ${i + 1}`,
      })),
    []
  );

  const getColor = (n) => (n.id % 3 === 0 ? "green" : n.id % 2 === 0 ? "red" : "black");
  const getColorName = (n) => (n.id % 3 === 0 ? "Green" : n.id % 2 === 0 ? "Red" : "Black");

  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [availablePlayers, setAvailablePlayers] = useState(initialPlayers);
  const [modalVisible, setModalVisible] = useState(false);
  const wheelRef = useRef(null);

  const spin = () => {
    if (spinning || availablePlayers.length === 0) return;
    setSpinning(true);

    const pickIndex = Math.floor(Math.random() * availablePlayers.length);
    const win = availablePlayers[pickIndex];
    const pockets = availablePlayers.length;
    const degPer = 360 / pockets;
    const fullSpins = 6 + Math.floor(Math.random() * 3);
    const target = fullSpins * 360 + degPer * pickIndex;

    setAngle((prev) => prev + target);

    const duration = 2000;
    setTimeout(() => {
      setResult(win);
      setHistory((h) => [win, ...h].slice(0, 12));
      setAvailablePlayers((prev) => prev.filter((p) => p.id !== win.id));
      setSpinning(false);

      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 2000); // 10 সেকেন্ড পর হাইড
    }, duration);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter") {
        spin();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [spinning, availablePlayers]);

  const pocketsElements = availablePlayers.map((p, i) => {
    const degPer = 360 / availablePlayers.length;
    const rotation = i * degPer;
    const color = getColor(p);
    return (
      <div
        key={p.id}
        className="absolute top-1/2 left-1/2 w-32 h-16 -translate-x-1/2 -translate-y-1/2 origin-bottom-center flex flex-col items-center justify-center text-xs font-semibold rounded-t-lg shadow-sm border border-gray-400 p-2"
        style={{
          transform: `rotate(${rotation}deg) translateY(-250px) rotate(${-rotation}deg)`,
          background:
            color === "green"
              ? "#10B981"
              : color === "red"
              ? "#EF4444"
              : "#000000",
          color: "white",
        }}
      >
        <span className="text-sm font-bold">{p.name}</span>
        <span className="text-xs opacity-75">ID: {p.id}</span>
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-yellow-400 tracking-wider">
            SPiN WiN
          </h1>
          <div className="text-sm">
            Current Draw:{" "}
            <span className="font-mono text-yellow-200">
              #{history.length ? 2358 + history.length : 2358}
            </span>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left panel */}
          <aside className="md:col-span-3 bg-gray-800 p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-yellow-300 mb-3">
              Available Players
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm max-h-80 overflow-y-auto">
              {availablePlayers.length > 0 ? (
                availablePlayers.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-lg flex flex-col items-center justify-center font-bold text-center border border-gray-600 transition-transform hover:scale-105"
                    style={{
                      background:
                        getColor(p) === "green"
                          ? "#065F46"
                          : getColor(p) === "red"
                          ? "#991B1B"
                          : "#1F2937",
                    }}
                  >
                    <span>{p.name}</span>
                    <span className="text-xs opacity-75">ID: {p.id}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 col-span-full py-4">
                  No players left! 😥
                </div>
              )}
            </div>
          </aside>

          {/* Center wheel */}
          <section className="md:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-[580px] h-[580px] flex items-center justify-center">
              <div className="absolute w-full h-full">
                <div
                  ref={wheelRef}
                  className="rounded-full shadow-2xl border-8 border-yellow-500 overflow-hidden relative w-full h-full"
                  style={{
                    transition: spinning
                      ? "transform 6s cubic-bezier(.08,.8,.2,1)"
                      : "none",
                    transform: `rotate(${angle}deg)`,
                    background:
                      "radial-gradient(circle at center, #FDE68A, #D97706)",
                  }}
                >
                  {pocketsElements}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-yellow-600 flex items-center justify-center text-3xl font-extrabold border-4 border-yellow-700 text-black shadow-inner">
                    SPiN
                  </div>
                </div>
                {/* Pointer */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
                  style={{ top: -12 }}
                >
                  <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[32px] border-b-yellow-400 mx-auto"></div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={spin}
                disabled={spinning || availablePlayers.length === 0}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                  spinning || availablePlayers.length === 0
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-400 text-black hover:bg-yellow-300 active:scale-95"
                }`}
              >
                {spinning ? "Spinning..." : "SPIN"}
              </button>
              <div className="bg-gray-800 p-4 rounded-lg shadow-inner text-white font-mono">
                Result:{" "}
                <span className="font-bold ml-2 text-yellow-300">
                  {result === null ? "—" : `${result.name} (ID: ${result.id})`}
                </span>
              </div>
            </div>
          </section>

          {/* Right panel */}
          <aside className="md:col-span-3 bg-gray-800 p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-yellow-300 mb-3">History</h2>
            <div className="space-y-2 text-sm max-h-80 overflow-y-auto">
              {history.length ? (
                history.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-600"
                    style={{ background: "#1F2937" }}
                  >
                    <div className="font-mono text-yellow-200">
                      #{2350 + i}
                    </div>
                    <div className="font-bold">
                      {h.name} (ID: {h.id})
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs opacity-60 text-center py-4">
                  No draws yet. Press SPIN to start.
                </div>
              )}
            </div>
          </aside>
        </main>

        {/* Modal */}
        {modalVisible && result && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm border-4 border-yellow-400 animate-pulse">
              <h2 className="text-3xl font-extrabold mb-4 text-yellow-400">
                🎉 Winner! 🎉
              </h2>
              <p className="text-2xl mb-2 font-bold">{result.name}</p>
              <p className="text-lg opacity-80 mb-6">ID: {result.id}</p>
              <p className="text-sm text-gray-400">
                This window will close automatically in 10 seconds
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}






// "use client";

// import React, { useMemo, useRef, useState } from "react";

// export default function CasinoPage() {
//   const numbers = useMemo(() => Array.from({ length: 37 }, (_, i) => i), []);
//   const getColor = (n) => (n === 0 ? "green" : n % 2 === 0 ? "red" : "black");

//   const [angle, setAngle] = useState(0);
//   const [spinning, setSpinning] = useState(false);
//   const [result, setResult] = useState(null);
//   const [history, setHistory] = useState([]);
//   const wheelRef = useRef(null);

//   const spin = () => {
//     if (spinning) return;
//     setSpinning(true);

//     const pickIndex = Math.floor(Math.random() * numbers.length);
//     const pockets = numbers.length;
//     const degPer = 360 / pockets;
//     const fullSpins = 6 + Math.floor(Math.random() * 3);
//     const target = fullSpins * 360 + degPer * pickIndex;

//     setAngle((prev) => prev + target);

//     setTimeout(() => {
//       const win = numbers[pickIndex];
//       setResult(win);
//       setHistory((h) => [win, ...h].slice(0, 12));
//       setSpinning(false);
//     }, 6000);
//   };

//   const stats = useMemo(() => {
//     const s = { green: 0, red: 0, black: 0 };
//     history.forEach((n) => {
//       if (n === 0) s.green++;
//       else if (n % 2 === 0) s.red++;
//       else s.black++;
//     });
//     return s;
//   }, [history]);

//   const pocketsElements = numbers.map((n, i) => {
//     const degPer = 360 / numbers.length;
//     const rotation = i * degPer;
//     const color = getColor(n);
//     return (
//       <div
//         key={n}
//         className="absolute top-1/2 left-1/2 w-20 h-10 -translate-x-1/2 -translate-y-1/2 origin-bottom-center flex items-center justify-center text-xs font-semibold rounded-t-lg shadow-sm border cursor-default select-none"
//         style={{
//           transform: `rotate(${rotation}deg) translateY(-210px) rotate(${-rotation}deg)`,
//           background:
//             color === "green"
//               ? "#32CD32"
//               : color === "red"
//               ? "#d32f2f"
//               : "#111827",
//           color: "white",
//           userSelect: "none",
//         }}
//       >
//         <span>{n}</span>
//       </div>
//     );
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-700 to-green-900 text-white p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         <header className="flex flex-col sm:flex-row items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold mb-3 sm:mb-0 select-none">SPiN WiN - Demo</h1>
//           <div className="text-sm font-mono bg-green-900 px-3 py-1 rounded shadow-inner select-none">
//             Current Draw: #{history.length ? 2358 + history.length : 2358}
//           </div>
//         </header>

//         <main className="grid grid-cols-1 md:grid-cols-12 gap-6">
//           {/* Left panel - Numbers list */}
//           <aside className="col-span-3 bg-green-800 p-4 rounded-lg shadow-inner max-h-[480px] overflow-auto">
//             <h2 className="text-lg font-semibold mb-4 select-none">Numbers & Colors</h2>
//             <div className="grid grid-cols-3 gap-2 text-center text-sm">
//               {numbers.map((n) => {
//                 const color = getColor(n);
//                 const colorName = color.charAt(0).toUpperCase() + color.slice(1);
//                 return (
//                   <div
//                     key={n}
//                     className="p-2 rounded font-bold select-none"
//                     style={{
//                       background:
//                         color === "green"
//                           ? "#206040"
//                           : color === "red"
//                           ? "#7a1f1f"
//                           : "#0f1724",
//                       color: "white",
//                     }}
//                     title={`${n} — ${colorName}`}
//                   >
//                     {n} <br />
//                     <span className="text-xs font-normal">{colorName}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </aside>

//           {/* Center - Wheel */}
//           <section className="col-span-6 flex flex-col items-center">
//             <div className="relative w-[320px] h-[320px] sm:w-[520px] sm:h-[520px] flex items-center justify-center">
//               <div className="absolute" style={{ width: "100%", height: "100%" }}>
//                 <div
//                   ref={wheelRef}
//                   className="rounded-full shadow-2xl border-8 border-yellow-500 overflow-hidden relative"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     transition: spinning
//                       ? "transform 6s cubic-bezier(.08,.8,.2,1)"
//                       : "none",
//                     transform: `rotate(${angle}deg)`,
//                     background: "radial-gradient(circle at center, #f6d365, #fda085)",
//                   }}
//                 >
//                   {pocketsElements}
//                   <div
//                     className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-yellow-600 flex items-center justify-center text-2xl font-bold border-4 border-yellow-700 cursor-pointer hover:bg-yellow-500 transition-colors select-none"
//                     onClick={spin}
//                     role="button"
//                     aria-disabled={spinning}
//                     tabIndex={0}
//                     onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') spin() }}
//                   >
//                     {spinning ? "Spinning..." : "SPiN"}
//                   </div>
//                 </div>
//                 {/* Pointer */}
//                 <div
//                   className="absolute left-1/2 -translate-x-1/2 -mt-3 w-0 h-0"
//                   style={{ top: -6 }}
//                 >
//                   <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[26px] border-b-white mx-auto"></div>
//                 </div>
//               </div>
//               {/* Controls */}
//               <div className="mt-6 flex gap-4 items-center select-none">
//                 <button
//                   onClick={spin}
//                   disabled={spinning}
//                   className={`px-6 py-2 rounded-lg font-semibold ${
//                     spinning
//                       ? "opacity-50 cursor-not-allowed bg-yellow-300 text-black"
//                       : "bg-yellow-400 text-black hover:scale-105 transform transition-transform"
//                   }`}
//                 >
//                   {spinning ? "Spinning..." : "SPIN"}
//                 </button>
//                 <div className="bg-green-900 p-3 rounded shadow-inner text-black font-mono min-w-[100px] text-center">
//                   Result:{" "}
//                   <span className="font-bold ml-2">
//                     {result === null ? "—" : result}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Right panel - History */}
//           <aside className="col-span-3 bg-green-800 p-4 rounded-lg max-h-[480px] overflow-auto">
//             <h2 className="text-lg font-semibold mb-3 select-none">History</h2>
//             <div className="space-y-2 text-sm max-h-[360px] overflow-auto">
//               {history.length ? (
//                 history.map((h, i) => {
//                   const color = getColor(h);
//                   const colorName = color.charAt(0).toUpperCase() + color.slice(1);
//                   return (
//                     <div
//                       key={i}
//                       className="flex items-center justify-between p-2 rounded shadow-inner"
//                       style={{
//                         background:
//                           color === "green"
//                             ? "#206040"
//                             : color === "red"
//                             ? "#7a1f1f"
//                             : "#0f1724",
//                         color: "white",
//                       }}
//                     >
//                       <div className="font-mono select-text">#{2350 + i}</div>
//                       <div className="font-bold select-text">{h}</div>
//                       <div className="italic text-xs select-none">{colorName}</div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <div className="text-xs opacity-80 select-none">
//                   No draws yet. Press SPIN to start.
//                 </div>
//               )}
//             </div>
//           </aside>
//         </main>
//       </div>
//     </div>
//   );
// }








// "use client";

// import React, { useMemo, useRef, useState } from "react";

// export default function CasinoPage() {
//   const numbers = useMemo(() => Array.from({ length: 37 }, (_, i) => i), []);
//   const getColor = (n) => (n === 0 ? "green" : n % 2 === 0 ? "red" : "black");

//   const [angle, setAngle] = useState(0);
//   const [spinning, setSpinning] = useState(false);
//   const [result, setResult] = useState(null);
//   const [history, setHistory] = useState([]);
//   const wheelRef = useRef(null);

//   const spin = () => {
//     if (spinning) return;
//     setSpinning(true);

//     const pickIndex = Math.floor(Math.random() * numbers.length);
//     const pockets = numbers.length;
//     const degPer = 360 / pockets;
//     const fullSpins = 6 + Math.floor(Math.random() * 3);
//     const target = fullSpins * 360 + degPer * pickIndex;
    
//     setAngle(prev => prev + target);

//     setTimeout(() => {
//       const win = numbers[pickIndex];
//       setResult(win);
//       setHistory((h) => [win, ...h].slice(0, 12));
//       setSpinning(false);
//     }, 6000);
//   };

//   const stats = useMemo(() => {
//     const s = { green: 0, red: 0, black: 0 };
//     history.forEach((n) => {
//       if (n === 0) s.green++;
//       else if (n % 2 === 0) s.red++;
//       else s.black++;
//     });
//     return s;
//   }, [history]);

//   const pocketsElements = numbers.map((n, i) => {
//     const degPer = 360 / numbers.length;
//     const rotation = i * degPer;
//     const color = getColor(n);
//     return (
//       <div
//         key={n}
//         className="absolute top-1/2 left-1/2 w-28 h-12 -translate-x-1/2 -translate-y-1/2 origin-bottom-center flex items-center justify-center text-xs font-semibold rounded-t-lg shadow-sm border"
//         style={{
//           transform: `rotate(${rotation}deg) translateY(-220px) rotate(${-rotation}deg)`,
//           background:
//             color === "green"
//               ? "#32CD32"
//               : color === "red"
//               ? "#d32f2f"
//               : "#111827",
//           color: "white",
//         }}
//       >
//         <span>{n}</span>
//       </div>
//     );
//   });

//   return (
//     <div className="min-h-screen bg-green-700 text-white p-6">
//       <div className="max-w-7xl mx-auto">
//         <header className="flex items-center justify-between mb-4">
//           <h1 className="text-2xl font-bold">SPiN WiN - Demo</h1>
//           <div className="text-sm">
//             Current Draw:{" "}
//             <span className="font-mono">
//               #{history.length ? 2358 + history.length : 2358}
//             </span>
//           </div>
//         </header>

//         <main className="grid grid-cols-12 gap-6">
//           {/* Left panel */}
//           <aside className="col-span-3 bg-green-800 p-4 rounded-lg shadow-inner">
//             <h2 className="text-lg font-semibold mb-3">Numbers</h2>
//             <div className="grid grid-cols-3 gap-2 text-sm">
//               {numbers.map((n) => (
//                 <div
//                   key={n}
//                   className="p-2 rounded flex items-center justify-center font-bold"
//                   style={{
//                     background:
//                       getColor(n) === "green"
//                         ? "#206040"
//                         : getColor(n) === "red"
//                         ? "#7a1f1f"
//                         : "#0f1724",
//                   }}
//                 >
//                   {n}
//                 </div>
//               ))}
//             </div>
//           </aside>

//           {/* Center wheel */}
//           <section className="col-span-6 flex flex-col items-center">
//             <div className="relative w-[520px] h-[520px] flex items-center justify-center">
//               <div className="absolute" style={{ width: 520, height: 520 }}>
//                 <div
//                   ref={wheelRef}
//                   className="rounded-full shadow-2xl border-8 border-yellow-500 overflow-hidden relative"
//                   style={{
//                     width: 520,
//                     height: 520,
//                     transition: spinning
//                       ? "transform 6s cubic-bezier(.08,.8,.2,1)"
//                       : "none",
//                     transform: `rotate(${angle}deg)`,
//                     background:
//                       "radial-gradient(circle at center, #f6d365, #fda085)",
//                   }}
//                 >
//                   {pocketsElements}
//                   <div 
//                     className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-yellow-600 flex items-center justify-center text-2xl font-bold border-4 border-yellow-700 cursor-pointer hover:bg-yellow-500 transition-colors"
//                     onClick={spin}
//                   >
//                     SPiN
//                   </div>
//                 </div>
//                 {/* Pointer */}
//                 <div
//                   className="absolute left-1/2 -translate-x-1/2 -mt-3 w-0 h-0"
//                   style={{ top: -6 }}
//                 >
//                   <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[26px] border-b-white mx-auto"></div>
//                 </div>
//               </div>
//               {/* Controls */}
//               <div className="mt-6 flex gap-4 items-center">
//                 <button
//                   onClick={spin}
//                   disabled={spinning}
//                   className={`px-6 py-2 rounded-lg font-semibold ${
//                     spinning
//                       ? "opacity-50 cursor-not-allowed"
//                       : "bg-yellow-400 text-black hover:scale-105 transform"
//                   }`}
//                 >
//                   {spinning ? "Spinning..." : "SPIN"}
//                 </button>
//                 <div className="bg-green-900 p-3 rounded shadow-inner text-black font-mono">
//                   Result:{" "}
//                   <span className="font-bold ml-2">
//                     {result === null ? "—" : result}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Right panel */}
//           <aside className="col-span-3 bg-green-800 p-4 rounded-lg">
//             <h2 className="text-lg font-semibold mb-3">History</h2>
//             <div className="space-y-2 text-sm max-h-64 overflow-auto">
//               {history.length ? (
//                 history.map((h, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center justify-between p-2 rounded"
//                     style={{ background: "#0f2a1f" }}
//                   >
//                     <div className="font-mono">#{2350 + i}</div>
//                     <div className="font-bold">{h}</div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-xs opacity-80">
//                   No draws yet. Press SPIN to start.
//                 </div>
//               )}
//             </div>
//           </aside>
//         </main>
//       </div>
//     </div>
//   );
// }










//  'use client'
// import { useState } from "react";

// export default function Home() {
//   const prizes = ["৳00", "৳0.50", "৳ 0.100", "৳10", "৳  50", "৳30", "৳  200", "৳  5", "Better luck next time!"];
//   const [lotteryId, setLotteryId] = useState("");
//   const [currentPrize, setCurrentPrize] = useState("");
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [disable, setDisables]=useState(false);

//   const generateLottery = () => {
//     setIsSpinning(true);
//     setLotteryId("");
//     setCurrentPrize("");

//     const randomId = "my-lottery -" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
//     let counter = 0;
//     const spinInterval = setInterval(() => {
//       const random = prizes[Math.floor(Math.random() * prizes.length)];
//       setCurrentPrize(random);
//       counter++;
//       if (counter > 5) {
//         clearInterval(spinInterval);
//         setIsSpinning(false);
//         setDisables(true);
//         setLotteryId(randomId);
//       }
//     }, 500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-red-200 flex items-center justify-center p-4">
//       <div className="bg-gray-600 p-8 rounded-2xl shadow-xl text-center w-full max-w-md">
//         <h1 className="text-3xl font-bold text-white  mb-4">🎲 Lottery Spinner 🎲</h1>

//         <button
//           onClick={generateLottery}
        
//           disabled={isSpinning}
          
//           className={`${
//             isSpinning ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
//           } text-white px-6 py-3 rounded-full font-semibold transition duration-300`}
//         >
//           {isSpinning ? "Spinning..." : "Spin Now"}
//         </button>

//         <div className="mt-6 text-2xl font-bold text-green-600 h-10">
//           {currentPrize}
//         </div>

//         {lotteryId && (
//           <p className="mt-4 text-sm text-white-600">🆔 Your Lottery ID: {lotteryId}</p>
//         )}
//       </div>
//     </div>
//   );
// }


// // import { useState, useRef } from "react";

// // export default function Home() {
// //   const [prizes, setPrizes] = useState(["৳500", "৳1000", "৳2000"]);
// //   const [inputPrize, setInputPrize] = useState("");
// //   const [result, setResult] = useState("");
// //   const [lotteryId, setLotteryId] = useState("");
// //   const wheelRef = useRef(null);

// //   const addPrize = () => {
// //     if (inputPrize.trim() !== "") {
// //       setPrizes([...prizes, inputPrize]);
// //       setInputPrize("");
// //     }
// //   };

// //   const spinWheel = () => {
// //     const totalSegments = prizes.length;
// //     const randomIndex = Math.floor(Math.random() * totalSegments);
// //     const degreesPerSegment = 360 / totalSegments;
// //     const rotation = 360 * 5 + (360 - randomIndex * degreesPerSegment - degreesPerSegment / 2);
    
// //     wheelRef.current.style.transition = "transform 4s ease-out";
// //     wheelRef.current.style.transform = `rotate(${rotation}deg)`;

// //     const newId = "LOT-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");

// //     setTimeout(() => {
// //       setResult(prizes[randomIndex]);
// //       setLotteryId(newId);
// //     }, 1000);
// //   };

// //   return (
// //     <div className="min-h-screen bg-dark from-yellow-100 to-red-100 flex flex-col items-center justify-center p-4">
// //       <h1 className="text-3xl font-bold mb-4 text-center">🎡 Lottery Wheel Spinner 🎡</h1>

// //       <div className="flex gap-2 mb-4">
// //         <input
// //           type="text"
// //           placeholder="Enter prize (e.g. ৳3000)"
// //           className="px-3 py-2 rounded border border-gray-400"
// //           value={inputPrize}
// //           onChange={(e) => setInputPrize(e.target.value)}
// //         />
// //         <button
// //           onClick={addPrize}
// //           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// //         >
// //           Add Prize
// //         </button>
// //       </div>

// //       <div className="relative w-60 h-60 rounded-full border-[10px] border-pink-500 overflow-hidden flex items-center justify-center">
// //         <div ref={wheelRef} className="absolute w-full h-full rounded-full">
// //           {prizes.map((prize, i) => {
// //             const rotate = (360 / prizes.length) * i;
// //             return (
// //               <div
// //                 key={i}
// //                 className="absolute left-1/2 top-1/2 origin-left text-sm"
// //                 style={{
// //                   transform: `rotate(${rotate}deg) translateX(50%)`,
// //                   transformOrigin: "0% 0%",
// //                 }}
// //               >
// //                 {prize}
// //               </div>
// //             );
// //           })}
// //         </div>
// //         <div className="absolute w-2 h-10 bg-black top-0 left-1/2 -translate-x-1/2"></div>
// //       </div>

// //       <button
// //         onClick={spinWheel}
// //         className="mt-6 bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition"
// //       >
// //         Spin the Wheel
// //       </button>

// //       {result && (
// //         <div className="mt-6 text-center">
// //           <p className="text-xl text-green-600 font-bold">🎉 Prize: {result}</p>
// //           <p className="text-gray-600">🎫 Lottery ID: {lotteryId}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }






// // import { useState } from "react";
// // import WheelComponent from "react-wheel-of-prizes";

// // export default function Home() {
// //   const [prizes, setPrizes] = useState(["৳500", "৳1000", "৳2000", "৳5000", "Better luck next time"]);
// //   const [inputPrize, setInputPrize] = useState("");
// //   const [userName, setUserName] = useState("");
// //   const [winner, setWinner] = useState("");
// //   const [lotteryId, setLotteryId] = useState("");

// //   const addPrize = () => {
// //     if (inputPrize.trim() !== "") {
// //       setPrizes([...prizes, inputPrize]);
// //       setInputPrize("");
// //     }
// //   };

// //   const generateId = () => {
// //     return "LOT-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
// //   };

// //   const onFinished = (prize) => {
// //     setWinner(prize);
// //     setLotteryId(generateId());
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center px-4 py-8">
// //       <h1 className="text-3xl font-bold mb-6 text-center">🎡 Lottery Wheel Spin</h1>

// //       {/* User Inputs */}
// //       <div className="w-full max-w-md bg-white p-4 rounded shadow mb-4">
// //         <div className="mb-2">
// //           <label className="block mb-1 text-sm font-semibold">Enter Your Name</label>
// //           <input
// //             type="text"
// //             value={userName}
// //             onChange={(e) => setUserName(e.target.value)}
// //             className="w-full border rounded px-3 py-2"
// //             placeholder="e.g. Jannat Ara"
// //           />
// //         </div>
// //         <div className="flex mt-2 gap-2">
// //           <input
// //             type="text"
// //             placeholder="Add Prize (e.g. ৳3000)"
// //             value={inputPrize}
// //             onChange={(e) => setInputPrize(e.target.value)}
// //             className="w-full border rounded px-3 py-2"
// //           />
// //           <button
// //             onClick={addPrize}
// //             className="bg-green-500 text-white px-4 rounded hover:bg-green-600"
// //           >
// //             ➕
// //           </button>
// //         </div>
// //       </div>

// //       {/* Wheel Component */}
// //       <div className="bg-white p-4 rounded shadow w-full max-w-md">
// //         <WheelComponent
// //           segments={prizes}
// //           segColors={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#F7464A"]}
// //           onFinished={(winner) => onFinished(winner)}
// //           primaryColor="#000"
// //           contrastColor="#fff"
// //           buttonText="Spin Now"
// //           isOnlyOnce={false}
// //           size={200}
// //           upDuration={100}
// //           downDuration={500}
// //         />
// //       </div>

// //       {/* Result */}
// //       {winner && (
// //         <div className="mt-6 bg-white p-4 rounded shadow text-center w-full max-w-md">
// //           <h2 className="text-lg font-semibold text-green-700">🎉 Winner Details</h2>
// //           <p className="mt-2 text-gray-800">
// //             🧑‍💼 <strong>Name:</strong> {userName || "Unknown"}
// //           </p>
// //           <p className="text-gray-800">
// //             🎫 <strong>Lottery ID:</strong> {lotteryId}
// //           </p>
// //           <p className="text-pink-600 text-xl font-bold">
// //             🎁 <strong>Prize:</strong> {winner}
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }





// "use client";

// import React, { useEffect, useMemo, useRef, useState } from "react";

// // Usage: place this file as app/page.jsx (or pages/index.jsx) in a Next.js project
// // Requires Tailwind CSS to be configured in the project. If you don't use Tailwind,
// // convert classes to your own CSS.

// export default function CasinoPage() {
//   const numbers = useMemo(() => {
//     // Classic roulette-like sequence (0-36). We'll use a simple 0..36 order for demo.
//     const arr = Array.from({ length: 37 }, (_, i) => i);
//     return arr;
//   }, []);

//   // color map simple: 0 -> green, evens red, odds black (just for demo)
//   const getColor = (n) => (n === 0 ? "green" : n % 2 === 0 ? "red" : "black");

//   const [angle, setAngle] = useState(0);
//   const [spinning, setSpinning] = useState(false);
//   const [result, setResult] = useState(null);
//   const [history, setHistory] = useState([]);
//   const wheelRef = useRef(null);

//   const spin = () => {
//     if (spinning) return;
//     setSpinning(true);

//     // pick a random number as the winning pocket
//     const pickIndex = Math.floor(Math.random() * numbers.length);
//     const pockets = numbers.length;

//     // target rotation: many full turns + offset to land picked number at pointer (top)
//     // calculate the angle per pocket
//     const degPer = 360 / pockets;

//     // We want the picked pocket to end up at 0deg (pointer at top). If our wheel numbers
//     // are laid out clockwise starting at 0 at top, then the wheel must rotate so that
//     // the picked pocket is at top. We compute rotation = fullSpins*360 + (pickedIndex * degPer)
//     const fullSpins = 6 + Math.floor(Math.random() * 3); // 6..8 spins
//     const target = fullSpins * 360 + pickIndex * degPer + 360 * Math.random() * 0.25; // small jitter

//     // animate rotation with CSS transition
//     setAngle((prev) => prev + target);

//     // after animation ends, compute final number
//     const duration = 6000; // ms (6s)
//     setTimeout(() => {
//       const finalRotation = (angle + target) % 360;
//       // determine which pocket is at the top
//       // since we rotated wheel by 'angle+target', the top corresponds to index = Math.round(finalRotation / degPer) % pockets
//       // careful about rounding direction: adjust to nearest index
//       const indexAtTop = Math.round(finalRotation / degPer) % pockets;
//       // Because rotation direction and indexing can be tricky, compute picked index via earlier pickIndex
//       const win = numbers[pickIndex];
//       setResult(win);
//       setHistory((h) => [win, ...h].slice(0, 12));
//       setSpinning(false);
//     }, duration + 60);
//   };

//   // stats derived from history
//   const stats = useMemo(() => {
//     const s = { green: 0, red: 0, black: 0 };
//     history.forEach((n) => {
//       if (n === 0) s.green++;
//       else if (n % 2 === 0) s.red++;
//       else s.black++;
//     });
//     return s;
//   }, [history]);

//   // render pockets around a circle
//   const pockets = numbers.map((n, i) => {
//     const degPer = 360 / numbers.length;
//     const rotation = i * degPer;
//     const color = getColor(n);
//     return (
//       <div
//         key={n}
//         className={`absolute top-1/2 left-1/2 w-28 h-12 -translate-x-1/2 -translate-y-1/2 origin-bottom-center flex items-center justify-center text-xs font-semibold rounded-t-lg shadow-sm border`} 
//         style={{
//           transform: `rotate(${rotation}deg) translateY(-220px) rotate(${ -rotation }deg)`,
//           background: color === 'green' ? '#32CD32' : color === 'red' ? '#d32f2f' : '#111827',
//           color: color === 'red' || color === 'green' ? 'white' : 'white',
//         }}
//       >
//         <span>{n}</span>
//       </div>
//     );
//   });

//   return (
//     <div className="min-h-screen bg-green-700 text-white p-6">
//       <div className="max-w-7xl mx-auto">
//         <header className="flex items-center justify-between mb-4">
//           <h1 className="text-2xl font-bold">SPiN WiN - Demo (Next.js single page)</h1>
//           <div className="text-sm">Current Draw: <span className="font-mono">#{history.length ? 2358 + history.length : 2358}</span></div>
//         </header>

//         <main className="grid grid-cols-12 gap-6">
//           {/* Left panel */}
//           <aside className="col-span-3 bg-green-800 p-4 rounded-lg shadow-inner">
//             <h2 className="text-lg font-semibold mb-3">Numbers</h2>
//             <div className="grid grid-cols-3 gap-2 text-sm">
//               {numbers.map((n) => (
//                 <div key={n} className="p-2 rounded flex items-center justify-center font-bold"
//                      style={{ background: getColor(n) === 'green' ? '#206040' : getColor(n) === 'red' ? '#7a1f1f' : '#0f1724' }}>
//                   {n}
//                 </div>
//               ))}
//             </div>

//             <div className="mt-4">
//               <h3 className="font-semibold">Pay Table (sample)</h3>
//               <ul className="text-xs mt-2 space-y-1">
//                 <li>Number (exact): x36</li>
//                 <li>Odd / Even: x2</li>
//                 <li>Colors: x2</li>
//                 <li>Sectors: x3</li>
//               </ul>
//             </div>
//           </aside>

//           {/* Center wheel */}
//           <section className="col-span-6 flex flex-col items-center">
//             <div className="relative w-[520px] h-[520px] flex items-center justify-center">
//               {/* wheel container */}
//               <div className="absolute" style={{ width: 520, height: 520 }}>
//                 <div
//                   ref={wheelRef}
//                   className="rounded-full shadow-2xl border-8 border-yellow-500 overflow-hidden relative"
//                   style={{
//                     width: 520,
//                     height: 520,
//                     transition: spinning ? 'transform 6s cubic-bezier(.08,.8,.2,1)' : 'transform 0.7s ease',
//                     transform: `rotate(${angle}deg)`,
//                     background: 'radial-gradient(circle at center, #f6d365, #fda085)'
//                   }}
//                 >
//                   {/* pockets */}
//                   {pockets}

//                   {/* inner rings */}
//                   <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-yellow-600 flex items-center justify-center text-2xl font-bold border-4 border-yellow-700">
//                     <div>SPiN</div>
//                   </div>
//                 </div>

//                 {/* pointer */}
//                 <div className="absolute left-1/2 -translate-x-1/2 -mt-3 w-0 h-0" style={{ top: -6 }}>
//                   <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[26px] border-b-white mx-auto"></div>
//                 </div>
//               </div>

//               {/* controls */}
//               <div className="mt-6 flex gap-4 items-center">
//                 <button onClick={spin} disabled={spinning} className={`px-6 py-2 rounded-lg font-semibold ${spinning ? 'opacity-50 cursor-not-allowed' : 'bg-yellow-400 text-black hover:scale-105 transform'}`}>
//                   {spinning ? 'Spinning...' : 'SPIN'}
//                 </button>

//                 <div className="bg-green-900 p-3 rounded shadow-inner text-black font-mono">
//                   Result: <span className="font-bold ml-2">{result === null ? '—' : result}</span>
//                 </div>

//               </div>
//             </div>

//             {/* stats summary under wheel */}
//             <div className="w-full mt-4 grid grid-cols-3 gap-3">
//               <div className="bg-green-800 p-3 rounded">
//                 <div className="text-sm">History</div>
//                 <div className="mt-2 flex gap-2 flex-wrap">
//                   {history.map((h, idx) => (
//                     <div key={idx} className="px-2 py-1 rounded text-xs font-semibold" style={{ background: getColor(h) === 'green' ? '#206040' : getColor(h) === 'red' ? '#7a1f1f' : '#0f1724' }}>{h}</div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-green-800 p-3 rounded">
//                 <div className="text-sm">Stats (last {history.length})</div>
//                 <div className="mt-2 text-xs">
//                   <div>Green: {stats.green}</div>
//                   <div>Red: {stats.red}</div>
//                   <div>Black: {stats.black}</div>
//                 </div>
//               </div>

//               <div className="bg-green-800 p-3 rounded">
//                 <div className="text-sm">Total Bet</div>
//                 <div className="mt-2 font-bold text-lg">3989</div>
//               </div>
//             </div>

//           </section>

//           {/* Right panel */}
//           <aside className="col-span-3 bg-green-800 p-4 rounded-lg">
//             <h2 className="text-lg font-semibold mb-3">History</h2>
//             <div className="space-y-2 text-sm max-h-64 overflow-auto">
//               {history.map((h, i) => (
//                 <div key={i} className="flex items-center justify-between p-2 rounded" style={{ background: '#0f2a1f' }}>
//                   <div className="font-mono">#{2350 + i}</div>
//                   <div className="font-bold">{h}</div>
//                 </div>
//               ))}
//               {!history.length && <div className="text-xs opacity-80">No draws yet. Press SPIN to start.</div>}
//             </div>

//             <div className="mt-4">
//               <h3 className="font-semibold">Quick Stats</h3>
//               <div className="mt-2 text-sm">
//                 <div>Draws: {history.length}</div>
//                 <div>Greens: {stats.green}</div>
//                 <div>Reds: {stats.red}</div>
//                 <div>Blacks: {stats.black}</div>
//               </div>
//             </div>

//           </aside>

//         </main>

//         <footer className="mt-6 text-xs opacity-80">This is a demo UI for layout only — not a real gambling game.</footer>
//       </div>
//     </div>
//   );
// }


