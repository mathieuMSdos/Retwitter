import { z } from "zod"

// Schéma de base pour User
export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  emailVerified: z.date().nullable(),
  image: z.string().url().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
})

// Schéma pour la session
export const SessionSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string().email().nullable(),
    image: z.string().url().nullable()
  })
})

// Type inféré du schéma
export type SessionZod = z.infer<typeof SessionSchema>
export type UserZod = z.infer<typeof UserSchema>