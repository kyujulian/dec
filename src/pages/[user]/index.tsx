import { useRouter } from 'next/router';
import { CollectionsView } from '~/components/collections-box';
import { Nav } from '~/components/nav';
import { api } from '~/utils/api';
import { useState } from 'react';
import type { Collection } from '~/utils/types';

export default function Page() {
  const router = useRouter();

  const { data, isLoading } = api.example.getCollections.useQuery();

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
    return <div>NotFound, queried for {router.asPath.replace('/', '')}</div>;
  }

  // const collections = userCollection.data.collections;
  const useCollections = data?.collections.Ok;

  return (
    <>
      <Nav />
      {useCollections && (
        <UserCollectionPage
          m_collections={useCollections}
          username={user?.name ? user.name : undefined}
        />
      )}
    </>
  );
}

function UserCollectionPage({
  m_collections,
  username,
}: {
  m_collections: Collection[];
  username: string | undefined;
}) {
  //TODO fix this name man
  const [collections, setCollections] = useState<Collection[]>(m_collections);

  return (
    <>
      <CollectionsView
        collections={collections}
        setCollections={setCollections}
        username={username}
      />
    </>
  );
}
