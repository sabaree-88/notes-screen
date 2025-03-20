import axios from "axios";

const API_URL = "https://fast-api-notes.onrender.com";

export const fetchNotes = async () => {
  const response = await axios.get(`${API_URL}/notes/`);
  return response.data;
};

export const createNote = async (note) => {
  const response = await axios.post(`${API_URL}/notes/`, note);
  return response.data;
};
