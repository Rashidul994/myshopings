import { create } from "zustand";

interface UserState {
  name: string;
  balance: number;
  coin: number;
  action: (type: string, payload?: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: "",
  balance: 0,
  coin: 0,

  action: (type, payload) =>





    set((state) => {
      switch (type) {
        case "Rashid":
          return {
            ...state,
            name:'kamal',
            balance: payload.balance,
            coin: payload.coin,
            type:type,
          };

        case "Rashidul":
          return { ...state,
             balance: '0500',
             };

        case "SET_COIN":
          return { ...state, coin: payload };

        case "RESET":
          return { name: "", balance: 0, coin: 0 };

        default:
          return state;
      }
    }),
}));




// import { create } from "zustand";

// interface UserState {
//   name: string;
//   balance: number;
//   coin: number;
//   setUser: (data: { name: string; balance: number; coin: number }) => void;
// }

// export const useUserStore = create<UserState>((set) => ({
//   name: "",
//   balance: 0,
//   coin: 0,

//   setUser: (data) => set({
//     name: data.name,
//     balance: data.balance,
//     coin: data.coin,
//   }),








// }));



// import { create } from "zustand";
// import axios from "axios";

// interface UserState {
//   name: string;
//   balance: number;
//   coin: number;
//   status: string | null;
//   response: any;
//   setUser: (data: { name: string; balance: number; coin: number }) => void;
//   sendData: (payload: { name: string; balance: number; coin: number }) => Promise<void>;
// }

// export const useUserStore = create<UserState>((set) => ({
//   name: "",
//   balance: 6565,
//   coin: 0,
//   status: null,
//   response: null,

//   setUser: (data) =>
//     set({
//       name: data.name,
//       balance: data.balance,
//       coin: data.coin,
//     }),

//   sendData: async (payload) => {
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/api/send-data", payload);
//       const { type, message, data } = res.data;

//       switch (name) {
//         case "ras":
//           set({
//             name: data.name,
//             balance: data.balance,
//             coin: data.coin,
//             status: "success",
//             response: { message, data },
//           });
//           break;

//         case "error":
//           set({ status: "error", response: { message } });
//           break;

//         default:
//           set({ status: "unknown", response: { message: "Unknown response" } });
//       }
//     } catch (err) {
//       set({ status: "failed", response: { message: "Server error" } });
//     }
//   },
// }));



// import { create } from "zustand";
// import axios from "axios";

// interface ApiState {
//   status: string | null;
//   response: any;
//   sendData: (payload: { name: string; coin: number,type: string, }) => Promise<void>;
// }

// export const useApiStore = create<ApiState>((set) => ({
//   status: null,
//   response: null,

//   sendData: async (payload) => {
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/api/send-data", payload);
//       const { type, message, data } = res.data;

//       // 🔥 switch–case দিয়ে API response handle
//       switch (type) {
//         case "success":
//           set({ status: "success", response: { message, data } });
//           break;

//         case "error":
//           set({ status: "error", response: { message } });
//           break;

//         default:
//           set({ status: "unknown", response: { message: "Unknown response" } });
//       }
//     } catch (err) {
//       set({ status: "failed", response: { message: "Server error" } });
//     }
//   },
// }));




// import { create } from "zustand";
// import axios from "axios";

// interface UserState {
//   name: string;
//   balance: number;
//   coin: number;
//   status: string | null;
//   fetchUser: (userId: number) => Promise<void>;
// }

// export const useUserStore = create<UserState>((set) => ({
//   name: "",
//   balance: 0,
//   coin: 0,
//   status: null,

//   fetchUser: async (userId) => {
//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);
//       const { type, data } = res.data;

//       // 🔥 switch–case দিয়ে response handle
//       switch (type) {
//         case "success":
//           set({
//             name: data.name,
//             balance: data.balance,
//             coin: data.coin,
//             status: "success",
//           });
//           break;

//         case "error":
//           set({
//             name: "",
//             balance: 0,
//             coin: 0,
//             status: "error",
//           });
//           break;

//         default:
//           set({
//             name: "",
//             balance: 0,
//             coin: 0,
//             status: "unknown",
//           });
//       }
//     } catch (error) {
//       set({ status: "failed", name: "", balance: 0, coin: 0 });
//     }
//   },
// }));




// import { create } from "zustand";

// interface UserState {
//   name: string;
//   balance: number;
//   coin: number;
//   setUser: (data: { name: string; balance: number; coin: number }) => void;
// }

// export const useUserStore = create<UserState>((set) => ({
//   name: "",
//   balance: 0,
//   coin: 0,

//   setUser: (data) => set({
//     name: data.name,
//     balance: data.balance,
//     coin: data.coin,
//   }),
// }));




// import { create } from "zustand";
// import axios from "axios";

// interface ApiState {
//   data: any;
//   status: string | null;
//   sendData: (payload: { type: string; message: string }) => Promise<void>;
// }

// export const useApiStore = create<ApiState>((set) => ({
//   data: null,
//   status: null,

//   sendData: async (payload) => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/send-data", payload);

//       const { type, message } = response.data;

//       // 🔥 switch-case দিয়ে response handle করা
//       switch (type) {
//         case "info":
//           console.log("ℹ️ Info:", message);
//           set({ status: "info", data: response.data });
//           break;

//         case "success":
//           console.log("✅ Success:", message);
//           set({ status: "success", data: response.data });
//           break;

//         case "error":
//           console.error("❌ Error:", message);
//           set({ status: "error", data: response.data });
//           break;

//         default:
//           console.log("🔔 Default:", message);
//           set({ status: "default", data: response.data });
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       set({ status: "failed", data: null });
//     }
//   },
// }));
