import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    // Récupérer le paramètre machine de la requête
    const { searchParams } = new URL(request.url)
    const machine = searchParams.get('machine')

    console.log(`API: Requête reçue pour la machine: ${machine}`)

    if (!machine) {
      console.log('API: Erreur - Paramètre machine manquant')
      return NextResponse.json({ error: 'Le paramètre machine est requis' }, { status: 400 })
    }

    // Vérifier que le nom de la machine est valide (sécurité)
    const validMachines = ['eclipse', 'horizontal', 'live', 'vertical']
    if (!validMachines.includes(machine)) {
      console.log(`API: Erreur - Nom de machine invalide: ${machine}`)
      return NextResponse.json({ error: 'Nom de machine invalide' }, { status: 400 })
    }

    const machineDir = path.join(process.cwd(), 'public', 'img', 'machines', machine)
    console.log(`API: Recherche d'images dans le dossier: ${machineDir}`)
    
    // Vérifier si le dossier existe
    if (!fs.existsSync(machineDir)) {
      console.log(`API: Erreur - Le dossier n'existe pas: ${machineDir}`)
      return NextResponse.json({ error: `Le dossier de la machine ${machine} n'existe pas` }, { status: 404 })
    }
    
    // Lire les fichiers du dossier
    const files = fs.readdirSync(machineDir)
    console.log(`API: Fichiers trouvés dans le dossier: ${files.length}`, files)
    
    // Filtrer pour ne garder que les images (extensions jpg, jpeg, png, webp)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
    })
    console.log(`API: Images filtrées: ${imageFiles.length}`, imageFiles)
    
    // Construire les chemins complets pour les images
    const images = imageFiles.map(file => `/img/machines/${machine}/${file}`)
    console.log(`API: Chemins d'images construits:`, images)
    
    return NextResponse.json({ images })
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
