import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';
import Product3DViewer from '@/components/Product3DViewer';

const products = [
  { name: '3D Headphone', price: 3500, image: '/images/product1.jpg', category: 'Electronics' },
  { name: 'Smart Watch', price: 2200, image: '/images/product2.jpg', category: 'Gadgets' },
];

const categories = ['All', 'Electronics', 'Gadgets', 'Fashion', 'Home'];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
        <Sidebar categories={categories} />

        <div className="md:col-span-3 space-y-6">
          <Product3DViewer />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
