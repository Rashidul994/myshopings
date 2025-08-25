// components/ProductGallery.tsx
import Image from 'next/image';
import { useState } from 'react';

export default function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div>
      <Image
        src={active}
        alt="product"
        width={500}
        height={500}
        className="rounded-2xl w-full object-cover"
      />
      <div className="flex gap-2 mt-4">
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            width={80}
            height={80}
            className={`rounded-xl cursor-pointer border-2 ${
              img === active ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => setActive(img)}
          />
        ))}
      </div>
    </div>
  );
}
