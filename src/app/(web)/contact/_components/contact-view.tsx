'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/section'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function ContactView() {
  const { t, i18n } = useTranslation('contact')
  
  // Check if translation exists
  const hasTranslation = Object.keys(i18n.getDataByLanguage(i18n.language) || {}).includes('contact')
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success')
      setFormState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      })
    }, 1500)
  }

  return (
    <Section
      title={hasTranslation ? t('title') : 'Contact'}
      description={() => (
        <p className="mb-8">{hasTranslation ? t('description') : 'Nous sommes à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos projets. N\'hésitez pas à nous contacter pour discuter de vos besoins ou pour planifier une visite de notre studio.'}</p>
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-medium mb-8">{hasTranslation ? t('form.title', 'Contactez-nous') : 'Contactez-nous'}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  {hasTranslation ? t('form.name') : 'Nom'}
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  {hasTranslation ? t('form.email') : 'Email'}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  {hasTranslation ? t('form.phone') : 'Téléphone'}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">
                  {hasTranslation ? t('form.company') : 'Entreprise'}
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  {hasTranslation ? t('form.message') : 'Message'}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[150px]"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? 'Envoi en cours...' : (hasTranslation ? t('form.submit') : 'Envoyer')}
            </Button>
            
            {formStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md">
                {hasTranslation ? t('form.success') : 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'}
              </div>
            )}
            
            {formStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-50 text-red-800 rounded-md">
                {hasTranslation ? t('form.error') : 'Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer.'}
              </div>
            )}
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-medium mb-8">{hasTranslation ? t('contact_info.title') : 'Informations de contact'}</h2>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <MapPin className="w-6 h-6 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">{hasTranslation ? t('contact_info.address.title') : 'Adresse'}</h3>
                <p className="mt-1">{hasTranslation ? t('contact_info.address.line1') : 'E-Do Studio'}</p>
                <p>{hasTranslation ? t('contact_info.address.line2') : '75 rue de Turbigo'}</p>
                <p>{hasTranslation ? t('contact_info.address.line3') : '75003 Paris, France'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="w-6 h-6 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">{hasTranslation ? t('contact_info.phone.title') : 'Téléphone'}</h3>
                <p className="mt-1">
                  <a href="tel:+33144041149" className="hover:underline">
                    {hasTranslation ? t('contact_info.phone.number') : '+33 1 44 04 11 49'}
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="w-6 h-6 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">{hasTranslation ? t('contact_info.email.title') : 'Email'}</h3>
                <p className="mt-1">
                  <a href="mailto:contact@e-do.studio" className="hover:underline">
                    {hasTranslation ? t('contact_info.email.address') : 'contact@e-do.studio'}
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="w-6 h-6 mt-1 mr-4" />
              <div>
                <h3 className="font-medium">{hasTranslation ? t('contact_info.hours.title') : 'Horaires d\'ouverture'}</h3>
                <p className="mt-1">{hasTranslation ? t('contact_info.hours.weekdays') : 'Lundi - Vendredi: 9h00 - 19h00'}</p>
                <p>{hasTranslation ? t('contact_info.hours.weekend') : 'Samedi - Dimanche: Sur rendez-vous uniquement'}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <div className="aspect-w-16 aspect-h-9 w-full h-[300px] rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.6744271796885!2d2.3505099!3d48.8654047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1c11b593ab%3A0x9b1c8e4c9a3d5d0c!2s75%20Rue%20de%20Turbigo%2C%2075003%20Paris!5e0!3m2!1sfr!2sfr!4v1621436289012!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="E-Do Studio location"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button size="lg" className="min-w-[200px]">
          {hasTranslation ? t('cta.book') : 'Réserver une session'}
        </Button>
        <Button size="lg" variant="outline" className="min-w-[200px]">
          {hasTranslation ? t('cta.visit') : 'Visiter le studio'}
        </Button>
      </div>
    </Section>
  )
}
