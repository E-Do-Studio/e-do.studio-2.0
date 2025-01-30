'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import Autoplay from "embla-carousel-autoplay"
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
                    <CarouselContent className="-ml-1 flex items-center">
                        {images.map((image, index) => (
                            <CarouselItem
                                key={`${image}-${index}`}
                                className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3"
                            >
                                <div className="relative aspect-[4/3] sm:aspect-video">
                                    <Image
                                        src={image}
                                        alt={`Machine slide ${index + 1}`}
                                        fill
                                        className="object-cover rounded-lg"
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
            </div>
        </div>
    )
}