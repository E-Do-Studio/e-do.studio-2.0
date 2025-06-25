'use client'

import { useState, useEffect } from 'react'

/**
 * Hook pour récupérer les images d'une machine spécifique
 * @param machineName - Nom de la machine (eclipse, horizontal, live, vertical)
 * @returns Un objet contenant les images, l'état de chargement et les erreurs éventuelles
 */
export function useMachineImages(machineName: string) {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log(`Chargement des images pour la machine: ${machineName}`)
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/machine-images?machine=${machineName}`)
        console.log(`Réponse API pour ${machineName}:`, response.status, response.statusText)
        
        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération des images: ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log(`Images récupérées pour ${machineName}:`, data.images)
        setImages(data.images || [])
      } catch (err) {
        console.error(`Erreur dans useMachineImages pour ${machineName}:`, err)
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [machineName])

  return { images, loading, error }
}
