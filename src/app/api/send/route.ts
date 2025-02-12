import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { ContactFormValues } from '@/validations/contact-form-schema'
import { ContactTemplate } from '@/emails/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body: ContactFormValues = await request.json()
    const { firstName, lastName, email, society, website, message } = body

    // Envoi à l'administrateur
    const adminEmailPromise = resend.emails.send({
      from: 'E-Do Studio <contact@e-do.studio>',
      to: ['contact@e-do.studio'],
      replyTo: email,
      subject: `Nouveau message de ${firstName} ${lastName}`,
      text: `
Nouveau message reçu :

Nom: ${firstName} ${lastName}
Email: ${email}
Société: ${society || 'Non spécifié'}
Site web: ${website || 'Non spécifié'}

Message:
${message}
      `.trim()
    })
    const userEmailPromise = resend.emails.send({
      from: 'E-Do Studio <contact@e-do.studio>',
      to: [email],
      subject: 'Nous avons bien reçu votre message',
      html: `
        <h1>Merci pour votre message</h1>
        <p>Bonjour ${firstName},</p>
        <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
        <p>Cordialement,</p>
        <p>L'équipe E-DO Studio</p>
      `
    })

    // Attendre que les deux emails soient envoyés
    const [adminResult, userResult] = await Promise.all([
      adminEmailPromise,
      userEmailPromise
    ]).catch(error => {
      console.error('Promise.all error:', error);
      throw error;
    });


    if (adminResult.error || userResult.error) {
      console.error('Error sending emails:', {
        adminError: adminResult.error,
        userError: userResult.error
      })
      return NextResponse.json(
        { error: 'Failed to send one or more emails' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 