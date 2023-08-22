import { api } from '~/utils/api';
import { useState } from 'react';
import { Switcher } from "~/components/utils/switcher";


interface FormValues {
  name: string;
  imageUrl: string;
}
export default function CreateCollection() {


  const [publicCollection, setPublicCollection] = useState(true);

  const [formValues, setFormValues] = useState<FormValues>({
    name: "wha",
    imageUrl: "what2"
  })

  const { mutate, isLoading } = api.example.addCollectionProcedure.useMutation({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("CollectionForm", formValues)
    mutate({
      name: formValues.name,
      image: formValues.imageUrl,
      isPublic: publicCollection
    })
  }
  return (
    <div>
      <Switcher enabled={publicCollection} setEnabled={setPublicCollection} />
      <h1> Public? </h1>
      <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
          className="bg-neutral-100 shadow-inner" name="name" type="text" placeholder="Collection name" />
        <label htmlFor="ImageUrl">Image url</label>
        <input className="bg-neutral-100 shadow-inner"
          onChange={(e) => setFormValues({ ...formValues, imageUrl: e.target.value })}
          name="imageUrl" type="text" placeholder="ImageUrl" />
        <button type="submit" className="bg-black text-white font-bold">submit</button>
      </form>
    </div>
  )
}
