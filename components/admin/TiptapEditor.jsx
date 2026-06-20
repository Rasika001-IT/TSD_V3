"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useRef } from "react";

const Btn = ({ active, onClick, title, children }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`px-2.5 py-1 rounded text-sm border ${
      active ? "bg-[#1D1F26] text-white border-[#1D1F26]" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
    }`}
  >
    {children}
  </button>
);

export default function TiptapEditor({ value, onChange }) {
  const fileRef = useRef(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[400px] focus:outline-none p-4",
      },
    },
  });

  if (!editor) return null;

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) editor.chain().focus().setImage({ src: data.url }).run();
    e.target.value = "";
  };

  const addLink = () => {
    const url = window.prompt("Link URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
    else editor.chain().focus().unsetLink().run();
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Btn>
        <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Btn>
        <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></Btn>
        <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></Btn>
        <Btn title="Strike" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></Btn>
        <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</Btn>
        <Btn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</Btn>
        <Btn title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝</Btn>
        <Btn title="Link" active={editor.isActive("link")} onClick={addLink}>Link</Btn>
        <Btn title="Image" onClick={() => fileRef.current?.click()}>Image</Btn>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={uploadImage} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
