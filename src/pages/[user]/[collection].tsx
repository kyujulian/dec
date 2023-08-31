import { useRouter } from 'next/router';
import { Nav } from '~/components/nav';
import { api } from '~/utils/api';
import type { Collection } from '~/utils/types';

export default function Page() {
  const router = useRouter();
  const [user, collectionUrl] = router.asPath.replace('/', '').split('/');

  if (!user || !collectionUrl) {
    return <div>Not found</div>;
  }
  const result = api.example.getUserByUsername.useQuery({
    name: user,
  });
  const { data, isLoading } = api.example.getUserPublicCollections.useQuery({
    name: user,
  });

  const userCollection = data?.collections as Collection[];

  console.log('Collection page', userCollection);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const selectedCollection: Collection | undefined = userCollection?.filter(
    (c) => c.handle == collectionUrl
  )[0];

  console.log('Selected collection', selectedCollection);
  if (!selectedCollection) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <Nav />
      <h1 className="ml-[100px] mt-[100px] text-7xl">
        {selectedCollection.name}
      </h1>{' '}
    </div>
  );
}
