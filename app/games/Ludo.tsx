'use client';

import { useState, useEffect } from 'react';

const BOARD_SIZE = 15; // 15x15 গ্রিড
const WIN_POSITION = 57; // মোট স্টেপ (লুডুতে 57 স্টেপ মুভ)

const COLORS = ['red', 'green', 'yellow', 'blue'];

// প্লেয়ারের স্পেসিফিক হোম পজিশন (বোর্ডে 4 কর্নার)
const HOME_POSITIONS = {
  red: [0, 0],
  green: [0, BOARD_SIZE - 1],
  yellow: [BOARD_SIZE - 1, BOARD_SIZE - 1],
  blue: [BOARD_SIZE - 1, 0],
};

// প্লেয়ারের স্টার্ট পজিশন (বোর্ডে)
const START_POSITIONS = {
  red: 0,
  green: 14,
  yellow: 28,
  blue: 42,
};

// বোর্ডের মুভমেন্ট পাথ (সিরিয়াসলি সিম্পলাইজড)
const PATH = [
  [6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],
  [14,1],[14,2],[14,3],[14,4],[14,5],
  [13,6],[12,6],[11,6],[10,6],[9,6],[8,6],[7,6],[6,6],
  [6,7],[6,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],
  [5,14],[4,14],[3,14],[2,14],[1,14],[0,14],
  [0,13],[0,12],[0,11],[0,10],[0,9],
  [1,8],[2,8],[3,8],[4,8],[5,8],
  [5,7],[5,6],[5,5],[5,4],[5,3],[5,2],[5,1],[5,0],
  [6,0]
];

function getTokenPositionOnBoard(player, step) {
  // step 0 মানে হোমে
  if (step === 0) return HOME_POSITIONS[player];
  if (step > WIN_POSITION) return null; // গেম শেষ হলে

  // step অনুযায়ী পাথ থেকে position পাবো
  let posIndex = (START_POSITIONS[player] + step - 1) % PATH.length;
  return PATH[posIndex];
}

export default function LudoGame() {
  // প্রতিটি প্লেয়ারের ৪ টা টোকেনের পজিশন (step 0 = home)
  const [tokens, setTokens] = useState({
    red: [0, 0, 0, 0],
    green: [0, 0, 0, 0],
    yellow: [0, 0, 0, 0],
    blue: [0, 0, 0, 0],
  });

  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [dice, setDice] = useState(null);
  const [message, setMessage] = useState('ডাইস রোল করতে ক্লিক করুন');
  const [diceRolling, setDiceRolling] = useState(false);
  const [winner, setWinner] = useState(null);

  // প্লেয়ারের নেক্সট টার্ন সেট করা
  const nextPlayer = {
    red: 'green',
    green: 'yellow',
    yellow: 'blue',
    blue: 'red',
  };

  // ডাইস রোল ফাংশন (6 পর্যন্ত রোল)
  const rollDice = () => {
    if (diceRolling || winner) return;

    setDiceRolling(true);
    setMessage('ডাইস রোল হচ্ছে...');
    let rolls = 10;
    let currentRoll = 0;

    const rollInterval = setInterval(() => {
      const val = Math.floor(Math.random() * 6) + 1;
      setDice(val);
      currentRoll++;

      if (currentRoll >= rolls) {
        clearInterval(rollInterval);
        setDiceRolling(false);
        setMessage(`প্লেয়ার ${currentPlayer.toUpperCase()} ডাইস রোল করলেন: ${val}`);
        handleMove(val);
      }
    }, 100);
  };

  // মুভ লজিক
  const handleMove = (diceValue) => {
    if (winner) return;

    let playerTokens = tokens[currentPlayer];
    let movableIndexes = [];

    // কোন টোকেনগুলো মুভ করা যাবে?
    playerTokens.forEach((step, i) => {
      if (step === 0 && diceValue === 6) {
        // হোম থেকে বের করা যাবে
        movableIndexes.push(i);
      } else if (step > 0 && step + diceValue <= WIN_POSITION) {
        movableIndexes.push(i);
      }
    });

    if (movableIndexes.length === 0) {
      setMessage(`প্লেয়ার ${currentPlayer.toUpperCase()} এর কোনো টোকেন মুভ করা যাবে না`);
      if (diceValue !== 6) {
        setCurrentPlayer(nextPlayer[currentPlayer]);
      } else {
        setMessage(prev => prev + ' — আবার খেলুন!');
      }
      return;
    }

    setMessage(`প্লেয়ার ${currentPlayer.toUpperCase()}, কোন টোকেন মুভ করবেন?`);

    // স্বয়ংক্রিয়ভাবে প্রথম মুভেবল টোকেন মুভ করানো (তুমি চাইলে ইউজার ইন্টার‌্যাকশন যোগ করতে পারো)
    moveToken(movableIndexes[0], diceValue);
  };

  // টোকেন মুভ করানো
  const moveToken = (tokenIndex, diceValue) => {
    setTokens(prev => {
      let playerTokens = [...prev[currentPlayer]];
      let currentStep = playerTokens[tokenIndex];

      if (currentStep === 0 && diceValue === 6) {
        playerTokens[tokenIndex] = 1; // হোম থেকে বের হল
      } else {
        playerTokens[tokenIndex] = currentStep + diceValue;
      }

      // চেক জেতা কি?
      if (playerTokens[tokenIndex] === WIN_POSITION) {
        setWinner(currentPlayer);
        setMessage(`🎉 প্লেয়ার ${currentPlayer.toUpperCase()} জিতেছেন! 🎉`);
      }

      return {
        ...prev,
        [currentPlayer]: playerTokens,
      };
    });

    // যদি ডাইস 6 না হয় তাহলে টার্ন বদলাও
    if (diceValue !== 6) {
      setCurrentPlayer(nextPlayer[currentPlayer]);
    } else {
      setMessage(prev => prev + ' — আবার খেলুন!');
    }
  };

  // বোর্ড গ্রিড তৈরী
  const renderBoard = () => {
    let grid = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        // প্লেয়ার টোকেন আছে কি চেক করব
        let tokenHere = null;
        Object.entries(tokens).forEach(([player, tokenArr]) => {
          tokenArr.forEach((step, idx) => {
            const [x, y] = getTokenPositionOnBoard(player, step) || [-1, -1];
            if (x === row && y === col) {
              tokenHere = { player, idx };
            }
          });
        });

        // বোর্ড সেল স্টাইল
        let bgColor = '#eee';
        if (
          (row === 0 && col === 0) ||
          (row === 0 && col === BOARD_SIZE - 1) ||
          (row === BOARD_SIZE - 1 && col === 0) ||
          (row === BOARD_SIZE - 1 && col === BOARD_SIZE - 1)
        ) {
          bgColor = '#ccc';
        } else if (
          (row >= 6 && row <= 8 && col >= 0 && col <= 14) ||
          (col >= 6 && col <= 8 && row >= 0 && row <= 14)
        ) {
          bgColor = '#f8f8f8';
        }

        grid.push(
          <div
            key={`${row}-${col}`}
            style={{
              width: 30,
              height: 30,
              border: '1px solid #aaa',
              backgroundColor: bgColor,
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            {/* টোকেন দেখানো */}
            {tokenHere && (
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  backgroundColor: COLORS.indexOf(tokenHere.player) !== -1 ? COLORS[COLORS.indexOf(tokenHere.player)] : 'gray',
                  border: '2px solid #444',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                title={`${tokenHere.player.toUpperCase()} টোকেন #${tokenHere.idx + 1}`}
              ></div>
            )}
          </div>
        );
      }
    }
    return grid;
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', maxWidth: 550, margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 10 }}>🎲 লুডু গেম 🎲</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 30px)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 30px)`,
          marginBottom: 20,
          userSelect: 'none',
          border: '2px solid #333',
        }}
      >
        {renderBoard()}
      </div>

      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <button
          onClick={rollDice}
          disabled={diceRolling || winner !== null}
          style={{
            padding: '10px 20px',
            fontSize: 18,
            cursor: diceRolling || winner !== null ? 'not-allowed' : 'pointer',
          }}
        >
          {diceRolling ? 'রোল হচ্ছে...' : 'ডাইস রোল করো'}
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <p>বর্তমান প্লেয়ার: <b style={{ color: currentPlayer }}>{currentPlayer.toUpperCase()}</b></p>
        <p>ডাইস রোল: {dice || '-'}</p>
        <p>{message}</p>
        {winner && <p style={{ fontSize: 22, color: 'green' }}>🎉 প্লেয়ার {winner.toUpperCase()} জয়ী হয়েছে! 🎉</p>}
      </div>
    </div>
  );
}

