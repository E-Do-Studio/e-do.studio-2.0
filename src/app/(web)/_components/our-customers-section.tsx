"use client"

import { useTranslation } from "react-i18next"
import { motion } from 'framer-motion'
import { LandingSection } from "@/components/layout/landing-section"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

interface Customer {
    img: string;
    name: string;
}

export function OurCustomersSection() {
    const { t } = useTranslation("home")

    // IMG suctomers
    const customers: Customer[] = [
        {
            img: '/img/logo-jean-paul-gauthier.png',
            name: 'Jean Paul Gauthier'
        },
        {
            img: '/img/logo-vectoriel-the-kooples.jpg',
            name: 'The Kooples'
        },
        {
            img: '/img/logo-john_lobb.svg',
            name: 'John Lobb'
        },
        {
            img: '/img/logo-jennyfer.webp',
            name: 'Jennyfer'
        },
        {
            img: '/img/logo-inoui_editions-black.png.webp',
            name: 'Inoui Editions'
        },
        {
            img: '/img/logo-hartford.png.avif',
            name: 'Hartford'
        },
        {
            img: '/img/logo-giambattista_Valli.webp',
            name: 'Giambattista Valli'
        },
        {
            img: '/img/logo-celio.webp',
            name: 'Célio'
        },
        {
            img: '/img/logo-bompard.png',
            name: 'Bompard'
        },
        {
            img: '/img/logo-numero.webp',
            name: 'Numéro'
        },
        {
            img: '/img/logo-nodaleto.webp',
            name: 'Nodaleto'
        },
        {
            img: '/img/logo-rimowa.webp',
            name: 'Rimowa'
        },
        {
            img: '/img/logo-tanneur.webp',
            name: 'Le Tanneur'
        },
        {
            img: '/img/logo-vuarnet.webp',
            name: 'Vuarnet'
        }
    ]
    return (
        <LandingSection title={t("customers.title")}>
            <motion.div
                className="w-full mx-auto border-b border-t border-black py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                        dragFree: true,
                        containScroll: false,
                        slidesToScroll: 1,
                        duration: 36500,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 0,
                            stopOnInteraction: false,
                            playOnInit: true,
                            jump: false,
                        }),
                    ]}
                    className="w-full px-4"
                >
                    <CarouselContent className="-ml-1 flex items-center">
                        {[...customers, ...customers, ...customers].map((customer, index) => (
                            <CarouselItem key={index} className="pl-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                                <motion.div
                                    className="px-2 sm:px-4 py-2 sm:py-4 flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image
                                        src={customer.img}
                                        alt={customer.name}
                                        width={200}
                                        height={80}
                                        quality={80}
                                        sizes="(max-width: 640px) 150px, (max-width: 768px) 160px, (max-width: 1024px) 180px, 200px"
                                        className="w-auto h-[40px] sm:h-[50px] md:h-[60px] object-contain"
                                    />
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </motion.div>
        </LandingSection>
    )
}