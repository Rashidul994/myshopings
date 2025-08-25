"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------- Shared UI ----------------
function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={`px-3 py-1 rounded-xl border text-sm transition ${active ? "bg-emerald-500/10 border-emerald-500 text-emerald-300" : "border-slate-700 text-slate-300 hover:bg-slate-800"}`}>{label}</button>
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

function Primary({ label, onClick, className = "" }) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-2xl border border-emerald-600 bg-emerald-600/10 hover:bg-emerald-600/20 font-medium shadow-sm active:scale-[.99] transition ${className}`}>{label}</button>
  );
}

function Card({ title, subtitle, children }) {
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

// ---------------- Sliding Puzzle ----------------
function createSolvableBoard(size) {
  const arr = Array.from({ length: size * size }, (_, i) => i);
  do { shuffle(arr); } while (!isSolvable(arr, size));
  return arr;
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } }
function isSolvable(board, size) {
  const flat = board.filter(x => x !== 0);
  let inv = 0;
  for (let i = 0; i < flat.length; i++) for (let j = i + 1; j < flat.length; j++) if (flat[i] > flat[j]) inv++;
  if (size % 2 === 1) return inv % 2 === 0;
  const blankRowFromBottom = size - Math.floor(board.indexOf(0) / size);
  return (blankRowFromBottom % 2 === 0) ? inv % 2 === 1 : inv % 2 === 0;
}

function SlidingPuzzle() {
  const [size, setSize] = useState(4);
  const [tiles, setTiles] = useState(() => createSolvableBoard(4));
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [won, setWon] = useState(false);
  const [best, setBest] = useState(() => { const s = typeof window !== "undefined" ? localStorage.getItem("sp_best") : null; return s ? JSON.parse(s) : null; });

  useEffect(() => { if (won) return; const id = setInterval(() => setSeconds(s => s + 1), 1000); return () => clearInterval(id); }, [won]);
  function start(newSize) { const s = newSize ?? size; setSize(s); setTiles(createSolvableBoard(s)); setMoves(0); setSeconds(0); setWon(false); }

  const gridTemplate = { gridTemplateColumns: `repeat(${size}, minmax(0,1fr))`, gridTemplateRows: `repeat(${size}, minmax(0,1fr))`, gap: "10px" };

  function swap(i,j){ setTiles(t=>{ const a=[...t]; [a[i],a[j]]=[a[j],a[i]]; return a; }); }
  function tryMove(i){ if(won) return; const zero=tiles.indexOf(0); const zr=Math.floor(zero/size),zc=zero%size; const r=Math.floor(i/size),c=i%size; if((r===zr && Math.abs(c-zc)===1)||(c===zc && Math.abs(r-zr)===1)){ swap(i,zero); setMoves(m=>m+1); } }

  useEffect(()=>{ const correct=tiles.every((v,idx)=>(idx===tiles.length-1?v===0:v===idx+1)); if(correct && !won){ setWon(true); const record={moves,time:seconds}; setBest(b=>{ const better=!b||record.moves<b.moves||(record.moves===b.moves && record.time<b.time); const nb=better?record:b; if(typeof window!=='undefined' && nb) localStorage.setItem("sp_best",JSON.stringify(nb)); return nb; }); } },[tiles,won,moves,seconds]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">{[3,4,5].map(n=><Chip key={n} label={`${n}×${n}`} active={size===n} onClick={()=>start(n)}/>)}
        </div>
        <div className="flex gap-2"><Primary label="🔄 Shuffle" onClick={()=>start()}/></div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3"><Stat label="Moves" value={moves}/><Stat label="Time" value={`${seconds}s`}/><Stat label="Best" value={best?`${best.moves} / ${best.time}s`:'—'}/></div>
      <div className="aspect-square select-none"><div className="w-full h-full grid" style={gridTemplate}>{tiles.map((v,i)=><motion.button key={i} onClick={()=>tryMove(i)} className={`rounded-xl border border-slate-800 shadow-inner text-2xl font-bold flex items-center justify-center ${v===0?'bg-transparent border-dashed':'bg-slate-800'}`} whileTap={{scale:v===0?1:0.98}}>{v!==0 && <span className="text-slate-100">{v}</span>}</motion.button>)}</div></div>
      {won && (<Card title="🎉 সমাধান সম্পন্ন!" subtitle="স্লাইডিং পাজল"><div className="flex flex-wrap gap-3 items-center"><div>Moves: <b>{moves}</b>, Time: <b>{seconds}s</b></div><Primary label="▶️ আবার খেলো" onClick={()=>start()}/></div></Card>)}
    </div>
  );
}

// ---------------- Jigsaw Puzzle ----------------
function shuffledRange(n){ const arr=Array.from({length:n},(_,i)=>i); shuffle(arr); return arr; }
const DEFAULT_IMG=(()=>{ const svg=encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#34d399'/><stop offset='100%' stop-color='#60a5fa'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><g fill='rgba(255,255,255,0.15)'><circle cx='80' cy='90' r='30'/><circle cx='160' cy='180' r='36'/><circle cx='260' cy='120' r='28'/><circle cx='320' cy='300' r='40'/></g></svg>`); return `data:image/svg+xml;charset=UTF-8,${svg}`; })();

function JigsawPuzzle(){
  const [size,setSize]=useState(3); const [order,setOrder]=useState(()=>shuffledRange(9));
  const [seconds,setSeconds]=useState(0); const [moves,setMoves]=useState(0); const [won,setWon]=useState(false); const [img,setImg]=useState(DEFAULT_IMG);
  useEffect(()=>{ const id=setInterval(()=>setSeconds(s=>s+1),1000); return ()=>clearInterval(id); },[]);
  function newGame(newSize){ const s=newSize??size; setSize(s); setOrder(shuffledRange(s*s)); setSeconds(0); setMoves(0); setWon(false); }
  useEffect(()=>{ const ok=order.every((v,i)=>v===i); if(ok&&!won) setWon(true); },[order,won]);
  const gridTemplate={gridTemplateColumns:`repeat(${size}, minmax(0,1fr))`,gridTemplateRows:`repeat(${size}, minmax(0,1fr))`,gap:'4px'};
  const dragIndex=useRef(null);
  function onDragStart(i){ dragIndex.current=i; }
  function onDrop(i){ const a=dragIndex.current; if(a==null||a===i) return; setOrder(o=>{ const b=[...o]; [b[a],b[i]]=[b[i],b[a]]; return b; }); setMoves(m=>m+1); dragIndex.current=null; }
  const [imgInput,setImgInput]=useState("");
  function applyImage(){ if(!imgInput) return; setImg(imgInput); setImgInput(""); newGame(); }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">{[3,4,5].map(n=><Chip key={n} label={`${n}×${n}`} active={size===n} onClick={()=>newGame(n)}/>)}
        </div>
        <div className="flex gap-2"><Primary label="🔄 Shuffle" onClick={()=>newGame()}/></div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3"><Stat label="Moves" value={moves}/><Stat label="Time" value={`${seconds}s`}/><Stat label="Size" value={`${size}×${size}`}/></div>
      <div className="rounded-xl border border-slate-800 p-3">
        <div className="w-full aspect-square grid" style={gridTemplate}>
          {order.map((tileIndex,pos)=>{ const row=Math.floor(tileIndex/size),col=tileIndex%size; const bgPos=`${(col*100)/(size-1)}% ${(row*100)/(size-1)}%`; return (<motion.div key={pos} draggable onDragStart={()=>onDragStart(pos)} onDragOver={e=>e.preventDefault()} onDrop={()=>onDrop(pos)} whileTap={{scale:0.98}} className="rounded-lg border border-slate-700 bg-slate-800 overflow-hidden" style={{backgroundImage:`url(${img})`,backgroundSize:`${size*100}% ${size*100}%`,backgroundPosition:bgPos}}/>); })}
        </div>
      </div>
      <Card title="ইমেজ সেট করুন (ঐচ্ছিক)" subtitle="ডেটা ইউআরএল/বেইস৬৪ দিন — নাহলে বিল্ট-ইন গ্রেডিয়েন্ট ব্যবহার হবে">
        <div className="flex gap-2 items-center">
          <input value={imgInput} onChange={e=>setImgInput(e.target.value)} placeholder="data:image/..." className="flex-1 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"/>
          <Primary label="Apply" onClick={applyImage}/>
        </div>
      </Card>
      {won&&(<Card title="🎉 সমাধান সম্পন্ন!" subtitle="জিগস পাজল"><div className="flex flex-wrap gap-3 items-center"><div>Moves: <b>{moves}</b>, Time: <b>{seconds}s</b></div><Primary label="▶️ আবার খেলো" onClick={()=>newGame()}/></div></Card>)}
    </div>
  );
}

// ---------------- Puzzle Suite Wrapper ----------------
export default function PuzzleSuite(){
  const [tab,setTab]=useState("sliding");
  return (<div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-slate-950 to-black text-slate-100 flex items-center justify-center p-4">
    <div className="w-full max-w-4xl">
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="rounded-2xl shadow-xl bg-slate-900/60 backdrop-blur border border-slate-800 p-5 md:p-8">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight">🧩 Puzzle Suite</h1><p className="text-slate-400 text-sm">Sliding & Jigsaw – মোবাইল ফ্রেন্ডলি, অ্যানিমেটেড, প্রফেশনাল</p></div>
          <div className="flex gap-2"><Chip label="Sliding" active={tab==="sliding"} onClick={()=>setTab("sliding")}/><Chip label="Jigsaw" active={tab==="jigsaw"} onClick={()=>setTab("jigsaw")}/></div>
        </div>
        <AnimatePresence mode="wait">{tab==="sliding"?(<motion.div key="sliding" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><SlidingPuzzle/></motion.div>):(<motion.div key="jigsaw" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><JigsawPuzzle/></motion.div>)}</AnimatePresence>
      </motion.div>
      <div className="text-center text-slate-500 text-xs mt-5">Use anywhere: <code className="bg-slate-800 px-2 py-1 rounded">&lt;PuzzleSuite /&gt;</code></div>
    </div>
  </div>);
}
