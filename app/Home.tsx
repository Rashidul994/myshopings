'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBoxOpen } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import Link from 'next/link';

import Marquee from './marqee/page';
import Footers from './Footer/page';
import Api from './api/Api';
import HomepageVAlucup from './Products/HomepageVAlucup';
import Cardsprodut from './Products/Product_get_brand';
import AllInOneNavbar from './components/Navbar';

export default function HomeClient() {
  const [products, setProducts] = useState<any[]>([]);
  const [brand, setBrand] = useState('');
  const [branNams, setBrnadnms] = useState('');
  const [actions_new_old, setAction] = useState<string>('new');
  const [loading, setLoading] = useState(true);

  // LocalStorage Check
  useEffect(() => {
  
      const current = localStorage.getItem('oldOrNew');
      if (current !== actions_new_old) {
        setAction(current || 'new');
      }
  

  
  }, [actions_new_old]);

  // Product Fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllProducts();
      await getUserBrandName();
      await getUserBrandNameFinal();
      setLoading(false);
    };

    fetchData();
    
   
  }, [actions_new_old]);

  const getAllProducts = async () => {
    try {
      const res = await Api.get(`/get_all_product/${actions_new_old}`);
      if (!brand) setProducts(res.data.message);
    } catch (err) {
      console.error('❌ Product load error:', err);
    }
  };

  const getUserBrandName = async () => {
    try {
      const res = await Api.get(`/get_all_product_brandName/${brand}/${actions_new_old}`);
      if (brand) setProducts(res.data.message);
    } catch (err) {
      console.error('❌ Brand get error:', err);
    }
  };

  const getUserBrandNameFinal = async () => {
    if (!branNams) return;
    try {
      const res = await Api.get(`/get_all_product_brandName_final/${brand}/${actions_new_old}/${branNams}`);
      setProducts(res.data.message);
    } catch (err) {
      console.error('❌ Final brand category error:', err);
    }
  };

  const handleProductClick = (product: any) => {
    if (brand) {
      setBrnadnms(product.brand);
    } else {
      setBrand(product.catagori);
    }
  };

  return (
    <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">

<AllInOneNavbar   />


      <Marquee brand={brand} />
      <HomepageVAlucup brandname={branNams} Catagoris={brand} />

      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaBoxOpen className="text-7xl text-indigo-600 dark:text-yellow-400 mb-6" />
            </motion.div>
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-3">
              <Typewriter
                options={{
                  strings: ['পণ্য লোড হচ্ছে...', 'দয়া করে অপেক্ষা করুন...', 'সেরা পণ্য আনছি আপনার জন্য!'],
                  autoStart: true,
                  loop: true,
                  delay: 60,
                }}
              />
            </h1>
          </motion.div>
        </div>
      ) : !branNams ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
          {products.map((product: any) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleProductClick(product)}
              className="relative group rounded-xl overflow-hidden shadow-md bg-white dark:bg-zinc-900 cursor-pointer transition-all"
            >
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
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3">
                <h3 className="text-sm md:text-base font-semibold">
                  {brand ? product.brand : product.catagori}
                </h3>
                <Link href={`/product-view/${product.id}`} className="text-xs text-cyan-300 underline">
                  বিস্তারিত দেখুন
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <Cardsprodut brand={brand} branName={branNams} old={actions_new_old} />
      )}

      <Footers />
    </main>
  );
}


