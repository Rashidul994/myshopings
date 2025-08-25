"use client";
import { useRef, useEffect, useState } from "react";

export default function BubbleShooterAdvanced() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = 600;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    const ROWS = 12;
    const COLS = 8;
    const RADIUS = 25;
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    let angle = Math.PI / 2;
    let bubbles = [];
    let shooter = { x: width / 2, y: height - 50, radius: RADIUS, color: randomColor() };
    let movingBubble = null;
    let dropTimer = 0;

    function randomColor() {
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // Initialize grid
    const grid = [];
    function initGrid() {
      for (let r = 0; r < ROWS; r++) {
        grid[r] = [];
        for (let c = 0; c < COLS; c++) {
          if (r < 5) {
            grid[r][c] = { color: randomColor() };
          } else {
            grid[r][c] = null;
          }
        }
      }
    }

    initGrid();

    function drawGrid() {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const bubble = grid[r][c];
          if (bubble) {
            const x = c * RADIUS * 2 + RADIUS + (r % 2 === 1 ? RADIUS : 0);
            const y = r * RADIUS * 2 + RADIUS;
            ctx.beginPath();
            ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = bubble.color;
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.stroke();
          }
        }
      }
    }

    function drawShooter() {
      ctx.beginPath();
      ctx.arc(shooter.x, shooter.y, RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = shooter.color;
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.stroke();

      const len = 50;
      ctx.beginPath();
      ctx.moveTo(shooter.x, shooter.y);
      ctx.lineTo(shooter.x + Math.cos(angle) * len, shooter.y - Math.sin(angle) * len);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.lineWidth = 1;
    }

    function shootBubble() {
      if (movingBubble) return;
      movingBubble = { x: shooter.x, y: shooter.y, color: shooter.color, dx: Math.cos(angle) * 8, dy: -Math.sin(angle) * 8 };
      shooter.color = randomColor();
    }

    function detectCollision(bubble) {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const target = grid[r][c];
          if (!target) continue;
          const x = c * RADIUS * 2 + RADIUS + (r % 2 === 1 ? RADIUS : 0);
          const y = r * RADIUS * 2 + RADIUS;
          const dx = bubble.x - x;
          const dy = bubble.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < RADIUS * 2 - 2) {
            return { row: r, col: c };
          }
        }
      }
      return null;
    }

    function attachBubble(bubble, row, col) {
      if (!row && row !== 0) row = Math.floor((bubble.y - RADIUS) / (RADIUS * 2));
      if (!col && col !== 0) col = Math.floor((bubble.x - RADIUS) / (RADIUS * 2));
      if (row < 0) row = 0;
      if (col < 0) col = 0;
      if (row >= ROWS) row = ROWS - 1;
      if (col >= COLS) col = COLS - 1;
      grid[row][col] = { color: bubble.color };
      checkMatch(row, col);
    }

    function checkMatch(r, c) {
      const targetColor = grid[r][c].color;
      const visited = {};
      const toVisit = [[r, c]];
      const match = [];

      while (toVisit.length) {
        const [row, col] = toVisit.pop();
        const key = `${row},${col}`;
        if (visited[key]) continue;
        visited[key] = true;
        const bubble = grid[row][col];
        if (!bubble || bubble.color !== targetColor) continue;
        match.push([row, col]);

        const neighbors = [
          [row - 1, col],
          [row + 1, col],
          [row, col - 1],
          [row, col + 1],
          [row - 1, col + (row % 2 === 0 ? -1 : 1)],
          [row + 1, col + (row % 2 === 0 ? -1 : 1)]
        ];

        neighbors.forEach(([nr, nc]) => {
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
            toVisit.push([nr, nc]);
          }
        });
      }

      if (match.length >= 3) {
        match.forEach(([row, col]) => {
          grid[row][col] = null;
          setScore(prev => prev + 10);
        });
        removeUnattachedBubbles();
      }
    }

    function removeUnattachedBubbles() {
      const visited = {};
      const toVisit = [];
      for (let c = 0; c < COLS; c++) {
        if (grid[0][c]) toVisit.push([0, c]);
      }
      while (toVisit.length) {
        const [r, c] = toVisit.pop();
        const key = `${r},${c}`;
        if (visited[key]) continue;
        visited[key] = true;
        const neighbors = [
          [r - 1, c],
          [r + 1, c],
          [r, c - 1],
          [r, c + 1],
          [r - 1, c + (r % 2 === 0 ? -1 : 1)],
          [r + 1, c + (r % 2 === 0 ? -1 : 1)]
        ];
        neighbors.forEach(([nr, nc]) => {
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc]) {
            toVisit.push([nr, nc]);
          }
        });
      }
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const key = `${r},${c}`;
          if (grid[r][c] && !visited[key]) {
            grid[r][c] = null;
          }
        }
      }
    }

    function dropBubbles() {
      dropTimer++;
      if (dropTimer > 300 - level * 20) { // increase speed per level
        for (let r = ROWS - 2; r >= 0; r--) {
          for (let c = 0; c < COLS; c++) {
            grid[r + 1][c] = grid[r][c];
            grid[r][c] = null;
          }
        }
        dropTimer = 0;
        setLevel(prev => prev + 1);
      }
    }

    function checkGameOver() {
      for (let c = 0; c < COLS; c++) {
        if (grid[ROWS - 1][c]) {
          setGameOver(true);
        }
      }
    }

    function drawUI() {
      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${score}`, 20, 30);
      ctx.fillText(`Level: ${level}`, 20, 60);

      if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(width / 2 - 150, height / 2 - 50, 300, 100);
        ctx.fillStyle = "#fff";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over!", width / 2 - 80, height / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Press R to restart", width / 2 - 80, height / 2 + 30);
      }
    }

    function gameLoop() {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      drawShooter();
      drawUI();
      dropBubbles();

      if (movingBubble) {
        movingBubble.x += movingBubble.dx;
        movingBubble.y += movingBubble.dy;

        if (movingBubble.x - RADIUS < 0 || movingBubble.x + RADIUS > width) {
          movingBubble.dx *= -1;
        }

        const collision = detectCollision(movingBubble);
        if (collision || movingBubble.y - RADIUS < 0) {
          const r = collision ? collision.row : 0;
          const c = collision ? collision.col : Math.floor(movingBubble.x / (RADIUS * 2));
          attachBubble(movingBubble, r, c);
          movingBubble = null;
          checkGameOver();
        }

        ctx.beginPath();
        ctx.arc(movingBubble.x, movingBubble.y, RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = movingBubble.color;
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
      }

      if (!gameOver) requestAnimationFrame(gameLoop);
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const dx = e.clientX - shooter.x;
      const dy = shooter.y - (e.clientY - rect.top);
      angle = Math.atan2(dy, dx);
      if (angle < 0) angle = 0;
      if (angle > Math.PI) angle = Math.PI;
    };

    const handleClick = () => {
      shootBubble();
    };

    const handleKey = (e) => {
      if ((e.key === "r" || e.key === "R") && gameOver) {
        window.location.reload();
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKey);

    gameLoop();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKey);
    };
  }, [score, level, gameOver]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 20 }}>
      <h1 style={{ color: "#fff" }}>Advanced Bubble Shooter</h1>
      <canvas ref={canvasRef} style={{ border: "4px solid #3498db", borderRadius: 8, background: "#222" }} />
      <p style={{ color: "#fff" }}>Move mouse to aim, click to shoot. Bubbles will drop each level!</p>
    </div>
  );
}

