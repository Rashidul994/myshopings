import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl transition duration-300"
    >
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
      <p className="mt-1 font-bold text-indigo-600">৳ {product.price}</p>
    </motion.div>
  );
}
