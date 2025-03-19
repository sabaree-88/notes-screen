import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateNote } from "../api/noteService";
import RichTextEditor from "../components/RichTextEditor";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createNote = useCreateNote();
  const navigate = useNavigate();

  const handleSave = () => {
    createNote.mutate(
      { title, content },
      {
        onSuccess: () => navigate("/"),
      }
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">➕ Create Note</h1>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mt-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <RichTextEditor value={content} setValue={setContent} />
      <button
        className="bg-green-500 text-white px-4 py-2 mt-4"
        onClick={handleSave}
      >
        Save Note
      </button>
    </div>
  );
}
