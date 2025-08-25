
'use client'
import { Metadata } from 'next'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from './components/Navbar';
import ShopBag from './components/ShopBag';
import Marquee from './marqee/page';
import Loding from './Loding/page';
import Footers from './Footer/page';
import Fs from './bbb/page';
import Api from './api/Api';
import HomepageVAlucup from './Products/HomepageVAlucup';
import Cardsprodut from './Products/Product_get_brand';
import Link from 'next/link';






import { FaBoxOpen } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
// app/page.tsx বা app/home/page.tsx




// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'বাংলার সেরা পণ্য - BanglaShop',
  description: 'বাংলাদেশের সেরা অনলাইন মার্কেটপ্লেস, সেরা দামে সেরা পণ্য। আজই কিনুন!',
  keywords: ['বাংলা ইকমার্স', 'বাংলাদেশ শপিং', 'সেরা পণ্য', 'কম দামে পণ্য', 'অনলাইন মার্কেটপ্লেস'],
  authors: [{ name: 'Rashidul', url: 'https://example.com' }],
  creator: 'Rashidul',
  metadataBase: new URL('https://example.com'),

  openGraph: {
    title: 'বাংলার সেরা পণ্য - BanglaShop',
    description: 'বাংলাদেশের সেরা অনলাইন মার্কেটপ্লেস, সেরা দামে সেরা পণ্য। আজই কিনুন!',
    url: 'https://example.com',
    siteName: 'BanglaShop',
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'বাংলার সেরা পণ্য',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'বাংলার সেরা পণ্য - BanglaShop',
    description: 'বাংলাদেশের সেরা অনলাইন মার্কেটপ্লেস, সেরা দামে সেরা পণ্য। আজই কিনুন!',
    images: ['https://example.com/og-image.jpg'],
  },
}

// ✅ হোম পেজ





export default function Home() {



  const [products, setProducts] = useState<any[]>([]);
  const [brand, setBrand] = useState('');
  const [branNams, setBrnadnms] = useState('');
  const [getBrand, setProducts_brand] = useState<any[]>([]);



  
const [actions_new_old, setAction] =useState<string>('new');

  useEffect(() => {
    const interval = setInterval(() => {
      const current = localStorage.getItem('oldOrNew');
      if (current !== actions_new_old) {
        setAction(current || 'new');
      }
    }, 1000); // প্রতি ১ সেকেন্ডে চেক করবে

    return () => clearInterval(interval);
  }, [actions_new_old]);






  useEffect(() => {
    const fetchData = () => {
      getAllProducts();
      getUserBrandName();
      getUserBrandNameFinal();
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [actions_new_old]);

  const getAllProducts = () => {
    Api.get(`/get_all_product/${actions_new_old}`)
      .then(res => {
        if (!brand) {
          setProducts(res.data.message);
        

                  }
      })
      .catch(err => console.error('❌ Product load error:', err));
  };

  const getUserBrandName = () => {
    Api.get(`/get_all_product_brandName/${brand}/${actions_new_old}`)
      .then(res => {
        setProducts_brand(res.data.message);
        if (brand) setProducts(res.data.message);
      })
      .catch(err => console.error('❌ Brand get error:', err));
  };

  const getUserBrandNameFinal = () => {
    if (!branNams) return;
    Api.get(`/get_all_product_brandName_final/${brand}/${actions_new_old}/${branNams}`)
      .then(res => {
        setProducts_brand(res.data.message);
      })
      .catch(err => console.error('❌ Final brand category error:', err));
  };

  const handleProductClick = (product: any) => {
    if (brand) {
      setBrnadnms(product.brand);
    } else {
      setBrand(product.catagori);
    }
  };

  return (
    <>
    


    <Head>
      <title>home product</title>
  <meta name="robots" content="index, follow" />
  <meta name="language" content="bn" />
  <meta name="author" content="বাংলা ই-কমার্স" />
  <link rel="canonical" href="https://yourdomain.com" />
  <link rel="alternate" hrefLang="bn" href="https://yourdomain.com" />
</Head>
      <Navbar />



  



      <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">

        <Marquee brand={brand} />

        

        <HomepageVAlucup brandname={branNams} Catagoris={brand} />



        {!branNams ? (
         
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
      {products.map((product: any) => (
        <motion.div
          key={product.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleProductClick(product)}
          className="relative group rounded-xl overflow-hidden shadow-md bg-white dark:bg-zinc-900 cursor-pointer transition-all"
        >
          {/* Image Section */}
          <div className="aspect-square overflow-hidden">
            <img
              src={
                product.img
                  ? `http://localhost:8000/uploads_product/${product.img}`
                  : product.imglink
              }
              alt={product.name || 'Product Image'}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Overlay Text */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3">
            <h3 className="text-sm md:text-base font-semibold">
              {brand ? product.brand : product.catagori}
            </h3>
            <Link
              href={`/product-view/${product.id}`}
              className="text-xs text-cyan-300 underline"
            >
              বিস্তারিত দেখুন
            </Link>
          </div>
        </motion.div>
      ))}
    </div>

        ) : (

          <Cardsprodut brand={brand} branName={branNams} old={actions_new_old} />
        )}





{!products && (





<div className="fixed inset-0 z-50 k bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center justify-center"
    >

<div className="flex items-center   justify-center h-screen  from-blue-200 to-green-300 blue:from-red-900 dark:to-gray-100 transition-all duration-500">
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

      </motion.div>
   </div>


)}








        {/* <Fs /> */}
        <Footers />
      </main>
    </>
  );
}

