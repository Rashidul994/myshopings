// pages/terms-and-conditions.tsx
"use client";
import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FaGavel,
  FaRegListAlt,
  FaHandshake,
  FaShieldAlt,
  FaUserTimes,
  FaHistory,
  FaEnvelopeOpenText,
} from "react-icons/fa";

// Type definition
type Section = {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
};

const sections: Section[] = [
  {
    title: "ব্যবহারের শর্তাবলি",
    description:
      "আমাদের ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলিতে সম্মত হচ্ছেন। যদি আপনি এই শর্তাবলিতে সম্মত না হন, তাহলে অনুগ্রহ করে সাইটটি ব্যবহার করবেন না।",
    icon: <FaGavel className="text-xl text-blue-500" />,
  },
  {
    title: "সেবার পরিসর",
    description:
      "আমরা আমাদের প্ল্যাটফর্মের মাধ্যমে পণ্য, তথ্য ও গ্রাহকসেবা প্রদান করি। আমাদের সেবার পরিসর পরিবর্তন, স্থগিত বা বন্ধ করার অধিকার আমাদের রয়েছে।",
    icon: <FaRegListAlt className="text-xl text-green-500" />,
  },
  {
    title: "ব্যবহারকারীর দায়িত্ব",
    description:
      "আপনি সাইটে প্রদত্ত তথ্য সঠিকভাবে প্রদান করবেন এবং অবৈধ কার্যক্রম থেকে বিরত থাকবেন।",
    icon: <FaHandshake className="text-xl text-yellow-500" />,
  },
  {
    title: "বাধ্যতামূলক নিরাপত্তা",
    description:
      "আমরা আপনার তথ্য সুরক্ষায় সর্বোচ্চ প্রচেষ্টা করি, তবে ইন্টারনেটের মাধ্যমে সম্পূর্ণ নিরাপত্তা নিশ্চিত করা সম্ভব নয়।",
    icon: <FaShieldAlt className="text-xl text-red-500" />,
  },
  {
    title: "অ্যাকাউন্ট বাতিলকরণ",
    description:
      "যদি কেউ আমাদের নীতিমালা ভঙ্গ করেন, তাহলে আমরা তার অ্যাকাউন্ট বাতিল করার অধিকার রাখি।",
    icon: <FaUserTimes className="text-xl text-purple-500" />,
  },
  {
    title: "শর্তাবলির পরিবর্তন",
    description:
      "আমরা যেকোনো সময় এই শর্তাবলি পরিবর্তন করতে পারি এবং পরিবর্তনের তথ্য এই পেজে হালনাগাদ করা হবে।",
    icon: <FaHistory className="text-xl text-indigo-500" />,
  },
  {
    title: "যোগাযোগ",
    description: (
      <>
        শর্তাবলি সম্পর্কে আরও জানতে আমাদের সাথে যোগাযোগ করুন:{" "}
        <a
          href="mailto:support@yourdomain.com"
          className="text-blue-500 hover:underline"
        >
          support@yourdomain.com
        </a>
      </>
    ),
    icon: <FaEnvelopeOpenText className="text-xl text-pink-500" />,
  },
];

const TermsAndConditions = () => {
  return (
    <>
      <Head>
        <title>ব্যবহারের শর্তাবলি | আমাদের নিয়মনীতি</title>
        <meta
          name="description"
          content="এই পেজে আমাদের সাইট ব্যবহারের শর্তাবলি, দায়িত্ব, অধিকার এবং নিরাপত্তা নীতিমালা বিস্তারিতভাবে বর্ণনা করা হয়েছে।"
        />
      </Head>

      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-gray-800 dark:text-gray-100">
        {/* Hero with Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent mb-4">
            <TypeAnimation
              sequence={[
                "ব্যবহারের শর্তাবলি",
                1500,
                "আমাদের নিয়মনীতি",
                1500,
                "নিরাপদ ব্যবহারের গাইডলাইন",
                1500,
              ]}
              speed={50}
              repeat={Infinity}
              wrapper="span"
            />
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            এই পেজে আমাদের সাইট ব্যবহারের শর্তাবলি, দায়িত্ব, অধিকার এবং নিরাপত্তা নীতিমালা বিস্তারিতভাবে বর্ণনা করা হয়েছে।
          </p>
        </motion.div>

        {/* Content Sections */}
        <section className="space-y-10">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-2xl transition duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                {section.icon}
                <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {section.description}
              </p>
            </motion.div>
          ))}
        </section>
      </main>
    </>
  );
};

export default TermsAndConditions;


