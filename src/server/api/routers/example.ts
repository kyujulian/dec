import { z } from "zod";
import { createClient } from "@libsql/client";
import {
  addFlashCard,
  addCollection,
  getFlashCards,
  getCardsCollection,
  getPublicCollections,
  getUserCollections,
  createCollectionOwner,
  getUserByUsername,
  getUserPublicCollections,
} from "~/server/db";
import type { Collection, CollectionOwner, FlashCard, Option } from "~/utils/types";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { getCardsCollectionQuery } from "~/server/queries";
import { v4 as uuidv4 } from "uuid";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  turso: publicProcedure.query(async () => {
    const cards = await getFlashCards();

    return {
      cards: cards as Option<FlashCard[], Error>,
    };
  }),

  addCardProcedure: protectedProcedure
    .input(
      z.object({
        collectionId: z.string(),
        front: z.string(),
        back: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const card: FlashCard = {
        id: uuidv4(),
        collectionId: input.collectionId,
        front: input.front,
        back: input.back,
      };
      const result = await addFlashCard(card);
    }),

  getUserByUsername: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const result = await getUserByUsername(input.name);
      return {
        user: result as Option<User, Error>,
      };
    }),
  getUserPublicCollections: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const result = await getUserPublicCollections(input.name);
      if (result.Ok) {
        return {
          collections: result.Ok.map((result) => result.Collections)
        };
      }
      return {
        collections: []
      }
    }),

  addCollectionProcedure: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.string().url("image must be an url"),
        isPublic: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const id = uuidv4();
      const collection: Collection = {
        id: id,
        name: input.name,
        image: input.image,
        isPublic: input.isPublic,
      };
      const result = await addCollection(collection);

      const collectionOwnerCreated = await createCollectionOwner({
        id: uuidv4(),
        collectionId: id,
        userId: ctx.session.user.id,
      });
    }),

  getCollections: publicProcedure.query(async () => {
    const collections = await getPublicCollections();
    return {
      collections: collections as Option<Collection[], Error>,
    };
  }),

  getUserCollection: protectedProcedure.query(async ({ ctx }) => {
    const collections = await getUserCollections(ctx.session.user.id);
    return {
      collections: collections as Option<Collection[], Error>,
    };
  }),

  cardByCollection: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const cards = await getCardsCollection(input.id);

      return {
        cards: cards as Option<FlashCard[], Error>,
      };
    }),

  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
  //
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";

  }),
});

