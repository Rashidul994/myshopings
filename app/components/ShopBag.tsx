// export default function ShopNowButton() {
//   return (
//     <div className="w-full flex justify-center pt-6">
//       <button className="relative flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow-lg hover:bg-red-600 hover:scale-105 transition-transform duration-300">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-5 h-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M5 8h14l1 12H4L5 8zm7-5v5m-4 0V3m8 0v5"
//           />
//         </svg>
//         Shop Now
//         <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full animate-bounce">
//           +1
//         </span>
//       </button>
//     </div>
//   );
// }
export default function FixedShoppingBag() {
  return (
    <div className="fixed top-130 left-320 -translate-x-1/2 z-50">
      <button className="relative flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white font-bold rounded-full shadow-xl hover:bg-red-600 hover:scale-105 transition-all duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 8h14l1 12H4L5 8zm7-5v5m-4 0V3m8 0v5"
          />
        </svg>
        Shop Now
        <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full animate-bounce">
          +1
        </span>
      </button>
    </div>
  );
}
