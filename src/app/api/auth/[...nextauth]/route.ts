import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { _db } from "../../db";
import { RateLimiter } from "limiter";
const limiter = new RateLimiter({
  tokensPerInterval: 5,
  interval: "minute",
  fireImmediately: true,
});
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        try {
          const remainingTokens = await limiter.removeTokens(1);
          if (remainingTokens === -1) {
            return null;
          }

          if (!credentials?.email || !credentials.password) {
            return null;
          }
          const user = await _db.utilisateur.findUnique({
            where: { email: credentials.email },
          });
          if (!user) {
            return null;
          }
          const passwordCorrect = await compare(
            credentials!.password,
            user.password
          );
          if (passwordCorrect) {
            return {
              id: String(user.id),
              email: user.email,
              nom: user.nom,
              prenom: user.prenom,
            };
          }

          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        //@ts-ignore
        token.fullName = user.nom.concat(" ", user.prenom);
      }
      return token;
    },
    session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: Number(token.sub),
          fullName: token.fullName,
        },
      };
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
