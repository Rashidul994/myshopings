'use client'

import { useRef, useState } from 'react'
import { motion, animate } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Howl } from 'howler'

export default function Home() {
  const bagRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const [bagItems, setBagItems] = useState<number>(0)

  const sound = new Howl({
    src: ['/pop.mp3'], // public ফোল্ডারে mp3 রাখো
    volume: 0.4,
  })

  const handleAddToBag = () => {
    if (!itemRef.current || !bagRef.current) return

    const item = itemRef.current.getBoundingClientRect()
    const bag = bagRef.current.getBoundingClientRect()

    const flyingItem = document.createElement('div')
    flyingItem.innerText = '🧴'
    flyingItem.style.position = 'fixed'
    flyingItem.style.left = ${item.left}px
    flyingItem.style.top = ${item.top}px
    flyingItem.style.fontSize = '32px'
    flyingItem.style.zIndex = '9999'
    flyingItem.style.transition = 'transform 0.5s ease-in-out'
    flyingItem.style.pointerEvents = 'none'
    document.body.appendChild(flyingItem)

    animate(
      { x: 0, y: 0, rotate: 0, scale: 1 },
      {
        x: bag.left - item.left,
        y: bag.top - item.top,
        rotate: 360,
        scale: 0.5,
        duration: 1,
        ease: 'easeInOut',
        onUpdate(latest) {
          flyingItem.style.transform = translate(${latest.x}px, ${latest.y}px) rotate(${latest.rotate}deg) scale(${latest.scale})
        },
        onComplete() {
          flyingItem.remove()
          setBagItems((prev) => prev + 1)
          sound.play()
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } })

          bagRef.current?.classList.add('animate-wiggle')
          setTimeout(() => {
            bagRef.current?.classList.remove('animate-wiggle')
          }, 500)
        },
      }
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-yellow-50 to-pink-200 flex items-center justify-center relative p-8">
      {/* 🛍 শপ ব্যাগ */}
      <motion.div
        ref={bagRef}
        className="absolute top-10 right-10 text-4xl relative"
      >
        🛍
        <motion.span
          key={bagItems}
          className="absolute -top-3 -right-3 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center shadow"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 0.5 }}
        >
          {bagItems}
        </motion.span>
      </motion.div>

      {/* 🧴 প্রোডাক্ট কার্ড */}
      <motion.div
        ref={itemRef}
        className="bg-white shadow-xl rounded-xl p-6 text-center w-72"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="text-6xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🧴
        </motion.div>
        <h2 className="text-xl font-bold mt-2">ফেস লোশন</h2>
        <p className="text-gray-600">৳৪৯৯</p>
        <motion.button
          onClick={handleAddToBag}
          whileTap={{ scale: 0.9 }}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        >
          ব্যাগে ঢোকাও
        </motion.button>
      </motion.div>
    </main>
  )
}