'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const data = [
  { month: 'Jan', profit: 500, loss: 200 },
  { month: 'Feb', profit: 300, loss: 100 },
  { month: 'Mar', profit: 800, loss: 0 },
  { month: 'Apr', profit: 400, loss: 300 },
  { month: 'May', profit: 700, loss: 100 },
];

export default function ProfitLossChart() {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">📉 Profit & Loss Chart</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="loss" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="#22c55e"
            fillOpacity={1}
            fill="url(#profit)"
          />
          <Area
            type="monotone"
            dataKey="loss"
            stroke="#ef4444"
            fillOpacity={1}
            fill="url(#loss)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
