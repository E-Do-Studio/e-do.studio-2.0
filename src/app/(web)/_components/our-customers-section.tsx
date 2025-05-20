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
            img: '/img/logo-balenciaga.png',
            name: 'Balenciaga'
        },
        {
            img: '/img/logo-bompard.png',
            name: 'Bompard'
        },
        {
            img: '/img/logo-calvinklein.png',
            name: 'Calvin Klein'
        },
        {
            img: '/img/logo-carven.png',
            name: 'Carven'
        },
        {
            img: '/img/logo-coperni.png',
            name: 'Coperni'
        },
        {
            img: '/img/logo-giambattista.png',
            name: 'Giambattista Valli'
        },
        {
            img: '/img/logo-hartford.png',
            name: 'Hartford'
        },
        {
            img: '/img/logo-hermes.png',
            name: 'Hermès'
        },
        {
            img: '/img/logo-inoui_editions-black.png',
            name: 'Inouï Editions'
        },
        {
            img: '/img/logo-jean-paul-gauthier.png',
            name: 'Jean Paul Gaultier'
        },
        {
            img: '/img/logo-john_lobb.png',
            name: 'John Lobb'
        },
        {
            img: '/img/logo-marine-serre.png',
            name: 'Marine Serre'
        },
        {
            img: '/img/logo-mirae.png',
            name: 'Mirae'
        },
        {
            img: '/img/logo-normcore.png',
            name: 'Normcore'
        },
        {
            img: '/img/logo-numero.png',
            name: 'Numero'
        },
        {
            img: '/img/logo-orlinski.png',
            name: 'Orlinski'
        },
        {
            img: '/img/logo-vaillant.png',
            name: 'Vaillant'
        },
        {
            img: '/img/logo-vectoriel-the-kooples.png',
            name: 'The Kooples'
        },
        {
            img: '/img/logo-vuarnet.png',
            name: 'Vuarnet'
        }
    ]
    return (
        <LandingSection title={t("customers.title")}>
            <motion.div
                className="w-full mx-auto border-b border-t border-black py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Carousel
                    opts={{
                        align: "center",
                        loop: true,
                        dragFree: true,
                        containScroll: false,
                        slidesToScroll: 1,
                        duration: 36500,
                        inViewThreshold: 0,
                        skipSnaps: true,
                        dragThreshold: 1,
                        breakpoints: { 768: { active: true } }
                    }}
                    plugins={[
                        Autoplay({
                            delay: 0,
                            stopOnInteraction: false,
                            playOnInit: true,
                            jump: false,
                        }),
                    ]}
                    className="w-full"
                >
                    <CarouselContent className="flex items-center m-0 p-0 gap-0 [&>*]:ml-0">
                        {[...customers, ...customers, ...customers].map((customer, index) => (
                            <CarouselItem key={index} className="basis-2/5 sm:basis-1/3 md:basis-1/5 lg:basis-1/6 xl:basis-1/7 p-0 m-0">
                                <motion.div
                                    className="flex items-center justify-center w-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image
                                        src={customer.img}
                                        alt={customer.name}
                                        width={320}
                                        height={130}
                                        quality={100}
                                        sizes="(max-width: 640px) 240px, (max-width: 768px) 270px, (max-width: 1024px) 300px, 320px"
                                        className="w-auto h-[70px] sm:h-[80px] md:h-[90px] lg:h-[110px] object-contain -mx-1"
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