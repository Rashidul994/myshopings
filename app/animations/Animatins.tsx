// "use client";

// import React, { useEffect, useRef } from "react";
// import Ansts from './Ant'
// const bugTypes = [
//   {
//     name: "snake",
//     img: 'https://clipart-library.com/images_k/transparent-snake-gif/transparent-snake-gif-23.jpg',
//   },
//   {
//     name: "ant",
//     img: "../../public/Icon/7ZQF.gif'",
//   },
//   {
//     name: "spider",
//     img: "https://i.postimg.cc/3xZxtn3N/spider.png",
//   },
//   {
//     name: "beetle",
//     img: "https://i.postimg.cc/7YztL9q6/beetle.png",
//   },
// ];


// type Bug = {
//   id: number;
//   x: number;
//   y: number;
//   speedX: number;
//   speedY: number;
//   angle: number;
//   element: HTMLDivElement | null;
// };

// export default function AnimatedBugs() {
//   const bugsRef = useRef<Bug[]>([]);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;

//     // Create bugs
//     const bugs: Bug[] = [];

//     for (let i = 0; i < 20; i++) {
//       const type = bugTypes[Math.floor(Math.random() * bugTypes.length)];
//       const x = Math.random() * (width - 40);
//       const y = Math.random() * (height - 40);
//       const speedX = (Math.random() - 0.5) * 4;
//       const speedY = (Math.random() - 0.5) * 4;
//       const angle = 0;

//       // Create div element
//       const div = document.createElement("div");
//       div.className = "bug";
//       div.style.position = "absolute";
//       div.style.width = "40px";
//       div.style.height = "40px";
//       div.style.backgroundImage = `url(${type.img})`;
//       div.style.backgroundSize = "contain";
//       div.style.backgroundRepeat = "no-repeat";
//       div.style.left = `${x}px`;
//       div.style.top = `${y}px`;
//       div.style.transition = "transform 0.2s linear";
//       div.style.cursor = "pointer";
//       div.style.userSelect = "none";

//       containerRef.current?.appendChild(div);

//       bugs.push({
//         id: i,
//         x,
//         y,
//         speedX,
//         speedY,
//         angle,
//         element: div,
//       });
//     }

//     bugsRef.current = bugs;

//     function moveBugs() {
//       const w = window.innerWidth;
//       const h = window.innerHeight;

//       bugsRef.current.forEach((bug) => {
//         bug.x += bug.speedX;
//         bug.y += bug.speedY;

//         if (bug.x < 0) {
//           bug.x = 0;
//           bug.speedX = -bug.speedX;
//         }
//         if (bug.x > w - 40) {
//           bug.x = w - 40;
//           bug.speedX = -bug.speedX;
//         }
//         if (bug.y < 0) {
//           bug.y = 0;
//           bug.speedY = -bug.speedY;
//         }
//         if (bug.y > h - 40) {
//           bug.y = h - 40;
//           bug.speedY = -bug.speedY;
//         }

//         bug.angle += bug.speedX * 5;

//         if (bug.element) {
//           bug.element.style.left = bug.x + "px";
//           bug.element.style.top = bug.y + "px";
//           bug.element.style.transform = `rotate(${bug.angle}deg)`;
//         }
//       });

//       requestAnimationFrame(moveBugs);
//     }

//     moveBugs();

//     // Cleanup on unmount
//     return () => {
//       bugsRef.current.forEach((bug) => {
//         if (bug.element && containerRef.current) {
//           containerRef.current.removeChild(bug.element);
//         }
//       });
//       bugsRef.current = [];
//     };
//   }, []);

//   return (
// <>


//     <div
//       ref={containerRef}
//       style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 9999 }}
//     />
// <Ansts />
// </>
//   );
// }



import React from 'react'

import  Ansts from './Ant'
function Animatins() {
  return (
  <Ansts /> 
  )
}

export default Animatins