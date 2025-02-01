"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ImageResize from "tiptap-extension-resize-image";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

import { RichTextToolbar } from "./TipTapToolbar";

interface TipTapEditorProps {
  content: string | undefined;
  onChange: (content: string) => void;
}

export function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({ levels: [1, 2, 3] }),
      OrderedList.configure({ HTMLAttributes: { class: "list-decimal ml-3" } }),
      BulletList.configure({ HTMLAttributes: { class: "list-disc ml-3" } }),
      Highlight,
      Image,
      ImageResize,
      Underline,
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[200px] border-input bg-background px-3 py-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <RichTextToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
