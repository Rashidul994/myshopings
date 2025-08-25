// components/ProductView.tsx

// 'use client'

// import ProductGallery from './ProductGrally';
// import Tabs from './Tab';
// import { Button } from './ui/button';

// export default function ProductView() {
//   const product = {
//     name: 'Smart Watch Series 8',
//     brand: 'TechCorp',
//     price: 199.99,
//     stock: 'In Stock',
//     rating: 4.7,
//     images: ['/watch.jpg', '/watch2.jpg', '/watch3.jpg'],
//     description: `The Smart Watch Series 8 delivers powerful features in a stylish, modern design. Monitor your heart rate, track your steps, and stay connected on the go.`,
//     details: 'Water resistant • 36h battery life • Bluetooth 5.2',
//     reviews: [
//       { name: 'Ali', comment: 'Amazing product!', rating: 5 },
//       { name: 'Mira', comment: 'Good but battery needs improvement.', rating: 4 },
//     ],
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
//       <ProductGallery images={product.images} />

//       <div>
//         <h1 className="text-3xl font-bold">{product.name}</h1>
//         <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
//         <div className="my-2 text-green-600 dark:text-green-400">{product.stock}</div>
//         <div className="text-xl font-semibold text-blue-600 dark:text-blue-300">${product.price}</div>
//         <div className="text-yellow-500">⭐ {product.rating} / 5</div>

//         <div className="my-6">
//           <button className="w-full md:w-auto">Add to Cart</button>
//         </div>

//         <Tabs
//           description={product.description}
//           details={product.details}
//           reviews={product.reviews}
//         />
//       </div>
//     </div>
//   );
// }



// app/top-products/page.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";

import Api from '../../api/Api'




const top10Products = [
  { id: 1, name: "Luxury Watch", pricee: "$329", img: "/product/watch.jpg" },
  { id: 2, name: "Gaming Headset", pricee: "$199", img: "/product/headphone.jpg" },
  { id: 3, name: "VR Pro Max", pricee: "$399", img: "/product/vr.jpg" },
  { id: 4, name: "Wireless Mouse", pricee: "$59", img: "/product/mouse.jpg" },
  { id: 5, name: "Fitness Tracker", pricee: "$89", img: "/product/fit.jpg" },
  { id: 6, name: "4K Drone", pricee: "$599", img: "/product/drone.jpg" },
  { id: 7, name: "Smartphone X", pricee: "$799", img: "/product/phone.jpg" },
  { id: 8, name: "Bluetooth Speaker", pricee: "$49", img: "/product/speaker.jpg" },
  { id: 9, name: "Tablet Pro", pricee: "$699", img: "/product/tablet.jpg" },
  { id: 10, name: "Smart Glasses", pricee: "$179", img: "/product/glasses.jpg" },
];

export default function TopProductsPage() {


// const params = useParams();
//   const id = params?.id;


  const [selectedImage, setSelectedImage] = useState<string | null>(null);


const [actions_new_old, setNew]=useState('new');



  const [productsget, setProducts]=useState([]);



useEffect(() => {
 
getUser();

}, [])


  const getUser= () =>{

  Api.get(`/get_all_product/${actions_new_old}`)
  .then(res =>{
    

  
 setProducts(res.data.message);

   

console.log('====================================');
console.log(res.data.message);
console.log('====================================');
})
  .catch(err => console.log('errrrrrrorrrrrrrrrrrrrrrrrrrrrrrrr'+err));

}









  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-800 px-4 md:px-10 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white tracking-tight">

{/* {productsget.map((product) => (




<h2> product get  {product.id}</h2>




))} */}

        🌟 Top 10 Best-Selling Products md rashidu islam
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">






        {productsget.map(product => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >




        {product.img ?
        
    
        <div
              onClick={() => setSelectedImage(product.img)}
              className="cursor-pointer group rounded-t-2xl overflow-hidden relative border-2 border-transparent hover:border-blue-500 hover:shadow-[0_0_14px_3px_#3b82f6] transition-all duration-300"
            >
              <img
                src={`http://localhost:8000/uploads_product/${product.img}`} 
                alt={product.name}
                width={'100%'}
                height={'100%'}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
    :

    <div
              onClick={() => setSelectedImage(product.imglink)}
              className="cursor-pointer group rounded-t-2xl overflow-hidden relative border-2 border-transparent hover:border-blue-500 hover:shadow-[0_0_14px_3px_#3b82f6] transition-all duration-300"
            >
              <img
                src={product.imglink}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

    
    }





            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{product.pricee}</p>

              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  <ShoppingCart size={16} />
                  Add
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 py-2 rounded-lg text-sm font-medium transition"
                >
                  <Eye size={16} />
                  View
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Image View Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-full max-h-full rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
