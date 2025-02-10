import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { ContactFormValues } from '@/validations/contact-form-schema'
import { ContactTemplate } from '@/emails/contact'

console.log("RESEND_API_KEY", process.env.RESEND_API_KEY)

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: Request) {
  try {
    const body: ContactFormValues = await request.json()
    const { firstName, lastName, email, society, website, message } = body

    console.log('Sending email with data:', { firstName, lastName, email })

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['web@e-do.studio'],
      replyTo: email,
      subject: `Nouveau message de ${firstName} ${lastName}`,
      html: ContactTemplate({ firstName, lastName, email, society, website, message })
    })

    if (error) {
      console.error('Detailed error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to send email' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
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