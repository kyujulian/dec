import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function Page() {
  const router = useRouter();

  const result = api.example.getUserByUsername.useQuery({ name: router.asPath.replace("/", "") });
  const userCollection = api.example.getUserPublicCollections.useQuery({ name: router.asPath.replace("/", "") });

  if (!result.data?.user.Ok) {
    console.log(result.data);

    return <div>NotFound, queried for {router.asPath.replace("/", "")}</div>;
  }
  const user = result.data.user.Ok;


  if (!userCollection.data?.collections) {
    console.log(userCollection.data);
    return <div>Not okay.. collections, queried for {router.asPath.replace("/", "")}</div>;
  }
  const collections = userCollection.data.collections;

  console.log(collections);
  return (
    <div>
      <h1>Post: {router.asPath}</h1>
      <h1> User: {user.name}</h1>
      <ul >
        {collections.map((collection, index) => (
          <li key={index} >
            {collection.name}
          </li>
        ))}
      </ul>
      <h2> {collections[0]?.name}</h2>
    </div>
  );
}