'use client'

type CartItem = {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity?: number;
};

export const addToCart = (item: CartItem) => {
  try {
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    if (!Array.isArray(existingCart)) {
      localStorage.setItem("cartItems", JSON.stringify([]));
      return;
    }

    const cart: CartItem[] = existingCart;

    const index = cart.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      cart[index].quantity = (cart[index].quantity || 1) + 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
  } catch (error) {
    console.error("Error adding to cart:", error);
    localStorage.setItem("cartItems", JSON.stringify([]));
  }
};
