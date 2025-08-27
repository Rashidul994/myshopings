
// components/Footer.tsx
"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {QRCodeSVG} from "qrcode.react"; // ✅ QRCode import
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGlobe,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaUserShield,
  FaLock,
  FaUserCheck,
  FaSyncAlt,
  FaEnvelopeOpenText,
} from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-gray-300 pt-12 pb-6 px-6 mt-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Animated Title */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          <TypeAnimation
            sequence={[
              "আমাদের সম্পর্কে",
              1500,
              "যোগাযোগ করুন",
              1500,
              "সোশ্যাল মিডিয়াতে যুক্ত থাকুন",
              1500,
              "সেরা সেবা নিশ্চিতে অঙ্গীকারবদ্ধ",
              1500,
            ]}
            speed={50}
            repeat={Infinity}
            wrapper="span"
          />
        </h2>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* আমাদের সম্পর্কে */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-cyan-500/30 transition duration-300"
        >
          <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
            <FaInfoCircle className="text-cyan-400" /> আমাদের সম্পর্কে
          </h3>
          <p className="text-sm leading-6 text-gray-300">
            আমরা একটি বিশ্বস্ত ই-কমার্স প্রতিষ্ঠান, যেখানে আপনি পাবেন সেরা মানের পণ্য, সহজে ও দ্রুত ডেলিভারির মাধ্যমে।
          </p>
        </motion.div>

        {/* প্রয়োজনীয় লিংক */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-purple-500/30 transition duration-300"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaUserShield className="text-purple-400" /> প্রয়োজনীয় লিংক
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/about-us" className="hover:text-white flex items-center gap-2">
                <FaUserCheck className="text-pink-400" /> আমাদের সম্পর্কে
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-white flex items-center gap-2">
                <FaEnvelopeOpenText className="text-blue-400" /> যোগাযোগ করুন
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white flex items-center gap-2">
                <FaLock className="text-red-400" /> প্রাইভেসি পলিসি
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-white flex items-center gap-2">
                <FaSyncAlt className="text-indigo-400" /> শর্তাবলি
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* যোগাযোগ */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-green-500/30 transition duration-300"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaEnvelope className="text-green-400" /> যোগাযোগ
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-400" />{" "}
              <a href="tel:01784228999" className="hover:underline">
                01784-228999
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-400" />
              <a href="mailto:myshopings@gmail.com" className="hover:underline">
                myshopings@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-400" /> সিরাজগঞ্জ, ঢাকা, বাংলাদেশ
            </li>
          </ul>
        </motion.div>

        {/* QR Code সেকশন */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-yellow-500/30 transition duration-300 flex flex-col items-center"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            📲 আমাদের অ্যাপ
          </h3>
          <QRCodeSVG
            value="https://myshopings.com/app" // ✅ তোমার লিংক বসাও
            size={128}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
       
          />
          <p className="mt-3 text-sm text-gray-400 text-center">
            স্ক্যান করে আমাদের ওয়েবসাইট/অ্যাপ ভিজিট করুন
          </p>
        </motion.div>
      </div>

      {/* Social Media */}
      <div className="max-w-7xl mx-auto mt-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-pink-500/30 transition duration-300"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FaGlobe className="text-pink-400" /> ফলো করুন
          </h3>
          <div className="flex gap-4 text-xl text-white">
            <motion.a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#3b82f6" }}
              className="transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </motion.a>
            <motion.a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#f43f5e" }}
              className="transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#0ea5e9" }}
              className="transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#0e76a8" }}
              className="transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </motion.a>
            <motion.a
              href="https://youtube.com/@myshopingscom?si=59q7Kro_ZEzprhsM"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#dc2626" }}
              className="transition"
              aria-label="YouTube"
            >
              <FaYoutube />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        className="text-center text-sm mt-12 border-t border-gray-700 pt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        © 2022 - {new Date().getFullYear()} আপনার ই-কমার্স | সর্বস্বত্ব সংরক্ষিত
      </motion.div>
    </motion.footer>
  );
};

export default Footer;




// // components/Footer.tsx
// "use client";
// import React from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { TypeAnimation } from "react-type-animation";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaTwitter,
//   FaGlobe,
//   FaLinkedinIn,
//   FaYoutube,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaInfoCircle,
//   FaUserShield,
//   FaLock,
//   FaCookieBite,
//   FaUserCheck,
//   FaSyncAlt,
//   FaEnvelopeOpenText,
// } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <motion.footer
//       className="bg-gray-900 text-gray-300 pt-12 pb-6 px-6 mt-16"
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//     >
//       {/* Animated Title */}
//       <div className="text-center mb-12">
//         <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
//           <TypeAnimation
//             sequence={[
//               "আমাদের সম্পর্কে",
//               1500,
//               "যোগাযোগ করুন",
//               1500,
//               "সোশ্যাল মিডিয়াতে যুক্ত থাকুন",
//               1500,
//               "সেরা সেবা নিশ্চিতে অঙ্গীকারবদ্ধ",
//               1500,
//             ]}
//             speed={50}
//             repeat={Infinity}
//             wrapper="span"
//           />
//         </h2>
//       </div>

//       {/* Grid Section */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
//         {/* আমাদের সম্পর্কে */}
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-cyan-500/30 transition duration-300"
//         >
//           <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
//             <FaInfoCircle className="text-cyan-400" /> আমাদের সম্পর্কে
//           </h3>
//           <p className="text-sm leading-6 text-gray-300">
//             আমরা একটি বিশ্বস্ত ই-কমার্স প্রতিষ্ঠান, যেখানে আপনি পাবেন সেরা মানের পণ্য, সহজে ও দ্রুত ডেলিভারির মাধ্যমে।
//           </p>
//         </motion.div>

//         {/* প্রয়োজনীয় লিংক */}
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-purple-500/30 transition duration-300"
//         >
//           <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
//             <FaUserShield className="text-purple-400" /> প্রয়োজনীয় লিংক
//           </h3>
//           <ul className="space-y-3 text-sm">
//             <li>
//               <Link href="/about-us" className="hover:text-white flex items-center gap-2">
//                 <FaUserCheck className="text-pink-400" /> আমাদের সম্পর্কে
//               </Link>
//             </li>
//             <li>
//               <Link href="/contact-us" className="hover:text-white flex items-center gap-2">
//                 <FaEnvelopeOpenText className="text-blue-400" /> যোগাযোগ করুন
//               </Link>
//             </li>
//             <li>
//               <Link href="/privacy-policy" className="hover:text-white flex items-center gap-2">
//                 <FaLock className="text-red-400" /> প্রাইভেসি পলিসি
//               </Link>
//             </li>
//             <li>
//               <Link href="/terms-and-conditions" className="hover:text-white flex items-center gap-2">
//                 <FaSyncAlt className="text-indigo-400" /> শর্তাবলি
//               </Link>
//             </li>
//           </ul>
//         </motion.div>

//         {/* যোগাযোগ */}
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-green-500/30 transition duration-300"
//         >
//           <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
//             <FaEnvelope className="text-green-400" /> যোগাযোগ
//           </h3>
//           <ul className="space-y-3 text-sm">
//             <li className="flex items-center gap-2">
//               <FaPhoneAlt className="text-green-400" /> 01784-228999
//             </li>
//             <li className="flex items-center gap-2">
//               <FaEnvelope className="text-blue-400" />
//               <a href="mailto:support@yourdomain.com" className="hover:underline">
//               myshopings@gmail.com
//               </a>
//             </li>
//             <li className="flex items-center gap-2">
//               <FaMapMarkerAlt className="text-red-400" /> সিরাজগঞ্জ, ঢাকা, বাংলাদেশ
//             </li>
//           </ul>
//         </motion.div>

//         {/* Social Media */}
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-pink-500/30 transition duration-300"
//         >
//           <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
//             <FaGlobe className="text-pink-400" /> ফলো করুন
//           </h3>
//           <div className="flex gap-4 text-xl text-white">
//             <motion.a
//               href="#"
//               whileHover={{ scale: 1.2, color: "#3b82f6" }}
//               className="transition"
//               aria-label="Facebook"
//             >
//               <FaFacebookF />
//             </motion.a>
//             <motion.a
//               href="#"
//               whileHover={{ scale: 1.2, color: "#f43f5e" }}
//               className="transition"
//               aria-label="Instagram"
//             >
//               <FaInstagram />
//             </motion.a>
//             <motion.a
//               href="#"
//               whileHover={{ scale: 1.2, color: "#0ea5e9" }}
//               className="transition"
//               aria-label="Twitter"
//             >
//               <FaTwitter />
//             </motion.a>
//             <motion.a
//               href="#"
//               whileHover={{ scale: 1.2, color: "#0e76a8" }}
//               className="transition"
//               aria-label="LinkedIn"
//             >
//               <FaLinkedinIn />
//             </motion.a>
//             <motion.a
//               href="https://youtube.com/@myshopingscom?si=59q7Kro_ZEzprhsM"
//               whileHover={{ scale: 1.2, color: "#dc2626" }}
//               className="transition"
//               aria-label="YouTube"
//             >
//               <FaYoutube />
//             </motion.a>
//           </div>
//         </motion.div>
//       </div>

//       {/* Copyright */}
//       <motion.div
//         className="text-center text-sm mt-12 border-t border-gray-700 pt-6"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         2022  © {new Date().getFullYear()} আপনার ই-কমার্স | সর্বস্বত্ব সংরক্ষিত
//       </motion.div>
//     </motion.footer>
//   );
// };

// export default Footer;
