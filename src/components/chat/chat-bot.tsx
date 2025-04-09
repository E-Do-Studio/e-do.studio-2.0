'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { MessageCircle, X, Send } from 'lucide-react'
import { useChatStore } from '@/store/use-chat-store'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { toast } from 'sonner'

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
    const [isError, setIsError] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const lastQuestionRef = useRef<HTMLDivElement>(null)
    const messagesLength = messages.length

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExpanded(true);
        }, 8000); // 8 secondes

        return () => clearTimeout(timer);
    }, []);

    // Reset error state when chat is opened
    useEffect(() => {
        if (isOpen) {
            setIsError(false)
            setIsExpanded(false)
        }
    }, [isOpen])

    // Scroll to question message when messages change
    useEffect(() => {
        if (lastQuestionRef.current && messagesLength >= 2) {
            lastQuestionRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messagesLength])

    const handleError = () => {
        setIsError(true)
        toast.error(t('chat.error.title'), {
            description: t('chat.error.description'),
        })
    }

    const handleSendMessage = () => {
        if (!message.trim()) return

        try {
            addMessage({ type: 'user', content: message })
            addMessage({
                type: 'bot',
                content: t('chat.custom_message'),
                isCustomMessage: true
            })
            setMessage('')
            setIsError(false)
        } catch (_error) {
            handleError()
        }
    }

    const handleFaqClick = (item: typeof FAQ_ITEMS[number]) => {
        try {
            addMessage({
                type: 'user',
                content: t(`items.${item}.question`)
            })
            addMessage({
                type: 'bot',
                content: t(`items.${item}.answer`),
                isCustomMessage: false
            })
            setIsError(false)
        } catch (_error) {
            handleError()
        }
    }

    const handleReconnect = () => {
        setIsError(false)
        setIsOpen(false)
        setTimeout(() => setIsOpen(true), 1000)
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
                        disabled={isError}
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
                <div className="bg-background border rounded-lg shadow-lg w-[calc(100vw-2rem)] sm:w-[400px] h-[80vh] sm:h-[600px] flex flex-col absolute bottom-0 right-0 sm:relative">
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
                        {isError ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-4">
                                <p className="text-sm text-muted-foreground text-center">
                                    {t('chat.error.message')}
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={handleReconnect}
                                >
                                    {t('chat.error.retry')}
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4 mb-6">
                                    {messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            ref={msg.type === 'user' && i === messages.length - 2 ? lastQuestionRef : null}
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
                            </>
                        )}
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
                                disabled={isError}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="h-10 w-10"
                                disabled={isError}
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
                    className={cn(
                        "transition-all duration-700 ease-in-out shadow-lg overflow-hidden",
                        isExpanded
                            ? "flex items-center gap-2 w-auto px-2 rounded-full hover:bg-primary/90"
                            : "relative w-10 sm:w-12 h-10 sm:h-12 rounded-full hover:bg-primary/90"
                    )}
                >
                    <div className={cn(
                        isExpanded
                            ? "flex items-center"
                            : "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    )}>
                        <MessageCircle className={cn(
                            "h-6 w-6 sm:h-7 sm:w-7 transition-all duration-700 flex-shrink-0",
                            isExpanded ? "h-7 w-7 sm:h-8 sm:w-8" : ""
                        )} />
                    </div>
                    <span
                        className={cn(
                            "overflow-hidden transition-all duration-700 whitespace-nowrap text-sm sm:text-base",
                            isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"
                        )}
                    >
                        {t('chat.need_help')}
                    </span>
                </Button>
            )}
        </div>
    )
}