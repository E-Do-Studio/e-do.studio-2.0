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

// Ordre fixe de remplacement des images (indices des positions dans la grille)
// 1. Position 1 (colonne du haut celle du milieu)
// 2. Position 5 (2ème colonne tout à droite)
// 3. Position 3 (2ème colonne tout à gauche)
// 4. Position 2 (1ère colonne tout à droite)
// 5. Position 4 (2ème colonne au milieu)
// 6. Position 0 (1ère colonne tout à gauche)
const REPLACEMENT_ORDER = [1, 5, 3, 2, 4, 0];

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
  // Référence pour suivre l'index actuel dans l'ordre de remplacement
  const currentReplacementIndexRef = useRef<number>(0)
  // Référence pour suivre l'index de la prochaine image à utiliser
  const nextImageIndexRef = useRef<number>(0)

  // Initialisation de la grille avec des images sans répétition
  useEffect(() => {
    if (images.length === 0) return;
    
    // Réinitialiser l'index de remplacement
    currentReplacementIndexRef.current = 0;
    
    // Réinitialiser l'index de la prochaine image
    nextImageIndexRef.current = 0;

    // Types d'animation disponibles
    const animationOptions = ['fade', 'slide', 'zoom'];

    // Générer un type d'animation aléatoire pour chaque cellule de la grille
    const initialAnimationTypes = Array.from({ length: 6 }, () => {
      return animationOptions[Math.floor(Math.random() * animationOptions.length)];
    });

    setAnimationTypes(initialAnimationTypes);

    // Créer la grille initiale avec les 6 premières images (ou moins si pas assez d'images)
    const initialGrid: GridItem[] = [];
    for (let i = 0; i < 6; i++) {
      // Utiliser l'image disponible à l'index i, ou revenir au début si pas assez d'images
      const imageIndex = i % images.length;
      initialGrid.push({
        key: `grid-item-${i}-${Date.now()}`,
        src: images[imageIndex],
        imageIndex: imageIndex
      });
    }

    setGridItems(initialGrid);
    
    // Définir l'index de la prochaine image à utiliser
    nextImageIndexRef.current = Math.min(6, images.length) % images.length;
  }, [images]);

  // Fonction pour remplacer une image en suivant un ordre fixe de remplacement
  const replaceRandomImage = useCallback(() => {
    if (images.length === 0 || gridItems.length === 0) return;

    // Obtenir la position à remplacer selon l'ordre fixe
    const positionToReplace = REPLACEMENT_ORDER[currentReplacementIndexRef.current];
    
    // Passer à la position suivante dans l'ordre de remplacement
    currentReplacementIndexRef.current = (currentReplacementIndexRef.current + 1) % REPLACEMENT_ORDER.length;
    
    // Vérifier si la position est en cours de transition
    if (transitioning.includes(positionToReplace)) {
      // Si la position est en transition, attendre le prochain cycle
      return;
    }

    // Récupérer l'index de l'image actuellement affichée à cette position
    const currentImageIndex = gridItems[positionToReplace].imageIndex;
    
    // Obtenir la prochaine image à afficher
    const newImageIndex = nextImageIndexRef.current;
    
    // Mettre à jour l'index de la prochaine image
    nextImageIndexRef.current = (nextImageIndexRef.current + 1) % images.length;
    
    // Si la nouvelle image est la même que l'actuelle, passer à la suivante
    if (newImageIndex === currentImageIndex && images.length > 1) {
      nextImageIndexRef.current = (nextImageIndexRef.current + 1) % images.length;
    }
    
    // Mettre à jour l'état de transition
    setTransitioning(prev => [...prev, positionToReplace]);

    // Types d'animation disponibles
    const animationOptions = ['fade', 'slide', 'zoom'];
    // Sélectionner un nouveau type d'animation aléatoire pour cette cellule
    const newAnimationType = animationOptions[Math.floor(Math.random() * animationOptions.length)];

    // Mettre à jour le type d'animation pour cette cellule
    setAnimationTypes(prev => {
      const updated = [...prev];
      updated[positionToReplace] = newAnimationType;
      return updated;
    });

    // Mettre à jour la grille avec la nouvelle image après un court délai pour la transition
    setTimeout(() => {
      setGridItems(prev => {
        const updated = [...prev];
        updated[positionToReplace] = {
          key: `grid-item-${positionToReplace}-${Date.now()}`,
          src: images[newImageIndex],
          imageIndex: newImageIndex
        };
        return updated;
      });

      // Attendre que la nouvelle image soit chargée et retirer l'état de transition
      setTimeout(() => {
        setTransitioning(prev =>
          prev.filter(index => index !== positionToReplace)
        );
      }, 600); // Durée de la transition d'entrée
    }, 500); // Durée de la transition de sortie
  }, [images, gridItems, transitioning]);

  // Démarrer le changement d'images à intervalles réguliers
  useEffect(() => {
    if (images.length === 0 || gridItems.length === 0) return;
    
    // Afficher dans la console le nombre d'images disponibles et le nombre d'images dans la grille
    console.log(`ImageGrid: ${images.length} images disponibles, ${gridItems.length} images dans la grille`);

    // Attendre un peu avant de commencer les transitions
    const initialTimeout = setTimeout(() => {
      // Configurer l'intervalle pour remplacer une image selon l'ordre fixe
      const interval = setInterval(replaceRandomImage, changeInterval);
      return () => clearInterval(interval);
    }, 1500); // Délai initial avant de commencer les transitions

    return () => clearTimeout(initialTimeout);
  }, [replaceRandomImage, changeInterval, images.length, gridItems.length]);

  return (
    <div className={cn("w-full p-0 m-0", className)}>
      <div
        className="grid grid-cols-3 gap-x-2 gap-y-4 md:gap-y-5 w-full"
        style={{
          display: 'grid',
          borderCollapse: 'collapse',
          overflow: 'visible',
          height: 'auto',
          minHeight: '300px',
          margin: 0,
          padding: 0
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
              position: 'relative',
              aspectRatio: '1/1'
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
                  backgroundColor: 'transparent', // Fond transparent pour mieux voir les images
                  aspectRatio: '1/1' // Maintenir un ratio carré
                }}
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
