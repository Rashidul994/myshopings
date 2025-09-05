'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Api from '../api/Api';



// Image paths
const Iimg1 = '/Icon/butterfly-4437_512.gif';
const Iimg2 = '/Icon/butterfly-11465_512.gif';
const Iimg3 = '/Icon/ladybug-5068_512.gif';
const Iimg4 = '/Icon/wasp-12292_512.gif';

// Random position
const getRandomPosition = () => ({
  top: `${Math.random() * 80}vh`,
  left: `${Math.random() * 80}vw`,
});

// Creature type
interface CreatureProps {
  id: number;
  image: string;
  speed: number;
  onClick: (id: number) => void;
  isFlying: boolean;
}

const Creature = ({ id, image, speed, onClick, isFlying }: CreatureProps) => {
  const [pos, setPos] = useState(getRandomPosition());

  useEffect(() => {
    const interval = setInterval(() => {
      setPos(getRandomPosition());
    }, speed);
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <motion.img
      src={image}
      alt="creature"
      onClick={() => onClick(id)}
      initial={{ scale: 1, opacity: 1 }}
      animate={
        isFlying
          ? {
              top: '10px',
              left: 'calc(100% - 60px)',
              scale: 0.2,
              opacity: 0,
              rotate: 360,
            }
          : {}
      }
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1 }}
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        width: '80px',
        height: '80px',
        zIndex: 9999,
        pointerEvents: 'auto',
        cursor: 'pointer',
 
 transition: `top ${speed / 1000}s linear, left ${speed / 1000}s linear`,
      }}
    />
  );
};

export default function CreatureAnimation() {


const [uniid, setUnid] = useState(null)

const [datetime, setDateTime] = useState('')


  const [count, setCount] = useState(0);
  const [removedIds, setRemovedIds] = useState<number[]>([]);
  const [flyingId, setFlyingId] = useState<number | null>(null);

  // List of creatures
  const [creatures] = useState([
    { id: 1, image: Iimg2, speed: 5500 },
    { id: 2, image: Iimg2, speed: 8500 },
    { id: 3, image: Iimg2, speed: 9000 },
    { id: 4, image: Iimg4, speed: 9000 },
    { id: 5, image: Iimg4, speed: 8500 },
    { id: 6, image: Iimg4, speed: 5500 },
    { id: 7, image: Iimg3, speed: 4500 },
    { id: 8, image: Iimg3, speed: 5100 },
    { id: 9, image: Iimg3, speed: 4900 },
    { id: 10, image: Iimg1, speed: 8300 },
    { id: 11, image: Iimg1, speed: 4300 },
    { id: 12, image: Iimg1, speed: 6300 },
  ]);

  // const handleCreatureClick = (id: number) => {
  //   const newCount = count + 1;
  //   setCount(newCount);

  //   if (newCount === 5) {
  //     // alert('🎉 তুমি ১০ বার ক্লিক করেছো!');
    
    
    
  //      // Trigger flying animation for clicked ID
  //   setFlyingId(id);

  //   // Remove it after animation ends
  //   setTimeout(() => {
  //     setRemovedIds(prev => [...prev, id]);
  //     setFlyingId(null); // Reset fly state
  //   }, 1000);

  //     setCount(0);
  // }
    
  //   }

  const handleCreatureClick = (id: number) => {
  const newCount = count + 1;
  setCount(newCount);

  // ✅ প্রতি ক্লিকে ফ্লাই করবে
  setFlyingId(id);

  // ✅ প্রতি ক্লিকেই লোকালহোস্টে ডেটা যাবে
  // fetch('http://localhost/insert.php', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     creatureId: id,
  //     clickNumber: newCount,
  //     time: new Date().toISOString(),
  //   }),
  // });

  // ✅ ফ্লাই শেষ হলে যদি এটা ৫ম ক্লিক হয়, তাহলে remove করবে
  if (newCount === 5) {

Savesdata();


    setTimeout(() => {
      setRemovedIds(prev => [...prev, id]);
      setFlyingId(null); // অ্যানিমেশন শেষ
    }, 1000); // ফ্লাই অ্যানিমেশনের সময়
    setCount(0); 
    
      localStorage.setItem("coin", '500');
    
    
    // ক্লিক কাউন্ট রিসেট
  } else {
    // ❌ না হলে শুধু ফ্লাই করে, মুছে যাবে না
    setTimeout(() => {
      setFlyingId(null); // শুধু fly state off করবে
    }, 1000);
  }
};


    // Trigger flying animation for clicked ID
  //   setFlyingId(id);

  //   // Remove it after animation ends
  //   setTimeout(() => {
  //     setRemovedIds(prev => [...prev, id]);
  //     setFlyingId(null); // Reset fly state
  //   }, 1000);
  // }

useEffect(() => {

const now = new Date();
const formatted = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',

    day: 'numeric',
      month:'numeric',


}).format(now); // e.g., "8/15/2025, 3:30:00 PM"
    setDateTime(formatted);




    
 const userData = JSON.parse(localStorage.getItem('userData') || '[]');
    if (userData[0]) {
      setUnid(userData[0].id || 'no name fine');
      
    }



    setInterval(() => {
      
    


  if (uniid) {
      Api.get(`/wallate_get/${uniid}`) // Laravel API URL
        .then(response => {
console.log('============ccccccccccccccccccccccoinnnnnnnnnnn=======================');
console.log(response.data.data[0].coin);


  //  const selectedItems = res.data.user.slice(0, 3).map((item) => ({
  //           id: item.id,
  //           name: item.name,
  //           img: item.img,
  //           unid: item.uniqid,
  //         }));
  //         localStorage.setItem("userData", JSON.stringify(selectedItems)); 
   
  localStorage.setItem("coin",response.data.data[0].coin );







console.log('====================================');
     console.log(uniid+ 'userid         ====================================');
     console.log(response.data.data);
     console.log('====================================');
        })
        .catch(error => {
          console.error('Error fetching user:', error);
       
 
        });
    }



}, 5000);


}, [uniid])
  




// const getData=()=>{


//   Api.get(`/wallate_get/${uniid}`)




//   .then(function (response) {

//     console.log(response.data.coin+'===============================কয়েন দেখা যাবে=');
//     console.log(uniid);
//     toast.success('get all');
//   })
//   .catch(function (error) {

//         console.log('eRRROR DATA COINS');
//   toast.error('আমরা আন্তরীক ভাবে দুঃখিত আপনার কয়েনটি যোগ হচেছ না');
//   });

// }




  const Savesdata=()=>{

if (uniid) {
  

        Api.post("/add_coin", {
 
  user_id:uniid,
  coin:'500',
  home_coin:'H'


        })

  .then(function (response) {
    toast.success('আপনাকে স্বাগতম  কয়েন সংগ্রহ করার জন্য');

    console.log('====================================');
    console.log(response.data);
    console.log('====================================');
  })
  .catch(function (error) {
  toast.error(error+'আমরা আন্তরীক ভাবে দুঃখিত আপনার কয়েনটি যোগ হচেছ না');
  });
// user_id	refer_id	coin_name	coin_actons	crurrent_time	update_time	coin	shareid	uinq_id	tranztion_id	



}else{

     toast.error('আপনে লগইন ছাড়া আয় করতে পারবে না আপনে আগে লগিন করুন তার পর আয় শুরু করুন।');

}



  }






  return (
    <>
      {/* Profile Icon (fly target) */}
      <div
        className=" hidden  fixed top-2 right-2 w-10 h-10 rounded-full border-2 border-pink-500 bg-white z-[9999]"
        style={{
          backgroundImage: `url('/Icon/profile.png')`,
          backgroundSize: 'cover',
        }}
      />
{datetime}
      <AnimatePresence>
        {creatures.map(creature =>
          !removedIds.includes(creature.id) ? (
            <Creature
              key={creature.id}
              id={creature.id}
              image={creature.image}
              speed={creature.speed}
              isFlying={creature.id === flyingId}
              onClick={handleCreatureClick}
            />
          ) : null
        )}
      </AnimatePresence>
    </>
  );
}






// 'use client';

// import { useEffect, useState } from 'react';

// // Image paths
// const Iimg1 = '/Icon/butterfly-4437_512.gif';
// const Iimg2 = '/Icon/butterfly-11465_512.gif';
// const Iimg3 = '/Icon/ladybug-5068_512.gif';
// const Iimg4 = '/Icon/wasp-12292_512.gif';

// // Random position generator
// const getRandomPosition = () => ({
//   top: `${Math.random() * 90}vh`,
//   left: `${Math.random() * 90}vw`,
// });

// interface CreatureProps {
//   id: number;
//   image: string;
//   speed: number;
//   onClick: (id: number) => void;
// }

// const Creature = ({ id, image, speed, onClick }: CreatureProps) => {
//   const [pos, setPos] = useState(getRandomPosition());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPos(getRandomPosition());
//     }, speed);
//     return () => clearInterval(interval);
//   }, [speed]);

//   return (
//     <img
//       src={image}
//       alt="creature"
//       onClick={() => onClick(id)} // ✅ Click handler with id
//       style={{
//         position: 'fixed',
//         top: pos.top,
//         left: pos.left,
//         width: '80px',
//         height: '80px',
//         transition: `top ${speed / 1000}s linear, left ${speed / 1000}s linear`,
//         zIndex: 9999,
//         pointerEvents: 'auto',
//         cursor: 'pointer',
//       }}
//     />
//   );
// };

// export default function CreatureAnimation() {
//   const [count, setCount] = useState(0);

//   // Initial creatures array with unique id
//   const [creatures, setCreatures] = useState([
//     { id: 1, image: Iimg2, speed: 5500 },
//     { id: 2, image: Iimg2, speed: 8500 },
//     { id: 3, image: Iimg2, speed: 9000 },
//     { id: 4, image: Iimg4, speed: 9000 },
//     { id: 5, image: Iimg4, speed: 8500 },
//     { id: 6, image: Iimg4, speed: 5500 },
//     { id: 7, image: Iimg3, speed: 4500 },
//     { id: 8, image: Iimg3, speed: 5100 },
//     { id: 9, image: Iimg3, speed: 4900 },
//     { id: 10, image: Iimg1, speed: 8300 },
//     { id: 11, image: Iimg1, speed: 4300 },
//     { id: 12, image: Iimg1, speed: 6300 },
//   ]);

//   const handleCreatureClick = (id: number) => {
//     setCount(prev => {
//       const newCount = prev + 1;
//       if (newCount === 10) {
//         alert('🎉 তুমি ১০ বার ক্লিক করেছো!');
//         setCount(0);
//       }
//       return newCount;
//     });

//     // Remove creature by ID
//     setCreatures(prev => prev.filter(creature => creature.id !== id));
//   };

//   return (
//     <>
//       {creatures.map(creature => (
//         <Creature
//           key={creature.id}
//           id={creature.id}
//           image={creature.image}
//           speed={creature.speed}
//           onClick={handleCreatureClick}
//         />
//       ))}
//     </>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";

// // Image paths
// const Iimg1 = "/Icon/butterfly-4437_512.gif";
// const Iimg2 = "/Icon/butterfly-11465_512.gif";
// const Iimg3 = "/Icon/ladybug-5068_512.gif";
// const Iimg4 = "/Icon/wasp-12292_512.gif";

// // Random position generator
// const getRandomPosition = () => ({
//   top: `${Math.random() * 90}vh`,
//   left: `${Math.random() * 90}vw`,
// });

// // Creature component
// const Creature = ({
//   image,
//   speed,
//   onClick,
// }: {
//   image: string;
//   speed: number;
//   onClick: () => void;
// }) => {
//   const [pos, setPos] = useState(getRandomPosition());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPos(getRandomPosition());
//     }, speed);
//     return () => clearInterval(interval);
//   }, [speed]);

//   return (
//     <img
//       src={image}
//       alt="creature"
//       onClick={onClick}
//       style={{
//         position: "fixed",
//         top: pos.top,
//         left: pos.left,
//         width: "80px",
//         height: "80px",
//         transition: `top ${speed / 1000}s linear, left ${speed / 1000}s linear`,
//         zIndex: 9999,
//         pointerEvents: "auto", // ✅ Clickable now
//         cursor: "pointer",
//       }}
//     />
//   );
// };

// // Main component
// export default function CreatureAnimation() {
//   const [count, setCount] = useState(0);

//   const handleClick = () => {
//     const newCount = count + 1;
//     setCount(newCount);
//     if (newCount === 2) {
//       alert("🎉 তুমি ১০ বার ক্লিক করেছো!");
//     }
//   };

//   return (
//     <>
//       <Creature image={Iimg2} speed={5500} onClick={handleClick} />
//       <Creature image={Iimg2} speed={8500} onClick={handleClick} />
//       <Creature image={Iimg2} speed={9000} onClick={handleClick} />
//       <Creature image={Iimg4} speed={9000} onClick={handleClick} />
//       <Creature image={Iimg4} speed={8500} onClick={handleClick} />
//       <Creature image={Iimg4} speed={5500} onClick={handleClick} />
//       <Creature image={Iimg3} speed={4500} onClick={handleClick} />
//       <Creature image={Iimg3} speed={5100} onClick={handleClick} />
//       <Creature image={Iimg3} speed={4900} onClick={handleClick} />
//       <Creature image={Iimg1} speed={8300} onClick={handleClick} />
//       <Creature image={Iimg1} speed={4300} onClick={handleClick} />
//       <Creature image={Iimg1} speed={6300} onClick={handleClick} />
//     </>
//   );
// }





// 'use client';

// import { useEffect, useState } from 'react';

// const Iimg1 = '/Icon/butterfly-4437_512.gif';
// const Iimg2 = '/Icon/butterfly-11465_512.gif';
// const Iimg3 = '/Icon/ladybug-5068_512.gif';
// const Iimg4 = '/Icon/wasp-12292_512.gif';

// const getRandomPosition = () => ({
//   top: `${Math.random() * 90}vh`,
//   left: `${Math.random() * 90}vw`,
// });

// const Creature = ({
//   image,
//   speed,
//   onClick,
// }: {
//   image: string;
//   speed: number;
//   onClick: () => void;
// }) => {
//   const [pos, setPos] = useState(getRandomPosition());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPos(getRandomPosition());
//     }, speed);
//     return () => clearInterval(interval);
//   }, [speed]);

//   return (
//     <img
//       src={image}
//       alt="creature"
//       onClick={onClick}
//       style={{
//         position: 'fixed',
//         top: pos.top,
//         left: pos.left,
//         width: '80px',
//         height: '80px',
//         transition: `top ${speed / 1000}s linear, left ${speed / 1000}s linear`,
//         zIndex: 9999,
//         pointerEvents: 'auto', // Enable clicking
//         cursor: 'pointer',
//       }}
//     />
//   );
// };

// export default function CreatureAnimation() {
//   const [count, setCount] = useState(0);

//   const handleClick = () => {
//     const newCount = count + 1;
//     setCount(newCount);
//     if (newCount === 1) {
//       alert('🎉 তুমি ১০ বার ক্লিক করেছো!');
//     }
//   };

//   return (
//     <>
//       <Creature image={Iimg2} speed={5500} onClick={handleClick} />
//       <Creature image={Iimg2} speed={8500} onClick={handleClick} />
//       <Creature image={Iimg2} speed={9000} onClick={handleClick} />
//       <Creature image={Iimg4} speed={9000} onClick={handleClick} />
//       <Creature image={Iimg4} speed={8500} onClick={handleClick} />
//       <Creature image={Iimg4} speed={5500} onClick={handleClick} />
//       <Creature image={Iimg3} speed={4500} onClick={handleClick} />
//       <Creature image={Iimg3} speed={5100} onClick={handleClick} />
//       <Creature image={Iimg3} speed={4900} onClick={handleClick} />
//       <Creature image={Iimg1} speed={8300} onClick={handleClick} />
//       <Creature image={Iimg1} speed={4300} onClick={handleClick} />
//       <Creature image={Iimg1} speed={6300} onClick={handleClick} />
//     </>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";

// const Iimg1 = "/Icon/butterfly-4437_512.gif"; // Correct way to use public image
// const Iimg2= "/Icon/butterfly-11465_512.gif"; // Correct way to use public image
// const Iimg3 = "/Icon/ladybug-5068_512.gif"; // Correct way to use public image
// const Iimg4 = "/Icon/wasp-12292_512.gif"; // Correct way to use public image

// const getRandomPosition = () => ({




//   top: `${Math.random() * 90}vh`,
//   left: `${Math.random() * 90}vw`,
// });

// const Creature = ({ image, speed }: { image: string; speed: number }) => {
//   const [pos, setPos] = useState(getRandomPosition());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPos(getRandomPosition());
//     }, speed);
//     return () => clearInterval(interval);
//   }, [speed]);





// const [count, setCount] = useState(0);

//   const handleClick = () => {
//     const newCount = count + 1;
//     setCount(newCount);
//     if (newCount === 1) {
//       alert('🎉 তুমি ১০ বার ক্লিক করেছো!');
//     }
//   };



//   return (
//     <img
//       src={image}

//       onClick={()=>alert('alerts')}
//       alt="creature"
//       style={{
//         position: "fixed",
//         top: pos.top,
//         left: pos.left,
//         width: "80px",
//         height: "80px",
//         transition: `top ${speed / 1000}s linear, left ${speed / 1000}s linear`,
//         zIndex: 9999,
//         pointerEvents: "none",
//       }}
//     />
//   );
// };

// export default function CreatureAnimation() {




  



//   return (
//     <>

      
//       <Creature      onClick={()=>alert('alerts')}  image={Iimg2} speed={5500} />
//       <Creature   onClick={()=>alert('alerts')}  image={Iimg2} speed={8500} />
//       <Creature    image={Iimg2} speed={9000} />
//       <Creature    image={Iimg4} speed={9000} />
//       <Creature   image={Iimg4} speed={8500} />
   
//       <Creature    image={Iimg4} speed={5500} />
//       <Creature image={Iimg3} speed={4500} />
//       <Creature image={Iimg3} speed={5100} />
//       <Creature image={Iimg3} speed={4900} />
//       <Creature image={Iimg1} speed={8300} />
//       <Creature image={Iimg1} speed={4300} />
//       <Creature  onClick={()=>alert('alerts')} image={Iimg1} speed={6300} />
//     </>
//   );
// }
