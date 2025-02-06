import { z } from 'zod'

export const contactFormSchema = (t: any) => z.object({
  lastName: z
    .string()
    .min(2, t('contact.form.errors.lastName.min'))
    .max(50, t('contact.form.errors.lastName.max')),
  firstName: z
    .string()
    .min(2, t('contact.form.errors.firstName.min'))
    .max(50, t('contact.form.errors.firstName.max')),
  society: z
    .string()
    .max(100, t('contact.form.errors.society.max'))
    .optional(),
  email: z
    .string()
    .email(t('contact.form.errors.email.invalid'))
    .min(5, t('contact.form.errors.email.min'))
    .max(100, t('contact.form.errors.email.max')),
  website: z
    .string()
    .max(200, t('contact.form.errors.website.max'))
    .optional(),
  message: z
    .string()
    .min(10, t('contact.form.errors.message.min'))
    .max(1000, t('contact.form.errors.message.max')),
})

export type ContactFormValues = z.infer<ReturnType<typeof contactFormSchema>>

export const FORM_FIELDS = {
  lastName: { placeholder: 'contact.form.placeholders.lastName' },
  firstName: { placeholder: 'contact.form.placeholders.firstName' },
  society: { placeholder: 'contact.form.placeholders.society' },
  email: { placeholder: 'contact.form.placeholders.email' },
  website: { placeholder: 'contact.form.placeholders.website' },
  message: {
    placeholder: 'contact.form.placeholders.message',
  },
} as const
