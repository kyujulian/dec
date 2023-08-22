import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { api } from "~/utils/api";
import Image from "next/image";

import { clsx } from "clsx";
// import { Collection } from '~/utils/types';
import { useSession } from "next-auth/react";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Collection } from "~/utils/types";

export default function Collections({
  setCollection,
}: {
  setCollection: Dispatch<SetStateAction<string | undefined>>;
}) {
  const { data, isLoading } = api.example.getCollections.useQuery();

  const { data: sessionData } = useSession();

  let collections;
  if (sessionData) {
    const { data: privateData, isLoading: privateLoadingData } =
      api.example.getUserCollection.useQuery();
    collections = privateData?.collections.Ok;
  } else {
    collections = data?.collections.Ok;
  }
  const [selected, setSelected] = useState<number>(0);

  console.log("Collections from collection", data);

  if (isLoading) {
    return <div> Loading... </div>;
  }

  if (data?.collections.Err) {
    return <div> Error retrieving collections </div>;
  }
  if (sessionData) {
  }
  if (!collections) {
    return <div> Collections Ok doesni &apos t exist </div>;
  }

  const selectCollection = (id: string, index: number) => {
    setCollection(id);
    setSelected(index);
  };

  if (collections.length == 0) {
    return <div> Need to create collections bruv </div>;
  }

  return (
    <div className="w-full">
      <Example collections={collections} setCollection={setCollection} />
    </div>
  );
}

function Example({
  collections,
  setCollection,
}: {
  collections: Collection[];
  setCollection: Dispatch<SetStateAction<string | undefined>>;
}) {
  // const { data, isLoading } = api.example.getCollections.useQuery();

  console.log("Collections from example", collections);
  const [selected, setSelected] = useState(collections[0]);
  // const [selected, setSelected] = useState<number>(0);
  const [items, setItems] = useState(collections);
  const [parent, enableAnimations] =
    useAutoAnimate();
    // const add = (collection) => setItems([...items, collection])

  const selectCollection = (selected: Collection) => {
    setCollection(selected.id);
    setSelected(selected);
  };

  return (
    <div className="h-[80vh] w-full bg-blue-400">
      <ul
        ref={parent}
        className="grid h-full w-full grid-cols-4 grid-rows-3 gap-4"
      >
        {collections.map((collection: Collection, index) => (
          <li
            className=" rounded-md border-[1px] border-neutral-400 bg-neutral-100 shadow-md hover:cursor-pointer dark:border-neutral-500 dark:bg-neutral-700 "
            key={index}
          >
            <div className="relative h-[200px] w-full">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="w-full  rounded-t-md object-cover"
              />
            </div>
            <h3 className="p-4"> {collection.name} </h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
