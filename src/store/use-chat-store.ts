import { create } from 'zustand'

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

export const useChatStore = create<ChatStore>((set) => ({
    isOpen: false,
    messages: [],
    setIsOpen: (isOpen) => set({ isOpen }),
    addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
    clearMessages: () => set({ messages: [] }),
})) 