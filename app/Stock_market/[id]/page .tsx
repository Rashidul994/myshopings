'use client';

import { useEffect, useRef, useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// শুরুতে ডিফল্ট কোম্পানি ডাটা
const defaultStockData = [
  {
    symbol: 'বেক্সিমকো',
    name_bn: 'বেক্সিমকো লিমিটেড',
    name_en: 'Beximco Ltd',
    volume: 153200,
    rank: 4,
    data: {
      '1d': [125, 125.2, 124.8, 125.1, 125.5],
      '7d': [122, 123.5, 124, 125, 125.5],
      '30d': [110, 115, 120, 123, 125.5],
    },
  },
  {
    symbol: 'স্কয়ার',
    name_bn: 'স্কয়ার ফার্মা',
    name_en: 'Square Pharma',
    volume: 94200,
    rank: 5,
    data: {
      '1d': [288, 288.5, 289, 289.2, 289.7],
      '7d': [285, 286, 287, 288, 289.7],
      '30d': [270, 275, 280, 285, 289.7],
    },
  },
];

// সময় ফ্রেম অপশন
const timeFrames = ['1d', '7d', '30d'];

// ভাষা টেক্সট ম্যাপিং
const texts = {
  bn: {
    stockMarket: 'বাংলাদেশ স্টক মার্কেট',
    marketOpen: '🟢 ওপেন',
    marketClosed: '🔴 বন্ধ',
    marketOpenIn: 'মার্কেট খোলার বাকি:',
    marketCloseIn: 'মার্কেট বন্ধ হতে বাকি:',
    print: '🖨️ প্রিন্ট',
    pdf: '📄 PDF',
    excel: '📊 Excel',
    addCompany: 'নতুন কোম্পানি যোগ করুন',
    editCompany: 'কোম্পানি সম্পাদনা করুন',
    name: 'নাম',
    symbol: 'সিম্বল',
    price: 'মূল্য',
    change: 'পরিবর্তন',
    volume: 'ভলিউম',
    rating: 'রেটিং',
    liveChart: 'লাইভ চার্ট',
    timeframe: { '1d': 'আজ', '7d': '৭ দিন', '30d': '৩০ দিন' },
    save: 'সেভ করুন',
    cancel: 'বাতিল',
    langToggle: 'English এ যান',
    tickerLabel: 'লাইভ মার্কেট: ',
  },
  en: {
    stockMarket: 'Bangladesh Stock Market',
    marketOpen: '🟢 Open',
    marketClosed: '🔴 Closed',
    marketOpenIn: 'Market opens in:',
    marketCloseIn: 'Market closes in:',
    print: '🖨️ Print',
    pdf: '📄 PDF',
    excel: '📊 Excel',
    addCompany: 'Add New Company',
    editCompany: 'Edit Company',
    name: 'Name',
    symbol: 'Symbol',
    price: 'Price',
    change: 'Change',
    volume: 'Volume',
    rating: 'Rating',
    liveChart: 'Live Chart',
    timeframe: { '1d': '1 Day', '7d': '7 Days', '30d': '30 Days' },
    save: 'Save',
    cancel: 'Cancel',
    langToggle: 'বাংলায় যান',
    tickerLabel: 'Live Market: ',
  },
};

export default function BanglaStockMarketFull() {
  const [stocks, setStocks] = useState(defaultStockData);
  const [selectedFrame, setSelectedFrame] = useState('1d');
  const [timeLeft, setTimeLeft] = useState('');
  const [marketOpen, setMarketOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [lang, setLang] = useState('bn');

  const printRef = useRef();

  // মার্কেট টাইম কাউন্টডাউন আপডেট
  useEffect(() => {
    const updateMarketStatus = () => {
      const now = new Date();
      const open = new Date();
      open.setHours(10, 0, 0);
      const close = new Date();
      close.setHours(14, 0, 0);

      if (now < open) {
        const diff = Math.floor((open - now) / 1000);
        setTimeLeft(`${texts[lang].marketOpenIn} ${formatTime(diff)}`);
        setMarketOpen(false);
      } else if (now > close) {
        setTimeLeft(texts[lang].marketClosed);
        setMarketOpen(false);
      } else {
        const diff = Math.floor((close - now) / 1000);
        setTimeLeft(`${texts[lang].marketCloseIn} ${formatTime(diff)}`);
        setMarketOpen(true);
      }
    };
    updateMarketStatus();
    const interval = setInterval(updateMarketStatus, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  // লাইভ ডাটা সিমুলেশন (৫ সেকেন্ডে)
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev =>
        prev.map(stock => {
          const prevData = stock.data[selectedFrame];
          const last = prevData[prevData.length - 1];
          const rand = (Math.random() - 0.5) * 1.5;
          const next = +(last + rand).toFixed(2);
          const newData = [...prevData.slice(1), next];
          return {
            ...stock,
            volume: stock.volume + Math.floor(Math.random() * 500),
            data: { ...stock.data, [selectedFrame]: newData },
          };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedFrame]);

  const formatTime = sec => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h} ঘন্টা ${m} মিনিট ${s} সেকেন্ড`;
  };

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(texts[lang].stockMarket + ' Report', 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [
        [
          texts[lang].name,
          texts[lang].symbol,
          texts[lang].price + ' (৳)',
          texts[lang].change,
          texts[lang].volume,
        ],
      ],
      body: stocks.map(stock => {
        const data = stock.data[selectedFrame];
        const price = data[data.length - 1];
        const change = +(price - data[0]).toFixed(2);
        return [
          lang === 'bn' ? stock.name_bn : stock.name_en,
          stock.symbol,
          price.toFixed(2),
          change.toFixed(2),
          stock.volume,
        ];
      }),
    });
    doc.save('stock-market.pdf');
  };

  // Excel Export
  const exportExcel = () => {
    
    const wb = XLSX.utils.book_new();
    const wsData = [
      [
        texts[lang].name,
        texts[lang].symbol,
        texts[lang].price + ' (৳)',
        texts[lang].change,
        texts[lang].volume,
      ],
      ...stocks.map(stock => {
        const data = stock.data[selectedFrame];
        const price = data[data.length - 1];
        const change = +(price - data[0]).toFixed(2);
        return [
          lang === 'bn' ? stock.name_bn : stock.name_en,
          stock.symbol,
          price.toFixed(2),
          change.toFixed(2),
          stock.volume,
        ];
      }),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'StockMarket');
    XLSX.writeFile(wb, 'stock-market.xlsx');
  };

  // নতুন কোম্পানি অ্যাড করার ফর্ম হ্যান্ডলার
  const startAddCompany = () => {
    setIsEditing(true);
    setEditingIndex(null);
    setEditData({
      symbol: '',
      name_bn: '',
      name_en: '',
      volume: 0,
      rank: 0,
      data: { '1d': [0, 0, 0, 0, 0], '7d': [0, 0, 0, 0, 0], '30d': [0, 0, 0, 0, 0] },
    });
  };

  // কোম্পানি সম্পাদনা শুরু
  const startEditCompany = index => {
    setIsEditing(true);
    setEditingIndex(index);
    setEditData(stocks[index]);
  };

  // কোম্পানি ইনপুট পরিবর্তন
  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: name === 'rank' || name === 'volume' ? +value : value }));
  };

  // ডাটা সেভ
  const saveEdit = () => {
    if (editingIndex !== null) {
      const updatedStocks = [...stocks];
      updatedStocks[editingIndex] = editData;
      setStocks(updatedStocks);
    } else {
      setStocks(prev => [...prev, editData]);
    }
    setIsEditing(false);
    setEditingIndex(null);
  };

  // এডিটিং বাতিল
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingIndex(null);
  };

  // ভাষা টগল
  const toggleLanguage = () => setLang(prev => (prev === 'bn' ? 'en' : 'bn'));

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl">
      {/* হেডার + মার্কেট স্ট্যাটাস */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{texts[lang].stockMarket}</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm"
            title="Change Language"
          >
            {texts[lang].langToggle}
          </button>
          <span
            className={`px-3 py-1 rounded-md font-semibold text-white text-xs ${
              marketOpen ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {marketOpen ? texts[lang].marketOpen : texts[lang].marketClosed}
          </span>
          <span className="text-blue-600 dark:text-blue-300 text-sm">{timeLeft}</span>
        </div>
      </div>

      {/* টাইমফ্রেম + Export Buttons */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <div className="flex gap-2">
          {timeFrames.map(frame => (
            <button
              key={frame}
              onClick={() => setSelectedFrame(frame)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                selectedFrame === frame
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}
            >
              {texts[lang].timeframe[frame]}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
            title={texts[lang].print}
          >
            {texts[lang].print}
          </button>
          <button
            onClick={exportPDF}
            className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            title={texts[lang].pdf}
          >
            {texts[lang].pdf}
          </button>
          <button
            onClick={exportExcel}
            className="bg-green-600 text-white px-3 py-1 rounded-md text-sm"
            title={texts[lang].excel}
          >
            {texts[lang].excel}
          </button>
          <button
            onClick={startAddCompany}
            className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
          >
            {texts[lang].addCompany}
          </button>
        </div>
      </div>

      {/* কোম্পানি এডিট ফর্ম */}
      {isEditing && (
        <div className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-3">
            {editingIndex !== null ? texts[lang].editCompany : texts[lang].addCompany}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="symbol"
              placeholder={texts[lang].symbol}
              value={editData.symbol}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="name_bn"
              placeholder="নাম (বাংলা)"
              value={editData.name_bn}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="name_en"
              placeholder="Name (English)"
              value={editData.name_en}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="volume"
              placeholder={texts[lang].volume}
              value={editData.volume}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="number"
              min="0"
              max="5"
              name="rank"
              placeholder={texts[lang].rating + ' (0-5)'}
              value={editData.rank}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={saveEdit}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              {texts[lang].save}
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              {texts[lang].cancel}
            </button>
          </div>
        </div>
      )}

      {/* স্টক মার্কেট টেবিল */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
              <th className="p-2 text-left">{texts[lang].name}</th>
              <th className="p-2 text-left">{texts[lang].symbol}</th>
              <th className="p-2 text-right">{texts[lang].price}</th>
              <th className="p-2 text-right">{texts[lang].change}</th>
              <th className="p-2 text-right">{texts[lang].volume}</th>
              <th className="p-2 text-center">{texts[lang].rating}</th>
              <th className="p-2 text-center">{texts[lang].liveChart}</th>
              <th className="p-2 text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, i) => {
              const data = stock.data[selectedFrame];
              const price = data[data.length - 1];
              const change = +(price - data[0]).toFixed(2);
              return (
                <tr
                  key={i}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="p-2 font-medium text-gray-800 dark:text-white">
                    {lang === 'bn' ? stock.name_bn : stock.name_en}
                  </td>
                  <td className="p-2 text-gray-600 dark:text-gray-300">{stock.symbol}</td>
                  <td
                    className={`p-2 text-right font-semibold ${
                      change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    ৳ {price.toFixed(2)}
                  </td>
                  <td
                    className={`p-2 text-right font-bold ${
                      change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {change >= 0 ? '+' : ''}
                    {change.toFixed(2)}
                  </td>
                  <td className="p-2 text-right text-gray-700 dark:text-white">{stock.volume}</td>
                  <td className="p-2 text-center text-yellow-400">
                    {'★'.repeat(stock.rank)}{'☆'.repeat(5 - stock.rank)}
                  </td>
                  <td className="p-2 w-[130px]">
                    <ResponsiveContainer width="100%" height={40}>
                      <LineChart data={data.map((v, i) => ({ x: i, y: v }))}>
                        <Line
                          type="monotone"
                          dataKey="y"
                          stroke={change >= 0 ? '#16a34a' : '#dc2626'}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => startEditCompany(i)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* লাইভ মার্কেট টিকার বার */}
      <div className="mt-4 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 py-2 rounded">
        <div className="whitespace-nowrap animate-marquee text-sm text-gray-800 dark:text-white font-semibold">
          <span className="mr-4 font-semibold">{texts[lang].tickerLabel}</span>
          {stocks.map((stock, i) => {
            const data = stock.data[selectedFrame];
            const price = data[data.length - 1];
            const change = +(price - data[0]).toFixed(2);
            return (
              <span key={i} className="mx-6 inline-block">
                {stock.symbol}: ৳{price.toFixed(2)} ({change >= 0 ? '+' : ''}
                {change.toFixed(2)})
              </span>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}




// 'use client';

// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// const stockData = [
//   {
//     symbol: 'AAPL',
//     name: 'Apple Inc.',
//     price: 189.25,
//     change: +2.43,
//     chart: [
//       { time: '9 AM', value: 186 },
//       { time: '10 AM', value: 187 },
//       { time: '11 AM', value: 188 },
//       { time: '12 PM', value: 189 },
//       { time: '1 PM', value: 189.25 },
//     ],
//   },
//   {
//     symbol: 'GOOG',
//     name: 'Alphabet Inc.',
//     price: 2879.50,
//     change: -1.20,
//     chart: [
//       { time: '9 AM', value: 2880 },
//       { time: '10 AM', value: 2878 },
//       { time: '11 AM', value: 2882 },
//       { time: '12 PM', value: 2880 },
//       { time: '1 PM', value: 2879.5 },
//     ],
//   },
// ];

// export default function StockMarketTable() {
//   return (
//     <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">📈 Stock Market Live</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
//               <th className="p-2 text-left">Symbol</th>
//               <th className="p-2 text-left">Name</th>
//               <th className="p-2 text-right">Price</th>
//               <th className="p-2 text-right">Change</th>
//               <th className="p-2 text-center">Chart</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stockData.map((stock, idx) => (
//               <tr
//                 key={idx}
//                 className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
//               >
//                 <td className="p-2 font-medium text-gray-700 dark:text-gray-100">{stock.symbol}</td>
//                 <td className="p-2 text-gray-600 dark:text-gray-300">{stock.name}</td>
//                 <td className="p-2 text-right text-gray-800 dark:text-white">${stock.price.toFixed(2)}</td>
//                 <td
//                   className={`p-2 text-right font-bold ${
//                     stock.change > 0 ? 'text-green-600' : 'text-red-500'
//                   }`}
//                 >
//                   {stock.change > 0 ? '+' : ''}
//                   {stock.change.toFixed(2)}
//                 </td>
//                 <td className="p-2">
//                   <ResponsiveContainer width={120} height={40}>
//                     <LineChart data={stock.chart}>
//                       <Line
//                         type="monotone"
//                         dataKey="value"
//                         stroke={stock.change > 0 ? '#16a34a' : '#dc2626'}
//                         strokeWidth={2}
//                         dot={false}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
