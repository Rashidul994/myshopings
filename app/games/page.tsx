import React from 'react'

// import Snack from './Snack'
import Snack from './spin/Spin2'
export default function page() {

  return (
  <Snack />
  )
}










// 'use client'

// import { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import { FaDice } from 'react-icons/fa'

// type Color = 'red' | 'green' | 'yellow' | 'blue'

// const playerColors: Record<Color, string> = {
//   red: '#dc2626',
//   green: '#16a34a',
//   yellow: '#ca8a04',
//   blue: '#2563eb',
// }

// const playerOrder: Color[] = ['red', 'green', 'yellow', 'blue']

// const BOARD_SIZE = 15 // 15x15 grid for ludo board

// const HOME_STEPS = 6

// // Starting indices on main path for each color
// const playerStartIndex: Record<Color, number> = {
//   red: 0,
//   green: 13,
//   yellow: 26,
//   blue: 39,
// }

// // Safe spots on board path indices
// const safeSpots = [0, 8, 13, 21, 26, 34, 39, 47]

// /** 
//  * Board path positions in grid coordinates (row, col) for 52 steps
//  * These correspond to the outer ring of the board in clockwise order
//  */
// const boardPathCoords: { row: number; col: number }[] = [
//   { row: 6, col: 0 },
//   { row: 6, col: 1 },
//   { row: 6, col: 2 },
//   { row: 6, col: 3 },
//   { row: 6, col: 4 },
//   { row: 5, col: 5 },
//   { row: 4, col: 6 },
//   { row: 3, col: 6 },
//   { row: 2, col: 6 },
//   { row: 1, col: 6 },
//   { row: 0, col: 6 },
//   { row: 0, col: 7 },
//   { row: 0, col: 8 },
//   { row: 1, col: 8 },
//   { row: 2, col: 8 },
//   { row: 3, col: 8 },
//   { row: 4, col: 8 },
//   { row: 5, col: 9 },
//   { row: 6, col: 10 },
//   { row: 6, col: 11 },
//   { row: 6, col: 12 },
//   { row: 6, col: 13 },
//   { row: 6, col: 14 },
//   { row: 7, col: 14 },
//   { row: 8, col: 14 },
//   { row: 8, col: 13 },
//   { row: 8, col: 12 },
//   { row: 8, col: 11 },
//   { row: 8, col: 10 },
//   { row: 9, col: 9 },
//   { row: 10, col: 8 },
//   { row: 11, col: 8 },
//   { row: 12, col: 8 },
//   { row: 13, col: 8 },
//   { row: 14, col: 8 },
//   { row: 14, col: 7 },
//   { row: 14, col: 6 },
//   { row: 13, col: 6 },
//   { row: 12, col: 6 },
//   { row: 11, col: 6 },
//   { row: 10, col: 6 },
//   { row: 9, col: 5 },
//   { row: 8, col: 4 },
//   { row: 8, col: 3 },
//   { row: 8, col: 2 },
//   { row: 8, col: 1 },
//   { row: 8, col: 0 },
//   { row: 7, col: 0 },
//   { row: 6, col: 0 }, // back to start (loop)
// ]

// /**
//  * Home path coordinates for each player (6 steps)
//  * Row, col on grid to move tokens inside home stretch
//  */
// const homePaths: Record<Color, { row: number; col: number }[]> = {
//   red: [
//     { row: 7, col: 1 },
//     { row: 7, col: 2 },
//     { row: 7, col: 3 },
//     { row: 7, col: 4 },
//     { row: 7, col: 5 },
//     { row: 7, col: 6 },
//   ],
//   green: [
//     { row: 1, col: 7 },
//     { row: 2, col: 7 },
//     { row: 3, col: 7 },
//     { row: 4, col: 7 },
//     { row: 5, col: 7 },
//     { row: 6, col: 7 },
//   ],
//   yellow: [
//     { row: 7, col: 13 },
//     { row: 7, col: 12 },
//     { row: 7, col: 11 },
//     { row: 7, col: 10 },
//     { row: 7, col: 9 },
//     { row: 7, col: 8 },
//   ],
//   blue: [
//     { row: 13, col: 7 },
//     { row: 12, col: 7 },
//     { row: 11, col: 7 },
//     { row: 10, col: 7 },
//     { row: 9, col: 7 },
//     { row: 8, col: 7 },
//   ],
// }

// interface Token {
//   id: number
//   position: number // -1: at base, 0-51 on board path, 52-57 home stretch
// }

// interface Player {
//   color: Color
//   tokens: Token[]
// }

// export default function LudoGame() {
//   const [players, setPlayers] = useState<Player[]>(
//     playerOrder.map((color) => ({
//       color,
//       tokens: Array.from({ length: 4 }, (_, i) => ({
//         id: i,
//         position: -1,
//       })),
//     }))
//   )

//   const [current, setCurrent] = useState(0)
//   const [dice, setDice] = useState<number | null>(null)
//   const [selecting, setSelecting] = useState(false)
//   const [movingToken, setMovingToken] = useState<{ playerIdx: number; tokenId: number } | null>(null)
//   const [stepQueue, setStepQueue] = useState<number[]>([])
//   const [winner, setWinner] = useState<Color | null>(null)

//   const currentPlayer = players[current]

//   // Roll dice
//   function rollDice() {
//     if (winner || selecting || movingToken) return
//     const roll = Math.ceil(Math.random() * 6)
//     setDice(roll)

//     const canMove = currentPlayer.tokens.some((t) => {
//       if (t.position === -1) return roll === 6
//       return t.position + roll <= 57
//     })

//     if (canMove) setSelecting(true)
//     else {
//       // no moves possible, pass turn after delay
//       setTimeout(() => nextTurn(roll), 1200)
//     }
//   }

//   // Animate steps
//   useEffect(() => {
//     if (!movingToken || stepQueue.length === 0) return
//     const nextPos = stepQueue[0]

//     setPlayers((prev) => {
//       const updated = [...prev]
//       const player = { ...updated[movingToken.playerIdx] }
//       const tokens = [...player.tokens]
//       tokens[movingToken.tokenId] = { ...tokens[movingToken.tokenId], position: nextPos }
//       player.tokens = tokens
//       updated[movingToken.playerIdx] = player
//       return updated
//     })

//     setStepQueue((q) => q.slice(1))
//   }, [stepQueue, movingToken])

//   // After steps finish
//   useEffect(() => {
//     if (stepQueue.length !== 0 || !movingToken) return

//     if (movingToken) {
//       captureOpponent(movingToken.playerIdx, movingToken.tokenId)
//       if (checkWin(movingToken.playerIdx)) {
//         setWinner(players[movingToken.playerIdx].color)
//         return
//       }
//     }
//     setMovingToken(null)

//     if (dice !== 6) nextTurn(dice!)
//     else setSelecting(true)
//   }, [stepQueue, movingToken, dice])

//   // Next player's turn
//   function nextTurn(rolled: number) {
//     if (rolled === 6) return
//     setCurrent((c) => (c + 1) % 4)
//     setDice(null)
//   }

//   // Capture opponent tokens if landed on their position (only main path)
//   function captureOpponent(playerIdx: number, tokenId: number) {
//     const player = players[playerIdx]
//     const token = player.tokens[tokenId]
//     if (token.position < 0 || token.position > 51) return

//     const realPos = (playerStartIndex[player.color] + token.position) % 52
//     if (safeSpots.includes(realPos)) return

//     setPlayers((prev) => {
//       const updated = [...prev]
//       updated.forEach((p, idx) => {
//         if (idx === playerIdx) return
//         p.tokens.forEach((t, tid) => {
//           if (
//             t.position >= 0 &&
//             t.position <= 51 &&
//             (playerStartIndex[p.color] + t.position) % 52 === realPos
//           ) {
//             const newTokens = [...p.tokens]
//             newTokens[tid] = { ...newTokens[tid], position: -1 }
//             updated[idx] = { ...p, tokens: newTokens }
//           }
//         })
//       })
//       return updated
//     })
//   }

//   // Check if player has won
//   function checkWin(playerIdx: number) {
//     return players[playerIdx].tokens.every((t) => t.position === 57)
//   }

//   // Move token by dice roll
//   function moveToken(tokenId: number) {
//     if (!dice) return
//     setSelecting(false)

//     const token = currentPlayer.tokens.find((t) => t.id === tokenId)
//     if (!token) return

//     const steps: number[] = []
//     const start = token.position
//     if (start === -1 && dice === 6) {
//       steps.push(0) // enter board
//     } else if (start >= 0) {
//       for (let i = 1; i <= dice; i++) {
//         let next = start + i
//         if (next > 57) {
//           // bounce back
//           const diff = next - 57
//           next = 57 - diff
//         }
//         steps.push(next)
//       }
//     } else {
//       return
//     }
//     setMovingToken({ playerIdx: current, tokenId })
//     setStepQueue(steps)
//   }

//   // Calculate CSS grid position for token
//   function getTokenGridPos(player: Player, token: Token) {
//     const pos = token.position
//     if (pos === -1) {
//       // base positions (4 tokens per player)
//       const baseCoords: Record<Color, { row: number; col: number }[]> = {
//         red: [
//           { row: 12, col: 1 },
//           { row: 12, col: 3 },
//           { row: 10, col: 1 },
//           { row: 10, col: 3 },
//         ],
//         green: [
//           { row: 1, col: 1 },
//           { row: 1, col: 3 },
//           { row: 3, col: 1 },
//           { row: 3, col: 3 },
//         ],
//         yellow: [
//           { row: 1, col: 11 },
//           { row: 1, col: 13 },
//           { row: 3, col: 11 },
//           { row: 3, col: 13 },
//         ],
//         blue: [
//           { row: 12, col: 11 },
//           { row: 12, col: 13 },
//           { row: 10, col: 11 },
//           { row: 10, col: 13 },
//         ],
//       }
//       return baseCoords[player.color][token.id]
//     } else if (pos >= 0 && pos <= 51) {
//       return boardPathCoords[(playerStartIndex[player.color] + pos) % 52]
//     } else {
//       // home stretch
//       return homePaths[player.color][pos - 52]
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-200 p-4 select-none">
//       <h1 className="text-3xl font-bold mb-4 text-yellow-800 select-text">🎲 Classic Ludo Game</h1>

//       {/* Board Grid */}
//       <div
//         className="relative grid grid-cols-15 grid-rows-15 gap-[2px] bg-yellow-100 border-4 border-yellow-500 rounded-lg w-[90vw] max-w-[600px] aspect-square"
//         style={{ userSelect: 'none' }}
//       >
//         {/* Squares */}
//         {[...Array(15 * 15)].map((_, i) => {
//           const row = Math.floor(i / 15)
//           const col = i % 15

//           // Base areas color
//           const inRedBase =
//             row >= 10 && row <= 13 && col >= 0 && col <= 3
//           const inGreenBase =
//             row >= 0 && row <= 3 && col >= 0 && col <= 3
//           const inYellowBase =
//             row >= 0 && row <= 3 && col >= 11 && col <= 14
//           const inBlueBase =
//             row >= 10 && row <= 13 && col >= 11 && col <= 14

//           // Center safe home
//           const isCenterSafe =
//             row >= 6 && row <= 8 && col >= 6 && col <= 8

//           // Home row paths
//           let homePathColor: Color | null = null
//           for (const color of playerOrder) {
//             const path = homePaths[color]
//             if (path.some((pos) => pos.row === row && pos.col === col)) {
//               homePathColor = color
//               break
//             }
//           }

//           // Board path squares
//           const isBoardPath = boardPathCoords.some((pos) => pos.row === row && pos.col === col)

//           // Safe spot
//           let isSafeSpot = false
//           if (isBoardPath) {
//             const idx = boardPathCoords.findIndex((pos) => pos.row === row && pos.col === col)
//             isSafeSpot = safeSpots.includes(idx)
//           }

//           // Assign colors & classes
//           let bgColor = 'bg-yellow-100'
//           if (inRedBase) bgColor = 'bg-red-600'
//           else if (inGreenBase) bgColor = 'bg-green-600'
//           else if (inYellowBase) bgColor = 'bg-yellow-500'
//           else if (inBlueBase) bgColor = 'bg-blue-600'
//           else if (isCenterSafe) bgColor = 'bg-yellow-200'
//           else if (homePathColor) bgColor = playerColors[homePathColor] + '70' // translucent home path color
//           else if (isBoardPath) bgColor = 'bg-yellow-300'

//           return (
//             <div
//               key={i}
//               className={`${bgColor} border border-yellow-300 w-full h-full`}
//               style={{ touchAction: 'manipulation' }}
//             />
//           )
//         })}

//         {/* Tokens */}
//         {players.map((player, pIdx) =>
//           player.tokens.map((token) => {
//             const pos = getTokenGridPos(player, token)
//             return (
//               <motion.div
//                 key={`${player.color}-${token.id}`}
//                 className="absolute w-7 h-7 rounded-full shadow-md border-2 border-white cursor-pointer flex items-center justify-center font-bold text-white select-none"
//                 style={{
//                   backgroundColor: playerColors[player.color],
//                   gridRowStart: pos.row + 1,
//                   gridColumnStart: pos.col + 1,
//                   zIndex:
//                     movingToken &&
//                     movingToken.playerIdx === pIdx &&
//                     movingToken.tokenId === token.id
//                       ? 100
//                       : 10,
//                   top: 0,
//                   left: 0,
//                   translate: '0',
//                 }}
//                 layout
//                 whileTap={{ scale: selecting && current === pIdx ? 1.2 : 1 }}
//                 onClick={() => {
//                   if (selecting && current === pIdx && !winner) moveToken(token.id)
//                 }}
//                 transition={{ type: 'spring', stiffness: 400, damping: 25 }}
//               >
//                 {token.id + 1}
//               </motion.div>
//             )
//           })
//         )}
//       </div>

//       {/* Controls */}
//       <div className="mt-6 flex flex-col items-center space-y-3 select-text">
//         {winner ? (
//           <>
//             <p className="text-xl font-bold text-yellow-900">
//               🏆 {winner.toUpperCase()} Wins!
//             </p>
//             <button
//               className="px-6 py-2 rounded-md bg-yellow-400 text-yellow-900 font-semibold hover:bg-yellow-300 shadow"
//               onClick={() => {
//                 setPlayers(
//                   playerOrder.map((color) => ({
//                     color,
//                     tokens: Array.from({ length: 4 }, (_, i) => ({
//                       id: i,
//                       position: -1,
//                     })),
//                   }))
//                 )
//                 setCurrent(0)
//                 setDice(null)
//                 setSelecting(false)
//                 setMovingToken(null)
//                 setStepQueue([])
//                 setWinner(null)
//               }}
//             >
//               Restart Game
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               disabled={selecting || movingToken !== null}
//               onClick={rollDice}
//               className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow transition active:scale-95
//                 ${
//                   selecting || movingToken !== null
//                     ? 'bg-yellow-200 cursor-not-allowed text-yellow-500'
//                     : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300'
//                 }`}
//             >
//               <FaDice /> Roll Dice {dice !== null ? `(${dice})` : ''}
//             </button>
//             <p className="text-yellow-900 font-semibold select-text mt-1">
//               Turn: <span className={`font-bold`} style={{ color: playerColors[currentPlayer.color] }}>
//                 {currentPlayer.color.toUpperCase()}
//               </span>
//             </p>
//             <p className="text-sm max-w-xs text-yellow-900/80 text-center select-text mt-2">
//               Click on your tokens to move them. Roll a 6 to bring tokens out from base. First to get all tokens home wins.
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

















// // 'use client'

// // import { useEffect, useState } from 'react'
// // import { motion } from 'framer-motion'
// // import { FaDice } from 'react-icons/fa'

// // type Color = 'red' | 'green' | 'yellow' | 'blue'

// // const playerColors: Record<Color, string> = {
// //   red: '#ef4444',
// //   green: '#22c55e',
// //   yellow: '#eab308',
// //   blue: '#3b82f6',
// // }

// // const playerOrder: Color[] = ['red', 'green', 'yellow', 'blue']

// // const BOARD_PATH = Array.from({ length: 52 }).map((_, i) => {
// //   const center = 160
// //   const radius = 120
// //   const angle = (i / 52) * 2 * Math.PI - Math.PI / 2
// //   return {
// //     x: center + radius * Math.cos(angle) - 16,
// //     y: center + radius * Math.sin(angle) - 16,
// //   }
// // })

// // const playerStartIndex: Record<Color, number> = {
// //   red: 0,
// //   green: 13,
// //   yellow: 26,
// //   blue: 39,
// // }

// // const homePathLength = 6

// // // Safe zones: indices on the board path where tokens cannot be captured
// // const safeZones = [0, 8, 13, 21, 26, 34, 39, 47]

// // interface Token {
// //   id: number
// //   position: number // -1 home, 0-51 board, 52-57 home stretch
// //   animating: boolean
// // }

// // interface Player {
// //   color: Color
// //   tokens: Token[]
// // }

// // export default function LudoGame() {
// //   const [players, setPlayers] = useState<Player[]>(
// //     playerOrder.map((color) => ({
// //       color,
// //       tokens: Array.from({ length: 4 }, (_, i) => ({
// //         id: i,
// //         position: -1,
// //         animating: false,
// //       })),
// //     }))
// //   )
// //   const [current, setCurrent] = useState(0)
// //   const [dice, setDice] = useState<number | null>(null)
// //   const [selecting, setSelecting] = useState(false)
// //   const [movingToken, setMovingToken] = useState<{ player: number; tokenId: number } | null>(null)
// //   const [stepQueue, setStepQueue] = useState<number[]>([])
// //   const [winner, setWinner] = useState<Color | null>(null)

// //   const currentPlayer = players[current]

// //   const rollDice = () => {
// //     if (selecting || movingToken || winner) return
// //     const roll = Math.ceil(Math.random() * 6)
// //     setDice(roll)

// //     const canMove = currentPlayer.tokens.some((token) => {
// //       if (token.position === -1) return roll === 6
// //       return token.position + roll <= 57
// //     })

// //     if (canMove) setSelecting(true)
// //     else {
// //       setTimeout(() => nextTurn(roll), 1200)
// //     }
// //   }

// //   // Animate step by step movement
// //   useEffect(() => {
// //     if (stepQueue.length === 0 || !movingToken) return

// //     const nextStep = stepQueue[0]

// //     setPlayers((prev) => {
// //       const updated = [...prev]
// //       const player = { ...updated[movingToken.player] }
// //       const tokens = [...player.tokens]
// //       tokens[movingToken.tokenId] = {
// //         ...tokens[movingToken.tokenId],
// //         position: nextStep,
// //       }
// //       player.tokens = tokens
// //       updated[movingToken.player] = player
// //       return updated
// //     })

// //     setStepQueue((q) => q.slice(1))
// //   }, [stepQueue, movingToken])

// //   // After finishing movement steps
// //   useEffect(() => {
// //     if (stepQueue.length > 0) return
// //     if (!movingToken) return

// //     // Capture logic on landing
// //     handleCapture(movingToken.player, movingToken.tokenId)

// //     // Check win condition
// //     if (checkWin(movingToken.player)) {
// //       setWinner(players[movingToken.player].color)
// //       return
// //     }

// //     setMovingToken(null)

// //     if (dice !== 6) nextTurn(dice!)
// //     else setSelecting(true)
// //   }, [stepQueue, movingToken, dice])

// //   const nextTurn = (rolled: number) => {
// //     if (rolled === 6) return
// //     setCurrent((prev) => (prev + 1) % 4)
// //     setDice(null)
// //   }

// //   const handleCapture = (playerIdx: number, tokenId: number) => {
// //     const player = players[playerIdx]
// //     const token = player.tokens[tokenId]
// //     if (token.position < 0 || token.position > 51) return // only on main path

// //     const realIndex = (playerStartIndex[player.color] + token.position) % 52
// //     if (safeZones.includes(realIndex)) return // safe zone no capture

// //     setPlayers((prev) => {
// //       const updated = [...prev]
// //       updated.forEach((p, pIdx) => {
// //         if (pIdx === playerIdx) return // skip current player
// //         p.tokens.forEach((t, tIdx) => {
// //           const oppRealIndex = (playerStartIndex[p.color] + t.position) % 52
// //           if (t.position >= 0 && t.position <= 51 && oppRealIndex === realIndex) {
// //             // Capture opponent token
// //             const oppTokens = [...p.tokens]
// //             oppTokens[tIdx] = { ...oppTokens[tIdx], position: -1 }
// //             updated[pIdx] = { ...p, tokens: oppTokens }
// //           }
// //         })
// //       })
// //       return updated
// //     })
// //   }

// //   const checkWin = (playerIdx: number) => {
// //     return players[playerIdx].tokens.every((t) => t.position === 57)
// //   }

// //   const moveToken = (tokenId: number) => {
// //     if (!dice) return
// //     setSelecting(false)

// //     const token = currentPlayer.tokens.find((t) => t.id === tokenId)
// //     if (!token) return

// //     // Calculate steps for animation with home stretch
// //     const steps: number[] = []
// //     const startPos = token.position
// //     if (startPos === -1 && dice === 6) {
// //       steps.push(0) // enter board start
// //     } else if (startPos >= 0) {
// //       for (let i = 1; i <= dice; i++) {
// //         let nextPos = startPos + i
// //         if (nextPos > 57) {
// //           // bounce back logic
// //           const diff = nextPos - 57
// //           nextPos = 57 - diff
// //         }
// //         steps.push(nextPos)
// //       }
// //     } else {
// //       return
// //     }

// //     setMovingToken({ player: current, tokenId })
// //     setStepQueue(steps)
// //   }

// //   function getTokenPosition(player: Player, token: Token) {
// //     const size = 32
// //     const startIndex = playerStartIndex[player.color]
// //     let pos = token.position

// //     if (pos === -1) {
// //       const basePositions: Record<Color, { x: number; y: number }[]> = {
// //         red: [
// //           { x: 40, y: 40 },
// //           { x: 80, y: 40 },
// //           { x: 40, y: 80 },
// //           { x: 80, y: 80 },
// //         ],
// //         green: [
// //           { x: 40, y: 280 },
// //           { x: 80, y: 280 },
// //           { x: 40, y: 240 },
// //           { x: 80, y: 240 },
// //         ],
// //         yellow: [
// //           { x: 280, y: 40 },
// //           { x: 240, y: 40 },
// //           { x: 280, y: 80 },
// //           { x: 240, y: 80 },
// //         ],
// //         blue: [
// //           { x: 280, y: 280 },
// //           { x: 240, y: 280 },
// //           { x: 280, y: 240 },
// //           { x: 240, y: 240 },
// //         ],
// //       }
// //       return {
// //         left: basePositions[player.color][token.id].x,
// //         top: basePositions[player.color][token.id].y,
// //       }
// //     } else if (pos >= 0 && pos <= 51) {
// //       const realIndex = (startIndex + pos) % 52
// //       const { x, y } = BOARD_PATH[realIndex]
// //       return { left: x, top: y }
// //     } else {
// //       // home stretch (vertical line toward center)
// //       // Calculate y position closer to center (top)
// //       const step = pos - 52
// //       const homeBaseX = player.color === 'red' ? 60 : player.color === 'green' ? 60 : player.color === 'yellow' ? 260 : 260
// //       const homeBaseY = player.color === 'red' ? 200 : player.color === 'green' ? 120 : player.color === 'yellow' ? 200 : 120
// //       return {
// //         left: homeBaseX,
// //         top: homeBaseY - step * 28,
// //       }
// //     }
// //   }

// //   const colorEmoji: Record<Color, string> = {
// //     red: '🔴',
// //     green: '🟢',
// //     yellow: '🟡',
// //     blue: '🔵',
// //   }

// //   return (
// //     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-lime-100 to-green-300 p-4 select-none">
// //       <h1 className="text-2xl font-bold text-green-900 mb-2">🎲 Classic Ludo (Phase 3 Step 2)</h1>

// //       {/* Board */}
// //       <div className="relative w-[320px] h-[320px] rounded-lg border-4 border-green-800 bg-white">
// //         <svg
// //           className="absolute top-0 left-0 w-full h-full pointer-events-none"
// //           viewBox="0 0 320 320"
// //           fill="none"
// //           xmlns="http://www.w3.org/2000/svg"
// //         >
// //           <circle
// //             cx="160"
// //             cy="160"
// //             r="120"
// //             stroke="#22c55e"
// //             strokeWidth="4"
// //             strokeDasharray="6 6"
// //           />
// //           {/* safe zones */}
// //           {safeZones.map((idx) => {
// //             const { x, y } = BOARD_PATH[idx]
// //             return (
// //               <circle
// //                 key={idx}
// //                 cx={x + 16}
// //                 cy={y + 16}
// //                 r={10}
// //                 fill="none"
// //                 stroke="#facc15"
// //                 strokeWidth={2}
// //               />
// //             )
// //           })}
// //         </svg>

// //         {/* Tokens */}
// //         {players.map((player, pIndex) =>
// //           player.tokens.map((token) => {
// //             const posStyle = getTokenPosition(player, token)
// //             return (
// //               <motion.div
// //                 key={`${player.color}-${token.id}`}
// //                 className="absolute w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-lg cursor-pointer select-none"
// //                 style={{
// //                   backgroundColor: playerColors[player.color],
// //                   left: posStyle.left,
// //                   top: posStyle.top,
// //                   zIndex:
// //                     movingToken &&
// //                     movingToken.player === pIndex &&
// //                     movingToken.tokenId === token.id
// //                       ? 100
// //                       : 10,
// //                 }}
// //                 whileTap={{ scale: selecting && current === pIndex ? 0.8 : 1 }}
// //                 onClick={() => {
// //                   if (selecting && current === pIndex && !winner) moveToken(token.id)
// //                 }}
// //               >
// //                 {token.id + 1}
// //               </motion.div>
// //             )
// //           })
// //         )}
// //       </div>

// //       {/* Controls */}
// //       <div className="flex flex-col items-center space-y-2 mt-4">
// //         {winner ? (
// //           <>
// //             <p className="text-xl font-bold text-purple-700">
// //               🏆 {colorEmoji[winner]} {winner.toUpperCase()} WON!
// //             </p>
// //             <button
// //               onClick={() => {
// //                 setPlayers(
// //                   playerOrder.map((color) => ({
// //                     color,
// //                     tokens: Array.from({ length: 4 }, (_, i) => ({
// //                       id: i,
// //                       position: -1,
// //                       animating: false,
// //                     })),
// //                   }))
// //                 )
// //                 setWinner(null)
// //                 setCurrent(0)
// //                 setDice(null)
// //                 setSelecting(false)
// //                 setMovingToken(null)
// //                 setStepQueue([])
// //               }}
// //               className="px-6 py-2 bg-white rounded-lg shadow hover:bg-gray-100"
// //             >
// //               Restart
// //             </button>
// //           </>
// //         ) : (
// //           <>
// //             <button
// //               onClick={rollDice}
// //               disabled={selecting || movingToken !== null}
// //               className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition active:scale-95 shadow ${
// //                 selecting || movingToken !== null
// //                   ? 'bg-yellow-200 text-gray-600 cursor-not-allowed'
// //                   : 'bg-yellow-400 text-green-900 hover:bg-yellow-300'
// //               }`}
// //             >
// //               <FaDice /> Roll{dice !== null ? ` (${dice})` : ''}
// //             </button>
// //             <p className="text-green-800 font-medium mt-1">
// //               Turn: {colorEmoji[currentPlayer.color]} {currentPlayer.color.toUpperCase()}
// //             </p>
// //           </>
// //         )}
// //       </div>

// //       <p className="text-xs text-green-800/60 mt-4 max-w-xs text-center">
// //         Roll 🎲, move tokens carefully! Capture opponents by landing on them (except safe zones). First to bring all 4 tokens home wins.
// //       </p>
// //     </div>
// //   )
// // }







// // 'use client'

// // import React from 'react'

// // export default function LudoBoard() {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-lime-100 to-green-300 flex items-center justify-center p-4">
// //       <div className="grid grid-cols-3 grid-rows-3 w-full max-w-[480px] aspect-square border-4 border-green-800">

// //         {/* 🔴 Red Home */}
// //         <div className="bg-red-500 flex flex-wrap justify-center items-center p-2 border-2 border-white">
// //           {Array.from({ length: 4 }).map((_, i) => (
// //             <div
// //               key={i}
// //               className="w-1/2 h-1/2 flex items-center justify-center p-1"
// //             >
// //               <div className="w-full h-full bg-white rounded-full border-2 border-red-800" />
// //             </div>
// //           ))}
// //         </div>

// //         {/* Top middle path */}
// //         <div className="grid grid-cols-3 grid-rows-6 gap-px bg-white">
// //           {Array.from({ length: 18 }).map((_, i) => (
// //             <div
// //               key={i}
// //               className={`w-full h-full ${
// //                 i === 5 ? 'bg-red-400' : i === 8 ? 'bg-yellow-400' : 'bg-green-100'
// //               } border border-green-800`}
// //             />
// //           ))}
// //         </div>

// //         {/* 🟡 Yellow Home */}
// //         <div className="bg-yellow-400 flex flex-wrap justify-center items-center p-2 border-2 border-white">
// //           {Array.from({ length: 4 }).map((_, i) => (
// //             <div
// //               key={i}
// //               className="w-1/2 h-1/2 flex items-center justify-center p-1"
// //             >
// //               <div className="w-full h-full bg-white rounded-full border-2 border-yellow-600" />
// //             </div>
// //           ))}
// //         </div>

// //         {/* Left middle path */}
// //         <div className="grid grid-cols-6 grid-rows-3 gap-px bg-white">
// //           {Array.from({ length: 18 }).map((_, i) => (
// //             <div
// //               key={i}
// //               className={`w-full h-full ${
// //                 i === 11 ? 'bg-green-400' : i === 14 ? 'bg-blue-400' : 'bg-green-100'
// //               } border border-green-800`}
// //             />
// //           ))}
// //         </div>

// //         {/* Center – White Star */}
// //         <div className="bg-white flex items-center justify-center border-2 border-green-800">
// //           <div className="w-16 h-16 rounded-full bg-white border-4 border-green-700 shadow-inner" />
// //         </div>

// //         {/* Right middle path */}
// //         <div className="grid grid-cols-6 grid-rows-3 gap-px bg-white">
// //           {Array.from({ length: 18 }).map((_, i) => (
// //             <div
// //               key={i}
// //               className={`w-full h-full ${
// //                 i === 3 ? 'bg-yellow-400' : i === 6 ? 'bg-red-400' : 'bg-green-100'
// //               } border border-green-800`}
// //             />
// //           ))}
// //         </div>

// //         {/* 🟢 Green Home */}
// //         <div className="bg-green-500 flex flex-wrap justify-center items-center p-2 border-2 border-white">
// //           {Array.from({ length: 4 }).map((_, i) => (
// //             <div
// //               key={i}
// //               className="w-1/2 h-1/2 flex items-center justify-center p-1"
// //             >
// //               <div className="w-full h-full bg-white rounded-full border-2 border-green-800" />
// //             </div>
// //           ))}
// //         </div>

// //         {/* Bottom middle path */}
// //         <div className="grid grid-cols-3 grid-rows-6 gap-px bg-white">
// //           {Array.from({ length: 18 }).map((_, i) => (
// //             <div
// //               key={i}
// //               className={`w-full h-full ${
// //                 i === 2 ? 'bg-blue-400' : i === 11 ? 'bg-green-400' : 'bg-green-100'
// //               } border border-green-800`}
// //             />
// //           ))}
// //         </div>

// //         {/* 🔵 Blue Home */}
// //         <div className="bg-blue-500 flex flex-wrap justify-center items-center p-2 border-2 border-white">
// //           {Array.from({ length: 4 }).map((_, i) => (
// //             <div
// //               key={i}
// //               className="w-1/2 h-1/2 flex items-center justify-center p-1"
// //             >
// //               <div className="w-full h-full bg-white rounded-full border-2 border-blue-800" />
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }








// // // app/ludo/page.tsx
// // 'use client'

// // import { useState } from 'react'
// // import { motion, AnimatePresence } from 'framer-motion'
// // import { FaDice } from 'react-icons/fa'

// // /**
// //  * A VERY simplified 2‑player Ludo implementation – one file, no external state.
// //  * Rules (simplified):
// //  * – Each player has 1 token that must travel the 52‑step ring then 6 home cells (total 58).
// //  * – You must roll a 6 to leave start.
// //  * – First token to reach HOME wins.
// //  * – Turn repeats on rolling 6.
// //  * – If you land on the opponent, they go back to start.
// //  *
// //  * This is **not** a full Ludo ruleset but enough to demo logic, dice, token moves, and capture.
// //  */

// // const BOARD_PATH: number[] = Array.from({ length: 52 }, (_, i) => i) // 0‑51
// // const HOME_STEPS = 6

// // interface Player {
// //   id: number
// //   color: string
// //   position: number // -1 start, 0‑51 ring, 52‑57 home
// // }

// // export default function LudoGamePage() {
// //   const [players, setPlayers] = useState<Player[]>([
// //     { id: 0, color: '#ef4444', position: -1 }, // red
// //     { id: 1, color: '#3b82f6', position: -1 }, // blue
// //   ])
// //   const [current, setCurrent] = useState(0)
// //   const [dice, setDice] = useState<number | null>(null)
// //   const [winner, setWinner] = useState<number | null>(null)

// //   function rollDice() {
// //     if (winner !== null) return
// //     const roll = Math.ceil(Math.random() * 6)
// //     setDice(roll)
// //     moveToken(roll)
// //   }

// //   function nextTurn(extra = false) {
// //     setCurrent((c) => (extra ? c : (c + 1) % players.length))
// //   }

// //   function moveToken(roll: number) {
// //     setPlayers((prev) => {
// //       const updated = [...prev]
// //       const p = { ...updated[current] }

// //       // if at start
// //       if (p.position === -1) {
// //         if (roll === 6) {
// //           p.position = 0 // enter board
// //         } else {
// //           updated[current] = p
// //           nextTurn()
// //           return updated
// //         }
// //       } else {
// //         p.position += roll
// //       }

// //       // handle entering home stretch
// //       if (p.position >= BOARD_PATH.length) {
// //         const over = p.position - BOARD_PATH.length
// //         if (over <= HOME_STEPS) {
// //           p.position = BOARD_PATH.length + over // home track
// //           if (p.position === BOARD_PATH.length + HOME_STEPS) {
// //             setWinner(current)
// //           }
// //         } else {
// //           // bounce back if overshoot home
// //           p.position = BOARD_PATH.length + HOME_STEPS - (over - HOME_STEPS)
// //         }
// //       }

// //       // capture check only if on ring
// //       if (p.position < BOARD_PATH.length) {
// //         updated.forEach((op, idx) => {
// //           if (idx !== current && op.position === p.position) {
// //             updated[idx] = { ...op, position: -1 }
// //           }
// //         })
// //       }

// //       updated[current] = p

// //       // repeat turn on 6
// //       nextTurn(roll === 6)
// //       return updated
// //     })
// //   }

// //   /* Helpers to render positions */
// //   function tokenStyle(player: Player) {
// //     const size = 32
// //     // simple circular board positions around a square
// //     let x = 0,
// //       y = 0
// //     const idx = player.position
// //     const radius = 120
// //     const center = 160
// //     if (idx === -1) {
// //       // start boxes
// //       x = player.id === 0 ? center - radius : center + radius - size
// //       y = player.id === 0 ? center + radius - size : center - radius
// //     } else if (idx < BOARD_PATH.length) {
// //       const angle = (idx / BOARD_PATH.length) * 2 * Math.PI - Math.PI / 2
// //       x = center + radius * Math.cos(angle) - size / 2
// //       y = center + radius * Math.sin(angle) - size / 2
// //     } else {
// //       // home track – draw a vertical line towards center
// //       const step = idx - BOARD_PATH.length
// //       x = center - size / 2 + (player.id === 0 ? -40 : 40)
// //       y = center - step * 28 - size / 2
// //     }
// //     return {
// //       width: size,
// //       height: size,
// //       borderRadius: '50%',
// //       background: player.color,
// //       position: 'absolute' as const,
// //       transform: `translate(${x}px, ${y}px)`,
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       color: '#fff',
// //       fontWeight: 'bold',
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-200 to-emerald-400 p-4 space-y-4 select-none">
// //       <h1 className="text-3xl font-bold text-green-900">🎲 Simplified Ludo</h1>

// //       <div className="relative" style={{ width: 320, height: 320 }}>
// //         {/* board ring outline */}
// //         <div className="absolute inset-0 rounded-full border-8 border-green-800" />
// //         {/* center */}
// //         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-green-900" />

// //         {/* tokens */}
// //         {players.map((pl) => (
// //           <AnimatePresence key={pl.id}>
// //             <motion.div
// //               layout
// //               initial={{ scale: 0 }}
// //               animate={{ scale: 1 }}
// //               exit={{ scale: 0 }}
// //               transition={{ type: 'spring', stiffness: 300 }}
// //               style={tokenStyle(pl)}
// //             >
// //               {pl.id === current && winner === null && <span>⭐</span>}
// //             </motion.div>
// //           </AnimatePresence>
// //         ))}
// //       </div>

// //       {winner === null ? (
// //         <>
// //           <button
// //             onClick={rollDice}
// //             className="flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold rounded-full shadow-lg active:scale-95 transition"
// //           >
// //             <FaDice /> Roll{dice && ` (${dice})`}
// //           </button>
// //           <p className="text-green-800 font-medium">Current turn: {current === 0 ? 'Red' : 'Blue'}</p>
// //         </>
// //       ) : (
// //         <div className="text-2xl font-bold text-purple-800 flex flex-col items-center space-y-2">
// //           <p>{winner === 0 ? '🔴 Red' : '🔵 Blue'} wins!</p>
// //           <button
// //             onClick={() => {
// //               setPlayers([
// //                 { id: 0, color: '#ef4444', position: -1 },
// //                 { id: 1, color: '#3b82f6', position: -1 },
// //               ])
// //               setWinner(null)
// //               setDice(null)
// //               setCurrent(0)
// //             }}
// //             className="px-5 py-2 bg-white/80 backdrop-blur rounded-lg shadow hover:bg-white"
// //           >
// //             Restart
// //           </button>
// //         </div>
// //       )}

// //       <p className="text-sm text-green-900/70 max-w-xs text-center">
// //         Simplified rules: roll 6 to start, move exactly to home (bounce back if overshoot), capture opponent by landing on
// //         same square.
// //       </p>
// //     </div>
// //   )
// // }
















// // 'use client'

// // import { useEffect, useRef, useState } from 'react';

// // export default function BalloonGame() {
// //   const canvasRef = useRef(null);
// //   const [isRunning, setIsRunning] = useState(false);
// //   const [score, setScore] = useState(0);
// //   const [highScore, setHighScore] = useState(0);

// //   const [canvasSize, setCanvasSize] = useState({ width: 400, height: 600 });

// //   useEffect(() => {
// //     function updateCanvasSize() {
// //       const w = window.innerWidth;
// //       if (w < 480) {
// //         setCanvasSize({ width: w - 40, height: (w - 40) * 1.5 });
// //       } else {
// //         setCanvasSize({ width: 400, height: 600 });
// //       }
// //     }
// //     updateCanvasSize();
// //     window.addEventListener('resize', updateCanvasSize);
// //     return () => window.removeEventListener('resize', updateCanvasSize);
// //   }, []);

// //   useEffect(() => {
// //     if (!isRunning) return;

// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext('2d');
// //     let animationId;
// //     let touchX = 0;

// //     const gravity = 0.5;
// //     const jumpPower = -10;

// //     // Initialize balloon position and velocity
// //     const balloon = {
// //       x: canvasSize.width / 2 - 15,
// //       y: canvasSize.height - 80,
// //       width: 30,
// //       height: 40,
// //       velocityY: 0,
// //     };

// //     const coins = Array.from({ length: 5 }, () => generateCoin());
// //     const platforms = generatePlatforms();

// //     function generateCoin() {
// //       return {
// //         x: Math.random() * (canvasSize.width - 20) + 10,
// //         y: Math.random() * -canvasSize.height,
// //         size: 15,
// //       };
// //     }

// //     function generatePlatforms() {
// //       return Array.from({ length: 4 }, (_, i) => ({
// //         x: Math.random() * (canvasSize.width - 100),
// //         y: canvasSize.height - (i + 1) * 150,
// //         width: 80,
// //         height: 10,
// //       }));
// //     }

// //     function drawBalloon() {
// //       ctx.fillStyle = '#F472B6'; // pink balloon
// //       ctx.beginPath();
// //       ctx.ellipse(
// //         balloon.x + balloon.width / 2,
// //         balloon.y + balloon.height / 2,
// //         balloon.width / 2,
// //         balloon.height / 2,
// //         0,
// //         0,
// //         2 * Math.PI
// //       );
// //       ctx.fill();

// //       // Balloon string
// //       ctx.strokeStyle = '#9333EA';
// //       ctx.lineWidth = 2;
// //       ctx.beginPath();
// //       ctx.moveTo(balloon.x + balloon.width / 2, balloon.y + balloon.height);
// //       ctx.lineTo(balloon.x + balloon.width / 2, balloon.y + balloon.height + 20);
// //       ctx.stroke();
// //     }

// //     function drawCoins() {
// //       coins.forEach((coin) => {
// //         ctx.fillStyle = '#FBBF24'; // yellow coin
// //         ctx.beginPath();
// //         ctx.arc(coin.x, coin.y, coin.size / 2, 0, 2 * Math.PI);
// //         ctx.fill();

// //         ctx.strokeStyle = '#FCD34D';
// //         ctx.lineWidth = 2;
// //         ctx.beginPath();
// //         ctx.arc(coin.x, coin.y, coin.size / 3, 0, 2 * Math.PI);
// //         ctx.stroke();
// //       });
// //     }

// //     function drawPlatforms() {
// //       ctx.fillStyle = '#6B7280'; // gray platforms
// //       platforms.forEach((p) => {
// //         ctx.fillRect(p.x, p.y, p.width, p.height);
// //       });
// //     }

// //     function updateBalloon() {
// //       balloon.velocityY += gravity;
// //       balloon.y += balloon.velocityY;

// //       // Prevent balloon from falling below floor - game over if so
// //       if (balloon.y + balloon.height > canvasSize.height) {
// //         balloon.y = canvasSize.height - balloon.height; // fix position
// //         endGame();
// //       }

// //       // Keep balloon inside horizontal bounds
// //       if (balloon.x < 0) balloon.x = 0;
// //       if (balloon.x + balloon.width > canvasSize.width) balloon.x = canvasSize.width - balloon.width;
// //     }

// //     function updateCoins() {
// //       coins.forEach((coin) => {
// //         coin.y += 2;

// //         // Collision detection balloon & coin
// //         if (
// //           balloon.x < coin.x + coin.size / 2 &&
// //           balloon.x + balloon.width > coin.x - coin.size / 2 &&
// //           balloon.y < coin.y + coin.size / 2 &&
// //           balloon.y + balloon.height > coin.y - coin.size / 2
// //         ) {
// //           setScore((s) => s + 1);
// //           coin.y = -20;
// //           coin.x = Math.random() * (canvasSize.width - 20) + 10;
// //         }

// //         // Reset coin if goes below screen
// //         if (coin.y > canvasSize.height) {
// //           coin.y = -20;
// //           coin.x = Math.random() * (canvasSize.width - 20) + 10;
// //         }
// //       });
// //     }

// //     function updatePlatforms() {
// //       platforms.forEach((p) => {
// //         p.y += 2;

// //         // Balloon lands on platform: velocityY reset to jumpPower only if falling down AND within platform bounds
// //         if (
// //           balloon.velocityY > 0 &&
// //           balloon.x + balloon.width > p.x &&
// //           balloon.x < p.x + p.width &&
// //           balloon.y + balloon.height >= p.y &&
// //           balloon.y + balloon.height <= p.y + p.height + 5 // small tolerance
// //         ) {
// //           balloon.velocityY = jumpPower;
// //           balloon.y = p.y - balloon.height; // prevent sinking into platform
// //         }

// //         if (p.y > canvasSize.height) {
// //           p.y = -10;
// //           p.x = Math.random() * (canvasSize.width - 100);
// //         }
// //       });
// //     }

// //     function endGame() {
// //       cancelAnimationFrame(animationId);
// //       setIsRunning(false);
// //       setHighScore((prev) => (score > prev ? score : prev));
// //       alert('গেম শেষ! আপনার স্কোর: ' + score);
// //     }

// //     function loop() {
// //       ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
// //       drawBalloon();
// //       drawCoins();
// //       drawPlatforms();
// //       updateBalloon();
// //       updateCoins();
// //       updatePlatforms();
// //       animationId = requestAnimationFrame(loop);
// //     }

// //     loop();

// //     const handleKey = (e) => {
// //       if (e.key === 'ArrowLeft') balloon.x -= 20;
// //       if (e.key === 'ArrowRight') balloon.x += 20;
// //     };

// //     const handleTouchStart = (e) => {
// //       touchX = e.touches[0].clientX;
// //     };

// //     const handleTouchMove = (e) => {
// //       const dx = e.touches[0].clientX - touchX;
// //       balloon.x += dx * 0.2;
// //       touchX = e.touches[0].clientX;
// //     };

// //     window.addEventListener('keydown', handleKey);
// //     canvas.addEventListener('touchstart', handleTouchStart);
// //     canvas.addEventListener('touchmove', handleTouchMove);

// //     return () => {
// //       cancelAnimationFrame(animationId);
// //       window.removeEventListener('keydown', handleKey);
// //       canvas.removeEventListener('touchstart', handleTouchStart);
// //       canvas.removeEventListener('touchmove', handleTouchMove);
// //     };
// //   }, [isRunning, canvasSize]);

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 p-4">
// //       <h1 className="text-4xl font-extrabold mb-3 text-blue-900 drop-shadow-lg select-none">🎈 বেলুন গেম</h1>
// //       <p className="text-lg font-semibold text-white mb-4 select-none">
// //         বর্তমান স্কোর: <span className="text-yellow-300">{score}</span> | সর্বোচ্চ স্কোর:{' '}
// //         <span className="text-yellow-300">{highScore}</span>
// //       </p>
// //       <canvas
// //         ref={canvasRef}
// //         width={canvasSize.width}
// //         height={canvasSize.height}
// //         className="rounded-xl shadow-2xl border-8 border-blue-500 bg-white touch-none"
// //       />
// //       {!isRunning && (
// //         <button
// //           onClick={() => {
// //             setScore(0);
// //             setIsRunning(true);
// //           }}
// //           className="mt-6 px-8 py-3 bg-yellow-400 text-blue-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition duration-300"
// //         >
// //           শুরু করুন
// //         </button>
// //       )}
// //       <p className="mt-4 text-sm text-white/80 select-none">টাচ বা কীবোর্ডের তীর দিয়ে খেলুন।</p>
// //     </div>
// //   );
// // }





// // 'use client'

// // import { useEffect, useRef, useState } from 'react';
// // import Image from 'next/image';

// // const canvasWidth = 400;
// // const canvasHeight = 600;
// // const gravity = 0.5;
// // const jumpPower = -10;

// // export default function BalloonGame() {
// //   const canvasRef = useRef(null);
// //   const [isRunning, setIsRunning] = useState(false);
// //   const [score, setScore] = useState(0);
// //   const [highScore, setHighScore] = useState(0);

// //   useEffect(() => {
// //     if (!isRunning) return;

// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext('2d');
// //     let animationId;
// //     let touchX = 0;

// //     const balloonImg = new Image();
// //     balloonImg.src = '/balloon.png'; // make sure this image exists in public folder

// //     const coinImg = new Image();
// //     coinImg.src = '/coin.png';

// //     const balloon = {
// //       x: canvasWidth / 2 - 15,
// //       y: canvasHeight - 80,
// //       width: 30,
// //       height: 40,
// //       velocityY: 0,
// //     };

// //     const coins = Array.from({ length: 5 }, () => generateCoin());
// //     const platforms = generatePlatforms();

// //     function generateCoin() {
// //       return {
// //         x: Math.random() * (canvasWidth - 20),
// //         y: Math.random() * -canvasHeight,
// //         size: 20,
// //       };
// //     }

// //     function generatePlatforms() {
// //       return Array.from({ length: 4 }, (_, i) => ({
// //         x: Math.random() * (canvasWidth - 100),
// //         y: i * 150,
// //         width: 80,
// //         height: 10,
// //       }));
// //     }

// //     function drawBalloon() {
// //       ctx.drawImage(balloonImg, balloon.x, balloon.y, balloon.width, balloon.height);
// //     }

// //     function drawCoins() {
// //       coins.forEach((coin) => {
// //         ctx.drawImage(coinImg, coin.x - coin.size / 2, coin.y - coin.size / 2, coin.size, coin.size);
// //       });
// //     }

// //     function drawPlatforms() {
// //       ctx.fillStyle = '#888';
// //       platforms.forEach((p) => {
// //         ctx.fillRect(p.x, p.y, p.width, p.height);
// //       });
// //     }

// //     function updateBalloon() {
// //       balloon.velocityY += gravity;
// //       balloon.y += balloon.velocityY;
// //       if (balloon.y + balloon.height > canvasHeight) endGame();

// //       if (balloon.x < 0) balloon.x = 0;
// //       if (balloon.x + balloon.width > canvasWidth) balloon.x = canvasWidth - balloon.width;
// //     }

// //     function updateCoins() {
// //       coins.forEach((coin) => {
// //         coin.y += 2;
// //         if (
// //           balloon.x < coin.x + coin.size &&
// //           balloon.x + balloon.width > coin.x - coin.size &&
// //           balloon.y < coin.y + coin.size &&
// //           balloon.y + balloon.height > coin.y - coin.size
// //         ) {
// //           setScore((s) => s + 1);
// //           coin.y = -20;
// //           coin.x = Math.random() * (canvasWidth - 20);
// //         }
// //         if (coin.y > canvasHeight) {
// //           coin.y = -20;
// //           coin.x = Math.random() * (canvasWidth - 20);
// //         }
// //       });
// //     }

// //     function updatePlatforms() {
// //       platforms.forEach((p) => {
// //         p.y += 2;
// //         if (
// //           balloon.velocityY > 0 &&
// //           balloon.x + balloon.width > p.x &&
// //           balloon.x < p.x + p.width &&
// //           balloon.y + balloon.height < p.y + p.height &&
// //           balloon.y + balloon.height > p.y
// //         ) {
// //           balloon.velocityY = jumpPower;
// //         }

// //         if (p.y > canvasHeight) {
// //           p.y = -10;
// //           p.x = Math.random() * (canvasWidth - 100);
// //         }
// //       });
// //     }

// //     function endGame() {
// //       cancelAnimationFrame(animationId);
// //       setIsRunning(false);
// //       setHighScore((prev) => (score > prev ? score : prev));
// //       alert('Game Over! Your score: ' + score);
// //     }

// //     function loop() {
// //       ctx.clearRect(0, 0, canvasWidth, canvasHeight);
// //       drawBalloon();
// //       drawCoins();
// //       drawPlatforms();
// //       updateBalloon();
// //       updateCoins();
// //       updatePlatforms();
// //       animationId = requestAnimationFrame(loop);
// //     }

// //     loop();

// //     const handleKey = (e) => {
// //       if (e.key === 'ArrowLeft') balloon.x -= 20;
// //       if (e.key === 'ArrowRight') balloon.x += 20;
// //     };

// //     const handleTouchStart = (e) => {
// //       touchX = e.touches[0].clientX;
// //     };

// //     const handleTouchMove = (e) => {
// //       const dx = e.touches[0].clientX - touchX;
// //       balloon.x += dx * 0.2;
// //       touchX = e.touches[0].clientX;
// //     };

// //     window.addEventListener('keydown', handleKey);
// //     canvas.addEventListener('touchstart', handleTouchStart);
// //     canvas.addEventListener('touchmove', handleTouchMove);

// //     return () => {
// //       cancelAnimationFrame(animationId);
// //       window.removeEventListener('keydown', handleKey);
// //       canvas.removeEventListener('touchstart', handleTouchStart);
// //       canvas.removeEventListener('touchmove', handleTouchMove);
// //     };
// //   }, [isRunning]);

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-100 to-blue-200">
// //       <h1 className="text-3xl font-bold mb-2 text-blue-800">🎈 বেলুন গেম</h1>
// //       <p className="text-gray-700 mb-2">বর্তমান স্কোর: {score} | সর্বোচ্চ স্কোর: {highScore}</p>
// //       <canvas
// //         ref={canvasRef}
// //         width={canvasWidth}
// //         height={canvasHeight}
// //         className="border-4 border-blue-300 rounded-lg shadow-lg bg-white"
// //       />
// //       {!isRunning && (
// //         <button
// //           onClick={() => {
// //             setScore(0);
// //             setIsRunning(true);
// //           }}
// //           className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-full shadow hover:bg-blue-800 transition"
// //         >
// //           START
// //         </button>
// //       )}
// //     </div>
// //   );
// // }

