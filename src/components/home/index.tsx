import Collections from '~/components/collections-box';
import type { Collection } from '~/utils/types';
import { useState } from 'react';
import CreateCollection from '~/components/create-collection';
import { AuthShowcase } from '~/components/auth';
import { MyTabs } from '~/components/home-tabs';
import { PublicSwitch } from '~/components/utils/switcher';

import DeckView from '~/components/deck-view';
import InsertCard from '~/components/insert-card';

export function HomeContent({ deck }: { deck: Collection[] }) {
  const [collectionId, setCollection] = useState<string | undefined>(
    deck[0]?.id
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center from-[#2e026d] to-[#15162c]">
      {/* <AuthShowcase /> */}
      <h1 className="m-10 w-full p-10 text-start text-9xl font-light">
        {' '}
        Public Decks{' '}
      </h1>
      <div className="flex items-center gap-4"></div>
      <Collections setCollection={setCollection} />
      <MyTabs>
        {collectionId && <DeckView collectionId={collectionId} />}
        {collectionId && <InsertCard currentCollection={collectionId} />}
        {/* <CreateCollection /> */}
      </MyTabs>
    </main>
  );
}
