import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export const getPostsAPI = () => API.get("/post");

export const createPostAPI = (postData) => API.post("/post", postData);

export const toggleLikeAPI = (postId) => API.put(`/post/${postId}/like`);

export const addCommentAPI = ({ postId, comment }) =>
  API.post(`/post/${postId}/comment`, { comment });
