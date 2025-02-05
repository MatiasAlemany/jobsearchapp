import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/db";

// Definir correctamente los tipos para authOptions
export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/google",
          },
        }
      }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id;
        }
        return session;
      },
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  };