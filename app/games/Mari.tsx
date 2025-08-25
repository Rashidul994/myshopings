"use client";
import { useEffect, useRef, useState } from "react";

export default function MarioPlatformer() {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState("playing"); // playing, win, lose
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    // গেম কনস্ট্যান্ট
    const GRAVITY = 0.5;
    const PLAYER_JUMP = -12;
    const PLAYER_SPEED = 5;

    // প্লেয়ার প্রোপার্টি
    const player = {
      x: 50,
      y: 300,
      width: 30,
      height: 50,
      xVel: 0,
      yVel: 0,
      jumping: false,
      onGround: false,
      direction: 1,
      invincible: false,
      invincibleTimer: 0
    };

    // প্ল্যাটফর্ম
    const platforms = [
      {x: 0, y: 500, width: 200, height: 20},
      {x: 300, y: 450, width: 200, height: 20},
      {x: 200, y: 350, width: 150, height: 20},
      {x: 500, y: 400, width: 200, height: 20},
      {x: 0, y: 200, width: 150, height: 20},
      {x: 650, y: 300, width: 150, height: 20},
      {x: 400, y: 200, width: 200, height: 20}
    ];

    // কয়েন
    const coins = [
      {x: 350, y: 400, width: 20, height: 20, collected: false},
      {x: 250, y: 300, width: 20, height: 20, collected: false},
      {x: 550, y: 350, width: 20, height: 20, collected: false},
      {x: 100, y: 150, width: 20, height: 20, collected: false},
      {x: 700, y: 250, width: 20, height: 20, collected: false},
      {x: 450, y: 150, width: 20, height: 20, collected: false}
    ];

    // শত্রু
    const enemies = [
      {x: 400, y: 430, width: 30, height: 30, xVel: 2, direction: 1},
      {x: 700, y: 250, width: 30, height: 30, xVel: 2, direction: -1},
      {x: 150, y: 430, width: 30, height: 30, xVel: 2, direction: -1}
    ];

    // গোল
    const goal = {x: 750, y: 150, width: 40, height: 50};

    // কী স্টেট ট্র্যাকিং
    const keys = {
      right: false,
      left: false,
      up: false
    };

    // কী ইভেন্ট হ্যান্ডলার
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') keys.right = true;
      if (e.key === 'ArrowLeft') keys.left = true;
      if (e.key === 'ArrowUp' || e.key === ' ') keys.up = true;
      if ((e.key === 'r' || e.key === 'R') && gameState !== 'playing') restartGame();
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowRight') keys.right = false;
      if (e.key === 'ArrowLeft') keys.left = false;
      if (e.key === 'ArrowUp' || e.key === ' ') keys.up = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // গেম রিস্টার্ট
    const restartGame = () => {
      setScore(0);
      setLives(3);
      setGameState('playing');
      player.x = 50;
      player.y = 300;
      player.xVel = 0;
      player.yVel = 0;
      player.invincible = false;
      coins.forEach(c => c.collected = false);
    };

    // দুটি রেক্টের মধ্যে কলিশন চেক
    const checkCollision = (rect1, rect2) => {
      return rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.y + rect1.height > rect2.y;
    };

    // কনফেটি কম্পোনেন্ট
    const Confetti = () => {
      if (!showConfetti) return null;
      
      useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '50';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = Array.from({ length: 150 }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 6 + 2,
          dx: (Math.random() - 0.5) * 5,
          dy: Math.random() * -7 - 3,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        }));

        let anim;
        const draw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            p.dy += 0.3;
            if (p.y > canvas.height) p.y = canvas.height;
          });
          anim = requestAnimationFrame(draw);
        };
        draw();

        const timeout = setTimeout(() => {
          cancelAnimationFrame(anim);
          document.body.removeChild(canvas);
          setShowConfetti(false);
        }, 3000);

        return () => {
          cancelAnimationFrame(anim);
          clearTimeout(timeout);
          if (document.body.contains(canvas)) {
            document.body.removeChild(canvas);
          }
        };
      }, [showConfetti]);

      return null;
    };

    // আপডেট গেম লজিক
    const update = () => {
      if (gameState !== 'playing') return;

      // প্লেয়ার মুভমেন্ট
      player.xVel = 0;
      if (keys.right) {
        player.xVel = PLAYER_SPEED;
        player.direction = 1;
      }
      if (keys.left) {
        player.xVel = -PLAYER_SPEED;
        player.direction = -1;
      }

      if (keys.up && player.onGround) {
        player.yVel = PLAYER_JUMP;
        player.jumping = true;
        player.onGround = false;
      }

      // গ্র্যাভিটি অ্যাপ্লাই
      player.yVel += GRAVITY;

      // পজিশন আপডেট
      player.x += player.xVel;
      player.y += player.yVel;

      // বাউন্ডারি চেক
      if (player.x < 0) player.x = 0;
      if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
      if (player.y > canvas.height) {
        // প্লেয়ার স্ক্রিন থেকে পড়ে গেলে
        player.y = 300;
        player.x = 50;
        player.yVel = 0;
        setLives(prev => prev - 1);
        if (lives <= 1) {
          setGameState('lose');
        }
      }

      // গ্রাউন্ড ফ্লাগ রিসেট
      player.onGround = false;

      // প্ল্যাটফর্ম কলিশন চেক
      platforms.forEach(platform => {
        if (player.x + player.width > platform.x && 
            player.x < platform.x + platform.width &&
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height / 2 &&
            player.yVel > 0) {
          player.y = platform.y - player.height;
          player.yVel = 0;
          player.onGround = true;
          player.jumping = false;
        }
      });

      // শত্রু আপডেট
      enemies.forEach(enemy => {
        enemy.x += enemy.xVel * enemy.direction;
        
        // দিক পরিবর্তন
        let onEdge = true;
        platforms.forEach(platform => {
          if (enemy.x + enemy.width > platform.x && 
              enemy.x < platform.x + platform.width &&
              enemy.y + enemy.height > platform.y &&
              enemy.y < platform.y + platform.height) {
            onEdge = false;
          }
        });
        
        if (onEdge || enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
          enemy.direction *= -1;
        }
        
        // প্লেয়ার সাথে কলিশন
        if (checkCollision(player, enemy) && !player.invincible) {
          // প্লেয়ার একটি জীবন হারায়
          setLives(prev => prev - 1);
          player.invincible = true;
          player.invincibleTimer = Date.now();
          
          // প্লেয়ারকে শত্রু থেকে বাউন্স করান
          player.yVel = PLAYER_JUMP / 1.5;
          
          if (lives <= 1) {
            setGameState('lose');
          }
        }
      });

      // কয়েন কালেকশন
      coins.forEach(coin => {
        if (!coin.collected && checkCollision(player, coin)) {
          coin.collected = true;
          setScore(prev => prev + 100);
        }
      });

      // গোলে পৌঁছানো চেক
      if (checkCollision(player, goal)) {
        setGameState('win');
        setShowConfetti(true);
      }

      // ইনভিনসিবিলিটি টাইমার
      if (player.invincible && Date.now() - player.invincibleTimer > 2000) {
        player.invincible = false;
      }
    };

    // ড্রaw ফাংশন
    const draw = () => {
      // ক্লিয়ার ক্যানভাস
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // আকাশ
      ctx.fillStyle = '#6b8cff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // মেঘ
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(100, 80, 25, 0, Math.PI * 2);
      ctx.arc(130, 70, 30, 0, Math.PI * 2);
      ctx.arc(160, 80, 25, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(600, 120, 25, 0, Math.PI * 2);
      ctx.arc(630, 110, 30, 0, Math.PI * 2);
      ctx.arc(660, 120, 25, 0, Math.PI * 2);
      ctx.fill();
      
      // মাটি
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
      
      // মাটির উপর ঘাস
      ctx.fillStyle = '#00a800';
      ctx.fillRect(0, canvas.height - 50, canvas.width, 5);
      
      // প্ল্যাটফর্ম আঁকা
      ctx.fillStyle = '#8b4513';
      platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        
        // প্ল্যাটফর্মের উপর ঘাস
        ctx.fillStyle = '#00a800';
        ctx.fillRect(platform.x, platform.y, platform.width, 5);
        ctx.fillStyle = '#8b4513';
      });
      
      // কয়েন আঁকা
      ctx.fillStyle = '#ffd700';
      coins.forEach(coin => {
        if (!coin.collected) {
          ctx.beginPath();
          ctx.arc(coin.x + coin.width/2, coin.y + coin.height/2, coin.width/2, 0, Math.PI * 2);
          ctx.fill();
          
          // কয়েনের চকচকে efek
          ctx.fillStyle = '#fff8b5';
          ctx.beginPath();
          ctx.arc(coin.x + coin.width/3, coin.y + coin.height/3, coin.width/6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffd700';
        }
      });
      
      // শত্রু আঁকা
      ctx.fillStyle = '#8b008b';
      enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        
        // চোখ
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(enemy.x + 8, enemy.y + 10, 5, 0, Math.PI * 2);
        ctx.arc(enemy.x + 22, enemy.y + 10, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupils
        ctx.fillStyle = '#000';
        ctx.beginPath();
        const pupilOffset = enemy.direction > 0 ? 2 : -2;
        ctx.arc(enemy.x + 8 + pupilOffset, enemy.y + 10, 2, 0, Math.PI * 2);
        ctx.arc(enemy.x + 22 + pupilOffset, enemy.y + 10, 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#8b008b';
      });
      
      // গোল আঁকা
      // ফ্লাগ পোল
      ctx.fillStyle = '#c0c0c0';
      ctx.fillRect(goal.x + 15, goal.y, 5, goal.height);
      
      // ফ্লাগ
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.moveTo(goal.x + 15, goal.y);
      ctx.lineTo(goal.x + 15, goal.y + 20);
      ctx.lineTo(goal.x, goal.y + 10);
      ctx.closePath();
      ctx.fill();
      
      // প্লেয়ার আঁকা
      ctx.fillStyle = player.invincible && Date.now() % 200 < 100 ? '#ffcc00' : '#ff0000';
      // শরীর
      ctx.fillRect(player.x, player.y + 20, player.width, player.height - 20);
      // মাথা
      ctx.beginPath();
      ctx.arc(player.x + player.width/2, player.y + 15, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#ffdbac';
      ctx.fill();
      // চোখ
      ctx.beginPath();
      const eyeX = player.x + player.width/2 + (5 * player.direction);
      ctx.arc(eyeX, player.y + 10, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#000';
      ctx.fill();
      // টুপি
      ctx.fillStyle = player.invincible && Date.now() % 200 < 100 ? '#ffcc00' : '#ff0000';
      ctx.fillRect(player.x - 5, player.y, player.width + 10, 10);
      
      // UI আঁকা
      ctx.fillStyle = '#fff';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${score}`, 20, 30);
      ctx.fillText(`Lives: ${lives}`, 20, 60);
      
      // গেম স্টেট মেসেজ
      if (gameState !== 'playing') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(canvas.width/2 - 150, canvas.height/2 - 50, 300, 100);
        
        ctx.fillStyle = '#fff';
        ctx.font = '30px Arial';
        const message = gameState === 'win' ? 'You Win!' : 'Game Over';
        ctx.fillText(message, canvas.width/2 - 70, canvas.height/2 - 10);
        
        ctx.font = '20px Arial';
        ctx.fillText('Press R to restart', canvas.width/2 - 80, canvas.height/2 + 30);
      }
    };

    // গেম লুপ
    const gameLoop = () => {
      update();
      draw();
      requestRef.current = requestAnimationFrame(gameLoop);
    };
    
    // লুপ শুরু
    gameLoop();

    // ক্লিনআপ
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [score, lives, gameState]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      backgroundColor: '#2c3e50',
      padding: '20px'
    }}>
      <h1 style={{ color: '#fff', marginBottom: '10px' }}>Mario-Style Platformer</h1>
      <p style={{ color: '#ecf0f1', marginBottom: '20px', textAlign: 'center' }}>
        Use arrow keys to move and jump. Collect coins and reach the flag to win!
      </p>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ 
          border: '4px solid #3498db',
          borderRadius: '8px',
          backgroundColor: '#6b8cff'
        }}
      />
      
 
      <div style={{ marginTop: '20px', color: '#ecf0f1' }}>
        <p>Controls: ← → to move, ↑ or Space to jump</p>
        <p>Collect all coins and reach the flag to win!</p>
      </div>
    </div>
  );
}


