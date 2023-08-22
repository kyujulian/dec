import { createClient } from '@libsql/client';
import type { Row, ResultSet, InArgs } from '@libsql/client';
import type { LibsqlError } from '@libsql/client';
import type { FlashCard, Collection } from '~/utils/types';
import { drizzle } from 'drizzle-orm/libsql';
import { flashCards, collections, collectionOwners } from 'drizzle/schema';
import { env } from "src/env.mjs";

import { DrizzleAdapter } from '@auth/drizzle-adapter';


import {
  getCardsCollectionQuery,
  getTablesQuery,
} from './queries';
import { eq } from 'drizzle-orm';

type Option<T, K> = {
  Ok?: T,
  Err?: K;
}

const client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_DATABASE_TOKEN
});


export const db = drizzle(client)

const drizzleAdapter = DrizzleAdapter(db);

export const getFlashCards = async (): Promise<Option<FlashCard[], Error>> => {
  try {
    const result: ResultSet = await db.select().from(flashCards).run();
    return { Ok: result.rows.map((card) => rowAsCard(card)) }
  } catch (error) {
    return { Err: error as Error }
  }
}


export const createCollectionOwner = async (instance: { id: string, collectionId: string, userId: string }) => {
  try {
    const result = await db.insert(collectionOwners).values({
      id: instance.id,
      collectionId: instance.collectionId,
      userId: instance.userId,
    }).run()
    return { Ok: result }
  }
  catch (error) {
    return { Err: error }
  }
}

export const addCollection = async (collection: Collection) => {
  try {
    const result = await db.insert(collections).values({
      id: collection.id,
      name: collection.name,
      image: collection.image,
      public: collection.isPublic
    }).run();
    return { Ok: result }
  }
  catch (error) {
    return {
      Err: error as Error
    }
  }
}

export const addFlashCard = async (card: FlashCard) => {

  try {
    const result = await db.insert(flashCards).values({
      id: card.id,
      collectionId: card.collectionId,
      front: card.front,
      back: card.back
    }).run();
    return { Ok: result }
  } catch (error) {
    return {
      Err: error as Error
    }

  }
}


export async function getCardsCollection(collectionId: string): Promise<Option<FlashCard[], Error>> {
  try {
    const result = await db.select().from(flashCards).where(eq(flashCards.collectionId, collectionId)).run();
    return { Ok: result.rows.map((card) => rowAsCard(card)) }
  } catch (error) {
    return { Err: error as Error }
  }

}

export async function getPublicCollections(): Promise<Option<Collection[], Error>> {
  try {
    const user = await drizzleAdapter.getUserByAccount({ providerAccountId: '127438172', provider: 'github' });
    const result = await db.select().from(collections).where(eq(collections.public, true)).run();
    return { Ok: result.rows.map((collection) => rowAsCollection(collection)) }
  } catch (error) {
    return { Err: error as Error }
  }
}
type CollectionOwnerMap = {
  id: string;
  collection: string;
  owner: string;
}

function rowAsCollectionOwner(row: Row): CollectionOwnerMap {
  return {
    id: row[0] as string,
    collection: row[1] as string,
    owner: row[2] as string
  }
}


export async function getCollectionById(collectionId: string) {
  const result = await db.select().from(collections).where(eq(collections.id, collectionId)).run()

  return result.rows.map((collection) => rowAsCollection(collection));
}

export async function getUserCollections(userId: string): Promise<Option<Collection[], Error>> {
  try {
    const collections_ids = await db.select().from(collectionOwners).run();

    const collectionOwnersTable = collections_ids.rows.map((collectionOwner) => rowAsCollectionOwner(collectionOwner));

    const collections: Collection[] = [];

    for (const element of collectionOwnersTable) {
      const collectionById = await getCollectionById(element.collection);
      collections.push(collectionById[0]!);
    }

    return { Ok: collections }
  } catch (error) {
    return { Err: error as Error }
  }
}


function rowAsCollection(row: Row): Collection {
  return {
    id: row[0] as string,
    name: row[1] as string,
    image: row[2] as string,
    isPublic: row[4] as unknown as boolean,
  }
}

function rowAsCard(row: Row): FlashCard {

  // This is inconsistent
  //const numberOfFlashCardAttributes = Object.getOwnPropertyNames({} as FlashCard).length;

  // if (row.length != numberOfFlashCardAttributes) {
  //   throw new Error(`rowAsCard: row length (${row.length}) does not match FlashCard length (${numberOfFlashCardAttributes})`);
  // }
  return {
    id: row[0] as string,
    collectionId: row[1] as string,
    front: row[2] as string,
    back: row[3] as string
  }
}

async function tursoFetchTableRows(table: string): Promise<Option<{ rows: Row[] }, LibsqlError>> {
  const result = await tursoFetch({
    query: getTablesQuery + table,
  })
  if (result.Err) {
    return { Err: result.Err };
  }
  return result;
}

export async function tursoFetch({
  query,
  variables,
}: {
  query: string;
  variables?: InArgs;
}): Promise<Option<{ rows: Row[] }, LibsqlError>> {

  try {
    const result = await client.execute({
      sql: query,
      args: variables ? variables : []
    });
    return { Ok: { rows: result.rows } };
  }
  catch (error) {
    return { Err: error as LibsqlError }
  }

}


