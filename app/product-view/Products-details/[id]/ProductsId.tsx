export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  return (
    <main className="p-4">
      {/* ✅ JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: product.name,
          image: [product.image],
          description: product.description,
          sku: product.sku || product.id,
          brand: {
            "@type": "Brand",
            name: product.brand || 'BanglaShop'
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "BDT",
            price: product.price,
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            url: `https://example.com/product/${params.slug}`
          }
        })
      }} />

      {/* ✅ Page Content */}
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={400}
        className="rounded-lg mb-4"
      />
      <div className="text-xl font-semibold text-green-700">৳ {product.price}</div>
    </main>
  )
}
