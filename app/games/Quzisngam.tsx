"use client";
import { useState, useEffect } from "react";

export default function AdvancedMathQuizGame() {
  const [question, setQuestion] = useState({});
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(15);
  const [questionCount, setQuestionCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const operators = ["+", "-", "*", "/"];

  // Load high score from localStorage
  useEffect(() => {
    const hs = localStorage.getItem("mathQuizHighScore");
    if (hs) setHighScore(parseInt(hs));
  }, []);

  // Save high score to localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("mathQuizHighScore", score);
    }
  }, [score, highScore]);

  const generateQuestion = () => {
    const maxNumber = 10 + level * 10;
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;
    const op = operators[Math.floor(Math.random() * operators.length)];
    let answer;

    switch (op) {
      case "+": answer = num1 + num2; break;
      case "-": answer = num1 - num2; break;
      case "*": answer = num1 * num2; break;
      case "/": answer = parseFloat((num1 / num2).toFixed(2)); break;
      default: answer = 0;
    }

    const opts = new Set();
    opts.add(answer);
    while (opts.size < 4) {
      let fakeAnswer = answer + Math.floor(Math.random() * 20) - 10;
      if (op === "/") fakeAnswer = parseFloat((answer + Math.random() * 5 - 2.5).toFixed(2));
      if (fakeAnswer !== answer) opts.add(fakeAnswer);
    }

    const shuffledOptions = Array.from(opts).sort(() => Math.random() - 0.5);

    setQuestion({ num1, num2, op, answer });
    setOptions(shuffledOptions);
    setTimeLeft(15);
  };

  const handleAnswer = (opt) => {
    if (gameOver) return;
    if (opt === question.answer) setScore(prev => prev + 1);
    setQuestionCount(prev => prev + 1);
    if ((questionCount + 1) % 5 === 0) setLevel(prev => prev + 1);
    generateQuestion();
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setQuestionCount(prevQ => prevQ + 1);
          if ((questionCount + 1) % 5 === 0) setLevel(prev => prev + 1);
          generateQuestion();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, questionCount]);

  useEffect(() => {
    // End game after 20 questions
    if (questionCount >= 20) setGameOver(true);
  }, [questionCount]);

  const handleRestart = () => {
    setScore(0);
    setLevel(1);
    setQuestionCount(0);
    setGameOver(false);
    generateQuestion();
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      padding: 20,
      backgroundColor: "#1f1f2e",
      color: "#fff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h1 style={{ marginBottom: 20, color: "#00d4ff" }}>🧮 Advanced Math Quiz Game</h1>

      <div style={{
        display: "flex",
        gap: 30,
        marginBottom: 20,
        fontSize: 18
      }}>
        <div>Score: <strong>{score}</strong></div>
        <div>Level: <strong>{level}</strong></div>
        <div>High Score: <strong>{highScore}</strong></div>
      </div>

      {!gameOver ? (
        <div style={{
          backgroundColor: "#2c2c3c",
          padding: 30,
          borderRadius: 15,
          boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
          minWidth: 350,
          textAlign: "center"
        }}>
          <div style={{ marginBottom: 20, fontSize: 28 }}>
            {question.num1} {question.op} {question.num2} = ?
          </div>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 15,
            justifyContent: "center"
          }}>
            {options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(opt)}
                style={{
                  flex: "1 1 40%",
                  padding: "15px",
                  fontSize: 20,
                  borderRadius: 10,
                  cursor: "pointer",
                  backgroundColor: "#00aaff",
                  border: "none",
                  color: "#fff",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
                  transition: "transform 0.2s, background-color 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                {opt}
              </button>
            ))}
          </div>

          <div style={{
            marginTop: 20,
            height: 15,
            width: "100%",
            backgroundColor: "#444",
            borderRadius: 10,
            overflow: "hidden"
          }}>
            <div style={{
              height: "100%",
              width: `${(timeLeft / 15) * 100}%`,
              backgroundColor: "#00ff99",
              transition: "width 1s linear"
            }} />
          </div>

          <p style={{ marginTop: 10 }}>Time left: {timeLeft}s</p>
        </div>
      ) : (
        <div style={{
          backgroundColor: "#2c2c3c",
          padding: 30,
          borderRadius: 15,
          boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
          textAlign: "center"
        }}>
          <h2 style={{ marginBottom: 15 }}>🎉 Game Over</h2>
          <p>Final Score: <strong>{score}</strong></p>
          <p>Level Reached: <strong>{level}</strong></p>
          <p>High Score: <strong>{highScore}</strong></p>
          <button onClick={handleRestart} style={{
            marginTop: 20,
            padding: "12px 25px",
            fontSize: 18,
            borderRadius: 10,
            backgroundColor: "#00d4ff",
            border: "none",
            color: "#000",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
            transition: "transform 0.2s, background-color 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

