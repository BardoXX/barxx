"use client";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function BedanktPagina() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId');

  useEffect(() => {
    const sendNotification = async () => {
      try {
        const response = await fetch('/api/notify-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transactionId,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) throw new Error('Failed to notify admin');
      } catch (error) {
        console.error('Notification error:', error);
      }
    };

    if (transactionId) {
      sendNotification();
    }
  }, [transactionId]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center p-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-green-500 mb-4">
          Bedankt voor je aankoop! ✅
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Je betaling is succesvol verwerkt. We hebben een bevestiging gestuurd naar onze admins.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Transactie ID: {transactionId}
          </p>
        </div>
      </div>
    </div>
  );
}