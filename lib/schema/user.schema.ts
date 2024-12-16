// lib/schemas/user.schema.ts
import { z } from 'zod'

// Définition du schema Zod
export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  username: z.string().nullable(),
  displayName: z.string().nullable(),
  hasCompletedOnboarding: z.boolean().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
})

// Type inféré de Zod
export type UserZod = z.infer<typeof userSchema>
