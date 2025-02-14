'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ClockProps {
  className?: string
}

export function Clock({ className }: ClockProps) {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    function updateTime() {
      return new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Paris',
        timeZoneName: 'short',
      })
    }

    // Set initial time
    setTime(updateTime())

    const interval = setInterval(() => {
      setTime(updateTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Don't render anything until we have the initial time to prevent hydration mismatch
  if (!time) return null

  return (
    <div className={cn('text-sm', className)}>
      {time}
    </div>
  )
}
