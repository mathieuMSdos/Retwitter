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

       await prisma.user.update({
          where: {
            id: user.user.id,
          },
          data: {
            username: generatedUsername,
          },
        });

      } catch (error) {
        throw error
      }
    },
  },
});
