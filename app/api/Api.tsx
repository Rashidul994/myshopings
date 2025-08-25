// import axios from 'axios';

// const Api = axios.create({
//   baseURL: 'http://localhost:8000/Api/', // 🔁 এখানেই base URL সেট করবেন
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default Api;






// "use client";
// import { useEffect, useState } from "react";
// import { getItems, createItem, updateItem, deleteItem } from "@/lib/Api";

// export default function CrudExample() {
//   const [items, setItems] = useState<any[]>([]);

//   // সব ডাটা লোড করা
//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     const data = await getItems();
//     setItems(data);
//   };

//   // নতুন ডাটা যোগ করা
//   const addItem = async () => {
//     await createItem({ name: "New Item", price: 100 });
//     fetchItems();
//   };

//   // ডাটা আপডেট
//   const editItem = async (id: number) => {
//     await updateItem(id, { name: "Updated Item", price: 200 });
//     fetchItems();
//   };

//   // ডাটা ডিলিট
//   const removeItem = async (id: number) => {
//     await deleteItem(id);
//     fetchItems();
//   };

//   return (
//     <div>
//       <h1>CRUD Example</h1>
//       <button onClick={addItem}>➕ Add Item</button>

//       <ul>
//         {items.map((item: any) => (
//           <li key={item.id}>
//             {item.name} - {item.price}{" "}
//             <button onClick={() => editItem(item.id)}>✏️ Edit</button>
//             <button onClick={() => removeItem(item.id)}>🗑️ Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
















// lib/Api.ts
import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8000/api", // Laravel Api base url
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ GET (সব ডাটা আনা)
export const getItems = async () => {
  const response = await Api.get("/items");
  return response.data;
};

// ✅ GET (একটা ডাটা আনা by ID)
export const getItemById = async (id: number | string) => {
  const response = await Api.get(`/items/${id}`);
  return response.data;
};

// ✅ POST (নতুন ডাটা তৈরি করা)
export const add_coin = async (data: any) => {
  const response = await Api.post("/add_coin", data);
  return response.data;
};

// ✅ POST (নতুন ডাটা তৈরি করা)
export const coin_get = async (data: any) => {
  const response = await Api.post("/coin_get", data);
  return response.data;
};



// ✅ POST (নতুন ডাটা তৈরি করা)
export const createItem = async (data: any) => {
  const response = await Api.post("/items", data);
  return response.data;
};


// ✅ POST (নতুন ডাটা তৈরি করা)
export const wallate_get = async (data: any) => {
  const response = await Api.post("/wallate_get", data);
  return response.data;
};




// ✅ PUT (ডাটা আপডেট করা by ID)
export const updateItem = async (id: number | string, data: any) => {
  const response = await Api.put(`/items/${id}`, data);
  return response.data;
};

// ✅ DELETE (ডাটা ডিলিট করা by ID)
export const deleteItem = async (id: number | string) => {
  const response = await Api.delete(`/items/${id}`);
  return response.data;
};

export default Api;
