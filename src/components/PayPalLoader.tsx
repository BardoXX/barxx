"use client"
import React, { useEffect } from 'react';

interface PayPalLoaderProps {
  totalAmount: number;
  cart: any[];
}

const PayPalLoader: React.FC<PayPalLoaderProps> = ({ totalAmount, cart }) => {
  useEffect(() => {
    // Zorg ervoor dat de PayPal SDK alleen geladen wordt nadat de component is gemonteerd
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AbP_hMZuXEpefFBMuzH6PPQ3hhB25YTX3wfhtL1-kEhYVUrX-vI8cv9MfbmUzrI5pCXYr2rJKjRuGCk0&components=buttons`;
    script.async = true;
    script.onload = () => {
      // Zorg ervoor dat PayPal component alleen wordt geactiveerd wanneer de SDK geladen is
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: totalAmount.toFixed(2),
                },
                description: 'Barxx Hosting - Pakket aankopen',
              }],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert('Betaling geslaagd: ' + details.payer.name.given_name);
            });
          },
        }).render('#paypal-button-container');
      }
    };

    document.body.appendChild(script);

    return () => {
      // Opruimen van de PayPal script om memory leaks te voorkomen
      document.body.removeChild(script);
    };
  }, [totalAmount, cart]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalLoader;
