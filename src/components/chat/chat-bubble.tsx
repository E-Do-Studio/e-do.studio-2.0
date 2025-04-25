"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export function ChatBubble() {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExpanded(true);
        }, 15000); // 15 secondes

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={cn(
                "fixed bottom-4 right-4 flex items-center gap-2 bg-primary text-primary-foreground rounded-full p-3 cursor-pointer transition-all duration-500 ease-in-out",
                isExpanded ? "pr-6" : "hover:pr-6"
            )}
        >
            <MessageCircle className="h-6 w-6" />
            <span
                className={cn(
                    "overflow-hidden transition-all duration-500 whitespace-nowrap",
                    isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"
                )}
            >
                Besoin d&apos;aide ?
            </span>
        </div>
    );
} 