import { useNotes, useDeleteNote } from "../api/noteService";
import { Link } from "react-router-dom";

export default function Home() {
  const { data: notes, isLoading } = useNotes();
  const deleteNote = useDeleteNote();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">📝 Your Notes</h1>

      <Link
        to="/create"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block"
      >
        ➕ Add Note
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {notes?.map((note) => (
          <div
            key={note.id}
            className="p-4 border-2 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-xl font-bold">{note.title}</h2>
            <p className="text-gray-600">{note.content}</p>
            <div className="flex gap-2 mt-2">
              <Link to={`/edit/${note.id}`} className="text-blue-500">
                ✏️ Edit
              </Link>
              <button
                onClick={() => deleteNote.mutate(note.id)}
                className="text-red-500"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
