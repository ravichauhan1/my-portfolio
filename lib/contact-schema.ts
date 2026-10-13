import { z } from 'zod';

export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 4000 },
} as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.name.min, 'Please enter your valid name.')
    .max(CONTACT_LIMITS.name.max, `Keep the name under ${CONTACT_LIMITS.name.max} characters.`),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .max(CONTACT_LIMITS.email.max, 'That email address is too long.')
    .email('That does not look like a valid email address.'),
  message: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.message.min, 'Add a little more detail (at least 10 characters).')
    .max(
      CONTACT_LIMITS.message.max,
      `Keep the message under ${CONTACT_LIMITS.message.max} characters.`
    ),
});

export type ContactInput = z.infer<typeof contactSchema>;
