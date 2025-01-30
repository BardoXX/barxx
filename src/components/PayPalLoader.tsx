"use client";
import React, { useEffect, useRef, useState } from 'react';

interface PayPalLoaderProps {
  totalAmount: number;
  cart: Product[];
  currency?: string;
}

interface Product {
  id: string;
  title: string;
  price: string;
  quantity: number;
  features: string[];
}

const PayPalLoader: React.FC<PayPalLoaderProps> = ({ 
  totalAmount,
  cart,
  currency = 'EUR'
}) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper om de prijs van string naar number te converteren
  const parsePrice = (priceString: string): number => {
    return parseFloat(priceString.replace(/[^0-9.,]/g, '').replace(',', '.'));
  };

  useEffect(() => {
    const loadScript = () => {
      const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&components=buttons&currency=${currency}`;
        script.async = true;
        script.onload = () => setIsLoaded(true);
        script.onerror = () => console.error('PayPal script failed to load');
        document.body.appendChild(script);
      } else {
        setIsLoaded(true);
      }
    };

    if (typeof window !== 'undefined' && window.paypal === undefined) {
      loadScript();
    } else {
      setIsLoaded(true);
    }

    return () => {
      document.querySelectorAll('script[src*="paypal.com/sdk/js"]').forEach(el => el.remove());
    };
  }, [currency]);

  useEffect(() => {
    if (isLoaded && window.paypal && paypalRef.current) {
      paypalRef.current.innerHTML = '';
      
      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: totalAmount.toFixed(2),
                currency_code: currency,
                breakdown: {
                  item_total: {
                    value: totalAmount.toFixed(2),
                    currency_code: currency
                  }
                }
              },
              items: cart.map(item => ({
                name: item.title,
                quantity: item.quantity.toString(),
                unit_amount: {
                  value: parsePrice(item.price).toFixed(2),
                  currency_code: currency
                }
              })),
              description: `Aankoop van ${cart.length} product(en) bij Barxx Hosting`
            }]
          });
        },

        onApprove: async (data, actions) => {
          try {
            const details = await actions.order?.capture();
            if (details?.status === 'COMPLETED') {
              localStorage.removeItem('cart');
              window.location.href = `/bedankt?transactionId=${details.id}`;
            }
          } catch (err) {
            console.error('Payment error:', err);
          }
        },
        onError: (err) => {
          console.error("PayPal fout:", err);
          alert('Er is een fout opgetreden tijdens het betalen.');
        }
      }).render(paypalRef.current);
    }
  }, [isLoaded, totalAmount, currency, cart]);

  return (
    <div>
      <div ref={paypalRef} aria-live="polite" />
      {!isLoaded && <p>Bezig met laden van betalingsopties...</p>}
    </div>
  );
};

export default PayPalLoader;