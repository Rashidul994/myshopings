import { Metadata } from 'next'
import Head from 'next/head'
import Home from './Home'

export const metadata: Metadata = {
  title: 'বাংলাদেশের সেরা অনলাইন শপ - ৫৪৫+ পণ্য | BanglaShop',
  description: '৫৪৫+ ভ্যারিফায়েড পণ্য এখন এক জায়গায়। বাংলাদেশে সেরা দামে সেরা অনলাইন শপিং করুন। আজই কিনুন!',
  keywords: ['বাংলা ইকমার্স', 'বাংলাদেশ শপিং', 'অনলাইন পণ্য', 'ইকমার্স সাইট', 'best ecommerce bangladesh'],
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'বাংলাদেশের সেরা অনলাইন শপ - ৫৪৫+ পণ্য | BanglaShop',
    description: '৫৪৫+ পণ্য এক জায়গায়, সেরা দামে এবং বিশ্বস্ত অনলাইন শপিং।',
    url: 'https://example.com',
    siteName: 'BanglaShop',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BanglaShop',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বাংলাদেশের সেরা অনলাইন শপ',
    description: '৫৪৫+ পণ্যের কালেকশন, দ্রুত ডেলিভারি সহ।',
    images: ['https://example.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://example.com',
  },
}

export default function HomePage() {
  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "BanglaShop",
            url: "https://example.com",
            description: "বাংলাদেশের সেরা ইকমার্স সাইট",
            sameAs: [
              "https://facebook.com/BanglaShop",
              "https://instagram.com/BanglaShop"
            ]
          })
        }} />
      </Head>



<Home />
    </>
  )
}
