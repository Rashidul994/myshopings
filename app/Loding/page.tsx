
'use client';

import { motion } from 'framer-motion';
import { FaBoxOpen } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';

export default function ProductLoading() {
  return (
    <div className="flex items-center  bg-dark justify-center h-screen  from-blue-200 to-green-300 blue:from-red-900 dark:to-gray-100 transition-all duration-500">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center px-4"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        >
          <FaBoxOpen className="text-7xl text-indigo-600 dark:text-yellow-400 drop-shadow-lg mb-6" />
        </motion.div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-3">
          <Typewriter
            options={{
              strings: [
                'পণ্য লোড হচ্ছে...',
                'দয়া করে একটু অপেক্ষা করুন...',
                'সেরা পণ্যটি আনছি আপনার জন্য!',
              ],
              autoStart: true,
              loop: true,
              delay: 60,
            }}
          />
        </h1>

        <motion.div
          className="w-32 h-2 bg-indigo-400 dark:bg-yellow-300 rounded-full mt-4"
          animate={{ scaleX: [0.5, 1, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
}








// 'use client';
// import { motion } from 'framer-motion';
// import Typewriter from 'typewriter-effect';

// export default function LoadingPage() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.6, ease: 'easeInOut' }}
//       className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
//     >
//       <div className="text-center space-y-4">
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//           className="text-4xl font-bold tracking-wide"
//         >
//           <Typewriter
//             options={{
//               strings: ['Loading...', 'Please wait...', 'Preparing your experience...'],
//               autoStart: true,
//               loop: true,
//             }}
//           />
//         </motion.div>

//         <motion.div
//           className="h-1 w-40 mx-auto bg-white rounded-full relative overflow-hidden mt-4"
//         >
//           <motion.div
//             className="h-full w-1/2 bg-blue-500 absolute animate-pulse"
//             initial={{ x: '-100%' }}
//             animate={{ x: '100%' }}
//             transition={{
//               repeat: Infinity,
//               duration: 1.5,
//               ease: 'easeInOut',
//             }}
//           />
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }
