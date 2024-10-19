'use client'

import { useEffect, useState } from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Header } from '@/components/Header'

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useDynamicContext()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Prevent SSR flash
  }

  return (
    <>
      {user && <Header />}
      {children}
    </>
  )
}