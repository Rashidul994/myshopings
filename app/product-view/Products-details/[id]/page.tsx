// app/product/[slug]/page.tsx
import { Metadata } from 'next'
import Image from 'next/image'

// ✅ Dummy API Function (তুমি তোমার Laravel API বসাবে এখানে)
async function getProduct(slug: string) {
  const res = await fetch(`https://your-api.com/api/product/${slug}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Product not found')
  return res.json()
}

// ✅ SEO Metadata Function
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: `${product.name} কিনুন সেরা দামে | BanglaShop`,
    description: product.description?.slice(0, 150) || 'পণ্যের বিবরণ পাওয়া যায়নি।',
    keywords: [product.name, product.category, 'বাংলা ইকমার্স', 'অনলাইন শপিং'],
    alternates: {
      canonical: `https://example.com/product/${params.slug}`,
    },
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 150),
      url: `https://example.com/product/${params.slug}`,
      images: [
        {
          url: product.image || 'https://example.com/default.jpg',
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      siteName: 'BanglaShop',
      locale: 'bn_BD',
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description?.slice(0, 150),
      images: [product.image],
    },
  }
}



// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { Metadata } from 'next';

// import axios from 'axios';
// import { motion } from 'framer-motion';

// interface Product {
//   id: number;
//   name: string;
//   image: string;
// }

// interface Props {
//   params: {
//     brand: string;
//     action: string;
//   };
// }

// // ডাইনামিক SEO metadata জেনারেটর
//  async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { brand, action } = params;
//   const brandCapitalized = brand.charAt(0).toUpperCase() + brand.slice(1);
//   const actionBangla = action === 'new' ? 'নতুন' : 'পুরাতন';

//   return {
//     title: `${brandCapitalized} এর ${actionBangla} পণ্য | আপনার দোকানের নাম`,
//     description: `${brandCapitalized} ব্র্যান্ডের ${actionBangla} প্রোডাক্টগুলো এখানে দেখুন এবং অর্ডার করুন।`,
//     keywords: [`${brand}`, `${actionBangla} পণ্য`, 'অনলাইন শপ', 'ব্র্যান্ডেড প্রোডাক্ট'],
//     openGraph: {
//       title: `${brandCapitalized} এর ${actionBangla} পণ্য | আপনার দোকানের নাম`,
//       description: `${brandCapitalized} ব্র্যান্ডের ${actionBangla} প্রোডাক্টগুলো এখানে দেখুন।`,
//       url: `https://yourdomain.com/products/${brand}/${action}`,
//       siteName: 'আপনার দোকানের নাম',
//       images: [
//         {
//           url: `https://yourdomain.com/og-${brand}.png`,
//           width: 1200,
//           height: 630,
//           alt: `${brandCapitalized} ব্র্যান্ডের ছবি`,
//         },
//       ],
//       locale: 'bn_BD',
//       type: 'website',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: `${brandCapitalized} এর ${actionBangla} পণ্য | আপনার দোকানের নাম`,
//       description: `${brandCapitalized} ব্র্যান্ডের ${actionBangla} প্রোডাক্টগুলো এখানে দেখুন।`,
//       images: [`https://yourdomain.com/og-${brand}.png`],
//     },
//   };
// }

// export default function ProductPage({ params }: Props) {
//   const { brand, action } = params;
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const res = await axios.get(`/api/get_all_product_brandName/${brand}/${action}`);
//         setProducts(res.data.message || []);
//       } catch (error) {
//         console.error('API error:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProducts();
//   }, [brand, action]);

//   return (
//     <>


//     <generateMetadata />
//       {/* JSON-LD Structured Data */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             '@context': 'https://schema.org',
//             '@type': 'ItemList',
//             itemListElement: products.map((p, i) => ({
//               '@type': 'ListItem',
//               position: i + 1,
//               name: p.name,
//               image: p.image,
//               url: `https://yourdomain.com/products/${brand}/${action}/${p.id}`,
//             })),
//           }),
//         }}
//       />

//       <main className="p-4 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
//           {brand.charAt(0).toUpperCase() + brand.slice(1)} এর {action === 'new' ? 'নতুন' : 'পুরাতন'} পণ্যসমূহ
//         </h1>

//         <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
//           {(loading ? Array.from({ length: 8 }) : products).map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1, duration: 0.5 }}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 relative group overflow-hidden"
//             >
//               <div className="p-3">
//                 {loading ? (
//                   <div className="w-full h-32 md:h-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
//                 ) : (
//                   <>
//                     <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
//                       <Image
//                         src={item.image || '/img/default.png'}
//                         alt={item.name}
//                         width={300}
//                         height={300}
//                         className="mx-auto object-contain h-32 sm:h-36 md:h-40 transition-transform duration-300"
//                       />
//                     </motion.div>

//                     <p className="mt-3 text-center text-sm md:text-base font-semibold text-gray-800 dark:text-white">
//                       {item.name}
//                     </p>

//                     <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       বিস্তারিত দেখুন
//                     </div>
//                   </>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </main>
//     </>
//   );
// }




// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ShoppingCart, X } from 'lucide-react';
// import Typewriter from 'typewriter-effect';
// import Zoom from 'react-medium-image-zoom';
// import 'react-medium-image-zoom/dist/styles.css';
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import Api from '../../../api/Api'


// import dDddd from '../../../shares/page '


// // Zustand Cart Store
// const useCartStore = create(
//   persist(
//     (set, get) => ({
//       items: [],
//       addItem: (item) => {
//         const exists = get().items.find(
//           (i) => i.id === item.id && i.size === item.size
//         );
//         if (exists) {
//           set({
//             items: get().items.map((i) =>
//               i.id === item.id && i.size === item.size
//                 ? { ...i, quantity: i.quantity + item.quantity }
//                 : i
//             ),
//           });
//         } else {
//           set({ items: [...get().items, item] });
//         }
//       },
//       removeItem: (id) =>
//         set({ items: get().items.filter((i) => i.id !== id) }),
//       updateQty: (id, qty) =>
//         set({
//           items: get().items.map((i) =>
//             i.id === id ? { ...i, quantity: qty } : i
//           ),
//         }),
//       clearCart: () => set({ items: [] }),
//     }),
//     { name: 'cart-storage' }
//   )
// );










// export default function ProductPage() {
//   const { id } = useParams();


//   const [product22, setProduct22] = useState([]);

//   const [product, setProduct] = useState(null);
//   const [selectedImg, setSelectedImg] = useState('');
//   const [selectedSize, setSelectedSize] = useState('M');
//   const [lang, setLang] = useState('bn');
//   const [activeTab, setActiveTab] = useState('description');
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const { items, addItem, removeItem, updateQty } = useCartStore();
//   const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   useEffect(() => {
//     const fakeProduct = {
//       id,
//       name: 'স্মার্ট ওয়াচ সিরিজ ৮',
//       price: 199.99,
//       rating: 4.6,
//       brand: 'TechPro',
//       category: 'স্মার্ট ওয়াচ',
//       images: ['/watch.jpg', '/watch2.jpg', '/watch3.jpg'],
//       description: 'স্মার্ট ওয়াচ সিরিজ ৮ - আধুনিক প্রযুক্তির অসাধারণ সমন্বয়।',
//     };
//     setProduct(fakeProduct);
//     setSelectedImg(fakeProduct.images[0]);














// const runAllFunctions = () => {


// getUser();


//   };

// runAllFunctions();



//     const interval = setInterval(runAllFunctions, 3000); // every 3s

//     return () => clearInterval(interval);






//   }, [id]);












  




// // axios.get('/user', {
// //     params: {
// //       ID: 12345
// //     }
// //   })
// //   .then(function (response) {
// //     console.log(response);
// //   })
// //   .catch(function (error) {
// //     console.log(error);
// //   })
// //   .finally(function () {
// //     // always executed
// //   });

// // Want to use async/await? Add the `async` keyword to your outer function/method.
// const getUser= () =>{

//   Api.get(`/productdateid/${id}`)
//   .then(res =>{
    
// setProduct22(res.data.message);
  
// console.log('============================256565565565656565========');
// console.log(res.data.message);
// console.log('====================================');
// })
//   .catch(err => console.log('errrrrrrrrrrrrrrrr'+err));

// //   try {
// //     const response = axios.get('http://localhost:5000/api/data');
// //  setProducts(response.data);
// //  console.log('====================================');
// //  console.log(response.data);
// //  console.log('====================================');
// //   } catch (error) {
// //     console.error(error);
// //      console.log('====================================erroreeee');
// //   }
// }



//   if (!product) return <div className="p-10 text-center">লোড হচ্ছে...</div>;



// console.log('====================================');

// console.log('====================================');
//   return (
//     <>




//         <button
//         onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
//         className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md text-sm"
//       >
//         {lang === 'bn' ? 'EN' : 'BN'}
//       </button>

//       <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pb-32">
//         <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-10">
//           {/* Image + Gallery */}
//           <div>
//             <Zoom>
//            {product22.img   ?
//             <img
//               src={`http://localhost:8000/uploads_product/${product22.img}`} 
//                 alt={product22.name}
          
//                 className="w-full rounded-2xl shadow-xl object-cover"
//               />
//             :
            
//        <img
//                 src={product22.imglink}
//                 alt={product22.name}
          
//                 className="w-full rounded-2xl shadow-xl object-cover"
//               />
              
//               }


                   
//             </Zoom>
//             <div className="flex gap-3 mt-4">
//               {product.images.map((img, i) => (
//                 <motion.div key={i} whileHover={{ scale: 1.1 }}>
//                   <Image
//                     src={img || null} 
//                             alt="thumb"
//                     width={80}
//                     height={80}
//                     onClick={() => setSelectedImg(img)}
//                     className={`h-20 w-20 object-cover rounded-md cursor-pointer border-2 ${
//                       img === selectedImg ? 'border-blue-600' : 'border-transparent'
//                     }`}
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-4"
//           >
//             <h1 className="text-3xl font-bold">{product22.name}</h1>
//             <p className="text-lg text-gray-600 dark:text-gray-300">
//               {product22.model}
//             </p>
//             <div className="text-green-600 font-semibold text-xl">মূল্য:৳ {product22.pricee}



//             </div>
//             <div className="text-yellow-500">⭐ রেটিং: {product.rating}</div>

//             <div className="flex gap-4 mt-4">
//               {['S', 'M', 'L', 'XL'].map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-4 py-2 border rounded-lg ${
//                     selectedSize === size
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-white dark:bg-gray-800 border-gray-300'
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => {
//                 addItem({
//                   id: product22.id,
//                   name: product22.name,
//                   price: product22.pricee,
//                   image: product22.img,
//                   imk: product22.imglink,
//                   quantity: 1,
//                   size: selectedSize,
//                 });
//               }}
//               className="mt-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
//             >
//               🛒 {lang === 'bn' ? 'কার্টে যুক্ত করুন' : 'Add to Cart'}
//             </motion.button>
//           </motion.div>
//         </div>

//         {/* Tab Bar */}
//         <div className="max-w-4xl mx-auto mt-12 px-4">
//           <div className="flex gap-6 border-b pb-2">
//             {[
//               { key: 'description', label: lang === 'bn' ? 'বর্ণনা' : 'Description' },
//               { key: 'features', label: lang === 'bn' ? 'বিশেষত্ব' : 'Features' },
//               { key: 'reviews', label: lang === 'bn' ? 'রিভিউ' : 'Reviews' },
//             ].map((tab) => (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveTab(tab.key)}
//                 className={`pb-2 font-medium ${
//                   activeTab === tab.key ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* Tab Content */}
//           <div className="mt-6 min-h-[100px] text-lg text-gray-700 dark:text-gray-200">
//             {activeTab === 'description' && (
//               <Typewriter
//                 options={{
//                   strings: [
//                     lang === 'bn'
//                       ? product22.discript
//                       : 'Modern smartwatch with health and fitness tracking.',
//                   ],
//                   autoStart: true,
//                   loop: false,
//                 }}
//               />
//             )}
//             {activeTab === 'features' && (
//               <Typewriter
//                   options={{
//                   strings: [
//                     lang === 'bn'
//                       ? '⏱ দীর্ঘ ব্যাটারি লাইফ, 🌡️ স্বাস্থ্য ট্র্যাকিং, 📱 ব্লুটুথ সংযোগ।'
//                       : '⏱ Long battery life, 🌡️ health tracking, 📱 Bluetooth connectivity.',
//                   ],
//                   autoStart: true,
//                   loop: false,
//                 }}
//               />
//             )}
//             {activeTab === 'reviews' && (
//               <Typewriter
//                 options={{
//                   strings: [
//                     lang === 'bn'
//                       ? '🌟 "খুবই ভালো পণ্য!" - জনি\n🌟 "দাম অনুযায়ী দারুণ!" - রাহুল'
//                       : '🌟 "Great product!" - John\n🌟 "Worth the price!" - Rahul',
//                   ],
//                   autoStart: true,
//                   loop: false,
//                 }}
//               />
//             )}
//           </div>
//         </div>

//         {/* Floating Cart Button */}
//         <button
//           onClick={() => setDrawerOpen(true)}
//           className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
//         >
//           🛒 {items.length}
//         </button>

//         {/* Drawer */}
//         <AnimatePresence>
//           {drawerOpen && (
//             <motion.div
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: 'tween' }}
//               className="fixed top-0 right-0 w-full max-w-sm h-full bg-white dark:bg-gray-900 shadow-lg z-50 p-4 overflow-y-auto"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">আপনার কার্ট</h2>
//                 <button onClick={() => setDrawerOpen(false)}>
//                   <X />
//                 </button>
//               </div>

//               {items.length === 0 ? (
//                 <p className="text-gray-500">কার্ট খালি আছে।</p>
//               ) : (
//                 <>
//                   {items.map((item) => (
//                     <div
//                       key={item.id + item.size}
//                       className="flex items-center gap-4 mb-4"
//                     >

// {item.image ?

//  <Image
//                         src={item.image || null}
//                         alt={item.name || null}
//                         width={60}
//                         height={60}
//                         className="rounded"
//                       />
// :
//  <Image
//                        src={item.image || null}
//                         alt={item.name || null}
//                         width={60}
//                         height={60}
//                         className="rounded"
//                       />
// }


                     
//                       <div className="flex-1">
//                         <h4 className="font-semibold">{item.name}</h4>
//                         <p className="text-sm text-gray-500">Size: {item.size}</p>
//                         <div className="flex items-center mt-1">
//                           <input
//                             type="number"
//                             min={1}
//                             value={item.quantity}
//                             onChange={(e) =>
//                               updateQty(item.id, parseInt(e.target.value))
//                             }
//                             className="w-16 px-2 py-1 border rounded"
//                           />
//                           <button
//                             onClick={() => removeItem(item.id)}
//                             className="ml-3 text-red-500 text-sm"
//                           >
//                             মুছুন
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   <div className="mt-4 font-bold text-lg">
//                     মোট: ৳ {subtotal.toFixed(2)}
//                   </div>
//                   <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md">
//                     চেকআউট
//                   </button>
//                 </>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>



// <dDddd />


//       </div>
//     </>
//   );
// }


// 'use client';
// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import Typewriter from 'typewriter-effect';
// import { addToCart, getCartCount } from '../../api-local/localapi';
// import { ShoppingCart } from 'lucide-react';


// export default function ProductPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState<any>(null);
//   const [lang, setLang] = useState<'bn' | 'en'>('bn');
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const fakeProduct = {
//       id,
//       name: "স্মার্ট ওয়াচ সিরিজ ৮",
//       price: 199.99,
//       rating: 4.5,
//       image: "/watch.jpg",
//       description:
//         "স্মার্ট ওয়াচ সিরিজ ৮ - ফিটনেস ট্র্যাক করুন, স্মার্ট থাকুন এবং স্টাইলিশ দেখান। আধুনিক প্রযুক্তির অসাধারণ সমন্বয়।",
//       brand: "TechPro",
//       category: "স্মার্ট ওয়াচ",
//     };
//     setProduct(fakeProduct);
//     setCartCount(getCartCount());
//   }, [id]);

//   if (!product) return <div className="text-center p-10 text-lg">লোড হচ্ছে...</div>;

//   const siteUrl = `https://yourdomain.com/product/${product.id}`;
//   const productSchema = {
//     "@context": "https://schema.org/",
//     "@type": "Product",
//     name: product.name,
//     image: siteUrl + product.image,
//     description: product.description,
//     brand: { "@type": "Brand", name: product.brand },
//     offers: {
//       "@type": "Offer",
//       url: siteUrl,
//       priceCurrency: "USD",
//       price: product.price,
//       availability: "https://schema.org/InStock",
//     },
//     aggregateRating: {
//       "@type": "AggregateRating",
//       ratingValue: product.rating,
//       reviewCount: 134,
//     },
//   };

//   const toggleLang = () => setLang(lang === 'bn' ? 'en' : 'bn');

//   return (
//     <>
//       <Head>
//         <title>{product.name} | আমাদের পণ্য</title>
//         <meta name="description" content={product.description} />
//         <meta name="keywords" content={`${product.name}, ${product.category}, ${product.brand}, প্রযুক্তি`} />
//         <meta name="author" content="Freelancer Rashidul" />
//         <meta property="og:title" content={product.name} />
//         <meta property="og:description" content={product.description} />
//         <meta property="og:image" content={product.image} />
//         <meta property="og:type" content="product" />
//         <meta property="og:url" content={siteUrl} />
//         <link rel="canonical" href={siteUrl} />
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
//       </Head>

//       <button
//         onClick={toggleLang}
//         className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md text-sm"
//       >
//         {lang === 'bn' ? 'EN' : 'BN'}
//       </button>

//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-6xl mx-auto p-4 md:p-10"
//         >
//           <div className="mb-10 text-center">
//             <h2 className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
//               <Typewriter
//                 options={{
//                   strings: lang === 'bn' ? ['প্রোডাক্ট বিবরণী', 'স্মার্ট ওয়াচ কিনুন আজই'] : ['Product Details', 'Buy Smart Watch Today'],
//                   autoStart: true,
//                   loop: true,
//                 }}
//               />
//             </h2>
//           </div>

//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
//           >
//             <motion.div
//               whileHover={{ scale: 1.03 }}
//               className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-400 dark:hover:shadow-blue-900 transition-all duration-300"
//             >
//               <Image src={product.image} alt={product.name} width={800} height={800} className="w-full object-cover" />
//             </motion.div>

//             <div className="space-y-4">
//               <h1 className="text-3xl md:text-5xl font-bold">{product.name}</h1>
//               <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
//               <div className="text-xl font-semibold text-green-600">মূল্য: ${product.price}</div>
//               <div className="text-yellow-500">⭐ রেটিং: {product.rating} / 5</div>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => {
//                   addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
//                   setCartCount(getCartCount());
//                 }}
//                 className="mt-4 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
//               >
//                 🛒 {lang === 'bn' ? 'কার্টে যুক্ত করুন' : 'Add to Cart'}
//               </motion.button>
//             </div>
//           </motion.div>

//           {/* Related Products */}
//           <div className="mt-16">
//             <h3 className="text-xl font-semibold mb-4">{lang === 'bn' ? '⚡ সম্পর্কিত পণ্য' : '⚡ Related Products'}</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {[1, 2, 3].map(num => (
//                 <motion.div key={num} whileHover={{ scale: 1.03 }} className="p-4 border rounded-xl shadow hover:shadow-blue-300 dark:hover:shadow-blue-800 transition">
//                   <Image src="/watch.jpg" alt="Related" width={400} height={300} className="rounded-md" />
//                   <p className="mt-2 text-sm font-medium">স্মার্ট ওয়াচ {num}</p>
//                   <p className="text-green-600 font-semibold">$199.99</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Review Section */}
//           <div className="mt-16">
//             <h3 className="text-xl font-semibold mb-4">{lang === 'bn' ? '🌟 ব্যবহারকারীদের রিভিউ' : '🌟 Customer Reviews'}</h3>
//             <div className="space-y-4">
//               <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
//                 <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
//                 <p className="text-sm mt-2">"অসাধারণ প্রোডাক্ট! ব্যাটারি লাইফ দুর্দান্ত।"</p>
//                 <span className="text-xs text-gray-500">– জনি রহমান</span>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Floating Cart */}
//         <div className="fixed bottom-6 right-6 z-50">
//           <div className="relative">
//             <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition">
//               <ShoppingCart size={24} />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   {cartCount}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }






// // 'use client';

// // import { useParams } from 'next/navigation';
// // import { useEffect, useState } from 'react';
// // import Head from 'next/head';
// // import Image from 'next/image';
// // import { motion } from 'framer-motion';
// // import Typewriter from 'typewriter-effect';

// // export default function ProductPage() {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState<any>(null);

// //   useEffect(() => {
// //     // এখানে চাইলে fetch(`/api/products/${id}`) করা যাবে
// //     const fakeProduct = {
// //       id,
// //       name: "স্মার্ট ওয়াচ সিরিজ ৮",
// //       price: 199.99,
// //       rating: 4.5,
// //       image: "/watch.jpg",
// //       description:
// //         "স্মার্ট ওয়াচ সিরিজ ৮ - ফিটনেস ট্র্যাক করুন, স্মার্ট থাকুন এবং স্টাইলিশ দেখান। আধুনিক প্রযুক্তির অসাধারণ সমন্বয়।",
// //       brand: "TechPro",
// //       category: "স্মার্ট ওয়াচ",
// //     };
// //     setProduct(fakeProduct);
// //   }, [id]);

// //   if (!product) return <div className="text-center p-10 text-lg">লোড হচ্ছে...</div>;

// //   const siteUrl = `https://yourdomain.com/product/${product.id}`;
// //   const productSchema = {
// //     "@context": "https://schema.org/",
// //     "@type": "Product",
// //     name: product.name,
// //     image: siteUrl + product.image,
// //     description: product.description,
// //     brand: {
// //       "@type": "Brand",
// //       name: product.brand,
// //     },
// //     offers: {
// //       "@type": "Offer",
// //       url: siteUrl,
// //       priceCurrency: "USD",
// //       price: product.price,
// //       availability: "https://schema.org/InStock",
// //     },
// //     aggregateRating: {
// //       "@type": "AggregateRating",
// //       ratingValue: product.rating,
// //       reviewCount: 134, // example count
// //     },
// //   };






// //   return (
// //     <>
// //       <Head>
// //         <title>{product.name} | আমাদের পণ্য</title>
// //         <meta name="description" content={product.description} />
// //         <meta name="keywords" content={`${product.name}, ${product.category}, ${product.brand}, প্রযুক্তি`} />
// //         <meta name="author" content="Freelancer Rashidul" />
// //         <meta property="og:title" content={product.name} />
// //         <meta property="og:description" content={product.description} />
// //         <meta property="og:image" content={product.image} />
// //         <meta property="og:type" content="product" />
// //         <meta property="og:url" content={siteUrl} />
// //         <link rel="canonical" href={siteUrl} />
// //         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
// //       </Head>

// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ duration: 0.8 }}
// //           className="max-w-6xl mx-auto p-4 md:p-10"
// //         >
// //           {/* Auto Type Title */}
// //           <div className="mb-10 text-center">
// //             <h2 className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
// //               <Typewriter
// //                 options={{
// //                   strings: ['প্রোডাক্ট বিবরণী', 'স্মার্ট ওয়াচ কিনুন আজই', 'বিশেষ ছাড় চলছে!'],
// //                   autoStart: true,
// //                   loop: true,
// //                 }}
// //               />
// //             </h2>
// //           </div>

// //           {/* Product Layout */}
// //           <motion.div
// //             initial={{ y: 50, opacity: 0 }}
// //             animate={{ y: 0, opacity: 1 }}
// //             transition={{ duration: 0.6 }}
// //             className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
// //           >
// //             {/* Product Image */}
// //             <motion.div
// //               whileHover={{ scale: 1.03 }}
// //               className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-400 dark:hover:shadow-blue-900 transition-all duration-300"
// //             >
// //               <Image
// //                 src={product.image}
// //                 alt={product.name}
// //                 width={800}
// //                 height={800}
// //                 className="w-full object-cover"
// //               />
// //             </motion.div>

// //             {/* Product Info */}
// //             <div className="space-y-4">
// //               <motion.h1
// //                 initial={{ x: -30, opacity: 0 }}
// //                 animate={{ x: 0, opacity: 1 }}
// //                 transition={{ delay: 0.2, duration: 0.6 }}
// //                 className="text-3xl md:text-5xl font-bold"
// //               >
// //                 {product.name}
// //               </motion.h1>

// //               <motion.p
// //                 initial={{ x: -30, opacity: 0 }}
// //                 animate={{ x: 0, opacity: 1 }}
// //                 transition={{ delay: 0.4, duration: 0.6 }}
// //                 className="text-gray-600 dark:text-gray-300"
// //               >
// //                 {product.description}
// //               </motion.p>

// //               <motion.div
// //                 initial={{ scale: 0.9, opacity: 0 }}
// //                 animate={{ scale: 1, opacity: 1 }}
// //                 transition={{ delay: 0.6, duration: 0.5 }}
// //                 className="text-xl font-semibold text-green-600"
// //               >
// //                 মূল্য: ${product.price}
// //               </motion.div>

// //               <div className="text-yellow-500">⭐ রেটিং: {product.rating} / 5</div>

// //               <motion.button
// //                 whileHover={{ scale: 1.05, backgroundColor: '#2563eb' }}
// //                 whileTap={{ scale: 0.95 }}
// //                 transition={{ duration: 0.3 }}
// //                 className="mt-4 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
// //               >
// //                 🛒 কার্টে যুক্ত করুন
// //               </motion.button>
// //             </div>
// //           </motion.div>
// //         </motion.div>
// //       </div>
// //     </>
// //   );
// // }
