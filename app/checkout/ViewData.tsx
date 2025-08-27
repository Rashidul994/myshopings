
import React from 'react'

export default function ViewData() {
  return (
    <div>ViewData</div>
  )
}



// 'use client';
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState<any[]>([]);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
//     setCartItems(stored);
//   }, []);

//   const updateQuantity = (index: number, delta: number) => {
//     const updated = [...cartItems];
//     updated[index].quantity += delta;
//     if (updated[index].quantity < 1) updated[index].quantity = 1;
//     setCartItems(updated);
//     localStorage.setItem("cartItems", JSON.stringify(updated));
//   };

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handleOrder = async () => {
//     try {
//       const response = await axios.post("http://localhost:8000/api/order", {
//         items: cartItems,
//         total,
//       });

//       if (response.status === 200) {
//         alert("Order placed successfully!");
//         localStorage.removeItem("cartItems");
//         setCartItems([]);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Order failed.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-xl font-bold mb-4">🛒 Your Cart</h1>

//       {cartItems.map((item, index) => (
//         <div key={index} className="flex justify-between items-center mb-4 p-4 rounded-lg shadow border bg-white">
//           <div>
//             <h2 className="font-semibold">{item.name}</h2>
//             <p>Price: ${item.price}</p>
//             <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => updateQuantity(index, -1)}
//               className="bg-gray-200 px-2 py-1 rounded"
//             >-</button>
//             <span>{item.quantity}</span>
//             <button
//               onClick={() => updateQuantity(index, 1)}
//               className="bg-gray-200 px-2 py-1 rounded"
//             >+</button>
//           </div>
//         </div>
//       ))}

//       <div className="mt-4 font-bold text-lg">Total: ${total.toFixed(2)}</div>

//       <button
//         onClick={handleOrder}
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         ✅ Place Order
//       </button>
//     </div>
//   );
// }
