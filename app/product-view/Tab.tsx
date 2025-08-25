// components/Tabs.tsx
import { useState } from 'react';

export default function Tabs({ description, details, reviews }) {
  const [tab, setTab] = useState('description');

  const TabButton = (label: string) => (
    <button
      onClick={() => setTab(label)}
      className={`px-4 py-2 border-b-2 ${
        tab === label ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400'
      }`}
    >
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </button>
  );

  return (
    <div className="mt-6">
      <div className="flex gap-4 border-b">{['description', 'details', 'reviews'].map(TabButton)}</div>

      <div className="mt-4">
        {tab === 'description' && <p>{description}</p>}
        {tab === 'details' && <p>{details}</p>}
        {tab === 'reviews' && (
          <div>
            {reviews.map((rev, i) => (
              <div key={i} className="border p-3 rounded mb-2">

                <div className="font-bold">{rev.name}</div>
                <div className="text-yellow-500">⭐ {rev.rating}</div>
                <p>{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
