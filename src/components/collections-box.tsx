import type { Dispatch, Fragment, SetStateAction } from 'react';
import { useState } from 'react';
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { api } from '~/utils/api';
import Image from 'next/image';

import { clsx } from 'clsx';
// import { Collection } from '~/utils/types';
import { useSession } from 'next-auth/react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import type { Collection } from '~/utils/types';
import CreateCollection from './create-collection';

// import { PlusIcon } from '@heroicons/react/20/solid';
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
      <CollectionsView
        collections={collections}
        setCollections={setCollection}
      />
    </div>
  );
}

export function CollectionsView({
  collections,
  setCollections,
}: {
  collections: Collection[];
  setCollections: any; //TODO fix this type
}) {
  const [parent, enableAnimations] = useAutoAnimate();

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
            <CollectionItem collection={collection} />
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
          <PlusIcon onClick={() => {}} className="fill-neutral-300 px-10" />
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

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

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
