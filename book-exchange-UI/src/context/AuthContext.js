import React, { createContext, useState, useEffect } from "react";
import API from "../utils/axiosInstance";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.get("http://localhost:2000/auth/profile")
                .then(res => setUser(res.data))
                .catch(() => setToken(null));
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const { data } = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            setUser(data);
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await API.post("/auth/register", { name, email, password });
            localStorage.setItem("token", data.token);
            setUser(data);
        } catch (error) {
            console.error("Registration failed:", error.response?.data?.message || error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
