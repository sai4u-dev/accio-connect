import axios from "axios";

export const createPost = (postData) => {
  return axios.post("http://localhost:8000/api/post", postData, {
    withCredentials: true, // 🔥 cookie auth
    headers: {
      "Content-Type": "application/json",
    },
  });
};
