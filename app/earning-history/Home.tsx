


// "use client";
// import { motion } from "framer-motion";

// export default function Neon3DCard() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
//       <motion.div
//         whileHover={{ rotateY: 10, rotateX: 10, scale: 1.05 }}
//         transition={{ type: "spring", stiffness: 150, damping: 12 }}
//         className="relative w-full max-w-sm md:max-w-lg lg:max-w-xl p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-900 to-black border border-gray-800"
//         style={{
//           boxShadow: "0 0 25px rgba(0, 255, 255, 0.7), 0 0 50px rgba(0, 0, 255, 0.5)",
//         }}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-xl font-bold tracking-wide neon-text">BETUP</h1>
//           <div className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
//             365 💰
//           </div>
//         </div>

//         {/* Match Info */}
//         <div className="bg-gradient-to-r from-indigo-900 to-indigo-600 rounded-xl p-4 mb-4 shadow-md">
//           <p className="text-sm opacity-80">Premier League</p>
//           <h2 className="text-lg font-semibold">Manchester United vs Barcelona</h2>
//           <p className="mt-2 text-green-400">Live - 67:41</p>

//           {/* Odds */}
//           <div className="flex gap-2 mt-3">
//             <button className="flex-1 bg-black/60 hover:bg-black/80 text-cyan-400 font-semibold rounded-lg py-2 border border-cyan-400 shadow-[0_0_10px_#00ffff]">
//               2.95
//             </button>
//             <button className="flex-1 bg-black/60 hover:bg-black/80 text-pink-400 font-semibold rounded-lg py-2 border border-pink-400 shadow-[0_0_10px_#ff00ff]">
//              500000000000
//             </button>
//             <button className="flex-1 bg-black/60 hover:bg-black/80 text-yellow-400 font-semibold rounded-lg py-2 border border-yellow-400 shadow-[0_0_10px_#ffff00]">
//               2.95
//             </button>
//           </div>
//         </div>

//         {/* CTA */}
//         <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-xl font-bold text-lg shadow-[0_0_20px_#00ffff] hover:scale-105 transition">
//           PLACE BET
//         </button>
//       </motion.div>

//       <style jsx>{`
//         .neon-text {
//           color: #0ff;
//           text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff;
//         }
//       `}</style>
//     </div>
//   );
// }





// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function NeonMobileApp() {
//   const [tilt, setTilt] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e: React.MouseEvent) => {
//     const { clientX, clientY, currentTarget } = e;
//     const rect = (currentTarget as HTMLElement).getBoundingClientRect();
//     const x = (clientX - rect.left) / rect.width;
//     const y = (clientY - rect.top) / rect.height;
//     setTilt({ x: (x - 0.5) * 15, y: (0.5 - y) * 15 });
//   };

//   return (
//     <main className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-black to-purple-950 overflow-hidden">
//       <motion.div
//         onMouseMove={handleMouseMove}
//         style={{
//           transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
//         }}
//         className="relative w-[390px] h-[844px] rounded-[2.5rem] bg-gradient-to-b from-gray-900 to-gray-950 shadow-[0_0_80px_#00f7ff] overflow-hidden"
//       >
//         {/* HEADER */}
//         <div className="flex justify-between items-center px-5 py-4 text-white">
//           <h2 className="font-bold text-lg">BETUP</h2>
//           <div className="flex items-center gap-4">
//             <span className="bg-cyan-500/20 px-3 py-1 rounded-full text-sm shadow-[0_0_15px_#00f7ff]">
//               💰 365
//             </span>
//             <span>⚙️</span>
//           </div>
//         </div>

//         {/* CATEGORIES */}
//         <div className="flex gap-4 px-5 py-3 overflow-x-auto text-white text-2xl">
//           <span>⚽</span>
//           <span>🏀</span>
//           <span>🎾</span>
//           <span>🏈</span>
//           <span>⚾</span>
//         </div>

//         {/* BIG MATCH */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mx-5 mt-4 bg-gradient-to-r from-indigo-700 to-blue-500 rounded-2xl p-5 text-white shadow-[0_0_40px_#00f7ff]"
//         >
//           <h3 className="text-lg font-bold">Big Match</h3>
//           <p className="text-sm text-gray-200">Man United vs Barcelona</p>
//           <button className="mt-4 w-full py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-400 shadow-[0_0_20px_#00ff88]">
//             PLACE BET
//           </button>
//         </motion.div>

//         {/* MATCH LIST */}
//         <div className="px-5 mt-5 space-y-4 h-[55%] overflow-y-auto pb-20">
//           {[1, 2, 3].map((m, i) => (
//             <div
//               key={i}
//               className="bg-gray-800 rounded-2xl p-5 text-white shadow-[0_0_25px_#1e40af]"
//             >
//               <div className="flex justify-between text-sm text-gray-400">
//                 <span>Premier League ⚽</span>
//                 <span>67:41</span>
//               </div>
//               <h3 className="mt-2 text-lg font-semibold">
//                 Manchester United vs Barcelona
//               </h3>
//               <div className="grid grid-cols-3 gap-2 mt-3">
//                 <button className="bg-blue-700 py-2 rounded-lg shadow-[0_0_15px_#00f7ff]">
//                   2.95
//                 </button>
//                 <button className="bg-blue-700 py-2 rounded-lg shadow-[0_0_15px_#00f7ff]">
//                   X 2.95
//                 </button>
//                 <button className="bg-blue-700 py-2 rounded-lg shadow-[0_0_15px_#00f7ff]">
//                   3.25
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* BOTTOM NAV */}
//         <div className="absolute bottom-0 w-full flex justify-around items-center text-gray-300 py-4 bg-gray-900/80 backdrop-blur-md border-t border-gray-700">
//           <span className="text-white">🏠 Home</span>
//           <span>⚽ Sports</span>
//           <span>🎟️ My Bets</span>
//           <span>📋 Menu</span>
//         </div>
//       </motion.div>
//     </main>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Gift, Bell, Menu } from "lucide-react";
import Api from "../api/Api";


export default function LobbyPage() {


const [id, setUsedrid] = useState(64)
const [products, setProducts] = useState([])

  const [tables] = useState([
    { id: 1, available: "3/9", amount: "$1,270" },
    { id: 2, available: "2/6", amount: "$1,750" },
    { id: 3, available: "4/8", amount: "$1,750" },
    { id: 4, available: "2/9", amount: "$1,750" },
    { id: 5, available: "4/8", amount: "$1,750" },
  ]);



  useEffect(() => {

   const userData = JSON.parse(localStorage.getItem('userData') || '[]');
    if (userData[0]) {
      setUsedrid(userData[0].id || 'Guest');
    
    }


  getUser();
  }, [])



  const getUser= () =>{

  Api.get(`/orderget/${id}`)
  .then(res =>{
    

  
 setProducts(res.data.data);

   

console.log(' R co earning r coin====================================');
console.log(res.data);
console.log('====================================');
})
  .catch(err => 
    
    
    console.log('  r coin  RRRRRRRRRRR Coooooinnnnnnnnnn    errrrrrrorrrrrrrrrrrrrrrrrrrrrrrrr'+err));

}










  return (
    
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-4 font-sanspb-24 flex flex-col max-w-md mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-orange-500 drop-shadow-[0_0_10px_#ff6a00]">
          R <sub className="text-sm">coin</sub>
        </h1>
        <div className="flex gap-3">
          <button className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#a855f7]">
            <Gift className="w-5 h-5 text-purple-400" />
          </button>
          <button className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#facc15]">
            <Bell className="w-5 h-5 text-yellow-400" />
          </button>
          <button className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#fb923c]">
            <Menu className="w-5 h-5 text-orange-400" />
          </button>
        </div>
      </div>

      {/* Referral Banner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-6 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 
        rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_#9333ea]"
      >
        <div>
          <h2 className="text-lg font-bold drop-shadow-[0_0_6px_#fff]">
            REFERRAL PROGRAM FOR BEGINNERS
          </h2>
          <p className="text-sm text-purple-200">Send referral code to your friend</p>
        </div>
        <img
          src="/king.png" // আপনার ইমেজ দিন
          alt="Referral"
          className="w-16 h-16 drop-shadow-[0_0_15px_#fff]"
        />
      </motion.div>

      {/* Show More */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px #9333ea" }}
        className="w-full mt-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
      >
        Show more
      </motion.button>

      {/* Live Tables */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]">
          LIVE TABLES
        </h2>

        <div className="flex justify-between mt-3">
          <button className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg hover:shadow-[0_0_12px_#22d3ee]">
            <Search className="w-4 h-4" /> Search table
          </button>
          <button className="bg-gray-800 px-3 py-2 rounded-lg hover:shadow-[0_0_12px_#a855f7]">
            See more
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {products.map((table) => (
            <motion.div
              key={table.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: table.id * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px #9333ea" }}
              className="flex items-center justify-between bg-gray-900 rounded-xl p-3 border border-purple-700/30"
            >
              <div>
                <p className="text-sm text-gray-400">
                  Available 
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-purple-400 font-bold drop-shadow-[0_0_8px_#9333ea]">
                  

                  
                </span>
                <button className="px-4 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:shadow-[0_0_15px_#9333ea] transition">
                  JOIN
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


function setProducts(message: any) {
  throw new Error("Function not implemented.");
}

