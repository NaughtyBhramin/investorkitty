import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import MicrosoftProvider from 'next-auth/providers/azure-ad';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ''
    }),
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID ?? '',
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET ?? ''
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          console.log('[AUTH] Credentials authorize attempt:', { email: credentials?.email });

          if (!credentials?.email || !credentials.password) {
            console.log('[AUTH] Missing credentials - email or password is empty');
            return null;
          }

          const user = await prisma.user.findUnique({ where: { email: credentials.email } });

          if (!user) {
            console.log('[AUTH] User not found:', credentials.email);
            return null;
          }

          if (!user.passwordHash) {
            console.log('[AUTH] User exists but has no password hash:', credentials.email);
            return null;
          }

          console.log('[AUTH] Attempting bcrypt compare for user:', credentials.email);
          const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

          if (!isValid) {
            console.log('[AUTH] Password mismatch for user:', credentials.email);
            return null;
          }

          console.log('[AUTH] Credentials valid. User authenticated:', credentials.email);
          return user;
        } catch (error) {
          console.error('[AUTH] Error in credentials authorize:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'database'
  },
  callbacks: {
    async session({ session, user }: any) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/sign-in'
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
