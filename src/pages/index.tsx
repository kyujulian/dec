import Head from 'next/head';
import { api } from '~/utils/api';
import type { Collection } from '~/utils/types';

import { HomeContent } from '~/components/home';
import { Nav } from '~/components/nav';

//components

export default function Home() {
  const { isLoading, data } = api.example.getCollections.useQuery();
  let deck: Collection[] = [];

  if (data) {
    const collections = data.collections.Ok;
    if (collections) {
      deck = collections;
    }
  }

  if (isLoading || !data) {
    return <div> Loading... </div>;
  }

  return (
    <>
      <Head>
        <title> Dec </title>
        <meta name="description" content="a flashcard application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <HomeContent deck={deck} />
    </>
  );
}
