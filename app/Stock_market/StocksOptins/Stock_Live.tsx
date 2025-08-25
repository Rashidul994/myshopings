'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const sampleProducts = [
  { name: 'Eco Bag', price: 10 },
  { name: 'Solar Light', price: 20 },
  { name: 'Bamboo Brush', price: 15 },
];

export default function LiveProductValue() {
  const [products, setProducts] = useState(sampleProducts);

  useEffect(() => {
    const interval = setInterval(() => {
      setProducts((prev) =>
        prev.map((p) => {
          const change = Math.random() > 0.5 ? 1 : -1;
          const newPrice = parseFloat((p.price + change * Math.random()).toFixed(2));
          return {
            ...p,
            price: newPrice > 0 ? newPrice : 1,
            direction: change,
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-900 shadow space-y-4">
      <h2 className="text-lg font-bold mb-2">📈 Live Product Value</h2>
      {products.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.4, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded"
        >
          <span>{p.name}</span>
          <div className="flex items-center gap-2">
            <span className={`font-bold ${p.direction > 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${p.price}
            </span>
            {p.direction > 0 ? (
              <ArrowUpRight className="text-green-500 w-4 h-4" />
            ) : (
              <ArrowDownRight className="text-red-500 w-4 h-4" />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
