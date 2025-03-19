import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write something amazing...</p>",
  });

  if (!editor) return null;

  return (
    <div className="p-4 border-4 border-black bg-white shadow-lg rounded-lg">
      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <button
          className="px-2 py-1 bg-gray-200 border"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          className="px-2 py-1 bg-gray-200 border"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white border"
          onClick={() => editor.commands.clearContent()}
        >
          Clear
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="p-2 min-h-[200px] bg-gray-100 rounded-md"
      />
    </div>
  );
}
