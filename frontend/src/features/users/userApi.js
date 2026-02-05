import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export const getAllUsers = () => API.get("/auth/getallusers");
