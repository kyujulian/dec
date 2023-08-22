import TipTap from "./TipTap";
import type { Editor } from "@tiptap/react";
import { useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react'
import type { Content, JSONContent, HTMLContent } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit'
import Image from 'next/image'
import { addFlashCard } from "~/server/db";
import type { FlashCard } from "~/utils/types";
import { api } from "~/utils/api";


interface FormValues {
  collectionId: string;
  front: string;
  back: string;
}


export default function InsertCard({ currentCollection }: {
  currentCollection: string
}) {

  const [formValues, setFormValues] = useState<FormValues>({
    collectionId: currentCollection,
    front: '',
    back: '',
  })
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: "prose-lg prose-stone dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full",
      }
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const jsonString = JSON.stringify(json);
      setFormValues({ ...formValues, back: String(jsonString) })
    },
  });

  const ctx = api.useContext();

  const { mutate, isLoading } = api.example.addCardProcedure.useMutation({
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with values:', formValues);
    // You can perform additional actions like sending data to an API here
    mutate({
      collectionId: formValues.collectionId,
      front: formValues.front,
      back: formValues.back
    })
  };
  return (
    <div className=" w-[800px] ">

      <form className="flex flex-col gap-4 justify-center items-start" onSubmit={handleSubmit}>
        <label htmlFor="Front">Front</label>
        <input
          type="text"
          id="front"
          value={formValues.front}
          onChange={(e) => setFormValues({ ...formValues, front: e.target.value })}
        />
        <label className="text-sm h-10 " > back </label>
        <CustomTiptap editor={editor} className=' hover:cursor-text active:border-none p-10 h-full w-full border-neutral-800/70 bg-neutral-100 shadow-inner' editable />
        <button className="p-5 rounded-md  mx-auto bg-black text-white" type="submit"> SUBMIT </button>
      </form>
    </div>
  );

}


const CustomTiptap = ({ content, editor, editable, className }:
  { content?: string, editable?: boolean, className?: string, editor: Editor | null }) => {

  let parsedContent;
  try {
    if (content)
      parsedContent = JSON.parse(content) as JSONContent;
  }
  catch (e) {
    console.log("Error parsing content");
    parsedContent = "Error parsing content" as HTMLContent;
  }

  return (
    <EditorContent className={className} contentEditable={false} editor={editor} />
  )
}

