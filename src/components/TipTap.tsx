import { useEditor, EditorContent } from '@tiptap/react'
import type { Content, JSONContent, HTMLContent } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit'
import Image from 'next/image'

import { useEffect } from 'react';
const Tiptap = ({ content, editable, className }:
  { content?: string, editable?: boolean, className?: string }) => {

  let parsedContent;
  try {
    if (content)
      parsedContent = JSON.parse(content) as JSONContent;
  }
  catch (e) {
    console.log("Error parsing content");
    parsedContent = "Error parsing content" as HTMLContent;
  }
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: "prose-lg prose-stone dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full",
      }
    },
    editable: editable ? true : false,
    content: parsedContent,
  })

  return (
    <EditorContent className={className} contentEditable={false} editor={editor} />
  )
}

export default Tiptap
