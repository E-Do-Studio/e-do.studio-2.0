'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import Autoplay from "embla-carousel-autoplay"
import { motion, AnimatePresence } from 'framer-motion'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useMemo } from 'react'

// Fonction utilitaire pour mélanger un tableau
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

interface CarouselMachinesProps {
    images: Array<{ url: string; alt?: string }>
    className?: string
    alt?: string
}

export function CarouselMachines({ images, className, alt }: CarouselMachinesProps) {
    const shuffledImages = shuffleArray(images)

    return (
        <div className={cn('relative w-full', className)}>
            <div className="max-w-[1400px] mx-auto relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={shuffledImages[0].url}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                                skipSnaps: false,
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 2000,
                                }),
                            ]}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-0.5 flex gap-2 items-center">
                                {shuffledImages.map((image, index) => (
                                    <CarouselItem
                                        key={`${image.url}-${index}`}
                                        className="pl-0.5 basis-full sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                                    >
                                        <div className="relative h-[300px]">
                                            <Image
                                                src={image.url}
                                                alt={image.alt || ''}
                                                width={800}
                                                height={600}
                                                className="rounded-lg w-full h-full object-contain"
                                                priority={index === 0}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="hidden lg:block">
                                <CarouselPrevious className="bg-white/80 hover:bg-white -left-12" />
                                <CarouselNext className="bg-white/80 hover:bg-white -right-12" />
                            </div>
                        </Carousel>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}