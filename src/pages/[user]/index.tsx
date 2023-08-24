import { useRouter } from 'next/router';
import { CollectionItem, CollectionsView } from '~/components/collections-box';
import CreateCollection from '~/components/create-collection';
import { Nav } from '~/components/nav';
import { api } from '~/utils/api';
import { useEffect, useState } from 'react';
import { Collection } from '~/utils/types';

export default function Page() {
  const router = useRouter();

  const result = api.example.getUserByUsername.useQuery({
    name: router.asPath.replace('/', ''),
  });
  const userCollection = api.example.getUserPublicCollections.useQuery({
    name: router.asPath.replace('/', ''),
  });

  const user = result.data?.user.Ok;

  if (!userCollection.data?.collections) {
    return (
      <div>
        Not okay.. collections, queried for {router.asPath.replace('/', '')}
      </div>
    );
  }

  if (!result.data?.user.Ok) {
    console.log(result.data);
    return <div>NotFound, queried for {router.asPath.replace('/', '')}</div>;
  }

  const collections = userCollection.data.collections;

  return (
    <body>
      <Nav />
      <h1>Post: {router.asPath}</h1>
      <h1> User: {user.name}</h1>
      {collections && <CollectionHandler m_collections={collections} />}
    </body>
  );
}

function CollectionHandler({ m_collections }: { m_collections: Collection[] }) {
  //TODO fix this name man
  const [collections, setCollections] = useState<Collection[]>(m_collections);

  return (
    <>
      <CollectionsView
        collections={collections}
        setCollections={setCollections}
      />
    </>
  );
}
