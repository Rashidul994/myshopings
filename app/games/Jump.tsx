'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function JumpGame() {
  const [isJumping, setIsJumping] = useState(false);
  const [obstacleLeft, setObstacleLeft] = useState(400);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Handle jump
  const jump = () => {
    if (isJumping || gameOver) return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 500);
  };

  // Keyboard control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJumping, gameOver]);

  // Obstacle movement
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setObstacleLeft((prev) => {
        const next = prev - 10;
        if (next < -40) {
          setScore((s) => s + 1);
          return 400;
        }
        return next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Collision detection
  useEffect(() => {
    if (
      obstacleLeft < 50 &&
      obstacleLeft > 0 &&
      !isJumping
    ) {
      setGameOver(true);
    }
  }, [obstacleLeft, isJumping]);

  // Reset
  const resetGame = () => {
    setIsJumping(false);
    setObstacleLeft(400);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">🎮 Jump Game</h1>

      <div className="relative w-[90vw] max-w-[600px] h-[250px] bg-white rounded-xl overflow-hidden shadow-lg">
        {/* Character */}
        <motion.div
          initial={false}
          animate={{ bottom: isJumping ? 100 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute left-10 w-12 h-12 bg-blue-500 rounded-full bottom-0"
        />

        {/* Obstacle */}
        <div
          className="absolute bottom-0 w-10 h-12 bg-red-500 rounded"
          style={{ left: `${obstacleLeft}px` }}
        />

        {/* Ground */}
        <div className="absolute bottom-0 left-0 w-full h-4 bg-green-600" />
      </div>

      {/* Score & Buttons */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="text-xl">🥇 স্কোর: {score}</div>
        {gameOver && <div className="text-2xl text-yellow-300 font-bold">☠️ গেম ওভার</div>}
        <button
          onClick={gameOver ? resetGame : jump}
          className="mt-2 px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition"
        >
          {gameOver ? '🔁 আবার শুরু করুন' : '⬆️ লাফ দিন / স্পেস চাপুন'}
        </button>
      </div>
    </div>
  );
}



