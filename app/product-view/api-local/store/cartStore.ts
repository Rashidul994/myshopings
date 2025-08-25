// 📁 lib/store/cartStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  imk?: string;
  size?: string;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalCount: () => number;
  getSubtotal: () => number;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const existing = get().items.find(i => i.id === item.id && i.size === item.size);
        if (existing) {
          set({
            items: get().items.map(i =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeFromCart: (id) => {
        set({ items: get().items.filter(i => i.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          )
        });
      },

      getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);
