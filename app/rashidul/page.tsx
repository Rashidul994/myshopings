
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}


// // components/ProductCard.tsx
// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ShoppingBag } from "lucide-react";

// export default function ProductCard({ product }: any) {
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   const handleAddToCart = () => {
//     setIsAnimating(true);
//     setTimeout(() => {
//       setCartCount(prev => prev + 1);
//       setIsAnimating(false);
//     }, 800);
//   };

//   return (
//     <div className="relative p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition duration-300 space-y-3">
//       {/* Top Cart Icon */}
//       <div className="absolute top-4 right-4 z-10">
//         <div className="relative">
//           <ShoppingBag className="w-6 h-6 text-gray-600 dark:text-white" />
//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//               {cartCount}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Product Image */}
//       <img
//         src={'/'}
//         alt={'sdfsd'}
//         className="w-full h-40 object-contain rounded-md"
//       />

//       {/* Info */}
//       <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
//         dgdfg
//       </h2>
//       <p className="text-sm text-gray-500 dark:text-gray-400">
//         Brand: <span className="text-gray-800 dark:text-gray-200 font-medium">{'fsdfds'}</span> | 
//         Model: <span className="text-gray-800 dark:text-gray-200 font-medium">{'model'}</span>
//       </p>

//       {/* Price */}
//       <div className="flex items-center space-x-2">
//         <p className="text-blue-600 dark:text-blue-400 text-base font-semibold">
//           ৳ 4242
//         </p>
//         {78789 && (
//           <p className="text-sm line-through text-gray-400 dark:text-gray-500">
//             ৳ 313
//           </p>
//         )}
//       </div>

//       {/* Button */}
//       <button
//         onClick={handleAddToCart}
//         className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//       >
//         Add to Cart
//       </button>

//       {/* Animation */}
//       <AnimatePresence>
//         {isAnimating && (
//           <motion.div
//             initial={{ opacity: 1, scale: 1, y: 0 }}
//             animate={{ opacity: 0, scale: 0.4, y: -100, x: 100 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.8, ease: "easeInOut" }}
//             className="absolute top-4 left-4 w-16 h-16 z-50 pointer-events-none"
//           >
//             <img
//               src={''}
//               alt=""
//               className="w-full h-full object-contain rounded-full border-2 border-blue-400"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
