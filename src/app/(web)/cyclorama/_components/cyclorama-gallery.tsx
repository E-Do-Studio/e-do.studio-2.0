'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Section } from '@/components/layout/section'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { cn } from '@/lib/utils'

const images = [
  {
    id: 1,
    src: '/cyclo/cyclo.jpg',
    alt: 'Cyclorama E-Do',
    title: 'gallery.cyclorama'
  },
  {
    id: 2,
    src: '/cyclo/cabines.jpg',
    alt: 'Cabines de change & poste de maquillage E-Do',
    title: 'gallery.changing'
  },
  {
    id: 3,
    src: '/cyclo/studio.jpg',
    alt: 'Studio E-Do',
    title: 'gallery.studio'
  },
  {
    id: 4,
    src: '/cyclo/table.jpg',
    alt: 'Table & cuisine E-Do',
    title: 'gallery.kitchen-space'
  },
  {
    id: 5,
    src: '/cyclo/cuisine.jpg',
    alt: 'Cuisine toute équipée E-Do',
    title: 'gallery.kitchen-equiped'
  }
]

export function CycloramaGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)
  const { t } = useTranslation('cyclorama')

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = 'var(--removed-body-scroll-bar-size)' // Prevent layout shift
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [selectedImage])

  const handlePrevious = () => {
    setDirection(-1)
    setSelectedImage((prev) => (prev === 1 ? images.length : prev! - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setSelectedImage((prev) => (prev === images.length ? 1 : prev! + 1))
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (!selectedImage) return

    const swipeThreshold = 50
    if (info.offset.x > swipeThreshold) {
      handlePrevious()
    } else if (info.offset.x < -swipeThreshold) {
      handleNext()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return

      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious()
          break
        case 'ArrowRight':
          handleNext()
          break
        case 'Escape':
          setSelectedImage(null)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <Section className="!mt-0">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Large Main Image */}
        <motion.div
          className="relative aspect-[4/3] md:aspect-square"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover cursor-pointer"
            onClick={() => setSelectedImage(1)}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>

        {/* Right Side Grid */}
        <div className="grid grid-cols-2">
          {images.slice(1).map((image, index) => (
            <motion.div
              key={image.id}
              className="relative aspect-square"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover cursor-pointer"
                onClick={() => setSelectedImage(image.id)}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl mx-4 flex flex-col items-center justify-center min-h-screen pt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] max-h-[90vh] w-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={selectedImage}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragEnd={handleDragEnd}
                  >
                    <Image
                      src={images[selectedImage - 1].src}
                      alt={images[selectedImage - 1].alt}
                      fill
                      className="object-contain pointer-events-none"
                      sizes="(max-width: 768px) 100vw, 90vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-white mt-4 text-lg min-h-[3.5rem] flex items-center justify-center"
              >
                {t(images[selectedImage - 1].title)}
              </motion.p>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-2">
                {images.map((image) => (
                  <motion.button
                    key={image.id}
                    onClick={() => setSelectedImage(image.id)}
                    className={cn(
                      "w-1.5 h-1.5 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 rounded-full transition-all duration-300",
                      selectedImage === image.id
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/70"
                    )}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`View image ${image.id}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Navigation Arrows - Hidden on mobile/tablet */}
            <div className="hidden lg:block">
              <div
                className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-[60]"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevious()
                  }}
                  className="text-white hover:opacity-70 bg-black/50 p-3 rounded-full"
                >
                  <ChevronLeft size={32} />
                </motion.button>
              </div>

              <div
                className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[60]"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                  className="text-white hover:opacity-70 bg-black/50 p-3 rounded-full"
                >
                  <ChevronRight size={32} />
                </motion.button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
              className="absolute top-24 right-6 text-white hover:opacity-70 bg-black/50 p-3 rounded-full z-[60]"
              aria-label="Close gallery"
            >
              <X size={28} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
} 