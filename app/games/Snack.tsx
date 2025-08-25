'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const canvasSize = 400;
const scale = 20;
const rows = canvasSize / scale;
const cols = canvasSize / scale;

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [dir, setDir] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const moveSnake = () => {
    const newHead = {
      x: (snake[0].x + dir.x + cols) % cols,
      y: (snake[0].y + dir.y + rows) % rows,
    };

    // Collision with self
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      setGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];

    // Eating food
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore(score + 1);
      setFood({
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
      });
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && dir.x !== 0 || dir.y !== 0) {
        moveSnake();
      }
    }, 100);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * scale, food.y * scale, scale, scale);

    // Draw snake
    ctx.fillStyle = 'lime';
    snake.forEach(seg => {
      ctx.fillRect(seg.x * scale, seg.y * scale, scale, scale);
    });
  }, [snake, food]);

  const handleKey = (e) => {
    switch (e.key) {
      case 'ArrowUp': if (dir.y !== 1) setDir({ x: 0, y: -1 }); break;
      case 'ArrowDown': if (dir.y !== -1) setDir({ x: 0, y: 1 }); break;
      case 'ArrowLeft': if (dir.x !== 1) setDir({ x: -1, y: 0 }); break;
      case 'ArrowRight': if (dir.x !== -1) setDir({ x: 1, y: 0 }); break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);


  }, [dir]);

  const restart = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDir({ x: 0, y: 0 });
    setScore(0);
getdata();
 
    setGameOver(false);
  };




const getdata=()=>{

const existing = JSON.parse(localStorage.getItem("set_coin")) || {};

// যদি count আগে থেকেই 5 হয়
if ((existing.count || 0) >= 5) {
  alert("Already count 5");
  
setGameOver(true);


} else {
  // নতুন ডাটা তৈরি করো
  const updatedItems = {
    id: 64,
    name: "game_coin",
    coins: (existing.coins || 0) + score, // আগের সাথে নতুন score যোগ
    date: new Date().toLocaleString(),
    count: (existing.count || 0) + 1,     // count বাড়াও
  };

  // localStorage এ আবার সেভ করো
  localStorage.setItem("set_coin", JSON.stringify(updatedItems));
}










}









// / পুরনো ডাটা localStorage থেকে নাও (array না থাকলে খালি array নাও)
// const existing = JSON.parse(localStorage.getItem("set_coin")) || [];

// // যদি array এর length >= 5 হয়ে যায়
// if (existing.length >= 5) {
//   alert("Already count 5");
// } else {
//   // নতুন item বানাও
//   const newItem = {
//     id: existing.length + 1,
//     name: `game_coin_${existing.length + 1}`,
//     coins: score,
//     date: new Date().toLocaleString(),
//   };

//   // array তে push করো
//   existing.push(newItem);

//   // localStorage এ আবার সেভ করো
//   localStorage.setItem("set_coin", JSON.stringify(existing));
// }















  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <motion.h1 className="text-3xl font-bold mb-4" initial={{ y: -20 }} animate={{ y: 0 }}>
        🐍 Snake Game
      </motion.h1>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="bg-black border-4 border-green-400 rounded-lg"
      ></canvas>
      <div className="mt-4 text-xl">Score: {score}</div>
      {gameOver && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-red-400 text-2xl font-bold">Game Over</div>
          <button
            onClick={restart}
            className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl text-white"
          >
            Restart
          </button>
        </motion.div>
      )}
    </div>
  );
}

