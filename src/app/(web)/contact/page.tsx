import { Metadata } from 'next'
import { ContactView } from './_components/contact-view'

export const metadata: Metadata = {
  title: 'Contact | E-Do Studio',
  description: 'Contactez E-Do Studio pour discuter de vos projets de photographie et de post-production. Notre équipe est à votre disposition pour répondre à toutes vos questions.'
}

export default function ContactPage() {
  return <ContactView />
}
