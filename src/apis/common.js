import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const apiLive = () => api.get("/");

// GET CATEGORIES
export const getCategoryAPI = () => api.get("/category");
export const getActivityHeadAPI = () => api.get("/category/activity-heads");
export const getActivityAPI = (head) =>
  api.get(`/category/activity-heads/activity?name=${head}`);
export const getIsLeadershipAPI = (activity) =>
  api.get(`/category/levels?activity=${activity}`);
