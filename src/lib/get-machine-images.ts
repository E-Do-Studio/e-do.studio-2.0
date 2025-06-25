import fs from 'fs'
import path from 'path'

/**
 * Récupère les chemins d'images pour une machine spécifique
 * @param machineName - Nom de la machine (eclipse, horizontal, live, vertical)
 * @returns Tableau de chemins d'images
 */
export function getMachineImages(machineName: string): string[] {
  try {
    const machineDir = path.join(process.cwd(), 'public', 'img', 'machines', machineName)
    
    // Vérifier si le dossier existe
    if (!fs.existsSync(machineDir)) {
      console.warn(`Le dossier de la machine ${machineName} n'existe pas`)
      return []
    }
    
    // Lire les fichiers du dossier
    const files = fs.readdirSync(machineDir)
    
    // Filtrer pour ne garder que les images (extensions jpg, jpeg, png, webp)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
    })
    
    // Construire les chemins complets pour les images
    return imageFiles.map(file => `/img/machines/${machineName}/${file}`)
  } catch (error) {
    console.error(`Erreur lors de la récupération des images pour ${machineName}:`, error)
    return []
  }
}
