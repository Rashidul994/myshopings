'use client'

import { useState,useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsCheckCircleFill } from 'react-icons/bs'
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import Api from '../../api/Api';




export default function HoldToConfirmButton() {
const [alldatasent,setAllCartdata]=useState('');
  const [count, setCount] = useState(10000); // 5 second countdown
  const [showPopup, setShowPopup] = useState(true);




  const [progress, setProgress] = useState(0)
  const [confirmed, setConfirmed] = useState(false)
  const intervalRef = useRef(null)

  const handleHoldStart = () => {
   let percent = 0
    intervalRef.current = setInterval(() => {
      percent += 1
      setProgress(percent)
      if (percent >= 100) {
        clearInterval(intervalRef.current)
        setConfirmed(true)
setCount(20)

handleSubmit()
      }
    }, 20)
  }

  const handleHoldEnd = () => {
    if (progress < 100) {
      clearInterval(intervalRef.current)
      setProgress(0)
    }
  }


const handleSubmit = async () => {
 


  try {
        const res = await Api.post("/order_card",alldatasent);

        if (res.data) {

          console.log(' products get statush  ====================================');
         
        
         toast.success("অর্ডার সস্পূন্ন হয়েছে   আপনাকে ধন্যবাদ অর্ডার করার জন্য");






        } else {    
         console.log(res.data);
     

          }
      } catch (err) {
        toast.error("সার্ভার সমস্যা বা ভুল তথ্য");
      }

    }















  useEffect(() => {


 const proDucts = JSON.parse(localStorage.getItem('cart-storage') || '[]');

   
console.log('proDucts ====================================');
console.log(proDucts.state.items);

setAllCartdata(proDucts.state);



    if (count === 0) {


            setShowPopup(false);
                 localStorage.removeItem('cart-storage');
redirect('/');

 



     
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);






  return (
    <div className="flex flex-col items-center space-y-6 mt-10">
      {!confirmed ? (
        <motion.button
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 text-white shadow-xl text-lg font-bold overflow-hidden"
          onMouseDown={handleHoldStart}
          onMouseUp={handleHoldEnd}
          onTouchStart={handleHoldStart}
          onTouchEnd={handleHoldEnd}
        >
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {progress < 100 ? `${progress}%` : 'সম্পন্ন'}
          </div>
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-white/20 z-0"
            initial={{ height: 0 }}
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-2"
        >





  <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-full  bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className=" p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Redirecting in...</h2>
        <p className="text-7xl z-500 font-mono  text-opacity-510  ">{count}</p>
      </div>
    </motion.div>






          <BsCheckCircleFill className="text-green-400 text-5xl mx-auto animate-bounce" />
          <p className="text-xl font-semibold text-white">
            আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
          </p>


           <p className="text-base text-gray-300">

        <Typewriter
          words={["ধন্যবাদ আপনার অর্ডারের জন্য!", "আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করব।"]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={30}
          delaySpeed={2000}
        />
      </p>

        </motion.div>
      )}
    </div>
  )
}


