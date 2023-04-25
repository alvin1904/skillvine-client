import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
const api2 = axios.create({
  baseURL: "/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

export const setHead = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  api2.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const apiLive = () => api.get("/");
export const updateUserAPI = (data) =>
  api.patch("/users/students", data, { withCredentials: true });
export const verifyToken = () =>
  api.get("/auth/students/get-access-token", { withCredentials: true });

let refresh = false;
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    try {
      if (error.response.status === 401 && !refresh) {
        refresh = true;
        const response = await verifyToken();
        if (response.status === 200) {
          setHead(response.data.accessTokenStudent);
          return api(error.config);
        }
      }
      refresh = false;
      return error;
    } catch (err) {
      console.log(err);
    }
  }
);
