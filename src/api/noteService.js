import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";

// Fetch all notes
export const useNotes = () =>
  useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await api.get("/notes/");
      return res.data;
    },
  });

// Create a note
export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (note) => {
      const res = await api.post("/notes/", note);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });
};

// Update a note
export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, note }) => {
      const res = await api.put(`/notes/${id}`, note);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });
};

// Delete a note
export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });
};
