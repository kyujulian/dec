import { BaseSQLiteDatabase, SQLiteTableFn } from 'drizzle-orm/sqlite-core';
import { DrizzleCustomAdapter } from '~/utils/provider';
import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import type { NextAuthOptions, DefaultSession } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import { env } from '~/env.mjs';
import { db } from '~/server/db';
import { SqlFlavorOptions, TableFn } from '@auth/drizzle-adapter/lib/utils';
import {} from 'drizzle-orm/sqlite-core';
import { is } from 'drizzle-orm';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: DrizzleCustomAdapter(db),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

// export function DrizzleAdapter<SqlFlavor extends SqlFlavorOptions>(
//   db: SqlFlavor,
//   table?: TableFn<SqlFlavor>
// ): Adapter {
//   if (is(db, BaseSQLiteDatabase)) {
//     return DrizzleCustomAdapter(db, table as SQLiteTableFn);
//   }

//   throw new Error(
//     `Unsupported database type (${typeof db}) in Auth.js Drizzle adapter.`
//   );
// }
