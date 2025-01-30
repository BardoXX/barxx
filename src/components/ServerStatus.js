"use client";
import { useEffect, useState } from "react";

export default function ServerStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch("https://api.mcstatus.io/v2/status/java/game.hexagonhosting.be:4007");
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error("Fout bij ophalen serverstatus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServerStatus();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4 flex items-center">
        Server Status 
        {loading ? (
          <span className="ml-2 animate-spin h-3 w-3 border-t-2 border-white rounded-full"></span>
        ) : status && status.online ? (
          <span className="ml-2 text-green-400">● Online</span>
        ) : (
          <span className="ml-2 text-red-500">● Offline</span>
        )}
      </h3>

      {loading ? (
        <p className="text-gray-400">Bezig met laden...</p>
      ) : status && status.online ? (
        <div className="space-y-2">
          <p><span className="font-semibold">🌍 IP:</span> {status.host}</p>
          <p><span className="font-semibold">✅ Status:</span> Online</p>
          <p><span className="font-semibold">👥 Spelers:</span> {status.players.online} / {status.players.max}</p>
          <p><span className="font-semibold">📝 Versie:</span> {status.version.name_clean}</p>
        </div>
      ) : (
        <p className="text-red-400 font-semibold">❌ Server is offline</p>
      )}
    </div>
  );
}
