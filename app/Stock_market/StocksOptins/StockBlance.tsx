'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BalanceCard() {
  const [show, setShow] = useState(false);
  const balance = 1270.55;

  return (
    <motion.div
      initial={{ opacity: 0.6, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md flex items-center justify-between"
    >
      <div>
        <h3 className="text-lg font-semibold">💰 Stock Balance</h3>
        <p className="text-2xl font-bold mt-2">
          {show ? `$${balance.toFixed(2)}` : '****'}
        </p>
      </div>
      <button onClick={() => setShow(!show)} className="text-gray-500 hover:text-blue-500">
        {show ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
      </button>
    </motion.div>
  );
}
