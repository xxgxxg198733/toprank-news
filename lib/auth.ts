import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { getUserByEmail, getUserById, getUserIdByOAuth, linkOAuthAccount, createUser } from "./kv";
import { v4 as uuid } from "uuid";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials as { email: string; password: string };

        const user = await getUserByEmail(email);
        if (!user || !user.passwordHash) return null;

        const isValid = await compare(password, user.passwordHash);
        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingOAuth = await getUserIdByOAuth("google", account.providerAccountId);
        if (existingOAuth) {
          // Link existing user
          const existingUser = await getUserById(existingOAuth);
          if (existingUser) {
            (user as { id: string }).id = existingUser.id;
            user.name = existingUser.name;
            user.email = existingUser.email;
            user.image = existingUser.image;
            return true;
          }
        }

        // Check if email exists (merge accounts)
        if (user.email) {
          const emailUser = await getUserByEmail(user.email);
          if (emailUser) {
            await linkOAuthAccount("google", account.providerAccountId, emailUser.id);
            (user as { id: string }).id = emailUser.id;
            return true;
          }
        }

        // Create new user from Google
        const userId = uuid();
        await createUser({
          id: userId,
          name: user.name || "Google 用户",
          email: user.email!,
          image: user.image ?? undefined,
          createdAt: new Date().toISOString(),
        });
        await linkOAuthAccount("google", account.providerAccountId, userId);
        (user as { id: string }).id = userId;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
      }
      return session;
    },
  },
});
