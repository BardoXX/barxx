// Page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import ReportForm from '@/components/ReportForm';
import ServerStatus from '@/components/ServerStatus';

import { products, Product } from '@/components/products';
import PayPalLoader from '@/components/PayPalLoader';
import { addToCart, removeFromCart, calculateTotal } from '@/components/cart';


export default function Page() {
  const [cart, setCart] = useState<Product[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);
  
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, mounted]);
  
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const updatedCart = addToCart(prevCart, product);
      setNotification(`${product.title} toegevoegd aan winkelwagen!`);
      setTimeout(() => setNotification(null), 3000);
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(removeFromCart(cart, index));
  };

  const totalAmount = calculateTotal(cart);

  if (!mounted) return null;

  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto flex">
        <div className="sticky top-4 h-fit p-6 bg-gray-900 text-white rounded-lg shadow-lg w-72 hidden lg:block">
          <ServerStatus />
          <div className="mt-6 border-t border-gray-700 pt-4">
            <h2 className="text-xl font-bold mb-3">🛒 Winkelwagen</h2>
            {cart.length === 0 ? (
              <p className="text-gray-400">Je winkelwagen is leeg.</p>
            ) : (
              <ul className="space-y-3">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item.title} x{item.quantity}</span>
                    <button
                      onClick={() => handleRemoveFromCart(index)}
                      className="text-red-400 hover:text-red-500"
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 text-lg font-bold">
              Totaal: €{totalAmount.toFixed(2)}
            </div>
            <PayPalLoader totalAmount={totalAmount} cart={cart} />
          </div>
        </div>
        <div className="flex-1 ml-8">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              Welkom op Barxx
            </h1>
            <ThemeToggle />
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Ontdek onze pakketten en profiteer van snelle, stabiele en betaalbare voor jouw.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Onze pakketten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="border p-6 rounded-lg dark:bg-gray-800 transition-transform duration-300 hover:scale-105 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{product.title}</h3>
                <div className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-200">{product.price}</div>
                <ul className="space-y-3 mb-8 text-gray-600 dark:text-gray-300">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {notification && (
            <div className="fixed top-20 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
              {notification}
            </div>
          )}

          <div className="mt-16 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Meldingsformulier
            </h2>
            <ReportForm />
          </div>
        </div>
      </div>
    </main>
  );
}
