
"use client"
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence,animate } from "framer-motion";
import { ShoppingCart, X,Eye } from "lucide-react";

import { redirect, useRouter } from 'next/navigation';
import confetti from 'canvas-confetti'
import { Howl } from 'howler'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


import Api from '../api/Api'
import Link from "next/link";




// const top10Products = [
//   { id: 1, name: "Luxury Watch", pricee: "$329", img: "/product/watch.jpg" },
//   { id: 2, name: "Gaming Headset", pricee: "$199", img: "/product/headphone.jpg" },
//   { id: 3, name: "VR Pro Max", pricee: "$399", img: "/product/vr.jpg" },
//   { id: 4, name: "Wireless Mouse", pricee: "$59", img: "/product/mouse.jpg" },
//   { id: 5, name: "Fitness Tracker", pricee: "$89", img: "/product/fit.jpg" },
//   { id: 6, name: "4K Drone", pricee: "$599", img: "/product/drone.jpg" },
//   { id: 7, name: "Smartphone X", pricee: "$799", img: "/product/phone.jpg" },
//   { id: 8, name: "Bluetooth Speaker", pricee: "$49", img: "/product/speaker.jpg" },
//   { id: 9, name: "Tablet Pro", pricee: "$699", img: "/product/tablet.jpg" },
//   { id: 10, name: "Smart Glasses", pricee: "$179", img: "/product/glasses.jpg" },
// ];



// Zustand Cart Store
const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const exists = get().items.find(
          (i) => i.id === item.id && i.size === item.size
        );
        if (exists) {
          set({
            items: get().items.map((i) =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      updateQty: (id, qty) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: qty } : i
          ),
        }),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
);

//<Cardsprodut       brand={brand} branName={branNams} old={actions_new_old} />




export default function TopProductsPage({brand,branName,old}) {








  const [selectedImg, setSelectedImg] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [lang, setLang] = useState('bn');
  const [activeTab, setActiveTab] = useState('description');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { items, addItem, removeItem, updateQty } = useCartStore();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);


      const [isAnimating, setIsAnimating] = useState(false);
  const [cartCount, setCartCount] = useState(0);




const MotionLik = motion(Link);


const [useid, setUserid]=useState('');

const bagRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const [bagItems, setBagItems] = useState<number>(0)



  const checCouts = () => {
   

    redirect('/checkout');
  };









  const handleAddToBag = () => {
    if (!itemRef.current || !bagRef.current) return

    const item = itemRef.current.getBoundingClientRect()
    const bag = bagRef.current.getBoundingClientRect()

    const flyingItem = document.createElement('div')
    flyingItem.innerText = '🧴'
    flyingItem.style.position = 'fixed'
 flyingItem.style.left = `${item.left}px`
flyingItem.style.top = `${item.top}px`
    flyingItem.style.fontSize = '32px'
    flyingItem.style.zIndex = '9999'
    flyingItem.style.transition = 'transform 0.5s ease-in-out'
    flyingItem.style.pointerEvents = 'none'
    document.body.appendChild(flyingItem)

    animate(
      { x: 0, y: 0, rotate: 0, scale: 1 },
      {
        x: bag.left - item.left,
        y: bag.top - item.top,
        rotate: 360,
        scale: 0.5,
        duration: 1,
        ease: 'easeInOut',
       onUpdate(latest) {
  flyingItem.style.transform = `translate(${latest.x}px, ${latest.y}px) rotate(${latest.rotate}deg) scale(${latest.scale})`
},

        onComplete() {
          flyingItem.remove()
          setBagItems((prev) => prev + 1)
        //   sound.play()
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } })

          bagRef.current?.classList.add('animate-wiggle')
          setTimeout(() => {
            bagRef.current?.classList.remove('animate-wiggle')
          }, 500)
        },
      }
    )
  }












// const params = useParams();
//   const id = params?.id;


  const [selectedImage, setSelectedImage] = useState<string | null>(null);


const [actions_new_old, setNew]=useState('new');



  const [productsget, setProducts]=useState([]);



useEffect(() => {


 const userData = JSON.parse(localStorage.getItem('userData') || '[]');
    if (userData[0]) {
      setUserid(userData[0].id || 'no name fine');
      
    }




 
getUser();

}, [])


  const getUser= () =>{

  Api.get(`/get_all_product_brandName_final/${brand}/${actions_new_old}/${branName}`)
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






<div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition duration-300 space-y-2">
  {/* Brand & Model */}
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-500 dark:text-gray-400">
       <span className="font-medium text-gray-800 dark:text-gray-200">{product.brand}</span>
    </span>
    <span className="text-sm text-gray-500 dark:text-gray-400">
       <span className="font-medium text-gray-800 dark:text-gray-200">{product.model}</span>
    </span>
  </div>

  {/* Product Name */}
  <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
    {product.name}
  </h2>

  {/* Price Section */}
  <div className="flex items-center space-x-2">
    <p className="text-blue-600 dark:text-blue-400 text-base font-semibold">
      ৳ {product.pricee}
    </p>
    {product.reprice && (
      <p className="text-sm line-through text-gray-400 dark:text-gray-500">
        ৳ {product.reprice}
      </p>
    )}


  </div>





  <div className="flex gap-2">
                <motion.button
               onClick={() => {
                addItem({
                  id: product.id,
                  userId: useid,
                  name: product.name,
                  price: product.pricee,
                  image: product.img,
                  imk: product.imglink,
                  quantity: 1,
                  size: product.model,
                });
              }}

                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  <ShoppingCart size={16} />
                  Add
                </motion.button>

                <MotionLik
                href={`product-view/Products-details/${product.id}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 py-2 rounded-lg text-sm font-medium transition"
                >
                  <Eye size={16} />
                  View
                </MotionLik>
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














        {/* Floating Cart Button */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
        >
          🛒 {items.length}
        </button>

        {/* Drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed top-0 right-0 w-full max-w-sm h-full bg-white dark:bg-gray-900 shadow-lg z-50 p-4 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">আপনার কার্ট</h2>
                <button onClick={() => setDrawerOpen(false)}>
                  <X />
                </button>
              </div>

              {items.length === 0 ? (
                <p className="text-gray-500">কার্ট খালি আছে।</p>
              ) : (
                <>
                  {items.map((item) => (
                    <div
                      key={item.id + item.size}
                      className="flex items-center gap-4 mb-4"
                    >

{item.image ?

 <Image
                        src={item.image || null}
                        alt={item.name || null}
                        width={60}
                        height={60}
                        className="rounded"
                      />
:
 <Image
                       src={item.image || null}
                        alt={item.name || null}
                        width={60}
                        height={60}
                        className="rounded"
                      />
}


                     
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                        <div className="flex items-center mt-1">
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQty(item.id, parseInt(e.target.value))
                            }
                            className="w-16 px-2 py-1 border rounded"
                          />
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-3 text-red-500 text-sm"
                          >
                            মুছুন
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 font-bold text-lg">
                    মোট: ৳ {subtotal.toFixed(2)}
                  </div>
     <Link
  href="/checkout"
  onClick={() => checCouts('vll')}
  className="mt-4 w-full bg-green-600 text-white py-2 rounded-md text-center block"
>
  চেকআউট
</Link>

            
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>





    </div>
  );
}
