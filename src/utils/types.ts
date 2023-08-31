export type Option<T, K extends Error> = {
  Ok?: T;
  Err?: K;
};

export type CollectionOwner = {
  id: string;
  collectionId: string;
  userId: string;
};

export type CollectionInput = {
  name: string;
  image: string; // will be a blob in the future
  isPublic: boolean;
};

export type Collection = {
  id: string;
  handle: string;
  name: string;
  image: string; // will be a blob in the future
  ownerId: string;
  isPublic: boolean;
};
export type FlashCard = {
  id: string;
  collectionId: string;
  front: string;
  back: string;
};

//Display
export type DisplayCollection = {
  handle: string;
  name: string;
  image: string; // will be a blob in the future
};
