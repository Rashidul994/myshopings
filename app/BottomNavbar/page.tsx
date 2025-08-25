"use client";
import { motion } from "framer-motion";
import {
  Home,
  ShoppingCart,
  Heart,
  User,
  Search,
  BarChart,
  LayoutGrid,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

function useCartCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCount(items.length || 0);
    const interval = setInterval(() => {
      const updated = JSON.parse(localStorage.getItem("cart") || "[]");
      setCount(updated.length || 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return count;
}

// ✅ নতুন আইটেম যুক্ত করা হয়েছে
const navItemsLeft = [
  { icon: Home, label: "হোম", href: "/" },
  { icon: Search, label: "সার্চ", href: "/search" },
  { icon: BarChart, label: "শেয়ার মার্কেট", href: "/share-market" },
];
const navItemsRight = [
  { icon: LayoutGrid, label: "স্ক্রিনার", href: "/screener" },
  { icon: ShoppingCart, label: "কার্ট", href: "/cart" },
  { icon: User, label: "প্রোফাইল", href: "/profile" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const cartCount = useCartCount();

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-t border-gray-300 dark:border-zinc-700 shadow md:hidden">
        <ul className="flex justify-between items-center px-4 py-3 relative gap-2">
          {/* Left Side Items */}
          {navItemsLeft.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href;
            return (
              <motion.li
                key={label}
                whileTap={{ scale: 0.9 }}
                className={`relative flex flex-col items-center text-xs ${
                  isActive
                    ? "text-pink-600 dark:text-pink-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-pink-500"
                }`}
              >
                <Link href={href} className="flex flex-col items-center gap-1 group">
                  <Icon size={22} />
                  <span className="text-[11px] text-center">{label}</span>
                </Link>
              </motion.li>
            );
          })}

          {/* Floating Heart Icon */}
          <li className="relative -mt-12 z-10">
            <Link href="/wishlist">
              <div className="bg-white p-4 rounded-full shadow-xl border border-gray-300 dark:bg-zinc-800 dark:border-zinc-600">
                <Heart size={28} className="text-pink-500" />
              </div>
            </Link>
          </li>

          {/* Right Side Items */}
          {navItemsRight.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href;
            const isCart = label === "কার্ট";
            return (
              <motion.li
                key={label}
                whileTap={{ scale: 0.9 }}
                className={`relative flex flex-col items-center text-xs ${
                  isActive
                    ? "text-pink-600 dark:text-pink-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-pink-500"
                }`}
              >
                <Link href={href} className="flex flex-col items-center gap-1 group">
                  <Icon size={22} />
                  {isCart && cartCount > 0 && (
                    <span className="absolute -top-1.5 right-1.5 bg-red-600 text-white text-[10px] px-1.5 py-[1px] rounded-full font-bold shadow">
                      {cartCount}
                    </span>
                  )}
                  <span className="text-[11px] text-center">{label}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Optional Floating Add to Cart Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-2"
        onClick={() => alert("কার্টে পণ্য যোগ হয়েছে!")}
      >
        <ShoppingCart size={18} />
        <span className="text-sm font-medium"></span>
      </motion.button>
    </>
  );
}








// "use client";
// import { motion } from "framer-motion";
// import {
//   Home,
//   ShoppingCart,
//   Heart,
//   User,
//   Search,
//   Bell,
// } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

// function useCartCount() {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCount(items.length || 0);
//     const interval = setInterval(() => {
//       const updated = JSON.parse(localStorage.getItem("cart") || "[]");
//       setCount(updated.length || 0);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);
//   return count;
// }

// function useNotificationCount() {
//   const [count, setCount] = useState(3);
//   return count;
// }

// const navItemsLeft = [
//   { icon: Home, label: "হোম", href: "/" },
//   { icon: Search, label: "সার্চ", href: "/search" },
// ];
// const navItemsRight = [
//   { icon: ShoppingCart, label: "কার্ট", href: "/cart" },
//   { icon: User, label: "প্রোফাইল", href: "/profile" },
// ];

// export default function BottomNav() {
//   const pathname = usePathname();
//   const cartCount = useCartCount();
//   const notificationCount = useNotificationCount();

//   return (
//     <>
//       {/* Bottom Navigation */}
//       <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-t border-gray-300 dark:border-zinc-700 shadow md:hidden">
//         <ul className="flex justify-between items-center px-6 py-3 relative">
//           {/* Left Side */}
//           <div className="flex gap-6">
//             {navItemsLeft.map(({ icon: Icon, label, href }) => {
//               const isActive = pathname === href;
//               return (
//                 <motion.li
//                   key={label}
//                   whileTap={{ scale: 0.9 }}
//                   className={`relative flex flex-col items-center text-xs ${
//                     isActive
//                       ? "text-pink-600 dark:text-pink-400"
//                       : "text-gray-600 dark:text-gray-300 hover:text-pink-500"
//                   }`}
//                 >
//                   <a href={href} className="flex flex-col items-center gap-1 group">
//                     <Icon
//                       size={22}
//                       className={`transition-transform ${
//                         isActive ? "scale-110" : ""
//                       }`}
//                     />
//                     <span className="text-[11px]">{label}</span>
//                   </a>
//                 </motion.li>
//               );
//             })}
//           </div>

//           {/* Middle Floating Heart */}
//           <div className="relative -mt-12 z-10">
//             <div className="bg-white p-4 rounded-full shadow-lg border border-gray-300 dark:bg-zinc-800 dark:border-zinc-600">
//               <Heart size={28} className="text-pink-500" />
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="flex gap-6">
//             {navItemsRight.map(({ icon: Icon, label, href }) => {
//               const isActive = pathname === href;
//               const isCart = label === "কার্ট";
//               return (
//                 <motion.li
//                   key={label}
//                   whileTap={{ scale: 0.9 }}
//                   className={`relative flex flex-col items-center text-xs ${
//                     isActive
//                       ? "text-pink-600 dark:text-pink-400"
//                       : "text-gray-600 dark:text-gray-300 hover:text-pink-500"
//                   }`}
//                 >
//                   <a href={href} className="flex flex-col items-center gap-1 group">
//                     <Icon size={22} />
//                     {/* Badge for cart */}
//                     {isCart && cartCount > 0 && (
//                       <span className="absolute -top-1.5 right-1.5 bg-red-600 text-white text-[10px] px-1.5 py-[1px] rounded-full font-bold shadow">
//                         {cartCount}
//                       </span>
//                     )}
//                     <span className="text-[11px]">{label}</span>
//                   </a>
//                 </motion.li>
//               );
//             })}
//           </div>
//         </ul>
//       </nav>

//       {/* Floating Add to Cart Button (optional) */}
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//         className="fixed bottom-24 right-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-2"
//         onClick={() => alert("কার্টে পণ্য যোগ হয়েছে!")}
//       >
//         <ShoppingCart size={18} />
//         <span className="text-sm font-medium">কার্টে যোগ করুন</span>
//       </motion.button>
//     </>
//   );
// }





// 'use client';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Home, ShoppingCart, User, Settings } from 'lucide-react';

// const navItems = [
//   { href: '/', label: 'Home', icon: <Home size={22} /> },
//   { href: '/shop', label: 'Shop', icon: <ShoppingCart size={22} /> },
//   { href: '/profile', label: 'Profile', icon: <User size={22} /> },
//   { href: '/settings', label: 'Settings', icon: <Settings size={22} /> },
// ];

// export default function BottomNav() {
//   const pathname = usePathname();

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md border-t border-gray-200 dark:border-gray-700 md:hidden">
//       <ul className="flex justify-around items-center h-14">
//         {navItems.map((item) => (
//           <li key={item.href}>
//             <Link href={item.href}>
//               <div className={`flex flex-col items-center text-sm transition-all duration-300 ${
//                 pathname === item.href
//                   ? 'text-blue-600 dark:text-blue-400'
//                   : 'text-gray-500 dark:text-gray-400 hover:text-blue-500'
//               }`}>
//                 {item.icon}
//                 <span className="text-xs">{item.label}</span>
//               </div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }



// components/BottomNav.tsx
// "use client";
// import { motion } from "framer-motion";
// import {
//   Home,
//   ShoppingCart,
//   Heart,
//   User,
//   Search,
// } from "lucide-react";

// const navItems = [
//   { icon: Home, label: "Home", href: "/" },
//   { icon: Search, label: "Search", href: "/search" },
//   { icon: ShoppingCart, label: "Cart", href: "/cart" },
//   { icon: Heart, label: "Wishlist", href: "/wishlist" },
//   { icon: User, label: "Profile", href: "/profile" },
// ];

// export default function BottomNav() {
//   return (
//     <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-md border-t border-gray-200 dark:border-zinc-700 shadow-t md:hidden">
//       <ul className="flex justify-between items-center px-4 py-2">
//         {navItems.map(({ icon: Icon, label, href }, index) => (
//           <motion.li
//             key={label}
//             whileTap={{ scale: 0.85 }}
//             className="flex flex-col items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
//           >
//             <a href={href} className="flex flex-col items-center justify-center gap-1">
//               <Icon size={22} />
//               <span className="text-xs">{label}</span>
//             </a>
//           </motion.li>
//         ))}
//       </ul>
//     </nav>
//   );
// }
