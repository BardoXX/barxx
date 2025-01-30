// app/admin/notificaties/page.tsx
"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Notification {
  id: number
  transactionId: string
  timestamp: string
}

export default function AdminPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Controleer authenticatie bij het laden
    const checkAuth = async () => {
      const res = await fetch('/api/admin/verify')
      if (!res.ok) router.push('/admin/login')
    }
    
    checkAuth()
  }, [router])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 bg-white rounded-lg shadow">
            <p>Transactie: {notification.transactionId}</p>
            <p className="text-sm text-gray-500">
              {new Date(notification.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}