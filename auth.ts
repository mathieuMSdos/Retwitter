// auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { userNameGenerator } from "./lib/utils/usernameGenerator";
import { prisma } from "./prisma";
import { userSchema,  } from "./lib/schema/user.schema";



export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      try {
        if (user) {
          // ZOD validation typage pour USER
          const validatedUser = userSchema.parse(user)

          token.id = validatedUser.id;
          token.email = validatedUser.email;
          token.name = validatedUser.name;
          token.picture = validatedUser.image;
          token.hasCompletedOnboarding = validatedUser.hasCompletedOnboarding;
        }
        // console.log(user);

        if (!token.id) {
          return token;
        }

        const dbUser = await prisma.user.findUnique({
          where: {
            id: token.id as string,
          },
          select: {
            username: true,
            displayName: true,
            image: true,
            email: true,
            name: true,
            hasCompletedOnboarding: true,
          },
        });

        if (dbUser) {
          const updatedToken = {
            ...token,
            username: dbUser.username ?? null,
            displayName: dbUser.displayName ?? null,
            email: dbUser.email ?? token.email ?? null,
            name: dbUser.name ?? token.name ?? null,
            picture: dbUser.image ?? token.picture ?? null,
            hasCompletedOnboarding:
              dbUser.hasCompletedOnboarding ??
              token.hasCompletedOnboarding ??
              null,
          };
          return updatedToken;
        }

        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },
    

    session: async ({ session, token }) => {
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: token.id ?? null,
          username: token.username ?? null,
          displayName: token.displayName ?? null,
          email: token.email ?? null,
          name: token.name ?? null,
          image: token.picture ?? null,
          hasCompletedOnboarding: token.hasCompletedOnboarding ?? null,
        },
      };

      return updatedSession;
    },

    // Ajout de la gestion de redirection ok
    redirect({ baseUrl }) {
      return `${baseUrl}/protected/onboardingPage`;
    },

    // Ajout de la gestion des autorisations
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/protected/dashboard");
      const isAuthRoute = nextUrl.pathname.startsWith("/api/auth");

      if (isAuthRoute) return true;

      if (isOnDashboard && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },

  pages: {
    // défini le chemin vers la page de connexion
    signIn: "/",
  },
  session: { strategy: "jwt" },
  events: {
    createUser: async (user) => {
      try {
        let generatedUsername = await userNameGenerator(user);

        let isExistingUserName = await prisma.user.findUnique({
          where: {
            username: generatedUsername,
          },
        });

        while (isExistingUserName) {
          generatedUsername = await userNameGenerator(user);
          isExistingUserName = await prisma.user.findUnique({
            where: {
              username: generatedUsername,
            },
          });
        }

        const updatedUserName = await prisma.user.update({
          where: {
            id: user.user.id,
          },
          data: {
            username: generatedUsername,
          },
        });

        return updatedUserName;
      } catch (error) {
        throw error;
      }
    },
  },
});
