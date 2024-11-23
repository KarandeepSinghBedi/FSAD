import axios from "axios";

// Create an Axios instance for API requests
const api = axios.create({
    baseURL: "http://localhost:2000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include authorization token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
