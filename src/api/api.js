import axios from "axios";

const API_URL = "https://fast-api-notes.onrender.com/api/v1"; // Adjust if needed

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
