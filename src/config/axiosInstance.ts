import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

console.log(import.meta.env.VITE_API_URL)

export default axiosInstance;
