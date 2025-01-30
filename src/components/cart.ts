// cart.ts

import { Product } from '@/components/products';

export const addToCart = (cart: Product[], product: Product) => {
  return cart.map((item) =>
    item.title === product.title
      ? { ...item, quantity: (item.quantity || 1) + 1 }
      : item
  );
};

export const removeFromCart = (cart: Product[], index: number) => {
  return cart.filter((_, i) => i !== index);
};

export const calculateTotal = (cart: Product[]) => {
  return cart.reduce(
    (acc, item) => acc + item.priceNum * (item.quantity || 1),
    0
  );
};
