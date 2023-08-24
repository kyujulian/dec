import { api } from '~/utils/api';
// import { useState } from 'react';
import { Switcher } from '~/components/utils/switcher';
import clsx from 'clsx';
// import autoAnimate fcom '@formkit/auto-animate';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { PlusSmallIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useState, useRef, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { Collection } from '~/utils/types';
import { PlusIcon } from '~/components/collections-box';

export default function CreateCollection({
  setCollections,
}: {
  collections: Collection[];
  setCollections: Dispatch<SetStateAction<Collection[]>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // <MyModal />
  return (
    <div className=" h-full w-full  ">
      <button
        type="button"
        onClick={openModal}
        className="flex h-full w-full items-center justify-center rounded-md bg-black bg-opacity-10 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <PlusSmallIcon
          className=" h-full max-h-[300px] w-[80%]  bg-none"
          aria-hidden="true"
        />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0  overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="h-fit w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end">
                    <XMarkIcon
                      role="button"
                      onClick={closeModal}
                      className={clsx(
                        'h-5 w-5 text-neutral-400 transition-all duration-200 hover:cursor-pointer'
                      )}
                    />
                  </div>
                  <CollectionForm
                    setCollections={setCollections}
                    closeModal={closeModal}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

interface FormValues {
  name: string;
  imageUrl: string;
}
export function CollectionForm({
  setCollections,
  closeModal,
}: {
  setCollections: Dispatch<SetStateAction<Collection[]>>;
  closeModal?: () => void;
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
    closeModal();
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
