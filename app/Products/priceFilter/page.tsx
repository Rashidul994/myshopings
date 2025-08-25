import { useState } from 'react';

const allProducts = [
  { id: 1, name: 'T-shirt', category: 'clothing', price: 30 },
  { id: 2, name: 'Headphones', category: 'electronics', price: 90 },
  { id: 3, name: 'Shoes', category: 'clothing', price: 60 },
  { id: 4, name: 'Laptop', category: 'electronics', price: 600 },
  { id: 5, name: 'Cap', category: 'clothing', price: 15 },
];

export default function ProductsPage() {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  
  const filteredProducts = allProducts.filter((product) => {
    const inCategory = category ? product.category === category : true;
    const inPriceRange = priceRange ? (
      (() => {
        const [min, max] = priceRange.split('-').map(Number);
        return product.price >= min && product.price <= max;
      })()
    ) : true;
    return inCategory && inPriceRange;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Filter</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
        </select>

        <select
          onChange={(e) => setPriceRange(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Any Price</option>
          <option value="0-50">$0 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-1000">$100 - $1000</option>
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600 capitalize">{product.category}</p>
            <p className="font-bold">${product.price}</p>
          </div>
        ))}
        {filteredProducts.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
}









