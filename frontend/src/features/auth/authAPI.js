import api from "../../utils/axios";

export const signupAPI = (data) => api.post("/auth/signup", data);

export const signinAPI = (data) => api.post("/auth/signin", data);

export const logoutAPI = () => api.post("/auth/logout");

export const profileAPI = () => api.get("/auth/profile");

export const meAPI = () => api.get("/auth/me");
