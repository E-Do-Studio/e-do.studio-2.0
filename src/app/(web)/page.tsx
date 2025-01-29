import { PricingSection } from '@/app/(web)/_components/pricing-section'
import { ContactSection } from '@/app/(web)/_components/contact-section'
import { Services } from './_components/services'

export default function Page() {
  const images = [
    { src: 'https://plus.unsplash.com/premium_photo-1682144572574-2305752c0f63?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Services' },
    { src: 'https://images.unsplash.com/photo-1611117775350-ac3950990985?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Services' },
  ]

  return (
    <div className="text-xl container h-screen">
      <PricingSection />
      <ContactSection />
      <a href='#'>
        <Services
          imagesDescription={['https://plus.unsplash.com/premium_photo-1682144572574-2305752c0f63?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Services']}
          serviceName="(LIVE)"
          title="Shooting porté / grand objets"
          description="Ce système de studio intelligent de 8m2 vous permet de réaliser vos photos et vidéos de modèles vivants ou scénographies en quelques minutes."
          number="01"
          images={images}
        />
      </a>
      <div className='border-b border-[#979797] w-[100%]'></div>
      <a href='#'>
        <Services
          imagesDescription={['https://plus.unsplash.com/premium_photo-1682144572574-2305752c0f63?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Services']}
          serviceName="(HORIZONTAL)"
          title="Packshots à plat"
          description="Horizontal vous garantit la possibilité de styliser et de photographier vos produits à plat grâce à la suppression automatique de l'arrière-plan."
          number="02"
          images={images}
        />
      </a>
      <div className='border-b border-[#979797] w-[100%]'></div>
      <a href='#'>
        <Services
          imagesDescription={['https://plus.unsplash.com/premium_photo-1682144572574-2305752c0f63?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Services']}
          serviceName="(VERTICAL)"
          title="Mannequin invisible"
          description="Donner à votre produit un effet 3D, choisissez votre arrière-plan et shootez-le grâce à notre machine Vertical."
          number="03"
          images={images}
        />
      </a>
      <div className='border-b border-[#979797] w-[100%]'></div>
      <a href='#'>
        <Services
          imagesDescription={['https://plus.unsplash.com/premium_photo-1682144572574-2305752c0f63?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Services']}
          serviceName="(ECLIPSE)"
          title="Accessoires / maroquinerie / chaussures"
          description="Conçu pour la photographie et la vidéo d'accessoires. Créez vos décors et jouez avec la lumière, l'arrière-plan et les reflets."
          number="04"
          images={images}
        />
      </a>
      <div className='border-b border-[#979797] w-[100%]'></div>
      <a href='#'>
        <Services
          imagesDescription={['https://plus.unsplash.com/premium_photo-1682144572574-2305752c0f63?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Services']}
          serviceName="(CYCLORAMA)"
          title="Production libre"
          description="Notre cyclorama vous permet de mobiliser une équipe de production et de réaliser vos prises de photos et vidéos sur un fond blanc infini."
          number="05"
          images={images}
        />
      </a>
    </div>
  )
}
