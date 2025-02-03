import path from 'path'
import { BeforeUploadHook } from 'payload/dist/collections/config/types'

export const sanitizeFilename: BeforeUploadHook = async ({ req, data, file }) => {
  'use server'

  // Extraire l'extension
  const ext = path.extname(file.name)
  // Nettoyer le nom de base
  const baseName = path
    .basename(file.name, ext)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Enlever les accents
    .replace(/[^a-z0-9]/g, '_') // Remplacer tout ce qui n'est pas alphanumérique par _
    .replace(/_+/g, '_') // Remplacer les multiples underscores par un seul
    .replace(/^_|_$/g, '') // Enlever les underscores au début et à la fin

  // Forcer le nouveau nom
  const newFilename = `${baseName}${ext}`
  file.name = newFilename

  // Vérifier la taille
  if (file.size > 200 * 1024) {
    throw new Error("L'image doit faire moins de 200ko")
  }

  return file
}
