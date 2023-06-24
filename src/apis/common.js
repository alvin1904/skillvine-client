import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  // baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
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
  api.get(`/category/activity-heads/activity?name=${encodeURIComponent(head)}`);
export const getIsLeadershipAPI = (activity) =>
  api.get(`/category/levels?activity=${encodeURIComponent(activity)}`);
export const getPointsAPI = (
  activity,
  level,
  leadershipLevel,
  isLeadership,
  year
) =>
  api.get(
    `/category/points?activity=${encodeURIComponent(activity)}&level=${level}&leadership-level=${leadershipLevel}&is-leadership=${isLeadership}`
  );
