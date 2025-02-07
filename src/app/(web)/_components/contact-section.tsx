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

export function ContactSection() {
  const { t } = useTranslation('home')
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema(t)),
  })

  async function onSubmit(data: ContactFormValues) {
    try {
      console.log(data)
      form.reset()
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error)
    }
  }

  return (
    <LandingSection
      id="contact"
      className="flex flex-col md:flex-row gap-8"
      title={t('contact.title')}
      subtitle={t('contact.subtitle')}
      description={() => (
        <p className="mt-4 md:mt-0 text-sm max-w-sm">
          {t('contact.description')}
        </p>
      )}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1"
        >
          <div className="space-y-6">
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

          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      variant="landing"
                      placeholder={t(FORM_FIELDS.message.placeholder)}
                      className="h-full min-h-[240px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full md:w-auto self-end"
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
