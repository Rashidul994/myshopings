


'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Detect installable event for Android/Chrome
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // iOS detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isInStandaloneMode = 'standalone' in window.navigator && window.navigator.standalone;

    if (isIosDevice && !isInStandaloneMode) {
      setIsIOS(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installApp = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('App installed');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
      setDeferredPrompt(null);
      setShowInstall(false);
    });
  };

  return (
    <>
      {/* ✅ Android/Chrome Install Button */}
      <AnimatePresence>
        {showInstall && (
          <motion.button
            onClick={installApp}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg z-50"
          >
            📥 Install App
          </motion.button>
        )}
      </AnimatePresence>

      {/* ✅ iOS Install Guide */}
      <AnimatePresence>
        {isIOS && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg shadow-md z-40"
          >
            <p className="text-sm text-center">
              📱 iOS ব্যবহারকারী? Safari থেকে <strong>Share</strong> বাটনে ক্লিক করে <strong>"Add to Home Screen"</strong> নির্বাচন করুন।
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      

      {/* ✅ Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-16 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            ✅ App Installed Successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}





// components/InstallButton.js
// 'use client';
// import { useEffect, useState } from 'react';

// export default function InstallButton() {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [showInstall, setShowInstall] = useState(false);

//   useEffect(() => {
//     const handler = (e) => {
//       e.preventDefault();
//       setDeferredPrompt(e);
//       setShowInstall(true);
//     };
//     window.addEventListener('beforeinstallprompt', handler);

//     return () => window.removeEventListener('beforeinstallprompt', handler);
//   }, []);

//   const installApp = () => {
//     deferredPrompt.prompt();
//     deferredPrompt.userChoice.then((choice) => {
//       if (choice.outcome === 'accepted') {
//         console.log('App installed');
//       }
//       setDeferredPrompt(null);
//       setShowInstall(false);
//     });
//   };

//   return (
//     showInstall && (
//       <button
//         onClick={installApp}
//         className="fixed bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md"
//       >
//         📥 Install App
//       </button>
//     )
//   );
// }
