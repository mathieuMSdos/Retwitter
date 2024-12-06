import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "../lib/prisma"
import { SessionSchema } from '../lib/validations/auth.schema';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id
        try {
          // Validation de la session
          return SessionSchema.parse(session)
        } catch (error) {
          // En cas d'erreur de validation, on retourne quand même la session
          // mais on peut logger l'erreur pour le debugging
          console.error('Session validation error:', error)
          return session
        }
      }
      return session
    },
  },
}