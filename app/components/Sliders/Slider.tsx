"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    name: "Stylish Watch",
    price: "$199",
    img: "https://picsum.photos/1000/600?random=10",
  },
  {
    name: "Leather Shoes",
    price: "$149",
    img: "https://picsum.photos/1000/600?random=11",
  },
  {
    name: "Smartphone",
    price: "$799",
    img: "https://picsum.photos/1000/600?random=12",
  },
];

export default function PuzzleHeroSlider() {
  const [current, setCurrent] = useState(0);
  const gridSize = 5;
  const gridPieces = gridSize * gridSize;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Generate random positions for exit animation
  const randomOffset = () => Math.random() * 400 - 200;
  const randomRotate = () => Math.random() * 180 - 90;

  return (
    <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] relative overflow-hidden">
      <AnimatePresence mode="wait">
        {products.map(
          (product, idx) =>
            idx === current && (
              <motion.div
                key={idx}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* 25 টুকরো grid */}
                {Array.from({ length: gridPieces }).map((_, i) => {
                  const row = Math.floor(i / gridSize);
                  const col = i % gridSize;

                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        width: `${100 / gridSize}%`,
                        height: `${100 / gridSize}%`,
                        top: `${row * (100 / gridSize)}%`,
                        left: `${col * (100 / gridSize)}%`,
                        overflow: "hidden",
                      }}
                      initial={{
                        opacity: 0,
                        scale: 0.3,
                        x: randomOffset(),
                        y: randomOffset(),
                        rotate: randomRotate(),
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.3,
                        x: randomOffset(),
                        y: randomOffset(),
                        rotate: randomRotate(),
                      }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.03,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Inner image part */}
                      <img
                        src={product.img}
                        className="w-full h-full object-cover"
                        style={{
                          transform: `translate(${-col * 100}%, ${-row * 100}%) scale(${gridSize})`,
                        }}
                        alt={product.name}
                      />
                    </motion.div>
                  );
                })}

                {/* Overlay Text + Button */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/50 to-transparent text-white">
                  <h2 className="text-2xl md:text-4xl font-bold">{product.name}</h2>
                  <p className="text-lg md:text-2xl font-semibold mt-2">{product.price}</p>
                  <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition">
                    Buy Now
                  </button>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
}













// "use client";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import { motion } from "framer-motion";

// import "swiper/css";
// import "swiper/css/pagination";

// const images = [
//   "https://picsum.photos/1000/600?random=10",
//   "https://picsum.photos/1000/600?random=11",
//   "https://picsum.photos/1000/600?random=12",
// ];

// export default function BrokenJoinSlider() {
//   const gridSize = 5; // 5x5 = 25 টুকরো
//   const gridPieces = gridSize * gridSize;

//   return (
//     <div className="w-full max-w-6xl mx-auto py-10">
//       <Swiper
//         modules={[Autoplay, Pagination]}
//         autoplay={{ delay: 4000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         loop
//         className="rounded-3xl shadow-2xl overflow-hidden"
//       >
//         {images.map((img, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px]">
//               {/* grid এর মত টুকরো টুকরো div বানানো */}
//               {Array.from({ length: gridPieces }).map((_, i) => {
//                 const row = Math.floor(i / gridSize);
//                 const col = i % gridSize;
//                 return (
//                   <motion.div
//                     key={i}
//                     className="absolute bg-cover bg-center"
//                     style={{
//                       width: `${100 / gridSize}%`,
//                       height: `${100 / gridSize}%`,
//                       top: `${row * (100 / gridSize)}%`,
//                       left: `${col * (100 / gridSize)}%`,
//                       backgroundImage: `url(${img})`,
//                       backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
//                       backgroundPosition: `${(col * 100) / (gridSize - 1)}% ${(row * 100) / (gridSize - 1)}%`,
//                     }}
//                     initial={{
//                       opacity: 0,
//                       scale: 0.3,
//                       x: Math.random() * 400 - 200,
//                       y: Math.random() * 400 - 200,
//                       rotate: Math.random() * 180 - 90,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                       x: 0,
//                       y: 0,
//                       rotate: 0,
//                     }}
//                     transition={{
//                       duration: 1.2,
//                       delay: i * 0.03, // বেশি টুকরো হলে ছোট delay দিব
//                       ease: "easeInOut",
//                     }}
//                   />
//                 );
//               })}
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }




// "use client";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import { motion } from "framer-motion";

// import "swiper/css";
// import "swiper/css/pagination";

// const images = [
//   "https://picsum.photos/1000/600?random=10",
//   "https://picsum.photos/1000/600?random=11",
//   "https://picsum.photos/1000/600?random=12",
// ];

// export default function BrokenJoinSlider() {
//   const gridPieces = 9; // 3x3 টুকরো

//   return (
//     <div className="w-full max-w-6xl mx-auto py-10">
//       <Swiper
//         modules={[Autoplay, Pagination]}
//         autoplay={{ delay: 4000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         loop
//         className="rounded-3xl shadow-2xl overflow-hidden"
//       >
//         {images.map((img, index) => (
//           <SwiperSlide key={index}>
//             <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px]">
//               {/* grid এর মত টুকরো টুকরো div বানানো */}
//               {Array.from({ length: gridPieces }).map((_, i) => {
//                 const row = Math.floor(i / 3);
//                 const col = i % 3;
//                 return (
//                   <motion.div
//                     key={i}
//                     className="absolute bg-cover bg-center"
//                     style={{
//                       width: "33.33%",
//                       height: "33.33%",
//                       top: `${row * 33.33}%`,
//                       left: `${col * 33.33}%`,
//                       backgroundImage: `url(${img})`,
//                       backgroundSize: "300% 300%",
//                       backgroundPosition: `${col * 50}% ${row * 50}%`,
//                     }}
//                     initial={{
//                       opacity: 0,
//                       scale: 0.3,
//                       x: Math.random() * 400 - 200, // এলোমেলো ভেঙ্গে যাওয়া
//                       y: Math.random() * 400 - 200,
//                       rotate: Math.random() * 180 - 90,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                       x: 0,
//                       y: 0,
//                       rotate: 0,
//                     }}
//                     transition={{
//                       duration: 1.2,
//                       delay: i * 0.1,
//                       ease: "easeInOut",
//                     }}
//                   />
//                 );
//               })}
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }







// "use client";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCreative, Navigation, Pagination } from "swiper/modules";
// import { motion } from "framer-motion";
// import HTMLFlipBook from "react-pageflip";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-creative";

// const images = [
//   "/images/product1.jpg",
//   "/images/product2.jpg",
//   "/images/product3.jpg",
//   "/images/product4.jpg",
// ];

// export default function ProductSlider() {
//   return (
//     <div className="w-full max-w-3xl mx-auto py-10">
//       {/* Page Flip Effect */}
//       <HTMLFlipBook width={400} height={500} className="shadow-xl">
//         {images.map((img, i) => (
//           <div key={i} className="w-full h-full flex items-center justify-center bg-white">
//             {/* টুকরো টুকরো করে ছবি জোড়া লাগার ইফেক্ট */}
//             <motion.img
//               src={img}
//               alt={`Product ${i}`}
//               className="w-full h-full object-cover"
//               initial={{ opacity: 0, scale: 0.5, clipPath: "inset(50% round 50%)" }}
//               animate={{ opacity: 1, scale: 1, clipPath: "inset(0% round 0%)" }}
//               transition={{ duration: 1.2, ease: "easeInOut" }}
//             />
//           </div>
//         ))}
//       </HTMLFlipBook>

//       {/* Slider with Creative Effect */}
//       <div className="mt-10">
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
//           className="rounded-2xl shadow-lg"
//         >
//           {images.map((img, i) => (
//             <SwiperSlide key={i}>
//               <motion.img
//                 src={img}
//                 alt={`Slide ${i}`}
//                 className="w-full h-[400px] object-cover rounded-2xl"
//                 initial={{ opacity: 0, y: 100 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }


