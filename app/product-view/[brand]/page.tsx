import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';


// ✅ Replace with your actual API call
async function getProduct(slug: string) {
  const res = await fetch(`https://your-api.com/api/product/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) 
  return res.json();
}

// ✅ Dynamic Metadata (SEO)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return {};

  const title = `${product.name} - Buy Now at Best Price | YourShop`;
  const description = product.description.slice(0, 160);
  const url = `https://yourshop.com/product/${params.slug}`;
  const image = product.image || 'https://yourshop.com/default-image.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'product',
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    metadataBase: new URL('https://yourshop.com'),
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'og:locale': 'en_US',
      'apple-mobile-web-app-capable': 'yes',
    },
  };
}

export default async function ProductPage() {

const product='242';

  if (!product) return notFound();

  return (
    <main className="p-6">
      {/* ✅ SEO Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.name,
            image: [product.image],
            description: product.description,
            sku: product.sku,
            mpn: product.id,
            brand: {
              '@type': 'Brand',
              name: product.brand || 'YourShop',
            },
            offers: {
              '@type': 'Offer',
              url: `https://yourshop.com/product/${product.slug}`,
              priceCurrency: 'USD',
              price: product.price,
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
            },
          }),
        }}
      />

      {/* ✅ Product View */}
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-xl my-4"
      />
      <p className="text-lg text-gray-700">{product.description}</p>
      <p className="text-xl font-semibold mt-4">${product.price}</p>
    </main>
  );
}





// import React from 'react';

// import Products from './products'

// export default function ComponentName() {

  

//   return (
//     <>


//     <Products />

//     <h3> product videw </h3>
    
//     </>
//   );
// }
