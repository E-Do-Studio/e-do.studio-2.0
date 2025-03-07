'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export function ReservationFrame() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Script
        src="https://embed.acuityscheduling.com/js/embed.js"
        strategy="lazyOnload"
      />
      <div className="flex-1 w-full p-4">
        <iframe
          src="https://app.acuityscheduling.com/schedule.php?owner=22319868"
          title="Prendre rendez-vous"
          className="w-full h-full min-h-[800px] rounded-lg shadow-lg"
        />
      </div>
    </>
  )
} 