import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ChatMessage {
    type: 'user' | 'bot'
    content: string
    isCustomMessage?: boolean
}

interface ChatStore {
    isOpen: boolean
    messages: ChatMessage[]
    setIsOpen: (isOpen: boolean) => void
    addMessage: (message: ChatMessage) => void
    clearMessages: () => void
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set) => ({
            isOpen: false,
            messages: [],
            setIsOpen: (isOpen) => set({ isOpen }),
            addMessage: (message) =>
                set((state) => ({ messages: [...state.messages, message] })),
            clearMessages: () => set({ messages: [] }),
        }),
        {
            name: 'chat-storage',
            storage: createJSONStorage(() => {
                // Check if window is defined (client-side)
                if (typeof window !== 'undefined') {
                    return window.localStorage
                }
                // Return a dummy storage for SSR
                return {
                    getItem: () => null,
                    setItem: () => { },
                    removeItem: () => { },
                }
            }),
        }
    )
) 