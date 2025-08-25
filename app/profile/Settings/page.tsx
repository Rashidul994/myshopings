







"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Lock,
  Bell,
  Palette,
  Globe,
  Shield,
  HelpCircle,
  LogOut,
  Sun,
  Moon,
  CreditCard,
  Link as LinkIcon,
  Info,
  Menu,
  X,
  
Mail,
Phone,
MapPin,
Settings,
Edit2,

Star,
EyeOff,
Eye,
Wallet,
Landmark,

} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Api from "@/app/api/Api";
import { MdNoAccounts } from "react-icons/md";

export default function SettingsPage() {




  const [activeTab, setActiveTab] = useState("account");
  const [darkMode, setDarkMode] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [getid,setUserid]=useState(null);

  // বিভিন্ন সেকশনের ডেটা স্টেট
  const [profileData, setProfileData] = useState({ name: "",  address:'', phone:'', nid:'',  date_of_bird:'', bio: "", email: "" });
  const [securityData, setSecurityData] = useState({ password: "", confirm: "", oldpassword:'', twoFA: false });
  const [notificationsData, setNotificationsData] = useState({ email: true, push: false });
  const [accountData, setAccountData] = useState({ username: "", phone: "" });
  const [paymentsData, setPaymentsData] = useState({ card: "", expiry: "", cvc: "" });

  // সেভিং এবং সেভড মেসেজ স্টেট
  const [saving, setSaving] = useState({});
  const [savedMsg, setSavedMsg] = useState({});

const [usedata, setDatas] = useState([])


  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);







const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("bank");
  const [accountNumber, setAccountNumber] = useState("");


  const paymentOptions = [
    { id: "bkash", name: "bKash", icon: <Wallet size={24} className="text-pink-500" />, desc: "Send money easily with bKash" },
    { id: "nagad", name: "Nagad", icon: <Wallet size={24} className="text-orange-500" />, desc: "Fast and secure Nagad payments" },
    { id: "bank", name: "Bank Transfer", icon: <Landmark size={24} className="text-blue-500" />, desc: "Pay directly with your bank account" },
  ];
  
  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleConfirm = () => {
    if(!accountNumber) return alert("Please enter your account/number");




    Api.post(`/userdata_UPDATE`,{


accountNumber:accountNumber,
bank:selectedPayment,
id:getid,
action:'payment',


    }) // Laravel API URL
        .then(response => {
      //  
      alert(response.data.data);
     console.log(getid+ 'userid  profile Setting optin get id        ====================================');
     console.log(response.data.data);
     console.log('====================================');
        })
        .catch(error => {
          console.error('Error Settiong profiles  fetching user:', error);
       
 alert(error+'error ');
        })





    // alert(`Payment Method: ${selectedPayment}\nAccount/Number: ${accountNumber}`);
  };




useEffect(() => {


   const userData = JSON.parse(localStorage.getItem('userData') || '[]');
    if (userData[0]) {
      setUserid(userData[0].id || 'no name fine');
      
    }


}, [getid])




  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  const menuItems = [
    { id: "account", label: "Account Info", icon: <Info /> },
    { id: "profile", label: "Profile", icon: <User /> },
    { id: "security", label: "Security", icon: <Shield /> },
    { id: "privacy", label: "Privacy", icon: <Lock /> },
    { id: "notifications", label: "Notifications", icon: <Bell /> },
    { id: "appearance", label: "Appearance", icon: <Palette /> },
    { id: "language", label: "Language", icon: <Globe /> },
    { id: "payments", label: "Payments", icon: <CreditCard /> },
    { id: "apps", label: "Connected Apps", icon: <LinkIcon /> },
    { id: "help", label: "Help & Support", icon: <HelpCircle /> },
    { id: "logout", label: "Logout", icon: <LogOut /> },
  ];

  // সেভ ফাংশন (সিমুলেশন)
  function fakeSave(section, data) {
    setSaving((s) => ({ ...s, [section]: true }));
    setSavedMsg((s) => ({ ...s, [section]: "" }));
    setTimeout(() => {
      console.log("Saved", section, data);
      setSaving((s) => ({ ...s, [section]: false }));
      setSavedMsg((s) => ({ ...s, [section]: "Saved successfully" }));
      setTimeout(() => setSavedMsg((s) => ({ ...s, [section]: "" })), 2500);
    }, 900);
  }


  // ফর্ম হ্যান্ডলার
  const handleProfileSubmit = (e) => {
    e?.preventDefault();
   

  // const [profileData, setProfileData] = useState({ name: "", phone:'', nid:'',  date:'', bio: "", email: "" });

  
var alldata={
name:profileData.name,
phone:profileData.phone,
email:profileData.email,
nid:profileData.nid,
pass:profileData.bio,
dateofbirth:profileData.date_of_bird,
action:'updateall-data',
address:profileData.address,
id:getid,
}





        Api.post(`/userdata_UPDATE`,alldata) // Laravel API URL
        .then(response => {
      //     setDatas(response.data.data);
      // setProfileData(response.data.data);

  fakeSave("profile", profileData);



     console.log(getid+ 'userid  profile Setting optin get id        ====================================');
     console.log(response.data.data);
     console.log('====================================');
        })
        .catch(error => {
          console.error('Error Settiong profiles  fetching user:', error);
       alert('error password or nid');
 
        })





  };




  const handleSecuritySubmit = (e) => {
    e?.preventDefault();
    if (securityData.password && securityData.password !== securityData.confirm) {
      setSavedMsg((s) => ({ ...s, security: "Passwords don't match" }));
      setTimeout(() => setSavedMsg((s) => ({ ...s, security: "" })), 5500);
     
  
    
    
    }else{



// const [securityData, setSecurityData] = useState({ password: "", confirm: "", oldpassword:'', twoFA: false });

  
var alldata={

oldpass:securityData.oldpassword,
pass:securityData.password,


action:'updateall-pass',

id:getid,
}





        Api.post(`/userdata_UPDATE`,alldata) // Laravel API URL
        .then(response => {
      //     setDatas(response.data.data);
      // setProfileData(response.data.data);

  fakeSave("profile", profileData);



     console.log(getid+ 'userid  profile Setting optin get id        ====================================');
     console.log(response.data.data);
         setSavedMsg((s) => ({ ...s, security: response.data.data }));

           setTimeout(() => setSavedMsg((s) => ({ ...s, security: "" })), 5500);
        })
        .catch(error => {
          console.error('Error Settiong profiles  fetching user:', error);
        setSavedMsg((s) => ({ ...s, security: "your password update error   " }));

           setTimeout(() => setSavedMsg((s) => ({ ...s, security: "" })), 5500);

 
        })



    }












  };
  const handleNotificationsSubmit = (e) => {
    e?.preventDefault();
    fakeSave("notifications", notificationsData);
  };
  const handleAccountSubmit = (e) => {
    e?.preventDefault();
    fakeSave("account", accountData);
  };
  const handlePaymentsSubmit = (e) => {
    e?.preventDefault();
    fakeSave("payments", paymentsData);
  };







  useEffect(() => {
  


    Api.get(`/all_users/${getid}`) // Laravel API URL
        .then(response => {
          setDatas(response.data.data);
      setProfileData(response.data.data);
     console.log(getid+ '  profile Setting optin get id        ====================================');
     console.log(response.data.data);
     console.log('====================================');
        })
        .catch(error => {
          console.error('Error Settiong profiles  fetching user:', error);
       
 
        })





  }, [getid]);


  return (
    <div
      className={`min-h-screen flex bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-600/10 via-purple-700/6 to-blue-500/6 dark:from-black dark:via-gray-900 dark:to-black transition-colors duration-700`}
    >
      {/* Sidebar ডেক্সটপে */}
      <aside
        className={`hidden md:flex flex-col w-72 p-6 gap-6 transition-all duration-500 ${
          darkMode
            ? "bg-gradient-to-b from-black/60 via-neutral-900/50 to-black/40 border border-gray-800 backdrop-blur-md"
            : "bg-white/60 border border-gray-100 backdrop-blur-md"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Settings</h1>
            <p className="text-sm opacity-80 mt-1">Manage your account and preferences
              
              @ {getid}
              
               </p>
          </div>

          <button
            aria-label="Toggle theme"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
          </button>
        </div>

        <nav className="flex-1 overflow-auto custom-scroll">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`group w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
                      : darkMode
                      ? "hover:bg-white/5"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <motion.span
                    animate={
                      activeTab === item.id
                        ? { rotate: [0, 6, -6, 0], scale: [1, 1.06, 1.02, 1] }
                        : { rotate: 0, scale: 1 }
                    }
                    transition={{ duration: 0.6 }}
                    className="p-2 rounded-md bg-white/8 group-hover:bg-white/6"
                  >
                    {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                  </motion.span>

                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pt-2 border-t border-gray-200/10">
          <button
            className="w-full p-3 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
            onClick={() => {
              handleProfileSubmit();
              handleAccountSubmit();
              handleNotificationsSubmit();
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 16v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.9 7.6l4.2 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-semibold">Save All</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className={`p-6 rounded-2xl ${
                darkMode
                  ? "bg-gradient-to-b from-neutral-900/60 to-black/40 border border-gray-800"
                  : "bg-white/70 border border-gray-100"
              } shadow-xl backdrop-blur-md`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">{menuItems.find((m) => m.id === activeTab)?.label}</h2>
                  <p className="text-sm opacity-80 mt-1">{getDescription(activeTab)}</p>
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <button className="p-2 rounded-full bg-white/6 hover:bg-white/10 transition">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <button className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md hover:brightness-105 transition">
                    Apply
                  </button>
                </div>
              </div>

              {/* Dynamic content */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeTab === "profile" && (
                  <form onSubmit={handleProfileSubmit} className="col-span-1 md:col-span-2 space-y-4">
                    <Card>
                      <label className="block text-xs font-semibold mb-2">Full name</label>
               <input
  value={profileData.name}
  onChange={(e) =>
    setProfileData({ ...profileData, name: e.target.value })
  }
           />
           
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <label className="block text-xs font-semibold mb-2">Email</label>
                        <input
                          value={profileData.email}
                          onChange={(e) => setProfileData((p) => ({ ...p, email: e.target.value }))}
                          placeholder="name@example.com"
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                      </Card>

                      <Card>
                        <label className="block text-xs font-semibold mb-2">Phone </label>
                        <input
                          value={profileData.phone}
                          onChange={(e) => setProfileData((p) => ({ ...p, phone: e.target.value }))}
                          placeholder="Phone number"
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                      </Card>


                      <Card>
                        <label className="block text-xs font-semibold mb-2">Address</label>
                        <input
                          value={profileData.address}
                          onChange={(e) => setProfileData((p) => ({ ...p, address: e.target.value }))}
                          placeholder="FullAddress"
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                      </Card>


                    <Card>
                        <label className="block text-xs font-semibold mb-2">date of birth</label>
                        <input
                        type="date"
                          value={profileData.date_of_bird}
                          onChange={(e) => setProfileData((p) => ({ ...p, date_of_bird: e.target.value }))}
                          placeholder="name@example.com"
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                      </Card>


                 

                      <Card>
                        <label className="block text-xs font-semibold mb-2">User Password</label>
                        

                        <input

                          value={profileData.bio}
                          onChange={(e) => setProfileData((p) => ({ ...p, bio: e.target.value }))}
                          placeholder="*******"
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                      </Card>



                       <Card>
                        <label className="block text-xs font-semibold mb-2">Nid Number </label>
                        <input
                          value={profileData.nid}
                          onChange={(e) => setProfileData((p) => ({ ...p, nid: e.target.value }))}
                          placeholder="132465498"
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                      </Card>


                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow hover:scale-[1.02] transition"
                      >
                        {saving.profile ? "Saving..." : "Save Profile"}
                      </button>
                      {savedMsg.profile && <div className="text-sm text-green-400">{savedMsg.profile}</div>}
                    </div>
                  </form>
                )}

                {activeTab === "account" && (
                  <form onSubmit={handleAccountSubmit} className="col-span-1 md:col-span-2 space-y-4">
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                                      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-8xl font-extrabold tracking-wide text-transparent bg-clip-text 
        bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
      >
                    
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">




                       <Card>

       
   <label className="block text-xs font-semibold mb-2">    Account No :: </label>
                        {/* <input
                      value={usedata.name}
                          onChange={(e) => setAccountData((a) => ({ ...a, username: e.target.value }))}
                          placeholder="username"
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        /> */}

                       <label className="block text-xs font-semibold mb-2"> 
                        
                        
                       
                           {usedata.uniqid}{'-'}{usedata.id}

                             </label>
                   
 
                       
   </Card>

                      <Card>
                        <label className="block text-xs font-semibold mb-2"> userName::         {usedata.name}
                        
                        
                        </label>
                        {/* <input
                      value={usedata.name}
                          onChange={(e) => setAccountData((a) => ({ ...a, username: e.target.value }))}
                          placeholder="username"
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        /> */}
                   
                      </Card>

                      <Card>
                        <label className="block text-xs font-semibold mb-2">Phone Number::   {usedata.phone} </label>
                        
                       

                        {/* <input
                          value={accountData.phone}
                          onChange={(e) => setAccountData((a) => ({ ...a, phone: e.target.value }))}
                          placeholder="+8801..."
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        /> */}
                      </Card>

                      <Card>
                        <label className="block text-xs font-semibold mb-2"> Email:: 
                        
                         {usedata.email}


                         </label>
                         
                        {/* <input
                          value={accountData.phone}
                          onChange={(e) => setAccountData((a) => ({ ...a, phone: e.target.value }))}
                          placeholder="+8801..."
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        /> */}
                      </Card>
                    </div>
</motion.h1>



                    {/* <div className="flex items-center gap-3"  >
                      <button
                        type="submit"
                        disabled={true}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow hover:scale-[1.02] transition"
                      >
                        {saving.account ? "Saving..." : "Save Account"}
                      </button>
                      {savedMsg.account && <div className="text-sm text-green-400">{savedMsg.account}</div>}
                    </div> */}
                  </form>
                )}

                {activeTab === "security" && (
                  <form onSubmit={handleSecuritySubmit} className="col-span-1 md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


<div className="space-y-4">
{/*   old passoword  */}
     <div className="relative">
        <label className="block text-xs font-semibold mb-2">Old password</label>
        <input
          type={showPassword1 ? "text" : "password"}
          value={securityData.oldpassword}
          onChange={(e) =>
            setSecurityData((s) => ({ ...s, oldpassword: e.target.value }))
          }
          placeholder="•••••••"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-red-400 transition"
        />
        <button
          type="button"
          onClick={() => setShowPassword1(!showPassword1)}
          className="absolute right-3 top-9 text-gray-400 hover:text-white"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}


        </button>
      </div>
      {/* New Password */}
      <div className="relative">
        <label className="block text-xs font-semibold mb-2">New password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={securityData.password}
          onChange={(e) =>
            setSecurityData((s) => ({ ...s, password: e.target.value }))
          }
          placeholder="•••••••"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-red-400 transition"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-white"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}


        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <label className="block text-xs font-semibold mb-2">
          Confirm password
        </label>
        <input
          type={showConfirm ? "text" : "password"}
          value={securityData.confirm}
          onChange={(e) =>
            setSecurityData((s) => ({ ...s, confirm: e.target.value }))
          }
          placeholder="•••••••"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-red-400 transition"
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-9 text-gray-400 hover:text-white"
        >
          {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>


                      {/* <Card>
                        <label className="block text-xs font-semibold mb-2">New password</label>
                        <input
                          type="password"
                          value={securityData.password}
                          onChange={(e) => setSecurityData((s) => ({ ...s, password: e.target.value }))}
                          placeholder="•••••••"
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-red-400 transition"
                        />
                      </Card>

                      <Card>
                        <label className="block text-xs font-semibold mb-2">Confirm password</label>
                        <input
                          type="password"
                          value={securityData.confirm}
                          onChange={(e) => setSecurityData((s) => ({ ...s, confirm: e.target.value }))}
                          placeholder="•••••••"
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-red-400 transition"
                        />
                      </Card> */}
                    </div>

                    <Card>
                      <label className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium">Enable Two-Factor Authentication (2FA)</span>
                        <input
                          type="checkbox"
                          checked={securityData.twoFA}
                          onChange={(e) => setSecurityData((s) => ({ ...s, twoFA: e.target.checked }))}
                          className="w-5 h-5 accent-indigo-400"
                        />
                      </label>
                    </Card>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow hover:scale-[1.02] transition"
                      >
                        {saving.security ? "Saving..." : "Save Security"}
                      </button>
                      {savedMsg.security && <div className="text-sm text-green-400">{savedMsg.security}</div>}
                    </div>
                  </form>
                )}

                {activeTab === "notifications" && (
                  <form onSubmit={handleNotificationsSubmit} className="col-span-1 md:col-span-2 space-y-4">
                    <Card>
                      <label className="flex items-center justify-between">
                        Email Notifications
                        <input
                          type="checkbox"
                          checked={notificationsData.email}
                          onChange={(e) => setNotificationsData((n) => ({ ...n, email: e.target.checked }))}
                          className="w-5 h-5 accent-yellow-400"
                        />
                      </label>
                    </Card>

                    <Card>
                      <label className="flex items-center justify-between">
                        Push Notifications
                        <input
                          type="checkbox"
                          checked={notificationsData.push}
                          onChange={(e) => setNotificationsData((n) => ({ ...n, push: e.target.checked }))}
                          className="w-5 h-5 accent-yellow-400"
                        />
                      </label>
                    </Card>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow hover:scale-[1.02] transition"
                      >
                        {saving.notifications ? "Saving..." : "Save Notifications"}
                      </button>
                      {savedMsg.notifications && <div className="text-sm text-green-400">{savedMsg.notifications}</div>}
                    </div>
                  </form>
                )}

                {activeTab === "payments" && (
                  <form onSubmit={handlePaymentsSubmit} className="col-span-1 md:col-span-2 space-y-4">
                    {/* <Card>
                      <label className="block text-xs font-semibold mb-2">Card number</label>
                      <input
                        value={paymentsData.card}
                        onChange={(e) => setPaymentsData((p) => ({ ...p, card: e.target.value }))}
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                      />
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <label className="block text-xs font-semibold mb-2">Expiry</label>
                        <input
                          value={paymentsData.expiry}
                          onChange={(e) => setPaymentsData((p) => ({ ...p, expiry: e.target.value }))}
                          placeholder="MM/YY"
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                      </Card>

                      <Card>
                        <label className="block text-xs font-semibold mb-2">CVC</label>
                        <input
                          value={paymentsData.cvc}
                          onChange={(e) => setPaymentsData((p) => ({ ...p, cvc: e.target.value }))}
                          placeholder="123"
                          className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                      </Card>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow hover:scale-[1.02] transition"
                      >
                        {saving.payments ? "Saving..." : "Save Payments"}
                      </button>
                      {savedMsg.payments && <div className="text-sm text-green-400">{savedMsg.payments}</div>}
                    </div>



 */}









{/* --- Payment Options --- */}
      {/* <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">💳 Payment Method</h2>

        {paymentOptions.map(opt => (
          <div
            key={opt.id}
            onClick={() => setSelectedPayment(opt.id)}
            className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border transition
              ${selectedPayment === opt.id ? "bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg scale-105" : "bg-gray-900 border-gray-700 hover:bg-gray-800"}
            `}
          >
            <div>{opt.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">{opt.name}</h3>
              <p className="text-xs text-gray-400">{opt.desc}</p>
            </div>
            <input type="radio" checked={selectedPayment === opt.id} readOnly className="w-5 h-5 accent-indigo-500" />
          </div>
        ))}

        <button
          onClick={() => alert("Selected Payment: " + selectedPayment)}
          className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Confirm Payment
        </button>
      </div> */}















    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-2xl shadow-xl text-white space-y-6">

      <h2 className="text-2xl font-bold text-center">💳 Payment Step {step}</h2>

      {step === 1 && (
        <div className="space-y-4">
          {paymentOptions.map(opt => (
            <div
              key={opt.id}
              onClick={() => setSelectedPayment(opt.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border transition
                ${selectedPayment === opt.id ? "bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg scale-105" : "bg-gray-800 border-gray-700 hover:bg-gray-700"}
              `}
            >
              <div>{opt.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{opt.name}</h3>
                <p className="text-xs text-gray-400">{opt.desc}</p>
              </div>
              <input type="radio" checked={selectedPayment === opt.id} readOnly className="w-5 h-5 accent-indigo-500" />
            </div>
          ))}

          <button
            onClick={handleNext}
            className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 py-3 rounded-xl font-semibold transition"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <label className="block font-semibold text-sm">Enter {selectedPayment} Number / Account</label>
          <input
            type="text"
            placeholder="Enter number or account"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-xl transition"
            >
              Back
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 py-2 rounded-xl transition"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

    </div>












                  </form>
                )}

                {/* For tabs without forms, simple content */}
                {["privacy", "appearance", "language", "apps", "help", "logout"].includes(activeTab) && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                    <p>{`This section "${activeTab}" is coming soon...`}</p>
                  </div>
                )}
              </section>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Floating Menu Button */}
      <button
        aria-label="Open menu"
        onClick={() => setShowMobileMenu(true)}
        className="md:hidden fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-2xl z-50 transform-gpu hover:scale-105 transition"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile modal menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden flex flex-col"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileMenu(false)} />

            {/* Menu content */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0.15 }}
              className="relative bg-white dark:bg-neutral-900 p-6 rounded-t-2xl border-t border-gray-300 dark:border-gray-700 shadow-lg flex flex-col"
              style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Menu</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                    aria-label="Toggle theme"
                  >
                    {darkMode ? (
                      <Sun className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Moon className="w-5 h-5 text-gray-700" />
                    )}
                  </button>

                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setActiveTab(item.id);
                      setShowMobileMenu(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                        : darkMode
                        ? "bg-white/10 hover:bg-white/20"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="p-2 rounded-md bg-white/20">
                      {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className="text-xs opacity-70">{getDescriptionShort(item.id)}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Card wrapper for form inputs
function Card({ children }) {
  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background:
          "linear-gradient(180deg,rgba(255 255 255 / 0.08) 0%,rgba(255 255 255 / 0.02) 100%)",
        border: "1px solid rgba(255 255 255 / 0.15)",
        boxShadow:
          "inset 0 1px 0 rgba(255 255 255 / 0.5),0 0 10px 3px rgba(255 255 255 / 0.1)",
      }}
    >
      {children}
    </div>
  );
}

function getDescription(id) {
  switch (id) {
    case "account":
      return "Manage your account information, username and contact details.";
    case "profile":
      return "Edit your personal information, bio, and email.";
    case "security":
      return "Change your password and security settings.";
    case "privacy":
      return "Adjust your privacy settings.";
    case "notifications":
      return "Manage your notification preferences.";
    case "appearance":
      return "Customize the look and feel of your app.";
    case "language":
      return "Select your preferred language.";
    case "payments":
      return "Manage payment methods and billing information.";
    case "apps":
      return "Connected third-party applications.";
    case "help":
      return "Help articles and support.";
    case "logout":
      return "Sign out from your account.";
    default:
      return "";
  }
}

function getDescriptionShort(id) {
  switch (id) {
    case "account":
      return "Account & contact info";
    case "profile":
      return "Personal info & bio";
    case "security":
      return "Password & 2FA";
    case "privacy":
      return "Privacy settings";
    case "notifications":
      return "Email & push";
    case "appearance":
      return "Theme & colors";
    case "language":
      return "Language select";
    case "payments":
      return "Billing & cards";
    case "apps":
      return "Third-party apps";
    case "help":
      return "Support center";
    case "logout":
      return "Sign out";
    default:
      return "";
  }
}
















// 'use client';

// import React, { useEffect, useState } from 'react';
// import {
//   User,
//   Lock,
//   Bell,
//   Palette,
//   Globe,
//   Shield,
//   HelpCircle,
//   LogOut,
//   Sun,
//   Moon,
//   CreditCard,
//   Link as LinkIcon,
//   Info,
//   Menu,
//   X,
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState('account');
//   const [darkMode, setDarkMode] = useState(true);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   // Section-specific states
//   const [profileData, setProfileData] = useState({ fullName: '', bio: '', email: '' });
//   const [securityData, setSecurityData] = useState({ password: '', confirm: '', twoFA: false });
//   const [notificationsData, setNotificationsData] = useState({ email: true, push: false });
//   const [accountData, setAccountData] = useState({ username: '', phone: '' });
//   const [paymentsData, setPaymentsData] = useState({ card: '', expiry: '', cvc: '' });

//   // UI feedback
//   const [saving, setSaving] = useState({}); // {section: true}
//   const [savedMsg, setSavedMsg] = useState({}); // {section: 'Saved successfully'}

//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (darkMode) root.classList.add('dark');
//     else root.classList.remove('dark');
//   }, [darkMode]);

//   const menuItems = [
//     { id: 'account', label: 'Account Info', icon: <Info /> },
//     { id: 'profile', label: 'Profile', icon: <User /> },
//     { id: 'security', label: 'Security', icon: <Shield /> },
//     { id: 'privacy', label: 'Privacy', icon: <Lock /> },
//     { id: 'notifications', label: 'Notifications', icon: <Bell /> },
//     { id: 'appearance', label: 'Appearance', icon: <Palette /> },
//     { id: 'language', label: 'Language', icon: <Globe /> },
//     { id: 'payments', label: 'Payments', icon: <CreditCard /> },
//     { id: 'apps', label: 'Connected Apps', icon: <LinkIcon /> },
//     { id: 'help', label: 'Help & Support', icon: <HelpCircle /> },
//     { id: 'logout', label: 'Logout', icon: <LogOut /> },
//   ];

//   function fakeSave(section, data) {
//     setSaving((s) => ({ ...s, [section]: true }));
//     setSavedMsg((s) => ({ ...s, [section]: '' }));
//     setTimeout(() => {
//       console.log('Saved', section, data);
//       setSaving((s) => ({ ...s, [section]: false }));
//       setSavedMsg((s) => ({ ...s, [section]: 'Saved successfully' }));
//       setTimeout(() => setSavedMsg((s) => ({ ...s, [section]: '' })), 2500);
//     }, 900);
//   }

//   const handleProfileSubmit = (e) => {
//     e?.preventDefault();
//     fakeSave('profile', profileData);
//   };

//   const handleSecuritySubmit = (e) => {
//     e?.preventDefault();
//     if (securityData.password && securityData.password !== securityData.confirm) {
//       setSavedMsg((s) => ({ ...s, security: "Passwords don't match" }));
//       setTimeout(() => setSavedMsg((s) => ({ ...s, security: '' })), 2500);
//       return;
//     }
//     fakeSave('security', securityData);
//   };

//   const handleNotificationsSubmit = (e) => {
//     e?.preventDefault();
//     fakeSave('notifications', notificationsData);
//   };

//   const handleAccountSubmit = (e) => {
//     e?.preventDefault();
//     fakeSave('account', accountData);
//   };

//   const handlePaymentsSubmit = (e) => {
//     e?.preventDefault();
//     fakeSave('payments', paymentsData);
//   };

//   return (
//     <div
//       className={`min-h-screen flex bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-600/10 via-purple-700/6 to-blue-500/6 dark:from-black dark:via-gray-900 dark:to-black transition-colors duration-700`}
//     >
//       {/* Sidebar - desktop only */}
//       <aside
//         className={`hidden md:flex flex-col w-72 p-6 gap-6 transition-all duration-500 ${
//           darkMode
//             ? 'bg-gradient-to-b from-black/60 via-neutral-900/50 to-black/40 border border-gray-800 backdrop-blur-md'
//             : 'bg-white/60 border border-gray-100 backdrop-blur-md'
//         }`}
//       >
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-extrabold tracking-tight">Settings</h1>
//             <p className="text-sm opacity-80 mt-1">Manage your account and preferences</p>
//           </div>

//           <button
//             aria-label="Toggle theme"
//             onClick={() => setDarkMode(!darkMode)}
//             className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
//           >
//             {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
//           </button>
//         </div>

//         <nav className="flex-1 overflow-auto custom-scroll">
//           <ul className="space-y-2">
//             {menuItems.map((item) => (
//               <li key={item.id}>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setActiveTab(item.id)}
//                   className={`group w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
//                     activeTab === item.id
//                       ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg'
//                       : darkMode
//                       ? 'hover:bg-white/5'
//                       : 'hover:bg-gray-100'
//                   }`}
//                 >
//                   <motion.span
//                     animate={
//                       activeTab === item.id
//                         ? { rotate: [0, 6, -6, 0], scale: [1, 1.06, 1.02, 1] }
//                         : { rotate: 0, scale: 1 }
//                     }
//                     transition={{ duration: 0.6 }}
//                     className="p-2 rounded-md bg-white/8 group-hover:bg-white/6"
//                   >
//                     {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
//                   </motion.span>

//                   <span className="text-sm font-medium">{item.label}</span>
//                 </motion.button>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="pt-2 border-t border-gray-200/10">
//           <button
//             className="w-full p-3 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
//             onClick={() => {
//               handleProfileSubmit();
//               handleAccountSubmit();
//               handleNotificationsSubmit();
//             }}
//           >
//             <svg
//               className="w-4 h-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M12 2v6"
//                 stroke="white"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M12 16v6"
//                 stroke="white"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M4.9 7.6l4.2 3"
//                 stroke="white"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <span className="text-sm font-semibold">Save All</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main content area */}
//       <main className="flex-1 p-6 md:p-10">
//         <div className="max-w-5xl mx-auto">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeTab}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.35 }}
//               className={`p-6 rounded-2xl ${
//                 darkMode
//                   ? 'bg-gradient-to-b from-neutral-900/60 to-black/40 border border-gray-800'
//                   : 'bg-white/70 border border-gray-100'
//               } shadow-xl backdrop-blur-md`}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <h2 className="text-xl font-bold">{menuItems.find((m) => m.id === activeTab)?.label}</h2>
//                   <p className="text-sm opacity-80 mt-1">{getDescription(activeTab)}</p>
//                 </div>

//                 <div className="hidden md:flex items-center gap-3">
//                   <button className="p-2 rounded-full bg-white/6 hover:bg-white/10 transition">
//                     <svg
//                       className="w-5 h-5"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M12 5v14"
//                         stroke="currentColor"
//                         strokeWidth="1.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </button>

//                   <button className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md hover:brightness-105 transition">
//                     Apply
//                   </button>
//                 </div>
//               </div>

//               {/* Dynamic section content */}
//               <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {activeTab === 'profile' && (
//                   <form onSubmit={handleProfileSubmit} className="col-span-1 md:col-span-2 space-y-4">
//                     <Card>
//                       <label className="block text-xs font-semibold mb-2">Full name</label>
//                       <input
//                         value={profileData.fullName}
//                         onChange={(e) => setProfileData((p) => ({ ...p, fullName: e.target.value }))}
//                         placeholder="Your name"
//                         className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
//                       />
//                     </Card>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <Card>
//                         <label className="block text-xs font-semibold mb-2">Email</label>
//                         <input
//                           value={profileData.email}
//                           onChange={(e) => setProfileData((p) => ({ ...p, email: e.target.value }))}
//                           placeholder="name@example.com"
//                           className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
//                         />
//                       </Card>

//                       <Card>
//                         <label className="block text-xs font-semibold mb-2">Bio</label>
//                         <input
//                           value={profileData.bio}
//                           onChange={(e) => setProfileData((p) => ({ ...p, bio: e.target.value }))}
//                           placeholder="Short bio"
//                           className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
//                         />
//                       </Card>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <button
//                         type="submit"
//                         className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow hover:scale-[1.02] transition"
//                       >
//                         {saving.profile ? 'Saving...' : 'Save Profile'}
//                       </button>
//                       {savedMsg.profile && <div className="text-sm text-green-400">{savedMsg.profile}</div>}
//                     </div>
//                   </form>
//                 )}

//                 {activeTab === 'account' && (
//                   <form onSubmit={handleAccountSubmit} className="col-span-1 md:col-span-2 space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <Card>
//                         <label className="block text-xs font-semibold mb-2">Username</label>
//                         <input
//                           value={accountData.username}
//                           onChange={(e) => setAccountData((a) => ({ ...a, username: e.target.value }))}
//                           placeholder="username"
//                           className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
//                         />









//  <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
//         ইউজার অ্যাকাউন্ট ইনফো
//       </h2>

//       {/* Name */}
//       <div className="mb-3">
//         <p className="text-gray-500">নাম</p>
//         <p className="text-lg font-semibold">{user.name}</p>
//       </div>

//       {/* Email */}
//       <div className="mb-3">
//         <p className="text-gray-500">ইমেইল</p>
//         <p className="text-lg font-semibold">{user.email}</p>
//       </div>

//       {/* Phone */}
//       <div className="mb-3">
//         <p className="text-gray-500">ফোন</p>
//         <p className="text-lg font-semibold">
//           {isVerified ? user.phone : maskText(user.phone)}
//         </p>
//       </div>

//       {/* Balance */}
//       <div className="mb-3">
//         <p className="text-gray-500">ব্যালেন্স</p>
//         <p className="text-lg font-semibold">
//           {isVerified ? user.balance : maskText(user.balance)}
//         </p>
//       </div>

//       {!isVerified && (
//         <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
//           <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
//             <Lock size={18} /> পাসওয়ার্ড দিয়ে আনলক করুন
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="পাসওয়ার্ড দিন"
//             className="mt-2 w-full p-2 border rounded-md outline-none"
//           />
//           <button
//             onClick={handleVerify}
//             className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             আনলক করুন
//           </button>
//         </div>
//       )}
//     </div>








//                       </Card>

//                       <Card>
//                         <label className="block text-xs font-semibold mb-2">Phone</label>
//                         <input
//                           value={accountData.phone}
//                           onChange={(e) => setAccountData((a) => ({ ...a, phone: e.target.value }))}
//                           placeholder="+8801..."
//                           className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
//                         />
//                       </Card>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <button
//                         type="submit"
//                         className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow hover:scale-[1.02] transition"
//                       >
//                         {saving.account ? 'Saving...' : 'Save Account'}
//                       </button>
//                       {savedMsg.account && <div className="text-sm text-green-400">{savedMsg.account}</div>}
//                     </div>
//                   </form>
//                 )}

//                 {activeTab === 'security' && (
//                   <form onSubmit={handleSecuritySubmit} className="col-span-1 md:col-span-2 space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <Card>
//                         <label className="block text-xs font-semibold mb-2">New password</label>
//                         <input
//                           type="password"
//                           value={securityData.password}
//                           onChange={(e) => setSecurityData((s) => ({ ...s, password: e.target.value }))}
//                           placeholder="•••••••"
//                           className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-red-400 transition"
//                         />
//                       </Card>

//                       <Card>
//                         <label className="block text-xs font-semibold mb-2">Confirm password</label>
//                         <input
//                           type="password"
//                           value={securityData.confirm}
//                           onChange={(e) => setSecurityData((s) => ({ ...s, confirm: e.target.value }))}
//                           placeholder="•••••••"
//                           className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-red-400 transition"
//                         />
//                       </Card>
//                     </div>

//                     <Card>
//                       <label className="flex items-center justify-between gap-3">
//                         <span className="text-sm font-medium">Enable Two-Factor Authentication (2FA)</span>
//                         <input
//                           type="checkbox"
//                           checked={securityData.twoFA}
//                           onChange={(e) => setSecurityData((s) => ({ ...s, twoFA: e.target.checked }))}
//                           className="w-5 h-5 accent-indigo-400"
//                         />
//                       </label>
//                     </Card>

//                     <div className="flex items-center gap-3">
//                       <button
//                         type="submit"
//                         className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow hover:scale-[1.02] transition"
//                       >
//                         {saving.security ? 'Saving...' : 'Save Security'}
//                       </button>
//                       {savedMsg.security && <div className="text-sm text-green-400">{savedMsg.security}</div>}
//                     </div>
//                   </form>
//                 )}

//                 {activeTab === 'notifications' && (
//                   <form onSubmit={handleNotificationsSubmit} className="col-span-1 md:col-span-2 space-y-4">
//                     <Card>
//                       <label className="flex items-center justify-between">
//                         Email Notifications
//                         <input
//                           type="checkbox"
//                           checked={notificationsData.email}
//                           onChange={(e) => setNotificationsData((n) => ({ ...n, email: e.target.checked }))}
//                           className="w-5 h-5 accent-yellow-400"
//                         />
//                       </label>
//                     </Card>

//                     <Card>
//                       <label className="flex items-center justify-between">
//                         Push Notifications
//                         <input
//                           type="checkbox"
//                           checked={notificationsData.push}
//                           onChange={(e) => setNotificationsData((n) => ({ ...n, push: e.target.checked }))}
//                           className="w-5 h-5 accent-yellow-400"
//                         />
//                       </label>
//                     </Card>

//                     <div className="flex items-center gap-3">
//                       <button
//                         type="submit"
//                         className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow hover:scale-[1.02] transition"
//                       >
//                         {saving.notifications ? 'Saving...' : 'Save Notifications'}
//                       </button>
//                       {savedMsg.notifications && <div className="text-sm text-green-400">{savedMsg.notifications}</div>}
//                     </div>
//                   </form>
//                 )}

//                 {activeTab === 'payments' && (
//                   <form onSubmit={handlePaymentsSubmit} className="col-span-1 md:col-span-2 space-y-4">
//                     <Card>
//                       <label className="block text-xs font-semibold mb-2">Card number</label>
//                       <input
//                         value={paymentsData.card}
//                         onChange={(e) => setPaymentsData((p) => ({ ...p, card: e.target.value }))}
//                         placeholder="1234 5678 9012 3456"
//                         className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
//                       />
//                     </Card>

//                     <div className="grid grid-cols-2 gap-4">
//                       <Card>
//                         <label className="block text-xs font-semibold mb-2">Expiry</label>
//                         <input
//                           value={paymentsData.expiry}
//                           onChange={(e) => setPaymentsData((p) => ({ ...p, expiry: e.target.value }))}
//                           placeholder="MM/YY"
//                           className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
//                         />
//                       </Card>

//                       <Card>
//                         <label className="block text-xs font-semibold mb-2">CVC</label>
//                         <input
//                           value={paymentsData.cvc}
//                           onChange={(e) => setPaymentsData((p) => ({ ...p, cvc: e.target.value }))}
//                           placeholder="123"
//                           className="w-full p-3 rounded-lg bg-white/5 border border-white/6 outline-none focus:ring-2 focus:ring-indigo-400 transition"
//                         />
//                       </Card>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <button
//                         type="submit"
//                         className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow hover:scale-[1.02] transition"
//                       >
//                         {saving.payments ? 'Saving...' : 'Save Payments'}
//                       </button>
//                       {savedMsg.payments && <div className="text-sm text-green-400">{savedMsg.payments}</div>}
//                     </div>
//                   </form>
//                 )}

//                 {/* For tabs without forms, simple content */}
//                 {['privacy', 'appearance', 'language', 'apps', 'help', 'logout'].includes(activeTab) && (
//                   <div className="text-center text-gray-500 dark:text-gray-400 py-10">
//                     <p>{`This section "${activeTab}" is coming soon...`}</p>
//                   </div>
//                 )}
//               </section>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </main>

//       {/* Mobile Floating Menu Button */}
//       <button
//         aria-label="Open menu"
//         onClick={() => setShowMobileMenu(true)}
//         className="md:hidden fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-2xl z-50 transform-gpu hover:scale-105 transition"
//       >
//         <Menu className="w-6 h-6" />
//       </button>


//       {/* Mobile modal menu */}
//       <AnimatePresence>
//         {showMobileMenu && (
//           <motion.div
//             key="mobile-menu"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 md:hidden flex flex-col"
//           >
//             {/* Overlay */}
//             <div
//               className="absolute inset-0 bg-black/40"
//               onClick={() => setShowMobileMenu(false)}
//             />

//             {/* Menu content */}
//             <motion.div
//               initial={{ y: '100%' }}
//               animate={{ y: 0 }}
//               exit={{ y: '100%' }}
//               transition={{ type: 'spring', bounce: 0.15 }}
//               className={`relative bg-white dark:bg-neutral-900 p-6 rounded-t-2xl border-t border-gray-300 dark:border-gray-700 shadow-lg flex flex-col`}
//               style={{ maxHeight: '80vh', overflowY: 'auto' }}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold">Menu</h3>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setDarkMode(!darkMode)}
//                     className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
//                     aria-label="Toggle theme"
//                   >
//                     {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
//                   </button>

//                   <button
//                     onClick={() => setShowMobileMenu(false)}
//                     className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
//                     aria-label="Close menu"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 {menuItems.map((item) => (
//                   <motion.button
//                     key={item.id}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={() => {
//                       setActiveTab(item.id);
//                       setShowMobileMenu(false);
//                     }}
//                     className={`flex items-center gap-3 p-3 rounded-xl transition ${
//                       activeTab === item.id
//                         ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
//                         : darkMode
//                         ? 'bg-white/10 hover:bg-white/20'
//                         : 'bg-gray-50 hover:bg-gray-100'
//                     }`}
//                   >
//                     <div className="p-2 rounded-md bg-white/20">
//                       {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
//                     </div>
//                     <div className="text-left">
//                       <div className="text-sm font-medium">{item.label}</div>
//                       <div className="text-xs opacity-70">{getDescriptionShort(item.id)}</div>
//                     </div>
//                   </motion.button>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // Small card wrapper for form fields
// function Card({ children }) {
//   return (
//     <div
//       className="p-4 rounded-xl"
//       style={{
//         background:
//           'linear-gradient(180deg,rgba(255 255 255 / 0.08) 0%,rgba(255 255 255 / 0.02) 100%)',
//         border: '1px solid rgba(255 255 255 / 0.15)',
//         boxShadow:
//           'inset 0 1px 0 rgba(255 255 255 / 0.5),0 0 10px 3px rgba(255 255 255 / 0.1)',
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// function getDescription(id) {
//   switch (id) {
//     case 'account':
//       return 'Manage your account information, username and contact details.';
//     case 'profile':
//       return 'Edit your personal information, bio, and email.';
//     case 'security':
//       return 'Change your password and security settings.';
//     case 'privacy':
//       return 'Adjust your privacy settings.';
//     case 'notifications':
//       return 'Manage your notification preferences.';
//     case 'appearance':
//       return 'Customize the look and feel of your app.';
//     case 'language':
//       return 'Select your preferred language.';
//     case 'payments':
//       return 'Manage payment methods and billing information.';
//     case 'apps':
//       return 'Connected third-party applications.';
//     case 'help':
//       return 'Help articles and support.';
//     case 'logout':
//       return 'Sign out from your account.';
//     default:
//       return '';
//   }
// }

// function getDescriptionShort(id) {
//   switch (id) {
//     case 'account':
//       return 'Account & contact info';
//     case 'profile':
//       return 'Personal info & bio';
//     case 'security':
//       return 'Password & 2FA';
//     case 'privacy':
//       return 'Privacy settings';
//     case 'notifications':
//       return 'Email & push';
//     case 'appearance':
//       return 'Theme & colors';
//     case 'language':
//       return 'Language select';
//     case 'payments':
//       return 'Billing & cards';
//     case 'apps':
//       return 'Third-party apps';
//     case 'help':
//       return 'Support center';
//     case 'logout':
//       return 'Sign out';
//     default:
//       return '';
//   }
// }






// "use client";

// import { useState } from "react";
// import { User, Lock, Bell, Palette, Globe, Save } from "lucide-react";

// export default function SettingsPage() {
//   const [darkMode, setDarkMode] = useState(false);

//   return (
//     <div
//       className={`min-h-screen p-4 pb-20 transition-colors duration-500 ${
//         darkMode
//           ? "bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white"
//           : "bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-gray-900"
//       }`}
//     >
//       {/* Page Title */}
//       <h1 className="text-3xl font-extrabold text-center mb-6">
//         ⚙️ Settings
//       </h1>

//       <div className="max-w-3xl mx-auto space-y-6">
//         {/* Profile Settings */}
//         <div className="p-5 rounded-2xl shadow-lg bg-white/70 backdrop-blur-md dark:bg-gray-800/70 transition">
//           <div className="flex items-center gap-3 mb-4">
//             <User className="text-blue-500" />
//             <h2 className="font-bold text-lg">Profile</h2>
//           </div>
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full p-3 rounded-lg border focus:ring-2 ring-blue-400 outline-none"
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             className="w-full mt-3 p-3 rounded-lg border focus:ring-2 ring-blue-400 outline-none"
//           />
//         </div>

//         {/* Security */}
//         <div className="p-5 rounded-2xl shadow-lg bg-white/70 backdrop-blur-md dark:bg-gray-800/70">
//           <div className="flex items-center gap-3 mb-4">
//             <Lock className="text-red-500" />
//             <h2 className="font-bold text-lg">Security</h2>
//           </div>
//           <input
//             type="password"
//             placeholder="New Password"
//             className="w-full p-3 rounded-lg border focus:ring-2 ring-red-400 outline-none"
//           />
//         </div>

//         {/* Notifications */}
//         <div className="p-5 rounded-2xl shadow-lg bg-white/70 backdrop-blur-md dark:bg-gray-800/70">
//           <div className="flex items-center gap-3 mb-4">
//             <Bell className="text-yellow-500" />
//             <h2 className="font-bold text-lg">Notifications</h2>
//           </div>
//           <label className="flex items-center justify-between">
//             Email Notifications
//             <input type="checkbox" className="w-5 h-5 accent-yellow-500" />
//           </label>
//           <label className="flex items-center justify-between mt-2">
//             Push Notifications
//             <input type="checkbox" className="w-5 h-5 accent-yellow-500" />
//           </label>
//         </div>

//         {/* Theme */}
//         <div className="p-5 rounded-2xl shadow-lg bg-white/70 backdrop-blur-md dark:bg-gray-800/70">
//           <div className="flex items-center gap-3 mb-4">
//             <Palette className="text-purple-500" />
//             <h2 className="font-bold text-lg">Theme</h2>
//           </div>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`px-5 py-2 rounded-full font-semibold transition ${
//               darkMode
//                 ? "bg-yellow-400 text-black"
//                 : "bg-gray-900 text-white"
//             }`}
//           >
//             {darkMode ? "Light Mode" : "Dark Mode"}
//           </button>
//         </div>

//         {/* Language */}
//         <div className="p-5 rounded-2xl shadow-lg bg-white/70 backdrop-blur-md dark:bg-gray-800/70">
//           <div className="flex items-center gap-3 mb-4">
//             <Globe className="text-green-500" />
//             <h2 className="font-bold text-lg">Language</h2>
//           </div>
//           <select className="w-full p-3 rounded-lg border focus:ring-2 ring-green-400 outline-none">
//             <option>English</option>
//             <option>বাংলা</option>
//           </select>
//         </div>

//         {/* Save Button */}
//         <div className="text-center">
//           <button className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 transition flex items-center gap-2 mx-auto">
//             <Save size={18} />
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

 