




"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Gift, Bell, Menu, Wallet, X, ScanQrCodeIcon } from "lucide-react";
import Api from "../api/Api";
import CountUp from "react-countup";
import dynamic from "next/dynamic";


const QrReader = dynamic(() => import("qrcode.react"), { ssr: false });

export default function LobbyPage() {
  const [id, setUserid] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [coissnss, setCoin] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bKash");
  const [account, setAccount] = useState("");
  const itemsPerPage = 5;

  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      setScanResult(data);
      setScanning(false);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  // Coin update interval
  useEffect(() => {
    const interval = setInterval(() => {
      const cojs = localStorage.getItem("coin");
      setCoin(cojs ? Number(cojs) : 0);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Load userData
  useEffect(() => {
 const userData = JSON.parse(localStorage.getItem('userData') || '[]');
    if (userData[0]) {
      setUserid(userData[0].id || 'no name fine');
      
    }
  }, [id]);

  // API call
  const getUser = useCallback(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    Api.get(`/orderget/${id}`)
      .then((res) => {
        setProducts(res.data.data || []);
      })
      .catch((err) => {
        console.error("Earning History Error:", err);
        setError("Something went wrong while loading data.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    getUser();
  }, [id, getUser]);

  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  // Withdraw Submit
  const handleWithdraw = async () => {
    try {
      await Api.post(
        "/withdraw",
        { amount, method, account_number: account },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Withdraw request sent!");
      setShowWithdraw(false);
      setAmount("");
      setAccount("");
    } catch (err) {
      console.error(err);
      alert("Withdraw failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-4 font-sans pb-24 flex flex-col max-w-md mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-orange-500 drop-shadow-[0_0_10px_#ff6a00]">
          R <sub className="text-sm">coin</sub>
        </h1>
        <div className="flex gap-4">
          <button
            className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#a855f7]"
            onClick={() => setScanning(true)}
          >
            <ScanQrCodeIcon className="w-5 h-5 text-purple-400" />
          </button>
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
        className="mt-6 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_#9333ea]"
      >
        <img
          src="../../Icon/Rcoin (2).png"
          alt="Referral"
          className="w-16 h-16 drop-shadow-[0_0_15px_#fff]"
        />
        <div className="text-right">
          <p className="text-sm font-bold drop-shadow-[0_0_6px_#fff]">
            Current Balance
          </p>
          <h1 className="text-4xl font-extrabold mt-1 drop-shadow-md">
            <CountUp end={coissnss} duration={2} separator="," />
          </h1>
        </div>
      </motion.div>

      {/* Withdraw Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px #9333ea" }}
        className="w-full mt-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition flex items-center justify-center gap-2"
        onClick={() => setShowWithdraw(true)}
      >
        <Wallet className="w-5 h-5 text-purple-400" />
        Money Withdraw
      </motion.button>

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-sm relative">
            <button
              onClick={() => setShowWithdraw(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-400"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-purple-400">
              Withdraw Money
            </h2>
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-700 bg-gray-800 p-2 w-full rounded mb-2"
            />
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="border border-gray-700 bg-gray-800 p-2 w-full rounded mb-2"
            >
              <option value="bKash">bKash</option>
              <option value="Nagad">Nagad</option>
              <option value="Rocket">Rocket</option>
              <option value="Bank">Bank Transfer</option>
            </select>
            <input
              type="text"
              placeholder="Account Number"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="border border-gray-700 bg-gray-800 p-2 w-full rounded mb-4"
            />
            <button
              onClick={handleWithdraw}
              className="w-full py-2 rounded bg-gradient-to-r from-purple-600 to-indigo-500 hover:shadow-[0_0_15px_#9333ea] transition"
            >
              Confirm Withdraw
            </button>
          </div>
        </div>
      )}

      {/* Live Tables */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]">
          LIVE DATA {id}
        </h2>

        <div className="flex justify-between mt-3">
          <button className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg hover:shadow-[0_0_12px_#22d3ee]">
        


 <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="border border-gray-700 bg-gray-800 p-2 w-full rounded mb-2"
            >
              <option value="all earning">earning list</option>
              <option value="game">game earning </option>
              <option value="allorder">order list</option>

            </select>




          </button>
          <button className="bg-gray-800 px-3 py-2 rounded-lg hover:shadow-[0_0_12px_#a855f7]">
            See more 
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {loading && <p className="text-center text-gray-400 animate-pulse">Loading tables...</p>}
          {error && <p className="text-center text-red-400">{error}</p>}
          {!loading && !error && products.length === 0 && (
            <p className="text-center text-gray-500">No tables found.</p>
          )}

          {!loading &&
            !error &&
            currentItems.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px #9333ea" }}
                className="flex items-center justify-between bg-gray-900 rounded-xl p-3 border border-purple-700/30"
              >
                <div>
                  <p className="text-sm text-gray-400">{item.status}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-purple-400 font-bold drop-shadow-[0_0_8px_#9333ea]">
                    {item.id}
                  </span>
                  <button className="px-4 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:shadow-[0_0_15px_#9333ea] transition">
                    JOIN
                  </button>
                </div>
              </motion.div>
            ))}

          {!loading && !error && products.length > 0 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40"
              >
                Prev
              </button>
              <span className="px-3 py-1 text-purple-400">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      </div>

     
  );
}






// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { motion } from "framer-motion";
// import { Search, Gift, Bell, Menu, Wallet, X, ScanQrCodeIcon  } from "lucide-react";
// import Api from "../api/Api";
// import CountUp from "react-countup";
// import dynamic from "next/dynamic";







// export default function LobbyPage() {
//   const [id, setUserId] = useState("64");
//   const [products, setProducts] = useState([]);
//   const [coissnss, setCoin] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showWithdraw, setShowWithdraw] = useState(false); // ✅ Withdraw modal toggle
//   const [amount, setAmount] = useState("");
//   const [method, setMethod] = useState("bKash");
//   const [account, setAccount] = useState("");
//   const itemsPerPage = 5;


// // react-qr-reader dynamically import করতে হবে (Next.js ssr সমস্যা এড়াতে)
// const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });


// const [scanning, setScanning] = useState(false);
//   const [scanResult, setScanResult] = useState<string | null>(null);

//   const handleScan = (data: string | null) => {
//     if (data) {
//       setScanResult(data);
//       setScanning(false); // স্ক্যান হয়ে গেলে ক্যামেরা বন্ধ হবে
//     }
//   };

//   const handleError = (err: any) => {
//     console.error(err);
//   };






//   // Coin update interval
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const cojs = localStorage.getItem("coin");
//       setCoin(cojs ? Number(cojs) : 0);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // Load userData
//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//     if (userData?.id) {
//       setUserId(userData.id);
//     }
//   }, []);

//   // API call
//   const getUser = useCallback(() => {
//     if (!id) return;
//     setLoading(true);
//     setError("");
//     Api.get(`/orderget/${id}`)
//       .then((res) => {
//         setProducts(res.data.data || []);
//       })
//       .catch((err) => {
//         console.error("Earning History Error:", err);
//         setError("Something went wrong while loading data.");
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   useEffect(() => {
//     getUser();
//   }, [id, getUser]);

//   const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

//   // ✅ Withdraw Submit
//   const handleWithdraw = async () => {
//     try {
//       await Api.post(
//         "/withdraw",
//         { amount, method, account_number: account },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       alert("Withdraw request sent!");
//       setShowWithdraw(false);
//       setAmount("");
//       setAccount("");
//     } catch (err) {
//       console.error(err);
//       alert("Withdraw failed!");
//     }
//   };


//   const cameragetid=()=>{



//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-4 font-sans pb-24 flex flex-col max-w-md mx-auto">
//       {/* Top Bar */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-extrabold text-orange-500 drop-shadow-[0_0_10px_#ff6a00]">
//           R <sub className="text-sm">coin</sub>
//         </h1>
//         <div className="flex gap-4">
//           <button className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#a855f7]">
//             <ScanQrCodeIcon   onClick={()=>cameragetid()} className="w-5 h-5 text-purple-400" />
//           </button>

//           <button className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#a855f7]">
//             <Gift className="w-5 h-5 text-purple-400" />
//           </button>
//           <button className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#facc15]">
//             <Bell className="w-5 h-5 text-yellow-400" />
//           </button>
//           <button className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#fb923c]">
//             <Menu className="w-5 h-5 text-orange-400" />
//           </button>
//         </div>
//       </div>

//       {/* Referral Banner */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="mt-6 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 
//         rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_#9333ea]"
//       >
//         <img
//           src="../../Icon/Rcoin (2).png"
//           alt="Referral"
//           className="w-16 h-16 drop-shadow-[0_0_15px_#fff]"
//         />
//         <div className="text-right">
//           <p className="text-sm font-bold drop-shadow-[0_0_6px_#fff]">
//             Current Balance
//           </p>
//           <h1 className="text-4xl font-extrabold mt-1 drop-shadow-md">
//             <CountUp end={coissnss} duration={2} separator="," />
//           </h1>
//         </div>
//       </motion.div>

//       {/* Withdraw Button */}
//       <motion.button
//         whileHover={{ scale: 1.05, boxShadow: "0 0 15px #9333ea" }}
//         className="w-full mt-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition flex items-center justify-center gap-2"
//         onClick={() => setShowWithdraw(true)}
//       >
//         <Wallet className="w-5 h-5 text-purple-400" />
//         Money Withdraw
//       </motion.button>

//       {/* Withdraw Modal */}
//       {showWithdraw && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-sm relative">
//             <button
//               onClick={() => setShowWithdraw(false)}
//               className="absolute top-3 right-3 text-gray-400 hover:text-red-400"
//             >
//               <X className="w-5 h-5" />
//             </button>
//             <h2 className="text-xl font-bold mb-4 text-purple-400">
//               Withdraw Money
//             </h2>
//             <input
//               type="number"
//               placeholder="Enter Amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="border border-gray-700 bg-gray-800 p-2 w-full rounded mb-2"
//             />
//             <select
//               value={method}
//               onChange={(e) => setMethod(e.target.value)}
//               className="border border-gray-700 bg-gray-800 p-2 w-full rounded mb-2"
//             >
//               <option value="bKash">bKash</option>
//               <option value="Nagad">Nagad</option>
//               <option value="Rocket">Rocket</option>
//               <option value="Bank">Bank Transfer</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Account Number"
//               value={account}
//               onChange={(e) => setAccount(e.target.value)}
//               className="border border-gray-700 bg-gray-800 p-2 w-full rounded mb-4"
//             />
//             <button
//               onClick={handleWithdraw}
//               className="w-full py-2 rounded bg-gradient-to-r from-purple-600 to-indigo-500 hover:shadow-[0_0_15px_#9333ea] transition"
//             >
//               Confirm Withdraw
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Live Tables */}
//       <div className="mt-6">
//         <h2 className="text-lg font-bold text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]">
//           LIVE TABLES {id}
//         </h2>

//         <div className="flex justify-between mt-3">
//           <button className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg hover:shadow-[0_0_12px_#22d3ee]">
//             <Search className="w-4 h-4" /> Search table
//           </button>
//           <button className="bg-gray-800 px-3 py-2 rounded-lg hover:shadow-[0_0_12px_#a855f7]">
//             See more
//           </button>
//         </div>

//         <div className="mt-4 space-y-4">
//           {loading && (
//             <p className="text-center text-gray-400 animate-pulse">
//               Loading tables...
//             </p>
//           )}

//           {error && <p className="text-center text-red-400">{error}</p>}

//           {!loading && !error && products.length === 0 && (
//             <p className="text-center text-gray-500">No tables found.</p>
//           )}

//           {!loading &&
//             !error &&
//             currentItems.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ scale: 1.02, boxShadow: "0 0 20px #9333ea" }}
//                 className="flex items-center justify-between bg-gray-900 rounded-xl p-3 border border-purple-700/30"
//               >
//                 <div>
//                   <p className="text-sm text-gray-400">{item.status}</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="text-purple-400 font-bold drop-shadow-[0_0_8px_#9333ea]">
//                     {item.id}
//                   </span>
//                   <button className="px-4 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:shadow-[0_0_15px_#9333ea] transition">
//                     JOIN
//                   </button>
//                 </div>
//               </motion.div>
//             ))}

//           {!loading && !error && products.length > 0 && (
//             <div className="flex justify-center gap-2 mt-4">
//               <button
//                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40"
//               >
//                 Prev
//               </button>
//               <span className="px-3 py-1 text-purple-400">
//                 {currentPage} / {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((p) => Math.min(p + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//   <div className="p-4">
//       {/* Scan Button */}
//       <button
//         onClick={() => setScanning(true)}
//         className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg"
//       >
//         <ScanQrCodeIcon className="w-5 h-5 text-white" />
//         Scan QR
//       </button>

//       {/* QR Scanner Modal */}
//       {scanning && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <QrReader
//               delay={300}
//               onError={handleError}
//               onScan={handleScan}
//               style={{ width: "300px" }}
//             />
//             <button
//               onClick={() => setScanning(false)}
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Result */}
//       {scanResult && (
//         <div className="mt-4 p-2 border rounded bg-gray-100">
//           <p className="text-sm">Scanned Value:</p>
//           <p className="font-bold text-purple-600">{scanResult}</p>
//         </div>
//       )}
//     </div>






//     </div>
//   );
// }








// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { motion } from "framer-motion";
// import { Search, Gift, Bell, Menu, Wallet } from "lucide-react";
// import Api from "../api/Api";
// import CountUp from "react-countup";

// export default function LobbyPage() {
//   const [id, setUserId] = useState("64");
//   const [products, setProducts] = useState([]);
//   const [coissnss, setCoin] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false); // ✅ Loading state
//   const [error, setError] = useState(""); // ✅ Error state
//   const itemsPerPage = 5;

//   // Coin update interval
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const cojs = localStorage.getItem("coin");
//       setCoin(cojs ? Number(cojs) : 0);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // Load userData
//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//     if (userData?.id) {
//       setUserId(userData.id);
//     }
//   }, []);

//   // API call
//   const getUser = useCallback(() => {
//     if (!id) return;
//     setLoading(true);
//     setError("");
//     Api.get(`/orderget/${id}`)
//       .then((res) => {
//         setProducts(res.data.data || []);
//       })
//       .catch((err) => {
//         console.error("Earning History Error:", err);
//         setError("Something went wrong while loading data.");
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   useEffect(() => {
//     getUser();
//   }, [id, getUser]);

//   const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-4 font-sans pb-24 flex flex-col max-w-md mx-auto">
//       {/* Top Bar */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-extrabold text-orange-500 drop-shadow-[0_0_10px_#ff6a00]">
//           R <sub className="text-sm">coin</sub>
//         </h1>
//         <div className="flex gap-3">
//           <button className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#a855f7]">
//             <Gift className="w-5 h-5 text-purple-400" />
//           </button>
//           <button className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#facc15]">
//             <Bell className="w-5 h-5 text-yellow-400" />
//           </button>
//           <button className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#fb923c]">
//             <Menu className="w-5 h-5 text-orange-400" />
//           </button>
//         </div>
//       </div>

//       {/* Referral Banner */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="mt-6 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 
//         rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_#9333ea]"
//       >
//         <img
//           src="../../Icon/Rcoin (2).png"
//           alt="Referral"
//           className="w-16 h-16 drop-shadow-[0_0_15px_#fff]"
//         />
//         <div className="text-right">
//           <p className="text-sm font-bold drop-shadow-[0_0_6px_#fff]">
//             Current Balance
//           </p>
//           <h1 className="text-4xl font-extrabold mt-1 drop-shadow-md">
//             <CountUp end={coissnss} duration={2} separator="," />
//           </h1>
//         </div>
//       </motion.div>

//       {/* Show More */}
//       <motion.button
   
//         whileHover={{ scale: 1.05, boxShadow: "0 0 15px #9333ea" }}
//         className="w-full mt-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition "
//       >
//         <p>

//     money withdraw
//     <Wallet className="items-center" />


//         </p>
 
//       </motion.button>

//       {/* Live Tables */}
//       <div className="mt-6">
//         <h2 className="text-lg font-bold text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]">
//           LIVE TABLES {id}
//         </h2>

//         <div className="flex justify-between mt-3">
//           <button className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg hover:shadow-[0_0_12px_#22d3ee]">
//             <Search className="w-4 h-4" /> Search table
//           </button>
//           <button className="bg-gray-800 px-3 py-2 rounded-lg hover:shadow-[0_0_12px_#a855f7]">
//             See more
//           </button>
//         </div>

//         <div className="mt-4 space-y-4">
//           {/* ✅ Loading Indicator */}
//           {loading && (
//             <p className="text-center text-gray-400 animate-pulse">
//               Loading tables...
//             </p>
//           )}

//           {/* ✅ Error Message */}
//           {error && (
//             <p className="text-center text-red-400">{error}</p>
//           )}

//           {/* ✅ If no data */}
//           {!loading && !error && products.length === 0 && (
//             <p className="text-center text-gray-500">No tables found.</p>
//           )}

//           {/* ✅ Show Data */}
//           {!loading &&
//             !error &&
//             currentItems.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ scale: 1.02, boxShadow: "0 0 20px #9333ea" }}
//                 className="flex items-center justify-between bg-gray-900 rounded-xl p-3 border border-purple-700/30"
//               >
//                 <div>
//                   <p className="text-sm text-gray-400">{item.status}</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="text-purple-400 font-bold drop-shadow-[0_0_8px_#9333ea]">
//                     {item.id}
//                   </span>
//                   <button className="px-4 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:shadow-[0_0_15px_#9333ea] transition">
//                     JOIN
//                   </button>
//                 </div>
//               </motion.div>
//             ))}

//           {/* Pagination */}
//           {!loading && !error && products.length > 0 && (
//             <div className="flex justify-center gap-2 mt-4">
//               <button
//                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40"
//               >
//                 Prev
//               </button>
//               <span className="px-3 py-1 text-purple-400">
//                 {currentPage} / {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((p) => Math.min(p + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }















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






// "use client"

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Search, Gift, Bell, Menu } from "lucide-react";
// import Api from "../api/Api";
// import CountUp from "react-countup";


// export default function LobbyPage() {


// const [id, setUsedrid] = useState([])
// const [products, setProducts] = useState([])

//   // const [tables] = useState([
//   //   { id: 1, available: "3/9", amount: "$1,270" },
//   //   { id: 2, available: "2/6", amount: "$1,750" },
//   //   { id: 3, available: "4/8", amount: "$1,750" },
//   //   { id: 4, available: "2/9", amount: "$1,750" },
//   //   { id: 5, available: "4/8", amount: "$1,750" },
//   // ]);


// const [coissnss, setCoin] = useState(0);





// useEffect(() => {
 


 
// setInterval(() => {
//   const cojs=localStorage.getItem('coin');
// setCoin(cojs);
// }, 3000);

// })

//   useEffect(() => {

//    const userData = JSON.parse(localStorage.getItem('userData') || '[]');
//     if (userData[0]) {
//       setUsedrid(userData[0].id || '64');
    
//     }


//   getUser();
//   }, [id])



//   const getUser= () =>{

//   Api.get(`/orderget/${id}`)
//   .then(res =>{
    

  
//  setProducts(res.data.data);

   

// console.log(' R co earning r coin====================================');
// console.log(res.data);
// console.log('====================================');
// })
//   .catch(err => 
    
    
//     console.log('       Earning History      r coin  RRRRRRrrrrrrr'+err));

// }





//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // মোট কতগুলো পেজ হবে
//   const totalPages = Math.ceil(products.length / itemsPerPage);

//   // কোন কোন ডাটা দেখানো হবে (slice করে)
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = products.slice(startIndex, startIndex + itemsPerPage);





//   return (
    
//     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-4 font-sanspb-24 flex flex-col max-w-md mx-auto">
//       {/* Top Bar */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-extrabold text-orange-500 drop-shadow-[0_0_10px_#ff6a00]">
//           R <sub className="text-sm">coin</sub>
//         </h1>
//         <div className="flex gap-3">
//           <button className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#a855f7]">
//             <Gift className="w-5 h-5 text-purple-400" />
//           </button>
//           <button className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#facc15]">
//             <Bell className="w-5 h-5 text-yellow-400" />
//           </button>
//           <button className="bg-gray-800 p-2 rounded-full hover:shadow-[0_0_15px_#fb923c]">
//             <Menu className="w-5 h-5 text-orange-400" />
//           </button>
//         </div>
//       </div>

//       {/* Referral Banner */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="mt-6 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 
//         rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_#9333ea]"
//       >


//          <img                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
//           src='../../Icon/Rcoin (2).png'
//           alt="Referral"
//           className="w-16 h-16 drop-shadow-[0_0_15px_#fff]"
//         />



 
      
    

//        <p className="text-sm font-semibold tracking-wide font-bold drop-shadow-[0_0_6px_#fff]">Current Balance</p>
          
//           <h2 className="text-lg font-bold drop-shadow-[0_0_6px_#fff]">
//      <h1 className="text-4xl font-extrabold mt-1 drop-shadow-md"><CountUp end={coissnss} duration={2} separator="," /></h1>
       
//           </h2>
//             <div>
//         </div>                        
       
//       </motion.div>

//       {/* Show More */}
//       <motion.button
//         whileHover={{ scale: 1.05, boxShadow: "0 0 15px #9333ea" }}
//         className="w-full mt-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
//       >
//         Show more
//       </motion.button>

//       {/* Live Tables */}
//       <div className="mt-6">
//         <h2 className="text-lg font-bold text-cyan-400 drop-shadow-[0_0_6px_#22d3ee]">
//           LIVE TABLES  {id}
//         </h2>

//         <div className="flex justify-between mt-3">
//           <button className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg hover:shadow-[0_0_12px_#22d3ee]">
//             <Search className="w-4 h-4" /> Search table
//           </button>
//           <button className="bg-gray-800 px-3 py-2 rounded-lg hover:shadow-[0_0_12px_#a855f7]">
//             See more
//           </button>
//         </div>

//         <div className="mt-4 space-y-4">
//               {currentItems.map((item, index) => (
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.1 }}
//           whileHover={{ scale: 1.02, boxShadow: "0 0 20px #9333ea" }}
//           className="flex items-center justify-between bg-gray-900 rounded-xl p-3 border border-purple-700/30"
//         >
//           <div>
//             <p className="text-sm text-gray-400">     {item.status}</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-purple-400 font-bold drop-shadow-[0_0_8px_#9333ea]">
//               {item.id}
//             </span>
//             <button className="px-4 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:shadow-[0_0_15px_#9333ea] transition">
//               JOIN
//             </button>
//           </div>
//         </motion.div>
//       ))}







//       {/* Pagination Buttons */}
//       <div className="flex justify-center gap-2 mt-4">
//         <button
//           onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//           disabled={currentPage === 1}
//           className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40"
//         >
//           Prev
//         </button>
//         <span className="px-3 py-1 text-purple-400">
//           {currentPage} / {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40"
//         >
//           Next
//         </button>
//       </div>




      
//         </div>
//       </div>
//     </div>
//   );
// }


// function setProducts(message: any) {
//   throw new Error("Function not implemented.");
// }

