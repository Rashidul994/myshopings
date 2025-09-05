


"use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Home,
//   LineChart as LineIcon,
//   ShoppingBag,
//   Sparkles,
//   Sun,
//   Moon,
//   Search,
//   ChevronRight,
//   TrendingUp,
//   Clock,
//   ShieldCheck,
//   Star,
//   Flame,
// } from "lucide-react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// // Demo data
// const marketData = Array.from({ length: 24 }).map((_, i) => ({
//   time: `${i}:00`,
//   price: 100 + Math.sin(i / 2) * 8 + (i % 5),
// }));

// const tickers = [
//   { symbol: "RCN", name: "R Coin", price: 12.45, change: +2.3 },
//   { symbol: "BANGLA", name: "Bangla Index", price: 245.7, change: -0.8 },
//   { symbol: "TECHA", name: "Tech A", price: 78.12, change: +1.1 },
//   { symbol: "FOODA", name: "Food A", price: 33.6, change: +0.4 },
// ];

// const categories = [
//   { key: "all", label: "সব" },
//   { key: "new", label: "নতুন" },
//   { key: "old", label: "পুরাতন" },
//   { key: "electronics", label: "ইলেকট্রনিক্স" },
//   { key: "fashion", label: "ফ্যাশন" },
//   { key: "home", label: "হোম" },
// ];

// const allProducts = [
//   {
//     id: 1,
//     title: "স্মার্ট ঘড়ি Pro X",
//     tag: "new",
//     category: "electronics",
//     price: 4990,
//     rating: 4.8,
//     img: "https://images.unsplash.com/photo-1518444054149-4e1cd2f2b4d9?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     title: "স্টাইলিশ ব্যাকপ্যাক",
//     tag: "new",
//     category: "fashion",
//     price: 1890,
//     rating: 4.6,
//     img: "https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     title: "কফি মেকার Classic",
//     tag: "old",
//     category: "home",
//     price: 3290,
//     rating: 4.4,
//     img: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 4,
//     title: "ওয়্যারলেস ইয়ারবাড",
//     tag: "new",
//     category: "electronics",
//     price: 2590,
//     rating: 4.7,
//     img: "https://images.unsplash.com/photo-1518441798251-b4c8347d9a26?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 5,
//     title: "ব্লেজার Premium",
//     tag: "old",
//     category: "fashion",
//     price: 5490,
//     rating: 4.3,
//     img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
//   },
// ];

// // Fade animation helper
// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 24 },
//   animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
// });

// function cn(...classes: Array<string | false | null | undefined>) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function HomeShowcasePage() {
//   const [dark, setDark] = useState(false);
//   const [q, setQ] = useState("");
//   const [activeCat, setActiveCat] = useState("all");

//   useEffect(() => {
//     const root = document.documentElement;
//     if (dark) root.classList.add("dark");
//     else root.classList.remove("dark");
//   }, [dark]);

//   const filtered = useMemo(() => {
//     return allProducts.filter((p) => {
//       const byCat = activeCat === "all" ? true : p.category === activeCat || p.tag === activeCat;
//       const byQ = q ? p.title.toLowerCase().includes(q.toLowerCase()) : true;
//       return byCat && byQ;
//     });
//   }, [activeCat, q]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
//       {/* Topbar */}
//       <div className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <motion.div
//               className="h-9 w-9 rounded-2xl bg-blue-100 flex items-center justify-center"
//               initial={{ rotate: -10, scale: 0.9 }}
//               animate={{ rotate: 0, scale: 1 }}
//               transition={{ type: "spring", stiffness: 120 }}
//             >
//               <Sparkles className="h-5 w-5 text-blue-600" />
//             </motion.div>
//             <span className="font-bold tracking-tight text-lg">Rashidul Hub</span>
//             <span className="ml-2 hidden sm:inline-flex text-sm px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded">Home</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="relative hidden md:block">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
//               <input
//                 className="pl-9 w-[300px] py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="খুঁজুন— প্রোডাক্ট, অ্যাপ, মার্কেট…"
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//               />
//             </div>
//             <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800" onClick={() => setDark((d) => !d)}>
//               {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
//         <div className="grid md:grid-cols-2 gap-6 items-center">
//           <motion.div {...fadeUp(0)}>
//             <span className="inline-flex items-center px-2 py-1 mb-3 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 rounded">
//               <Sparkles className="h-3.5 w-3.5 mr-1" /> নতুন আর সুন্দর ডিজাইন
//             </span>
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
//               এক পেজেই দেখুন <span className="text-blue-600">মার্কেট</span>, প্রোডাক্ট, ও আরও অ্যাপ
//             </h1>
//             <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-prose">
//               লাইট/ডার্ক থিম, স্মুথ মশন, লাইভ স্টাইল চার্ট— সব একসাথে। নিচে স্ক্রল করে এক্সপ্লোর করুন।
//             </p>
//             <div className="mt-6 flex flex-wrap gap-3">
//               <button className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                 <Home className="h-4 w-4" /> শুরু করুন
//               </button>
//               <button className="flex items-center gap-1 px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
//                 <ChevronRight className="h-4 w-4" /> সব ক্যাটাগরি
//               </button>
//             </div>
//           </motion.div>

//           <motion.div {...fadeUp(0.1)} className="relative">
//             <div className="absolute -inset-4 bg-blue-100 blur-3xl rounded-full -z-10 dark:bg-blue-900/30" />
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
//               <div className="p-4 border-b">
//                 <div className="flex items-center gap-2 font-semibold">
//                   <LineIcon className="h-5 w-5" /> লাইভ মার্কেট স্ন্যাপশট
//                 </div>
//                 <div className="text-sm text-gray-500 dark:text-gray-400">ডেমো ডাটা — আপনার API যুক্ত করুন</div>
//               </div>
//               <div className="p-4">
//                 <div className="h-44">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={marketData} margin={{ left: 8, right: 8 }}>
//                       <defs>
//                         <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
//                           <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
//                         </linearGradient>
//                       </defs>
//                       <XAxis dataKey="time" hide />
//                       <YAxis hide domain={[80, 120]} />
//                       <Tooltip contentStyle={{ borderRadius: 12 }} />
//                       <Area type="monotone" dataKey="price" strokeWidth={2} stroke="currentColor" fill="url(#g1)" />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//                 <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
//                   {tickers.map((t) => (
//                     <motion.div
//                       key={t.symbol}
//                       initial={{ opacity: 0, y: 8 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className={cn(
//                         "rounded-xl border p-2 text-sm flex items-center justify-between",
//                         t.change >= 0 ? "bg-green-50 dark:bg-green-900/30" : "bg-red-50 dark:bg-red-900/30"
//                       )}
//                     >
//                       <div>
//                         <div className="font-medium">{t.symbol}</div>
//                         <div className="text-gray-500 text-xs">{t.name}</div>
//                       </div>
//                       <div className="text-right">
//                         <div className="font-semibold">{t.price.toFixed(2)}</div>
//                         <div className={cn("text-xs", t.change >= 0 ? "text-green-600" : "text-red-600")}>{t.change}%</div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Quick Apps & Products & CTA & Footer */}
//       {/* Tailwind only components like above */}
//       {/* Product Grid, Quick Apps, Tabs, CTA banner, Footer all TailwindCSS styled */}
//     </div>
//   );
// }












// "use client";

// import { motion } from "framer-motion";
// import {
//   ShoppingBag,
//   BarChart3,
//   Layers,
//   TrendingUp,
//   Sparkles,
//   Star,
// } from "lucide-react";

// export default function HomePage() {
//   const services = [
//     { title: "পণ্য বিক্রয়", icon: <ShoppingBag size={28} />, color: "from-pink-500 to-purple-600" },
//     { title: "শেয়ার মার্কেট", icon: <BarChart3 size={28} />, color: "from-green-500 to-teal-600" },
//     { title: "পুরাতন পণ্য", icon: <Layers size={28} />, color: "from-yellow-500 to-orange-600" },
//     { title: "নতুন আপডেট", icon: <Sparkles size={28} />, color: "from-blue-500 to-indigo-600" },
//   ];

//   const products = [
//     { name: "নতুন মোবাইল", price: "৳12,000", tag: "নতুন" },
//     { name: "ল্যাপটপ পুরাতন", price: "৳25,000", tag: "পুরাতন" },
//     { name: "হেডফোন", price: "৳1,200", tag: "নতুন" },
//     { name: "মনিটর", price: "৳8,500", tag: "পুরাতন" },
//   ];

//   const tickers = [
//     { symbol: "GP", price: 285.5, change: "+2.3%" },
//     { symbol: "BATBC", price: 520.2, change: "-1.1%" },
//     { symbol: "BRAC", price: 145.3, change: "+0.9%" },
//     { symbol: "IFIC", price: 22.5, change: "+0.3%" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
//       {/* Hero Section */}
//       <section className="relative text-center py-24 px-6 overflow-hidden">
//         <motion.h1
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
//         >
//           🌟 আমাদের আধুনিক সেবা প্ল্যাটফর্ম
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto"
//         >
//           নতুন, পুরাতন পণ্য, শেয়ার মার্কেট ও আরও অনেক কিছু একসাথে এক পেজে!
//         </motion.p>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2 }}
//           className="mt-10 flex justify-center gap-4 flex-wrap"
//         >
//           <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-lg hover:scale-105 transition">
//             শুরু করুন
//           </button>
//           <button className="px-6 py-3 rounded-xl border border-gray-400 hover:bg-gray-700 transition">
//             সব সেবা দেখুন
//           </button>
//         </motion.div>
//       </section>

//       {/* Services Section */}
//       <section className="px-6 py-12 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold mb-8 text-center">আমাদের সেবা</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
//           {services.map((s, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 200 }}
//               className={`p-6 rounded-2xl shadow-xl bg-gradient-to-br ${s.color} flex flex-col items-center justify-center`}
//             >
//               {s.icon}
//               <p className="mt-4 font-semibold text-white">{s.title}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Products Section */}
//       <section className="px-6 py-12 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold mb-8 text-center">পণ্য সমূহ</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
//           {products.map((p, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.2 }}
//               className="p-4 rounded-xl bg-gray-800 hover:bg-gray-700 shadow-lg"
//             >
//               <div className="flex justify-between items-center">
//                 <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-xs px-2 py-1 rounded-full">
//                   {p.tag}
//                 </span>
//                 <Star className="text-yellow-400" size={18} />
//               </div>
//               <h3 className="mt-3 font-semibold">{p.name}</h3>
//               <p className="text-sm text-gray-400">{p.price}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Stock Market Section */}
//       <section className="px-6 py-12 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold mb-8 text-center">📈 শেয়ার মার্কেট</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
//           {tickers.map((t, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="p-6 rounded-xl bg-gray-800 hover:bg-gray-700 shadow-lg text-center"
//             >
//               <p className="font-bold">{t.symbol}</p>
//               <p className="text-lg">{t.price}</p>
//               <p className={t.change.startsWith("+") ? "text-green-400" : "text-red-400"}>
//                 {t.change}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Banner */}
//       <section className="px-6 py-16">
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="p-10 text-center rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-xl"
//         >
//           <h2 className="text-3xl font-bold mb-4">🎉 আজই আমাদের সাথে যুক্ত হোন!</h2>
//           <p className="mb-6 text-gray-200">নতুন অভিজ্ঞতা, নতুন সম্ভাবনা।</p>
//           <button className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition">
//             শুরু করুন
//           </button>
//         </motion.div>
//       </section>
//     </div>
//   );
// }




// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import {
//   ShoppingBag,
//   Smartphone,
//   TrendingUp,
//   Sparkles,
//   Clock,
//   Star,
// } from "lucide-react";

// export default function HomePage() {
//   const [tab, setTab] = useState("new");

//   const apps = [
//     { title: "Marketplace", icon: ShoppingBag },
//     { title: "Mobile Service", icon: Smartphone },
//     { title: "Stock Market", icon: TrendingUp },
//     { title: "Offers", icon: Sparkles },
//   ];

//   const products = {
//     new: [
//       { name: "নতুন ফোন", price: "৳12000" },
//       { name: "ল্যাপটপ", price: "৳55000" },
//     ],
//     old: [
//       { name: "পুরাতন টিভি", price: "৳7000" },
//       { name: "ব্যবহৃত মোটরসাইকেল", price: "৳85000" },
//     ],
//   };

//   const tickers = [
//     { symbol: "RCoin", price: 102, change: "+2.5%" },
//     { symbol: "Gold", price: 95, change: "-1.2%" },
//     { symbol: "Oil", price: 67, change: "+0.8%" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
//       {/* Hero Section */}
//       <section className="text-center py-16 px-6">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
//         >
//           এক প্ল্যাটফর্মে সব কিছু 🚀
//         </motion.h1>
//         <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
//           কেনাকাটা, পুরাতন বিক্রয়, লাইভ শেয়ার মার্কেট — সব একসাথে।
//         </p>
//       </section>

//       {/* Quick Apps */}
//       <section className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
//         {apps.map((app, idx) => (
//           <motion.div
//             key={app.title}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.2 }}
//             whileHover={{ scale: 1.05 }}
//             className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 flex flex-col items-center shadow-lg cursor-pointer hover:shadow-pink-500/40"
//           >
//             <app.icon className="h-10 w-10 text-pink-400" />
//             <p className="mt-3 font-semibold">{app.title}</p>
//           </motion.div>
//         ))}
//       </section>

//       {/* Products Section */}
//       <section className="mt-16 max-w-6xl mx-auto px-4">
//         <div className="flex justify-center space-x-4 mb-6">
//           <button
//             onClick={() => setTab("new")}
//             className={`px-4 py-2 rounded-full ${
//               tab === "new"
//                 ? "bg-pink-500 text-white"
//                 : "bg-gray-700 text-gray-300"
//             }`}
//           >
//             নতুন
//           </button>
//           <button
//             onClick={() => setTab("old")}
//             className={`px-4 py-2 rounded-full ${
//               tab === "old"
//                 ? "bg-pink-500 text-white"
//                 : "bg-gray-700 text-gray-300"
//             }`}
//           >
//             পুরাতন
//           </button>
//         </div>

//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products[tab].map((p, idx) => (
//             <motion.div
//               key={p.name}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.2 }}
//               whileHover={{ scale: 1.05 }}
//               className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-pink-500/40"
//             >
//               <h3 className="text-xl font-semibold">{p.name}</h3>
//               <p className="text-pink-400 mt-2">{p.price}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Stock Market */}
//       <section className="mt-16 max-w-6xl mx-auto px-4">
//         <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//           <TrendingUp className="h-6 w-6 text-green-400" /> লাইভ শেয়ার মার্কেট
//         </h2>
//         <div className="bg-gray-800 rounded-xl p-6 overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="text-gray-400">
//                 <th className="py-2">Symbol</th>
//                 <th className="py-2">Price</th>
//                 <th className="py-2">Change</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tickers.map((t, idx) => (
//                 <motion.tr
//                   key={t.symbol}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.2 }}
//                   className="border-b border-gray-700"
//                 >
//                   <td className="py-2">{t.symbol}</td>
//                   <td className="py-2">{t.price}</td>
//                   <td
//                     className={`py-2 ${
//                       t.change.startsWith("+")
//                         ? "text-green-400"
//                         : "text-red-400"
//                     }`}
//                   >
//                     {t.change}
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* CTA Banner */}
//       <section className="mt-20 max-w-5xl mx-auto text-center px-6">
//         <div className="bg-gradient-to-r from-pink-600 to-purple-700 rounded-3xl py-12 px-6 shadow-xl">
//           <h2 className="text-3xl font-bold">আজই শুরু করুন ✨</h2>
//           <p className="mt-3 text-gray-200">
//             আমাদের প্ল্যাটফর্মে ব্যবসা, কেনাকাটা ও বিনিয়োগ সব একসাথে।
//           </p>
//           <button className="mt-6 px-6 py-3 bg-black rounded-full text-white hover:bg-gray-900">
//             Join Now
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="mt-20 py-8 text-center text-gray-400 text-sm">
//         © 2025 আপনার কোম্পানি. সর্বস্বত্ব সংরক্ষিত।
//       </footer>
//     </div>
//   );
// }






// "use client";

// import { motion } from "framer-motion";
// import {
//   ShoppingBag,
//   BarChart3,
//   Layers,
//   TrendingUp,
//   Sparkles,
//   Star,
// } from "lucide-react";

// export default function HomePage() {
//   const services = [
//     { title: "পণ্য বিক্রয়", icon: <ShoppingBag size={28} />, color: "from-pink-500 to-purple-600" },
//     { title: "শেয়ার মার্কেট", icon: <BarChart3 size={28} />, color: "from-green-500 to-teal-600" },
//     { title: "পুরাতন পণ্য", icon: <Layers size={28} />, color: "from-yellow-500 to-orange-600" },
//     { title: "নতুন আপডেট", icon: <Sparkles size={28} />, color: "from-blue-500 to-indigo-600" },
//   ];

//   const products = [
//     { name: "নতুন মোবাইল", price: "৳12,000", tag: "নতুন" },
//     { name: "ল্যাপটপ পুরাতন", price: "৳25,000", tag: "পুরাতন" },
//     { name: "হেডফোন", price: "৳1,200", tag: "নতুন" },
//     { name: "মনিটর", price: "৳8,500", tag: "পুরাতন" },
//   ];

//   const tickers = [
//     { symbol: "GP", price: 285.5, change: "+2.3%" },
//     { symbol: "BATBC", price: 520.2, change: "-1.1%" },
//     { symbol: "BRAC", price: 145.3, change: "+0.9%" },
//     { symbol: "IFIC", price: 22.5, change: "+0.3%" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
//       {/* Hero Section */}
//       <section className="relative text-center py-20 px-6 overflow-hidden">
//         <motion.h1
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
//         >
//           🌟 আমাদের আধুনিক সেবা প্ল্যাটফর্ম
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="mt-4 text-lg text-gray-300"
//         >
//           নতুন, পুরাতন পণ্য, শেয়ার মার্কেট ও আরো অনেক কিছু একসাথে!
//         </motion.p>
//       </section>

//       {/* Services */}
//       <section className="px-6 py-12">
//         <h2 className="text-2xl font-bold mb-6">আমাদের সেবা</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//           {services.map((s, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br ${s.color} flex flex-col items-center`}
//             >
//               {s.icon}
//               <p className="mt-3 font-semibold">{s.title}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Products */}
//       <section className="px-6 py-12">
//         <h2 className="text-2xl font-bold mb-6">পণ্য সমূহ</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//           {products.map((p, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.2 }}
//               className="p-4 rounded-xl bg-gray-800 hover:bg-gray-700 shadow-lg"
//             >
//               <div className="flex justify-between items-center">
//                 <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-xs px-2 py-1 rounded-full">
//                   {p.tag}
//                 </span>
//                 <Star className="text-yellow-400" size={18} />
//               </div>
//               <h3 className="mt-3 font-semibold">{p.name}</h3>
//               <p className="text-sm text-gray-400">{p.price}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Stock Market */}
//       <section className="px-6 py-12">
//         <h2 className="text-2xl font-bold mb-6">📈 শেয়ার মার্কেট</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//           {tickers.map((t, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="p-4 rounded-xl bg-gray-800 hover:bg-gray-700 shadow-lg text-center"
//             >
//               <p className="font-bold">{t.symbol}</p>
//               <p className="text-lg">{t.price}</p>
//               <p
//                 className={`text-sm ${
//                   t.change.startsWith("+") ? "text-green-400" : "text-red-400"
//                 }`}
//               >
//                 {t.change}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Banner */}
//       <section className="px-6 py-16">
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="p-10 text-center rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-xl"
//         >
//           <h2 className="text-3xl font-bold mb-4">🎉 আজই আমাদের সাথে যুক্ত হোন!</h2>
//           <p className="mb-6">নতুন অভিজ্ঞতা, নতুন সম্ভাবনা।</p>
//           <button className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition">
//             শুরু করুন
//           </button>
//         </motion.div>
//       </section>
//     </div>
//   );
// }






// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { ShoppingBag, TrendingUp, Gift, Smartphone, Coins } from "lucide-react";

// export default function HomePage() {
//   const [tab, setTab] = useState("new");

//   const products = {
//     new: ["নতুন মোবাইল", "স্মার্ট ওয়াচ", "হেডফোন"],
//     old: ["সেকেন্ড হ্যান্ড ল্যাপটপ", "বই", "ফার্নিচার"],
//     popular: ["টিভি", "ফ্রিজ", "এসি"],
//   };

//   const tickers = [
//     { symbol: "RCoin", price: 120.5, change: "+2.5%" },
//     { symbol: "BCoin", price: 95.2, change: "-1.3%" },
//     { symbol: "SCoin", price: 250.7, change: "+5.1%" },
//   ];

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
//       {/* Hero */}
//       <section className="text-center py-16 px-4">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent"
//         >
//           Welcome to R-Market
//         </motion.h1>
//         <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
//           নতুন প্রোডাক্ট, পুরাতন জিনিস, আর শেয়ার মার্কেট – সব একসাথে!
//         </p>
//       </section>

//       {/* Quick Apps */}
//       <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-2xl font-bold mb-4">Quick Apps</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
//           {[
//             { name: "Shop", icon: ShoppingBag },
//             { name: "Offers", icon: Gift },
//             { name: "Market", icon: TrendingUp },
//             { name: "Mobile", icon: Smartphone },
//             { name: "Coins", icon: Coins },
//           ].map((app, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="p-4 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-500 shadow-lg text-center cursor-pointer"
//             >
//               <app.icon className="mx-auto h-8 w-8 mb-2 text-white" />
//               <p className="text-sm font-medium">{app.name}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Products Tabs */}
//       <section className="max-w-6xl mx-auto mt-12 px-4">
//         <div className="flex gap-4 mb-6 justify-center">
//           {["new", "old", "popular"].map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`px-4 py-2 rounded-full font-medium ${
//                 tab === t
//                   ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-black"
//                   : "bg-gray-700 hover:bg-gray-600"
//               }`}
//             >
//               {t === "new" ? "নতুন" : t === "old" ? "পুরাতন" : "জনপ্রিয়"}
//             </button>
//           ))}
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {products[tab].map((p, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="p-4 rounded-xl bg-gray-800 hover:bg-gray-700 shadow-lg"
//             >
//               <h3 className="text-lg font-semibold">{p}</h3>
//               <p className="text-sm text-gray-400">৳ {1000 + i * 500}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Share Market */}
//       <section className="max-w-6xl mx-auto mt-12 px-4">
//         <h2 className="text-2xl font-bold mb-4">শেয়ার মার্কেট</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           {tickers.map((t, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="p-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 shadow-md"
//             >
//               <h3 className="text-lg font-bold">{t.symbol}</h3>
//               <p className="text-xl">{t.price} ৳</p>
//               <p
//                 className={`font-medium ${
//                   t.change.startsWith("+") ? "text-green-400" : "text-red-400"
//                 }`}
//               >
//                 {t.change}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="mt-16 py-6 text-center text-gray-500 text-sm">
//         © 2025 R-Market. All rights reserved.
//       </footer>
//     </main>
//   );
// }













// 'use client'

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaBoxOpen } from 'react-icons/fa';
// import Typewriter from 'typewriter-effect';
// import Link from 'next/link';

// import Marquee from './marqee/page';
// import Footers from './Footer/page';
// import Api from './api/Api';
// import HomepageVAlucup from './Products/HomepageVAlucup';
// import Cardsprodut from './Products/Product_get_brand';
// import AllInOneNavbar from './components/Navbar';

// export default function HomeClient() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [brand, setBrand] = useState('');
//   const [branNams, setBrnadnms] = useState('');
//   const [actions_new_old, setAction] = useState<string>('new');
//   const [loading, setLoading] = useState(true);

//   // LocalStorage Check
//   useEffect(() => {
  
//       const current = localStorage.getItem('oldOrNew');
//       if (current !== actions_new_old) {
//         setAction(current || 'new');
//       }
  

  
//   }, [actions_new_old]);

//   // Product Fetch
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       await getAllProducts();
//       await getUserBrandName();
//       await getUserBrandNameFinal();
//       setLoading(false);
//     };

//     fetchData();
    
   
//   }, [actions_new_old]);

//   const getAllProducts = async () => {
//     try {
//       const res = await Api.get(`/get_all_product/${actions_new_old}`);
//       if (!brand) setProducts(res.data.message);
//     } catch (err) {
//       console.error('❌ Product load error:', err);
//     }
//   };

//   const getUserBrandName = async () => {
//     try {
//       const res = await Api.get(`/get_all_product_brandName/${brand}/${actions_new_old}`);
//       if (brand) setProducts(res.data.message);
//     } catch (err) {
//       console.error('❌ Brand get error:', err);
//     }
//   };

//   const getUserBrandNameFinal = async () => {
//     if (!branNams) return;
//     try {
//       const res = await Api.get(`/get_all_product_brandName_final/${brand}/${actions_new_old}/${branNams}`);
//       setProducts(res.data.message);
//     } catch (err) {
//       console.error('❌ Final brand category error:', err);
//     }
//   };

//   const handleProductClick = (product: any) => {
//     if (brand) {
//       setBrnadnms(product.brand);
//     } else {
//       setBrand(product.catagori);
//     }
//   };

//   return (
//     <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">

// <AllInOneNavbar   />


//       <Marquee brand={brand} />
//       <HomepageVAlucup brandname={branNams} Catagoris={brand} />

//       {loading ? (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center"
//           >
//             <motion.div
//               animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
//               transition={{ repeat: Infinity, duration: 2 }}
//             >
//               <FaBoxOpen className="text-7xl text-indigo-600 dark:text-yellow-400 mb-6" />
//             </motion.div>
//             <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-3">
//               <Typewriter
//                 options={{
//                   strings: ['পণ্য লোড হচ্ছে...', 'দয়া করে অপেক্ষা করুন...', 'সেরা পণ্য আনছি আপনার জন্য!'],
//                   autoStart: true,
//                   loop: true,
//                   delay: 60,
//                 }}
//               />
//             </h1>
//           </motion.div>
//         </div>
//       ) : !branNams ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
//           {products.map((product: any) => (
//             <motion.div
//               key={product.id}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={() => handleProductClick(product)}
//               className="relative group rounded-xl overflow-hidden shadow-md bg-white dark:bg-zinc-900 cursor-pointer transition-all"
//             >
//               <div className="aspect-square overflow-hidden">
//                 <img
//                   src={
//                     product.img
//                       ? `http://localhost:8000/uploads_product/${product.img}`
//                       : product.imglink
//                   }
//                   alt={product.name || 'Product Image'}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//               </div>
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3">
//                 <h3 className="text-sm md:text-base font-semibold">
//                   {brand ? product.brand : product.catagori}
//                 </h3>
//                 <Link href={`/product-view/${product.id}`} className="text-xs text-cyan-300 underline">
//                   বিস্তারিত দেখুন
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <Cardsprodut brand={brand} branName={branNams} old={actions_new_old} />
//       )}

//       <Footers />
//     </main>
//   );
// }

































                {/* <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {tickers.map((t) => (
                    <motion.div
                      key={t.symbol}
                      initial={{ opacity: 0, y: 8



                      }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "rounded-xl border p-2 text-sm flex items-center justify-between",
                        t.change >= 0 ? "bg-emerald-100 dark:bg-emerald-800/20" : "bg-rose-100 dark:bg-rose-800/20"
                      )}
                    >
                      <div>
                        <div className="font-medium">{t.symbol}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{t.price.toFixed(2)}</div>
                        <div className={cn(
                          "text-xs",
                          t.change >= 0 ? "text-emerald-600" : "text-rose-600"
                        )}>{t.change}%</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Apps */}
   














import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home as HomeIcon,
  LineChart as LineIcon,
  ShoppingBag,
  Sparkles,
  Sun,
  Moon,
  Search,
  ChevronRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Star,
  Flame,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// -------------------------------------------------
// Demo Data
// -------------------------------------------------
const marketData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  price: 100 + Math.sin(i / 2) * 8 + (i % 5),
}));

const tickers = [
  { symbol: "RCN", name: "R Coin", price: 12.45, change: +2.3 },
  { symbol: "BANGLA", name: "Bangla Index", price: 245.7, change: -0.8 },
  { symbol: "TECHA", name: "Tech A", price: 78.12, change: +1.1 },
  { symbol: "FOODA", name: "Food A", price: 33.6, change: +0.4 },
];

const categories = [
  { key: "all", label: "সব" },
  { key: "new", label: "নতুন" },
  { key: "old", label: "পুরাতন" },
  { key: "electronics", label: "ইলেকট্রনিক্স" },
  { key: "fashion", label: "ফ্যাশন" },
  { key: "home", label: "হোম" },
];

const allProducts = [
  {
    id: 1,
    title: "স্মার্ট ঘড়ি Pro X",
    tag: "new",
    category: "electronics",
    price: 4990,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1518444054149-4e1cd2f2b4d9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "স্টাইলিশ ব্যাকপ্যাক",
    tag: "new",
    category: "fashion",
    price: 1890,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "কফি মেকার Classic",
    tag: "old",
    category: "home",
    price: 3290,
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "ওয়্যারলেস ইয়ারবাড",
    tag: "new",
    category: "electronics",
    price: 2590,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1518441798251-b4c8347d9a26?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "ব্লেজার Premium",
    tag: "old",
    category: "fashion",
    price: 5490,
    rating: 4.3,
    img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
  },
];

// -------------------------------------------------
// Utilities
// -------------------------------------------------
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// -------------------------------------------------
// Main Component
// -------------------------------------------------
export default function HomeShowcasePage() {
  const [dark, setDark] = useState(false);
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [activeTab, setActiveTab] = useState("new");

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const byCat = activeCat === "all" ? true : p.category === activeCat || p.tag === activeCat;
      const byQ = q ? p.title.toLowerCase().includes(q.toLowerCase()) : true;
      return byCat && byQ;
    });
  }, [activeCat, q]);

  const tabFiltered = useMemo(() => {
    if (activeTab === "new") return filtered.filter((p) => p.tag === "new");
    if (activeTab === "popular") return filtered.sort((a, b) => b.rating - a.rating);
    if (activeTab === "old") return filtered.filter((p) => p.tag === "old");
    return filtered;
  }, [activeTab, filtered]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Topbar */}
      <div className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-purple-600" />
            </div>
            <span className="font-bold tracking-tight text-lg">Rashidul Hub</span>
            <span className="ml-2 hidden sm:inline-flex text-sm bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">Home</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
              <input
                className="pl-9 w-[300px] border rounded-md py-1 px-2 text-sm"
                placeholder="খুঁজুন— প্রোডাক্ট, অ্যাপ, মার্কেট…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <button onClick={() => setDark((d) => !d)}>
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-1 mb-3 text-sm font-medium bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5" /> নতুন আর সুন্দর ডিজাইন
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              এক পেজেই দেখুন <span className="text-purple-600">মার্কেট</span>, প্রোডাক্ট, ও আরও অ্যাপ
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-prose">
              লাইট/ডার্ক থিম, স্মুথ মশন, লাইভ স্টাইল চার্ট— সব একসাথে। নিচে স্ক্রল করে এক্সপ্লোর করুন।
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700">
                <HomeIcon className="h-4 w-4" /> শুরু করুন
              </button>
              <button className="flex items-center gap-1 text-purple-600 border border-purple-600 px-3 py-1 rounded-md hover:bg-purple-50">
                <ChevronRight className="h-4 w-4" /> সব ক্যাটাগরি
              </button>
            </div>
          </motion.div>

          {/* Live Market Snapshot */}
          <motion.div {...fadeUp(0.1)} className="relative">
            <div className="absolute -inset-4 bg-purple-100/10 blur-3xl rounded-full -z-10" />
            <div className="bg-white dark:bg-gray-800 border rounded-xl shadow-xl overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <LineIcon className="h-5 w-5" /> লাইভ মার্কেট স্ন্যাপশট
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">ডেমো ডাটা — আপনার API যুক্ত করুন</div>
              </div>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={marketData} margin={{ left: 8, right: 8 }}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={[80, 120]} />
                    <Tooltip contentStyle={{ borderRadius: 12 }} />
                    <Area type="monotone" dataKey="price" strokeWidth={2} stroke="currentColor" fill="url(#g1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {tickers.map((t) => (
                  <motion.div
                    key={t.symbol}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "rounded-xl border p-2 text-sm flex items-center justify-between",
                      t.change >= 0 ? "bg-emerald-500/5" : "bg-rose-500/5"
                    )}
                  >
                    <div>
                      <div className="font-medium">{t.symbol}</div>
                      <div className="text-xs text-gray-500">{t.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{t.price.toFixed(2)}</div>
                      <div className={cn("text-xs", t.change >= 0 ? "text-emerald-600" : "text-rose-600")}>{t.change}%</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Apps, Products, CTA Banner, Footer */}
      {/* এগুলোও একইভাবে TailwindCSS only বানানো হবে */}
    </div>
  );
}





















// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Home,
//   LineChart as LineIcon,
//   ShoppingBag,
//   Sparkles,
//   Sun,
//   Moon,
//   Search,
//   ChevronRight,
//   TrendingUp,
//   Clock,
//   ShieldCheck,
//   Star,
//   Flame,
//   Badge,
//   HomeIcon,
// } from "lucide-react";








// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";



// // -------------------------------------------------
// // Demo data (replace with your API data)
// // -------------------------------------------------
// const marketData = Array.from({ length: 24 }).map((_, i) => ({
//   time: `${i}:00`,
//   price: 100 + Math.sin(i / 2) * 8 + (i % 5),
// }));

// const tickers = [
//   { symbol: "RCN", name: "R Coin", price: 12.45, change: +2.3 },
//   { symbol: "BANGLA", name: "Bangla Index", price: 245.7, change: -0.8 },
//   { symbol: "TECHA", name: "Tech A", price: 78.12, change: +1.1 },
//   { symbol: "FOODA", name: "Food A", price: 33.6, change: +0.4 },
// ];

// const categories = [
//   { key: "all", label: "সব" },
//   { key: "new", label: "নতুন" },
//   { key: "old", label: "পুরাতন" },
//   { key: "electronics", label: "ইলেকট্রনিক্স" },
//   { key: "fashion", label: "ফ্যাশন" },
//   { key: "home", label: "হোম" },
// ];

// const allProducts = [
//   {
//     id: 1,
//     title: "স্মার্ট ঘড়ি Pro X",
//     tag: "new",
//     category: "electronics",
//     price: 4990,
//     rating: 4.8,
//     img: "https://images.unsplash.com/photo-1518444054149-4e1cd2f2b4d9?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     title: "স্টাইলিশ ব্যাকপ্যাক",
//     tag: "new",
//     category: "fashion",
//     price: 1890,
//     rating: 4.6,
//     img: "https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     title: "কফি মেকার Classic",
//     tag: "old",
//     category: "home",
//     price: 3290,
//     rating: 4.4,
//     img: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 4,
//     title: "ওয়্যারলেস ইয়ারবাড",
//     tag: "new",
//     category: "electronics",
//     price: 2590,
//     rating: 4.7,
//     img: "https://images.unsplash.com/photo-1518441798251-b4c8347d9a26?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 5,
//     title: "ব্লেজার Premium",
//     tag: "old",
//     category: "fashion",
//     price: 5490,
//     rating: 4.3,
//     img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
//   },
// ];

// // -------------------------------------------------
// // Utilities
// // -------------------------------------------------
// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 24 },
//   animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
// });

// function cn(...classes: Array<string | false | null | undefined>) {
//   return classes.filter(Boolean).join(" ");
// }

// // -------------------------------------------------
// // Main Component
// // -------------------------------------------------
// export default function HomeShowcasePage() {
//   const [dark, setDark] = useState(false);
//   const [q, setQ] = useState("");
//   const [activeCat, setActiveCat] = useState("all");

//   useEffect(() => {
//     // Toggle dark class on <html>
//     const root = document.documentElement;
//     if (dark) root.classList.add("dark");
//     else root.classList.remove("dark");
//   }, [dark]);

//   const filtered = useMemo(() => {
//     return allProducts.filter((p) => {
//       const byCat = activeCat === "all" ? true : p.category === activeCat || p.tag === activeCat;
//       const byQ = q ? p.title.toLowerCase().includes(q.toLowerCase()) : true;
//       return byCat && byQ;
//     });
//   }, [activeCat, q]);

//   return (
    
    
//     <div className="
    
    
//     min-h-screen bg-gradient-to-b from-background to-muted/30 dark:from-gray-900 dark:to-black">
//       {/* Topbar */}
//       <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <motion.div
//               className="h-9 w-9 rounded-2xl bg-primary/10 flex items-center justify-center"
//               initial={{ rotate: -10, scale: 0.9 }}
//               animate={{ rotate: 0, scale: 1 }}
//               transition={{ type: "spring", stiffness: 120 }}
//             >
//               <Sparkles className="h-5 w-5 text-primary" />
//             </motion.div>
//             <span className="font-bold tracking-tight text-lg">Rashidul Hub</span>
//             <Badge  className="ml-2 hidden sm:inline-flex">Home</Badge>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="relative hidden md:block">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />

              
//               <input
//                 className="pl-9 w-[300px]"
//                 placeholder="খুঁজুন— প্রোডাক্ট, অ্যাপ, মার্কেট…"
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//               />
//             </div>
//             <button  onClick={() => setDark((d) => !d)}>
//               {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Hero */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
//         <div className="grid md:grid-cols-2 gap-6 items-center">
//           <motion.div {...fadeUp(0)}>
//             <Badge className="mb-3">
//               <Sparkles className="h-3.5 w-3.5 mr-1" /> নতুন আর সুন্দর ডিজাইন
//             </Badge>
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
//               এক পেজেই দেখুন <span className="text-primary">মার্কেট</span>, প্রোডাক্ট, ও আরও অ্যাপ
//             </h1>
//             <p className="mt-3 text-muted-foreground max-w-prose">
//               লাইট/ডার্ক থিম, স্মুথ মশন, লাইভ স্টাইল চার্ট— সব একসাথে। নিচে স্ক্রল করে এক্সপ্লোর করুন।
//             </p>
//             <div className="mt-6 flex flex-wrap gap-3">
//               <button>
//                 <HomeIcon className="h-4 w-4 mr-2" /> শুরু করুন
//               </button>
       
//                 <ChevronRight className="h-4 w-4 mr-2" /> সব ক্যাটাগরি
             
//             </div>
//           </motion.div>

//           <motion.div {...fadeUp(0.1)} className="relative">
//             <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full -z-10" />
//             <Card className="overflow-hidden shadow-xl">
//               <CardHeader className="pb-2">
//                 <CardTitle className="flex items-center gap-2">
//                   <LineIcon className="h-5 w-5" /> লাইভ মার্কেট স্ন্যাপশট
//                 </CardTitle>
//                 <CardDescription>ডেমো ডাটা — আপনার API যুক্ত করুন</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-44">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={marketData} margin={{ left: 8, right: 8 }}>
//                       <defs>
//                         <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
//                           <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
//                         </linearGradient>
//                       </defs>
//                       <XAxis dataKey="time" hide />
//                       <YAxis hide domain={[80, 120]} />
//                       <Tooltip contentStyle={{ borderRadius: 12 }} />
//                       <Area type="monotone" dataKey="price" strokeWidth={2} stroke="currentColor" fill="url(#g1)" />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//                 <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
//                   {tickers.map((t) => (
//                     <motion.div
//                       key={t.symbol}
//                       initial={{ opacity: 0, y: 8 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className={cn(
//                         "rounded-xl border p-2 text-sm flex items-center justify-between",
//                         t.change >= 0 ? "bg-emerald-500/5" : "bg-rose-500/5"
//                       )}
//                     >
//                       <div>
//                         <div className="font-medium">{t.symbol}</div>
//                         <div className="text-muted-foreground text-xs">{t.name}</div>
//                       </div>
//                       <div className="text-right">
//                         <div className="font-semibold">{t.price.toFixed(2)}</div>
//                         <div className={cn("text-xs", t.change >= 0 ? "text-emerald-600" : "text-rose-600")}>{t.change}%</div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </section>

//       {/* Quick Apps */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
//             <Sparkles className="h-5 w-5" /> এক্সপ্লোর অ্যাপস
//           </h2>
//           <Button variant="ghost" size="sm" className="gap-1">
//             আরও দেখুন <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {[{
//             title: "শেয়ার মার্কেট",
//             icon: <TrendingUp className="h-5 w-5" />,
//             desc: "লাইভ চার্ট, টিকার, কোম্পানি তালিকা",
//           }, {
//             title: "নতুন পণ্য",
//             icon: <Flame className="h-5 w-5" />,
//             desc: "আজকের ট্রেন্ডিং আইটেম",
//           }, {
//             title: "পুরাতন পণ্য",
//             icon: <Clock className="h-5 w-5" />,
//             desc: "রিসেল/সেকেন্ড-হ্যান্ড কালেকশন",
//           }, {
//             title: "নিরাপদ ক্রয়-বিক্রয়",
//             icon: <ShieldCheck className="h-5 w-5" />,
//             desc: "এসক্রো/ভেরিফাইড সেলার",
//           }].map((a, i) => (
//             <motion.div key={a.title} whileHover={{ y: -4 }}>
//               <Card className="h-full border bg-gradient-to-br from-background to-muted/40">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">{a.icon} {a.title}</CardTitle>
//                   <CardDescription>{a.desc}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Button className="w-full">ওপেন করুন</Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Products */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
//             <ShoppingBag className="h-5 w-5" /> পণ্যসমূহ
//           </h2>
//           <div className="md:hidden flex-1" />
//           <div className="hidden md:flex items-center gap-2">
//             {categories.map((c) => (
//               <Badge
//                 key={c.key}
//                 variant={activeCat === c.key ? "default" : "secondary"}
//                 className="cursor-pointer"
//                 onClick={() => setActiveCat(c.key)}
//               >
//                 {c.label}
//               </Badge>
//             ))}
//           </div>
//         </div>

//         <div className="md:hidden mb-4 flex gap-2 overflow-x-auto">
//           {categories.map((c) => (
//             <Button key={c.key} size="sm" variant={activeCat === c.key ? "default" : "outline"} onClick={() => setActiveCat(c.key)}>
//               {c.label}
//             </Button>
//           ))}
//         </div>

//         <Tabs defaultValue="new">
//           <TabsList className="grid grid-cols-3 w-full sm:w-auto">
//             <TabsTrigger value="new">নতুন</TabsTrigger>
//             <TabsTrigger value="popular">পপুলার</TabsTrigger>
//             <TabsTrigger value="old">পুরাতন</TabsTrigger>
//           </TabsList>

//           <TabsContent value="new" className="mt-6">
//             <ProductGrid items={filtered.filter((p) => p.tag === "new" || activeCat !== "all")} />
//           </TabsContent>
//           <TabsContent value="popular" className="mt-6">
//             <ProductGrid items={[...filtered].sort((a, b) => b.rating - a.rating)} />
//           </TabsContent>
//           <TabsContent value="old" className="mt-6">
//             <ProductGrid items={filtered.filter((p) => p.tag === "old" || activeCat !== "all")} />
//           </TabsContent>
//         </Tabs>
//       </section>

//       {/* CTA banner */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-14">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.98 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true, amount: 0.4 }}
//           className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-primary/10 via-transparent to-primary/10 p-6"
//         >
//           <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
//           <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div>
//               <h3 className="text-2xl font-bold">আপনার নিজের API যুক্ত করুন</h3>
//               <p className="text-muted-foreground">Laravel/Next.js দিয়ে ডাইনামিক ডাটা লোড করুন— একদম সহজ স্ট্রাকচার।</p>
//             </div>
//             <Button className="gap-2">
//               <Sparkles className="h-4 w-4" /> ডকুমেন্টেশন
//             </Button>
//           </div>
//         </motion.div>
//       </section>

//       {/* Footer */}
//       <footer className="mt-14 border-t">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
//           <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Rashidul Hub. All rights reserved.</div>
//           <div className="flex items-center gap-2 text-sm">
//             <Star className="h-4 w-4" /> সুন্দর ডিজাইন • স্মুথ মশন • রেসপন্সিভ
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// // -------------------------------------------------
// // Product Grid Component
// // -------------------------------------------------
// function ProductGrid({ items }: { items: typeof allProducts }) {
//   if (!items.length) {
//     return (
//       <div className="text-center text-muted-foreground py-10">কোন আইটেম পাওয়া যায়নি</div>
//     );
//   }
//   return (
//     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//       <AnimatePresence>
//         {items.map((p) => (
//           <motion.div
//             key={p.id}
//             layout
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.35 }}
//           >
//             <Card className="overflow-hidden group h-full">
//               <div className="aspect-[16/10] overflow-hidden">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={p.img}
//                   alt={p.title}
//                   className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               </div>
//               <CardHeader className="space-y-1">
//                 <CardTitle className="text-base flex items-center justify-between gap-2">
//                   <span className="line-clamp-1">{p.title}</span>
//                   <Badge variant={p.tag === "new" ? "default" : "secondary"}>
//                     {p.tag === "new" ? "নতুন" : "পুরাতন"}
//                   </Badge>
//                 </CardTitle>
//                 <CardDescription className="flex items-center justify-between">
//                   <span>৳ {p.price}</span>
//                   <span className="flex items-center gap-1">
//                     <Star className="h-4 w-4 fill-current" /> {p.rating}
//                   </span>
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="pb-4">
//                 <div className="flex gap-2">
//                   <Button className="flex-1">কার্টে যোগ করুন</Button>
//                   <Button variant="outline" size="icon">
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// }

