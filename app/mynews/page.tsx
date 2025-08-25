
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Menu, Sun, Moon } from "lucide-react";

// Swiper (slider)
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ------------------------------
// Helpers (Bangla date & digits)
// ------------------------------
const bnDigits: Record<string, string> = {
  "0": "০","1": "১","2": "২","3": "৩","4": "৪","5": "৫","6": "৬","7": "৭","8": "৮","9": "৯",
};
const toBn = (v: string | number) => String(v).replace(/[0-9]/g, (d) => bnDigits[d] ?? d);

function useBanglaDate() {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);
  const weekday = now.toLocaleDateString("bn-BD", { weekday: "long" });
  const date = now.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("bn-BD", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${weekday}, ${date} | ${time}`;
}

// ------------------------------
// Demo Content (replace with API)
// ------------------------------
type News = {
  id: number;
  title: string;
  category: string;
  image: string;
  summary?: string;
};

const heroSlides: News[] = [
  {
    id: 1,
    title: "ঢাকায় গণপরিবহনে নতুন নীতিমালা, যাত্রীসেবায় বড় পরিবর্তন",
    category: "বাংলাদেশ",
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop",
    summary:
      "রুট র‍্যাশনালাইজেশন ও ই-টিকিটিং চালু—যাত্রীভোগান্তি কমাতে উদ্যোগ।",
  },
  {
    id: 2,
    title: "বিশ্বকাপে চমক—শেষ ওভারে রেকর্ড রানচেজ",
    category: "খেলা",
    image:
      "https://images.unsplash.com/photo-1521417531039-94a2f6f9e1b6?q=80&w=1600&auto=format&fit=crop",
    summary:
      "শেষ ৩ বলে ১০ রান—উত্তেজনায় ভাসলো স্টেডিয়াম, উচ্ছ্বাসে ভক্তরা।",
  },
  {
    id: 3,
    title: "স্টার্টআপে নতুন তহবিল—বিনিয়োগ বাড়ছে প্রযুক্তিখাতে",
    category: "প্রযুক্তি",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop",
    summary:
      "সবুজ-প্রযুক্তি ও এআই সল্যুশনে জোর—দেশীয় উদ্ভাবনে গতি আশা।",
  },
];

const sideHeadlines: News[] = [
  {
    id: 11,
    title: "চট্টগ্রাম বন্দরে অটোমেশন, সময় কমবে অর্ধেক",
    category: "বাংলাদেশ",
    image:
      "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 12,
    title: "এআই নীতিমালা প্রকাশ, ডেটা সুরক্ষায় জোর",
    category: "প্রযুক্তি",
    image:
      "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 13,
    title: "বরিশালে বন্যা পরিস্থিতির উন্নতি",
    category: "বাংলাদেশ",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 14,
    title: "রেলে আধুনিক টিকিটিং—অনলাইনে সিট বাছাই",
    category: "বাংলাদেশ",
    image:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?q=80&w=800&auto=format&fit=crop",
  },
];

const latestSeeds: string[] = [
  "বাংলাদেশে নতুন বাজেট অনুমোদন",
  "স্কুল ভর্তি নীতিতে পরিবর্তন",
  "বিশ্ববাজারে জ্বালানি দামের ওঠানামা",
  "এশিয়া কাপে স্কোয়াডে চমক",
  "রাজধানীতে সড়ক নিরাপত্তা সপ্তাহ",
  "ডিজিটাল সার্ভিসে নতুন ফিচার",
  "জলবায়ু সম্মেলনে নতুন প্রতিশ্রুতি",
  "রপ্তানিতে রেকর্ড আয়",
  "নৌপথে নিরাপত্তা জোরদার",
  "স্টার্টআপ এক্সেলারেটর ঘোষণা",
];

const categories: { name: string; items: News[] }[] = [
  {
    name: "বাংলাদেশ",
    items: [
      {
        id: 21,
        title: "বিশ্ববিদ্যালয়ে ভর্তি পরীক্ষায় ডিজিটাল নজরদারি",
        category: "বাংলাদেশ",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
        summary: "প্রশ্নফাঁস রোধে নতুন প্রযুক্তি—পরীক্ষার্থীদের স্বস্তি।",
      },
      {
        id: 22,
        title: "কৃষিতে ড্রিপ সেচ, ফলনে নতুন সম্ভাবনা",
        category: "বাংলাদেশ",
        image:
          "https://images.unsplash.com/photo-1500937386664-56b56c3d3533?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: 23,
        title: "মেট্রোরেলে নতুন কোচ সংযোজন",
        category: "বাংলাদেশ",
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
  {
    name: "আন্তর্জাতিক",
    items: [
      {
        id: 31,
        title: "জলবায়ু তহবিলে নতুন অর্থায়ন",
        category: "আন্তর্জাতিক",
        image:
          "https://images.unsplash.com/photo-1502301197179-65228ab57f78?q=80&w=1200&auto=format&fit=crop",
        summary: "ঝুঁকিপূর্ণ দেশগুলোর অভিযোজন সক্ষমতা বাড়ানো হবে।",
      },
      {
        id: 32,
        title: "প্রযুক্তি জায়ান্টের বড় অধিগ্রহণ",
        category: "আন্তর্জাতিক",
        image:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: 33,
        title: "মধ্যপ্রাচ্যে শান্তি আলোচনায় অগ্রগতি",
        category: "আন্তর্জাতিক",
        image:
          "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
  {
    name: "খেলা",
    items: [
      {
        id: 41,
        title: "টি–টোয়েন্টিতে রেকর্ড রানচেজ",
        category: "খেলা",
        image:
          "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1200&auto=format&fit=crop",
        summary: "শেষ ওভারে নাটকীয় জয়—উন্মাদনা তুঙ্গে!",
      },
      {
        id: 42,
        title: "ফুটবল লিগে নতুন ফরম্যাট",
        category: "খেলা",
        image:
          "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: 43,
        title: "তীরন্দাজিতে স্বর্ণ জিতলেন তারকা",
        category: "খেলা",
        image:
          "https://images.unsplash.com/photo-1531844251246-9c9f8b10d74c?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
];

const popular: News[] = [
  {
    id: 501,
    title: "নারী উদ্যোক্তাদের সাফল্যের গল্প",
    category: "ফিচার",
    image:
      "https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 502,
    title: "বিশ্ববাজারে দামের প্রভাব—অর্থনীতির চ্যালেঞ্জ",
    category: "অর্থনীতি",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 503,
    title: "স্টার্টআপ এক্সেলারেটরের নতুন ব্যাচ",
    category: "প্রযুক্তি",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
];

// ------------------------------
// UI Blocks (single-file components)
// ------------------------------
function TopBar() {
  const dateStr = useBanglaDate();
  return (
    <div className="w-full bg-gray-100 text-gray-700 text-sm dark:bg-neutral-900 dark:text-neutral-300">
      <div className="max-w-6xl mx-auto px-3 py-2 flex items-center justify-between">
        <div className="truncate">{dateStr}</div>
        <div className="flex items-center gap-3">
          <a className="hover:underline" href="#">ই–পেপার</a>
          <span className="hidden sm:inline-block">|</span>
          <a className="hover:underline" href="#">সাবস্ক্রাইব</a>
        </div>
      </div>
    </div>
  );
}

function Header({
  dark,
  setDark,
}: {
  dark: boolean;
  setDark: (v: boolean) => void;
}) {
  return (
    <header className="bg-white/80 backdrop-blur border-b dark:bg-neutral-950/70">
      <div className="max-w-6xl mx-auto px-3 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden rounded border px-2 py-1">
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="text-red-600">দৈনিক</span> আলো
          </div>
          <span className="hidden sm:inline-block text-xs px-2 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
            নিউজ
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center">
            <input
              placeholder="খোঁজ করুন…"
              className="w-56 rounded-l-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-red-500 dark:bg-neutral-900 dark:border-neutral-700"
            />
            <button className="rounded-r-md border border-l-0 border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 dark:border-neutral-700 dark:hover:bg-neutral-900">
              <Search className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className="text-sm border px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-neutral-900 dark:border-neutral-700"
            aria-label="Toggle Dark Mode"
            title="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <nav className="w-full overflow-x-auto border-t dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-3 py-2 flex gap-4 text-sm whitespace-nowrap">
          {[
            "সর্বশেষ",
            "বাংলাদেশ",
            "রাজনীতি",
            "আন্তর্জাতিক",
            "খেলা",
            "প্রযুক্তি",
            "বিনোদন",
            "অর্থনীতি",
            "জীবনযাপন",
          ].map((x, i) => (
            <a
              key={i}
              href="#"
              className="px-3 py-1.5 rounded-full border hover:bg-gray-50 dark:hover:bg-neutral-900 dark:border-neutral-700"
            >
              {x}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

// Hero slider
function HeroSlider() {
  return (
    <section className="max-w-6xl mx-auto px-3 py-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        style={{ borderRadius: 16 }}
      >
        {heroSlides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-[320px] sm:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-0 p-4 sm:p-6"
              >
                <span className="inline-block text-xs px-2 py-1 rounded bg-red-600 text-white">
                  {s.category}
                </span>
                <h1 className="mt-3 text-white text-2xl sm:text-4xl font-bold leading-tight drop-shadow">
                  {s.title}
                </h1>
                {s.summary && (
                  <p className="mt-2 text-white/90 max-w-2xl">{s.summary}</p>
                )}
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

// Live vertical ticker (breaking news)
function BreakingNewsTicker() {
  const [items, setItems] = useState<string[]>(latestSeeds.slice(0, 6));

  // Simulated "live" updates: প্রতি 5 সেকেন্ডে নতুন হেডলাইন সামনে যুক্ত হবে
  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prev) => {
        const next = latestSeeds[Math.floor(Math.random() * latestSeeds.length)];
        const updated = [next, ...prev];
        return updated.slice(0, 10);
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border-y bg-red-600 text-white">
      <div className="max-w-6xl mx-auto px-3 py-2 grid grid-cols-5 gap-3 items-center">
        <div className="col-span-1 text-center text-xs sm:text-sm font-semibold bg-white/15 rounded px-2 py-1">
          ব্রেকিং
        </div>
        <div className="col-span-4">
          <Swiper
            direction="vertical"
            slidesPerView={1}
            loop
            allowTouchMove={false}
            modules={[Autoplay]}
            autoplay={{ delay: 2200, disableOnInteraction: false }}
            style={{ height: 28 }}
          >
            {items.map((txt, i) => (
              <SwiperSlide key={`${txt}-${i}`}>
                <div className="truncate text-sm">{txt}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

function SideList() {
  return (
    <aside className="space-y-6">
      <section>
        <h4 className="text-lg font-bold mb-3 border-b pb-2 dark:border-neutral-800">
          টপ স্টোরিস
        </h4>
        <div className="space-y-4">
          {sideHeadlines.map((n) => (
            <a key={n.id} href="#" className="flex gap-3 group items-start">
              <img
                src={n.image}
                alt={n.title}
                className="w-24 h-20 object-cover rounded border dark:border-neutral-800"
              />
              <div>
                <span className="text-xs text-red-600">{n.category}</span>
                <h5 className="font-medium group-hover:underline leading-snug">
                  {n.title}
                </h5>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h4 className="text-lg font-bold mb-3 border-b pb-2 dark:border-neutral-800">
          জনপ্রিয়
        </h4>
        <div className="space-y-4">
          {popular.map((n) => (
            <a key={n.id} href="#" className="flex gap-3 group items-start">
              <img
                src={n.image}
                alt={n.title}
                className="w-24 h-20 object-cover rounded border dark:border-neutral-800"
              />
              <h5 className="font-medium group-hover:underline leading-snug">
                {n.title}
              </h5>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h4 className="text-lg font-bold mb-3 border-b pb-2 dark:border-neutral-800">
          মতামত
        </h4>
        <div className="space-y-3">
          {[
            "শিক্ষা–সংস্কারে কী দরকার",
            "নগর পরিকল্পনায় নাগরিকের ভূমিকা",
            "স্টার্টআপ নীতিতে ঝুঁকি–সুযোগ",
          ].map((t, i) => (
            <a key={i} href="#" className="block hover:underline">
              • {t}
            </a>
          ))}
        </div>
      </section>
    </aside>
  );
}

function CategoryBlock({ name, items }: { name: string; items: News[] }) {
  const [lead, ...rest] = items;
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{name}</h3>
        <a href="#" className="text-sm text-red-600 hover:underline">
          আরো দেখুন
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* lead */}
        <a href="#" className="col-span-1 sm:col-span-2 group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative rounded-lg overflow-hidden"
          >
            <img
              src={lead.image}
              alt={lead.title}
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
          </motion.div>
          <div className="mt-3">
            <span className="text-xs text-red-600">{lead.category}</span>
            <h4 className="text-xl font-bold group-hover:underline">
              {lead.title}
            </h4>
            {lead.summary && (
              <p className="text-gray-600 dark:text-neutral-300 mt-1">
                {lead.summary}
              </p>
            )}
          </div>
        </a>
        {/* list */}
        <div className="space-y-4">
          {rest.map((n) => (
            <a key={n.id} href="#" className="flex gap-3 group">
              <img
                src={n.image}
                alt={n.title}
                className="w-28 h-20 object-cover rounded-md border dark:border-neutral-800"
              />
              <div>
                <span className="text-xs text-red-600">{n.category}</span>
                <h5 className="font-semibold leading-snug group-hover:underline">
                  {n.title}
                </h5>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestGrid() {
  const latestCards: News[] = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: 100 + i,
        title: `সর্বশেষ: গুরুত্বপূর্ণ আপডেট শিরোনাম ${toBn(i + 1)}`,
        category: i % 3 === 0 ? "বাংলাদেশ" : i % 3 === 1 ? "আন্তর্জাতিক" : "খেলা",
        image:
          i % 3 === 0
            ? "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop"
            : i % 3 === 1
            ? "https://images.unsplash.com/photo-1520981825232-c03be1902a2a?q=80&w=1200&auto=format&fit=crop"
            : "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
      })),
    []
  );

  return (
    <section className="max-w-6xl mx-auto px-3 py-6">
      <h3 className="text-lg font-bold mb-4 border-b pb-2 dark:border-neutral-800">
        সর্বশেষ
      </h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {latestCards.map((n) => (
          <motion.a
            key={n.id}
            href="#"
            className="bg-white dark:bg-neutral-900 rounded-lg border dark:border-neutral-800 hover:shadow transition overflow-hidden"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={n.image}
              alt={n.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <span className="text-xs text-red-600">{n.category}</span>
              <h4 className="font-bold mt-1 leading-snug">{n.title}</h4>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-3 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
        <div>
          <h5 className="font-semibold mb-2">বিভাগ</h5>
          <ul className="space-y-1">
            {["বাংলাদেশ", "খেলা", "আন্তর্জাতিক", "প্রযুক্তি", "বিনোদন"].map(
              (x) => (
                <li key={x}>
                  <a href="#" className="hover:underline">
                    {x}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">সেবা</h5>
          <ul className="space-y-1">
            {["ই–পেপার", "নিউজলেটার", "অ্যাপস", "বিজ্ঞাপন"].map((x) => (
              <li key={x}>
                <a href="#" className="hover:underline">
                  {x}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">তথ্য</h5>
          <ul className="space-y-1">
            {["আমাদের সম্পর্কে", "যোগাযোগ", "গোপনীয়তা নীতি", "শর্তাবলি"].map(
              (x) => (
                <li key={x}>
                  <a href="#" className="hover:underline">
                    {x}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">© কপিরাইট</h5>
          <p>© {toBn(new Date().getFullYear())} দৈনিক আলো</p>
          <p className="text-gray-500 dark:text-neutral-400">
            সব অধিকার সংরক্ষিত
          </p>
        </div>
      </div>
    </footer>
  );
}

// ------------------------------
// Main Page (Single-file)
// ------------------------------
export default function Page() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100">
        <TopBar />
        <Header dark={dark} setDark={setDark} />
        <HeroSlider />
        <BreakingNewsTicker />

        {/* Content with right sidebar */}
        <main className="max-w-6xl mx-auto px-3 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {categories.map((b) => (
              <CategoryBlock key={b.name} name={b.name} items={b.items} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <SideList />
          </div>
        </main>

        <LatestGrid />
        <Footer />
      </div>
    </div>
  );
}




// "use client";
// import React, { useMemo, useState, useEffect } from "react";

// // ------------------------------
// // Helpers (Bangla date & digits)
// // ------------------------------
// const bnDigitsMap: Record<string, string> = {
//   "0": "০","1": "১","2": "২","3": "৩","4": "৪","5": "৫","6": "৬","7": "৭","8": "৮","9": "৯",
// };
// const toBn = (str: string | number) =>
//   String(str).replace(/[0-9]/g, (d) => bnDigitsMap[d] ?? d);

// function useBanglaDate() {
//   const [now, setNow] = useState<Date>(new Date());
//   useEffect(() => {
//     const t = setInterval(() => setNow(new Date()), 60_000);
//     return () => clearInterval(t);
//   }, []);
//   const weekday = now.toLocaleDateString("bn-BD", { weekday: "long" });
//   const date = now.toLocaleDateString("bn-BD", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
//   const time = now.toLocaleTimeString("bn-BD", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   return `${weekday}, ${date} | ${time}`;
// }

// // ------------------------------
// // Dummy News Data (replace with API later)
// // ------------------------------
// type News = {
//   id: number;
//   title: string;
//   category: string;
//   image: string;
//   summary?: string;
// };

// const heroLead: News = {
//   id: 1,
//   title:
//     "ঢাকায় গণপরিবহনে নতুন নীতিমালা, যাত্রীসেবায় আসছে বড় পরিবর্তন",
//   category: "বাংলাদেশ",
//   image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1400&auto=format&fit=crop",
//   summary:
//     "নতুন নীতিমালায় রুট র‍্যাশনালাইজেশনের পাশাপাশি ইলেকট্রনিক টিকিটিং—সব মিলিয়ে যাত্রী ভোগান্তি কমবে বলে আশা।",
// };

// const sideHeadlines: News[] = [
//   {
//     id: 2,
//     title: "ক্রিকেটে ঘুরে দাঁড়াল বাংলাদেশ, সিরিজে সমতা",
//     category: "খেলা",
//     image: "https://images.unsplash.com/photo-1521417531039-94a2f6f9e1b6?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     title: "স্টার্টআপে বিনিয়োগ বাড়ছে, নতুন তহবিল ঘোষণা",
//     category: "অর্থনীতি",
//     image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 4,
//     title: "চট্টগ্রাম বন্দরে অটোমেশন, সময় কমবে অর্ধেক",
//     category: "বাংলাদেশ",
//     image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 5,
//     title: "এআই নীতিমালা প্রকাশ, ডেটা সুরক্ষায় জোর",
//     category: "প্রযুক্তি",
//     image: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 6,
//     title: "বরিশালে বন্যা পরিস্থিতির উন্নতি",
//     category: "বাংলাদেশ",
//     image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
//   },
// ];

// const latest: News[] = Array.from({ length: 12 }).map((_, i) => ({
//   id: 100 + i,
//   title: `সর্বশেষ: গুরুত্বপূর্ণ আপডেট শিরোনাম ${toBn(i + 1)}`,
//   category: i % 3 === 0 ? "বাংলাদেশ" : i % 3 === 1 ? "আন্তর্জাতিক" : "খেলা",
//   image:
//     i % 3 === 0
//       ? "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop"
//       : i % 3 === 1
//       ? "https://images.unsplash.com/photo-1520981825232-c03be1902a2a?q=80&w=1200&auto=format&fit=crop"
//       : "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
// }));

// const categoryBlocks: { name: string; items: News[] }[] = [
//   {
//     name: "বাংলাদেশ",
//     items: [
//       {
//         id: 21,
//         title: "বিশ্ববিদ্যালয়ে ভর্তি পরীক্ষায় ডিজিটাল নজরদারি",
//         category: "বাংলাদেশ",
//         image:
//           "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
//         summary: "প্রশ্নফাঁস রোধে নতুন প্রযুক্তি ব্যবহার হবে—পরীক্ষার্থীদের স্বস্তি।",
//       },
//       {
//         id: 22,
//         title: "কৃষিতে ড্রিপ সেচ, ফলনে নতুন সম্ভাবনা",
//         category: "বাংলাদেশ",
//         image:
//           "https://images.unsplash.com/photo-1500937386664-56b56c3d3533?q=80&w=1200&auto=format&fit=crop",
//       },
//       {
//         id: 23,
//         title: "রেলে মডার্ন টিকিটিং, অনলাইনে সিট বাছাই",
//         category: "বাংলাদেশ",
//         image:
//           "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?q=80&w=1200&auto=format&fit=crop",
//       },
//     ],
//   },
//   {
//     name: "আন্তর্জাতিক",
//     items: [
//       {
//         id: 31,
//         title: "জলবায়ু সম্মেলনে নতুন প্রতিশ্রুতি",
//         category: "আন্তর্জাতিক",
//         image:
//           "https://images.unsplash.com/photo-1502301197179-65228ab57f78?q=80&w=1200&auto=format&fit=crop",
//         summary: "কার্বন নিঃসরণ কমাতে বৈশ্বিক তহবিল—ঝুঁকিপূর্ণ দেশগুলো উপকৃত হবে।",
//       },
//       {
//         id: 32,
//         title: "প্রযুক্তি জায়ান্টদের নতুন অধিগ্রহণ",
//         category: "আন্তর্জাতিক",
//         image:
//           "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
//       },
//       {
//         id: 33,
//         title: "মধ্যপ্রাচ্যে শান্তি আলোচনায় অগ্রগতি",
//         category: "আন্তর্জাতিক",
//         image:
//           "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop",
//       },
//     ],
//   },
//   {
//     name: "খেলা",
//     items: [
//       {
//         id: 41,
//         title: "টি–টোয়েন্টিতে রেকর্ড রানচেজ",
//         category: "খেলা",
//         image:
//           "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1200&auto=format&fit=crop",
//         summary: "শেষ ওভারে নাটকীয় জয়ে উচ্ছ্বাস—দর্শকদের উন্মাদনা তুঙ্গে।",
//       },
//       {
//         id: 42,
//         title: "ফুটবলে ঘরোয়া লিগে নতুন ফরম্যাট",
//         category: "খেলা",
//         image:
//           "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
//       },
//       {
//         id: 43,
//         title: "তীরন্দাজিতে সাফল্য, স্বর্ণ জিতলেন তারকা",
//         category: "খেলা",
//         image:
//           "https://images.unsplash.com/photo-1531844251246-9c9f8b10d74c?q=80&w=1200&auto=format&fit=crop",
//       },
//     ],
//   },
// ];

// const popular: News[] = [
//   {
//     id: 501,
//     title: "মেট্রোরেল রুট সম্প্রসারণে নতুন ধাপ",
//     category: "বাংলাদেশ",
//     image:
//       "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 502,
//     title: "বিশ্ববাজারে জ্বালানি দামের ওঠানামা",
//     category: "অর্থনীতি",
//     image:
//       "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 503,
//     title: "স্টার্টআপ এক্সেলারেটরের নতুন ব্যাচ ঘোষণা",
//     category: "প্রযুক্তি",
//     image:
//       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 504,
//     title: "নারী উদ্যোক্তাদের সাফল্যের গল্প",
//     category: "ফিচার",
//     image:
//       "https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?q=80&w=1200&auto=format&fit=crop",
//   },
// ];

// // ------------------------------
// // Mini UI Elements (in-page components)
// // ------------------------------
// function TopInfoBar() {
//   const dateStr = useBanglaDate();
//   return (
//     <div className="w-full bg-gray-100 text-gray-700 text-sm">
//       <div className="max-w-6xl mx-auto px-3 py-2 flex items-center justify-between">
//         <div className="truncate">{dateStr}</div>
//         <div className="flex items-center gap-3">
//           <a className="hover:underline" href="#">ই–পেপার</a>
//           <span className="hidden sm:inline-block">|</span>
//           <a className="hover:underline" href="#">আবহাওয়া</a>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Header({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
//   return (
//     <header className="border-b">
//       <div className="max-w-6xl mx-auto px-3 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
//             <span className="text-red-600">দৈনিক</span> আলো
//           </div>
//           <span className="hidden sm:inline-block text-xs px-2 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
//             নিউজ
//           </span>
//         </div>
//         <div className="flex items-center gap-2 sm:gap-3">
//           <div className="hidden md:flex items-center">
//             <input
//               placeholder="খোঁজ করুন…"
//               className="w-56 rounded-l-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-red-500"
//             />
//             <button className="rounded-r-md border border-l-0 border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">
//               সার্চ
//             </button>
//           </div>
//           <button
//             onClick={() => setDark(!dark)}
//             className="text-sm border px-3 py-2 rounded-md hover:bg-gray-50"
//             aria-label="Toggle Dark Mode"
//           >
//             {dark ? "লাইট" : "ডার্ক"}
//           </button>
//         </div>
//       </div>
//       <nav className="w-full overflow-x-auto border-t">
//         <div className="max-w-6xl mx-auto px-3 py-2 flex gap-4 text-sm whitespace-nowrap">
//           {["সর্বশেষ", "বাংলাদেশ", "রাজনীতি", "আন্তর্জাতিক", "খেলা", "প্রযুক্তি", "বিনোদন", "অর্থনীতি", "জীবনযাপন"].map(
//             (x, i) => (
//               <a
//                 key={i}
//                 href="#"
//                 className="px-3 py-1.5 rounded-full border hover:bg-gray-50"
//               >
//                 {x}
//               </a>
//             )
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

// function Hero() {
//   return (
//     <section className="max-w-6xl mx-auto px-3 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Lead */}
//       <article className="lg:col-span-2">
//         <div className="relative rounded-lg overflow-hidden">
//           <img
//             src={heroLead.image}
//             alt={heroLead.title}
//             className="w-full h-64 sm:h-96 object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
//           <div className="absolute bottom-0 p-4 sm:p-6">
//             <span className="inline-block text-xs px-2 py-1 rounded bg-red-600 text-white">
//               {heroLead.category}
//             </span>
//             <h1 className="mt-3 text-white text-2xl sm:text-4xl font-bold leading-tight drop-shadow">
//               {heroLead.title}
//             </h1>
//             <p className="mt-2 text-white/90 max-w-2xl">{heroLead.summary}</p>
//           </div>
//         </div>
//       </article>

//       {/* Side headlines */}
//       <aside className="space-y-4">
//         <h3 className="text-lg font-bold border-b pb-2">টপ স্টোরিস</h3>
//         <div className="space-y-4">
//           {sideHeadlines.map((n) => (
//             <a
//               key={n.id}
//               href="#"
//               className="flex gap-3 group items-start"
//               title={n.title}
//             >
//               <img
//                 src={n.image}
//                 alt={n.title}
//                 className="w-28 h-20 object-cover rounded-md border"
//               />
//               <div>
//                 <span className="text-xs text-red-600">{n.category}</span>
//                 <h4 className="font-semibold leading-snug group-hover:underline">
//                   {n.title}
//                 </h4>
//               </div>
//             </a>
//           ))}
//         </div>
//       </aside>
//     </section>
//   );
// }

// function Ticker() {
//   return (
//     <div className="border-y bg-red-50/60">
//       <div className="max-w-6xl mx-auto px-3 py-2 flex gap-6 overflow-x-auto text-sm">
//         {latest.slice(0, 10).map((n) => (
//           <a key={n.id} href="#" className="min-w-max hover:underline">
//             <span className="px-2 py-0.5 rounded bg-red-600 text-white text-xs mr-2">
//               লাইভ
//             </span>
//             {n.title}
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }

// function CategoryBlock({
//   name,
//   items,
// }: {
//   name: string;
//   items: News[];
// }) {
//   const [lead, ...rest] = items;
//   return (
//     <section className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-bold">{name}</h3>
//         <a href="#" className="text-sm text-red-600 hover:underline">
//           আরো দেখুন
//         </a>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         {/* lead */}
//         <a href="#" className="col-span-1 sm:col-span-2 group">
//           <div className="relative rounded-lg overflow-hidden">
//             <img
//               src={lead.image}
//               alt={lead.title}
//               className="w-full h-56 object-cover"
//             />
//           </div>
//           <div className="mt-3">
//             <span className="text-xs text-red-600">{lead.category}</span>
//             <h4 className="text-xl font-bold group-hover:underline">
//               {lead.title}
//             </h4>
//             {lead.summary && (
//               <p className="text-gray-600 mt-1">{lead.summary}</p>
//             )}
//           </div>
//         </a>
//         {/* list */}
//         <div className="space-y-4">
//           {rest.map((n) => (
//             <a key={n.id} href="#" className="flex gap-3 group">
//               <img
//                 src={n.image}
//                 alt={n.title}
//                 className="w-28 h-20 object-cover rounded-md border"
//               />
//               <div>
//                 <span className="text-xs text-red-600">{n.category}</span>
//                 <h5 className="font-semibold leading-snug group-hover:underline">
//                   {n.title}
//                 </h5>
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function LatestGrid() {
//   return (
//     <section className="max-w-6xl mx-auto px-3 py-6">
//       <h3 className="text-lg font-bold mb-4 border-b pb-2">সর্বশেষ</h3>
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {latest.map((n) => (
//           <a
//             key={n.id}
//             href="#"
//             className="bg-white rounded-lg border hover:shadow transition overflow-hidden"
//           >
//             <img
//               src={n.image}
//               alt={n.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <span className="text-xs text-red-600">{n.category}</span>
//               <h4 className="font-bold mt-1 leading-snug">{n.title}</h4>
//             </div>
//           </a>
//         ))}
//       </div>
//     </section>
//   );
// }

// function SidebarRight() {
//   return (
//     <aside className="space-y-6">
//       <section>
//         <h4 className="text-lg font-bold mb-3 border-b pb-2">জনপ্রিয়</h4>
//         <div className="space-y-4">
//           {popular.map((n) => (
//             <a key={n.id} href="#" className="flex gap-3 group items-start">
//               <img
//                 src={n.image}
//                 alt={n.title}
//                 className="w-24 h-20 object-cover rounded border"
//               />
//               <h5 className="font-medium group-hover:underline">{n.title}</h5>
//             </a>
//           ))}
//         </div>
//       </section>

//       <section>
//         <h4 className="text-lg font-bold mb-3 border-b pb-2">মতামত</h4>
//         <div className="space-y-3">
//           {[
//             "শিক্ষা–সংস্কারে কী দরকার",
//             "নগর পরিকল্পনায় নাগরিকের ভূমিকা",
//             "স্টার্টআপ নীতিতে ঝুঁকি–সুযোগ",
//           ].map((t, i) => (
//             <a key={i} href="#" className="block hover:underline">
//               • {t}
//             </a>
//           ))}
//         </div>
//       </section>
//     </aside>
//   );
// }

// function PhotoStrip() {
//   const photos = [
//     "https://images.unsplash.com/photo-1520975922299-2f4f0f0d6df1?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1200&auto=format&fit=crop",
//   ];
//   return (
//     <section className="max-w-6xl mx-auto px-3 py-8">
//       <h3 className="text-lg font-bold mb-4">ছবিতে দিন</h3>
//       <div className="flex gap-4 overflow-x-auto">
//         {photos.map((src, i) => (
//           <img
//             key={i}
//             src={src}
//             alt={`gallery-${i}`}
//             className="h-40 sm:h-52 rounded-lg object-cover border"
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// function Footer() {
//   return (
//     <footer className="mt-10 border-t">
//       <div className="max-w-6xl mx-auto px-3 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
//         <div>
//           <h5 className="font-semibold mb-2">বিভাগ</h5>
//           <ul className="space-y-1">
//             {["বাংলাদেশ", "খেলা", "আন্তর্জাতিক", "প্রযুক্তি", "বিনোদন"].map((x) => (
//               <li key={x}>
//                 <a href="#" className="hover:underline">{x}</a>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h5 className="font-semibold mb-2">সেবা</h5>
//           <ul className="space-y-1">
//             {["ই–পেপার", "নিউজলেটার", "অ্যাপস", "বিজ্ঞাপন"].map((x) => (
//               <li key={x}><a href="#" className="hover:underline">{x}</a></li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h5 className="font-semibold mb-2">তথ্য</h5>
//           <ul className="space-y-1">
//             {["আমাদের সম্পর্কে", "যোগাযোগ", "গোপনীয়তা নীতি", "শর্তাবলি"].map((x) => (
//               <li key={x}><a href="#" className="hover:underline">{x}</a></li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h5 className="font-semibold mb-2">© কপিরাইট</h5>
//           <p>© {toBn(new Date().getFullYear())} দৈনিক আলো</p>
//           <p className="text-gray-500">সব অধিকার সংরক্ষিত</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// // ------------------------------
// // Main Page (Single-file layout)
// // ------------------------------
// export default function Page() {
//   const [dark, setDark] = useState(false);

//   return (
//     <div className={dark ? "dark" : ""}>
//       <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100">
//         <TopInfoBar />
//         <Header dark={dark} setDark={setDark} />
//         <Hero />
//         <Ticker />

//         {/* Main content with right sidebar */}
//         <main className="max-w-6xl mx-auto px-3 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-10">
//             {categoryBlocks.map((b) => (
//               <CategoryBlock key={b.name} name={b.name} items={b.items} />
//             ))}
//           </div>
//           <div className="lg:col-span-1">
//             <SidebarRight />
//           </div>
//         </main>

//         <PhotoStrip />
//         <LatestGrid />
//         <Footer />
//       </div>
//     </div>
//   );
// }


