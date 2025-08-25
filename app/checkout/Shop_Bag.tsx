// components/FixedCartBag.tsx
'use client';
import { useState, useEffect } from 'react';
import { FaShoppingBag } from 'react-icons/fa';

export default function FixedCartBag() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // আপনি এখানে localStorage বা API থেকে item count আনতে পারেন
    const storedItems = JSON.parse(localStorage.getItem("cartItems") || '[]');
    setItemCount(storedItems.length);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="relative">
        <button
          className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg p-3 rounded-full hover:scale-110 transition-transform duration-300"
          aria-label="Shopping Bag"
        >
          <FaShoppingBag className="text-2xl text-gray-800 dark:text-white" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
