import { api } from '~/utils/api';
// import { useState } from 'react';
import { Switcher } from '~/components/utils/switcher';
import clsx from 'clsx';
// import autoAnimate fcom '@formkit/auto-animate';

import { XMarkIcon } from '@heroicons/react/20/solid';
import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { Collection } from '~/utils/types';

export default function CreateCollection({
  collections,
  setCollections,
}: {
  collections: Collection[];
  setCollections: Dispatch<SetStateAction<Collection[]>>;
}) {
  const [show, setShow] = useState(false);

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);

  return (
    <div
      ref={parent}
      className={clsx(
        'absolute  right-10 top-10 z-10 w-[300px] rounded-md border-[1px] border-neutral-300 bg-white p-3 shadow-md  hover:cursor-pointer ',
        { ' p-8 hover:cursor-auto': show }
      )}
      onClick={() => {
        if (!show) {
          reveal();
        }
      }}>
      <strong
        className="dropdown-label  mx-auto w-fit transition-all duration-200 hover:cursor-pointer"
        onClick={reveal}>
        New Collection
      </strong>
      {show && (
        <XMarkIcon
          role="button"
          onClick={reveal}
          className={clsx(
            ' absolute right-5 top-4 h-5 w-5 text-neutral-400 transition-all duration-200 hover:cursor-pointer'
          )}
        />
      )}
      {show && <CollectionForm setCollections={setCollections} />}
    </div>
  );
}

interface FormValues {
  name: string;
  imageUrl: string;
}
export function CollectionForm({
  setCollections,
}: {
  setCollections: Dispatch<SetStateAction<Collection[]>>;
}) {
  const [publicCollection, setPublicCollection] = useState(true);

  const [formValues, setFormValues] = useState<FormValues>({
    name: 'wha',
    imageUrl: 'what2',
  });

  const { mutate, isLoading } = api.example.addCollectionProcedure.useMutation(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('CollectionForm', formValues);
    mutate({
      name: formValues.name,
      image: formValues.imageUrl,
      isPublic: publicCollection,
    });
    setCollections((collections) => [
      ...collections,
      {
        id: 'what',
        image: formValues.imageUrl,
        name: formValues.name,
        isPublic: publicCollection,
      },
    ]);
  };
  return (
    <div className="">
      <div className="flex w-full items-center justify-start gap-3 py-5">
        <Switcher enabled={publicCollection} setEnabled={setPublicCollection} />
        <h1 className="text-light text-neutral-400 dark:text-neutral-600">
          {' '}
          Public{' '}
        </h1>
      </div>
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
          className="rounded-sm bg-neutral-100 p-2 shadow-inner"
          name="name"
          type="text"
          placeholder="Collection name"
        />
        <label htmlFor="ImageUrl">Image url</label>
        <input
          className="rounded-sm bg-neutral-100 p-2 shadow-inner"
          onChange={(e) =>
            setFormValues({ ...formValues, imageUrl: e.target.value })
          }
          name="imageUrl"
          type="text"
          placeholder="ImageUrl"
        />
        <button
          type="submit"
          className="mx-auto  mt-4 w-fit rounded-md bg-black  p-4 font-bold text-white">
          submit
        </button>
      </form>
    </div>
  );
}
