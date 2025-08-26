import React from 'react'

export default function ProductCard() {
  return (
    <div>ProductCard</div>
  )
}


// 'use client';



// import React,{useState} from 'react';
// import Product3DViewer from './Product3DViewer';
// import Image from 'next/image';
// // import { useCart } from '../../hock/useCart';

// export default function ProductCard({product}) {
  
//   const [ustates, setStates] = useState();


  

//   return (
//     <>
//       {/* <Product3DViewer /> */}
//       <h3 className="text-lg text-black font-semibold mt-3">{product.brand}</h3>
//       <p className="text-gray-600">{product.id}</p>
       
//       <button
//         onClick={() => setStates(product.id)}
//         className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Add to Cart
//       </button>
//     </>
//   );
// }