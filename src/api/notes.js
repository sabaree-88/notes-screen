import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchNotes = async () => {
  const response = await axios.get(`${API_URL}/notes/`);
  return response.data;
};

export const createNote = async (note) => {
  const response = await axios.post(`${API_URL}/notes/`, note);
  return response.data;
};
