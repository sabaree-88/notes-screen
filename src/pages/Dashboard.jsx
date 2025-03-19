import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingNote, setEditingNote] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });

  const navigate = useNavigate();
  const { token, logout } = useAuthStore();

  // Fetch notes when the component mounts
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }
    fetchNotes();
  }, [token]);

  // Function to fetch notes
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/notes/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched notes:", response.data);

      if (Array.isArray(response.data)) {
        setNotes(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching notes:",
        error.response?.data || error.message
      );
    }
  };

  // Function to create a new note
  const createNote = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/notes/",
        {
          note_title: newNote.title,
          note_content: newNote.content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewNote({ title: "", content: "" });
      fetchNotes();
    } catch (error) {
      console.error(
        "Error creating note:",
        error.response?.data || error.message
      );
    }
  };

  // Function to delete a note
  const deleteNote = async (noteId) => {
    if (!noteId) {
      console.error("Error: Missing note ID!");
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/v1/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (error) {
      console.error(
        "Error deleting note:",
        error.response?.data || error.message
      );
    }
  };

  // Function to start editing a note
  const startEditing = (note) => {
    setEditingNote(note);
    setEditData({ title: note.note_title, content: note.note_content });
  };

  // Function to update a note
  const editNote = async () => {
    if (!editingNote || !editingNote.note_id) {
      console.error("Error: Note ID is missing!");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8000/api/v1/notes/${editingNote.note_id}`,
        {
          note_title: editData.title,
          note_content: editData.content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingNote(null);
      fetchNotes();
    } catch (error) {
      console.error(
        "Error updating note:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">📝 Notes Dashboard</h1>

      {/* Create Note Section */}
      <div className="bg-white p-4 rounded shadow-md mb-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mb-2 w-full"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          className="border p-2 mb-2 w-full"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 w-full"
          onClick={createNote}
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="w-full max-w-md">
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes found.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.note_id}
              className="bg-white p-4 mb-2 rounded shadow-md"
            >
              <h2 className="font-bold">{note.note_title}</h2>
              <p>{note.note_content}</p>
              <div className="flex justify-between mt-2">
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => deleteNote(note.note_id)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1"
                  onClick={() => startEditing(note)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Note Modal */}
      {editingNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">Edit Note</h2>
            <input
              type="text"
              className="border p-2 mb-2 w-full"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />
            <textarea
              className="border p-2 mb-2 w-full"
              value={editData.content}
              onChange={(e) =>
                setEditData({ ...editData, content: e.target.value })
              }
            />
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2"
                onClick={() => setEditingNote(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2"
                onClick={editNote}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <button
        className="mt-4 bg-gray-800 text-white px-4 py-2"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
