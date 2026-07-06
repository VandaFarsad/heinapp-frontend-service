import { getBackendAccessToken } from "@/app/api/helpers";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// These value should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 23 * 60 * 60 + 45 * 60; // 23 Stunden 45 Minuten (etwas weniger als 1 Tag)

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    // The session will persist for that duration even after the browser is closed.
    maxAge: BACKEND_ACCESS_TOKEN_LIFETIME,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "E-Mail:",
          type: "email",
        },
        password: {
          label: "Passwort:",
          type: "password",
        },
      },

      async authorize(credentials) {
        return getBackendAccessToken(credentials);
      },
    }),
  ],

  callbacks: {
    async jwt({ user, token, account, trigger, session: sessionUpdate }) {
      // If `user` and `account` are set that means it is a login event
      if (user && account) {
        token["user"] = user.user;
        token["access_token"] = user.access;
        return token;
      }

      if (trigger === "update" && sessionUpdate) {
        token.user = {
          ...token.user,
          ...sessionUpdate.user,
        };
      }

      return token;
    },

    // We need to update the session to include the access token and user data in `token`.
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.access_token = token.access_token;
      }

      return session;
    },
  },
};
