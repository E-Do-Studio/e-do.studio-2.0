"use client"

import { useTranslation } from "react-i18next"
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
            img: '/img/logo-merci-gisele.webp',
            name: 'Merci Gisele'
        },
        {
            img: '/img/logo-marine-serre.webp',
            name: 'Marine Serre'
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
            img: '/img/logo-roger-vivier.webp',
            name: 'Roger Vivier'
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
            <div className="w-full mx-auto border-b border-t border-black py-12">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                        skipSnaps: false,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 1500,
                        }),
                    ]}
                    className="w-full px-4"
                >
                    <CarouselContent className="-ml-1 flex items-center">
                        {customers.map((customer, index) => (
                            <CarouselItem key={index} className="pl-1 md:basis-1/4 lg:basis-1/5">
                                <div className="px-8 py-4 flex items-center justify-center">
                                    <Image
                                        src={customer.img}
                                        alt={customer.name}
                                        width={200}
                                        height={80}
                                        quality={80}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="w-auto max-w-[200px] h-[80px] object-contain"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </LandingSection>
    )
}