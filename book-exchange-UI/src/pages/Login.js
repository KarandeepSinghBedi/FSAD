import React, { useState } from "react";
import api from "../utils/api";
import { saveToken } from "../utils/auth";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("http://localhost:2000/auth/login", { email, password });
            saveToken(response.data.token);

             // Save JWT token and user details in localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("name", response.data.name);  // Store userId if needed

            // Store the user data and token in localStorage
           localStorage.setItem("user", JSON.stringify({
                name: response.data.name,  // Assuming 'name' is returned from the backend
                email: response.data.email,
                token: response.data.token
            }));
        
            alert("Login successful!");
            navigate('/');
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
        }
    };
    
    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />&nbsp;&nbsp;
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />&nbsp;&nbsp;
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
