import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
});

export const getAllUsers = () => API.get("/auth/getallusers");
