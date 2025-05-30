'use client'

import { ServiceView } from '@/components/service/service-view'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

// Exemples de projets de retouche vidéo
const videoProjects = [
  {
    id: 1,
    title: 'Campagne publicitaire de luxe',
    description: 'Retouche colorimétrique et effets visuels pour une marque de luxe internationale.',
    category: 'commercial'
  },
  {
    id: 2,
    title: 'Vidéo produit e-commerce',
    description: 'Montage et retouche pour une série de vidéos de présentation de produits.',
    category: 'product'
  },
  {
    id: 3,
    title: 'Film corporate',
    description: 'Montage, étalonnage et habillage graphique pour la présentation d\'une entreprise.',
    category: 'corporate'
  },
  {
    id: 4,
    title: 'Contenu pour réseaux sociaux',
    description: 'Série de vidéos courtes optimisées pour Instagram et TikTok.',
    category: 'social'
  }
]

export function RetoucheVideoView() {
  const { t, i18n } = useTranslation('retouche-video')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  
  // Vérifier si la traduction existe
  const hasTranslation = Object.keys(i18n.getDataByLanguage(i18n.language) || {}).includes('retouche-video')
  
  // Filtrer les projets par catégorie
  const filteredProjects = activeCategory === 'all' 
    ? videoProjects 
    : videoProjects.filter(project => project.category === activeCategory)
  
  return (
    <>
      <ServiceView 
        namespace="retouche-video"
        imageUrl="/images/post-production/retouche-video.jpg"
      >
        {/* Section de démo reel */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium mb-6">{hasTranslation ? t('demo_reel.title', 'Notre démo reel') : 'Notre démo reel'}</h2>
          <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg bg-neutral-100">
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <p className="text-lg mb-4">{hasTranslation ? t('demo_reel.placeholder', 'Vidéo de démonstration de nos services de retouche') : 'Vidéo de démonstration de nos services de retouche'}</p>
                <Button variant="outline">
                  {hasTranslation ? t('demo_reel.play', 'Lancer la vidéo') : 'Lancer la vidéo'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section de projets */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium mb-6">{hasTranslation ? t('projects.title', 'Nos projets récents') : 'Nos projets récents'}</h2>
          
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            <Button 
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('all')}
              className="whitespace-nowrap"
            >
              {hasTranslation ? t('projects.categories.all', 'Tous') : 'Tous'}
            </Button>
            <Button 
              variant={activeCategory === 'commercial' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('commercial')}
              className="whitespace-nowrap"
            >
              {hasTranslation ? t('projects.categories.commercial', 'Publicités') : 'Publicités'}
            </Button>
            <Button 
              variant={activeCategory === 'product' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('product')}
              className="whitespace-nowrap"
            >
              {hasTranslation ? t('projects.categories.product', 'Vidéos produits') : 'Vidéos produits'}
            </Button>
            <Button 
              variant={activeCategory === 'corporate' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('corporate')}
              className="whitespace-nowrap"
            >
              {hasTranslation ? t('projects.categories.corporate', 'Corporate') : 'Corporate'}
            </Button>
            <Button 
              variant={activeCategory === 'social' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('social')}
              className="whitespace-nowrap"
            >
              {hasTranslation ? t('projects.categories.social', 'Réseaux sociaux') : 'Réseaux sociaux'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                <p className="mb-4">{project.description}</p>
                <Button variant="outline" size="sm">
                  {hasTranslation ? t('projects.view_details', 'Voir le projet') : 'Voir le projet'}
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section de tarifs */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium mb-6">{hasTranslation ? t('pricing.title', 'Nos tarifs') : 'Nos tarifs'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={cn(
              "border border-neutral-200 rounded-lg p-6",
              "flex flex-col h-full"
            )}>
              <h3 className="text-xl font-medium mb-2">{hasTranslation ? t('pricing.packages.basic.title', 'Essentiel') : 'Essentiel'}</h3>
              <p className="text-sm mb-4">{hasTranslation ? t('pricing.packages.basic.description', 'Pour les projets simples nécessitant un montage et des retouches basiques.') : 'Pour les projets simples nécessitant un montage et des retouches basiques.'}</p>
              <ul className="list-disc pl-5 space-y-1 mb-6 flex-grow">
                <li>{hasTranslation ? t('pricing.packages.basic.features.0', 'Montage vidéo') : 'Montage vidéo'}</li>
                <li>{hasTranslation ? t('pricing.packages.basic.features.1', 'Correction colorimétrique de base') : 'Correction colorimétrique de base'}</li>
                <li>{hasTranslation ? t('pricing.packages.basic.features.2', 'Mixage audio simple') : 'Mixage audio simple'}</li>
                <li>{hasTranslation ? t('pricing.packages.basic.features.3', 'Une révision incluse') : 'Une révision incluse'}</li>
              </ul>
              <div className="mt-auto">
                <p className="text-2xl font-medium mb-4">{hasTranslation ? t('pricing.packages.basic.price', 'À partir de 500€') : 'À partir de 500€'}</p>
                <Link href="/contact">
                  <Button className="w-full">
                    {hasTranslation ? t('pricing.contact_us', 'Nous contacter') : 'Nous contacter'}
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className={cn(
              "border border-neutral-200 rounded-lg p-6 bg-neutral-50",
              "flex flex-col h-full",
              "relative overflow-hidden"
            )}>
              <div className="absolute top-0 right-0 bg-black text-white px-4 py-1 text-sm">
                {hasTranslation ? t('pricing.popular', 'Populaire') : 'Populaire'}
              </div>
              <h3 className="text-xl font-medium mb-2">{hasTranslation ? t('pricing.packages.standard.title', 'Professionnel') : 'Professionnel'}</h3>
              <p className="text-sm mb-4">{hasTranslation ? t('pricing.packages.standard.description', 'Pour les projets nécessitant une qualité professionnelle et des effets avancés.') : 'Pour les projets nécessitant une qualité professionnelle et des effets avancés.'}</p>
              <ul className="list-disc pl-5 space-y-1 mb-6 flex-grow">
                <li>{hasTranslation ? t('pricing.packages.standard.features.0', 'Montage vidéo avancé') : 'Montage vidéo avancé'}</li>
                <li>{hasTranslation ? t('pricing.packages.standard.features.1', 'Étalonnage professionnel') : 'Étalonnage professionnel'}</li>
                <li>{hasTranslation ? t('pricing.packages.standard.features.2', 'Effets visuels simples') : 'Effets visuels simples'}</li>
                <li>{hasTranslation ? t('pricing.packages.standard.features.3', 'Mixage audio complet') : 'Mixage audio complet'}</li>
                <li>{hasTranslation ? t('pricing.packages.standard.features.4', 'Trois révisions incluses') : 'Trois révisions incluses'}</li>
              </ul>
              <div className="mt-auto">
                <p className="text-2xl font-medium mb-4">{hasTranslation ? t('pricing.packages.standard.price', 'À partir de 1200€') : 'À partir de 1200€'}</p>
                <Link href="/contact">
                  <Button className="w-full">
                    {hasTranslation ? t('pricing.contact_us', 'Nous contacter') : 'Nous contacter'}
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className={cn(
              "border border-neutral-200 rounded-lg p-6",
              "flex flex-col h-full"
            )}>
              <h3 className="text-xl font-medium mb-2">{hasTranslation ? t('pricing.packages.premium.title', 'Premium') : 'Premium'}</h3>
              <p className="text-sm mb-4">{hasTranslation ? t('pricing.packages.premium.description', 'Pour les projets haut de gamme nécessitant une qualité exceptionnelle.') : 'Pour les projets haut de gamme nécessitant une qualité exceptionnelle.'}</p>
              <ul className="list-disc pl-5 space-y-1 mb-6 flex-grow">
                <li>{hasTranslation ? t('pricing.packages.premium.features.0', 'Montage vidéo sur mesure') : 'Montage vidéo sur mesure'}</li>
                <li>{hasTranslation ? t('pricing.packages.premium.features.1', 'Étalonnage cinématographique') : 'Étalonnage cinématographique'}</li>
                <li>{hasTranslation ? t('pricing.packages.premium.features.2', 'Effets visuels complexes') : 'Effets visuels complexes'}</li>
                <li>{hasTranslation ? t('pricing.packages.premium.features.3', 'Animation et motion design') : 'Animation et motion design'}</li>
                <li>{hasTranslation ? t('pricing.packages.premium.features.4', 'Mixage audio professionnel') : 'Mixage audio professionnel'}</li>
                <li>{hasTranslation ? t('pricing.packages.premium.features.5', 'Révisions illimitées') : 'Révisions illimitées'}</li>
              </ul>
              <div className="mt-auto">
                <p className="text-2xl font-medium mb-4">{hasTranslation ? t('pricing.packages.premium.price', 'Sur devis') : 'Sur devis'}</p>
                <Link href="/contact">
                  <Button className="w-full">
                    {hasTranslation ? t('pricing.contact_us', 'Nous contacter') : 'Nous contacter'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ServiceView>
    </>
  )
}
