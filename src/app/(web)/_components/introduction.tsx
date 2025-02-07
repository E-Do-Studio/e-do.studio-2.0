"use client"

import Image from "next/image"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"

export const Introduction = () => {
    const { t } = useTranslation('home')
    const [currentTextIndex, setCurrentTextIndex] = useState(0)

    // Textes statiques pour le défilement
    const rotatingTexts = [
        t('introduction.rotating.innovation'),
        t('introduction.rotating.excellence'),
        t('introduction.rotating.expertise')
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [rotatingTexts.length])

    return (
        <div className="relative h-screen w-full overflow-hidden">
            <Image
                src="/studio.webp"
                alt="Logo"
                width={1920}
                height={1080}
                quality={95}
                priority
                className="w-full h-full object-cover"
                sizes="100vw"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

            <div className="absolute inset-0 container flex flex-col justify-center">
                <span className="text-xl md:text-2xl text-primary mb-4 font-medium">
                    {t('introduction.brand')}
                </span>

                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-3xl">
                        <span className="text-primary">{t('introduction.title')}</span>
                        <br />
                        {t('introduction.subtitle')}
                    </h1>

                    <div className="h-8 md:h-10 relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 w-full transition-all duration-500 ease-in-out"
                            style={{
                                transform: `translateY(-${currentTextIndex * 40}px)`,
                            }}
                        >
                            {rotatingTexts.map((text, index) => (
                                <div
                                    key={index}
                                    className="h-8 md:h-10 text-lg md:text-xl text-white/90 flex items-center"
                                >
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                        {t('introduction.description')}
                    </p>
                </div>
            </div>
        </div>
    )
    
    // V2 HAUT DE PAGE 

    // return (
    //         <div className="relative h-screen w-full">
    //             <Image
    //                 src="/studio.webp"
    //                 alt="Logo"
    //                 width={1920}
    //                 height={1080}
    //                 quality={95}
    //                 priority
    //                 className="w-full h-full object-cover"
    //                 sizes="100vw"
    //             />

    //             {/* Overlay gradient pour améliorer la lisibilité du texte */}
    //             <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

    //             {/* Contenu texte */}
    //             <div className="absolute inset-0 container flex flex-col justify-center">
    //                 <span className="text-xl md:text-2xl text-primary mb-4 font-medium">
    //                     {t('introduction.brand')}
    //                 </span>
    //                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-3xl">
    //                     <span className="text-primary">{t('introduction.title')}</span>
    //                     <br />
    //                     {t('introduction.subtitle')}
    //                 </h1>
    //                 <p className="text-lg md:text-xl text-white/80 mt-6 max-w-2xl">
    //                     {t('introduction.description')}
    //                 </p>
    //             </div>
    //         </div>
    //     )
}