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
  // Plus besoin de suivre les transitions ou les types d'animation
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

    // Plus besoin d'initialiser les types d'animation

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
    
    // Plus besoin de vérifier si la position est en transition

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
    
    // Mettre à jour la grille avec la nouvelle image immédiatement, sans transition
    setGridItems(prev => {
      const updated = [...prev];
      updated[positionToReplace] = {
        key: `grid-item-${positionToReplace}-${Date.now()}`,
        src: images[newImageIndex],
        imageIndex: newImageIndex
      };
      return updated;
    });
  }, [images, gridItems]);

  // Démarrer le changement d'images à intervalles réguliers
  useEffect(() => {
    if (images.length === 0 || gridItems.length === 0) return;
    
    // Afficher dans la console le nombre d'images disponibles et le nombre d'images dans la grille
    console.log(`ImageGrid: ${images.length} images disponibles, ${gridItems.length} images dans la grille`);

    // Attendre un peu avant de commencer les transitions
    const initialTimeout = setTimeout(() => {
      // Configurer l'intervalle pour remplacer une image selon l'ordre fixe
      const interval = setInterval(replaceRandomImage, 1500); // Temps fixe de 1,5s entre chaque transition
      return () => clearInterval(interval);
    }, 1500); // Délai initial avant de commencer les transitions

    return () => clearTimeout(initialTimeout);
  }, [replaceRandomImage, images.length, gridItems.length]);

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
            className="relative overflow-hidden"
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
            {/* Image sans overlay ni transition */}
            <div className="absolute inset-0 m-0 p-0">
              <Image
                src={item.src || '/img/placeholder.jpg'}
                alt={alt}
                fill
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 33vw, 33vw"
                style={{
                  objectFit: 'contain', // Utiliser contain pour ne pas couper les images
                  objectPosition: 'center',
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
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
