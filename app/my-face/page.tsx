// import type { Metadata } from "next";
// import Home from "./Messangert";



// export const metadata: Metadata = {
//   title: "my-face.com  || Home page ",
//   description:
//     "বাংলাদেশের সেরা অনলাইন শপ - এখানে পাবেন পোশাক, ইলেকট্রনিক্স, গ্যাজেট, এবং আরও অনেক কিছু।",
//   alternates: {
//     canonical: "https://yourdomain.com/",
//   },
//   openGraph: {
//     title: "হোম - My eCommerce Website",
//     description:
//       "বাংলাদেশের সেরা অনলাইন শপ - পোশাক, ইলেকট্রনিক্স, গ্যাজেট এবং আরও অনেক কিছু।",
//     url: "https://yourdomain.com/",
//     images: [
//       {
//         url: "https://yourdomain.com/home-og.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Home Page Preview",
//       },
//     ],
//   },
// };

// export default function HomePage() {
//   return (
//     <main>
//     <Home />
//      <p>সেরা দামে অনলাইনে পণ্য কিনুন।</p>
//     </main>
//   );
// }



"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  RefreshCw,
  Gamepad2,
  PenSquare,
  AppWindow,
  Newspaper,
  Landmark,
  Rocket,
  Search,
  Sun,
  Moon,
  ArrowUpRight,
} from "lucide-react";

// ---- Utility small components ----
const IconWrap = ({ children }) => (
  <div className="h-12 w-12 grid place-items-center rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-sm">
    {children}
  </div>
);

const Tag = ({ children }) => (
  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/10">
    {children}
  </span>
);

const Card = ({ item }) => {
  return (
    <motion.div
      layout
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="group relative rounded-3xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm backdrop-blur-xl overflow-hidden"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
        background:
          "radial-gradient(600px circle at var(--x) var(--y), rgba(59,130,246,.10), transparent 40%)",
      }} />

      <Link href={item.href} className="block p-6 md:p-7 lg:p-8">
        <div className="flex items-center gap-4">
          <IconWrap>
            {item.icon}
          </IconWrap>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                {item.title}
              </h3>
              {item.tag && <Tag>{item.tag}</Tag>}
            </div>
            <p className="mt-1 text-sm md:text-base text-black/60 dark:text-white/70">
              {item.desc}
            </p>
          </div>
          <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Badges */}
        {item.badges?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.badges.map((b, i) => (
              <Tag key={i}>{b}</Tag>
            ))}
          </div>
        ) : null}
      </Link>
    </motion.div>
  );
};

export default function HomeHub() {
  const [q, setQ] = useState("");
  const [dark, setDark] = useState(false);

  React.useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const items = useMemo(
    () => [
      {
        key: "new",
        title: "নতুন পণ্য কিনুন",
        desc: "সর্বশেষ, অরিজিনাল ও গ্যারান্টিযুক্ত পণ্য দেখুন ও কিনুন।",
        href: "/shop/new",
        icon: <ShoppingBag className="h-6 w-6" />,
        tag: "New Arrivals",
        badges: ["ইলেকট্রনিক্স", "ফ্যাশন", "অফার"],
      },
      {
        key: "used",
        title: "পুরাতন/ব্যবহৃত পণ্য",
        desc: "ব্যবহৃত অথচ ভালো কন্ডিশনের পণ্য বিক্রি/কিনুন।",
        href: "/shop/used",
        icon: <RefreshCw className="h-6 w-6" />,
        tag: "Buy & Sell",
        badges: ["রিফার্বিশড", "বাজেট", "এক্সচেঞ্জ"],
      },
      {
        key: "games",
        title: "গেম খেলুন",
        desc: "দারুন ও মজার ওয়েব গেমস—মোবাইল ও পিসি রেসপন্সিভ!",
        href: "/games",
        icon: <Gamepad2 className="h-6 w-6" />,
        tag: "Play Now",
        badges: ["Arcade", "Puzzle", "Speed"],
      },
      {
        key: "post",
        title: "পোস্ট করুন",
        desc: "কমিউনিটিতে আপনার ভাবনা, টিপস, রিভিউ ও ছবি শেয়ার করুন।",
        href: "/posts/new",
        icon: <PenSquare className="h-6 w-6" />,
        tag: "Community",
        badges: ["রিভিউ", "টিউটোরিয়াল", "ঘোষণা"],
      },
      {
        key: "apps",
        title: "অ্যাপ ক্রয়-বিক্রয়",
        desc: "রেডিমেড অ্যাপ/সোর্সকোড কিনুন বা আপনারটি বিক্রি করুন।",
        href: "/apps/market",
        icon: <AppWindow className="h-6 w-6" />,
        tag: "Marketplace",
        badges: ["Next.js", "Laravel", "Mobile"],
      },
      {
        key: "news",
        title: "খবর পড়ুন",
        desc: "দেশ-বিদেশের নির্ভরযোগ্য সর্বশেষ খবর এক জায়গায়।",
        href: "/news",
        icon: <Newspaper className="h-6 w-6" />,
        tag: "Trending",
        badges: ["জাতীয়", "টেক", "খেলা"],
      },
      {
        key: "gov",
        title: "সরকারি ওয়েবসাইট সমূহ",
        desc: "সব সরকারি গুরুত্বপূর্ণ সাইট—এক ক্লিকে অ্যাক্সেস।",
        href: "/gov/links",
        icon: <Landmark className="h-6 w-6" />,
        tag: "Gov Portal",
        badges: ["সেবাসমূহ", "শিক্ষা", "স্বাস্থ্য"],
      },
      {
        key: "more",
        title: "আরও ফিচার",
        desc: "ইভেন্ট, অফার, কুপন, হেল্প সেন্টার ও আরও অনেক কিছু।",
        href: "/more",
        icon: <Rocket className="h-6 w-6" />,
        tag: "Explore",
        badges: ["কুপন", "ইভেন্ট", "হেল্প"],
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      (it) =>
        it.title.toLowerCase().includes(s) ||
        it.desc.toLowerCase().includes(s) ||
        it.badges?.some((b) => b.toLowerCase().includes(s))
    );
  }, [q, items]);

  // pointer glow position handler
  const handleGlow = (e) => {
    const cards = document.querySelectorAll("[data-card]");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  };

  return (
    <div onMouseMove={handleGlow} className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      {/* Topbar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-slate-900/40 border-b border-black/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 grid place-items-center text-white font-bold shadow-md">H</div>
            <div className="flex-1">
              <h1 className="text-lg md:text-xl font-semibold leading-tight">হোম হাব</h1>
              <p className="text-xs md:text-sm text-black/60 dark:text-white/70">সবকিছু এক পেজে – কিনুন, খেলুন, পোস্ট করুন, পড়ুন।</p>
            </div>
            <button
              onClick={() => setDark((d) => !d)}
              className="inline-flex items-center gap-2 rounded-2xl border border-black/5 dark:border-white/10 px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden sm:inline">{dark ? "লাইট" : "ডার্ক"} মোড</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                এক পেজে <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">সকল কার্ড</span>
              </h2>
              <p className="mt-3 md:mt-4 text-black/70 dark:text-white/70 text-base md:text-lg">
                নতুন ও পুরাতন পণ্য, গেমস, পোস্ট, অ্যাপ মার্কেট, খবর, ও সরকারি সাইট—সবই এখানে।
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black/40 dark:text-white/50" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="সার্চ করুন… (যেমন: খবর, গেম)"
                    className="w-full rounded-2xl pl-10 pr-4 py-3 border border-black/10 dark:border-white/10 bg-white/90 dark:bg-white/5 backdrop-blur focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <Link
                  href="#cards"
                  className="rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white px-4 py-3 font-medium shadow hover:shadow-md"
                >
                  এক্সপ্লোর
                </Link>
              </div>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-[28px] border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-6 shadow-xl"
              >
                <div className="grid grid-cols-2 gap-4">
                  {items.slice(0, 4).map((item) => (
                    <div key={item.key} className="rounded-2xl p-4 bg-black/5 dark:bg-white/5">
                      <div className="mb-3">
                        <IconWrap>{item.icon}</IconWrap>
                      </div>
                      <div className="text-sm font-semibold leading-snug">{item.title}</div>
                      <div className="text-xs text-black/60 dark:text-white/60 mt-1 line-clamp-2">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section id="cards" className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold">সব ফিচার</h3>
            <p className="text-sm text-black/60 dark:text-white/60">{filtered.length}টি কার্ড পাওয়া গেছে</p>
          </div>

          <AnimatePresence mode="popLayout">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((it) => (
                <div key={it.key} data-card>
                  <Card item={it} />
                </div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-black/60 dark:text-white/60">© {new Date().getFullYear()} Home Hub — All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Tag>রেসপন্সিভ</Tag>
            <Tag>দ্রুত</Tag>
            <Tag>আধুনিক ডিজাইন</Tag>
          </div>
        </div>
      </footer>
    </div>
  );
}





