'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageGridProps {
  images: string[]
  alt?: string
  gridSize?: number
  changeInterval?: number
  className?: string
}

interface GridItem {
  key: string
  src: string
  imageIndex: number
}

export function ImageGrid({
  images,
  alt = 'Grid Image',
  gridSize = 6,
  changeInterval = 3000,
  className
}: ImageGridProps) {
  // État pour stocker les images affichées dans la grille
  const [gridItems, setGridItems] = useState<GridItem[]>([])
  // État pour suivre les images en cours de transition
  const [transitioning, setTransitioning] = useState<number[]>([])
  // État pour le type d'animation à appliquer (aléatoire pour chaque image)
  const [animationTypes, setAnimationTypes] = useState<string[]>([])
  // Référence pour suivre les indices d'images actuellement utilisées dans la grille
  const currentIndicesRef = useRef<Set<number>>(new Set())
  // Référence pour suivre les indices d'images en cours de transition
  const transitioningIndicesRef = useRef<Set<number>>(new Set())

  // Initialisation de la grille avec des images aléatoires sans répétition
  useEffect(() => {
    if (images.length === 0) return

    // Réinitialiser les références d'indices
    currentIndicesRef.current.clear()
    transitioningIndicesRef.current.clear()

    // Fonction pour obtenir des indices aléatoires sans répétition
    const getRandomIndicesWithoutRepetition = (max: number, count: number): number[] => {
      // Si on demande plus d'indices que disponibles, on utilise tous les indices disponibles
      if (count >= max) {
        return Array.from({ length: max }, (_, i) => i);
      }

      const indices: number[] = [];
      const usedIndices = new Set<number>();

      while (indices.length < count) {
        const randomIndex = Math.floor(Math.random() * max);
        if (!usedIndices.has(randomIndex)) {
          indices.push(randomIndex);
          usedIndices.add(randomIndex);
        }
      }

      return indices;
    };

    // Obtenir des indices aléatoires sans répétition
    const randomIndices = getRandomIndicesWithoutRepetition(images.length, Math.min(gridSize, images.length));

    // Enregistrer les indices utilisés dans la référence
    randomIndices.forEach(index => {
      currentIndicesRef.current.add(index);
    });

    // Types d'animation disponibles
    const animationOptions = ['fade', 'slide', 'zoom'];

    // Générer un type d'animation aléatoire pour chaque cellule de la grille
    const initialAnimationTypes = Array.from({ length: gridSize }, () => {
      return animationOptions[Math.floor(Math.random() * animationOptions.length)];
    });

    setAnimationTypes(initialAnimationTypes);

    const initialGrid: GridItem[] = [];
    for (let i = 0; i < gridSize; i++) {
      // Si on a plus d'images que nécessaire, on utilise les indices aléatoires sans répétition
      // Sinon, on fait une rotation des images disponibles
      const index = i < randomIndices.length ? randomIndices[i] : randomIndices[i % randomIndices.length];
      initialGrid.push({
        key: `grid-item-${i}-${Date.now()}`,
        src: images[index],
        imageIndex: index // Stocker l'index de l'image pour référence
      });
    }

    setGridItems(initialGrid);
  }, [images, gridSize])

  // Fonction pour remplacer une image aléatoire avec une transition élégante
  const replaceRandomImage = useCallback(() => {
    if (images.length === 0 || gridItems.length === 0) return

    // Sélectionner un index aléatoire qui n'est pas déjà en transition
    let availableIndices = Array.from(
      { length: gridItems.length },
      (_, i) => i
    ).filter(i => !transitioning.includes(i))

    if (availableIndices.length === 0) return

    const randomGridIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)]

    // Récupérer l'index de l'image actuellement affichée à cette position
    const currentImageIndex = gridItems[randomGridIndex].imageIndex

    // Trouver un nouvel index d'image qui n'est pas déjà utilisé
    let newImageIndex: number = -1
    let newImageSrc: string = ''

    // Créer un tableau d'indices disponibles (indices qui ne sont pas actuellement utilisés)
    const availableImageIndices: number[] = []
    for (let i = 0; i < images.length; i++) {
      // Vérifier si l'indice n'est pas déjà dans la grille ou en transition
      if (!currentIndicesRef.current.has(i) && !transitioningIndicesRef.current.has(i)) {
        availableImageIndices.push(i)
      }
    }

    if (availableImageIndices.length > 0) {
      // Choisir un index aléatoire parmi les indices disponibles
      const randomIndex = Math.floor(Math.random() * availableImageIndices.length)
      newImageIndex = availableImageIndices[randomIndex]
      newImageSrc = images[newImageIndex]

      // Ajouter le nouvel index aux indices en transition
      transitioningIndicesRef.current.add(newImageIndex)
    } else {
      // Si tous les indices sont utilisés (cas où il y a moins d'images que de cellules dans la grille)
      // Choisir un index différent de celui actuellement affiché à cette position
      const otherIndices = Array.from({ length: images.length }, (_, i) => i)
        .filter(i => i !== currentImageIndex && !transitioningIndicesRef.current.has(i))

      if (otherIndices.length > 0) {
        const randomOtherIndex = Math.floor(Math.random() * otherIndices.length)
        newImageIndex = otherIndices[randomOtherIndex]
        newImageSrc = images[newImageIndex]
        transitioningIndicesRef.current.add(newImageIndex)
      } else {
        // Cas extrême: s'il n'y a pas d'indices disponibles sans transition
        // Choisir n'importe quel index différent de celui actuellement affiché
        const anyOtherIndices = Array.from({ length: images.length }, (_, i) => i)
          .filter(i => i !== currentImageIndex)

        if (anyOtherIndices.length > 0) {
          const randomIndex = Math.floor(Math.random() * anyOtherIndices.length)
          newImageIndex = anyOtherIndices[randomIndex]
          newImageSrc = images[newImageIndex]
          transitioningIndicesRef.current.add(newImageIndex)
        } else {
          // Cas extrême: s'il n'y a qu'une seule image disponible
          newImageIndex = 0
          newImageSrc = images[0]
        }
      }
    }
    
    // Types d'animation disponibles
    const animationOptions = ['fade', 'slide', 'zoom'];
    // Sélectionner un nouveau type d'animation aléatoire pour cette cellule
    const newAnimationType = animationOptions[Math.floor(Math.random() * animationOptions.length)];
    
    // Mettre à jour le type d'animation pour cette cellule
    setAnimationTypes(prev => {
      const newTypes = [...prev];
      newTypes[randomGridIndex] = newAnimationType;
      return newTypes;
    });

    // Marquer l'image comme étant en transition
    setTransitioning(prev => [...prev, randomGridIndex])

    // Attendre que l'animation de transition soit terminée avant de remplacer l'image
    setTimeout(() => {
      // Retirer l'ancien index de l'image des indices actuels
      currentIndicesRef.current.delete(currentImageIndex)
      // Ajouter le nouvel index aux indices actuels
      currentIndicesRef.current.add(newImageIndex)

      setGridItems(prevItems => {
        const newItems = [...prevItems]
        newItems[randomGridIndex] = {
          key: `grid-item-${randomGridIndex}-${Date.now()}`,
          src: newImageSrc,
          imageIndex: newImageIndex
        }
        return newItems
      })

      // Attendre que la nouvelle image soit chargée et retirer l'état de transition
      setTimeout(() => {
        setTransitioning(prev =>
          prev.filter(index => index !== randomGridIndex)
        )
        // Retirer l'index de la liste des indices en transition
        transitioningIndicesRef.current.delete(newImageIndex)
      }, 600) // Durée de la transition d'entrée
    }, 500) // Durée de la transition de sortie
  }, [images, gridItems, transitioning])

  // Démarrer le changement d'images à intervalles réguliers
  useEffect(() => {
    if (images.length === 0 || gridItems.length === 0) return

    // Attendre un peu avant de commencer les transitions
    const initialTimeout = setTimeout(() => {
      // Configurer l'intervalle pour remplacer une image aléatoire
      const interval = setInterval(replaceRandomImage, changeInterval)
      return () => clearInterval(interval)
    }, 1500) // Délai initial avant de commencer les transitions

    return () => clearTimeout(initialTimeout)
  }, [replaceRandomImage, changeInterval, images.length, gridItems.length])

  return (
    <div className={cn("w-full", className)}>
      <div
        className="grid max-w-md mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 0.7fr)',
          columnGap: '10px',
          rowGap: '30px',
          borderCollapse: 'collapse',
          overflow: 'hidden',
          maxHeight: '380px',
          marginBottom: '-40px'
        }}
      >
        {gridItems.slice(0, 6).map((item, index) => (
          <div
            key={item.key}
            className={cn(
              "relative overflow-hidden",
              transitioning.includes(index) ? "opacity-90" : "opacity-100"
            )}
            style={{
              margin: 0,
              padding: 0,
              border: 0,
              fontSize: 0,
              lineHeight: 0,
              display: 'block',
              width: '100%',
              height: 0,
              paddingBottom: '100%',
              position: 'relative'
            }}
          >
            {/* Overlay pour l'effet de transition */}
            <div className={cn(
              "absolute inset-0 transition-all duration-700 ease-in-out z-10",
              transitioning.includes(index) 
                ? animationTypes[index] === 'fade' ? "opacity-80 bg-white" 
                : animationTypes[index] === 'slide' ? "opacity-60 bg-white translate-y-full" 
                : "opacity-60 bg-white scale-150" 
                : "opacity-0 scale-100 translate-y-0"
            )} />

            {/* Image */}
            <div className="absolute inset-0 m-0 p-0">
              <Image
                src={item.src || '/img/placeholder.jpg'}
                alt={alt}
                fill
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 33vw, 33vw"
                className={cn(
                  "transition-all ease-out",
                  transitioning.includes(index) 
                    ? animationTypes[index] === 'fade' ? "duration-700 opacity-0" 
                    : animationTypes[index] === 'slide' ? "duration-700 translate-y-[-10%]" 
                    : "duration-700 scale-90" 
                    : "duration-700 opacity-100 scale-100 translate-y-0"
                )}
                style={{
                  objectFit: 'contain', // Utiliser contain pour ne pas couper les images
                  objectPosition: 'center',
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)', // Activer l'accélération GPU
                  backgroundColor: 'transparent' // Fond transparent pour mieux voir les images
                }}
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
