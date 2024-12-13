// auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { userNameGenerator } from "./lib/utils/usernameGenerator";
import { prisma } from "./prisma";

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
      // console.log("JWT callback - Initial token:", token);
      // console.log("JWT callback - User:", user);
  
      try {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          token.picture = user.image;
        }
  
        if (!token.id) {
          console.log("No token ID found");
          return token;
        }
  
        const dbUser = await prisma.user.findUnique({
          where: {
            id: token.id,
          },
          select: {
            username: true,
            displayName: true,
            image: true,
            email: true,
            name: true
          }
        });
  
        console.log("DB User found:", dbUser);
  
        if (dbUser) {
          const updatedToken = {
            ...token,
            username: dbUser.username,
            displayName: dbUser.displayName,
            email: dbUser.email || token.email,
            name: dbUser.name || token.name,
            picture: dbUser.image || token.picture,
          };
          console.log("Updated token:", updatedToken);
          return updatedToken;
        }
  
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },
  
    session: async ({session, token}) => {
      // console.log("Session callback - Token:", token);
      // console.log("Session callback - Initial session:", session);
  
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: token.id || null,
          username: token.username || null,
          displayName: token.displayName || null,
          email: token.email || null,
          name: token.name || null,
          image: token.picture || null,
        }
      };
  
      console.log("Updated session:", updatedSession);
      return updatedSession;
    },
  },
  
  pages: {
    signIn: "/",
  },
  session: { strategy: "jwt" }, // on utilise une stratégie JWT et non database
  events: {
    createUser: async (user) => {
      try {
        // on génére un username pour le nouveau user
        let generatedUsername = await userNameGenerator(user);

        //on verifie que ce username n'est pas déjà utilisé dans notre base de données pour un autre user
        let isExistingUserName = await prisma.user.findUnique({
          where: {
            username: generatedUsername,
          },
        });

        // si le userName exite déjà on en génère un nouveau jusqu'à ce qu'il soit inexistant dans la BDD

        while (isExistingUserName) {
          generatedUsername = await userNameGenerator(user);
          isExistingUserName = await prisma.user.findUnique({
            where: {
              username: generatedUsername,
            },
          });
        }
        // Une fois que userName est bien unique on update notre base de donnée avec le bon userName valide

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
