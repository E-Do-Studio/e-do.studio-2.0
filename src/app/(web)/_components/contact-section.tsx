'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { LandingSection } from '@/components/layout/landing-section'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  FORM_FIELDS,
  contactFormSchema,
  type ContactFormValues,
} from '@/validations/contact-form-schema'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export function ContactSection() {
  const { t } = useTranslation('home')
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema(t)),
  })

  async function onSubmit(data: ContactFormValues) {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      toast.success(t('contact.form.success'))
      form.reset()
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error)
      toast.error(t('contact.form.error'))
    }
  }

  return (
    <LandingSection
      id="contact"
      className="flex-0 flex flex-col md:flex-row gap-2"
      title={t('contact.title')}
      subtitle={t('contact.subtitle')}
      description={() => (
        <p className="mt-4 flex-0 md:mt-0 text-sm max-w-sm">
          {t('contact.description')}
        </p>
      )}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-6 flex-1"
        >
          <div className="w-full md:max-w-48 space-y-6">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      variant="landing"
                      placeholder={t(FORM_FIELDS.lastName.placeholder)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      variant="landing"
                      placeholder={t(FORM_FIELDS.firstName.placeholder)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="society"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      variant="landing"
                      placeholder={t(FORM_FIELDS.society.placeholder)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      variant="landing"
                      placeholder={t(FORM_FIELDS.email.placeholder)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      variant="landing"
                      placeholder={t(FORM_FIELDS.website.placeholder)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex-1 flex flex-col h-full gap-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1 h-full">
                  <FormControl>
                    <Textarea
                      variant="landing"
                      placeholder={t(FORM_FIELDS.message.placeholder)}
                      className="min-h-[240px] md:h-full w-full resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full md:w-auto self-end mt-auto"
              disabled={form.formState.isSubmitting}
            >
              <span className="flex items-center gap-2">
                {form.formState.isSubmitting
                  ? t('contact.form.submitting')
                  : t('contact.form.submit')
                }
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </LandingSection>
  )
}
