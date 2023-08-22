export type Option<T, K extends Error> = {
  Ok?: T,
  Err?: K;
}

export type Collection = {
  id: string,
  name: string,
  image: string, // will be a blob in the future
  isPublic: boolean,
}
export type FlashCard = {
  id: string;
  collectionId: string;
  front: string;
  back: string;
}
