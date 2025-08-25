'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { addToCart, getCartCount } from '../../api-local/localapi';
import { ShoppingCart } from 'lucide-react';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fakeProduct = {
      id,
      name: "স্মার্ট ওয়াচ সিরিজ ৮",
      price: 199.99,
      rating: 4.5,
      image: "/watch.jpg",
      description:
        "স্মার্ট ওয়াচ সিরিজ ৮ - ফিটনেস ট্র্যাক করুন, স্মার্ট থাকুন এবং স্টাইলিশ দেখান। আধুনিক প্রযুক্তির অসাধারণ সমন্বয়।",
      brand: "TechPro",
      category: "স্মার্ট ওয়াচ",
    };
    setProduct(fakeProduct);
    setCartCount(getCartCount());
  }, [id]);

  if (!product) return <div className="text-center p-10 text-lg">লোড হচ্ছে...</div>;

  const siteUrl = `https://yourdomain.com/product/${product.id}`;
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: siteUrl + product.image,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      url: siteUrl,
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: 134,
    },
  };

  const toggleLang = () => setLang(lang === 'bn' ? 'en' : 'bn');

  return (
    <>
      <Head>
        <title>{product.name} | আমাদের পণ্য</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`${product.name}, ${product.category}, ${product.brand}, প্রযুক্তি`} />
        <meta name="author" content="Freelancer Rashidul" />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={siteUrl} />
        <link rel="canonical" href={siteUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      </Head>

      <button
        onClick={toggleLang}
        className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md text-sm"
      >
        {lang === 'bn' ? 'EN' : 'BN'}
      </button>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto p-4 md:p-10"
        >
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
              <Typewriter
                options={{
                  strings: lang === 'bn' ? ['প্রোডাক্ট বিবরণী', 'স্মার্ট ওয়াচ কিনুন আজই'] : ['Product Details', 'Buy Smart Watch Today'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-400 dark:hover:shadow-blue-900 transition-all duration-300"
            >
              <Image src={product.image} alt={product.name} width={800} height={800} className="w-full object-cover" />
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold">{product.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
              <div className="text-xl font-semibold text-green-600">মূল্য: ${product.price}</div>
              <div className="text-yellow-500">⭐ রেটিং: {product.rating} / 5</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
                  setCartCount(getCartCount());
                }}
                className="mt-4 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
              >
                🛒 {lang === 'bn' ? 'কার্টে যুক্ত করুন' : 'Add to Cart'}
              </motion.button>
            </div>
          </motion.div>

          {/* Related Products */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold mb-4">{lang === 'bn' ? '⚡ সম্পর্কিত পণ্য' : '⚡ Related Products'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(num => (
                <motion.div key={num} whileHover={{ scale: 1.03 }} className="p-4 border rounded-xl shadow hover:shadow-blue-300 dark:hover:shadow-blue-800 transition">
                  <Image src="/watch.jpg" alt="Related" width={400} height={300} className="rounded-md" />
                  <p className="mt-2 text-sm font-medium">স্মার্ট ওয়াচ {num}</p>
                  <p className="text-green-600 font-semibold">$199.99</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Review Section */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold mb-4">{lang === 'bn' ? '🌟 ব্যবহারকারীদের রিভিউ' : '🌟 Customer Reviews'}</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
                <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
                <p className="text-sm mt-2">"অসাধারণ প্রোডাক্ট! ব্যাটারি লাইফ দুর্দান্ত।"</p>
                <span className="text-xs text-gray-500">– জনি রহমান</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Cart */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}






// 'use client';

// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import Typewriter from 'typewriter-effect';

// export default function ProductPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState<any>(null);

//   useEffect(() => {
//     // এখানে চাইলে fetch(`/api/products/${id}`) করা যাবে
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
//   }, [id]);

//   if (!product) return <div className="text-center p-10 text-lg">লোড হচ্ছে...</div>;

//   const siteUrl = `https://yourdomain.com/product/${product.id}`;
//   const productSchema = {
//     "@context": "https://schema.org/",
//     "@type": "Product",
//     name: product.name,
//     image: siteUrl + product.image,
//     description: product.description,
//     brand: {
//       "@type": "Brand",
//       name: product.brand,
//     },
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
//       reviewCount: 134, // example count
//     },
//   };






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

//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-6xl mx-auto p-4 md:p-10"
//         >
//           {/* Auto Type Title */}
//           <div className="mb-10 text-center">
//             <h2 className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
//               <Typewriter
//                 options={{
//                   strings: ['প্রোডাক্ট বিবরণী', 'স্মার্ট ওয়াচ কিনুন আজই', 'বিশেষ ছাড় চলছে!'],
//                   autoStart: true,
//                   loop: true,
//                 }}
//               />
//             </h2>
//           </div>

//           {/* Product Layout */}
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
//           >
//             {/* Product Image */}
//             <motion.div
//               whileHover={{ scale: 1.03 }}
//               className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-400 dark:hover:shadow-blue-900 transition-all duration-300"
//             >
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={800}
//                 height={800}
//                 className="w-full object-cover"
//               />
//             </motion.div>

//             {/* Product Info */}
//             <div className="space-y-4">
//               <motion.h1
//                 initial={{ x: -30, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.2, duration: 0.6 }}
//                 className="text-3xl md:text-5xl font-bold"
//               >
//                 {product.name}
//               </motion.h1>

//               <motion.p
//                 initial={{ x: -30, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.4, duration: 0.6 }}
//                 className="text-gray-600 dark:text-gray-300"
//               >
//                 {product.description}
//               </motion.p>

//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.6, duration: 0.5 }}
//                 className="text-xl font-semibold text-green-600"
//               >
//                 মূল্য: ${product.price}
//               </motion.div>

//               <div className="text-yellow-500">⭐ রেটিং: {product.rating} / 5</div>

//               <motion.button
//                 whileHover={{ scale: 1.05, backgroundColor: '#2563eb' }}
//                 whileTap={{ scale: 0.95 }}
//                 transition={{ duration: 0.3 }}
//                 className="mt-4 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
//               >
//                 🛒 কার্টে যুক্ত করুন
//               </motion.button>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </>
//   );
// }
