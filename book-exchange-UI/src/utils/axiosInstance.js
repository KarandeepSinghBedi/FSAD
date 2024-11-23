import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:2000", // Replace with your backend API URL
});

// Add a request interceptor to include the token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;
