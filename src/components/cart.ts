// components/cart.ts
import { Product } from '@/components/products';

export const addToCart = (cart: Product[], product: Product): Product[] => {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    return cart.map(item =>
      item.id === product.id 
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cart, { ...product, quantity: 1 }];
};

export const removeFromCart = (cart: Product[], index: number): Product[] => {
  const newCart = [...cart];
  newCart.splice(index, 1);
  return newCart;
};

export const calculateTotal = (cart: Product[]): number => {
  return cart.reduce((total, item) => {
    const price = parseFloat(
      item.price.replace(/[^0-9.,]/g, '')
               .replace(',', '.')
    );
    return total + (price * item.quantity);
  }, 0);
};