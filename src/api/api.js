import axios from "axios";

const API_URL = "http://localhost:8000/api/v1"; // Adjust if needed

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
