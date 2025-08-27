
import React from 'react'

export default function page() {
  return (
    <div>product view</div>
  )
}


// 'use client'
// import React, { useEffect, useState } from 'react'

// import ProdcutCard from './Actions/ProductCard'
// import ProBag from './Actions/ActiBag'


// import Api from '../api/Api'

// import { notFound, useParams } from "next/navigation";
// import { useRouter } from 'next/router'

// // type Props = {
// //   params: { id: string };
// // };



// // import { useRouter } from 'next/router';

// // export default function ProductViewPage() {
// //   const router = useRouter();
// //   const { id } = router.query;

// // function Produc_Page({params}:{params:{id:string}}){

// // const parids=params.id;

// // interface Props {
// //   params: {
// //     id: string;
// //   };
// // }

// // function ProductViewPage({ params }: Props) {
// //   return <div>Product ID: {params.id}</div>;
// // }

// // \}}}}}}}}}}}}}}'function ProductViewPage({ params }: Props) {
// //   return <div>Product ID: {params.id}</div>;
// // }

// function Produc_Page(){
//   // const router = useRouter();
//   // const { id } = router.query;
//   //   const params = useParams();
//   // const id = params.id; // 

//   const [actions_new_old, setOldNew]=useState('new');
//   const [productsget, setProducts]=useState([]);





// useEffect(() => {
 
// getUser();

// }, [])


//   const getUser= () =>{

//   Api.get(`/get_all_product/${actions_new_old}`)
//   .then(res =>{
    

  
//  setProducts(res.data.message);

   

// console.log('====================================');
// console.log(res.data.message);
// console.log('====================================');
// })
//   .catch(err => console.log('errrrrrrorrrrrrrrrrrrrrrrrrrrrrrrr'+err));

// }




//   return (
//   <>


// {/* down product row  */}



// <ProdcutCard />


// {/* <ProBag /> */}





//       {/* Full Image View Modal */}
    
 


//   </>
//   )

// }

// export default Produc_Page