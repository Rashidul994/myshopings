"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ProMobileShooter() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState<number>(() => {
    try { return Number(localStorage.getItem("space_shooter_highscore") || 0); } 
    catch { return 0; }
  });
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [dark, setDark] = useState(false);

  const player = useRef({ x: 0, y: 0, w: 44, h: 44 });
  const bullets = useRef<{x:number,y:number,vy:number}[]>([]);
  const enemies = useRef<{x:number,y:number,w:number,h:number,hp:number}[]>([]);
  const particles = useRef<{x:number,y:number,vx:number,vy:number,life:number,color:string}[]>([]);
  const keys = useRef<{[k:string]:boolean}>({});
  const frameRef = useRef(0);
  const lastShot = useRef(0);

  const getEnemySpeed = (lvl:number)=>1+lvl*0.35;
  const getSpawnInterval = (lvl:number)=>Math.max(30-lvl*3,12);
  const getFireRate = (lvl:number)=>Math.max(80,200-lvl*10);

  useEffect(()=>{
    if(dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  },[dark]);

  useEffect(()=>{
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d")!;
    
    function resize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      player.current.y = canvas.height - 80;
      player.current.x = canvas.width/2 - player.current.w/2;
    }
    resize();
    window.addEventListener("resize",resize);

    let raf = 0;
    function loop(){
      if(paused){ raf=requestAnimationFrame(loop); return; }
      ctx.clearRect(0,0,canvas.width,canvas.height);

      // Parallax background
      ctx.fillStyle=dark?"#050014":"#001f3f";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      for(let i=0;i<100;i++){
        const sx=(i*47+frameRef.current*0.3)%canvas.width;
        const sy=(i*97*0.7+frameRef.current*0.5)%canvas.height;
        ctx.fillStyle="rgba(255,255,255,0.6)";
        ctx.fillRect(sx,sy,2,2);
        const sy2=(i*97*0.5+frameRef.current*0.8)%canvas.height;
        ctx.fillStyle="rgba(255,255,255,0.3)";
        ctx.fillRect(sx,sy2,1,1);
      }

      // Player movement
      if(keys.current["ArrowLeft"]) player.current.x-=6;
      if(keys.current["ArrowRight"]) player.current.x+=6;
      player.current.x = Math.max(6,Math.min(canvas.width-player.current.w-6,player.current.x));

      // Shooting
      const now = performance.now();
      if((keys.current[" "] || keys.current["k"] || keys.current["shoot"]) && now-lastShot.current>getFireRate(level)){
        bullets.current.push({x:player.current.x+player.current.w/2-2,y:player.current.y,vy:-10});
        lastShot.current=now;
        // play sound if desired
      }

      drawShip(ctx,player.current.x,player.current.y,player.current.w,player.current.h);

      // bullets
      for(let i=bullets.current.length-1;i>=0;i--){
        const b=bullets.current[i];
        b.y+=b.vy;
        ctx.fillStyle="#ffec6b";
        ctx.fillRect(b.x,b.y,4,10);
        if(b.y<-20) bullets.current.splice(i,1);
      }

      // spawn enemies
      if(frameRef.current%getSpawnInterval(level)===0){
        const w=28+Math.floor(Math.random()*20);
        enemies.current.push({x:Math.random()*(canvas.width-w-8)+4,y:-40,w,h:w,hp:1+Math.floor(level/3)});
      }

      // enemies
      for(let i=enemies.current.length-1;i>=0;i--){
        const e=enemies.current[i];
        e.y+=getEnemySpeed(level);
        drawEnemy(ctx,e.x,e.y,e.w,e.h,e.hp);

        // collision with player
        if(e.y+e.h>player.current.y+8 && e.x<player.current.x+player.current.w-6 && e.x+e.w>player.current.x+6){
          explodeAt(e.x+e.w/2,e.y+e.h/2);
          setGameOver(true);
        }

        // collision with bullets
        for(let bi=bullets.current.length-1;bi>=0;bi--){
          const b=bullets.current[bi];
          if(b.x<e.x+e.w && b.x+4>e.x && b.y<e.y+e.h && b.y+10>e.y){
            bullets.current.splice(bi,1);
            e.hp-=1;
            if(e.hp<=0){
              explodeAt(e.x+e.w/2,e.y+e.h/2);
              enemies.current.splice(i,1);
              setScore((s)=>{
                const ns=s+10*level;
                const targetLevel=Math.floor(ns/100)+1;
                if(targetLevel!==level) setLevel(targetLevel);
                try{
                  const hs=Number(localStorage.getItem("space_shooter_highscore")||0);
                  if(ns>hs){
                    localStorage.setItem("space_shooter_highscore",String(ns));
                    setHighscore(ns);
                  }
                }catch{}
                return ns;
              });
            }
            break;
          }
        }
        if(e.y>canvas.height+60) enemies.current.splice(i,1);
      }

      // particles
      for(let i=particles.current.length-1;i>=0;i--){
        const p=particles.current[i];
        p.x+=p.vx;
        p.y+=p.vy;
        p.vy+=0.12;
        p.life-=1;
        ctx.globalAlpha=Math.max(0,p.life/40);
        ctx.fillStyle=p.color;
        ctx.beginPath();
        ctx.arc(p.x,p.y,2.5,0,Math.PI*2);
        ctx.fill();
        ctx.globalAlpha=1;
        if(p.life<=0) particles.current.splice(i,1);
      }

      // HUD
      ctx.fillStyle="rgba(255,255,255,0.95)";
      ctx.font="16px ui-sans-serif, system-ui";
      ctx.fillText(`Score: ${score}`,12,22);
      ctx.fillText(`High: ${highscore}`,12,42);
      ctx.fillText(`Level: ${level}`,canvas.width-90,22);

      if(gameOver){
        ctx.fillStyle="rgba(0,0,0,0.6)";
        ctx.fillRect(0,canvas.height/2-60,canvas.width,120);
        ctx.fillStyle="#fff";
        ctx.font="28px ui-sans-serif, system-ui";
        ctx.fillText("GAME OVER",canvas.width/2-90,canvas.height/2-10);
        ctx.font="16px ui-sans-serif, system-ui";
        ctx.fillText("Press Restart",canvas.width/2-70,canvas.height/2+20);
      }

      frameRef.current++;
      raf=requestAnimationFrame(loop);
    }

    function explodeAt(x:number,y:number){
      const colors=["#ff6b6b","#ff9f43","#6ee7b7","#facc15"];
      for(let i=0;i<25;i++){
        particles.current.push({
          x:x+(Math.random()-0.5)*8,
          y:y+(Math.random()-0.5)*8,
          vx:(Math.random()-0.5)*5,
          vy:(Math.random()-1.5)*5,
          life:30+Math.random()*20,
          color:colors[Math.floor(Math.random()*colors.length)]
        });
      }
    }

    function drawShip(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number){
      ctx.save();
      ctx.translate(x+w/2,y+h/2);
      ctx.beginPath();
      ctx.moveTo(-w/2+6,h/2-6);
      ctx.quadraticCurveTo(0,-h/1.6,w/2-6,h/2-6);
      ctx.closePath();
      ctx.fillStyle="#6ee7b7";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0,-4,8,0,Math.PI*2);
      ctx.fillStyle="rgba(255,255,255,0.95)";
      ctx.fill();
      ctx.restore();
    }

    function drawEnemy(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,hp:number){
      ctx.save();
      ctx.beginPath();
      const r=Math.min(12,w/4);
      roundRect(ctx,x,y,w,h,r);
      ctx.fillStyle=hp>1?"#ff6b6b":"#ff4d6d";
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle="rgba(0,0,0,0.8)";
      ctx.arc(x+w/2,y+h/2-2,Math.max(3,w/10),0,Math.PI*2);
      ctx.fill();
      ctx.restore();
    }

    function roundRect(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,r:number){
      ctx.moveTo(x+r,y);
      ctx.arcTo(x+w,y,x+w,y+h,r);
      ctx.arcTo(x+w,y+h,x,y+h,r);
      ctx.arcTo(x,y+h,x,y,r);
      ctx.arcTo(x,y,x+r,y,r);
    }

    loop();

    return ()=>{cancelAnimationFrame(raf); window.removeEventListener("resize",resize);}
  },[paused,gameOver,level,dark]);

  function restart(){
    bullets.current=[];
    enemies.current=[];
    particles.current=[];
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setPaused(false);
  }
  function togglePause(){ if(!gameOver) setPaused(p=>!p); }

  // Mobile buttons
  const handleTouchMove=(dir:"left"|"right",start:boolean)=>{keys.current[dir==="left"?"ArrowLeft":"ArrowRight"]=start;}
  const handleShoot=(start:boolean)=>{keys.current["shoot"]=start;}

  return (
    <div className="w-full h-screen overflow-hidden relative bg-gray-900 dark:bg-black">
      <canvas ref={canvasRef} className="w-full h-full block"/>
      
      {/* Floating buttons */}
      <motion.button
        onTouchStart={()=>handleTouchMove("left",true)}
        onTouchEnd={()=>handleTouchMove("left",false)}
        className="absolute bottom-8 left-6 w-20 h-20 rounded-full bg-indigo-600 text-white text-2xl flex items-center justify-center shadow-xl"
        whileTap={{scale:0.9}}
      >◀</motion.button>
      <motion.button
        onTouchStart={()=>handleShoot(true)}
        onTouchEnd={()=>handleShoot(false)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-yellow-400 text-black text-3xl flex items-center justify-center shadow-xl"
        whileTap={{scale:0.9}}
      >🔫</motion.button>
      <motion.button
        onTouchStart={()=>handleTouchMove("right",true)}
        onTouchEnd={()=>handleTouchMove("right",false)}
        className="absolute bottom-8 right-6 w-20 h-20 rounded-full bg-indigo-600 text-white text-2xl flex items-center justify-center shadow-xl"
        whileTap={{scale:0.9}}
      >▶</motion.button>

      {/* Top UI */}
      <div className="absolute top-4 left-4 flex gap-2">
        <button onClick={()=>setDark(d=>!d)} className="bg-gray-800 px-3 py-1 rounded-lg">{dark?"Dark":"Light"}</button>
        <button onClick={togglePause} className="bg-blue-600 px-3 py-1 rounded-lg">{paused?"Resume":"Pause"}</button>
        <button onClick={restart} className="bg-gray-700 px-3 py-1 rounded-lg">Restart</button>
      </div>

      {/* Score */}
      <div className="absolute top-4 right-4 text-white text-sm text-right">
        <div>Score: {score}</div>
        <div>High: {highscore}</div>
        <div>Level: {level}</div>
      </div>
    </div>
  );
}



// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// export default function MobileSpaceShooter() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [score, setScore] = useState(0);
//   const [highscore, setHighscore] = useState<number>(() => {
//     try {
//       return Number(localStorage.getItem("space_shooter_highscore") || 0);
//     } catch {
//       return 0;
//     }
//   });
//   const [gameOver, setGameOver] = useState(false);
//   const [paused, setPaused] = useState(false);
//   const [level, setLevel] = useState(1);
//   const [dark, setDark] = useState(false);

//   const player = useRef({ x: 0, y: 0, w: 44, h: 44 });
//   const bullets = useRef<{ x: number; y: number; vy: number }[]>([]);
//   const enemies = useRef<{ x: number; y: number; w: number; h: number; hp: number }[]>([]);
//   const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number }[]>([]);
//   const keys = useRef<{ [k: string]: boolean }>({});
//   const frameRef = useRef(0);
//   const lastShot = useRef(0);

//   const getEnemySpeed = (lvl: number) => 1.0 + lvl * 0.35;
//   const getSpawnInterval = (lvl: number) => Math.max(30 - lvl * 3, 12);
//   const getFireRate = (lvl: number) => Math.max(80, 200 - lvl * 10);

//   useEffect(() => {
//     if (dark) document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//   }, [dark]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d")!;

//     function resize() {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight * 0.85;
//       player.current.y = canvas.height - 80;
//       player.current.x = canvas.width / 2 - player.current.w / 2;
//     }
//     resize();
//     window.addEventListener("resize", resize);

//     const onKeyDown = (e: KeyboardEvent) => {
//       keys.current[e.key] = true;
//       if (e.key === " ") e.preventDefault();
//     };
//     const onKeyUp = (e: KeyboardEvent) => (keys.current[e.key] = false);
//     window.addEventListener("keydown", onKeyDown);
//     window.addEventListener("keyup", onKeyUp);

//     let raf = 0;
//     function loop() {
//       if (paused) {
//         raf = requestAnimationFrame(loop);
//         return;
//       }
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Background gradient
//       const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
//       if (dark) {
//         g.addColorStop(0, "#050014");
//         g.addColorStop(1, "#0b1020");
//       } else {
//         g.addColorStop(0, "#001f3f");
//         g.addColorStop(1, "#001b2e");
//       }
//       ctx.fillStyle = g;
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Stars
//       for (let i = 0; i < 60; i++) {
//         const sx = (i * 47 + frameRef.current * 0.3) % canvas.width;
//         const sy = ((i * 97) % canvas.height) * 0.7 + 20;
//         ctx.globalAlpha = 0.7;
//         ctx.fillStyle = "rgba(255,255,255,0.6)";
//         ctx.fillRect(sx, sy, 1.2, 1.2);
//         ctx.globalAlpha = 1;
//       }

//       // Player movement
//       if (keys.current["ArrowLeft"] || keys.current["a"]) player.current.x -= 6;
//       if (keys.current["ArrowRight"] || keys.current["d"]) player.current.x += 6;
//       player.current.x = Math.max(6, Math.min(canvas.width - player.current.w - 6, player.current.x));

//       // Shooting
//       const now = performance.now();
//       if ((keys.current[" "] || keys.current["k"] || keys.current["shoot"]) && now - lastShot.current > getFireRate(level)) {
//         bullets.current.push({ x: player.current.x + player.current.w / 2 - 2, y: player.current.y, vy: -10 });
//         lastShot.current = now;
//       }

//       drawShip(ctx, player.current.x, player.current.y, player.current.w, player.current.h);

//       // Update bullets
//       for (let i = bullets.current.length - 1; i >= 0; i--) {
//         const b = bullets.current[i];
//         b.y += b.vy;
//         ctx.fillStyle = "#ffec6b";
//         ctx.fillRect(b.x, b.y, 4, 10);
//         if (b.y < -20) bullets.current.splice(i, 1);
//       }

//       // Spawn enemies
//       if (frameRef.current % getSpawnInterval(level) === 0) {
//         const w = 28 + Math.floor(Math.random() * 20);
//         enemies.current.push({ x: Math.random() * (canvas.width - w - 8) + 4, y: -40, w, h: w, hp: 1 + Math.floor(level / 3) });
//       }

//       // Update enemies
//       for (let i = enemies.current.length - 1; i >= 0; i--) {
//         const e = enemies.current[i];
//         e.y += getEnemySpeed(level);
//         drawEnemy(ctx, e.x, e.y, e.w, e.h, e.hp);

//         // Collision with player
//         if (e.y + e.h > player.current.y + 8 && e.x < player.current.x + player.current.w - 6 && e.x + e.w > player.current.x + 6) {
//           explodeAt(e.x + e.w / 2, e.y + e.h / 2);
//           setGameOver(true);
//         }

//         // Collision with bullets
//         for (let bi = bullets.current.length - 1; bi >= 0; bi--) {
//           const b = bullets.current[bi];
//           if (b.x < e.x + e.w && b.x + 4 > e.x && b.y < e.y + e.h && b.y + 10 > e.y) {
//             bullets.current.splice(bi, 1);
//             e.hp -= 1;
//             if (e.hp <= 0) {
//               explodeAt(e.x + e.w / 2, e.y + e.h / 2);
//               enemies.current.splice(i, 1);
//               setScore((s) => {
//                 const ns = s + 10 * level;
//                 const targetLevel = Math.floor(ns / 100) + 1;
//                 if (targetLevel !== level) setLevel(targetLevel);
//                 try {
//                   const hs = Number(localStorage.getItem("space_shooter_highscore") || 0);
//                   if (ns > hs) {
//                     localStorage.setItem("space_shooter_highscore", String(ns));
//                     setHighscore(ns);
//                   }
//                 } catch {}
//                 return ns;
//               });
//             }
//             break;
//           }
//         }
//         if (e.y > canvas.height + 60) enemies.current.splice(i, 1);
//       }

//       // Particles
//       for (let i = particles.current.length - 1; i >= 0; i--) {
//         const p = particles.current[i];
//         p.x += p.vx;
//         p.y += p.vy;
//         p.vy += 0.12;
//         p.life -= 1;
//         ctx.globalAlpha = Math.max(0, p.life / 40);
//         ctx.fillStyle = "#ff9f43";
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.globalAlpha = 1;
//         if (p.life <= 0) particles.current.splice(i, 1);
//       }

//       // HUD
//       ctx.fillStyle = "rgba(255,255,255,0.95)";
//       ctx.font = "14px ui-sans-serif, system-ui";
//       ctx.fillText(`Score: ${score}`, 12, 22);
//       ctx.fillText(`High: ${highscore}`, 12, 40);
//       ctx.fillText(`Level: ${level}`, canvas.width - 90, 22);

//       if (gameOver) {
//         ctx.fillStyle = "rgba(0,0,0,0.6)";
//         ctx.fillRect(0, canvas.height / 2 - 60, canvas.width, 120);
//         ctx.fillStyle = "#fff";
//         ctx.font = "28px ui-sans-serif, system-ui";
//         ctx.fillText("GAME OVER", canvas.width / 2 - 90, canvas.height / 2 - 10);
//         ctx.font = "16px ui-sans-serif, system-ui";
//         ctx.fillText("Press Restart", canvas.width / 2 - 70, canvas.height / 2 + 20);
//       }

//       frameRef.current++;
//       raf = requestAnimationFrame(loop);
//     }

//     function explodeAt(x: number, y: number) {
//       for (let i = 0; i < 22; i++) {
//         particles.current.push({
//           x: x + (Math.random() - 0.5) * 8,
//           y: y + (Math.random() - 0.5) * 8,
//           vx: (Math.random() - 0.5) * 5,
//           vy: (Math.random() - 1.5) * 5,
//           life: 30 + Math.random() * 20,
//         });
//       }
//     }

//     function drawShip(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
//       ctx.save();
//       ctx.translate(x + w / 2, y + h / 2);
//       ctx.beginPath();
//       ctx.moveTo(-w / 2 + 6, h / 2 - 6);
//       ctx.quadraticCurveTo(0, -h / 1.6, w / 2 - 6, h / 2 - 6);
//       ctx.closePath();
//       ctx.fillStyle = "#6ee7b7";
//       ctx.fill();
//       ctx.beginPath();
//       ctx.arc(0, -4, 8, 0, Math.PI * 2);
//       ctx.fillStyle = "rgba(255,255,255,0.95)";
//       ctx.fill();
//       ctx.restore();
//     }

//     function drawEnemy(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, hp: number) {
//       ctx.save();
//       ctx.beginPath();
//       const r = Math.min(12, w / 4);
//       roundRect(ctx, x, y, w, h, r);
//       ctx.fillStyle = hp > 1 ? "#ff6b6b" : "#ff4d6d";
//       ctx.fill();
//       ctx.beginPath();
//       ctx.fillStyle = "rgba(0,0,0,0.8)";
//       ctx.arc(x + w / 2, y + h / 2 - 2, Math.max(3, w / 10), 0, Math.PI * 2);
//       ctx.fill();
//       ctx.restore();
//     }

//     function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
//       ctx.moveTo(x + r, y);
//       ctx.arcTo(x + w, y, x + w, y + h, r);
//       ctx.arcTo(x + w, y + h, x, y + h, r);
//       ctx.arcTo(x, y + h, x, y, r);
//       ctx.arcTo(x, y, x + w, y, r);
//     }

//     loop();

//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("keydown", onKeyDown);
//       window.removeEventListener("keyup", onKeyUp);
//       window.removeEventListener("resize", resize);
//     };
//   }, [paused, gameOver, level, dark]);

//   function restart() {
//     bullets.current = [];
//     enemies.current = [];
//     particles.current = [];
//     setScore(0);
//     setLevel(1);
//     setGameOver(false);
//     setPaused(false);
//   }

//   function togglePause() {
//     if (!gameOver) setPaused((p) => !p);
//   }

//   // Mobile touch buttons
//   const handleTouchMove = (dir: "left" | "right", start: boolean) => {
//     keys.current[dir === "left" ? "ArrowLeft" : "ArrowRight"] = start;
//   };
//   const handleShoot = (start: boolean) => {
//     keys.current["shoot"] = start;
//   };

//   return (
//     <div className="w-full h-screen overflow-hidden relative bg-gray-900 dark:bg-black">
//       <canvas ref={canvasRef} className="w-full h-full block" />

//       {/* UI buttons */}
//       <div className="absolute bottom-4 w-full flex justify-between px-4">
//         <button
//           onTouchStart={() => handleTouchMove("left", true)}
//           onTouchEnd={() => handleTouchMove("left", false)}
//           className="bg-indigo-600 text-white px-6 py-4 rounded-lg"
//         >
//           ◀
//         </button>
//         <button
//           onTouchStart={() => handleShoot(true)}
//           onTouchEnd={() => handleShoot(false)}
//           className="bg-yellow-400 text-black px-6 py-4 rounded-lg"
//         >
//           🔫
//         </button>
//         <button
//           onTouchStart={() => handleTouchMove("right", true)}
//           onTouchEnd={() => handleTouchMove("right", false)}
//           className="bg-indigo-600 text-white px-6 py-4 rounded-lg"
//         >
//           ▶
//         </button>
//       </div>

//       {/* Top UI */}
//       <div className="absolute top-4 left-4 text-white space-x-4">
//         <button onClick={() => setDark((d) => !d)} className="bg-gray-800 px-3 py-1 rounded-lg">
//           {dark ? "Dark" : "Light"}
//         </button>
//         <button onClick={togglePause} className="bg-blue-600 px-3 py-1 rounded-lg">
//           {paused ? "Resume" : "Pause"}
//         </button>
//         <button onClick={restart} className="bg-gray-700 px-3 py-1 rounded-lg">
//           Restart
//         </button>
//       </div>

//       {/* Score display */}
//       <div className="absolute top-4 right-4 text-white text-sm">
//         <div>Score: {score}</div>
//         <div>High: {highscore}</div>
//         <div>Level: {level}</div>
//       </div>
//     </div>
//   );
// }





// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// export default function SpaceShooter() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [score, setScore] = useState(0);
//   const [highscore, setHighscore] = useState<number>(() => {
//     try {
//       return Number(localStorage.getItem("space_shooter_highscore") || 0);
//     } catch {
//       return 0;
//     }
//   });
//   const [gameOver, setGameOver] = useState(false);
//   const [paused, setPaused] = useState(false);
//   const [level, setLevel] = useState(1);
//   const [dark, setDark] = useState(false);

//   const player = useRef({ x: 200, y: 0, w: 44, h: 44 });
//   const bullets = useRef<{ x: number; y: number; vy: number }[]>([]);
//   const enemies = useRef<{ x: number; y: number; w: number; h: number; hp: number }[]>([]);
//   const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number }[]>([]);
//   const keys = useRef<{ [k: string]: boolean }>({});
//   const frameRef = useRef(0);
//   const lastShot = useRef(0);

//   const getEnemySpeed = (lvl: number) => 1.0 + lvl * 0.35;
//   const getSpawnInterval = (lvl: number) => Math.max(30 - lvl * 3, 12);
//   const getFireRate = (lvl: number) => Math.max(80, 200 - lvl * 10);

//   useEffect(() => {
//     if (dark) document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//   }, [dark]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d")!;

//     function resize() {
//       const rect = canvas.getBoundingClientRect();
//       canvas.width = Math.max(320, Math.floor(rect.width));
//       canvas.height = Math.max(400, Math.floor(rect.height));
//       player.current.y = canvas.height - 80;
//       player.current.x = canvas.width / 2 - player.current.w / 2;
//     }
//     resize();
//     const ro = new ResizeObserver(resize);
//     ro.observe(canvas);

//     const onKeyDown = (e: KeyboardEvent) => {
//       keys.current[e.key] = true;
//       if (e.key === " ") e.preventDefault(); // only " " for space
//     };
//     const onKeyUp = (e: KeyboardEvent) => (keys.current[e.key] = false);
//     window.addEventListener("keydown", onKeyDown);
//     window.addEventListener("keyup", onKeyUp);

//     // Mouse click for left/right movement
//     canvas.addEventListener("mousedown", (e) => {
//       const rect = canvas.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       if (x < canvas.width / 2) keys.current["ArrowLeft"] = true;
//       else keys.current["ArrowRight"] = true;
//     });
//     canvas.addEventListener("mouseup", () => {
//       keys.current["ArrowLeft"] = false;
//       keys.current["ArrowRight"] = false;
//     });

//     // Touch control for mobile
//     canvas.addEventListener("touchstart", (ev) => {
//       const t = ev.touches[0];
//       const rect = canvas.getBoundingClientRect();
//       const x = t.clientX - rect.left;
//       if (x < canvas.width / 2) keys.current["ArrowLeft"] = true;
//       else keys.current["ArrowRight"] = true;

//       keys.current["mobileShoot"] = true; // continuous shooting
//     });
//     canvas.addEventListener("touchend", () => {
//       keys.current["ArrowLeft"] = false;
//       keys.current["ArrowRight"] = false;
//       keys.current["mobileShoot"] = false;
//     });

//     let raf = 0;
//     function loop() {
//       if (paused) {
//         raf = requestAnimationFrame(loop);
//         return;
//       }
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Background gradient
//       const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
//       if (dark) {
//         g.addColorStop(0, "#050014");
//         g.addColorStop(1, "#0b1020");
//       } else {
//         g.addColorStop(0, "#001f3f");
//         g.addColorStop(1, "#001b2e");
//       }
//       ctx.fillStyle = g;
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Stars
//       for (let i = 0; i < 60; i++) {
//         const sx = (i * 47 + frameRef.current * 0.3) % canvas.width;
//         const sy = ((i * 97) % canvas.height) * 0.7 + 20;
//         ctx.globalAlpha = 0.7;
//         ctx.fillStyle = "rgba(255,255,255,0.6)";
//         ctx.fillRect(sx, sy, 1.2, 1.2);
//         ctx.globalAlpha = 1;
//       }

//       // Player movement
//       if (keys.current["ArrowLeft"] || keys.current["a"]) player.current.x -= 6;
//       if (keys.current["ArrowRight"] || keys.current["d"]) player.current.x += 6;
//       player.current.x = Math.max(6, Math.min(canvas.width - player.current.w - 6, player.current.x));

//       // Shooting (keyboard & mobile)
//       const now = performance.now();
//       if ((keys.current[" "] || keys.current["k"] || keys.current["mobileShoot"]) && now - lastShot.current > getFireRate(level)) {
//         bullets.current.push({
//           x: player.current.x + player.current.w / 2 - 2,
//           y: player.current.y,
//           vy: -10,
//         });
//         lastShot.current = now;
//       }

//       drawShip(ctx, player.current.x, player.current.y, player.current.w, player.current.h);

//       // Update bullets
//       for (let i = bullets.current.length - 1; i >= 0; i--) {
//         const b = bullets.current[i];
//         b.y += b.vy;
//         ctx.fillStyle = "#ffec6b";
//         ctx.fillRect(b.x, b.y, 4, 10);
//         if (b.y < -20) bullets.current.splice(i, 1);
//       }

//       // Spawn enemies
//       if (frameRef.current % getSpawnInterval(level) === 0) {
//         const w = 28 + Math.floor(Math.random() * 20);
//         enemies.current.push({ x: Math.random() * (canvas.width - w - 8) + 4, y: -40, w, h: w, hp: 1 + Math.floor(level / 3) });
//       }

//       // Update enemies
//       for (let i = enemies.current.length - 1; i >= 0; i--) {
//         const e = enemies.current[i];
//         e.y += getEnemySpeed(level);
//         drawEnemy(ctx, e.x, e.y, e.w, e.h, e.hp);

//         // Collision with player
//         if (e.y + e.h > player.current.y + 8 && e.x < player.current.x + player.current.w - 6 && e.x + e.w > player.current.x + 6) {
//           explodeAt(e.x + e.w / 2, e.y + e.h / 2);
//           setGameOver(true);
//         }

//         // Collision with bullets
//         for (let bi = bullets.current.length - 1; bi >= 0; bi--) {
//           const b = bullets.current[bi];
//           if (b.x < e.x + e.w && b.x + 4 > e.x && b.y < e.y + e.h && b.y + 10 > e.y) {
//             bullets.current.splice(bi, 1);
//             e.hp -= 1;
//             if (e.hp <= 0) {
//               explodeAt(e.x + e.w / 2, e.y + e.h / 2);
//               enemies.current.splice(i, 1);
//               setScore((s) => {
//                 const ns = s + 10 * level;
//                 const targetLevel = Math.floor(ns / 100) + 1;
//                 if (targetLevel !== level) setLevel(targetLevel);
//                 try {
//                   const hs = Number(localStorage.getItem("space_shooter_highscore") || 0);
//                   if (ns > hs) {
//                     localStorage.setItem("space_shooter_highscore", String(ns));
//                     setHighscore(ns);
//                   }
//                 } catch {}
//                 return ns;
//               });
//             }
//             break;
//           }
//         }
//         if (e.y > canvas.height + 60) enemies.current.splice(i, 1);
//       }

//       // Particles
//       for (let i = particles.current.length - 1; i >= 0; i--) {
//         const p = particles.current[i];
//         p.x += p.vx;
//         p.y += p.vy;
//         p.vy += 0.12;
//         p.life -= 1;
//         ctx.globalAlpha = Math.max(0, p.life / 40);
//         ctx.fillStyle = "#ff9f43";
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.globalAlpha = 1;
//         if (p.life <= 0) particles.current.splice(i, 1);
//       }

//       // HUD
//       ctx.fillStyle = "rgba(255,255,255,0.95)";
//       ctx.font = "14px ui-sans-serif, system-ui";
//       ctx.fillText(`Score: ${score}`, 12, 22);
//       ctx.fillText(`High: ${highscore}`, 12, 40);
//       ctx.fillText(`Level: ${level}`, canvas.width - 90, 22);

//       // Game over overlay
//       if (gameOver) {
//         ctx.fillStyle = "rgba(0,0,0,0.6)";
//         ctx.fillRect(0, canvas.height / 2 - 60, canvas.width, 120);
//         ctx.fillStyle = "#fff";
//         ctx.font = "28px ui-sans-serif, system-ui";
//         ctx.fillText("GAME OVER", canvas.width / 2 - 90, canvas.height / 2 - 10);
//         ctx.font = "16px ui-sans-serif, system-ui";
//         ctx.fillText("Press Restart", canvas.width / 2 - 70, canvas.height / 2 + 20);
//       }

//       frameRef.current++;
//       raf = requestAnimationFrame(loop);
//     }

//     function explodeAt(x: number, y: number) {
//       for (let i = 0; i < 22; i++) {
//         particles.current.push({
//           x: x + (Math.random() - 0.5) * 8,
//           y: y + (Math.random() - 0.5) * 8,
//           vx: (Math.random() - 0.5) * 5,
//           vy: (Math.random() - 1.5) * 5,
//           life: 30 + Math.random() * 20,
//         });
//       }
//     }

//     function drawShip(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
//       ctx.save();
//       ctx.translate(x + w / 2, y + h / 2);
//       ctx.beginPath();
//       ctx.moveTo(-w / 2 + 6, h / 2 - 6);
//       ctx.quadraticCurveTo(0, -h / 1.6, w / 2 - 6, h / 2 - 6);
//       ctx.closePath();
//       ctx.fillStyle = "#6ee7b7";
//       ctx.fill();
//       ctx.beginPath();
//       ctx.arc(0, -4, 8, 0, Math.PI * 2);
//       ctx.fillStyle = "rgba(255,255,255,0.95)";
//       ctx.fill();
//       ctx.restore();
//     }

//     function drawEnemy(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, hp: number) {
//       ctx.save();
//       ctx.beginPath();
//       const r = Math.min(12, w / 4);
//       roundRect(ctx, x, y, w, h, r);
//       ctx.fillStyle = hp > 1 ? "#ff6b6b" : "#ff4d6d";
//       ctx.fill();
//       ctx.beginPath();
//       ctx.fillStyle = "rgba(0,0,0,0.8)";
//       ctx.arc(x + w / 2, y + h / 2 - 2, Math.max(3, w / 10), 0, Math.PI * 2);
//       ctx.fill();
//       ctx.restore();
//     }

//     function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
//       ctx.moveTo(x + r, y);
//       ctx.arcTo(x + w, y, x + w, y + h, r);
//       ctx.arcTo(x + w, y + h, x, y + h, r);
//       ctx.arcTo(x, y + h, x, y, r);
//       ctx.arcTo(x, y, x + w, y, r);
//     }

//     loop();

//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("keydown", onKeyDown);
//       window.removeEventListener("keyup", onKeyUp);
//       ro.disconnect();
//     };
//   }, [paused, gameOver, level, dark]);

//   function restart() {
//     bullets.current = [];
//     enemies.current = [];
//     particles.current = [];
//     setScore(0);
//     setLevel(1);
//     setGameOver(false);
//     setPaused(false);
//   }

//   function togglePause() {
//     if (!gameOver) setPaused((p) => !p);
//   }

//   return (
//     <div className="w-full max-w-3xl mx-auto p-4">
//       <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">🚀 Space Shooter</h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400">Responsive canvas game with levels, explosions, and local highscore.</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button onClick={() => setDark((d) => !d)} className="px-3 py-1 rounded-lg border text-sm border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
//               {dark ? "Dark" : "Light"}
//             </button>
//             <button onClick={togglePause} className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm shadow">{paused ? "Resume" : "Pause"}</button>
//             <button onClick={restart} className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">Restart</button>
//           </div>
//         </div>

//         <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="col-span-2">
//             <div className="w-full h-96 bg-gradient-to-b from-transparent to-black rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
//               <canvas ref={canvasRef} className="w-full h-full block" />
//             </div>
//           </div>

//           <div className="space-y-3">
//             <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
//                   <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{score}</div>
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">Highscore</div>
//                   <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{highscore}</div>
//                 </div>
//               </div>
//             </div>

//             <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300">
//               <div className="mb-2 font-semibold">Controls</div>
//               <ul className="list-disc list-inside space-y-1">
//                 <li>Arrow keys / A D — move</li>
//                 <li>Space / K — shoot</li>
//                 <li>Touch left / right to move and hold to shoot</li>
//               </ul>
//             </div>

//             <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-sm">
//               <div className="mb-2 font-semibold">Game Info</div>
//               <div>Level: <strong>{level}</strong></div>
//               <div>Enemies get faster and spawn quicker as level increases.</div>
//               <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Highscore saved in <code>localStorage</code>.</div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
//           <div>Made with ❤️ — drop this file in a Next.js page.</div>
//           <div>Tip: increase canvas height for more play area.</div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// export default function SpaceShooter() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [score, setScore] = useState(0);
//   const [highscore, setHighscore] = useState<number>(() => {
//     try {
//       return Number(localStorage.getItem("space_shooter_highscore") || 0);
//     } catch {
//       return 0;
//     }
//   });
//   const [gameOver, setGameOver] = useState(false);
//   const [paused, setPaused] = useState(false);
//   const [level, setLevel] = useState(1);
//   const [dark, setDark] = useState(false);

//   const player = useRef({ x: 200, y: 0, w: 44, h: 44 });
//   const bullets = useRef<{ x: number; y: number; vy: number }[]>([]);
//   const enemies = useRef<{ x: number; y: number; w: number; h: number; hp: number }[]>([]);
//   const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number }[]>([]);
//   const keys = useRef<{ [k: string]: boolean }>({});
//   const frameRef = useRef(0);
//   const lastShot = useRef(0);

//   const getEnemySpeed = (lvl: number) => 1.0 + lvl * 0.35;
//   const getSpawnInterval = (lvl: number) => Math.max(30 - lvl * 3, 12);
//   const getFireRate = (lvl: number) => Math.max(80, 200 - lvl * 10);

//   useEffect(() => {
//     if (dark) document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//   }, [dark]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d")!;

//     function resize() {
//       const rect = canvas.getBoundingClientRect();
//       canvas.width = Math.max(320, Math.floor(rect.width));
//       canvas.height = Math.max(400, Math.floor(rect.height));
//       player.current.y = canvas.height - 80;
//       player.current.x = canvas.width / 2 - player.current.w / 2;
//     }
//     resize();
//     const ro = new ResizeObserver(resize);
//     ro.observe(canvas);

//     const onKeyDown = (e: KeyboardEvent) => {
//       keys.current[e.key] = true;
//       if (e.key === " " || e.key === "Spacebar") e.preventDefault();
//     };
//     const onKeyUp = (e: KeyboardEvent) => (keys.current[e.key] = false);
//     window.addEventListener("keydown", onKeyDown);
//     window.addEventListener("keyup", onKeyUp);

//     canvas.addEventListener("mousedown", (e) => {
//       const rect = canvas.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       if (x < canvas.width / 2) keys.current["ArrowLeft"] = true;
//       else keys.current["ArrowRight"] = true;
//     });
//     canvas.addEventListener("mouseup", () => {
//       keys.current["ArrowLeft"] = false;
//       keys.current["ArrowRight"] = false;
//     });

//     canvas.addEventListener("touchstart", (ev) => {
//       const t = ev.touches[0];
//       const rect = canvas.getBoundingClientRect();
//       const x = t.clientX - rect.left;
//       if (x < canvas.width / 2) keys.current["ArrowLeft"] = true;
//       else keys.current["ArrowRight"] = true;
//       bullets.current.push({ x: player.current.x + player.current.w / 2 - 2, y: player.current.y, vy: -8 });
//     });
//     canvas.addEventListener("touchend", () => {
//       keys.current["ArrowLeft"] = false;
//       keys.current["ArrowRight"] = false;
//     });

//     let raf = 0;
//     function loop() {
//       if (paused) {
//         raf = requestAnimationFrame(loop);
//         return;
//       }
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
//       if (dark) {
//         g.addColorStop(0, "#050014");
//         g.addColorStop(1, "#0b1020");
//       } else {
//         g.addColorStop(0, "#001f3f");
//         g.addColorStop(1, "#001b2e");
//       }
//       ctx.fillStyle = g;
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       for (let i = 0; i < 60; i++) {
//         const sx = (i * 47 + frameRef.current * 0.3) % canvas.width;
//         const sy = ((i * 97) % canvas.height) * 0.7 + 20;
//         ctx.globalAlpha = 0.7;
//         ctx.fillStyle = "rgba(255,255,255,0.6)";
//         ctx.fillRect(sx, sy, 1.2, 1.2);
//         ctx.globalAlpha = 1;
//       }

//       if (keys.current["ArrowLeft"] || keys.current["a"]) player.current.x -= 6;
//       if (keys.current["ArrowRight"] || keys.current["d"]) player.current.x += 6;
//       player.current.x = Math.max(6, Math.min(canvas.width - player.current.w - 6, player.current.x));

//       const now = performance.now();
//       if ((keys.current[" "] || keys.current["Spacebar"] || keys.current["k"]) && now - lastShot.current > getFireRate(level)) {
//         bullets.current.push({ x: player.current.x + player.current.w / 2 - 2, y: player.current.y, vy: -10 });
//         lastShot.current = now;
//       }

//       drawShip(ctx, player.current.x, player.current.y, player.current.w, player.current.h);

//       for (let i = bullets.current.length - 1; i >= 0; i--) {
//         const b = bullets.current[i];
//         b.y += b.vy;
//         ctx.fillStyle = "#ffec6b";
//         ctx.fillRect(b.x, b.y, 4, 10);
//         if (b.y < -20) bullets.current.splice(i, 1);
//       }

//       if (frameRef.current % getSpawnInterval(level) === 0) {
//         const w = 28 + Math.floor(Math.random() * 20);
//         enemies.current.push({ x: Math.random() * (canvas.width - w - 8) + 4, y: -40, w, h: w, hp: 1 + Math.floor(level / 3) });
//       }

//       for (let i = enemies.current.length - 1; i >= 0; i--) {
//         const e = enemies.current[i];
//         e.y += getEnemySpeed(level);
//         drawEnemy(ctx, e.x, e.y, e.w, e.h, e.hp);

//         if (e.y + e.h > player.current.y + 8 && e.x < player.current.x + player.current.w - 6 && e.x + e.w > player.current.x + 6) {
//           explodeAt(e.x + e.w / 2, e.y + e.h / 2);
//           setGameOver(true);
//         }

//         for (let bi = bullets.current.length - 1; bi >= 0; bi--) {
//           const b = bullets.current[bi];
//           if (b.x < e.x + e.w && b.x + 4 > e.x && b.y < e.y + e.h && b.y + 10 > e.y) {
//             bullets.current.splice(bi, 1);
//             e.hp -= 1;
//             if (e.hp <= 0) {
//               explodeAt(e.x + e.w / 2, e.y + e.h / 2);
//               enemies.current.splice(i, 1);
//               setScore((s) => {
//                 const ns = s + 10 * level;
//                 const targetLevel = Math.floor(ns / 100) + 1;
//                 if (targetLevel !== level) setLevel(targetLevel);
//                 try {
//                   const hs = Number(localStorage.getItem("space_shooter_highscore") || 0);
//                   if (ns > hs) {
//                     localStorage.setItem("space_shooter_highscore", String(ns));
//                     setHighscore(ns);
//                   }
//                 } catch {}
//                 return ns;
//               });
//             }
//             break;
//           }
//         }
//         if (e.y > canvas.height + 60) enemies.current.splice(i, 1);
//       }

//       for (let i = particles.current.length - 1; i >= 0; i--) {
//         const p = particles.current[i];
//         p.x += p.vx;
//         p.y += p.vy;
//         p.vy += 0.12;
//         p.life -= 1;
//         ctx.globalAlpha = Math.max(0, p.life / 40);
//         ctx.fillStyle = "#ff9f43";
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.globalAlpha = 1;
//         if (p.life <= 0) particles.current.splice(i, 1);
//       }

//       ctx.fillStyle = "rgba(255,255,255,0.95)";
//       ctx.font = "14px ui-sans-serif, system-ui";
//       ctx.fillText(`Score: ${score}`, 12, 22);
//       ctx.fillText(`High: ${highscore}`, 12, 40);
//       ctx.fillText(`Level: ${level}`, canvas.width - 90, 22);

//       if (gameOver) {
//         ctx.fillStyle = "rgba(0,0,0,0.6)";
//         ctx.fillRect(0, canvas.height / 2 - 60, canvas.width, 120);
//         ctx.fillStyle = "#fff";
//         ctx.font = "28px ui-sans-serif, system-ui";
//         ctx.fillText("GAME OVER", canvas.width / 2 - 90, canvas.height / 2 - 10);
//         ctx.font = "16px ui-sans-serif, system-ui";
//         ctx.fillText("Press Restart", canvas.width / 2 - 70, canvas.height / 2 + 20);
//       }

//       frameRef.current++;
//       raf = requestAnimationFrame(loop);
//     }

//     function explodeAt(x: number, y: number) {
//       for (let i = 0; i < 22; i++) {
//         particles.current.push({ x: x + (Math.random() - 0.5) * 8, y: y + (Math.random() - 0.5) * 8, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 1.5) * 5, life: 30 + Math.random() * 20 });
//       }
//     }

//     function drawShip(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
//       ctx.save();
//       ctx.translate(x + w / 2, y + h / 2);
//       ctx.beginPath();
//       ctx.moveTo(-w / 2 + 6, h / 2 - 6);
//       ctx.quadraticCurveTo(0, -h / 1.6, w / 2 - 6, h / 2 - 6);
//       ctx.closePath();
//       ctx.fillStyle = "#6ee7b7";
//       ctx.fill();
//       ctx.beginPath();
//       ctx.arc(0, -4, 8, 0, Math.PI * 2);
//       ctx.fillStyle = "rgba(255,255,255,0.95)";
//       ctx.fill();
//       ctx.restore();
//     }

//     function drawEnemy(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, hp: number) {
//       ctx.save();
//       ctx.beginPath();
//       const r = Math.min(12, w / 4);
//       roundRect(ctx, x, y, w, h, r);
//       ctx.fillStyle = hp > 1 ? "#ff6b6b" : "#ff4d6d";
//       ctx.fill();
//       ctx.beginPath();
//       ctx.fillStyle = "rgba(0,0,0,0.8)";
//       ctx.arc(x + w / 2, y + h / 2 - 2, Math.max(3, w / 10), 0, Math.PI * 2);
//       ctx.fill();
//       ctx.restore();
//     }

//     function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
//       ctx.moveTo(x + r, y);
//       ctx.arcTo(x + w, y, x + w, y + h, r);
//       ctx.arcTo(x + w, y + h, x, y + h, r);
//       ctx.arcTo(x, y + h, x, y, r);
//       ctx.arcTo(x, y, x + w, y, r);
//     }

//     loop();

//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("keydown", onKeyDown);
//       window.removeEventListener("keyup", onKeyUp);
//       ro.disconnect();
//     };
//   }, [paused, gameOver, level, dark]);

//   function restart() {
//     bullets.current = [];
//     enemies.current = [];
//     particles.current = [];
//     setScore(0);
//     setLevel(1);
//     setGameOver(false);
//     setPaused(false);
//   }

//   function togglePause() {
//     if (!gameOver) setPaused((p) => !p);
//   }

//   return (
//     <div className="w-full max-w-3xl mx-auto p-4">
//       <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">🚀 Space Shooter</h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400">Responsive canvas game with levels, explosions, and local highscore.</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button onClick={() => setDark((d) => !d)} className="px-3 py-1 rounded-lg border text-sm border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
//               {dark ? "Dark" : "Light"}
//             </button>
//             <button onClick={togglePause} className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm shadow">{paused ? "Resume" : "Pause"}</button>
//             <button onClick={restart} className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">Restart</button>
//           </div>
//         </div>

//         <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="col-span-2">
//             <div className="w-full h-96 bg-gradient-to-b from-transparent to-black rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
//               <canvas ref={canvasRef} className="w-full h-full block" />
//             </div>
//           </div>

//           <div className="space-y-3">
//             <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
//                   <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{score}</div>
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">Highscore</div>
//                   <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{highscore}</div>
//                 </div>
//               </div>
//             </div>

//             <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300">
//               <div className="mb-2 font-semibold">Controls</div>
//               <ul className="list-disc list-inside space-y-1">
//                 <li>Arrow keys / A D — move</li>
//                 <li>Space / K — shoot</li>
//                 <li>Touch left / right to move and tap to shoot</li>
//               </ul>
//             </div>

//             <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-sm">
//               <div className="mb-2 font-semibold">Game Info</div>
//               <div>Level: <strong>{level}</strong></div>
//               <div>Enemies get faster and spawn quicker as level increases.</div>
//               <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Highscore saved in <code>localStorage</code>.</div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
//           <div>Made with ❤️ — drop this file in a Next.js page.</div>
//           <div>Tip: increase canvas height for more play area.</div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

