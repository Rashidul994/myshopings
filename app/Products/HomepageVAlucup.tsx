// import Link from 'next/link'
// import React from 'react'

// export default function HomepageVAlucup() {
//   return (
//    <>
   

//     <nav className="flex items-center text-sm text-gray-600 space-x-2 py-2">
   


//       <Link href="/" className="hover:underline text-blue-600 font-medium">Home</Link>
//       <span className="text-gray-400">{'>'}</span>
//       <Link href="/electronics" className="hover:underline text-blue-600 font-medium">Electronics</Link>
//       <span className="text-gray-400">{'>'}</span>
//       <span className="text-gray-800 font-semibold">Switch</span>
//     </nav>

//    </>
//   )
// }
'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({brandname, Catagoris}) {
  return (
    <nav className="text-sm text-gray-700 flex items-center space-x-2" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-blue-600 font-medium transition-colors">
        Home
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
{Catagoris ?



      <>
      
      <Link href="/electronics" className="hover:text-blue-600 font-medium transition-colors">
        {Catagoris }
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      {brandname}
      </>
:
<>
</>


}

    </nav>
  );
}

