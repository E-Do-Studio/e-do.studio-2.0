'use client'

import { useTranslation } from 'react-i18next'
import { LandingSection } from '@/components/layout/landing-section'
import { Services } from '@/app/(web)/_components/services'

export const ServiceSection = () => {
    const { t } = useTranslation('home')

    const images = [
        { src: 'https://plus.unsplash.com/premium_photo-1682144572574-2305752c0f63?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Services' },
        { src: 'https://images.unsplash.com/photo-1611117775350-ac3950990985?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Services' },
    ]

    return (
        <LandingSection title={t('services.title')}>
            <a href='#'>
                <Services
                    imagesDescription={[images[0].src, 'Services']}
                    serviceName={t('services.live.name')}
                    title={t('services.live.title')}
                    description={t('services.live.description')}
                    number="01"
                    images={images}
                />
            </a>
            <div className='border-b border-[#979797] w-[100%]'></div>
            <a href='#'>
                <Services
                    imagesDescription={[images[0].src, 'Services']}
                    serviceName={t('services.horizontal.name')}
                    title={t('services.horizontal.title')}
                    description={t('services.horizontal.description')}
                    number="02"
                    images={images}
                />
            </a>
            <div className='border-b border-[#979797] w-[100%]'></div>
            <a href='#'>
                <Services
                    imagesDescription={[images[0].src, 'Services']}
                    serviceName={t('services.vertical.name')}
                    title={t('services.vertical.title')}
                    description={t('services.vertical.description')}
                    number="03"
                    images={images}
                />
            </a>
            <div className='border-b border-[#979797] w-[100%]'></div>
            <a href='#'>
                <Services
                    imagesDescription={[images[0].src, 'Services']}
                    serviceName={t('services.eclipse.name')}
                    title={t('services.eclipse.title')}
                    description={t('services.eclipse.description')}
                    number="04"
                    images={images}
                />
            </a>
            <div className='border-b border-[#979797] w-[100%]'></div>
            <a href='#'>
                <Services
                    imagesDescription={[images[0].src, 'Services']}
                    serviceName={t('services.cyclorama.name')}
                    title={t('services.cyclorama.title')}
                    description={t('services.cyclorama.description')}
                    number="05"
                    images={images}
                />
            </a>
        </LandingSection>
    )
}
