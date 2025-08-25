



'use client'

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Api from "../../api/Api";
import { useParams } from "next/navigation";

export default function AuthPage() {

  const uarams=useParams();

  const uerfree=uarams.id;


  const [isLogin, setIsLogin] = useState(true); // Toggle login/register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [policestation, setPolicStation] = useState("");
  const [phone, setphone] = useState("");
  const [unid, setUniid] = useState('');
  const [userRefrar, setRefersID] = useState("");
  const [loading, setLoading] = useState(false);

const [getid, setDatas] = useState(null)




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // ✅ Login Request
      try {
        const res = await Api.post("/users_login", { email, password });

        if (res.data.user === 201 || res.data.user === null) {
          toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
        } else {
          const selectedItems = res.data.user.slice(0, 3).map((item) => ({
            id: item.id,
            name: item.name,
            img: item.img,
            unid: item.uniqid,
          }));
          localStorage.setItem("userData", JSON.stringify(selectedItems));
          toast.success("লগইন সফল হয়েছে!");
          window.location.href = "/";
        }
      } catch (err) {
        toast.error("সার্ভার সমস্যা বা ভুল তথ্য");
      }
    } else {
      // ✅ Register Request
      try {
        const res = await Api.post("/add_user", {
  name:name,
  pass:password,
  address:policestation,
  email:email,
  phone:phone,
  img:'logo_user.jpg',
  unicid:unid,
  referid:userRefrar,
        });


      console.log('server ====================================');
      console.log(res.data.message);

      console.log('====================================');

        if (res.data.message === true) {
          toast.success("রেজিস্ট্রেশন সফল! এখন লগইন করুন");

          Savesdata();
       
        } else {
          toast.error(res.data.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
        }
      } catch (err) {
        toast.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      }
    }

    setLoading(false);
  };

 


  useEffect(() => {

 const number = Math.floor(10000000 + Math.random() * 90000000);
    console.log("Random 8-digit number:", number);

setUniid(number);
   setRefersID(uerfree);
  }, [])




  const getidnameid=()=>{



  }





useEffect(() => {


  if (userRefrar) {
      Api.get(`/all_users_refers/${userRefrar}`) // Laravel API URL
        .then(response => {
          setDatas(response.data.data);
     console.log(getid+ 'user Refers get id         ====================================');
     console.log(response.data.data);
     console.log('===================Login page =================');
        })
        .catch(error => {
          console.error('Error fetching user:', error);
       
 
        });
    }
  
}, [userRefrar])


   const Savesdata=()=>{

if (userRefrar) {
  

        const Res = Api.post("/add_coin", {
 
  user_id:64,
  coin:'2000',
  home_coin:'refer'


        })

  .then(function (response) {
    toast.success('আপনাকে স্বাগতম  কয়েন সংগ্রহ করার জন্য');
  })
  .catch(function (error) {
  toast.error('আমরা আন্তরীক ভাবে দুঃখিত আপনার কয়েনটি যোগ হচেছ না');
  });
// user_id	refer_id	coin_name	coin_actons	crurrent_time	update_time	coin	shareid	uinq_id	tranztion_id	



}else{

     toast.error('আপনে লগইন ছাড়া আয় করতে পারবে না আপনে আগে লগিন করুন তার পর আয় শুরু করুন।');

}



  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center p-4">
     
     
            {/* 🎁 Free Account Badge */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg text-lg font-bold animate-bounce">
          🎁 ফ্রি একাউন্ট 
        </div>
      </div>
      
     
     
     
     
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {!isLogin && (
<>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        
          <input
            type="text"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            placeholder="আপনার মোবাইল নং "
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


         <input
            type="text"
            value={policestation}
            onChange={(e) => setPolicStation(e.target.value)}
            placeholder="আপনার গ্রাম/শহর + থানা +  জেলা "
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />



</>

  )}

         <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ইমেইল"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="পাসওয়ার্ড"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-blue-600 text-white p-2 rounded-lg font-semibold transition duration-300 hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isLogin ? "লগইন করুন" : "রেজিস্টার করুন"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 my-4">
          {isLogin ? (
            <>
              অ্যাকাউন্ট নেই?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-500 hover:underline"
              >
                রেজিস্টার করুন
              </button>
            </>
          ) : (
            <>
              ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-500 hover:underline"
              >
                লগইন করুন
              </button>
            </>
          )}
        </div>

        <div className="my-4 text-center text-gray-400">অথবা লগইন করুন</div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => signIn("google")}
            className="w-full bg-white border border-gray-300 text-black py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.4h-2v-.1H24v7.3h11.3C33.7 32.3 29.4 35.4 24 35.4c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.5-5.5C33.7 6.1 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-3.6z"/>
              <path fill="#FF3D00" d="M6.3 14.6l6 4.4c1.6-3.1 4.6-5.6 8.1-6.5V6.3C14 7.5 9.1 10.6 6.3 14.6z"/>
              <path fill="#4CAF50" d="M24 44c5.4 0 10.4-2.1 14.1-5.4l-6.5-5.3c-2 1.5-4.5 2.5-7.6 2.5-5.3 0-9.8-3.6-11.4-8.4l-6.6 5.1C9 39.8 16.1 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.4H24v7.3h11.3c-1.1 2.9-3.3 5.2-6.2 6.5l6.5 5.3c3.8-3.5 6-8.7 6-14.6 0-1.3-.1-2.7-.4-3.6z"/>
            </svg>
            Google দিয়ে লগইন করুন
          </button>

          <button
            onClick={() => signIn("facebook")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#1877F2" d="M24 4C12.95 4 4 12.95 4 24c0 10 7.3 18.3 17 19.8v-14h-5v-6h5v-4.6c0-5 3-7.8 7.6-7.8 2.2 0 4.5.4 4.5.4v5h-2.5c-2.5 0-3.3 1.6-3.3 3.3V23h5.6l-.9 6h-4.7v14C36.7 42.3 44 34 44 24c0-11.05-8.95-20-20-20z"/>
              <path fill="#FFF" d="M31 29l1-6h-5v-3.3c0-1.7.8-3.3 3.3-3.3H33v-5s-2.3-.4-4.5-.4c-4.6 0-7.6 2.8-7.6 7.8V23h-5v6h5v14h6V29h4.7z"/>
            </svg>
            Facebook দিয়ে লগইন করুন
          </button>
        </div>
      </motion.div>
    </div>
  );
}






// 'use client'

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import Api from "../../api/Api";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSuccess = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await Api.post("/users_login", { email, password });

//       if (res.data.user === 201 || res.data.user === null) {
//         toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
//       } else {
//         const selectedItems = res.data.user.slice(0, 3).map((item) => ({
//           id: item.id,
//           name: item.name,
//           img: item.img,
//           unid: item.uniqid,
//         }));

//         localStorage.setItem("userData", JSON.stringify(selectedItems));
//         toast.success("আপনাকে স্বাগত লগইন করার জন্য");
//         window.location.href = "/";
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center p-4">
//         <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
//         <div className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg text-lg font-bold animate-bounce">
//           🎁 ফ্রি একাউন্ট
//         </div>
//       </div>

//       <motion.div   
//         className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
//         initial={{ opacity: 0, y: 100 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
//           Login to Your Account
//         </h2>

//         <form className="space-y-4" onSubmit={handleSuccess}>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="ইমেইল অথবা ফোন নম্বর"
//             required
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="পাসওয়ার্ড"
//             required
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center bg-blue-600 text-white p-2 rounded-lg font-semibold transition duration-300 hover:bg-blue-700 disabled:opacity-60"
//           >
//             {loading ? (
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : (
//               "লগইন করুন"
//             )}
//           </button>
//         </form>

//         <div className="my-4 text-center text-gray-400">অথবা লগইন করুন</div>

//         <div className="flex flex-col gap-3">
//           <button
//             onClick={() => signIn("google")}
//             className="w-full bg-white border border-gray-300 text-black py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" width="20" height="20" viewBox="0 0 48 48">
//               <path fill="#FFC107" d="M43.6 20.4h-2v-.1H24v7.3h11.3C33.7 32.3 29.4 35.4 24 35.4c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.5-5.5C33.7 6.1 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-3.6z"/>
//               <path fill="#FF3D00" d="M6.3 14.6l6 4.4c1.6-3.1 4.6-5.6 8.1-6.5V6.3C14 7.5 9.1 10.6 6.3 14.6z"/>
//               <path fill="#4CAF50" d="M24 44c5.4 0 10.4-2.1 14.1-5.4l-6.5-5.3c-2 1.5-4.5 2.5-7.6 2.5-5.3 0-9.8-3.6-11.4-8.4l-6.6 5.1C9 39.8 16.1 44 24 44z"/>
//               <path fill="#1976D2" d="M43.6 20.4H24v7.3h11.3c-1.1 2.9-3.3 5.2-6.2 6.5l6.5 5.3c3.8-3.5 6-8.7 6-14.6 0-1.3-.1-2.7-.4-3.6z"/>
//             </svg>
//             Google দিয়ে লগইন করুন
//           </button>

//           <button
//             onClick={() => signIn("facebook")}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20" className="w-5 h-5">
//               <path fill="#1877F2" d="M24 4C12.95 4 4 12.95 4 24c0 10 7.3 18.3 17 19.8v-14h-5v-6h5v-4.6c0-5 3-7.8 7.6-7.8 2.2 0 4.5.4 4.5.4v5h-2.5c-2.5 0-3.3 1.6-3.3 3.3V23h5.6l-.9 6h-4.7v14C36.7 42.3 44 34 44 24c0-11.05-8.95-20-20-20z"/>
//               <path fill="#FFF" d="M31 29l1-6h-5v-3.3c0-1.7.8-3.3 3.3-3.3H33v-5s-2.3-.4-4.5-.4c-4.6 0-7.6 2.8-7.6 7.8V23h-5v6h5v14h6V29h4.7z"/>
//             </svg>
//             Facebook দিয়ে লগইন করুন
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


