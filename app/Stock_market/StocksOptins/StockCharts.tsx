'use client';

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const data = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 50 },
  { name: 'Mar', value: 40 },
  { name: 'Apr', value: 70 },
  { name: 'May', value: 100 },
];

export default function ProfileChart() {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-2">📊 Monthly Activity</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
