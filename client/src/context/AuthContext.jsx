import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedtoken = localStorage.getItem('token');
        if (storedtoken) {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) setUser(userData);
            setToken(storedtoken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);
    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        } catch (error) {
            throw error;
        }
    }
    const register = async (username, email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/users/register', { username, email, password });
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
        delete axios.defaults.headers.common['Authorization'];
    };
    return(
        <AuthContext.Provider value ={{user,login,register,logout,loading,token}}>
            {children}
        </AuthContext.Provider>
    )
}
