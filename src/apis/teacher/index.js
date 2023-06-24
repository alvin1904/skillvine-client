import { addToLS } from "@/utils/LSOperations";
import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  // baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const setHead = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// INDEX
export const apiLive = () => api.get("/");
export const verifyToken = () =>
  api.get("/auth/teachers/access-tokens", { withCredentials: true });
export const logoutAPI = () =>
  api.post("/auth/teachers/logout", { withCredentials: true });

// TEACHER
export const getTeacherAPI = () =>
  api.get("/users/teachers", { withCredentials: true });

//   BATCHES
export const getBatchesAPI = () =>
  api.get("/teachers/batches", { withCredentials: true });
export const getStudentsAPI = (id) =>
  api.get(`/teachers/batches/${id}`, { withCredentials: true });
export const getStudentsCertificatesAPI = (id) =>
  api.get(`/teachers/certificates/students/${id}`, { withCredentials: true });

// CERTIFICATES
export const getCertificateAPI2 = (id) =>
  api.get(`/teachers/certificates/${id}`, { withCredentials: true });

//MARK CErTIFICATE
export const markCertificateAPI = (data, id) =>
  api.patch(`/teachers/certificates/${id}`, data, { withCredentials: true });
export const rejectCertificateAPI = (data, id) =>
  api.patch(`/teachers/certificates/reject/${id}`, data, {
    withCredentials: true,
  });

// REPORT GENERATION
export const reportGenBatchAPI = (batch) =>
  api.get(`/teachers/reports/batches/${batch}`);
export const reportGenStudentAPI = (student) =>
  api.get(`/teachers/reports/students/${student}`);

// DELETE STUDENT
export const deleteStudentAPI = (student) =>
  api.delete(`/teachers/students/${student}`);

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
          setHead(response.data.accessTokenTeacher);
          addToLS("accessTokenTeacher", response.data.accessTokenTeacher);
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
