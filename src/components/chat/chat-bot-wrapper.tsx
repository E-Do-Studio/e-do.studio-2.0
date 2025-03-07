'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ChatBot = dynamic(() => import('./chat-bot').then(mod => mod.ChatBot), {
  ssr: false,
  loading: () => null
})

export function ChatBotWrapper() {
  return (
    <Suspense fallback={null}>
      <ChatBot />
    </Suspense>
  )
} 