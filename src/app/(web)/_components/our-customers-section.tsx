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
            img: 'https://www.citypng.com/public/uploads/preview/louis-vuitton-gold-logo-hd-png-701751694771300ifegnuqnmd.png',
            name: 'Louis Vuitton'
        },
        {
            img: 'https://e7.pngegg.com/pngimages/874/117/png-clipart-gucci-fashion-logo-others-miscellaneous-text.png',
            name: 'Gucci'
        },
        {
            img: 'https://e7.pngegg.com/pngimages/49/17/png-clipart-glasses-brand-logo-trademark-product-glasses-text-trademark.png',
            name: 'Brand 3'
        },
        {
            img: 'https://e7.pngegg.com/pngimages/874/117/png-clipart-gucci-fashion-logo-others-miscellaneous-text.png',
            name: 'Brand 4'
        },
        {
            img: 'https://e7.pngegg.com/pngimages/874/117/png-clipart-gucci-fashion-logo-others-miscellaneous-text.png',
            name: 'Brand 5'
        },
        {
            img: 'https://e7.pngegg.com/pngimages/874/117/png-clipart-gucci-fashion-logo-others-miscellaneous-text.png',
            name: 'Brand 6'
        },
        {
            img: 'https://e7.pngegg.com/pngimages/874/117/png-clipart-gucci-fashion-logo-others-miscellaneous-text.png',
            name: 'Brand 7'
        },
        {
            img: 'https://e7.pngegg.com/pngimages/874/117/png-clipart-gucci-fashion-logo-others-miscellaneous-text.png',
            name: 'Brand 8'
        },
        {
            img: 'https://e7.pngegg.com/pngimages/874/117/png-clipart-gucci-fashion-logo-others-miscellaneous-text.png',
            name: 'Brand 9'
        },
        {
            img: 'https://e7.pngegg.com/pngimages/874/117/png-clipart-gucci-fashion-logo-others-miscellaneous-text.png',
            name: 'Brand 10'
        },
        {
            img: 'https://e7.pngegg.com/pngimages/874/117/png-clipart-gucci-fashion-logo-others-miscellaneous-text.png',
            name: 'Brand 11'
        }
    ]
    return (
        <LandingSection title={t("customers.title")}>
            <div className="w-full mx-auto border-b border-t border-black">
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
                    className="w-full"
                >
                    <CarouselContent className="-ml-1 flex items-center">
                        {customers.map((customer, index) => (
                            <CarouselItem key={index} className="pl-1 basis-1/4">
                                <div className="p-2">
                                    <Image
                                        src={customer.img}
                                        alt={customer.name}
                                        width={100}
                                        height={100}
                                        className="w-full h-auto object-contain"
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