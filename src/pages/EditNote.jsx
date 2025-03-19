import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUpdateNote, useNotes } from "../api/noteService";
import RichTextEditor from "../components/RichTextEditor";

export default function EditNote() {
  const { noteId } = useParams();
  const { data: notes, isLoading } = useNotes();
  const updateNote = useUpdateNote();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!notes) return; // Prevent accessing undefined notes

    const note = notes.find((n) => String(n.id) === String(noteId)); // Ensure type matches
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [notes, noteId]);

  const handleUpdate = () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    updateNote.mutate(
      { id: noteId, note: { title, content } },
      {
        onSuccess: () => navigate("/"),
        onError: (error) => {
          console.error("Update failed:", error);
          alert("Failed to update note. Try again.");
        },
      }
    );
  };

  if (isLoading) return <p>Loading note...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">✏️ Edit Note</h1>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mt-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <RichTextEditor value={content} setValue={setContent} />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={handleUpdate}
      >
        Update Note
      </button>
    </div>
  );
}
