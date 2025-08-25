'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Phone, Mail, MessageCircle } from 'lucide-react'

export default function SpeedDial() {
  const [open, setOpen] = useState(false)

  const actions = [
    { icon: <Phone className="text-green-600" />, label: 'কল করুন', link: 'tel:+880123456789' },
    { icon: <MessageCircle className="text-blue-600" />, label: 'মেসেজ', link: 'sms:+880123456789' },
    { icon: <Mail className="text-red-600" />, label: 'ইমেইল', link: 'mailto:someone@example.com' },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open &&
          actions.map((action, index) => (
            <motion.a
              key={index}
              href={action.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.05 }}
              className="mb-3 flex items-center gap-2 bg-white p-3 rounded-full shadow-lg hover:scale-105 transition"
            >
              {action.icon}
              <span className="text-sm font-medium">{action.label}</span>
            </motion.a>
          ))}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-xl"
      >
        <Plus />
      </motion.button>
    </div>
  )
}


// 'use client'

// import {
//   FacebookShareButton,
//   WhatsappShareButton,
// } from 'react-share'
// import { FaFacebookF, FaWhatsapp, FaImdb } from 'react-icons/fa'
// import { motion } from 'framer-motion'
// import { useEffect, useState } from 'react'

// export default function SocialShare() {
//   const [shareUrl, setShareUrl] = useState('')
//   const title = 'আমার প্রোডাক্ট/সাইটটি দেখুন!'

//   useEffect(() => {
//     setShareUrl(window.location.href)
//   }, [])



//   return (
//     <div className="flex gap-4 mt-4">
//       <motion.div whileHover={{ scale: 1.1 }}>
//         <FacebookShareButton url={shareUrl} quote={title}>
//           <div className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition">
//             <FaFacebookF />
//           </div>
//         </FacebookShareButton>
//       </motion.div>

//       <motion.div whileHover={{ scale: 1.1 }}>
//         <WhatsappShareButton url={shareUrl} title={title} separator=" - ">
//           <div className="bg-green-500 p-3 rounded-full text-white hover:bg-green-600 transition">
//             <FaWhatsapp />
//           </div>
//         </WhatsappShareButton>
//       </motion.div>

//       <motion.div whileHover={{ scale: 1.1 }}>
//         <a
//           href={`https://imo.im/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <div className="bg-pink-500 p-3 rounded-full text-white hover:bg-pink-600 transition">
//             <FaImdb />
//           </div>
//         </a>
//       </motion.div>
//     </div>
//   )
// }
