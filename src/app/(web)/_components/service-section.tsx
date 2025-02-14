'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { LandingSection } from '@/components/layout/landing-section'
import { Services } from '@/app/(web)/_components/services'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator'


export const ServiceSection = () => {
    const { t } = useTranslation('home')

    // Objet contenant tous les tableaux d'images pour chaque type de machine
    const machineImages = {
        live: [
            { src: '/img/live1.jpg', alt: 'Services machine live' },
            { src: '/img/live2.jpg', alt: 'Services machine live' },
            { src: '/img/live3.jpg', alt: 'Services machine live' },
            { src: '/img/live4.jpg', alt: 'Services machine live' },
            { src: '/img/live5.jpg', alt: 'Services machine live' },
            { src: '/img/live6.jpg', alt: 'Services machine live' },
            { src: '/img/live7.jpg', alt: 'Services machine live' },
            { src: '/img/live8.jpg', alt: 'Services machine live' },
        ],
        horizontal: [
            { src: '/img/horizontal1.jpg', alt: 'Services machine horizontale' },
            { src: '/img/horizontal2.jpg', alt: 'Services machine horizontale' },
            { src: '/img/horizontal3.jpg', alt: 'Services machine horizontale' },
            { src: '/img/horizontal4.jpg', alt: 'Services machine horizontale' },
            { src: '/img/horizontal5.jpg', alt: 'Services machine horizontale' },
            { src: '/img/horizontal6.jpg', alt: 'Services machine horizontale' },
            { src: '/img/horizontal7.jpg', alt: 'Services machine horizontale' },
            { src: '/img/horizontal8.jpg', alt: 'Services machine horizontale' },
        ],
        vertical: [
            { src: '/img/vertical1.jpg', alt: 'Services machine verticale' },
            { src: '/img/vertical2.jpg', alt: 'Services machine verticale' },
            { src: '/img/vertical3.jpg', alt: 'Services machine verticale' },
            { src: '/img/vertical4.jpg', alt: 'Services machine verticale' },
            { src: '/img/vertical5.jpg', alt: 'Services machine verticale' },
            { src: '/img/vertical6.jpg', alt: 'Services machine verticale' },
            { src: '/img/vertical7.jpg', alt: 'Services machine verticale' },
            { src: '/img/vertical8.jpg', alt: 'Services machine verticale' },
        ],
        eclipse: [
            { src: '/img/eclipse1.jpg', alt: 'Services machine eclipse' },
            { src: '/img/eclipse2.jpg', alt: 'Services machine eclipse' },
            { src: '/img/eclipse3.jpg', alt: 'Services machine eclipse' },
            { src: '/img/eclipse4.jpg', alt: 'Services machine eclipse' },
            { src: '/img/eclipse5.jpg', alt: 'Services machine eclipse' },
            { src: '/img/eclipse6.jpg', alt: 'Services machine eclipse' },
            { src: '/img/eclipse7.jpg', alt: 'Services machine eclipse' },
            { src: '/img/eclipse8.jpg', alt: 'Services machine eclipse' },
        ],
        cyclorama: [
            { src: '/img/cyclorama1.jpg', alt: 'Services machine cyclorama' },
            { src: '/img/cyclorama2.jpg', alt: 'Services machine cyclorama' },
            { src: '/img/cyclorama3.jpg', alt: 'Services machine cyclorama' },
            { src: '/img/cyclorama4.jpg', alt: 'Services machine cyclorama' },
            { src: '/img/cyclorama5.jpg', alt: 'Services machine cyclorama' },
            { src: '/img/cyclorama6.jpg', alt: 'Services machine cyclorama' },
            { src: '/img/cyclorama7.jpg', alt: 'Services machine cyclorama' },
            { src: '/img/cyclorama8.jpg', alt: 'Services machine cyclorama' },
        ],
    }

    return (
        <LandingSection
            title={t('services.title')}
            id='services'
            className="mt-8 md:mt-16"
        >
            <Link href='/cyclorama'>
                <Services
                    imagesDescription={['/img/machine-cyclorama.webp', 'Services machine cyclorama']}
                    serviceName={t('services.cyclorama.name')}
                    title={t('services.cyclorama.title')}
                    description={t('services.cyclorama.description')}
                    number="01"
                    images={machineImages.cyclorama}
                />
            </Link>
            <Separator />
            <Link href='/reservation'>
                <Services
                    imagesDescription={['/img/machine-eclipse.webp', 'Services machine eclipse']}
                    serviceName={t('services.eclipse.name')}
                    title={t('services.eclipse.title')}
                    description={t('services.eclipse.description')}
                    number="02"
                    images={machineImages.eclipse}
                />
            </Link>
            <Separator />
            <Link href='/reservation'>
                <Services
                    imagesDescription={['/img/machine-live.webp', 'Services machine live']}
                    serviceName={t('services.live.name')}
                    title={t('services.live.title')}
                    description={t('services.live.description')}
                    number="03"
                    images={machineImages.live}
                />
            </Link>
            <Separator />
            <Link href='/reservation'>
                <Services
                    imagesDescription={['/img/machine-vertical.webp', 'Services machine verticale']}
                    serviceName={t('services.vertical.name')}
                    title={t('services.vertical.title')}
                    description={t('services.vertical.description')}
                    number="04"
                    images={machineImages.vertical}
                />
            </Link>
            <Separator />
            <Link href='/reservation'>
                <Services
                    imagesDescription={['/img/machine-horizontal.webp', 'Services machine horizontale']}
                    serviceName={t('services.horizontal.name')}
                    title={t('services.horizontal.title')}
                    description={t('services.horizontal.description')}
                    number="05"
                    images={machineImages.horizontal}
                />
            </Link>
            <Separator />
            <Link href='/post-production'>
                <Services
                    imagesDescription={['/img/machine-horizontal.webp', 'Services post-production']}
                    serviceName={t('services.postproduction.name')}
                    title={t('services.postproduction.title')}
                    description={t('services.postproduction.description')}
                    number="06"
                    images={machineImages.horizontal}
                />
            </Link>
        </LandingSection>
    )
}
