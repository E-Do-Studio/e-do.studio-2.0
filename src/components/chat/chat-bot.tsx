'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { MessageCircle, X, Send } from 'lucide-react'
import { useChatStore } from '@/store/use-chat-store'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const FAQ_ITEMS = [
    'machine',
    'operator',
    'accessibility',
    'delegation',
    'production',
    'cyclorama',
    'booking',
    'hours',
    'weekend',
    'payment'
] as const

export function ChatBot() {
    const { t } = useTranslation('faq')
    const [message, setMessage] = useState('')
    const { isOpen, setIsOpen, messages, addMessage } = useChatStore()

    const handleSendMessage = () => {
        if (!message.trim()) return

        addMessage({ type: 'user', content: message })
        addMessage({
            type: 'bot',
            content: t('chat.custom_message'),
            isCustomMessage: true
        })
        setMessage('')
    }

    const handleFaqClick = (item: typeof FAQ_ITEMS[number]) => {
        addMessage({
            type: 'user',
            content: t(`items.${item}.question`)
        })
        addMessage({
            type: 'bot',
            content: t(`items.${item}.answer`),
            isCustomMessage: false
        })
    }

    const SuggestedQuestions = () => (
        <div className="space-y-4 mb-6">
            <h3 className="text-lg font-medium tracking-tight">
                {t('chat.suggested_questions')}
            </h3>
            <div className="flex flex-col gap-2">
                {FAQ_ITEMS.map((item) => (
                    <Button
                        key={item}
                        variant="outline"
                        className="justify-start h-auto py-3 px-4 whitespace-normal text-left text-sm font-normal"
                        onClick={() => handleFaqClick(item)}
                    >
                        {t(`items.${item}.question`)}
                    </Button>
                ))}
            </div>
        </div>
    )

    const ContactButton = () => (
        <Link href="/#contact" className="block mt-4">
            <Button
                size="lg"
                className="w-full font-medium"
            >
                {t('chat.contact_button')}
            </Button>
        </Link>
    )

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <div className="bg-background border rounded-lg shadow-lg w-[400px] h-[600px] flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center bg-muted/40">
                        <h2 className="text-lg font-medium tracking-tight">
                            {t('chat.title')}
                        </h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="h-8 w-8"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4 mb-6">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "max-w-[90%] rounded-lg p-4 text-sm whitespace-pre-wrap",
                                        msg.type === 'user'
                                            ? "bg-primary text-primary-foreground ml-auto"
                                            : "bg-muted"
                                    )}
                                >
                                    {msg.content}
                                    {msg.type === 'bot' && msg.isCustomMessage && (
                                        <ContactButton />
                                    )}
                                </div>
                            ))}
                        </div>

                        <SuggestedQuestions />
                    </ScrollArea>

                    <div className="p-4 border-t bg-muted/40">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSendMessage()
                            }}
                            className="flex gap-2"
                        >
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={t('chat.input_placeholder')}
                                className="flex-1"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="h-10 w-10"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            ) : (
                <Button
                    onClick={() => setIsOpen(true)}
                    size="icon"
                    className="h-12 w-12 rounded-full shadow-lg"
                >
                    <MessageCircle className="h-6 w-6" />
                </Button>
            )}
        </div>
    )
}