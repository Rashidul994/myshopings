                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          







// "use client";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Menu, X, Coins } from "lucide-react";
// import Typewriter from "typewriter-effect";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   const categories = ["Electronics", "Fashion", "Sports", "Books", "Toys", "Food"];

//   return (
//     <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white">
//         {/* Left - Logo */}
//         <div className="flex items-center gap-2 font-bold text-lg">
//           <Typewriter
//             options={{
//               strings: ["MyShop", "Best Deals", "Top Products"],
//               autoStart: true,
//               loop: true,
//             }}
//           />
//         </div>

//         {/* Middle - Categories */}
//         <div className="hidden md:flex gap-6">
//           {categories.map((cat, i) => (
//             <div
//               key={i}
//               className="relative group cursor-pointer"
//             >
//               {cat}
//               <div className="absolute top-full left-0 hidden group-hover:block bg-white text-black rounded shadow-lg mt-2 w-40">
//                 <ul>
//                   <li className="px-4 py-2 hover:bg-gray-100">Sub 1</li>
//                   <li className="px-4 py-2 hover:bg-gray-100">Sub 2</li>
//                   <li className="px-4 py-2 hover:bg-gray-100">Sub 3</li>
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Right - Coins + Profile */}
//         <div className="flex items-center gap-6">
//           {/* Coin Counter */}
//           <div className="flex items-center gap-1 bg-yellow-400 px-3 py-1 rounded-full text-black font-semibold">
//             <Coins size={18} /> <span>1250</span>
//           </div>

//           {/* Profile */}
//           <div
//             className="relative"
//             onMouseEnter={() => setProfileOpen(true)}
//             onMouseLeave={() => setProfileOpen(false)}
//           >
//             <img
//               src="https://i.pravatar.cc/40"
//               alt="profile"
//               className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
//             />
//             {profileOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48"
//               >
//                 <ul>
//                   <li className="px-4 py-2 hover:bg-gray-100">Profile</li>
//                   <li className="px-4 py-2 hover:bg-gray-100">My Orders</li>
//                   <li className="px-4 py-2 hover:bg-gray-100">Logout</li>
//                 </ul>
//               </motion.div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Sidebar */}
//       {menuOpen && (
//         <motion.div
//           initial={{ x: "-100%" }}
//           animate={{ x: 0 }}
//           exit={{ x: "-100%" }}
//           className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-600 to-purple-600 text-white p-6 shadow-lg z-50"
//         >
//           <button
//             className="mb-6"
//             onClick={() => setMenuOpen(false)}
//           >
//             <X size={28} />
//           </button>
//           <ul className="space-y-4">
//             {categories.map((cat, i) => (
//               <li key={i} className="hover:text-yellow-300">{cat}</li>
//             ))}
//           </ul>
//         </motion.div>
//       )}
//     </div>
//   );
// }





// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';

// import { Menu, X, Bell, Moon, Sun, ChevronDown } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Typewriter from 'typewriter-effect';
// import CountUp from 'react-countup';
// import {
//   FaSignInAlt,
//   FaSignOutAlt,
//   FaUserCircle,
//   FaCopy,
//   FaFacebookF,
//   FaWhatsapp,
// } from 'react-icons/fa';
// import toast from 'react-hot-toast';

// interface Suggestion {
//   id: number;
//   name: string;
// }

// const dummySuggestions: Suggestion[] = [
//   { id: 1, name: 'Laptop' },
//   { id: 2, name: 'Mobile Phone' },
//   { id: 3, name: 'Shoes' },
//   { id: 4, name: 'Headphones' },
//   { id: 5, name: 'Watches' },
//   { id: 6, name: 'Fashion' },
//   { id: 7, name: 'Toys' },
//   { id: 8, name: 'Home Decor' },
// ];

// export default function AllInOneNavbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [categoryOpen, setCategoryOpen] = useState(false);
//   const [notifOpen, setNotifOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [dark, setDark] = useState(false);

//   const [query, setQuery] = useState('');
//   const [filtered, setFiltered] = useState<Suggestion[]>([]);
//   const [hovered, setHovered] = useState(false);
//   const [showBalancePopup, setShowBalancePopup] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [searchExpanded, setSearchExpanded] = useState(false);

//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const searchRef = useRef<HTMLDivElement>(null);

// const [coins, setCoinss] = useState(0)
//   const [uid, setUseUnid]=useState([]);


//   const [username, setUsername] = useState('[রাশিদুল]');
//   const [pimg, setPimg] = useState('');
//   const [notifications, setNotifications] = useState([
//     { id: 1, message: 'আপনার অর্ডার পাঠানো হয়েছে ✅' },
//     { id: 2, message: 'নতুন ডিসকাউন্ট এসেছে 🎉' },
//     { id: 3, message: 'আপনার প্রোফাইল সম্পন্ন করুন ✍️' },
//   ]);

//   const categories = ['Electronics', 'Fashion', 'Toys', 'Home'];





 

//   // ধরো 500 coins = 5 টাকা, তাহলে 1 coin = 0.01 টাকা
//   const convertToTk = (coins: number) => (coins * 5) / 1500;

//   // Bangla digit conversion
//   // const toBangla = (num: number) => {
//   //   const bnDigits = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
//   //   return num.toFixed(1).replace(/\d/g, (d) => bnDigits[parseInt(d)]);
//   // };

//   // // টাকা ফরম্যাটিং (কমা + 1 বা 2 দশমিক)
//   // const formatTk = (amount: number) => {
//   //   return new Intl.NumberFormat('bn-BD', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(amount);
//   // };

  

//   useEffect(() => {

// setInterval(() => {
//   const Disdd=localStorage.getItem('coin');
// setCoinss(Disdd);
// }, 3000);




//     const userData = JSON.parse(localStorage.getItem('userData') || '[]');
//     if (userData[0]) {
//       setUsername(userData[0].name || 'Guest');
//       setPimg(userData[0].img || '');
//     }

//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', dark);
//   }, [dark]);

//   useEffect(() => {
//     if (query.trim() === '') {
//       setFiltered([]);
//       return;
//     }
//     const filteredList = dummySuggestions.filter((item) =>
//       item.name.toLowerCase().includes(query.toLowerCase())
//     );
//     setFiltered(filteredList);
//   }, [query]);

//   useEffect(() => {

//     setNotifications();


//    const userData = JSON.parse(localStorage.getItem('userData') || '[]');
//     if (userData[0]) {
//       setUseUnid(userData[0].unid || 'Guest');
      
//     }



//     function handleClickOutside(event: MouseEvent) {
//       if (
//         wrapperRef.current &&
//         !wrapperRef.current.contains(event.target as Node)
//       ) {
//         setHovered(false);
//         setProfileOpen(false);
//         setNotifOpen(false);
//         setCategoryOpen(false);
//         setShowBalancePopup(false);
//       }
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target as Node)
//       ) {
//         setSearchExpanded(false);
//         setHovered(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

  
//   const handleSearch = (term?: string) => {
//     const finalTerm = term ?? query;
//     if (!finalTerm.trim()) return;
//     window.location.href = `/search?q=${encodeURIComponent(finalTerm)}`;
//   };

//   const handleCopy = async () => {


//    const url = window.location.href      
//      navigator.clipboard.writeText(url+'Login/'+uid);
//     setCopied(true);
//     toast.success('প্রোফাইল লিঙ্ক কপি হয়েছে!');
//     setTimeout(() => setCopied(false), 1500);
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <motion.nav
//         initial={{ y: -60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className={`sticky top-0 z-50 backdrop-blur-xl bg-indigo-900/70 border-b border-indigo-700 transition-all duration-300 ${
//           scrolled ? 'backdrop-brightness-90 shadow-lg' : ''
//         }`}
//         ref={wrapperRef}
//       >
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between px-5 py-3 text-white relative max-w-[1200px] mx-auto">
//           {/* Logo with fixed min width so no jitter */}
//           <Link
//             href="/"
//             className="text-xl font-extrabold text-cyan-400 z-50 select-none inline-block min-w-[220px]"
//           >
//             <Typewriter
//               options={{
//                 strings: ['MyShopings.com', 'Deals Await! 🎁', 'Enjoy Shopping 🛍️'],
//                 autoStart: true,
//                 loop: true,
//                 delay: 60,
//                 deleteSpeed: 40,
//               }}
//             />
//           </Link>

//            {/* ✅ Updated Search Bar */}
//           <motion.div
//             ref={searchRef}
//             className="flex items-center bg-white dark:bg-zinc-800 rounded-full shadow-lg px-2 py-2 relative transition-all duration-300 mt-3 md:mt-0"
//             animate={{ width: searchExpanded ? 320 : 50 }}
//           >
//             <AnimatePresence>
//               {searchExpanded && (
//                 <motion.input
//                   key="search-input"
//                   initial={{ opacity: 0, width: 0 }}
//                   animate={{ opacity: 1, width: 200 }}
//                   exit={{ opacity: 0, width: 0 }}
//                   transition={{ duration: 0.3 }}
//                   type="text"
//                   autoFocus
//                   className="bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 ml-2"
//                   placeholder="পণ্য খুঁজুন..."
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   onFocus={() => setHovered(true)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {
//                       handleSearch()
//                       setHovered(false)
//                       setSearchExpanded(false)
//                     }
//                   }}
//                 />
//               )}
//             </AnimatePresence>

//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               whileHover={{ scale: 1.1 }}
//               onClick={() => {
//                 if (searchExpanded && query) {
//                   handleSearch()
//                   setSearchExpanded(false)
//                 } else {
//                   setSearchExpanded(true)
//                 }
//               }}
//               className="text-white bg-purple-600 hover:bg-purple-700 rounded-full p-2"
//               aria-label="Search Button"
//             >
//               🔍
//             </motion.button>
//             {/* Suggestions dropdown */}
//             <AnimatePresence>
//               {hovered && filtered.length > 0 && (
//                 <motion.ul
//                   initial={{ opacity: 0, y: -15 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -15 }}
//                   className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-800 rounded-b-lg shadow-xl max-h-60 overflow-auto mt-1 z-50"
//                   onMouseEnter={() => setHovered(true)}
//                   onMouseLeave={() => setHovered(false)}
//                 >
//                   {filtered.map((item) => (
//                     <li
//                       key={item.id}
//                       onClick={() => {
//                         setQuery(item.name);
//                         handleSearch(item.name);
//                         setHovered(false);
//                       }}
//                       className="px-5 py-3 cursor-pointer hover:bg-purple-600 hover:text-white transition"
//                     >
//                       {item.name}
//                     </li>
//                   ))}
//                 </motion.ul>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8 z-50 font-semibold text-white select-none">
//             <Link href="/" className="hover:text-cyan-300 transition duration-300">
//         Home
//             </Link>
//             <Link
//               href="/games"
//               className="hover:text-cyan-300 transition duration-300"
//             >
//               games
//             </Link>
//             <Link href="/my-face" className="hover:text-cyan-300 transition duration-300">
//               my-face                                                                   
//             </Link>

//             <div className="relative">
//               <button
//                 onClick={() => setCategoryOpen(!categoryOpen)}
//                 className="flex items-center hover:text-cyan-300 transition duration-300"
//                 aria-expanded={categoryOpen}
//               >
//                 Categories <ChevronDown className="ml-1 w-4 h-4" />
//               </button>
//               <AnimatePresence>
//                 {categoryOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -15 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -15 }}
//                     className="absolute top-9 left-0 bg-white text-black rounded-md shadow-lg p-4 z-50 min-w-[170px]"
//                   >
//                     {categories.map((cat) => (
//                       <Link
//                         key={cat}
//                         href={`/category/${cat.toLowerCase()}`}
//                         className="block px-4 py-2 hover:bg-blue-100 rounded-md transition"
//                         onClick={() => setCategoryOpen(false)}
//                       >
//                         {cat}
//                       </Link>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Right Panel */}
//           <div className="flex items-center gap-3 md:gap-6 flex-wrap md:flex-nowrap justify-between md:justify-end relative z-50">
//             {/* Notification Bell */}
//             <div className="relative group">
//               <button
//                 aria-label="Notifications"
//                 onClick={() => setNotifOpen(!notifOpen)}
//                 className="relative"
//               >
//                 <Bell className="w-6 h-6 cursor-pointer hover:text-cyan-300 transition" />
//                 {notifications.length > 0 && (
//                   <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1 select-none">
//                     {notifications.length}
//                   </span>
//                 )}
//               </button>
//               <AnimatePresence>
//                 {notifOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -15 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -15 }}
//                     className="absolute right-0 top-10 w-64 bg-white text-black shadow-lg rounded-lg p-4 z-50 select-none"
//                   >
//                     <p className="font-bold mb-3 border-b border-gray-300 pb-1">
//                       Notifications
//                     </p>
//                     {notifications.map((n) => (
//                       <div
//                         key={n.id}
//                         className="text-sm border-b border-gray-200 py-2 hover:bg-gray-100 rounded transition"
//                       >
//                         {n.message}
//                       </div>
//                     ))}
//                     {notifications.length === 0 && (
//                       <p className="text-center text-gray-500">No notifications</p>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Balance with popup */}
//             <div
//               className="relative flex items-center space-x-2 bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold shadow-lg cursor-pointer select-none"
//               onMouseEnter={() => setShowBalancePopup(true)}
//               onMouseLeave={() => setShowBalancePopup(false)}
//             >
//               <span className="text-lg">🪙</span>
//               <CountUp end={coins} duration={2} separator="," />
//               <AnimatePresence>
//                 {showBalancePopup && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10, scale: 0.9 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 10, scale: 0.9 }}
//                     transition={{ duration: 0.25 }}
//                     className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-yellow-300 text-black text-center rounded-md shadow-lg py-1 font-medium pointer-events-none select-none"
//                   >
//                     আপনার ব্যালেন্স:    <CountUp end={convertToTk(coins).toFixed(2)}  duration={2} separator="," />   টাকা
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Dark Mode Toggle */}
//             <button
//               aria-label="Toggle Dark Mode"
//               onClick={() => setDark(!dark)}
//               className="hover:text-yellow-400 transition"
//             >
//               {dark ? (
//                 <Sun className="text-yellow-400 w-6 h-6" />
//               ) : (
//                 <Moon className="w-6 h-6" />
//               )}
//             </button>

//             {/* Profile */}
//             <button
//               aria-label="Profile Menu"
//               onClick={() => setProfileOpen(!profileOpen)}
//               className="focus:outline-none"
//             >
//               <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
//                 {/* <img
//                   src={
//                     pimg
//                       ? `http://localhost:8000/profile_users/${pimg}`
//                       : '/default-user.png'
//                   }
//                   alt="Profile"
//                   fill
//                   className="object-cover"
//                 /> */}


//                  <img
          
//               src={
//                     pimg
//                       ? `http://localhost:8000/profile_users/${pimg}`
//                       : "https://i.pravatar.cc/40"
//                   }
//               alt="profile"
//               className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
//             />
//               </div>
//             </button>

//             {/* Mobile Menu Toggle */}
//             <button
//               aria-label="Toggle Menu"
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="md:hidden focus:outline-none"
//             >
//               {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
//             </button>
//           </div>
//         </div>

//         {/* Profile Dropdown */}
//         <AnimatePresence>
//           {profileOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.25 }}
//               className="absolute right-5 top-16 w-56 bg-white dark:bg-gray-900 text-black dark:text-white p-4 rounded-xl shadow-lg border dark:border-gray-700 z-50 select-none"
//             >
//               <div className="text-sm font-medium mb-3 flex items-center gap-2">
//                 <FaUserCircle className="text-xl text-blue-500" />
//                 👋 স্বাগতম, {username}
//               </div>

//               <Link
//                 href="/profile"
//                 className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                 onClick={() => setProfileOpen(false)}
//               >
//                 🧾 My Profile
//               </Link>

//               <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center space-y-2 shadow mt-3">
//                 <p className="break-all text-xs font-bold text-blue-600 dark:text-blue-400">
//                   {'45'}
//                 </p>

//                 <button
//                   onClick={handleCopy}
//                   className="mt-1 text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md inline-flex items-center gap-1 transition"
//                 >
//                   <FaCopy size={12} /> {copied ? 'কপি হয়েছে' : 'লিংক কপি'}
//                 </button>

//                 <div className="flex justify-center gap-4 pt-2">
//                   <a
//                     href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//                       '5423'
//                     )}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:scale-110 transition"
//                     title="Facebook এ শেয়ার"
//                   >
//                     <FaFacebookF size={16} />
//                   </a>
//                   <a
//                     href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
//                       'আমার প্রোফাইল দেখুন: ' + '54435'
//                     )}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-green-600 hover:scale-110 transition"
//                     title="WhatsApp এ শেয়ার"
//                   >
//                     <FaWhatsapp size={16} />
//                   </a>
//                 </div>
//               </div>

//               {pimg ? (
//                 <button
//                   onClick={() => {
//                     localStorage.removeItem('userData');
//                     window.location.href = '/';
//                   }}
//                   className="w-full text-left px-3 py-2 mt-1 text-sm text-red-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2"
//                 >
//                   <FaSignOutAlt /> Logout
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => {
//                     window.location.href = '/Login';
//                   }}
//                   className="w-full text-left px-3 py-2 mt-1 text-sm text-green-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2"
//                 >
//                   <FaSignInAlt /> Login
//                 </button>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* Mobile Menu Fullscreen Overlay */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ x: '100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '100%' }}
//             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//             className="fixed top-0 right-0 w-full h-full bg-gray-900 bg-opacity-90 backdrop-blur-lg z-50 flex flex-col px-8 py-10 md:hidden select-none"
//           >
//             <button
//               aria-label="Close Menu"
//               onClick={() => setMenuOpen(false)}
//               className="self-end mb-6 text-white"
//             >
//               <X className="w-8 h-8" />
//             </button>

//             <nav className="flex flex-col space-y-6 text-lg font-semibold text-white">
//               <Link
//                 href="/"
//                 className="hover:text-cyan-400 transition"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/products"
//                 className="hover:text-cyan-400 transition"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Products
//               </Link>
//               <Link
//                 href="/cart"
//                 className="hover:text-cyan-400 transition"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Cart
//               </Link>

//               <button
//                 onClick={() => setCategoryOpen(!categoryOpen)}
//                 className="flex items-center justify-between hover:text-cyan-400 transition"
//               >
//                 Categories <ChevronDown className="ml-1 w-5 h-5" />
//               </button>
//               {categoryOpen && (
//                 <div className="flex flex-col ml-4 space-y-3 mt-2">
//                   {categories.map((cat) => (
//                     <Link
//                       key={cat}
//                       href={`/category/${cat.toLowerCase()}`}
//                       className="hover:text-cyan-300 transition"
//                       onClick={() => {
//                         setMenuOpen(false);
//                         setCategoryOpen(false);
//                       }}
//                     >
//                       {cat}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }



// app/page.tsx
// "use client";
// import { motion } from "framer-motion";
// import { ShoppingBag, Rocket, Gamepad2, Cpu } from "lucide-react";

// const apps = [
//   {
//     id: 1,
//     name: "Shopping App",
//     icon: <ShoppingBag size={40} />,
//     desc: "Buy & Sell Products with neon style",
//   },
//   {
//     id: 2,
//     name: "Rocket Hub",
//     icon: <Rocket size={40} />,
//     desc: "Futuristic launches & updates",
//   },
//   {
//     id: 3,
//     name: "Gaming Arena",
//     icon: <Gamepad2 size={40} />,
//     desc: "Play next-gen 3D games",
//   },
//   {
//     id: 4,
//     name: "AI Control",
//     icon: <Cpu size={40} />,
//     desc: "Robot powered automation",
//   },
// ];

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-900 via-black to-blue-900 text-white font-[Orbitron]">
//       {/* --- Neon Topbar --- */}
//       <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/5 border-b border-cyan-500/50 shadow-[0_0_20px_rgba(0,255,255,0.7)]">
//         <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_10px_cyan]"
//           >
//             ⚡ Neon Apps Hub
//           </motion.h1>
//           <button className="px-4 py-2 rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-500/20 transition shadow-[0_0_10px_cyan]">
//             🚀 Explore
//           </button>
//         </div>
//       </div>

//       {/* --- Product Grid --- */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//         {apps.map((app, i) => (
//           <motion.div
//             key={app.id}
//             whileHover={{ scale: 1.05, rotateY: 10 }}
//             transition={{ type: "spring", stiffness: 200 }}
//             className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-cyan-400/30 shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] cursor-pointer"
//           >
//             <div className="flex items-center gap-4 mb-4 text-cyan-300">
//               {app.icon}
//               <h2 className="text-xl font-bold">{app.name}</h2>
//             </div>
//             <p className="text-gray-300">{app.desc}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* --- Footer --- */}
//       <div className="text-center py-6 text-sm text-gray-400">
//         © 2025 Neon Hub — Built with ⚡ Next.js + Tailwind + Framer Motion
//       </div>
//     </div>
//   );
// }


















// app/page.tsx
"use client";
import { motion } from "framer-motion";
import { ShoppingBag, Rocket, Gamepad2, Cpu } from "lucide-react";

const apps = [
  { id: 1, name: "Shopping App", icon: <ShoppingBag />, desc: "Buy & Sell Products" },
  { id: 2, name: "Rocket Hub", icon: <Rocket />, desc: "Space & Tech News" },
  { id: 3, name: "Gaming Arena", icon: <Gamepad2 />, desc: "3D Futuristic Games" },
  { id: 4, name: "AI Control", icon: <Cpu />, desc: "Automation & AI" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-blue-900 p-4">
      {/* Neon Phone Frame Background */}
      <div
        className="relative w-[320px] sm:w-[400px] h-[600px] sm:h-[700px] bg-center bg-contain bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/162477422-glowing-neon-line-phone-repair-service-icon-isolated-on-brick-wall-background-adjusting-service.jpg')",
        }}
      >
        {/* Inside Screen */}
        <div className="absolute inset-10 bg-black/70 rounded-xl overflow-y-auto backdrop-blur-md p-4 border border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.6)]">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl font-bold text-cyan-300 text-center mb-4"
          >
            ⚡ Neon Apps Hub
          </motion.h1>

          {/* Apps Grid */}
          <div className="grid grid-cols-1 gap-4">
            {apps.map((app) => (
              <motion.div
                key={app.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-xl bg-white/10 border border-cyan-400/30 text-white shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="text-cyan-300">{app.icon}</div>
                  <div>
                    <h2 className="text-lg font-semibold">{app.name}</h2>
                    <p className="text-sm text-gray-400">{app.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}








// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Menu, X, Bell, Moon, Sun, ChevronDown } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Typewriter from 'typewriter-effect';
// import CountUp from 'react-countup';

// export default function AllInOneNavbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [categoryOpen, setCategoryOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [dark, setDark] = useState(false);
//   const [balance, setBalance] = useState(7450);
//   const [notifications, setNotifications] = useState([
//     { id: 1, message: 'আপনার অর্ডার পাঠানো হয়েছে ✅' },
//     { id: 2, message: 'নতুন ডিসকাউন্ট এসেছে 🎉' },
//     { id: 3, message: 'আপনার প্রোফাইল সম্পন্ন করুন ✍️' },
//   ]);

//   const [username, setUsername] = useState('রাশিদুল');
//   const [pimg, setPimg] = useState('');
//   const [notifOpen, setNotifOpen] = useState(false);

//   const categories = ['Electronics', 'Fashion', 'Toys', 'Home'];

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('userData') || '[]');
//     if (userData[0]) {
//       setUsername(userData[0].name || 'Guest');
//       setPimg(userData[0].img || '');
//     }

//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', dark);
//   }, [dark]);

//   return (
//     <motion.nav
//       initial={{ y: -60, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className={`sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 ${
//         scrolled
//           ? 'bg-indigo-950/90 shadow-md'
//           : 'bg-gradient-to-r from-indigo-900 via-black to-indigo-900'
//       }`}
//     >
//       <div className="flex items-center justify-between px-5 py-3 text-white">
//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold text-cyan-300">
//           <Typewriter
//             options={{
//               strings: ['MyShopings.com', 'Deals Await! 🎁', 'Enjoy Shopping 🛍️'],
//               autoStart: true,
//               loop: true,
//               delay: 60,
//               deleteSpeed: 40,
//             }}
//           />
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           <Link href="/">Home</Link>
//           <Link href="/products">Products</Link>
//           <Link href="/cart">Cart</Link>

//           <div className="relative">
//             <button
//               onClick={() => setCategoryOpen(!categoryOpen)}
//               className="flex items-center"
//             >
//               Categories <ChevronDown className="ml-1 w-4 h-4" />
//             </button>
//             <AnimatePresence>
//               {categoryOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="absolute top-8 left-0 bg-white text-black rounded-md shadow-md p-3 z-50"
//                 >
//                   {categories.map((cat) => (
//                     <Link
//                       key={cat}
//                       href={`/category/${cat.toLowerCase()}`}
//                       className="block px-4 py-2 hover:bg-blue-100 rounded"
//                     >
//                       {cat}
//                     </Link>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="flex items-center space-x-4 relative">
//           {/* Notification Bell */}
//           <div className="relative">
//             <button onClick={() => setNotifOpen(!notifOpen)}>
//               <Bell className="w-6 h-6 cursor-pointer hover:text-cyan-300" />
//               {notifications.length > 0 && (
//                 <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1">
//                   {notifications.length}
//                 </span>
//               )}
//             </button>
//             <AnimatePresence>
//               {notifOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="absolute right-0 top-10 w-64 bg-white text-black shadow-lg rounded-lg p-3 z-50"
//                 >
//                   <p className="font-bold mb-2">Notifications</p>
//                   {notifications.map((n) => (
//                     <div
//                       key={n.id}
//                       className="text-sm border-b border-gray-200 py-1 hover:bg-gray-50"
//                     >
//                       {n.message}
//                     </div>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Balance */}
//           <div className="text-sm flex items-center space-x-1 bg-yellow-400 text-black px-2 py-1 rounded-full font-semibold shadow">
//             🪙 <CountUp end={balance} duration={2} />
//           </div>

//           {/* Dark Mode Toggle */}
//           <button onClick={() => setDark(!dark)}>
//             {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-white" />}
//           </button>

//           {/* Profile */}
//           <button onClick={() => setProfileOpen(!profileOpen)}>
//             <div className="relative w-9 h-9">
//               <Image
//                 src={
//                   pimg ? `http://localhost:8000/profile_users/${pimg}` : '/default-user.png'
//                 }
//                 alt="Profile"
//                 fill
//                 className="rounded-full object-cover border"
//               />
//             </div>
//           </button>

//           {/* Mobile Menu Toggle */}
//           <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
//             {menuOpen ? <X /> : <Menu />}
//           </button>
//         </div>
//       </div>

//       {/* Profile Dropdown */}
//       <AnimatePresence>
//         {profileOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="absolute right-4 top-16 bg-white text-black p-3 rounded shadow-lg z-50 w-44"
//           >
//             <p className="text-sm mb-2">👋 {username}</p>
//             <Link href="/profile" className="block px-3 py-2 hover:bg-gray-100 rounded">
//               My Profile
//             </Link>
//             <button
//               className="text-red-600 w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
//               onClick={() => {
//                 localStorage.removeItem('userData');
//                 window.location.href = '/';
//               }}
//             >
//               Logout
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ y: -10, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -10, opacity: 0 }}
//             className="md:hidden bg-indigo-950 text-white px-5 py-4 space-y-2"
//           >
//             <Link href="/">Home</Link>
//             <Link href="/products">Products</Link>
//             <Link href="/cart">Cart</Link>
//             <div>
//               <p className="font-semibold">Categories:</p>
//               {categories.map((cat) => (
//                 <Link key={cat} href={`/category/${cat.toLowerCase()}`}>
//                   <p className="pl-3 text-sm text-cyan-300">{cat}</p>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }












// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Menu, X, Bell, Moon, Sun, ChevronDown } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Typewriter from 'typewriter-effect';
// import CountUp from 'react-countup';

// export default function AllInOneNavbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [categoryOpen, setCategoryOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [dark, setDark] = useState(false);
//   const [balance, setBalance] = useState(7450); // pretend value
//   const [notifications, setNotifications] = useState(3); // pretend count

//   const [username, setUsername] = useState('রাশিদুল');
//   const [pimg, setPimg] = useState('');

//   const categories = ['Electronics', 'Fashion', 'Toys', 'Home'];

//   useEffect(() => {
//     // Profile load (can be from localStorage or API)
//     const userData = JSON.parse(localStorage.getItem('userData') || '[]');
//     if (userData[0]) {
//       setUsername(userData[0].name || 'Guest');
//       setPimg(userData[0].img || '');
//     }

//     // Scroll blur
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Dark mode toggle
//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', dark);
//   }, [dark]);

//   return (
//     <motion.nav
//       initial={{ y: -60, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className={`sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 ${
//         scrolled
//           ? 'bg-indigo-950/90 shadow-md'
//           : 'bg-gradient-to-r from-indigo-900 via-black to-indigo-900'
//       }`}
//     >
//       <div className="flex items-center justify-between px-5 py-3 text-white">
//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold text-cyan-300">
//           <Typewriter
//             options={{
//               strings: ['MyShopings.com', 'Deals Await! 🎁', 'Enjoy Shopping 🛍️'],
//               autoStart: true,
//               loop: true,
//               delay: 60,
//               deleteSpeed: 40,
//             }}
//           />
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           <Link href="/">Home</Link>
//           <Link href="/products">Products</Link>
//           <Link href="/cart">Cart</Link>

//           {/* Categories Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setCategoryOpen(!categoryOpen)}
//               className="flex items-center"
//             >
//               Categories <ChevronDown className="ml-1 w-4 h-4" />
//             </button>
//             <AnimatePresence>
//               {categoryOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="absolute top-8 left-0 bg-white text-black rounded-md shadow-md p-3 z-50"
//                 >
//                   {categories.map((cat) => (
//                     <Link
//                       key={cat}
//                       href={`/category/${cat.toLowerCase()}`}
//                       className="block px-4 py-2 hover:bg-blue-100 rounded"
//                     >
//                       {cat}
//                     </Link>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="flex items-center space-x-4 relative">
//           {/* Notification Bell */}
//           <div className="relative">
//             <Bell className="w-6 h-6 cursor-pointer hover:text-cyan-300" />
//             {notifications > 0 && (
//               <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1">
//                 {notifications}
//               </span>
//             )}
//           </div>

//           {/* Coin & Balance */}
//           <div className="text-sm flex items-center space-x-1 bg-yellow-400 text-black px-2 py-1 rounded-full font-semibold shadow">
//             🪙 <CountUp end={balance} duration={2} />
//           </div>

//           {/* Dark Mode Toggle */}
//           <button onClick={() => setDark(!dark)}>
//             {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-white" />}
//           </button>

//           {/* Profile Image */}
//           <button onClick={() => setProfileOpen(!profileOpen)}>
//             <div className="relative w-9 h-9">
//               <Image
//                 src={
//                   pimg
//                     ? `http://localhost:8000/profile_users/${pimg}`
//                     : '/default-user.png'
//                 }
//                 alt="Profile"
//                 fill
//                 className="rounded-full object-cover border"
//               />
//             </div>
//           </button>

//           {/* Mobile Menu Toggle */}
//           <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
//             {menuOpen ? <X /> : <Menu />}
//           </button>
//         </div>
//       </div>

//       {/* Profile Dropdown */}
//       <AnimatePresence>
//         {profileOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="absolute right-4 top-16 bg-white text-black p-3 rounded shadow-lg z-50 w-44"
//           >
//             <p className="text-sm mb-2">👋 {username}</p>
//             <Link href="/profile" className="block px-3 py-2 hover:bg-gray-100 rounded">
//               My Profile
//             </Link>
//             <button
//               className="text-red-600 w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
//               onClick={() => {
//                 localStorage.removeItem('userData');
//                 window.location.href = '/';
//               }}
//             >
//               Logout
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ y: -10, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -10, opacity: 0 }}
//             className="md:hidden bg-indigo-950 text-white px-5 py-4 space-y-2"
//           >
//             <Link href="/">Home</Link>
//             <Link href="/products">Products</Link>
//             <Link href="/cart">Cart</Link>
//             <div>
//               <p className="font-semibold">Categories:</p>
//               {categories.map((cat) => (
//                 <Link key={cat} href={`/category/${cat.toLowerCase()}`}>
//                   <p className="pl-3 text-sm text-cyan-300">{cat}</p>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }



// "use client"

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Menu, X, ChevronDown } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Imgas from '../../public/Icon/rcoin2.png'
// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [categoryOpen, setCategoryOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);




//   const [isVerified, setVerifieds]=useState(true);
//   const [usename, setUsenames]=useState("");
//   const [pimg, setImg]=useState("");

//   const categories = ['Electronics', 'Fashion', 'Home', 'Toys'];



// useEffect(() => {



// const data = JSON.parse(localStorage.getItem("userData"));
// const username = data.map(item => item.name);
// const userimg = data.map(item => item.img);

// setUsenames(username);
// setImg(userimg);


// }, [])







//   return (
//     <motion.nav
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.4 }}
//       className=" bg-gradient-to-r from-indigo-900 via-black to-indigo-900 text-white font-bold border-b-1 border-red-300 text-white shadow-md border-bottom-red px-4 py-3 flex items-center justify-between sticky top-0 z-50"
//     >
//       {/* Logo */}
//       <Link href="/" className="text-xl font-bold text-blue-600">My-shopings.com</Link>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex items-center space-x-6">
//         <Link href="/" className="text-gray-700 hover:text-blue-600 transition duration-300">Home</Link>
//         <Link href="/products" className="text-gray-700 hover:text-blue-600 transition duration-300">Products</Link>
//         <Link href="/cart" className="text-gray-700 hover:text-blue-600 transition duration-300">Cart</Link>

//         {/* Categories */}
//         <div className="relative">
//           <button
//             onClick={() => setCategoryOpen(!categoryOpen)}
//             className="flex items-center text-gray-700 hover:text-blue-600 transition"
//           >
//             Categories <ChevronDown className="w-4 h-4 ml-1" />
//           </button>
//           <AnimatePresence>
//             {categoryOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="absolute bg-white shadow-lg mt-2 rounded-md p-2 space-y-2 z-50"
//               >
//                 {categories.map((cat) => (
//                   <Link
//                     key={cat}
//                     href={`/category/${cat.toLowerCase()}`}
//                     className="block px-4 py-1 hover:bg-blue-100 rounded text-sm"
//                   >
//                     {cat}
//                   </Link>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search..."
//           className="px-3 py-1 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />
//       </div>

//       {/* Profile & Menu */}
//       <div className="flex items-center space-x-3 relative">
//         {/* Profile Image */}
//         <button onClick={() => setProfileOpen(!profileOpen)}>


//           {usename ?







//    <div className="flex items-center space-x-2">


//     <span className="text-sm font-medium">{usename}</span>
//   <div className="relative w-10 h-10">
//     <Image
//       src={`http://localhost:8000/profile_users/${pimg}`}

//             fill
//       className="rounded-full object-cover border border-gray-300"
//     />
//     {isVerified && (
//       <div className="absolute bottom-0 right-0 bg-white rounded-full p-[2px]">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-3 h-3 text-blue-500"
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M22 12l-2-1.732V7l-2-1.732L16 5l-2-1.732L12 2 10 3.268 8 5 6 5.268 4 7v3.268L2 12l2 1.732V17l2 1.732L8 19l2 1.732L12 22l2-1.268 2-1.732 2-.268 2-1.732v-3.268L22 12zM10 16l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z" />
//         </svg>
//       </div>
//     )}
//   </div>
  





  
// </div>


          
// //   <Image
// //   src={`http://localhost:8000/profile_users/${userimg}`}
// //  width={36}
// //  height={36}
// //   alt={username}
// //   className="rounded-full border border-gray-300 object-cover"
// // />
//         :
//         <Image
//             src={pimg}
//             width={36}
//             height={36}
        
//             className="rounded-full border border-gray-300"
//           />

//         }
          
//         </button>

//         {/* Profile Dropdown */}
//         <AnimatePresence>
//           {profileOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="absolute top-14 right-0 bg-white text-black  shadow-lg-green rounded-md p-3 w-40 z-50"
//             >
//               <Link href="/profile" className="block px-3 py-2 hover:bg-gray-100 rounded text-sm">My Profile</Link>
//               <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm text-red-600">
//                 Logout
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Mobile Menu Toggle */}
//         <button onClick={() => setOpen(!open)} className="md:hidden">
//           {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg flex flex-col items-center py-4 space-y-4">
//           <Link href="/" onClick={() => setOpen(false)}>Home</Link>
//           <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
//           <Link href="/cart" onClick={() => setOpen(false)}>Cart</Link>

//           {/* Categories in Mobile */}
//           <div>
//             <p className="text-gray-700 font-semibold">Categories</p>
//             <div className="space-y-1">
//               {categories.map((cat) => (
//                 <Link
//                   key={cat}
//                   href={`/category/${cat.toLowerCase()}`}
//                   onClick={() => setOpen(false)}
//                   className="block text-sm text-gray-600 hover:text-blue-600"
//                 >
//                   {cat}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Search */}
//           <input
//             type="text"
//             placeholder="Search..."
//             className="px-3 py-1 border rounded-full text-sm w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />
//         </div>
//       )}
//     </motion.nav>
//   );
// }
