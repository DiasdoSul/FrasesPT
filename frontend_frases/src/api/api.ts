import axios from "axios";

// Use VITE_API_URL from environment variables
// Example: VITE_API_URL = "http://localhost:8000/api"
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
console.log("API Base URL:", baseURL);

const api = axios.create({
  baseURL: baseURL,
});

// Set up token-based authentication if available
const token = localStorage.getItem("authToken");
if (token) {
  api.defaults.headers.common["Authorization"] = `Token ${token}`;
}

export default api;
