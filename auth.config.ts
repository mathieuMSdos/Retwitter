// auth.config.ts
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/",
  },
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user;
  //     const isOnProtected = nextUrl.pathname.startsWith("/protected");
  //     const isAuthRoute = nextUrl.pathname.startsWith("/api/auth");

  //     // Toujours autoriser les routes d'authentification
  //     if (isAuthRoute) {
  //       return true;
  //     }

  //     // Pour les routes protégées
  //     if (isOnProtected) {
  //       if (isLoggedIn) {
  //         return true; // Utilisateur connecté -> accès autorisé
  //       } else {
  //         return Response.redirect(new URL("/", nextUrl)); // Non connecté -> redirection vers l'accueil
  //       }
  //     }

  //     // Routes publiques -> accès autorisé pour tous
  //     return true;
  //   },
  // },
} satisfies NextAuthConfig;