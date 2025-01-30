import { useEffect, useState } from 'react';
import { Query } from 'minecraft-server-util';

export default function ServerStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const queryServer = async () => {
      try {
        const query = new Query(process.env.NEXT_PUBLIC_MINECRAFT_SERVER_IP, 25565);
        const response = await query.fullStat();
        setStatus(response);
      } catch (error) {
        console.error('Server offline:', error);
      }
    };
    
    queryServer();
  }, []);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
      {status ? (
        <div>
          <h3 className="text-xl font-bold">{status.hostname}</h3>
          <p>Players online: {status.players.online}</p>
        </div>
      ) : (
        <p>Server is offline</p>
      )}
    </div>
  );
}