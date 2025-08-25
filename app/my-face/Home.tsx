"use client";
import { useState, useEffect } from "react";
import { ThumbsUp, MessageCircle, Share2, Image, Smile } from "lucide-react";

// ✅ Single Post Component
function Post({ name, time, text, image, avatar }: any) {
  const [like, setLike] = useState(false);

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4 my-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img src={avatar} alt="profile" className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
          <p className="text-xs text-gray-500">{time} · 🌍 Public</p>
        </div>
      </div>

      {/* Content */}
      <p className="mt-3 text-gray-800 dark:text-gray-200">{text}</p>

      {/* Image */}
      {image && (
        <div className="mt-3 rounded-lg overflow-hidden">
          <img src={image} alt="post" className="w-full object-cover" />
        </div>
      )}

      {/* Actions Count */}
      <div className="flex justify-between items-center mt-3 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2">
        <span>👍 {like ? 121 : 120}</span>
        <span>45 Comments · 12 Shares</span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-2 text-gray-700 dark:text-gray-300">
        <button
          onClick={() => setLike(!like)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
            like ? "text-blue-600 font-semibold" : ""
          }`}
        >
          <ThumbsUp size={18} /> Like
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <MessageCircle size={18} /> Comment
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <Share2 size={18} /> Share
        </button>
      </div>
    </div>
  );
}

// ✅ Stories Section
function Stories() {
  const stories = [
    { img: "https://i.pravatar.cc/100?img=11", name: "Rashidul" },
    { img: "https://i.pravatar.cc/100?img=12", name: "Ayesha" },
    { img: "https://i.pravatar.cc/100?img=13", name: "Mehedi" },
    { img: "https://i.pravatar.cc/100?img=14", name: "Jannat" },
  ];

  return (
    <div className="max-w-xl mx-auto flex gap-3 overflow-x-auto py-3">
      {stories.map((story, i) => (
        <div
          key={i}
          className="flex flex-col items-center min-w-[70px] cursor-pointer"
        >
          <img
            src={story.img}
            alt={story.name}
            className="w-16 h-16 rounded-full border-2 border-blue-500"
          />
          <p className="text-xs mt-1 text-gray-700 dark:text-gray-300">
            {story.name}
          </p>
        </div>
      ))}
    </div>
  );
}

// ✅ New Post Box
function NewPost({ onAdd }: any) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const handlePost = () => {
    if (!text && !image) return;
    const newPost = {
      name: "You",
      time: "Just now",
      text,
      image,
      avatar: "https://i.pravatar.cc/50?u=new",
    };
    onAdd(newPost);
    setText("");
    setImage("");
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4 my-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/50?u=current"
          alt="you"
          className="w-10 h-10 rounded-full"
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="flex-1 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
        />
      </div>
      <div className="flex justify-between mt-3">
        <button
          onClick={() => setImage("https://picsum.photos/600/300")}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-lg"
        >
          <Image size={18} /> Photo
        </button>
        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-lg">
          <Smile size={18} /> Feeling
        </button>
        <button
          onClick={handlePost}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Post
        </button>
      </div>
    </div>
  );
}

// ✅ Main Feed Page
export default function FacebookPage() {
  const initialPosts = [
    {
      name: "Rashidul Islam",
      time: "2 hrs ago",
      text: "আজকে নতুন ই-কমার্স ওয়েবসাইট লঞ্চ করলাম 🚀 সবাইকে শুভেচ্ছা ❤️",
      image: "https://picsum.photos/600/400",
      avatar: "https://i.pravatar.cc/50?img=1",
    },
    {
      name: "Ayesha Khan",
      time: "5 hrs ago",
      text: "আজকে বন্ধুদের সাথে ঘুরতে গেলাম 🌸",
      image: "https://picsum.photos/600/401",
      avatar: "https://i.pravatar.cc/50?img=2",
    },
  ];

  const [posts, setPosts] = useState<any[]>([]);

  // ✅ Load posts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("fb-posts");
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      setPosts(initialPosts);
    }
  }, []);

  // ✅ Save posts to localStorage
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("fb-posts", JSON.stringify(posts));
    }
  }, [posts]);

  // ✅ নতুন পোস্ট অ্যাড
  const addNewPost = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        Facebook Clone
      </h1>
      <Stories />
      <NewPost onAdd={addNewPost} />
      {posts.map((post, i) => (
        <Post key={i} {...post} />
      ))}
      {posts.length === 0 && (
        <p className="text-center text-gray-500 py-4">No posts yet</p>
      )}
    </div>
  );
}















// "use client";
// import { useState, useEffect } from "react";
// import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";

// // ✅ Single Post Component
// function Post({ name, time, text, image, avatar }: any) {
//   const [like, setLike] = useState(false);

//   return (
//     <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4 my-6 border border-gray-200 dark:border-gray-700">
//       {/* Header */}
//       <div className="flex items-center gap-3">
//         <img src={avatar} alt="profile" className="w-10 h-10 rounded-full" />
//         <div>
//           <h3 className="font-semibold text-gray-900 dark:text-white">
//             {name}
//           </h3>
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

// // ✅ Feed Page with Infinite Scroll
// export default function FacebookFeed() {
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
//     {
//       name: "Mehedi Hasan",
//       time: "1 day ago",
//       text: "কোডিং শেখা আসলেই মজার 😍 Next.js + TailwindCSS rocks!",
//       image: "https://picsum.photos/600/402",
//       avatar: "https://i.pravatar.cc/50?img=3",
//     },
//   ];

//   const [posts, setPosts] = useState(initialPosts);
//   const [page, setPage] = useState(1);

//   // 👇 Fake Load More Posts
//   const loadMorePosts = () => {
//     const newPosts = initialPosts.map((p, i) => ({
//       ...p,
//       name: p.name + " (copy " + page + "-" + i + ")",
//       time: `${page + i} hrs ago`,
//       image: `https://picsum.photos/600/${400 + page + i}`,
//       avatar: `https://i.pravatar.cc/50?img=${page + i + 4}`,
//     }));
//     setPosts((prev) => [...prev, ...newPosts]);
//     setPage((prev) => prev + 1);
//   };

//   // 👇 Scroll Event Listener
//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop + 100 >=
//         document.documentElement.offsetHeight
//       ) {
//         loadMorePosts();
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [page]);

//   return (
//     <div className="bg-gray-100 dark:bg-gray-950 min-h-screen p-4">
//       <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
//         Facebook Feed (Infinite Scroll)
//       </h1>
//       {posts.map((post, index) => (
//         <Post key={index} {...post} />
//       ))}
//       <p className="text-center text-gray-500 py-4">Loading more posts...</p>
//     </div>
//   );
// }
