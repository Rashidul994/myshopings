'use client';
import { useEffect, useState } from 'react';


const productOptions = [
  { label: '🆕 নতুন পণ্য', value: 'new' },
  { label: '📦 পুরাতন পণ্য', value: 'old' },
  { label: '🔄 এক্সচেঞ্জ করতে চাই', value: 'exchange' },
  { label: '📈 শেয়ার মার্কেট ভিত্তিক', value: 'share' },
];

export default function ProductTypeBangla({ brand, brandname }: { brand?: boolean; brandname?: string }) {


  const [selected, setSelected] = useState<string>('new');  

  const [setvalue, setValues]=useState('new');


  useEffect(() => {
    const selectedOption = productOptions.find((opt) => opt.value === selected);
    if (selectedOption) {
      setValues(selectedOption.value);
localStorage.setItem('oldOrNew', selectedOption.value);    

    }
  }, [selected]);


  return (
    <div className="bg-gradient-to-r from-indigo-900 via-black to-indigo-900 text-white py-6 px-4 rounded-lg shadow-lg">
      {/* 🔘 Radio Selection */}

   
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {productOptions.map((option, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer text-sm md:text-base">
            <input
              type="radio"
              name="product-type"
              value={option.value}
              checked={selected === option.value}
              onChange={() => setSelected(option.value)}
              className="accent-pink-500 w-4 h-4"
            />
            <span className="glow-text">{option.label}</span>
          </label>
        ))}
      </div>

      {/* ✅ Selected Result */}
      <div className="text-center text-white font-medium text-sm md:text-base">
        আপনি নির্বাচন করেছেন:
        <span className="text-pink-400 font-bold ml-2">
          {productOptions.find((opt) => opt.value === selected)?.label}
    
        </span>
      </div>

      {/* 📈 শেয়ার মার্কেট ভিত্তিক ইনফো */}
      {selected === 'share' && (
        <div className="mt-6 bg-black/40 border border-pink-500 rounded-lg p-4 text-center text-sm md:text-base">
          📊 আপনি <span className="text-pink-400 font-bold">শেয়ার মার্কেট ভিত্তিক</span> বিক্রয় পদ্ধতি বেছে নিয়েছেন। 
          <br />পণ্যের মূল্য বাজারের ওঠানামার উপর ভিত্তি করে পরিবর্তিত হবে।
        </div>
      )}
    </div>
  );
}








// // components/Marquee.js
// const marqueeItems = [
//   "🔥 Hot Sale: Up to 70% Off!",
//   "🚚 Free Shipping Worldwide",
//   "💎 Premium Quality Products",
//   "⚡ Limited-Time Offer",
//   "🎁 Buy 1 Get 1 Free ",
// ];

// export default function Marquee({brand,brandname}) {
//   return (
//     <div className="relative overflow-hidden bg-black text-white py-3">
//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none"></div>
    
//       <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-4 text-lg font-medium tracking-wide">
//           {brand}
//         {marqueeItems.map((item, i) => (
//           <span key={i} className="glow-text">
//             {item}
//           </span>
//         ))}
//         {/* Repeat for seamless scroll */}
//         {marqueeItems.map((item, i) => (
//           <span key={`repeat-${i}`} className="glow-text">
//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }
