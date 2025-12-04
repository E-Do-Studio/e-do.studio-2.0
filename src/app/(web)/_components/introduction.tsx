'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'

export const Introduction = () => {
  const { t } = useTranslation('home')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVideoLoading, setIsVideoLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const backgroundImages = [
    '/studio.webp',
    '/studio2.jpg',
    '/studio3.jpg',
    '/studio4.jpg',
    '/studio5.jpg',
  ]

  // Textes statiques pour le défilement
  const rotatingTexts = [
    t('introduction.rotating.innovation'),
    t('introduction.rotating.excellence'),
    t('introduction.rotating.expertise'),
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [rotatingTexts.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => {
      setIsVideoLoading(false)
    }

    const handleLoadedData = () => {
      // Tentative de lecture dès que possible
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoLoading(false)
          })
          .catch(() => {
            // En cas d'échec, on réessaie avec un délai
            setTimeout(() => {
              video.play()
            }, 100)
          })
      }
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('loadeddata', handleLoadedData)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [])

  // return (
  //     <div className="relative h-screen w-full overflow-hidden">
  //         <Image
  //             src="/studio.webp"
  //             alt="Logo"
  //             width={1920}
  //             height={1080}
  //             quality={95}
  //             priority
  //             className="w-full h-full object-cover"
  //             sizes="100vw"
  //         />

  //         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

  //         <div className="absolute inset-0 container flex flex-col justify-center">
  //             <span className="text-xl md:text-2xl text-primary mb-4 font-medium">
  //                 {t('introduction.brand')}
  //             </span>

  //             <div className="space-y-6">
  //                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-3xl">
  //                     <span className="text-primary">{t('introduction.title')}</span>
  //                     <br />
  //                     {t('introduction.subtitle')}
  //                 </h1>

  //                 <div className="h-8 md:h-10 relative overflow-hidden">
  //                     <div
  //                         className="absolute top-0 left-0 w-full transition-all duration-500 ease-in-out"
  //                         style={{
  //                             transform: `translateY(-${currentTextIndex * 40}px)`,
  //                         }}
  //                     >
  //                         {rotatingTexts.map((text, index) => (
  //                             <div
  //                                 key={index}
  //                                 className="h-8 md:h-10 text-lg md:text-xl text-white/90 flex items-center"
  //                             >
  //                                 {text}
  //                             </div>
  //                         ))}
  //                     </div>
  //                 </div>

  //                 <p className="text-lg md:text-xl text-white/80 max-w-2xl">
  //                     {t('introduction.description')}
  //                 </p>
  //             </div>
  //         </div>
  //     </div>
  // )

  // V2 HAUT DE PAGE

  return (
    <div className="relative h-screen w-full">
      {/* Pour le format desktop */}
      <div className="relative w-full h-full hidden">
        {backgroundImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="Studio background"
            width={1920}
            height={1080}
            quality={95}
            priority
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="100vw"
          />
        ))}
      </div>

      {/* Pour le format mobile */}
      {isVideoLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background transition-opacity duration-300 ease-out">
          <div className="p-4 rounded-lg">
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain w-[100px] h-[100px] animate-spin-slow"
            />
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        preload="auto"
        playsInline
        autoPlay
        muted
        loop
        controls={false}
        webkit-playsinline="true"
        className="w-full h-full object-cover"
        width={1920}
        height={1080}
      >
        <source src="/welcome_to_the_studio-avecmusique.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      {/* Contenu texte */}
      <div className="absolute inset-0 container flex flex-col justify-center">
        <span className="text-2xl md:text-4xl mb-2 font-medium">
          <span className="text-primary">{t('introduction.brand').split('E-Do Studio')[0]}</span>
          <span className="text-white">E-Do Studio</span>
        </span>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-3xl mb-3">
          <span className="text-primary-foreground">Your hybrid</span>{' '}
          <span className="text-primary">playground</span>
        </h2>
        <ul className="flex flex-col space-y-0.5 list-none">
          {[
            { key: 'book', href: '/cyclorama' },
            { key: 'post-production', href: '/post-production' },
            { key: 'real', href: '/galerie?category=on_model' },
          ].map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className="text-white text-base md:text-xl inline-block relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white/30 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-white before:transition-all before:duration-300 hover:before:w-full"
              >
                {t(`introduction.keywords.${key}`)}
              </Link>
            </li>
          ))}
        </ul>
        <Button className="w-fit mt-4">
          <Link href="/reservation">{t('introduction.cta.book')}</Link>
        </Button>
      </div>
    </div>
  )

  // V3 HAUT DE PAGE AVEC TEXTE ET IMAGE COTE A COTE
  // return (
  //     <div className="min-h-screen w-full bg-background">
  //         <div className="container grid lg:grid-cols-2 gap-8 min-h-screen items-center py-16">
  //             {/* Contenu texte */}
  //             <div className="flex flex-col justify-center order-2 lg:order-1">
  //                 <span className="text-2xl md:text-4xl mb-4 font-medium">
  //                     <span className="text-primary">{t('introduction.brand').split('E-Do Studio')[0]}</span>
  //                     <span className="text-foreground">E-Do Studio</span>
  //                 </span>
  //                 <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-3xl mb-6">
  //                     <span className="text-foreground">Your hybrid</span>{" "}
  //                     <span className="text-primary">playground</span>
  //                 </h1>
  //                 <ul className="flex flex-col space-y-3 list-none mb-8">
  //                     {['book', 'production', 'post-production', 'consulting'].map((keyword) => (
  //                         <li
  //                             key={keyword}
  //                             className="text-muted-foreground text-base md:text-xl"
  //                         >
  //                             {t(`introduction.keywords.${keyword}`)}
  //                         </li>
  //                     ))}
  //                 </ul>
  //                 <Button size="lg" className="w-fit">
  //                     <Link href="/reservation">
  //                         {t('introduction.cta.book')}
  //                     </Link>
  //                 </Button>
  //             </div>

  //             {/* Image */}
  //             <div className="relative h-[50vh] lg:h-[70vh] order-1 lg:order-2 rounded-2xl overflow-hidden">
  //                 <Image
  //                     src="/studio.webp"
  //                     alt="Studio"
  //                     quality={95}
  //                     priority
  //                     className="object-cover"
  //                     fill
  //                     sizes="(max-width: 1024px) 100vw, 50vw"
  //                 />
  //                 <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
  //             </div>
  //         </div>
  //     </div>
  // )
}
