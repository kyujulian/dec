import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from 'drizzle-orm/sqlite-core';
import type { AdapterAccount } from '@auth/core/adapters';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
});

export const accounts = sqliteTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = sqliteTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
});

export const verificationTokens = sqliteTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

// Business logic

export const flashCards = sqliteTable('FlashCards', {
  id: text('id').notNull().primaryKey(),
  collectionId: text('collection_id'),
  front: text('front_text_md'),
  back: text('back_text_md'),
});

export const collections = sqliteTable('Collections', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  image: text('image'),
  public: integer('public', { mode: 'boolean' }).default(false).notNull(), //TODO change name to ispublic in database
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToCollections: many(collectionOwners),
}));
export const collectionsRelations = relations(collections, ({ many }) => ({
  collectionsToUsers: many(collectionOwners),
}));

export const collectionOwners = sqliteTable('CollectionOwners', {
  id: text('id').notNull().primaryKey(),
  collectionId: text('collection_id').references(() => collections.id, {
    onDelete: 'cascade',
  }),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
});

export const usersToCollections = relations(collectionOwners, ({ one }) => ({
  collection: one(collections, {
    fields: [collectionOwners.collectionId],
    references: [collections.id],
  }),
  user: one(users, {
    fields: [collectionOwners.userId],
    references: [users.id],
  }),
}));
