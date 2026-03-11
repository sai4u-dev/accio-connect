import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
});

export const getPostsAPI = () => API.get("/post");

export const createPostAPI = (postData) => API.post("/post", postData);

export const toggleLikeAPI = (postId) => API.put(`/post/${postId}/like`);

export const addCommentAPI = ({ postId, comment }) =>
  API.post(`/post/${postId}/comment`, { comment });
