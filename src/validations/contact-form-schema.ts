import { z } from 'zod'

export const contactFormSchema = z.object({
  lastName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  society: z
    .string()
    .max(100, 'Le nom de la société ne peut pas dépasser 100 caractères')
    .optional(),
  email: z
    .string()
    .email('Adresse email invalide')
    .min(5, "L'email doit contenir au moins 5 caractères")
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
  website: z.string().max(200, 'Le site internet ne peut pas dépasser 200 caractères').optional(),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(1000, 'Le message ne peut pas dépasser 1000 caractères'),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const FORM_FIELDS = {
  lastName: { placeholder: 'Nom*' },
  firstName: { placeholder: 'Prénom*' },
  society: { placeholder: 'Société' },
  email: { placeholder: 'E-mail*' },
  website: { placeholder: 'Site internet' },
  message: {
    placeholder:
      "Vous avez une idée de projet, besoin d'un devis, d'une prise de rendez-vous ? Écrivez nous votre message.",
  },
} as const
