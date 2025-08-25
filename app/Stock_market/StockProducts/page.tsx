'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign } from 'lucide-react';

const mockProducts = [
  {
    id: 1,
    name: 'Eco Solar Light',
    currentPrice: 18.5,
    availableStock: 120,
  },
  {
    id: 2,
    name: 'Bamboo Brush',
    currentPrice: 5.2,
    availableStock: 300,
  },
  {
    id: 3,
    name: 'Reusable Bottle',
    currentPrice: 12.8,
    availableStock: 80,
  },
];

export default function StockMarketProduct() {
  const [investments, setInvestments] = useState({});
  const [confirmed, setConfirmed] = useState({});

  const handleInput = (id, value) => {
    setInvestments({ ...investments, [id]: value });
  };

  const handleConfirm = (id) => {
    setConfirmed({ ...confirmed, [id]: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0.6, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-bold">📦 Stock Market Products</h2>
      {mockProducts.map((product) => (
        <div
          key={product.id}
          className="border border-gray-200 dark:border-gray-800 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0"
        >
          <div>
            <h4 className="text-lg font-semibold">{product.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              💵 Price: ${product.currentPrice} | 📦 Stock: {product.availableStock}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <input
              type="number"
              placeholder="Investment Amount ($)"
              className="px-3 py-2 rounded border dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              value={investments[product.id] || ''}
              onChange={(e) => handleInput(product.id, e.target.value)}
            />

            {!confirmed[product.id] ? (
              <button
                onClick={() => handleConfirm(product.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Confirm Stock
              </button>
            ) : (
              <button
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                <CreditCard className="w-4 h-4" />
                Proceed to Payment
              </button>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
