import axios from "axios";

const API_URL = "http://localhost:8000/api/post";

export const createPost = (postData) => {
  return axios.post(API_URL, postData, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// ✅ get single post by ID
export const getPost = (postId) => {
  return axios.get(`${API_URL}/${postId}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// ✅ get all posts
export const getAllPosts = async () => {
  const res = await axios.get(API_URL, {
    withCredentials: true,
  });

  return res.data.data;
};

export const deletePost = async (postId) => {
  return axios.delete(`${API_URL}/${postId}`, {
    withCredentials: true,
  });
};

export const updatePost = async (postId, postData) => {
  return axios.put(`${API_URL}/${postId}`, postData, {
    withCredentials: true,
  });
};

export const likeUnlikePost = async (postId) => {
  return axios.patch(`${API_URL}/${postId}/like`, null, {
    withCredentials: true,
  });
};
