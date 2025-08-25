// 'use client';

// import { useEffect, useState } from 'react';

// export default function DeviceInfo() {
//   const [info, setInfo] = useState({});

//   useEffect(() => {
//     const getInfo = () => {
//       const userAgent = navigator.userAgent;
//       const platform = navigator.platform;
//       const screenWidth = window.screen.width;
//       const screenHeight = window.screen.height;
//       const language = navigator.language;
//       const cores = navigator.hardwareConcurrency;
//       const memory = navigator.deviceMemory || 'Unknown';
//       const touch = navigator.maxTouchPoints > 0 ? 'Yes' : 'No';
//       const deviceType = /Mobi|Android/i.test(userAgent) ? 'Mobile' : 'Desktop/Tablet';

//       setInfo({
//         userAgent,
//         platform,
//         screen: `${screenWidth}x${screenHeight}`,
//         language,
//         deviceType,
//         cores: cores + ' Cores',
//         memory: memory + ' GB RAM',
//         touchSupport: touch,
//       });
//     };

//     getInfo();
//   }, []);

//   return (
//     <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow max-w-xl mx-auto">
//       <h2 className="text-lg font-bold mb-4">📱 Device Information</h2>
//       <ul className="space-y-2 text-sm">
//         {Object.entries(info).map(([key, value]) => (
//           <li key={key} className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-1">
//             <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
//             <span className="font-mono text-blue-600">{value}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default async function handler(req, res) {
//   const ip =
//     req.headers["x-forwarded-for"]?.split(",")[0] ||
//     req.socket?.remoteAddress ||
//     "Unknown";

//   try {
//     const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
//     const geoData = await geoRes.json();

//     res.status(200).json({
//       ip,
//       location: {
//         city: geoData.city,
//         region: geoData.region,
//         country: geoData.country_name,
//         latitude: geoData.latitude,
//         longitude: geoData.longitude,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch location." });
//   }
// }



"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("IP fetch failed:", err));
  }, []);

  console.log('====================================');
  console.log(data);
  console.log('====================================');

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Device Info</h1>
      {data ? (
        <div className="mt-2 space-y-2">
          <p><strong>IP Address:</strong> {data.ip}</p>
          <p><strong>City:</strong> {data.city}</p>
          <p><strong>Region:</strong> {data.region}</p>
          <p><strong>Country:</strong> {data.country_name}</p>
          <p><strong>Org/ISP:</strong> {data.org}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
