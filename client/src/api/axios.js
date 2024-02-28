import axios from "axios";
import { setCredentials } from "../features/api/apiSlice";

const BASE_URL = "https://dely-mern.netlify.app//api/v1";

export default axios.create({
  baseURL: BASE_URL,
});

export const apiPrivat = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

apiPrivat.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("jwt");
    if (!config.headers["Authorization"] && accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiPrivat.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403) {
      prevRequest.sent = true;
      const { data } = await axios.get(`${BASE_URL}/auth/refresh`, {
        withCredentials: true,
      });
      setCredentials({ ...data.accessToken });

      localStorage.setItem("jwt", data.accessToken);
      prevRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
      return axios.request(prevRequest);
    }
    return Promise.reject(error);
  }
);
