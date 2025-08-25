// app/bubble-shooter/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Playable Bubble Shooter Single Page (Next.js)
 * - Responsive canvas
 * - Mobile tap + PC keyboard controls
 * - Bounce, snap to grid, pop clusters >= 3
 * - Floating/drop groups removed
 * - Score + Restart
 */

type Cell = {
  row: number;
  col: number;
  x: number;
  y: number;
  color: string;
};

export default function BubbleShooterPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [score, setScore] = useState(0);
  const [aimAngle, setAimAngle] = useState(0); // degrees -70 .. 70

  // world stored in ref to avoid re-renders
  const worldRef = useRef({
    W: 420,
    H: 620,
    r: 18,
    rows: 0,
    cols: 0,
    grid: [] as (Cell | null)[][],
    projectile: null as null | {
      x: number;
      y: number;
      dx: number;
      dy: number;
      color: string;
      active: boolean;
    },
    raf: 0,
  });

  const COLORS = ["#ff4d4f", "#ffd666", "#36cfc9", "#69c0ff", "#b37feb", "#ff9c6e"];

  // utils
  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
  const randColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

  // cell center for staggered rows
  const cellCenter = (row: number, col: number, r: number) => {
    const x = col * r * 2 + r + (row % 2 ? r : 0);
    const y = row * (r * 1.2 + r * 0.2); // vertical spacing ~1.4r
    return { x, y };
  };

  // neighbor coords for row-offset hex-like grid
  const neighbors = (row: number, col: number) => {
    const odd = row % 2;
    return [
      [row, col - 1],
      [row, col + 1],
      [row - 1, col + (odd ? 0 : -1)],
      [row - 1, col + (odd ? 1 : 0)],
      [row + 1, col + (odd ? 0 : -1)],
      [row + 1, col + (odd ? 1 : 0)],
    ] as Array<[number, number]>;
  };

  // setup grid and initial bubbles
  const setupGrid = () => {
    const world = worldRef.current;
    const container = containerRef.current;
    if (!container) return;

    // responsive width: limit max width for desktop
    const cssW = Math.min(520, Math.max(320, container.clientWidth - 24));
    const aspect = 620 / 420;
    world.W = Math.floor(cssW);
    world.H = Math.floor(cssW * aspect);

    // bubble radius responsive
    world.r = Math.max(12, Math.min(22, Math.floor(world.W / 22)));
    world.cols = Math.floor((world.W - world.r) / (world.r * 2));
    if (world.cols % 2 === 1) world.cols += 1;
    world.rows = Math.floor(world.H / (world.r * 1.5));

    // init grid
    world.grid = Array.from({ length: world.rows }, () =>
      Array.from({ length: world.cols }, () => null)
    );

    // seed top rows with bubbles (6 rows)
    for (let r = 0; r < 6 && r < world.rows; r++) {
      const maxCol = world.cols - (r % 2 ? 1 : 0);
      for (let c = 0; c < maxCol; c++) {
        const { x, y } = cellCenter(r, c, world.r);
        if (x > world.W - world.r) continue;
        world.grid[r][c] = { row: r, col: c, x, y, color: randColor() };
      }
    }

    world.projectile = null;
    setScore(0);

    const cvs = canvasRef.current!;
    cvs.width = world.W;
    cvs.height = world.H;
  };

  // aim via coordinates (clientX/clientY)
  const aimAt = (clientX: number, clientY: number) => {
    const cvs = canvasRef.current!;
    const rect = cvs.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const dx = x - worldRef.current.W / 2;
    const dy = y - (worldRef.current.H - 36);
    let ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    ang = clamp(ang, -70, 70);
    setAimAngle(ang);
  };

  // shoot projectile
  const shoot = () => {
    const world = worldRef.current;
    if (world.projectile && world.projectile.active) return;
    const angle = (aimAngle * Math.PI) / 180;
    // speed px/sec (scale with width)
    const spd = world.W * 0.9;
    world.projectile = {
      x: world.W / 2,
      y: world.H - 36,
      dx: Math.cos(angle) * spd,
      dy: Math.sin(angle) * spd,
      color: randColor(),
      active: true,
    };
  };

  // keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setAimAngle((a) => clamp(a - 4, -70, 70));
      else if (e.key === "ArrowRight") setAimAngle((a) => clamp(a + 4, -70, 70));
      else if (e.key === " " || e.key === "Enter") shoot();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // init + resize
  useEffect(() => {
    setupGrid();
    const onResize = () => setupGrid();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // game loop
  useEffect(() => {
    const world = worldRef.current;
    const cvs = canvasRef.current!;
    if (!cvs) return;
    const ctx = cvs.getContext("2d")!;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      update(dt);
      render(ctx);

      world.raf = requestAnimationFrame(step);
    };
    world.raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(world.raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update projectile physics & collisions
  const update = (dt: number) => {
    const world = worldRef.current;
    const p = world.projectile;
    if (!p || !p.active) return;

    // move
    p.x += p.dx * dt;
    p.y += p.dy * dt;

    const r = world.r;

    // wall bounce
    if (p.x <= r) {
      p.x = r;
      p.dx *= -1;
    }
    if (p.x >= world.W - r) {
      p.x = world.W - r;
      p.dx *= -1;
    }

    // ceiling hit
    if (p.y <= r + 2) {
      snapProjectile();
      return;
    }

    // collide with any existing bubble
    for (let row = 0; row < world.rows; row++) {
      const maxCol = world.cols - (row % 2 ? 1 : 0);
      for (let col = 0; col < maxCol; col++) {
        const cell = world.grid[row][col];
        if (!cell) continue;
        const d = Math.hypot(p.x - cell.x, p.y - cell.y);
        if (d <= r * 2 - 0.6) {
          snapProjectile();
          return;
        }
      }
    }
  };

  // snap projectile into nearest empty cell and resolve clusters
  const snapProjectile = () => {
    const world = worldRef.current;
    const p = world.projectile!;
    if (!p) return;
    p.active = false;

    const r = world.r;
    // approximate row by y
    const approxRow = clamp(Math.floor(p.y / (r * 1.2)), 0, world.rows - 1);
    let bestRow = approxRow,
      bestCol = 0,
      bestDist = Infinity;

    for (let row = Math.max(0, approxRow - 4); row <= Math.min(world.rows - 1, approxRow + 4); row++) {
      const maxCol = world.cols - (row % 2 ? 1 : 0);
      for (let col = 0; col < maxCol; col++) {
        if (world.grid[row][col]) continue;
        const { x, y } = cellCenter(row, col, r);
        if (x > world.W - r) continue;
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < bestDist) {
          bestDist = d;
          bestRow = row;
          bestCol = col;
        }
      }
    }

    // clamp
    bestRow = clamp(bestRow, 0, world.rows - 1);
    const maxCol = world.cols - (bestRow % 2 ? 1 : 0);
    bestCol = clamp(bestCol, 0, maxCol - 1);

    const { x, y } = cellCenter(bestRow, bestCol, r);
    world.grid[bestRow][bestCol] = {
      row: bestRow,
      col: bestCol,
      x,
      y,
      color: p.color,
    };

    // pop clusters and drop floating groups
    const popped = popClusters(bestRow, bestCol);
    if (popped > 0) setScore((s) => s + popped * 10);

    // simple lose-check: any bubble too low => reset grid
    const dangerY = world.H - 90;
    for (let row = 0; row < world.rows; row++) {
      const maxC = world.cols - (row % 2 ? 1 : 0);
      for (let col = 0; col < maxC; col++) {
        const cell = world.grid[row][col];
        if (cell && cell.y > dangerY) {
          // reset (could show modal)
          setupGrid();
          return;
        }
      }
    }
  };

  // BFS cluster pop >=3, then drop floating clusters
  const popClusters = (row: number, col: number) => {
    const world = worldRef.current;
    const target = world.grid[row][col];
    if (!target) return 0;

    const visited = new Set<string>();
    const key = (r: number, c: number) => `${r}:${c}`;
    const cluster: Array<[number, number]> = [];
    const q: Array<[number, number]> = [[row, col]];
    visited.add(key(row, col));

    while (q.length) {
      const [r, c] = q.shift()!;
      const cell = world.grid[r][c];
      if (!cell) continue;
      if (cell.color !== target.color) continue;
      cluster.push([r, c]);
      for (const [nr, nc] of neighbors(r, c)) {
        if (nr < 0 || nr >= world.rows) continue;
        const maxCol = world.cols - (nr % 2 ? 1 : 0);
        if (nc < 0 || nc >= maxCol) continue;
        const ncell = world.grid[nr][nc];
        if (!ncell) continue;
        const k = key(nr, nc);
        if (!visited.has(k)) {
          visited.add(k);
          q.push([nr, nc]);
        }
      }
    }

    let popped = 0;
    if (cluster.length >= 3) {
      for (const [r, c] of cluster) {
        world.grid[r][c] = null;
        popped++;
      }
      // drop unattached groups
      dropFloating();
    }
    return popped;
  };

  // remove bubbles not connected to top row
  const dropFloating = () => {
    const world = worldRef.current;
    const seen = new Set<string>();
    const key = (r: number, c: number) => `${r}:${c}`;
    const q: Array<[number, number]> = [];

    // start from occupied top row
    for (let c = 0; c < world.cols; c++) {
      if (world.grid[0][c]) {
        q.push([0, c]);
        seen.add(key(0, c));
      }
    }
    while (q.length) {
      const [r, c] = q.shift()!;
      for (const [nr, nc] of neighbors(r, c)) {
        if (nr < 0 || nr >= world.rows) continue;
        const maxCol = world.cols - (nr % 2 ? 1 : 0);
        if (nc < 0 || nc >= maxCol) continue;
        if (!world.grid[nr][nc]) continue;
        const k = key(nr, nc);
        if (!seen.has(k)) {
          seen.add(k);
          q.push([nr, nc]);
        }
      }
    }

    let bonus = 0;
    for (let r = 0; r < world.rows; r++) {
      const maxCol = world.cols - (r % 2 ? 1 : 0);
      for (let c = 0; c < maxCol; c++) {
        if (world.grid[r][c] && !seen.has(key(r, c))) {
          world.grid[r][c] = null;
          bonus++;
        }
      }
    }
    if (bonus > 0) setScore((s) => s + bonus * 5);
  };

  // rendering
  const render = (ctx: CanvasRenderingContext2D) => {
    const world = worldRef.current;
    const { W, H, r } = world;

    // background gradient
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#08123a");
    g.addColorStop(1, "#2d0b4d");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // draw bubbles
    for (let row = 0; row < world.rows; row++) {
      const maxCol = world.cols - (row % 2 ? 1 : 0);
      for (let col = 0; col < maxCol; col++) {
        const cell = world.grid[row][col];
        if (!cell) continue;
        drawBubble(ctx, cell.x, cell.y, r, cell.color);
      }
    }

    // aim guide
    ctx.save();
    ctx.translate(W / 2, H - 36);
    ctx.rotate((aimAngle * Math.PI) / 180);
    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(W, 0);
    ctx.stroke();
    ctx.restore();
    ctx.setLineDash([]);

    // cannon base
    ctx.save();
    ctx.translate(W / 2, H - 20);
    ctx.fillStyle = "#5522aa";
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI, true);
    ctx.fill();
    ctx.restore();

    // projectile
    const p = world.projectile;
    if (p && p.active) drawBubble(ctx, p.x, p.y, r, p.color, true);

    // score
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${Math.max(12, Math.floor(r * 0.9))}px ui-sans-serif, system-ui`;
    ctx.fillText(`Score: ${score}`, 12, 22);
  };

  // draw one bubble with highlight
  const drawBubble = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    color: string,
    shine = false
  ) => {
    // body radial gradient
    const grd = ctx.createRadialGradient(x - r * 0.35, y - r * 0.45, r * 0.1, x, y, r);
    grd.addColorStop(0, "#ffffff");
    grd.addColorStop(0.06, color);
    grd.addColorStop(1, shade(color, -0.3));
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = shade(color, -0.45);
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // small highlight
    ctx.beginPath();
    ctx.ellipse(x - r * 0.35, y - r * 0.45, r * 0.35, r * 0.25, -0.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fill();

    if (shine) {
      ctx.beginPath();
      ctx.arc(x, y, r + 1.2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  // simple hex shade helper
  const shade = (hex: string, p: number) => {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255,
      g = (n >> 8) & 255,
      b = n & 255;
    const mix = (c: number) => Math.round((1 - p) * c + p * (p < 0 ? 0 : 255));
    const s = (v: number) => v.toString(16).padStart(2, "0");
    return `#${s(mix(r))}${s(mix(g))}${s(mix(b))}`;
  };

  // canvas event handlers
  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    aimAt(e.clientX, e.clientY);
    shoot();
  };
  const onTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const t = e.changedTouches[0];
    aimAt(t.clientX, t.clientY);
    shoot();
  };

  const restart = () => setupGrid();

  // initial setup on mount
  useEffect(() => {
    setupGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // main render loop trigger (requestAnimationFrame managed in useEffect)
  useEffect(() => {
    const cvs = canvasRef.current!;
    const ctx = cvs.getContext("2d")!;
    const world = worldRef.current;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      update(dt);
      render(ctx);
      world.raf = requestAnimationFrame(loop);
    };

    world.raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(world.raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-start gap-3 bg-gradient-to-b from-indigo-900 to-violet-900 text-white p-3"
    >
      <h1 className="text-xl sm:text-2xl font-bold mt-3">🎯 Bubble Shooter</h1>
      <p className="text-sm opacity-90 -mt-2">Mobile: tap to shoot • PC: ← → aim, Space/Enter shoot</p>

      <div className="w-full max-w-[520px]">
        <canvas
          ref={canvasRef}
          className="w-full h-auto rounded-xl shadow-2xl border border-white/20 bg-black/20 touch-manipulation"
          onClick={onCanvasClick}
          onTouchEnd={onTouchEnd}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setAimAngle((a) => clamp(a - 6, -70, 70))}
          className="px-3 py-2 rounded-lg bg-white/15 hover:bg-white/25"
        >
          ◀ Aim
        </button>
        <button
          onClick={() => setAimAngle((a) => clamp(a + 6, -70, 70))}
          className="px-3 py-2 rounded-lg bg-white/15 hover:bg-white/25"
        >
          Aim ▶
        </button>
        <button onClick={shoot} className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-semibold">
          Shoot
        </button>
        <button onClick={restart} className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 font-semibold">
          Restart
        </button>
      </div>
    </div>
  );
}






// "use client";
// import { useEffect, useRef, useState } from "react";

// export default function ShooterGame() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [score, setScore] = useState(0);

//   // প্লেয়ার স্টেট
//   const player = useRef({ x: 200, y: 450, w: 40, h: 40 });
//   const bullets = useRef<{ x: number; y: number }[]>([]);
//   const enemies = useRef<{ x: number; y: number }[]>([]);
//   const keys = useRef<{ [key: string]: boolean }>({});

//   // শত্রু বানানো
//   const spawnEnemy = () => {
//     enemies.current.push({
//       x: Math.random() * 360,
//       y: 0,
//     });
//   };

//   // কীবোর্ড কন্ট্রোল
//   useEffect(() => {
//     const down = (e: KeyboardEvent) => (keys.current[e.key] = true);
//     const up = (e: KeyboardEvent) => (keys.current[e.key] = false);
//     window.addEventListener("keydown", down);
//     window.addEventListener("keyup", up);
//     const interval = setInterval(spawnEnemy, 2000);
//     return () => {
//       window.removeEventListener("keydown", down);
//       window.removeEventListener("keyup", up);
//       clearInterval(interval);
//     };
//   }, []);

//   // টাচ কন্ট্রোল (মোবাইলের জন্য)
//   const handleTouch = (e: React.TouchEvent) => {
//     const touchX = e.touches[0].clientX;
//     if (!canvasRef.current) return;
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = touchX - rect.left;
//     player.current.x = x - player.current.w / 2;
//   };

//   // গেম লুপ
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const loop = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // প্লেয়ার মুভমেন্ট
//       if (keys.current["ArrowLeft"]) player.current.x -= 5;
//       if (keys.current["ArrowRight"]) player.current.x += 5;
//       if (keys.current[" "]) {
//         if (bullets.current.length === 0 || bullets.current[bullets.current.length - 1].y < 400) {
//           bullets.current.push({ x: player.current.x + 18, y: player.current.y });
//         }
//       }

//       // প্লেয়ার
//       ctx.fillStyle = "blue";
//       ctx.fillRect(player.current.x, player.current.y, player.current.w, player.current.h);

//       // বুলেট
//       ctx.fillStyle = "red";
//       bullets.current.forEach((b, i) => {
//         b.y -= 5;
//         ctx.fillRect(b.x, b.y, 5, 10);
//         if (b.y < 0) bullets.current.splice(i, 1);
//       });

//       // শত্রু
//       ctx.fillStyle = "green";
//       enemies.current.forEach((en, ei) => {
//         en.y += 2;
//         ctx.fillRect(en.x, en.y, 30, 30);

//         // Bullet hit check
//         bullets.current.forEach((b, bi) => {
//           if (b.x < en.x + 30 && b.x + 5 > en.x && b.y < en.y + 30 && b.y + 10 > en.y) {
//             enemies.current.splice(ei, 1);
//             bullets.current.splice(bi, 1);
//             setScore((s) => s + 10);
//           }
//         });

//         // Game Over চেক
//         if (en.y > 480) {
//           enemies.current.splice(ei, 1);
//           setScore((s) => s - 5);
//         }
//       });

//       requestAnimationFrame(loop);
//     };

//     loop();
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
//       <h1 className="text-2xl mb-2">🎮 Babul Shooter</h1>
//       <p className="mb-2">Score: {score}</p>
//       <canvas
//         ref={canvasRef}
//         width={400}
//         height={500}
//         className="border bg-gray-900"
//         onTouchMove={handleTouch}
//       />
//       <p className="mt-2 text-sm">👉 Move: Arrow Keys | Shoot: Space</p>
//       <p className="text-sm">👉 Mobile: Touch to Move</p>
//     </div>
//   );
// }














// "use client";
// import { useEffect, useRef, useState } from "react";

// export default function BubbleShooter() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [score, setScore] = useState(0);
//   const [angle, setAngle] = useState(0); // shooter angle
//   const [bubbles, setBubbles] = useState<any[]>([]);

//   const width = 400;
//   const height = 600;
//   const bubbleRadius = 15;

//   // Initialize bubbles
//   useEffect(() => {
//     resetGame();
//   }, []);

//   // Keyboard controls
//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (e.key === "ArrowLeft") setAngle((a) => Math.max(a - 5, -70));
//       if (e.key === "ArrowRight") setAngle((a) => Math.min(a + 5, 70));
//       if (e.key === " " || e.key === "Enter") shootBubble();
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   });

//   // Mobile Tap
//   const handleTap = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - rect.left - width / 2;
//     const y = e.clientY - rect.top - height;
//     const newAngle = (Math.atan2(y, x) * 180) / Math.PI;
//     setAngle(Math.max(-70, Math.min(70, newAngle)));
//     shootBubble();
//   };

//   // Reset Game
//   const resetGame = () => {
//     const initial: any[] = [];
//     for (let r = 0; r < 5; r++) {
//       for (let c = 0; c < 8; c++) {
//         initial.push({
//           x: c * (bubbleRadius * 2) + bubbleRadius,
//           y: r * (bubbleRadius * 2) + bubbleRadius,
//           color: randomColor(),
//         });
//       }
//     }
//     setBubbles(initial);
//     setScore(0);
//   };

//   // Shoot bubble
//   const shootBubble = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const radians = (angle * Math.PI) / 180;
//     let x = width / 2;
//     let y = height - 30;
//     const dx = Math.cos(radians) * 5;
//     const dy = Math.sin(radians) * 5;

//     const color = randomColor();

//     const interval = setInterval(() => {
//       x += dx;
//       y += dy;

//       // Collision detection with wall
//       if (x < bubbleRadius || x > width - bubbleRadius) {
//         clearInterval(interval);
//       }

//       // Collision detection with other bubbles
//       for (let b of bubbles) {
//         const dist = Math.sqrt((x - b.x) ** 2 + (y - b.y) ** 2);
//         if (dist < bubbleRadius * 2) {
//           clearInterval(interval);
//           setBubbles((prev) => [...prev, { x, y, color }]);
//           setScore((s) => s + 10);
//           return;
//         }
//       }

//       // Draw bubble in flight
//       drawGame(ctx, [...bubbles, { x, y, color }]);
//     }, 20);
//   };

//   // Draw Game
//   const drawGame = (ctx: CanvasRenderingContext2D, customBubbles?: any[]) => {
//     ctx.clearRect(0, 0, width, height);
//     const list = customBubbles || bubbles;

//     for (let b of list) {
//       ctx.beginPath();
//       ctx.arc(b.x, b.y, bubbleRadius, 0, Math.PI * 2);
//       ctx.fillStyle = b.color;
//       ctx.fill();
//       ctx.stroke();
//     }

//     // Draw shooter
//     ctx.beginPath();
//     ctx.moveTo(width / 2, height);
//     ctx.lineTo(
//       width / 2 + Math.cos((angle * Math.PI) / 180) * 40,
//       height + Math.sin((angle * Math.PI) / 180) * 40
//     );
//     ctx.strokeStyle = "white";
//     ctx.lineWidth = 3;
//     ctx.stroke();
//   };

//   // Animation loop
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const render = () => {
//       drawGame(ctx);
//       requestAnimationFrame(render);
//     };
//     render();
//   }, [bubbles, angle]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white">
//       <h1 className="text-2xl font-bold mb-4">🎯 Bubble Shooter</h1>
//       <p className="mb-2">Score: {score}</p>
//       <canvas
//         ref={canvasRef}
//         width={width}
//         height={height}
//         className="border-4 border-white rounded-lg bg-black"
//         onClick={handleTap}
//       />
//       <button
//         onClick={resetGame}
//         className="mt-4 px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700"
//       >
//         Restart
//       </button>
//     </div>
//   );
// }

// // Random bubble colors
// function randomColor() {
//   const colors = ["red", "yellow", "green", "blue", "purple", "orange"];
//   return colors[Math.floor(Math.random() * colors.length)];
// }
