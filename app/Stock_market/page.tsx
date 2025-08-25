'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import Image from 'next/image';
import CountUp from 'react-countup';

const user = {
  name: 'রাশিদুল ইসলাম',
  email: 'rashidul@example.com',
  phone: '017xxxxxxxx',
  dob: '1995-06-15',
  balance: 32500.75,
  avatar: '/profile.png',
  chartData: [5000, 10000, 20000, 25000, 30000, 32500],
  notifications: [
    { msg: 'আপনার ব্যালেন্স আপডেট হয়েছে', time: '১ মিনিট আগে' },
    { msg: 'নতুন লগইন সনাক্ত করা হয়েছে', time: '১০ মিনিট আগে' },
  ],
};

export default function ProfileDashboard() {
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [editMode, setEditMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profile, setProfile] = useState(user);
  const [notiOpen, setNotiOpen] = useState(false);
  const [walletModal, setWalletModal] = useState<'topup' | 'withdraw' | null>(null);
  const [amount, setAmount] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [password, setPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [languagePref, setLanguagePref] = useState<'bn' | 'en'>(lang);

  const texts = {
    bn: {
      profile: 'প্রোফাইল', email: 'ইমেইল', phone: 'ফোন', dob: 'জন্ম তারিখ',
      balance: 'ব্যালেন্স', chart: 'ব্যালেন্স চার্ট',
      edit: 'সম্পাদনা করুন', save: 'সেভ করুন', cancel: 'বাতিল করুন',
      settings: 'সেটিংস', toggleLang: 'English', notifications: 'নোটিফিকেশন',
      topup: 'টপ-আপ করুন', withdraw: 'উত্তোলন করুন', amount: 'অ্যামাউন্ট লিখুন',
      darkMode: 'ডার্ক মোড', changePassword: 'পাসওয়ার্ড পরিবর্তন', newPassword: 'নতুন পাসওয়ার্ড',
      notificationPref: 'নোটিফিকেশন সক্রিয়/নিষ্ক্রিয় করুন', languagePref: 'ভাষা পছন্দ',
    },
    en: {
      profile: 'Profile', email: 'Email', phone: 'Phone', dob: 'Date of Birth',
      balance: 'Balance', chart: 'Balance Chart',
      edit: 'Edit Profile', save: 'Save', cancel: 'Cancel',
      settings: 'Settings', toggleLang: 'বাংলা', notifications: 'Notifications',
      topup: 'Top-up', withdraw: 'Withdraw', amount: 'Enter Amount',
      darkMode: 'Dark Mode', changePassword: 'Change Password', newPassword: 'New Password',
      notificationPref: 'Enable/Disable Notifications', languagePref: 'Language Preference',
    },
  };

  const t = texts[lang];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleWalletAction = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      const newBalance = walletModal === 'topup'
        ? profile.balance + value
        : profile.balance - value;
      setProfile(prev => ({ ...prev, balance: newBalance }));
      setAmount('');
      setWalletModal(null);
    }
  };

  const handleSettingsSave = () => {
    setLang(languagePref);
    setSettingsOpen(false);
    setEditMode(false);
    // এখানে চাইলে পাসওয়ার্ড পরিবর্তন API কল যুক্ত করতে পারো
    setPassword('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.profile}</h2>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            {t.toggleLang}
          </button>
          <div className="relative">
            <button onClick={() => setNotiOpen(!notiOpen)} className="relative">
              <span className="text-xl">🔔</span>
              {user.notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                  {user.notifications.length}
                </span>
              )}
            </button>
            {notiOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md p-3 z-10"
              >
                <h4 className="font-semibold mb-2 text-gray-700 dark:text-white">{t.notifications}</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300">
                  {user.notifications.map((n, i) => (
                    <li key={i} className="mb-1">
                      • {n.msg} <span className="text-xs text-gray-400">({n.time})</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
        <Image src={profile.avatar} alt="Avatar" width={100} height={100} className="rounded-full border" />
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{profile.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t.email}: {profile.email}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t.phone}: {profile.phone}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t.dob}: {profile.dob}</p>
        </div>
      </div>

      <motion.div
        className="bg-green-100 dark:bg-green-800 p-5 rounded-md text-center mb-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <p className="text-xl font-bold text-green-700 dark:text-green-200">
          {t.balance}: ৳ <CountUp end={profile.balance} duration={1.5} separator="," decimals={2} />
        </p>
        <div className="mt-3 flex justify-center gap-3">
          <button onClick={() => setWalletModal('topup')} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">{t.topup}</button>
          <button onClick={() => setWalletModal('withdraw')} className="bg-red-600 text-white px-3 py-1 rounded text-sm">{t.withdraw}</button>
        </div>
      </motion.div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t.chart}</h4>
        <div className="w-full h-52 bg-white dark:bg-gray-800 p-3 rounded shadow">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={profile.chartData.map((v, i) => ({ x: i, y: v }))}>
              <Line type="monotone" dataKey="y" stroke="#4ade80" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {t.edit}
        </button>
        <button
          onClick={() => {
            setSettingsOpen(!settingsOpen);
            setEditMode(false);
          }}
          className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded"
        >
          {t.settings}
        </button>
      </div>

      {/* Edit Profile Form */}
      {editMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 border rounded bg-gray-50 dark:bg-gray-800"
        >
          <h4 className="font-bold mb-4 text-gray-800 dark:text-white">{t.edit}</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" />
            <input name="email" value={profile.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded" />
            <input name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" className="p-2 border rounded" />
            <input name="dob" value={profile.dob} onChange={handleChange} type="date" className="p-2 border rounded" />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={() => setEditMode(false)} className="bg-green-600 text-white px-4 py-2 rounded">{t.save}</button>
            <button onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded">{t.cancel}</button>
          </div>
        </motion.div>
      )}

      {/* Settings Panel */}
      {settingsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-6 border rounded bg-gray-50 dark:bg-gray-800"
        >
          <h4 className="font-bold mb-4 text-gray-800 dark:text-white">{t.settings}</h4>

          <div className="flex flex-col gap-4">
            {/* Dark Mode Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="w-5 h-5"
              />
              <span className="text-gray-700 dark:text-gray-300">{t.darkMode}</span>
            </label>

            {/* Change Password */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">{t.changePassword}</label>
              <input
                type="password"
                placeholder={t.newPassword}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="p-2 border rounded w-full"
              />
            </div>

            {/* Notifications Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="w-5 h-5"
              />
              <span className="text-gray-700 dark:text-gray-300">{t.notificationPref}</span>
            </label>

            {/* Language Preference */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">{t.languagePref}</label>
              <select
                value={languagePref}
                onChange={e => setLanguagePref(e.target.value as 'bn' | 'en')}
                className="p-2 border rounded w-full"
              >
                <option value="bn">বাংলা</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="flex gap-3 mt-4 justify-end">
              <button onClick={handleSettingsSave} className="bg-green-600 text-white px-4 py-2 rounded">
                {t.save}
              </button>
              <button onClick={() => setSettingsOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                {t.cancel}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Wallet Modal */}
      {walletModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-lg w-80 shadow-lg"
          >
            <h3 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">
              {walletModal === 'topup' ? t.topup : t.withdraw}
            </h3>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder={t.amount}
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end gap-3">
              <button onClick={handleWalletAction} className="bg-green-600 text-white px-4 py-1 rounded">
                {t.save}
              </button>
              <button onClick={() => setWalletModal(null)} className="bg-gray-500 text-white px-4 py-1 rounded">
                {t.cancel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}




// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { LineChart, Line, ResponsiveContainer } from 'recharts';
// import Image from 'next/image';
// import Head from 'next/head';

// const user = {
//   name: 'রাশিদুল ইসলাম',
//   email: 'rashidul@example.com',
//   balance: 32500.75,
//   avatar: '/profile.png',
//   chartData: [5000, 10000, 20000, 25000, 30000, 32500],
// };

// export default function ProfilePage() {
//   const [lang, setLang] = useState<'bn' | 'en'>('bn');

//   const texts = {
//     bn: {
//       profile: 'প্রোফাইল',
//       email: 'ইমেইল',
//       balance: 'ব্যালেন্স',
//       edit: 'সম্পাদনা করুন',
//       chart: 'ব্যালেন্স চার্ট',
//       settings: 'সেটিংস',
//       toggleLang: 'English',
//     },
//     en: {
//       profile: 'Profile',
//       email: 'Email',
//       balance: 'Balance',
//       edit: 'Edit Profile',
//       chart: 'Balance Chart',
//       settings: 'Settings',
//       toggleLang: 'বাংলা',
//     },
//   };

//   const t = texts[lang];

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
//       <Head>
//         <title>{t.profile} - {user.name}</title>
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               '@context': 'https://schema.org',
//               '@type': 'Person',
//               name: user.name,
//               email: user.email,
//             }),
//           }}
//         />
//       </Head>

//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.profile}</h2>
//         <button
//           onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
//           className="px-3 py-1 bg-indigo-600 text-white rounded"
//         >
//           {t.toggleLang}
//         </button>
//       </div>

//       <div className="flex items-center gap-4 mb-6">
//         <Image
//           src={user.avatar}
//           alt="Profile"
//           width={80}
//           height={80}
//           className="rounded-full border"
//         />
//         <div>
//           <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h3>
//           <p className="text-sm text-gray-600 dark:text-gray-400">{t.email}: {user.email}</p>
//         </div>
//       </div>

//       <motion.div
//         className="bg-green-100 dark:bg-green-800 p-4 rounded-md text-center mb-6"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <p className="text-xl font-bold text-green-700 dark:text-green-300">
//           {t.balance}: ৳{' '}
//           <motion.span
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//           >
//             {user.balance.toLocaleString()}
//           </motion.span>
//         </p>
//       </motion.div>

//       <div className="mb-6">
//         <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t.chart}</h4>
//         <div className="w-full h-48 bg-white dark:bg-gray-800 p-2 rounded shadow-sm">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={user.chartData.map((v, i) => ({ x: i, y: v }))}>
//               <Line
//                 type="monotone"
//                 dataKey="y"
//                 stroke="#4ade80"
//                 strokeWidth={2}
//                 dot={false}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="flex justify-end gap-3">
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">{t.edit}</button>
//         <button className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded">
//           {t.settings}
//         </button>
//       </div>
//     </div>
//   );
// }



// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { LineChart, Line, ResponsiveContainer } from 'recharts';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import * as XLSX from 'xlsx';

// // শুরুতে ডিফল্ট কোম্পানি ডাটা
// const defaultStockData = [
//   {
//     symbol: 'বেক্সিমকো',
//     name_bn: 'বেক্সিমকো লিমিটেড',
//     name_en: 'Beximco Ltd',
//     volume: 153200,
//     rank: 4,
//     data: {
//       '1d': [125, 125.2, 124.8, 125.1, 125.5],
//       '7d': [122, 123.5, 124, 125, 125.5],
//       '30d': [110, 115, 120, 123, 125.5],
//     },
//   },
//   {
//     symbol: 'স্কয়ার',
//     name_bn: 'স্কয়ার ফার্মা',
//     name_en: 'Square Pharma',
//     volume: 94200,
//     rank: 5,
//     data: {
//       '1d': [288, 288.5, 289, 289.2, 289.7],
//       '7d': [285, 286, 287, 288, 289.7],
//       '30d': [270, 275, 280, 285, 289.7],
//     },
//   },
// ];

// // সময় ফ্রেম অপশন
// const timeFrames = ['1d', '7d','7d', '30d'];

// // ভাষা টেক্সট ম্যাপিং
// const texts = {
//   bn: {
//     stockMarket: 'বাংলাদেশ স্টক মার্কেট',
//     marketOpen: '🟢 ওপেন',
//     marketClosed: '🔴 বন্ধ',
//     marketOpenIn: 'মার্কেট খোলার বাকি:',
//     marketCloseIn: 'মার্কেট বন্ধ হতে বাকি:',
//     print: '🖨️ প্রিন্ট',
//     pdf: '📄 PDF',
//     excel: '📊 Excel',
//     addCompany: 'নতুন কোম্পানি যোগ করুন',
//     editCompany: 'কোম্পানি সম্পাদনা করুন',
//     name: 'নাম',
//     symbol: 'সিম্বল',
//     price: 'মূল্য',
//     change: 'পরিবর্তন',
//     volume: 'ভলিউম',
//     rating: 'রেটিং',
//     liveChart: 'লাইভ চার্ট',
//     timeframe: { '1d': 'আজ', '7d': '৭ দিন', '30d': '৩০ দিন' },
//     save: 'সেভ করুন',
//     cancel: 'বাতিল',
//     langToggle: 'English এ যান',
//     tickerLabel: 'লাইভ মার্কেট: ',
//   },
//   en: {
//     stockMarket: 'Bangladesh Stock Market',
//     marketOpen: '🟢 Open',
//     marketClosed: '🔴 Closed',
//     marketOpenIn: 'Market opens in:',
//     marketCloseIn: 'Market closes in:',
//     print: '🖨️ Print',
//     pdf: '📄 PDF',
//     excel: '📊 Excel',
//     addCompany: 'Add New Company',
//     editCompany: 'Edit Company',
//     name: 'Name',
//     symbol: 'Symbol',
//     price: 'Price',
//     change: 'Change',
//     volume: 'Volume',
//     rating: 'Rating',
//     liveChart: 'Live Chart',
//     timeframe: { '1d': '1 Day', '7d': '7 Days', '30d': '30 Days' },
//     save: 'Save',
//     cancel: 'Cancel',
//     langToggle: 'বাংলায় যান',
//     tickerLabel: 'Live Market: ',
//   },
// };

// export default function BanglaStockMarketFull() {
//   const [stocks, setStocks] = useState(defaultStockData);
//   const [selectedFrame, setSelectedFrame] = useState('1d');
//   const [timeLeft, setTimeLeft] = useState('');
//   const [marketOpen, setMarketOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editData, setEditData] = useState({});
//   const [lang, setLang] = useState('bn');

//   const printRef = useRef();

//   // মার্কেট টাইম কাউন্টডাউন আপডেট
//   useEffect(() => {
//     const updateMarketStatus = () => {
//       const now = new Date();
//       const open = new Date();
//       open.setHours(10, 0, 0);
//       const close = new Date();
//       close.setHours(14, 0, 0);

//       if (now < open) {
//         const diff = Math.floor((open - now) / 1000);
//         setTimeLeft(`${texts[lang].marketOpenIn} ${formatTime(diff)}`);
//         setMarketOpen(false);
//       } else if (now > close) {
//         setTimeLeft(texts[lang].marketClosed);
//         setMarketOpen(false);
//       } else {
//         const diff = Math.floor((close - now) / 1000);
//         setTimeLeft(`${texts[lang].marketCloseIn} ${formatTime(diff)}`);
//         setMarketOpen(true);
//       }
//     };
//     updateMarketStatus();
//     const interval = setInterval(updateMarketStatus, 1000);
//     return () => clearInterval(interval);
//   }, [lang]);

//   // লাইভ ডাটা সিমুলেশন (৫ সেকেন্ডে)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStocks(prev =>
//         prev.map(stock => {
//           const prevData = stock.data[selectedFrame];
//           const last = prevData[prevData.length - 1];
//           const rand = (Math.random() - 0.5) * 1.5;
//           const next = +(last + rand).toFixed(2);
//           const newData = [...prevData.slice(1), next];
//           return {
//             ...stock,
//             volume: stock.volume + Math.floor(Math.random() * 500),
//             data: { ...stock.data, [selectedFrame]: newData },
//           };
//         })
//       );
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [selectedFrame]);

//   const formatTime = sec => {
//     const h = Math.floor(sec / 3600);
//     const m = Math.floor((sec % 3600) / 60);
//     const s = sec % 60;
//     return `${h} ঘন্টা ${m} মিনিট ${s} সেকেন্ড`;
//   };

//   // PDF Export
//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text(texts[lang].stockMarket + ' Report', 14, 15);
//     autoTable(doc, {
//       startY: 20,
//       head: [
//         [
//           texts[lang].name,
//           texts[lang].symbol,
//           texts[lang].price + ' (৳)',
//           texts[lang].change,
//           texts[lang].volume,
//         ],
//       ],
//       body: stocks.map(stock => {
//         const data = stock.data[selectedFrame];
//         const price = data[data.length - 1];
//         const change = +(price - data[0]).toFixed(2);
//         return [
//           lang === 'bn' ? stock.name_bn : stock.name_en,
//           stock.symbol,
//           price.toFixed(2),
//           change.toFixed(2),
//           stock.volume,
//         ];
//       }),
//     });
//     doc.save('stock-market.pdf');
//   };

//   // Excel Export
//   const exportExcel = () => {
    
//     const wb = XLSX.utils.book_new();
//     const wsData = [
//       [
//         texts[lang].name,
//         texts[lang].symbol,
//         texts[lang].price + ' (৳)',
//         texts[lang].change,
//         texts[lang].volume,
//       ],
//       ...stocks.map(stock => {
//         const data = stock.data[selectedFrame];
//         const price = data[data.length - 1];
//         const change = +(price - data[0]).toFixed(2);
//         return [
//           lang === 'bn' ? stock.name_bn : stock.name_en,
//           stock.symbol,
//           price.toFixed(2),
//           change.toFixed(2),
//           stock.volume,
//         ];
//       }),
//     ];
//     const ws = XLSX.utils.aoa_to_sheet(wsData);
//     XLSX.utils.book_append_sheet(wb, ws, 'StockMarket');
//     XLSX.writeFile(wb, 'stock-market.xlsx');
//   };

//   // নতুন কোম্পানি অ্যাড করার ফর্ম হ্যান্ডলার
//   const startAddCompany = () => {
//     setIsEditing(true);
//     setEditingIndex(null);
//     setEditData({
//       symbol: '',
//       name_bn: '',
//       name_en: '',
//       volume: 0,
//       rank: 0,
//       data: { '1d': [0, 0, 0, 0, 0], '7d': [0, 0, 0, 0, 0], '30d': [0, 0, 0, 0, 0] },
//     });
//   };

//   // কোম্পানি সম্পাদনা শুরু
//   const startEditCompany = index => {
//     setIsEditing(true);
//     setEditingIndex(index);
//     setEditData(stocks[index]);
//   };

//   // কোম্পানি ইনপুট পরিবর্তন
//   const handleInputChange = e => {
//     const { name, value } = e.target;
//     setEditData(prev => ({ ...prev, [name]: name === 'rank' || name === 'volume' ? +value : value }));
//   };

//   // ডাটা সেভ
//   const saveEdit = () => {
//     if (editingIndex !== null) {
//       const updatedStocks = [...stocks];
//       updatedStocks[editingIndex] = editData;
//       setStocks(updatedStocks);
//     } else {
//       setStocks(prev => [...prev, editData]);
//     }
//     setIsEditing(false);
//     setEditingIndex(null);
//   };

//   // এডিটিং বাতিল
//   const cancelEdit = () => {
//     setIsEditing(false);
//     setEditingIndex(null);
//   };

//   // ভাষা টগল
//   const toggleLanguage = () => setLang(prev => (prev === 'bn' ? 'en' : 'bn'));

//   return (
//     <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl">
//       {/* হেডার + মার্কেট স্ট্যাটাস */}
//       <div className="flex flex-wrap justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{texts[lang].stockMarket}</h2>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={toggleLanguage}
//             className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm"
//             title="Change Language"
//           >
//             {texts[lang].langToggle}
//           </button>
//           <span
//             className={`px-3 py-1 rounded-md font-semibold text-white text-xs ${
//               marketOpen ? 'bg-green-600' : 'bg-red-600'
//             }`}
//           >
//             {marketOpen ? texts[lang].marketOpen : texts[lang].marketClosed}
//           </span>
//           <span className="text-blue-600 dark:text-blue-300 text-sm">{timeLeft}</span>
//         </div>
//       </div>

//       {/* টাইমফ্রেম + Export Buttons */}
//       <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
//         <div className="flex gap-2">
//           {timeFrames.map(frame => (
//             <button
//               key={frame}
//               onClick={() => setSelectedFrame(frame)}
//               className={`px-3 py-1 rounded-md text-sm font-medium ${
//                 selectedFrame === frame
//                   ? 'bg-green-600 text-white'
//                   : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
//               }`}
//             >
//               {texts[lang].timeframe[frame]}
//             </button>
//           ))}
//         </div>

//         <div className="flex gap-2">
//           <button
//             onClick={() => window.print()}
//             className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
//             title={texts[lang].print}
//           >
//             {texts[lang].print}
//           </button>
//           <button
//             onClick={exportPDF}
//             className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
//             title={texts[lang].pdf}
//           >
//             {texts[lang].pdf}
//           </button>
//           <button
//             onClick={exportExcel}
//             className="bg-green-600 text-white px-3 py-1 rounded-md text-sm"
//             title={texts[lang].excel}
//           >
//             {texts[lang].excel}
//           </button>
//           <button
//             onClick={startAddCompany}
//             className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
//           >
//             {texts[lang].addCompany}
//           </button>
//         </div>
//       </div>

//       {/* কোম্পানি এডিট ফর্ম */}
//       {isEditing && (
//         <div className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-800">
//           <h3 className="text-lg font-semibold mb-3">
//             {editingIndex !== null ? texts[lang].editCompany : texts[lang].addCompany}
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <input
//               type="text"
//               name="symbol"
//               placeholder={texts[lang].symbol}
//               value={editData.symbol}
//               onChange={handleInputChange}
//               className="p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="name_bn"
//               placeholder="নাম (বাংলা)"
//               value={editData.name_bn}
//               onChange={handleInputChange}
//               className="p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="name_en"
//               placeholder="Name (English)"
//               value={editData.name_en}
//               onChange={handleInputChange}
//               className="p-2 border rounded"
//             />
//             <input
//               type="number"
//               name="volume"
//               placeholder={texts[lang].volume}
//               value={editData.volume}
//               onChange={handleInputChange}
//               className="p-2 border rounded"
//             />
//             <input
//               type="number"
//               min="0"
//               max="5"
//               name="rank"
//               placeholder={texts[lang].rating + ' (0-5)'}
//               value={editData.rank}
//               onChange={handleInputChange}
//               className="p-2 border rounded"
//             />
//           </div>
//           <div className="mt-4 flex gap-2">
//             <button
//               onClick={saveEdit}
//               className="bg-green-600 text-white px-4 py-2 rounded-md"
//             >
//               {texts[lang].save}
//             </button>
//             <button
//               onClick={cancelEdit}
//               className="bg-gray-400 text-white px-4 py-2 rounded-md"
//             >
//               {texts[lang].cancel}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* স্টক মার্কেট টেবিল */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm border border-gray-300 rounded-md">
//           <thead>
//             <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
//               <th className="p-2 text-left">{texts[lang].name}</th>
//               <th className="p-2 text-left">{texts[lang].symbol}</th>
//               <th className="p-2 text-right">{texts[lang].price}</th>
//               <th className="p-2 text-right">{texts[lang].change}</th>
//               <th className="p-2 text-right">{texts[lang].volume}</th>
//               <th className="p-2 text-center">{texts[lang].rating}</th>
//               <th className="p-2 text-center">{texts[lang].liveChart}</th>
//               <th className="p-2 text-center">Edit</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stocks.map((stock, i) => {
//               const data = stock.data[selectedFrame];
//               const price = data[data.length - 1];
//               const change = +(price - data[0]).toFixed(2);
//               return (
//                 <tr
//                   key={i}
//                   className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
//                 >
//                   <td className="p-2 font-medium text-gray-800 dark:text-white">
//                     {lang === 'bn' ? stock.name_bn : stock.name_en}
//                   </td>
//                   <td className="p-2 text-gray-600 dark:text-gray-300">{stock.symbol}</td>
//                   <td
//                     className={`p-2 text-right font-semibold ${
//                       change >= 0 ? 'text-green-600' : 'text-red-600'
//                     }`}
//                   >
//                     ৳ {price.toFixed(2)}
//                   </td>
//                   <td
//                     className={`p-2 text-right font-bold ${
//                       change >= 0 ? 'text-green-600' : 'text-red-600'
//                     }`}
//                   >
//                     {change >= 0 ? '+' : ''}
//                     {change.toFixed(2)}
//                   </td>
//                   <td className="p-2 text-right text-gray-700 dark:text-white">{stock.volume}</td>
//                   <td className="p-2 text-center text-yellow-400">
//                     {'★'.repeat(stock.rank)}{'☆'.repeat(5 - stock.rank)}
//                   </td>
//                   <td className="p-2 w-[130px]">
//                     <ResponsiveContainer width="100%" height={40}>
//                       <LineChart data={data.map((v, i) => ({ x: i, y: v }))}>
//                         <Line
//                           type="monotone"
//                           dataKey="y"
//                           stroke={change >= 0 ? '#16a34a' : '#dc2626'}
//                           strokeWidth={2}
//                           dot={false}
//                         />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </td>
//                   <td className="p-2 text-center">
//                     <button
//                       onClick={() => startEditCompany(i)}
//                       className="text-blue-600 hover:underline"
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* লাইভ মার্কেট টিকার বার */}
//       <div className="mt-4 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 py-2 rounded">
//         <div className="whitespace-nowrap animate-marquee text-sm text-gray-800 dark:text-white font-semibold">
//           <span className="mr-4 font-semibold">{texts[lang].tickerLabel}</span>
//           {stocks.map((stock, i) => {
//             const data = stock.data[selectedFrame];
//             const price = data[data.length - 1];
//             const change = +(price - data[0]).toFixed(2);
//             return (
//               <span key={i} className="mx-6 inline-block">
//                 {stock.symbol}: ৳{price.toFixed(2)} ({change >= 0 ? '+' : ''}
//                 {change.toFixed(2)})
//               </span>
//             );
//           })}
//         </div>
//       </div>

//       <style jsx>{`
//         .animate-marquee {
//           display: inline-block;
//           animation: marquee 25s linear infinite;
//         }
//         @keyframes marquee {
//           0% {
//             transform: translateX(100%);
//           }
//           100% {
//             transform: translateX(-100%);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }








// import LiveProductValue from './StocksOptins/Stock_Live';
// import ProfileChart from './StocksOptins/StockCharts';
// import ProfitBalcnse from './StocksOptins/StockBlance';
// import Profile from './StocksOptins/ProfitsCharts';


// export default function ProfilePage() {
//   return (
//     // <div className="space-y-6 px-4 py-6 max-w-4xl mx-auto">
//     //   <h1 className="text-2xl font-bold">👤 Profile Overview</h1>
//     //   <LiveProductValue />
//     //   <ProfileChart />
//     // </div>
  
//  <div className="px-4 py-6 max-w-5xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">📊 Dashboard</h1>
   
//    <ProfitBalcnse />    
//       <ProfileChart />
//       <LiveProductValue />
//       <Profile />
//     </div>


// );
// }
