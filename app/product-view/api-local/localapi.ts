// utils/cart.ts

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  imk: string;
  quantity: number;
};

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('cartItems');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (item: CartItem) => {
  const cart = getCart();
  const existingItem = cart.find(p => p.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  localStorage.setItem('cartItems', JSON.stringify(cart));
};

export const getCartCount = (): number => {
  return getCart().reduce((total, item) => total + item.quantity, 0);
};
