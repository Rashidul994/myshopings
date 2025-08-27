








// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Smile, Image as ImageIcon, Check, CheckDouble, Trash2, ThumbsUp } from "lucide-react";

// interface Message {
//   id: number;
//   text: string;
//   sender: "me" | "friend";
//   time: string;
//   avatar: string;
//   img?: string;
//   status?: "sent" | "delivered" | "seen";
//   reaction?: string;
//   replyTo?: string;
// }

// interface User {
//   id: number;
//   name: string;
//   avatar: string;
// }

// export default function MessengerProExtra() {
//   const users: User[] = [
//     { id: 1, name: "Ayesha", avatar: "https://i.pravatar.cc/40?u=ayesha" },
//     { id: 2, name: "Mehedi", avatar: "https://i.pravatar.cc/40?u=mehedi" },
//     { id: 3, name: "Jannat", avatar: "https://i.pravatar.cc/40?u=jannat" },
//   ];

//   const [selectedUser, setSelectedUser] = useState<User>(users[0]);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMsg, setNewMsg] = useState("");
//   const [emojiPicker, setEmojiPicker] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [replyMsg, setReplyMsg] = useState<Message | null>(null);
//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const saved = localStorage.getItem(`messages-${selectedUser.id}`);
//     if (saved) setMessages(JSON.parse(saved));
//     else setMessages([]);
//   }, [selectedUser]);

//   useEffect(() => {
//     localStorage.setItem(`messages-${selectedUser.id}`, JSON.stringify(messages));
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, selectedUser]);

//   const sendMessage = (img?: string) => {
//     if (!newMsg.trim() && !img) return;

//     const msg: Message = {
//       id: Date.now(),
//       text: newMsg,
//       sender: "me",
//       time: new Date().toLocaleTimeString(),
//       avatar: "https://i.pravatar.cc/40?u=me",
//       img,
//       status: "sent",
//       replyTo: replyMsg?.text,
//     };
//     setMessages([...messages, msg]);
//     setNewMsg("");
//     setReplyMsg(null);
//     setEmojiPicker(false);

//     setTyping(true);
//     setTimeout(() => {
//       setTyping(false);
//       const reply: Message = {
//         id: Date.now() + 1,
//         text: img ? "Nice photo!" : "Reply from " + selectedUser.name + ": " + newMsg,
//         sender: "friend",
//         time: new Date().toLocaleTimeString(),
//         avatar: selectedUser.avatar,
//         status: "seen",
//       };
//       setMessages((prev) =>
//         prev.map((m) => (m.sender === "me" ? { ...m, status: "delivered" } : m)).concat(reply)
//       );
//     }, 1500);
//   };

//   const addEmoji = (emoji: string) => setNewMsg((prev) => prev + emoji);

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file && file.type.startsWith("image/")) {
//       const url = URL.createObjectURL(file);
//       sendMessage(url);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => e.preventDefault();

//   const addReaction = (id: number, reaction: string) => {
//     setMessages((prev) =>
//       prev.map((m) => (m.id === id ? { ...m, reaction } : m))
//     );
//   };

//   const deleteMessage = (id: number) => {
//     setMessages((prev) => prev.filter((m) => m.id !== id));
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 flex flex-col">
//         <h2 className="p-4 font-bold text-lg border-b border-gray-300 dark:border-gray-700">Chats</h2>
//         <div className="flex-1 overflow-y-auto">
//           {users.map((user) => (
//             <div
//               key={user.id}
//               className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
//                 selectedUser.id === user.id ? "bg-gray-200 dark:bg-gray-700" : ""
//               }`}
//               onClick={() => setSelectedUser(user)}
//             >
//               <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
//               <span className="font-medium">{user.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         <div className="p-4 bg-blue-600 text-white flex justify-between items-center font-bold">
//           {selectedUser.name}
//           <button
//             className="bg-red-500 px-2 py-1 rounded text-sm hover:bg-red-600"
//             onClick={() => {
//               localStorage.removeItem(`messages-${selectedUser.id}`);
//               setMessages([]);
//             }}
//           >
//             Clear Chat
//           </button>
//         </div>

//         <div
//           className="flex-1 overflow-y-auto p-4 space-y-3"
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//         >
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex items-end ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
//             >
//               {msg.sender === "friend" && <img src={msg.avatar} alt="friend" className="w-8 h-8 rounded-full mr-2" />}
//               <div
//                 className={`px-3 py-2 rounded-2xl max-w-xs break-words shadow relative group ${
//                   msg.sender === "me"
//                     ? "bg-blue-500 text-white hover:bg-blue-600"
//                     : "bg-gray-300 text-gray-900 hover:bg-gray-400"
//                 }`}
//               >
//                 {msg.replyTo && (
//                   <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded mb-1 text-xs italic">
//                     Reply: {msg.replyTo}
//                   </div>
//                 )}
//                 {msg.img && <img src={msg.img} className="rounded-lg mb-1" alt="attached" />}
//                 <p>{msg.text}</p>
//                 <div className="flex justify-between items-center mt-1 text-xs opacity-70">
//                   <span>{msg.time}</span>
//                   <div className="flex items-center gap-1">
//                     {msg.sender === "me" && (
//                       <span>
//                         {msg.status === "sent" && <Check size={12} />}
//                         {msg.status === "delivered" && <CheckDouble size={12} />}
//                         {msg.status === "seen" && <CheckDouble size={12} className="text-blue-400" />}
//                       </span>
//                     )}
//                     {/* Reactions */}
//                     {msg.reaction && <span className="ml-1">{msg.reaction}</span>}
//                   </div>
//                 </div>

//                 {/* Hover actions */}
//                 <div className="absolute top-0 right-0 hidden group-hover:flex gap-1">
//                   <button onClick={() => addReaction(msg.id, "👍")} className="text-xs">👍</button>
//                   <button onClick={() => addReaction(msg.id, "❤️")} className="text-xs">❤️</button>
//                   <button onClick={() => setReplyMsg(msg)} className="text-xs">Reply</button>
//                   {msg.sender === "me" && (
//                     <button onClick={() => deleteMessage(msg.id)} className="text-xs text-red-600">
//                       <Trash2 size={12} />
//                     </button>
//                   )}
//                 </div>
//               </div>
//               {msg.sender === "me" && <img src={msg.avatar} alt="me" className="w-8 h-8 rounded-full ml-2" />}
//             </div>
//           ))}
//           {typing && <p className="text-sm text-gray-500 italic">Typing...</p>}
//           <div ref={chatEndRef}></div>
//         </div>

//         <div className="p-3 bg-white dark:bg-gray-900 flex items-center border-t border-gray-300 dark:border-gray-700">
//           {replyMsg && (
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded shadow text-sm mb-1">
//               Replying to: {replyMsg.text}
//               <button className="ml-2 text-red-500" onClick={() => setReplyMsg(null)}>x</button>
//             </div>
//           )}
//           <button
//             onClick={() => setEmojiPicker(!emojiPicker)}
//             className="mr-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
//           >
//             <Smile size={24} />
//           </button>
//           <input
//             type="text"
//             value={newMsg}
//             onChange={(e) => setNewMsg(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 border rounded-full px-4 py-2 outline-none dark:bg-gray-800 dark:text-white"
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button
//             onClick={() => sendMessage("https://picsum.photos/200/150")}
//             className="ml-2 mr-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
//           >
//             <ImageIcon size={24} />
//           </button>
//           <button
//             onClick={() => sendMessage()}
//             className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
//           >
//             Send
//           </button>
//         </div>

//         {emojiPicker && (
//           <div className="p-2 bg-gray-200 dark:bg-gray-800 flex flex-wrap gap-2 border-t border-gray-300 dark:border-gray-700">
//             {["😀","😂","😍","😭","😎","👍","🙏","🎉","💖","🔥"].map((e, i) => (
//               <button key={i} onClick={() => addEmoji(e)} className="text-2xl">{e}</button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Smile, Image as ImageIcon, Check, CheckDouble } from "lucide-react";

// interface Message {
//   id: number;
//   text: string;
//   sender: "me" | "friend";
//   time: string;
//   avatar: string;
//   img?: string;
//   status?: "sent" | "delivered" | "seen";
// }

// interface User {
//   id: number;
//   name: string;
//   avatar: string;
// }

// export default function MessengerProFull() {
//   const users: User[] = [
//     { id: 1, name: "Ayesha", avatar: "https://i.pravatar.cc/40?u=ayesha" },
//     { id: 2, name: "Mehedi", avatar: "https://i.pravatar.cc/40?u=mehedi" },
//     { id: 3, name: "Jannat", avatar: "https://i.pravatar.cc/40?u=jannat" },
//   ];

//   const [selectedUser, setSelectedUser] = useState<User>(users[0]);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMsg, setNewMsg] = useState("");
//   const [emojiPicker, setEmojiPicker] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   // Load messages
//   useEffect(() => {
//     const saved = localStorage.getItem(`messages-${selectedUser.id}`);
//     if (saved) setMessages(JSON.parse(saved));
//     else setMessages([]);
//   }, [selectedUser]);

//   // Save messages & scroll
//   useEffect(() => {
//     localStorage.setItem(`messages-${selectedUser.id}`, JSON.stringify(messages));
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, selectedUser]);

//   // Send message
//   const sendMessage = (img?: string) => {
//     if (!newMsg.trim() && !img) return;

//     const msg: Message = {
//       id: Date.now(),
//       text: newMsg,
//       sender: "me",
//       time: new Date().toLocaleTimeString(),
//       avatar: "https://i.pravatar.cc/40?u=me",
//       img,
//       status: "sent",
//     };
//     setMessages([...messages, msg]);
//     setNewMsg("");
//     setEmojiPicker(false);

//     // Friend typing simulation
//     setTyping(true);
//     setTimeout(() => {
//       setTyping(false);
//       const reply: Message = {
//         id: Date.now() + 1,
//         text: img ? "Nice photo!" : "Reply from " + selectedUser.name + ": " + newMsg,
//         sender: "friend",
//         time: new Date().toLocaleTimeString(),
//         avatar: selectedUser.avatar,
//         status: "seen",
//       };
//       setMessages((prev) =>
//         prev.map((m) => (m.sender === "me" ? { ...m, status: "delivered" } : m)).concat(reply)
//       );
//     }, 1500);
//   };

//   const addEmoji = (emoji: string) => setNewMsg((prev) => prev + emoji);

//   // Drag & Drop
//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file && file.type.startsWith("image/")) {
//       const url = URL.createObjectURL(file);
//       sendMessage(url);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => e.preventDefault();

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 flex flex-col">
//         <h2 className="p-4 font-bold text-lg border-b border-gray-300 dark:border-gray-700">Chats</h2>
//         <div className="flex-1 overflow-y-auto">
//           {users.map((user) => (
//             <div
//               key={user.id}
//               className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
//                 selectedUser.id === user.id ? "bg-gray-200 dark:bg-gray-700" : ""
//               }`}
//               onClick={() => setSelectedUser(user)}
//             >
//               <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
//               <span className="font-medium">{user.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="p-4 bg-blue-600 text-white flex justify-between items-center font-bold">
//           {selectedUser.name}
//           <button
//             className="bg-red-500 px-2 py-1 rounded text-sm hover:bg-red-600"
//             onClick={() => {
//               localStorage.removeItem(`messages-${selectedUser.id}`);
//               setMessages([]);
//             }}
//           >
//             Clear Chat
//           </button>
//         </div>

//         {/* Messages */}
//         <div
//           className="flex-1 overflow-y-auto p-4 space-y-3"
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//         >
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex items-end ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
//             >
//               {msg.sender === "friend" && <img src={msg.avatar} alt="friend" className="w-8 h-8 rounded-full mr-2" />}
//               <div
//                 className={`px-3 py-2 rounded-2xl max-w-xs break-words shadow ${
//                   msg.sender === "me"
//                     ? "bg-blue-500 text-white hover:bg-blue-600"
//                     : "bg-gray-300 text-gray-900 hover:bg-gray-400"
//                 } relative`}
//               >
//                 {msg.img && <img src={msg.img} className="rounded-lg mb-1" alt="attached" />}
//                 <p>{msg.text}</p>
//                 <div className="flex justify-between items-center mt-1 text-xs opacity-70">
//                   <span>{msg.time}</span>
//                   {msg.sender === "me" && (
//                     <span className="ml-2">
//                       {msg.status === "sent" && <Check size={12} />}
//                       {msg.status === "delivered" && <CheckDouble size={12} />}
//                       {msg.status === "seen" && <CheckDouble size={12} className="text-blue-400" />}
//                     </span>
//                   )}
//                 </div>
//               </div>
//               {msg.sender === "me" && <img src={msg.avatar} alt="me" className="w-8 h-8 rounded-full ml-2" />}
//             </div>
//           ))}
//           {typing && <p className="text-sm text-gray-500 italic">Typing...</p>}
//           <div ref={chatEndRef}></div>
//         </div>

//         {/* Input */}
//         <div className="p-3 bg-white dark:bg-gray-900 flex items-center border-t border-gray-300 dark:border-gray-700">
//           <button
//             onClick={() => setEmojiPicker(!emojiPicker)}
//             className="mr-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
//           >
//             <Smile size={24} />
//           </button>
//           <input
//             type="text"
//             value={newMsg}
//             onChange={(e) => setNewMsg(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 border rounded-full px-4 py-2 outline-none dark:bg-gray-800 dark:text-white"
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button
//             onClick={() => sendMessage("https://picsum.photos/200/150")}
//             className="ml-2 mr-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
//           >
//             <ImageIcon size={24} />
//           </button>
//           <button
//             onClick={() => sendMessage()}
//             className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
//           >
//             Send
//           </button>
//         </div>

//         {/* Emoji Picker */}
//         {emojiPicker && (
//           <div className="p-2 bg-gray-200 dark:bg-gray-800 flex flex-wrap gap-2 border-t border-gray-300 dark:border-gray-700">
//             {["😀","😂","😍","😭","😎","👍","🙏","🎉","💖","🔥"].map((e, i) => (
//               <button key={i} onClick={() => addEmoji(e)} className="text-2xl">
//                 {e}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// "use client";
// import { useState, useEffect } from "react";
// import { ThumbsUp, MessageCircle, Share2, Image, Smile } from "lucide-react";

// // ✅ Single Post Component
// function Post({ name, time, text, image, avatar }: any) {
//   const [like, setLike] = useState(false);

//   return (
//     <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4 my-6 border border-gray-200 dark:border-gray-700">
//       {/* Header */}
//       <div className="flex items-center gap-3">
//         <img src={avatar} alt="profile" className="w-10 h-10 rounded-full" />
//         <div>
//           <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
//           <p className="text-xs text-gray-500">{time} · 🌍 Public</p>
//         </div>
//       </div>

//       {/* Content */}
//       <p className="mt-3 text-gray-800 dark:text-gray-200">{text}</p>

//       {/* Image */}
//       {image && (
//         <div className="mt-3 rounded-lg overflow-hidden">
//           <img src={image} alt="post" className="w-full object-cover" />
//         </div>
//       )}

//       {/* Actions Count */}
//       <div className="flex justify-between items-center mt-3 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2">
//         <span>👍 {like ? 121 : 120}</span>
//         <span>45 Comments · 12 Shares</span>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-between items-center mt-2 text-gray-700 dark:text-gray-300">
//         <button
//           onClick={() => setLike(!like)}
//           className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
//             like ? "text-blue-600 font-semibold" : ""
//           }`}
//         >
//           <ThumbsUp size={18} /> Like
//         </button>
//         <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
//           <MessageCircle size={18} /> Comment
//         </button>
//         <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
//           <Share2 size={18} /> Share
//         </button>
//       </div>
//     </div>
//   );
// }

// // ✅ Stories Section
// function Stories() {
//   const stories = [
//     { img: "https://i.pravatar.cc/100?img=11", name: "Rashidul" },
//     { img: "https://i.pravatar.cc/100?img=12", name: "Ayesha" },
//     { img: "https://i.pravatar.cc/100?img=13", name: "Mehedi" },
//     { img: "https://i.pravatar.cc/100?img=14", name: "Jannat" },
//   ];

//   return (
//     <div className="max-w-xl mx-auto flex gap-3 overflow-x-auto py-3">
//       {stories.map((story, i) => (
//         <div
//           key={i}
//           className="flex flex-col items-center min-w-[70px] cursor-pointer"
//         >
//           <img
//             src={story.img}
//             alt={story.name}
//             className="w-16 h-16 rounded-full border-2 border-blue-500"
//           />
//           <p className="text-xs mt-1 text-gray-700 dark:text-gray-300">
//             {story.name}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ✅ New Post Box
// function NewPost({ onAdd }: any) {
//   const [text, setText] = useState("");
//   const [image, setImage] = useState("");

//   const handlePost = () => {
//     if (!text && !image) return;
//     const newPost = {
//       name: "You",
//       time: "Just now",
//       text,
//       image,
//       avatar: "https://i.pravatar.cc/50?u=new",
//     };
//     onAdd(newPost);
//     setText("");
//     setImage("");
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4 my-4 border border-gray-200 dark:border-gray-700">
//       <div className="flex items-center gap-3">
//         <img
//           src="https://i.pravatar.cc/50?u=current"
//           alt="you"
//           className="w-10 h-10 rounded-full"
//         />
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="What's on your mind?"
//           className="flex-1 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
//         />
//       </div>
//       <div className="flex justify-between mt-3">
//         <button
//           onClick={() => setImage("https://picsum.photos/600/300")}
//           className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-lg"
//         >
//           <Image size={18} /> Photo
//         </button>
//         <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-lg">
//           <Smile size={18} /> Feeling
//         </button>
//         <button
//           onClick={handlePost}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           Post
//         </button>
//       </div>
//     </div>
//   );
// }

// // ✅ Main Feed Page
// export default function FacebookPage() {
//   const initialPosts = [
//     {
//       name: "Rashidul Islam",
//       time: "2 hrs ago",
//       text: "আজকে নতুন ই-কমার্স ওয়েবসাইট লঞ্চ করলাম 🚀 সবাইকে শুভেচ্ছা ❤️",
//       image: "https://picsum.photos/600/400",
//       avatar: "https://i.pravatar.cc/50?img=1",
//     },
//     {
//       name: "Ayesha Khan",
//       time: "5 hrs ago",
//       text: "আজকে বন্ধুদের সাথে ঘুরতে গেলাম 🌸",
//       image: "https://picsum.photos/600/401",
//       avatar: "https://i.pravatar.cc/50?img=2",
//     },
//   ];

//   const [posts, setPosts] = useState<any[]>([]);

//   // ✅ Load posts from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("fb-posts");
//     if (saved) {
//       setPosts(JSON.parse(saved));
//     } else {
//       setPosts(initialPosts);
//     }
//   }, []);

//   // ✅ Save posts to localStorage
//   useEffect(() => {
//     if (posts.length > 0) {
//       localStorage.setItem("fb-posts", JSON.stringify(posts));
//     }
//   }, [posts]);

//   // ✅ নতুন পোস্ট অ্যাড
//   const addNewPost = (newPost: any) => {
//     setPosts([newPost, ...posts]);
//   };

//   return (
//     <div className="bg-gray-100 dark:bg-gray-950 min-h-screen p-4">
//       <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
//         Facebook Clone
//       </h1>
//       <Stories />
//       <NewPost onAdd={addNewPost} />
//       {posts.map((post, i) => (
//         <Post key={i} {...post} />
//       ))}
//       {posts.length === 0 && (
//         <p className="text-center text-gray-500 py-4">No posts yet</p>
//       )}
//     </div>
//   );
// }



import React from 'react'

export default function Messangert() {
  return (
    <div>Messangert</div>
  )
}




// "use client";
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Smile, Image as ImageIcon, Check,  Trash2, Video, Phone, Mic, MicOff, X } from "lucide-react";

// interface Message {
//   id: number;
//   text: string;
//   sender: "me" | "friend";
//   time: string;
//   avatar: string;
//   img?: string;
//   file?: string;
//   gif?: string;
//   status?: "sent" | "delivered" | "seen";
//   reaction?: string;
//   replyTo?: string;
// }

// interface User {
//   id: number;
//   name: string;
//   avatar: string;
//   online: boolean;
//   story?: string;
// }

// interface Notification {
//   id: number;
//   text: string;
// }

// export default function MessengerFullApp() {
//   const users: User[] = [
//     { id: 1, name: "Ayesha", avatar: "https://i.pravatar.cc/40?u=ayesha", online: true, story:"https://picsum.photos/300/500?random=1" },
//     { id: 2, name: "Mehedi", avatar: "https://i.pravatar.cc/40?u=mehedi", online: false, story:"https://picsum.photos/300/500?random=2" },
//     { id: 3, name: "Jannat", avatar: "https://i.pravatar.cc/40?u=jannat", online: true, story:"https://picsum.photos/300/500?random=3" },
//     { id: 4, name: "Rashidul", avatar: "https://i.pravatar.cc/40?u=rashidul", online: true, story:"https://picsum.photos/300/500?random=4" },
//   ];

//   const [activeUser, setActiveUser] = useState<User>(users[0]);
//   const [tabs, setTabs] = useState<User[]>([users[0]]);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMsg, setNewMsg] = useState("");
//   const [emojiPicker, setEmojiPicker] = useState(false);
//   const [stickerPicker, setStickerPicker] = useState(false);
//   const [gifPicker, setGifPicker] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [replyMsg, setReplyMsg] = useState<Message | null>(null);
//   const [storyView, setStoryView] = useState<User | null>(null);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [callModal, setCallModal] = useState<"voice" | "video" | null>(null);
//   const [callTimer, setCallTimer] = useState(0);
//   const [micMuted, setMicMuted] = useState(false);

//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   const stickers = ["😎","😂","😍","😭","🎉","💖","🔥","👍","🙏"];
//   const gifs = [
//     "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
//     "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
//     "https://media.giphy.com/media/26BRzozg4TCBXv6QU/giphy.gif"
//   ];

//   // Load messages from localStorage per activeUser
//   useEffect(() => {
//     const saved = localStorage.getItem(`messages-${activeUser.id}`);
//     if (saved) setMessages(JSON.parse(saved));
//     else setMessages([]);
//   }, [activeUser]);

//   useEffect(() => {
//     localStorage.setItem(`messages-${activeUser.id}`, JSON.stringify(messages));
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, activeUser]);

//   useEffect(() => {
//     let timer: NodeJS.Timer;
//     if (callModal) {
//       timer = setInterval(() => setCallTimer(prev => prev + 1), 1000);
//     } else setCallTimer(0);
//     return () => clearInterval(timer);
//   }, [callModal]);

//   const sendMessage = (img?: string, file?: string, sticker?: string, gif?: string) => {
//     if (!newMsg.trim() && !img && !file && !sticker && !gif) return;

//     const msg: Message = {
//       id: Date.now(),
//       text: sticker || newMsg,
//       sender: "me",
//       time: new Date().toLocaleTimeString(),
//       avatar: "https://i.pravatar.cc/40?u=me",
//       img,
//       file,
//       gif,
//       status: "sent",
//       replyTo: replyMsg?.text,
//     };
//     setMessages([...messages, msg]);
//     setNewMsg("");
//     setReplyMsg(null);
//     setEmojiPicker(false);
//     setStickerPicker(false);
//     setGifPicker(false);

//     // Friend typing simulation & notifications
//     setTyping(true);
//     setTimeout(() => {
//       setTyping(false);
//       const reply: Message = {
//         id: Date.now() + 1,
//         text: img ? "Nice photo!" : sticker ? sticker : gif ? "GIF sent!" : "Reply from " + activeUser.name + ": " + newMsg,
//         sender: "friend",
//         time: new Date().toLocaleTimeString(),
//         avatar: activeUser.avatar,
//         status: "seen",
//       };
//       setMessages((prev) =>
//         prev.map((m) => (m.sender === "me" ? { ...m, status: "delivered" } : m)).concat(reply)
//       );
//       setNotifications((prev) => [...prev, { id: Date.now(), text: activeUser.name + " sent a message" }]);
//       setTimeout(() => setNotifications((prev) => prev.slice(1)), 3000);
//     }, 1500);
//   };

//   const addReaction = (id: number, reaction: string) => {
//     setMessages((prev) =>
//       prev.map((m) => (m.id === id ? { ...m, reaction } : m))
//     );
//   };

//   const deleteMessage = (id: number) => {
//     setMessages((prev) => prev.filter((m) => m.id !== id));
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       if (file.type.startsWith("image/")) sendMessage(url);
//       else sendMessage(undefined, url);
//     }
//   };
//   const handleDragOver = (e: React.DragEvent) => e.preventDefault();

//   const addTab = (user: User) => {
//     if (!tabs.find(t => t.id === user.id)) setTabs([...tabs, user]);
//     setActiveUser(user);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 flex flex-col">
//         <h2 className="p-4 font-bold text-lg border-b border-gray-300 dark:border-gray-700">Chats</h2>

//         {/* Stories */}
//         <div className="flex gap-3 overflow-x-auto p-2 border-b border-gray-300 dark:border-gray-700">
//           {users.map((u) => (
//             <div key={u.id} className="flex flex-col items-center cursor-pointer">
//               <div className="relative" onClick={() => u.story && setStoryView(u)}>
//                 <img src={u.avatar} className="w-12 h-12 rounded-full border-2 border-blue-500" />
//                 {u.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>}
//               </div>
//               <span className="text-xs">{u.name}</span>
//             </div>
//           ))}
//         </div>

//         {/* User list */}
//         <div className="flex-1 overflow-y-auto">
//           {users.map((user) => (
//             <motion.div
//               key={user.id}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className={`flex items-center p-3 cursor-pointer ${
//                 activeUser.id === user.id ? "bg-gray-200 dark:bg-gray-700" : ""
//               }`}
//               onClick={() => addTab(user)}
//             >
//               <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
//               <div className="flex flex-col">
//                 <span className="font-medium">{user.name}</span>
//                 {user.online && <span className="text-xs text-green-500">Online</span>}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Tabs */}
//         <div className="flex bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
//           {tabs.map((tab) => (
//             <div
//               key={tab.id}
//               className={`px-4 py-2 cursor-pointer ${activeUser.id === tab.id ? "bg-white dark:bg-gray-900" : ""}`}
//               onClick={() => setActiveUser(tab)}
//             >
//               {tab.name}
//             </div>
//           ))}
//         </div>

//         {/* Header */}
//         <div className="p-4 bg-blue-600 text-white flex justify-between items-center font-bold">
//           <span>{activeUser.name}</span>
//           <div className="flex gap-2">
//             <button onClick={() => setCallModal("voice")}><Phone size={20} /></button>
//             <button onClick={() => setCallModal("video")}><Video size={20} /></button>
//             <button
//               className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
//               onClick={() => {
//                 localStorage.removeItem(`messages-${activeUser.id}`);
//                 setMessages([]);
//               }}
//             >
//               Clear Chat
//             </button>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3" onDrop={handleDrop} onDragOver={handleDragOver}>
//           <AnimatePresence initial={false}>
//             {messages.map((msg) => (
//               <motion.div
//                 key={msg.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className={`flex items-end ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
//               >
//                 {msg.sender === "friend" && <img src={msg.avatar} className="w-8 h-8 rounded-full mr-2" />}
//                 <motion.div layout className={`px-3 py-2 rounded-2xl max-w-xs break-words shadow relative group ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-900"}`}>
//                   {msg.replyTo && <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded mb-1 text-xs italic">Reply: {msg.replyTo}</div>}
//                   {msg.img && <img src={msg.img} className="rounded-lg mb-1" />}
//                   {msg.file && <a href={msg.file} target="_blank" className="block text-xs underline mb-1">{msg.file.split("/").pop()}</a>}
//                   {msg.gif && <img src={msg.gif} className="rounded-lg mb-1" />}
//                   <p>{msg.text}</p>
//                   <div className="flex justify-between items-center mt-1 text-xs opacity-70">
//                     <span>{msg.time}</span>
//                     <div className="flex items-center gap-1">
//                       {msg.sender === "me" && (
//                         <span>
//                           {msg.status === "sent" && <Check size={12} />}
//                           {msg.status === "delivered" && <CheckDouble size={12} />}
//                           {msg.status === "seen" && <CheckDouble size={12} className="text-green-500" />}
//                         </span>
//                       )}
//                       <button className="opacity-0 group-hover:opacity-100" onClick={() => deleteMessage(msg.id)}>🗑</button>
//                     </div>
//                   </div>
//                   {msg.reaction && <div className="absolute -top-3 right-0">{msg.reaction}</div>}
//                 </motion.div>
//                 {msg.sender === "me" && <img src={msg.avatar} className="w-8 h-8 rounded-full ml-2" />}
//               </motion.div>
//             ))}
//           </AnimatePresence>
//           <div ref={chatEndRef}></div>
//         </div>

//         {typing && <div className="p-2 text-sm text-gray-500 italic">Typing...</div>}

//         {/* Input */}
//         <div className="p-3 bg-gray-200 dark:bg-gray-800 flex items-center gap-2">
//           <button onClick={() => setEmojiPicker(!emojiPicker)}>😊</button>
//           <button onClick={() => setStickerPicker(!stickerPicker)}>🎨</button>
//           <button onClick={() => setGifPicker(!gifPicker)}>GIF</button>
//           <input
//             type="text"
//             value={newMsg}
//             onChange={(e) => setNewMsg(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 rounded-full px-4 py-2 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button onClick={() => sendMessage()} className="px-4 py-2 bg-blue-600 text-white rounded-full">Send</button>
//         </div>

//         {/* Emoji / Sticker / GIF */}
//         <AnimatePresence>
//           {emojiPicker && (
//             <motion.div className="p-2 bg-gray-100 dark:bg-gray-900 flex gap-2 flex-wrap"
//               initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}>
//               {stickers.map(s => <button key={s} onClick={() => sendMessage(s)}>{s}</button>)}
//             </motion.div>
//           )}
//           {stickerPicker && (
//             <motion.div className="p-2 bg-gray-100 dark:bg-gray-900 flex gap-2 flex-wrap"
//               initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}>
//               {stickers.map(s => <button key={s} onClick={() => sendMessage(s)}>{s}</button>)}
//             </motion.div>
//           )}
//           {gifPicker && (
//             <motion.div className="p-2 bg-gray-100 dark:bg-gray-900 flex gap-2 overflow-x-auto"
//               initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}>
//               {gifs.map(g => <img key={g} src={g} className="w-20 h-20 rounded cursor-pointer" onClick={() => sendMessage(undefined, undefined, undefined, g)} />)}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Story Viewer */}
//         <AnimatePresence>
//           {storyView && (
//             <motion.div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//               <motion.div className="relative" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
//                 <img src={storyView.story} className="max-h-[80vh] rounded-lg object-cover" />
//                 <button className="absolute top-2 right-2 text-white text-2xl font-bold" onClick={() => setStoryView(null)}>×</button>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Notifications */}
//         <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
//           <AnimatePresence>
//             {notifications.map(n => (
//               <motion.div key={n.id} initial={{ x: 100, opacity:0 }} animate={{ x:0, opacity:1 }} exit={{ x:100, opacity:0 }} className="bg-blue-600 text-white px-4 py-2 rounded shadow">
//                 {n.text}
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* Call Modal */}
//         <AnimatePresence>
//           {callModal && (
//             <motion.div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
//               initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
//               <motion.div className="bg-white dark:bg-gray-900 p-6 rounded-lg flex flex-col items-center w-80">
//                 <h3 className="text-lg font-bold mb-2">{activeUser.name} is {callModal} calling...</h3>
//                 <span className="text-sm mb-4">Timer: {Math.floor(callTimer/60).toString().padStart(2,"0")}:{(callTimer%60).toString().padStart(2,"0")}</span>
//                 <div className="flex gap-4">
//                   <button onClick={() => setMicMuted(!micMuted)} className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded flex items-center gap-1">{micMuted ? <MicOff size={16}/> : <Mic size={16}/>}{micMuted ? "Unmute" : "Mute"}</button>
//                   <button onClick={() => setCallModal(null)} className="px-3 py-2 bg-red-600 text-white rounded flex items-center gap-1"><X size={16}/> End</button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//       </div>
//     </div>
//   );
// }








// "use client";
// import { useState, useEffect, useRef } from "react";

// interface Message {
//   id: number;
//   text: string;
//   sender: "me" | "friend";
//   time: string;
// }

// export default function MessengerLocal() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMsg, setNewMsg] = useState("");
//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   // Load messages from localStorage on mount
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const saved = localStorage.getItem("local-messages");
//       if (saved) {
//         setMessages(JSON.parse(saved));
//       }
//     }
//   }, []);

//   // Save messages to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("local-messages", JSON.stringify(messages));
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Send message
//   const sendMessage = () => {
//     if (!newMsg.trim()) return;

//     const msg: Message = {
//       id: Date.now(),
//       text: newMsg,
//       sender: "me",
//       time: new Date().toLocaleTimeString(),
//     };

//     setMessages([...messages, msg]);
//     setNewMsg("");

//     // Optional: simulate friend reply
//     setTimeout(() => {
//       const reply: Message = {
//         id: Date.now() + 1,
//         text: "Friend reply: " + newMsg,
//         sender: "friend",
//         time: new Date().toLocaleTimeString(),
//       };
//       setMessages((prev) => [...prev, reply]);
//     }, 1000);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Header */}
//       <div className="p-4 bg-blue-600 text-white font-bold flex justify-between items-center">
//         Messenger
//         <button
//           className="bg-red-500 px-2 py-1 rounded text-sm"
//           onClick={() => {
//             localStorage.removeItem("local-messages");
//             setMessages([]);
//           }}
//         >
//           Clear Chat
//         </button>
//       </div>

//       {/* Chat Box */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-2">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex ${
//               msg.sender === "me" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`px-3 py-2 rounded-2xl text-white max-w-xs break-words ${
//                 msg.sender === "me" ? "bg-blue-500" : "bg-gray-500"
//               }`}
//             >
//               <p>{msg.text}</p>
//               <span className="text-xs opacity-70">{msg.time}</span>
//             </div>
//           </div>
//         ))}
//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Input */}
//       <div className="p-3 bg-white flex items-center border-t">
//         <input
//           type="text"
//           value={newMsg}
//           onChange={(e) => setNewMsg(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 border rounded-full px-4 py-2 outline-none"
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
























// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Smile, Image as ImageIcon } from "lucide-react";

// interface Message {
//   id: number;
//   text: string;
//   sender: "me" | "friend";
//   time: string;
//   avatar: string;
//   img?: string;
// }

// interface User {
//   id: number;
//   name: string;
//   avatar: string;
// }

// export default function MessengerFull() {
//   const users: User[] = [
//     { id: 1, name: "Ayesha", avatar: "https://i.pravatar.cc/40?u=ayesha" },
//     { id: 2, name: "Mehedi", avatar: "https://i.pravatar.cc/40?u=mehedi" },
//     { id: 3, name: "Jannat", avatar: "https://i.pravatar.cc/40?u=jannat" },
//   ];

//   const [selectedUser, setSelectedUser] = useState<User>(users[0]);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMsg, setNewMsg] = useState("");
//   const [emojiPicker, setEmojiPicker] = useState(false);
//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   // Load messages from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem(`messages-${selectedUser.id}`);
//     if (saved) setMessages(JSON.parse(saved));
//     else setMessages([]);
//   }, [selectedUser]);

//   // Save messages & scroll
//   useEffect(() => {
//     localStorage.setItem(`messages-${selectedUser.id}`, JSON.stringify(messages));
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, selectedUser]);

//   const sendMessage = (img?: string) => {
//     if (!newMsg.trim() && !img) return;

//     const msg: Message = {
//       id: Date.now(),
//       text: newMsg,
//       sender: "me",
//       time: new Date().toLocaleTimeString(),
//       avatar: "https://i.pravatar.cc/40?u=me",
//       img,
//     };
//     setMessages([...messages, msg]);
//     setNewMsg("");
//     setEmojiPicker(false);

//     // Simulate friend reply
//     setTimeout(() => {
//       const reply: Message = {
//         id: Date.now() + 1,
//         text: img ? "Nice photo!" : "Reply from " + selectedUser.name + ": " + newMsg,
//         sender: "friend",
//         time: new Date().toLocaleTimeString(),
//         avatar: selectedUser.avatar,
//       };
//       setMessages((prev) => [...prev, reply]);
//     }, 1000);
//   };

//   const addEmoji = (emoji: string) => {
//     setNewMsg((prev) => prev + emoji);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 flex flex-col">
//         <h2 className="p-4 font-bold text-lg border-b border-gray-300 dark:border-gray-700">Chats</h2>
//         <div className="flex-1 overflow-y-auto">
//           {users.map((user) => (
//             <div
//               key={user.id}
//               className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
//                 selectedUser.id === user.id ? "bg-gray-200 dark:bg-gray-700" : ""
//               }`}
//               onClick={() => setSelectedUser(user)}
//             >
//               <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
//               <span className="font-medium">{user.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="p-4 bg-blue-600 text-white flex justify-between items-center font-bold">
//           {selectedUser.name}
//           <button
//             className="bg-red-500 px-2 py-1 rounded text-sm hover:bg-red-600"
//             onClick={() => {
//               localStorage.removeItem(`messages-${selectedUser.id}`);
//               setMessages([]);
//             }}
//           >
//             Clear Chat
//           </button>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex items-end ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
//             >
//               {msg.sender === "friend" && <img src={msg.avatar} alt="friend" className="w-8 h-8 rounded-full mr-2" />}
//               <div
//                 className={`px-3 py-2 rounded-2xl max-w-xs break-words shadow ${
//                   msg.sender === "me"
//                     ? "bg-blue-500 text-white hover:bg-blue-600"
//                     : "bg-gray-300 text-gray-900 hover:bg-gray-400"
//                 }`}
//               >
//                 {msg.img && <img src={msg.img} className="rounded-lg mb-1" alt="attached" />}
//                 <p>{msg.text}</p>
//                 <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
//               </div>
//               {msg.sender === "me" && <img src={msg.avatar} alt="me" className="w-8 h-8 rounded-full ml-2" />}
//             </div>
//           ))}
//           <div ref={chatEndRef}></div>
//         </div>

//         {/* Input */}
//         <div className="p-3 bg-white dark:bg-gray-900 flex items-center border-t border-gray-300 dark:border-gray-700">
//           <button
//             onClick={() => setEmojiPicker(!emojiPicker)}
//             className="mr-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
//           >
//             <Smile size={24} />
//           </button>

//           <input
//             type="text"
//             value={newMsg}
//             onChange={(e) => setNewMsg(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 border rounded-full px-4 py-2 outline-none dark:bg-gray-800 dark:text-white"
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />

//           <button
//             onClick={() => sendMessage("https://picsum.photos/200/150")}
//             className="ml-2 mr-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
//           >
//             <ImageIcon size={24} />
//           </button>

//           <button
//             onClick={() => sendMessage()}
//             className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
//           >
//             Send
//           </button>
//         </div>

//         {/* Emoji Picker */}
//         {emojiPicker && (
//           <div className="p-2 bg-gray-200 dark:bg-gray-800 flex flex-wrap gap-2 border-t border-gray-300 dark:border-gray-700">
//             {["😀","😂","😍","😭","😎","👍","🙏","🎉","💖","🔥"].map((e, i) => (
//               <button key={i} onClick={() => addEmoji(e)} className="text-2xl">
//                 {e}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// "use client";
// import { useState, useRef, useEffect } from "react";
// import {
//   Smile,
//   Image as ImageIcon,
//   Check,
//   CheckDouble,
//   Trash2,
//   ThumbsUp,
// } from "lucide-react";

// export default function ChatBox() {
//   const [messages, setMessages] = useState<{ id: number; text: string; sent: boolean; read: boolean }[]>([]);
//   const [input, setInput] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);

//   const sendMessage = () => {
//     if (input.trim() === "") return;
//     const newMessage = {
//       id: Date.now(),
//       text: input,
//       sent: true,
//       read: false,
//     };
//     setMessages([...messages, newMessage]);
//     setInput("");
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Messages */}
//       <div className="flex-1 p-4 overflow-y-auto space-y-2">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className="flex items-center justify-end gap-2"
//           >
//             <div className="bg-blue-500 text-white px-3 py-2 rounded-2xl shadow-md max-w-xs">
//               {msg.text}
//             </div>
//             <div className="text-gray-400">
//               {msg.read ? <CheckDouble size={16} /> : <Check size={16} />}
//             </div>
//             <button
//               className="text-red-500 hover:text-red-700"
//               onClick={() =>
//                 setMessages(messages.filter((m) => m.id !== msg.id))
//               }
//             >
//               <Trash2 size={16} />
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="p-3 flex items-center gap-2 border-t dark:border-gray-700">
//         <Smile size={22} className="text-gray-500 cursor-pointer" />
//         <ImageIcon size={22} className="text-gray-500 cursor-pointer" />
//         <input
//           ref={inputRef}
//           type="text"
//           className="flex-1 p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
//         >
//           Send
//         </button>
//         <ThumbsUp className="text-gray-500 cursor-pointer" />
//       </div>
//     </div>
//   );
// }


