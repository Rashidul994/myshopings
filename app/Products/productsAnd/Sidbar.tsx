export default function Sidebar({ categories = [] }) {
  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat, i) => (
          <li key={i} className="cursor-pointer hover:text-indigo-500 transition">
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}
