import axios from "axios";
console.log(process.env.URL, "envvvvvvv");
const axiosInstance = axios.create({
  baseURL: process.env.URL,

  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
