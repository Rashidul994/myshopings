"use client";
import { motion } from "framer-motion";

const pieces = [
  { x: 0, y: 0 },
  { x: "50%", y: 0 },
  { x: 0, y: "50%" },
  { x: "50%", y: "50%" },
];

export default function PieceImage() {
  const img = "https://picsum.photos/600/400?random=10"; // আপনার ইমেজ URL

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-[600px] h-[400px] overflow-hidden rounded-xl shadow-2xl">
        {pieces.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-cover bg-center"
            style={{
              width: "50%",
              height: "50%",
              top: p.y,
              left: p.x,
              backgroundImage: `url(${img})`,
              backgroundPosition: `${p.x} ${p.y}`,
            }}
            initial={{ opacity: 0, scale: 0.3, x: i % 2 === 0 ? -200 : 200, y: i < 2 ? -200 : 200 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}






// "use client";
// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCreative, Navigation, Pagination } from "swiper/modules";
// import { motion } from "framer-motion";
// import HTMLFlipBook from "react-pageflip";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-creative";

// interface Photo {
//   id: number;
//   url: string;
// }

// export default function HomePage() {
//   const [photos, setPhotos] = useState<Photo[]>([]);

//   // API থেকে ইমেজ লোড
//   useEffect(() => {
//     const fetchPhotos = async () => {
//       const res = await fetch("https://picsum.photos/v2/list?page=2&limit=6");
//       const data = await res.json();
//       const mapped = data.map((p: any, i: number) => ({
//         id: i + 1,
//         url: p.download_url,
//       }));
//       setPhotos(mapped);
//     };
//     fetchPhotos();
//   }, []);

//   if (photos.length === 0)
//     return <p className="text-center py-20 text-lg">Loading photos...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center py-10 px-4">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800">
//         🛒 Product Gallery
//       </h1>

//       {/* Flip Book Section */}
//       <div className="mb-16">
//         <HTMLFlipBook width={400} height={500} className="shadow-2xl rounded-xl">
//           {photos.map((img) => (
//             <div
//               key={img.id}
//               className="w-full h-full flex items-center justify-center bg-white"
//             >
//               <motion.img
//                 src={img.url}
//                 alt={`Photo ${img.id}`}
//                 className="w-full h-full object-cover rounded-lg"
//                 initial={{
//                   opacity: 0,
//                   scale: 0.7,
//                   clipPath: "inset(50% round 30%)",
//                 }}
//                 animate={{
//                   opacity: 1,
//                   scale: 1,
//                   clipPath: "inset(0% round 0%)",
//                 }}
//                 transition={{ duration: 1, ease: "easeInOut" }}
//               />
//             </div>
//           ))}
//         </HTMLFlipBook>
//         <p className="text-center text-sm text-gray-500 mt-2">
//           Flip the pages 👉 like a book
//         </p>
//       </div>

//       {/* Swiper Slider Section */}
//       <div className="w-full max-w-4xl">
//         <Swiper
//           modules={[EffectCreative, Navigation, Pagination]}
//           grabCursor
//           navigation
//           pagination={{ clickable: true }}
//           effect="creative"
//           creativeEffect={{
//             prev: { shadow: true, translate: [0, 0, -400] },
//             next: { translate: ["100%", 0, 0] },
//           }}
//           className="rounded-2xl shadow-xl"
//         >
//           {photos.map((img) => (
//             <SwiperSlide key={img.id}>
//               <motion.img
//                 src={img.url}
//                 alt={`Slide ${img.id}`}
//                 className="w-full h-[400px] object-cover rounded-2xl"
//                 initial={{ opacity: 0, y: 80 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         <p className="text-center text-sm text-gray-500 mt-3">
//           Swipe 👉 for product slider
//         </p>
//       </div>
//     </div>
//   );
// }

