import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    // Set auth token
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["x-auth-token"] = token;
            localStorage.setItem("token", token);
            getUserData();
        } else {
            delete axios.defaults.headers.common["x-auth-token"];
            localStorage.removeItem("token");
        }
    }, [token]);

    const getUserData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/profile');
            // const res = await axios.get("/api/auth/profile");
            setUser(res.data);
        } catch (err) {
            logout();
        }
    };

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/login', 
        { email, password });
        setToken(res.data.token);
    };

    const signup = async (name, email, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/signup',
        { name, email, password });
        setToken(res.data.token);
    };

    const logout = () => {
        setToken("");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
