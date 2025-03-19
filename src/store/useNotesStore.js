import { create } from "zustand";
import { fetchNotes } from "../api/notes";

const useNotesStore = create((set) => ({
  notes: [],
  loadNotes: async () => {
    const data = await fetchNotes();
    set({ notes: data });
  },
}));

export default useNotesStore;
