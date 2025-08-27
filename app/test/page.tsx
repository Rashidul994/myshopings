

import React from 'react'

export default function page() {
  return (
    <div>text page</div>
  )
}







// 'use client'

// import { useEffect, useState } from 'react'
// import axios from 'axios'

// export default function BlockchainUI() {
//   const [blocks, setBlocks] = useState([])
//   const [tx, setTx] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [valid, setValid] = useState<boolean | null>(null)

//   const fetchBlocks = async () => {
//     const res = await axios.get('http://localhost:8000/api/blocks')
//     setBlocks(res.data)
//   }

//   const addBlock = async () => {
//     if (!tx.trim()) return alert('লেনদেন দিন')

//     setLoading(true)
//     await axios.post('http://localhost:8000/api/blocks', {
//       transactions: [tx],
//     })
//     setTx('')
//     fetchBlocks()
//     setLoading(false)
//   }

//   const validateChain = async () => {
//     const res = await axios.get('http://localhost:8000/api/validate')
//     setValid(res.data.valid)
//   }

//   useEffect(() => {
//     fetchBlocks()
//   }, [])

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold text-pink-600 mb-4">🪙 ব্লকচেইন সিস্টেম</h1>

//       <div className="flex gap-2 mb-4">
//         <input
//           value={tx}
//           onChange={(e) => setTx(e.target.value)}
//           placeholder="লেনদেন লিখুন (যেমন: Alice → Bob)"
//           className="w-full border px-4 py-2 rounded"
//         />
//         <button
//           onClick={addBlock}
//           disabled={loading}
//           className="bg-pink-600 text-white px-4 py-2 rounded"
//         >
//           ব্লক যুক্ত করো
//         </button>
//         <button
//           onClick={validateChain}
//           className="bg-gray-700 text-white px-4 py-2 rounded"
//         >
//           চেইন যাচাই
//         </button>
//       </div>

//       {valid !== null && (
//         <p className={`mb-4 text-sm font-bold ${valid ? 'text-green-600' : 'text-red-600'}`}>
//           {valid ? '✅ ব্লকচেইন বৈধ' : '❌ চেইনে সমস্যা আছে'}
//         </p>
//       )}

//       <div className="grid gap-4">
//         {blocks.map((block: any) => (
//           <div key={block.id} className="border rounded p-4 bg-white shadow">
//             <p className="text-sm font-bold">⛓️ Block #{block.id}</p>
//             <p className="text-xs text-gray-500">🕒 {new Date(block.created_at).toLocaleString()}</p>
//             <p>📄 Tx: {block.transactions}</p>
//             <p>🔗 Prev: {block.previous_hash}</p>
//             <p>🔐 Hash: {block.hash}</p>
//             <p>⚙️ Nonce: {block.nonce}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }












// // 'use client';

// // import Image from 'next/image';
// // import { useEffect, useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';

// // const products = [
// //   { id: 1, name: 'পণ্য ১', image: '/img/product1.png' },
// //   { id: 2, name: 'পণ্য ২', image: '/img/product2.png' },
// //   { id: 3, name: 'পণ্য ৩', image: '/img/product3.png' },
// //   { id: 4, name: 'পণ্য ৪', image: '/img/product4.png' },
// //   { id: 5, name: 'পণ্য ৫', image: '/img/product5.png' },
// //   { id: 6, name: 'পণ্য ৬', image: '/img/product6.png' },
// //   { id: 7, name: 'পণ্য ৭', image: '/img/product7.png' },
// //   { id: 8, name: 'পণ্য ৮', image: '/img/product8.png' },
// // ];

















// // import axios from 'axios';
// // import Navbar from './components/Navbar';
// // import ShopBag from './components/ShopBag';
// // import Marquee from './marqee/page';
// // import Loding from './Loding/page';
// // import Footers from './Footer/page';
// // import Fs from './bbb/page';
// // import Api from '../api/Api';
// // import HomepageVAlucup from './Products/HomepageVAlucup';
// // import Cardsprodut from './Products/Product_get_brand';

// // import Link from 'next/link';
// // export default function ProductGridWithMotion() {
// //   const [products, setProducts] = useState<any[]>([]);
// //   const [brand, setBrand] = useState('');
// //   const [branNams, setBrnadnms] = useState('');
// //   const [getBrand, setProducts_brand] = useState<any[]>([]);
// //   const [actions_new_old, setAction] = useState<'new' | 'old'>('new');

// //   useEffect(() => {
// //     const fetchData = () => {
// //       getAllProducts();
// //       getUserBrandName();
   
// //     };

// //     fetchData();
// //     const interval = setInterval(fetchData, 3000);
// //     return () => clearInterval(interval);
// //   }, [brand]);

// //   const getAllProducts = () => {
// //     Api.get(`/get_all_product/${actions_new_old}`)
// //       .then(res => {
// //         if (!brand) {
// //           setProducts(res.data.message);
// //         }
// //       })
// //       .catch(err => console.error('❌ Product load error:', err));
// //   };

// //   const getUserBrandName = () => {
// //     Api.get(`/get_all_product_brandName/${brand}/${actions_new_old}`)
// //       .then(res => {
// //         setProducts_brand(res.data.message);
// //         if (brand) setProducts(res.data.message);
// //       })
// //       .catch(err => console.error('❌ Brand get error:', err));
// //   };

// // // export default function ProductGridWithMotion() {
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const timer = setTimeout(() => setLoading(false), 2000);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   return (
// //     <div className="p-4 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
// //       <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
// //         {(loading ? Array.from({ length: 8 }) : products).map((product, index) => (
// //           <motion.div
// //             key={index}
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: index * 0.1, duration: 0.5 }}
// //             className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 relative group overflow-hidden"
// //           >
// //             <div className="p-3">
// //               {loading ? (
// //                 <motion.div
// //                   className="w-full h-32 md:h-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
// //                   initial={{ scale: 0.9 }}
// //                   animate={{ scale: 1 }}
// //                   transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
// //                 />
// //               ) : (
// //                 <>
// //                   <motion.div
// //                     whileHover={{ scale: 1.05 }}
// //                     transition={{ type: 'spring', stiffness: 300 }}
// //                   >
                
              

// // <img
// //   src={
// //     product.img
// //       ? `http://localhost:8000/uploads_product/${product.img}`
// //       : product.imglink || '/fallback.jpg'
// //   }
// //   alt={product.name || 'Product Image'}
// //   width={300}
// //   height={300}
// //   className="mx-auto object-contain h-32 sm:h-36 md:h-40 transition-transform duration-300 rounded"
// // />

                
// //                     {/* <Image
// //                         src={
// //                       product.img
// //                         ? `http://localhost:8000/uploads_product/${product.img}`
// //                         : product.imglink
// //                     }
// //                     alt={product.name || 'Product Image'}
                
// //                       width={300}
// //                       height={300}
// //                       className="mx-auto object-contain h-32 sm:h-36 md:h-40 transition-transform duration-300"
// //                     /> */}
// //                   </motion.div>

// //                   <p className="mt-3 text-center text-sm md:text-base font-semibold text-gray-800 dark:text-white">
// //                     {product.name}
// //                   </p>

// //                   {/* Tooltip with Motion */}
// //                   <AnimatePresence>
// //                     <motion.div
// //                       initial={{ opacity: 0, y: 10 }}
// //                       whileHover={{ opacity: 1, y: 0 }}
// //                       exit={{ opacity: 0, y: 10 }}
// //                       className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
// //                     >
// //                       {product.name} বিস্তারিত দেখুন
// //                     </motion.div>
// //                   </AnimatePresence>
// //                 </>
// //               )}
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }



















// // Next.js 15+ ডাইনামিক ব্র্যান্ড & অ্যাকশন প্রোডাক্ট পেজ + SEO
// // ধাপ ১: app/products/[brand]/[action]/page.tsx
// // tsx
// // Copy
// // Edit
// // import Image from 'next/image';
// // import { Metadata } from 'next';
// // import { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { motion } from 'framer-motion';

// // interface Product {
// //   id: number;
// //   name: string;
// //   image: string;
// // }

// // interface Props {
// //   params: {
// //     brand: string;
// //     action: string;
// //   };
// // }

// // // ডাইনামিক SEO metadata জেনারেটর
// // export async function generateMetadata({ params }: Props): Promise<Metadata> {
// //   const { brand, action } = params;
// //   const brandCapitalized = brand.charAt(0).toUpperCase() + brand.slice(1);
// //   const actionBangla = action === 'new' ? 'নতুন' : 'পুরাতন';

// //   return {
// //     title: `${brandCapitalized} এর ${actionBangla} পণ্য | আপনার দোকানের নাম`,
// //     description: `${brandCapitalized} ব্র্যান্ডের ${actionBangla} প্রোডাক্টগুলো এখানে দেখুন এবং অর্ডার করুন।`,
// //     keywords: [`${brand}`, `${actionBangla} পণ্য`, 'অনলাইন শপ', 'ব্র্যান্ডেড প্রোডাক্ট'],
// //     openGraph: {
// //       title: `${brandCapitalized} এর ${actionBangla} পণ্য | আপনার দোকানের নাম`,
// //       description: `${brandCapitalized} ব্র্যান্ডের ${actionBangla} প্রোডাক্টগুলো এখানে দেখুন।`,
// //       url: `https://yourdomain.com/products/${brand}/${action}`,
// //       siteName: 'আপনার দোকানের নাম',
// //       images: [
// //         {
// //           url: `https://yourdomain.com/og-${brand}.png`,
// //           width: 1200,
// //           height: 630,
// //           alt: `${brandCapitalized} ব্র্যান্ডের ছবি`,
// //         },
// //       ],
// //       locale: 'bn_BD',
// //       type: 'website',
// //     },
// //     twitter: {
// //       card: 'summary_large_image',
// //       title: `${brandCapitalized} এর ${actionBangla} পণ্য | আপনার দোকানের নাম`,
// //       description: `${brandCapitalized} ব্র্যান্ডের ${actionBangla} প্রোডাক্টগুলো এখানে দেখুন।`,
// //       images: [`https://yourdomain.com/og-${brand}.png`],
// //     },
// //   };
// // }

// // export default function ProductPage({ params }: Props) {
// //   const { brand, action } = params;
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function fetchProducts() {
// //       try {
// //         const res = await axios.get(`/api/get_all_product_brandName/${brand}/${action}`);
// //         setProducts(res.data.message || []);
// //       } catch (error) {
// //         console.error('API error:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetchProducts();
// //   }, [brand, action]);

// //   return (
// //     <>
// //       {/* JSON-LD Structured Data */}
// //       <script
// //         type="application/ld+json"
// //         dangerouslySetInnerHTML={{
// //           __html: JSON.stringify({
// //             '@context': 'https://schema.org',
// //             '@type': 'ItemList',
// //             itemListElement: products.map((p, i) => ({
// //               '@type': 'ListItem',
// //               position: i + 1,
// //               name: p.name,
// //               image: p.image,
// //               url: `https://yourdomain.com/products/${brand}/${action}/${p.id}`,
// //             })),
// //           }),
// //         }}
// //       />

// //       <main className="p-4 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
// //         <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
// //           {brand.charAt(0).toUpperCase() + brand.slice(1)} এর {action === 'new' ? 'নতুন' : 'পুরাতন'} পণ্যসমূহ
// //         </h1>

// //         <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
// //           {(loading ? Array.from({ length: 8 }) : products).map((item, index) => (
// //             <motion.div
// //               key={index}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: index * 0.1, duration: 0.5 }}
// //               className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 relative group overflow-hidden"
// //             >
// //               <div className="p-3">
// //                 {loading ? (
// //                   <div className="w-full h-32 md:h-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
// //                 ) : (
// //                   <>
// //                     <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
// //                       <Image
// //                         src={item.image || '/img/default.png'}
// //                         alt={item.name}
// //                         width={300}
// //                         height={300}
// //                         className="mx-auto object-contain h-32 sm:h-36 md:h-40 transition-transform duration-300"
// //                       />
// //                     </motion.div>

// //                     <p className="mt-3 text-center text-sm md:text-base font-semibold text-gray-800 dark:text-white">
// //                       {item.name}
// //                     </p>

// //                     <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                       বিস্তারিত দেখুন
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </main>
// //     </>
// //   );
// // }
// // ধাপ ২: ফোল্ডার স্ট্রাকচার
// // css
// // Copy
// // Edit
// // app/
// // └── products/
// //     └── [brand]/
// //         └── [action]/
// //             └── page.tsx    <-- এই ফাইলটি উপরের কোড
// // ধাপ ৩: API রুট ঠিকমত কনফিগার করা নিশ্চিত করুন
// // Laravel (বা অন্য ব্যাকএন্ড) থেকে /api/get_all_product_brandName/:brand/:action সঠিক ডেটা ফেরত দিচ্ছে কিনা।

// // চাইলে পরবর্তী ধাপে:
// // Pagination & Filter

// // ব্র্যান্ড ও অ্যাকশন সিলেক্টরের UI

// // প্রোডাক্ট ডিটেইল পেজ লিংকিং

// // সবই বানিয়ে দিবো খুব সহজে।

// // আপনার জন্য আর কি দরকার? বলুন! 😊🚀












// // 'use client'

// // import Image from 'next/image'

// // const products = [
// //   { id: 1, name: 'পণ্য ১', image: '/img/product1.png' },
// //   { id: 2, name: 'পণ্য ২', image: '/img/product2.png' },
// //   { id: 3, name: 'পণ্য ৩', image: '/img/product3.png' },
// //   { id: 4, name: 'পণ্য ৪', image: '/img/product4.png' },
// //   { id: 5, name: 'পণ্য ৫', image: '/img/product5.png' },
// //   { id: 6, name: 'পণ্য ৬', image: '/img/product6.png' },
// //   { id: 7, name: 'পণ্য ৭', image: '/img/product7.png' },
// //   { id: 8, name: 'পণ্য ৮', image: '/img/product8.png' },
// // ]

// // export default function ProductGrid() {
// //   return (
// //     <div className="p-4 min-h-screen bg-gray-50 dark:bg-gray-900">
// //       <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
// //         {products.map((item) => (
// //           <div
// //             key={item.id}
// //             className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 text-center hover:shadow-md transition-all"
// //           >
// //             <Image
// //               src={item.image}
// //               alt={item.name}
// //               width={200}
// //               height={200}
// //               className="mx-auto rounded-md object-contain h-32"
// //             />
// //             <p className="mt-2 text-sm md:text-base font-semibold text-gray-800 dark:text-white">
// //               {item.name}
// //             </p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }










// // ✅ FRONTEND - Next.js (App Router)
// // File: app/messenger/page.tsx


// // 'use client';
// // import { useEffect, useRef, useState } from 'react';

// // import axios from 'axios';
// // import { motion } from 'framer-motion';

// // const API = 'http://localhost:8000/api';

// // export default function Messenger() {
// //   const [token, setToken] = useState('');
// //   const [user, setUser] = useState<any>(null);
// //   const [messages, setMessages] = useState<any[]>([]);
// //   const [text, setText] = useState('');
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const [showPicker, setShowPicker] = useState(false);

// //   const fetchMessages = async () => {
// //     const res = await axios.get(`${API}/messages`, {
// //       headers: { Authorization: `Bearer ${token}` },
// //     });
// //     setMessages(res.data);
// //   };

// //   const sendMessage = async () => {
// //     if (!text && !selectedFile) return;
// //     const formData = new FormData();
// //     formData.append('content', text);
// //     if (selectedFile) formData.append('file', selectedFile);

// //     await axios.post(`${API}/messages`, formData, {
// //       headers: { Authorization: `Bearer ${token}` },
// //     });
// //     setText('');
// //     setSelectedFile(null);
// //     fetchMessages();
// //   };

// //   const addReaction = async (messageId: number, emoji: string) => {
// //     await axios.post(
// //       `${API}/messages/${messageId}/reaction`,
// //       { emoji },
// //       { headers: { Authorization: `Bearer ${token}` } }
// //     );
// //     fetchMessages();
// //   };

// //   useEffect(() => {
// //     // Load user & token (mocked here for example)
// //     setToken('YOUR_SANCTUM_TOKEN');
// //     setUser({ id: 1, name: 'User' });
// //     fetchMessages();
// //   }, []);

// //   return (
// //     <div className="max-w-xl mx-auto p-4 space-y-4">
// //       <div className="space-y-2">
// //         {messages.map((msg) => (
// //           <motion.div
// //             key={msg.id}
// //             initial={{ opacity: 0, y: 10 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="bg-gray-100 p-3 rounded relative group"
// //           >
// //             <div className="flex items-center justify-between">
// //               <p><strong>{msg.sender_id === user?.id ? 'You' : 'Friend'}</strong>: {msg.content}</p>
// //               {msg.file_url && (
// //                 <a href={msg.file_url} target="_blank" className="text-blue-500 text-sm">📎 File</a>
// //               )}
// //             </div>
// //             <div className="flex gap-2 mt-1">
// //               {msg.reactions?.map((r: any) => (
// //                 <span key={r.id}>{r.emoji}</span>
// //               ))}
// //             </div>
// //             <button onClick={() => setShowPicker(showPicker === msg.id ? false : msg.id)} className="absolute top-1 right-1 text-sm">😊</button>
// //             {showPicker === msg.id && (
// //               <div className="absolute z-50">
// //                 <Picker data={data} onEmojiSelect={(e: any) => {
// //                   addReaction(msg.id, e.native);
// //                   setShowPicker(false);
// //                 }} />
// //               </div>
// //             )}
// //           </motion.div>
// //         ))}
// //       </div>

// //       <div className="flex items-center gap-2">
// //         <input
// //           type="text"
// //           value={text}
// //           onChange={(e) => setText(e.target.value)}
// //           placeholder="Type your message..."
// //           className="border p-2 rounded flex-1"
// //         />
// //         <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
// //         <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
// //       </div>
// //     </div>
// //   );
// // }

// // ✅ BACKEND - Laravel API


// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// // import {
// //   Home,
// //   ShoppingCart,
// //   User,
// //   Menu,
// //   Coins,
// //   Search,
// //   X,
// // } from 'lucide-react';

// // const navItems = [
// //   { href: '/', icon: Home, label: 'হোম' },
// //   { href: '/products', icon: ShoppingCart, label: 'পণ্য' },
// //   { href: '/coins', icon: Coins, label: 'কয়েন' },
// //   { href: '/profile', icon: User, label: 'প্রোফাইল' },
// // ];

// // export default function MobileBottomNav() {
// //   const pathname = usePathname();
// //   const [showSearch, setShowSearch] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   const toggleSearch = () => {
// //     setShowSearch(!showSearch);
// //     setSearchQuery('');
// //   };

// //   return (
// //     <>
// //       {/* 🔍 Top Search Bar */}
// //       <AnimatePresence>
// //         {showSearch && (
// //           <motion.div
// //             initial={{ y: -60, opacity: 0 }}
// //             animate={{ y: 0, opacity: 1 }}
// //             exit={{ y: -60, opacity: 0 }}
// //             transition={{ duration: 0.4 }}
// //             className="fixed top-3 left-3 right-3 z-[100] bg-white dark:bg-zinc-900 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3"
// //           >
// //             <Search className="text-gray-500 dark:text-gray-300" size={20} />
// //             <input
// //               autoFocus
// //               type="text"
// //               placeholder="সার্চ করুন..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
// //             />
// //             <button onClick={toggleSearch}>
// //               <X className="text-gray-500 dark:text-gray-300" size={20} />
// //             </button>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* 📱 Bottom Navigation */}
// //       <div className="md:hidden fixed bottom-3 left-3 right-3 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg shadow-xl rounded-3xl px-4 py-2 flex justify-between items-center">
// //         {/* 👇 Navigation Items */}
// //         {navItems.map((item, index) => {
// //           const isActive = pathname === item.href;
// //           const Icon = item.icon;
// //           return (
// //             <Link key={index} href={item.href}>
// //               <motion.div
// //                 whileTap={{ scale: 0.9 }}
// //                 whileHover={{ scale: 1.1 }}
// //                 className={`flex flex-col items-center text-xs gap-1 transition-all 
// //                   ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
// //               >
// //                 <motion.div
// //                   whileHover={{ rotate: 5 }}
// //                   className={`
// //                     p-3 rounded-full shadow-md transition-all
// //                     ${isActive ? 'bg-blue-100 dark:bg-blue-500/20' : 'bg-gray-100 dark:bg-zinc-800'}
// //                     hover:shadow-xl hover:bg-blue-100/90 dark:hover:bg-blue-500/30
// //                   `}
// //                 >
// //                   <Icon size={20} />
// //                 </motion.div>
// //                 <span>{item.label}</span>
// //               </motion.div>
// //             </Link>
// //           );
// //         })}

// //         {/* 🔍 Search Button */}
// //         <motion.button
// //           whileTap={{ scale: 0.9 }}
// //           whileHover={{ rotate: 10 }}
// //           onClick={toggleSearch}
// //           className="flex flex-col items-center text-xs text-gray-600 dark:text-gray-300"
// //         >
// //           <div className="p-3 rounded-full bg-gray-100 dark:bg-zinc-800 shadow-md hover:shadow-xl hover:bg-blue-100/90 dark:hover:bg-blue-500/30">
// //             <Search size={20} />
// //           </div>
// //           <span>সার্চ</span>
// //         </motion.button>
// //       </div>
// //     </>
// //   );
// // }




// // 'use client';

// // import { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// // import { Home, ShoppingCart, User, Menu, Coins, Settings, LogOut, Languages, Moon, Sun } from 'lucide-react';

// // const navItems = [
// //   { href: '/', icon: Home, label: 'হোম' },
// //   { href: '/products', icon: ShoppingCart, label: 'পণ্য' },
// //   { href: '/coins', icon: Coins, label: 'কয়েন' },
// //   { href: '/profile', icon: User, label: 'প্রোফাইল' },
// // ];

// // export default function MobileBottomNav() {
// //   const pathname = usePathname();
// //   const [isMenuOpen, setMenuOpen] = useState(false);
// //   const [darkMode, setDarkMode] = useState(false);

// //   const toggleSidebar = () => setMenuOpen(!isMenuOpen);

// //   const toggleTheme = () => {
// //     document.documentElement.classList.toggle('dark');
// //     setDarkMode(!darkMode);
// //   };

// //   return (
// //     <>
// //       {/* Bottom Navigation Bar */}
// //       <div className="md:hidden fixed bottom-3 left-3 right-3 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg shadow-xl rounded-3xl px-4 py-2 flex justify-between items-center">
// //         {navItems.map((item, index) => {
// //           const isActive = pathname === item.href;
// //           const Icon = item.icon;
// //           return (
// //             <Link key={index} href={item.href}>
// //               <motion.div
// //                 whileTap={{ scale: 0.92 }}
// //                 whileHover={{ scale: 1.08 }}
// //                 className={`flex flex-col items-center gap-1 text-xs transition-all
// //                   ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
// //               >
// //                 <motion.div
// //                   whileHover={{ rotate: 5 }}
// //                   className={`relative p-3 rounded-full transition-all duration-300
// //                     ${isActive ? 'bg-blue-100 dark:bg-blue-500/20' : 'bg-gray-100 dark:bg-zinc-800'}
// //                     shadow-md hover:shadow-xl hover:bg-blue-100/90 dark:hover:bg-blue-500/30
// //                   `}
// //                 >
// //                   <Icon size={20} />
// //                   {isActive && (
// //                     <motion.span
// //                       layoutId="active-dot"
// //                       className="absolute bottom-1 right-1 w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"
// //                     />
// //                   )}
// //                 </motion.div>
// //                 <span className="font-semibold">{item.label}</span>
// //               </motion.div>
// //             </Link>
// //           );
// //         })}

// //         {/* Menu Toggle */}
// //         <motion.button
// //           whileTap={{ scale: 0.9 }}
// //           whileHover={{ rotate: 10 }}
// //           onClick={toggleSidebar}
// //           className="flex flex-col items-center text-xs text-gray-600 dark:text-gray-300"
// //         >
// //           <div className="p-3 rounded-full bg-gray-100 dark:bg-zinc-800 shadow-md hover:shadow-xl hover:bg-blue-100/90 dark:hover:bg-blue-500/30">
// //             <Menu size={20} />
// //           </div>
// //           <span className="font-semibold">মেনু</span>
// //         </motion.button>
// //       </div>

// //       {/* Sidebar Popup */}
// //       <AnimatePresence>
// //         {isMenuOpen && (
// //           <motion.aside
// //             initial={{ x: '100%' }}
// //             animate={{ x: 0 }}
// //             exit={{ x: '100%' }}
// //             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
// //             className="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-zinc-900 shadow-xl z-[100] p-6 flex flex-col gap-4"
// //           >
// //             <div className="flex justify-between items-center mb-4">
// //               <h2 className="text-lg font-bold text-gray-800 dark:text-white">নেভিগেশন</h2>
// //               <button
// //                 onClick={toggleSidebar}
// //                 className="text-gray-500 hover:text-red-500"
// //               >
// //                 ✖
// //               </button>
// //             </div>

// //             <div className="flex flex-col gap-4 text-sm text-gray-700 dark:text-gray-300">
// //               <Link href="/settings" onClick={toggleSidebar} className="flex items-center gap-2 hover:text-blue-500">
// //                 <Settings size={18} /> অ্যাকাউন্ট সেটিংস
// //               </Link>
// //               <button onClick={toggleTheme} className="flex items-center gap-2 hover:text-blue-500">
// //                 {darkMode ? <Sun size={18} /> : <Moon size={18} />}
// //                 {darkMode ? 'লাইট মোড' : 'ডার্ক মোড'}
// //               </button>
// //               <Link href="/language" onClick={toggleSidebar} className="flex items-center gap-2 hover:text-blue-500">
// //                 <Languages size={18} /> ভাষা পরিবর্তন
// //               </Link>
// //               <Link href="/logout" onClick={toggleSidebar} className="flex items-center gap-2 hover:text-red-500">
// //                 <LogOut size={18} /> লগআউট
// //               </Link>
// //             </div>
// //           </motion.aside>
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // }












// // 'use client';

// // import { motion } from 'framer-motion';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// // import { Home, ShoppingCart, User, Menu, Coins } from 'lucide-react';

// // const navItems = [
// //   { href: '/', icon: <Home size={20} />, label: 'হোম' },
// //   { href: '/products', icon: <ShoppingCart size={20} />, label: 'পণ্য' },
// //   { href: '/coins', icon: <Coins size={20} />, label: 'কয়েন' }, // 🪙 coin icon
// //   { href: '/profile', icon: <User size={20} />, label: 'প্রোফাইল' },
// //   { href: '/menu', icon: <Menu size={20} />, label: 'মেনু' },
// // ];

// // export default function MobileBottomNav() {
// //   const pathname = usePathname();

// //   return (
// //     <div className="md:hidden fixed bottom-3 left-3 right-3 z-50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md shadow-xl rounded-2xl px-4 py-2 flex justify-between items-center">
// //       {navItems.map((item, index) => {
// //         const isActive = pathname === item.href;
// //         return (
// //           <Link key={index} href={item.href}>
// //             <motion.div
// //               whileTap={{ scale: 0.9 }}
// //               whileHover={{ scale: 1.1 }}
// //               className={`flex flex-col items-center gap-1 text-xs transition-all
// //                 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
// //             >
// //               <motion.div
// //                 whileHover={{ rotate: 5 }}
// //                 className={`
// //                   p-3 rounded-full transition-all
// //                   ${isActive ? 'bg-blue-100 dark:bg-blue-500/20' : 'bg-gray-100 dark:bg-zinc-700'}
// //                   shadow-md hover:shadow-xl hover:bg-blue-100/90 dark:hover:bg-blue-500/30
// //                 `}
// //               >
// //                 {item.icon}
// //               </motion.div>
// //               <span>{item.label}</span>
// //             </motion.div>
// //           </Link>
// //         );
// //       })}
// //     </div>
// //   );
// // }












// // // 'use client';

// // // import { motion } from 'framer-motion';
// // // import Link from 'next/link';
// // // import { usePathname } from 'next/navigation';
// // // import { Home, ShoppingCart, User, Menu } from 'lucide-react';

// // // const navItems = [
// // //   { href: '/', icon: <Home size={20} />, label: 'হোম' },
// // //   { href: '/products', icon: <ShoppingCart size={20} />, label: 'পণ্য' },
// // //   { href: '/profile', icon: <User size={20} />, label: 'প্রোফাইল' },
// // //   { href: '/menu', icon: <Menu size={20} />, label: 'মেনু' },
// // // ];

// // // export default function MobileBottomNav() {
// // //   const pathname = usePathname();

// // //   return (
// // //     <div className="md:hidden fixed bottom-3 left-3 right-3 z-50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md shadow-lg rounded-2xl px-4 py-2 flex justify-between items-center">
// // //       {navItems.map((item, index) => {
// // //         const isActive = pathname === item.href;
// // //         return (
// // //           <Link key={index} href={item.href}>
// // //             <motion.div
// // //               whileTap={{ scale: 0.9 }}
// // //               whileHover={{ scale: 1.1 }}
// // //               className={`flex flex-col items-center gap-1 text-xs transition-all 
// // //                 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
// // //             >
// // //               <motion.div
// // //                 whileHover={{ rotate: 5 }}
// // //                 className={`
// // //                   p-3 rounded-full transition-all
// // //                   ${isActive ? 'bg-blue-100 dark:bg-blue-500/20' : 'bg-gray-100 dark:bg-zinc-700'}
// // //                   shadow-md hover:shadow-xl hover:bg-blue-100/90 dark:hover:bg-blue-500/30
// // //                 `}
// // //               >
// // //                 {item.icon}
// // //               </motion.div>
// // //               <span>{item.label}</span>
// // //             </motion.div>
// // //           </Link>
// // //         );
// // //       })}
// // //     </div>
// // //   );
// // // }





// // // 'use client';

// // // import { Swiper, SwiperSlide } from 'swiper/react';
// // // import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// // // import 'swiper/css';
// // // import 'swiper/css/navigation';
// // // import 'swiper/css/pagination';
// // // import Image from 'next/image';
// // // import { motion } from 'framer-motion';

// // // const products = [
// // //   { id: 1, name: 'স্মার্ট ওয়াচ', image: '/products/watch1.jpg' },
// // //   { id: 2, name: 'ফ্যাশন ব্যাগ', image: '/products/bag1.jpg' },
// // //   { id: 3, name: 'কুর্তি কালেকশন', image: '/products/kurti1.jpg' },
// // //   { id: 4, name: 'জুয়েলারি সেট', image: '/products/jewelry1.jpg' },
// // //   { id: 5, name: 'স্যান্ডেল', image: '/products/sandal1.jpg' },
// // //   { id: 6, name: 'লিপস্টিক', image: '/products/lipstick1.jpg' },
// // // ];

// // // export default function PaperSlider() {
// // //   return (
// // //     <section className="py-12 px-4 max-w-7xl mx-auto">
// // //       <motion.h2
// // //         className="text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text"
// // //         initial={{ opacity: 0, y: -20 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.6 }}
// // //       >
// // //         📰 পেপার স্টাইল প্রোডাক্ট স্লাইডার
// // //       </motion.h2>

// // //       <Swiper
// // //         modules={[Navigation, Pagination, Autoplay]}
// // //         loop={true}
// // //         autoplay={{ delay: 3500 }}
// // //         pagination={{ clickable: true }}
// // //         navigation
// // //         spaceBetween={25}
// // //         breakpoints={{
// // //           320: { slidesPerView: 1.1 },
// // //           480: { slidesPerView: 1.5 },
// // //           768: { slidesPerView: 2.2 },
// // //           1024: { slidesPerView: 3.3 },
// // //           1280: { slidesPerView: 4 },
// // //         }}
// // //       >
// // //         {products.map((product, index) => (
// // //           <SwiperSlide key={product.id}>
// // //             <motion.div
// // //               className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
// // //               initial={{ opacity: 0, y: 40 }}
// // //               whileInView={{ opacity: 1, y: 0 }}
// // //               viewport={{ once: true }}
// // //               transition={{ duration: 0.5, delay: index * 0.1 }}
// // //               whileHover={{ scale: 1.02 }}
// // //             >
// // //               <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4">
// // //                 <Image
// // //                   src={product.image}
// // //                   alt={product.name}
// // //                   fill
// // //                   className="object-cover transform transition-transform duration-500 hover:scale-105"
// // //                 />
// // //               </div>
// // //               <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-gray-100">
// // //                 {product.name}
// // //               </h3>
// // //             </motion.div>
// // //           </SwiperSlide>
// // //         ))}
// // //       </Swiper>
// // //     </section>
// // //   );
// // // }















// // // 'use client';

// // // import { Swiper, SwiperSlide } from 'swiper/react';
// // // import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// // // import 'swiper/css';
// // // import 'swiper/css/navigation';
// // // import 'swiper/css/pagination';
// // // import Image from 'next/image';
// // // import { motion } from 'framer-motion';

// // // const products = [
// // //   { id: 1, name: 'স্মার্ট ওয়াচ', image: '/products/watch1.jpg' },
// // //   { id: 2, name: 'ফ্যাশন ব্যাগ', image: '/products/bag1.jpg' },
// // //   { id: 3, name: 'কুর্তি কালেকশন', image: '/products/kurti1.jpg' },
// // //   { id: 4, name: 'জুয়েলারি সেট', image: '/products/jewelry1.jpg' },
// // //   { id: 5, name: 'স্যান্ডেল', image: '/products/sandal1.jpg' },
// // //   { id: 6, name: 'লিপস্টিক', image: '/products/lipstick1.jpg' },
// // // ];

// // // export default function ProductSlider() {
// // //   return (
// // //     <section className="py-12 px-4 max-w-7xl mx-auto">
// // //       <motion.h2
// // //         className="text-3xl md:text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-pink-500 to-violet-600 text-transparent bg-clip-text"
// // //         initial={{ opacity: 0, y: -20 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.6 }}
// // //       >
// // //         ✨ প্রিমিয়াম পণ্য স্লাইডার ✨
// // //       </motion.h2>

// // //       <Swiper
// // //         modules={[Navigation, Pagination, Autoplay]}
// // //         loop={true}
// // //         autoplay={{ delay: 2500, disableOnInteraction: false }}
// // //         pagination={{ clickable: true }}
// // //         navigation
// // //         spaceBetween={30}
// // //         breakpoints={{
// // //           320: { slidesPerView: 1.2 },
// // //           480: { slidesPerView: 1.5 },
// // //           640: { slidesPerView: 2 },
// // //           768: { slidesPerView: 3 },
// // //           1024: { slidesPerView: 4 },
// // //         }}
// // //       >
// // //         {products.map((product, index) => (
// // //           <SwiperSlide key={product.id}>
// // //             <motion.div
// // //               className="rounded-2xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group"
// // //               initial={{ opacity: 0, y: 30 }}
// // //               whileInView={{ opacity: 1, y: 0 }}
// // //               viewport={{ once: true }}
// // //               transition={{ duration: 0.6, delay: index * 0.1 }}
// // //               whileHover={{ scale: 1.03 }}
// // //             >
// // //               <div className="relative w-full h-60 overflow-hidden">
// // //                 <Image
// // //                   src={product.image}
// // //                   alt={product.name}
// // //                   fill
// // //                   className="object-cover transform group-hover:scale-110 transition-transform duration-700 rounded-2xl"
// // //                 />
// // //               </div>
// // //               <div className="p-4 text-center">
// // //                 <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
// // //                   {product.name}
// // //                 </h3>
// // //               </div>
// // //             </motion.div>
// // //           </SwiperSlide>
// // //         ))}
// // //       </Swiper>
// // //     </section>
// // //   );
// // // }
















// // // 'use client';

// // // import { Swiper, SwiperSlide } from 'swiper/react';
// // // import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// // // import Image from 'next/image';
// // // import { motion } from 'framer-motion';
// // // import 'swiper/css';
// // // import 'swiper/css/navigation';
// // // import 'swiper/css/pagination';

// // // const productImages = [
// // //   { id: 1, name: 'স্মার্ট ওয়াচ', image: '/products/watch1.jpg' },
// // //   { id: 2, name: 'ফ্যাশন ব্যাগ', image: '/products/bag1.jpg' },
// // //   { id: 3, name: 'কুর্তি কালেকশন', image: '/products/kurti1.jpg' },
// // //   { id: 4, name: 'জুয়েলারি সেট', image: '/products/jewelry1.jpg' },
// // //   { id: 5, name: 'স্যান্ডেল', image: '/products/sandal1.jpg' },
// // //   { id: 6, name: 'লিপস্টিক', image: '/products/lipstick1.jpg' },
// // // ];

// // // export default function ProductSlider() {
// // //   return (
// // //     <section className="py-10 px-4 max-w-7xl mx-auto">
// // //       <motion.h2
// // //         className="text-2xl md:text-3xl font-bold text-center mb-8"
// // //         initial={{ opacity: 0 }}
// // //         animate={{ opacity: 1 }}
// // //         transition={{ duration: 0.6 }}
// // //       >
// // //         আমাদের পপুলার পণ্যসমূহ
// // //       </motion.h2>

// // //       <Swiper
// // //         modules={[Navigation, Pagination, Autoplay]}
// // //         loop={true}
// // //         autoplay={{ delay: 3000 }}
// // //         pagination={{ clickable: true }}
// // //         navigation
// // //         spaceBetween={20}
// // //         breakpoints={{
// // //           320: { slidesPerView: 1.2 },
// // //           480: { slidesPerView: 1.5 },
// // //           640: { slidesPerView: 2 },
// // //           768: { slidesPerView: 3 },
// // //           1024: { slidesPerView: 4 },
// // //         }}
// // //       >
// // //         {productImages.map((item, index) => (
// // //           <SwiperSlide key={item.id}>
// // //             <motion.div
// // //               className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
// // //               whileHover={{ scale: 1.03 }}
// // //               initial={{ opacity: 0, y: 20 }}
// // //               whileInView={{ opacity: 1, y: 0 }}
// // //               viewport={{ once: true }}
// // //               transition={{ duration: 0.5, delay: index * 0.1 }}
// // //             >
// // //               <div className="relative w-full h-52 sm:h-60 md:h-64">
// // //                 <Image
// // //                   src={item.image}
// // //                   alt={item.name}
// // //                   fill
// // //                   className="object-cover rounded-2xl"
// // //                 />
// // //               </div>
// // //               <div className="text-center p-3">
// // //                 <p className="text-gray-800 dark:text-gray-100 font-medium">{item.name}</p>
// // //               </div>
// // //             </motion.div>
// // //           </SwiperSlide>
// // //         ))}
// // //       </Swiper>
// // //     </section>
// // //   );
// // // }












// // // // components/ProductGrid.tsx

// // // 'use client';
// // // import Image from 'next/image';
// // // import { motion } from 'framer-motion';

// // // const products = [
// // //   { id: 1, name: 'কুর্তি ডিজাইন', image: '/products/kurti1.jpg' },
// // //   { id: 2, name: 'জুয়েলারি সেট', image: '/products/jewelry1.jpg' },
// // //   { id: 3, name: 'মোবাইল কেস', image: '/products/case1.jpg' },
// // //   { id: 4, name: 'স্যান্ডেল', image: '/products/sandal1.jpg' },
// // //   { id: 5, name: 'ব্লাউজ', image: '/products/blouse1.jpg' },
// // //   { id: 6, name: 'হ্যান্ডব্যাগ', image: '/products/bag1.jpg' },
// // //   { id: 7, name: 'ওয়াচ', image: '/products/watch1.jpg' },
// // //   { id: 8, name: 'লিপস্টিক', image: '/products/lipstick1.jpg' },
// // // ];

// // // export default function ProductGrid() {
// // //   return (
// // //     <section className="py-10 px-4 max-w-7xl mx-auto">
// // //       <h2 className="text-2xl font-bold text-center mb-8">আমাদের পণ্যসমূহ</h2>
// // //       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// // //         {products.map((product, index) => (
// // //           <motion.div
// // //             key={product.id}
// // //             className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-2 cursor-pointer hover:shadow-xl transition-shadow"
// // //             whileHover={{ scale: 1.05 }}
// // //             initial={{ opacity: 0, y: 30 }}
// // //             whileInView={{ opacity: 1, y: 0 }}
// // //             viewport={{ once: true }}
// // //             transition={{ duration: 0.4, delay: index * 0.1 }}
// // //           >
// // //             <div className="w-full h-48 relative rounded-xl overflow-hidden">
// // //               <Image
// // //                 src={product.image}
// // //                 alt={product.name}
// // //                 fill
// // //                 className="object-cover rounded-xl transition-transform duration-300 hover:scale-105"
// // //               />
// // //             </div>
// // //             <h3 className="mt-3 text-center font-medium text-gray-800 dark:text-gray-100">
// // //               {product.name}
// // //             </h3>
// // //           </motion.div>
// // //         ))}
// // //       </div>
// // //     </section>
// // //   );
// // // }
