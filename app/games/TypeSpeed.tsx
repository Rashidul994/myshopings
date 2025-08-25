"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const sentences = [
  "Programming is fun when you practice every day.",
  "Next.js makes building web apps fast and powerful.",
  "Typing speed depends on focus and accuracy.",
  "Bangladesh has a lot of talented young developers.",
  "Framer Motion adds life to your React projects.",
];

export default function TypingSpeedTest() {
  const [text, setText] = useState("");
  const [currentSentence, setCurrentSentence] = useState("");
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // নতুন বাক্য লোড
  const loadSentence = () => {
    const random =
      sentences[Math.floor(Math.random() * sentences.length)];
    setCurrentSentence(random);
    setText("");
  };

  useEffect(() => {
    loadSentence();
  }, []);

  // টাইমার
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (started && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setFinished(true);
      calculateResults();
    }
    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!started) setStarted(true);
    setText(e.target.value);
  };

  const calculateResults = () => {
    const wordsTyped = text.trim().split(" ").length;
    const timeTaken = 60 - timeLeft;
    const wordsPerMinute = Math.round((wordsTyped / timeTaken) * 60);

    // Accuracy
    let correctChars = 0;
    text.split("").forEach((char, i) => {
      if (char === currentSentence[i]) correctChars++;
    });
    const acc = Math.round((correctChars / currentSentence.length) * 100);

    setWpm(isNaN(wordsPerMinute) ? 0 : wordsPerMinute);
    setAccuracy(acc);
  };

  const restart = () => {
    setTimeLeft(60);
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    loadSentence();
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold mb-6"
      >
        Typing Speed Test
      </motion.h1>

      {!finished ? (
        <>
          <div className="bg-white text-black p-6 rounded-2xl shadow-lg max-w-2xl text-lg leading-relaxed mb-6">
            {currentSentence.split("").map((char, i) => {
              let color = "";
              if (i < text.length) {
                color =
                  char === text[i] ? "text-green-600" : "text-red-600";
              }
              return (
                <span key={i} className={`${color}`}>
                  {char}
                </span>
              );
            })}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={handleChange}
            disabled={finished || timeLeft === 0}
            className="w-full max-w-2xl p-4 rounded-xl text-black text-lg outline-none border-2 border-purple-400"
            placeholder="Start typing here..."
          />

          <div className="mt-4 text-xl">
            ⏳ Time Left:{" "}
            <span className="font-bold text-yellow-300">{timeLeft}s</span>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white text-black p-8 rounded-2xl shadow-2xl text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Result</h2>
          <p className="text-lg">⚡ WPM: {wpm}</p>
          <p className="text-lg">🎯 Accuracy: {accuracy}%</p>
          <button
            onClick={restart}
            className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Restart
          </button>
        </motion.div>
      )}
    </div>
  );
}
