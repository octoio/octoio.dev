'use client'

import { useEffect, useState } from 'react'

interface ClientWrapperProps {
  children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Wait for fonts and initial render to complete
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`fouc-prevent ${isLoaded ? 'loaded' : ''}`}>
      {children}
    </div>
  )
}