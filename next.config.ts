// import type { NextConfig } from "next";
// import withPWA from "next-pwa";

// // মূল Next.js কনফিগ
// const nextConfig: NextConfig = {
//   reactStrictMode: true, // কড়া React মোড
//   images: {
//     domains: ["localhost", "yourdomain.com"], // ইমেজ ডোমেইন অনুমোদিত
//   },
//   experimental: {
//     typedRoutes: true, // নিরাপদ রাউটিং
//   },
//   // SEO & পারফরম্যান্স টিপস
//   poweredByHeader: false, // "X-Powered-By: Next.js" হেডার বন্ধ
//   compress: true, // gzip কমপ্রেশন চালু
//   optimizeFonts: true, // ফন্ট অপ্টিমাইজেশন
//   generateEtags: true, // ক্যাশের জন্য ETag জেনারেট
//   // যদি স্ট্যাটিক এক্সপোর্ট করতে চাও
//   // output: "export",
// };

// // PWA কনফিগ সহ এক্সপোর্ট
// export default withPWA({
//   ...nextConfig,
//   pwa: {
//     dest: "public", // PWA ফাইল public ফোল্ডারে রাখবে
//     register: true, // অটো service worker রেজিস্টার
//     skipWaiting: true, // নতুন ভার্সন সাথে সাথে লোড
//     disable: process.env.NODE_ENV === "development", // ডেভেলপমেন্টে অফ
//   },
// });


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

