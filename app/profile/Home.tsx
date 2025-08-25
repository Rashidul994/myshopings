'use client';

import { useState,useEffect } from 'react';
import { User, Gift, RotateCcw, Users, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Home from './buttomnavbar/page';

import CountUp from 'react-countup';

import { useUserStore } from "../Auto_coin/Api";



export default function WalletPage() {


  const { name, balance, coin, type, action } = useUserStore();


  //   const { name, balance, coin, setUser  } = useUserStore();

  const handleSend = () => {
  //   setUser({
  //     name: "ras",
      
  //     balance: 500,
  //     coin: 1500,
 
action({
  type:'Rashid', 
  name: "Rashidul",
    balance: 500, 
    coin: 1000 });


};


//  const { status, response, sendData } = useApiStore();

//   const handleSend = () => {
//     sendData({
//     type:'success',
    
//     });
//   };

  const [usersname, setUsername] = useState('');

const [coissnss, setCoin] = useState(0);



         const [ imgs, setPimg] = useState('');
  const [activeNav, setActiveNav] = useState('home');

  

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'leaderboard' },
    { id: 'refer', label: 'Refer', icon: 'group' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];




useEffect(() => {
 
   const userData = JSON.parse(localStorage.getItem('userData') || '[]');
    if (userData[0]) {
      setUsername(userData[0].name || 'Guest');
      setPimg(userData[0].img || '');
    }

 
setInterval(() => {
  const cojs=localStorage.getItem('coin');
setCoin(cojs);
}, 3000);









}, [])




  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 to-yellow-200 p-4 pb-24 flex flex-col max-w-md mx-auto">

      {/* Top User Info */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-white font-semibold text-lg drop-shadow-lg">Hi {usersname}</h2>
          <p className="text-white text-sm drop-shadow-md">Welcome Back 👋</p>
        </div>
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
          <User className="text-orange-500" size={26} />
        </div>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 100 }}
        className="bg-red-700 rounded-3xl p-6 mt-6 text-center text-white shadow-2xl"
      >

        <p className="text-sm font-semibold tracking-wide">Current Balance</p>
        <h1 className="text-4xl font-extrabold mt-1 drop-shadow-md">🪙   <CountUp end={coissnss} duration={2} separator="," /></h1>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,165,0,0.7)' }}
          whileTap={{ scale: 0.95 }}
     onClick={handleSend}
          className="mt-6 bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-3 rounded-full text-white font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          My Wallet
        </motion.button>
 
        <div className="mt-6 space-y-2 p-4 border rounded bg-gray-100">
      
          <p>👤 Name: {name}</p>
          <p>💰 Balance: {balance}</p>
          <p>🪙 Coin: {coin}</p>
     
        
        </div>


   {/* {status && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <p>📌 Status: {status}</p>
          <p>📩 Message: {response?.message}</p>
          {response?.data && <pre>{JSON.stringify(response.data, null, 2)}</pre>}
        </div>
      )} */}

      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="grid grid-cols-3 gap-5 mt-8"
      >
        {[
          { icon: Gift, label: 'Hourly Check-in' },
          { icon: RotateCcw, label: 'Spin & Win' },
          { icon: Users, label: 'Invite & Earn' },
        ].map(({ icon: IconComp, label }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.07, boxShadow: '0 0 12px rgba(255,140,0,0.6)' }}
            className="bg-white rounded-xl p-4 flex flex-col items-center shadow-md cursor-pointer select-none"
          >
            <IconComp className="text-orange-500" size={30} />
            <p className="text-sm mt-2 font-medium text-gray-700">{label}</p>
          </motion.div>
        ))}





      </motion.div>

      {/* More Tasks */}
      <h2 className="mt-10 text-gray-800 font-semibold text-lg select-none">More Tasks</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="grid grid-cols-2 gap-5 mt-4"
      >
        <div className="bg-white rounded-xl p-5 flex flex-col items-center shadow-lg select-none">
          <div className="bg-blue-100 p-3 rounded-full">
            <Send className="text-blue-600" size={30} />
          </div>
          <p className="mt-3 font-semibold text-gray-800">Telegram Group</p>
          <p className="text-sm text-gray-500 mt-1">🪙 150</p>
          <button className="mt-4 bg-orange-500 hover:bg-orange-600 transition-colors text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400">
            Join Group
          </button>
        </div>

        <div className="bg-white rounded-xl p-5 flex flex-col items-center shadow-lg select-none">
          <div className="bg-blue-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.495V14.706h-3.13v-3.62h3.13V8.413c0-3.1 1.892-4.788 4.656-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.62h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0" />
            </svg>
          </div>
          <p className="mt-3 font-semibold text-gray-800">Facebook Page</p>
          <p className="text-sm text-gray-500 mt-1">🪙 150</p>
          <button className="mt-4 bg-orange-500 hover:bg-orange-600 transition-colors text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400">
            Follow Page
          </button>




         
        </div>
      </motion.div>

      {/* Bottom Navbar */}
      {/* <motion.nav
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 120 }}
        className="fixed bottom-0 left-0 w-full bg-white shadow-inner flex justify-around py-3 max-w-md mx-auto"
      >
        {navItems.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveNav(id)}
            className={`flex flex-col items-center text-sm font-semibold select-none focus:outline-none ${
              activeNav === id ? 'text-orange-500' : 'text-gray-400 hover:text-orange-400'
            }`}
          >
            <span className="material-icons">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </motion.nav> */}
    </div>
  );
}


// 'use client';


// import { User, Gift, RotateCcw, Users, Send } from 'lucide-react';

// export default function WalletPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-orange-400 to-yellow-200 p-4 pb-20">
      
//       {/* Top User Info */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-white font-semibold text-lg">Hi Tanzir Fahad!</h2>
//           <p className="text-white text-sm">Welcome Back 👋</p>
//         </div>
//         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
//           <User className="text-orange-500" />
//         </div>
//       </div>

//       {/* Balance Card */}
//       <div className="bg-red-700 rounded-2xl p-5 mt-4 text-center text-white shadow-lg">
//         <p className="text-sm">Current Balance</p>
//         <h1 className="text-3xl font-bold mt-1">🪙 1,83,047</h1>
//         <button className="mt-4 bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-2 rounded-full text-white font-medium shadow-md">
//           My Wallet
//         </button>
//       </div>

//       {/* Action Buttons */}
//       <div className="grid grid-cols-3 gap-4 mt-6">
//         <div className="bg-white rounded-xl p-3 flex flex-col items-center shadow">
//           <Gift className="text-orange-500" size={28} />
//           <p className="text-sm mt-1">Hourly Check-in</p>
//         </div>
//         <div className="bg-white rounded-xl p-3 flex flex-col items-center shadow">
//           <RotateCcw className="text-orange-500" size={28} />
//           <p className="text-sm mt-1">Spin & Win</p>
//         </div>
//         <div className="bg-white rounded-xl p-3 flex flex-col items-center shadow">
//           <Users className="text-orange-500" size={28} />
//           <p className="text-sm mt-1">Invite & Earn</p>
//         </div>
//       </div>

//       {/* More Tasks */}
//       <h2 className="mt-6 text-gray-800 font-semibold">More Tasks</h2>
//       <div className="grid grid-cols-2 gap-4 mt-3">
//         <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
//           <div className="bg-blue-100 p-3 rounded-full">
//             <Send className="text-blue-500" size={28} />
//           </div>
//           <p className="mt-2 font-medium">Telegram Group</p>
//           <p className="text-sm text-gray-500">🪙 150</p>
//           <button className="mt-3 bg-orange-500 text-white px-4 py-1 rounded-full text-sm">Join Group</button>
//         </div>
//         <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
//           <div className="bg-blue-100 p-3 rounded-full">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.495V14.706h-3.13v-3.62h3.13V8.413c0-3.1 1.892-4.788 4.656-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.62h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0"/></svg>
//           </div>
//           <p className="mt-2 font-medium">Facebook Page</p>
//           <p className="text-sm text-gray-500">🪙 150</p>
//           <button className="mt-3 bg-orange-500 text-white px-4 py-1 rounded-full text-sm">Follow Page</button>
//         </div>
//       </div>

//       {/* Bottom Navbar */}
//       <div className="fixed bottom-0 left-0 w-full bg-white shadow-inner flex justify-around py-2">
//         <button className="flex flex-col items-center text-orange-500">
//           <span className="material-icons">home</span>
//           <span className="text-xs">Home</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-500">
//           <span className="material-icons">leaderboard</span>
//           <span className="text-xs">Leaderboard</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-500">
//           <span className="material-icons">group</span>
//           <span className="text-xs">Refer</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-500">
//           <span className="material-icons">person</span>
//           <span className="text-xs">Profile</span>
//         </button>
//       </div>

//     </div>
//   );
// }



// "use client"
// import { useState } from "react";

// export default function CoinPage() {
//   const [coin, setCoin] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function createCoin() {
//     setLoading(true);

//     // Generate key pair in browser
//     const keyPair = await window.crypto.subtle.generateKey(
//       {
//         name: "ECDSA",
//         namedCurve: "P-256",
//       },
//       true,
//       ["sign", "verify"]
//     );

//     // Export public key
//     const publicKeyBuffer = await window.crypto.subtle.exportKey(
//       "spki",
//       keyPair.publicKey
//     );
//     const pubHex = bufferToHex(publicKeyBuffer);

//     // Create payload
//     const timestamp = Date.now();
//     const nonce = Math.floor(Math.random() * 1e9);
//     const payload = { owner: pubHex, timestamp, nonce };
//     const canonical = JSON.stringify(payload);

//     // Hash
//     const hashBuffer = await window.crypto.subtle.digest(
//       "SHA-256",
//       new TextEncoder().encode(canonical)
//     );
//     const hashHex = bufferToHex(hashBuffer);

//     // Sign
//     const signatureBuffer = await window.crypto.subtle.sign(
//       {
//         name: "ECDSA",
//         hash: { name: "SHA-256" },
//       },
//       keyPair.privateKey,
//       new TextEncoder().encode(canonical)
//     );
//     const signatureHex = bufferToHex(signatureBuffer);

//     setCoin({
//       success: true,
//       id: hashHex,
//       payload,
//       signature: signatureHex,
//       pubKey: pubHex,
//       createdAt: new Date(timestamp).toISOString(),
//     });

//     setLoading(false);
//   }

//   function bufferToHex(buffer) {
//     return [...new Uint8Array(buffer)]
//       .map((b) => b.toString(16).padStart(2, "0"))
//       .join("");
//   }

//   return (
//     <div style={{ padding: 20, fontFamily: "sans-serif" }}>
//       <h1>Bitcoin-like Unique ID Generator (No API)</h1>
//       <button onClick={createCoin} disabled={loading}>
//         {loading ? "Creating..." : "Create Coin"}
//       </button>

//       {coin && coin.success && (
//         <div style={{ marginTop: 20 }}>
//           <p><b>ID:</b> {coin.id}</p>
//           <p><b>Owner:</b> {coin.payload.owner.slice(0, 40)}...</p>
//           <p><b>Signature:</b> {coin.signature.slice(0, 40)}...</p>
//           <p><b>Created At:</b> {coin.createdAt}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// // pages/coin.js
// import { useState } from "react";

// // ================= SERVER SIDE API =================
// export async function getServerSideProps(context) {
//   // এই props শুধু UI রেন্ডারের সময় যাবে, API আলাদা করে নিচে আছে
//   return { props: {} };
// }

// export default function CoinPage() {
//   const [coin, setCoin] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function createCoin() {
//     setLoading(true);
//     const res = await fetch("/coin-api", { method: "POST" });
//     const data = await res.json();
//     setCoin(data);
//     setLoading(false);
//   }

//   return (
//     <div style={{ padding: 20, fontFamily: "sans-serif" }}>
//       <h1>Bitcoin-like Unique ID Generator</h1>
//       <button onClick={createCoin} disabled={loading}>
//         {loading ? "Creating..." : "Create Coin"}
//       </button>

//       {coin && coin.success && (
//         <div style={{ marginTop: 20 }}>
//           <p><b>ID:</b> {coin.id}</p>
//           <p><b>Owner:</b> {coin.payload.owner.slice(0, 20)}...</p>
//           <p><b>Signature:</b> {coin.signature.slice(0, 20)}...</p>
//           <p><b>Created At:</b> {coin.createdAt}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// // ================= API ROUTE (SAME FILE) =================
// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };

// import { generateKeyPairSync, createSign, createHash } from "crypto";

// export async function middleware(req, res) {
//   if (req.url === "/coin-api" && req.method === "POST") {
//     try {
//       const { publicKey, privateKey } = generateKeyPairSync("ec", {
//         namedCurve: "secp256k1",
//         publicKeyEncoding: { type: "spki", format: "der" },
//         privateKeyEncoding: { type: "pkcs8", format: "der" },
//       });

//       const pubHex = publicKey.toString("hex");
//       const timestamp = Date.now();
//       const nonce = Math.floor(Math.random() * 1e9);
//       const payload = { owner: pubHex, timestamp, nonce };

//       const canonical = JSON.stringify(payload);
//       const hash = createHash("sha256").update(canonical).digest("hex");

//       const signer = createSign("SHA256");
//       signer.update(canonical);
//       signer.end();
//       const signature = signer
//         .sign({ key: privateKey, format: "der", type: "pkcs8" })
//         .toString("hex");

//       res.setHeader("Content-Type", "application/json");
//       res.end(
//         JSON.stringify({
//           success: true,
//           id: hash,
//           payload,
//           signature,
//           pubKey: pubHex,
//           createdAt: new Date(timestamp).toISOString(),
//         })
//       );
//       return true;
//     } catch (err) {
//       res.statusCode = 500;
//       res.end(JSON.stringify({ error: err.message }));
//       return true;
//     }
//   }
//   return false;
// }







// 'use client'
// import { useState } from 'react'
// import { FaHome, FaUserFriends, FaBookmark, FaUsers, FaVideo, FaStore, FaBell, FaSearch } from 'react-icons/fa'
// import { FiMessageSquare, FiPlus } from 'react-icons/fi'

// export default function FacebookClone() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Top Navbar */}
//       <div className="bg-white shadow px-4 py-2 flex items-center justify-between sticky top-0 z-50">
//         <div className="flex items-center space-x-4">
//           <div className="text-blue-600 font-bold text-xl">f</div>
//           <input
//             type="text"
//             placeholder="Search Facebook"
//             className="bg-gray-100 px-3 py-1 rounded-full focus:outline-none text-sm w-52 md:w-80"
//           />
//         </div>
//         <div className="flex items-center space-x-6">
//           <FaHome className="text-xl text-gray-700 cursor-pointer" />
//           <FaUserFriends className="text-xl text-gray-700 cursor-pointer" />
//           <FiMessageSquare className="text-xl text-gray-700 cursor-pointer" />
//           <FaBell className="text-xl text-gray-700 cursor-pointer" />
//           <div className="w-8 h-8 bg-gray-400 rounded-full" />
//         </div>
//       </div>

//       {/* Main Layout */}
//       <div className="flex flex-1">
//         {/* Left Sidebar */}
//         <div className="hidden lg:flex flex-col w-60 p-4 space-y-4 text-sm text-gray-700">
//           <SidebarItem icon={<FaVideo />} label="Ai Videos" />
//           <SidebarItem icon={<FaUserFriends />} label="Friends" />
//           <SidebarItem icon={<FaBookmark />} label="Saved" />
//           <SidebarItem icon={<FaUsers />} label="Groups" />
//           <SidebarItem icon={<FaVideo />} label="Reels" />
//           <SidebarItem icon={<FaStore />} label="Marketplace" />
//         </div>

//         {/* Feed Area */}
//         <main className="flex-1 px-4 py-4">
//           {/* Post Box */}
//           <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
//             <div className="flex items-center space-x-4">
//               <div className="w-10 h-10 bg-gray-300 rounded-full" />
//               <input
//                 type="text"
//                 placeholder="What's on your mind, Ai?"
//                 className="bg-gray-100 rounded-full px-4 py-2 w-full focus:outline-none"
//               />
//             </div>
//             <div className="flex justify-around text-sm text-gray-600 mt-4">
//               <span className="cursor-pointer">🎥 Live video</span>
//               <span className="cursor-pointer">📸 Photo/video</span>
//               <span className="cursor-pointer">😊 Feeling/activity</span>
//             </div>
//           </div>

//           {/* Post Feed */}
//           <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
//             <div className="flex items-center space-x-2 mb-2">
//               <div className="w-10 h-10 bg-gray-300 rounded-full" />
//               <div>
//                 <p className="font-semibold text-sm">Living In A Tiny</p>
//                 <p className="text-xs text-gray-500">29 May</p>
//               </div>
//             </div>
//             <p className="text-sm mb-2">Two storey tiny house tour 😍😍😍</p>
//             <img
//               src="/img/house.png"
//               alt="Post Image"
//               className="rounded-lg w-full object-cover"
//             />
//           </div>
//         </main>

//         {/* Right Sidebar */}
//         <div className="hidden xl:flex flex-col w-64 p-4 space-y-4 text-sm">
//           <div>
//             <h2 className="font-bold mb-2">Sponsored</h2>
//             <img src="/img/ad1.png" className="rounded-md mb-2" />
//             <img src="/img/ad2.png" className="rounded-md" />
//           </div>
//           <div>
//             <h2 className="font-bold mb-2">Group chats</h2>
//             <button className="flex items-center text-blue-500 hover:underline text-sm">
//               <FiPlus className="mr-1" /> Create group chat
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
//   return (
//     <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
//       <div className="text-lg text-blue-600">{icon}</div>
//       <span>{label}</span>
//     </div>
//   )
// }




// // 'use client'
// // import ProfileCard from './Settins/ProfileCards';
// // import BalanceBox from './Settins/BlanceBox';
// // import ChartSection from './Settins/Chartsodior';
// // import SettingsPanel from './Settins/SettionsPaner';
// // import {useState, useEffect } from 'react';

// // export default function ProfilePage() {

// //   const [usename, setUsenames]=useState("");
// //   const [pimg, setImg]=useState("");


// // useEffect(() => {



  
// // const data = JSON.parse(localStorage.getItem("userData"));
// // const username = data.map(item => item.name);
// // const userimg = data.map(item => item.img);

// // setUsenames(username);
// // setImg(userimg);


// // }, [])






// //   return (
// //     <main className="p-4 max-w-4xl mx-auto space-y-6">
// //       <ProfileCard  getname={usename} img={pimg} />
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <BalanceBox />
// //         <ChartSection />
// //       </div>
// //       <SettingsPanel />
// //     </main>
// //   );
// // }
