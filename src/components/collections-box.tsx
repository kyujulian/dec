import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { api } from '~/utils/api';
import Image from 'next/image';

import { clsx } from 'clsx';
import { useSession } from 'next-auth/react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import type { Collection } from '~/utils/types';
import CreateCollection from './create-collection';
import Link from 'next/link';

export default function Collections({
  setCollection,
}: {
  setCollection: Dispatch<SetStateAction<Collection[]>>;
}) {
  const { data, isLoading } = api.example.getCollections.useQuery();

  const { data: sessionData } = useSession();

  const collections = data?.collections.Ok;

  const [selected, setSelected] = useState<number>(0);
  console.log('Collections from collection', data);

  if (isLoading) {
    return <div> Loading... </div>;
  }

  if (data?.collections.Err) {
    return <div> Error retrieving collections </div>;
  }
  if (sessionData) {
  }
  if (!collections) {
    return <div> Collections Ok doesn`&apos`t exist </div>;
  }

  if (collections.length == 0) {
    return <div> Need to create collections bruv </div>;
  }

  return (
    <div className="w-full">
      <CollectionsView
        collections={collections}
        setCollections={setCollection}
        username={sessionData?.user.name ? sessionData.user.name : undefined}
      />
    </div>
  );
}

export function CollectionsView({
  collections,
  setCollections,
  username,
}: {
  collections: Collection[];
  setCollections: Dispatch<SetStateAction<Collection[]>>; //TODO fix this type
  username?: string;
}) {
  const [parent, enableAnimations] = useAutoAnimate();

  console.log('CollectionsView', collections);
  return (
    <div className="h-full w-full">
      <ul
        ref={parent}
        className="grid h-full w-full grid-flow-row grid-cols-1  gap-10 p-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        <li className=" rounded-md border-[1px]   shadow-md hover:cursor-pointer dark:border-neutral-500 dark:bg-neutral-700">
          <CreateCollection
            collections={collections}
            setCollections={setCollections}
          />
          {/* <CollectionItem create /> */}
        </li>
        {collections.map((collection: Collection, index) => (
          <li
            className=" rounded-md border-[1px] border-neutral-400 bg-neutral-100 shadow-md hover:cursor-pointer dark:border-neutral-500 dark:bg-neutral-700 "
            key={index}>
            <Link href={`${username}/${collection.handle}`}>
              <CollectionItem collection={collection} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const CollectionItem = ({
  collection,
  className,
  create,
}: {
  collection: Collection;
  className?: string;
  create?: boolean;
}) => {
  return (
    <>
      {create ? (
        <div
          className={clsx(
            'relative flex  items-center justify-center',
            className
          )}>
          <PlusIcon className="fill-neutral-300 px-10" />
        </div>
      ) : (
        <>
          <div className={clsx('relative h-[200px]', className)}>
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="w-full rounded-t-md object-cover"
            />
          </div>
          <h3 className="p-4"> {collection.name} </h3>
        </>
      )}
    </>
  );
};

export const PlusIcon = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <svg
    className={className}
    onClick={onClick}
    viewBox="0 -0.5 9 9"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>plus_mini [#1523]</title>
    <desc>Created with Sketch.</desc>
    <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
      <g
        id="Dribbble-Light-Preview"
        transform="translate(-345.000000, -206.000000)">
        <g id="icons" transform="translate(56.000000, 160.000000)">
          <polygon
            id="plus_mini-[#1523]"
            points="298 49 298 51 294.625 51 294.625 54 292.375 54 292.375 51 289 51 289 49 292.375 49 292.375 46 294.625 46 294.625 49"
          />
        </g>
      </g>
    </g>
  </svg>
);
