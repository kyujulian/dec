import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import Link from "next/link";
import Card from "~/components/card";
import DeckView from "~/components/deck-view";
import { api } from "~/utils/api";
import type { FlashCard, Collection } from "~/utils/types";
import Image from "next/image";
import Collections from "~/components/collections-box";

import CreateCollection from "~/components/create-collection"

import { Tab } from "@headlessui/react";

import { Switch } from "@headlessui/react";
import InsertCard from "~/components/insert-card";

function MyTabs({ children }:
  { children: React.ReactNode[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Tab.Group defaultIndex={0} selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className="flex justify-center gap-4" >
        <Tab >Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </Tab.List>
      <Tab.Panel> {children[0]}</Tab.Panel>
      <Tab.Panel> {children[1]}</Tab.Panel>
      <Tab.Panel> {children[2]}</Tab.Panel>
    </Tab.Group>
  )
}

function PublicSwitch(
  { publicCollection, setPublicCollection: setPublicCollection }: { publicCollection: boolean, setPublicCollection: (publicCollection: boolean) => void }
) {

  return (
    <div className="">
      <Switch
        checked={publicCollection}
        onChange={setPublicCollection}
        className={`${publicCollection ? 'bg-teal-900' : 'bg-teal-700'}
relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Collection Public</span>
        <span
          aria-hidden="true"
          className={`${publicCollection ? 'translate-x-9' : 'translate-x-0'}
pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <h1> {String(publicCollection)} </h1>
    </div>
  )

}


export default function Home() {
  const { isLoading, data } = api.example.getCollections.useQuery();
  let deck: Collection[] = [];

  if (data) {
    const collections = data.collections.Ok;
    if (collections) {
      deck = collections;
    }
  }


  if (isLoading || (!data)) {
    return <div> Loading... </div>
  }

  return (
    <>
      <Head>
        <title> Dec </title>
        <meta name="description" content="a flashcard application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainPageHandler deck={deck} />
    </>
  );
}

function MainPageHandler({ deck }: { deck: Collection[] }) {

  const [publicCollection, setPublicCollection] = useState(true);
  // const togglePublicCollection = (current: boolean) => {
  //   setPublicCollection(!current)
  //   console.log(current);
  // }
  const [collectionId, setCollection] = useState<string | undefined>(deck[0]?.id);
  const maxCardIndex = 10;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center from-[#2e026d] to-[#15162c]">
      <AuthShowcase />
      <div className="flex gap-4 items-center">
        <h1> Public? </h1>
        <PublicSwitch publicCollection={publicCollection} setPublicCollection={setPublicCollection} />
      </div>
      <Collections collections={deck} setCollection={setCollection} />
      <MyTabs>
        {collectionId && <DeckView collectionId={collectionId} />}
        {collectionId && <InsertCard currentCollection={collectionId} />}
        <CreateCollection isPublic={publicCollection} />
      </MyTabs>
    </main >
  )

}



function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src={sessionData?.user?.image!}
        alt="Profile-picture"
        width={100}
        height={100}
        className="rounded-full"
      />
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
