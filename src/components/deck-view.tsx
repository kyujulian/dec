import { api } from "~/utils/api";
import CardList from "~/components/card-list";

export default function DeckView({ collectionId }: { collectionId: string }) {
  const { data, isLoading } = api.example.cardByCollection.useQuery({
    id: collectionId,
  });
  if (isLoading) return <div> Loading... </div>;

  if (data?.cards.Err) {
    return <div> Error </div>;
  }
  const csCards = data?.cards.Ok;
  if (!csCards) return <div> No cards </div>;

  return (
    <div>
      <CardList cards={csCards} />
    </div>
  );
}
