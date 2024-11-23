import React, { createContext, useState, useEffect } from "react";

// Create a context to share user data
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user info is in localStorage and set it
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        const name = localStorage.getItem("name");

        if (token && email && name) {
            setUser({ email });
        } else {
            setUser(null);  // In case no user is logged in
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");

        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
