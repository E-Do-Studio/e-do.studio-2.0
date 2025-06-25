'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LiveView() {
  // Images pour le carousel
  const images = [
    '/img/service-live.jpg',
    '/img/machine-live.webp',
    '/img/logo.png'
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fonctions de navigation
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Effet pour le défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Live</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Partie gauche: Carousel d'images */}
        <div className="w-full md:w-1/2 relative">
          <div className="border-4 border-red-500 p-2 rounded-lg">
            <h2 className="text-xl font-bold text-center mb-4">CAROUSEL TEST</h2>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={images[currentIndex]}
                alt={`Live machine image ${currentIndex + 1}`}
                fill
                className="object-cover rounded-lg"
                priority
              />
              
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`h-3 w-3 rounded-full transition-colors ${currentIndex === index ? 'bg-blue-500' : 'bg-white/50'}`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Partie droite: Description */}
        <div className="w-full md:w-1/2">
          <div className="prose max-w-none">
            <p className="text-lg">
              • Studio intelligent compact de 8m2 pour photos et vidéos professionnelles
              • Idéal pour les modèles vivants et scénographies créatives
              • Productions auto-éditées et formatées en quelques minutes
              • Contenu prêt à l'emploi pour e-commerce, Instagram, Snapchat et Facebook
              • Gagnez en efficacité et soyez premier sur votre marché
            </p>
            
            <div className="mt-6">
              <a 
                href="/reservation" 
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Réserver une session
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
