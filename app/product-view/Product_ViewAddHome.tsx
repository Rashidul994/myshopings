







// app/top-products/page.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";

const top10Products = [
  { id: 1, name: "Luxury Watch", price: "$329", image: "/product/watch.jpg" },
  { id: 2, name: "Gaming Headset", price: "$199", image: "/product/headphone.jpg" },
  { id: 3, name: "VR Pro Max", price: "$399", image: "/product/vr.jpg" },
  { id: 4, name: "Wireless Mouse", price: "$59", image: "/product/mouse.jpg" },
  { id: 5, name: "Fitness Tracker", price: "$89", image: "/product/fit.jpg" },
  { id: 6, name: "4K Drone", price: "$599", image: "/product/drone.jpg" },
  { id: 7, name: "Smartphone X", price: "$799", image: "/product/phone.jpg" },
  { id: 8, name: "Bluetooth Speaker", price: "$49", image: "/product/speaker.jpg" },
  { id: 9, name: "Tablet Pro", price: "$699", image: "/product/tablet.jpg" },
  { id: 10, name: "Smart Glasses", price: "$179", image: "/product/glasses.jpg" },
];

export default function TopProductsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-800 px-4 md:px-10 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white tracking-tight">
        🌟 Top 10 Best-Selling Products
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {top10Products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <div
              onClick={() => setSelectedImage(product.image)}
              className="cursor-pointer group rounded-t-2xl overflow-hidden relative border-2 border-transparent hover:border-blue-500 hover:shadow-[0_0_14px_3px_#3b82f6] transition-all duration-300"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{product.price}</p>

              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  <ShoppingCart size={16} />
                  Add
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 py-2 rounded-lg text-sm font-medium transition"
                >
                  <Eye size={16} />
                  View
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Image View Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-full max-h-full rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
