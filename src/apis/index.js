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

// INDEX
export const apiLive = () => api.get("/");
export const updateUserAPI = (data) =>
  api.patch("/users/students", data, { withCredentials: true });
export const verifyToken = () =>
  api.get("/auth/students/get-access-token", { withCredentials: true });
export const logoutAPI = () =>
  api.post("/auth/students/logout", { withCredentials: true });

// GET CATEGORIES
export const getCategoryAPI = () => api.get("/category");

// NOTIFICATIONS
export const getNotificationsAPI = () =>
  api.get("/students/notifications", { withCredentials: true });
export const deleteNotificationsAPI = () =>
  api.delete("/students/notifications", { withCredentials: true });
export const getScoreAPI = () =>
  api.get(`/students/scores`, { withCredentials: true });

// CERTIFICATES
export const uploadCertificateAPI = (formdata) =>
  api2.post("/students/certificates", formdata, { withCredentials: true });
export const getCertificatesAPI = () =>
  api.get("/students/certificates", { withCredentials: true });
export const deleteCertificatesAPI = (id) =>
  api.delete(`/students/certificates/${id}`, { withCredentials: true });

// INTERCEPTOR
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
