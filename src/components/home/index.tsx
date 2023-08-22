import Collections from "~/components/collections-box";
import type { Collection } from "~/utils/types";
import { useState } from 'react';
import CreateCollection from "~/components/create-collection";
import { AuthShowcase } from "~/components/auth"
import { MyTabs } from "~/components/home-tabs";
import { PublicSwitch } from "~/components/utils/switcher";

import DeckView from "~/components/deck-view";
import InsertCard from "~/components/insert-card";

export function HomeContent({ deck }: { deck: Collection[] }) {

  const [publicCollection, setPublicCollection] = useState(true);
  const [collectionId, setCollection] = useState<string | undefined>(deck[0]?.id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center from-[#2e026d] to-[#15162c]">
      <AuthShowcase />
      <div className="flex gap-4 items-center">
        <h1> Public? </h1>
        <PublicSwitch publicCollection={publicCollection} setPublicCollection={setPublicCollection} />
      </div>
      <Collections setCollection={setCollection} />
      <MyTabs>
        {collectionId && <DeckView collectionId={collectionId} />}
        {collectionId && <InsertCard currentCollection={collectionId} />}
        <CreateCollection isPublic={publicCollection} />
      </MyTabs>
    </main >
  )

}

