"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function NeonPasswordReset() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md p-8 rounded-2xl shadow-[0_0_30px_rgba(0,255,200,0.6)] bg-black/60 border border-cyan-400"
      >
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6 drop-shadow-[0_0_10px_#00fff7]">
          🔐 Reset Password
        </h2>

        {/* Step Indicators */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold 
              ${
                step === s
                  ? "bg-cyan-500 text-black shadow-[0_0_20px_#00fff7]"
                  : "bg-gray-800 border border-cyan-500 text-cyan-400"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <label className="block mb-3 font-semibold">📧 Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-black border border-cyan-400 text-cyan-300
              placeholder-cyan-600 focus:ring-2 focus:ring-cyan-400 outline-none
              shadow-[0_0_15px_rgba(0,255,255,0.5)]"
            />
            <button
              onClick={nextStep}
              className="mt-6 w-full py-3 rounded-lg bg-cyan-500 text-black font-bold 
              shadow-[0_0_20px_#00fff7] hover:shadow-[0_0_30px_#00fff7] transition"
            >
              Send OTP
            </button>
          </motion.div>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <label className="block mb-3 font-semibold">🔑 Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP code"
              className="w-full p-3 rounded-lg bg-black border border-pink-500 text-pink-300
              placeholder-pink-600 focus:ring-2 focus:ring-pink-400 outline-none
              shadow-[0_0_15px_rgba(255,0,150,0.5)]"
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={prevStep}
                className="flex-1 py-3 rounded-lg bg-gray-800 border border-cyan-400 text-cyan-400 hover:bg-gray-700"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="flex-1 py-3 rounded-lg bg-pink-500 text-black font-bold 
                shadow-[0_0_20px_#ff0099] hover:shadow-[0_0_30px_#ff0099] transition"
              >
                Verify OTP
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <label className="block mb-3 font-semibold">🔐 New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full p-3 rounded-lg bg-black border border-green-400 text-green-300
              placeholder-green-600 focus:ring-2 focus:ring-green-400 outline-none
              shadow-[0_0_15px_rgba(0,255,100,0.5)]"
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={prevStep}
                className="flex-1 py-3 rounded-lg bg-gray-800 border border-cyan-400 text-cyan-400 hover:bg-gray-700"
              >
                Back
              </button>
              <button
                onClick={() => alert("✅ Password Reset Successful!")}
                className="flex-1 py-3 rounded-lg bg-green-500 text-black font-bold 
                shadow-[0_0_20px_#00ff99] hover:shadow-[0_0_30px_#00ff99] transition"
              >
                Reset Password
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}




















// "use client";
// import { useState } from "react";
// import { ShoppingCart, Bell, Menu } from "lucide-react";

// export default function NeonDashboard() {
//   const [tables] = useState([
//     { id: 1, name: "Available 3 / 9", price: "$1270", color: "from-pink-500 to-orange-500" },
//     { id: 2, name: "Available 2 / 6", price: "$1750", color: "from-purple-500 to-pink-500" },
//     { id: 3, name: "Available 4 / 8", price: "$1750", color: "from-indigo-500 to-purple-500" },
//     { id: 4, name: "Available 2 / 9", price: "$1750", color: "from-yellow-400 to-orange-500" },
//     { id: 5, name: "Available 4 / 8", price: "$1750", color: "from-cyan-400 to-blue-500" },
//   ]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-gray-950/90 rounded-3xl shadow-[0_0_20px_rgba(255,0,200,0.5)] p-6 border border-purple-700">
        
//         {/* Top Navbar */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-extrabold text-orange-500 drop-shadow-[0_0_10px_orange]">
//             H
//           </h1>
//           <div className="flex gap-3">
//             <button className="p-3 bg-gray-800 rounded-xl hover:shadow-[0_0_15px_#9333ea]">
//               <ShoppingCart className="text-purple-400" />
//             </button>
//             <button className="p-3 bg-gray-800 rounded-xl hover:shadow-[0_0_15px_#f59e0b]">
//               <Bell className="text-yellow-400" />
//             </button>
//             <button className="p-3 bg-gray-800 rounded-xl hover:shadow-[0_0_15px_#22d3ee]">
//               <Menu className="text-cyan-400" />
//             </button>
//           </div>
//         </div>

//         {/* Referral Card */}
//         <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-5 mb-6 shadow-[0_0_25px_rgba(168,85,247,0.8)]">
//           <h2 className="text-lg font-bold text-white">REFERRAL PROGRAM FOR BEGINNERS</h2>
//           <p className="text-sm text-gray-200 mt-1">Send referral code to your friend</p>
//         </div>

//         <button className="w-full mb-6 py-3 bg-gray-800 rounded-xl text-white font-semibold hover:shadow-[0_0_20px_#9333ea] transition">
//           Show more
//         </button>

//         {/* Live Tables */}
//         <h3 className="text-lg font-bold text-white mb-4">LIVE TABLES</h3>
//         <div className="space-y-4">
//           {tables.map((table) => (
//             <div
//               key={table.id}
//               className="flex justify-between items-center bg-gray-900 rounded-xl p-4 border border-gray-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition"
//             >
//               <span className="text-sm font-medium text-gray-300">{table.name}</span>
//               <span className="font-bold text-purple-300">{table.price}</span>
//               <button
//                 className={`px-4 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r ${table.color} shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:scale-105 transition`}
//               >
//                 JOIN
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }














// "use client";
// import { useState } from "react";
// import { ShoppingCart, Bell, Menu } from "lucide-react";

// export default function NeonDashboard() {
//   const [tables] = useState([
//     { id: 1, name: "Available 3 / 9", price: "$1270", color: "from-pink-500 to-orange-500" },
//     { id: 2, name: "Available 2 / 6", price: "$1750", color: "from-purple-500 to-pink-500" },
//     { id: 3, name: "Available 4 / 8", price: "$1750", color: "from-indigo-500 to-purple-500" },
//     { id: 4, name: "Available 2 / 9", price: "$1750", color: "from-yellow-400 to-orange-500" },
//     { id: 5, name: "Available 4 / 8", price: "$1750", color: "from-cyan-400 to-blue-500" },
//   ]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-gray-950/90 rounded-3xl shadow-[0_0_20px_rgba(255,0,200,0.5)] p-6 border border-purple-700">
        
//         {/* Top Navbar */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-extrabold text-orange-500 drop-shadow-[0_0_10px_orange]">
//             H
//           </h1>
//           <div className="flex gap-3">
//             <button className="p-3 bg-gray-800 rounded-xl hover:shadow-[0_0_15px_#9333ea]">
//               <ShoppingCart className="text-purple-400" />
//             </button>
//             <button className="p-3 bg-gray-800 rounded-xl hover:shadow-[0_0_15px_#f59e0b]">
//               <Bell className="text-yellow-400" />
//             </button>
//             <button className="p-3 bg-gray-800 rounded-xl hover:shadow-[0_0_15px_#22d3ee]">
//               <Menu className="text-cyan-400" />
//             </button>
//           </div>
//         </div>

//         {/* Referral Card */}
//         <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-5 mb-6 shadow-[0_0_25px_rgba(168,85,247,0.8)]">
//           <h2 className="text-lg font-bold text-white">REFERRAL PROGRAM FOR BEGINNERS</h2>
//           <p className="text-sm text-gray-200 mt-1">Send referral code to your friend</p>
//         </div>

//         <button className="w-full mb-6 py-3 bg-gray-800 rounded-xl text-white font-semibold hover:shadow-[0_0_20px_#9333ea] transition">
//           Show more
//         </button>

//         {/* Live Tables */}
//         <h3 className="text-lg font-bold text-white mb-4">LIVE TABLES</h3>
//         <div className="space-y-4">
//           {tables.map((table) => (
//             <div
//               key={table.id}
//               className="flex justify-between items-center bg-gray-900 rounded-xl p-4 border border-gray-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition"
//             >
//               <span className="text-sm font-medium text-gray-300">{table.name}</span>
//               <span className="font-bold text-purple-300">{table.price}</span>
//               <button
//                 className={`px-4 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r ${table.color} shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:scale-105 transition`}
//               >
//                 JOIN
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

