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

interface CarouselMachinesProps {
    images: string[]
    className?: string
}

export function CarouselMachines({ images, className }: CarouselMachinesProps) {
    return (
        <div className={cn('relative w-full', className)}>
            <div className="max-w-[1400px] mx-auto relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={images[0]}
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
                            <CarouselContent className="-ml-0.5 flex items-center">
                                {images.map((image, index) => (
                                    <CarouselItem
                                        key={`${image}-${index}`}
                                        className="pl-0.5 basis-full sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                                    >
                                        <div className="relative h-[300px]">
                                            <Image
                                                src={image}
                                                alt={`${name} - ${index + 1}`}
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