'use client'

import { useEffect } from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { user, handleLogOut } = useDynamicContext()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    } else {
      const existingUser = localStorage.getItem(user.email as string);
      if (!existingUser) {
        router.push('/profile/complete-profile');
      }
    }
  }, [user, router])

  if (!user) return null

  const userProfile = JSON.parse(localStorage.getItem(user.email as string) || '{}');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="bg-muted p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome, {user.alias}!</p>
        <p>User Type: {userProfile.userType}</p>
        <button
          onClick={handleLogOut}
          className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}