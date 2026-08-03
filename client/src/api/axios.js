import axios from "axios";
const url = import.meta.env.VITE_SERVER_API;
const api = axios.create({
    baseURL: url,
    // baseURL: "http://localhost:3000",
    withCredentials: true,
});

export default api;