


  'use client';
  import { useRef, useState, useEffect } from 'react';
  import { useCartStore } from '../product-view/api-local/store/cartStore';
  import jsPDF from 'jspdf';
  import autoTable from 'jspdf-autotable';
  import { toast, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { motion } from 'framer-motion';
import Link from 'next/link';
import { redirect } from 'next/navigation';

  function SuccessModal({ onClose }: { onClose: () => void }) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-sm text-center"
        >
          <h2 className="text-2xl font-bold text-green-600 mb-4">✅ অর্ডার সফল হয়েছে!</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করবো।</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            বন্ধ করুন
          </button>
        </motion.div>
      </div>
    );
  }

  export default function OrderSummary() {
    const printRef = useRef<HTMLDivElement>(null);
    const { items, clearCart } = useCartStore();

    const [invoiceNo, setInvoiceNo] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [customerInfo] = useState({
      name: 'জন ডো',
      phone: '+880123456789',
      address: '৪৫, গুলশান, ঢাকা',
    });

    const shipping = 5.0;
    const totalItems = items.reduce((acc, p) => acc + p.quantity, 0);
    const productTotal = items.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const finalTotal = productTotal + shipping;

    useEffect(() => {
      const date = new Date();
      setOrderDate(date.toLocaleDateString('bn-BD'));
      const invNum =
        'my-shopings.com/' +
        date.toISOString().slice(0, 10).replace(/-/g, '') +
        Math.floor(100 + Math.random() * 900);
      setInvoiceNo(invNum);
    }, []);

    const handlePrint = () => {
      const content = printRef.current;
      if (!content) return;
      const WinPrint = window.open('', '', 'width=900,height=650');
      WinPrint?.document.write(`
        <html>
          <head>
            <title>Invoice</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .company { font-size: 20px; font-weight: bold; color: #dc2626; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
              .total { font-weight: bold; }
            </style>
          </head>
          <body>${content.innerHTML}</body>
        </html>
      `);
      WinPrint?.document.close();
      WinPrint?.focus();
      WinPrint?.print();
      WinPrint?.close();
    };

    const handleDownloadPDF = () => {
      if (items.length === 0) {
        toast.warn('⚠️ কার্ট খালি!');
        return;
      }

      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.setTextColor('#dc2626');
      doc.text('EcoStyle™ ইনভয়েস', 14, 20);

      doc.setFontSize(11);
      doc.setTextColor('#000');
      doc.text(`ইনভয়েস নম্বর: ${invoiceNo}`, 14, 30);
      doc.text(`তারিখ: ${orderDate}`, 140, 30);

      doc.text(`গ্রাহক: ${customerInfo.name}`, 14, 40);
      doc.text(`ফোন: ${customerInfo.phone}`, 14, 47);
      doc.text(`ঠিকানা: ${customerInfo.address}`, 14, 54);

      const tableColumn = ['পণ্য', 'একক মূল্য', 'পরিমাণ', 'মোট'];
      const tableRows: any[] = [];

      items.forEach(item => {
        tableRows.push([
          item.name,
          `$${item.price.toFixed(2)}`,
          item.quantity.toString(),
          `$${(item.price * item.quantity).toFixed(2)}`,
        ]);
      });

      tableRows.push(['শিপিং', '', '', `$${shipping.toFixed(2)}`]);
      tableRows.push(['মোট পণ্য', '', totalItems.toString(), `$${finalTotal.toFixed(2)}`]);

      // @ts-ignore
      autoTable(doc, {
        startY: 60,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',
      });

      doc.save(`${invoiceNo}.pdf`);
    };

    const handleSaveOrder = async () => {

   
      if (items.length === 0) {
        toast.warn('⚠️ কার্ট খালি!');




        return;
      }

      const orderData = {
        invoiceNo,
        orderDate,
        customer: customerInfo,
        items,
        shipping,
        total: finalTotal,
      };

      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });

        if (!res.ok) throw new Error('Failed to save');

        toast.success('✅ অর্ডার সফলভাবে সংরক্ষিত হয়েছে!');
        setShowModal(true);
        clearCart();
      } catch (err) {
        toast.error('❌ অর্ডার সংরক্ষণে সমস্যা হয়েছে।');
      }
    };

    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-lg">
        <div ref={printRef}>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-red-600">EcoStyle™</h1>
            <p className="text-sm">১২৩ ইকো স্ট্রিট, গ্রিন সিটি, বাংলাদেশ</p>
            <p className="text-sm">ফোন: +880-1234-567890</p>
          </div>

          <div className="text-sm mb-4">
            <p><strong>ইনভয়েস নম্বর:</strong> {invoiceNo}</p>
            <p><strong>তারিখ:</strong> {orderDate}</p>
            <p><strong>গ্রাহক:</strong> {customerInfo.name}</p>
            <p><strong>ফোন:</strong> {customerInfo.phone}</p>
            <p><strong>ঠিকানা:</strong> {customerInfo.address}</p>
          </div>

          <table className="w-full text-sm border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-3 py-2">পণ্য</th>
                <th className="px-3 py-2 text-right">একক মূল্য</th>
                <th className="px-3 py-2 text-right">পরিমাণ</th>
                <th className="px-3 py-2 text-right">মোট</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
  দটয১                <td colSpan={4} className="text-center py-4">কার্ট খালি।</td>
                </tr>
              )}
              {items.map((p, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2 text-right">${p.price}</td>
                  <td className="px-3 py-2 text-right">{p.quantity}</td>
                  <td className="px-3 py-2 text-right">${(p.price * p.quantity).toFixed(2)}</td>
                </tr>
              ))}
              {items.length > 0 && (
                <>
                  <tr className="border-t">
                    <td colSpan={3} className="px-3 py-2 text-right font-semibold">শিপিং</td>
                    <td className="px-3 py-2 text-right">${shipping.toFixed(2)}</td>
                  </tr>
                  <tr className="border-t font-bold">
                    <td colSpan={3} className="px-3 py-2 text-right">মোট পণ্য: {totalItems}</td>
                    <td className="px-3 py-2 text-right">${finalTotal.toFixed(2)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-4">
          <button onClick={handlePrint} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            🖨 প্রিন্ট করুন
          </button>
          <button onClick={handleDownloadPDF} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            📥 PDF ডাউনলোড
          </button>
          <button onClick={()=>redirect('/checkout/order')} className="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded hover:shadow">
  
  <Link href='checkout/order'>

    🛒Next
          
</Link>


          </button>
        </div>

        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
      </div>
    );
  }

  // //   const [form, setForm] = useState({
  // //     name: '', email: '', address: '', payment: '',
  // //   });

  // //   const handleChange = (e) => {
  // //     setForm({ ...form, [e.target.name]: e.target.value });
  // //   };

  // //   const handleSubmit = (e) => {
  // //     e.preventDefault();
  // //     alert('✅ Order submitted!');
  // //   };

  // //   return (

  // //     <div className="min-h-screen text-dark p-6 bg-dark-50">
  // //       <h2 className="text-2xl font-bold mb-4">🛒 Checkout</h2>
  // //       <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow space-y-4">
  // //         <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full border p-2 rounded" />
  // //         <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="w-full border p-2 rounded" />
  // //         <textarea name="address" placeholder="Shipping Address" onChange={handleChange} required className="w-full border p-2 rounded" />
  // //         <select name="payment" onChange={handleChange} required className="w-full border p-2 rounded">
  // //           <option value="">Select Payment</option>
  // //           <option value="cod">Cash on Delivery</option>
  // //           <option value="bkash">bKash</option>
  // //         </select>
  // //         <button className="bg-green-600 text-white px-4 py-2 rounded">Place Order</button>
  // //       </form>
  // //     </div>
  // //   );
  // // }


  // // components/CheckoutForm.js

  // // import { useState } from "react";

  // // export default function CheckoutForm() {
  // //   const [selectedMethod, setSelectedMethod] = useState("card");

  // //   return (
  // //     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl transition-all duration-300 dark:bg-gray-900 dark:text-white">
  // //       <h2 className="text-2xl font-bold mb-6">Checkout</h2>

  // //       {/* Order Summary */}
  // //       <div className="mb-6">
  // //         <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
  // //         <div className="flex justify-between border-b pb-2">
  // //           <span>Product 1</span>
  // //           <span>$29.99</span>
  // //         </div>
  // //         <div className="flex justify-between border-b py-2">
  // //           <span>Shipping</span>
  // //           <span>$5.00</span>
  // //         </div>
  // //         <div className="flex justify-between font-bold pt-2">
  // //           <span>Total</span>
  // //           <span>$34.99</span>
  // //         </div>
  // //       </div>

  // //       {/* Payment Methods */}
  // //       <div className="mb-6">
  // //         <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
  // //         <div className="flex gap-4">
  // //           {["card", "paypal", "crypto"].map((method) => (
  // //             <button
  // //               key={method}
  // //               onClick={() => setSelectedMethod(method)}
  // //               className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium border ${
  // //                 selectedMethod === method
  // //                   ? "bg-red-500 text-white shadow-md"
  // //                   : "bg-white dark:bg-gray-800 border-gray-300 text-gray-700 dark:text-white"
  // //               }`}
  // //             >
  // //               {method.toUpperCase()}
  // //             </button>
  // //           ))}
  // //         </div>
  // //       </div>

  // //       {/* Card Details */}
  // //       {selectedMethod === "card" && (
  // //         <div className="space-y-4 transition-opacity duration-500 ease-in">
  // //           <input
  // //             type="text"
  // //             placeholder="Cardholder Name"
  // //             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
  // //           />
  // //           <input
  // //             type="text"
  // //             placeholder="Card Number"
  // //             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
  // //           />
  // //           <div className="flex gap-4">
  // //             <input
  // //               type="text"
  // //               placeholder="MM/YY"
  // //               className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
  // //             />
  // //             <input
  // //               type="text"
  // //               placeholder="CVC"
  // //               className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
  // //             />
  // //           </div>
  // //         </div>
  // //       )}

  // //       {/* Submit */}
  // //       <button
  // //         className="mt-6 w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
// //       >
// //         Confirm Payment
// //       </button>
// //     </div>
// //   );
// // }














// // components/CheckoutForm.js

// // import { useState } from "react";

// // export default function CheckoutForm() {
// //   const [selectedMethod, setSelectedMethod] = useState("card");

// //   const paymentMethods = [
// //     { key: "card", label: "Card" },
// //     { key: "paypal", label: "PayPal" },
// //     { key: "bkash", label: "bKash" },
// //     { key: "cod", label: "Cash on Delivery" },
// //     { key: "crypto", label: "Crypto" },
// //   ];

// //   return (
// //     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-2xl transition-all duration-300">
// //       <h2 className="text-2xl font-bold mb-6">Checkout</h2>

// //       {/* Order Summary */}
// //       <div className="mb-6">
// //         <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
// //         <div className="flex justify-between border-b pb-2 dark:border-gray-700">
// //           <span>Product 1</span>
// //           <span>$29.99</span>
// //         </div>
// //         <div className="flex justify-between border-b py-2 dark:border-gray-700">
// //           <span>Shipping</span>
// //           <span>$5.00</span>
// //         </div>
// //         <div className="flex justify-between font-bold pt-2">
// //           <span>Total</span>
// //           <span>$34.99</span>
// //         </div>
// //       </div>

// //       {/* Payment Method */}
// //       <div className="mb-6">
// //         <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
// //         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
// //           {paymentMethods.map(({ key, label }) => (
// //             <button
// //               key={key}
// //               onClick={() => setSelectedMethod(key)}
// //               className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm border font-medium ${
// //                 selectedMethod === key
// //                   ? "bg-red-500 text-white shadow-md"
// //                   : "bg-white dark:bg-gray-800 border-gray-300 text-gray-800 dark:text-white"
// //               }`}
// //             >
// //               {label}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Conditional Inputs */}
// //       {selectedMethod === "card" && (
// //         <div className="space-y-4">
// //           <input type="text" placeholder="Cardholder Name" className="form-input" />
// //           <input type="text" placeholder="Card Number" className="form-input" />
// //           <div className="flex gap-4">
// //             <input type="text" placeholder="MM/YY" className="form-input w-1/2" />
// //             <input type="text" placeholder="CVC" className="form-input w-1/2" />
// //           </div>
// //         </div>
// //       )}

// //       {selectedMethod === "bkash" && (
// //         <div className="mt-4">
// //           <input type="text" placeholder="bKash Number" className="form-input" />
// //           <input type="text" placeholder="Transaction ID" className="form-input mt-2" />
// //         </div>
// //       )}

// //       {selectedMethod === "cod" && (
// //         <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
// //           You will pay in cash when the product is delivered.
// //         </div>
// //       )}

// //       {/* Confirm Button */}
// //       <button className="mt-6 w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300">
// //         Confirm Payment
// //       </button>
// //     </div>
// //   );
// // }

// // Tailwind shortcut








// // components/CheckoutForm.js
// // import { useState } from "react";
// // import { Dialog } from '@headlessui/react';

// // export default function CheckoutForm() {
// //   const [selectedMethod, setSelectedMethod] = useState("card");
// //   const [isConfirmOpen, setIsConfirmOpen] = useState(false);

// //   const [shippingInfo, setShippingInfo] = useState({
// //     name: '',
// //     phone: '',
// //     address: ''
// //   });

// //   const handleInput = (e) => {
// //     setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
// //   };

// //   const paymentMethods = [
// //     { key: "card", label: "Card" },
// //     { key: "paypal", label: "PayPal" },
// //     { key: "bkash", label: "bKash" },
// //     { key: "cod", label: "Cash on Delivery" },
// //     { key: "crypto", label: "Crypto" },
// //   ];

// //   return (
// //     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-2xl">
// //       <h2 className="text-2xl font-bold mb-6">Checkout</h2>

// //       {/* 1. Shipping Address */}
// //       <div className="mb-6 space-y-4">
// //         <h3 className="text-lg font-semibold">Shipping Address</h3>
// //         <input
// //           type="text"
// //           name="name"
// //           placeholder="Full Name"
// //           value={shippingInfo.name}
// //           onChange={handleInput}
// //           className="form-input"
// //         />
// //         <input
// //           type="text"
// //           name="phone"
// //           placeholder="Phone Number"
// //           value={shippingInfo.phone}
// //           onChange={handleInput}
// //           className="form-input"
// //         />
// //         <textarea
// //           name="address"
// //           placeholder="Full Address"
// //           value={shippingInfo.address}
// //           onChange={handleInput}
// //           className="form-input"
// //         ></textarea>
// //       </div>

// //       {/* 2. Payment Methods */}
// //       <div className="mb-6">
// //         <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
// //         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
// //           {paymentMethods.map(({ key, label }) => (
// //             <button
// //               key={key}
// //               onClick={() => setSelectedMethod(key)}
// //               className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm border font-medium ${
// //                 selectedMethod === key
// //                   ? "bg-red-500 text-white shadow-md"
// //                   : "bg-white dark:bg-gray-800 border-gray-300 text-gray-800 dark:text-white"
// //               }`}
// //             >
// //               {label}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* 3. Dynamic Payment Input */}
// //       {selectedMethod === "bkash" && (
// //         <div className="space-y-2">
// //           <input type="text" placeholder="bKash Number" className="form-input" />
// //           <input type="text" placeholder="Transaction ID" className="form-input" />
// //         </div>
// //       )}

// //       {selectedMethod === "card" && (
// //         <div className="space-y-4">
// //           <input type="text" placeholder="Cardholder Name" className="form-input" />
// //           <input type="text" placeholder="Card Number" className="form-input" />
// //           <div className="flex gap-4">
// //             <input type="text" placeholder="MM/YY" className="form-input w-1/2" />
// //             <input type="text" placeholder="CVC" className="form-input w-1/2" />
// //           </div>
// //         </div>
// //       )}

// //       {/* 4. Next Button to Open Modal */}
// //       <button
// //         onClick={() => setIsConfirmOpen(true)}
// //         className="mt-6 w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
// //       >
// //         Next
// //       </button>

// //       {/* 5. Modal */}
// //       <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} className="relative z-50">
// //         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

// //         <div className="fixed inset-0 flex items-center justify-center">
// //           <Dialog.Panel className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-xl shadow-xl animate-fadeIn">
// //             <Dialog.Title className="text-xl font-bold mb-4">Confirm Your Order</Dialog.Title>

// //             <div className="space-y-2 text-sm">
// //               <p><strong>Name:</strong> {shippingInfo.name}</p>
// //               <p><strong>Phone:</strong> {shippingInfo.phone}</p>
// //               <p><strong>Address:</strong> {shippingInfo.address}</p>
// //               <p><strong>Payment Method:</strong> {paymentMethods.find(p => p.key === selectedMethod)?.label}</p>
// //               <p><strong>Total:</strong> $34.99</p>
// //             </div>

// //             <div className="mt-6 flex justify-between gap-2">
// //               <button
// //                 onClick={() => setIsConfirmOpen(false)}
// //                 className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   setIsConfirmOpen(false);
// //                   alert("🎉 Order Confirmed!");
// //                 }}
// //                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
// //               >
// //                 Confirm Order
// //               </button>
// //             </div>
// //           </Dialog.Panel>
// //         </div>
// //       </Dialog>
// //     </div>
// //   );
// // }














// // components/OrderSummary.js
// // 'use client'
// // import { useRef } from 'react';

// // export default function OrderSummary() {
// //   const printRef = useRef();

// //   const handlePrint = () => {
// //     const printContent = printRef.current;
// //     const WinPrint = window.open('', '', 'width=900,height=650');
// //     WinPrint.document.write(`
// //       <html>
// //         <head>
// //           <title>Order Summary</title>
// //           <style>
// //             body { font-family: sans-serif; padding: 20px; }
// //             h1 { color: #dc2626; }
// //             table { width: 100%; border-collapse: collapse; margin-top: 20px; }
// //             td, th { padding: 10px; border: 1px solid #ccc; }
// //           </style>
// //         </head>
// //         <body>${printContent.innerHTML}</body>
// //       </html>
// //     `);
// //     WinPrint.document.close();
// //     WinPrint.focus();
// //     WinPrint.print();
// //     WinPrint.close();
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-lg">
// //       <div ref={printRef}>
// //         <h1 className="text-2xl font-bold text-red-600">Order Summary</h1>

// //         {/* Shipping Info */}
// //         <div className="mt-4 text-sm">
// //           <p><strong>Name:</strong> John Doe</p>
// //           <p><strong>Phone:</strong> +880123456789</p>
// //           <p><strong>Address:</strong> Dhaka, Bangladesh</p>
// //         </div>

// //         {/* Order Items */}
// //         <div className="mt-6">
// //           <table className="w-full text-sm border border-gray-300 dark:border-gray-700">
// //             <thead className="bg-gray-100 dark:bg-gray-700">
// //               <tr>
// //                 <th className="text-left px-3 py-2">Product</th>
// //                 <th className="text-right px-3 py-2">Price</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               <tr className="border-t">
// //                 <td className="px-3 py-2">T-shirt (Red)</td>
// //                 <td className="text-right px-3 py-2">$29.99</td>
// //               </tr>
// //               <tr className="border-t">
// //                 <td className="px-3 py-2">Shipping</td>
// //                 <td className="text-right px-3 py-2">$5.00</td>
// //               </tr>
// //               <tr className="font-bold border-t">
// //                 <td className="px-3 py-2">Total</td>
// //                 <td className="text-right px-3 py-2">$34.99</td>
// //               </tr>
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* Print/Save PDF Buttons */}
// //       <div className="mt-6 flex justify-between">
// //         <button
// //           onClick={handlePrint}
// //           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
// //         >
// //           🖨 Print / Save PDF
// //         </button>

// //         <button
// //           className="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded hover:shadow"
// //           onClick={() => alert('✅ Order Saved!')}
// //         >
// //           💾 Save Order
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
